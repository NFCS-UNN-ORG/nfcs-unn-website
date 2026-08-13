import { saveLead } from './_store.js';

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

  // Persist lead to store
  const updatedLeads = await saveLead(lead);

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
          from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
          to: [lead.email],
          subject: '🎉 Your Seat is Reserved! NFCS UNN Email Marketing Training',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #ffffff; color: #0f172a; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
              <h2 style="color: #6d28d9; margin-top: 0; font-size: 22px; font-weight: bold;">🎉 Registration Confirmed!</h2>
              <p style="font-size: 15px; line-height: 1.5; color: #334155;">Hi <strong>${lead.name}</strong>,</p>
              <p style="font-size: 15px; line-height: 1.5; color: #334155;">Your seat for the <strong>3-Day Live Email Marketing Training</strong> (hosted by NFCS UNN & EaziNation) has been successfully reserved.</p>
              
              <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; margin: 24px 0; color: #1e293b;">
                <p style="margin: 6px 0; font-size: 14.5px;">📅 <strong>Date:</strong> August 24 – 26, 2026</p>
                <p style="margin: 6px 0; font-size: 14.5px;">⏰ <strong>Time:</strong> 8:00 PM – 10:00 PM (WAT)</p>
                <p style="margin: 6px 0; font-size: 14.5px;">📍 <strong>Venue:</strong> Online Live (Meeting links posted in WhatsApp Group)</p>
              </div>

              <p style="margin-bottom: 20px; font-size: 15px; color: #334155;">Tap the button below right now to join the official WhatsApp Group for live session links & class materials:</p>
              
              <div style="text-align: center; margin: 28px 0;">
                <a href="https://chat.whatsapp.com/FcCT3vtLEcqHRtMAYYQhfz" target="_blank" style="display: inline-block; background: #25d366; color: #ffffff; font-weight: bold; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-size: 15px; box-shadow: 0 4px 10px rgba(37,211,102,0.3);">Join Official WhatsApp Group →</a>
              </div>

              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
              <p style="font-size: 12px; color: #64748b; text-align: center; margin: 0;">Organized by EaziNation (Digital Skills Trainer) & NFCS UNN.</p>
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
    count: updatedLeads.length,
    emailSent: emailSent,
    emailStatus: emailError ? `Error: ${emailError}` : 'Sent successfully',
    message: 'Registration recorded successfully'
  });
}
