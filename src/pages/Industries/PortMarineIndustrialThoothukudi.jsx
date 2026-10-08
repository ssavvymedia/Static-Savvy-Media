import { useEffect, useRef, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import ContactFormSection from '../../components/sections/ContactFormSection.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import {
  serviceSchema,
  faqPageSchema,
  breadcrumbListSchema,
} from '../../utils/schema.js'
import { buildWhatsAppLink, cx } from '../../utils/helpers.js'
import {
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
  SITE_URL,
  SITE_NAME,
} from '../../utils/constants.js'
import '../../styles/pages/port-marine-industrial.css'
import portHeroImg from '../../assets/images/Industries/06port.webp'

/* ============================================================
   CONTENT — Approved Static Savvy Media Port, Marine & Industrial
   ============================================================ */

const PAGE_TITLE =
  'Digital Marketing for Port, Marine & Industrial Businesses in Thoothukudi | Static Savvy Media'

const PAGE_DESCRIPTION =
  'B2B digital marketing for shipping, logistics, chemical manufacturing, and marine businesses in Thoothukudi. SEO, LinkedIn, Google Ads.'

const HERO_TITLE =
  'Digital Marketing for Thoothukudi’s Industrial & Marine Sector, B2B Visibility That Generates Enquiries'

const HERO_PARAGRAPH =
  'The businesses around Thoothukudi Port, the SIPCOT industrial estate, and the marine sector operate primarily B2B, their clients are corporates, government entities, other manufacturers, and international buyers. For these businesses, digital marketing is about professional credibility, inbound enquiry generation, and being findable when a procurement team searches for a vendor.'

const SERVICES = [
  {
    title: 'B2B Industrial SEO',
    icon: 'search',
    color: 'icon-badge--cyan',
    path: '/services/seo/',
    text: 'Local and regional keyword targeting specific to your industry category and buyer search patterns in Tamil Nadu and Malaysia.',
  },
  {
    title: 'GEO & AEO for Industrial Businesses',
    icon: 'sparkles',
    color: 'icon-badge--amber',
    path: '/services/geo-aeo-ai-search/',
    text: 'Improve AI search visibility for industry-specific questions being asked through ChatGPT, Perplexity and Google AI Overviews.',
  },
  {
    title: 'Local SEO & Google Business Profile',
    icon: 'mappin',
    color: 'icon-badge--purple',
    path: '/services/local-seo/',
    text: 'Optimize Google Maps and Google Business Profile visibility for businesses where industrial buyers search for providers near their location.',
  },
  {
    title: 'Google Ads for Industrial Buyers',
    icon: 'megaphone',
    color: 'icon-badge--blue',
    path: '/services/google-ads/',
    text: 'Paid search campaigns targeting high-intent buyers searching for industrial, marine, logistics and manufacturing services.',
  },
  {
    title: 'B2B Social Media Marketing',
    icon: 'share',
    color: 'icon-badge--pink',
    path: '/services/social-media-marketing/',
    text: 'Platform-specific content and advertising for the industry’s professional audience, with LinkedIn as the primary B2B channel.',
  },
  {
    title: 'Industrial Website Development',
    icon: 'code',
    color: 'icon-badge--green',
    path: '/services/website-design-development/',
    text: 'SEO-ready websites with industry-appropriate content architecture and WhatsApp-first conversion design.',
  },
]

const JOURNEY_STEPS = [
  { label: 'PROCUREMENT NEED', sub: 'Corporate / Government / Industrial', icon: 'briefcase', color: 'icon-badge--blue' },
  { label: 'GOOGLE / AI SEARCH', sub: 'Vendor Research Queries', icon: 'search', color: 'icon-badge--cyan' },
  { label: 'VENDOR DISCOVERY', sub: 'Search Results / LinkedIn', icon: 'compass', color: 'icon-badge--purple' },
  { label: 'WEBSITE / LINKEDIN', sub: 'Capabilities & Credentials', icon: 'monitor', color: 'icon-badge--indigo' },
  { label: 'CREDIBILITY CHECK', sub: 'Projects / Certifications / Info', icon: 'shield', color: 'icon-badge--green' },
  { label: 'ENQUIRY', sub: 'WhatsApp / Phone / Website', icon: 'message', color: 'icon-badge--pink' },
]

