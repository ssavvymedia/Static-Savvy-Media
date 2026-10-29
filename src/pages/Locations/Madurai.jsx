import { useEffect, useRef } from 'react'
import { MADURAI_FAQS } from '../../data/pages/maduraiFaqs.js'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import FAQSection from '../../components/sections/FAQSection.jsx'
import GoogleReviewsSection from '../../components/sections/GoogleReviewsSection.jsx'
import { pickReviews } from '../../data/googleReviews.js'
import CTASection from '../../components/sections/CTASection.jsx'
import ContactFormSection from '../../components/sections/ContactFormSection.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import {
  localBusinessSchema,
  faqPageSchema,
  breadcrumbListSchema,
} from '../../utils/schema.js'
import { buildWhatsAppLink, cx } from '../../utils/helpers.js'
import {
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
  SITE_URL,
} from '../../utils/constants.js'
import '../../styles/pages/madurai.css'
import maduraiHeroImg from '../../assets/images/locations/01Madurai.webp'

/* ============================================================
   CONTENT, Approved Static Savvy Media Madurai Page Content
   ============================================================ */

const PAGE_TITLE =
  'Digital Marketing Agency in Madurai, SEO, GEO/AEO & More | Static Savvy Media'

const PAGE_DESCRIPTION =
  'Madurai digital marketing agency at Kamarajar Salai since 2021, rated 4.9★ from 106 Google reviews. SEO, Local SEO, Ads, social & websites. Custom quotes: WhatsApp +91 99440 40345.'

const HERO_EYEBROW = 'Madurai • Static Savvy Media HQ'

const HERO_SUBTITLE =
  'Madurai is not just our headquarters, it is our home market. We understand the Madurai business landscape because we have built our own business here: the textile corridor, the education institutions driving student demand, the healthcare cluster, the hospitality businesses serving pilgrims and tourists at Meenakshi Amman Temple, and the growing retail ecosystem. When we build digital marketing for Madurai businesses, we build for the city we live in.'


const QUICK_ANSWER =
  'Static Savvy Media is a digital marketing agency headquartered in Madurai, at 2nd Floor, 4/3, Srinivasa Perumal Koil St, Kamarajar Salai (625009). Since 1 October 2021 our Madurai team has run SEO, Local SEO and Google Business Profile, Google & Meta ads, social media, websites and AI search (GEO/AEO) for local businesses, in Tamil and English. We are rated 4.9★ on Google from 106 reviews, and every SEO plan is quoted after a free audit, with no lock-in.'

const QUICK_FACTS = [
  { label: 'Madurai office', value: '2nd Floor, 4/3, Srinivasa Perumal Koil St, Kamarajar Salai, Madurai 625009' },
  { label: 'Serving Madurai since', value: '1 October 2021' },
  { label: 'Google rating', value: '4.9★ from 106 Google reviews' },
  { label: 'Office hours', value: 'Monday–Saturday, 9:00 AM – 6:30 PM IST (visits by appointment)' },
  { label: 'Languages', value: 'Tamil and English' },
  { label: 'SEO quotes', value: 'Google Business Profile and website SEO plans, quoted after a free audit, no minimum term', link: { to: '/contact/', label: 'Get a custom quote' } },
  { label: 'Phone / WhatsApp', value: '+91 99440 40345' },
]

const HOW_WE_WORK = [
  { title: '1. Free audit', text: 'We check your Google Business Profile, website and current Google rankings in Madurai, and show what is costing you enquiries.' },
  { title: '2. Plan', text: 'A 90-day plan for the channels that fit your budget, usually Local SEO and Google Maps first for local businesses.' },
  { title: '3. Execution from Madurai', text: 'Our Madurai team does the work in-house: pages, Tamil and English content, Google Business Profile, ads and reporting.' },
  { title: '4. Monthly report', text: 'Calls, WhatsApp messages, direction requests, form enquiries and rankings, so you see what the spend returns.' },
]

