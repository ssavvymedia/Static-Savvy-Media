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
import '../../styles/pages/real-estate-builders.css'
import realEstateHeroImg from '../../assets/images/Industries/08realestate.png'

/* ============================================================
   CONTENT, Approved Static Savvy Media Real Estate & Builders
   ============================================================ */

const PAGE_TITLE =
  'Digital Marketing for Real Estate & Property Developers in Tamil Nadu | Static Savvy Media'

const PAGE_DESCRIPTION =
  'Generate property enquiries with SEO, Google Ads, Facebook lead generation, and virtual tour content. Real estate digital marketing for Tamil Nadu builders and developers.'

const HERO_TITLE =
  'Digital Marketing for Real Estate & Property Developers, Generate Quality Enquiries Online'

const HERO_PARAGRAPH =
  'Real estate is one of the highest-stakes digital marketing categories in India. Buyers research extensively before enquiring, competition is intense, and the value of a single converted enquiry is substantial. A well-executed digital marketing strategy can help property developers build visibility, attract high-intent prospects and convert property interest into enquiries.'

const SERVICES = [
  {
    title: 'Real Estate SEO',
    icon: 'search',
    color: 'icon-badge--blue',
    path: '/services/seo/',
    text: 'Optimize your property project pages for searches like "3BHK flats in Madurai" and "luxury villas in Tamil Nadu" to capture buyers actively searching online.',
  },
  {
    title: 'GEO & AEO for Property Search',
    icon: 'sparkles',
    color: 'icon-badge--amber',
    path: '/services/geo-aeo-ai-search/',
    text: 'Improve AI search visibility when buyers ask ChatGPT, Perplexity and Google AI Overviews about properties, locations and real estate in Tamil Nadu.',
  },
  {
    title: 'Local SEO & Google Business Profile',
    icon: 'mappin',
    color: 'icon-badge--purple',
    path: '/services/local-seo/',
    text: 'Optimize Google Maps and Google Business Profile visibility so local property buyers find your projects and office locations easily.',
  },
  {
    title: 'Google Ads for Property Enquiries',
    icon: 'megaphone',
    color: 'icon-badge--cyan',
    path: '/services/google-ads/',
    text: 'Paid search campaigns targeting high-intent buyers searching for apartments, villas, plots and commercial projects in specific locations.',
  },
  {
    title: 'Real Estate Social Media Marketing',
    icon: 'share',
    color: 'icon-badge--pink',
    path: '/services/social-media-marketing/',
    text: 'Facebook and Instagram campaigns showcasing property visuals, project updates and virtual tours to attract buyer interest and enquiries.',
  },
  {
    title: 'Real Estate Website Development',
    icon: 'code',
    color: 'icon-badge--green',
    path: '/services/website-design-development/',
    text: 'Property-focused websites with project landing pages, gallery experiences, floor plans, RERA details and WhatsApp-first conversion design.',
  },
]

const JOURNEY_STEPS = [
  { label: 'SEARCH', sub: 'Google / Social / AI', icon: 'search', color: 'icon-badge--blue' },
  { label: 'DISCOVER', sub: 'Project Listings / Ads', icon: 'compass', color: 'icon-badge--cyan' },
  { label: 'COMPARE', sub: 'Projects / Locations', icon: 'target', color: 'icon-badge--purple' },
  { label: 'RESEARCH', sub: 'Details / Floor Plans / Gallery', icon: 'monitor', color: 'icon-badge--amber' },
  { label: 'ENQUIRE', sub: 'WhatsApp / Form / Call', icon: 'message', color: 'icon-badge--pink' },
  { label: 'SITE VISIT', sub: 'Property Visit', icon: 'calendar', color: 'icon-badge--green' },
  { label: 'DECISION', sub: 'Purchase', icon: 'check', color: 'icon-badge--gold' },
]

const LEAD_QUALITY = [
  { label: '1,000 Visitors', icon: 'eye', color: 'icon-badge--blue' },
  { label: 'Enquiries', icon: 'message', color: 'icon-badge--cyan' },
  { label: 'Qualified Prospects', icon: 'shield', color: 'icon-badge--purple' },
  { label: 'Site Visits', icon: 'calendar', color: 'icon-badge--green' },
  { label: 'Sales Conversations', icon: 'users', color: 'icon-badge--amber' },
]

