import { getLeads, deleteLead } from './_store.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const body = req.body || {};
  const query = req.query || {};
  const code = body.code || query.code;
  const idKey = body.idKey || query.idKey;
  const action = body.action || query.action;

  const adminSecret = process.env.ADMIN_SECRET_KEY || 'eazi_nation_2026';

  if (!code || code !== adminSecret) {
    return res.status(401).json({ error: 'Unauthorized: Invalid administrative passcode' });
  }

  if (req.method === 'DELETE' || (req.method === 'POST' && action === 'delete')) {
    if (!idKey) {
      return res.status(400).json({ error: 'Missing lead identifier to delete' });
    }
    const updatedLeads = await deleteLead(idKey);
    return res.status(200).json({
      success: true,
      message: 'Lead deleted successfully',
      count: updatedLeads.length,
      leads: updatedLeads
    });
  }

  const leads = await getLeads();

  return res.status(200).json({
    success: true,
    count: leads.length,
    leads: leads
  });
}
