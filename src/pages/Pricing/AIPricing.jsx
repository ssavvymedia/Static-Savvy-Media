import { useEffect, useRef } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import ContactFormSection from '../../components/sections/ContactFormSection.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import { breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import {
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
  SITE_URL,
} from '../../utils/constants.js'
import '../../styles/pages/ai-pricing.css'
import aiHeroImg from '../../assets/images/Pricing/06AIsevices.png'

const HERO_SUBTITLE =
  'Prices shown are for guidance. Final pricing depends on project scope. All retainer prices are per month with no minimum contract term. Message us on WhatsApp for a custom quote.'

const PLANS = [
  {
    name: 'GEO/AEO Starter',
    priceINR: '₹15,000',
    priceMYR: 'MYR 800',
    unit: 'per month',
    features:
      'Entity audit, Organization + LocalBusiness + Service schema, FAQPage on 5 pages, 20 Q&A blocks, sameAs build (10 platforms), monthly citation report',
    icon: 'geo',
    relatedService: '/services/geo-aeo-ai-search/',
  },
  {
    name: 'AI Automation Project',
    priceINR: '₹25,000–60,000',
    priceMYR: 'MYR 1,400–3,300',
    unit: 'per project',
    features:
      'WhatsApp automation, lead capture bot, or workflow automation. Scoped and quoted per project. Includes documentation and 30-day support post-launch',
    icon: 'automation',
    relatedService: '/services/ai-business-automation/',
  },
  {
    name: 'AI Video Pack',
    priceINR: '₹18,000',
    priceMYR: 'MYR 1,000',
    unit: 'per pack',
    features:
      '5 AI-generated marketing videos (30–60s each). Scripting, production, Tamil/English/BM voiceover option, and platform-format exports',
    icon: 'video',
    relatedService: '/services/ai-video-creation/',
  },
]

function GeoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
      <path d="M11 8v6" />
      <path d="M8 11h6" />
    </svg>
  )
}

function AutomationIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M4.93 4.93l2.83 2.83" />
      <path d="M16.24 16.24l2.83 2.83" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="M4.93 19.07l2.83-2.83" />
      <path d="M16.24 7.76l2.83-2.83" />
    </svg>
  )
}

function VideoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}

const ICONS = {
  geo: GeoIcon,
  automation: AutomationIcon,
  video: VideoIcon,
}

export default function AIPricing({ country: propCountry }) {
  const { country: paramCountry } = useParams()
  const location = useLocation()
  const activeCountry = propCountry || paramCountry || (location.pathname.includes('/malaysia') ? 'malaysia' : 'india')
  const isMalaysia = activeCountry === 'malaysia'

  const countryName = isMalaysia ? 'Malaysia' : 'India'
  const currencyCode = isMalaysia ? 'MYR' : 'INR'

  const pageTitle = `AI Services Pricing ${countryName}, GEO/AEO & Business Automation (${currencyCode}) | Static Savvy Media`
  const pageDescription = `Pricing for GEO/AEO optimization, AI business automation, and AI video creation in ${countryName} (${currencyCode}).`

  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: pageTitle,
      description: pageDescription,
      canonical: `${SITE_URL}/pricing/${activeCountry}/ai-services/`,
      ogType: 'website',
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: `${countryName} Pricing`, item: `${SITE_URL}/pricing/${activeCountry}/` },
        { name: 'AI Services', item: `${SITE_URL}/pricing/${activeCountry}/ai-services/` },
      ],
    })

    const scripts = [breadcrumbs].map((data) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.text = JSON.stringify(data)
      document.head.appendChild(script)
      return script
    })
    jsonLdRef.current = scripts

    return () => {
      jsonLdRef.current.forEach((script) => script.remove())
      jsonLdRef.current = []
    }
  }, [activeCountry, countryName, pageTitle, pageDescription])

  const whatsappHref = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)

  return (
    <div className="ai-pricing-page">
      <Breadcrumbs />

      <HeroSection
        layout="two-column"
        eyebrow={`AI SERVICES PRICING (${currencyCode})`}
        title={`AI Services Pricing (${countryName}), GEO/AEO, Automation & AI Video`}
        subtitle={HERO_SUBTITLE}
        actions={
          <Button
            href={whatsappHref}
            variant="primary"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp: +91-99440-40345
          </Button>
        }
      >
        <div className="hero__visual-side">
          <img src={aiHeroImg} alt={`AI Services Pricing ${countryName}`} className="hero__image" />
        </div>
      </HeroSection>

      <section className="section ai-pricing-cards">
        <div className="container">
          <div className="ai-pricing-cards__grid">
            {PLANS.map((plan, index) => {
              const Icon = ICONS[plan.icon]
              const displayPrice = isMalaysia ? plan.priceMYR : plan.priceINR
              return (
                <ScrollReveal key={plan.name} delay={index * 100}>
                  <article className="ai-pricing-card glass-card">
                    <div className="ai-pricing-card__icon" aria-hidden="true">
                      <Icon />
                    </div>
                    <h3 className="ai-pricing-card__name">{plan.name}</h3>
                    <p className="ai-pricing-card__price">{displayPrice}</p>
                    <span className="ai-pricing-card__unit">{plan.unit}</span>
                    <div className="ai-pricing-card__divider" aria-hidden="true" />
                    <span className="ai-pricing-card__includes">Includes:</span>
                    <p className="ai-pricing-card__features">{plan.features}</p>
                    <Link
                      to={plan.relatedService}
                      className="ai-pricing-card__cta btn btn--ghost btn--sm"
                    >
                      Learn more
                    </Link>
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
