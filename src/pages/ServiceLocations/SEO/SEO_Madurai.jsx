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
} from '../../../utils/constants.js'
import '../../../styles/pages/seo-madurai.css'

/* ============================================================
   CONTENT, SEO Madurai
   ============================================================ */

const PAGE_TITLE =
  'SEO Agency in Madurai, Search Engine Optimization Tamil Nadu | Static Savvy Media'

const PAGE_DESCRIPTION =
  'SEO services in Madurai for businesses that want stronger Google visibility, better search rankings and qualified organic enquiries through technical SEO, keyword strategy, content and on-page optimization.'

const HERO_EYEBROW = 'SEO · MADURAI'

const HERO_TITLE =
  'SEO Agency in Madurai, Search Engine Optimization Tamil Nadu'

const HERO_PARAGRAPH =
  'Get your Madurai business in front of the right customers when they are actively searching for your products and services. Static Savvy Media combines technical SEO, keyword strategy, on-page optimization, content development, internal linking, schema and performance measurement to build sustainable organic search visibility.'

const SEO_SERVICES = [
  {
    number: '01',
    title: 'Technical SEO Audit & Foundation',
    content:
      'We analyze crawlability, Core Web Vitals, indexability, duplicate content, broken links, technical errors, schema markup and site architecture. A strong technical foundation is essential before expecting organic performance.',
  },
  {
    number: '02',
    title: 'Keyword Research & Strategy',
    content:
      'We map the complete buying journey from awareness to commercial intent. Keyword selection is based on search intent, relevance, competition and business value, not vanity metrics.',
  },
  {
    number: '03',
    title: 'On-Page Optimization',
    content:
      'We optimize title tags, meta descriptions, heading hierarchy, image alt text, internal linking, content structure, keyword clusters and FAQPage schema where appropriate.',
  },
  {
    number: '04',
    title: 'Content Development',
    content:
      'We create and improve service pages, location pages, blog content, FAQ hubs and supporting topical content that satisfies search intent and demonstrates Experience, Expertise, Authoritativeness and Trustworthiness.',
  },
]

const TECHNICAL_SEO = [
  'Crawlability and indexability',
  'Core Web Vitals performance',
  'Broken links and redirects',
  'Duplicate content issues',
  'Canonicalization',
  'XML sitemap optimization',
  'Robots.txt configuration',
  'Schema markup implementation',
  'Internal linking structure',
]

const KEYWORD_EXAMPLES = [
  { stage: 'Awareness', example: '"what is SEO?"' },
  { stage: 'Consideration', example: '"best SEO services"' },
  { stage: 'Commercial', example: '"SEO agency Madurai"' },
  { stage: 'Location', example: '"SEO company Madurai"' },
]

const ON_PAGE_ELEMENTS = [
  'Title tags and meta descriptions',
  'H1/H2/H3 heading hierarchy',
  'Target keyword clusters',
  'Content structure and formatting',
  'Image optimization and alt text',
  'Internal linking strategy',
  'FAQ content and FAQPage schema',
  'Schema markup implementation',
]

const CONTENT_TYPES = [
  { type: 'Service Pages', description: 'Detailed pages for each service offering' },
  { type: 'Location Pages', description: 'Location-specific landing pages' },
  { type: 'Blog Posts', description: 'Informative content addressing search queries' },
  { type: 'FAQ Content', description: 'Common questions and answers' },
  { type: 'Topical Content', description: 'Supporting content for topic authority' },
]

