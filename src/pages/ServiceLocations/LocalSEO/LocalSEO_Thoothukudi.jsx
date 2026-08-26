import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../../components/common/Breadcrumbs.jsx'
import Button from '../../../components/common/Button.jsx'
import FAQSection from '../../../components/sections/FAQSection.jsx'
import CTASection from '../../../components/sections/CTASection.jsx'
import { ScrollReveal } from '../../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../../utils/seo.js'
import {
  serviceSchema,
  faqPageSchema,
  breadcrumbListSchema,
} from '../../../utils/schema.js'
import { buildWhatsAppLink } from '../../../utils/helpers.js'
import {
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
  SITE_URL,
} from '../../../utils/constants.js'
import '../../../styles/pages/local-seo-thoothukudi.css'

/* ============================================================
   CONTENT, Local SEO Thoothukudi
   ============================================================ */

const PAGE_TITLE =
  'Local SEO Thoothukudi, GBP & Maps Ranking for Tuticorin Businesses | Static Savvy Media'

const PAGE_DESCRIPTION =
  'Local SEO in Thoothukudi for Tuticorin businesses. Improve Google Business Profile, Google Maps visibility, local citations, reviews, NAP consistency and location-specific search presence.'

const HERO_EYEBROW = 'LOCAL SEO · THOOTHUKUDI'

const HERO_TITLE =
  'Local SEO Thoothukudi, GBP & Maps Ranking for Tuticorin Businesses'

const HERO_PARAGRAPH =
  'Help your Thoothukudi business become more visible when customers search for products and services locally. Static Savvy Media provides Local SEO strategies focused on Google Business Profile optimization, Google Maps visibility, local citations, review strategy, NAP consistency and location-specific landing pages. For Thoothukudi, the strategy can be adapted to the city\'s industrial, marine, B2B, manufacturing, retail and local business environment.'

const WHAT_LOCAL_SEO_COVERS = [
  {
    number: '01',
    title: 'Google Business Profile Optimization',
    content:
      'Optimize your business category, services, business description, opening hours, photos, Q&A, posts and relevant business information. Your GBP is the single most important asset in local search.',
  },
  {
    number: '02',
    title: 'Local Citation Building',
    content:
      'Build consistent citations across authoritative and relevant directories including Justdial, IndiaMART, Sulekha, Google Maps, Bing Places and relevant industry directories.',
  },
  {
    number: '03',
    title: 'Review Strategy & Management',
    content:
      'Create a systematic process for requesting reviews through WhatsApp follow-ups, QR codes and post-service messaging. Respond to positive and negative reviews in ways that build trust.',
  },
  {
    number: '04',
    title: 'Local Landing Pages',
    content:
      'Create location-specific landing pages with local market context, location-specific service availability, relevant local content and appropriate trust signals for Thoothukudi.',
  },
]

const GBP_ELEMENTS = [
  'Business category and subcategories',
  'Services and product listings',
  'Business description with relevant keywords',
  'Accurate opening hours and special hours',
  'High-quality photos and videos',
  'Q&A section management',
  'Regular Google Posts',
  'Business information consistency',
]

const NAP_POINTS = [
  'Business name consistency across all platforms',
  'Address format matching website, GBP and directories',
  'Phone number consistency',
  'Website URL consistency',
  'Business hours accuracy',
]

const REVIEW_PROCESS = [
  { step: 'Satisfied Customer', description: 'Complete service or purchase' },
  { step: 'Review Request', description: 'WhatsApp follow-up or QR code' },
  { step: 'Google Review', description: 'Customer leaves a review on Google' },
  { step: 'Business Response', description: 'Professional response to review' },
  { step: 'Trust & Reputation', description: 'Build credibility over time' },
]

