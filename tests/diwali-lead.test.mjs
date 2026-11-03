import test from 'node:test'
import assert from 'node:assert/strict'
import { handleDiwaliLead, _resetDiwaliMemory, wishNotes } from '../server/diwali/lead.js'
import { campaignPhase, normalizePhone, validateWish, cleanText, CAMPAIGN_START_MS, CAMPAIGN_END_MS } from '../src/data/diwaliCampaign.js'

const env = { SMTP_HOST: 'x', SMTP_USER: 'u', SMTP_PASS: 'p', ADMIN_EMAIL: 'a@example.com' }
const mid = Date.UTC(2026, 10, 5, 6, 0, 0)
const good = { sender: 'Deepan', phone: '99440 12345', recipient: 'Priya', cracker: 'ssm', lang: 'en', message: 'Wishing you a bright Diwali!', elapsedMs: 5000 }
const sent = []
const transport = { sendMail: async (m) => { sent.push(m) } }

test('campaign window boundaries (IST)', () => {
  assert.equal(campaignPhase(CAMPAIGN_START_MS - 1), 'upcoming')
  assert.equal(campaignPhase(CAMPAIGN_START_MS), 'active')
  assert.equal(campaignPhase(CAMPAIGN_END_MS), 'active')
  assert.equal(campaignPhase(CAMPAIGN_END_MS + 1), 'ended')
  assert.equal(new Date(CAMPAIGN_END_MS).toISOString(), '2026-11-09T18:29:59.999Z')
})

test('phone normalisation', () => {
  assert.equal(normalizePhone('099440 12345'), '+919944012345')
  assert.equal(normalizePhone('+91 90000 00003'), '+919000000003')
  assert.equal(normalizePhone('+60 12-345 6789'), '+60123456789')
  assert.equal(normalizePhone('12345'), null)
})

test('wish validation and sanitising', () => {
  assert.equal(cleanText('  <b>Hi</b>\u0000 there ', 40), 'b Hi /b there')
  const v = validateWish({ ...good, recipient: 'பிரியா', lang: 'ta', message: 'இனிய தீபாவளி நல்வாழ்த்துகள்' })
  assert.ok(v.ok)
  const bad = validateWish({ ...good, recipient: 'x', cracker: 'bomb', lang: 'fr', message: 'm'.repeat(181), phone: '12' })
  assert.ok(!bad.ok)
  for (const k of ['recipient', 'cracker', 'lang', 'message', 'phone']) assert.ok(bad.errors[k], k)
})

test('window, validation, honeypot, repeat flag, exact-repeat dedupe', async () => {
  _resetDiwaliMemory()
  sent.length = 0
  assert.equal((await handleDiwaliLead(good, { env, now: CAMPAIGN_START_MS - 1, transport })).statusCode, 403)
  assert.equal((await handleDiwaliLead(good, { env, now: CAMPAIGN_END_MS + 1, transport })).statusCode, 410)
  const bad = await handleDiwaliLead({ ...good, phone: '12' }, { env, now: mid, transport, ip: '1.1.1.1' })
  assert.equal(bad.statusCode, 400)
  assert.ok(bad.body.errors.phone)
  const hp = await handleDiwaliLead({ ...good, website: 'spam' }, { env, now: mid, transport })
  assert.equal(hp.statusCode, 200)
  assert.equal(sent.length, 0)
  const ok = await handleDiwaliLead(good, { env, now: mid, transport, ip: '2.2.2.2', ua: 'UA' })
  assert.equal(ok.statusCode, 200)
  assert.equal(ok.body.repeat, false)
  assert.equal(sent.length, 1)
  assert.match(sent[0].text, /LEAD_JSON:\{.*"phone":"\+919944012345"/)
  const same = await handleDiwaliLead({ ...good, phone: '+91 99440 12345' }, { env, now: mid + 20000, transport, ip: '3.3.3.3' })
  assert.equal(same.statusCode, 200)
  assert.equal(same.body.deduped, true)
  assert.equal(sent.length, 1)
  const another = await handleDiwaliLead({ ...good, recipient: 'Ravi' }, { env, now: mid + 30000, transport, ip: '3.3.3.3' })
  assert.equal(another.statusCode, 200)
  assert.equal(another.body.repeat, true)
  assert.equal(sent.length, 2)
  assert.match(sent[1].subject, /\[repeat\]/)
})

test('v1 apps script duplicate is not blocked, payload is v1-compatible', async () => {
  _resetDiwaliMemory()
  let body
  const fetchImpl = async (_u, init) => { body = JSON.parse(init.body); return { status: 200, text: async () => JSON.stringify({ ok: false, code: 'DUPLICATE' }) } }
  const r = await handleDiwaliLead(good, { env: { ...env, DIWALI_APPS_SCRIPT_URL: 'https://script.example' }, now: mid, transport, fetchImpl })
  assert.equal(r.statusCode, 200)
  assert.equal(r.body.repeat, true)
  assert.equal(body.name, 'Deepan')
  assert.equal(body.business, 'To: Priya')
  assert.equal(body.service, 'Other')
  assert.ok(body.ua.length <= 300)
  assert.deepEqual(JSON.parse(body.ua).to, 'Priya')
})

test('notes fit the v1 300-char cell for a max-length Tamil wish', () => {
  const n = wishNotes({ recipient: 'அ'.repeat(24), cracker: 'flowerpot', lang: 'ta', repeat: true, id: 'WABCDEFGHIJK', message: 'த'.repeat(180) })
  assert.ok(n.length <= 300, String(n.length))
})

test('rate limit', async () => {
  _resetDiwaliMemory()
  let last
  for (let i = 0; i < 13; i++) last = await handleDiwaliLead({ ...good, recipient: `Friend ${'abcdefghijklm'[i]}` }, { env, now: mid, transport, ip: '9.9.9.9' })
  assert.equal(last.statusCode, 429)
})