const INDUSTRIES = [
  {
    title: 'Retail & E-commerce',
    text: 'Help customers find your products when searching online in Madurai.',
  },
  {
    title: 'Professional Services',
    text: 'Connect with clients searching for accounting, legal and consulting services.',
  },
  {
    title: 'Healthcare',
    text: 'Reach patients searching for clinics, doctors and healthcare services.',
  },
  {
    title: 'Education & Training',
    text: 'Connect with students and parents searching for educational institutions.',
  },
  {
    title: 'Real Estate',
    text: 'Reach buyers and renters searching for properties in Madurai.',
  },
  {
    title: 'Manufacturing & B2B',
    text: 'Help B2B buyers discover your products and manufacturing services.',
  },
  {
    title: 'Hospitality & Restaurants',
    text: 'Attract diners and travellers searching for local experiences.',
  },
  {
    title: 'Local Service Businesses',
    text: 'Reach customers searching for plumbers, electricians and local services.',
  },
]

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'SEO Audit',
    text: 'Analyze technical foundation, content, keywords, internal links, schema and performance.',
  },
  {
    number: '02',
    title: 'Keyword Research',
    text: 'Map relevant keywords to search intent and business value.',
  },
  {
    number: '03',
    title: 'Technical SEO',
    text: 'Fix crawlability, indexability, performance and technical issues.',
  },
  {
    number: '04',
    title: 'On-Page Optimization',
    text: 'Optimize existing pages for target keyword clusters.',
  },
  {
    number: '05',
    title: 'Content Development',
    text: 'Create or improve service, location, blog and FAQ content.',
  },
  {
    number: '06',
    title: 'Authority & Internal Linking',
    text: 'Strengthen internal connections and appropriate authority signals.',
  },
  {
    number: '07',
    title: 'Measurement & Optimization',
    text: 'Use real performance data to continuously improve the SEO strategy.',
  },
]

const MEASUREMENT = [
  'Google Search Console data',
  'Google Analytics / GA4 insights',
  'Organic clicks and impressions',
  'Average position tracking',
  'Indexed pages monitoring',
  'Organic landing page performance',
  'Keyword visibility trends',
  'Conversions and enquiries where tracking is available',
]

const WHY_US = [
  {
    number: '01',
    title: 'Technical SEO Foundation',
    text: 'We build a strong technical foundation that search engines can crawl and index effectively.',
  },
  {
    number: '02',
    title: 'Search Intent + Keyword Strategy',
    text: 'We target keywords based on actual search intent and business relevance.',
  },
  {
    number: '03',
    title: 'Content + On-Page Optimization',
    text: 'We optimize content and on-page elements for sustainable organic visibility.',
  },
  {
    number: '04',
    title: 'SEO + GEO/AEO Integration',
    text: 'We integrate traditional SEO with GEO and AEO for comprehensive search visibility.',
  },
]

const RELATED_SERVICES = [
  { name: 'Local SEO', path: '/services/local-seo/' },
  { name: 'Google Ads', path: '/services/google-ads/' },
  { name: 'GEO & AEO', path: '/services/geo-aeo-ai-search/' },
  { name: 'Website Design & Development', path: '/services/website-design-development/' },
  { name: 'Social Media Marketing', path: '/services/social-media-marketing/' },
  { name: 'AI Business Automation', path: '/services/ai-business-automation/' },
]

const LOCATION_PAGES = [
  {
    name: 'Madurai',
    path: '/services/seo/madurai/',
    current: true,
  },
  {
    name: 'Thoothukudi',
    path: '/services/seo/thoothukudi/',
    current: false,
  },
  {
    name: 'Malaysia',
    path: '/services/seo/malaysia/',
    current: false,
  },
]

