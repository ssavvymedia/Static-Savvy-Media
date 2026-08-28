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
import {
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
  SITE_URL,
} from '../../utils/constants.js'
import '../../styles/pages/ai-pricing.css'
import aiHeroImg from '../../assets/images/Pricing/06AIsevices.png'

/* ============================================================
   CONTENT, Approved Static Savvy Media AI Pricing Content
   ============================================================ */

const PAGE_TITLE =
  'AI Services Pricing, GEO/AEO, Business Automation & AI Video | Static Savvy Media'

const PAGE_DESCRIPTION =
  'Pricing for GEO/AEO optimization, AI business automation, and AI video creation. Packages for Indian and Malaysian businesses.'

const HERO_SUBTITLE =
  'Prices shown are for guidance. Final pricing depends on project scope. All retainer prices are per month with no minimum contract term. Message us on WhatsApp for a custom quote.'

const PLANS = [
  {
    name: 'GEO/AEO Starter',
    price: '₹15,000 / MYR 800',
    unit: 'per month',
    features:
      'Entity audit, Organization + LocalBusiness + Service schema, FAQPage on 5 pages, 20 Q&A blocks, sameAs build (10 platforms), monthly citation report',
    icon: 'geo',
    relatedService: '/services/geo-aeo-ai-search/',
  },
  {
    name: 'AI Automation Project',
    price: '₹25,000–60,000 / MYR 1,400–3,300',
    unit: 'per project',
    features:
      'WhatsApp automation, lead capture bot, or workflow automation. Scoped and quoted per project. Includes documentation and 30-day support post-launch',
    icon: 'automation',
    relatedService: '/services/ai-business-automation/',
  },
  {
    name: 'AI Video Pack',
    price: '₹18,000 / MYR 1,000',
    unit: 'per pack',
    features:
      '5 AI-generated marketing videos (30–60s each). Scripting, production, Tamil/English/BM voiceover option, and platform-format exports',
    icon: 'video',
    relatedService: '/services/ai-video-creation/',
  },
]

const RELATED_PRICING = [
  { name: 'SEO Pricing', path: '/pricing/seo/' },
  { name: 'Local SEO Pricing', path: '/pricing/local-seo/' },
  { name: 'Google Ads Pricing', path: '/pricing/google-ads/' },
  { name: 'Social Media Pricing', path: '/pricing/social-media-marketing/' },
  { name: 'Website Pricing', path: '/pricing/website-design-development/' },
  { name: 'Photography & Video Pricing', path: '/pricing/photography-video/' },
]

/* ============================================================
   SVG ICONS
   ============================================================ */

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

/* ============================================================
   COMPONENT
   ============================================================ */

export default function AIPricing() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/pricing/ai-services/`,
      ogType: 'website',
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Pricing', item: `${SITE_URL}/pricing/` },
        { name: 'AI Services', item: `${SITE_URL}/pricing/ai-services/` },
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
  }, [])

  const whatsappHref = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)

  return (
    <div className="ai-pricing-page">
      <Breadcrumbs />

      <HeroSection
        layout="two-column"
        eyebrow="AI SERVICES PRICING"
        title="AI Services Pricing, GEO/AEO, Automation & AI Video"
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
          <img src={aiHeroImg} alt="AI Services Pricing" className="hero__image" />
        </div>
      </HeroSection>

      <section className="section ai-pricing-cards">
        <div className="container">
          <div className="ai-pricing-cards__grid">
            {PLANS.map((plan, index) => {
              const Icon = ICONS[plan.icon]
              return (
                <ScrollReveal key={plan.name} delay={index * 100}>
                  <article className="ai-pricing-card glass-card">
                    <div className="ai-pricing-card__icon" aria-hidden="true">
                      <Icon />
                    </div>
                    <h3 className="ai-pricing-card__name">{plan.name}</h3>
                    <p className="ai-pricing-card__price">{plan.price}</p>
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

      <section className="section ai-pricing-related section--alt">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Explore More</span>
            <h2 className="section-heading__title">Other Pricing Pages</h2>
          </div>
          <div className="ai-pricing-related__links">
            {RELATED_PRICING.map((item) => (
              <Link key={item.path} to={item.path} className="ai-pricing-related__link">
                {item.name}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
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
