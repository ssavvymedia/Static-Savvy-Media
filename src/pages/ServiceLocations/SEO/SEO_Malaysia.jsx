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
import '../../../styles/pages/seo-malaysia.css'

/* ============================================================
   CONTENT, SEO Malaysia
   ============================================================ */

const PAGE_TITLE =
  'SEO Services Malaysia | SEO Agency for KL & Selangor | Static Savvy Media'

const PAGE_DESCRIPTION =
  'SEO services in Malaysia from our Rawang, Selangor office: technical SEO, English and Bahasa Malaysia keyword research, on-page SEO and content for google.com.my. Call +60 12-453 7030.'

const HERO_EYEBROW = 'SEO · MALAYSIA'

const HERO_TITLE =
  'SEO Services in Malaysia, SEO Agency for Kuala Lumpur & Selangor Businesses'

const HERO_PARAGRAPH =
  'Static Savvy Media is an SEO agency with an office in Rawang, Selangor, serving businesses across Kuala Lumpur, the Klang Valley and the rest of Malaysia. Get your Malaysian business in front of the right customers when they are actively searching for your products and services. Static Savvy Media combines technical SEO, keyword strategy, on-page optimization, content development, internal linking, schema and performance measurement to build sustainable organic search visibility.'

const SEO_SERVICES = [
  {
    number: '01',
    title: 'Technical SEO',
    content:
      'We analyze crawlability, Core Web Vitals, indexability, duplicate content, broken links, technical errors, schema markup and site architecture. A strong technical foundation is essential before expecting organic performance.',
  },
  {
    number: '02',
    title: 'Keyword Strategy',
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
  { stage: 'Commercial', example: '"SEO agency Malaysia"' },
  { stage: 'Location', example: '"SEO company Malaysia"' },
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
    title: 'SMEs',
    text: 'Help small and medium enterprises increase their online visibility and customer reach.',
  },
  {
    title: 'Retail & E-commerce',
    text: 'Help customers find your products when searching online in Malaysia.',
  },
  {
    title: 'Professional Services',
    text: 'Connect with clients searching for accounting, legal and consulting services.',
  },
  {
    title: 'B2B & Manufacturing',
    text: 'Help B2B buyers discover your products and manufacturing services.',
  },
  {
    title: 'Hospitality & Tourism',
    text: 'Attract travellers and diners searching for local experiences.',
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
    title: 'Local Services',
    text: 'Reach customers searching for plumbers, electricians and local services.',
  },
]

const MALAYSIA_SEARCH_FACTORS = [
  {
    title: 'English, Bahasa Malaysia and Chinese searches',
    text: 'Malaysian customers search in more than one language, often for the same service. We research English and Bahasa Malaysia keywords separately (and Chinese where your customers use it), then decide which pages need which language instead of translating everything.',
  },
  {
    title: 'Ranking on google.com.my, not just google.com',
    text: 'Results in Malaysia are localised. We track visibility for Malaysian searches in Google Search Console, set the right language and region signals, and build pages around the cities and states you actually serve.',
  },
  {
    title: 'Kuala Lumpur, Selangor and the Klang Valley',
    text: 'KL, Petaling Jaya, Shah Alam, Rawang and other Klang Valley areas behave like separate markets in search. Service pages are written for the areas you cover, with Local SEO and Google Maps for walk-in and nearby customers.',
  },
  {
    title: 'Mobile-first, WhatsApp-ready pages',
    text: 'Most Malaysian service enquiries start on a phone and continue on WhatsApp or a call. We make pages fast on mobile data and put clear call and WhatsApp actions where searchers decide.',
  },
]

const MALAYSIA_LINKS = [
  { name: 'Digital marketing agency in Malaysia', path: '/locations/malaysia/' },
  { name: 'Digital marketing agency in Kuala Lumpur', path: '/locations/kuala-lumpur/' },
  { name: 'SEO services in KL', path: '/services/seo/kuala-lumpur/' },
  { name: 'Local SEO and Google Maps in Malaysia', path: '/services/local-seo/malaysia/' },
  { name: 'SEO pricing in Malaysia', path: '/pricing/malaysia/seo/' },
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
    current: false,
  },
  {
    name: 'Thoothukudi',
    path: '/services/seo/thoothukudi/',
    current: false,
  },
  {
    name: 'Malaysia',
    path: '/services/seo/malaysia/',
    current: true,
  },
  {
    name: 'Kuala Lumpur',
    path: '/services/seo/kuala-lumpur/',
    current: false,
  },
]

