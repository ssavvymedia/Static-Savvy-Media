import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import ProcessSection from '../../components/sections/ProcessSection.jsx'
import FAQSection from '../../components/sections/FAQSection.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import ContactFormSection from '../../components/sections/ContactFormSection.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import {
  serviceSchema,
  faqPageSchema,
  breadcrumbListSchema,
} from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import {
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
  SITE_URL,
} from '../../utils/constants.js'
import '../../styles/templates/service-template.css'
import seoHeroImg from '../../assets/images/services/01SEO.webp'

/* ============================================================
   CONTENT, Approved Static Savvy Media SEO Page Content
   ============================================================ */

const PAGE_TITLE =
  'SEO Services in Madurai & Tamil Nadu, Rank Higher, Get More Clients | Static Savvy Media'

const PAGE_DESCRIPTION =
  'Expert SEO services for Madurai, Thoothukudi, and Tamil Nadu businesses. Technical SEO, keyword strategy, content development, and link building. Results verified monthly via GSC and GA4.'

const HERO_SUBTITLE =
  'Ranking on page one of Google is not a vanity metric. It is the difference between a steady stream of inbound enquiries and spending every month chasing cold leads. Our SEO service is built around one outcome: getting your business in front of the right people at the exact moment they are ready to buy.'

const SERVICE_FEATURES = [
  {
    number: '01',
    title: 'Technical SEO Audit & Foundation',
    text: 'Before any content or links, the technical foundation must be right. We audit your site for crawlability issues, Core Web Vitals performance, indexability errors, duplicate content, broken links, and missing or incorrect schema markup. Most websites we audit have 15–30 fixable issues actively suppressing rankings. We fix them before anything else.',
  },
  {
    number: '02',
    title: 'Keyword Research & Strategy',
    text: 'We map every keyword your target audience uses across the full buying journey, from awareness queries (“what is SEO?”) to high-intent commercial queries (“SEO agency Madurai”). Every keyword has verified search volume, realistic competition assessment, and a clear link to business value. No vanity keywords with zero conversion potential.',
  },
  {
    number: '03',
    title: 'On-Page Optimisation',
    text: 'Every page is optimised for its target keyword cluster: title tags, meta descriptions, heading hierarchy, image alt text, internal linking, and content structure. We apply FAQPage schema to service and location pages, giving your business a second path to appearing in Google’s featured snippets and AI Overviews for the same query.',
  },
  {
    number: '04',
    title: 'Content Development',
    text: 'Thin content is the silent ranking killer. We audit existing pages for content depth and create new content where gaps exist: service pages, location pages, blog posts, and FAQ hubs. All content satisfies both search intent and E-E-A-T signals (Experience, Expertise, Authoritativeness, Trustworthiness) that Google uses to assess quality in 2026.',
  },
  {
    number: '05',
    title: 'Link Building & Authority',
    text: 'We build editorial backlinks from real websites with real audiences, industry publications, local directories, Tamil Nadu and Malaysia regional media. No link farms, PBNs, or paid link schemes. Every link would survive a manual Google review.',
  },
  {
    number: '06',
    title: 'Monthly Reporting',
    text: 'Every month: keyword position changes, organic traffic trends (GSC + GA4), conversion events (WhatsApp clicks), and a priority action list for the coming month. We distinguish between metrics we can influence and metrics reflecting real business impact, because the two are not always the same.',
  },
]

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discovery & Audit (Week 1–2)',
    text: 'Full technical audit, keyword gap analysis, competitor benchmarking, GSC and GA4 configuration.',
  },
  {
    number: '02',
    title: 'Strategy & Roadmap (Week 2–3)',
    text: 'Keyword map, content gap list, technical fix priority list, 90-day roadmap with clear milestones.',
  },
  {
    number: '03',
    title: 'Technical Fixes (Month 1)',
    text: 'Core Web Vitals, schema markup, crawlability, internal linking structure. Foundation first, always.',
  },
  {
    number: '04',
    title: 'On-Page & Content (Month 1–2)',
    text: 'Title tags, meta descriptions, heading structure, FAQ schema, and new content assets for identified gaps.',
  },
  {
    number: '05',
    title: 'Link Building (Month 2+)',
    text: 'Systematic editorial link acquisition from relevant, authoritative sources in your industry and location.',
  },
  {
    number: '06',
    title: 'Monthly Review & Iteration',
    text: 'Data review, ranking changes, content updates, and strategy refinement every 30 days.',
  },
]

