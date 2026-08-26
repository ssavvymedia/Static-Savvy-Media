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
import '../../../styles/pages/local-seo-malaysia.css'

/* ============================================================
   CONTENT, Local SEO Malaysia
   ============================================================ */

const PAGE_TITLE =
  'Local SEO Malaysia, Google Maps Ranking for Selangor & Rawang Businesses | Static Savvy Media'

const PAGE_DESCRIPTION =
  'Local SEO Malaysia for businesses targeting Selangor and Rawang. Google Business Profile, Google Maps visibility, citations, reviews, NAP consistency and local landing pages.'

const HERO_EYEBROW = 'LOCAL SEO · MALAYSIA'

const HERO_TITLE =
  'Local SEO Malaysia, Google Maps Ranking for Selangor & Rawang Businesses'

const HERO_PARAGRAPH =
  'Help your business become more visible when customers search for products and services locally across Malaysia. Static Savvy Media provides Local SEO strategies focused on Google Business Profile optimization, Google Maps visibility, local citations, reviews, NAP consistency and location-specific landing pages. For businesses targeting Selangor and Rawang, the strategy should reflect the local market, customer intent and business location.'

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
      'Build consistent citations across authoritative and relevant directories including iProperty, Mymakan, Malaysia-specific business directories, Google Maps and relevant industry directories.',
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
    text: 'Help customers find your store when searching for products in Selangor and Rawang.',
  },
  {
    title: 'Professional Services',
    text: 'Connect with clients searching for accounting, legal, consulting and other professional services.',
  },
  {
    title: 'Hospitality',
    text: 'Attract travellers searching for hotels, resorts and local experiences in Malaysia.',
  },
  {
    title: 'Restaurants & Food',
    text: 'Reach diners searching for restaurants, cafes and food delivery in your area.',
  },
  {
    title: 'Real Estate',
    text: 'Connect with buyers and renters searching for properties in Selangor and Rawang.',
  },
  {
    title: 'Healthcare',
    text: 'Reach patients searching for clinics, doctors and healthcare services locally.',
  },
  {
    title: 'Education & Training',
    text: 'Connect with students and parents searching for educational institutions.',
  },
  {
    title: 'Local Service Businesses',
    text: 'Reach customers searching for plumbers, electricians, mechanics and other local services.',
  },
  {
    title: 'SMEs',
    text: 'Help small and medium enterprises increase their local visibility and customer reach.',
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
    text: 'Optimize the profile based on the business category and location.',
  },
  {
    number: '03',
    title: 'Local Keyword Research',
    text: 'Identify relevant Malaysia, Selangor, Rawang and near-me search intent.',
  },
  {
    number: '04',
    title: 'Citation Optimization',
    text: 'Build, clean and maintain relevant Malaysia-specific citations.',
  },
  {
    number: '05',
    title: 'Review Strategy',
    text: 'Create a systematic review-request and response process.',
  },
  {
    number: '06',
    title: 'Location Landing Pages',
    text: 'Build useful location-specific pages where appropriate.',
  },
  {
    number: '07',
    title: 'Monitoring & Optimization',
    text: 'Monitor local visibility and improve the strategy based on actual performance data.',
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
    title: 'Local Search Strategy',
    text: 'We understand the Malaysian business environment and local search behaviour.',
  },
  {
    number: '02',
    title: 'Google Business Profile + Website Optimization',
    text: 'We optimize both your GBP and website for maximum local visibility.',
  },
  {
    number: '03',
    title: 'Malaysia-Specific Citation & Local Content Strategy',
    text: 'Citations and content tailored to Malaysian directories and search patterns.',
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
    current: false,
  },
  {
    name: 'Malaysia',
    path: '/services/local-seo/malaysia/',
    current: true,
  },
]

