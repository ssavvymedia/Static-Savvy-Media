import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { ScrollReveal } from '../animations/ScrollReveal.jsx'

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || ''

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
      const response = await fetch('/.netlify/functions/submit-contact', {
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
    } catch (error) {
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
    <section className="section section--alt contact-form-section">
      <div className="container">
        <ScrollReveal>
          <div className="contact-form-container glass-card">
            <div className="contact-form-header">
              <span className="contact-form-badge">GET IN TOUCH</span>
              <h2 className="contact-form-title">Let's Start a Conversation</h2>
              <p className="contact-form-subtitle">
                Tell us about your digital requirements, and we'll help identify the right strategy for your growth.
              </p>
            </div>

            {formSubmitted ? (
              <div className="contact-form-success">
                <div className="success-icon-wrapper">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3 className="success-title">Thank You!</h3>
                <p className="success-message">
                  Your request has been received. Our team will review your details and get back to you shortly.
                </p>
                <button
                  className="success-reset-btn"
                  onClick={handleResetForm}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact-form-element" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="contact-form-honeypot"
                  style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
                />
                <div className="contact-form-grid">
                  <div className="form-group">
                    <label htmlFor="form-name">Name</label>
                    <input
                      type="text"
                      id="form-name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="form-email">Email Address</label>
                    <input
                      type="email"
                      id="form-email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="form-phone">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      id="form-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 99440 40345"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="form-service">Service Needed</label>
                    <select
                      id="form-service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled hidden>
                        Select a Service
                      </option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group form-group--full">
                  <label htmlFor="form-message">Message / Project Details</label>
                  <textarea
                    id="form-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    placeholder="Tell us about your project, goals, or any specific requirements..."
                    required
                  ></textarea>
                </div>

                {RECAPTCHA_SITE_KEY && (
                  <div className="contact-form-recaptcha-card">
                    <div className="contact-form-recaptcha-wrapper">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={RECAPTCHA_SITE_KEY}
                        onChange={handleRecaptchaChange}
                        onExpired={handleRecaptchaExpired}
                        theme="dark"
                        className="contact-form-recaptcha"
                      />
                    </div>
                    {recaptchaError && (
                      <div className="recaptcha-error-message" role="alert">
                        {recaptchaError}
                      </div>
                    )}
                  </div>
                )}

                {submitError && (
                  <div className="contact-form-submit-error" role="alert">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  className="contact-form-submit-btn"
                  disabled={isSubmitting || (RECAPTCHA_SITE_KEY && !recaptchaToken)}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
