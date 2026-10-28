import { useEffect, useMemo } from 'react'
import Button from '../../components/common/Button.jsx'
import FAQSection from '../../components/sections/FAQSection.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import ContactFormSection from '../../components/sections/ContactFormSection.jsx'
import { setSeo } from '../../utils/seo.js'
import { faqPageSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { SITE_URL } from '../../utils/constants.js'
import { ORG_SAME_AS } from '../../data/sameAs.js'
import { seoConfig } from '../../data/seoConfig.js'
import {
  PRICING_COUNTRIES, PRICING_SERVICES, UNLISTED_PRICING_PATHS,
  plansFor, formatPrice, pricingServiceNodes, pricingFaqsFor,
} from '../../data/masterPricing.js'
import '../../styles/pages/pricing-master.css'

const ORG_ID = `${SITE_URL}/#organization`

function PlanCard({ service, plan, country }) {
  const isCustom = plan.price == null
  const wa = buildWhatsAppLink(country.whatsapp, `Hi Static Savvy Media, I'm interested in ${service.title}: ${plan.name} plan (${country.label}).`)
  return (
    <article className={`ph-card${plan.featured ? ' ph-card--featured' : ''}`}>
      {plan.featured && <span className="ph-card__badge">Recommended</span>}
      <h3 className="ph-card__name">{plan.name}</h3>
      <p className="ph-card__price">
        {isCustom ? <>Custom <span className="ph-card__unit">Let&rsquo;s talk</span></> : (
          <>
            {formatPrice(country.key, plan.price)}
            <span className="ph-card__unit">{service.billing === 'month' ? '/month' : ' one-time'}</span>
          </>
        )}
      </p>
      {service.note && <p className="ph-card__note">{service.note}</p>}
      {plan.note && <p className="ph-card__note">{plan.note}</p>}
      {plan.features && (
        <ul className="ph-card__list">
          {plan.features.map((f) => <li key={f}>{f}</li>)}
        </ul>
      )}
      <div className="ph-card__actions">
        <Button href={wa} variant={plan.featured ? 'primary' : 'ghost'} size="md" target="_blank" rel="noopener noreferrer">WhatsApp us</Button>
        <a className="ph-card__enquire" href="#pricing-enquiry">Send an enquiry</a>
      </div>
    </article>
  )
}

/**
 * Unlisted pricing page for ONE country (/p/<country>-<random>/): noindex,nofollow, not linked
 * from the site, not in the sitemap or llms.txt. Shares the design of the old /pricing/ hub.
 */
export default function CountryPricing({ country = 'india' }) {
  const c = PRICING_COUNTRIES.find((x) => x.key === country) || PRICING_COUNTRIES[0]
  const path = UNLISTED_PRICING_PATHS[c.key]
  const faqs = useMemo(() => pricingFaqsFor(c.key), [c.key])
  const wa = buildWhatsAppLink(c.whatsapp, `Hi Static Savvy Media, I would like to discuss your ${c.label} pricing.`)

  useEffect(() => {
    const cfg = seoConfig[path.replace(/\/$/, '')].seo
    const strip = (node) => {
      const rest = { ...node }
      delete rest['@context']
      return rest
    }
    setSeo({
      ...cfg,
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          ...pricingServiceNodes(SITE_URL, ORG_ID, c.key),
          { '@type': 'Organization', '@id': ORG_ID, name: 'Static Savvy Media', url: `${SITE_URL}/`, telephone: '+91 99440 40345', email: 'info@staticsavvymedia.com', sameAs: ORG_SAME_AS },
          strip(faqPageSchema(faqs)),
        ],
      },
    })
  }, [path, c.key, faqs])

  return (
    <div className="pricing-hub">
      <section className="ph-hero">
        <div className="container">
          <p className="ph-eyebrow">{c.flag} {c.label} pricing · {c.currency}</p>
          <h1 className="ph-hero__title">Digital Marketing Pricing for {c.label}</h1>
          <p className="ph-hero__lead">
            Prices in {c.currency} for SEO &amp; Google Business Profile, website development, social media marketing and lead generation.
            Monthly plans unless noted; websites are a one-time fee; ad spend is extra for social media and lead generation.
          </p>
          <div className="ph-hero__actions">
            <Button href={wa} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">WhatsApp {c.whatsapp}</Button>
            <Button href="#pricing-enquiry" variant="ghost" size="lg">Send an enquiry</Button>
          </div>
        </div>
      </section>

      <section className="section ph-plans" aria-label={`${c.label} prices`}>
        <div className="container">
          {PRICING_SERVICES.map((s) => (
            <div key={s.key} className="ph-service">
              <div className="ph-service__head">
                <h2>{s.title} <span className="ph-service__tag">{s.billing === 'month' ? 'Monthly' : 'One-time'}{s.note ? ` · ${s.note}` : ''}</span></h2>
                <p>{s.blurb}</p>
              </div>
              <div className="ph-grid">
                {plansFor(s, c.key).map((p) => <PlanCard key={p.name} service={s} plan={p} country={c} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <FAQSection eyebrow="Pricing FAQs" title="Questions about our pricing" faqs={faqs} />

      <CTASection
        title="Not sure which plan fits?"
        subtitle="Send us your website or Google Business Profile and we will recommend a plan before you commit."
        primaryLabel="WhatsApp us"
        primaryHref={wa}
      />

      <div id="pricing-enquiry" className="ph-enquiry-anchor">
        <ContactFormSection />
      </div>
    </div>
  )
}
