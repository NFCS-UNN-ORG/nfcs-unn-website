// GET or POST /api/admin-email-diagnostics
// Header: x-admin-secret: <ADMIN_SECRET> or Query: ?secret=<ADMIN_SECRET>

export default async function handler(req, res) {
  const querySecret = req.query?.secret || '';
  const headerSecret = req.headers['x-admin-secret'] || '';
  const clientSecret = (headerSecret || querySecret).trim();
  const serverSecret = (process.env.ADMIN_SECRET || '').trim();

  // Basic security check (flexible to whitespace)
  if (!clientSecret || !serverSecret || clientSecret !== serverSecret) {
    return res.status(401).json({
      error: 'Unauthorized: Invalid Admin Secret',
      has_server_secret: !!serverSecret,
    });
  }

  const apiKey = process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.trim() : null;
  const fromEmail = process.env.RESEND_FROM_EMAIL ? process.env.RESEND_FROM_EMAIL.trim() : null;

  const diagnostics = {
    resend_api_key_configured: !!apiKey,
    resend_api_key_preview: apiKey ? `${apiKey.slice(0, 7)}...${apiKey.slice(-4)}` : null,
    resend_from_email: fromEmail || 'tickets@resend.dev (DEFAULT TEST SENDER)',
    resend_domain_mode: fromEmail && !fromEmail.includes('resend.dev') ? 'CUSTOM_DOMAIN' : 'TEST_SANDBOX_RESEND_DEV',
  };

  if (!apiKey) {
    return res.status(200).json({
      status: 'ERROR_NO_API_KEY',
      message: 'RESEND_API_KEY is completely missing in Vercel environment variables.',
      diagnostics,
    });
  }

  // 1. Check API Key validity & Resend account domains
  try {
    const domainRes = await fetch('https://api.resend.com/domains', {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    const domainData = await domainRes.json().catch(() => ({}));

    diagnostics.resend_domains_http_status = domainRes.status;
    diagnostics.resend_domains_response = domainData;

    // 2. If test email requested in query or body
    const testTo = req.query?.test_to || req.body?.test_to;
    if (testTo) {
      const sendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail || 'tickets@resend.dev',
          to: [testTo],
          subject: '🧪 NFCS UNN Raffle — Email Test Ping',
          html: '<p>This is a diagnostic test email from NFCS UNN Website.</p>',
        }),
      });

      const sendData = await sendRes.json().catch(() => ({}));
      diagnostics.test_send = {
        recipient: testTo,
        status: sendRes.status,
        response: sendData,
      };
    }

    return res.status(200).json({
      status: domainRes.ok ? 'KEY_VALID' : 'KEY_OR_DOMAIN_ERROR',
      diagnostics,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'EXCEPTION',
      error: err.message,
      diagnostics,
    });
  }
}
