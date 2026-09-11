// POST /api/admin-verify
// Body: { secret }
//
// Verifies whether the provided secret matches ADMIN_SECRET in server environment variables.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { secret } = req.body || {};
  const serverSecret = process.env.ADMIN_SECRET;

  if (!serverSecret) {
    console.error('ADMIN_SECRET environment variable is not configured on the server.');
    return res.status(500).json({ error: 'Admin configuration missing on server' });
  }

  if (typeof secret === 'string' && secret.trim() === serverSecret.trim()) {
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ error: 'Incorrect admin passcode. Access denied.' });
}
