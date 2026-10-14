import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import FAQSection from '../../components/sections/FAQSection.jsx'
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
  MALAYSIA_OFFICE,
  MALAYSIA_POSTAL_ADDRESS,
  MALAYSIA_OPENING_HOURS_SPEC,
} from '../../utils/constants.js'
import '../../styles/pages/malaysia.css'
import malaysiaHeroImg from '../../assets/images/locations/02malaysia.webp'

/* ============================================================
   CONTENT, Approved Static Savvy Media Malaysia Page Content
   ============================================================ */

const PAGE_TITLE =
  'Digital Marketing Agency Malaysia, Rawang, Selangor | Grant-Eligible | Static Savvy Media'

const PAGE_DESCRIPTION =
  "Static Savvy Media’s Malaysia office in Rawang, Selangor. SEO, GEO/AEO, Google Ads, and AI automation for Malaysian SMEs. MDEC and SMECorp grant-eligible digital marketing services."

const HERO_EYEBROW = 'Malaysia • Grant-Eligible Digital Marketing'

const HERO_SUBTITLE =
  'Malaysia’s digital economy is one of Southeast Asia’s fastest growing, and the Malaysian government has invested significantly in helping SMEs digitize through grant programmes. If you are a Malaysian SME and have not yet used MDEC, SMECorp, or other digital transformation grants to fund your digital marketing investment, you are leaving money on the table. Static Savvy Media operates from Rawang, Selangor, helping Malaysian businesses grow digitally while maximising available government grants.'

const GRANTS = [
  {
    number: '01',
    title: 'MDEC, Digital Economy Programme',
    text: 'Supports SME adoption of digital tools and digital marketing. Our SEO, social media, and website development services may qualify under the digital marketing spend category.',
    icon: 'digital',
    color: 'icon-badge--purple',
  },
  {
    number: '02',
    title: 'SMECorp, SME Digitalisation Initiative',
    text: 'Government matching grants for SME digital adoption. Digital marketing services from registered vendors may be eligible for 50% matching grants up to RM5,000 per company.',
    icon: 'finance',
    color: 'icon-badge--blue',
  },
  {
    number: '03',
    title: 'TEKUN, Bumiputera Digital Grant',
    text: 'Digital tools and e-commerce support grants for Bumiputera-owned businesses.',
    icon: 'launch',
    color: 'icon-badge--cyan',
  },
  {
    number: '04',
    title: 'Cradle Fund, CIP Spark',
    text: 'Technology commercialisation funding that can support digital presence building for technology-related SMEs.',
    icon: 'spark',
    color: 'icon-badge--pink',
  },
]

const GRANT_DISCLAIMER =
  'Grant programme terms, eligibility criteria, and funding availability change regularly. Contact us on WhatsApp to discuss which current programmes may be applicable to your business. We do not guarantee grant approval, we help you understand your options and connect you with the right channels.'