const SERVICES = [
  {
    number: '01',
    title: 'Search Engine Optimization (SEO)',
    text: 'Ranking your Madurai business for city-specific and Tamil Nadu-wide queries.',
    path: '/services/seo/madurai/',
    icon: 'seo',
    color: 'icon-badge--purple',
  },
  {
    number: '02',
    title: 'GEO & AEO / AI Search Optimization',
    text: 'Getting cited by ChatGPT, Perplexity, and Google AI Overviews.',
    path: '/services/geo-aeo-ai-search/madurai/',
    icon: 'geo',
    color: 'icon-badge--blue',
  },
  {
    number: '03',
    title: 'Local SEO & Google Business Profile',
    text: 'Improving your Google Maps visibility for “near me” searches in Madurai.',
    path: '/services/local-seo/madurai/',
    icon: 'local',
    color: 'icon-badge--cyan',
  },
  {
    number: '04',
    title: 'Google Ads & PPC',
    text: 'Immediate visibility for high-intent buyers searching in Madurai.',
    path: '/services/advertising-agency/madurai/',
    icon: 'ads',
    color: 'icon-badge--pink',
  },
  {
    number: '05',
    title: 'Social Media Marketing',
    text: 'Instagram and Facebook for the Madurai consumer market; LinkedIn for B2B.',
    path: '/services/social-media-marketing/madurai/',
    icon: 'social',
    color: 'icon-badge--orange',
  },
  {
    number: '06',
    title: 'Website Design & Development',
    text: 'SEO-ready, mobile-first websites built for Madurai businesses.',
    path: '/services/website-design-development/madurai/',
    icon: 'web',
    color: 'icon-badge--green',
  },
  {
    number: '07',
    title: 'AI Business Automation',
    text: 'WhatsApp automation and workflow tools for Madurai SMEs.',
    path: '/services/ai-business-automation/',
    icon: 'automation',
    color: 'icon-badge--gold',
  },
  {
    number: '08',
    title: 'Corporate Photography & Video',
    text: 'Professional photography and video production in Madurai.',
    path: '/services/corporate-photography-video/',
    icon: 'photography',
    color: 'icon-badge--red',
  },
  {
    number: '09',
    title: 'AI Video Creation',
    text: 'Marketing videos for Madurai businesses.',
    path: '/services/ai-video-creation/',
    icon: 'video',
    color: 'icon-badge--indigo',
  },
  {
    number: '10',
    title: 'Product Photography & Creative Design',
    text: 'E-commerce photography, textile product photography, and brand design.',
    path: '/services/product-photography-creative-design/',
    icon: 'design',
    color: 'icon-badge--teal',
  },
]

const INDUSTRIES = [
  {
    title: 'Textiles & Garments',
    text: "Madurai is one of Tamil Nadu’s most important textile trading hubs. We build digital presence for silk saree retailers, textile manufacturers, readymade garment businesses, and export-oriented garment units, including product photography optimised for Indian and international e-commerce platforms.",
    path: '/industries/textiles-madurai/',
    icon: 'textiles',
    color: 'icon-badge--purple',
  },
  {
    title: 'Education & Training',
    text: "Madurai’s concentration of engineering colleges, arts and science colleges, and coaching institutes makes education one of the city’s highest-competition digital marketing categories. We help educational institutions rank for admission-intent queries and build the authoritative online presence that today’s student-parents research before enrolling.",
    path: '/industries/education-training/',
    icon: 'education',
    color: 'icon-badge--blue',
  },
  {
    title: 'Healthcare & Clinics',
    text: "From specialist clinics to dental chains, Madurai’s healthcare businesses are increasingly competing on digital visibility. Local SEO and Google Business Profile optimisation are the highest-ROI starting points for most healthcare clients.",
    path: '/industries/healthcare-clinics/',
    icon: 'healthcare',
    color: 'icon-badge--cyan',
  },
  {
    title: 'Hospitality & Restaurants',
    text: "Year-round pilgrim and tourist traffic to Meenakshi Amman Temple drives significant hospitality demand in Madurai. We help hotels, restaurants, and wedding venues capture this high-intent traffic through Google Maps ranking and AI travel platform visibility.",
    path: '/industries/hospitality-hotels/',
    icon: 'hospitality',
    color: 'icon-badge--pink',
  },
]

const FAQS = MADURAI_FAQS

