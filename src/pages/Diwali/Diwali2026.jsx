import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logoImg from '../../assets/images/logo/SSMLOGO.webp'
import {
  CAMPAIGN_END_MS,
  CAMPAIGN_START_MS,
  DIWALI_SERVICES,
  DIWALI_TEL,
  DIWALI_WHATSAPP_DISPLAY,
  DIWALI_WHATSAPP_E164,
  campaignPhase,
  normalizePhone,
  validateLead,
} from '../../data/diwaliCampaign.js'
import '../../styles/pages/diwali.css'

const WA_TEXT = encodeURIComponent('Hi Static Savvy Media, I would like to claim the Diwali 2026 offer (free growth audit + GBP setup).')
const WA_URL = `https://wa.me/${DIWALI_WHATSAPP_E164}?text=${WA_TEXT}`
const CLAIMED_KEY = 'ssm-diwali-2026-claimed'

const DIYAS = [
  { key: 'seo', label: 'Visibility', line: 'Rank higher on Google for the searches your buyers make.' },
  { key: 'gbp', label: 'Local trust', line: 'A Google Business Profile that wins the map pack.' },
  { key: 'web', label: 'Website', line: 'A fast site that turns festive traffic into enquiries.' },
  { key: 'social', label: 'Social', line: 'Reels and posts people stop scrolling for.' },
  { key: 'leads', label: 'Leads', line: 'Ads and funnels that fill your phone all season.' },
]

const AUDIT_POINTS = [
  'SEO health check: rankings, indexing and quick wins',
  'Google Business Profile review against your top 3 local competitors',
  'Website speed and mobile experience report',
  'Social media and ads opportunity scan',
  'A 30-day festive growth action plan, explained on a call',
]

function dataLayerPush(event, params = {}) {
  try {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event, ...params })
  } catch {
    /* analytics is optional */
  }
}