const FAQS = [
  {
    question: 'What does an SEO agency in Madurai do?',
    answer:
      'An SEO agency in Madurai helps businesses improve their organic search visibility through technical SEO, keyword research, on-page optimization, content development, internal linking, schema implementation and performance measurement. The goal is to connect businesses with people actively searching for their products or services.',
  },
  {
    question: 'How long does SEO take to show results?',
    answer:
      'Timelines vary based on competition, domain authority, technical condition, content quality, search demand, industry and existing visibility. Some improvements may be visible within weeks, while competitive keywords may take several months of consistent effort.',
  },
  {
    question: 'How much does SEO cost in Madurai?',
    answer:
      'SEO costs depend on the scope of work, competition and business objectives. We recommend starting with a consultation to understand your specific needs and providing a tailored recommendation. Visit our pricing page for more details.',
  },
  {
    question: 'Can SEO help local businesses in Madurai?',
    answer:
      'Yes. Traditional organic SEO and Local SEO can work together to improve your visibility. Organic SEO targets broader search queries while Local SEO focuses on Google Maps and local search results. For local businesses, we recommend both approaches.',
  },
  {
    question: 'Does SEO include Google Business Profile optimization?',
    answer:
      'Traditional SEO focuses on website optimization and organic search visibility. Google Business Profile optimization is part of Local SEO. For businesses targeting local customers, we recommend our Local SEO service which includes GBP optimization.',
  },
  {
    question: 'Do you provide monthly SEO reporting?',
    answer:
      'Yes. Performance is measured using actual Google Search Console and GA4 data where tracking is available. Reports include organic clicks, impressions, average position, indexed pages and other relevant metrics.',
  },
]

const CTA = {
  title: 'Ready to Grow Your Organic Visibility in Madurai?',
  subtitle:
    'Build a stronger search presence with technical SEO, keyword strategy, content, on-page optimization and data-driven measurement.',
  label: 'Get an SEO Consultation',
}

/* ============================================================
   COMPONENT
   ============================================================ */

