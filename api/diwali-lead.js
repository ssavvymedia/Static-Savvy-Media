// Vercel Function (Node.js runtime): POST /api/diwali-lead
// Diwali 2026 campaign lead form. All logic lives in server/diwali/lead.js.
import { handleDiwaliLead } from '../server/diwali/lead.js'
import { parseJsonBody } from '../server/contact/submit-contact.js'

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    req.on('data', (c) => {
      size += c.length
      if (size > 16384) { reject(new Error('TOO_LARGE')); req.destroy() } else chunks.push(c)
    })
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

function send(res, statusCode, body) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.end(JSON.stringify(body))
}

const ALLOWED_ORIGINS = new Set(['https://www.staticsavvymedia.com', 'https://staticsavvymedia.com'])

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return send(res, 405, { success: false, code: 'METHOD_NOT_ALLOWED', message: 'Method Not Allowed' })
  }
  // Browsers always send Origin on a cross-site POST: refuse other sites' forms.
  const origin = req.headers.origin
  if (origin && !ALLOWED_ORIGINS.has(origin) && !/^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin) && !/^http:\/\/localhost(:\d+)?$/.test(origin)) {
    return send(res, 403, { success: false, code: 'FORBIDDEN_ORIGIN', message: 'Forbidden' })
  }
  let payload
  try {
    payload = parseJsonBody(req.body !== undefined ? req.body : await readRawBody(req))
  } catch {
    payload = undefined
  }
  if (payload === undefined) return send(res, 400, { success: false, code: 'INVALID_JSON', message: 'Invalid request payload.' })

  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim()
  const { statusCode, body } = await handleDiwaliLead(payload, { ip, ua: String(req.headers['user-agent'] || '') })
  return send(res, statusCode, body)
}
