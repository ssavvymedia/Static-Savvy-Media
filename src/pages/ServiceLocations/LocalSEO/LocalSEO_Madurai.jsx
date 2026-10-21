import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../../components/common/Breadcrumbs.jsx'
import Button from '../../../components/common/Button.jsx'
import { formatTwoColorTitle } from '../../../components/hero/HeroSection.jsx'
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
  GOOGLE_TRUST_LINE,
} from '../../../utils/constants.js'
import '../../../styles/pages/local-seo-madurai.css'

/* ============================================================
   CONTENT, Local SEO Madurai
   ============================================================ */

const PAGE_TITLE =
  'Local SEO Company in Madurai | Google Maps & GBP | Static Savvy Media'

const PAGE_DESCRIPTION =
  'Local SEO services in Madurai to rank on Google Maps. GBP optimisation, citations & reviews from a team rated 4.9★ from 108 Google reviews. WhatsApp us today.'

const HERO_EYEBROW = 'LOCAL SEO · MADURAI'

const HERO_TITLE =
  'Local SEO Company in Madurai, Rank on Google Maps & Get Found Near Me'

const HERO_PARAGRAPH =
  'When customers search for a business near them, Google often shows the local map results before traditional organic results. Static Savvy Media helps Madurai businesses improve their local search presence through Google Business Profile optimization, local citations, review strategy, local landing pages and consistent business information.'

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
      'Create location-specific landing pages with local market context, location-specific service availability, relevant local content and appropriate trust signals.',
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
    title: 'Retail',
    text: 'Help customers find your shop when searching for products in Madurai.',
  },
  {
    title: 'Healthcare & Clinics',
    text: 'Reach patients searching for doctors, clinics and healthcare services locally.',
  },
  {
    title: 'Education & Training',
    text: 'Connect with students and parents searching for educational institutions.',
  },
  {
    title: 'Hospitality',
    text: 'Attract travellers searching for hotels, restaurants and local experiences.',
  },
  {
    title: 'Real Estate',
    text: 'Reach buyers and renters searching for properties in Madurai.',
  },
  {
    title: 'Professional Services',
    text: 'Connect with clients searching for CA, legal, consulting and other professional services.',
  },
  {
    title: 'Restaurants & Food',
    text: 'Attract diners searching for restaurants, cafes and food delivery in Madurai.',
  },
  {
    title: 'Local Service Businesses',
    text: 'Reach customers searching for plumbers, electricians, mechanics and other local services.',
  },
]

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Local SEO Audit',
    text: 'Review existing GBP, website, citations, NAP consistency, local landing pages and reviews.',
  },
  {
    number: '02',
    title: 'Google Business Profile Optimization',
    text: 'Optimize the profile based on the business category and service offering.',
  },
  {
    number: '03',
    title: 'Local Keyword & Search Intent Research',
    text: 'Identify relevant Madurai and near-me search patterns.',
  },
  {
    number: '04',
    title: 'Citation & Directory Optimization',
    text: 'Build or correct relevant local citations across authoritative directories.',
  },
  {
    number: '05',
    title: 'Review Strategy',
    text: 'Create a systematic process for requesting and responding to customer reviews.',
  },
  {
    number: '06',
    title: 'Local Landing Pages',
    text: 'Create useful location-specific pages where appropriate.',
  },
  {
    number: '07',
    title: 'Monitoring & Optimization',
    text: 'Monitor visibility, profile activity, search behaviour and other relevant local SEO signals.',
  },
]

const COMPARISON = [
  {
    aspect: 'Focus',
    traditional: 'Broader organic search visibility',
    local: 'Location-based search intent and Google Maps visibility',
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
    title: 'Local Market Understanding',
    text: 'We understand the Madurai business environment and local search behaviour.',
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
  { name: 'Digital Marketing in Madurai', path: '/locations/madurai/' },
  { name: 'Contact', path: '/contact/' },
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
    current: true,
  },
  {
    name: 'Thoothukudi',
    path: '/services/local-seo/thoothukudi/',
    current: false,
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
      'Standard SEO targets any search query regardless of location. Local SEO specifically targets queries with local intent, "near me," "in Madurai", and focuses on the Google Maps pack (the three-business box above traditional results for local queries). Most local businesses need both, but Local SEO is usually the higher priority for brick-and-mortar and service-area businesses.',
  },
  {
    question: 'How long does it take to rank in Google Maps?',
    answer:
      'Timelines vary based on competition, business category, existing authority, GBP quality, citations, reviews and local search demand. For low-competition local queries, GBP optimization alone can produce visible movement within 4–8 weeks. For competitive categories, expect 3–6 months of consistent effort.',
  },
  {
    question: 'Do I need a separate Google Business Profile for each location?',
    answer:
      'Yes. Each eligible physical location should have its own verified location-specific GBP. You cannot rank in Madurai\'s local pack with a Thoothukudi GBP. Each GBP should be optimized for its specific local market.',
  },
  {
    question: 'Can Local SEO help a new Madurai business?',
    answer:
      'Yes. Establishing accurate business information, relevant local content, GBP setup and review processes can help build local visibility over time. New businesses should focus on complete GBP setup, consistent NAP information and building initial reviews.',
  },
  {
    question: 'Does Local SEO work with Google Maps?',
    answer:
      'Yes. Local SEO directly impacts your visibility in Google Maps and the local pack. Google Business Profile optimization, citations, reviews and local content all contribute to how your business appears in Google Maps results.',
  },
]