const SERVICES = [
  {
    number: '01',
    title: 'SEO for Malaysia',
    text: 'English and Bahasa Malaysia keyword strategy, targeting Selangor, Kuala Lumpur, and Klang Valley search queries.',
    path: '/services/seo/malaysia/',
    icon: 'seo',
    color: 'icon-badge--purple',
  },
  {
    number: '02',
    title: 'Local SEO & Google Maps',
    text: 'GBP optimization for your Malaysian location, targeting “near me” and city-specific queries in Rawang, Selangor, and surrounding areas.',
    path: '/services/local-seo/malaysia/',
    icon: 'local',
    color: 'icon-badge--blue',
  },
  {
    number: '03',
    title: 'GEO & AEO',
    text: 'AI search visibility for Malaysian market queries, particularly valuable as Malaysian professionals increasingly use ChatGPT and Perplexity for vendor research.',
    path: '/services/geo-aeo-ai-search/',
    icon: 'geo',
    color: 'icon-badge--cyan',
  },
  {
    number: '04',
    title: 'Google Ads (MYR)',
    text: 'Paid search campaigns budgeted and reported in MYR, targeting Malaysian search audiences.',
    path: '/services/google-ads/',
    icon: 'ads',
    color: 'icon-badge--pink',
  },
  {
    number: '05',
    title: 'Social Media',
    text: 'Facebook and Instagram (dominant in Malaysia) and LinkedIn (for B2B). Bilingual content in English and Bahasa Malaysia.',
    path: '/services/social-media-marketing/',
    icon: 'social',
    color: 'icon-badge--orange',
  },
  {
    number: '06',
    title: 'Website Development',
    text: 'SEO-ready websites for Malaysian businesses, with local payment gateway integration (FPX, GrabPay) where required.',
    path: '/services/website-design-development/',
    icon: 'web',
    color: 'icon-badge--green',
  },
  {
    number: '07',
    title: 'AI Business Automation',
    text: 'Workflow automation and WhatsApp Business API setup, eligible for SME Digitalisation Initiative grant funding for qualifying businesses.',
    path: '/services/ai-business-automation/malaysia/',
    icon: 'automation',
    color: 'icon-badge--gold',
  },
]

const FAQS = [
  {
    question: 'Am I eligible for MDEC or SMECorp digital marketing grants?',
    answer:
      'Eligibility depends on your company registration status, annual turnover, number of employees, and the specific programme cycle. Generally, SMEs registered under SSM with less than RM50 million annual turnover and fewer than 200 full-time employees qualify for most SME-targeted programmes. Contact us on WhatsApp for help assessing your eligibility.',
  },
  {
    question: 'Do you create content in Bahasa Malaysia?',
    answer:
      'Yes. We create Bahasa Malaysia content for social media, website pages, and blog posts. All BM content is written or reviewed by native speakers, not machine-translated from English.',
  },
  {
    question: 'Can you help with e-commerce on Lazada and Shopee Malaysia?',
    answer:
      'Yes. We help businesses set up and optimize their presence on Lazada and Shopee Malaysia, product listing optimization, product photography formatted for platform requirements, and Shopee/Lazada ad management. This is typically paired with our product photography service for best results.',
  },
]

const RELATED_SERVICES = [
  { name: 'SEO in Kuala Lumpur', path: '/services/seo/kuala-lumpur/' },
  { name: 'Digital Marketing in Kuala Lumpur', path: '/locations/kuala-lumpur/' },
  { name: 'SEO Malaysia', path: '/services/seo/malaysia/' },
  { name: 'Local SEO Malaysia', path: '/services/local-seo/malaysia/' },
  { name: 'GEO & AEO, AI Search', path: '/services/geo-aeo-ai-search/' },
  { name: 'Google Ads', path: '/services/google-ads/' },
  { name: 'Social Media Marketing', path: '/services/social-media-marketing/' },
  { name: 'Website Design & Development', path: '/services/website-design-development/' },
  { name: 'AI Business Automation', path: '/services/ai-business-automation/' },
]

const OTHER_LOCATIONS = [
  { name: 'Kuala Lumpur', path: '/locations/kuala-lumpur/' },
  { name: 'Madurai', path: '/locations/madurai/' },
  { name: 'Thoothukudi', path: '/locations/thoothukudi/' },
  { name: 'All Locations', path: '/locations/' },
]

/* ============================================================
   COMPONENT
   ============================================================ */

