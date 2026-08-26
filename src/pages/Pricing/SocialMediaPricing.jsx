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
import '../../styles/pages/social-media-pricing.css'

const PAGE_TITLE = 'Social Media Marketing Pricing, Monthly Management Packages | Static Savvy Media'
const PAGE_DESCRIPTION = 'Social media management pricing for businesses in India and Malaysia. Platform-based packages covering content creation, paid social, and community management.'
const HERO_SUBTITLE = 'Prices shown are for guidance. Final pricing depends on project scope. All retainer prices are per month with no minimum contract term. Message us on WhatsApp for a custom quote.'

const PLANS = [
  {
    name: 'Starter',
    price: '₹10,000',
    priceAlt: 'MYR 550',
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
    priceAlt: 'MYR 1,000',
    features: [
      '3 platforms',
      '5 posts/week',
      'Static + carousel graphics',
      'Community management (Mon–Fri)',
      '₹5,000 / MYR 300 Meta ad spend managed',
    ],
  },
  {
    name: 'Scale',
    price: '₹32,000',
    priceAlt: 'MYR 1,750',
    features: [
      '4 platforms including LinkedIn',
      'Daily posting',
      'Custom graphics + reel scripts',
      'Full community management',
      '₹15,000+ Meta ads managed',
    ],
  },
]

const PROGRESSION = [
  { tier: 'Starter', items: ['2 platforms', '3 posts/week'] },
  { tier: 'Growth', items: ['3 platforms', '5 posts/week', 'Community management (Mon–Fri)', '₹5,000 / MYR 300 Meta ad spend managed'] },
  { tier: 'Scale', items: ['4 platforms including LinkedIn', 'Daily posting', 'Full community management', '₹15,000+ Meta ads managed'] },
]

const RELATED_PRICING = [
  { name: 'SEO Pricing', path: '/pricing/seo/' },
  { name: 'Local SEO Pricing', path: '/pricing/local-seo/' },
  { name: 'Google Ads Pricing', path: '/pricing/google-ads/' },
  { name: 'Website Pricing', path: '/pricing/website-design-development/' },
  { name: 'AI Services Pricing', path: '/pricing/ai-services/' },
]

export default function SocialMediaPricing() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({ title: PAGE_TITLE, description: PAGE_DESCRIPTION, canonical: `${SITE_URL}/pricing/social-media-marketing/`, ogType: 'website' })
    const breadcrumbs = breadcrumbListSchema({ items: [
      { name: 'Home', item: `${SITE_URL}/` },
      { name: 'Pricing', item: `${SITE_URL}/pricing/` },
      { name: 'Social Media Marketing', item: `${SITE_URL}/pricing/social-media-marketing/` },
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
    <div className="sm-pricing-page">
      <Breadcrumbs />
      <HeroSection
        eyebrow="SOCIAL MEDIA MARKETING PRICING"
        title="Social Media Marketing Pricing"
        subtitle={HERO_SUBTITLE}
        actions={<Button href={whatsappHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">WhatsApp: +91-99440-40345</Button>}
      >
        <div className="sm-hero-visual" aria-hidden="true">
          <div className="sm-hero-visual__card sm-hero-visual__card--ig">
            <div className="sm-hero-visual__card-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </div>
            <div className="sm-hero-visual__card-lines">
              <div className="sm-hero-visual__line sm-hero-visual__line--img" />
              <div className="sm-hero-visual__line sm-hero-visual__line--short" />
              <div className="sm-hero-visual__line sm-hero-visual__line--xs" />
            </div>
          </div>
          <div className="sm-hero-visual__card sm-hero-visual__card--fb">
            <div className="sm-hero-visual__card-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </div>
            <div className="sm-hero-visual__card-lines">
              <div className="sm-hero-visual__line sm-hero-visual__line--med" />
              <div className="sm-hero-visual__line sm-hero-visual__line--long" />
              <div className="sm-hero-visual__line sm-hero-visual__line--short" />
            </div>
          </div>
          <div className="sm-hero-visual__card sm-hero-visual__card--li">
            <div className="sm-hero-visual__card-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </div>
            <div className="sm-hero-visual__card-lines">
              <div className="sm-hero-visual__line sm-hero-visual__line--med" />
              <div className="sm-hero-visual__line sm-hero-visual__line--xs" />
            </div>
          </div>
          <div className="sm-hero-visual__engagement">
            <div className="sm-hero-visual__eng-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
            </div>
            <div className="sm-hero-visual__eng-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </div>
            <div className="sm-hero-visual__eng-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
          </div>
        </div>
      </HeroSection>

      <section className="section sm-pricing-cards">
        <div className="container">
          <div className="sm-pricing-cards__grid">
            {PLANS.map((plan, index) => (
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
                    <span className="sm-pricing-card__price-alt">{plan.priceAlt}</span>
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
            {PROGRESSION.map((step, index) => (
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

      <section className="section sm-pricing-related">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">EXPLORE MORE</span>
            <h2 className="section-heading__title">Other Pricing Pages</h2>
          </div>
          <div className="sm-pricing-related__links">
            {RELATED_PRICING.map((item) => (
              <Link key={item.path} to={item.path} className="sm-pricing-related__link">
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
