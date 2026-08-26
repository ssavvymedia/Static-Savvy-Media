import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import { localBusinessSchema, breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL, SITE_NAME } from '../../utils/constants.js'

const WHATSAPP_MSG_PROJECT = 'Hi Static Savvy Media, I want to discuss my project.'
const WHATSAPP_MSG_GENERAL = 'Hi Static Savvy Media, I would like to know more about your services.'

const SERVICES = [
  { name: 'SEO', desc: 'Search engine optimisation focused on sustainable organic visibility, technical health, content and search intent.', icon: 'M', route: '/services/seo/' },
  { name: 'GEO & AEO', desc: 'Generative Engine Optimization and Answer Engine Optimization for AI-driven discovery, answer engines and modern search.', icon: 'G', route: '/services/geo-aeo-ai-search/' },
  { name: 'Local SEO', desc: 'Google Business Profile, local search visibility, local entity signals and location-focused optimisation.', icon: 'L', route: '/services/local-seo/' },
  { name: 'Google Ads', desc: 'Paid search campaigns designed to reach high-intent customers and generate qualified enquiries.', icon: 'A', route: '/services/google-ads/' },
  { name: 'Social Media Marketing', desc: 'Content strategy, social media campaigns and brand visibility across relevant platforms.', icon: 'S', route: '/services/social-media-marketing/' },
  { name: 'Website Design & Development', desc: 'SEO-ready, conversion-focused websites built around business goals and digital visibility.', icon: 'W', route: '/services/website-design-development/' },
  { name: 'AI Business Automation', desc: 'Workflow automation and AI-powered systems that reduce manual work and help teams focus on growth.', icon: 'I', route: '/services/ai-business-automation/' },
  { name: 'Corporate Photography & Video', desc: 'Professional brand imagery and video content for stronger trust and communication.', icon: 'C', route: '/services/corporate-photography-video/' },
  { name: 'AI Video Creation', desc: 'Marketing-focused AI video production for faster content creation.', icon: 'V', route: '/services/ai-video-creation/' },
  { name: 'Product Photography & Creative Design', desc: 'E-commerce-ready product imagery and creative design for digital sales and marketing.', icon: 'P', route: '/services/product-photography-creative-design/' },
]

const TRUST_CARDS = [
  { number: '01', title: 'GEO & AEO First', text: 'AI-search visibility is treated as an important part of modern digital strategy.' },
  { number: '02', title: 'WhatsApp-First', text: 'Start the conversation directly instead of navigating through complicated lead-generation forms.' },
  { number: '03', title: 'Three-Market Experience', text: 'Madurai, Thoothukudi, and Malaysia, local expertise across three distinct markets.' },
  { number: '04', title: 'Integrated Digital Growth', text: 'SEO, GEO/AEO, Local SEO, Ads, Social Media, Web Development, Automation and Creative services work together as one growth system.' },
]

const LOCATIONS = [
  {
    title: 'Madurai',
    subtitle: 'Static Savvy Media, Madurai',
    region: 'Madurai, Tamil Nadu',
    phone: '+91-99440-40345',
    hours: 'Monday–Saturday, 9:00 AM – 6:30 PM IST',
    note: 'Headquarters',
  },
  {
    title: 'Thoothukudi',
    subtitle: 'Static Savvy Media, Thoothukudi',
    region: 'Thoothukudi (Tuticorin), Tamil Nadu',
    phone: '+91-99440-40345',
    hours: null,
    note: "Serving the port city’s industrial, marine, manufacturing and retail businesses.",
  },
  {
    title: 'Malaysia',
    subtitle: 'Static Savvy Media, Malaysia',
    region: 'Rawang & Selangor, Malaysia',
    phone: '+91-99440-40345',
    hours: 'Monday–Friday, 9:00 AM – 6:00 PM MYT',
    note: null,
  },
]

const PROCESS_STEPS = [
  { number: '01', title: 'Message Us', text: 'Send us a WhatsApp message describing your business and what you want to achieve.' },
  { number: '02', title: 'Discuss', text: 'We’ll understand your business, audience, market and digital requirements.' },
  { number: '03', title: 'Plan', text: 'We’ll recommend the most relevant service, strategy or combination of services.' },
]

