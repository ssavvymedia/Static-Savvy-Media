import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../../components/common/Breadcrumbs.jsx'
import Button from '../../../components/common/Button.jsx'
import HeroSection from '../../../components/hero/HeroSection.jsx'
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
import '../../../styles/pages/google-ads-thoothukudi.css'
import heroImage from '../../../assets/images/GoogleAds/GoogleAds.webp'

/* ============================================================
   CONTENT, Google Ads Thoothukudi
   ============================================================ */

const PAGE_TITLE =
  'Google Ads Agency Thoothukudi, PPC for Port, Marine & Industrial Sectors | Static Savvy Media'

const PAGE_DESCRIPTION =
  'Google Ads management in Thoothukudi for industrial, marine, manufacturing, B2B and local businesses. Search, Display, Performance Max, Shopping and remarketing campaigns with conversion tracking.'

const HERO_EYEBROW = 'GOOGLE ADS · THOOTHUKUDI'

const HERO_TITLE =
  'Google Ads Agency Thoothukudi, PPC for Port, Marine & Industrial Sectors'

const HERO_PARAGRAPH =
  'Put your Thoothukudi business in front of high-intent buyers when they are actively searching for your products or services. Static Savvy Media builds conversion-focused Google Ads campaigns for Thoothukudi businesses, with particular attention to the city\'s industrial, marine, manufacturing, logistics, B2B and local-business environment.'

const WHY_GOOGLE_ADS_THOOTHUKUDI = [
  {
    title: 'Port, Shipping & Logistics',
    text: 'Procurement teams and businesses searching for freight, shipping, clearing agents and logistics support in Thoothukudi.',
  },
  {
    title: 'Marine & Engineering',
    text: 'Industrial buyers looking for marine engineering, ship repair and offshore services.',
  },
  {
    title: 'Manufacturing & Industrial',
    text: 'B2B buyers searching for specific industrial products, components and manufacturing services.',
  },
  {
    title: 'Chemical & Process Industries',
    text: 'Specialised chemical and process industry buyers searching for suppliers and service providers.',
  },
  {
    title: 'B2B Suppliers & Service Providers',
    text: 'Businesses searching for specialised B2B services, equipment and industrial supplies.',
  },
  {
    title: 'Retail & Local Businesses',
    text: 'Local customers searching for products, services and businesses in Thoothukudi.',
  },
]

const CAMPAIGN_TYPES = [
  {
    number: '01',
    title: 'Search Campaigns',
    content:
      'Text ads targeting high-intent commercial and local keywords, people actively looking for what you sell right now.',
  },
  {
    number: '02',
    title: 'Display Campaigns',
    content:
      'Visual ads across Google\'s display network for brand awareness and retargeting audiences who\'ve visited your site.',
  },
  {
    number: '03',
    title: 'Shopping Campaigns',
    content:
      'For e-commerce, product listing ads showing your product image, price, and name directly in search results.',
  },
  {
    number: '04',
    title: 'Remarketing',
    content:
      'Re-engage visitors who didn\'t convert on their first visit, typically the highest-ROI campaign type once traffic volume is sufficient.',
  },
  {
    number: '05',
    title: 'Performance Max',
    content:
      'Google\'s AI-optimised campaign type. Proper campaign configuration, conversion tracking and audience signals are important for performance.',
  },
]

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Audit & Account Setup',
    text: 'For new accounts: set up correctly from day one. For existing accounts: audit for wasted spend, quality score issues, and conversion tracking errors, the most common problems we find when taking over from other agencies.',
  },
  {
    number: '02',
    title: 'Keyword & Audience Strategy',
    text: 'Research high-intent keywords, select appropriate match types, build negative keyword lists and layer audience signals. Focus on commercial intent and buyer-ready searches.',
  },
  {
    number: '03',
    title: 'Campaign & Ad Creation',
    text: 'Build structured campaigns with targeted ad groups, responsive search ads, relevant extensions and assets, and audience signals where appropriate.',
  },
  {
    number: '04',
    title: 'Landing Page & Conversion Tracking',
    text: 'Ensure traffic reaches relevant pages. Set up or validate conversion tracking for forms, calls, WhatsApp enquiries and relevant conversion events.',
  },
  {
    number: '05',
    title: 'Optimization & Reporting',
    text: 'Monitor search terms, CPC, CTR, conversions, cost per conversion and overall campaign performance. Optimise based on actual data.',
  },
]

