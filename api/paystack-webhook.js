// POST /api/paystack-webhook
//
// Receives real-time payment notifications directly from Paystack (e.g. charge.success).
// This guarantees that even if a mobile customer closes their browser tab
// after paying via Bank Transfer / OPay / USSD / Card, their tickets are
// automatically issued, recorded in Supabase, and delivered to their email.

import crypto from 'crypto';
import verifyHandler from './verify-paystack.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
  if (!paystackSecret) {
    return res.status(500).json({ error: 'Paystack secret key missing on server' });
  }

  // 1. Verify Paystack HMAC SHA512 signature if header is present
  const signature = req.headers['x-paystack-signature'];
  if (signature) {
    const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    const hash = crypto.createHmac('sha512', paystackSecret).update(rawBody).digest('hex');
    if (hash !== signature) {
      console.warn('Invalid Paystack webhook signature');
      return res.status(400).json({ error: 'Invalid signature' });
    }
  }

  const event = req.body || {};

  // 2. Only process successful charge events
  if (event.event !== 'charge.success') {
    return res.status(200).json({ received: true, ignored: `Event '${event.event}' not handled` });
  }

  const data = event.data || {};
  const reference = (data.reference || '').trim();

  if (!reference) {
    return res.status(400).json({ error: 'Missing reference in event data' });
  }

  // 3. Skip non-raffle transactions (e.g. membership dues/levy on the same account)
  const meta = data.metadata || {};
  if (meta.dues_type || meta.profile_id) {
    return res.status(200).json({ received: true, ignored: 'Non-raffle portal dues payment' });
  }

  // 4. Delegate to verify-paystack handler to issue tickets, record order, and email buyer
  try {
    const mockReq = {
      method: 'POST',
      body: {
        reference,
        quantity: meta.quantity,
        buyer_name: meta.buyer_name,
        buyer_phone: meta.buyer_phone,
        buyer_email: meta.buyer_email || data.customer?.email,
        department: meta.department,
        referred_by: meta.referred_by || meta.referrer || null,
      },
    };

    let resultPayload = null;
    let resStatus = 200;

    const mockRes = {
      status(code) {
        resStatus = code;
        return this;
      },
      json(payload) {
        resultPayload = payload;
        return this;
      },
    };

    await verifyHandler(mockReq, mockRes);

    return res.status(200).json({
      received: true,
      processed: true,
      reference,
      status: resStatus,
      result: resultPayload,
    });
  } catch (err) {
    console.error(`Webhook processing error for ref ${reference}:`, err);
    // Still return 200 so Paystack does not endlessly retry
    return res.status(200).json({ received: true, error: err.message });
  }
}