const RELATED_SERVICES = [
  { name: 'SEO', path: '/services/seo/' },
  { name: 'Local SEO', path: '/services/local-seo/' },
  { name: 'GEO & AEO, AI Search', path: '/services/geo-aeo-ai-search/' },
  { name: 'Google Ads', path: '/services/google-ads/' },
  { name: 'Social Media Marketing in Madurai', path: '/services/social-media-marketing/madurai/' },
  { name: 'SEO Company in Madurai', path: '/services/seo/madurai/' },
  { name: 'Advertising Agency in Madurai', path: '/services/advertising-agency/madurai/' },
  { name: 'Top Digital Marketing Companies in Madurai (guide)', path: '/blog/top-digital-marketing-companies-in-madurai/' },
  { name: 'Website Design & Development in Madurai', path: '/services/website-design-development/madurai/' },
  { name: 'AI Business Automation', path: '/services/ai-business-automation/' },
  { name: 'Corporate Photography & Video', path: '/services/corporate-photography-video/' },
  { name: 'AI Video Creation', path: '/services/ai-video-creation/' },
  { name: 'Product Photography & Creative Design', path: '/services/product-photography-creative-design/' },
]

const OTHER_LOCATIONS = [
  { name: 'Thoothukudi', path: '/locations/thoothukudi/' },
  { name: 'Malaysia', path: '/locations/malaysia/' },
  { name: 'Tamil Nadu', path: '/locations/tamil-nadu/' },
  { name: 'All Locations', path: '/locations/' },
]

/* ============================================================
   COMPONENT
   ============================================================ */

