import { useEffect, useRef } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import PricingNextSteps from '../../components/pricing/PricingNextSteps.jsx'
import ContactFormSection from '../../components/sections/ContactFormSection.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import { breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL } from '../../utils/constants.js'
import '../../styles/pages/seo-pricing.css'
import seoHeroImg from '../../assets/images/Pricing/01seo.webp'

const HERO_SUBTITLE = 'Prices shown are for guidance. Final pricing depends on project scope. All retainer prices are per month with no minimum contract term. Message us on WhatsApp for a custom quote.'

const PLANS = [
  {
    name: 'GBP',
    priceINR: '₹6,000',
    priceMYR: 'MYR 800',
    amountINR: 6000,
    amountMYR: 800,
    features: [
      'Google Business Profile (GBP) optimisation & management',
      '12 GBP posts per month',
      'Better visibility on Google Maps & the local 3-pack',
      'Monthly report',
    ],
  },
  {
    name: 'GBP + Website SEO',
    priceINR: '₹12,000',
    priceMYR: 'MYR 1,500',
    amountINR: 12000,
    amountMYR: 1500,
    features: [
      'Everything in GBP +',
      'On-page & technical SEO on your website',
      '4 blog posts per month',
      'Monthly GSC + GA4 report',
    ],
  },
  {
    name: 'GBP + SEO + AEO + GEO',
    priceINR: '₹20,000',
    priceMYR: 'MYR 2,000',
    amountINR: 20000,
    amountMYR: 2000,
    features: [
      'Everything in GBP + Website SEO +',
      'AEO: FAQs, answer-first content & schema markup',
      'GEO: optimisation for ChatGPT, Gemini & Google AI Overviews',
    ],
  },
]

const PROGRESSION = [
  { tier: 'GBP', label: 'Google Maps Foundation', items: ['GBP optimisation & management', '12 GBP posts/month'] },
  { tier: 'GBP + Website SEO', label: 'Maps + Website Rankings', items: ['Everything in GBP', 'On-page & technical SEO', '4 blogs/month'] },
  { tier: 'GBP + SEO + AEO + GEO', label: 'Full SEO + AI Search', items: ['Everything in GBP + Website SEO', 'AEO (answer engine optimisation)', 'GEO (AI search visibility)'] },
]

export default function SEOPricing({ country: propCountry }) {
  const { country: paramCountry } = useParams()
  const location = useLocation()
  const activeCountry = propCountry || paramCountry || (location.pathname.includes('/malaysia') ? 'malaysia' : 'india')
  const isMalaysia = activeCountry === 'malaysia'

  const countryName = isMalaysia ? 'Malaysia' : 'India'
  const currencyCode = isMalaysia ? 'MYR' : 'INR'

  const pageTitle = isMalaysia ? 'SEO Packages & Pricing Malaysia (2026) | From MYR 800/Month' : `SEO Pricing ${countryName}, Monthly Retainer Plans (${currencyCode}) | Static Savvy Media`
  const pageDescription = isMalaysia ? 'Our SEO packages in Malaysia: GBP MYR 800, GBP + Website SEO MYR 1,500 and GBP + SEO + AEO + GEO MYR 2,000 a month, no minimum contract. See what each plan includes.' : 'SEO pricing in India: GBP ₹6,000, GBP + Website SEO ₹12,000 and GBP + SEO + AEO + GEO ₹20,000 a month, no minimum contract. See what each plan includes.'

  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({ title: pageTitle, description: pageDescription, canonical: `${SITE_URL}/pricing/${activeCountry}/seo/`, ogType: 'website' })
    const breadcrumbs = breadcrumbListSchema({ items: [
      { name: 'Home', item: `${SITE_URL}/` },
      { name: `${countryName} Pricing`, item: `${SITE_URL}/pricing/${activeCountry}/` },
      { name: 'SEO', item: `${SITE_URL}/pricing/${activeCountry}/seo/` },
    ]})
    const offerCatalog = {
      '@context': 'https://schema.org',
      '@type': 'OfferCatalog',
      name: `SEO Packages ${countryName}`,
      url: `${SITE_URL}/pricing/${activeCountry}/seo/`,
      itemListElement: PLANS.map((plan) => {
        const price = String(isMalaysia ? plan.amountMYR : plan.amountINR)
        return {
          '@type': 'Offer',
          name: `${plan.name} SEO plan`,
          price,
          priceCurrency: currencyCode,
          url: `${SITE_URL}/pricing/${activeCountry}/seo/`,
          priceSpecification: { '@type': 'UnitPriceSpecification', price, priceCurrency: currencyCode, unitText: 'MONTH' },
          itemOffered: { '@type': 'Service', name: plan.name, serviceType: 'Search engine optimization' },
        }
      }),
    }
    const scripts = [breadcrumbs, offerCatalog].map((data) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.text = JSON.stringify(data)
      document.head.appendChild(script)
      return script
    })
    jsonLdRef.current = scripts
    return () => { jsonLdRef.current.forEach((s) => s.remove()); jsonLdRef.current = [] }
  }, [activeCountry, countryName, currencyCode, isMalaysia, pageTitle, pageDescription])

  const whatsappHref = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)

  return (
    <div className="seo-pricing-page">
      <Breadcrumbs />
      <HeroSection
        layout="two-column"
        eyebrow={`SEO PRICING (${currencyCode})`}
        title={`SEO Pricing (${countryName}), Monthly Retainer Plans`}
        subtitle={HERO_SUBTITLE}
        actions={<Button href={whatsappHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">WhatsApp: +91 99440 40345</Button>}
      >
        <div className="hero__visual-side">
          <img src={seoHeroImg} width={1536} height={1024} fetchPriority="high" alt={`SEO Pricing ${countryName}`} className="hero__image" />
        </div>
      </HeroSection>

      <section className="section seo-pricing-cards">
        <div className="container">
          <div className="seo-pricing-cards__grid">
            {PLANS.map((plan, index) => {
              const displayPrice = isMalaysia ? plan.priceMYR : plan.priceINR
              return (
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
                      <p className="seo-pricing-card__price">{displayPrice}</p>
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
              )
            })}
          </div>
        </div>
      </section>

      {isMalaysia && (
        <section className="section">
          <div className="container">
            <div className="section-heading">
              <h2 className="section-heading__title">How Our Malaysia SEO Prices Compare</h2>
              <p className="section-heading__subtitle">
                This page is the single source for our Malaysia SEO prices. For what SEO typically costs across the
                Malaysian market and what drives the price, read our <Link to="/blog/seo-cost-malaysia-price-guide/">guide to SEO costs in Malaysia</Link>.
                For what the work looks like in the city, see <Link to="/services/seo/kuala-lumpur/">SEO services in Kuala Lumpur</Link> or <Link to="/services/seo/malaysia/">SEO services in Malaysia</Link>.
                Running ads too? See <Link to="/pricing/malaysia/google-ads/">Google Ads pricing in Malaysia</Link>.
              </p>
            </div>
          </div>
        </section>
      )}

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

      <PricingNextSteps service="seo" country={activeCountry} />

      <CTASection
        title="Not sure which tier is right for you?"
        subtitle="Message us on WhatsApp, we will recommend the right starting point for your goals and budget, honestly."
        primaryLabel={'💬 WhatsApp for Custom Quote'}
        primaryHref={whatsappHref}
      />

      <ContactFormSection />
    </div>
  )
}
