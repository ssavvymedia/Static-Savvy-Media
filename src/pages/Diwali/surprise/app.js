/* Diwali Digital Surprise: screen controller. Drives the static markup rendered by Diwali2026.jsx. */
import { Stage, REDUCED, LOWEND, textPoints } from './fx.js'
import { Sound } from './audio.js'
import { T, CRACKER_META, encodeWish, decodeWishFromLocation, sanitizeWish } from './data.js'
import { campaignPhase, validateWish, LIMITS, DIWALI_PATH } from '../../../data/diwaliCampaign.js'

const API = '/api/diwali-lead'
const PENDING_KEY = 'ssm-diwali-pending'
const PROFILE_KEY = 'ssm-diwali-sender'

function track(event, params = {}) {
  try {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event, ...params })
  } catch { /* optional */ }
}
function utmString() {
  try {
    const q = new URLSearchParams(location.search), out = []
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid']) {
      const v = q.get(k)
      if (v) out.push(`${k}=${v.slice(0, 60)}`)
    }
    if (!out.length && document.referrer) {
      try { const r = new URL(document.referrer); if (r.host !== location.host) out.push(`ref=${r.host}`) } catch { /* ignore */ }
    }
    return out.join('&').slice(0, LIMITS.utm)
  } catch { return '' }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function postLead(body) {
  const res = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), credentials: 'same-origin', keepalive: true })
  let data = {}
  try { data = await res.json() } catch { /* empty */ }
  return { status: res.status, data }
}
function queuePending(body) {
  try {
    const q = JSON.parse(localStorage.getItem(PENDING_KEY) || '[]').slice(-4)
    q.push({ ...body, elapsedMs: Math.max(body.elapsedMs || 0, 5000) })
    localStorage.setItem(PENDING_KEY, JSON.stringify(q))
  } catch { /* ignore */ }
}
async function flushPending() {
  let q
  try { q = JSON.parse(localStorage.getItem(PENDING_KEY) || '[]') } catch { return }
  if (!q.length) return
  const keep = []
  for (const b of q) {
    try {
      const r = await postLead(b)
      if (r.status >= 500 || r.status === 429) keep.push(b)
    } catch { keep.push(b) }
  }
  try { localStorage.setItem(PENDING_KEY, JSON.stringify(keep)) } catch { /* ignore */ }
}

