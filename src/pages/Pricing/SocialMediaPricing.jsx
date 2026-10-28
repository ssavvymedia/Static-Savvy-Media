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
import '../../styles/pages/social-media-pricing.css'
import socialMediaHeroImg from '../../assets/images/Pricing/04socialmedia.webp'

const HERO_SUBTITLE = 'Prices shown are for guidance. Final pricing depends on project scope. All retainer prices are per month with no minimum contract term. Message us on WhatsApp for a custom quote.'

const PLANS_INDIA = [
  {
    name: 'Starter',
    price: '₹10,000',
    features: [
      '2 platforms',
      '3 posts/week',
      'Static graphic design',
      'Caption writing',
      'Monthly analytics report',
    ],
  },
  {
    name: 'Growth',
    price: '₹18,000',
    features: [
      '3 platforms',
      '5 posts/week',
      'Static + carousel graphics',
      'Community management (Mon–Fri)',
      '₹5,000 Meta ad spend managed',
    ],
  },
  {
    name: 'Scale',
    price: '₹32,000',
    features: [
      '4 platforms including LinkedIn',
      'Daily posting',
      'Custom graphics + reel scripts',
      'Full community management',
      '₹15,000+ Meta ads managed',
    ],
  },
]

const PLANS_MALAYSIA = [
  {
    name: 'Starter',
    price: 'MYR 550',
    features: [
      '2 platforms',
      '3 posts/week',
      'Static graphic design',
      'Caption writing',
      'Monthly analytics report',
    ],
  },
  {
    name: 'Growth',
    price: 'MYR 1,000',
    features: [
      '3 platforms',
      '5 posts/week',
      'Static + carousel graphics',
      'Community management (Mon–Fri)',
      'MYR 300 Meta ad spend managed',
    ],
  },
  {
    name: 'Scale',
    price: 'MYR 1,750',
    features: [
      '4 platforms including LinkedIn',
      'Daily posting',
      'Custom graphics + reel scripts',
      'Full community management',
      'MYR 900+ Meta ads managed',
    ],
  },
]

const PROGRESSION_INDIA = [
  { tier: 'Starter', items: ['2 platforms', '3 posts/week'] },
  { tier: 'Growth', items: ['3 platforms', '5 posts/week', 'Community management (Mon–Fri)', '₹5,000 Meta ad spend managed'] },
  { tier: 'Scale', items: ['4 platforms including LinkedIn', 'Daily posting', 'Full community management', '₹15,000+ Meta ads managed'] },
]

const PROGRESSION_MALAYSIA = [
  { tier: 'Starter', items: ['2 platforms', '3 posts/week'] },
  { tier: 'Growth', items: ['3 platforms', '5 posts/week', 'Community management (Mon–Fri)', 'MYR 300 Meta ad spend managed'] },
  { tier: 'Scale', items: ['4 platforms including LinkedIn', 'Daily posting', 'Full community management', 'MYR 900+ Meta ads managed'] },
]

export default function SocialMediaPricing({ country: propCountry }) {
  const { country: paramCountry } = useParams()
  const location = useLocation()
  const activeCountry = propCountry || paramCountry || (location.pathname.includes('/malaysia') ? 'malaysia' : 'india')
  const isMalaysia = activeCountry === 'malaysia'

  const countryName = isMalaysia ? 'Malaysia' : 'India'
  const currencyCode = isMalaysia ? 'MYR' : 'INR'

  const plans = isMalaysia ? PLANS_MALAYSIA : PLANS_INDIA
  const progression = isMalaysia ? PROGRESSION_MALAYSIA : PROGRESSION_INDIA

  const pageTitle = `Social Media Marketing Pricing ${countryName}, Monthly Packages (${currencyCode}) | Static Savvy Media`
  const pageDescription = `Social media management pricing for businesses in ${countryName} (${currencyCode}). Platform-based packages covering content creation, paid social, and community management.`

  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({ title: pageTitle, description: pageDescription, canonical: `${SITE_URL}/pricing/${activeCountry}/social-media/`, ogType: 'website' })
    const breadcrumbs = breadcrumbListSchema({ items: [
      { name: 'Home', item: `${SITE_URL}/` },
      { name: `${countryName} Pricing`, item: `${SITE_URL}/pricing/${activeCountry}/` },
      { name: 'Social Media', item: `${SITE_URL}/pricing/${activeCountry}/social-media/` },
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
    <div className="sm-pricing-page">
      <Breadcrumbs />
      <HeroSection
        layout="two-column"
        eyebrow={`SOCIAL MEDIA MARKETING PRICING (${currencyCode})`}
        title={`Social Media Marketing Pricing (${countryName})`}
        subtitle={HERO_SUBTITLE}
        actions={<Button href={whatsappHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">WhatsApp: +91 99440 40345</Button>}
      >
        <div className="hero__visual-side">
          <img src={socialMediaHeroImg} width={1536} height={1024} fetchPriority="high" alt={`Social Media Pricing ${countryName}`} className="hero__image" />
        </div>
      </HeroSection>

      <section className="section sm-pricing-cards">
        <div className="container">
          <div className="sm-pricing-cards__grid">
            {plans.map((plan, index) => (
              <ScrollReveal key={plan.name} delay={index * 100}>
                <article className="sm-pricing-card glass-card">
                  <div className="sm-pricing-card__icon" aria-hidden="true">
                    {index === 0 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    )}
                    {index === 1 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                    )}
                    {index === 2 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    )}
                  </div>
                  <h3 className="sm-pricing-card__name">{plan.name}</h3>
                  <div className="sm-pricing-card__price-block">
                    <p className="sm-pricing-card__price">{plan.price}</p>
                    <span className="sm-pricing-card__unit">per month</span>
                  </div>
                  <div className="sm-pricing-card__divider" aria-hidden="true" />
                  <span className="sm-pricing-card__includes">Includes:</span>
                  <ul className="sm-pricing-card__features">
                    {plan.features.map((f) => (
                      <li key={f} className="sm-pricing-card__feature">
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

      <section className="section sm-pricing-progression section--alt">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">GROWTH PATH</span>
            <h2 className="section-heading__title">Your Social Media Journey</h2>
          </div>
          <div className="sm-progression__grid">
            {progression.map((step, index) => (
              <ScrollReveal key={step.tier} delay={index * 120}>
                <div className="sm-progression__step glass-card">
                  <div className="sm-progression__step-header">
                    <span className="sm-progression__step-num">0{index + 1}</span>
                    <h3 className="sm-progression__step-tier">{step.tier}</h3>
                  </div>
                  <ul className="sm-progression__step-items">
                    {step.items.map((item) => (
                      <li key={item} className="sm-progression__step-item">
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

      <PricingNextSteps service="social-media" country={activeCountry} />

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