const CONTENT_CARDS = [
  { icon: 'mappin', color: 'icon-badge--red', title: 'Location', text: 'Highlight project location advantages and connectivity.' },
  { icon: 'building', color: 'icon-badge--blue', title: 'Property Type', text: 'Showcase apartments, villas, plots and commercial projects.' },
  { icon: 'layers', color: 'icon-badge--cyan', title: 'Configuration', text: 'Present 1 BHK, 2 BHK, 3 BHK and custom configurations.' },
  { icon: 'zap', color: 'icon-badge--gold', title: 'Price Range', text: 'Communicate pricing positioning and payment plans.' },
  { icon: 'book', color: 'icon-badge--purple', title: 'Buyer Questions', text: 'Answer common property buyer queries.' },
  { icon: 'briefcase', color: 'icon-badge--amber', title: 'Project Information', text: 'Share verified project details and amenities.' },
]

const FAQS = [
  {
    question: 'How do I generate property enquiries from Google Ads?',
    answer:
      'Google Ads for real estate can focus on project name + location queries, property category + location queries, configuration + location queries, and price-point searches. Ads should connect to project-specific landing pages with a clear WhatsApp CTA. Strong project imagery, relevant property information, RERA registration details where applicable, and price range can support on-page conversion.',
  },
  {
    question: 'Is Facebook or Instagram better for real estate in Tamil Nadu?',
    answer:
      'Facebook can be particularly useful for real estate lead generation because of its broad reach among property-buying audiences and its lead-generation formats. Instagram is highly effective for visually driven projects such as luxury villas, premium apartments, and lifestyle developments. The best platform depends on the project, audience and campaign objective.',
  },
  {
    question: 'How can I use WhatsApp for real estate lead nurturing?',
    answer:
      'WhatsApp can support structured lead follow-up. A sequence can include initial enquiry acknowledgement, project brochure delivery, floor plan sharing, project information, site visit scheduling, and follow-up messages. Where appropriate, parts of this process can be automated to reduce manual follow-up.',
  },
]

