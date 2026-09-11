// POST /api/manual-entry
// Header: x-admin-secret: <ADMIN_SECRET>
// Body: { buyer_name, buyer_phone, buyer_email, department, quantity, payment_method, recorded_by }
//
// Used by excos at the office to register a walk-in cash/transfer sale,
// immediately generate ticket numbers, and automatically email them if an email is provided.

import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error('Supabase configuration missing: set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  }
  return createClient(url, key);
}

const UNIT_PRICE = 200;

function calculateBonusTickets(qty) {
  const q = parseInt(qty, 10) || 0;
  return Math.max(0, Math.floor(q / 10)); // 1 extra free ticket for every 10 tickets purchased
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Simple shared-secret check so random people can't hit this endpoint.
  if (req.headers['x-admin-secret'] !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const {
    buyer_name,
    buyer_phone,
    buyer_email,
    department,
    quantity,
    payment_method,
    recorded_by,
  } = req.body || {};

  const cleanName = (buyer_name || '').trim();
  const cleanPhone = (buyer_phone || '').trim();
  const cleanEmail = (buyer_email || '').trim();
  const cleanDept = (department || '').trim();
  const cleanRecordedBy = (recorded_by || '').trim();

  if (!cleanName || !cleanPhone || !cleanEmail || !quantity || !cleanRecordedBy) {
    return res.status(400).json({ error: 'Missing required fields (Name, Phone, Email, Quantity, and Recorded By are required)' });
  }

  if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
    return res.status(400).json({ error: 'Please provide a valid email address' });
  }

  const qty = parseInt(quantity, 10);
  if (!Number.isInteger(qty) || qty < 1 || qty > 500) {
    return res.status(400).json({ error: 'Invalid ticket quantity' });
  }

  const bonusQty = calculateBonusTickets(qty);
  const totalTicketsCount = qty + bonusQty;

  try {
    const supabase = getSupabase();

    // 1. Create the order record in raffle_orders
    const { data: order, error: orderError } = await supabase
      .from('raffle_orders')
      .insert({
        buyer_name: cleanName,
        buyer_phone: cleanPhone,
        buyer_email: cleanEmail || null,
        department: cleanDept || null,
        quantity: totalTicketsCount,
        unit_price: UNIT_PRICE,
        total_amount: qty * UNIT_PRICE,
        channel: 'walk-in',
        payment_method: payment_method || 'cash',
        payment_status: 'success',
        recorded_by: cleanRecordedBy,
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // 2. Issue ticket rows concurrently in batches of 25
    const ticketRows = [];
    const BATCH_SIZE = 25;
    for (let i = 0; i < totalTicketsCount; i += BATCH_SIZE) {
      const currentBatchCount = Math.min(BATCH_SIZE, totalTicketsCount - i);
      const batchPromises = Array.from({ length: currentBatchCount }, () =>
        supabase.rpc('next_raffle_ticket_number')
      );
      const batchResults = await Promise.all(batchPromises);
      for (const result of batchResults) {
        if (result.error) throw result.error;
        ticketRows.push({ order_id: order.id, ticket_number: result.data });
      }
    }

    const { data: tickets, error: ticketError } = await supabase
      .from('raffle_tickets')
      .insert(ticketRows)
      .select();

    if (ticketError) throw ticketError;

    const transactionId = 'FW-TXN-' + order.id.slice(0, 8).toUpperCase();
    const ticketNumbers = tickets.map((t) => t.ticket_number);

    // 3. Automated Email Delivery of Tickets via Resend API (if email provided)
    let emailSent = false;
    let emailError = null;

    if (process.env.RESEND_API_KEY && cleanEmail) {
      try {
        const ticketChipsHtml = ticketNumbers
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
              Thank you for supporting Federation Week 2026! Your payment of <strong>₦${Number(order.total_amount).toLocaleString()}</strong> (${order.payment_method?.toUpperCase()}) has been approved and recorded.
            </p>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px; margin: 20px 0;">
              <p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Transaction Ref:</strong> <span style="font-family: monospace;">${transactionId}</span></p>
              <p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Buyer:</strong> ${order.buyer_name} (${order.buyer_phone})</p>
              ${order.department ? `<p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Department / Level:</strong> ${order.department}</p>` : ''}
              <p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Total Entries:</strong> ${totalTicketsCount} (${qty} paid${bonusQty > 0 ? ` + ${bonusQty} bonus free entries` : ''})</p>
            </div>

            <div style="margin: 24px 0; text-align: center;">
              <p style="font-size: 13px; font-weight: 800; color: #166C16; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">Your Official Ticket Number${ticketNumbers.length > 1 ? 's' : ''}:</p>
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

        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY.trim()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || 'tickets@resend.dev',
            to: [cleanEmail],
            subject: `🎟️ Your Federation Week Raffle Tickets (${totalTicketsCount} Entries) — ${transactionId}`,
            html: emailHtml,
          }),
        });

        const resData = await emailRes.json().catch(() => ({}));
        if (emailRes.ok) {
          emailSent = true;
        } else {
          emailError = resData.message || JSON.stringify(resData);
          console.warn('Resend email error in manual-entry:', resData);
        }
      } catch (err) {
        emailError = err.message;
        console.warn('Resend email exception in manual-entry:', err);
      }
    }

    return res.status(200).json({
      message: 'Ticket(s) issued',
      order_id: order.id,
      transaction_id: transactionId,
      buyer_name: cleanName,
      buyer_phone: cleanPhone,
      buyer_email: cleanEmail || null,
      email_sent: emailSent,
      email_error: emailError,
      department: order.department,
      quantity: totalTicketsCount,
      paid_quantity: qty,
      bonus_tickets: bonusQty,
      total_amount: order.total_amount,
      tickets: ticketNumbers,
    });
  } catch (err) {
    console.error('manual-entry error:', err);
    return res.status(500).json({ error: err.message || 'Something went wrong issuing the ticket' });
  }
}
