import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import nodemailer from 'nodemailer'
import { buildEnquiryEmail } from './netlify/functions/_email-template.js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const SMTP_HOST = env.SMTP_HOST
  const SMTP_PORT = env.SMTP_PORT
  const SMTP_SECURE = env.SMTP_SECURE === 'true'
  const SMTP_USER = env.SMTP_USER
  const SMTP_PASS = env.SMTP_PASS
  const MAIL_FROM = env.MAIL_FROM || SMTP_USER
  const MAIL_FROM_NAME = env.MAIL_FROM_NAME || 'Static Savvy Media Website'
  const ADMIN_EMAIL = env.ADMIN_EMAIL
  const RECAPTCHA_SECRET_KEY = env.RECAPTCHA_SECRET_KEY

  let cachedTransporter = null
  function getTransporter() {
    if (cachedTransporter) return cachedTransporter
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !ADMIN_EMAIL) {
      throw new Error('CONFIG_MISSING_SMTP')
    }
    cachedTransporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: SMTP_SECURE,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
    return cachedTransporter
  }

  async function verifyRecaptcha(token) {
    if (!RECAPTCHA_SECRET_KEY) return { ok: true, skipped: true }
    if (!token) return { ok: false }
    try {
      const params = new URLSearchParams({ secret: RECAPTCHA_SECRET_KEY, response: token })
      const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      })
      const data = await res.json()
      return { ok: Boolean(data.success) }
    } catch {
      return { ok: false }
    }
  }

  return {
    plugins: [
      react(),
      {
        name: 'contact-form-dev-middleware',
        // 'pre' guarantees this runs before Vite's own internal middlewares
        // (including the SPA history fallback), no matter what other plugins
        // are added to this array later. NOTE: Vite does not hot-reload
        // changes to this file's plugins/middleware — after editing
        // vite.config.js you must fully stop and restart `npm run dev`
        // (a browser refresh alone is not enough).
        enforce: 'pre',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/.netlify/functions/submit-contact' && req.method === 'POST') {
              let body = ''
              req.on('data', (chunk) => { body += chunk })
              req.on('end', async () => {
                try {
                  const payload = JSON.parse(body || '{}')
                  const { name, email, phone, service, message, website, recaptchaToken, sourcePagePath, sourcePageUrl, sourcePageTitle } = payload

                  const jsonRes = (code, data) => {
                    res.statusCode = code
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify(data))
                  }

                  if (website) {
                    return jsonRes(200, { success: true, message: 'Thank you. Your request has been received.' })
                  }

                  const recaptchaResult = await verifyRecaptcha(recaptchaToken)
                  if (!recaptchaResult.ok) {
                    return jsonRes(400, { success: false, code: 'RECAPTCHA_FAILED', message: 'Security verification failed. Please try again.' })
                  }

                  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                  const PHONE_REGEX = /^[0-9+\-\s()]{7,20}$/
                  const errors = {}
                  const t = (v) => String(v || '').trim()

                  if (t(name).length < 2 || t(name).length > 100) errors.name = 'Please enter a valid name.'
                  if (!EMAIL_REGEX.test(t(email)) || t(email).length > 150) errors.email = 'Please enter a valid email address.'
                  if (!PHONE_REGEX.test(t(phone))) errors.phone = 'Please enter a valid phone number.'
                  if (t(service).length < 2 || t(service).length > 100) errors.service = 'Please select a service.'
                  if (t(message).length < 10 || t(message).length > 3000) errors.message = 'Message should be between 10 and 3000 characters.'

                  if (Object.keys(errors).length > 0) {
                    return jsonRes(400, { success: false, code: 'VALIDATION_ERROR', message: 'Please correct the highlighted fields and try again.', errors })
                  }

                  const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })

                  // Same shared template used in production (netlify/functions/submit-contact.js)
                  // so the dev-server email and the live email never drift apart again.
                  const { subject, html: htmlBody, text: textBody } = buildEnquiryEmail({
                    name: t(name),
                    email: t(email),
                    phone: t(phone),
                    service: t(service),
                    message: t(message),
                    submittedAt,
                    sourcePagePath,
                    sourcePageUrl,
                    sourcePageTitle,
                  })

                  const transporter = getTransporter()
                  await transporter.sendMail({
                    from: `"${MAIL_FROM_NAME}" <${MAIL_FROM}>`,
                    to: ADMIN_EMAIL,
                    replyTo: t(email),
                    subject,
                    text: textBody,
                    html: htmlBody,
                  })

                  jsonRes(200, { success: true, message: 'Thank you. Your request has been received — our team will get back to you shortly.' })
                } catch (err) {
                  console.error('Dev middleware error:', err)
                  res.statusCode = 500
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ success: false, code: 'DEV_ERROR', message: err.message || 'Server error.' }))
                }
              })
              return
            }
            next()
          })
        },
      },
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