function Diya({ lit, index, onLight, label }) {
  return (
    <button
      type="button"
      className={`dw-diya${lit ? ' is-lit' : ''}`}
      style={{ '--i': index }}
      aria-pressed={lit}
      aria-label={lit ? `${label} diya is lit` : `Light the ${label} diya`}
      onClick={(e) => onLight(index, e)}
      data-no-sky
    >
      <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id={`dwg-${index}`} cx="50%" cy="60%" r="50%">
            <stop offset="0" stopColor="#fff6d8" />
            <stop offset=".35" stopColor="#ffd36b" />
            <stop offset=".7" stopColor="#ff8a1f" />
            <stop offset="1" stopColor="#ff5a1f" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`dwb-${index}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#f5c66b" />
            <stop offset=".18" stopColor="#b5651d" />
            <stop offset="1" stopColor="#5a2410" />
          </linearGradient>
        </defs>
        <circle className="dw-diya__halo" cx="60" cy="58" r="44" fill={`url(#dwg-${index})`} />
        <g className="dw-diya__flame">
          <path d="M60 30c7 10 11 17 11 25a11 11 0 0 1-22 0c0-8 4-15 11-25z" fill={`url(#dwg-${index})`} />
          <path d="M60 44c3 5 5 8 5 12a5 5 0 0 1-10 0c0-4 2-7 5-12z" fill="#fff8e1" />
        </g>
        <path d="M60 64v-6" stroke="#3b1d0e" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 66c6 22 24 34 46 34s40-12 46-34c-14 5-30 8-46 8s-32-3-46-8z" fill={`url(#dwb-${index})`} />
        <path d="M14 66c14 5 30 8 46 8s32-3 46-8" fill="none" stroke="#ffd98a" strokeWidth="2.2" />
        <path d="M34 86c8 4 17 6 26 6s18-2 26-6" fill="none" stroke="#f5c66b" strokeOpacity=".55" strokeWidth="1.4" strokeDasharray="2 5" />
      </svg>
      <span className="dw-diya__label">{label}</span>
    </button>
  )
}

function Rangoli() {
  const petals = (n, r, len, w) =>
    Array.from({ length: n }, (_, i) => (
      <path key={i} transform={`rotate(${(360 / n) * i} 200 200)`} d={`M200 ${200 - r}c${w} -${len * 0.35} ${w} -${len * 0.75} 0 -${len}c-${w} ${len * 0.25} -${w} ${len * 0.65} 0 ${len}z`} />
    ))
  return (
    <svg className="dw-rangoli" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="dwr-a" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#a855f7" />
          <stop offset=".5" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <g className="dw-rangoli__ring dw-rangoli__ring--1" stroke="url(#dwr-a)">{petals(16, 128, 60, 16)}</g>
      <g className="dw-rangoli__ring dw-rangoli__ring--2" stroke="#f5c66b">{petals(12, 80, 46, 14)}</g>
      <g className="dw-rangoli__ring dw-rangoli__ring--3" stroke="#ec4899">{petals(8, 34, 34, 12)}</g>
      <circle className="dw-rangoli__ring" cx="200" cy="200" r="190" stroke="#f5c66b" strokeDasharray="2 10" />
      <circle className="dw-rangoli__ring" cx="200" cy="200" r="150" stroke="url(#dwr-a)" />
      <circle className="dw-rangoli__ring" cx="200" cy="200" r="22" stroke="#ffd98a" />
      {Array.from({ length: 24 }, (_, i) => (
        <circle key={i} className="dw-rangoli__dot" cx={200 + 172 * Math.cos((i / 24) * Math.PI * 2)} cy={200 + 172 * Math.sin((i / 24) * Math.PI * 2)} r="3" />
      ))}
    </svg>
  )
}

function useCountdown(target, enabled) {
  const [left, setLeft] = useState(null)
  useEffect(() => {
    if (!enabled) return undefined
    const tick = () => setLeft(Math.max(0, target - Date.now()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target, enabled])
  if (left === null) return null
  const s = Math.floor(left / 1000)
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 }
}

function Countdown({ phase }) {
  const target = phase === 'upcoming' ? CAMPAIGN_START_MS : CAMPAIGN_END_MS
  const c = useCountdown(target, phase !== 'ended')
  if (phase === 'ended') return null
  const cells = c ? [['Days', c.d], ['Hrs', c.h], ['Min', c.m], ['Sec', c.s]] : [['Days', '–'], ['Hrs', '–'], ['Min', '–'], ['Sec', '–']]
  return (
    <div className="dw-count" role="timer" aria-label={phase === 'upcoming' ? 'Offer opens in' : 'Offer closes in'}>
      <span className="dw-count__lead">{phase === 'upcoming' ? 'Opens in' : 'Offer closes in'}</span>
      <div className="dw-count__cells">
        {cells.map(([k, v]) => (
          <span className="dw-count__cell" key={k}>
            <b>{typeof v === 'number' ? String(v).padStart(2, '0') : v}</b>
            <small>{k}</small>
          </span>
        ))}
      </div>
    </div>
  )
}

function readSource() {
  try {
    const q = new URLSearchParams(window.location.search)
    const parts = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid']
      .filter((k) => q.get(k))
      .map((k) => `${k}=${q.get(k).slice(0, 60)}`)
    let ref = ''
    if (document.referrer) {
      try {
        const r = new URL(document.referrer)
        if (r.host !== window.location.host) ref = `ref=${r.host}`
      } catch {
        /* ignore */
      }
    }
    return [...parts, ref].filter(Boolean).join('&').slice(0, 300) || 'direct'
  } catch {
    return 'direct'
  }
}

function LeadForm({ phase, onSuccess }) {
  const [values, setValues] = useState({ name: '', phone: '', business: '', service: '', website: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const [message, setMessage] = useState('')
  const startedAt = useRef(0)
  const disabled = phase !== 'active'

  useEffect(() => {
    startedAt.current = Date.now()
    try {
      const saved = JSON.parse(localStorage.getItem(CLAIMED_KEY) || 'null')
      if (saved && saved.phone) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only state read after hydration (SSR must match first render)
        setStatus('done')
        setMessage('You have already claimed the Diwali offer from this device. Our team will reach you shortly.')
      }
    } catch {
      /* storage blocked */
    }
  }, [])

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const submit = async (e) => {
    e.preventDefault()
    if (disabled || status === 'sending') return
    const v = validateLead(values)
    if (!v.ok) {
      setErrors(v.errors)
      const first = Object.keys(v.errors)[0]
      document.getElementById(`dw-${first}`)?.focus()
      return
    }
    try {
      const saved = JSON.parse(localStorage.getItem(CLAIMED_KEY) || 'null')
      if (saved && saved.phone === v.lead.phone) {
        setStatus('done')
        setMessage('This number has already claimed the Diwali offer. Our team will call you shortly.')
        return
      }
    } catch {
      /* storage blocked: the server still checks */
    }
    setStatus('sending')
    setMessage('')
    dataLayerPush('form_start', { form: 'diwali_2026' })
    try {
      const r = await fetch('/api/diwali-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, phone: v.lead.phone, source: readSource(), elapsedMs: Date.now() - startedAt.current }),
      })
      const data = await r.json().catch(() => ({}))
      if (r.ok && data.success) {
        try {
          localStorage.setItem(CLAIMED_KEY, JSON.stringify({ phone: v.lead.phone, at: Date.now() }))
        } catch {
          /* ignore */
        }
        setStatus('done')
        setMessage(data.message || 'Your Diwali offer is reserved!')
        dataLayerPush('generate_lead', { form: 'diwali_2026', service: v.lead.service })
        onSuccess?.()
        return
      }
      if (data.code === 'DUPLICATE') {
        try {
          localStorage.setItem(CLAIMED_KEY, JSON.stringify({ phone: v.lead.phone, at: Date.now() }))
        } catch {
          /* ignore */
        }
        setStatus('done')
        setMessage(data.message)
        return
      }
      if (data.errors) setErrors(data.errors)
      setStatus('error')
      setMessage(data.message || 'Something went wrong. Please try again or WhatsApp us.')
    } catch {
      setStatus('error')
      setMessage(`Network error. Please try again or WhatsApp us on ${DIWALI_WHATSAPP_DISPLAY}.`)
    }
  }

  if (status === 'done') {
    return (
      <div className="dw-success" role="status" aria-live="polite">
        <div className="dw-success__diya" aria-hidden="true">🪔</div>
        <h3>Shubh Deepavali! ✨</h3>
        <p>{message}</p>
        <a className="dw-btn dw-btn--ghost" href={WA_URL} target="_blank" rel="noopener noreferrer">
          Chat on WhatsApp now
        </a>
      </div>
    )
  }

  const phoneOk = values.phone && normalizePhone(values.phone)
  return (
    <form className="dw-form" onSubmit={submit} noValidate aria-describedby="dw-form-note" data-no-sky>
      <fieldset disabled={disabled || status === 'sending'}>
        <legend className="dw-sr">Claim your Diwali offer</legend>
        <div className={`dw-field${errors.name ? ' has-error' : ''}`}>
          <label htmlFor="dw-name">Your name</label>
          <input id="dw-name" name="name" autoComplete="name" required minLength={2} maxLength={80} value={values.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'dw-name-err' : undefined} />
          {errors.name && <span className="dw-err" id="dw-name-err">{errors.name}</span>}
        </div>
        <div className={`dw-field${errors.phone ? ' has-error' : ''}`}>
          <label htmlFor="dw-phone">Mobile / WhatsApp number</label>
          <input id="dw-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required maxLength={20} placeholder="98765 43210 or +60 12 345 6789" value={values.phone} onChange={set('phone')} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'dw-phone-err' : 'dw-phone-hint'} />
          {errors.phone ? <span className="dw-err" id="dw-phone-err">{errors.phone}</span> : <span className="dw-hint" id="dw-phone-hint">{phoneOk ? `✓ ${phoneOk}` : '10-digit Indian mobile, or + country code'}</span>}
        </div>
        <div className={`dw-field${errors.business ? ' has-error' : ''}`}>
          <label htmlFor="dw-business">Business name</label>
          <input id="dw-business" name="business" autoComplete="organization" required minLength={2} maxLength={120} value={values.business} onChange={set('business')} aria-invalid={!!errors.business} aria-describedby={errors.business ? 'dw-business-err' : undefined} />
          {errors.business && <span className="dw-err" id="dw-business-err">{errors.business}</span>}
        </div>
        <div className={`dw-field${errors.service ? ' has-error' : ''}`}>
          <label htmlFor="dw-service">Service required</label>
          <select id="dw-service" name="service" required value={values.service} onChange={set('service')} aria-invalid={!!errors.service} aria-describedby={errors.service ? 'dw-service-err' : undefined}>
            <option value="" disabled>Choose a service</option>
            {DIWALI_SERVICES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.service && <span className="dw-err" id="dw-service-err">{errors.service}</span>}
        </div>
        <div className="dw-hp" aria-hidden="true">
          <label htmlFor="dw-website">Website</label>
          <input id="dw-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
        </div>
        <button type="submit" className="dw-btn dw-btn--gold dw-btn--block">
          {status === 'sending' ? 'Lighting your offer…' : disabled ? (phase === 'upcoming' ? 'Opens 3 Nov 2026' : 'Offer closed') : 'Claim your Diwali offer'}
        </button>
        <p className="dw-form__note" id="dw-form-note">
          🔒 We only use your details to contact you about this offer. See our <Link to="/privacy-policy/">privacy policy</Link>.
        </p>
        {status === 'error' && (
          <p className="dw-form__error" role="alert">{message}</p>
        )}
      </fieldset>
    </form>
  )
}

export default function Diwali2026() {
  const [phase, setPhase] = useState('active') // server render + first client pass; corrected on mount
  const [lit, setLit] = useState(() => DIYAS.map(() => false))
  const [reduced, setReduced] = useState(false)
  const [seen, setSeen] = useState({}) // scroll-reveal state, kept in React so re-renders keep it
  const rv = (k) => (seen[k] ? ' is-in' : '')
  const skyRef = useRef(null)
  const fxRef = useRef(null)
  const allLit = lit.every(Boolean)

  useEffect(() => {
    const update = () => setPhase(campaignPhase(Date.now()))
    update()
    const id = setInterval(update, 15000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only state read after hydration (SSR must match first render)
    setReduced(mq.matches)
    if (mq.matches) return undefined
    let cancelled = false
    const start = () =>
      import('./fx.js').then(({ startSky }) => {
        if (!cancelled && skyRef.current) fxRef.current = startSky(skyRef.current)
      })
    const idle = window.requestIdleCallback ? window.requestIdleCallback(start, { timeout: 1500 }) : setTimeout(start, 600)
    return () => {
      cancelled = true
      if (window.cancelIdleCallback && typeof idle === 'number') window.cancelIdleCallback(idle)
      clearTimeout(idle)
      fxRef.current?.destroy()
      fxRef.current = null
    }
  }, [])

  // Scroll reveals
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const mark = (keys) => setSeen((s) => ({ ...s, ...Object.fromEntries(keys.map((k) => [k, true])) }))
    if (!('IntersectionObserver' in window)) {
      mark([...els].map((el) => el.dataset.reveal))
      return undefined
    }
    const io = new IntersectionObserver(
      (entries) => {
        const keys = entries.filter((en) => en.isIntersecting).map((en) => en.target.dataset.reveal)
        entries.forEach((en) => en.isIntersecting && io.unobserve(en.target))
        if (keys.length) mark(keys)
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const lightDiya = useCallback((i, e) => {
    if (lit[i]) return
    const next = lit.slice()
    next[i] = true
    setLit(next)
    const rect = e?.currentTarget?.getBoundingClientRect?.()
    if (rect && fxRef.current) fxRef.current.burst(rect.left + rect.width / 2, rect.top + rect.height * 0.3, { n: 36, speed: 70, color: '#ffd98a' })
    if (next.every(Boolean)) {
      dataLayerPush('diwali_all_diyas_lit')
      setTimeout(() => fxRef.current?.finale(), 250)
    }
  }, [lit])

  const lightAll = () => {
    setLit(DIYAS.map(() => true))
    dataLayerPush('diwali_all_diyas_lit')
    fxRef.current?.finale()
  }

  const celebrate = useCallback(() => fxRef.current?.finale(), [])

  return (
    <div className={`dw${reduced ? ' dw--still' : ''}`}>
      <canvas ref={skyRef} className="dw-sky" aria-hidden="true" />
      <div className="dw-aurora" aria-hidden="true" />

      <header className="dw-top">
        <Link to="/" className="dw-top__brand" aria-label="Static Savvy Media home">
          <img src={logoImg} alt="Static Savvy Media" width="132" height="40" />
        </Link>
        <a className="dw-top__wa" href={WA_URL} target="_blank" rel="noopener noreferrer">
          <span aria-hidden="true">💬</span> WhatsApp
        </a>
      </header>

      <section className="dw-hero" aria-labelledby="dw-title">
        <p className="dw-eyebrow">Static Savvy Media · Diwali 2026</p>
        <h1 id="dw-title" className="dw-title">
          <span className="dw-title__a">Light up your business</span>
          <span className="dw-title__b">this Deepavali</span>
        </h1>
        <p className="dw-tamil" lang="ta">ஒளிரட்டும் உங்கள் வணிகம் · இனிய தீபாவளி நல்வாழ்த்துகள்</p>
        <p className="dw-lede">
          A festive gift from Madurai&apos;s growth studio: a <strong>free Diwali Growth Audit</strong> plus a{' '}
          <strong>free Google Business Profile optimisation setup</strong> for businesses that enquire by 9 November.
        </p>
        <div className="dw-phase" data-phase={phase}>
          {phase === 'upcoming' && <span>✨ Starts soon: opens 3 Nov 2026, 12:00 AM IST</span>}
          {phase === 'active' && <span>🪔 Live now · 3 to 9 Nov 2026 (IST)</span>}
          {phase === 'ended' && <span>Campaign ended · thank you for the love this Diwali</span>}
        </div>
        <Countdown phase={phase} />
        <div className="dw-hero__cta">
          {phase !== 'ended' ? (
            <a className="dw-btn dw-btn--gold" href="#claim">Claim your Diwali offer</a>
          ) : (
            <a className="dw-btn dw-btn--gold" href={WA_URL} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
          )}
          <a className="dw-btn dw-btn--ghost" href="#diyas">Light the diyas ↓</a>
        </div>
        <p className="dw-tap-hint" aria-hidden="true">✨ Tap anywhere in the sky for fireworks</p>
      </section>

      <section id="diyas" data-reveal="diyas" className={`dw-diyas dw-reveal${rv('diyas')}`} aria-labelledby="dw-diyas-title">
        <h2 id="dw-diyas-title" className="dw-h2">Light the five diyas of growth</h2>
        <p className="dw-sub">Tap each diya. Light all five to unlock your Diwali gift.</p>
        <div className="dw-diyas__row">
          {DIYAS.map((d, i) => (
            <Diya key={d.key} index={i} lit={lit[i]} label={d.label} onLight={lightDiya} />
          ))}
        </div>
        <ul className="dw-diyas__lines" aria-live="polite">
          {DIYAS.map((d, i) => (lit[i] ? <li key={d.key}><b>{d.label}:</b> {d.line}</li> : null))}
        </ul>
        {!allLit && (
          <button type="button" className="dw-link" onClick={lightAll} data-no-sky>Light all five</button>
        )}
      </section>

      <section data-reveal="offer" className={`dw-offer dw-reveal${rv('offer')}${allLit ? ' is-unlocked' : ''}`} aria-labelledby="dw-offer-title">
        <Rangoli />
        <div className="dw-offer__card">
          <p className="dw-offer__ribbon">{allLit ? 'Gift unlocked ✨' : 'Your Diwali gift'}</p>
          <h2 id="dw-offer-title" className="dw-h2">Free Diwali Growth Audit</h2>
          <p className="dw-offer__plus">+ festive bonus: <strong>free Google Business Profile optimisation setup</strong></p>
          <ul className="dw-offer__list">
            {AUDIT_POINTS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <p className="dw-offer__terms">For businesses that enquire between 3 and 9 November 2026 (IST). One per business. No obligation.</p>
          {phase !== 'ended' && <a className="dw-btn dw-btn--gold" href="#claim">Claim your Diwali offer</a>}
        </div>
      </section>

      <section id="claim" data-reveal="claim" className={`dw-claim dw-reveal${rv('claim')}`} aria-labelledby="dw-claim-title">
        <div className="dw-claim__card">
          <h2 id="dw-claim-title" className="dw-h2">
            {phase === 'ended' ? 'The Diwali offer has ended' : 'Claim your Diwali offer'}
          </h2>
          {phase === 'ended' ? (
            <div className="dw-ended" role="status">
              <p>Thank you for celebrating with us. The Diwali 2026 offer closed on 9 November at 11:59 PM IST.</p>
              <p>Still want help growing your business? We are a message away.</p>
              <a className="dw-btn dw-btn--gold" href={WA_URL} target="_blank" rel="noopener noreferrer">WhatsApp {DIWALI_WHATSAPP_DISPLAY}</a>
            </div>
          ) : (
            <>
              <p className="dw-sub">
                {phase === 'upcoming' ? 'Starts soon. The form opens on 3 November 2026 at 12:00 AM IST.' : 'Four quick details. We call or WhatsApp you within one working day.'}
              </p>
              <LeadForm phase={phase} onSuccess={celebrate} />
            </>
          )}
        </div>
      </section>

      <section data-reveal="trust" className={`dw-trust dw-reveal${rv('trust')}`} aria-label="Why Static Savvy Media">
        <div><b>4.9★</b><span>rated on Google</span></div>
        <div><b>Madurai</b><span>&amp; Malaysia offices</span></div>
        <div><b>SEO · GBP · Web</b><span>Social · Ads · Branding</span></div>
        <div><b>Founder-led</b><span>by Deepan Kanz</span></div>
      </section>

      <footer className="dw-foot">
        <p>
          Static Savvy Media · <a href={`tel:${DIWALI_TEL}`}>{DIWALI_WHATSAPP_DISPLAY}</a> ·{' '}
          <Link to="/">staticsavvymedia.com</Link>
        </p>
        <p className="dw-foot__fine">Offer window: 3 Nov 2026, 12:00 AM to 9 Nov 2026, 11:59 PM IST. Free audit and GBP setup only; any further work is quoted separately with no obligation.</p>
      </footer>

      {phase !== 'ended' && (
        <div className="dw-sticky" data-no-sky>
          <a className="dw-btn dw-btn--gold" href="#claim">Claim Diwali offer</a>
          <a className="dw-btn dw-btn--wa" href={WA_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Static Savvy Media">💬</a>
        </div>
      )}
    </div>
  )
}
