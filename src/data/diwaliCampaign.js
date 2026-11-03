/**
 * Diwali 2026 campaign: single source of truth shared by the page (src/pages/Diwali) and the
 * lead endpoint (server/diwali/lead.js). Plain data + pure functions only (runs in Node and the browser).
 * The server is the source of truth for the campaign window; the client copy only drives the UI.
 */

// 3 Nov 2026 00:00:00 IST to 9 Nov 2026 23:59:59 IST (IST = UTC+5:30).
export const CAMPAIGN_START_MS = Date.UTC(2026, 10, 2, 18, 30, 0) // 2026-11-03T00:00:00+05:30
export const CAMPAIGN_END_MS = Date.UTC(2026, 10, 9, 18, 29, 59, 999) // 2026-11-09T23:59:59.999+05:30

export const DIWALI_PATH = '/diwali-2026/'
export const DIWALI_WHATSAPP_DISPLAY = '+91 99440 40345'
export const DIWALI_WHATSAPP_E164 = '919944040345'
export const DIWALI_TEL = '+919944040345'

export const DIWALI_SERVICES = [
  'SEO',
  'Local SEO / GBP',
  'Website Development',
  'Social Media Marketing',
  'Google Ads / Lead Generation',
  'Branding',
  'Other',
]

export const LIMITS = { name: [2, 80], business: [2, 120], utm: 300, ua: 300 }

/** 'upcoming' | 'active' | 'ended' for a timestamp (ms). */
export function campaignPhase(now = Date.now()) {
  if (now < CAMPAIGN_START_MS) return 'upcoming'
  if (now > CAMPAIGN_END_MS) return 'ended'
  return 'active'
}

/**
 * Normalises an Indian or international phone number to E.164 ("+919944040345"), or returns null.
 * Accepts spaces, dashes, dots, brackets; a leading 0 or 91 on a 10-digit Indian mobile; or a
 * "+<country><number>" international number of 8 to 15 digits.
 */
export function normalizePhone(raw) {
  if (typeof raw !== 'string') return null
  const s = raw.trim()
  if (!s || s.length > 25 || /[^\d\s+().-]/.test(s)) return null
  const plus = s.startsWith('+') || s.startsWith('00')
  let d = s.replace(/\D/g, '')
  if (s.startsWith('00')) d = d.slice(2)
  if (plus) {
    if (d.startsWith('91')) return /^91[6-9]\d{9}$/.test(d) ? `+${d}` : null
    return /^[1-9]\d{7,14}$/.test(d) ? `+${d}` : null
  }
  if (d.length === 11 && d.startsWith('0')) d = d.slice(1)
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2)
  return /^[6-9]\d{9}$/.test(d) ? `+91${d}` : null
}

// eslint-disable-next-line no-control-regex -- strip control characters on purpose
const clean = (v) => (typeof v === 'string' ? v.replace(/[\u0000-\u001f\u007f<>]/g, ' ').replace(/\s+/g, ' ').trim() : '')

/** Validates a lead. Returns { ok: true, lead } or { ok: false, errors: { field: message } }. */
export function validateLead(input = {}) {
  const errors = {}
  const name = clean(input.name)
  const business = clean(input.business)
  const service = clean(input.service)
  const phone = normalizePhone(typeof input.phone === 'string' ? input.phone : '')
  if (name.length < LIMITS.name[0] || name.length > LIMITS.name[1]) errors.name = 'Please enter your name (2 to 80 characters).'
  else if (!/\p{L}/u.test(name)) errors.name = 'Please enter a valid name.'
  if (!phone) errors.phone = 'Please enter a valid mobile number (10-digit Indian, or +country code).'
  if (business.length < LIMITS.business[0] || business.length > LIMITS.business[1]) errors.business = 'Please enter your business name (2 to 120 characters).'
  if (!DIWALI_SERVICES.includes(service)) errors.service = 'Please choose a service.'
  if (Object.keys(errors).length) return { ok: false, errors }
  return { ok: true, lead: { name, phone, business, service } }
}

/** Formats a timestamp as "2026-11-03 11:05:09 IST". */
export function formatIST(ms = Date.now()) {
  const d = new Date(ms + 330 * 60000)
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())} IST`
}
