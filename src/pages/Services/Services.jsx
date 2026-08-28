import { useEffect, useRef } from 'react'
import HubTemplate from '../../templates/HubTemplate.jsx'
import SectionHeading from '../../components/common/SectionHeading.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { services } from '../../data/services.js'
import { Link } from 'react-router-dom'
import { cx } from '../../utils/helpers.js'
import { setSeo } from '../../utils/seo.js'
import { organizationSchema, breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL } from '../../utils/constants.js'
import '../../styles/pages/service.css'
import servicesHeroImg from '../../assets/images/services/Services.png'

const PAGE_TITLE =
  'Digital Marketing Services, SEO, GEO/AEO, Ads & More | Static Savvy Media'

const PAGE_DESCRIPTION =
  'Digital marketing services in Madurai, SEO, GEO/AEO, Local SEO, Google Ads, social media, website design and AI automation from Static Savvy Media. WhatsApp: +91-99440-40345.'

const INTRO =
  'Static Savvy Media is a Madurai-based digital marketing agency delivering services across Search Engine Optimization (SEO), GEO & AEO AI search, Local SEO, Google Ads & PPC, social media marketing, website design & development, AI business automation, and photography-video content creation, with offices in Madurai, Thoothukudi, and Rawang, Malaysia.'

const CTA = {
  title: 'Ready to be found everywhere your clients are looking?',
  subtitle: 'Message us on WhatsApp, we respond within the hour, every business day.',
}

const colorStyles = {
  seo: {
    background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
    boxShadow: '0 0 15px rgba(168, 85, 247, 0.35)',
  },
  'geo-aeo-ai-search': {
    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    boxShadow: '0 0 15px rgba(59, 130, 246, 0.35)',
  },
  'local-seo': {
    background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    boxShadow: '0 0 15px rgba(6, 182, 212, 0.35)',
  },
  'google-ads': {
    background: 'linear-gradient(135deg, #f97316, #ea580c)',
    boxShadow: '0 0 15px rgba(249, 115, 22, 0.35)',
  },
  'social-media-marketing': {
    background: 'linear-gradient(135deg, #ec4899, #db2777)',
    boxShadow: '0 0 15px rgba(236, 72, 153, 0.35)',
  },
  'website-design-development': {
    background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    boxShadow: '0 0 15px rgba(6, 182, 212, 0.35)',
  },
  'ai-business-automation': {
    background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
    boxShadow: '0 0 15px rgba(168, 85, 247, 0.35)',
  },
  'ai-video-creation': {
    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
    boxShadow: '0 0 15px rgba(239, 68, 68, 0.35)',
  },
  'corporate-photography-video': {
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    boxShadow: '0 0 15px rgba(34, 197, 94, 0.35)',
  },
  'product-photography-creative-design': {
    background: 'linear-gradient(135deg, #eab308, #ca8a04)',
    boxShadow: '0 0 15px rgba(234, 179, 8, 0.35)',
  },
}

function getServiceIcon(slug) {
  switch (slug) {
    case 'seo':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '42%', height: '42%' }}>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      )
    case 'geo-aeo-ai-search':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '42%', height: '42%' }}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51-1z" />
        </svg>
      )
    case 'local-seo':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '42%', height: '42%' }}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      )
    case 'google-ads':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '42%', height: '42%' }}>
          <path d="M12 2L2 22h4l6-12 6 12h4L12 2z" />
        </svg>
      )
    case 'social-media-marketing':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '42%', height: '42%' }}>
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
        </svg>
      )
    case 'website-design-development':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '42%', height: '42%' }}>
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <path d="M7 8l-3 3 3 3M17 8l3 3-3 3" />
        </svg>
      )
    case 'ai-business-automation':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '42%', height: '42%' }}>
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v4M8 15h.01M16 15h.01M9 18h6" />
        </svg>
      )
    case 'ai-video-creation':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '42%', height: '42%' }}>
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      )
    case 'corporate-photography-video':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '42%', height: '42%' }}>
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      )
    case 'product-photography-creative-design':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '42%', height: '42%' }}>
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
        </svg>
      )
    default:
      return null
  }
}

