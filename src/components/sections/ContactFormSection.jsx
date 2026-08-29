import { useState } from 'react'
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setFormSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      })
    }, 1200)
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
                  onClick={() => setFormSubmitted(false)}
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
                <button
                  type="submit"
                  className="contact-form-submit-btn"
                  disabled={isSubmitting}
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
