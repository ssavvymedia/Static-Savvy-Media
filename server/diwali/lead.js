// Diwali 2026 "Digital Surprise" wish + lead pipeline, behind api/diwali-lead.js (Vercel Function).
//
// Every surprise a visitor creates is a lead: sender name + sender phone, plus who it is for, the
// firecracker, language and message. Order: campaign window (server clock is the source of truth) ->
// honeypot -> rate limit -> validation -> exact-repeat dedupe (same wish within 60 s) -> store -> notify.
//
// The same phone may send many wishes: that is never blocked. A phone already seen is flagged
// repeat:true (in the sheet notes and the email) instead.
//
// Storage:
//   1. DIWALI_APPS_SCRIPT_URL (+ DIWALI_SHARED_SECRET): the wish is posted to the Apps Script web app
//      bound to the "SSM Diwali 2026 Leads" sheet. The payload carries BOTH shapes so it works with the
//      currently deployed Code.gs (v1: Timestamp | Name | Phone | Business | Service | Source/UTM |
//      User agent | Status, one row per phone) and with scripts/diwali/Code.gs v2 (extra columns, a row
//      per wish, repeats marked 'repeat'). v1 mapping: Name = sender, Phone = sender phone,
//      Business = "To: <recipient>", Service = "Other", Source/UTM = UTM, User agent = wish details JSON.
//      v1 answers DUPLICATE for a phone already in the sheet: the wish still succeeds for the visitor and
//      the repeat is kept in the email record below.
//   2. Always: an email notification (SMTP_* / ADMIN_EMAIL env) with a machine-readable "LEAD_JSON:" line.
// Secrets stay server-side; nothing here is shipped to the browser.
import nodemailer from 'nodemailer'
import { campaignPhase, validateWish, cleanText, formatIST, LIMITS, DIWALI_WHATSAPP_DISPLAY } from '../../src/data/diwaliCampaign.js'

const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 12
const REPEAT_WINDOW_MS = 60 * 1000
const ipHits = new Map() // ip -> [timestamps] (per warm instance; basic abuse brake)
const seenPhones = new Map() // phone -> ms of first wish (per warm instance)
const recentWishes = new Map() // exact wish fingerprint -> ms (dedupe double taps / resubmits)

const res = (statusCode, body) => ({ statusCode, body })

function rateLimited(ip, now) {
  if (!ip) return false
  const hits = (ipHits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS)
  hits.push(now)
  ipHits.set(ip, hits)
  if (ipHits.size > 5000) ipHits.clear()
  return hits.length > RATE_MAX
}

let cachedTransport = null
function getTransport(env) {
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS || !env.ADMIN_EMAIL) throw new Error('CONFIG_MISSING_SMTP')
  if (!cachedTransport) {
    cachedTransport = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT) || 587,
      secure: env.SMTP_SECURE === 'true',
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    })
  }
  return cachedTransport
}

/** Wish details for the v1 sheet's 300-character "User agent" cell (message last, so a cut only trims it). */
export function wishNotes(record) {
  return JSON.stringify({ t: 'wish', to: record.recipient, c: record.cracker, l: record.lang, rep: record.repeat ? 1 : 0, id: record.id, m: record.message })
}

