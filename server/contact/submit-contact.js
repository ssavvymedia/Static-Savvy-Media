// Contact form pipeline, shared by every runtime that serves the form:
//   - api/submit-contact.js          Vercel Function (production)
//   - vite.config.js                 `npm run dev` middleware
//   - netlify/functions/submit-contact.js  `netlify dev` (legacy, local only)
//
// Steps:
//   1. Honeypot check (silent bot rejection)
//   2. reCAPTCHA v2 verification (only enforced once RECAPTCHA_SECRET_KEY is set)
//   3. Server-side field validation (never trust the client)
//   4. Email to the admin inbox via SMTP (nodemailer), visitor set as Reply-To
//
// Environment variables (Vercel: Project > Settings > Environment Variables; locally: .env):
//   SMTP_HOST              SMTP server, e.g. smtp.gmail.com / smtp.zoho.com / smtp-relay.brevo.com
//   SMTP_PORT              587 (STARTTLS) or 465 (SSL). Defaults to 587.
//   SMTP_SECURE            "true" for port 465, otherwise "false"
//   SMTP_USER              SMTP auth username
//   SMTP_PASS              SMTP auth password / app password
//   MAIL_FROM              From address (defaults to SMTP_USER)
//   MAIL_FROM_NAME         From display name (defaults to "Static Savvy Media Website")
//   ADMIN_EMAIL            Inbox that receives enquiries
//   RECAPTCHA_SECRET_KEY   reCAPTCHA v2 secret, pair of VITE_RECAPTCHA_SITE_KEY (client)
// SMTP_HOST, SMTP_USER, SMTP_PASS and ADMIN_EMAIL are required; without them every valid
// submission gets a 502 CONFIG_ERROR response.

import nodemailer from 'nodemailer'
import { buildEnquiryEmail } from './email-template.js'

const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify'
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^[0-9+\-\s()]{7,20}$/

function result(statusCode, body) {
  return { statusCode, body }
}

async function verifyRecaptcha(token, secret, fetchImpl) {
  // No secret configured: skip verification rather than failing every submission
  // (lets the form keep working before reCAPTCHA is set up).
  if (!secret) return { ok: true, skipped: true }
  if (!token) return { ok: false }
  try {
    const params = new URLSearchParams({ secret, response: token })
    const res = await fetchImpl(RECAPTCHA_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    })
    const data = await res.json()
    return { ok: Boolean(data.success) }
  } catch (err) {
    console.error('reCAPTCHA verification error', err)
    return { ok: false }
  }
}

// Reused across warm invocations of the same function instance.
let cachedTransporter = null
function getTransporter(env) {
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS || !env.ADMIN_EMAIL) {
    throw new Error('CONFIG_MISSING_SMTP')
  }
  if (cachedTransporter) return cachedTransporter
  cachedTransporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT) || 587,
    secure: env.SMTP_SECURE === 'true', // true for 465, false for 587/STARTTLS
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
  })
  return cachedTransporter
}

/**
 * Handle one contact-form submission.
 * @param {object} payload parsed JSON body
 * @param {object} [options]
 * @param {object} [options.env] environment (defaults to process.env)
 * @param {object} [options.transporter] nodemailer-compatible transport (tests)
 * @param {Function} [options.fetchImpl] fetch implementation (tests)
 * @returns {Promise<{statusCode: number, body: object}>}
 */