const FAQS = [
  {
    question: 'How long does SEO take to show results?',
    answer:
      'For most Tamil Nadu and Malaysia businesses, measurable keyword movement within 60–90 days of technical fixes and on-page optimisation going live. Page one rankings for competitive keywords typically take 4–8 months. SEO compounds, results grow month on month once the foundation is in place.',
  },
  {
    question: 'What is the difference between SEO and Google Ads?',
    answer:
      'Google Ads gives immediate visibility at a cost-per-click. Stop spending, stop appearing. SEO builds organic rankings that continue delivering traffic without ongoing ad spend. Most businesses benefit from both, Ads for immediate results while SEO builds the long-term foundation.',
  },
  {
    question: 'Do I need to change my website for SEO?',
    answer:
      'Almost certainly yes. Most websites have technical or content issues actively suppressing rankings. The degree of change varies, some sites need minor fixes, others need significant restructuring. We audit your site before recommending anything and explain every change we propose.',
  },
  {
    question: 'Can you manage SEO for both India and Malaysia?',
    answer:
      'Yes. We manage multi-market SEO campaigns including hreflang implementation. We understand the keyword and content differences between Tamil Nadu and Malaysia markets and build separate strategies for each.',
  },
  {
    question: 'How is your SEO different from other agencies in Madurai?',
    answer:
      'We integrate GEO and AEO into every SEO engagement, optimising not just for Google’s blue links but for AI Overviews and AI search engines. Most agencies in Tamil Nadu are still building 2019-era SEO strategies. We build for where search is going in 2026 and beyond.',
  },
]

const RELATED_SERVICES = [
  { name: 'Local SEO', path: '/services/local-seo/' },
  { name: 'GEO & AEO, AI Search', path: '/services/geo-aeo-ai-search/' },
  { name: 'Google Ads', path: '/services/google-ads/' },
]

const RELATED_LOCATIONS = [
  { name: 'Madurai', path: '/services/seo/madurai/' },
  { name: 'Thoothukudi', path: '/services/seo/thoothukudi/' },
  { name: 'Malaysia', path: '/services/seo/malaysia/' },
]

const RELATED_INDUSTRIES = [
  { name: 'Retail & E-Commerce', path: '/industries/retail-ecommerce/' },
  { name: 'Healthcare & Clinics', path: '/industries/healthcare-clinics/' },
  { name: 'Education & Training', path: '/industries/education-training/' },
  { name: 'Hospitality & Hotels', path: '/industries/hospitality-hotels/' },
  { name: 'Textiles (Madurai)', path: '/industries/textiles-madurai/' },
]

const CTA = {
  title: 'See what SEO could do for your business.',
  subtitle:
    'Message us on WhatsApp for a free site audit, we will tell you exactly what is holding your rankings back.',
  label: 'WhatsApp for Free Site Audit',
}

/* ============================================================
   COMPONENT
   ============================================================ */

const seoFeatureStyles = {
  '01': {
    background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
    boxShadow: '0 0 15px rgba(168, 85, 247, 0.35)',
  },
  '02': {
    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    boxShadow: '0 0 15px rgba(59, 130, 246, 0.35)',
  },
  '03': {
    background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    boxShadow: '0 0 15px rgba(6, 182, 212, 0.35)',
  },
  '04': {
    background: 'linear-gradient(135deg, #f97316, #ea580c)',
    boxShadow: '0 0 15px rgba(249, 115, 22, 0.35)',
  },
  '05': {
    background: 'linear-gradient(135deg, #ec4899, #db2777)',
    boxShadow: '0 0 15px rgba(236, 72, 153, 0.35)',
  },
  '06': {
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    boxShadow: '0 0 15px rgba(34, 197, 94, 0.35)',
  },
}