const CONTENT_CARDS = [
  { icon: 'briefcase', color: 'icon-badge--blue', title: 'Capabilities', text: 'Explain what the business can deliver.' },
  { icon: 'book', color: 'icon-badge--amber', title: 'Industry Insights', text: 'Share relevant expertise.' },
  { icon: 'layers', color: 'icon-badge--cyan', title: 'Product / Service Knowledge', text: 'Explain technical offerings clearly.' },
  { icon: 'building', color: 'icon-badge--purple', title: 'Projects', text: 'Show verified projects only.' },
  { icon: 'users', color: 'icon-badge--pink', title: 'Leadership', text: 'Build professional authority.' },
  { icon: 'help', color: 'icon-badge--green', title: 'FAQ / Buyer Guides', text: 'Answer procurement questions.' },
]

const FUNNEL = [
  { label: 'AWARENESS', sub: 'LinkedIn / Content', icon: 'eye', color: 'icon-badge--purple' },
  { label: 'SEARCH', sub: 'Google / AI Search', icon: 'search', color: 'icon-badge--cyan' },
  { label: 'DISCOVERY', sub: 'Search Results / GBP', icon: 'compass', color: 'icon-badge--blue' },
  { label: 'CREDIBILITY', sub: 'Website / Capabilities', icon: 'shield', color: 'icon-badge--teal' },
  { label: 'CONSIDERATION', sub: 'Services / Projects', icon: 'target', color: 'icon-badge--amber' },
  { label: 'ENQUIRY', sub: 'WhatsApp / Phone / Website', icon: 'message', color: 'icon-badge--green' },
]

const FAQS = [
  {
    question: 'What digital marketing channels work best for B2B industrial businesses?',
    answer:
      'LinkedIn is the primary platform for B2B industrial marketing because it reaches procurement managers, logistics heads and company directors in a professional context. Google Ads for industrial keyword categories can generate high-intent inbound enquiries. A professional, schema-marked website with clear service descriptions and WhatsApp contact is the foundation that other channels can convert toward.',
  },
  {
    question: 'Can GEO and AEO benefit a B2B industrial company?',
    answer:
      'Yes. Procurement teams at large companies increasingly use ChatGPT and Perplexity to research and shortlist vendors. A strong GEO/AEO strategy can help structure the company’s digital presence so AI systems can better understand company, industry, location, services, capabilities, and relevance. We strengthen the digital signals that help AI systems understand your company and its relevance to specific industrial queries.',
  },
]

const CTA = {
  title:
    'Build a digital presence that helps procurement teams, corporate buyers and industrial customers discover, understand and contact your business.',
  label: '👋 WhatsApp for a Free Consultation',
}

/* ============================================================
   ICONS
   ============================================================ */

