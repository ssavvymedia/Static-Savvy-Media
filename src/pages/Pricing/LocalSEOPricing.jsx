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
import '../../styles/pages/local-seo-pricing.css'

const PAGE_TITLE = 'Local SEO Pricing, Google Maps & GBP Optimization Plans | Static Savvy Media'
const PAGE_DESCRIPTION = 'Transparent local SEO pricing for Tamil Nadu and Malaysia businesses. GBP optimization, citation building, and review management packages.'
const HERO_SUBTITLE = 'Prices shown are for guidance. Final pricing depends on project scope. All retainer prices are per month with no minimum contract term. Message us on WhatsApp for a custom quote.'

const PLANS = [
  {
    name: 'Starter',
    price: '₹8,000 / MYR 450',
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
    price: '₹15,000 / MYR 800',
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
    price: '₹28,000 / MYR 1,500',
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

const RELATED_PRICING = [
  { name: 'SEO Pricing', path: '/pricing/seo/' },
  { name: 'Google Ads Pricing', path: '/pricing/google-ads/' },
  { name: 'Social Media Pricing', path: '/pricing/social-media-marketing/' },
  { name: 'Website Pricing', path: '/pricing/website-design-development/' },
  { name: 'AI Services Pricing', path: '/pricing/ai-services/' },
]

export default function LocalSEOPricing() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({ title: PAGE_TITLE, description: PAGE_DESCRIPTION, canonical: `${SITE_URL}/pricing/local-seo/`, ogType: 'website' })
    const breadcrumbs = breadcrumbListSchema({ items: [
      { name: 'Home', item: `${SITE_URL}/` },
      { name: 'Pricing', item: `${SITE_URL}/pricing/` },
      { name: 'Local SEO', item: `${SITE_URL}/pricing/local-seo/` },
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
    <div className="local-seo-pricing-page">
      <Breadcrumbs />
      <HeroSection
        eyebrow="LOCAL SEO PRICING"
        title="Local SEO Pricing, Google Maps Domination Plans"
        subtitle={HERO_SUBTITLE}
        actions={<Button href={whatsappHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">WhatsApp: +91-99440-40345</Button>}
      >
        <div className="lseo-hero-visual" aria-hidden="true">
          <div className="lseo-hero-visual__map">
            <div className="lseo-hero-visual__pin lseo-hero-visual__pin--1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div className="lseo-hero-visual__pin lseo-hero-visual__pin--2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div className="lseo-hero-visual__pin lseo-hero-visual__pin--3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div className="lseo-hero-visual__grid-lines" />
          </div>
          <div className="lseo-hero-visual__card">
            <div className="lseo-hero-visual__card-header">
              <div className="lseo-hero-visual__card-avatar" />
              <div className="lseo-hero-visual__card-info">
                <span className="lseo-hero-visual__card-name">Your Business</span>
                <span className="lseo-hero-visual__card-stars">★★★★★</span>
                <span className="lseo-hero-visual__card-reviews">120+ reviews</span>
              </div>
            </div>
            <div className="lseo-hero-visual__card-signals">
              <span className="lseo-hero-visual__signal">GBP</span>
              <span className="lseo-hero-visual__signal">Citations</span>
              <span className="lseo-hero-visual__signal">Reviews</span>
            </div>
          </div>
        </div>
      </HeroSection>

      <section className="section lseo-pricing-cards">
        <div className="container">
          <div className="lseo-pricing-cards__grid">
            {PLANS.map((plan, index) => (
              <ScrollReveal key={plan.name} delay={index * 100}>
                <article className="lseo-pricing-card glass-card">
                  <h3 className="lseo-pricing-card__name">{plan.name}</h3>
                  <div className="lseo-pricing-card__price-block">
                    <p className="lseo-pricing-card__price">{plan.price}</p>
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
            ))}
          </div>
        </div>
      </section>

      <section className="section lseo-pricing-related">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Explore More</span>
            <h2 className="section-heading__title">Other Pricing Pages</h2>
          </div>
          <div className="lseo-pricing-related__links">
            {RELATED_PRICING.map((item) => (
              <Link key={item.path} to={item.path} className="lseo-pricing-related__link">
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
