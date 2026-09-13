// GET /api/referral-lookup?phone=<promoter_phone>
// Allows existing ticket buyers to look up their referral link,
// check how many friends have bought using their link, and see their free bonus ticket progress!

import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error('Supabase configuration missing');
  }
  return createClient(url, key);
}

const UNIT_PRICE = 200;
const REFERRAL_MILESTONE = 10;

function normalizePhone(phone) {
  if (!phone || typeof phone !== 'string') return '';
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('2340')) {
    digits = digits.slice(3); // e.g. +234080... -> 080...
  } else if (digits.startsWith('234') && digits.length >= 13) {
    digits = '0' + digits.slice(3);
  } else if (digits.length === 10) {
    digits = '0' + digits;
  }
  return digits;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rawPhone = req.query?.phone || '';
  if (!rawPhone || typeof rawPhone !== 'string') {
    return res.status(400).json({ error: 'Please provide a valid phone number' });
  }

  const cleanPhone = rawPhone.trim();
  const digits = normalizePhone(cleanPhone);
  if (digits.length < 8) {
    return res.status(400).json({ error: 'Phone number is too short' });
  }

  const last10 = digits.slice(-10);

  try {
    const supabase = getSupabase();

    // 1. Check if this phone has an existing successful purchase (Option 1 requirement)
    const { data: buyerOrder, error: buyerErr } = await supabase
      .from('raffle_orders')
      .select('buyer_name, buyer_phone, created_at')
      .or(`buyer_phone.eq.${cleanPhone},buyer_phone.ilike.%${last10}%`)
      .eq('payment_status', 'success')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (buyerErr) throw buyerErr;

    if (!buyerOrder) {
      return res.status(200).json({
        found: false,
        message: 'No ticket purchase found for this phone number. You need to buy at least 1 ticket to activate your promoter link!',
      });
    }

    const officialPhone = normalizePhone(buyerOrder.buyer_phone) || normalizePhone(cleanPhone);

    // 2. Count paid tickets referred by this promoter
    const { data: referredOrders, error: refErr } = await supabase
      .from('raffle_orders')
      .select('quantity, total_amount')
      .or(`referred_by.eq.${officialPhone},referred_by.ilike.%${last10}%`)
      .eq('payment_status', 'success');

    if (refErr) {
      // If referred_by column doesn't exist yet, gracefully return 0
      console.warn('Referred orders query fallback:', refErr.message);
    }

    const totalReferredTickets = (referredOrders || []).reduce((sum, o) => {
      const paid = Math.floor((Number(o.total_amount) || 0) / UNIT_PRICE);
      return sum + Math.max(paid, 0);
    }, 0);

    // 3. Count bonus tickets awarded
    const { data: bonusOrders } = await supabase
      .from('raffle_orders')
      .select('quantity')
      .or(`buyer_phone.eq.${officialPhone},buyer_phone.ilike.%${last10}%`)
      .eq('channel', 'referral_bonus')
      .eq('payment_status', 'success');

    const bonusTicketsAwarded = (bonusOrders || []).reduce(
      (sum, o) => sum + (o.quantity || 0),
      0
    );

    const progress = totalReferredTickets % REFERRAL_MILESTONE;
    const neededForNext = progress === 0 && totalReferredTickets === 0 ? 10 : 10 - progress;

    return res.status(200).json({
      found: true,
      buyer_name: buyerOrder.buyer_name,
      buyer_phone: officialPhone,
      phone: officialPhone,
      total_referred_tickets: totalReferredTickets,
      bonus_tickets_awarded: bonusTicketsAwarded,
      progress_in_current_cycle: progress,
      progress_in_current_milestone: progress,
      tickets_needed_for_next: neededForNext,
      referral_code: officialPhone,
      referral_url: `/raffle-draw?ref=${encodeURIComponent(officialPhone)}`,
    });
  } catch (err) {
    console.error('referral-lookup error:', err);
    return res.status(500).json({ error: 'Could not lookup referral status. Please try again.' });
  }
}