const INDUSTRIES = [
  {
    title: 'Port, Shipping & Logistics',
    text: 'Help customers find your freight, shipping, clearing and logistics services when searching in Thoothukudi.',
  },
  {
    title: 'Marine & Engineering',
    text: 'Reach clients searching for marine engineering, ship repair and offshore services in Thoothukudi.',
  },
  {
    title: 'Manufacturing & Industrial',
    text: 'Connect with B2B buyers searching for industrial products, components and manufacturing services.',
  },
  {
    title: 'Chemical & Process Industries',
    text: 'Help specialized chemical and process industry businesses become discoverable locally.',
  },
  {
    title: 'Fishing & Related Businesses',
    text: 'Reach customers searching for fishing-related products and services in Thoothukudi.',
  },
  {
    title: 'B2B & Export-Oriented Businesses',
    text: 'Support supplier and service discovery when buyers search by product, service or location.',
  },
  {
    title: 'Retail & Local Services',
    text: 'Help local customers find your retail business and local services through Google Maps and local search.',
  },
]

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Local SEO Audit',
    text: 'Review existing GBP, website, citations, NAP consistency, reviews and local landing pages.',
  },
  {
    number: '02',
    title: 'Google Business Profile Optimization',
    text: 'Optimize profile fields based on business category and location.',
  },
  {
    number: '03',
    title: 'Local Keyword Research',
    text: 'Identify relevant Thoothukudi, Tuticorin, near-me and service-specific search queries.',
  },
  {
    number: '04',
    title: 'Citation Optimization',
    text: 'Build, correct and maintain relevant citations.',
  },
  {
    number: '05',
    title: 'Review Strategy',
    text: 'Establish a systematic review-request and response process.',
  },
  {
    number: '06',
    title: 'Local Landing Pages',
    text: 'Create useful location-specific pages where appropriate.',
  },
  {
    number: '07',
    title: 'Monitoring & Optimization',
    text: 'Review local visibility and optimize based on actual performance data.',
  },
]

const COMPARISON = [
  {
    aspect: 'Focus',
    traditional: 'Broader organic search visibility',
    local: 'Location-based search intent, Google Maps and local results',
  },
  {
    aspect: 'Target',
    traditional: 'National or global audiences',
    local: 'Customers in specific geographic areas',
  },
  {
    aspect: 'Key Asset',
    traditional: 'Website content and backlinks',
    local: 'Google Business Profile and citations',
  },
  {
    aspect: 'Results',
    traditional: 'Organic rankings in search results',
    local: 'Local pack, Maps and near-me visibility',
  },
]

const WHY_US = [
  {
    number: '01',
    title: 'Thoothukudi Market Understanding',
    text: 'We understand the industrial, marine, B2B and local business environment of Thoothukudi.',
  },
  {
    number: '02',
    title: 'Google Business Profile + Website Optimization',
    text: 'We optimize both your GBP and website for maximum local visibility.',
  },
  {
    number: '03',
    title: 'Citations + Reviews + Local Content',
    text: 'A complete local SEO strategy covering all key ranking factors.',
  },
  {
    number: '04',
    title: 'SEO + Local SEO + GEO/AEO Integration',
    text: 'Local SEO works alongside broader SEO and AI search optimization.',
  },
]

const RELATED_SERVICES = [
  { name: 'SEO', path: '/services/seo/' },
  { name: 'Google Ads', path: '/services/google-ads/' },
  { name: 'GEO & AEO', path: '/services/geo-aeo-ai-search/' },
  { name: 'Website Design & Development', path: '/services/website-design-development/' },
  { name: 'Social Media Marketing', path: '/services/social-media-marketing/' },
  { name: 'AI Business Automation', path: '/services/ai-business-automation/' },
]

const LOCATION_PAGES = [
  {
    name: 'Madurai',
    path: '/services/local-seo/madurai/',
    current: false,
  },
  {
    name: 'Thoothukudi',
    path: '/services/local-seo/thoothukudi/',
    current: true,
  },
  {
    name: 'Malaysia',
    path: '/services/local-seo/malaysia/',
    current: false,
  },
]

