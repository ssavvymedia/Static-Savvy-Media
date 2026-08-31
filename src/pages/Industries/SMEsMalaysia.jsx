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
import '../../styles/pages/smes-malaysia.css'
import smeHeroImg from '../../assets/images/Industries/07SME.png'

const PAGE_TITLE =
  'Digital Marketing for Malaysian SMEs | Static Savvy Media'

const PAGE_DESCRIPTION =
  'SEO, Google Ads, social media, websites and AI search visibility for Malaysian SMEs. Explore digital transformation and grant-eligible service support.'

const HERO_TITLE =
  'Digital Marketing for Malaysian SMEs, Government Grant-Eligible Services'

const HERO_PARAGRAPH =
  "Build a stronger digital presence, reach more customers and compete in Malaysia's digital economy with SEO, social media, web design and AI-powered visibility."

const SERVICES = [
  {
    title: 'SEO for Malaysian SMEs',
    icon: 'search',
    color: 'icon-badge--blue',
    path: '/services/seo/',
    text: 'Optimize your website for searches like "IT support Kuala Lumpur" and "accounting services Penang" to capture businesses actively searching online.',
  },
  {
    title: 'GEO & AEO, AI Search Visibility',
    icon: 'sparkles',
    color: 'icon-badge--amber',
    path: '/services/geo-aeo-ai-search/',
    text: 'Improve AI search visibility when decision-makers ask ChatGPT, Perplexity and Google AI Overviews about SME services and businesses in Malaysia.',
  },
  {
    title: 'Local SEO & Google Business Profile',
    icon: 'mappin',
    color: 'icon-badge--purple',
    path: '/services/local-seo/',
    text: 'Optimize Google Maps and Google Business Profile visibility so local customers find your business location and services easily.',
  },
  {
    title: 'Google Ads for High-Intent Customers',
    icon: 'megaphone',
    color: 'icon-badge--cyan',
    path: '/services/google-ads/',
    text: 'Paid search campaigns targeting high-intent buyers searching for specific services, solutions and business categories in your target markets.',
  },
  {
    title: 'Social Media Marketing',
    icon: 'share',
    color: 'icon-badge--pink',
    path: '/services/social-media-marketing/',
    text: 'Facebook and Instagram campaigns showcasing services, expertise and credibility content to drive traffic, enquiries and customer trust.',
  },
  {
    title: 'SEO-Ready Website Development',
    icon: 'code',
    color: 'icon-badge--green',
    path: '/services/website-design-development/',
    text: 'Professional websites with clear service messaging, conversion-focused design and WhatsApp-first enquiry flow for Malaysian businesses.',
  },
]

const JOURNEY_STEPS = [
  { label: 'DISCOVER', sub: 'SEO / Local SEO / AI Search', icon: 'search', color: 'icon-badge--blue' },
  { label: 'BUILD', sub: 'Website / Content / Brand', icon: 'code', color: 'icon-badge--cyan' },
  { label: 'ATTRACT', sub: 'Google Ads / Social Media', icon: 'megaphone', color: 'icon-badge--purple' },
  { label: 'CONVERT', sub: 'WhatsApp / Landing Pages', icon: 'message', color: 'icon-badge--green' },
  { label: 'GROW', sub: 'Analytics / Optimization', icon: 'target', color: 'icon-badge--amber' },
]

const DIGITAL_MATURITY = [
  { label: 'STARTING', sub: 'No strong digital presence', icon: 'compass', color: 'icon-badge--blue' },
  { label: 'BUILDING', sub: 'Website + social media', icon: 'code', color: 'icon-badge--cyan' },
  { label: 'GROWING', sub: 'SEO + Ads + content + analytics', icon: 'target', color: 'icon-badge--purple' },
  { label: 'SCALING', sub: 'AI search + automation + multi-market', icon: 'sparkles', color: 'icon-badge--amber' },
]

const INDUSTRY_CATEGORIES = [
  { title: 'Retail', icon: 'tag', color: 'icon-badge--pink' },
  { title: 'Manufacturing', icon: 'package', color: 'icon-badge--amber' },
  { title: 'Services', icon: 'briefcase', color: 'icon-badge--blue' },
  { title: 'Professional Services', icon: 'users', color: 'icon-badge--purple' },
  { title: 'Education', icon: 'book', color: 'icon-badge--teal' },
  { title: 'Healthcare', icon: 'shield', color: 'icon-badge--red' },
  { title: 'Hospitality', icon: 'home', color: 'icon-badge--orange' },
  { title: 'Real Estate', icon: 'building', color: 'icon-badge--cyan' },
  { title: 'Food & Beverage', icon: 'zap', color: 'icon-badge--gold' },
  { title: 'E-Commerce', icon: 'shopping-cart', color: 'icon-badge--magenta' },
  { title: 'B2B', icon: 'briefcase', color: 'icon-badge--indigo' },
  { title: 'D2C', icon: 'share', color: 'icon-badge--green' },
]

const FAQS = [
  {
    question: 'Which Malaysian SMEs qualify for digital marketing grants?',
    answer:
      'Generally, SMEs registered under SSM with annual sales revenue below RM50 million and fewer than 200 full-time employees qualify for most SME-targeted programmes. Specific programmes have additional criteria. Some favour Bumiputera-owned businesses and some prioritise specific sectors. We help you assess eligibility for current active programmes.',
  },
  {
    question: 'Do I need to speak Bahasa Malaysia to work with your team?',
    answer:
      'No. Our team communicates in English and Bahasa Malaysia. For Malaysian clients who prefer BM communication, we accommodate this. All content we produce in BM is written or reviewed by native speakers.',
  },
  {
    question: 'Can you help my Malaysian business reach the Tamil diaspora in Singapore and Australia?',
    answer:
      'Yes. Our team spans the Tamil Nadu and Malaysian Tamil markets and understands platform dynamics for reaching Tamil diaspora communities in Singapore, Australia, the UK and beyond. Instagram and Facebook with relevant audience targeting, combined with WhatsApp as a sales channel, can form part of the approach.',
  },
]