const CTA = {
  title: 'Get Your Madurai Business Found Locally',
  subtitle:
    'Improve your local search presence with a practical Local SEO strategy built around your Google Business Profile, website, citations, reviews and local customer intent.',
  label: 'WhatsApp for Local SEO Consultation',
}

/* ============================================================
   COMPONENT
   ============================================================ */

export default function LocalSEO_Madurai() {
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/services/local-seo/madurai/`,
      ogType: 'website',
      schema: [
        serviceSchema({
          name: 'Local SEO Services, Madurai',
          description: PAGE_DESCRIPTION,
          url: `${SITE_URL}/services/local-seo/madurai/`,
          areaServed: 'Madurai, Tamil Nadu',
          provider: 'Static Savvy Media',
        }),
        faqPageSchema(FAQS),
        breadcrumbListSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Services', url: `${SITE_URL}/services/` },
          { name: 'Local SEO', url: `${SITE_URL}/services/local-seo/` },
          { name: 'Madurai', url: `${SITE_URL}/services/local-seo/madurai/` },
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
              { label: 'Madurai' },
            ]}
          />
        </div>
      </section>

      {/* ---- Hero ---- */}
      <section className="section lseo-hero-section">
        <div className="container">
          <div className="lseo-hero">
            <div className="lseo-hero__content">
              <ScrollReveal>
                <span className="lseo-hero__badge">{HERO_EYEBROW}</span>
              </ScrollReveal>
              <ScrollReveal delay={80}>
                <h1 className="lseo-hero__title">{formatTwoColorTitle(HERO_TITLE)}</h1>
              </ScrollReveal>
              <ScrollReveal delay={160}>
                <p className="lseo-hero__paragraph">{HERO_PARAGRAPH}</p>
              </ScrollReveal>
              <ScrollReveal delay={240}>
                <div className="lseo-hero__actions">
                  <Button href={whatsappHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">
                    WhatsApp for a Free Consultation
                  </Button>
                  <Button to="/contact/" variant="outline" size="lg">
                    Contact Us
                  </Button>
                </div>
                <p className="lseo-hero__trust">{GOOGLE_TRUST_LINE}</p>
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
              <h2 className="section-heading__title">Why Local SEO Matters for Madurai Businesses</h2>
              <p className="section-heading__subtitle">
                Customers increasingly search with local intent, "near me," "in Madurai,"
                "best [service] Madurai." When customers search for a business near them,
                Google often shows the local map results before traditional organic results.
                If your business is not visible when a customer is actively searching for
                your service locally, that customer may choose a competitor.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- What Local SEO Covers ---- */}
      <section className="section lseo-services-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Services</span>
              <h2 className="section-heading__title">What Local SEO Covers</h2>
            </div>
          </ScrollReveal>
          <div className="lseo-services-grid">
            {WHAT_LOCAL_SEO_COVERS.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="lseo-service-card glass-card">
                  <span className="lseo-service-card__number">{item.number}</span>
                  <h3 className="lseo-service-card__title">{item.title}</h3>
                  <p className="lseo-service-card__text">{item.content}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- GBP Optimization ---- */}
      <section className="section lseo-gbp-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">GBP</span>
              <h2 className="section-heading__title">Google Business Profile Optimization for Madurai</h2>
              <p className="section-heading__subtitle">
                Your Google Business Profile is a critical local-search asset. Optimizing your
                GBP ensures potential customers find accurate, complete information when
                searching for your business or services in Madurai.
              </p>
            </div>
          </ScrollReveal>
          <div className="lseo-gbp-grid">
            {GBP_ELEMENTS.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="lseo-gbp-item glass-card">
                  <span className="lseo-gbp-item__check" aria-hidden="true">✓</span>
                  <p className="lseo-gbp-item__text">{item}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- NAP Consistency ---- */}
      <section className="section lseo-nap-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">NAP</span>
              <h2 className="section-heading__title">NAP Consistency, Name, Address & Phone</h2>
              <p className="section-heading__subtitle">
                Your business Name, Address and Phone information should be consistent across
                your website, Google Business Profile and relevant directories. Inconsistent
                business information can create confusion for search engines and users.
              </p>
            </div>
          </ScrollReveal>
          <div className="lseo-nap-grid">
            {NAP_POINTS.map((point, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="lseo-nap-item glass-card">
                  <span className="lseo-nap-item__check" aria-hidden="true">✓</span>
                  <p className="lseo-nap-item__text">{point}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Citations ---- */}
      <section className="section lseo-citations-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Citations</span>
              <h2 className="section-heading__title">Local Citations for Madurai Businesses</h2>
              <p className="section-heading__subtitle">
                Relevant citations reinforce business credibility and location signals.
                Consistent mentions of your business name, address and phone number across
                authoritative directories help search engines verify your business information.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- Reviews ---- */}
      <section className="section lseo-reviews-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Reviews</span>
              <h2 className="section-heading__title">Reviews & Reputation for Local Search</h2>
              <p className="section-heading__subtitle">
                Reviews contribute to customer trust and local search visibility. A systematic
                approach to requesting and responding to reviews helps build your online
                reputation over time.
              </p>
            </div>
          </ScrollReveal>
          <div className="lseo-review-flow">
            {REVIEW_PROCESS.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="lseo-review-step">
                  <div className="lseo-review-step__number">{i + 1}</div>
                  <h3 className="lseo-review-step__title">{item.step}</h3>
                  <p className="lseo-review-step__text">{item.description}</p>
                </div>
                {i < REVIEW_PROCESS.length - 1 && (
                  <div className="lseo-review-arrow" aria-hidden="true">
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
      <section className="section lseo-industries-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Industries</span>
              <h2 className="section-heading__title">Local SEO for Different Madurai Businesses</h2>
            </div>
          </ScrollReveal>
          <div className="lseo-industry-grid">
            {INDUSTRIES.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="lseo-industry-card glass-card">
                  <h3 className="lseo-industry-card__title">{item.title}</h3>
                  <p className="lseo-industry-card__text">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Process ---- */}
      <section className="section lseo-process-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Process</span>
              <h2 className="section-heading__title">Our Local SEO Process for Madurai</h2>
            </div>
          </ScrollReveal>
          <div className="lseo-process-grid">
            {PROCESS_STEPS.map((step, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="lseo-process-card glass-card">
                  <span className="lseo-process-card__number">{step.number}</span>
                  <h3 className="lseo-process-card__title">{step.title}</h3>
                  <p className="lseo-process-card__text">{step.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Comparison ---- */}
      <section className="section lseo-comparison-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Comparison</span>
              <h2 className="section-heading__title">Local SEO vs Traditional SEO</h2>
              <p className="section-heading__subtitle">
                Most local businesses benefit from both Local SEO and traditional SEO.
                Local SEO specifically targets location-based search intent while
                traditional SEO focuses on broader organic visibility.
              </p>
            </div>
          </ScrollReveal>
          <div className="lseo-comparison-table glass-card">
            <div className="lseo-comparison-header">
              <span className="lseo-comparison-header__aspect">Aspect</span>
              <span className="lseo-comparison-header__traditional">Traditional SEO</span>
              <span className="lseo-comparison-header__local">Local SEO</span>
            </div>
            {COMPARISON.map((row, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="lseo-comparison-row">
                  <span className="lseo-comparison-row__aspect">{row.aspect}</span>
                  <span className="lseo-comparison-row__traditional">{row.traditional}</span>
                  <span className="lseo-comparison-row__local">{row.local}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Why Us ---- */}
      <section className="section lseo-why-us-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Why Us</span>
              <h2 className="section-heading__title">Why Choose Static Savvy Media for Local SEO in Madurai?</h2>
            </div>
          </ScrollReveal>
          <div className="lseo-why-us-grid">
            {WHY_US.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="lseo-why-us-card glass-card">
                  <span className="lseo-why-us-card__number">{item.number}</span>
                  <h3 className="lseo-why-us-card__title">{item.title}</h3>
                  <p className="lseo-why-us-card__text">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Related Services ---- */}
      <section className="section lseo-related-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Explore More</span>
              <h2 className="section-heading__title">Related Services</h2>
            </div>
          </ScrollReveal>
          <div className="lseo-related-links">
            {RELATED_SERVICES.map((item) => (
              <Link key={item.path} to={item.path} className="lseo-related-link">
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
            <Link to="/faq/" className="lseo-related-link">
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
      <section className="section lseo-location-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Locations</span>
              <h2 className="section-heading__title">Explore Local SEO by Location</h2>
            </div>
          </ScrollReveal>
          <div className="lseo-location-grid">
            {LOCATION_PAGES.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                {item.current ? (
                  <div className="lseo-location-card lseo-location-card--current glass-card">
                    <span className="lseo-location-card__badge">Current Location</span>
                    <h3 className="lseo-location-card__title">{item.name}</h3>
                  </div>
                ) : (
                  <Link to={item.path} className="lseo-location-card glass-card">
                    <h3 className="lseo-location-card__title">{item.name}</h3>
                    <span className="lseo-location-card__link">
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
        title="Frequently Asked Questions, Local SEO Madurai"
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
