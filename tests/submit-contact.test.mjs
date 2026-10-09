// Tests for the contact form Vercel Function (api/submit-contact.js).
// Runs the real handler and real nodemailer against a throwaway local SMTP server,
// so no email leaves the machine. Run: npm run test:contact
import { test, before, after } from 'node:test'
import assert from 'node:assert/strict'
import net from 'node:net'
import { Readable } from 'node:stream'
import handler from '../api/submit-contact.js'

// ---- minimal fake SMTP server (accepts everything, records messages) ----
const messages = []
let smtp
let smtpPort
function startFakeSmtp() {
  return new Promise((resolve) => {
    smtp = net.createServer((sock) => {
      let inData = false
      let buf = ''
      let current = { rcpt: [], data: '' }
      sock.write('220 fake.smtp ESMTP\r\n')
      sock.on('data', (chunk) => {
        buf += chunk.toString('utf8')
        let idx
        while ((idx = buf.indexOf('\r\n')) !== -1) {
          const line = buf.slice(0, idx)
          buf = buf.slice(idx + 2)
          if (inData) {
            if (line === '.') {
              inData = false
              messages.push(current)
              current = { rcpt: [], data: '' }
              sock.write('250 OK queued\r\n')
            } else current.data += line + '\n'
            continue
          }
          const cmd = line.slice(0, 4).toUpperCase()
          if (cmd === 'EHLO') sock.write('250-fake.smtp\r\n250-AUTH PLAIN LOGIN\r\n250 8BITMIME\r\n')
          else if (cmd === 'AUTH') sock.write('235 Authentication successful\r\n')
          else if (cmd === 'MAIL') { current.from = line; sock.write('250 OK\r\n') }
          else if (cmd === 'RCPT') { current.rcpt.push(line); sock.write('250 OK\r\n') }
          else if (cmd === 'DATA') { inData = true; sock.write('354 End data with <CR><LF>.<CR><LF>\r\n') }
          else if (cmd === 'QUIT') { sock.write('221 Bye\r\n'); sock.end() }
          else sock.write('250 OK\r\n')
        }
      })
    })
    smtp.listen(0, '127.0.0.1', () => {
      smtpPort = smtp.address().port
      resolve()
    })
  })
}

// ---- fake Vercel req/res ----
function makeReq(method, rawBody, { preParsed } = {}) {
  const req = Readable.from(rawBody === undefined ? [] : [Buffer.from(rawBody)])
  req.method = method
  req.headers = { 'content-type': 'application/json' }
  if (preParsed !== undefined) req.body = preParsed
  return req
}
function makeRes() {
  return {
    statusCode: 200,
    headers: {},
    body: '',
    setHeader(k, v) { this.headers[k.toLowerCase()] = v },
    end(b) { this.body = b || '' },
  }
}
async function call(method, body, opts) {
  const res = makeRes()
  await handler(makeReq(method, body, opts), res)
  return { status: res.statusCode, headers: res.headers, json: res.body ? JSON.parse(res.body) : null }
}

const valid = {
  name: 'Test Person',
  email: 'visitor@example.com',
  phone: '+91 98765 43210',
  service: 'SEO',
  message: 'Hello, I would like a quote for SEO please.',
  website: '',
  recaptchaToken: null,
  sourcePagePath: '/contact/',
  sourcePageUrl: 'https://www.staticsavvymedia.com/contact/',
  sourcePageTitle: 'Contact | Static Savvy Media',
}

const ENV_KEYS = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_SECURE', 'SMTP_USER', 'SMTP_PASS', 'MAIL_FROM', 'MAIL_FROM_NAME', 'ADMIN_EMAIL', 'RECAPTCHA_SECRET_KEY']
const savedEnv = {}
const realFetch = globalThis.fetch

