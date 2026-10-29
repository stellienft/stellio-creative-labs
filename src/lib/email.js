import { supabase } from '../lib/supabase'

/**
 * Send a notification email via Elastic Email API
 * Reads API credentials from site_settings in Supabase
 */
export async function sendNotificationEmail({ to, subject, htmlBody, textBody }) {
  // Fetch email settings from Supabase
  const { data, error } = await supabase
    .from('site_settings')
    .select('key,value')
    .in('key', ['elastic_email_api_key', 'elastic_email_from', 'elastic_email_from_name', 'elastic_mail_api_key', 'elastic_mail_from_email', 'elastic_mail_from_name'])

  if (error || !data) {
    console.error('Failed to fetch email settings:', error)
    return { success: false, error: 'Email settings not configured' }
  }

  const settings = {}
  data.forEach(row => { settings[row.key] = row.value })

  // Support both old (elastic_mail_*) and new (elastic_email_*) key naming
  const apiKey = settings.elastic_email_api_key || settings.elastic_mail_api_key
  if (!apiKey) {
    console.warn('Elastic Email API key not set - skipping email notification')
    return { success: false, error: 'Elastic Email API key not configured in admin settings' }
  }

  const from = settings.elastic_email_from || settings.elastic_mail_from_email || 'hello@stellio.com.au'
  const fromName = settings.elastic_email_from_name || settings.elastic_mail_from_name || 'Stellio Creative Labs'

  const formData = new URLSearchParams()
  formData.append('apikey', apiKey)
  formData.append('from', from)
  formData.append('fromName', fromName)
  formData.append('to', to)
  formData.append('subject', subject)
  formData.append('bodyHtml', htmlBody)
  formData.append('bodyText', textBody || htmlBody.replace(/<[^>]*>/g, ''))
  formData.append('isTransactional', 'true')

  try {
    const resp = await fetch('https://api.elasticemail.com/v2/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    })
    const result = await resp.json()
    if (result.success) {
      return { success: true }
    } else {
      console.error('Elastic Email error:', result.error)
      return { success: false, error: result.error }
    }
  } catch (err) {
    console.error('Elastic Email fetch error:', err)
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