function getSeoFeatureIcon(number) {
  switch (number) {
    case '01': // Technical SEO Audit
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '42%', height: '42%' }}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51-1z" />
        </svg>
      )
    case '02': // Keyword Research
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '42%', height: '42%' }}>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      )
    case '03': // On-Page
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '42%', height: '42%' }}>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <path d="M9 14l2 2 4-4" />
        </svg>
      )
    case '04': // Content
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '42%', height: '42%' }}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      )
    case '05': // Link Building
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '42%', height: '42%' }}>
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      )
    case '06': // Reporting
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '42%', height: '42%' }}>
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
          <path d="M3 20h18" />
        </svg>
      )
    default:
      return null
  }
}

export default function SEO() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/services/seo/`,
      ogType: 'website',
    })

    const faqEntities = FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    }))

    const seoService = serviceSchema({
      serviceType: 'SEO Services',
      name: 'SEO Services, Static Savvy Media',
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/services/seo/`,
      provider: {
        '@type': 'Organization',
        name: 'Static Savvy Media',
        url: SITE_URL,
      },
      areaServed: [
        { '@type': 'City', name: 'Madurai' },
        { '@type': 'City', name: 'Thoothukudi' },
        { '@type': 'Country', name: 'Malaysia' },
      ],
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Services', item: `${SITE_URL}/services/` },
        { name: 'SEO', item: `${SITE_URL}/services/seo/` },
      ],
    })

    const scripts = [
      seoService,
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
    <div className="service-template">
      {/* ---- Breadcrumbs ---- */}
      <Breadcrumbs />

      {/* ---- Hero ---- */}
      <HeroSection
        layout="two-column"
        title="SEO Services That Move the Needle, Madurai, Tamil Nadu & Malaysia"
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
      >
        <div className="hero__visual-side">
          <img src={seoHeroImg} width={1536} height={1024} fetchPriority="high" alt="SEO Services" className="hero__image" />
        </div>
      </HeroSection>

      {/* ---- What Our SEO Service Includes ---- */}
      <section className="section service-features">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">What We Deliver</span>
            <h2 className="section-heading__title">What Our SEO Service Includes</h2>
          </div>
          <div className="service-features__grid">
            {SERVICE_FEATURES.map((feature, index) => {
              const colorStyle = seoFeatureStyles[feature.number] || seoFeatureStyles['01']
              return (
                <ScrollReveal key={feature.number} delay={index * 80}>
                  <article className="service-feature-card">
                    <div className="service-feature-card__top">
                      <span
                        className="service-feature-card__badge"
                        aria-hidden="true"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '50%',
                          background: colorStyle.background,
                          boxShadow: colorStyle.boxShadow,
                        }}
                      >
                        {getSeoFeatureIcon(feature.number)}
                      </span>
                      <span className="service-feature-card__number" aria-hidden="true">
                        {feature.number}
                      </span>
                    </div>
                    <h3 className="service-feature-card__title">{feature.title}</h3>
                    <p className="service-feature-card__text">{feature.text}</p>
                  </article>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---- Our SEO Process ---- */}
      <ProcessSection
        eyebrow="Process"
        title="Our SEO Process"
        steps={PROCESS_STEPS}
      />


      {/* ---- Related Content ---- */}
      <section className="section related-content">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Explore More</span>
            <h2 className="section-heading__title">Related Services &amp; Locations</h2>
          </div>

          <div className="related-content__group">
            <h3 className="related-content__group-title">Related Services</h3>
            <div className="related-content__links">
              {RELATED_SERVICES.map((item) => (
                <Link key={item.path} to={item.path} className="related-content__link">
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

          <div className="related-content__group">
            <h3 className="related-content__group-title">Locations</h3>
            <div className="related-content__links">
              {RELATED_LOCATIONS.map((item) => (
                <Link key={item.path} to={item.path} className="related-content__link">
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

          <div className="related-content__group">
            <h3 className="related-content__group-title">Industries</h3>
            <div className="related-content__links">
              {RELATED_INDUSTRIES.map((item) => (
                <Link key={item.path} to={item.path} className="related-content__link">
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
        title="SEO, Frequently Asked Questions"
        faqs={FAQS}
      />

      {/* ---- Final CTA ---- */}
      <CTASection
        title={CTA.title}
        subtitle={CTA.subtitle}
        primaryLabel={CTA.label}
        primaryHref={whatsappHref}
      />
      <ContactFormSection />
    </div>
  )
}