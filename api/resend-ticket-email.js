// POST /api/resend-ticket-email
// Header: x-admin-secret: <ADMIN_SECRET>
// Body: { order_id, custom_email }

import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error('Supabase configuration missing');
  }
  return createClient(url, key);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Admin secret check
  if (req.headers['x-admin-secret'] !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized: Invalid Admin Secret' });
  }

  const { order_id, custom_email } = req.body || {};
  if (!order_id) {
    return res.status(400).json({ error: 'order_id is required' });
  }

  try {
    const supabase = getSupabase();

    // Fetch order
    const { data: order, error: orderError } = await supabase
      .from('raffle_orders')
      .select('*, raffle_tickets(ticket_number)')
      .eq('id', order_id)
      .single();

    if (orderError || !order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const targetEmail = (custom_email || order.buyer_email || '').trim();
    if (!targetEmail || !targetEmail.includes('@')) {
      return res.status(400).json({ error: 'No valid recipient email address on file for this order' });
    }

    const tickets = (order.raffle_tickets || []).map(t => t.ticket_number);
    if (tickets.length === 0) {
      return res.status(400).json({ error: 'No tickets are associated with this order' });
    }

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({
        error: 'RESEND_API_KEY is not configured in Vercel environment variables'
      });
    }

    const transactionId = 'FW-TXN-' + order.id.slice(0, 8).toUpperCase();

    const ticketChipsHtml = tickets
      .map(
        (num) => `
          <span style="display:inline-block; background:#16342a; color:#c9a227; font-family:Courier, monospace; font-weight:bold; font-size:15px; padding:6px 12px; margin:4px; border-radius:6px; border:1px solid #c9a227;">
            ${num}
          </span>
        `
      )
      .join('');

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #ffffff; color: #1e293b; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 16px rgba(0,0,0,0.06);">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #166C16; margin: 0; font-size: 24px; font-weight: 900;">🎟️ Official Raffle Draw Tickets</h1>
          <p style="color: #64748b; font-size: 13px; margin: 4px 0 0; font-weight: 600;">NFCS · St. Peter's Catholic Chaplaincy, UNN</p>
        </div>

        <p style="font-size: 15px; line-height: 1.5; color: #1e293b;">Hi <strong>${order.buyer_name}</strong>,</p>
        <p style="font-size: 15px; line-height: 1.5; color: #334155;">
          Thank you for supporting Federation Week 2026! Here is your official ticket confirmation for your payment of <strong>₦${Number(order.total_amount).toLocaleString()}</strong> (${(order.payment_method || 'online').toUpperCase()}).
        </p>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px; margin: 20px 0;">
          <p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Transaction Ref:</strong> <span style="font-family: monospace;">${transactionId}</span></p>
          <p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Buyer:</strong> ${order.buyer_name} (${order.buyer_phone})</p>
          ${order.department ? `<p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Department / Level:</strong> ${order.department}</p>` : ''}
          <p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Total Entries:</strong> ${tickets.length}</p>
        </div>

        <div style="margin: 24px 0; text-align: center;">
          <p style="font-size: 13px; font-weight: 800; color: #166C16; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">Your Official Ticket Number${tickets.length > 1 ? 's' : ''}:</p>
          <div style="padding: 16px; background: #0B0B0F; border-radius: 10px; text-align: center;">
            ${ticketChipsHtml}
          </div>
        </div>

        <div style="background: #FAF7F0; border-left: 4px solid #c9a227; padding: 16px; border-radius: 6px; margin: 24px 0;">
          <h3 style="margin: 0 0 6px; color: #16342a; font-size: 15px; font-weight: bold;">Grand Draw Information:</h3>
          <p style="margin: 4px 0; font-size: 14px; color: #334155;">📅 <strong>Date:</strong> Sunday, 20th September 2026</p>
          <p style="margin: 4px 0; font-size: 14px; color: #334155;">⏰ <strong>Time:</strong> 1:00 PM </p>
          <p style="margin: 4px 0; font-size: 14px; color: #334155;">📍 <strong>Venue:</strong> St. Peter's Catholic Chaplaincy inside the Seat of Wisdom Hall</p>
        </div>

        <p style="font-size: 13px; color: #64748b; line-height: 1.5;">
          <em>Prizes: 1st, 2nd, and 3rd major prizes, plus consolation prizes for 4th to 10th winners. Keep this email safe as official verification.</em>
        </p>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 28px 0 16px;" />
        <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 0;">
          Nigeria Federation of Catholic Students (NFCS) · St. Peter's Catholic Chaplaincy, University of Nigeria, Nsukka
        </p>
      </div>
    `;

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'tickets@resend.dev';

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY.trim()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [targetEmail],
        subject: `🎟️ Your Federation Week Raffle Tickets (${tickets.length} Entries) — ${transactionId}`,
        html: emailHtml,
      }),
    });

    const resData = await emailRes.json().catch(() => ({}));

    if (!emailRes.ok) {
      return res.status(emailRes.status || 500).json({
        error: resData.message || 'Resend API returned an error',
        details: resData,
      });
    }

    // If a custom/corrected email was used, optionally update the order record
    if (custom_email && custom_email !== order.buyer_email) {
      await supabase
        .from('raffle_orders')
        .update({ buyer_email: custom_email })
        .eq('id', order.id);
    }

    return res.status(200).json({
      success: true,
      message: `Tickets successfully emailed to ${targetEmail}`,
      message_id: resData.id,
      recipient: targetEmail,
    });
  } catch (err) {
    console.error('Error in /api/resend-ticket-email:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
