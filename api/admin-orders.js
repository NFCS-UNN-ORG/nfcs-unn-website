// GET /api/admin-orders
// Header: x-admin-secret: <ADMIN_SECRET>
//
// Protected serverless function that uses the Supabase service role key
// server-side to fetch all orders + their linked tickets.

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

  // Admin secret check
  if (req.headers['x-admin-secret'] !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const supabase = getSupabase();
    const { data: orders, error } = await supabase
      .from('raffle_orders')
      .select('*, raffle_tickets(ticket_number, printed)')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return res.status(200).json(orders || []);
  } catch (err) {
    console.error('admin-orders error:', err);
    return res.status(500).json({ error: 'Failed to fetch orders' });
  }
}
