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
import '../../../styles/pages/seo-madurai.css'

/* ============================================================
   CONTENT, SEO Madurai
   ============================================================ */

const PAGE_TITLE =
  'SEO Company in Madurai | SEO Services & Agency | Static Savvy Media'

const PAGE_DESCRIPTION =
  'SEO company in Madurai rated 4.9★ from 100+ Google reviews. Technical, on-page and content SEO from ₹12,000/month that turns Google searches into enquiries.'

const HERO_EYEBROW = 'SEO · MADURAI'

const HERO_TITLE =
  'SEO Company in Madurai — SEO Services That Bring Real Enquiries'

const HERO_PARAGRAPH =
  'Static Savvy Media is an SEO company based in Madurai. We help local shops, clinics, schools, manufacturers and service businesses show up when people in Madurai and across Tamil Nadu search Google for what they sell. Get your Madurai business in front of the right customers when they are actively searching for your products and services. Static Savvy Media combines technical SEO, keyword strategy, on-page optimization, content development, internal linking, schema and performance measurement to build sustainable organic search visibility.'

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
    title: 'Textiles, Sarees & Garments',
    text: 'Madurai is known for Sungudi and silk sarees. We build category pages, product schema and Tamil + English content so buyers searching for sarees, wholesale fabrics or garment manufacturers find your shop, not just a marketplace listing.',
    link: { to: '/industries/textiles-madurai/', label: 'Textile marketing in Madurai' },
  },
  {
    title: 'Hospitals, Clinics & Diagnostics',
    text: 'Patients compare doctors online before they visit. We structure department and doctor pages, add MedicalClinic-friendly information and answer common treatment questions clearly, without making medical claims.',
    link: { to: '/industries/healthcare-clinics/', label: 'Healthcare marketing' },
  },
  {
    title: 'Hotels, Restaurants & Temple Tourism',
    text: 'Visitors to the Meenakshi Amman Temple and nearby attractions search for stays and food near the temple, the railway junction and the airport. We target those "near" searches with location pages and accurate business details.',
    link: { to: '/industries/hospitality-hotels/', label: 'Hospitality marketing' },
  },
  {
    title: 'Schools, Colleges & Coaching Centres',
    text: 'Parents and students search by course, area and admission season. We plan content around admission timelines and course-specific pages so you are visible when decisions are being made.',
    link: { to: '/industries/education-training/', label: 'Education marketing' },
  },
  {
    title: 'Jewellery, Retail & E-commerce',
    text: 'Jewellers and retailers on Town Hall Road, Masi Streets and beyond compete with national brands online. We focus on product and collection pages, local intent keywords and fast mobile pages.',
    link: { to: '/industries/retail-ecommerce/', label: 'Retail marketing' },
  },
  {
    title: 'Real Estate & Builders',
    text: 'Plot and apartment buyers search by locality: Anna Nagar, K.K. Nagar, Bypass Road, Thirunagar and the Ring Road corridor. We build project and locality pages that answer what buyers actually ask.',
    link: { to: '/industries/real-estate-builders/', label: 'Real estate marketing' },
  },
  {
    title: 'Manufacturing, Industrial & B2B',
    text: 'Buyers from other states look for suppliers in the Kappalur and Uchapatti industrial areas and around Madurai. We create product and capability pages that rank for specific B2B searches, not just your company name.',
  },
  {
    title: 'Professional & Local Services',
    text: 'Auditors, lawyers, architects, interior designers and home-service businesses win work from specific searches. We map each service to its own page so Google can match it to the right query.',
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

const MONTHLY_INCLUDES = [
  {
    title: 'Every month',
    items: [
      'Technical health check: crawl errors, indexing, Core Web Vitals and broken links',
      'On-page updates to priority pages: titles, meta descriptions, headings and internal links',
      'New or improved content (service pages, FAQs or blog posts) planned from real search queries',
      'Google Search Console and GA4 review, with a plain-language report and next steps',
    ],
  },
  {
    title: 'When the site needs it',
    items: [
      'Schema markup (Organization, LocalBusiness, Service, FAQ, Breadcrumb)',
      'Redirect plans when pages move, so you keep the rankings you already have',
      'Page speed and image optimisation on WordPress, Shopify, Wix or custom sites',
      'Tamil and English keyword targeting where your customers search in both',
    ],
  },
  {
    title: 'What we will not do',
    items: [
      'Promise a guaranteed #1 ranking. Nobody controls Google, and anyone who promises that is guessing',
      'Buy bulk backlinks or use private blog networks that risk a penalty',
      'Stuff keywords into your pages. We write for customers first',
      'Lock you into reports you cannot verify. You keep access to your own Search Console and analytics',
    ],
  },
]

const FIRST_90_DAYS = [
  {
    number: 'Weeks 1–2',
    title: 'Audit & baseline',
    text: 'We connect Search Console and GA4, crawl the site, record where you rank today for the searches that matter in Madurai, and list every issue in order of impact.',
  },
  {
    number: 'Weeks 3–6',
    title: 'Fix the foundations',
    text: 'Technical fixes, page titles and descriptions, heading structure, internal links and schema. These changes are often the quickest to show up in Search Console.',
  },
  {
    number: 'Weeks 7–10',
    title: 'Build the pages you are missing',
    text: 'Most Madurai business sites have one page trying to rank for everything. We create focused service and area pages, and FAQs based on what customers actually ask.',
  },
  {
    number: 'Weeks 11–13',
    title: 'Review & plan the next quarter',
    text: 'We compare clicks, impressions, positions and enquiries against the baseline, keep what is working and set priorities for the next three months.',
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
  { name: 'Digital Marketing in Madurai', path: '/locations/madurai/' },
  { name: 'Local SEO Madurai', path: '/services/local-seo/madurai/' },
  { name: 'Google Ads', path: '/services/google-ads/' },
  { name: 'GEO & AEO Madurai', path: '/services/geo-aeo-ai-search/madurai/' },
  { name: 'Website Design & Development', path: '/services/website-design-development/' },
  { name: 'Social Media Marketing Madurai', path: '/services/social-media-marketing/madurai/' },
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
  {
    name: 'Kuala Lumpur',
    path: '/services/seo/kuala-lumpur/',
    current: false,
  },
]

const FAQS = [
  {
    question: 'What is the difference between SEO services and Local SEO in Madurai?',
    answer:
      'SEO services improve how your website ranks in the normal Google results for searches like "textile wholesaler Madurai" or "best skin clinic in Madurai". Local SEO focuses on your Google Business Profile and the map results. Most Madurai businesses benefit from both, and we can run them together.',
  },
  {
    question: 'Do you guarantee first-page rankings?',
    answer:
      'No. Google does not let anyone guarantee positions, so we do not promise them. We agree on target searches, show you where you rank today, and report honestly on movement in clicks, impressions, positions and enquiries every month.',
  },
  {
    question: 'Can you do SEO for a Tamil-language or bilingual website?',
    answer:
      'Yes. Many customers in Madurai search in English, Tamil or a mix of both. We research both, and can create Tamil content and set the correct language tags so Google shows the right version.',
  },
  {
    question: 'Do I need a new website before starting SEO?',
    answer:
      'Usually not. We start with an audit of your current site. If the platform makes basic SEO impossible or the site is very slow, we will say so and explain the options, including our website development service.',
  },
  {
    question: 'Will I have to meet you in person?',
    answer:
      'Only if you want to. Our team is based in Madurai, so in-person meetings are easy to arrange, but most clients prefer WhatsApp updates and a short monthly call.',
  },
  {
    question: 'What does an SEO agency in Madurai do?',
    answer:
      'An SEO agency in Madurai improves how often your business appears in Google for the searches your customers use. An SEO agency in Madurai helps businesses improve their organic search visibility through technical SEO, keyword research, on-page optimization, content development, internal linking, schema implementation and performance measurement. The goal is to connect businesses with people actively searching for their products or services.',
  },
  {
    question: 'How long does SEO take to show results?',
    answer:
      'Most Madurai businesses see early movement in 1 to 3 months and steadier enquiries in 4 to 6 months; competitive city-wide terms can take 6 to 12 months. Technical and Google Business Profile fixes can show within weeks. Our guide "How long does SEO take for a Madurai business?" has the month-by-month timeline.',
  },
  {
    question: 'How much does SEO cost in Madurai?',
    answer:
      'Our SEO plans in India are ₹6,000 a month (Google Business Profile management with 12 posts), ₹12,000 a month (GBP + website SEO with 4 blogs) and ₹20,000 a month (GBP + website SEO + AEO + GEO), with no minimum contract term. Final pricing depends on scope, competition and how much content your site needs; full details are on our SEO pricing page for India.',
  },
  {
    question: 'Who is the best SEO company in Madurai?',
    answer:
      'The best SEO company in Madurai for you is the one that shows its process, publishes its prices, reports on enquiries rather than just rankings, and never promises guaranteed positions or sells bulk links. Static Savvy Media is a Madurai-based SEO company rated 4.9★ from 100+ Google reviews; compare us on those criteria alongside other agencies before you decide.',
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
          name: 'SEO Services in Madurai',
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
                  <Button href={whatsappHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">
                    WhatsApp for a Free Consultation
                  </Button>
                  <Button to="/contact/" variant="outline" size="lg">
                    Contact Us
                  </Button>
                </div>
                <p className="seo-mdu-hero__trust">
                  {GOOGLE_TRUST_LINE} · <Link to="/about/reviews/">Read our reviews</Link>
                </p>
                <p className="seo-mdu-hero__trust">
                  SEO plans from ₹6,000/month, no lock-in. <Link to="/pricing/india/seo/">See SEO pricing</Link>
                </p>
                <p className="seo-mdu-hero__trust">
                  Reviewed by <Link to="/about/deepan-kanz/">Deepan Kanz</Link>, founder · Last updated 25 October 2026
                </p>
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

      {/* ---- What's Included (monthly) ---- */}
      <section className="section seo-mdu-included-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">What You Get</span>
              <h2 className="section-heading__title">Your Monthly SEO Deliverables in Madurai</h2>
              <p className="section-heading__subtitle">
                Clear deliverables, so you always know what you are paying for.
              </p>
            </div>
          </ScrollReveal>
          <div className="seo-mdu-industry-grid">
            {MONTHLY_INCLUDES.map((group, i) => (
              <ScrollReveal key={group.title} delay={i * 80}>
                <div className="seo-mdu-industry-card glass-card">
                  <h3 className="seo-mdu-industry-card__title">{group.title}</h3>
                  <ul className="seo-mdu-industry-card__text">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- First 90 days ---- */}
      <section className="section seo-mdu-90-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Timeline</span>
              <h2 className="section-heading__title">Your First 90 Days With Our SEO Team</h2>
            </div>
          </ScrollReveal>
          <div className="seo-mdu-process-grid">
            {FIRST_90_DAYS.map((step) => (
              <ScrollReveal key={step.number}>
                <div className="seo-mdu-process-card glass-card">
                  <span className="seo-mdu-process-card__number">{step.number}</span>
                  <h3 className="seo-mdu-process-card__title">{step.title}</h3>
                  <p className="seo-mdu-process-card__text">{step.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <p className="section-heading__subtitle" style={{ marginTop: 'var(--space-lg)' }}>
            Want to see costs first? Compare our <Link to="/blog/affordable-seo-company-madurai-pricing/">affordable SEO plans in Madurai</Link> or see <Link to="/pricing/india/seo/">SEO pricing in India</Link>,
            or read our guide to <Link to="/blog/seo-vs-google-ads-madurai/">SEO vs Google Ads for Madurai businesses</Link>.
            For a realistic month-by-month view, read <Link to="/blog/how-long-does-seo-take-madurai/">how long SEO takes for a Madurai business</Link>,
            and if you are still deciding, <Link to="/blog/is-seo-worth-it-small-business-madurai/">whether SEO is worth it for a small business in Madurai</Link>.
          </p>
        </div>
      </section>

      {/* ---- Madurai office (NAP) ---- */}
      <section className="section">
        <div className="container">
          <div className="section-heading section-heading--left">
            <span className="section-heading__eyebrow">Madurai Office</span>
            <h2 className="section-heading__title">Meet Our SEO Team in Madurai</h2>
            <p className="section-heading__subtitle">
              Static Savvy Media, 2nd Floor, 4/3, Srinivasa Perumal Koil St, Kamarajar Salai, Madurai, Tamil Nadu 625009.
              Call or WhatsApp <a href="tel:+919944040345">+91 99440 40345</a>. We work with businesses across Madurai,
              including Anna Nagar, KK Nagar, Tallakulam, Goripalayam, Munichalai and the Meenakshi Amman Temple area,
              and with the rest of south Tamil Nadu. See our <Link to="/locations/madurai/">Madurai office page</Link> and our <Link to="/services/local-seo/madurai/">Local SEO service in Madurai</Link> for Google Maps visibility.
            </p>
          </div>
        </div>
      </section>

      {/* ---- Industries ---- */}
      <section className="section seo-mdu-industries-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Industries</span>
              <h2 className="section-heading__title">SEO for Madurai's Key Industries</h2>
              <p className="section-heading__subtitle">
                Search behaviour in Madurai is shaped by its textile trade, its hospitals,
                its colleges and the steady flow of temple visitors. We plan keywords around
                how your customers actually search, by product, by locality and by language.
              </p>
            </div>
          </ScrollReveal>
          <div className="seo-mdu-industry-grid">
            {INDUSTRIES.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="seo-mdu-industry-card glass-card">
                  <h3 className="seo-mdu-industry-card__title">{item.title}</h3>
                  <p className="seo-mdu-industry-card__text">{item.text}</p>
                  {item.link && (
                    <Link to={item.link.to} className="seo-mdu-local-card__link">
                      {item.link.label}
                    </Link>
                  )}
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