const FAQS = [
  {
    question: 'What is Local SEO in Malaysia?',
    answer:
      'Local SEO in Malaysia is the practice of optimizing your online presence to attract more customers from relevant local searches. This includes optimizing your Google Business Profile, building local citations on Malaysian directories, managing reviews and creating location-specific landing pages for areas like Selangor and Rawang.',
  },
  {
    question: 'How does Google Maps SEO work in Malaysia?',
    answer:
      'Google Maps SEO involves optimizing your Google Business Profile, maintaining consistent business information across directories, building reviews and creating relevant local content. These factors help Google understand your business relevance for local searches in Malaysia.',
  },
  {
    question: 'Do Malaysian businesses need a Google Business Profile?',
    answer:
      'Yes. If your business serves customers in a specific location, a properly configured GBP is an important local search asset. It helps your business appear in Google Maps and local search results when customers search for your products or services in your area.',
  },
  {
    question: 'What directories are useful for Local SEO in Malaysia?',
    answer:
      'Relevant directories include iProperty, Mymakan, Malaysia-specific business directories, Google Maps and relevant industry directories. Consistent citations across these platforms help reinforce your business information and location signals.',
  },
  {
    question: 'How long does Local SEO take?',
    answer:
      'Timelines vary depending on competition, business category, location, existing authority, GBP quality, citations, reviews and local search demand. For low-competition areas, improvements may be visible within weeks. For competitive categories, expect consistent effort over several months.',
  },
  {
    question: 'Do I need separate Google Business Profiles for different physical locations?',
    answer:
      'Yes. Each eligible physical location needs its own verified, location-specific GBP. You cannot rank in one area with a GBP registered in another location. Each location should have accurate address information and be optimized for its local market.',
  },
]

const CTA = {
  title: 'Get Your Business Found Locally in Malaysia',
  subtitle:
    'Build a stronger local search presence with Google Business Profile optimization, local citations, reviews and location-focused content.',
  label: 'WhatsApp for Local SEO Consultation',
}

/* ============================================================
   COMPONENT
   ============================================================ */

