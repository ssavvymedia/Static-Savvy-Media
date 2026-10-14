import { useEffect, useRef } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import ContactFormSection from '../../components/sections/ContactFormSection.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import { breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL } from '../../utils/constants.js'
import '../../styles/pages/local-seo-pricing.css'
import localSeoHeroImg from '../../assets/images/Pricing/02localseo.webp'

const HERO_SUBTITLE = 'Prices shown are for guidance. Final pricing depends on project scope. All retainer prices are per month with no minimum contract term. Message us on WhatsApp for a custom quote.'

const PLANS = [
  {
    name: 'Starter',
    priceINR: '₹8,000',
    priceMYR: 'MYR 450',
    unit: 'per month',
    features: [
      'GBP optimization',
      'NAP audit & correction',
      '20 citation submissions',
      'Review request template',
      '1 location page content review',
    ],
  },
  {
    name: 'Growth',
    priceINR: '₹15,000',
    priceMYR: 'MYR 800',
    unit: 'per month',
    features: [
      'Everything in Starter +',
      '50 citation submissions',
      'GBP post schedule (4/month)',
      'Review management',
      '2 locally-targeted blog posts/month',
    ],
  },
  {
    name: 'Scale',
    priceINR: '₹28,000',
    priceMYR: 'MYR 1,500',
    unit: 'per month',
    features: [
      'Everything in Growth +',
      'Multi-location GBP management (up to 3 locations)',
      '100+ citations',
      'GBP Q&A management',
      'Local schema on all pages',
    ],
  },
]

export default function LocalSEOPricing({ country: propCountry }) {
  const { country: paramCountry } = useParams()
  const location = useLocation()
  const activeCountry = propCountry || paramCountry || (location.pathname.includes('/malaysia') ? 'malaysia' : 'india')
  const isMalaysia = activeCountry === 'malaysia'

  const countryName = isMalaysia ? 'Malaysia' : 'India'
  const currencyCode = isMalaysia ? 'MYR' : 'INR'

  const pageTitle = `Local SEO Pricing ${countryName}, Google Maps & GBP Optimization Plans (${currencyCode}) | Static Savvy Media`
  const pageDescription = `Transparent local SEO pricing for ${countryName} businesses in ${currencyCode}. GBP optimization, citation building, and review management packages.`

  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({ title: pageTitle, description: pageDescription, canonical: `${SITE_URL}/pricing/${activeCountry}/local-seo/`, ogType: 'website' })
    const breadcrumbs = breadcrumbListSchema({ items: [
      { name: 'Home', item: `${SITE_URL}/` },
      { name: `${countryName} Pricing`, item: `${SITE_URL}/pricing/${activeCountry}/` },
      { name: 'Local SEO', item: `${SITE_URL}/pricing/${activeCountry}/local-seo/` },
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
    <div className="local-seo-pricing-page">
      <Breadcrumbs />
      <HeroSection
        layout="two-column"
        eyebrow={`LOCAL SEO PRICING (${currencyCode})`}
        title={`Local SEO Pricing (${countryName}), Google Maps Visibility Plans`}
        subtitle={HERO_SUBTITLE}
        actions={<Button href={whatsappHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">WhatsApp: +91-99440-40345</Button>}
      >
        <div className="hero__visual-side">
          <img src={localSeoHeroImg} width={1536} height={1024} fetchPriority="high" alt={`Local SEO Pricing ${countryName}`} className="hero__image" />
        </div>
      </HeroSection>

      <section className="section lseo-pricing-cards">
        <div className="container">
          <div className="lseo-pricing-cards__grid">
            {PLANS.map((plan, index) => {
              const displayPrice = isMalaysia ? plan.priceMYR : plan.priceINR
              return (
                <ScrollReveal key={plan.name} delay={index * 100}>
                  <article className="lseo-pricing-card glass-card">
                    <h3 className="lseo-pricing-card__name">{plan.name}</h3>
                    <div className="lseo-pricing-card__price-block">
                      <p className="lseo-pricing-card__price">{displayPrice}</p>
                      <span className="lseo-pricing-card__unit">{plan.unit}</span>
                    </div>
                    <div className="lseo-pricing-card__divider" aria-hidden="true" />
                    <span className="lseo-pricing-card__includes">Includes:</span>
                    <ul className="lseo-pricing-card__features">
                      {plan.features.map((f) => (
                        <li key={f} className="lseo-pricing-card__feature">
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