export async function handleContactSubmission(payload, options = {}) {
  const env = options.env || process.env
  const fetchImpl = options.fetchImpl || fetch

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return result(400, { success: false, code: 'INVALID_JSON', message: 'Invalid request payload.' })
  }

  const { name, email, phone, service, message, website, recaptchaToken, sourcePagePath, sourcePageUrl, sourcePageTitle } =
    payload
  // Growth Audit form (GrowthAuditForm.jsx): phone-first, so email and message are optional,
  // consent is required, and the qualifying fields travel in the email as extra rows.
  const isAudit = payload.formType === 'growth_audit'

  // Honeypot: a hidden field real visitors never fill in. Fake a success so bots
  // don't learn the trap exists.
  if (website) {
    return result(200, { success: true, message: 'Thank you. Your request has been received.' })
  }

  const recaptchaResult = await verifyRecaptcha(recaptchaToken, env.RECAPTCHA_SECRET_KEY, fetchImpl)
  if (!recaptchaResult.ok) {
    return result(400, {
      success: false,
      code: 'RECAPTCHA_FAILED',
      message: 'Security verification failed. Please try again.',
    })
  }

  const errors = {}
  const trimmedName = String(name || '').trim()
  const trimmedEmail = String(email || '').trim()
  const trimmedPhone = String(phone || '').trim()
  const trimmedService = String(service || '').trim()
  const trimmedMessage = String(message || '').trim()

  if (trimmedName.length < 2 || trimmedName.length > 100) errors.name = 'Please enter a valid name.'
  if (isAudit ? trimmedEmail && (!EMAIL_REGEX.test(trimmedEmail) || trimmedEmail.length > 150) : !EMAIL_REGEX.test(trimmedEmail) || trimmedEmail.length > 150) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!PHONE_REGEX.test(trimmedPhone)) errors.phone = 'Please enter a valid phone number.'
  if (!isAudit && (trimmedService.length < 2 || trimmedService.length > 100)) errors.service = 'Please select a service.'
  if (isAudit ? trimmedMessage.length > 3000 : trimmedMessage.length < 10 || trimmedMessage.length > 3000) {
    errors.message = 'Message should be between 10 and 3000 characters.'
  }
  const audit = isAudit ? auditFields(payload) : null
  if (isAudit) {
    if (!audit.business) errors.business = 'Please enter your business name.'
    if (!audit.industry) errors.industry = 'Please select your industry.'
    if (!audit.budget) errors.budget = 'Please select a budget range.'
    if (!audit.city) errors.city = 'Please select your city.'
    if (payload.consent !== true) errors.consent = 'Please agree to be contacted about your audit.'
  }

  if (Object.keys(errors).length > 0) {
    return result(400, {
      success: false,
      code: 'VALIDATION_ERROR',
      message: 'Please correct the highlighted fields and try again.',
      errors,
    })
  }

  const submittedAt = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  const { subject, html, text } = buildEnquiryEmail({
    name: trimmedName,
    email: trimmedEmail || 'Not given',
    phone: trimmedPhone,
    service: isAudit ? 'Growth Audit' : trimmedService,
    message: trimmedMessage || (isAudit ? 'Growth Audit request (no message added).' : ''),
    extra: audit ? audit.rows : [],
    formType: isAudit ? 'growth_audit' : 'contact',
    submittedAt,
    sourcePagePath,
    sourcePageUrl,
    sourcePageTitle,
  })

  const mailFrom = env.MAIL_FROM || env.SMTP_USER
  const mailFromName = env.MAIL_FROM_NAME || 'Static Savvy Media Website'

  try {
    const transporter = options.transporter || getTransporter(env)
    await transporter.sendMail({
      from: `"${mailFromName}" <${mailFrom}>`,
      to: env.ADMIN_EMAIL,
      ...(trimmedEmail ? { replyTo: trimmedEmail } : {}),
      subject,
      text,
      html,
    })
  } catch (err) {
    console.error('SMTP send error', err)
    const code = err.message === 'CONFIG_MISSING_SMTP' ? 'CONFIG_ERROR' : 'EMAIL_SEND_ERROR'
    return result(502, {
      success: false,
      code,
      message:
        'Your details were verified but the notification email could not be sent. Please try again or contact us directly.',
    })
  }

  return result(200, {
    success: true,
    message: 'Thank you. Your request has been received — our team will get back to you shortly.',
  })
}

const clip = (v, max = 200) => String(v ?? '').trim().slice(0, max)

// Qualifying + attribution fields sent by the Growth Audit form. Everything is optional except
// the four checked above; values are clipped so a crafted payload cannot bloat the email.
function auditFields(p) {
  const f = {
    business: clip(p.business, 150),
    siteUrl: clip(p.siteUrl, 300),
    industry: clip(p.industry, 80),
    budget: clip(p.budget, 80),
    city: clip(p.city, 80),
  }
  const utm = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid']
    .map((k) => [k, clip(p[k], 150)])
    .filter(([, v]) => v)
  const rows = [
    ['Business', f.business],
    ['Website / GBP', f.siteUrl || 'Not given'],
    ['Industry', f.industry],
    ['Budget', f.budget],
    ['City', f.city],
    ['Consent', p.consent === true ? 'Yes, agreed to be contacted' : 'No'],
    ['Form', clip(p.formId, 60) || 'growth_audit'],
    ['Landing page', clip(p.landingPage, 300) || 'Not captured'],
    ['Referrer', clip(p.referrer, 300) || 'Direct / none'],
    ...utm.map(([k, v]) => [k, v]),
  ]
  return { ...f, rows }
}

// Parses a raw JSON request body. Returns undefined for invalid JSON.
export function parseJsonBody(raw) {
  if (raw === undefined || raw === null || raw === '') return {}
  if (typeof raw === 'object' && !Buffer.isBuffer(raw)) return raw
  try {
    return JSON.parse(Buffer.isBuffer(raw) ? raw.toString('utf8') : String(raw))
  } catch {
    return undefined
  }
}
