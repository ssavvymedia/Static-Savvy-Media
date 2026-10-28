import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import SectionHeading from '../../components/common/SectionHeading.jsx'
import FAQSection from '../../components/sections/FAQSection.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import ContactFormSection from '../../components/sections/ContactFormSection.jsx'
import { setSeo } from '../../utils/seo.js'
import { faqPageSchema, breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { SITE_URL } from '../../utils/constants.js'
import { ORG_SAME_AS } from '../../data/sameAs.js'
import { seoConfig } from '../../data/seoConfig.js'
import {
  PRICING_COUNTRIES, PRICING_SERVICES, PRICING_FAQS, COUNTRY_PRICING_LINKS,
  plansFor, formatPrice, pricingServiceNodes,
} from '../../data/masterPricing.js'
import '../../styles/pages/pricing-master.css'

const ORG_ID = `${SITE_URL}/#organization`

function PlanCard({ service, plan, country }) {
  const isCustom = plan.price == null
  const wa = buildWhatsAppLink(country.whatsapp, `Hi Static Savvy Media, I'm interested in ${service.title}: ${plan.name} plan (${country.label}).`)
  return (
    <article className={`ph-card${plan.featured ? ' ph-card--featured' : ''}`}>
      {plan.featured && <span className="ph-card__badge">Recommended</span>}
      <h4 className="ph-card__name">{plan.name}</h4>
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

export default function PricingHub() {
  const [active, setActive] = useState('india')

  useEffect(() => {
    const fromHash = window.location.hash.replace('#', '')
    if (PRICING_COUNTRIES.some((c) => c.key === fromHash)) setActive(fromHash) // eslint-disable-line react-hooks/set-state-in-effect
  }, [])

  useEffect(() => {
    const cfg = seoConfig['/pricing'].seo
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
          { '@type': 'WebPage', '@id': `${SITE_URL}/pricing/#webpage`, name: 'Digital Marketing Pricing', url: `${SITE_URL}/pricing/`, about: { '@id': ORG_ID }, publisher: { '@id': ORG_ID } },
          ...pricingServiceNodes(SITE_URL, ORG_ID),
          { '@type': 'Organization', '@id': ORG_ID, name: 'Static Savvy Media', url: `${SITE_URL}/`, telephone: '+91 99440 40345', email: 'info@staticsavvymedia.com', sameAs: ORG_SAME_AS },
          strip(faqPageSchema(PRICING_FAQS)),
          strip(breadcrumbListSchema([{ name: 'Home', item: '/' }, { name: 'Pricing', item: '/pricing/' }])),
        ],
      },
    })
  }, [])

  const choose = (key) => {
    setActive(key)
    if (typeof window !== 'undefined') window.history.replaceState(null, '', `#${key}`)
  }

  return (
    <div className="pricing-hub">
      <Breadcrumbs />

      <section className="ph-hero">
        <div className="container">
          <p className="ph-eyebrow">Pricing · India · Malaysia · Dubai · Singapore</p>
          <h1 className="ph-hero__title">Digital Marketing Pricing for India, Malaysia, Dubai and Singapore</h1>
          <p className="ph-hero__lead">
            Clear prices in your local currency for SEO &amp; Google Business Profile, website development, social media marketing and lead generation.
            Monthly plans unless noted; websites are a one-time fee; ad spend is extra for social media and lead generation.
          </p>
          <div className="ph-hero__actions">
            <Button href={buildWhatsAppLink('+91 99440 40345', 'Hi Static Savvy Media, I would like to discuss your pricing.')} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">WhatsApp +91 99440 40345</Button>
            <Button href="#pricing-enquiry" variant="ghost" size="lg">Send an enquiry</Button>
          </div>
        </div>
      </section>

      <section className="section ph-plans" aria-label="Prices by country">
        <div className="container">
          <div className="ph-tabs" role="tablist" aria-label="Choose your country">
            {PRICING_COUNTRIES.map((c) => (
              <button
                key={c.key}
                type="button"
                role="tab"
                id={`tab-${c.key}`}
                aria-controls={`panel-${c.key}`}
                aria-selected={active === c.key}
                className={`ph-tab${active === c.key ? ' is-active' : ''}`}
                onClick={() => choose(c.key)}
              >
                <span aria-hidden="true">{c.flag}</span> {c.label} <span className="ph-tab__cur">{c.currency}</span>
              </button>
            ))}
          </div>

          {/* Every country panel is in the HTML; the tabs only toggle visibility. */}
          {PRICING_COUNTRIES.map((c) => (
            <div
              key={c.key}
              id={`panel-${c.key}`}
              role="tabpanel"
              aria-labelledby={`tab-${c.key}`}
              className={`ph-panel${active === c.key ? ' is-active' : ''}`}
            >
              <h2 className="ph-panel__title">{c.flag} {c.label} pricing ({c.currency})</h2>
              {PRICING_SERVICES.map((s) => (
                <div key={s.key} className="ph-service">
                  <div className="ph-service__head">
                    <h3>{s.title} <span className="ph-service__tag">{s.billing === 'month' ? 'Monthly' : 'One-time'}{s.note ? ` · ${s.note}` : ''}</span></h3>
                    <p>{s.blurb}</p>
                  </div>
                  <div className="ph-grid">
                    {plansFor(s, c.key).map((p) => <PlanCard key={p.name} service={s} plan={p} country={c} />)}
                  </div>
                </div>
              ))}
              <p className="ph-panel__more">
                {COUNTRY_PRICING_LINKS[c.key].pages.length > 0 ? (
                  <>
                    More detail: <Link to={COUNTRY_PRICING_LINKS[c.key].hub}>{c.label} pricing guide</Link>
                    {COUNTRY_PRICING_LINKS[c.key].pages.map(([label, to]) => (
                      <span key={to}> · <Link to={to}>{label}</Link></span>
                    ))}
                  </>
                ) : (
                  <>See how we work with {c.label} businesses: <Link to={COUNTRY_PRICING_LINKS[c.key].hub}>Digital marketing for {c.label}</Link></>
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--alt ph-links">
        <div className="container">
          <SectionHeading eyebrow="Detailed pricing" title="Country pricing guides" subtitle="Service-by-service pricing pages for India and Malaysia, and our Dubai and Singapore pages." />
          <div className="ph-links__grid">
            {PRICING_COUNTRIES.map((c) => (
              <div key={c.key} className="ph-links__col">
                <h3><Link to={COUNTRY_PRICING_LINKS[c.key].hub}>{c.flag} {c.label}</Link></h3>
                <ul>
                  {COUNTRY_PRICING_LINKS[c.key].pages.map(([label, to]) => <li key={to}><Link to={to}>{label} pricing</Link></li>)}
                  {COUNTRY_PRICING_LINKS[c.key].pages.length === 0 && <li><Link to={COUNTRY_PRICING_LINKS[c.key].hub}>Digital marketing in {c.label}</Link></li>}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection eyebrow="Pricing FAQs" title="Questions about our pricing" faqs={PRICING_FAQS} />

      <CTASection
        title="Not sure which plan fits?"
        subtitle="Send us your website or Google Business Profile and we will recommend a plan before you commit."
        primaryLabel="WhatsApp us"
        primaryHref={buildWhatsAppLink('+91 99440 40345', 'Hi Static Savvy Media, which plan would suit my business?')}
        secondaryLabel="Contact us"
        secondaryTo="/contact/"
      />

      <div id="pricing-enquiry" className="ph-enquiry-anchor">
        <ContactFormSection />
      </div>
    </div>
  )
}
