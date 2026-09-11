// POST /api/verify-paystack
// Body: { reference, buyer_name, buyer_phone, buyer_email, quantity }
//
// This function NEVER trusts the browser's "payment succeeded" callback.
// It re-verifies the transaction directly with Paystack using your secret
// key, then writes the order + tickets to Supabase using the service role
// key. Both secrets live only in Vercel environment variables.

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

  const body = req.body || {};
  const reference = (body.reference || '').trim();

  if (!reference) {
    return res.status(400).json({ error: 'Missing transaction reference' });
  }

  try {
    // 1. Verify the transaction with Paystack directly (server-to-server).
    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    const verifyData = await verifyRes.json();

    if (!verifyRes.ok || !verifyData.status || verifyData.data?.status !== 'success') {
      const errMsg = verifyData.message || 'Payment could not be verified by Paystack';
      return res.status(402).json({ error: errMsg });
    }

    const meta = verifyData.data?.metadata || {};
    const cust = verifyData.data?.customer || {};

    // Extract details with full fallbacks so paid customers are never rejected
    const buyer_name = (
      body.buyer_name ||
      body.name ||
      meta.buyer_name ||
      (cust.first_name ? `${cust.first_name} ${cust.last_name || ''}`.trim() : '') ||
      'Valued Supporter'
    ).trim();

    const buyer_phone = (
      body.buyer_phone ||
      body.phone ||
      meta.buyer_phone ||
      cust.phone ||
      '+2348000000000'
    ).trim();

    const rawEmail = (
      body.buyer_email ||
      body.email ||
      meta.buyer_email ||
      cust.email ||
      ''
    ).trim();
    // Do not use the fallback guest email as the actual email
    const buyer_email = rawEmail.includes('@ticket.nfcsunn.org') ? '' : rawEmail;

    const department = (body.department || meta.department || '').trim();

    // Determine quantity from body, metadata, or paid amount
    let qty = parseInt(body.quantity || meta.quantity, 10);
    if (!Number.isInteger(qty) || qty < 1) {
      qty = Math.max(1, Math.floor((verifyData.data.amount / 100) / UNIT_PRICE));
    }

    const paidAmountKobo = verifyData.data.amount; // Paystack returns amount in kobo
    const expectedAmountKobo = qty * UNIT_PRICE * 100;

    if (paidAmountKobo < expectedAmountKobo) {
      return res.status(402).json({ error: 'Amount paid does not match ticket quantity' });
    }

    const bonusQty = calculateBonusTickets(qty);
    const totalTicketsCount = qty + bonusQty;

    const supabase = getSupabase();

    // 2. Prevent double-processing the same reference.
    const { data: existingOrder } = await supabase
      .from('raffle_orders')
      .select('id, buyer_name, buyer_phone, department, total_amount, quantity')
      .eq('payment_reference', reference)
      .maybeSingle();

    if (existingOrder) {
      const { data: existingTickets } = await supabase
        .from('raffle_tickets')
        .select('ticket_number')
        .eq('order_id', existingOrder.id)
        .order('ticket_number', { ascending: true });

      const transactionId = 'FW-TXN-' + existingOrder.id.slice(0, 8).toUpperCase();

      return res.status(200).json({
        message: 'Order already processed',
        order_id: existingOrder.id,
        transaction_id: transactionId,
        buyer_name: existingOrder.buyer_name,
        buyer_phone: existingOrder.buyer_phone,
        department: existingOrder.department,
        quantity: existingOrder.quantity,
        total_amount: existingOrder.total_amount,
        tickets: (existingTickets || []).map((t) => t.ticket_number),
      });
    }

    // 3. Create the order record (record total entries issued).
    const { data: order, error: orderError } = await supabase
      .from('raffle_orders')
      .insert({
        buyer_name,
        buyer_phone,
        buyer_email: buyer_email || null,
        department: department || null,
        quantity: totalTicketsCount,
        unit_price: UNIT_PRICE,
        total_amount: qty * UNIT_PRICE,
        channel: 'online',
        payment_reference: reference,
        payment_method: 'paystack',
        payment_status: 'success',
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // 4. Issue ticket rows for paid + free bonus tickets (concurrently batched for high speed)
    const ticketRows = [];
    const BATCH_SIZE = 25;
    for (let i = 0; i < totalTicketsCount; i += BATCH_SIZE) {
      const currentBatchCount = Math.min(BATCH_SIZE, totalTicketsCount - i);
      const batchPromises = Array.from({ length: currentBatchCount }, () =>
        supabase.rpc('next_raffle_ticket_number')
      );
      const batchResults = await Promise.all(batchPromises);
      for (const res of batchResults) {
        if (res.error) throw res.error;
        ticketRows.push({ order_id: order.id, ticket_number: res.data });
      }
    }

    const { data: tickets, error: ticketError } = await supabase
      .from('raffle_tickets')
      .insert(ticketRows)
      .select();

    if (ticketError) throw ticketError;

    const transactionId = 'FW-TXN-' + order.id.slice(0, 8).toUpperCase();
    const ticketNumbers = tickets.map((t) => t.ticket_number);

    // 5. Automated Email Delivery of Tickets via Resend API
    let emailSent = false;
    let emailError = null;
    const recipientEmail = (buyer_email || order.buyer_email || '').trim();

    if (process.env.RESEND_API_KEY && recipientEmail) {
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
              <h1 style="color: #4D2EAB; margin: 0; font-size: 24px; font-weight: 900;">🎟️ Official Raffle Draw Tickets</h1>
              <p style="color: #64748b; font-size: 13px; margin: 4px 0 0; font-weight: 600;">NFCS · St. Peter's Catholic Chaplaincy, UNN</p>
            </div>

            <p style="font-size: 15px; line-height: 1.5; color: #1e293b;">Hi <strong>${order.buyer_name}</strong>,</p>
            <p style="font-size: 15px; line-height: 1.5; color: #334155;">
              Thank you for supporting Federation Week 2026! Your payment of <strong>₦${Number(order.total_amount).toLocaleString()}</strong> has been approved and recorded.
            </p>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px; margin: 20px 0;">
              <p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Transaction Ref:</strong> <span style="font-family: monospace;">${transactionId}</span></p>
              <p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Buyer:</strong> ${order.buyer_name} (${order.buyer_phone})</p>
              ${order.department ? `<p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Department / Level:</strong> ${order.department}</p>` : ''}
              <p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Total Entries:</strong> ${totalTicketsCount} (${qty} paid${bonusQty > 0 ? ` + ${bonusQty} bonus free entries` : ''})</p>
            </div>

            <div style="margin: 24px 0; text-align: center;">
              <p style="font-size: 13px; font-weight: 800; color: #4D2EAB; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">Your Official Ticket Number${ticketNumbers.length > 1 ? 's' : ''}:</p>
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
            to: [recipientEmail],
            subject: `🎟️ Your Federation Week Raffle Tickets (${totalTicketsCount} Entries) — ${transactionId}`,
            html: emailHtml,
          }),
        });

        const resData = await emailRes.json().catch(() => ({}));
        if (emailRes.ok) {
          emailSent = true;
        } else {
          emailError = resData.message || JSON.stringify(resData);
          console.warn('Resend email error:', resData);
        }
      } catch (err) {
        emailError = err.message;
        console.warn('Resend email exception:', err);
      }
    }

    return res.status(200).json({
      message: 'Payment verified and tickets issued',
      order_id: order.id,
      transaction_id: transactionId,
      buyer_name: order.buyer_name,
      buyer_phone: order.buyer_phone,
      buyer_email: recipientEmail,
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
    console.error('verify-paystack error:', err);
    return res.status(500).json({ error: err.message || 'Something went wrong verifying payment' });
  }
}
