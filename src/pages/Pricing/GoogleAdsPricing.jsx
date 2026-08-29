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
import '../../styles/pages/google-ads-pricing.css'
import googleAdsHeroImg from '../../assets/images/Pricing/03googleads.png'

const HERO_SUBTITLE = 'Prices shown are for guidance. Final pricing depends on project scope. All retainer prices are per month with no minimum contract term. Message us on WhatsApp for a custom quote.'

const PLANS = [
  {
    name: 'Starter',
    feeINR: '₹10,000',
    feeMYR: 'MYR 550',
    unit: 'per month (management fee)',
    adSpendINR: '₹15,000–25,000',
    adSpendMYR: 'MYR 800–1,500',
    features: ['1 campaign', 'Keyword research', 'Ad copy (3 variants)', 'Conversion tracking setup', 'Monthly report'],
  },
  {
    name: 'Growth',
    feeINR: '₹18,000',
    feeMYR: 'MYR 950',
    unit: 'per month (management fee)',
    adSpendINR: '₹30,000–60,000',
    adSpendMYR: 'MYR 1,500–3,000',
    features: ['Up to 3 campaigns', 'Remarketing', 'Weekly bid optimisation', 'A/B ad testing', 'Bi-weekly report'],
  },
  {
    name: 'Scale',
    feeINR: '₹32,000',
    feeMYR: 'MYR 1,700',
    unit: 'per month (management fee)',
    adSpendINR: '₹80,000+',
    adSpendMYR: 'MYR 4,000+',
    features: ['Unlimited campaigns', 'Performance Max', 'Shopping campaigns', 'Competitor ad intelligence', 'Weekly reporting'],
  },
]

export default function GoogleAdsPricing({ country: propCountry }) {
  const { country: paramCountry } = useParams()
  const location = useLocation()
  const activeCountry = propCountry || paramCountry || (location.pathname.includes('/malaysia') ? 'malaysia' : 'india')
  const isMalaysia = activeCountry === 'malaysia'

  const countryName = isMalaysia ? 'Malaysia' : 'India'
  const currencyCode = isMalaysia ? 'MYR' : 'INR'

  const pageTitle = `Google Ads Management Pricing ${countryName}, PPC Management Packages (${currencyCode}) | Static Savvy Media`
  const pageDescription = `Transparent Google Ads management pricing for ${countryName} in ${currencyCode}. Starter, Growth, and Scale packages, management fee separate from ad spend.`

  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({ title: pageTitle, description: pageDescription, canonical: `${SITE_URL}/pricing/${activeCountry}/google-ads/`, ogType: 'website' })
    const breadcrumbs = breadcrumbListSchema({ items: [
      { name: 'Home', item: `${SITE_URL}/` },
      { name: `${countryName} Pricing`, item: `${SITE_URL}/pricing/${activeCountry}/` },
      { name: 'Google Ads', item: `${SITE_URL}/pricing/${activeCountry}/google-ads/` },
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
    <div className="gads-pricing-page">
      <Breadcrumbs />
      <HeroSection
        layout="two-column"
        eyebrow={`GOOGLE ADS PRICING (${currencyCode})`}
        title={`Google Ads Pricing (${countryName}), Management Fee Packages`}
        subtitle={HERO_SUBTITLE}
        actions={<Button href={whatsappHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">WhatsApp: +91-99440-40345</Button>}
      >
        <div className="hero__visual-side">
          <img src={googleAdsHeroImg} alt={`Google Ads Pricing ${countryName}`} className="hero__image" />
        </div>
      </HeroSection>

      <section className="section gads-pricing-cards">
        <div className="container">
          <div className="gads-pricing-cards__grid">
            {PLANS.map((plan, index) => {
              const displayFee = isMalaysia ? plan.feeMYR : plan.feeINR
              const displayAdSpend = isMalaysia ? plan.adSpendMYR : plan.adSpendINR
              return (
                <ScrollReveal key={plan.name} delay={index * 100}>
                  <article className="gads-pricing-card glass-card">
                    <h3 className="gads-pricing-card__name">{plan.name}</h3>
                    <div className="gads-pricing-card__fee-block">
                      <span className="gads-pricing-card__fee-label">Management Fee</span>
                      <p className="gads-pricing-card__fee">{displayFee}</p>
                      <span className="gads-pricing-card__unit">{plan.unit}</span>
                    </div>
                    <div className="gads-pricing-card__ad-spend-block">
                      <span className="gads-pricing-card__ad-spend-label">Recommended Ad Spend</span>
                      <p className="gads-pricing-card__ad-spend">{displayAdSpend}</p>
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
              )
            })}
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

      <CTASection
        title="Not sure which tier is right for you?"
        subtitle="Message us on WhatsApp, we will recommend the right starting point for your goals and budget, honestly."
        primaryLabel={'💬 WhatsApp for Custom Quote'}
        primaryHref={whatsappHref}
      />
    </div>
  )
}
