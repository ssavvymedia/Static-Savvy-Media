import { lazy, Suspense, useId, useRef, useState } from 'react'
import { track, getAttribution } from '../../utils/track.js'
import { AUDIT_CITIES } from '../../data/auditOptions.js'

export const SUCCESS_MESSAGE = 'Message received. We’ll reply on WhatsApp within 1 business day.'

/* reCAPTCHA (and Google's script) loads only after the visitor first touches the form, so pages with
 * a form pay no reCAPTCHA cost on load. CJS interop: the module may come back as { default }. */
const ReCAPTCHA = lazy(() => import('react-google-recaptcha').then((m) => ({ default: m.default?.default ?? m.default ?? m })))
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || ''
const ENDPOINT = '/api/submit-contact'

const EMPTY = { business: '', siteUrl: '', industry: '', budget: '', city: '', name: '', phone: '', email: '', message: '', website: '' }

/**
 * Growth Audit request form (homepage, Madurai HQ, SEO Madurai, Madurai SEO guide).
 * Posts to the existing contact function (formType: growth_audit), which emails the lead.
 * Short form (19 Nov 2026): name, phone/WhatsApp, optional message. City/industry come from the page props.
 * Honeypot field "website" + optional reCAPTCHA, hidden UTM/source fields; consent via the visible notice.
 * Fires audit_form_submit + generate_lead on a confirmed success only.
 */
export default function GrowthAuditForm({ formId = 'growth_audit', defaultCity = '', defaultIndustry = '', compact = false }) {
  const uid = useId()
  const id = (k) => `${uid}-${k}`
  const [data, setData] = useState({ ...EMPTY, city: defaultCity, industry: defaultIndustry })
  const [armed, setArmed] = useState(false)
  const arm = () => { if (!armed) setArmed(true) }
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [token, setToken] = useState(null)
  const recaptchaRef = useRef(null)

  const market = AUDIT_CITIES.find((c) => c.value === data.city)?.market || 'IN'

  const onChange = (e) => {
    const { name, value } = e.target
    setData((d) => ({ ...d, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (RECAPTCHA_SITE_KEY && !token) {
      setStatus('error')
      setError('Please tick “I’m not a robot” first.')
      return
    }
    setStatus('sending')
    setError('')
    setFieldErrors({})
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          ...getAttribution(),
          formType: 'growth_audit',
          formId,
          consent: true, // visible notice above the button: sending = agreeing to be contacted
          recaptchaToken: token,
          sourcePagePath: window.location.pathname,
          sourcePageUrl: window.location.href,
          sourcePageTitle: document.title,
        }),
      })
      const result = await res.json().catch(() => ({}))
      if (!res.ok || !result.success) {
        setStatus('error')
        setFieldErrors(result.errors || {})
        setError(result.message || 'Something went wrong. Please try again, or WhatsApp us on +91 99440 40345.')
        recaptchaRef.current?.reset()
        setToken(null)
        return
      }
      if (!data.website) {
        const params = { form_id: formId, lead_industry: data.industry, lead_budget: data.budget, lead_city: data.city }
        track('audit_form_submit', params)
        track('generate_lead', { ...params, lead_service: 'Growth Audit' })
      }
      setStatus('success')
      setData({ ...EMPTY, city: defaultCity, industry: defaultIndustry })
    } catch {
      setStatus('error')
      setError('Network error. Please check your connection and try again, or WhatsApp us on +91 99440 40345.')
    }
  }

  if (status === 'success') {
    return (
      <div className="audit-form audit-form--done" role="status" aria-live="polite">
        <span className="audit-form__tick" aria-hidden="true">✓</span>
        <h3>{SUCCESS_MESSAGE}</h3>
        <button type="button" className="hv2-btn hv2-btn--ghost" onClick={() => setStatus('idle')}>Send another request</button>
      </div>
    )
  }

  const err = (k) => fieldErrors[k] && <span className="audit-form__err" id={id(`${k}-err`)}>{fieldErrors[k]}</span>
  const aria = (k) => (fieldErrors[k] ? { 'aria-invalid': true, 'aria-describedby': id(`${k}-err`) } : {})

  return (
    <form className={`audit-form${compact ? ' audit-form--compact' : ''}`} onSubmit={onSubmit} onFocusCapture={arm} onPointerDownCapture={arm} noValidate={false} aria-label="Request a free growth audit">
      <input type="text" name="website" value={data.website} onChange={onChange} tabIndex={-1} autoComplete="off" aria-hidden="true" className="audit-form__hp" />
      <div className="audit-form__field">
        <label htmlFor={id('name')}>Your name</label>
        <input id={id('name')} name="name" value={data.name} onChange={onChange} autoComplete="name" required maxLength={100} {...aria('name')} />
        {err('name')}
      </div>
      <div className="audit-form__field">
        <label htmlFor={id('phone')}>Phone / WhatsApp</label>
        <input id={id('phone')} name="phone" type="tel" value={data.phone} onChange={onChange} autoComplete="tel" placeholder={market === 'MY' ? '+60 12-345 6789' : '+91 98765 43210'} required {...aria('phone')} />
        {err('phone')}
      </div>
      <div className="audit-form__field audit-form__field--full">
        <label htmlFor={id('message')}>Message <small>(optional)</small></label>
        <textarea id={id('message')} name="message" value={data.message} onChange={onChange} rows={compact ? 2 : 3} placeholder="Your business, city and goal, e.g. more patient calls from Google Maps" maxLength={500} />
      </div>
      {RECAPTCHA_SITE_KEY && armed && (
        <div className="audit-form__field--full">
          <Suspense fallback={null}>
            <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} onChange={setToken} onExpired={() => setToken(null)} theme="dark" />
          </Suspense>
        </div>
      )}
      {status === 'error' && error && <p className="audit-form__error" role="alert">{error}</p>}
      <div className="audit-form__actions">
        <button type="submit" className="hv2-btn hv2-btn--primary audit-form__submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Get Your Free Growth Audit'} <span className="hv2-arrow" aria-hidden="true">→</span>
        </button>
      </div>
      {err('consent')}
      <p className="audit-form__fine">By sending, you agree to be contacted about your audit by phone or WhatsApp. Reply within 1 business day. No spam.</p>
    </form>
  )
}