function CustomServiceCard({ service, number, className = '' }) {
  const icon = getServiceIcon(service.slug)
  const colorStyle = colorStyles[service.slug] || colorStyles.seo

  return (
    <article className={cx('service-card glass-card', className)}>
      <div className="service-card__top">
        <span
          className="service-card__badge"
          aria-hidden="true"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            background: colorStyle.background,
            boxShadow: colorStyle.boxShadow,
          }}
        >
          {icon}
        </span>
        {number != null && (
          <span className="service-card__number" aria-hidden="true">
            0{number}
          </span>
        )}
      </div>

      {service?.category && (
        <span className="chip service-card__category">{service.category}</span>
      )}

      <h3 className="service-card__title">{service?.name}</h3>
      <p className="service-card__text">{service?.summary}</p>

      <Link
        to={service?.path}
        className="service-card__link"
        aria-label={`Learn more about ${service?.name}`}
      >
        Learn More
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </Link>
    </article>
  )
}

function CustomServicesGrid({ eyebrow = '', title = '', subtitle = '', limit, items }) {
  const list =
    items && items.length > 0
      ? items
      : limit
        ? services.slice(0, limit)
        : services

  return (
    <section className="section services-section">
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="grid grid--3">
          {list.map((service, index) => (
            <ScrollReveal key={service.slug} delay={index * 80}>
              <CustomServiceCard service={service} number={index + 1} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Services() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/services/`,
      ogType: 'website',
    })

    const scripts = [
      organizationSchema({ name: 'Static Savvy Media' }),
      breadcrumbListSchema({
        items: [
          { name: 'Home', item: `${SITE_URL}/` },
          { name: 'Services', item: `${SITE_URL}/services/` },
        ],
      }),
    ].map((data) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.text = JSON.stringify(data)
      document.head.appendChild(script)
      return script
    })
    jsonLdRef.current = scripts

    return () => {
      jsonLdRef.current.forEach((script) => script.remove())
      jsonLdRef.current = []
    }
  }, [])

  const whatsappHref = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)

  const ctaLabelWithHeaderIcon = (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', verticalAlign: 'middle' }}>
      <svg width="20" height="20" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
        <path fill="#ffffff" d="M45 0C20.1 0 0 20.1 0 45C0 53.6 2.4 61.6 6.6 68.5L1.5 87.2L20.8 82.3C27.6 86.4 35.5 88.7 44.1 88.7C69 88.7 89.1 68.6 89.1 43.7C89.1 19.6 69.1 0 45 0Z"/>
        <path fill="#25d366" d="M45 6.7C23.9 6.7 6.7 23.9 6.7 45C6.7 52.3 8.7 59.1 12.2 65L8.5 78.5L22.6 74.9C28.2 78.3 34.7 80.2 41.8 80.2C62.9 80.2 80.1 63 80.1 41.9C80.1 20.8 62.9 6.7 41.9 6.7H45Z"/>
        <path fill="#ffffff" d="M59.3 48.5C58.4 48 53.3 45.5 52.3 45.2C51.4 44.8 50.7 44.7 50.1 45.7C49.5 46.7 47.7 48.8 47.2 49.4C46.7 50 46.1 50.1 45.2 49.6C44.3 49.1 41.3 48.1 37.8 45C35.1 42.6 33.3 39.6 32.7 38.7C32.1 37.7 32.7 37.2 33.2 36.7C33.6 36.3 34.1 35.6 34.6 35C35.1 34.4 35.3 34 35.6 33.4C35.9 32.8 35.8 32.3 35.6 31.8C35.4 31.3 33.6 26.9 32.8 25.1C32.1 23.3 31.3 23.5 30.7 23.5C30.2 23.5 29.5 23.5 28.9 23.5C28.3 23.5 27.2 23.7 26.3 24.7C25.4 25.7 22.8 28.2 22.8 33.2C22.8 38.2 26.4 43.1 26.9 43.8C27.4 44.5 34.1 54.8 44.3 59.2C46.7 60.2 48.6 60.8 50 61.3C52.4 62.1 54.6 62 56.3 61.7C58.2 61.4 62.1 59.3 62.9 57C63.7 54.7 63.7 52.7 63.5 52.3C63.3 51.9 62.7 51.7 61.8 51.2L59.3 48.5Z"/>
      </svg>
      <span>WhatsApp: +91-99440-40345</span>
    </span>
  )

  return (
    <HubTemplate
      eyebrow="Services"
      title="Digital Marketing Services, SEO, GEO/AEO, Ads & More"
      subtitle={INTRO}
      heroVisual={
        <div className="hero__visual-side">
          <img src={servicesHeroImg} alt="Services" className="hero__image" />
        </div>
      }
      grid={<CustomServicesGrid title="Our Digital Marketing Services" />}
      ctaTitle={CTA.title}
      ctaSubtitle={CTA.subtitle}
      ctaLabel={ctaLabelWithHeaderIcon}
      ctaHref={whatsappHref}
    />
  )
}