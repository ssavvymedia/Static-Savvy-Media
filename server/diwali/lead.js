// Diwali 2026 lead pipeline, behind api/diwali-lead.js (Vercel Function).
//
// Order: campaign window (server clock is the source of truth) -> honeypot -> rate limit ->
// validation -> duplicate check -> store -> notify.
//
// Storage:
//   1. DIWALI_APPS_SCRIPT_URL (+ DIWALI_SHARED_SECRET) set: the lead is posted to the Google Apps
//      Script web app bound to the "SSM Diwali 2026 Leads" sheet (scripts/diwali/Code.gs). Apps Script
//      appends the row under LockService and rejects a phone already in the sheet (code DUPLICATE).
//   2. Always: an email notification (existing SMTP_* / ADMIN_EMAIL env) whose text carries a
//      machine-readable "LEAD_JSON:" line. Until the Apps Script URL is configured this email is the
//      durable record, and the sheet is filled from it (sync job reads the sent mail).
// Secrets stay server-side; nothing here is shipped to the browser.
import nodemailer from 'nodemailer'
import { campaignPhase, validateLead, formatIST, LIMITS, DIWALI_WHATSAPP_DISPLAY } from '../../src/data/diwaliCampaign.js'

const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 5
const ipHits = new Map() // ip -> [timestamps] (per warm instance; basic abuse brake)
const seenPhones = new Map() // phone -> ms (per warm instance; the sheet check is authoritative)

const res = (statusCode, body) => ({ statusCode, body })
// eslint-disable-next-line no-control-regex -- strip control characters on purpose
const clip = (v, n) => (typeof v === 'string' ? v.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, n) : '')

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

async function postToAppsScript(env, record, fetchImpl) {
  const r = await fetchImpl(env.DIWALI_APPS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ ...record, secret: env.DIWALI_SHARED_SECRET || '' }),
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
    ['Name', record.name],
    ['Phone', record.phone],
    ['Business', record.business],
    ['Service', record.service],
    ['Source / UTM', record.source || '(direct)'],
    ['Google Sheet', sheetStatus],
  ]
  const subject = `Diwali 2026 Lead: ${record.service} — ${record.name} (${record.business})`
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\nUser agent: ${record.ua}\n\nLEAD_JSON:${JSON.stringify(record)}\n`
  const html = `<div style="font-family:Arial,sans-serif;max-width:560px"><h2 style="color:#6d28d9;margin:0 0 12px">🪔 New Diwali 2026 lead</h2><table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#64748b;border-bottom:1px solid #eee">${esc(k)}</td><td style="border-bottom:1px solid #eee"><b>${esc(v)}</b></td></tr>`)
    .join('')}</table><p style="color:#64748b;font-size:12px">Reply on WhatsApp: <a href="https://wa.me/${record.phone.replace('+', '')}">${esc(record.phone)}</a></p><pre style="font-size:11px;color:#94a3b8;white-space:pre-wrap">LEAD_JSON:${esc(JSON.stringify(record))}</pre></div>`
  return { subject, text, html }
}

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
  if (phase === 'upcoming') return res(403, { success: false, code: 'CAMPAIGN_NOT_STARTED', message: 'The Diwali offer opens on 3 November 2026 (IST).' })
  if (phase === 'ended') return res(410, { success: false, code: 'CAMPAIGN_ENDED', message: `The Diwali 2026 offer has ended. WhatsApp us on ${DIWALI_WHATSAPP_DISPLAY} and we will still help.` })

  // Honeypot (hidden "website" field) or a form submitted faster than a human can type: accept
  // silently so bots get no signal, but store nothing.
  if ((typeof p.website === 'string' && p.website.trim()) || (Number.isFinite(p.elapsedMs) && p.elapsedMs < 1500)) {
    return res(200, { success: true, message: 'Thank you! Your Diwali offer is reserved.' })
  }

  if (rateLimited(o.ip, now)) return res(429, { success: false, code: 'RATE_LIMITED', message: 'Too many attempts. Please wait a few minutes and try again.' })

  const v = validateLead(p)
  if (!v.ok) return res(400, { success: false, code: 'VALIDATION', errors: v.errors, message: 'Please check the highlighted fields.' })
  const { lead } = v

  if (seenPhones.has(lead.phone)) {
    return res(409, { success: false, code: 'DUPLICATE', message: 'This number has already claimed the Diwali offer. Our team will call you shortly.' })
  }

  const record = {
    timestamp: formatIST(now),
    ...lead,
    source: clip(p.source, LIMITS.utm),
    ua: clip(o.ua, LIMITS.ua),
  }

  let sheetStatus = 'pending sync (Apps Script URL not configured)'
  let stored = false
  if (env.DIWALI_APPS_SCRIPT_URL) {
    try {
      const r = await postToAppsScript(env, record, fetchImpl)
      if (r && r.ok) {
        stored = true
        sheetStatus = `saved (row ${r.row || '?'})`
      } else if (r && r.code === 'DUPLICATE') {
        seenPhones.set(lead.phone, now)
        return res(409, { success: false, code: 'DUPLICATE', message: 'This number has already claimed the Diwali offer. Our team will call you shortly.' })
      } else if (r && (r.code === 'CAMPAIGN_ENDED' || r.code === 'CAMPAIGN_NOT_STARTED')) {
        return res(r.code === 'CAMPAIGN_ENDED' ? 410 : 403, { success: false, code: r.code, message: 'The Diwali 2026 offer is not open right now.' })
      } else {
        sheetStatus = `Apps Script error (${(r && r.code) || 'unknown'}), pending sync`
        console.error('diwali: apps script rejected lead', r && r.code)
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
    return res(502, { success: false, code: 'STORE_ERROR', message: `Sorry, we could not save your request. Please WhatsApp us on ${DIWALI_WHATSAPP_DISPLAY}.` })
  }
  seenPhones.set(lead.phone, now)
  if (seenPhones.size > 20000) seenPhones.clear()
  return res(200, { success: true, message: 'Your Diwali offer is reserved! Our team will call or WhatsApp you within one working day.' })
}

/** Test hook: clears the per-instance rate-limit and duplicate memory. */
export function _resetDiwaliMemory() {
  ipHits.clear()
  seenPhones.clear()
}
