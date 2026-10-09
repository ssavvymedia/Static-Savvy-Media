// Vercel Function (Node.js runtime): POST /api/submit-contact
// Receives the contact form, verifies reCAPTCHA, validates and emails the enquiry.
// All logic lives in server/contact/submit-contact.js (shared with local dev).
// Required environment variables are listed at the top of that file.

import { handleContactSubmission, parseJsonBody } from '../server/contact/submit-contact.js'

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

function send(res, statusCode, body) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(body))
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return send(res, 405, { success: false, code: 'METHOD_NOT_ALLOWED', message: 'Method Not Allowed' })
  }

  // Vercel's Node runtime pre-parses JSON into req.body (a getter that throws on
  // malformed JSON). Fall back to reading the stream when no helper is present.
  let payload
  try {
    payload = parseJsonBody(req.body !== undefined ? req.body : await readRawBody(req))
  } catch {
    payload = undefined
  }
  if (payload === undefined) {
    return send(res, 400, { success: false, code: 'INVALID_JSON', message: 'Invalid request payload.' })
  }

  const { statusCode, body } = await handleContactSubmission(payload)
  return send(res, statusCode, body)
}
