// POST /api/admin-sync-paystack
// Header: x-admin-secret: <ADMIN_SECRET>
//
// Reconciles recent Paystack transactions with Supabase orders.
// Any successful raffle transactions missing from the database
// are automatically verified and tickets issued.

import { createClient } from '@supabase/supabase-js';
import verifyHandler from './verify-paystack.js';

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
    return res.status(401).json({ error: 'Unauthorized: invalid admin secret' });
  }

  const paystackKey = process.env.PAYSTACK_SECRET_KEY;
  if (!paystackKey) {
    return res.status(500).json({ error: 'PAYSTACK_SECRET_KEY is not configured on the server' });
  }

  try {
    const supabase = getSupabase();

    // 1. Fetch existing references in Supabase
    const { data: dbOrders, error: dbErr } = await supabase
      .from('raffle_orders')
      .select('payment_reference');
    if (dbErr) throw dbErr;

    const existingRefs = new Set(
      (dbOrders || []).map((o) => o.payment_reference).filter(Boolean)
    );

    // 2. Fetch successful transactions from Paystack
    const psRes = await fetch('https://api.paystack.co/transaction?status=success&perPage=50', {
      headers: { Authorization: `Bearer ${paystackKey}` },
    });
    const psData = await psRes.json();
    if (!psData.status) {
      return res.status(500).json({ error: psData.message || 'Failed to fetch transactions from Paystack' });
    }

    const txs = psData.data || [];
    const missing = [];

    for (const t of txs) {
      if (t.status !== 'success') continue;
      if (existingRefs.has(t.reference)) continue;

      // Only sync live campaign transactions (Sept 11, 2026 onwards)
      const paidDate = new Date(t.paid_at || t.createdAt);
      const launchDate = new Date('2026-09-11T00:00:00Z');
      if (paidDate < launchDate) continue;

      // Filter out non-raffle dues/levy
      const meta = t.metadata || {};
      if (meta.dues_type || meta.profile_id) continue;

      missing.push(t);
    }

    if (missing.length === 0) {
      return res.status(200).json({
        syncedCount: 0,
        message: 'Everything is up to date! All successful Paystack transactions are recorded in the database.',
      });
    }

    // 3. Process missing transactions
    const results = [];
    for (const t of missing) {
      const mockReq = {
        method: 'POST',
        body: {
          reference: t.reference,
        },
      };

      let resultPayload = null;
      let resStatus = 200;

      const mockRes = {
        status(c) {
          resStatus = c;
          return this;
        },
        json(d) {
          resultPayload = d;
          return this;
        },
      };

      await verifyHandler(mockReq, mockRes).catch((err) => {
        resultPayload = { error: err.message };
      });

      results.push({
        reference: t.reference,
        buyer: t.metadata?.buyer_name || t.customer?.email,
        amount: t.amount / 100,
        status: resStatus,
        result: resultPayload,
      });
    }

    return res.status(200).json({
      syncedCount: results.length,
      message: `Successfully synced ${results.length} missing transaction(s) from Paystack!`,
      details: results,
    });
  } catch (err) {
    console.error('admin-sync-paystack error:', err);
    return res.status(500).json({ error: err.message || 'Sync failed' });
  }
}
