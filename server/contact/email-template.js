// Shared HTML/text email template for the contact-form notification.
// Imported by server/contact/submit-contact.js, which backs api/submit-contact.js (Vercel),
// the `npm run dev` middleware in vite.config.js and netlify/functions (`netlify dev`), so they
// can never drift out of sync.

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

const SITE_URL = 'https://www.staticsavvymedia.com'

// Friendly label for a route path, so the email reads "Contact Page" instead
// of a raw "/contact/". Falls back to the raw path for anything not listed.
const PAGE_LABELS = {
  '/': 'Home Page',
  '/contact': 'Contact Page',
  '/contact/': 'Contact Page',
}

function pageLabel(path) {
  if (!path) return 'Unknown Page'
  return PAGE_LABELS[path] || path
}

export function buildEnquiryEmail({
  name,
  email,
  phone,
  service,
  message,
  submittedAt,
  sourcePagePath,
  sourcePageUrl,
  sourcePageTitle,
}) {
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safePhone = escapeHtml(phone)
  const safeService = escapeHtml(service)
  const safeMessageHtml = escapeHtml(message).replace(/\n/g, '<br/>')
  const whatsappDigits = String(phone || '').replace(/[^0-9]/g, '')
  const whatsappHref = whatsappDigits
    ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(`Hi ${name}, thanks for reaching out to Static Savvy Media`)}`
    : null
  const safePageTitle = escapeHtml((sourcePageTitle || '').replace(/\s*[|—-]\s*Static Savvy Media.*$/i, '').trim())
  const pageUrl = sourcePageUrl || (sourcePagePath ? `${SITE_URL}${sourcePagePath}` : SITE_URL)
  const safePageUrl = escapeHtml(pageUrl)
  const safePageLabel = escapeHtml(pageLabel(sourcePagePath))

  const ICONS = {
    Name: '\u{1F464}',
    Email: '\u{2709}\u{FE0F}',
    Phone: '\u{1F4F1}',
    Service: '\u{1F6E0}\u{FE0F}',
    Message: '\u{1F4AC}',
    Submitted: '\u{1F550}',
  }

  const row = (label, valueHtml) => `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid #eef0f6;vertical-align:top;width:130px;">
        <span style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#8b8fa3;white-space:nowrap;">${ICONS[label] ? `${ICONS[label]} ` : ''}${label}</span>
      </td>
      <td style="padding:14px 0;border-bottom:1px solid #eef0f6;vertical-align:top;">
        <span style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#1a1d29;line-height:1.5;">${valueHtml}</span>
      </td>
    </tr>`

  const html = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Website Enquiry</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f2f3f8;">
    <span style="display:none;font-size:1px;color:#f2f3f8;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
      New enquiry from ${safeName} via ${safePageLabel} &mdash; ${safeService}
    </span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f3f8;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(20,20,43,0.08);">

            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg,#8b5cf6 0%,#7c3aed 45%,#db2777 100%);background-color:#8b5cf6;padding:28px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
                      <div style="font-size:13px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;opacity:.85;margin-bottom:6px;">Static Savvy Media</div>
                      <div style="font-size:22px;font-weight:800;">New Website Enquiry</div>
                    </td>
                    <td align="right" style="vertical-align:top;">
                      <span style="display:inline-block;background:rgba(255,255,255,0.18);color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;padding:6px 12px;border-radius:999px;">New Lead</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Source page banner -->
            <tr>
              <td style="padding:18px 32px;background-color:#f6f2ff;border-bottom:1px solid #ece4fb;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-family:Arial,Helvetica,sans-serif;">
                      <span style="font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#7c3aed;">Submitted from</span><br/>
                      <a href="${safePageUrl}" style="font-size:14px;font-weight:700;color:#1a1d29;text-decoration:none;">${safePageLabel}${safePageTitle ? ` &mdash; ${safePageTitle}` : ''}</a><br/>
                      <span style="font-size:12px;color:#6b6f80;word-break:break-all;">${safePageUrl}</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:8px 32px 28px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${row('Name', safeName)}
                  ${row('Email', `<a href="mailto:${safeEmail}" style="color:#7c3aed;text-decoration:none;font-weight:600;">${safeEmail}</a>`)}
                  ${row('Phone', `<a href="tel:${safePhone.replace(/[^0-9+]/g, '')}" style="color:#7c3aed;text-decoration:none;font-weight:600;">${safePhone}</a>`)}
                  ${row('Service', `<span style="display:inline-block;background:#eef2ff;color:#4338ca;font-weight:700;padding:4px 10px;border-radius:999px;font-size:13px;">${safeService}</span>`)}
                  ${row('Message', safeMessageHtml)}
                  ${row('Submitted', `${escapeHtml(submittedAt)} IST`)}
                </table>
              </td>
            </tr>

            <!-- CTA -->
            <tr>
              <td style="padding:0 32px 32px 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                  <td style="padding-right:12px;">
                    <a href="mailto:${safeEmail}?subject=Re: Your enquiry to Static Savvy Media"
                       style="display:inline-block;background:linear-gradient(135deg,#8b5cf6,#db2777);background-color:#8b5cf6;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;text-decoration:none;padding:12px 24px;border-radius:999px;">
                      Email ${safeName.split(' ')[0] || 'Lead'}
                    </a>
                  </td>${whatsappHref ? `
                  <td>
                    <a href="${whatsappHref}"
                       style="display:inline-block;background:#25d366;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;text-decoration:none;padding:12px 24px;border-radius:999px;">
                      WhatsApp ${safeName.split(' ')[0] || 'Lead'}
                    </a>
                  </td>` : ''}
                </tr></table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:18px 32px;background-color:#faf9fc;border-top:1px solid #eef0f6;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#9a9dab;line-height:1.6;">
                  Automated notification from the Static Savvy Media website contact form.
                  This is a lead notification, not a reply-checked inbox &mdash; reply directly to the sender above.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`.trim()

  const text = `NEW WEBSITE ENQUIRY — Static Savvy Media
${'='.repeat(42)}

Submitted from: ${pageLabel(sourcePagePath)}${safePageTitle ? ` — ${sourcePageTitle}` : ''}
Page URL: ${pageUrl}

Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}

Message:
${message}

Submitted: ${submittedAt} IST`

  return {
    subject: `New Enquiry: ${service} — ${name} (via ${pageLabel(sourcePagePath)})`,
    html,
    text,
  }
}
