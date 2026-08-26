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
import '../../styles/pages/seo-pricing.css'

const PAGE_TITLE = 'SEO Pricing India, Monthly Retainer Plans | Static Savvy Media'
const PAGE_DESCRIPTION = 'Transparent SEO pricing for Indian and Malaysian businesses. Starter, Growth, and Scale monthly retainers. No hidden fees.'
const HERO_SUBTITLE = 'Prices shown are for guidance. Final pricing depends on project scope. All retainer prices are per month with no minimum contract term. Message us on WhatsApp for a custom quote.'

const PLANS = [
  {
    name: 'Starter',
    price: '₹12,000',
    priceAlt: 'MYR 650',
    features: [
      'Technical audit & fixes',
      '10 keywords targeted',
      'On-page optimization for 5 pages',
      'Monthly GSC + GA4 report',
      '1 blog post per month',
    ],
  },
  {
    name: 'Growth',
    price: '₹22,000',
    priceAlt: 'MYR 1,200',
    features: [
      'Everything in Starter +',
      '25 keywords',
      'On-page for 15 pages',
      'FAQPage schema on all service pages',
      '3 blog posts per month',
      'Link building (5 quality links/month)',
    ],
  },
  {
    name: 'Scale',
    price: '₹40,000',
    priceAlt: 'MYR 2,200',
    features: [
      'Everything in Growth +',
      '60+ keywords',
      'Full site schema implementation',
      'GEO/AEO optimization included',
      '8 blog posts per month',
      '15+ links/month',
      'Bi-weekly reporting',
    ],
  },
]

const PROGRESSION = [
  { tier: 'Starter', label: 'Core SEO Foundation', items: ['10 keywords', '5-page optimization', 'Monthly reporting', '1 blog'] },
  { tier: 'Growth', label: 'More Keywords + Content + Links', items: ['25 keywords', '15-page optimization', 'FAQPage schema', '3 blogs', '5 quality links/month'] },
  { tier: 'Scale', label: 'Full SEO + GEO/AEO + Advanced', items: ['60+ keywords', 'Full site schema', 'GEO/AEO', '8 blogs', '15+ links/month', 'Bi-weekly reporting'] },
]

const RELATED_PRICING = [
  { name: 'Local SEO Pricing', path: '/pricing/local-seo/' },
  { name: 'Google Ads Pricing', path: '/pricing/google-ads/' },
  { name: 'Social Media Pricing', path: '/pricing/social-media-marketing/' },
  { name: 'Website Pricing', path: '/pricing/website-design-development/' },
  { name: 'AI Services Pricing', path: '/pricing/ai-services/' },
]

export default function SEOPricing() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({ title: PAGE_TITLE, description: PAGE_DESCRIPTION, canonical: `${SITE_URL}/pricing/seo/`, ogType: 'website' })
    const breadcrumbs = breadcrumbListSchema({ items: [
      { name: 'Home', item: `${SITE_URL}/` },
      { name: 'Pricing', item: `${SITE_URL}/pricing/` },
      { name: 'SEO', item: `${SITE_URL}/pricing/seo/` },
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
    <div className="seo-pricing-page">
      <Breadcrumbs />
      <HeroSection
        eyebrow="SEO PRICING"
        title="SEO Pricing, Monthly Retainer Plans"
        subtitle={HERO_SUBTITLE}
        actions={<Button href={whatsappHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">WhatsApp: +91-99440-40345</Button>}
      >
        <div className="seo-hero-visual" aria-hidden="true">
          <div className="seo-hero-visual__search">
            <div className="seo-hero-visual__bar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <div className="seo-hero-visual__bar-line" />
              <div className="seo-hero-visual__bar-cursor" />
            </div>
          </div>
          <div className="seo-hero-visual__results">
            <div className="seo-hero-visual__result seo-hero-visual__result--1">
              <div className="seo-hero-visual__result-url" />
              <div className="seo-hero-visual__result-title" />
              <div className="seo-hero-visual__result-desc" />
            </div>
            <div className="seo-hero-visual__result seo-hero-visual__result--2">
              <div className="seo-hero-visual__result-url" />
              <div className="seo-hero-visual__result-title" />
              <div className="seo-hero-visual__result-desc" />
            </div>
            <div className="seo-hero-visual__result seo-hero-visual__result--3">
              <div className="seo-hero-visual__result-url" />
              <div className="seo-hero-visual__result-title" />
              <div className="seo-hero-visual__result-desc" />
            </div>
          </div>
          <div className="seo-hero-visual__keywords">
            <div className="seo-hero-visual__keyword">SEO</div>
            <div className="seo-hero-visual__keyword seo-hero-visual__keyword--accent">Keywords</div>
            <div className="seo-hero-visual__keyword">Schema</div>
          </div>
        </div>
      </HeroSection>

      <section className="section seo-pricing-cards">
        <div className="container">
          <div className="seo-pricing-cards__grid">
            {PLANS.map((plan, index) => (
              <ScrollReveal key={plan.name} delay={index * 100}>
                <article className="seo-pricing-card glass-card">
                  <div className="seo-pricing-card__icon" aria-hidden="true">
                    {index === 0 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M8 11h6"/></svg>
                    )}
                    {index === 1 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                    )}
                    {index === 2 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    )}
                  </div>
                  <h3 className="seo-pricing-card__name">{plan.name}</h3>
                  <div className="seo-pricing-card__price-block">
                    <p className="seo-pricing-card__price">{plan.price}</p>
                    <span className="seo-pricing-card__price-alt">{plan.priceAlt}</span>
                    <span className="seo-pricing-card__unit">per month</span>
                  </div>
                  <div className="seo-pricing-card__divider" aria-hidden="true" />
                  <span className="seo-pricing-card__includes">Includes:</span>
                  <ul className="seo-pricing-card__features">
                    {plan.features.map((f) => (
                      <li key={f} className="seo-pricing-card__feature">
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

      <section className="section seo-pricing-progression section--alt">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">SEO GROWTH PATH</span>
            <h2 className="section-heading__title">Your SEO Journey</h2>
          </div>
          <div className="seo-progression__grid">
            {PROGRESSION.map((step, index) => (
              <ScrollReveal key={step.tier} delay={index * 120}>
                <div className="seo-progression__step glass-card">
                  <div className="seo-progression__step-header">
                    <span className="seo-progression__step-num">0{index + 1}</span>
                    <div>
                      <h3 className="seo-progression__step-tier">{step.tier}</h3>
                      <p className="seo-progression__step-label">{step.label}</p>
                    </div>
                  </div>
                  <ul className="seo-progression__step-items">
                    {step.items.map((item) => (
                      <li key={item} className="seo-progression__step-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section seo-pricing-related">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">EXPLORE MORE</span>
            <h2 className="section-heading__title">Other Pricing Pages</h2>
          </div>
          <div className="seo-pricing-related__links">
            {RELATED_PRICING.map((item) => (
              <Link key={item.path} to={item.path} className="seo-pricing-related__link">
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