const FAQS = [
  {
    question: 'What is the difference between SEO and Local SEO?',
    answer:
      'Standard SEO targets any search query regardless of location. Local SEO specifically targets queries with local intent, "near me," "in Thoothukudi", and focuses on the Google Maps pack (the three-business box above traditional results for local queries). Most local businesses need both, but Local SEO is usually the higher priority for brick-and-mortar and service-area businesses.',
  },
  {
    question: 'How long does it take to rank in Google Maps?',
    answer:
      'For low-competition local queries, GBP optimization may produce visible movement within 4–8 weeks. For competitive categories in larger cities, 3–6 months of consistent effort may be expected before reaching the top 3. Timelines vary based on competition, business category, existing authority, GBP quality, citations, reviews and local search demand.',
  },
  {
    question: 'Do I need a separate Google Business Profile for Thoothukudi?',
    answer:
      'Each physical location needs its own verified location-specific GBP. You cannot rank in Thoothukudi\'s local pack with a GBP registered in another location. Each GBP should be optimized for its specific local market.',
  },
  {
    question: 'Can Local SEO help industrial and B2B businesses in Thoothukudi?',
    answer:
      'Yes. Local SEO can help relevant industrial, marine, manufacturing and B2B businesses become more discoverable for location-specific and service-specific searches. When buyers search for specific products, services or suppliers in Thoothukudi, a well-optimized local presence can help your business appear in those results.',
  },
  {
    question: 'Can Local SEO work for businesses outside central Thoothukudi?',
    answer:
      'The strategy depends on the business\'s actual service area, physical location and eligibility for local search features. Businesses that serve specific areas or have physical locations can benefit from local SEO regardless of their exact position within Thoothukudi.',
  },
  {
    question: 'Does Local SEO work with Google Maps?',
    answer:
      'Yes. Local SEO directly impacts your visibility in Google Maps and the local pack. Google Business Profile optimization, citations, reviews and local content all contribute to how your business appears in Google Maps results.',
  },
]

const CTA = {
  title: 'Get Your Thoothukudi Business Found Locally',
  subtitle:
    'Build a stronger local search presence with Google Business Profile optimization, citations, reviews and location-focused content.',
  label: 'WhatsApp for Local SEO Consultation',
}

/* ============================================================
   COMPONENT
   ============================================================ */