const CTA = {
  title:
    'Build your online presence, reach the right customers and create a digital growth system designed around your business.',
  label: '👋 WhatsApp for a Free Consultation',
}

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
  tag: (
    <>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </>
  ),
  package: (
    <>
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </>
  ),
  home: (
    <>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </>
  ),
  facebook: (
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  ),
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </>
  ),
  'shopping-cart': (
    <>
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </>
  ),
  layers: (
    <>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </>
  ),
}

function SmIcon({ name, size = 20 }) {
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

function FaqAccordion({ faqs }) {
  const [open, setOpen] = useState(null)

  return (
    <div className="sm-faq__list">
      {faqs.map((faq, index) => {
        const isOpen = open === index
        return (
          <div className={cx('sm-faq__item', 'glass-card', isOpen && 'sm-faq__item--open')} key={index}>
            <h3 className="sm-faq__heading">
              <button
                type="button"
                className="sm-faq__question"
                id={`sm-faq-button-${index}`}
                aria-expanded={isOpen}
                aria-controls={`sm-faq-panel-${index}`}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <span className="sm-faq__question-text">{faq.question}</span>
                <span className="sm-faq__chevron" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={`sm-faq-panel-${index}`}
              role="region"
              aria-labelledby={`sm-faq-button-${index}`}
              className={cx('sm-faq__panel', isOpen && 'sm-faq__panel--open')}
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="sm-faq__panel-inner">
                <p className="sm-faq__answer">{faq.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function SMEsMalaysia() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/industries/smes-malaysia-grant-eligible/`,
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
      url: `${SITE_URL}/industries/smes-malaysia-grant-eligible/`,
      inLanguage: 'en',
      isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
      about: { '@type': 'Service', serviceType: 'Digital Marketing for Malaysian SMEs' },
    }

    const service = serviceSchema({
      serviceType: 'Digital Marketing for Malaysian SMEs',
      name: 'Digital Marketing for Malaysian SMEs, Static Savvy Media',
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/industries/smes-malaysia-grant-eligible/`,
      provider: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
      areaServed: [
        { '@type': 'Country', name: 'Malaysia' },
        { '@type': 'State', name: 'Kuala Lumpur' },
        { '@type': 'State', name: 'Selangor' },
        { '@type': 'State', name: 'Penang' },
        { '@type': 'State', name: 'Johor' },
        { '@type': 'State', name: 'Perak' },
      ],
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Industries', item: `${SITE_URL}/industries/` },
        { name: 'Malaysian SMEs', item: `${SITE_URL}/industries/smes-malaysia-grant-eligible/` },
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
    <div className="service-template sm-page">
      <Breadcrumbs />

      {/* 1. HERO SECTION */}
      <HeroSection
        layout="two-column"
        eyebrow="MALAYSIA SMEs • DIGITAL TRANSFORMATION"
        title={HERO_TITLE}
        subtitle={HERO_PARAGRAPH}
        actions={
          <>
            <Button href={whatsappHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">
              WhatsApp for a Free Consultation
            </Button>
            <Button to="/services/" variant="ghost" size="lg">
              Explore Services
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Button>
          </>
        }
      >
        <div className="hero__visual-side">
          <img
            src={smeHeroImg}
            alt="Malaysia SMEs"
            className="hero__image"
          />
        </div>
      </HeroSection>

      {/* 2. VALUE STRIP */}
      <section className="section sm-value-strip">
        <div className="container">
          <ScrollReveal>
            <div className="sm-value-strip__grid">
              {[
                { num: '01', label: 'GET DISCOVERED', icon: 'search', color: 'icon-badge--blue', text: 'Appear when customers search for services in your category across Google, social media and AI search.' },
                { num: '02', label: 'BUILD DIGITAL PRESENCE', icon: 'monitor', color: 'icon-badge--cyan', text: 'Create a professional website, social media presence and Google Business Profile that builds trust.' },
                { num: '03', label: 'GENERATE ENQUIRIES', icon: 'message', color: 'icon-badge--green', text: 'Convert digital attention into WhatsApp messages, phone calls and enquiry forms from real prospects.' },
                { num: '04', label: 'COMPETE DIGITALLY', icon: 'zap', color: 'icon-badge--amber', text: 'Strengthen your competitive position with a system designed to grow alongside your business.' },
              ].map((item) => (
                <div key={item.num} className="sm-value-strip__item glass-card">
                  <div className="sm-value-strip__header">
                    <span className="sm-value-strip__num">{item.num}</span>
                    <span className={cx('sm-value-strip__icon', 'icon-badge', item.color)} aria-hidden="true">
                      <SmIcon name={item.icon} size={18} />
                    </span>
                  </div>
                  <span className="sm-value-strip__label">{item.label}</span>
                  <p className="sm-value-strip__text">{item.text}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. INTRODUCTION */}
      <section className="section sm-intro">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Digital First</span>
            <h2 className="section-heading__title">Malaysia&rsquo;s SMEs Are Moving Into a Digital-First Economy</h2>
          </div>
          <ScrollReveal>
            <div className="sm-intro__card glass-card">
              <p className="sm-intro__text">
                Whether your business serves local customers in Kuala Lumpur, operates across multiple Malaysian states
                or reaches customers internationally, your digital presence determines how many people discover your
                services and how many ultimately choose you. Malaysian SMEs that invest in digital marketing build
                stronger competitive positions in an increasingly connected economy.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="sm-intro__pillars">
              <div className="sm-intro__pillar glass-card">
                <span className="icon-badge icon-badge--blue" aria-hidden="true"><SmIcon name="eye" size={20} /></span>
                <h3 className="sm-intro__pillar-title">Visibility</h3>
                <p className="sm-intro__pillar-text">Be found when customers search for services you offer in your area and beyond.</p>
              </div>
              <div className="sm-intro__pillar glass-card">
                <span className="icon-badge icon-badge--purple" aria-hidden="true"><SmIcon name="shield" size={20} /></span>
                <h3 className="sm-intro__pillar-title">Credibility</h3>
                <p className="sm-intro__pillar-text">Present a professional digital presence that builds trust before the first conversation.</p>
              </div>
              <div className="sm-intro__pillar glass-card">
                <span className="icon-badge icon-badge--green" aria-hidden="true"><SmIcon name="target" size={20} /></span>
                <h3 className="sm-intro__pillar-title">Conversion</h3>
                <p className="sm-intro__pillar-text">Turn website visits and social media engagement into WhatsApp enquiries and business conversations.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. SME GROWTH JOURNEY */}
      <section className="section sm-journey">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">SME Growth Journey</span>
            <h2 className="section-heading__title">From Digital Presence to Business Growth</h2>
          </div>
          <ScrollReveal>
            <div className="sm-journey__grid">
              {JOURNEY_STEPS.map((step, index) => (
                <div className="sm-journey__card glass-card" key={step.label}>
                  <div className="sm-journey__card-top">
                    <span className="sm-journey__step-num">Step 0{index + 1}</span>
                    <span className={cx('sm-journey__icon', 'icon-badge', step.color)} aria-hidden="true">
                      <SmIcon name={step.icon} size={18} />
                    </span>
                  </div>
                  <h3 className="sm-journey__card-title">{step.label}</h3>
                  <p className="sm-journey__card-sub">{step.sub}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. SERVICES */}
      <section className="section sm-services">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Our Services</span>
            <h2 className="section-heading__title">How We Help Malaysian SMEs Grow Digitally</h2>
          </div>
          <div className="sm-services__grid">
            {SERVICES.map((svc, i) => (
              <ScrollReveal key={svc.title} delay={i * 60}>
                <Link to={svc.path} className="sm-service-card glass-card">
                  <div className="sm-service-card__top">
                    <span className="sm-service-card__number">{String(i + 1).padStart(2, '0')}</span>
                    <span className={cx('sm-service-card__icon', 'icon-badge', svc.color)} aria-hidden="true">
                      <SmIcon name={svc.icon} size={20} />
                    </span>
                  </div>
                  <h3 className="sm-service-card__title">{svc.title}</h3>
                  <p className="sm-service-card__text">{svc.text}</p>
                  <span className="sm-service-card__cta">
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

      {/* 6. MALAYSIA MARKET */}
      <section className="section sm-malaysia-market">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Built for Malaysia</span>
            <h2 className="section-heading__title">Built for the Malaysian Market</h2>
          </div>
          <ScrollReveal>
            <div className="sm-malaysia-market__card-container glass-card">
              <p className="sm-malaysia-market__text">
                We understand the Malaysian business landscape because we work across it daily. From
                local SMEs in neighbourhood commercial areas to growing businesses expanding across
                state lines, our strategies are built around how Malaysian customers search, compare
                and choose businesses.
              </p>
              <div className="sm-malaysia-market__grid">
                <div className="sm-malaysia-market__card glass-card">
                  <span className="icon-badge icon-badge--red" aria-hidden="true"><SmIcon name="mappin" size={20} /></span>
                  <h3 className="sm-malaysia-market__card-title">Local</h3>
                  <p className="sm-malaysia-market__card-text">Google Business Profile, local search and Google Maps visibility for businesses serving specific areas.</p>
                </div>
                <div className="sm-malaysia-market__card glass-card">
                  <span className="icon-badge icon-badge--cyan" aria-hidden="true"><SmIcon name="globe" size={20} /></span>
                  <h3 className="sm-malaysia-market__card-title">Language</h3>
                  <p className="sm-malaysia-market__card-text">English and Bahasa Malaysia content, campaigns and customer communication for the Malaysian market.</p>
                </div>
                <div className="sm-malaysia-market__card glass-card">
                  <span className="icon-badge icon-badge--purple" aria-hidden="true"><SmIcon name="users" size={20} /></span>
                  <h3 className="sm-malaysia-market__card-title">Diaspora</h3>
                  <p className="sm-malaysia-market__card-text">Reach Malaysian and Tamil diaspora communities in Singapore, Australia and beyond with targeted strategies.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 7. BAHASA MALAYSIA */}
      <section className="section sm-bahasa">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Language</span>
            <h2 className="section-heading__title">Digital Marketing in English &amp; Bahasa Malaysia</h2>
          </div>
          <ScrollReveal>
            <div className="sm-bahasa__card glass-card">
              <p className="sm-bahasa__text">
                Malaysia is a multilingual market. Your digital marketing should speak the language your
                customers prefer. We create content and campaigns in both English and Bahasa Malaysia
                so your business reaches the widest possible audience across Malaysian demographics.
              </p>
              <div className="sm-bahasa__toggle-wrap">
                <div className="sm-bahasa__toggle-bar glass-card">
                  <span className="sm-bahasa__option sm-bahasa__option--active">EN</span>
                  <span className="sm-bahasa__divider">/</span>
                  <span className="sm-bahasa__option">Bahasa Malaysia</span>
                </div>
                <div className="sm-bahasa__examples">
                  <div className="sm-bahasa__example glass-card">
                    <span className="sm-bahasa__lang glass-card">EN</span>
                    <span className="sm-bahasa__sample">&ldquo;Digital marketing services for SMEs in Kuala Lumpur&rdquo;</span>
                  </div>
                  <div className="sm-bahasa__example glass-card">
                    <span className="sm-bahasa__lang glass-card">BM</span>
                    <span className="sm-bahasa__sample">&ldquo;Perkhidmatan pemasaran digital untuk PKS di Kuala Lumpur&rdquo;</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 8. ELIGIBILITY */}
      <section className="section sm-eligibility">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Grant Eligibility</span>
            <h2 className="section-heading__title">Could Your Business Be Eligible for SME Digital Transformation Support?</h2>
          </div>
          <ScrollReveal>
            <div className="sm-eligibility__card glass-card">
              <p className="sm-eligibility__text">
                Various Malaysian government programmes may offer support for SME digital transformation
                activities including website development, digital advertising and technology adoption.
                Eligibility depends on your business registration, revenue and employee count.
              </p>
              <div className="sm-eligibility__checklist">
                <div className="sm-eligibility__item glass-card">
                  <span className="icon-badge icon-badge--green" aria-hidden="true"><SmIcon name="check" size={16} /></span>
                  <span className="sm-eligibility__label">SSM registered</span>
                </div>
                <div className="sm-eligibility__item glass-card">
                  <span className="icon-badge icon-badge--green" aria-hidden="true"><SmIcon name="check" size={16} /></span>
                  <span className="sm-eligibility__label">Revenue below RM50 million</span>
                </div>
                <div className="sm-eligibility__item glass-card">
                  <span className="icon-badge icon-badge--green" aria-hidden="true"><SmIcon name="check" size={16} /></span>
                  <span className="sm-eligibility__label">Fewer than 200 employees</span>
                </div>
              </div>
              <p className="sm-eligibility__disclaimer">
                Disclaimer: Eligibility criteria vary by programme and are determined by the relevant
                government agencies. The information above reflects general SME definitions and does not
                constitute a guarantee of grant approval. We help you assess eligibility for current
                active programmes but cannot guarantee outcomes.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 9. GRANT CTA */}
      <section className="section sm-grant-cta">
        <div className="container">
          <ScrollReveal>
            <div className="sm-grant-cta__card glass-card">
              <div className="sm-grant-cta__content">
                <span className="icon-badge icon-badge--blue" aria-hidden="true" style={{ marginBottom: '1rem' }}>
                  <SmIcon name="compass" size={24} />
                </span>
                <h3 className="sm-grant-cta__title">Check Your Eligibility</h3>
                <p className="sm-grant-cta__text">
                  Not sure which programmes your business may qualify for? We can help you assess
                  eligibility for current SME digital transformation support options in Malaysia.
                </p>
                <div className="sm-grant-cta__actions">
                  <Button href={whatsappHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">
                    👋 Check Eligibility on WhatsApp
                  </Button>
                  <Button to="/contact/" variant="ghost" size="lg">
                    Contact Us
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 10. INDUSTRY ECOSYSTEM */}
      <section className="section sm-industry-eco">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Industries</span>
            <h2 className="section-heading__title">SME Industries We Support Across Malaysia</h2>
          </div>
          <ScrollReveal>
            <div className="sm-industry-eco__grid">
              {INDUSTRY_CATEGORIES.map((cat) => (
                <div className="sm-industry-eco__card glass-card" key={cat.title}>
                  <span className={cx('sm-industry-eco__icon', 'icon-badge', cat.color)} aria-hidden="true">
                    <SmIcon name={cat.icon} size={18} />
                  </span>
                  <span className="sm-industry-eco__title">{cat.title}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 11. CUSTOMER DISCOVERY */}
      <section className="section sm-discovery">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Customer Discovery</span>
            <h2 className="section-heading__title">Where Malaysian Customers Discover Businesses</h2>
          </div>
          <ScrollReveal>
            <p className="sm-discovery__text">
              Malaysian customers use multiple channels to discover and evaluate businesses before
              making contact. Your digital presence needs to be visible across these touchpoints
              so you are part of the consideration set when they are ready to act.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="sm-discovery__grid">
              {[
                { label: 'GOOGLE SEARCH', sub: 'Service queries', icon: 'search', color: 'icon-badge--blue' },
                { label: 'GOOGLE MAPS', sub: 'Local businesses', icon: 'mappin', color: 'icon-badge--red' },
                { label: 'SOCIAL MEDIA', sub: 'Facebook / Instagram', icon: 'share', color: 'icon-badge--pink' },
                { label: 'AI SEARCH', sub: 'ChatGPT / Perplexity', icon: 'sparkles', color: 'icon-badge--amber' },
                { label: 'WEBSITE', sub: 'Service details', icon: 'globe', color: 'icon-badge--cyan' },
                { label: 'WHATSAPP', sub: 'First contact', icon: 'whatsapp', color: 'icon-badge--green' },
                { label: 'ENQUIRY', sub: 'Business conversation', icon: 'message', color: 'icon-badge--purple' },
              ].map((step, index) => (
                <div className="sm-discovery__card glass-card" key={step.label}>
                  <div className="sm-discovery__card-top">
                    <span className="sm-discovery__step-num">Step 0{index + 1}</span>
                    <span className={cx('sm-discovery__icon', 'icon-badge', step.color)} aria-hidden="true">
                      <SmIcon name={step.icon} size={18} />
                    </span>
                  </div>
                  <h3 className="sm-discovery__card-title">{step.label}</h3>
                  <p className="sm-discovery__card-sub">{step.sub}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 12. WHATSAPP CONVERSION */}
      <section className="section sm-whatsapp">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">WhatsApp Conversion</span>
            <h2 className="section-heading__title">Turn Digital Attention Into WhatsApp Enquiries</h2>
          </div>
          <ScrollReveal>
            <p className="sm-whatsapp__text">
              For many Malaysian SMEs, WhatsApp is the primary sales and service channel. Your
              digital marketing should be designed to move people from discovery to WhatsApp
              conversation as naturally and quickly as possible.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="sm-whatsapp__grid">
              {[
                { label: 'GOOGLE SEARCH', sub: 'Customer finds you', icon: 'search', color: 'icon-badge--blue' },
                { label: 'LANDING PAGE', sub: 'Service / product info', icon: 'globe', color: 'icon-badge--cyan' },
                { label: 'SERVICE DETAILS', sub: 'What you offer', icon: 'layers', color: 'icon-badge--purple' },
                { label: 'TRUST SIGNALS', sub: 'Reviews / credentials', icon: 'star', color: 'icon-badge--amber' },
                { label: 'WHATSAPP BUTTON', sub: 'One tap to message', icon: 'whatsapp', color: 'icon-badge--green' },
                { label: 'BUSINESS CONVERSATION', sub: 'Enquiry / quote / booking', icon: 'message', color: 'icon-badge--pink' },
              ].map((step, index) => (
                <div className="sm-whatsapp__card glass-card" key={step.label}>
                  <div className="sm-whatsapp__card-top">
                    <span className="sm-whatsapp__step-num">Step 0{index + 1}</span>
                    <span className={cx('sm-whatsapp__icon', 'icon-badge', step.color)} aria-hidden="true">
                      <SmIcon name={step.icon} size={18} />
                    </span>
                  </div>
                  <h3 className="sm-whatsapp__card-title">{step.label}</h3>
                  <p className="sm-whatsapp__card-sub">{step.sub}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 13. LOCAL VISIBILITY */}
      <section className="section sm-local">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Local Visibility</span>
            <h2 className="section-heading__title">Help Customers Find Your Business Nearby</h2>
          </div>
          <ScrollReveal>
            <div className="sm-local__card glass-card">
              <p className="sm-local__text">
                When local customers search for services in their area, Google Business Profile
                visibility can help your business appear in local search results and Google Maps,
                driving phone calls, direction requests and WhatsApp enquiries.
              </p>
              <div className="sm-local__mockup glass-card">
                <div className="sm-local__header">
                  <span className="icon-badge icon-badge--blue" aria-hidden="true"><SmIcon name="mappin" size={18} /></span>
                  <span className="sm-local__business-name">Your Business Name</span>
                </div>
                <div className="sm-local__body">
                  <div className="sm-local__info">
                    <span>Category: Service Business</span>
                    <span>Location: Kuala Lumpur, Malaysia</span>
                    <span>Rating: Verified Profile</span>
                    <span>Hours: Mon - Fri, 9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="sm-local__actions">
                    <span className="sm-local__action glass-card"><SmIcon name="phone" size={13} /> Call</span>
                    <span className="sm-local__action glass-card"><SmIcon name="compass" size={13} /> Directions</span>
                    <span className="sm-local__action glass-card"><SmIcon name="whatsapp" size={13} /> WhatsApp</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 14. AI SEARCH */}
      <section className="section sm-ai-search">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">AI Search</span>
            <h2 className="section-heading__title">Prepare Your SME for the New Era of AI Search</h2>
          </div>
          <ScrollReveal>
            <p className="sm-ai-search__text">
              Business owners and decision-makers increasingly ask AI tools about services, vendors
              and business categories. A strong GEO/AEO strategy can help structure your digital
              presence so AI systems can better understand your business and relevance.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="sm-ai-search__panels">
              <div className="sm-ai-search__panel glass-card">
                <div className="sm-ai-search__panel-header">
                  <span className="icon-badge icon-badge--blue" aria-hidden="true"><SmIcon name="search" size={18} /></span>
                  <h3 className="sm-ai-search__panel-title">Traditional Search</h3>
                </div>
                <ul className="sm-ai-search__list">
                  <li>Google organic results</li>
                  <li>Google Business Profile</li>
                  <li>Paid search ads</li>
                  <li>Social media profiles</li>
                </ul>
              </div>
              <div className="sm-ai-search__panel glass-card">
                <div className="sm-ai-search__panel-header">
                  <span className="icon-badge icon-badge--amber" aria-hidden="true"><SmIcon name="sparkles" size={18} /></span>
                  <h3 className="sm-ai-search__panel-title">AI Search</h3>
                </div>
                <ul className="sm-ai-search__list">
                  <li>Google AI Overviews</li>
                  <li>ChatGPT recommendations</li>
                  <li>Perplexity answers</li>
                  <li>Voice assistants</li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="sm-ai-search__signals">
              {[
                { icon: 'building', label: 'Business Info', color: 'icon-badge--blue' },
                { icon: 'layers', label: 'Service Expertise', color: 'icon-badge--cyan' },
                { icon: 'help', label: 'FAQs', color: 'icon-badge--purple' },
                { icon: 'book', label: 'Useful Content', color: 'icon-badge--teal' },
                { icon: 'star', label: 'Reviews', color: 'icon-badge--amber' },
                { icon: 'code', label: 'Structured Data', color: 'icon-badge--green' },
              ].map((sig) => (
                <div className="sm-ai-search__signal glass-card" key={sig.label}>
                  <span className={cx('sm-ai-search__signal-icon', 'icon-badge', sig.color)} aria-hidden="true">
                    <SmIcon name={sig.icon} size={18} />
                  </span>
                  <span className="sm-ai-search__signal-label">{sig.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 15. TAMIL DIASPORA REACH */}
      <section className="section sm-diaspora">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Diaspora Reach</span>
            <h2 className="section-heading__title">Reach Tamil Communities Beyond Malaysia</h2>
          </div>
          <ScrollReveal>
            <p className="sm-diaspora__text">
              Malaysian and Tamil businesses can extend their reach to diaspora communities in
              Singapore, Australia, the UK and beyond. Our team understands the platform dynamics
              and cultural nuances of connecting with Tamil-speaking audiences across these markets.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="sm-diaspora__grid">
              <div className="sm-diaspora__card glass-card">
                <span className="icon-badge icon-badge--cyan" aria-hidden="true"><SmIcon name="globe" size={20} /></span>
                <h3 className="sm-diaspora__card-title">Singapore</h3>
                <p className="sm-diaspora__card-text">Tamil diaspora community with strong social media and WhatsApp engagement patterns.</p>
              </div>
              <div className="sm-diaspora__card glass-card">
                <span className="icon-badge icon-badge--blue" aria-hidden="true"><SmIcon name="globe" size={20} /></span>
                <h3 className="sm-diaspora__card-title">Australia</h3>
                <p className="sm-diaspora__card-text">Growing Tamil community across Melbourne, Sydney and other major cities.</p>
              </div>
              <div className="sm-diaspora__card glass-card">
                <span className="icon-badge icon-badge--purple" aria-hidden="true"><SmIcon name="globe" size={20} /></span>
                <h3 className="sm-diaspora__card-title">United Kingdom</h3>
                <p className="sm-diaspora__card-text">Established Tamil community with distinct digital media consumption habits.</p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="sm-diaspora__strategy">
              <div className="sm-diaspora__strategy-item glass-card"><SmIcon name="share" size={14} /><span>Instagram &amp; Facebook targeting</span></div>
              <div className="sm-diaspora__strategy-item glass-card"><SmIcon name="whatsapp" size={14} /><span>WhatsApp sales channel</span></div>
              <div className="sm-diaspora__strategy-item glass-card"><SmIcon name="search" size={14} /><span>Google Ads geo-targeting</span></div>
              <div className="sm-diaspora__strategy-item glass-card"><SmIcon name="sparkles" size={14} /><span>AI search optimization</span></div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 16. MULTI-MARKET */}
      <section className="section sm-multi-market">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Geographic Reach</span>
            <h2 className="section-heading__title">From Malaysia to Global Diaspora Markets</h2>
          </div>
          <ScrollReveal>
            <div className="sm-multi-market__grid">
              {[
                { label: 'MALAYSIA', sub: 'Home market', icon: 'mappin', color: 'icon-badge--blue' },
                { label: 'SINGAPORE', sub: 'Regional hub', icon: 'globe', color: 'icon-badge--cyan' },
                { label: 'AUSTRALIA', sub: 'Diaspora market', icon: 'globe', color: 'icon-badge--purple' },
                { label: 'UNITED KINGDOM', sub: 'Diaspora market', icon: 'globe', color: 'icon-badge--teal' },
                { label: 'GLOBAL DIASPORA', sub: 'Worldwide reach', icon: 'target', color: 'icon-badge--amber' },
              ].map((node, index) => (
                <div key={node.label} className="sm-multi-market__card glass-card">
                  <div className="sm-multi-market__card-top">
                    <span className="sm-multi-market__step-num">0{index + 1}</span>
                    <span className={cx('sm-multi-market__icon', 'icon-badge', node.color)} aria-hidden="true">
                      <SmIcon name={node.icon} size={18} />
                    </span>
                  </div>
                  <h3 className="sm-multi-market__card-title">{node.label}</h3>
                  <p className="sm-multi-market__card-sub">{node.sub}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 17. DIGITAL MATURITY */}
      <section className="section sm-maturity">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Digital Maturity</span>
            <h2 className="section-heading__title">Where Is Your SME on the Digital Growth Journey?</h2>
          </div>
          <ScrollReveal>
            <div className="sm-maturity__grid">
              {DIGITAL_MATURITY.map((stage, i) => (
                <div className="sm-maturity__card glass-card" key={stage.label}>
                  <div className="sm-maturity__card-top">
                    <span className="sm-maturity__number">0{i + 1}</span>
                    <span className={cx('sm-maturity__icon', 'icon-badge', stage.color)} aria-hidden="true">
                      <SmIcon name={stage.icon} size={18} />
                    </span>
                  </div>
                  <h3 className="sm-maturity__label">{stage.label}</h3>
                  <p className="sm-maturity__sub">{stage.sub}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 18. WEBSITE */}
      <section className="section sm-website">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Website</span>
            <h2 className="section-heading__title">Your Website Is Your Digital Business Asset</h2>
          </div>
          <ScrollReveal>
            <div className="sm-website__card glass-card">
              <p className="sm-website__text">
                A professional website serves as your digital storefront, working 24/7 to present your
                services, build credibility and capture enquiries. For Malaysian SMEs, a well-designed
                website with clear service messaging and WhatsApp integration is a foundational digital asset.
              </p>
              <div className="sm-website__mockup glass-card">
                <div className="sm-website__browser-bar">
                  <span className="sm-website__dot" />
                  <span className="sm-website__dot" />
                  <span className="sm-website__dot" />
                  <span className="sm-website__url">yourbusiness.com.my</span>
                </div>
                <div className="sm-website__layout">
                  <div className="sm-website__section sm-website__section--hero">
                    <span className="sm-website__section-label">Hero Banner &amp; Headline</span>
                  </div>
                  <div className="sm-website__section sm-website__section--services">
                    <span className="sm-website__section-label">Services Grid</span>
                  </div>
                  <div className="sm-website__section sm-website__section--about">
                    <span className="sm-website__section-label">Company Credentials</span>
                  </div>
                  <div className="sm-website__section sm-website__section--faq">
                    <span className="sm-website__section-label">FAQ Accordion</span>
                  </div>
                  <div className="sm-website__section sm-website__section--contact">
                    <span className="sm-website__section-label">Contact Form &amp; Map</span>
                  </div>
                  <div className="sm-website__section sm-website__section--whatsapp">
                    <SmIcon name="whatsapp" size={16} />
                    <span className="sm-website__section-label">WhatsApp Enquiry Button</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 19. SOCIAL MEDIA */}
      <section className="section sm-social">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Social Media</span>
            <h2 className="section-heading__title">Build Visibility Where Your Customers Spend Time</h2>
          </div>
          <ScrollReveal>
            <p className="sm-social__text">
              Social media platforms are where Malaysian consumers discover businesses, evaluate
              credibility and engage with brands. A strategic social presence can build awareness,
              drive traffic and generate enquiries alongside your search marketing efforts.
            </p>
          </ScrollReveal>
          <div className="sm-social__grid">
            <ScrollReveal delay={0}>
              <div className="sm-social-card glass-card">
                <span className="icon-badge icon-badge--blue" aria-hidden="true"><SmIcon name="facebook" size={20} /></span>
                <h3 className="sm-social-card__title">Facebook</h3>
                <p className="sm-social-card__text">Largest social platform in Malaysia for business discovery and community engagement.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={60}>
              <div className="sm-social-card glass-card">
                <span className="icon-badge icon-badge--pink" aria-hidden="true"><SmIcon name="instagram" size={20} /></span>
                <h3 className="sm-social-card__title">Instagram</h3>
                <p className="sm-social-card__text">Visual platform for brand storytelling, reels and reaching younger Malaysian demographics.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <div className="sm-social-card glass-card">
                <span className="icon-badge icon-badge--purple" aria-hidden="true"><SmIcon name="users" size={20} /></span>
                <h3 className="sm-social-card__title">LinkedIn</h3>
                <p className="sm-social-card__text">B2B and professional services visibility for decision-makers and corporate buyers.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={180}>
              <div className="sm-social-card glass-card">
                <span className="icon-badge icon-badge--red" aria-hidden="true"><SmIcon name="monitor" size={20} /></span>
                <h3 className="sm-social-card__title">YouTube</h3>
                <p className="sm-social-card__text">Long-form video content for service education, testimonials and thought leadership.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 20. GOOGLE ADS */}
      <section className="section sm-google-ads">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Google Ads</span>
            <h2 className="section-heading__title">Capture Demand When Customers Are Ready to Act</h2>
          </div>
          <ScrollReveal>
            <p className="sm-google-ads__text">
              Google Ads puts your business in front of customers who are actively searching for the
              services you offer. When someone types a high-intent search query, a well-structured
              campaign can place your business at the top of results and drive immediate enquiries.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="sm-google-ads__grid">
              {[
                { label: 'SEARCH QUERY', sub: 'Customer searches', icon: 'search', color: 'icon-badge--blue' },
                { label: 'GOOGLE AD', sub: 'Your business appears', icon: 'megaphone', color: 'icon-badge--cyan' },
                { label: 'LANDING PAGE', sub: 'Service details', icon: 'globe', color: 'icon-badge--purple' },
                { label: 'WHATSAPP / FORM', sub: 'Enquiry action', icon: 'whatsapp', color: 'icon-badge--green' },
                { label: 'SALES CONVERSATION', sub: 'Business discussion', icon: 'message', color: 'icon-badge--pink' },
              ].map((step, index) => (
                <div className="sm-google-ads__card glass-card" key={step.label}>
                  <div className="sm-google-ads__card-top">
                    <span className="sm-google-ads__step-num">Step 0{index + 1}</span>
                    <span className={cx('sm-google-ads__icon', 'icon-badge', step.color)} aria-hidden="true">
                      <SmIcon name={step.icon} size={18} />
                    </span>
                  </div>
                  <h3 className="sm-google-ads__card-title">{step.label}</h3>
                  <p className="sm-google-ads__card-sub">{step.sub}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 21. SEO */}
      <section className="section sm-seo">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">SEO</span>
            <h2 className="section-heading__title">Get Found When Malaysian Customers Search</h2>
          </div>
          <ScrollReveal>
            <p className="sm-seo__text">
              Search engine optimization helps your website appear in organic Google results when
              potential customers search for services, solutions and business categories relevant
              to your SME. A layered SEO approach builds visibility across multiple search intents.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="sm-seo__layers">
              {[
                { icon: 'mappin', label: 'Local Keywords', color: 'icon-badge--red' },
                { icon: 'search', label: 'Service Keywords', color: 'icon-badge--blue' },
                { icon: 'layers', label: 'Industry Keywords', color: 'icon-badge--cyan' },
                { icon: 'book', label: 'Content', color: 'icon-badge--teal' },
                { icon: 'mappin', label: 'Local SEO', color: 'icon-badge--purple' },
                { icon: 'sparkles', label: 'AI Search', color: 'icon-badge--amber' },
              ].map((l) => (
                <div className="sm-seo__layer glass-card" key={l.label}>
                  <span className={cx('sm-seo__layer-icon', 'icon-badge', l.color)} aria-hidden="true">
                    <SmIcon name={l.icon} size={16} />
                  </span>
                  <span className="sm-seo__layer-label">{l.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 22. ECOSYSTEM / SYSTEM */}
      <section className="section sm-ecosystem">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Growth System</span>
            <h2 className="section-heading__title">The Malaysian SME Digital Transformation System</h2>
          </div>
          <ScrollReveal>
            <div className="sm-ecosystem__card glass-card">
              <div className="sm-ecosystem__channels glass-card">
                <span className="sm-ecosystem__channel-label">DIGITAL CHANNELS</span>
                <div className="sm-ecosystem__channel-list">
                  <span className="sm-ecosystem__channel"><SmIcon name="search" size={14} /> SEO</span>
                  <span className="sm-ecosystem__channel"><SmIcon name="mappin" size={14} /> Local SEO</span>
                  <span className="sm-ecosystem__channel"><SmIcon name="sparkles" size={14} /> GEO / AEO</span>
                  <span className="sm-ecosystem__channel"><SmIcon name="megaphone" size={14} /> Google Ads</span>
                  <span className="sm-ecosystem__channel"><SmIcon name="share" size={14} /> Social Media</span>
                  <span className="sm-ecosystem__channel"><SmIcon name="code" size={14} /> Website</span>
                  <span className="sm-ecosystem__channel"><SmIcon name="whatsapp" size={14} /> WhatsApp</span>
                </div>
              </div>
              <div className="sm-ecosystem__nodes">
                <div className="sm-ecosystem__node glass-card">
                  <span className="icon-badge icon-badge--blue" aria-hidden="true"><SmIcon name="eye" size={18} /></span>
                  <span>Digital Visibility</span>
                </div>
                <div className="sm-ecosystem__node glass-card">
                  <span className="icon-badge icon-badge--green" aria-hidden="true"><SmIcon name="message" size={18} /></span>
                  <span>Enquiries</span>
                </div>
                <div className="sm-ecosystem__node glass-card">
                  <span className="icon-badge icon-badge--purple" aria-hidden="true"><SmIcon name="users" size={18} /></span>
                  <span>Customer Relationships</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 23. FAQ */}
      <section className="section sm-faq">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">FAQ</span>
            <h2 className="section-heading__title">Frequently Asked Questions &mdash; Malaysian SMEs</h2>
          </div>
          <FaqAccordion faqs={FAQS} />
        </div>
      </section>

      {/* 24. LOCATIONS */}
      <section className="section sm-locations">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Coverage</span>
            <h2 className="section-heading__title">Digital Marketing for SMEs Across Malaysia &amp; Tamil Nadu</h2>
          </div>
          <div className="sm-locations__grid">
            <ScrollReveal className="sm-locations__cell">
              <div className="sm-location-card glass-card">
                <span className="icon-badge icon-badge--blue" aria-hidden="true"><SmIcon name="mappin" size={22} /></span>
                <h3 className="sm-location-card__title">Malaysia</h3>
                <p className="sm-location-card__text">
                  From Kuala Lumpur to Penang, Johor and beyond, we help SMEs across Malaysia
                  build digital visibility, generate enquiries and grow their customer base.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal className="sm-locations__cell">
              <div className="sm-location-card glass-card">
                <span className="icon-badge icon-badge--cyan" aria-hidden="true"><SmIcon name="globe" size={22} /></span>
                <h3 className="sm-location-card__title">Tamil Nadu</h3>
                <p className="sm-location-card__text">
                  From Madurai to Chennai, Coimbatore and across Tamil Nadu, we support businesses
                  with digital strategies that connect to Malaysian and global markets.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 25. RELATED INDUSTRIES */}
      <section className="section sm-related">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Explore More</span>
            <h2 className="section-heading__title">Related Industries</h2>
          </div>
          <div className="sm-related__links">
            <Link to="/industries/retail-ecommerce/" className="related-content__link">Retail &amp; E-Commerce</Link>
            <Link to="/industries/education-training/" className="related-content__link">Education &amp; Training</Link>
            <Link to="/industries/healthcare-clinics/" className="related-content__link">Healthcare &amp; Clinics</Link>
            <Link to="/industries/" className="related-content__link">All Industries</Link>
            <Link to="/services/" className="related-content__link">All Services</Link>
            <Link to="/contact/" className="related-content__link">Contact</Link>
            <Link to="/faq/" className="related-content__link">FAQ</Link>
          </div>
        </div>
      </section>

      {/* 26. FINAL CTA & CONTACT */}
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