const INDUSTRIES = [
  {
    number: '01',
    title: 'Port, Shipping & Logistics',
    text: 'Targeted Google Ads campaigns for freight, shipping, clearing and logistics businesses in Thoothukudi.',
  },
  {
    number: '02',
    title: 'Marine & Engineering',
    text: 'Reach industrial buyers searching for marine engineering, ship repair and offshore services.',
  },
  {
    number: '03',
    title: 'Manufacturing & Industrial',
    text: 'Connect with B2B buyers searching for industrial products, components and manufacturing services.',
  },
  {
    number: '04',
    title: 'Chemical & Process Industries',
    text: 'Reach specialised buyers in chemical and process industries searching for suppliers and service providers.',
  },
  {
    number: '05',
    title: 'B2B Suppliers & Service Providers',
    text: 'Connect with businesses searching for specialised B2B services, equipment and industrial supplies.',
  },
  {
    number: '06',
    title: 'Retail & Local Businesses',
    text: 'Reach local customers searching for products, services and businesses in Thoothukudi.',
  },
  {
    number: '07',
    title: 'Hospitality & Tourism',
    text: 'Target travellers and businesses searching for hospitality and tourism services in Thoothukudi.',
  },
]

const B2B_POINTS = [
  'Commercial-intent keywords for industrial and B2B searches',
  'Product and service-specific targeting for specialised buyers',
  'Location targeting around Thoothukudi and surrounding areas',
  'Negative keywords to filter irrelevant consumer searches',
  'Qualified lead forms and phone enquiry tracking',
  'Landing page relevance for industrial and B2B audiences',
  'Conversion tracking for lead generation campaigns',
]

const WHY_US = [
  {
    number: '01',
    title: 'Local Market Understanding',
    text: 'We understand the industrial, marine, B2B and local-business environment of Thoothukudi.',
  },
  {
    number: '02',
    title: 'Conversion-Focused Campaigns',
    text: 'Campaigns are designed around business outcomes rather than click volume alone.',
  },
  {
    number: '03',
    title: 'Tracking & Transparency',
    text: 'Track important conversion actions and campaign performance with clear reporting.',
  },
  {
    number: '04',
    title: 'SEO + Ads Integration',
    text: 'Google Ads can work alongside SEO, Local SEO and GEO/AEO to build a stronger overall search presence.',
  },
]

const RELATED_SERVICES = [
  { name: 'SEO Services', path: '/services/seo/' },
  { name: 'Local SEO', path: '/services/local-seo/' },
  { name: 'GEO & AEO', path: '/services/geo-aeo-ai-search/' },
  { name: 'Website Design & Development', path: '/services/website-design-development/' },
  { name: 'Social Media Marketing', path: '/services/social-media-marketing/' },
  { name: 'AI Business Automation', path: '/services/ai-business-automation/' },
]

