/**
 * Send a notification email via the server-side relay (/send-mail.php).
 * The Elastic Email API key lives on the server only — never in the browser.
 */
export async function sendNotificationEmail({ to, subject, htmlBody, textBody }) {
  try {
    const resp = await fetch('/send-mail.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to,
        subject,
        htmlBody,
        textBody: textBody || htmlBody.replace(/<[^>]*>/g, ''),
      }),
    })
    const result = await resp.json().catch(() => ({}))
    if (resp.ok && result.success) {
      return { success: true }
    }
    console.error('Email relay error:', result.error || resp.status)
    return { success: false, error: result.error || `Email relay failed (${resp.status})` }
  } catch (err) {
    console.error('Email relay fetch error:', err)
    return { success: false, error: err.message }
  }
}

/**
 * Build HTML email for a new contact form submission
 */
export function buildContactEmailHtml({ name, email, company, service, message }) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; background: #0A0A0A; border-radius: 16px; overflow: hidden;">
      <div style="background: #FB5005; padding: 24px 32px;">
        <h1 style="margin: 0; color: #fff; font-size: 20px; font-weight: 700;">New Lead from Stellio</h1>
      </div>
      <div style="padding: 32px; color: #FAFAFA;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #71717A; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; width: 100px;">Name</td><td style="padding: 8px 0; font-size: 15px; color: #FAFAFA;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #71717A; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Email</td><td style="padding: 8px 0; font-size: 15px;"><a href="mailto:${email}" style="color: #FB5005; text-decoration: none;">${email}</a></td></tr>
          ${company ? `<tr><td style="padding: 8px 0; color: #71717A; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Company</td><td style="padding: 8px 0; font-size: 15px; color: #FAFAFA;">${company}</td></tr>` : ''}
          <tr><td style="padding: 8px 0; color: #71717A; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Service</td><td style="padding: 8px 0; font-size: 15px; color: #FAFAFA;">${service}</td></tr>
        </table>
        <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.06);">
          <p style="color: #71717A; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 8px 0;">Message</p>
          <p style="color: #A1A1AA; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
      </div>
      <div style="padding: 16px 32px; background: #0E0E0E; border-top: 1px solid rgba(255,255,255,0.06);">
        <p style="margin: 0; font-size: 12px; color: #71717A;">View all submissions in the <a href="${window.location.origin}/admin" style="color: #FB5005; text-decoration: none;">Admin Panel</a></p>
      </div>
    </div>
  `
}
