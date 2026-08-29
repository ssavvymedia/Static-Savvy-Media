import { useEffect, useRef } from 'react'
import { useParams, useLocation } from 'react-router-dom'
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
import websiteHeroImg from '../../assets/images/Pricing/05websitedesign.png'

const HERO_SUBTITLE = 'Prices shown are for guidance. Final pricing depends on project scope. All retainer prices are per month with no minimum contract term. Message us on WhatsApp for a custom quote.'

const PLANS = [
  {
    name: 'Business Website',
    priceINR: '₹45,000–75,000',
    priceMYR: 'MYR 2,500–4,200',
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
    priceINR: '₹80,000–1,50,000',
    priceMYR: 'MYR 4,500–8,500',
    unit: 'per project',
    featuresINR: [
      'WooCommerce or custom e-commerce',
      'Up to 500 products',
      'Payment gateway (Razorpay)',
      'Product photography integration',
      'SEO foundation',
      '60-day support',
    ],
    featuresMYR: [
      'WooCommerce or custom e-commerce',
      'Up to 500 products',
      'Payment gateway (FPX)',
      'Product photography integration',
      'SEO foundation',
      '60-day support',
    ],
  },
  {
    name: 'Landing Page',
    priceINR: '₹15,000–25,000',
    priceMYR: 'MYR 800–1,400',
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

const PROGRESSION_INDIA = [
  { tier: 'Business Website', items: ['Up to 20 pages', 'WordPress or Next.js', 'SEO foundation (schema, sitemap, canonical, hreflang)', 'WhatsApp CTA', 'GA4 setup', 'Mobile-first', '30-day support'] },
  { tier: 'E-Commerce Website', items: ['WooCommerce or custom e-commerce', 'Up to 500 products', 'Payment gateway (Razorpay)', 'Product photography integration', 'SEO foundation', '60-day support'] },
  { tier: 'Landing Page', items: ['Single conversion-focused page', 'Google Ads or product launch', 'WhatsApp CTA', 'GA4 + conversion tracking', 'Mobile-first', '5–10 business days'] },
]

const PROGRESSION_MALAYSIA = [
  { tier: 'Business Website', items: ['Up to 20 pages', 'WordPress or Next.js', 'SEO foundation (schema, sitemap, canonical, hreflang)', 'WhatsApp CTA', 'GA4 setup', 'Mobile-first', '30-day support'] },
  { tier: 'E-Commerce Website', items: ['WooCommerce or custom e-commerce', 'Up to 500 products', 'Payment gateway (FPX)', 'Product photography integration', 'SEO foundation', '60-day support'] },
  { tier: 'Landing Page', items: ['Single conversion-focused page', 'Google Ads or product launch', 'WhatsApp CTA', 'GA4 + conversion tracking', 'Mobile-first', '5–10 business days'] },
]

export default function WebsitePricing({ country: propCountry }) {
  const { country: paramCountry } = useParams()
  const location = useLocation()
  const activeCountry = propCountry || paramCountry || (location.pathname.includes('/malaysia') ? 'malaysia' : 'india')
  const isMalaysia = activeCountry === 'malaysia'

  const countryName = isMalaysia ? 'Malaysia' : 'India'
  const currencyCode = isMalaysia ? 'MYR' : 'INR'

  const progression = isMalaysia ? PROGRESSION_MALAYSIA : PROGRESSION_INDIA

  const pageTitle = `Website Design Pricing ${countryName}, Business & E-Commerce Websites (${currencyCode}) | Static Savvy Media`
  const pageDescription = `Website design and development pricing in ${countryName} (${currencyCode}). Business websites, e-commerce sites, and landing pages, fixed project prices.`

  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({ title: pageTitle, description: pageDescription, canonical: `${SITE_URL}/pricing/${activeCountry}/website/`, ogType: 'website' })
    const breadcrumbs = breadcrumbListSchema({ items: [
      { name: 'Home', item: `${SITE_URL}/` },
      { name: `${countryName} Pricing`, item: `${SITE_URL}/pricing/${activeCountry}/` },
      { name: 'Website Design', item: `${SITE_URL}/pricing/${activeCountry}/website/` },
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
  }, [activeCountry, countryName, pageTitle, pageDescription])

  const whatsappHref = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)

  return (
    <div className="web-pricing-page">
      <Breadcrumbs />
      <HeroSection
        layout="two-column"
        eyebrow={`WEBSITE DESIGN & DEVELOPMENT PRICING (${currencyCode})`}
        title={`Website Design & Development Pricing (${countryName})`}
        subtitle={HERO_SUBTITLE}
        actions={<Button href={whatsappHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">WhatsApp: +91-99440-40345</Button>}
      >
        <div className="hero__visual-side">
          <img src={websiteHeroImg} alt={`Website Design Pricing ${countryName}`} className="hero__image" />
        </div>
      </HeroSection>

      <section className="section web-pricing-cards">
        <div className="container">
          <div className="web-pricing-cards__grid">
            {PLANS.map((plan, index) => {
              const displayPrice = isMalaysia ? plan.priceMYR : plan.priceINR
              const features = isMalaysia ? (plan.featuresMYR || plan.features) : (plan.featuresINR || plan.features)
              return (
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
                      <p className="web-pricing-card__price">{displayPrice}</p>
                      <span className="web-pricing-card__unit">{plan.unit}</span>
                    </div>
                    <div className="web-pricing-card__divider" aria-hidden="true" />
                    <span className="web-pricing-card__includes">Includes:</span>
                    <ul className="web-pricing-card__features">
                      {features.map((f) => (
                        <li key={f} className="web-pricing-card__feature">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </article>
                </ScrollReveal>
              )
            })}
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
            {progression.map((step, index) => (
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

      <CTASection
        title="Not sure which tier is right for you?"
        subtitle="Message us on WhatsApp, we will recommend the right starting point for your goals and budget, honestly."
        primaryLabel={'💬 WhatsApp for Custom Quote'}
        primaryHref={whatsappHref}
      />
    </div>
  )
}