export default function SEO_Madurai() {
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/services/seo/madurai/`,
      ogType: 'website',
      schema: [
        serviceSchema({
          name: 'SEO Services, Madurai',
          description: PAGE_DESCRIPTION,
          url: `${SITE_URL}/services/seo/madurai/`,
          areaServed: 'Madurai, Tamil Nadu',
          provider: 'Static Savvy Media',
        }),
        faqPageSchema(FAQS),
        breadcrumbListSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Services', url: `${SITE_URL}/services/` },
          { name: 'SEO', url: `${SITE_URL}/services/seo/` },
          { name: 'Madurai', url: `${SITE_URL}/services/seo/madurai/` },
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
              { label: 'SEO', to: '/services/seo/' },
              { label: 'Madurai' },
            ]}
          />
        </div>
      </section>

      {/* ---- Hero ---- */}
      <section className="section seo-mdu-hero-section">
        <div className="container">
          <div className="seo-mdu-hero">
            <div className="seo-mdu-hero__content">
              <ScrollReveal>
                <span className="seo-mdu-hero__badge">{HERO_EYEBROW}</span>
              </ScrollReveal>
              <ScrollReveal delay={80}>
                <h1 className="seo-mdu-hero__title">{formatTwoColorTitle(HERO_TITLE)}</h1>
              </ScrollReveal>
              <ScrollReveal delay={160}>
                <p className="seo-mdu-hero__paragraph">{HERO_PARAGRAPH}</p>
              </ScrollReveal>
              <ScrollReveal delay={240}>
                <div className="seo-mdu-hero__actions">
                  <Button href={whatsappHref} variant="primary" size="lg">
                    Get an SEO Consultation
                  </Button>
                  <Button to="/services/seo/" variant="outline" size="lg">
                    Explore SEO Services
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---- SEO That Moves the Needle ---- */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">SEO Results</span>
              <h2 className="section-heading__title">SEO That Moves the Needle for Madurai Businesses</h2>
              <p className="section-heading__subtitle">
                Ranking is not simply a vanity metric. The objective is to connect your business
                with people who are actively searching for relevant products or services.
                Search visibility leads to relevant traffic, which leads to qualified enquiries,
                which leads to business growth.
              </p>
            </div>
          </ScrollReveal>
          <div className="seo-mdu-flow">
            {['Search Visibility', 'Relevant Traffic', 'Qualified Enquiries', 'Business Growth'].map((step, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="seo-mdu-flow-step">
                  <span className="seo-mdu-flow-step__text">{step}</span>
                </div>
                {i < 3 && (
                  <div className="seo-mdu-flow-arrow" aria-hidden="true">
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

      {/* ---- What Our SEO Service Includes ---- */}
      <section className="section seo-mdu-services-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Services</span>
              <h2 className="section-heading__title">What Our SEO Service Includes</h2>
            </div>
          </ScrollReveal>
          <div className="seo-mdu-services-grid">
            {SEO_SERVICES.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="seo-mdu-service-card glass-card">
                  <span className="seo-mdu-service-card__number">{item.number}</span>
                  <h3 className="seo-mdu-service-card__title">{item.title}</h3>
                  <p className="seo-mdu-service-card__text">{item.content}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Technical SEO ---- */}
      <section className="section seo-mdu-technical-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Technical SEO</span>
              <h2 className="section-heading__title">Technical SEO for Madurai Websites</h2>
              <p className="section-heading__subtitle">
                A strong technical foundation is essential before expecting organic performance.
                We analyze and optimize the technical aspects of your website to ensure search
                engines can effectively crawl, index and understand your content.
              </p>
            </div>
          </ScrollReveal>
          <div className="seo-mdu-technical-grid">
            {TECHNICAL_SEO.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="seo-mdu-technical-item glass-card">
                  <span className="seo-mdu-technical-item__check" aria-hidden="true">✓</span>
                  <p className="seo-mdu-technical-item__text">{item}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Keyword Research ---- */}
      <section className="section seo-mdu-keyword-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Keywords</span>
              <h2 className="section-heading__title">Keyword Research for Madurai Businesses</h2>
              <p className="section-heading__subtitle">
                Keyword research maps the complete buying journey from awareness to commercial
                intent. We select keywords based on search intent, relevance, competition
                and business value.
              </p>
            </div>
          </ScrollReveal>
          <div className="seo-mdu-keyword-grid">
            {KEYWORD_EXAMPLES.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="seo-mdu-keyword-card glass-card">
                  <span className="seo-mdu-keyword-card__stage">{item.stage}</span>
                  <p className="seo-mdu-keyword-card__example">{item.example}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- On-Page SEO ---- */}
      <section className="section seo-mdu-onpage-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">On-Page SEO</span>
              <h2 className="section-heading__title">On-Page SEO Optimization</h2>
              <p className="section-heading__subtitle">
                We optimize individual pages to rank higher and earn more relevant traffic.
                On-page SEO covers both content and HTML source code optimizations.
              </p>
            </div>
          </ScrollReveal>
          <div className="seo-mdu-onpage-grid">
            {ON_PAGE_ELEMENTS.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="seo-mdu-onpage-item glass-card">
                  <span className="seo-mdu-onpage-item__check" aria-hidden="true">✓</span>
                  <p className="seo-mdu-onpage-item__text">{item}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Content Development ---- */}
      <section className="section seo-mdu-content-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Content</span>
              <h2 className="section-heading__title">Content Development for Madurai Businesses</h2>
              <p className="section-heading__subtitle">
                Thin content can weaken search performance. We create and improve content that
                satisfies search intent, demonstrates E-E-A-T and provides genuine value
                to your audience.
              </p>
            </div>
          </ScrollReveal>
          <div className="seo-mdu-content-grid">
            {CONTENT_TYPES.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="seo-mdu-content-card glass-card">
                  <h3 className="seo-mdu-content-card__title">{item.type}</h3>
                  <p className="seo-mdu-content-card__text">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Local SEO + SEO ---- */}
      <section className="section seo-mdu-local-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Local SEO</span>
              <h2 className="section-heading__title">Local SEO + SEO for Madurai</h2>
              <p className="section-heading__subtitle">
                Traditional organic SEO and Local SEO can work together. While organic SEO
                targets broader search visibility, Local SEO focuses on Google Maps and
                local search results. For Madurai businesses, we recommend both approaches.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <div className="seo-mdu-local-card glass-card">
              <h3 className="seo-mdu-local-card__title">Need Local SEO?</h3>
              <p className="seo-mdu-local-card__text">
                We also offer dedicated Local SEO services focused on Google Business Profile
                optimization, local citations, reviews and Google Maps visibility.
              </p>
              <Link to="/services/local-seo/madurai/" className="seo-mdu-local-card__link">
                Explore Local SEO Madurai
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
          </ScrollReveal>
        </div>
      </section>

      {/* ---- Industries ---- */}
      <section className="section seo-mdu-industries-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Industries</span>
              <h2 className="section-heading__title">SEO for Different Madurai Business Types</h2>
            </div>
          </ScrollReveal>
          <div className="seo-mdu-industry-grid">
            {INDUSTRIES.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="seo-mdu-industry-card glass-card">
                  <h3 className="seo-mdu-industry-card__title">{item.title}</h3>
                  <p className="seo-mdu-industry-card__text">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Process ---- */}
      <section className="section seo-mdu-process-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Process</span>
              <h2 className="section-heading__title">Our SEO Process for Madurai Businesses</h2>
            </div>
          </ScrollReveal>
          <div className="seo-mdu-process-grid">
            {PROCESS_STEPS.map((step, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="seo-mdu-process-card glass-card">
                  <span className="seo-mdu-process-card__number">{step.number}</span>
                  <h3 className="seo-mdu-process-card__title">{step.title}</h3>
                  <p className="seo-mdu-process-card__text">{step.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Measurement ---- */}
      <section className="section seo-mdu-measurement-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Measurement</span>
              <h2 className="section-heading__title">How We Measure SEO Performance</h2>
              <p className="section-heading__subtitle">
                We monitor performance through actual data from Google Search Console and
                GA4. Results are verified using real performance metrics, not estimates.
              </p>
            </div>
          </ScrollReveal>
          <div className="seo-mdu-measurement-grid">
            {MEASUREMENT.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="seo-mdu-measurement-item glass-card">
                  <span className="seo-mdu-measurement-item__check" aria-hidden="true">✓</span>
                  <p className="seo-mdu-measurement-item__text">{item}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Why Us ---- */}
      <section className="section seo-mdu-why-us-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Why Us</span>
              <h2 className="section-heading__title">Why Choose Static Savvy Media for SEO in Madurai?</h2>
            </div>
          </ScrollReveal>
          <div className="seo-mdu-why-us-grid">
            {WHY_US.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="seo-mdu-why-us-card glass-card">
                  <span className="seo-mdu-why-us-card__number">{item.number}</span>
                  <h3 className="seo-mdu-why-us-card__title">{item.title}</h3>
                  <p className="seo-mdu-why-us-card__text">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Related Services ---- */}
      <section className="section seo-mdu-related-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Explore More</span>
              <h2 className="section-heading__title">Related Services</h2>
            </div>
          </ScrollReveal>
          <div className="seo-mdu-related-links">
            {RELATED_SERVICES.map((item) => (
              <Link key={item.path} to={item.path} className="seo-mdu-related-link">
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
            <Link to="/faq/" className="seo-mdu-related-link">
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
      <section className="section seo-mdu-location-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Locations</span>
              <h2 className="section-heading__title">SEO Services by Location</h2>
            </div>
          </ScrollReveal>
          <div className="seo-mdu-location-grid">
            {LOCATION_PAGES.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                {item.current ? (
                  <div className="seo-mdu-location-card seo-mdu-location-card--current glass-card">
                    <span className="seo-mdu-location-card__badge">Current Location</span>
                    <h3 className="seo-mdu-location-card__title">{item.name}</h3>
                  </div>
                ) : (
                  <Link to={item.path} className="seo-mdu-location-card glass-card">
                    <h3 className="seo-mdu-location-card__title">{item.name}</h3>
                    <span className="seo-mdu-location-card__link">
                      Explore SEO {item.name}
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
        title="Frequently Asked Questions, SEO Madurai"
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