const FAQS = [
  {
    question: 'What does a Google Ads agency in Thoothukudi do?',
    answer:
      'A Google Ads agency in Thoothukudi manages your paid advertising campaigns on Google. This includes campaign planning, keyword research, ad creation, audience targeting, conversion tracking and ongoing optimisation to ensure your budget reaches the right audience.',
  },
  {
    question: 'Is Google Ads useful for industrial businesses in Thoothukudi?',
    answer:
      'Yes. High-intent search campaigns can be useful for industrial, marine, manufacturing and B2B businesses when customers are actively searching for relevant products or services. Google Ads puts your business in front of buyers at the exact moment they are looking.',
  },
  {
    question: 'Can Google Ads generate B2B leads in Thoothukudi?',
    answer:
      'Yes, when campaigns are built around relevant commercial intent, precise targeting, appropriate landing pages and proper conversion tracking. Lead quality depends on the business, offer, market and campaign setup.',
  },
  {
    question: 'How much should a Thoothukudi business spend on Google Ads?',
    answer:
      'There is no universal budget. Budget should depend on search demand, competition, customer value, conversion rates and business objectives. We recommend starting with a controlled test budget and scaling based on actual performance.',
  },
  {
    question: 'Can you manage an existing Google Ads account?',
    answer:
      'Yes. Existing accounts can be audited for campaign structure, wasted spend, keyword targeting, conversion tracking and optimisation opportunities.',
  },
]

const CTA = {
  title: 'Ready to Reach More Customers in Thoothukudi?',
  subtitle: 'Let\'s build a Google Ads strategy around the searches that matter to your business.',
  label: 'WhatsApp for Google Ads Consultation',
}

/* ============================================================
   COMPONENT
   ============================================================ */

