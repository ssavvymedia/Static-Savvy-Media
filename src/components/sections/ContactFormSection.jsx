import { useState, useEffect, useRef } from 'react'
import { ScrollReveal } from '../animations/ScrollReveal.jsx'

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

// Environment-driven Google reCAPTCHA v2 Checkbox Key
const RAW_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || ''
const RECAPTCHA_SITE_KEY =
  RAW_SITE_KEY && RAW_SITE_KEY !== 'PASTE_SITE_KEY_HERE' ? RAW_SITE_KEY : ''

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [captchaVerified, setCaptchaVerified] = useState(!RECAPTCHA_SITE_KEY)
  const [captchaToken, setCaptchaToken] = useState(null)
  const [captchaError, setCaptchaError] = useState(null)

  const recaptchaRef = useRef(null)
  const widgetIdRef = useRef(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Load and render Google reCAPTCHA v2 Checkbox when SITE_KEY is configured
  useEffect(() => {
    if (formSubmitted || !RECAPTCHA_SITE_KEY) return

    let isMounted = true

    const renderWidget = () => {
      if (
        window.grecaptcha &&
        window.grecaptcha.render &&
        recaptchaRef.current &&
        widgetIdRef.current === null &&
        isMounted
      ) {
        try {
          widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
            sitekey: RECAPTCHA_SITE_KEY,
            theme: 'light',
            callback: (token) => {
              if (isMounted) {
                setCaptchaVerified(true)
                setCaptchaToken(token)
                setCaptchaError(null)
              }
            },
            'expired-callback': () => {
              if (isMounted) {
                setCaptchaVerified(false)
                setCaptchaToken(null)
                setCaptchaError('reCAPTCHA session expired. Please verify the checkbox again.')
              }
            },
            'error-callback': () => {
              if (isMounted) {
                setCaptchaVerified(false)
                setCaptchaToken(null)
                setCaptchaError('reCAPTCHA error occurred. Please try again.')
              }
            },
          })
        } catch (err) {
          // Widget already rendered or DOM container unavailable
        }
      }
    }

    if (window.grecaptcha && window.grecaptcha.render) {
      renderWidget()
    } else {
      const scriptId = 'google-recaptcha-v2-script'
      let script = document.getElementById(scriptId)
      if (!script) {
        script = document.createElement('script')
        script.id = scriptId
        script.src = 'https://www.google.com/recaptcha/api.js?render=explicit'
        script.async = true
        script.defer = true
        document.head.appendChild(script)
      }

      const checkInterval = setInterval(() => {
        if (window.grecaptcha && window.grecaptcha.render) {
          clearInterval(checkInterval)
          renderWidget()
        }
      }, 150)

      return () => {
        isMounted = false
        clearInterval(checkInterval)
      }
    }

    return () => {
      isMounted = false
    }
  }, [formSubmitted])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Enforce reCAPTCHA completion if site key is configured
    if (RECAPTCHA_SITE_KEY && (!captchaVerified || !captchaToken)) {
      setCaptchaError('Please complete the reCAPTCHA verification.')
      return
    }

    setIsSubmitting(true)
    setCaptchaError(null)

    // Server-side verification using Netlify function / server endpoint
    if (RECAPTCHA_SITE_KEY && captchaToken) {
      try {
        const response = await fetch('/.netlify/functions/verify-recaptcha', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: captchaToken }),
        })

        const result = await response.json()

        if (!response.ok || !result.success) {
          setCaptchaError(
            result.message || 'reCAPTCHA verification failed. Please try again.'
          )
          if (widgetIdRef.current !== null && window.grecaptcha) {
            try {
              window.grecaptcha.reset(widgetIdRef.current)
            } catch (err) {
              // Ignore reset error
            }
          }
          widgetIdRef.current = null
          setCaptchaVerified(false)
          setCaptchaToken(null)
          setIsSubmitting(false)
          return
        }
      } catch (error) {
        setCaptchaError(
          'Network error during reCAPTCHA verification. Please try again.'
        )
        if (widgetIdRef.current !== null && window.grecaptcha) {
          try {
            window.grecaptcha.reset(widgetIdRef.current)
          } catch (err) {
            // Ignore reset error
          }
        }
        widgetIdRef.current = null
        setCaptchaVerified(false)
        setCaptchaToken(null)
        setIsSubmitting(false)
        return
      }
    }

    // Verification succeeded -> process form submission
    setIsSubmitting(false)
    setFormSubmitted(true)
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    })

    // Reset Google reCAPTCHA
    if (widgetIdRef.current !== null && window.grecaptcha) {
      try {
        window.grecaptcha.reset(widgetIdRef.current)
      } catch (err) {
        // Ignore reset error
      }
    }
    widgetIdRef.current = null
    setCaptchaVerified(!RECAPTCHA_SITE_KEY)
    setCaptchaToken(null)
  }

  const handleResetForm = () => {
    setFormSubmitted(false)
    setCaptchaVerified(!RECAPTCHA_SITE_KEY)
    setCaptchaToken(null)
    setCaptchaError(null)
    widgetIdRef.current = null
  }

  return (
    <section className="section section--alt contact-form-section">
      <div className="container">
        <ScrollReveal>
          <div className="contact-form-container glass-card">
            <div className="contact-form-header">
              <span className="contact-form-badge">GET IN TOUCH</span>
              <h2 className="contact-form-title">Let’s Start a Conversation</h2>
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

                {/* Dedicated Security Verification Container */}
                <div className="contact-form-recaptcha-card">
                  <div className="recaptcha-card-header">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span>SECURITY VERIFICATION</span>
                  </div>

                  {RECAPTCHA_SITE_KEY ? (
                    <div className="contact-form-recaptcha-wrapper">
                      <div ref={recaptchaRef} className="contact-form-recaptcha" />
                    </div>
                  ) : (
                    <div className="recaptcha-notice-block">
                      <p className="recaptcha-notice-text">
                        Protected by Google reCAPTCHA Verification.<br />
                        <span className="recaptcha-notice-hint">
                          Add <code>VITE_RECAPTCHA_SITE_KEY</code> in <code>.env</code> or Netlify Site Configuration to activate live verification.
                        </span>
                      </p>
                    </div>
                  )}

                  {captchaError && (
                    <div className="recaptcha-error-message" role="alert">
                      {captchaError}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="contact-form-submit-btn"
                  disabled={(RECAPTCHA_SITE_KEY && (!captchaVerified || !captchaToken)) || isSubmitting}
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