const FAQS = [
  {
    question: 'What is SEO?',
    answer:
      'SEO (Search Engine Optimization) is the practice of improving your website\'s visibility in organic search results. It involves technical optimization, keyword research, on-page optimization, content development and authority building to help your business appear when customers search for relevant products or services.',
  },
  {
    question: 'How does SEO help a business?',
    answer:
      'SEO helps businesses connect with people who are actively searching for their products or services. By improving search visibility, businesses can attract relevant traffic, generate qualified enquiries and build sustainable organic growth.',
  },
  {
    question: 'What does an SEO agency do?',
    answer:
      'An SEO agency helps businesses improve their organic search visibility through technical SEO, keyword research, on-page optimization, content development, internal linking, schema implementation and performance measurement.',
  },
  {
    question: 'How long does SEO take?',
    answer:
      'Timelines vary based on competition, domain authority, technical condition, content quality, search demand, industry and existing visibility. Some improvements may be visible within weeks, while competitive keywords may take several months of consistent effort.',
  },
  {
    question: 'How much does SEO cost?',
    answer:
      'SEO costs depend on the scope of work, competition and business objectives. We recommend starting with a consultation to understand your specific needs. Visit our pricing page for more details.',
  },
  {
    question: 'Can SEO help Malaysian businesses?',
    answer:
      'Yes. SEO helps Malaysian businesses become more discoverable when customers actively search for relevant products and services. Both traditional organic SEO and Local SEO can work together to improve overall search visibility.',
  },
  {
    question: 'Where is your Malaysia office and which areas do you serve?',
    answer:
      'Our Malaysia office is in Rawang, Selangor. We provide SEO services to businesses in Rawang, Kuala Lumpur, Petaling Jaya, Shah Alam and the wider Klang Valley, and work with clients elsewhere in Malaysia remotely. You can call +60 12-453 7030 or message us on WhatsApp.',
  },
  {
    question: 'Do you do SEO in Bahasa Malaysia as well as English?',
    answer:
      'Yes. We research English and Bahasa Malaysia search terms separately, and Chinese where it matters for your customers, then plan which pages and content each language needs so Google can show the right version to the right searcher.',
  },
  {
    question: 'How much do SEO services cost in Malaysia?',
    answer:
      'It depends on how many services and locations you want to rank for, how competitive they are and the current condition of your website. See our Malaysia SEO pricing page for details, or book a consultation and we will recommend a scope for your business.',
  },
  {
    question: 'What is the difference between SEO and Local SEO?',
    answer:
      'Traditional SEO targets broader organic search visibility. Local SEO specifically targets location-based search intent and Google Maps/local search results. For businesses targeting local customers, both approaches are recommended.',
  },
  {
    question: 'How is SEO measured?',
    answer:
      'SEO performance is measured using actual data from Google Search Console and GA4. Key metrics include organic clicks, impressions, average position, indexed pages and conversions where tracking is available.',
  },
]

const CTA = {
  title: 'Ready to Grow Your Organic Visibility in Malaysia?',
  subtitle:
    'Build a stronger search presence with technical SEO, keyword strategy, on-page optimization and useful content aligned with search intent.',
  label: 'Get an SEO Consultation',
}

/* ============================================================
   COMPONENT
   ============================================================ */