export function mount(root) {
  const $ = (s) => root.querySelector(s)
  const $$ = (s) => [...root.querySelectorAll(s)]
  const logoSrc = root.dataset.logo
  const cv = $('#dw-stage')
  const stage = new Stage(cv, { scene: 'full', onSfx: (n, o) => Sound.play(n, o) })
  const S = {
    screen: 'welcome', cracker: 'ssm', lang: 'en', mode: 'preview', wish: null, link: '', lit: false,
    createdAt: 0, busy: false, video: null, videoKey: '', rendering: null, timers: [], alive: true,
  }
  Sound.load()
  const phase = () => campaignPhase(Date.now())

  /* ---------- canvas sizing + loop ---------- */
  const dprCap = LOWEND ? 1.5 : 2
  const fit = () => {
    const w = root.clientWidth || innerWidth, h = innerHeight
    stage.resize(w, h, Math.min(devicePixelRatio || 1, dprCap))
    if (stage.stick && !S.lit) placeStick(true)
  }
  let raf = 0, last = 0, slow = 0
  const cards = []
  let pcard = null
  const loop = (now) => {
    raf = requestAnimationFrame(loop)
    if (S.rendering) return
    const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016)
    last = now
    if (dt > 0.034) { if (++slow > 40 && stage.q > 0.5) { stage.q *= 0.85; slow = 0 } } else slow = Math.max(0, slow - 1)
    stage.step(dt)
    stage.render()
    if (S.screen === 'choose') for (const c of cards) if (c.vis) tickCard(c, dt)
    if (S.screen === 'create' && pcard) tickCard(pcard, dt)
  }

  /* ---------- small canvases (cards + preview card) ---------- */
  function makeCard(canvas, cracker, o = {}) {
    const st = new Stage(canvas, { scene: 'card', preview: true, max: o.max || 450 })
    const c = { st, canvas, cracker, vis: true, next: 0.4 + Math.random() * 0.8, w: 0, h: 0 }
    sizeCard(c)
    st.setObj(cracker)
    return c
  }
  function sizeCard(c) {
    const r = c.canvas.getBoundingClientRect()
    if (!r.width || !r.height) return false
    if (Math.abs(r.width - c.w) < 1 && Math.abs(r.height - c.h) < 1) return true
    c.w = r.width
    c.h = r.height
    c.st.resize(r.width, r.height, Math.min(devicePixelRatio || 1, 1.5))
    return true
  }
  function tickCard(c, dt) {
    if (!c.w && !sizeCard(c)) return
    c.next -= dt
    if (c.next <= 0) {
      c.st.reset()
      c.st.setObj(c.cracker)
      const tm = c.st.play()
      c.next = tm.end + (REDUCED ? 3 : 0.8)
    }
    c.st.step(dt)
    c.st.render()
  }
  function initCards() {
    if (cards.length) return
    const io = 'IntersectionObserver' in window ? new IntersectionObserver((ents) => ents.forEach((e) => { const c = cards.find((k) => k.canvas === e.target); if (c) c.vis = e.isIntersecting })) : null
    $$('.dw-card').forEach((b) => {
      const c = makeCard(b.querySelector('canvas'), b.dataset.cracker)
      cards.push(c)
      if (io) io.observe(c.canvas)
    })
    S.io = io
  }

  /* ---------- screens ---------- */
  const SCREENS = ['welcome', 'choose', 'light', 'create', 'reveal']
  function show(name) {
    S.screen = name
    root.dataset.screen = name
    for (const s of SCREENS) {
      const el = $(`#dw-s-${s}`)
      el.hidden = s !== name
      el.classList.toggle('is-on', s === name)
    }
    $('#dw-back').hidden = name === 'welcome' || (S.mode === 'recipient' && (name === 'light' || name === 'reveal'))
    if (name !== 'light' && name !== 'reveal') {
      stage.obj = null
      stage.stick = null
      stage.ambient = REDUCED ? false : 'calm'
    }
    if (name === 'choose') { initCards(); cards.forEach((c) => { c.w = 0 }) }
    const h = $(`#dw-s-${name} h1, #dw-s-${name} h2`)
    if (h) { h.setAttribute('tabindex', '-1'); try { h.focus({ preventScroll: true }) } catch { /* */ } }
    $(`#dw-s-${name}`).scrollTop = 0
    track('diwali_screen', { screen: name })
  }
  const toastEl = $('#dw-toast')
  let toastT = 0
  function toast(msg) {
    toastEl.textContent = msg
    toastEl.classList.add('is-on')
    clearTimeout(toastT)
    toastT = setTimeout(() => toastEl.classList.remove('is-on'), 3200)
  }
  function windowNote() {
    const p = phase(), el = $('#dw-window'), btn = $('#dw-start')
    if (p === 'active') { el.textContent = 'Free to create · 3 to 9 Nov 2026'; btn.disabled = false; return true }
    btn.disabled = true
    el.textContent = p === 'ended' ? 'The Diwali 2026 surprise campaign has ended. Thank you for celebrating with us! Shared surprises still open.' : 'Creating surprises opens on 3 Nov 2026, 12:00 AM IST.'
    el.classList.add('dw-note--warn')
    return false
  }

  /* ---------- sound toggle ---------- */
  const sb = $('#dw-sound')
  const paintSound = () => { sb.setAttribute('aria-pressed', String(Sound.on)); sb.setAttribute('aria-label', Sound.on ? 'Sound on, tap to mute' : 'Sound off, tap to unmute'); sb.classList.toggle('is-off', !Sound.on) }
  paintSound()
  sb.addEventListener('click', () => { Sound.toggle(); paintSound() })
  const unlock = () => { Sound.init(); if (Sound.on) Sound.startMusic() }
  root.addEventListener('pointerdown', unlock, { once: true, capture: true })
  root.addEventListener('keydown', unlock, { once: true, capture: true })

  /* ---------- step 1: choose ---------- */
  function selectCracker(id) {
    S.cracker = id
    $$('.dw-card').forEach((b) => { const on = b.dataset.cracker === id; b.classList.toggle('is-sel', on); b.setAttribute('aria-checked', String(on)) })
  }
  $$('.dw-card').forEach((b) => b.addEventListener('click', () => selectCracker(b.dataset.cracker)))
  $('.dw-cards').addEventListener('keydown', (e) => {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(e.key)) return
    const ids = $$('.dw-card').map((b) => b.dataset.cracker), i = ids.indexOf(S.cracker)
    const n = ids[(i + (e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : ids.length - 1)) % ids.length]
    selectCracker(n)
    $(`.dw-card[data-cracker="${n}"]`).focus()
    e.preventDefault()
  })
  $('#dw-start').addEventListener('click', () => { if (windowNote()) { S.mode = 'preview'; show('choose') } })
  $('#dw-preview').addEventListener('click', () => enterLight('preview'))
  $('#dw-continue').addEventListener('click', () => enterCreate())

  /* ---------- light screen (agarbathi + LIGHT IT) ---------- */
  function placeStick(snap) {
    const u = stage.u, rest = { x: stage.W / 2 + 64 * u, y: stage.floorY - 96 * u }
    if (!stage.stick) stage.stick = { x: rest.x + 80 * u, y: rest.y + 120 * u, a: 0.95, vis: true, k: 7 }
    stage.stick.rest = rest
    stage.stick.tx = rest.x
    stage.stick.ty = rest.y
    if (snap) { stage.stick.x = rest.x; stage.stick.y = rest.y }
  }
  function enterLight(mode) {
    S.mode = mode
    S.lit = false
    clearTimers()
    stage.reset()
    stage.ambient = false
    stage.stick = null
    const ck = mode === 'preview' ? S.cracker : S.wish.cracker
    stage.setObj(ck)
    placeStick(false)
    const meta = CRACKER_META[ck]
    const L = T[(S.wish && S.wish.lang) || 'en']
    const step = $('#dw-light-step'), title = $('#dw-light-title'), sub = $('#dw-light-sub')
    if (mode === 'preview') {
      step.textContent = 'Preview'
      title.textContent = meta.name
      sub.textContent = meta.desc
    } else if (mode === 'sender') {
      step.textContent = 'Almost done'
      title.textContent = 'Your Surprise Is Ready!'
      sub.textContent = `Light the firecracker to see what ${S.wish.to} will see.`
    } else {
      step.textContent = L.teaser
      title.textContent = S.wish.to
      sub.textContent = S.wish.lang === 'ta' ? `${S.wish.from} உங்களுக்காக ஒரு பட்டாசு அனுப்பியுள்ளார்` : `${S.wish.from} sent you a firecracker`
    }
    $('#dw-light-btn').textContent = mode === 'preview' ? 'Light it 🪔' : mode === 'sender' ? 'Light the firecracker 🪔' : S.wish.lang === 'ta' ? 'பட்டாசைப் பற்ற வை 🪔' : 'Light the firecracker 🪔'
    $('#dw-light-btn').hidden = false
    $('#dw-light-hint').hidden = false
    $('#dw-light-after').hidden = true
    show('light')
  }
  function clearTimers() { S.timers.forEach(clearTimeout); S.timers = [] }
  function lightIt(how) {
    if (S.lit || S.screen !== 'light') return
    S.lit = true
    unlock()
    track('diwali_light', { mode: S.mode, cracker: stage.obj.type, how })
    $('#dw-light-btn').hidden = true
    $('#dw-light-hint').hidden = true
    if (stage.stick) { stage.stick.tx = stage.stick.rest.x + 70 * stage.u; stage.stick.ty = stage.stick.rest.y + 40 * stage.u; S.timers.push(setTimeout(() => { if (stage.stick) stage.stick.vis = false }, 650)) }
    const tm = stage.play()
    const mode = S.mode
    if (mode === 'preview') stage.at(tm.end, () => { if (S.screen === 'light') $('#dw-light-after').hidden = false })
    else stage.at(tm.reveal, () => { if (S.screen === 'light') reveal() })
  }
  $('#dw-light-btn').addEventListener('click', () => lightIt('button'))
  $('#dw-light-again').addEventListener('click', () => enterLight('preview'))
  $('#dw-light-pick').addEventListener('click', () => enterCreate())

  // drag the agarbathi
  let drag = null
  cv.addEventListener('pointerdown', (e) => {
    const x = e.clientX, y = e.clientY
    if (S.screen === 'reveal') { stage.tapAt(x, y); return }
    if (S.screen !== 'light' || S.lit || !stage.stick) return
    const st = stage.stick, u = stage.u
    const near = Math.hypot(x - st.x, y - st.y) < 70 * u || Math.hypot(x - (st.x + Math.cos(st.a) * 50 * u), y - (st.y + Math.sin(st.a) * 50 * u)) < 60 * u
    if (!near) return
    drag = { id: e.pointerId, dx: st.x - x, dy: st.y - y }
    try { cv.setPointerCapture(e.pointerId) } catch { /* */ }
    st.k = 30
    e.preventDefault()
  })
  cv.addEventListener('pointermove', (e) => {
    if (!drag || drag.id !== e.pointerId || !stage.stick) return
    const st = stage.stick
    st.tx = e.clientX + drag.dx
    st.ty = e.clientY + drag.dy
    const fz = stage.fusePt()
    if (fz && Math.hypot(st.x - fz.x, st.y - fz.y) < 16 * stage.u) { drag = null; st.k = 7; lightIt('agarbathi') }
  })
  const endDrag = (e) => {
    if (!drag || drag.id !== e.pointerId) return
    drag = null
    if (stage.stick && !S.lit) { stage.stick.k = 7; stage.stick.tx = stage.stick.rest.x; stage.stick.ty = stage.stick.rest.y }
  }
  cv.addEventListener('pointerup', endDrag)
  cv.addEventListener('pointercancel', endDrag)

  /* ---------- reveal ---------- */
  function fillWish(w) {
    const L = T[w.lang]
    $('#dw-r-head').textContent = L.head
    $('#dw-r-name').textContent = w.to
    $('#dw-r-msg').textContent = w.msg
    $('#dw-r-sig').textContent = L.sig(w.from)
    $('#dw-wish').lang = w.lang
    $('#dw-tap').textContent = w.lang === 'ta' ? 'மேலும் பட்டாசுகளுக்கு வானத்தைத் தொடுங்கள்' : 'Tap the sky for more fireworks'
  }
  function reveal() {
    const w = S.wish
    fillWish(w)
    const sender = S.mode === 'sender'
    $('#dw-sheet-sender').hidden = !sender
    $('#dw-sheet-recip').hidden = sender
    if (sender) {
      $('#dw-wa').href = `https://wa.me/?text=${encodeURIComponent(T[w.lang].wa(w.to, S.link))}`
    }
    const wishEl = $('#dw-wish'), sheet = $('#dw-sheet')
    wishEl.classList.remove('is-in')
    sheet.classList.remove('is-in')
    show('reveal')
    void wishEl.offsetWidth
    wishEl.classList.add('is-in')
    S.timers.push(setTimeout(() => sheet.classList.add('is-in'), REDUCED ? 200 : 2600))
    stage.ambient = REDUCED ? false : 'celebrate'
    stage.ambT = 1.6
    // sparks write the recipient's name before the gold letters fade in
    requestAnimationFrame(() => {
      const n = $('#dw-r-name'), r = n.getBoundingClientRect(), cs = getComputedStyle(n)
      if (!r.width) return
      const font = `${cs.fontStyle} ${cs.fontWeight} ${parseFloat(cs.fontSize)}px ${cs.fontFamily}`
      const pts = textPoints(w.to, font, r.left + r.width / 2, r.top + r.height / 2, REDUCED ? 200 : LOWEND ? 350 : 600).map((p) => ({ ...p, col: Math.random() < 0.7 ? '#FFE9A8' : '#F6C453' }))
      stage.formTo(pts, { from: stage.lastBurst || { x: stage.W / 2, y: stage.H * 0.3 }, dur: 0.85, stagger: 0.25, hold: 0.8, curve: 70 })
      stage.sfx('shimmer')
    })
    track('diwali_reveal', { mode: S.mode, cracker: w.cracker, lang: w.lang })
  }
  $('#dw-replay').addEventListener('click', () => enterLight('sender'))
  $('#dw-r-replay').addEventListener('click', () => enterLight('recipient'))
  $('#dw-another').addEventListener('click', () => {
    $('#dw-to').value = ''
    S.wish = null
    S.mode = 'preview'
    show('choose')
  })
  $('#dw-own').addEventListener('click', () => {
    track('diwali_create_own')
    if (phase() !== 'active') { toast(phase() === 'ended' ? 'The Diwali 2026 campaign has ended. Thank you!' : 'Creating opens on 3 Nov 2026.'); return }
    try { history.replaceState(null, '', DIWALI_PATH + location.search) } catch { /* */ }
    S.wish = null
    S.mode = 'preview'
    show('choose')
  })
  $('#dw-copy').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(S.link); toast('Link copied ✨') } catch {
      const ta = document.createElement('textarea')
      ta.value = S.link
      document.body.appendChild(ta)
      ta.select()
      let ok = false
      try { ok = document.execCommand('copy') } catch { /* */ }
      ta.remove()
      toast(ok ? 'Link copied ✨' : S.link)
    }
    track('diwali_copy')
  })
  $('#dw-wa').addEventListener('click', () => track('diwali_share_whatsapp', { lang: S.wish && S.wish.lang }))

  /* ---------- step 2: personalise ---------- */
  const f = { to: $('#dw-to'), from: $('#dw-from'), phone: $('#dw-phone'), msg: $('#dw-msg') }
  const chips = $('#dw-chips')
  function renderChips() {
    chips.textContent = ''
    T[S.lang].tpl.forEach((txt, i) => {
      const b = document.createElement('button')
      b.type = 'button'
      b.className = 'dw-chip'
      b.setAttribute('role', 'listitem')
      b.dataset.i = String(i)
      b.lang = S.lang
      b.textContent = txt
      b.classList.toggle('is-on', f.msg.value === txt)
      b.addEventListener('click', () => { f.msg.value = txt; syncPreview(); clearErr('message'); $$('.dw-chip').forEach((c) => c.classList.toggle('is-on', c === b)) })
      chips.appendChild(b)
    })
  }
  function setLang(l) {
    const prev = S.lang
    if (l === prev) return
    const idx = T[prev].tpl.indexOf(f.msg.value)
    S.lang = l
    if (idx >= 0) f.msg.value = T[l].tpl[idx]
    $$('.dw-seg button').forEach((b) => { const on = b.dataset.lang === l; b.classList.toggle('is-on', on); b.setAttribute('aria-checked', String(on)) })
    renderChips()
    syncPreview()
  }
  $$('.dw-seg button').forEach((b) => b.addEventListener('click', () => setLang(b.dataset.lang)))
  function syncPreview() {
    const L = T[S.lang]
    $('#dw-pc-head').textContent = L.head
    $('#dw-pc-name').textContent = f.to.value.trim() || (S.lang === 'ta' ? 'உங்கள் அன்புக்குரியவர்' : 'Someone special')
    $('#dw-pc-msg').textContent = f.msg.value.trim()
    $('#dw-pc-sig').textContent = L.sig(f.from.value.trim() || (S.lang === 'ta' ? 'நீங்கள்' : 'you'))
    $('#dw-pcard').lang = S.lang
    const n = [...f.msg.value].length
    const cnt = $('#dw-count')
    cnt.textContent = `${n}/${LIMITS.message[1]}`
    cnt.classList.toggle('is-max', n >= LIMITS.message[1])
    $$('.dw-chip').forEach((c) => c.classList.toggle('is-on', c.textContent === f.msg.value))
  }
  function clearErr(k) {
    const el = $(`[data-err="${k}"]`)
    if (el) el.textContent = ''
    const inp = { recipient: f.to, sender: f.from, phone: f.phone, message: f.msg }[k]
    if (inp) inp.removeAttribute('aria-invalid')
  }
  ;[['to', 'recipient'], ['from', 'sender'], ['phone', 'phone'], ['msg', 'message']].forEach(([k, e]) => f[k].addEventListener('input', () => { clearErr(e); if (!root.querySelector('#dw-form [aria-invalid="true"]')) $('#dw-form-err').textContent = ''; syncPreview() }))
  function enterCreate() {
    if (phase() !== 'active') { windowNote(); toast('Creating surprises is closed right now.'); return }
    try {
      const p = JSON.parse(localStorage.getItem(PROFILE_KEY) || 'null')
      if (p && !f.from.value) f.from.value = p.from || ''
      if (p && !f.phone.value) f.phone.value = p.phone || ''
    } catch { /* */ }
    if (!f.msg.value) f.msg.value = T[S.lang].tpl[0]
    renderChips()
    syncPreview()
    S.createdAt = performance.now()
    show('create')
    if (!pcard) pcard = makeCard($('#dw-pcard-cv'), S.cracker, { max: 500 })
    pcard.cracker = S.cracker
    pcard.w = 0
    pcard.next = 0.3
    pcard.st.setObj(S.cracker)
  }
  const form = $('#dw-form')
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    if (S.busy) return
    const fe = $('#dw-form-err')
    fe.textContent = ''
    if (phase() !== 'active') { fe.textContent = phase() === 'ended' ? 'The Diwali 2026 campaign has ended. Thank you!' : 'Creating opens on 3 Nov 2026.'; return }
    const input = { sender: f.from.value, phone: f.phone.value, recipient: f.to.value, cracker: S.cracker, lang: S.lang, message: f.msg.value }
    const v = validateWish(input)
    ;['recipient', 'sender', 'phone', 'message'].forEach(clearErr)
    if (!v.ok) {
      showErrors(v.errors)
      return
    }
    S.busy = true
    const btn = $('#dw-submit'), label = btn.textContent
    btn.disabled = true
    btn.textContent = 'Creating your surprise…'
    const body = { ...input, source: utmString(), website: form.elements.website.value, elapsedMs: Math.round(performance.now() - S.createdAt) }
    let proceed = false
    try {
      let r = null
      for (let k = 0; k < 2 && !r; k++) {
        try {
          const x = await postLead(body)
          if (x.status >= 500) { if (k) r = x; else await sleep(1200) } else r = x
        } catch { if (k) r = { status: 0, data: {} }; else await sleep(1200) }
      }
      if (r.status === 200) proceed = true
      else if (r.status === 400 && r.data && r.data.errors) showErrors(r.data.errors)
      else if (r.status === 403 || r.status === 410) fe.textContent = r.status === 410 ? 'The Diwali 2026 campaign has ended. Thank you!' : 'Creating opens on 3 Nov 2026.'
      else if (r.status === 429) fe.textContent = 'Too many surprises in a short time. Please wait a few minutes and try again.'
      else { queuePending(body); proceed = true }
    } finally {
      S.busy = false
      btn.disabled = false
      btn.textContent = label
    }
    if (!proceed) return
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify({ from: v.wish.sender, phone: f.phone.value.trim() })) } catch { /* */ }
    track('diwali_wish_created', { cracker: S.cracker, lang: S.lang })
    S.wish = sanitizeWish({ to: v.wish.recipient, from: v.wish.sender, msg: v.wish.message, cracker: S.cracker, lang: S.lang })
    S.link = `${location.origin}${DIWALI_PATH}#w=${encodeWish(S.wish)}`
    S.video = null
    enterLight('sender')
  })
  function showErrors(errs) {
    const map = { recipient: f.to, sender: f.from, phone: f.phone, message: f.msg }
    let first = null
    for (const [k, msg] of Object.entries(errs)) {
      const el = $(`[data-err="${k}"]`)
      if (el) el.textContent = msg
      if (map[k]) { map[k].setAttribute('aria-invalid', 'true'); first = first || map[k] }
    }
    $('#dw-form-err').textContent = 'Please check the highlighted fields.'
    if (first) first.focus()
  }

  /* ---------- back ---------- */
  $('#dw-back').addEventListener('click', () => {
    clearTimers()
    if (S.screen === 'choose') show('welcome')
    else if (S.screen === 'create') show('choose')
    else if (S.screen === 'light') S.mode === 'preview' ? show('choose') : enterCreate()
    else if (S.screen === 'reveal') enterCreate()
  })

  /* ---------- video ---------- */
  const modal = $('#dw-modal')
  let cancelFlag = false
  async function makeVideo() {
    const w = S.wish
    if (!w) return
    unlock()
    const key = JSON.stringify(w)
    modal.hidden = false
    if (S.video && S.videoKey === key) { showReady(); return }
    $('#dw-m-progress').hidden = false
    $('#dw-m-ready').hidden = true
    $('#dw-m-bar').style.width = '0%'
    $('#dw-m-pct').textContent = 'Rendering 0%'
    cancelFlag = false
    S.rendering = true
    track('diwali_video_start', { cracker: w.cracker })
    try {
      const { exportVideo } = await import('./video.js')
      const res = await exportVideo({
        wish: w, logoSrc,
        onProgress: (p) => { const v = Math.round(p * 100); $('#dw-m-bar').style.width = `${v}%`; $('#dw-m-pct').textContent = `Rendering ${v}%` },
        isCancelled: () => cancelFlag,
      })
      if (S.video && S.video.url) URL.revokeObjectURL(S.video.url)
      S.video = { ...res, url: URL.createObjectURL(res.blob) }
      S.videoKey = key
      root.dataset.video = `${res.mime};${res.blob.size}`
      showReady()
      track('diwali_video_ready', { format: res.ext })
    } catch (err) {
      modal.hidden = true
      if (!(err && err.message === 'cancelled')) toast('Sorry, this browser could not make the video. Try Chrome, or share the link instead.')
    } finally {
      S.rendering = false
      last = 0
    }
  }
  function showReady() {
    const v = S.video, w = S.wish
    $('#dw-m-progress').hidden = true
    $('#dw-m-ready').hidden = false
    const vid = $('#dw-m-video')
    vid.src = v.url
    vid.play().catch(() => {})
    const slug = (w.to.normalize('NFKD').replace(/[^\w]+/g, '-').replace(/^-|-$/g, '').toLowerCase() || 'wish').slice(0, 24)
    const name = `diwali-surprise-${slug}.${v.ext}`
    const save = $('#dw-m-save')
    save.href = v.url
    save.download = name
    const file = typeof File !== 'undefined' ? new File([v.blob], name, { type: v.mime }) : null
    const canShare = !!(file && navigator.canShare && navigator.canShare({ files: [file] }))
    $('#dw-m-share').hidden = !canShare
    $('#dw-m-share').onclick = async () => {
      try { await navigator.share({ files: [file], text: 'Happy Diwali ✨' }); track('diwali_video_share') } catch { /* dismissed */ }
    }
    $('#dw-m-note').textContent = canShare ? '' : 'Save the video, then post it to your WhatsApp Status from your gallery.'
    $('#dw-m-close').focus()
  }
  $('#dw-video').addEventListener('click', makeVideo)
  $('#dw-r-video').addEventListener('click', makeVideo)
  $('#dw-m-cancel').addEventListener('click', () => { cancelFlag = true })
  $('#dw-m-close').addEventListener('click', () => { modal.hidden = true; $('#dw-m-video').pause() })
  $('#dw-m-save').addEventListener('click', () => track('diwali_video_save'))
  modal.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !S.rendering) { modal.hidden = true; $('#dw-m-video').pause() } })

  /* ---------- boot ---------- */
  fit()
  addEventListener('resize', fit)
  stage.ambient = REDUCED ? false : 'calm'
  stage.ambT = 0.8
  raf = requestAnimationFrame(loop)
  windowNote()
  const fromLink = decodeWishFromLocation(location)
  if (fromLink.present) {
    if (fromLink.wish) {
      S.wish = fromLink.wish
      S.mode = 'recipient'
      root.classList.add('is-recipient')
      track('diwali_open_link', { cracker: S.wish.cracker, lang: S.wish.lang })
      enterLight('recipient')
    } else toast('This surprise link looks broken. You can still create your own!')
  }
  flushPending()
  root.classList.add('is-ready')

  return {
    destroy() {
      S.alive = false
      cancelAnimationFrame(raf)
      removeEventListener('resize', fit)
      clearTimers()
      if (S.io) S.io.disconnect()
      if (S.video && S.video.url) URL.revokeObjectURL(S.video.url)
    },
  }
}
