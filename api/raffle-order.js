// GET /api/raffle-order?id=<order_id_or_reference>
// Returns public receipt details for a specific raffle order and its tickets.
// Secure: uses service role key, but strictly scoped to the requested order id.

import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error('Supabase configuration missing: set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  }
  return createClient(url, key);
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const id = req.query?.id || req.query?.order_id || req.query?.ref;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Missing order ID or reference' });
  }

  const cleanId = id.trim();

  try {
    const supabase = getSupabase();

    // Look up by UUID primary key OR payment_reference
    let query = supabase
      .from('raffle_orders')
      .select('id, buyer_name, buyer_phone, buyer_email, department, quantity, total_amount, channel, payment_reference, payment_status, created_at');

    // Check if cleanId is a UUID format
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cleanId);

    if (isUuid) {
      query = query.eq('id', cleanId);
    } else {
      query = query.eq('payment_reference', cleanId);
    }

    const { data: order, error: orderError } = await query.maybeSingle();

    if (orderError) throw orderError;

    if (!order) {
      return res.status(404).json({ error: 'Raffle order not found' });
    }

    // Fetch the ticket numbers for this order
    const { data: tickets, error: ticketError } = await supabase
      .from('raffle_tickets')
      .select('ticket_number, created_at')
      .eq('order_id', order.id)
      .order('ticket_number', { ascending: true });

    if (ticketError) throw ticketError;

    const transactionId = 'FW-TXN-' + order.id.slice(0, 8).toUpperCase();

    return res.status(200).json({
      order_id: order.id,
      transaction_id: transactionId,
      payment_reference: order.payment_reference,
      buyer_name: order.buyer_name,
      buyer_phone: order.buyer_phone,
      buyer_email: order.buyer_email,
      department: order.department,
      quantity: order.quantity,
      total_amount: order.total_amount,
      channel: order.channel,
      payment_status: order.payment_status,
      created_at: order.created_at,
      tickets: (tickets || []).map((t) => t.ticket_number),
    });
  } catch (err) {
    console.error('raffle-order error:', err);
    return res.status(500).json({ error: 'Failed to retrieve order details' });
  }
}
