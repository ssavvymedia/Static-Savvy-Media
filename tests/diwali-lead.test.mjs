import test from 'node:test'
import assert from 'node:assert/strict'
import { handleDiwaliLead, _resetDiwaliMemory } from '../server/diwali/lead.js'
import { campaignPhase, normalizePhone, CAMPAIGN_START_MS, CAMPAIGN_END_MS } from '../src/data/diwaliCampaign.js'

const env = { SMTP_HOST: 'x', SMTP_USER: 'u', SMTP_PASS: 'p', ADMIN_EMAIL: 'a@example.com' }
const mid = Date.UTC(2026, 10, 5, 6, 0, 0)
const good = { name: 'Test Person', phone: '99440 12345', business: 'Test Co', service: 'SEO', elapsedMs: 5000 }
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
  assert.equal(normalizePhone('+91-99440-12345'), '+919944012345')
  assert.equal(normalizePhone('+60 12-345 6789'), '+60123456789')
  assert.equal(normalizePhone('12345'), null)
})

test('window, validation, honeypot, duplicate', async () => {
  _resetDiwaliMemory()
  assert.equal((await handleDiwaliLead(good, { env, now: CAMPAIGN_START_MS - 1, transport })).statusCode, 403)
  assert.equal((await handleDiwaliLead(good, { env, now: CAMPAIGN_END_MS + 1, transport })).statusCode, 410)
  const bad = await handleDiwaliLead({ ...good, phone: '12', service: 'Pricing' }, { env, now: mid, transport, ip: '1.1.1.1' })
  assert.equal(bad.statusCode, 400)
  assert.ok(bad.body.errors.phone && bad.body.errors.service)
  const hp = await handleDiwaliLead({ ...good, website: 'spam' }, { env, now: mid, transport })
  assert.equal(hp.statusCode, 200)
  assert.equal(sent.length, 0)
  const ok = await handleDiwaliLead(good, { env, now: mid, transport, ip: '2.2.2.2', ua: 'UA' })
  assert.equal(ok.statusCode, 200)
  assert.equal(sent.length, 1)
  assert.match(sent[0].text, /LEAD_JSON:\{.*"phone":"\+919944012345"/)
  const dup = await handleDiwaliLead({ ...good, phone: '+91 99440 12345' }, { env, now: mid, transport, ip: '3.3.3.3' })
  assert.equal(dup.statusCode, 409)
})

test('apps script duplicate is respected', async () => {
  _resetDiwaliMemory()
  const fetchImpl = async () => ({ status: 200, text: async () => JSON.stringify({ ok: false, code: 'DUPLICATE' }) })
  const r = await handleDiwaliLead(good, { env: { ...env, DIWALI_APPS_SCRIPT_URL: 'https://script.example' }, now: mid, transport, fetchImpl })
  assert.equal(r.statusCode, 409)
})

test('rate limit', async () => {
  _resetDiwaliMemory()
  let last
  for (let i = 0; i < 6; i++) last = await handleDiwaliLead({ ...good, phone: `9944000${100 + i}` }, { env, now: mid, transport, ip: '9.9.9.9' })
  assert.equal(last.statusCode, 429)
})