before(async () => {
  for (const k of ENV_KEYS) savedEnv[k] = process.env[k]
  await startFakeSmtp()
  Object.assign(process.env, {
    SMTP_HOST: '127.0.0.1',
    SMTP_PORT: String(smtpPort),
    SMTP_SECURE: 'false',
    SMTP_USER: 'test-user',
    SMTP_PASS: 'test-pass',
    MAIL_FROM: 'website@example.com',
    MAIL_FROM_NAME: 'SSM Website Test',
    ADMIN_EMAIL: 'admin@example.com',
  })
  delete process.env.RECAPTCHA_SECRET_KEY
})
after(() => {
  for (const k of ENV_KEYS) {
    if (savedEnv[k] === undefined) delete process.env[k]
    else process.env[k] = savedEnv[k]
  }
  globalThis.fetch = realFetch
  smtp.close()
})

test('rejects non-POST with 405', async () => {
  const r = await call('GET')
  assert.equal(r.status, 405)
  assert.equal(r.json.code, 'METHOD_NOT_ALLOWED')
  assert.equal(r.headers['content-type'], 'application/json')
})

test('rejects malformed JSON with 400 INVALID_JSON', async () => {
  const r = await call('POST', '{not json')
  assert.equal(r.status, 400)
  assert.equal(r.json.code, 'INVALID_JSON')
})

test('honeypot gets a fake success and sends no email', async () => {
  const before = messages.length
  const r = await call('POST', JSON.stringify({ ...valid, website: 'http://spam.example' }))
  assert.equal(r.status, 200)
  assert.equal(r.json.success, true)
  assert.equal(messages.length, before)
})

test('validation errors return 400 with field errors', async () => {
  const r = await call('POST', JSON.stringify({ ...valid, email: 'nope', message: 'short' }))
  assert.equal(r.status, 400)
  assert.equal(r.json.code, 'VALIDATION_ERROR')
  assert.ok(r.json.errors.email)
  assert.ok(r.json.errors.message)
})

test('valid submission emails the admin via SMTP and returns 200', async () => {
  const before = messages.length
  const r = await call('POST', JSON.stringify(valid))
  assert.equal(r.status, 200, JSON.stringify(r.json))
  assert.equal(r.json.success, true)
  assert.equal(messages.length, before + 1)
  const m = messages.at(-1)
  assert.match(m.rcpt[0], /admin@example\.com/)
  assert.match(m.from, /website@example\.com/)
  assert.match(m.data, /Reply-To: visitor@example\.com/i)
  assert.match(m.data, /SSM Website Test/)
})

test('accepts a body pre-parsed by the Vercel runtime (req.body object)', async () => {
  const before = messages.length
  const r = await call('POST', undefined, { preParsed: valid })
  assert.equal(r.status, 200)
  assert.equal(messages.length, before + 1)
})

test('reCAPTCHA is enforced when RECAPTCHA_SECRET_KEY is set', async () => {
  process.env.RECAPTCHA_SECRET_KEY = 'test-secret'
  try {
    let r = await call('POST', JSON.stringify(valid))
    assert.equal(r.status, 400)
    assert.equal(r.json.code, 'RECAPTCHA_FAILED')

    const verifyCalls = []
    globalThis.fetch = async (url, init) => {
      verifyCalls.push({ url, body: init.body })
      return { json: async () => ({ success: init.body.includes('response=good-token') }) }
    }
    r = await call('POST', JSON.stringify({ ...valid, recaptchaToken: 'bad-token' }))
    assert.equal(r.status, 400)
    assert.equal(r.json.code, 'RECAPTCHA_FAILED')

    r = await call('POST', JSON.stringify({ ...valid, recaptchaToken: 'good-token' }))
    assert.equal(r.status, 200)
    assert.match(verifyCalls[0].url, /recaptcha\/api\/siteverify/)
    assert.match(verifyCalls[0].body, /secret=test-secret/)
  } finally {
    delete process.env.RECAPTCHA_SECRET_KEY
    globalThis.fetch = realFetch
  }
})

test('missing SMTP config returns 502 CONFIG_ERROR', async () => {
  const saved = process.env.SMTP_PASS
  delete process.env.SMTP_PASS
  try {
    const r = await call('POST', JSON.stringify(valid))
    assert.equal(r.status, 502)
    assert.equal(r.json.code, 'CONFIG_ERROR')
  } finally {
    process.env.SMTP_PASS = saved
  }
})
