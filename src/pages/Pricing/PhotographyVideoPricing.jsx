import { useEffect, useRef } from 'react'
import { useParams, useLocation } from 'react-router-dom'
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
import '../../styles/pages/photography-video-pricing.css'
import photographyHeroImg from '../../assets/images/Pricing/07photograph.webp'

const HERO_SUBTITLE = 'Prices shown are for guidance. Final pricing depends on project scope. All retainer prices are per month with no minimum contract term. Message us on WhatsApp for a custom quote.'

const PLANS = [
  {
    name: 'Product Photography',
    type: 'Half Day',
    priceINR: '₹12,000',
    priceMYR: 'MYR 650',
    features: [
      '20–25 products',
      'White background + lifestyle options',
      '3–5 angles per product',
      'Edited JPG + WebP delivery',
      'Commercial usage rights',
    ],
  },
  {
    name: 'Corporate Photography',
    type: 'Full Day',
    priceINR: '₹20,000',
    priceMYR: 'MYR 1,100',
    features: [
      'Team portraits (up to 20 staff)',
      'Office/workspace environmental shots',
      'Event coverage',
      '100+ edited images',
      'Delivered within 5 business days',
    ],
  },
  {
    name: 'Brand Video',
    type: '60–90 sec',
    priceINR: '₹35,000–55,000',
    priceMYR: 'MYR 1,900–3,000',
    features: [
      'Script',
      'Direction',
      'Filming + editing',
      'Music + subtitles',
      'One revision round included',
      'Multiple formats for web, YouTube, and social media',
    ],
  },
]

export default function PhotographyVideoPricing({ country: propCountry }) {
  const { country: paramCountry } = useParams()
  const location = useLocation()
  const activeCountry = propCountry || paramCountry || (location.pathname.includes('/malaysia') ? 'malaysia' : 'india')
  const isMalaysia = activeCountry === 'malaysia'

  const countryName = isMalaysia ? 'Malaysia' : 'India'
  const currencyCode = isMalaysia ? 'MYR' : 'INR'

  const pageTitle = `Photography & Video Pricing ${countryName}, Corporate & Brand Visual Packages (${currencyCode}) | Static Savvy Media`
  const pageDescription = `Corporate photography, product photography, and video production pricing in ${countryName} (${currencyCode}). Clear day rates and package prices.`

  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({ title: pageTitle, description: pageDescription, canonical: `${SITE_URL}/pricing/${activeCountry}/photography-video/`, ogType: 'website' })
    const breadcrumbs = breadcrumbListSchema({ items: [
      { name: 'Home', item: `${SITE_URL}/` },
      { name: `${countryName} Pricing`, item: `${SITE_URL}/pricing/${activeCountry}/` },
      { name: 'Photography & Video', item: `${SITE_URL}/pricing/${activeCountry}/photography-video/` },
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
    <div className="photo-pricing-page">
      <Breadcrumbs />
      <HeroSection
        layout="two-column"
        eyebrow={`PHOTOGRAPHY & VIDEO PRICING (${currencyCode})`}
        title={`Photography & Video Production Pricing (${countryName})`}
        subtitle={HERO_SUBTITLE}
        actions={<Button href={whatsappHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">WhatsApp: +91-99440-40345</Button>}
      >
        <div className="hero__visual-side">
          <img src={photographyHeroImg} width={1536} height={1024} fetchPriority="high" alt={`Photography & Video Pricing ${countryName}`} className="hero__image" />
        </div>
      </HeroSection>

      <section className="section photo-pricing-cards">
        <div className="container">
          <div className="photo-pricing-cards__grid">
            {PLANS.map((plan, index) => {
              const displayPrice = isMalaysia ? plan.priceMYR : plan.priceINR
              return (
                <ScrollReveal key={plan.name} delay={index * 100}>
                  <article className="photo-pricing-card glass-card">
                    <div className="photo-pricing-card__icon" aria-hidden="true">
                      {index === 0 && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                      )}
                      {index === 1 && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/><path d="M1 1h4M1 7h4M1 13h4"/></svg>
                      )}
                      {index === 2 && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                      )}
                    </div>
                    <h3 className="photo-pricing-card__name">{plan.name}</h3>
                    <span className="photo-pricing-card__type">{plan.type}</span>
                    <div className="photo-pricing-card__price-block">
                      <p className="photo-pricing-card__price">{displayPrice}</p>
                    </div>
                    <div className="photo-pricing-card__divider" aria-hidden="true" />
                    <span className="photo-pricing-card__includes">Includes:</span>
                    <ul className="photo-pricing-card__features">
                      {plan.features.map((f) => (
                        <li key={f} className="photo-pricing-card__feature">
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

      <PricingNextSteps service="photography" country={activeCountry} />

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