export default function Malaysia() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/locations/malaysia/`,
      ogType: 'website',
    })

    const faqEntities = FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    }))

    const localBiz = localBusinessSchema({
      name: 'Static Savvy Media, Malaysia',
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/locations/malaysia/`,
      telephone: MALAYSIA_OFFICE.phoneE164,
      address: MALAYSIA_POSTAL_ADDRESS,
      openingHoursSpecification: MALAYSIA_OPENING_HOURS_SPEC,
      areaServed: [
        { '@type': 'City', name: 'Rawang' },
        { '@type': 'State', name: 'Selangor' },
        { '@type': 'Country', name: 'Malaysia' },
      ],
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Locations', item: `${SITE_URL}/locations/` },
        { name: 'Malaysia', item: `${SITE_URL}/locations/malaysia/` },
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
    <div className="malaysia-page">
      {/* ---- Breadcrumbs ---- */}
      <Breadcrumbs />

      {/* ---- Hero ---- */}
      <HeroSection
        layout="two-column"
        eyebrow={HERO_EYEBROW}
        title="Digital Marketing Agency Malaysia, Rawang, Selangor | Grant-Eligible Services for Malaysian SMEs"
        subtitle={HERO_SUBTITLE}
        actions={
          <>
            <Button
              href={whatsappHref}
              variant="primary"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              {`WhatsApp: ${MALAYSIA_OFFICE.whatsappDisplay}`}
            </Button>
            <Button
              href={MALAYSIA_OFFICE.phoneHref}
              variant="ghost"
              size="lg"
              aria-label={`Call Static Savvy Media Malaysia on ${MALAYSIA_OFFICE.phoneDisplay}`}
            >
              {`Call: ${MALAYSIA_OFFICE.phoneDisplay}`}
            </Button>
          </>
        }
      >
        <div className="hero__visual-side">
          <img
            src={malaysiaHeroImg}
            width={1536}
            height={1024}
            fetchPriority="high"
            alt="Digital Marketing Agency Malaysia"
            className="hero__image"
          />
        </div>
      </HeroSection>

      {/* ---- Government Grants ---- */}
      <section className="section malaysia-grants">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Government Grants</span>
            <h2 className="section-heading__title">Malaysian Government Grants for Digital Marketing</h2>
          </div>
          <div className="malaysia-grants__grid">
            {GRANTS.map((grant, index) => (
              <ScrollReveal key={grant.number} delay={index * 60}>
                <article className="malaysia-grant-card glass-card">
                  <div className="malaysia-grant-card__top">
                    <span className={cx('malaysia-grant-card__badge', 'icon-badge', grant.color)} aria-hidden="true">
                      {grant.icon === 'digital' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                      )}
                      {grant.icon === 'finance' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                      )}
                      {grant.icon === 'launch' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                        </svg>
                      )}
                      {grant.icon === 'spark' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 18h6M10 22h4M15 14.5A7 7 0 1 0 9 14.5" />
                        </svg>
                      )}
                    </span>
                    <span className="malaysia-grant-card__number" aria-hidden="true">
                      {grant.number}
                    </span>
                  </div>
                  <h3 className="malaysia-grant-card__title">{grant.title}</h3>
                  <p className="malaysia-grant-card__text">{grant.text}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="malaysia-grants__disclaimer">
            <div className="malaysia-grants__disclaimer-inner glass-card">
              <div className="malaysia-grants__disclaimer-icon" aria-hidden="true">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <p className="malaysia-grants__disclaimer-text">{GRANT_DISCLAIMER}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- Digital Marketing Services in Malaysia ---- */}
      <section className="section malaysia-services section--alt">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">What We Deliver</span>
            <h2 className="section-heading__title">Digital Marketing Services in Malaysia</h2>
          </div>
          <div className="malaysia-services__grid">
            {SERVICES.map((service, index) => (
              <ScrollReveal key={service.number} delay={index * 60}>
                <article className="malaysia-service-card glass-card">
                  <div className="malaysia-service-card__top">
                    <span className={cx('malaysia-service-card__badge', 'icon-badge', service.color)} aria-hidden="true">
                      {service.icon === 'seo' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                      )}
                      {service.icon === 'local' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      )}
                      {service.icon === 'geo' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
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
                    </span>
                    <span className="malaysia-service-card__number" aria-hidden="true">
                      {service.number}
                    </span>
                  </div>
                  <h3 className="malaysia-service-card__title">
                    <Link to={service.path}>{service.title}</Link>
                  </h3>
                  <p className="malaysia-service-card__text">{service.text}</p>
                  <Link to={service.path} className="malaysia-service-card__link">
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

      {/* ---- Malaysia Office ---- */}
      <section className="section malaysia-office">
        <div className="container">
          <div className="malaysia-office__inner glass-card gradient-border">
            <div className="malaysia-office__visual" aria-hidden="true">
              <div className="malaysia-office__pin">
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
              <span className="malaysia-office__label">Rawang, Selangor</span>
            </div>
            <div className="malaysia-office__details">
              <h2 className="malaysia-office__title">Malaysia Office Details</h2>
              <div className="malaysia-office__card glass-card">
                <h3 className="malaysia-office__name">Static Savvy Media, Malaysia</h3>
                <p className="malaysia-office__address" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#22d3ee', flexShrink: 0, marginTop: '2px' }} aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>
                    {MALAYSIA_OFFICE.streetAddress},<br />
                    {MALAYSIA_OFFICE.postalCode} {MALAYSIA_OFFICE.addressLocality}, {MALAYSIA_OFFICE.addressRegion}, Malaysia<br />
                    <small>({MALAYSIA_OFFICE.landmark})</small>
                  </span>
                </p>
                <div className="malaysia-office__meta">
                  <div className="malaysia-office__meta-item">
                    <span className="malaysia-office__meta-label">Call</span>
                    <a href={MALAYSIA_OFFICE.phoneHref} className="malaysia-office__meta-value" aria-label={`Call Static Savvy Media Malaysia on ${MALAYSIA_OFFICE.phoneDisplay}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#22d3ee', flexShrink: 0 }} aria-hidden="true">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      {MALAYSIA_OFFICE.phoneDisplay}
                    </a>
                  </div>
                  <div className="malaysia-office__meta-item">
                    <span className="malaysia-office__meta-label">WhatsApp</span>
                    <a href={whatsappHref} className="malaysia-office__meta-value" target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp Static Savvy Media on ${MALAYSIA_OFFICE.whatsappDisplay}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#25D366', flexShrink: 0 }} aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      {MALAYSIA_OFFICE.whatsappDisplay}
                    </a>
                  </div>
                  <div className="malaysia-office__meta-item">
                    <span className="malaysia-office__meta-label">Hours</span>
                    <span className="malaysia-office__meta-value">
                      {MALAYSIA_OFFICE.hoursDisplay}
                      <br />
                      <small>{MALAYSIA_OFFICE.hoursNote}</small>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Related Content ---- */}
      <section className="section malaysia-related section--alt">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Explore More</span>
            <h2 className="section-heading__title">Related Services &amp; Locations</h2>
          </div>

          <div className="malaysia-related__group">
            <h3 className="malaysia-related__group-title">Our Services</h3>
            <div className="malaysia-related__links">
              {RELATED_SERVICES.map((item) => (
                <Link key={item.path} to={item.path} className="malaysia-related__link">
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

          <div className="malaysia-related__group">
            <h3 className="malaysia-related__group-title">Other Locations</h3>
            <div className="malaysia-related__links">
              {OTHER_LOCATIONS.map((item) => (
                <Link key={item.path} to={item.path} className="malaysia-related__link">
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

      {/* ---- FAQ ---- */}
      <FAQSection
        eyebrow="FAQ"
        title="Malaysia, Frequently Asked Questions"
        faqs={FAQS}
      />

      {/* ---- Final CTA ---- */}
      <CTASection
        title="Grow your Malaysian business, with digital marketing you may be able to fund through government grants."
        subtitle=""
        primaryLabel="WhatsApp for Malaysia Services & Grants"
        primaryHref={whatsappHref}
      />
      <ContactFormSection />
    </div>
  )
}
