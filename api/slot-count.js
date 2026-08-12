import { getSlotCount } from './_store.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const count = getSlotCount();
  const TOTAL_SLOTS = 100;
  const remaining = Math.max(TOTAL_SLOTS - count, 0);

  return res.status(200).json({
    success: true,
    count: count,
    remaining: remaining,
    total: TOTAL_SLOTS
  });
}
