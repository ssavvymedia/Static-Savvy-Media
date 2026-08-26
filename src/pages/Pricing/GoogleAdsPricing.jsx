import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import { breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL } from '../../utils/constants.js'
import '../../styles/pages/google-ads-pricing.css'

const PAGE_TITLE = 'Google Ads Management Pricing, PPC Management Packages | Static Savvy Media'
const PAGE_DESCRIPTION = 'Transparent Google Ads management pricing. Starter, Growth, and Scale packages, management fee separate from ad spend.'
const HERO_SUBTITLE = 'Prices shown are for guidance. Final pricing depends on project scope. All retainer prices are per month with no minimum contract term. Message us on WhatsApp for a custom quote.'

const PLANS = [
  {
    name: 'Starter',
    fee: '₹10,000 / MYR 550',
    unit: 'per month (management fee)',
    adSpend: '₹15,000–25,000 / MYR 800–1,500',
    features: ['1 campaign', 'Keyword research', 'Ad copy (3 variants)', 'Conversion tracking setup', 'Monthly report'],
  },
  {
    name: 'Growth',
    fee: '₹18,000 / MYR 950',
    unit: 'per month (management fee)',
    adSpend: '₹30,000–60,000 / MYR 1,500–3,000',
    features: ['Up to 3 campaigns', 'Remarketing', 'Weekly bid optimisation', 'A/B ad testing', 'Bi-weekly report'],
  },
  {
    name: 'Scale',
    fee: '₹32,000 / MYR 1,700',
    unit: 'per month (management fee)',
    adSpend: '₹80,000+ / MYR 4,000+',
    features: ['Unlimited campaigns', 'Performance Max', 'Shopping campaigns', 'Competitor ad intelligence', 'Weekly reporting'],
  },
]

const RELATED_PRICING = [
  { name: 'SEO Pricing', path: '/pricing/seo/' },
  { name: 'Local SEO Pricing', path: '/pricing/local-seo/' },
  { name: 'Social Media Pricing', path: '/pricing/social-media-marketing/' },
  { name: 'Website Pricing', path: '/pricing/website-design-development/' },
  { name: 'AI Services Pricing', path: '/pricing/ai-services/' },
]

export default function GoogleAdsPricing() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({ title: PAGE_TITLE, description: PAGE_DESCRIPTION, canonical: `${SITE_URL}/pricing/google-ads/`, ogType: 'website' })
    const breadcrumbs = breadcrumbListSchema({ items: [
      { name: 'Home', item: `${SITE_URL}/` },
      { name: 'Pricing', item: `${SITE_URL}/pricing/` },
      { name: 'Google Ads', item: `${SITE_URL}/pricing/google-ads/` },
    ]})
    const scripts = [breadcrumbs].map((data) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.text = JSON.stringify(data)
      document.head.appendChild(script)
      return script
    })
    jsonLdRef.current = scripts
    return () => { jsonLdRef.current.forEach((s) => s.remove()); jsonLdRef.current = [] }
  }, [])

  const whatsappHref = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)

  return (
    <div className="gads-pricing-page">
      <Breadcrumbs />
      <HeroSection
        eyebrow="GOOGLE ADS PRICING"
        title="Google Ads Pricing, Management Fee Packages"
        subtitle={HERO_SUBTITLE}
        actions={<Button href={whatsappHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">WhatsApp: +91-99440-40345</Button>}
      >
        <div className="gads-hero-visual" aria-hidden="true">
          <div className="gads-hero-visual__search">
            <div className="gads-hero-visual__bar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <div className="gads-hero-visual__bar-line" />
              <div className="gads-hero-visual__bar-cursor" />
            </div>
            <div className="gads-hero-visual__ad">
              <span className="gads-hero-visual__ad-badge">Ad</span>
              <span className="gads-hero-visual__ad-url">www.example.com</span>
              <span className="gads-hero-visual__ad-title">Your Business Tagline Here</span>
              <span className="gads-hero-visual__ad-desc">Compelling ad copy that drives clicks and conversions</span>
            </div>
          </div>
          <div className="gads-hero-visual__bars">
            <div className="gads-hero-visual__bar-line-sm" />
            <div className="gads-hero-visual__bar-line-sm gads-hero-visual__bar-line-sm--short" />
            <div className="gads-hero-visual__bar-line-sm gads-hero-visual__bar-line-sm--mid" />
          </div>
        </div>
      </HeroSection>

      <section className="section gads-pricing-cards">
        <div className="container">
          <div className="gads-pricing-cards__grid">
            {PLANS.map((plan, index) => (
              <ScrollReveal key={plan.name} delay={index * 100}>
                <article className="gads-pricing-card glass-card">
                  <h3 className="gads-pricing-card__name">{plan.name}</h3>
                  <div className="gads-pricing-card__fee-block">
                    <span className="gads-pricing-card__fee-label">Management Fee</span>
                    <p className="gads-pricing-card__fee">{plan.fee}</p>
                    <span className="gads-pricing-card__unit">{plan.unit}</span>
                  </div>
                  <div className="gads-pricing-card__ad-spend-block">
                    <span className="gads-pricing-card__ad-spend-label">Recommended Ad Spend</span>
                    <p className="gads-pricing-card__ad-spend">{plan.adSpend}</p>
                  </div>
                  <div className="gads-pricing-card__divider" aria-hidden="true" />
                  <ul className="gads-pricing-card__features">
                    {plan.features.map((f) => (
                      <li key={f} className="gads-pricing-card__feature">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section gads-pricing-explainer section--alt">
        <div className="container">
          <div className="gads-pricing-explainer__inner glass-card">
            <div className="gads-pricing-explainer__icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </div>
            <div className="gads-pricing-explainer__content">
              <h3 className="gads-pricing-explainer__title">Management Fee vs. Ad Spend</h3>
              <p className="gads-pricing-explainer__text">
                The <strong>management fee</strong> is what Static Savvy Media charges for managing your campaigns.
                The <strong>recommended ad spend</strong> is the amount you allocate to Google Ads directly.
                These are two separate costs &mdash; your management fee does not include ad spend.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section gads-pricing-related">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Explore More</span>
            <h2 className="section-heading__title">Other Pricing Pages</h2>
          </div>
          <div className="gads-pricing-related__links">
            {RELATED_PRICING.map((item) => (
              <Link key={item.path} to={item.path} className="gads-pricing-related__link">
                {item.name}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Not sure which tier is right for you?"
        subtitle="Message us on WhatsApp, we will recommend the right starting point for your goals and budget, honestly."
        primaryLabel={'💬 WhatsApp for Custom Quote'}
        primaryHref={whatsappHref}
      />
    </div>
  )
}
