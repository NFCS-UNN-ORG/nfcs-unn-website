import { getLeads, deleteLead } from './_store.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { code, idKey, action } = req.method === 'POST' ? req.body : req.query;
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
      leads: updatedLeads
    });
  }

  const leads = await getLeads();

  return res.status(200).json({
    success: true,
    leads: leads
  });
}