const ICONS = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3l1.9 5.8L19.7 10l-5.8 1.9L12 17.7l-1.9-5.8L4.3 10l5.8-1.9z" />
      <path d="M19 15l.7 2.1L21.8 18l-2.1.7L19 20.8l-.7-2.1L16.2 18l2.1-.9z" />
    </>
  ),
  mappin: (
    <>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  megaphone: (
    <>
      <path d="M3 11l18-5v12L3 13v-2z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </>
  ),
  share: (
    <>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" />
      <line x1="15.4" y1="6.5" x2="8.6" y2="10.5" />
    </>
  ),
  code: (
    <>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  check: <path d="M20 6L9 17l-5-5" />,
  whatsapp: (
    <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 1 1 16.1-3.8z" />
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
  book: (
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </>
  ),
  users: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.2 7.8 14.2 14.2 7.8 16.2 9.8 9.8 16.2 7.8" />
    </>
  ),
  message: (
    <>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </>
  ),
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  star: (
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  monitor: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 6h2M13 6h2M9 10h2M13 10h2M9 14h2M13 14h2M9 18h2M13 18h2" />
    </>
  ),
  briefcase: (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  eye: (
    <>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  ship: (
    <>
      <path d="M2 21l1-5h18l1 5" />
      <path d="M12 21V8" />
      <path d="M2 12l10-6 10 6" />
      <path d="M5 12v6h14v-6" />
    </>
  ),
  anchor: (
    <>
      <circle cx="12" cy="5" r="3" />
      <line x1="12" y1="22" x2="12" y2="8" />
      <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
    </>
  ),
  factory: (
    <>
      <path d="M2 20h20" />
      <path d="M5 20V8l7-5 7 5v12" />
      <path d="M9 20v-5h2v5" />
      <path d="M13 20v-5h2v5" />
      <path d="M9 12h.01M13 12h.01M17 12h.01" />
    </>
  ),
  layers: (
    <>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </>
  ),
}

function PmIcon({ name, size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name] || null}
    </svg>
  )
}

/* ============================================================
   FAQ ACCORDION
   ============================================================ */

function FaqAccordion({ faqs }) {
  const [open, setOpen] = useState(null)

  return (
    <div className="pm-faq__list">
      {faqs.map((faq, index) => {
        const isOpen = open === index
        return (
          <div className={cx('pm-faq__item', 'glass-card', isOpen && 'pm-faq__item--open')} key={index}>
            <h3 className="pm-faq__heading">
              <button
                type="button"
                className="pm-faq__question"
                id={`pm-faq-button-${index}`}
                aria-expanded={isOpen}
                aria-controls={`pm-faq-panel-${index}`}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <span className="pm-faq__question-text">{faq.question}</span>
                <span className="pm-faq__chevron" aria-hidden="true">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={`pm-faq-panel-${index}`}
              role="region"
              aria-labelledby={`pm-faq-button-${index}`}
              className={cx('pm-faq__panel', isOpen && 'pm-faq__panel--open')}
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="pm-faq__panel-inner">
                <p className="pm-faq__answer">{faq.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */

export default function PortMarineIndustrialThoothukudi() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/industries/port-marine-industrial-thoothukudi/`,
      ogType: 'website',
    })

    const faqEntities = FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    }))

    const webPage = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/industries/port-marine-industrial-thoothukudi/`,
      inLanguage: 'en',
      isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
      about: { '@type': 'Service', serviceType: 'B2B Digital Marketing for Port, Marine & Industrial Businesses' },
    }

    const service = serviceSchema({
      serviceType: 'B2B Digital Marketing for Port, Marine & Industrial Businesses',
      name: 'Digital Marketing for Port, Marine & Industrial Businesses, Static Savvy Media',
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/industries/port-marine-industrial-thoothukudi/`,
      provider: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
      areaServed: [
        { '@type': 'City', name: 'Thoothukudi' },
        { '@type': 'State', name: 'Tamil Nadu' },
        { '@type': 'Country', name: 'India' },
        { '@type': 'Country', name: 'Malaysia' },
      ],
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Industries', item: `${SITE_URL}/industries/` },
        { name: 'Port, Marine & Industrial', item: `${SITE_URL}/industries/port-marine-industrial-thoothukudi/` },
      ],
    })

    const scripts = [webPage, service, faqPageSchema({ faqs: faqEntities }), breadcrumbs].map(
      (data) => {
        const script = document.createElement('script')
        script.type = 'application/ld+json'
        script.text = JSON.stringify(data)
        document.head.appendChild(script)
        return script
      },
    )
    jsonLdRef.current = scripts

    return () => {
      jsonLdRef.current.forEach((script) => script.remove())
      jsonLdRef.current = []
    }
  }, [])

  const whatsappHref = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)

  return (
    <div className="service-template pm-page">
      <Breadcrumbs />

      {/* 1. HERO SECTION */}
      <HeroSection
        layout="two-column"
        eyebrow="PORT • MARINE • INDUSTRIAL"
        title={HERO_TITLE}
        subtitle={HERO_PARAGRAPH}
        actions={
          <>
            <Button
              href={whatsappHref}
              variant="primary"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp for a Free Consultation
            </Button>
            <Button to="/services/" variant="ghost" size="lg">
              Explore B2B Services
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
            </Button>
          </>
        }
      >
        <div className="hero__visual-side">
          <img
            src={portHeroImg}
            width={1536}
            height={1024}
            fetchPriority="high"
            alt="Port, Marine & Industrial"
            className="hero__image"
          />
        </div>
      </HeroSection>

      {/* 2. VALUE STRIP */}
      <section className="section pm-value-strip">
        <div className="container">
          <ScrollReveal>
            <div className="pm-value-strip__grid">
              {[
                { num: '01', label: 'BE FOUND', icon: 'search', color: 'icon-badge--cyan', text: 'Appear when procurement teams search for industrial suppliers and service providers.' },
                { num: '02', label: 'BUILD CREDIBILITY', icon: 'shield', color: 'icon-badge--blue', text: 'Present your company professionally across search, website and business platforms.' },
                { num: '03', label: 'GENERATE ENQUIRIES', icon: 'message', color: 'icon-badge--green', text: 'Convert high-intent searches into qualified contact opportunities.' },
                { num: '04', label: 'REACH B2B BUYERS', icon: 'globe', color: 'icon-badge--purple', text: 'Build visibility across search, LinkedIn, Google Ads and AI discovery.' },
              ].map((item) => (
                <div key={item.num} className="pm-value-strip__item glass-card">
                  <div className="pm-value-strip__header">
                    <span className="pm-value-strip__num">{item.num}</span>
                    <span className={cx('pm-value-strip__icon', 'icon-badge', item.color)} aria-hidden="true">
                      <PmIcon name={item.icon} size={18} />
                    </span>
                  </div>
                  <span className="pm-value-strip__label">{item.label}</span>
                  <p className="pm-value-strip__text">{item.text}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. INTRODUCTION */}
      <section className="section pm-intro">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">B2B Visibility</span>
            <h2 className="section-heading__title">Industrial Buyers Search Before They Enquire</h2>
          </div>
          <ScrollReveal>
            <div className="pm-intro__card glass-card">
              <p className="pm-intro__text">
                B2B industrial purchasing decisions are different from consumer purchases. Potential
                buyers research suppliers, manufacturers, shipping companies, logistics providers, marine
                service providers, industrial contractors, chemical manufacturers, and industrial service
                companies long before they send an enquiry. The objective of digital marketing is to make
                the business easier to discover and evaluate. Professional credibility is part of digital
                marketing.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. B2B JOURNEY */}
      <section className="section pm-journey">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">B2B Journey</span>
            <h2 className="section-heading__title">From Procurement Need to Enquiry</h2>
          </div>
          <ScrollReveal>
            <div className="pm-journey__grid">
              {JOURNEY_STEPS.map((step, index) => (
                <div className="pm-journey__card glass-card" key={step.label}>
                  <div className="pm-journey__card-top">
                    <span className="pm-journey__step-num">Step 0{index + 1}</span>
                    <span className={cx('pm-journey__icon', 'icon-badge', step.color)} aria-hidden="true">
                      <PmIcon name={step.icon} size={18} />
                    </span>
                  </div>
                  <h3 className="pm-journey__card-title">{step.label}</h3>
                  <p className="pm-journey__card-sub">{step.sub}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. SERVICES */}
      <section className="section pm-services">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Our Services</span>
            <h2 className="section-heading__title">
              How We Help Port, Marine &amp; Industrial Businesses
            </h2>
          </div>
          <div className="pm-services__grid">
            {SERVICES.map((svc, i) => (
              <ScrollReveal key={svc.title} delay={i * 60}>
                <Link to={svc.path} className="pm-service-card glass-card">
                  <div className="pm-service-card__top">
                    <span className="pm-service-card__number">{String(i + 1).padStart(2, '0')}</span>
                    <span className={cx('pm-service-card__icon', 'icon-badge', svc.color)} aria-hidden="true">
                      <PmIcon name={svc.icon} size={20} />
                    </span>
                  </div>
                  <h3 className="pm-service-card__title">{svc.title}</h3>
                  <p className="pm-service-card__text">{svc.text}</p>
                  <span className="pm-service-card__cta">
                    Learn More
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. THOOTHUKUDI PORT CORRIDOR */}
      <section className="section pm-corridor">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Thoothukudi</span>
            <h2 className="section-heading__title">
              Digital Marketing for Thoothukudi&apos;s B2B Economy
            </h2>
          </div>
          <ScrollReveal>
            <div className="pm-corridor__card glass-card">
              <p className="pm-corridor__text">
                Thoothukudi&apos;s business ecosystem includes port operations, marine services,
                industrial manufacturing, logistics, and export-oriented businesses. Generic
                consumer-focused marketing strategies are insufficient for this environment. This page
                is designed around the port ecosystem, industrial buyers, B2B procurement, regional
                search, and international buyer visibility.
              </p>
              <div className="pm-corridor__network glass-card">
                {[
                  { title: 'PORT', icon: 'anchor', color: 'icon-badge--cyan' },
                  { title: 'LOGISTICS', icon: 'layers', color: 'icon-badge--blue' },
                  { title: 'MARINE', icon: 'ship', color: 'icon-badge--teal' },
                  { title: 'MANUFACTURING', icon: 'factory', color: 'icon-badge--orange' },
                  { title: 'B2B BUYERS', icon: 'users', color: 'icon-badge--purple' },
                ].map((node) => (
                  <div className="pm-corridor__node glass-card" key={node.title}>
                    <span className={cx('pm-corridor__node-icon', 'icon-badge', node.color)} aria-hidden="true">
                      <PmIcon name={node.icon} size={20} />
                    </span>
                    <span className="pm-corridor__node-title">{node.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 7. LINKEDIN */}
      <section className="section pm-linkedin">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">LinkedIn</span>
            <h2 className="section-heading__title">Where Industrial Decision-Makers Are Looking</h2>
          </div>
          <ScrollReveal>
            <div className="pm-linkedin__card glass-card">
              <p className="pm-linkedin__text">
                LinkedIn is particularly relevant for B2B industrial marketing because it reaches
                procurement managers, logistics heads, and company directors in a professional context.
                Content themes include industry insights, company capabilities, product and service
                updates, operational expertise, leadership content, and business milestones.
              </p>
              <div className="pm-linkedin__grid">
                {[
                  { label: 'INDUSTRIAL COMPANY', icon: 'factory', color: 'icon-badge--orange' },
                  { label: 'LINKEDIN CONTENT', icon: 'share', color: 'icon-badge--blue' },
                  { label: 'DECISION MAKER', icon: 'users', color: 'icon-badge--purple' },
                  { label: 'WEBSITE', icon: 'globe', color: 'icon-badge--cyan' },
                  { label: 'ENQUIRY', icon: 'message', color: 'icon-badge--green' },
                ].map((step, idx) => (
                  <div className="pm-linkedin__step-card glass-card" key={step.label}>
                    <div className="pm-linkedin__step-header">
                      <span className="pm-linkedin__step-num">0{idx + 1}</span>
                      <span className={cx('pm-linkedin__icon', 'icon-badge', step.color)} aria-hidden="true">
                        <PmIcon name={step.icon} size={18} />
                      </span>
                    </div>
                    <span className="pm-linkedin__step-label">{step.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 8. SEARCH INTERFACE */}
      <section className="section pm-search-ui">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Search</span>
            <h2 className="section-heading__title">Be Findable When Procurement Teams Search</h2>
          </div>
          <ScrollReveal>
            <div className="pm-search-ui__card glass-card">
              <div className="pm-search-ui__bar glass-card">
                <PmIcon name="search" size={18} />
                <span className="pm-search-ui__placeholder">
                  &quot;industrial suppliers in Thoothukudi&quot;
                </span>
              </div>
              <div className="pm-search-ui__pills">
                {[
                  'marine services Thoothukudi',
                  'shipping companies near Thoothukudi Port',
                  'logistics companies Thoothukudi',
                  'industrial service providers Thoothukudi',
                ].map((q) => (
                  <span key={q} className="pm-search-ui__pill glass-card">
                    <PmIcon name="search" size={14} />
                    <span>&quot;{q}&quot;</span>
                  </span>
                ))}
              </div>

              <div className="pm-search-ui__grid">
                {[
                  { label: 'SEARCH', icon: 'search', color: 'icon-badge--cyan' },
                  { label: 'DISCOVERY', icon: 'compass', color: 'icon-badge--purple' },
                  { label: 'VENDOR WEBSITE', icon: 'monitor', color: 'icon-badge--blue' },
                  { label: 'CAPABILITY CHECK', icon: 'shield', color: 'icon-badge--teal' },
                  { label: 'CONTACT', icon: 'message', color: 'icon-badge--green' },
                ].map((step, idx) => (
                  <div className="pm-search-ui__step-card glass-card" key={step.label}>
                    <div className="pm-search-ui__step-header">
                      <span className="pm-search-ui__step-num">0{idx + 1}</span>
                      <span className={cx('pm-search-ui__icon', 'icon-badge', step.color)} aria-hidden="true">
                        <PmIcon name={step.icon} size={18} />
                      </span>
                    </div>
                    <span className="pm-search-ui__step-label">{step.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 9. GOOGLE SEARCH + MAPS */}
      <section className="section pm-google">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Google</span>
            <h2 className="section-heading__title">Capture High-Intent Industrial Searches</h2>
          </div>
          <ScrollReveal>
            <div className="pm-google__mockup glass-card">
              <div className="pm-google__bar glass-card">
                <PmIcon name="search" size={18} />
                <span className="pm-google__query">industrial suppliers near Thoothukudi Port</span>
              </div>
              <div className="pm-google__results">
                <div className="pm-google__result glass-card">
                  <div className="pm-google__result-header">
                    <span className="icon-badge icon-badge--cyan" aria-hidden="true"><PmIcon name="factory" size={18} /></span>
                    <div>
                      <h3 className="pm-google__result-title">Industrial Supplier Co.</h3>
                      <span className="pm-google__result-meta">Category: Industrial Supplier | Location: SIPCOT, Thoothukudi</span>
                    </div>
                  </div>
                  <p className="pm-google__result-services">Services: Manufacturing, Logistics, Export</p>
                  <div className="pm-google__result-actions">
                    <span className="pm-google__action glass-card"><PmIcon name="globe" size={13} /> Website</span>
                    <span className="pm-google__action glass-card"><PmIcon name="phone" size={13} /> Phone</span>
                    <span className="pm-google__action glass-card"><PmIcon name="mappin" size={13} /> Directions</span>
                  </div>
                </div>

                <div className="pm-google__result glass-card">
                  <div className="pm-google__result-header">
                    <span className="icon-badge icon-badge--teal" aria-hidden="true"><PmIcon name="ship" size={18} /></span>
                    <div>
                      <h3 className="pm-google__result-title">Marine Services Ltd.</h3>
                      <span className="pm-google__result-meta">Category: Marine Services | Location: Thoothukudi Port</span>
                    </div>
                  </div>
                  <p className="pm-google__result-services">Services: Shipping, Marine Maintenance, Logistics</p>
                  <div className="pm-google__result-actions">
                    <span className="pm-google__action glass-card"><PmIcon name="globe" size={13} /> Website</span>
                    <span className="pm-google__action glass-card"><PmIcon name="phone" size={13} /> Phone</span>
                    <span className="pm-google__action glass-card"><PmIcon name="mappin" size={13} /> Directions</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 10. GEO / AEO */}
      <section className="section pm-geo">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">AI Search</span>
            <h2 className="section-heading__title">Be Visible When B2B Buyers Ask AI</h2>
          </div>
          <ScrollReveal>
            <p className="pm-geo__text">
              Procurement teams increasingly use AI tools to research and shortlist vendors.
              ChatGPT, Perplexity, and Google AI Overviews are answering industrial queries every day.
              A strong GEO/AEO strategy can help structure the company&apos;s digital presence so AI
              systems can better understand company, industry, location, services, and capabilities.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="pm-geo__signals">
              {[
                { icon: 'building', label: 'Company Entity', color: 'icon-badge--purple' },
                { icon: 'mappin', label: 'Location', color: 'icon-badge--red' },
                { icon: 'briefcase', label: 'Services', color: 'icon-badge--blue' },
                { icon: 'layers', label: 'Capabilities', color: 'icon-badge--cyan' },
                { icon: 'globe', label: 'Website Content', color: 'icon-badge--amber' },
                { icon: 'check', label: 'Structured Data', color: 'icon-badge--green' },
              ].map((sig) => (
                <div className="pm-geo__signal glass-card" key={sig.label}>
                  <span className={cx('pm-geo__signal-icon', 'icon-badge', sig.color)} aria-hidden="true">
                    <PmIcon name={sig.icon} size={18} />
                  </span>
                  <span className="pm-geo__signal-label">{sig.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 11. B2B CREDIBILITY */}
      <section className="section pm-credibility">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Credibility</span>
            <h2 className="section-heading__title">Your Website Is Your Digital Company Profile</h2>
          </div>
          <ScrollReveal>
            <p className="pm-credibility__text">
              Industrial buyers often need more than a social media page. A professional website
              should clearly communicate who you are, what you do, where you operate, who you serve,
              what capabilities you have, and how to contact you.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="pm-credibility__mockup glass-card">
              <div className="pm-credibility__nav">
                <span className="pm-credibility__nav-item glass-card">About</span>
                <span className="pm-credibility__nav-item glass-card">Services</span>
                <span className="pm-credibility__nav-item glass-card">Industries</span>
                <span className="pm-credibility__nav-item glass-card">Capabilities</span>
                <span className="pm-credibility__nav-item glass-card">Projects</span>
                <span className="pm-credibility__nav-item glass-card">Contact</span>
              </div>
              <div className="pm-credibility__body">
                <div className="pm-credibility__hero glass-card">
                  <span className="pm-credibility__hero-label">YOUR COMPANY NAME</span>
                  <span className="pm-credibility__hero-sub">Industrial Solutions | Thoothukudi</span>
                </div>
                <div className="pm-credibility__grid">
                  {[
                    { icon: 'briefcase', label: 'Capabilities', color: 'icon-badge--blue' },
                    { icon: 'factory', label: 'Infrastructure', color: 'icon-badge--orange' },
                    { icon: 'layers', label: 'Products', color: 'icon-badge--cyan' },
                    { icon: 'building', label: 'Projects', color: 'icon-badge--purple' },
                  ].map((item) => (
                    <div key={item.label} className="pm-credibility__grid-item glass-card">
                      <span className={cx('pm-credibility__icon', 'icon-badge', item.color)} aria-hidden="true">
                        <PmIcon name={item.icon} size={18} />
                      </span>
                      <span className="pm-credibility__label">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 12. CONTENT STRATEGY */}
      <section className="section pm-content">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Content</span>
            <h2 className="section-heading__title">Content That Builds Industrial Authority</h2>
          </div>
          <div className="pm-content__grid">
            {CONTENT_CARDS.map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 60}>
                <div className="pm-content-card glass-card">
                  <span className={cx('pm-content-card__icon', 'icon-badge', card.color)} aria-hidden="true">
                    <PmIcon name={card.icon} size={20} />
                  </span>
                  <h3 className="pm-content-card__title">{card.title}</h3>
                  <p className="pm-content-card__text">{card.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 13. B2B FUNNEL */}
      <section className="section pm-funnel">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">B2B Funnel</span>
            <h2 className="section-heading__title">The Industrial Marketing Funnel</h2>
          </div>
          <ScrollReveal>
            <div className="pm-funnel__grid">
              {FUNNEL.map((step, index) => (
                <div key={step.label} className="pm-funnel__card glass-card">
                  <div className="pm-funnel__card-top">
                    <span className="pm-funnel__step-num">Step 0{index + 1}</span>
                    <span className={cx('pm-funnel__icon', 'icon-badge', step.color)} aria-hidden="true">
                      <PmIcon name={step.icon} size={18} />
                    </span>
                  </div>
                  <h3 className="pm-funnel__card-title">{step.label}</h3>
                  <p className="pm-funnel__card-sub">{step.sub}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 14. FAQ */}
      <section className="section pm-faq">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">FAQ</span>
            <h2 className="section-heading__title">
              Frequently Asked Questions &mdash; Port, Marine &amp; Industrial
            </h2>
          </div>
          <FaqAccordion faqs={FAQS} />
        </div>
      </section>

      {/* 15. LOCATIONS */}
      <section className="section pm-locations">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Coverage</span>
            <h2 className="section-heading__title">
              Industrial Digital Marketing Across Tamil Nadu &amp; Malaysia
            </h2>
          </div>
          <div className="pm-locations__grid">
            <ScrollReveal className="pm-locations__cell">
              <div className="pm-location-card glass-card">
                <span className="icon-badge icon-badge--cyan" aria-hidden="true">
                  <PmIcon name="mappin" size={22} />
                </span>
                <h3 className="pm-location-card__title">Tamil Nadu</h3>
                <p className="pm-location-card__text">
                  From Thoothukudi to Chennai and Coimbatore, we help industrial, marine, and
                  logistics businesses rank for procurement-intent searches across Tamil Nadu &mdash;
                  with campaigns matched to B2B buyer behaviour.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal className="pm-locations__cell" delay={100}>
              <div className="pm-location-card glass-card">
                <span className="icon-badge icon-badge--blue" aria-hidden="true">
                  <PmIcon name="globe" size={22} />
                </span>
                <h3 className="pm-location-card__title">Malaysia</h3>
                <p className="pm-location-card__text">
                  For industrial and marine businesses serving Malaysian and international buyers,
                  we build campaigns tuned to local search intent and the platforms procurement
                  teams use &mdash; including LinkedIn and Google Ads strategies for B2B visibility.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 16. RELATED INDUSTRIES */}
      <section className="section pm-related">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Explore More</span>
            <h2 className="section-heading__title">Related Industries</h2>
          </div>
          <div className="pm-related__links">
            <Link to="/industries/textiles-madurai/" className="related-content__link">
              Textiles &amp; Madurai
            </Link>
            <Link to="/industries/smes-malaysia-grant-eligible/" className="related-content__link">
              SMEs &amp; Malaysia Grant-Eligible
            </Link>
            <Link to="/industries/real-estate-builders/" className="related-content__link">
              Real Estate &amp; Builders
            </Link>
            <Link to="/industries/" className="related-content__link">
              All Industries
            </Link>
            <Link to="/services/" className="related-content__link">
              All Services
            </Link>
            <Link to="/contact/" className="related-content__link">
              Contact
            </Link>
            <Link to="/faq/" className="related-content__link">
              FAQ
            </Link>
          </div>
        </div>
      </section>

      {/* 17. FINAL CTA & CONTACT */}
      <CTASection
        title={CTA.title}
        primaryLabel={CTA.label}
        primaryHref={whatsappHref}
        secondaryLabel="Explore All Industries"
        secondaryTo="/industries/"
      />
      <ContactFormSection />
    </div>
  )
}
