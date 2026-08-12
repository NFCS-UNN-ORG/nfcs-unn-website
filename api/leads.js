export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { code } = req.query;
  const adminSecret = process.env.ADMIN_SECRET_KEY || 'eazi_nation_2026';

  if (!code || code !== adminSecret) {
    return res.status(401).json({ error: 'Unauthorized: Invalid administrative passcode' });
  }

  return res.status(200).json({
    success: true,
    leads: []
  });
}
