exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Parse application/x-www-form-urlencoded body
  const params  = new URLSearchParams(event.body);
  const name    = (params.get('name')    || '').trim();
  const email   = (params.get('email')   || '').trim();
  const subject = (params.get('subject') || '').trim();
  const seminar = (params.get('seminar') || '').trim();
  const message = (params.get('message') || '').trim();
  const gotcha  =  params.get('_gotcha') || '';

  // Honeypot — silent pass for bots
  if (gotcha) {
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  }

  // Basic server-side validation
  if (!name || !email || !message) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
  }

  const seminarLabel  = seminar || subject || null;
  const emailSubject  = seminarLabel
    ? `Neue Kursanfrage: ${seminarLabel}`
    : `Neue Kontaktanfrage von ${name}`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type':  'application/json',
    },
    body: JSON.stringify({
      from:     process.env.RESEND_FROM || 'ImmoWert Campus <noreply@immowert-campus.de>',
      to:      [process.env.RESEND_TO   || 'info@immowert-campus.de'],
      reply_to: email,
      subject:  emailSubject,
      html:     buildEmail({ name, email, seminar: seminarLabel, message }),
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Resend error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Email delivery failed' }) };
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};

// ---------------------------------------------------------------------------
// HTML Email Template
// ---------------------------------------------------------------------------

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildEmail({ name, email, seminar, message }) {
  const seminarRow = seminar ? `
              <tr>
                <td style="padding:24px 0;border-bottom:1px solid #f0f0f4;">
                  <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#bbb;">Seminar</p>
                  <span style="display:inline-block;background:#fdf0f5;color:#c0185a;font-size:13px;font-weight:600;padding:6px 16px;border-radius:20px;border:1px solid #f0c8d8;">${esc(seminar)}</span>
                </td>
              </tr>` : '';

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Neue Kursanfrage – ImmoWert Campus</title>
</head>
<body style="margin:0;padding:0;background:#f0f0f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f0f0f4;padding:48px 20px;">
    <tr>
      <td align="center">
        <table width="580" cellpadding="0" cellspacing="0" role="presentation" style="max-width:580px;width:100%;">

          <!-- ── Header ── -->
          <tr>
            <td style="background:linear-gradient(135deg,#b01458 0%,#e03578 100%);border-radius:16px 16px 0 0;padding:40px 48px 36px;text-align:center;">
              <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,0.6);">ImmoWert Campus</p>
              <h1 style="margin:10px 0 0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">Neue Kursanfrage</h1>
            </td>
          </tr>

          <!-- ── Body ── -->
          <tr>
            <td style="background:#ffffff;padding:44px 48px 40px;border-left:1px solid #e4e4ea;border-right:1px solid #e4e4ea;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">

                <!-- Name -->
                <tr>
                  <td style="padding-bottom:24px;border-bottom:1px solid #f0f0f4;">
                    <p style="margin:0 0 5px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#bbb;">Name</p>
                    <p style="margin:0;font-size:18px;font-weight:600;color:#111;">${esc(name)}</p>
                  </td>
                </tr>

                <!-- E-Mail -->
                <tr>
                  <td style="padding:24px 0;border-bottom:1px solid #f0f0f4;">
                    <p style="margin:0 0 5px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#bbb;">E-Mail</p>
                    <p style="margin:0;font-size:16px;">
                      <a href="mailto:${esc(email)}" style="color:#c0185a;text-decoration:none;font-weight:500;">${esc(email)}</a>
                    </p>
                  </td>
                </tr>

                ${seminarRow}

                <!-- Nachricht -->
                <tr>
                  <td style="padding-top:24px;">
                    <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#bbb;">Nachricht</p>
                    <p style="margin:0;font-size:15px;color:#333;line-height:1.75;white-space:pre-wrap;">${esc(message)}</p>
                  </td>
                </tr>

              </table>

              <!-- Reply CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:36px;padding-top:28px;border-top:1px solid #f0f0f4;">
                <tr>
                  <td>
                    <a href="mailto:${esc(email)}?subject=Re%3A%20Ihre%20Anfrage%20bei%20ImmoWert%20Campus"
                       style="display:inline-block;background:#c0185a;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:14px 28px;border-radius:8px;letter-spacing:0.2px;">
                      Direkt antworten →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td style="background:#f8f8fa;border:1px solid #e4e4ea;border-top:none;border-radius:0 0 16px 16px;padding:20px 48px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#999;line-height:1.6;">
                Gesendet über das Kontaktformular auf
                <a href="https://immowert-campus.de" style="color:#c0185a;text-decoration:none;">immowert-campus.de</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
