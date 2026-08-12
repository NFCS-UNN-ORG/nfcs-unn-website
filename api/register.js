export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const lead = req.body;
  if (!lead || !lead.name || !lead.email || !lead.phone) {
    return res.status(400).json({ error: 'Missing required registration fields' });
  }

  let emailSent = false;
  let emailError = null;

  // Automated Confirmation Email via Resend API
  if (process.env.RESEND_API_KEY) {
    try {
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY.trim()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'onboarding@resend.dev',
          to: [lead.email],
          subject: '🎉 Your Seat is Reserved! NFCS UNN Email Marketing Training',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #090714; color: #ffffff; border-radius: 16px;">
              <h2 style="color: #9d6bff; margin-top: 0;">Registration Confirmed!</h2>
              <p>Hi <strong>${lead.name}</strong>,</p>
              <p>Your seat for the <strong>3-Day Live Email Marketing Training</strong> (hosted by NFCS UNN & EaziNation) has been successfully reserved.</p>
              
              <div style="background: #15112b; padding: 18px; border-radius: 12px; border: 1px solid rgba(124, 77, 255, 0.3); margin: 20px 0;">
                <p style="margin: 6px 0;">📅 <strong>Date:</strong> August 24 – 26, 2026</p>
                <p style="margin: 6px 0;">⏰ <strong>Time:</strong> 8:00 PM – 10:00 PM (WAT)</p>
                <p style="margin: 6px 0;">📍 <strong>Venue:</strong> Online Live (Meeting links in WhatsApp Group)</p>
              </div>

              <p style="margin-bottom: 24px;">Tap below to join the official WhatsApp Group for live session links & class materials:</p>
              <a href="https://chat.whatsapp.com/KtTHtgY94PfI6XXR7NKKNt?s=em&p=a&ilr=0" target="_blank" style="display: inline-block; background: #25d366; color: #ffffff; font-weight: bold; text-decoration: none; padding: 14px 24px; border-radius: 12px;">Join Official WhatsApp Group →</a>

              <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 30px 0;" />
              <p style="font-size: 12px; color: #94a3b8;">Organized by EaziNation (Digital Skills Trainer) & NFCS UNN.</p>
            </div>
          `
        })
      });

      const responseData = await emailRes.json();
      if (emailRes.ok) {
        emailSent = true;
      } else {
        emailError = responseData.message || JSON.stringify(responseData);
        console.warn('Resend API error response:', responseData);
      }
    } catch (err) {
      emailError = err.message;
      console.warn('Resend email dispatch exception:', err);
    }
  } else {
    emailError = 'RESEND_API_KEY environment variable missing in Vercel settings.';
  }

  return res.status(200).json({
    success: true,
    emailSent: emailSent,
    emailStatus: emailError ? `Error: ${emailError}` : 'Sent successfully',
    message: 'Registration recorded successfully'
  });
}
