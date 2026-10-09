// Netlify Function wrapper, only used by `npm run dev:netlify` (netlify dev).
// Production runs on Vercel: see api/submit-contact.js. Both share
// server/contact/submit-contact.js, which lists the required environment variables.

import { handleContactSubmission, parseJsonBody } from '../../server/contact/submit-contact.js'

const JSON_HEADERS = { 'Content-Type': 'application/json' }

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: JSON_HEADERS,
      body: JSON.stringify({ success: false, code: 'METHOD_NOT_ALLOWED', message: 'Method Not Allowed' }),
    }
  }
  const payload = parseJsonBody(event.body)
  if (payload === undefined) {
    return {
      statusCode: 400,
      headers: JSON_HEADERS,
      body: JSON.stringify({ success: false, code: 'INVALID_JSON', message: 'Invalid request payload.' }),
    }
  }
  const { statusCode, body } = await handleContactSubmission(payload)
  return { statusCode, headers: JSON_HEADERS, body: JSON.stringify(body) }
}