async function postToAppsScript(env, record, fetchImpl) {
  const body = {
    // v1 (deployed) Code.gs fields
    name: record.sender,
    phone: record.phone,
    business: `To: ${record.recipient}`,
    service: 'Other',
    source: record.source,
    ua: wishNotes(record),
    // v2 Code.gs fields
    kind: 'wish',
    v: 2,
    sender: record.sender,
    recipient: record.recipient,
    cracker: record.cracker,
    lang: record.lang,
    message: record.message,
    repeat: record.repeat,
    wishId: record.id,
    userAgent: record.ua,
    secret: env.DIWALI_SHARED_SECRET || '',
  }
  const r = await fetchImpl(env.DIWALI_APPS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(body),
    redirect: 'follow',
    signal: AbortSignal.timeout(12000),
  })
  const text = await r.text()
  try {
    return JSON.parse(text)
  } catch {
    return { ok: false, code: 'BAD_RESPONSE', status: r.status }
  }
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function buildEmail(record, sheetStatus) {
  const rows = [
    ['Timestamp', record.timestamp],
    ['From (sender)', record.sender],
    ['Sender phone', record.phone],
    ['To (recipient)', record.recipient],
    ['Firecracker', record.cracker],
    ['Language', record.lang === 'ta' ? 'Tamil' : 'English'],
    ['Message', record.message],
    ['Repeat sender', record.repeat ? 'repeat' : 'new'],
    ['Source / UTM', record.source || '(direct)'],
    ['Google Sheet', sheetStatus],
  ]
  const subject = `Diwali surprise lead: ${record.sender} (${record.phone}) -> ${record.recipient}${record.repeat ? ' [repeat]' : ''}`
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\nUser agent: ${record.ua}\n\nLEAD_JSON:${JSON.stringify(record)}\n`
  const html = `<div style="font-family:Arial,sans-serif;max-width:560px"><h2 style="color:#6d28d9;margin:0 0 12px">🪔 New Diwali surprise lead</h2><table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#64748b;border-bottom:1px solid #eee">${esc(k)}</td><td style="border-bottom:1px solid #eee"><b>${esc(v)}</b></td></tr>`)
    .join('')}</table><p style="color:#64748b;font-size:12px">Reply on WhatsApp: <a href="https://wa.me/${record.phone.replace('+', '')}">${esc(record.phone)}</a></p><pre style="font-size:11px;color:#94a3b8;white-space:pre-wrap">LEAD_JSON:${esc(JSON.stringify(record))}</pre></div>`
  return { subject, text, html }
}

const newId = (now) => `W${now.toString(36)}${Math.random().toString(36).slice(2, 6)}`.toUpperCase()

/**
 * @param {object} payload parsed JSON body
 * @param {object} [o] { env, ip, ua, now, fetchImpl, transport }
 * @returns {Promise<{statusCode:number, body:object}>}
 */
export async function handleDiwaliLead(payload, o = {}) {
  const env = o.env || process.env
  const now = o.now ?? Date.now()
  const fetchImpl = o.fetchImpl || fetch
  const p = payload && typeof payload === 'object' ? payload : {}

  const phase = campaignPhase(now)
  if (phase === 'upcoming') return res(403, { success: false, code: 'CAMPAIGN_NOT_STARTED', message: 'Diwali surprises open on 3 November 2026 (IST).' })
  if (phase === 'ended') return res(410, { success: false, code: 'CAMPAIGN_ENDED', message: 'The Diwali 2026 campaign has ended. Surprises already shared still play.' })

  // Honeypot (hidden "website" field) or a form submitted faster than a human can type: accept
  // silently so bots get no signal, but store nothing.
  if ((typeof p.website === 'string' && p.website.trim()) || (Number.isFinite(p.elapsedMs) && p.elapsedMs < 1500)) {
    return res(200, { success: true, id: newId(now) })
  }

  if (rateLimited(o.ip, now)) return res(429, { success: false, code: 'RATE_LIMITED', message: 'Too many surprises in a short time. Please wait a few minutes and try again.' })

  const v = validateWish(p)
  if (!v.ok) return res(400, { success: false, code: 'VALIDATION', errors: v.errors, message: 'Please check the highlighted fields.' })
  const { wish } = v

  // Exact same wish again within a minute (double tap, back + resubmit): do not store it twice.
  const fp = [wish.phone, wish.recipient.toLowerCase(), wish.cracker, wish.lang, wish.message].join('|')
  for (const [k, t] of recentWishes) if (now - t > REPEAT_WINDOW_MS) recentWishes.delete(k)
  if (recentWishes.has(fp)) return res(200, { success: true, deduped: true, id: newId(now) })

  const repeat = seenPhones.has(wish.phone)
  const record = {
    timestamp: formatIST(now),
    id: newId(now),
    ...wish,
    repeat,
    source: cleanText(p.source, LIMITS.utm),
    ua: cleanText(o.ua, LIMITS.ua),
  }

  let sheetStatus = 'pending sync (Apps Script URL not configured)'
  let stored = false
  if (env.DIWALI_APPS_SCRIPT_URL) {
    try {
      const r = await postToAppsScript(env, record, fetchImpl)
      if (r && r.ok) {
        stored = true
        if (r.repeat) record.repeat = true
        sheetStatus = `saved (row ${r.row || '?'})`
      } else if (r && r.code === 'DUPLICATE') {
        // v1 Code.gs keeps one row per phone: this sender is already in the sheet.
        record.repeat = true
        stored = true
        sheetStatus = 'repeat sender: phone already in sheet (v1 script keeps one row per phone), kept in this email'
      } else if (r && (r.code === 'CAMPAIGN_ENDED' || r.code === 'CAMPAIGN_NOT_STARTED')) {
        return res(r.code === 'CAMPAIGN_ENDED' ? 410 : 403, { success: false, code: r.code, message: 'Diwali surprises are not open right now.' })
      } else {
        sheetStatus = `Apps Script error (${(r && r.code) || 'unknown'}), pending sync`
        console.error('diwali: apps script rejected wish', r && r.code)
      }
    } catch (err) {
      sheetStatus = 'Apps Script unreachable, pending sync'
      console.error('diwali: apps script error', err && err.message)
    }
  }

  let emailed = false
  try {
    const { subject, text, html } = buildEmail(record, sheetStatus)
    const transport = o.transport || getTransport(env)
    await transport.sendMail({
      from: `"${env.MAIL_FROM_NAME || 'Static Savvy Media Website'}" <${env.MAIL_FROM || env.SMTP_USER}>`,
      to: env.ADMIN_EMAIL,
      subject,
      text,
      html,
    })
    emailed = true
  } catch (err) {
    console.error('diwali: email error', err && err.message)
  }

  if (!stored && !emailed) {
    return res(502, { success: false, code: 'STORE_ERROR', message: `Sorry, we could not save your surprise. Please try again, or WhatsApp us on ${DIWALI_WHATSAPP_DISPLAY}.` })
  }
  if (!seenPhones.has(wish.phone)) seenPhones.set(wish.phone, now)
  if (seenPhones.size > 20000) seenPhones.clear()
  recentWishes.set(fp, now)
  return res(200, { success: true, id: record.id, repeat: record.repeat })
}

/** Test hook: clears the per-instance rate-limit, repeat and dedupe memory. */
export function _resetDiwaliMemory() {
  ipHits.clear()
  seenPhones.clear()
  recentWishes.clear()
}
