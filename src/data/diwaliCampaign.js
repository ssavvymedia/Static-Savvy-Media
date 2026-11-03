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

export const LIMITS = { name: [2, 24], message: [2, 180], utm: 300, ua: 300 }

/** Firecrackers a sender can pick (ids are part of the shared link, so never rename one). */
export const CRACKER_IDS = ['ssm', 'flowerpot', 'chakri', 'rocket', 'sparkler']
/** Greeting languages. */
export const WISH_LANGS = ['en', 'ta']

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
const CTRL = /[\u0000-\u001f\u007f-\u009f\u200b\u2028\u2029<>]/g

/** Strips control characters and angle brackets, collapses whitespace, clips to `max` code points. */
export function cleanText(v, max = 200) {
  if (typeof v !== 'string') return ''
  return [...v.replace(CTRL, ' ').replace(/\s+/g, ' ').trim()].slice(0, max).join('').trim()
}

/**
 * Validates a Diwali wish (the lead). Returns { ok: true, wish } or { ok: false, errors: { field: message } }.
 * Fields: sender (From), phone (sender's, required), recipient (To), cracker, lang, message.
 */
export function validateWish(input = {}) {
  const errors = {}
  const raw = (k) => (typeof input[k] === 'string' ? input[k] : '')
  const sender = cleanText(raw('sender'), 60)
  const recipient = cleanText(raw('recipient'), 60)
  const message = cleanText(raw('message'), 400)
  const phone = normalizePhone(raw('phone'))
  const cracker = CRACKER_IDS.includes(input.cracker) ? input.cracker : ''
  const lang = WISH_LANGS.includes(input.lang) ? input.lang : ''
  const [nMin, nMax] = LIMITS.name
  if ([...recipient].length < nMin || [...recipient].length > nMax || !/\p{L}/u.test(recipient)) errors.recipient = `Please enter their name (${nMin} to ${nMax} characters).`
  if ([...sender].length < nMin || [...sender].length > nMax || !/\p{L}/u.test(sender)) errors.sender = `Please enter your name (${nMin} to ${nMax} characters).`
  if (!phone) errors.phone = 'Please enter a valid mobile number (10-digit Indian, or +country code).'
  if ([...message].length < LIMITS.message[0] || [...message].length > LIMITS.message[1]) errors.message = `Please write a message (up to ${LIMITS.message[1]} characters) or pick a ready-made wish.`
  if (!cracker) errors.cracker = 'Please choose a firecracker.'
  if (!lang) errors.lang = 'Please choose a language.'
  if (Object.keys(errors).length) return { ok: false, errors }
  return { ok: true, wish: { sender, phone, recipient, cracker, lang, message } }
}

/** Formats a timestamp as "2026-11-03 11:05:09 IST". */
export function formatIST(ms = Date.now()) {
  const d = new Date(ms + 330 * 60000)
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())} IST`
}