export default function Madurai() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/locations/madurai/`,
      ogType: 'website',
    })

    const faqEntities = FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    }))

    const localBiz = localBusinessSchema({
      name: 'Static Savvy Media, Madurai',
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/locations/madurai/`,
      telephone: '+919944040345',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '2nd Floor, 4/3, Srinivasa Perumal Koil St, Kamarajar Salai',
        addressLocality: 'Madurai',
        addressRegion: 'Tamil Nadu',
        postalCode: '625009',
        addressCountry: 'IN',
      },
      areaServed: [
        { '@type': 'City', name: 'Madurai' },
        { '@type': 'State', name: 'Tamil Nadu' },
      ],
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Locations', item: `${SITE_URL}/locations/` },
        { name: 'Madurai', item: `${SITE_URL}/locations/madurai/` },
      ],
    })

    const scripts = [
      localBiz,
      faqPageSchema({ faqs: faqEntities }),
      breadcrumbs,
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

  return (
    <div className="madurai-page">
      {/* ---- Breadcrumbs ---- */}
      <Breadcrumbs />

      {/* ---- Hero ---- */}
      <HeroSection
        layout="two-column"
        eyebrow={HERO_EYEBROW}
        title="Digital Marketing Agency in Madurai, Static Savvy Media HQ"
        subtitle={HERO_SUBTITLE}
        actions={
          <Button
            href={whatsappHref}
            variant="primary"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp: +91 99440 40345
          </Button>
        }
      >
        <div className="hero__visual-side">
          <img
            src={maduraiHeroImg}
            width={1536}
            height={1024}
            fetchPriority="high"
            alt="Digital Marketing Agency in Madurai"
            className="hero__image"
          />
        </div>
      </HeroSection>

      {/* ---- Quick answer (answer-first for search & AI engines) ---- */}
      <section className="section madurai-quick">
        <div className="container">
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h2 className="section-heading__title">Looking for a digital marketing agency in Madurai?</h2>
            <p>{QUICK_ANSWER}</p>
            <dl style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
              {QUICK_FACTS.map((f) => (
                <div key={f.label}>
                  <dt style={{ fontWeight: 600, opacity: 0.8 }}>{f.label}</dt>
                  <dd style={{ margin: 0 }}>
                    {f.value}
                    {f.link && (
                      <>
                        {' '}
                        <Link to={f.link.to}>{f.link.label}</Link>
                      </>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---- How we work with Madurai businesses ---- */}
      <section className="section madurai-process section--alt">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">How It Works</span>
            <h2 className="section-heading__title">How We Work With Madurai Businesses</h2>
          </div>
          <ol style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', listStyle: 'none', padding: 0 }}>
            {HOW_WE_WORK.map((step) => (
              <li key={step.title} className="glass-card" style={{ padding: '1.25rem' }}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
          <p style={{ marginTop: '1rem' }}>
            Want to start with the audit? <Link to="/contact/">Request a free audit</Link> or read{' '}
            <Link to="/blog/how-long-does-seo-take-madurai/">how long SEO takes for a Madurai business</Link>.
          </p>
        </div>
      </section>

      {/* ---- Digital Marketing Services in Madurai ---- */}
      <section className="section madurai-services">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">What We Deliver</span>
            <h2 className="section-heading__title">Digital Marketing Services in Madurai</h2>
            <p className="section-heading__subtitle">
              This page covers our Madurai office and local team. For an overview of Static Savvy Media as a{' '}
              <Link to="/">digital marketing company in Madurai</Link>, visit our homepage.
            </p>
          </div>
          <div className="madurai-services__grid">
            {SERVICES.map((service, index) => (
              <ScrollReveal key={service.number} delay={index * 60}>
                <article className="madurai-service-card glass-card">
                  <div className="madurai-service-card__top">
                    <span className={cx('madurai-service-card__badge', 'icon-badge', service.color)} aria-hidden="true">
                      {service.icon === 'seo' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                      )}
                      {service.icon === 'geo' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                        </svg>
                      )}
                      {service.icon === 'local' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      )}
                      {service.icon === 'ads' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="12" cy="12" r="6" />
                          <circle cx="12" cy="12" r="2" />
                        </svg>
                      )}
                      {service.icon === 'social' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="18" cy="5" r="3" />
                          <circle cx="6" cy="12" r="3" />
                          <circle cx="18" cy="19" r="3" />
                          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                        </svg>
                      )}
                      {service.icon === 'web' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                      )}
                      {service.icon === 'automation' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="4" y="4" width="16" height="16" rx="2" />
                          <rect x="9" y="9" width="6" height="6" />
                          <line x1="9" y1="1" x2="9" y2="4" />
                          <line x1="15" y1="1" x2="15" y2="4" />
                          <line x1="9" y1="20" x2="9" y2="23" />
                          <line x1="15" y1="20" x2="15" y2="23" />
                          <line x1="20" y1="9" x2="23" y2="9" />
                          <line x1="20" y1="15" x2="23" y2="15" />
                          <line x1="1" y1="9" x2="4" y2="9" />
                          <line x1="1" y1="15" x2="4" y2="15" />
                        </svg>
                      )}
                      {service.icon === 'photography' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                          <circle cx="12" cy="13" r="4" />
                        </svg>
                      )}
                      {service.icon === 'video' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                          <line x1="7" y1="2" x2="7" y2="22" />
                          <line x1="17" y1="2" x2="17" y2="22" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <line x1="2" y1="7" x2="7" y2="7" />
                          <line x1="2" y1="17" x2="7" y2="17" />
                          <line x1="17" y1="17" x2="22" y2="17" />
                          <line x1="17" y1="7" x2="22" y2="7" />
                        </svg>
                      )}
                      {service.icon === 'design' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="13.5" cy="6.5" r=".5" />
                          <circle cx="17.5" cy="10.5" r=".5" />
                          <circle cx="8.5" cy="7.5" r=".5" />
                          <circle cx="6.5" cy="12.5" r=".5" />
                          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.7-.71 1.7-1.63 0-.44-.18-.85-.46-1.16-.27-.3-.43-.72-.43-1.18 0-.92.75-1.66 1.67-1.66h2.85c3.07 0 5.58-2.5 5.58-5.56 0-5.5-4.5-9.81-10.87-9.81z" />
                        </svg>
                      )}
                    </span>
                    <span className="madurai-service-card__number" aria-hidden="true">
                      {service.number}
                    </span>
                  </div>
                  <h3 className="madurai-service-card__title">
                    <Link to={service.path}>{service.title}</Link>
                  </h3>
                  <p className="madurai-service-card__text">{service.text}</p>
                  <Link to={service.path} className="madurai-service-card__link">
                    Learn more
                    <svg
                      width="14"
                      height="14"
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
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Industries We Serve in Madurai ---- */}
      <section className="section madurai-industries section--alt">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Industries</span>
            <h2 className="section-heading__title">Industries We Serve in Madurai</h2>
          </div>
          <div className="madurai-industries__grid">
            {INDUSTRIES.map((industry, index) => (
              <ScrollReveal key={industry.title} delay={index * 80}>
                <article className="madurai-industry-card glass-card">
                  <div className={cx('madurai-industry-card__icon', 'icon-badge', industry.color)} aria-hidden="true">
                    {industry.icon === 'textiles' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                    )}
                    {industry.icon === 'education' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                      </svg>
                    )}
                    {industry.icon === 'healthcare' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        <path d="M12 8v6M9 11h6" />
                      </svg>
                    )}
                    {industry.icon === 'hospitality' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
                        <path d="M9 22v-4h6v4" />
                        <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
                      </svg>
                    )}
                  </div>
                  <h3 className="madurai-industry-card__title">{industry.title}</h3>
                  <p className="madurai-industry-card__text">{industry.text}</p>
                  <Link to={industry.path} className="madurai-industry-card__link">
                    Explore {industry.title}
                    <svg
                      width="14"
                      height="14"
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
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Our Madurai Office ---- */}
      <section className="section madurai-office">
        <div className="container">
          <div className="madurai-office__inner glass-card gradient-border">
            <div className="madurai-office__visual" aria-hidden="true">
              <div className="madurai-office__pin">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <span className="madurai-office__label">Madurai, Tamil Nadu</span>
            </div>
            <div className="madurai-office__details">
              <h2 className="madurai-office__title">Our Madurai Office</h2>
              <div className="madurai-office__card glass-card">
                <h3 className="madurai-office__name">Static Savvy Media, Madurai</h3>
                <p className="madurai-office__address" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#22d3ee', flexShrink: 0, marginTop: '2px' }} aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>
                    2nd Floor, 4/3, Srinivasa Perumal Koil St,<br />
                    Kamarajar Salai, Madurai - 625009
                  </span>
                </p>
                <div className="madurai-office__meta">
                  <div className="madurai-office__meta-item">
                    <span className="madurai-office__meta-label">Phone/WhatsApp</span>
                    <a href={whatsappHref} className="madurai-office__meta-value" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#25D366', flexShrink: 0 }} aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      +91 99440 40345
                    </a>
                  </div>
                  <div className="madurai-office__meta-item">
                    <span className="madurai-office__meta-label">Hours</span>
                    <span className="madurai-office__meta-value">
                      Monday–Saturday, 9:00 AM – 6:30 PM IST
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Related Content ---- */}
      <section className="section madurai-related section--alt">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Explore More</span>
            <h2 className="section-heading__title">Related Services &amp; Locations</h2>
          </div>

          <div className="madurai-related__group">
            <h3 className="madurai-related__group-title">Our Services</h3>
            <div className="madurai-related__links">
              {RELATED_SERVICES.map((item) => (
                <Link key={item.path} to={item.path} className="madurai-related__link">
                  {item.name}
                  <svg
                    width="14"
                    height="14"
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
              ))}
            </div>
          </div>

          <div className="madurai-related__group">
            <h3 className="madurai-related__group-title">Other Locations</h3>
            <div className="madurai-related__links">
              {OTHER_LOCATIONS.map((item) => (
                <Link key={item.path} to={item.path} className="madurai-related__link">
                  {item.name}
                  <svg
                    width="14"
                    height="14"
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
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Google reviews (verbatim, visible only, no schema) ---- */}
      <GoogleReviewsSection
        reviews={pickReviews(1, 4)}
        title="What Madurai clients say on Google"
      />

      {/* ---- FAQ ---- */}
      <FAQSection
        eyebrow="FAQ"
        title="Madurai, Frequently Asked Questions"
        faqs={FAQS}
      />

      {/* ---- Final CTA ---- */}
      <CTASection
        title="Ready to grow your Madurai business?"
        subtitle="Message us on WhatsApp and our Madurai team will reply during office hours."
        primaryLabel="WhatsApp: +91 99440 40345"
        primaryHref={whatsappHref}
      />
      <ContactFormSection />
    </div>
  )
}
