import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import ProcessSection from '../../components/sections/ProcessSection.jsx'
import FAQSection from '../../components/sections/FAQSection.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
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
      />

      {/* ---- What Our SEO Service Includes ---- */}
      <section className="section service-features">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">What We Deliver</span>
            <h2 className="section-heading__title">What Our SEO Service Includes</h2>
          </div>
          <div className="service-features__grid">
            {SERVICE_FEATURES.map((feature, index) => (
              <ScrollReveal key={feature.number} delay={index * 80}>
                <article className="service-feature-card">
                  <div className="service-feature-card__top">
                    <span className="service-feature-card__badge" aria-hidden="true">
                      {feature.number}
                    </span>
                    <span className="service-feature-card__number" aria-hidden="true">
                      {feature.number}
                    </span>
                  </div>
                  <h3 className="service-feature-card__title">{feature.title}</h3>
                  <p className="service-feature-card__text">{feature.text}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Our SEO Process ---- */}
      <ProcessSection
        eyebrow="Process"
        title="Our SEO Process"
        steps={PROCESS_STEPS}
      />

      {/* ---- SEO Pricing Link ---- */}
      <section className="section pricing-link-section">
        <div className="container">
          <div className="pricing-link-section__inner glass-card gradient-border">
            <div className="pricing-link-section__text">
              <h3>SEO Pricing</h3>
              <p>
                Transparent plans for Madurai, Thoothukudi, and Malaysia businesses. Starter,
                Growth, and Scale options available.
              </p>
            </div>
            <Button to="/pricing/seo/" variant="primary" size="lg">
              View SEO Pricing
              <svg
                width="16"
                height="16"
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
            </Button>
          </div>
        </div>
      </section>

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
    </div>
  )
}