export default function SEO_Malaysia() {
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/services/seo/malaysia/`,
      ogType: 'website',
      schema: [
        serviceSchema({
          name: 'SEO Services, Malaysia',
          description: PAGE_DESCRIPTION,
          url: `${SITE_URL}/services/seo/malaysia/`,
          areaServed: 'Malaysia',
          provider: 'Static Savvy Media',
        }),
        faqPageSchema(FAQS),
        breadcrumbListSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Services', url: `${SITE_URL}/services/` },
          { name: 'SEO', url: `${SITE_URL}/services/seo/` },
          { name: 'Malaysia', url: `${SITE_URL}/services/seo/malaysia/` },
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
              { label: 'Malaysia' },
            ]}
          />
        </div>
      </section>

      {/* ---- Hero ---- */}
      <section className="section seo-mys-hero-section">
        <div className="container">
          <div className="seo-mys-hero">
            <div className="seo-mys-hero__content">
              <ScrollReveal>
                <span className="seo-mys-hero__badge">{HERO_EYEBROW}</span>
              </ScrollReveal>
              <ScrollReveal delay={80}>
                <h1 className="seo-mys-hero__title">{formatTwoColorTitle(HERO_TITLE)}</h1>
              </ScrollReveal>
              <ScrollReveal delay={160}>
                <p className="seo-mys-hero__paragraph">{HERO_PARAGRAPH}</p>
              </ScrollReveal>
              <ScrollReveal delay={240}>
                <div className="seo-mys-hero__actions">
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

      {/* ---- SEO for Malaysian Businesses ---- */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">SEO Results</span>
              <h2 className="section-heading__title">SEO for Malaysian Businesses</h2>
              <p className="section-heading__subtitle">
                Ranking is not simply a vanity metric. The objective is to connect your business
                with people who are actively searching for relevant products or services.
                Search visibility leads to relevant traffic, which leads to qualified enquiries,
                which leads to business growth.
              </p>
            </div>
          </ScrollReveal>
          <div className="seo-mys-flow">
            {['Search Visibility', 'Relevant Traffic', 'Qualified Enquiries', 'Business Growth'].map((step, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="seo-mys-flow-step">
                  <span className="seo-mys-flow-step__text">{step}</span>
                </div>
                {i < 3 && (
                  <div className="seo-mys-flow-arrow" aria-hidden="true">
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
      <section className="section seo-mys-services-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Services</span>
              <h2 className="section-heading__title">What Our SEO Service Includes</h2>
            </div>
          </ScrollReveal>
          <div className="seo-mys-services-grid">
            {SEO_SERVICES.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="seo-mys-service-card glass-card">
                  <span className="seo-mys-service-card__number">{item.number}</span>
                  <h3 className="seo-mys-service-card__title">{item.title}</h3>
                  <p className="seo-mys-service-card__text">{item.content}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Technical SEO ---- */}
      <section className="section seo-mys-technical-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Technical SEO</span>
              <h2 className="section-heading__title">Technical SEO for Malaysia Websites</h2>
              <p className="section-heading__subtitle">
                A strong technical foundation is essential before expecting organic performance.
                We analyze and optimize the technical aspects of your website to ensure search
                engines can effectively crawl, index and understand your content.
              </p>
            </div>
          </ScrollReveal>
          <div className="seo-mys-technical-grid">
            {TECHNICAL_SEO.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="seo-mys-technical-item glass-card">
                  <span className="seo-mys-technical-item__check" aria-hidden="true">✓</span>
                  <p className="seo-mys-technical-item__text">{item}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Keyword Research ---- */}
      <section className="section seo-mys-keyword-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Keywords</span>
              <h2 className="section-heading__title">Keyword Research & Strategy for Malaysia</h2>
              <p className="section-heading__subtitle">
                Keyword research maps the complete buying journey from awareness to commercial
                intent. We select keywords based on search intent, relevance, competition
                and business value.
              </p>
            </div>
          </ScrollReveal>
          <div className="seo-mys-keyword-grid">
            {KEYWORD_EXAMPLES.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="seo-mys-keyword-card glass-card">
                  <span className="seo-mys-keyword-card__stage">{item.stage}</span>
                  <p className="seo-mys-keyword-card__example">{item.example}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- On-Page SEO ---- */}
      <section className="section seo-mys-onpage-section">
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
          <div className="seo-mys-onpage-grid">
            {ON_PAGE_ELEMENTS.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="seo-mys-onpage-item glass-card">
                  <span className="seo-mys-onpage-item__check" aria-hidden="true">✓</span>
                  <p className="seo-mys-onpage-item__text">{item}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Content Development ---- */}
      <section className="section seo-mys-content-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Content</span>
              <h2 className="section-heading__title">Content Development for Malaysian Businesses</h2>
              <p className="section-heading__subtitle">
                Thin content can weaken search performance. We create and improve content that
                satisfies search intent, demonstrates E-E-A-T and provides genuine value
                to your audience.
              </p>
            </div>
          </ScrollReveal>
          <div className="seo-mys-content-grid">
            {CONTENT_TYPES.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="seo-mys-content-card glass-card">
                  <h3 className="seo-mys-content-card__title">{item.type}</h3>
                  <p className="seo-mys-content-card__text">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- SEO + Local Search ---- */}
      {/* ---- SEO for the Malaysian market ---- */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Malaysia</span>
              <h2 className="section-heading__title">How SEO Works Differently in Malaysia</h2>
              <p className="section-heading__subtitle">
                SEO in Malaysia is not a copy of SEO anywhere else. Language, location and how
                people contact a business all change which pages rank and which pages win the enquiry.
              </p>
            </div>
          </ScrollReveal>
          <div className="seo-mys-services-grid">
            {MALAYSIA_SEARCH_FACTORS.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 80}>
                <div className="seo-mys-service-card glass-card">
                  <h3 className="seo-mys-service-card__title">{item.title}</h3>
                  <p className="seo-mys-service-card__text">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <p className="section-heading__subtitle" style={{ marginTop: 'var(--space-lg)' }}>
              More for Malaysian businesses:{' '}
              {MALAYSIA_LINKS.map((item, i) => (
                <span key={item.path}>
                  <Link to={item.path}>{item.name}</Link>
                  {i < MALAYSIA_LINKS.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section seo-mys-local-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Local SEO</span>
              <h2 className="section-heading__title">SEO + Local Search in Malaysia</h2>
              <p className="section-heading__subtitle">
                Traditional organic SEO and Local SEO can work together. While organic SEO
                targets broader search visibility, Local SEO focuses on Google Maps and
                local search results. For Malaysian businesses, we recommend both approaches.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <div className="seo-mys-local-card glass-card">
              <h3 className="seo-mys-local-card__title">Need Local SEO?</h3>
              <p className="seo-mys-local-card__text">
                We also offer dedicated Local SEO services focused on Google Business Profile
                optimization, local citations, reviews and Google Maps visibility.
              </p>
              <Link to="/services/local-seo/malaysia/" className="seo-mys-local-card__link">
                Explore Local SEO Malaysia
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
      <section className="section seo-mys-industries-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Industries</span>
              <h2 className="section-heading__title">SEO for Different Malaysian Business Types</h2>
            </div>
          </ScrollReveal>
          <div className="seo-mys-industry-grid">
            {INDUSTRIES.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="seo-mys-industry-card glass-card">
                  <h3 className="seo-mys-industry-card__title">{item.title}</h3>
                  <p className="seo-mys-industry-card__text">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Process ---- */}
      <section className="section seo-mys-process-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Process</span>
              <h2 className="section-heading__title">Our SEO Process</h2>
            </div>
          </ScrollReveal>
          <div className="seo-mys-process-grid">
            {PROCESS_STEPS.map((step, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="seo-mys-process-card glass-card">
                  <span className="seo-mys-process-card__number">{step.number}</span>
                  <h3 className="seo-mys-process-card__title">{step.title}</h3>
                  <p className="seo-mys-process-card__text">{step.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Measurement ---- */}
      <section className="section seo-mys-measurement-section">
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
          <div className="seo-mys-measurement-grid">
            {MEASUREMENT.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="seo-mys-measurement-item glass-card">
                  <span className="seo-mys-measurement-item__check" aria-hidden="true">✓</span>
                  <p className="seo-mys-measurement-item__text">{item}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Why Us ---- */}
      <section className="section seo-mys-why-us-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Why Us</span>
              <h2 className="section-heading__title">Why Choose Static Savvy Media for SEO in Malaysia?</h2>
            </div>
          </ScrollReveal>
          <div className="seo-mys-why-us-grid">
            {WHY_US.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="seo-mys-why-us-card glass-card">
                  <span className="seo-mys-why-us-card__number">{item.number}</span>
                  <h3 className="seo-mys-why-us-card__title">{item.title}</h3>
                  <p className="seo-mys-why-us-card__text">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Related Services ---- */}
      <section className="section seo-mys-related-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Explore More</span>
              <h2 className="section-heading__title">Related Services</h2>
            </div>
          </ScrollReveal>
          <div className="seo-mys-related-links">
            {RELATED_SERVICES.map((item) => (
              <Link key={item.path} to={item.path} className="seo-mys-related-link">
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
            <Link to="/faq/" className="seo-mys-related-link">
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
      <section className="section seo-mys-location-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Locations</span>
              <h2 className="section-heading__title">SEO Services by Location</h2>
            </div>
          </ScrollReveal>
          <div className="seo-mys-location-grid">
            {LOCATION_PAGES.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                {item.current ? (
                  <div className="seo-mys-location-card seo-mys-location-card--current glass-card">
                    <span className="seo-mys-location-card__badge">Current Location</span>
                    <h3 className="seo-mys-location-card__title">{item.name}</h3>
                  </div>
                ) : (
                  <Link to={item.path} className="seo-mys-location-card glass-card">
                    <h3 className="seo-mys-location-card__title">{item.name}</h3>
                    <span className="seo-mys-location-card__link">
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
        title="Frequently Asked Questions, SEO Malaysia"
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