export default function LocalSEO_Malaysia() {
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/services/local-seo/malaysia/`,
      ogType: 'website',
      schema: [
        serviceSchema({
          name: 'Local SEO Services, Malaysia',
          description: PAGE_DESCRIPTION,
          url: `${SITE_URL}/services/local-seo/malaysia/`,
          areaServed: 'Malaysia',
          provider: 'Static Savvy Media',
        }),
        faqPageSchema(FAQS),
        breadcrumbListSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Services', url: `${SITE_URL}/services/` },
          { name: 'Local SEO', url: `${SITE_URL}/services/local-seo/` },
          { name: 'Malaysia', url: `${SITE_URL}/services/local-seo/malaysia/` },
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
              { label: 'Malaysia' },
            ]}
          />
        </div>
      </section>

      {/* ---- Hero ---- */}
      <section className="section lseo-mys-hero-section">
        <div className="container">
          <div className="lseo-mys-hero">
            <div className="lseo-mys-hero__content">
              <ScrollReveal>
                <span className="lseo-mys-hero__badge">{HERO_EYEBROW}</span>
              </ScrollReveal>
              <ScrollReveal delay={80}>
                <h1 className="lseo-mys-hero__title">{HERO_TITLE}</h1>
              </ScrollReveal>
              <ScrollReveal delay={160}>
                <p className="lseo-mys-hero__paragraph">{HERO_PARAGRAPH}</p>
              </ScrollReveal>
              <ScrollReveal delay={240}>
                <div className="lseo-mys-hero__actions">
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
              <h2 className="section-heading__title">Why Local SEO Matters for Malaysian Businesses</h2>
              <p className="section-heading__subtitle">
                Customers increasingly search with local intent, "near me," "in Selangor,"
                "in Rawang," "[service] Malaysia." When customers search for a business near them,
                Google often shows the local map results before traditional organic results.
                Local search visibility can help businesses connect with customers who are
                actively searching for a relevant product or service in their area.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- What Local SEO Covers ---- */}
      <section className="section lseo-mys-services-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Services</span>
              <h2 className="section-heading__title">What Local SEO Covers</h2>
            </div>
          </ScrollReveal>
          <div className="lseo-mys-services-grid">
            {WHAT_LOCAL_SEO_COVERS.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="lseo-mys-service-card glass-card">
                  <span className="lseo-mys-service-card__number">{item.number}</span>
                  <h3 className="lseo-mys-service-card__title">{item.title}</h3>
                  <p className="lseo-mys-service-card__text">{item.content}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- GBP Optimization ---- */}
      <section className="section lseo-mys-gbp-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">GBP</span>
              <h2 className="section-heading__title">Google Business Profile Optimization in Malaysia</h2>
              <p className="section-heading__subtitle">
                Your Google Business Profile is an important local search asset. Optimizing your
                GBP ensures potential customers find accurate, complete information when
                searching for your business or services in Malaysia.
              </p>
            </div>
          </ScrollReveal>
          <div className="lseo-mys-gbp-grid">
            {GBP_ELEMENTS.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="lseo-mys-gbp-item glass-card">
                  <span className="lseo-mys-gbp-item__check" aria-hidden="true">✓</span>
                  <p className="lseo-mys-gbp-item__text">{item}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- NAP Consistency ---- */}
      <section className="section lseo-mys-nap-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">NAP</span>
              <h2 className="section-heading__title">NAP Consistency for Malaysian Businesses</h2>
              <p className="section-heading__subtitle">
                Your business Name, Address and Phone information should be consistent across
                your website, Google Business Profile and relevant directories. Consistency
                helps search engines and users understand your business information.
              </p>
            </div>
          </ScrollReveal>
          <div className="lseo-mys-nap-grid">
            {NAP_POINTS.map((point, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="lseo-mys-nap-item glass-card">
                  <span className="lseo-mys-nap-item__check" aria-hidden="true">✓</span>
                  <p className="lseo-mys-nap-item__text">{point}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Malaysia Citations ---- */}
      <section className="section lseo-mys-citations-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Citations</span>
              <h2 className="section-heading__title">Malaysia Local Citation Building</h2>
              <p className="section-heading__subtitle">
                Citation strategy should prioritize relevant, authoritative and Malaysia-specific
                directories. Consistent mentions of your business name, address and phone number
                across these platforms help reinforce your business credibility and location signals.
              </p>
            </div>
          </ScrollReveal>
          <div className="lseo-mys-citations-grid">
            <ScrollReveal>
              <div className="lseo-mys-citation-card glass-card">
                <h3 className="lseo-mys-citation-card__title">iProperty</h3>
                <p className="lseo-mys-citation-card__text">Malaysia property and business directory</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div className="lseo-mys-citation-card glass-card">
                <h3 className="lseo-mys-citation-card__title">Mymakan</h3>
                <p className="lseo-mys-citation-card__text">Malaysia business and directory platform</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <div className="lseo-mys-citation-card glass-card">
                <h3 className="lseo-mys-citation-card__title">Malaysia Business Directories</h3>
                <p className="lseo-mys-citation-card__text">Relevant Malaysia-specific business directories</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={240}>
              <div className="lseo-mys-citation-card glass-card">
                <h3 className="lseo-mys-citation-card__title">Industry Directories</h3>
                <p className="lseo-mys-citation-card__text">Relevant industry-specific directories</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ---- Reviews ---- */}
      <section className="section lseo-mys-reviews-section">
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
          <div className="lseo-mys-review-flow">
            {REVIEW_PROCESS.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="lseo-mys-review-step">
                  <div className="lseo-mys-review-step__number">{i + 1}</div>
                  <h3 className="lseo-mys-review-step__title">{item.step}</h3>
                  <p className="lseo-mys-review-step__text">{item.description}</p>
                </div>
                {i < REVIEW_PROCESS.length - 1 && (
                  <div className="lseo-mys-review-arrow" aria-hidden="true">
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
      <section className="section lseo-mys-industries-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Industries</span>
              <h2 className="section-heading__title">Local SEO for Businesses in Selangor & Rawang</h2>
            </div>
          </ScrollReveal>
          <div className="lseo-mys-industry-grid">
            {INDUSTRIES.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="lseo-mys-industry-card glass-card">
                  <h3 className="lseo-mys-industry-card__title">{item.title}</h3>
                  <p className="lseo-mys-industry-card__text">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Process ---- */}
      <section className="section lseo-mys-process-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Process</span>
              <h2 className="section-heading__title">Our Local SEO Process in Malaysia</h2>
            </div>
          </ScrollReveal>
          <div className="lseo-mys-process-grid">
            {PROCESS_STEPS.map((step, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="lseo-mys-process-card glass-card">
                  <span className="lseo-mys-process-card__number">{step.number}</span>
                  <h3 className="lseo-mys-process-card__title">{step.title}</h3>
                  <p className="lseo-mys-process-card__text">{step.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Comparison ---- */}
      <section className="section lseo-mys-comparison-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Comparison</span>
              <h2 className="section-heading__title">Local SEO vs Traditional SEO</h2>
              <p className="section-heading__subtitle">
                Many local businesses benefit from both Local SEO and traditional SEO.
                Local SEO specifically targets location-based search intent while
                traditional SEO focuses on broader organic visibility.
              </p>
            </div>
          </ScrollReveal>
          <div className="lseo-mys-comparison-table glass-card">
            <div className="lseo-mys-comparison-header">
              <span className="lseo-mys-comparison-header__aspect">Aspect</span>
              <span className="lseo-mys-comparison-header__traditional">Traditional SEO</span>
              <span className="lseo-mys-comparison-header__local">Local SEO</span>
            </div>
            {COMPARISON.map((row, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="lseo-mys-comparison-row">
                  <span className="lseo-mys-comparison-row__aspect">{row.aspect}</span>
                  <span className="lseo-mys-comparison-row__traditional">{row.traditional}</span>
                  <span className="lseo-mys-comparison-row__local">{row.local}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Why Us ---- */}
      <section className="section lseo-mys-why-us-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Why Us</span>
              <h2 className="section-heading__title">Why Choose Static Savvy Media for Local SEO Malaysia?</h2>
            </div>
          </ScrollReveal>
          <div className="lseo-mys-why-us-grid">
            {WHY_US.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="lseo-mys-why-us-card glass-card">
                  <span className="lseo-mys-why-us-card__number">{item.number}</span>
                  <h3 className="lseo-mys-why-us-card__title">{item.title}</h3>
                  <p className="lseo-mys-why-us-card__text">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Related Services ---- */}
      <section className="section lseo-mys-related-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Explore More</span>
              <h2 className="section-heading__title">Related Services</h2>
            </div>
          </ScrollReveal>
          <div className="lseo-mys-related-links">
            {RELATED_SERVICES.map((item) => (
              <Link key={item.path} to={item.path} className="lseo-mys-related-link">
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
            <Link to="/faq/" className="lseo-mys-related-link">
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
      <section className="section lseo-mys-location-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Locations</span>
              <h2 className="section-heading__title">Explore Local SEO by Location</h2>
            </div>
          </ScrollReveal>
          <div className="lseo-mys-location-grid">
            {LOCATION_PAGES.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                {item.current ? (
                  <div className="lseo-mys-location-card lseo-mys-location-card--current glass-card">
                    <span className="lseo-mys-location-card__badge">Current Location</span>
                    <h3 className="lseo-mys-location-card__title">{item.name}</h3>
                  </div>
                ) : (
                  <Link to={item.path} className="lseo-mys-location-card glass-card">
                    <h3 className="lseo-mys-location-card__title">{item.name}</h3>
                    <span className="lseo-mys-location-card__link">
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
        title="Frequently Asked Questions, Local SEO Malaysia"
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