export default function GoogleAds_Thoothukudi() {
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/services/google-ads/thoothukudi/`,
      ogType: 'website',
      schema: [
        serviceSchema({
          name: 'Google Ads Management, Thoothukudi',
          description: PAGE_DESCRIPTION,
          url: `${SITE_URL}/services/google-ads/thoothukudi/`,
          areaServed: 'Thoothukudi, Tamil Nadu',
          provider: 'Static Savvy Media',
        }),
        faqPageSchema(FAQS),
        breadcrumbListSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Services', url: `${SITE_URL}/services/` },
          { name: 'Google Ads', url: `${SITE_URL}/services/google-ads/` },
          { name: 'Thoothukudi', url: `${SITE_URL}/services/google-ads/thoothukudi/` },
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
              { label: 'Google Ads', to: '/services/google-ads/' },
              { label: 'Thoothukudi' },
            ]}
          />
        </div>
      </section>

      {/* ---- Hero ---- */}
      <HeroSection
        layout="two-column"
        eyebrow={HERO_EYEBROW}
        title={HERO_TITLE}
        subtitle={HERO_PARAGRAPH}
        actions={
          <>
            <Button href={whatsappHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">
              Get a Google Ads Consultation
            </Button>
            <Button to="/services/google-ads/" variant="outline" size="lg">
              Explore Google Ads Services
            </Button>
          </>
        }
      >
        <div className="hero__visual-side">
          <img
            src={heroImage}
            width={1672}
            height={941}
            fetchPriority="high"
            alt="Google Ads Services"
            className="hero__image"
          />
        </div>
      </HeroSection>

      {/* ---- Why Google Ads for Thoothukudi ---- */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Why Google Ads</span>
              <h2 className="section-heading__title">Why Google Ads Matters for Thoothukudi Businesses</h2>
              <p className="section-heading__subtitle">
                Google Ads is the fastest path to qualified visibility. While SEO builds long-term
                organic rankings, Google Ads puts your business in front of high-intent buyers today.
              </p>
            </div>
          </ScrollReveal>
          <div className="ga-why-grid">
            {WHY_GOOGLE_ADS_THOOTHUKUDI.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="ga-why-card glass-card">
                  <div className="ga-why-card__content">
                    <h3 className="ga-why-card__title">{item.title}</h3>
                    <p className="ga-why-card__text">{item.text}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- What We Manage ---- */}
      <section className="section ga-campaigns-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Services</span>
              <h2 className="section-heading__title">What We Manage</h2>
            </div>
          </ScrollReveal>
          <div className="ga-campaign-grid">
            {CAMPAIGN_TYPES.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="ga-campaign-card glass-card">
                  <span className="ga-campaign-card__number">{item.number}</span>
                  <h3 className="ga-campaign-card__title">{item.title}</h3>
                  <p className="ga-campaign-card__text">{item.content}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Industries ---- */}
      <section className="section ga-industries-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Industries</span>
              <h2 className="section-heading__title">Google Ads for Thoothukudi Industries</h2>
            </div>
          </ScrollReveal>
          <div className="ga-industry-grid">
            {INDUSTRIES.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="ga-industry-card glass-card">
                  <span className="ga-industry-card__number">{item.number}</span>
                  <h3 className="ga-industry-card__title">{item.title}</h3>
                  <p className="ga-industry-card__text">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Process ---- */}
      <section className="section ga-process-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Process</span>
              <h2 className="section-heading__title">Our Google Ads Process</h2>
            </div>
          </ScrollReveal>
          <div className="ga-process-grid">
            {PROCESS_STEPS.map((step, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="ga-process-card glass-card">
                  <span className="ga-process-card__number">{step.number}</span>
                  <h3 className="ga-process-card__title">{step.title}</h3>
                  <p className="ga-process-card__text">{step.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- B2B ---- */}
      <section className="section ga-b2b-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">B2B</span>
              <h2 className="section-heading__title">Google Ads for B2B Businesses in Thoothukudi</h2>
              <p className="section-heading__subtitle">
                B2B Google Ads requires different targeting from consumer campaigns. We focus on
                commercial-intent keywords, product-specific searches and qualified lead generation
                for Thoothukudi's industrial and B2B ecosystem.
              </p>
            </div>
          </ScrollReveal>
          <div className="ga-b2b-grid">
            {B2B_POINTS.map((point, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="ga-b2b-item glass-card">
                  <span className="ga-b2b-item__check" aria-hidden="true">✓</span>
                  <p className="ga-b2b-item__text">{point}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Landing Pages ---- */}
      <section className="section ga-landing-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Landing Pages</span>
              <h2 className="section-heading__title">Google Ads Works Best With the Right Landing Page</h2>
              <p className="section-heading__subtitle">
                Sending paid traffic to a generic homepage is often less effective than sending users
                to a relevant, conversion-focused landing page. Message match, clear CTAs, relevant
                service information, trust signals, mobile optimisation and fast loading all contribute
                to better campaign performance.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <div className="ga-landing-card glass-card">
              <h3 className="ga-landing-card__title">Need a Landing Page?</h3>
              <p className="ga-landing-card__text">
                We can build conversion-focused landing pages designed specifically for your Google Ads
                campaigns, ensuring message match and proper conversion tracking.
              </p>
              <Link to="/services/website-design-development/" className="ga-landing-card__link">
                Explore Website Design Services
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

      {/* ---- Why Static Savvy Media ---- */}
      <section className="section ga-why-us-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Why Us</span>
              <h2 className="section-heading__title">Why Choose Static Savvy Media for Google Ads in Thoothukudi?</h2>
            </div>
          </ScrollReveal>
          <div className="ga-why-us-grid">
            {WHY_US.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="ga-why-us-card glass-card">
                  <span className="ga-why-us-card__number">{item.number}</span>
                  <h3 className="ga-why-us-card__title">{item.title}</h3>
                  <p className="ga-why-us-card__text">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Related Services ---- */}
      <section className="section ga-related-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Explore More</span>
              <h2 className="section-heading__title">Complete Your Digital Growth Strategy</h2>
            </div>
          </ScrollReveal>
          <div className="ga-related-links">
            {RELATED_SERVICES.map((item) => (
              <Link key={item.path} to={item.path} className="ga-related-link">
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
            <Link to="/faq/" className="ga-related-link">
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

      {/* ---- FAQ ---- */}
      <FAQSection
        eyebrow="FAQ"
        title="Frequently Asked Questions, Google Ads Thoothukudi"
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