export default function LocalSEO_Thoothukudi() {
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/services/local-seo/thoothukudi/`,
      ogType: 'website',
      schema: [
        serviceSchema({
          name: 'Local SEO Services, Thoothukudi',
          description: PAGE_DESCRIPTION,
          url: `${SITE_URL}/services/local-seo/thoothukudi/`,
          areaServed: 'Thoothukudi / Tuticorin, Tamil Nadu',
          provider: 'Static Savvy Media',
        }),
        faqPageSchema(FAQS),
        breadcrumbListSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Services', url: `${SITE_URL}/services/` },
          { name: 'Local SEO', url: `${SITE_URL}/services/local-seo/` },
          { name: 'Thoothukudi', url: `${SITE_URL}/services/local-seo/thoothukudi/` },
        ]),
      ],
    })
  }, [])

  const whatsappHref = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)

  return (
    <div className="page">
      {/* ---- Breadcrumbs ---- */}
      <section className="section" style={{ paddingTop: 'var(--space-lg)', paddingBottom: 0 }}>
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Services', to: '/services/' },
              { label: 'Local SEO', to: '/services/local-seo/' },
              { label: 'Thoothukudi' },
            ]}
          />
        </div>
      </section>

      {/* ---- Hero ---- */}
      <section className="section lseo-tut-hero-section">
        <div className="container">
          <div className="lseo-tut-hero">
            <div className="lseo-tut-hero__content">
              <ScrollReveal>
                <span className="lseo-tut-hero__badge">{HERO_EYEBROW}</span>
              </ScrollReveal>
              <ScrollReveal delay={80}>
                <h1 className="lseo-tut-hero__title">{HERO_TITLE}</h1>
              </ScrollReveal>
              <ScrollReveal delay={160}>
                <p className="lseo-tut-hero__paragraph">{HERO_PARAGRAPH}</p>
              </ScrollReveal>
              <ScrollReveal delay={240}>
                <div className="lseo-tut-hero__actions">
                  <Button href={whatsappHref} variant="primary" size="lg">
                    Get a Local SEO Consultation
                  </Button>
                  <Button to="/services/local-seo/" variant="outline" size="lg">
                    Explore Local SEO Services
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Why Local SEO ---- */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Why Local SEO</span>
              <h2 className="section-heading__title">Why Local SEO Matters for Thoothukudi Businesses</h2>
              <p className="section-heading__subtitle">
                Customers increasingly search with local intent, "near me," "in Thoothukudi,"
                "in Tuticorin," "[service] Thoothukudi." When customers search for a business near them,
                Google often shows the local map results before traditional organic results.
                Local SEO helps a business appear in the local map results for queries customers
                are actually typing.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- What Local SEO Covers ---- */}
      <section className="section lseo-tut-services-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Services</span>
              <h2 className="section-heading__title">What Local SEO Covers</h2>
            </div>
          </ScrollReveal>
          <div className="lseo-tut-services-grid">
            {WHAT_LOCAL_SEO_COVERS.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="lseo-tut-service-card glass-card">
                  <span className="lseo-tut-service-card__number">{item.number}</span>
                  <h3 className="lseo-tut-service-card__title">{item.title}</h3>
                  <p className="lseo-tut-service-card__text">{item.content}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- GBP Optimization ---- */}
      <section className="section lseo-tut-gbp-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">GBP</span>
              <h2 className="section-heading__title">Google Business Profile Optimization for Thoothukudi</h2>
              <p className="section-heading__subtitle">
                Your Google Business Profile is an important local search asset. Optimizing your
                GBP ensures potential customers find accurate, complete information when
                searching for your business or services in Thoothukudi.
              </p>
            </div>
          </ScrollReveal>
          <div className="lseo-tut-gbp-grid">
            {GBP_ELEMENTS.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="lseo-tut-gbp-item glass-card">
                  <span className="lseo-tut-gbp-item__check" aria-hidden="true">✓</span>
                  <p className="lseo-tut-gbp-item__text">{item}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- NAP Consistency ---- */}
      <section className="section lseo-tut-nap-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">NAP</span>
              <h2 className="section-heading__title">NAP Consistency for Thoothukudi Businesses</h2>
              <p className="section-heading__subtitle">
                Your business Name, Address and Phone information should be consistent across
                your website, Google Business Profile and relevant directories. Consistency
                helps search engines and users understand your business information.
              </p>
            </div>
          </ScrollReveal>
          <div className="lseo-tut-nap-grid">
            {NAP_POINTS.map((point, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="lseo-tut-nap-item glass-card">
                  <span className="lseo-tut-nap-item__check" aria-hidden="true">✓</span>
                  <p className="lseo-tut-nap-item__text">{point}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Citations ---- */}
      <section className="section lseo-tut-citations-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Citations</span>
              <h2 className="section-heading__title">Local Citations for Thoothukudi Businesses</h2>
              <p className="section-heading__subtitle">
                Relevant local citations can reinforce business information and local presence.
                For Thoothukudi, prioritize relevant industrial, marine, B2B and local-business
                directories where appropriate.
              </p>
            </div>
          </ScrollReveal>
          <div className="lseo-tut-citations-grid">
            {['Justdial', 'IndiaMART', 'Sulekha', 'Google Maps', 'Bing Places', 'Industry Directories'].map((dir, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="lseo-tut-citation-card glass-card">
                  <h3 className="lseo-tut-citation-card__title">{dir}</h3>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Reviews ---- */}
      <section className="section lseo-tut-reviews-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Reviews</span>
              <h2 className="section-heading__title">Reviews & Reputation Management</h2>
              <p className="section-heading__subtitle">
                Systematic review collection can support customer trust, local reputation,
                Google Business Profile activity and local search visibility. A structured
                approach helps build your online reputation over time.
              </p>
            </div>
          </ScrollReveal>
          <div className="lseo-tut-review-flow">
            {REVIEW_PROCESS.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="lseo-tut-review-step">
                  <div className="lseo-tut-review-step__number">{i + 1}</div>
                  <h3 className="lseo-tut-review-step__title">{item.step}</h3>
                  <p className="lseo-tut-review-step__text">{item.description}</p>
                </div>
                {i < REVIEW_PROCESS.length - 1 && (
                  <div className="lseo-tut-review-arrow" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Industries ---- */}
      <section className="section lseo-tut-industries-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Industries</span>
              <h2 className="section-heading__title">Local SEO for Thoothukudi Industries & Businesses</h2>
            </div>
          </ScrollReveal>
          <div className="lseo-tut-industry-grid">
            {INDUSTRIES.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="lseo-tut-industry-card glass-card">
                  <h3 className="lseo-tut-industry-card__title">{item.title}</h3>
                  <p className="lseo-tut-industry-card__text">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Process ---- */}
      <section className="section lseo-tut-process-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Process</span>
              <h2 className="section-heading__title">Our Local SEO Process for Thoothukudi</h2>
            </div>
          </ScrollReveal>
          <div className="lseo-tut-process-grid">
            {PROCESS_STEPS.map((step, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="lseo-tut-process-card glass-card">
                  <span className="lseo-tut-process-card__number">{step.number}</span>
                  <h3 className="lseo-tut-process-card__title">{step.title}</h3>
                  <p className="lseo-tut-process-card__text">{step.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Comparison ---- */}
      <section className="section lseo-tut-comparison-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Comparison</span>
              <h2 className="section-heading__title">Local SEO vs Traditional SEO</h2>
              <p className="section-heading__subtitle">
                Thoothukudi businesses may benefit from both Local SEO and traditional SEO.
                Local SEO specifically targets location-based search intent while
                traditional SEO focuses on broader organic visibility.
              </p>
            </div>
          </ScrollReveal>
          <div className="lseo-tut-comparison-table glass-card">
            <div className="lseo-tut-comparison-header">
              <span className="lseo-tut-comparison-header__aspect">Aspect</span>
              <span className="lseo-tut-comparison-header__traditional">Traditional SEO</span>
              <span className="lseo-tut-comparison-header__local">Local SEO</span>
            </div>
            {COMPARISON.map((row, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="lseo-tut-comparison-row">
                  <span className="lseo-tut-comparison-row__aspect">{row.aspect}</span>
                  <span className="lseo-tut-comparison-row__traditional">{row.traditional}</span>
                  <span className="lseo-tut-comparison-row__local">{row.local}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Why Us ---- */}
      <section className="section lseo-tut-why-us-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Why Us</span>
              <h2 className="section-heading__title">Why Choose Static Savvy Media for Local SEO in Thoothukudi?</h2>
            </div>
          </ScrollReveal>
          <div className="lseo-tut-why-us-grid">
            {WHY_US.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="lseo-tut-why-us-card glass-card">
                  <span className="lseo-tut-why-us-card__number">{item.number}</span>
                  <h3 className="lseo-tut-why-us-card__title">{item.title}</h3>
                  <p className="lseo-tut-why-us-card__text">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Related Services ---- */}
      <section className="section lseo-tut-related-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Explore More</span>
              <h2 className="section-heading__title">Related Services for Thoothukudi Businesses</h2>
            </div>
          </ScrollReveal>
          <div className="lseo-tut-related-links">
            {RELATED_SERVICES.map((item) => (
              <Link key={item.path} to={item.path} className="lseo-tut-related-link">
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
            <Link to="/faq/" className="lseo-tut-related-link">
              FAQ
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
          </div>
        </div>
      </section>

      {/* ---- Location Pages ---- */}
      <section className="section lseo-tut-location-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Locations</span>
              <h2 className="section-heading__title">Explore Local SEO by Location</h2>
            </div>
          </ScrollReveal>
          <div className="lseo-tut-location-grid">
            {LOCATION_PAGES.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                {item.current ? (
                  <div className="lseo-tut-location-card lseo-tut-location-card--current glass-card">
                    <span className="lseo-tut-location-card__badge">Current Location</span>
                    <h3 className="lseo-tut-location-card__title">{item.name}</h3>
                  </div>
                ) : (
                  <Link to={item.path} className="lseo-tut-location-card glass-card">
                    <h3 className="lseo-tut-location-card__title">{item.name}</h3>
                    <span className="lseo-tut-location-card__link">
                      Explore Local SEO {item.name}
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
                    </span>
                  </Link>
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <FAQSection
        eyebrow="FAQ"
        title="Frequently Asked Questions, Local SEO Thoothukudi"
        faqs={FAQS}
      />

      {/* ---- Final CTA ---- */}
      <CTASection
        title={CTA.title}
        subtitle={CTA.subtitle}
        primaryLabel={CTA.label}
        primaryHref={whatsappHref}
      />
    </div>
  )
}