const CTA = {
  title:
    'Build visibility around your projects, attract high-intent property enquiries and create a digital buyer journey designed around discovery, trust and action.',
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
  layers: (
    <>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
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
  camera: (
    <>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </>
  ),
}

function ReIcon({ name, size = 20 }) {
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
    <div className="re-faq__list">
      {faqs.map((faq, index) => {
        const isOpen = open === index
        return (
          <div className={cx('re-faq__item', 'glass-card', isOpen && 're-faq__item--open')} key={index}>
            <h3 className="re-faq__heading">
              <button
                type="button"
                className="re-faq__question"
                id={`re-faq-button-${index}`}
                aria-expanded={isOpen}
                aria-controls={`re-faq-panel-${index}`}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <span className="re-faq__question-text">{faq.question}</span>
                <span className="re-faq__chevron" aria-hidden="true">
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
              id={`re-faq-panel-${index}`}
              role="region"
              aria-labelledby={`re-faq-button-${index}`}
              className={cx('re-faq__panel', isOpen && 're-faq__panel--open')}
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="re-faq__panel-inner">
                <p className="re-faq__answer">{faq.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function RealEstateBuilders() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/industries/real-estate-builders/`,
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
      url: `${SITE_URL}/industries/real-estate-builders/`,
      inLanguage: 'en',
      isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
      about: { '@type': 'Service', serviceType: 'Digital Marketing for Real Estate & Property Developers' },
    }

    const service = serviceSchema({
      serviceType: 'Digital Marketing for Real Estate & Property Developers',
      name: 'Digital Marketing for Real Estate & Property Developers, Static Savvy Media',
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/industries/real-estate-builders/`,
      provider: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
      areaServed: [
        { '@type': 'City', name: 'Madurai' },
        { '@type': 'City', name: 'Chennai' },
        { '@type': 'City', name: 'Coimbatore' },
        { '@type': 'State', name: 'Tamil Nadu' },
        { '@type': 'Country', name: 'India' },
      ],
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Industries', item: `${SITE_URL}/industries/` },
        { name: 'Real Estate & Builders', item: `${SITE_URL}/industries/real-estate-builders/` },
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
    <div className="service-template re-page">
      {/* 1. BREADCRUMBS */}
      <Breadcrumbs />

      {/* 2. HERO */}
      <HeroSection
        layout="two-column"
        eyebrow="REAL ESTATE • PROPERTY • DEVELOPERS"
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
              Explore Services
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
            src={realEstateHeroImg}
            alt="Real Estate & Builders"
            className="hero__image"
          />
        </div>
      </HeroSection>

      {/* 3. VALUE STRIP */}
      <section className="section re-value-strip">
        <div className="container">
          <ScrollReveal>
            <div className="re-value-strip__grid">
              {[
                { num: '01', label: 'GET DISCOVERED', icon: 'search', color: 'icon-badge--blue', text: 'Appear when property buyers search for apartments, villas and plots in your target locations.' },
                { num: '02', label: 'SHOWCASE PROJECTS', icon: 'home', color: 'icon-badge--amber', text: 'Present your developments with visuals, floor plans, amenities and location advantages.' },
                { num: '03', label: 'GENERATE ENQUIRIES', icon: 'message', color: 'icon-badge--green', text: 'Convert property interest into WhatsApp enquiries, form submissions and site visit bookings.' },
                { num: '04', label: 'NURTURE BUYERS', icon: 'users', color: 'icon-badge--purple', text: 'Guide property buyers from initial interest through research, comparison and site visits.' },
              ].map((item) => (
                <div key={item.num} className="re-value-strip__item glass-card">
                  <div className="re-value-strip__header">
                    <span className="re-value-strip__num">{item.num}</span>
                    <span className={cx('re-value-strip__icon', 'icon-badge', item.color)} aria-hidden="true">
                      <ReIcon name={item.icon} size={18} />
                    </span>
                  </div>
                  <span className="re-value-strip__label">{item.label}</span>
                  <p className="re-value-strip__text">{item.text}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. INTRODUCTION */}
      <section className="section re-intro">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Property Buyers</span>
            <h2 className="section-heading__title">Property Buyers Research Before They Enquire</h2>
          </div>
          <ScrollReveal>
            <div className="re-intro__card glass-card">
              <p className="re-intro__text">
                Real estate is a high-consideration purchase. Buyers research extensively before they
                send an enquiry or book a site visit. They compare projects, check locations, study
                floor plans, review pricing, and look for credibility signals. The objective of digital
                marketing for property developers is to make your projects visible during each stage
                of this research journey and to convert interest into qualified enquiries.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. BUYER JOURNEY */}
      <section className="section re-journey">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Buyer Journey</span>
            <h2 className="section-heading__title">From Property Search to Purchase Decision</h2>
          </div>
          <ScrollReveal>
            <div className="re-journey__grid">
              {JOURNEY_STEPS.map((step, index) => (
                <div className="re-journey__card glass-card" key={step.label}>
                  <div className="re-journey__card-top">
                    <span className="re-journey__step-num">Step 0{index + 1}</span>
                    <span className={cx('re-journey__icon', 'icon-badge', step.color)} aria-hidden="true">
                      <ReIcon name={step.icon} size={18} />
                    </span>
                  </div>
                  <h3 className="re-journey__card-title">{step.label}</h3>
                  <p className="re-journey__card-sub">{step.sub}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 6. SERVICES */}
      <section className="section re-services">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Our Services</span>
            <h2 className="section-heading__title">
              How We Help Real Estate &amp; Property Developers
            </h2>
          </div>
          <div className="re-services__grid">
            {SERVICES.map((svc, i) => (
              <ScrollReveal key={svc.title} delay={i * 60}>
                <Link to={svc.path} className="re-service-card glass-card">
                  <div className="re-service-card__top">
                    <span className="re-service-card__number">{String(i + 1).padStart(2, '0')}</span>
                    <span className={cx('re-service-card__icon', 'icon-badge', svc.color)} aria-hidden="true">
                      <ReIcon name={svc.icon} size={20} />
                    </span>
                  </div>
                  <h3 className="re-service-card__title">{svc.title}</h3>
                  <p className="re-service-card__text">{svc.text}</p>
                  <span className="re-service-card__cta">
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

      {/* 7. GOOGLE ADS */}
      <section className="section re-google-ads">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Google Ads</span>
            <h2 className="section-heading__title">
              Capture Buyers With High-Intent Property Searches
            </h2>
          </div>
          <ScrollReveal>
            <div className="re-google-ads__mockup glass-card">
              <div className="re-google-ads__bar">
                <span className="icon-badge icon-badge--blue" aria-hidden="true"><ReIcon name="search" size={16} /></span>
                <span className="re-google-ads__query">3BHK flats in Madurai</span>
              </div>
              <div className="re-google-ads__results">
                <div className="re-google-ads__result glass-card">
                  <div className="re-google-ads__result-label">Ad</div>
                  <div className="re-google-ads__result-title">Premium 3 BHK Apartments | Your Location</div>
                  <div className="re-google-ads__result-meta">Starting from ₹XX Lakhs | Gated Community | RERA Approved</div>
                  <div className="re-google-ads__result-info">Floor Plans | Gallery | WhatsApp Enquiry</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="re-google-ads__grid">
              {[
                { label: 'GOOGLE SEARCH', sub: 'High-intent buyer searches', icon: 'search', color: 'icon-badge--blue' },
                { label: 'PROJECT AD', sub: 'Targeted Google Ad appears', icon: 'megaphone', color: 'icon-badge--cyan' },
                { label: 'LANDING PAGE', sub: 'Dedicated project page', icon: 'monitor', color: 'icon-badge--purple' },
                { label: 'PROJECT DETAILS', sub: 'Floor plans, pricing, gallery', icon: 'home', color: 'icon-badge--amber' },
                { label: 'WHATSAPP ENQUIRY', sub: 'Direct enquiry action', icon: 'whatsapp', color: 'icon-badge--green' },
              ].map((step, index) => (
                <div className="re-google-ads__card glass-card" key={step.label}>
                  <div className="re-google-ads__card-top">
                    <span className="re-google-ads__step-num">Step 0{index + 1}</span>
                    <span className={cx('re-google-ads__icon', 'icon-badge', step.color)} aria-hidden="true">
                      <ReIcon name={step.icon} size={18} />
                    </span>
                  </div>
                  <h3 className="re-google-ads__card-title">{step.label}</h3>
                  <p className="re-google-ads__card-sub">{step.sub}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 8. SOCIAL MEDIA */}
      <section className="section re-social">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Social Media</span>
            <h2 className="section-heading__title">Turn Property Visuals Into Buyer Interest</h2>
          </div>
          <ScrollReveal>
            <p className="re-social__text">
              Facebook and Instagram are particularly effective for real estate marketing because property
              buying is inherently visual. High-quality imagery, walkthrough videos, and project updates
              can attract buyer attention and drive enquiries across both platforms.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="re-social__process-grid">
              {[
                { label: 'PROPERTY PROJECT', sub: 'Visual & location assets', icon: 'home', color: 'icon-badge--blue' },
                { label: 'FACEBOOK / INSTAGRAM', sub: 'Targeted visual campaigns', icon: 'facebook', color: 'icon-badge--pink' },
                { label: 'BUYER INTEREST', sub: 'Engagement & enquiries', icon: 'eye', color: 'icon-badge--amber' },
                { label: 'ENQUIRY', sub: 'Direct message / Lead form', icon: 'message', color: 'icon-badge--green' },
              ].map((step, index) => (
                <div className="re-social__process-card glass-card" key={step.label}>
                  <div className="re-social__process-top">
                    <span className="re-social__process-num">0{index + 1}</span>
                    <span className={cx('re-social__process-icon', 'icon-badge', step.color)} aria-hidden="true">
                      <ReIcon name={step.icon} size={18} />
                    </span>
                  </div>
                  <h3 className="re-social__process-title">{step.label}</h3>
                  <p className="re-social__process-sub">{step.sub}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <div className="re-social__grid">
            <ScrollReveal delay={0}>
              <div className="re-social-card glass-card">
                <span className="icon-badge icon-badge--pink" aria-hidden="true"><ReIcon name="instagram" size={20} /></span>
                <h4 className="re-social-card__title">Reels</h4>
                <p className="re-social-card__text">Short property walkthroughs and project highlights.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={60}>
              <div className="re-social-card glass-card">
                <span className="icon-badge icon-badge--blue" aria-hidden="true"><ReIcon name="facebook" size={20} /></span>
                <h4 className="re-social-card__title">Carousels</h4>
                <p className="re-social-card__text">Multi-image project showcases with floor plans.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <div className="re-social-card glass-card">
                <span className="icon-badge icon-badge--amber" aria-hidden="true"><ReIcon name="camera" size={20} /></span>
                <h4 className="re-social-card__title">Property Photography</h4>
                <p className="re-social-card__text">High-quality images of project exteriors and interiors.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={180}>
              <div className="re-social-card glass-card">
                <span className="icon-badge icon-badge--purple" aria-hidden="true"><ReIcon name="monitor" size={20} /></span>
                <h4 className="re-social-card__title">Virtual Tours</h4>
                <p className="re-social-card__text">360-degree property exploration for remote buyers.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={240}>
              <div className="re-social-card glass-card">
                <span className="icon-badge icon-badge--red" aria-hidden="true"><ReIcon name="mappin" size={20} /></span>
                <h4 className="re-social-card__title">Location Videos</h4>
                <p className="re-social-card__text">Neighbourhood and connectivity showcase content.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="re-social-card glass-card">
                <span className="icon-badge icon-badge--green" aria-hidden="true"><ReIcon name="home" size={20} /></span>
                <h4 className="re-social-card__title">Project Walkthroughs</h4>
                <p className="re-social-card__text">Detailed guided tours of project features and amenities.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 9. VIRTUAL TOUR */}
      <section className="section re-virtual-tour">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Virtual Tours</span>
            <h2 className="section-heading__title">Let Buyers Explore Before They Visit</h2>
          </div>
          <ScrollReveal>
            <div className="re-virtual-tour__card glass-card">
              <p className="re-virtual-tour__text">
                Virtual tours allow property buyers to explore projects remotely, which can be
                particularly valuable for out-of-town buyers or those comparing multiple projects.
                Interactive experiences help build familiarity and interest before a site visit.
              </p>
              <div className="re-virtual-tour__mockup glass-card">
                <div className="re-virtual-tour__header">
                  <span className="icon-badge icon-badge--blue" aria-hidden="true"><ReIcon name="home" size={18} /></span>
                  <span className="re-virtual-tour__title">Virtual Tour Experience</span>
                </div>
                <div className="re-virtual-tour__body">
                  <div className="re-virtual-tour__viewport">
                    <span className="re-virtual-tour__360-badge glass-card">
                      <ReIcon name="globe" size={14} /> 360&deg;
                    </span>
                    <span className="re-virtual-tour__placeholder">Interactive Property View</span>
                  </div>
                  <div className="re-virtual-tour__controls">
                    <span className="re-virtual-tour__control re-virtual-tour__control--active glass-card">
                      <ReIcon name="globe" size={14} /> 360&deg;
                    </span>
                    <span className="re-virtual-tour__control glass-card">
                      <ReIcon name="layers" size={14} /> Floor Plan
                    </span>
                    <span className="re-virtual-tour__control glass-card">
                      <ReIcon name="camera" size={14} /> Gallery
                    </span>
                    <span className="re-virtual-tour__control glass-card">
                      <ReIcon name="zap" size={14} /> Amenities
                    </span>
                    <span className="re-virtual-tour__control glass-card">
                      <ReIcon name="mappin" size={14} /> Location
                    </span>
                    <span className="re-virtual-tour__control glass-card">
                      <ReIcon name="calendar" size={14} /> Schedule Visit
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 10. WHATSAPP LEAD NURTURING */}
      <section className="section re-whatsapp-nurture">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">WhatsApp</span>
            <h2 className="section-heading__title">
              Turn Enquiries Into Structured Conversations
            </h2>
          </div>
          <ScrollReveal>
            <p className="re-whatsapp-nurture__text">
              WhatsApp is the primary conversion channel for real estate in India. A structured
              lead nurturing sequence can help move property buyers from initial enquiry to
              site visit booking through professional, timely communication.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="re-whatsapp-nurture__grid">
              {[
                { label: 'NEW ENQUIRY', sub: 'WhatsApp / Form / Call', icon: 'whatsapp', color: 'icon-badge--green' },
                { label: 'ACKNOWLEDGEMENT', sub: 'Thank You Message', icon: 'check', color: 'icon-badge--blue' },
                { label: 'PROJECT BROCHURE', sub: 'PDF / Digital Brochure', icon: 'book', color: 'icon-badge--purple' },
                { label: 'FLOOR PLAN', sub: 'Unit Layouts', icon: 'layers', color: 'icon-badge--cyan' },
                { label: 'PRICE / CONFIG', sub: 'Pricing Details', icon: 'zap', color: 'icon-badge--gold' },
                { label: 'SITE VISIT', sub: 'Schedule Visit', icon: 'calendar', color: 'icon-badge--pink' },
                { label: 'FOLLOW-UP', sub: 'Ongoing Communication', icon: 'message', color: 'icon-badge--amber' },
              ].map((step, index) => (
                <div className="re-whatsapp-nurture__card glass-card" key={step.label}>
                  <div className="re-whatsapp-nurture__card-top">
                    <span className="re-whatsapp-nurture__step-num">Step 0{index + 1}</span>
                    <span className={cx('re-whatsapp-nurture__icon', 'icon-badge', step.color)} aria-hidden="true">
                      <ReIcon name={step.icon} size={18} />
                    </span>
                  </div>
                  <h3 className="re-whatsapp-nurture__card-title">{step.label}</h3>
                  <p className="re-whatsapp-nurture__card-sub">{step.sub}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 11. LEAD QUALITY */}
      <section className="section re-lead-quality">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Lead Quality</span>
            <h2 className="section-heading__title">More Enquiries Is Not Always Better</h2>
          </div>
          <ScrollReveal>
            <p className="re-lead-quality__text">
              Not every website visitor becomes a qualified property buyer. A focused digital
              strategy aims to attract visitors with genuine purchase intent and guide them
              through a funnel from initial interest to sales conversations.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="re-lead-quality__grid">
              {LEAD_QUALITY.map((item, index) => (
                <div className="re-lead-quality__card glass-card" key={item.label}>
                  <div className="re-lead-quality__card-top">
                    <span className="re-lead-quality__step-num">0{index + 1}</span>
                    <span className={cx('re-lead-quality__icon', 'icon-badge', item.color)} aria-hidden="true">
                      <ReIcon name={item.icon} size={18} />
                    </span>
                  </div>
                  <h3 className="re-lead-quality__card-title">{item.label}</h3>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 12. PROJECT LANDING PAGE */}
      <section className="section re-landing-page">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Landing Page</span>
            <h2 className="section-heading__title">
              Every Property Project Deserves Its Own Landing Experience
            </h2>
          </div>
          <ScrollReveal>
            <div className="re-landing-page__card glass-card">
              <p className="re-landing-page__text">
                A project-specific landing page can consolidate all relevant property information
                in one place and guide visitors toward a clear enquiry action. This supports both
                organic search and paid campaign conversion.
              </p>
              <div className="re-landing-page__mockup glass-card">
                <div className="re-landing-page__nav">
                  <span>Home</span>
                  <span>Projects</span>
                  <span>About</span>
                  <span>Contact</span>
                </div>
                <div className="re-landing-page__body">
                  <div className="re-landing-page__hero">
                    <span className="re-landing-page__hero-label">PROJECT NAME</span>
                    <span className="re-landing-page__hero-sub">Location | Property Type</span>
                  </div>
                  <div className="re-landing-page__grid">
                    <div className="re-landing-page__grid-item glass-card">
                      <span className="icon-badge icon-badge--blue" aria-hidden="true"><ReIcon name="home" size={16} /></span>
                      <span>Property Type</span>
                    </div>
                    <div className="re-landing-page__grid-item glass-card">
                      <span className="icon-badge icon-badge--gold" aria-hidden="true"><ReIcon name="zap" size={16} /></span>
                      <span>Key Features</span>
                    </div>
                    <div className="re-landing-page__grid-item glass-card">
                      <span className="icon-badge icon-badge--cyan" aria-hidden="true"><ReIcon name="layers" size={16} /></span>
                      <span>Floor Plan</span>
                    </div>
                    <div className="re-landing-page__grid-item glass-card">
                      <span className="icon-badge icon-badge--pink" aria-hidden="true"><ReIcon name="camera" size={16} /></span>
                      <span>Gallery</span>
                    </div>
                    <div className="re-landing-page__grid-item glass-card">
                      <span className="icon-badge icon-badge--purple" aria-hidden="true"><ReIcon name="shield" size={16} /></span>
                      <span>RERA Details</span>
                    </div>
                    <div className="re-landing-page__grid-item glass-card">
                      <span className="icon-badge icon-badge--green" aria-hidden="true"><ReIcon name="whatsapp" size={16} /></span>
                      <span>WhatsApp CTA</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 13. CONTENT / SEO */}
      <section className="section re-content">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Content</span>
            <h2 className="section-heading__title">Build Search Visibility Around Property Intent</h2>
          </div>
          <div className="re-content__grid">
            {CONTENT_CARDS.map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 60}>
                <div className="re-content-card glass-card">
                  <span className={cx('re-content-card__icon', 'icon-badge', card.color)} aria-hidden="true">
                    <ReIcon name={card.icon} size={20} />
                  </span>
                  <h3 className="re-content-card__title">{card.title}</h3>
                  <p className="re-content-card__text">{card.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 14. LOCAL SEO */}
      <section className="section re-local-seo">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Local SEO</span>
            <h2 className="section-heading__title">Be Visible When Buyers Search Nearby</h2>
          </div>
          <ScrollReveal>
            <div className="re-local-seo__card glass-card">
              <p className="re-local-seo__text">
                When property buyers search for projects in a specific area, Google Business Profile
                visibility can help your office location and project listings appear in local search
                results and Google Maps.
              </p>
              <div className="re-local-seo__mockup glass-card">
                <div className="re-local-seo__header">
                  <span className="icon-badge icon-badge--blue" aria-hidden="true"><ReIcon name="mappin" size={18} /></span>
                  <span className="re-local-seo__business-name">Your Developer Name</span>
                </div>
                <div className="re-local-seo__body">
                  <div className="re-local-seo__info">
                    <span>Category: Real Estate Developer</span>
                    <span>Location: Madurai, Tamil Nadu</span>
                    <span>Rating: Verified Profile</span>
                    <span>Hours: Mon - Sat, 9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="re-local-seo__actions">
                    <span className="re-local-seo__action glass-card"><ReIcon name="phone" size={13} /> Call</span>
                    <span className="re-local-seo__action glass-card"><ReIcon name="compass" size={13} /> Directions</span>
                    <span className="re-local-seo__action glass-card"><ReIcon name="whatsapp" size={13} /> WhatsApp</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 15. GEO / AEO */}
      <section className="section re-geo">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">AI Search</span>
            <h2 className="section-heading__title">Prepare Your Property Business for AI Search</h2>
          </div>
          <ScrollReveal>
            <p className="re-geo__text">
              Buyers increasingly ask AI tools about properties, locations, pricing and project details.
              A strong GEO/AEO strategy can help structure your digital presence so AI systems can
              better understand your company, projects, locations, and relevance to property searches.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="re-geo__signals">
              {[
                { icon: 'building', label: 'Company', color: 'icon-badge--blue' },
                { icon: 'home', label: 'Projects', color: 'icon-badge--amber' },
                { icon: 'mappin', label: 'Locations', color: 'icon-badge--red' },
                { icon: 'layers', label: 'Property Types', color: 'icon-badge--cyan' },
                { icon: 'briefcase', label: 'Services', color: 'icon-badge--purple' },
                { icon: 'phone', label: 'Contact', color: 'icon-badge--green' },
              ].map((sig) => (
                <div className="re-geo__signal glass-card" key={sig.label}>
                  <span className={cx('re-geo__signal-icon', 'icon-badge', sig.color)} aria-hidden="true">
                    <ReIcon name={sig.icon} size={18} />
                  </span>
                  <span className="re-geo__signal-label">{sig.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 16. TRUST */}
      <section className="section re-trust">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Trust</span>
            <h2 className="section-heading__title">Real Estate Buyers Need Reasons to Trust You</h2>
          </div>
          <ScrollReveal>
            <p className="re-trust__text">
              Property purchases are significant financial decisions. Buyers look for trust
              signals including builder reputation, project track record, regulatory compliance
              and transparent communication before they engage with a developer.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="re-trust__grid">
              {[
                { icon: 'users', color: 'icon-badge--blue', title: 'Builder Profile', text: 'Establish developer identity and track record.' },
                { icon: 'home', color: 'icon-badge--amber', title: 'Verified Projects', text: 'Showcase completed and ongoing developments.' },
                { icon: 'shield', color: 'icon-badge--purple', title: 'RERA Registration', text: 'Display regulatory compliance and approvals.' },
                { icon: 'phone', color: 'icon-badge--green', title: 'Contact Information', text: 'Provide clear, accessible contact channels.' },
              ].map((item) => (
                <div className="re-trust__item glass-card" key={item.title}>
                  <span className={cx('re-trust__item-icon', 'icon-badge', item.color)} aria-hidden="true">
                    <ReIcon name={item.icon} size={20} />
                  </span>
                  <h3 className="re-trust__item-title">{item.title}</h3>
                  <p className="re-trust__item-text">{item.text}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 17. ECOSYSTEM / FUNNEL */}
      <section className="section re-ecosystem">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Marketing System</span>
            <h2 className="section-heading__title">The Real Estate Marketing System</h2>
          </div>
          <ScrollReveal>
            <div className="re-ecosystem__card glass-card">
              <div className="re-ecosystem__channels glass-card">
                <span className="re-ecosystem__channel-label">MARKETING CHANNELS</span>
                <div className="re-ecosystem__channel-list">
                  <span className="re-ecosystem__channel"><ReIcon name="search" size={14} /> SEO</span>
                  <span className="re-ecosystem__channel"><ReIcon name="megaphone" size={14} /> Google Ads</span>
                  <span className="re-ecosystem__channel"><ReIcon name="facebook" size={14} /> Facebook</span>
                  <span className="re-ecosystem__channel"><ReIcon name="instagram" size={14} /> Instagram</span>
                  <span className="re-ecosystem__channel"><ReIcon name="monitor" size={14} /> YouTube</span>
                  <span className="re-ecosystem__channel"><ReIcon name="sparkles" size={14} /> AI Search</span>
                </div>
              </div>
              <div className="re-ecosystem__nodes">
                <div className="re-ecosystem__node glass-card">
                  <span className="icon-badge icon-badge--blue" aria-hidden="true"><ReIcon name="monitor" size={18} /></span>
                  <span>Project Landing Page</span>
                </div>
                <div className="re-ecosystem__node glass-card">
                  <span className="icon-badge icon-badge--green" aria-hidden="true"><ReIcon name="whatsapp" size={18} /></span>
                  <span>WhatsApp / Enquiry</span>
                </div>
                <div className="re-ecosystem__node glass-card">
                  <span className="icon-badge icon-badge--purple" aria-hidden="true"><ReIcon name="message" size={18} /></span>
                  <span>Lead Nurturing</span>
                </div>
                <div className="re-ecosystem__node glass-card">
                  <span className="icon-badge icon-badge--pink" aria-hidden="true"><ReIcon name="calendar" size={18} /></span>
                  <span>Site Visit</span>
                </div>
                <div className="re-ecosystem__node glass-card">
                  <span className="icon-badge icon-badge--amber" aria-hidden="true"><ReIcon name="users" size={18} /></span>
                  <span>Sales Conversation</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 18. FAQ */}
      <section className="section re-faq">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">FAQ</span>
            <h2 className="section-heading__title">
              Frequently Asked Questions &mdash; Real Estate &amp; Builders
            </h2>
          </div>
          <FaqAccordion faqs={FAQS} />
        </div>
      </section>

      {/* 19. LOCATIONS */}
      <section className="section re-locations">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Coverage</span>
            <h2 className="section-heading__title">
              Real Estate Digital Marketing Across Tamil Nadu
            </h2>
          </div>

          <div className="re-locations__grid">
            <ScrollReveal className="re-locations__cell">
              <div className="re-location-card glass-card">
                <span className="icon-badge icon-badge--blue" aria-hidden="true">
                  <ReIcon name="mappin" size={22} />
                </span>
                <h3 className="re-location-card__title">Tamil Nadu</h3>
                <p className="re-location-card__text">
                  From Madurai to Chennai, Coimbatore and beyond, we help property developers and
                  builders rank for property-intent searches across Tamil Nadu &mdash;
                  with campaigns matched to buyer behaviour and project locations.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 20. RELATED INDUSTRIES & EXPLORE */}
      <section className="section re-related">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Explore More</span>
            <h2 className="section-heading__title">Related Industries</h2>
          </div>
          <div className="re-related__links">
            <Link to="/industries/textiles-madurai/" className="related-content__link">
              Textiles &amp; Madurai
            </Link>
            <Link to="/industries/port-marine-industrial-thoothukudi/" className="related-content__link">
              Port, Marine &amp; Industrial
            </Link>
            <Link to="/industries/education-training/" className="related-content__link">
              Education &amp; Training
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

      {/* 21. FINAL CTA & CONTACT */}
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