export default function Contact() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: 'Contact Static Savvy Media, WhatsApp, Madurai · Thoothukudi · Malaysia',
      description: 'Contact Static Savvy Media for SEO, GEO/AEO, Local SEO, Google Ads, websites, social media, AI automation and creative services. WhatsApp us at +91-99440-40345.',
      canonical: `${SITE_URL}/contact/`,
      ogType: 'website',
    })

    const contactPage = {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Static Savvy Media',
      url: `${SITE_URL}/contact/`,
      mainEntity: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        telephone: '+91-99440-40345',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+91-99440-40345',
          contactType: 'customer service',
          availableLanguage: ['English', 'Tamil'],
        },
      },
    }

    const localBiz = localBusinessSchema({
      telephone: '+91-99440-40345',
      areaServed: ['Madurai', 'Thoothukudi', 'Malaysia'],
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Contact', item: `${SITE_URL}/contact/` },
      ],
    })

    const scripts = [contactPage, localBiz, breadcrumbs].map((data) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.text = JSON.stringify(data)
      document.head.appendChild(script)
      return script
    })
    jsonLdRef.current = scripts

    return () => {
      jsonLdRef.current.forEach((s) => s.remove())
      jsonLdRef.current = []
    }
  }, [])

  const whatsappGeneral = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MSG_GENERAL)
  const whatsappProject = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MSG_PROJECT)

  return (
    <div className="contact-page">
      <Breadcrumbs />

      {/* HERO */}
      <section className="section">
        <div className="container">
          <div className="contact-hero">
            <span className="contact-hero__badge">CONTACT STATIC SAVVY MEDIA</span>
            <h1 className="hero__title contact-hero__title">
              Let's Talk About Your{' '}
              <span className="text-gradient">Digital Growth</span>
            </h1>
            <p className="contact-hero__text">
              Ready to improve your search visibility, generate more qualified leads, strengthen your local presence, or build a stronger digital system for your business? Talk to Static Savvy Media directly on WhatsApp.
            </p>
            <div className="contact-hero__cta">
              <a
                href={whatsappGeneral}
                className="btn btn--primary btn--lg contact-whatsapp-btn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact Static Savvy Media on WhatsApp"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
              <a
                href="tel:+919944040345"
                className="btn btn--ghost btn--lg"
                aria-label="Call Static Savvy Media"
              >
                +91-99440-40345
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section section--alt">
        <div className="container">
          <div className="contact-section-header">
            <h2 className="section-title">What Can We Help You With?</h2>
            <p className="contact-section-sub">Tell us what you are trying to achieve. We can help identify the right digital marketing, search visibility and automation approach for your business.</p>
          </div>
          <div className="contact-services-grid">
            {SERVICES.map((svc, i) => (
              <ScrollReveal key={svc.name} delay={i * 40}>
                <Link to={svc.route} className="contact-service-card glass-card">
                  <div className="contact-service-card__icon">{svc.icon}</div>
                  <h3 className="contact-service-card__name">{svc.name}</h3>
                  <p className="contact-service-card__desc">{svc.desc}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CONTACT US */}
      <section className="section">
        <div className="container">
          <div className="contact-section-header">
            <h2 className="section-title">Why Talk to Static Savvy Media?</h2>
          </div>
          <div className="contact-trust-grid">
            {TRUST_CARDS.map((card) => (
              <ScrollReveal key={card.number}>
                <div className="contact-trust-card glass-card">
                  <div className="contact-trust-card__number">{card.number}</div>
                  <h3 className="contact-trust-card__title">{card.title}</h3>
                  <p className="contact-trust-card__text">{card.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="section section--alt">
        <div className="container">
          <div className="contact-section-header">
            <h2 className="section-title">Serving Businesses Across Three Markets</h2>
          </div>
          <div className="contact-locations-grid">
            {LOCATIONS.map((loc) => (
              <ScrollReveal key={loc.title}>
                <div className="contact-location-card glass-card">
                  <h3 className="contact-location-card__title">{loc.title}</h3>
                  <div className="contact-location-card__subtitle">{loc.subtitle}</div>
                  <div className="contact-location-card__region">{loc.region}</div>
                  <div className="contact-location-card__phone">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <a href="tel:+919944040345">{loc.phone}</a>
                  </div>
                  {loc.hours && <div className="contact-location-card__hours">{loc.hours}</div>}
                  {loc.note && <div className="contact-location-card__note">{loc.note}</div>}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container">
          <div className="contact-section-header">
            <h2 className="section-title">How It Works</h2>
          </div>
          <div className="contact-process">
            {PROCESS_STEPS.map((step) => (
              <ScrollReveal key={step.number}>
                <div className="contact-process-step glass-card">
                  <div className="contact-process-step__number">{step.number}</div>
                  <h3 className="contact-process-step__title">{step.title}</h3>
                  <p className="contact-process-step__text">{step.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CTA */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="contact-main-cta glass-card">
              <h2 className="contact-main-cta__title">Have a Project in Mind?</h2>
              <p className="contact-main-cta__text">
                Whether you need SEO, GEO/AEO, Local SEO, Google Ads, social media marketing, website development, AI automation, or creative production, start with a conversation.
              </p>
              <div className="contact-main-cta__actions">
                <a
                  href={whatsappProject}
                  className="btn btn--primary btn--lg contact-whatsapp-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact Static Savvy Media on WhatsApp"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Static Savvy Media
                </a>
                <span className="contact-main-cta__phone">+91-99440-40345</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="section">
        <div className="container">
          <div className="contact-info-grid">
            <div className="contact-info-block glass-card">
              <div className="contact-info-block__label">WhatsApp</div>
              <a href="tel:+919944040345" className="contact-info-block__value">+91-99440-40345</a>
            </div>
            <div className="contact-info-block glass-card">
              <div className="contact-info-block__label">Service Areas</div>
              <div className="contact-info-block__value">Madurai · Thoothukudi · Malaysia</div>
            </div>
            <div className="contact-info-block glass-card">
              <div className="contact-info-block__label">Primary Contact Channel</div>
              <div className="contact-info-block__value">WhatsApp</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
