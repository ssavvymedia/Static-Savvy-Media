import { lazy, Suspense, useRef, useState } from 'react'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, MALAYSIA_OFFICE, CONTACT_EMAIL } from '../../utils/constants.js'
import '../../styles/contact-form-v2.css'

// reCAPTCHA loads only after the visitor starts the form (focus/tap), not on page load.
const ReCAPTCHA = lazy(() => import('react-google-recaptcha').then((m) => ({ default: m.default?.default ?? m.default ?? m })))

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || ''

// Vercel Function: api/submit-contact.js
const CONTACT_ENDPOINT = '/api/submit-contact'

// GA4 lead conversion, sent through GTM's dataLayer. Called only after the server
// confirms the enquiry was emailed (HTTP 2xx and success: true).
function trackLead(service) {
  try {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'generate_lead',
      form_id: 'contact_form',
      lead_service: service || undefined,
      page_path: window.location.pathname,
    })
  } catch {
    // Analytics must never break the form.
  }
}

const SERVICES = [
  'SEO',
  'GEO & AEO',
  'Local SEO',
  'Google Ads',
  'Social Media Marketing',
  'Website Design & Development',
  'AI Business Automation',
  'Corporate Photography & Video',
  'AI Video Creation',
  'Product Photography & Creative Design',
]

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    website: '',
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [recaptchaToken, setRecaptchaToken] = useState(null)
  const [recaptchaError, setRecaptchaError] = useState(null)
  const recaptchaRef = useRef(null)
  const [armed, setArmed] = useState(false)
  const arm = () => { if (!armed) setArmed(true) }
  const waHref = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token)
    setRecaptchaError(null)
  }

  const handleRecaptchaExpired = () => {
    setRecaptchaToken(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (RECAPTCHA_SITE_KEY && !recaptchaToken) {
      setRecaptchaError('Please verify that you are not a robot.')
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
          sourcePagePath: window.location.pathname,
          sourcePageUrl: window.location.href,
          sourcePageTitle: document.title,
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        if (result.code === 'VALIDATION_ERROR') {
          setSubmitError(result.message)
        } else if (result.code === 'RECAPTCHA_FAILED') {
          setRecaptchaError(result.message)
          recaptchaRef.current?.reset()
        } else {
          setSubmitError(
            result.message || 'Something went wrong. Please try again.'
          )
        }
        setIsSubmitting(false)
        return
      }

      // Skip when the honeypot was filled: the server fakes a success for bots.
      if (!formData.website) trackLead(formData.service)
      setIsSubmitting(false)
      setFormSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
        website: '',
      })
      setRecaptchaToken(null)
      recaptchaRef.current?.reset()
    } catch {
      setSubmitError('Network error. Please check your connection and try again.')
      setIsSubmitting(false)
    }
  }

  const handleResetForm = () => {
    setFormSubmitted(false)
    setSubmitError(null)
    setRecaptchaToken(null)
    recaptchaRef.current?.reset()
  }

  return (
    <section id="enquiry" className="section contact-form-section cf2" aria-labelledby="cf2-title">
      {/* #form: older "Send an enquiry" links. */}
      <span id="form" className="scroll-anchor" aria-hidden="true" />
      <div className="container">
        <div className="cf2-panel">
          <div className="cf2-intro">
            <span className="cf2-badge">Get in touch</span>
            <h2 className="cf2-title" id="cf2-title">Let&apos;s start a conversation.</h2>
            <p className="cf2-sub">Tell us what you need. Our Madurai team replies within one business day.</p>
            <ul className="cf2-points">
              <li>Reply within one business day (Mon–Sat)</li>
              <li>Tamil &amp; English team, Madurai HQ</li>
              <li>Monthly plans, no lock-in</li>
            </ul>
            <div className="cf2-direct">
              <a href={waHref} target="_blank" rel="noopener noreferrer" data-track="whatsapp_form_side">WhatsApp {WHATSAPP_NUMBER}</a>
              <a href={MALAYSIA_OFFICE.phoneHref}>Malaysia call {MALAYSIA_OFFICE.phoneDisplay}</a>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </div>
          </div>

          {formSubmitted ? (
            <div className="contact-form-success cf2-success" role="status" aria-live="polite">
              <span className="cf2-tick" aria-hidden="true">✓</span>
              <h3 className="success-title">Thank you!</h3>
              <p className="success-message">Your request has been received. Our team will review your details and get back to you shortly.</p>
              <button type="button" className="success-reset-btn cf2-reset" onClick={handleResetForm}>Send another message</button>
            </div>
          ) : (
            <form className="contact-form-element cf2-form" onSubmit={handleSubmit} onFocusCapture={arm} onPointerDownCapture={arm} aria-label="Contact form">
              <input type="text" name="website" value={formData.website} onChange={handleInputChange} tabIndex={-1} autoComplete="off" aria-hidden="true" className="contact-form-honeypot" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }} />
              <div className="cf2-field">
                <label htmlFor="form-name">Name</label>
                <input type="text" id="form-name" name="name" value={formData.name} onChange={handleInputChange} autoComplete="name" required />
              </div>
              <div className="cf2-field">
                <label htmlFor="form-email">Email</label>
                <input type="email" id="form-email" name="email" value={formData.email} onChange={handleInputChange} autoComplete="email" required />
              </div>
              <div className="cf2-field">
                <label htmlFor="form-phone">Phone / WhatsApp</label>
                <input type="tel" id="form-phone" name="phone" value={formData.phone} onChange={handleInputChange} autoComplete="tel" placeholder="+91 98765 43210" required />
              </div>
              <div className="cf2-field">
                <label htmlFor="form-service">Service needed</label>
                <select id="form-service" name="service" value={formData.service} onChange={handleInputChange} required>
                  <option value="" disabled hidden>Select a service</option>
                  {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="cf2-field cf2-field--full">
                <label htmlFor="form-message">Message</label>
                <textarea id="form-message" name="message" value={formData.message} onChange={handleInputChange} rows="3" placeholder="Your goals, website, city…" required></textarea>
              </div>
              {(recaptchaError || submitError) && (
                <div className="cf2-field--full contact-form-submit-error" role="alert">{recaptchaError || submitError}</div>
              )}
              <div className="cf2-actions">
                <div className="cf2-captcha">
                  {RECAPTCHA_SITE_KEY && armed && (
                    <Suspense fallback={null}>
                      <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} onChange={handleRecaptchaChange} onExpired={handleRecaptchaExpired} theme="dark" className="contact-form-recaptcha" />
                    </Suspense>
                  )}
                  {RECAPTCHA_SITE_KEY && !armed && <span className="cf2-captcha-note">Spam check appears when you start typing.</span>}
                </div>
                <button type="submit" className="contact-form-submit-btn cf2-submit" disabled={isSubmitting || (RECAPTCHA_SITE_KEY && !recaptchaToken)}>
                  {isSubmitting ? 'Sending…' : 'Send message'} <span aria-hidden="true">→</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
