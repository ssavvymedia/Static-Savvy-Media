// Netlify Serverless Function: submit-contact
//
// Single source of truth for the contact form pipeline:
//   1. Honeypot check (silent bot rejection)
//   2. Server-side field validation (never trust the client)
//   3. Email dispatch to the admin inbox via SMTP (nodemailer), with the
//      visitor set as Reply-To so the admin can respond directly.
//
// Required environment variables (set in Netlify Site Configuration ->
// Environment Variables, and locally in .env):
//   SMTP_HOST              e.g. smtp.zoho.com / smtp.gmail.com / smtp-relay.brevo.com
//   SMTP_PORT              e.g. 587 (STARTTLS) or 465 (SSL)
//   SMTP_SECURE            "true" for port 465, "false" for port 587
//   SMTP_USER              SMTP auth username
//   SMTP_PASS              SMTP auth password / app password
//   MAIL_FROM              From address (often same as SMTP_USER)
//   MAIL_FROM_NAME         Display name for the From header
//   ADMIN_EMAIL            Where enquiries are delivered
//   RECAPTCHA_SECRET_KEY   Google reCAPTCHA v2 secret key (server-side verification).
//                          Pair of the VITE_RECAPTCHA_SITE_KEY used on the client.

import nodemailer from 'nodemailer'
import { buildEnquiryEmail } from './_email-template.js'

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY
const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify'

async function verifyRecaptcha(token) {
  // If no secret key is configured, skip verification rather than hard-failing
  // every submission (lets the form keep working before reCAPTCHA is set up).
  if (!RECAPTCHA_SECRET_KEY) return { ok: true, skipped: true }
  if (!token) return { ok: false }

  try {
    const params = new URLSearchParams({ secret: RECAPTCHA_SECRET_KEY, response: token })
    const res = await fetch(RECAPTCHA_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    })
    const data = await res.json()
    return { ok: Boolean(data.success), score: data.score }
  } catch (err) {
    console.error('reCAPTCHA verification error', err)
    return { ok: false }
  }
}

const SMTP_HOST = process.env.SMTP_HOST
const SMTP_PORT = process.env.SMTP_PORT
const SMTP_SECURE = process.env.SMTP_SECURE === 'true'
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASS = process.env.SMTP_PASS
const MAIL_FROM = process.env.MAIL_FROM || SMTP_USER
const MAIL_FROM_NAME = process.env.MAIL_FROM_NAME || 'Static Savvy Media Website'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL

const JSON_HEADERS = { 'Content-Type': 'application/json' }

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^[0-9+\-\s()]{7,20}$/

function jsonResponse(statusCode, payload) {
  return { statusCode, headers: JSON_HEADERS, body: JSON.stringify(payload) }
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Reused across warm invocations of the same function instance.
let cachedTransporter = null
function getTransporter() {
  if (cachedTransporter) return cachedTransporter

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !ADMIN_EMAIL) {
    throw new Error('CONFIG_MISSING_SMTP')
  }

  cachedTransporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: SMTP_SECURE, // true for port 465, false for port 587/STARTTLS
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  return cachedTransporter
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { success: false, code: 'METHOD_NOT_ALLOWED', message: 'Method Not Allowed' })
  }

  let payload
  try {
    payload = JSON.parse(event.body || '{}')
  } catch {
    return jsonResponse(400, { success: false, code: 'INVALID_JSON', message: 'Invalid request payload.' })
  }

  const { name, email, phone, service, message, website, recaptchaToken, sourcePagePath, sourcePageUrl, sourcePageTitle } = payload

  // --- Honeypot: a hidden field real visitors never fill in. ---
  // Bots that auto-fill every input trip this. Respond with a fake success
  // so scrapers don't learn the trap exists.
  if (website) {
    return jsonResponse(200, {
      success: true,
      message: 'Thank you. Your request has been received.',
    })
  }

  // --- reCAPTCHA verification (only enforced once RECAPTCHA_SECRET_KEY is set) ---
  const recaptchaResult = await verifyRecaptcha(recaptchaToken)
  if (!recaptchaResult.ok) {
    return jsonResponse(400, {
      success: false,
      code: 'RECAPTCHA_FAILED',
      message: 'Security verification failed. Please try again.',
    })
  }

  // --- Server-side validation (client-side checks can be bypassed) ---
  const errors = {}
  const trimmedName = String(name || '').trim()
  const trimmedEmail = String(email || '').trim()
  const trimmedPhone = String(phone || '').trim()
  const trimmedService = String(service || '').trim()
  const trimmedMessage = String(message || '').trim()

  if (trimmedName.length < 2 || trimmedName.length > 100) {
    errors.name = 'Please enter a valid name.'
  }
  if (!EMAIL_REGEX.test(trimmedEmail) || trimmedEmail.length > 150) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!PHONE_REGEX.test(trimmedPhone)) {
    errors.phone = 'Please enter a valid phone number.'
  }
  if (trimmedService.length < 2 || trimmedService.length > 100) {
    errors.service = 'Please select a service.'
  }
  if (trimmedMessage.length < 10 || trimmedMessage.length > 3000) {
    errors.message = 'Message should be between 10 and 3000 characters.'
  }

  if (Object.keys(errors).length > 0) {
    return jsonResponse(400, {
      success: false,
      code: 'VALIDATION_ERROR',
      message: 'Please correct the highlighted fields and try again.',
      errors,
    })
  }

  // --- Compose and send the admin notification email ---
  const submittedAt = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  const { subject, html: htmlBody, text: textBody } = buildEnquiryEmail({
    name: trimmedName,
    email: trimmedEmail,
    phone: trimmedPhone,
    service: trimmedService,
    message: trimmedMessage,
    submittedAt,
    sourcePagePath,
    sourcePageUrl,
    sourcePageTitle,
  })

  try {
    const transporter = getTransporter()
    await transporter.sendMail({
      from: `"${MAIL_FROM_NAME}" <${MAIL_FROM}>`,
      to: ADMIN_EMAIL,
      replyTo: trimmedEmail,
      subject,
      text: textBody,
      html: htmlBody,
    })
  } catch (err) {
    console.error('SMTP send error', err)
    const code = err.message === 'CONFIG_MISSING_SMTP' ? 'CONFIG_ERROR' : 'EMAIL_SEND_ERROR'
    return jsonResponse(502, {
      success: false,
      code,
      message:
        'Your details were verified but the notification email could not be sent. Please try again or contact us directly.',
    })
  }

  return jsonResponse(200, {
    success: true,
    message: 'Thank you. Your request has been received — our team will get back to you shortly.',
  })
}
