import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import FAQSection from '../../components/sections/FAQSection.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import {
  localBusinessSchema,
  faqPageSchema,
  breadcrumbListSchema,
} from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import {
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
  SITE_URL,
} from '../../utils/constants.js'
import '../../styles/pages/malaysia.css'

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
  },
  {
    number: '02',
    title: 'SMECorp, SME Digitalisation Initiative',
    text: 'Government matching grants for SME digital adoption. Digital marketing services from registered vendors may be eligible for 50% matching grants up to RM5,000 per company.',
  },
  {
    number: '03',
    title: 'TEKUN, Bumiputera Digital Grant',
    text: 'Digital tools and e-commerce support grants for Bumiputera-owned businesses.',
  },
  {
    number: '04',
    title: 'Cradle Fund, CIP Spark',
    text: 'Technology commercialisation funding that can support digital presence building for technology-related SMEs.',
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
  },
  {
    number: '02',
    title: 'Local SEO & Google Maps',
    text: 'GBP optimization for your Malaysian location, targeting “near me” and city-specific queries in Rawang, Selangor, and surrounding areas.',
    path: '/services/local-seo/malaysia/',
  },
  {
    number: '03',
    title: 'GEO & AEO',
    text: 'AI search visibility for Malaysian market queries, particularly valuable as Malaysian professionals increasingly use ChatGPT and Perplexity for vendor research.',
    path: '/services/geo-aeo-ai-search/',
  },
  {
    number: '04',
    title: 'Google Ads (MYR)',
    text: 'Paid search campaigns budgeted and reported in MYR, targeting Malaysian search audiences.',
    path: '/services/google-ads/',
  },
  {
    number: '05',
    title: 'Social Media',
    text: 'Facebook and Instagram (dominant in Malaysia) and LinkedIn (for B2B). Bilingual content in English and Bahasa Malaysia.',
    path: '/services/social-media-marketing/',
  },
  {
    number: '06',
    title: 'Website Development',
    text: 'SEO-ready websites for Malaysian businesses, with local payment gateway integration (FPX, GrabPay) where required.',
    path: '/services/website-design-development/',
  },
  {
    number: '07',
    title: 'AI Business Automation',
    text: 'Workflow automation and WhatsApp Business API setup, eligible for SME Digitalisation Initiative grant funding for qualifying businesses.',
    path: '/services/ai-business-automation/malaysia/',
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
  { name: 'SEO', path: '/services/seo/' },
  { name: 'Local SEO', path: '/services/local-seo/' },
  { name: 'GEO & AEO, AI Search', path: '/services/geo-aeo-ai-search/' },
  { name: 'Google Ads', path: '/services/google-ads/' },
  { name: 'Social Media Marketing', path: '/services/social-media-marketing/' },
  { name: 'Website Design & Development', path: '/services/website-design-development/' },
  { name: 'AI Business Automation', path: '/services/ai-business-automation/' },
]

const OTHER_LOCATIONS = [
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
      telephone: '+919944040345',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Rawang',
        addressRegion: 'Selangor',
        addressCountry: 'MY',
      },
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
        eyebrow={HERO_EYEBROW}
        title="Digital Marketing Agency Malaysia, Rawang, Selangor | Grant-Eligible Services for Malaysian SMEs"
        subtitle={HERO_SUBTITLE}
        actions={
          <Button
            href={whatsappHref}
            variant="primary"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp: +91-99440-40345
          </Button>
        }
      />

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
                    <span className="malaysia-grant-card__badge" aria-hidden="true">
                      {grant.number}
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
                    <span className="malaysia-service-card__badge" aria-hidden="true">
                      {service.number}
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
                <p className="malaysia-office__address">
                  [Street Address], Rawang, Selangor [Postcode]
                </p>
                <div className="malaysia-office__meta">
                  <div className="malaysia-office__meta-item">
                    <span className="malaysia-office__meta-label">Phone/WhatsApp</span>
                    <a href={whatsappHref} className="malaysia-office__meta-value">
                      +91-99440-40345
                    </a>
                  </div>
                  <div className="malaysia-office__meta-item">
                    <span className="malaysia-office__meta-label">Hours</span>
                    <span className="malaysia-office__meta-value">
                      Monday–Friday, 9:00 AM – 6:00 PM MYT
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
    </div>
  )
}
