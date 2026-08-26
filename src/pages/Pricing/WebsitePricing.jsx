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
import '../../styles/pages/website-pricing.css'

const PAGE_TITLE = 'Website Design Pricing, Business & E-Commerce Websites | Static Savvy Media'
const PAGE_DESCRIPTION = 'Website design and development pricing in Madurai. Business websites, e-commerce sites, and landing pages, fixed project prices.'
const HERO_SUBTITLE = 'Prices shown are for guidance. Final pricing depends on project scope. All retainer prices are per month with no minimum contract term. Message us on WhatsApp for a custom quote.'

const PLANS = [
  {
    name: 'Business Website',
    price: '₹45,000–75,000',
    priceAlt: 'MYR 2,500–4,200',
    unit: 'per project',
    features: [
      'Up to 20 pages',
      'WordPress or Next.js',
      'SEO foundation (schema, sitemap, canonical, hreflang)',
      'WhatsApp CTA integration',
      'GA4 setup',
      'Mobile-first',
      '30-day post-launch support',
    ],
  },
  {
    name: 'E-Commerce Website',
    price: '₹80,000–1,50,000',
    priceAlt: 'MYR 4,500–8,500',
    unit: 'per project',
    features: [
      'WooCommerce or custom e-commerce',
      'Up to 500 products',
      'Payment gateway (Razorpay/FPX)',
      'Product photography integration',
      'SEO foundation',
      '60-day support',
    ],
  },
  {
    name: 'Landing Page',
    price: '₹15,000–25,000',
    priceAlt: 'MYR 800–1,400',
    unit: 'per project',
    features: [
      'Single conversion-focused page',
      'Google Ads or product launch',
      'WhatsApp CTA',
      'GA4 + conversion tracking',
      'Mobile-first',
      'Delivered in 5–10 business days',
    ],
  },
]

const PROGRESSION = [
  { tier: 'Business Website', items: ['Up to 20 pages', 'WordPress or Next.js', 'SEO foundation (schema, sitemap, canonical, hreflang)', 'WhatsApp CTA', 'GA4 setup', 'Mobile-first', '30-day support'] },
  { tier: 'E-Commerce Website', items: ['WooCommerce or custom e-commerce', 'Up to 500 products', 'Payment gateway (Razorpay/FPX)', 'Product photography integration', 'SEO foundation', '60-day support'] },
  { tier: 'Landing Page', items: ['Single conversion-focused page', 'Google Ads or product launch', 'WhatsApp CTA', 'GA4 + conversion tracking', 'Mobile-first', '5–10 business days'] },
]

const RELATED_PRICING = [
  { name: 'SEO Pricing', path: '/pricing/seo/' },
  { name: 'Local SEO Pricing', path: '/pricing/local-seo/' },
  { name: 'Google Ads Pricing', path: '/pricing/google-ads/' },
  { name: 'Social Media Pricing', path: '/pricing/social-media-marketing/' },
  { name: 'AI Services Pricing', path: '/pricing/ai-services/' },
]

export default function WebsitePricing() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({ title: PAGE_TITLE, description: PAGE_DESCRIPTION, canonical: `${SITE_URL}/pricing/website-design-development/`, ogType: 'website' })
    const breadcrumbs = breadcrumbListSchema({ items: [
      { name: 'Home', item: `${SITE_URL}/` },
      { name: 'Pricing', item: `${SITE_URL}/pricing/` },
      { name: 'Website Design', item: `${SITE_URL}/pricing/website-design-development/` },
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
    <div className="web-pricing-page">
      <Breadcrumbs />
      <HeroSection
        eyebrow="WEBSITE DESIGN & DEVELOPMENT PRICING"
        title="Website Design & Development Pricing"
        subtitle={HERO_SUBTITLE}
        actions={<Button href={whatsappHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">WhatsApp: +91-99440-40345</Button>}
      >
        <div className="web-hero-visual" aria-hidden="true">
          <div className="web-hero-visual__browser">
            <div className="web-hero-visual__browser-bar">
              <div className="web-hero-visual__browser-dots">
                <span /><span /><span />
              </div>
              <div className="web-hero-visual__browser-url">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                www.example.com
              </div>
            </div>
            <div className="web-hero-visual__browser-content">
              <div className="web-hero-visual__browser-hero" />
              <div className="web-hero-visual__browser-grid">
                <div className="web-hero-visual__browser-card" />
                <div className="web-hero-visual__browser-card" />
                <div className="web-hero-visual__browser-card" />
              </div>
            </div>
          </div>
          <div className="web-hero-visual__devices">
            <div className="web-hero-visual__device web-hero-visual__device--tablet">
              <div className="web-hero-visual__device-screen">
                <div className="web-hero-visual__device-line" />
                <div className="web-hero-visual__device-line web-hero-visual__device-line--short" />
              </div>
            </div>
            <div className="web-hero-visual__device web-hero-visual__device--mobile">
              <div className="web-hero-visual__device-screen">
                <div className="web-hero-visual__device-line" />
              </div>
            </div>
          </div>
        </div>
      </HeroSection>

      <section className="section web-pricing-cards">
        <div className="container">
          <div className="web-pricing-cards__grid">
            {PLANS.map((plan, index) => (
              <ScrollReveal key={plan.name} delay={index * 100}>
                <article className="web-pricing-card glass-card">
                  <div className="web-pricing-card__icon" aria-hidden="true">
                    {index === 0 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    )}
                    {index === 1 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                    )}
                    {index === 2 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                    )}
                  </div>
                  <h3 className="web-pricing-card__name">{plan.name}</h3>
                  <div className="web-pricing-card__price-block">
                    <p className="web-pricing-card__price">{plan.price}</p>
                    <span className="web-pricing-card__price-alt">{plan.priceAlt}</span>
                    <span className="web-pricing-card__unit">{plan.unit}</span>
                  </div>
                  <div className="web-pricing-card__divider" aria-hidden="true" />
                  <span className="web-pricing-card__includes">Includes:</span>
                  <ul className="web-pricing-card__features">
                    {plan.features.map((f) => (
                      <li key={f} className="web-pricing-card__feature">
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

      <section className="section web-pricing-progression section--alt">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">SCOPE COMPARISON</span>
            <h2 className="section-heading__title">Compare Website Packages</h2>
          </div>
          <div className="web-progression__grid">
            {PROGRESSION.map((step, index) => (
              <ScrollReveal key={step.tier} delay={index * 120}>
                <div className="web-progression__step glass-card">
                  <div className="web-progression__step-header">
                    <span className="web-progression__step-num">0{index + 1}</span>
                    <h3 className="web-progression__step-tier">{step.tier}</h3>
                  </div>
                  <ul className="web-progression__step-items">
                    {step.items.map((item) => (
                      <li key={item} className="web-progression__step-item">
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

      <section className="section web-pricing-related">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">EXPLORE MORE</span>
            <h2 className="section-heading__title">Other Pricing Pages</h2>
          </div>
          <div className="web-pricing-related__links">
            {RELATED_PRICING.map((item) => (
              <Link key={item.path} to={item.path} className="web-pricing-related__link">
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
