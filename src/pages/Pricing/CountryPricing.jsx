import { useEffect, useMemo, useState } from 'react'
import ContactFormSection from '../../components/sections/ContactFormSection.jsx'
import WhatsAppIcon from '../../components/common/WhatsAppIcon.jsx'
import { setSeo } from '../../utils/seo.js'
import { faqPageSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { SITE_URL } from '../../utils/constants.js'
import { ORG_SAME_AS } from '../../data/sameAs.js'
import { seoConfig } from '../../data/seoConfig.js'
import { GOOGLE_REVIEWS, GBP_REVIEW_SUMMARY } from '../../data/googleReviews.js'
import {
  PRICING_COUNTRIES, PRICING_SERVICES, UNLISTED_PRICING_PATHS, CURRENCY_NAMES,
  plansFor, compareRows, formatPrice, pricingServiceNodes, pricingFaqsFor,
} from '../../data/masterPricing.js'
import { LANDING_COPY, SOLUTION, PROCESS, TRUST_FACTS, TERMS } from './landingCopy.js'
import founderImg from '../../assets/images/About/DeepanFounder.webp'
import logoImg from '../../assets/images/logo/SSMLOGO.webp'

const ORG_ID = `${SITE_URL}/#organization`
const EMAIL = 'info@staticsavvymedia.com'
const TAB_LABELS = { seo: 'SEO & GBP', website: 'Website', social: 'Social media', leads: 'Lead generation' }

function GoogleG({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  )
}

const ICONS = {
  pin: 'M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Zm0-9a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z',
  web: 'M3 5h18v14H3zM3 9h18M7 7h.01M10 7h.01',
  social: 'M18 8a3 3 0 1 0-2.8-4M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm12 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8.6 13.5l6.8 4M15.4 6.5l-6.8 4',
  leads: 'M3 4h18l-7 9v6l-4 2v-8L3 4Z',
  phone: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z',
  calendar: 'M4 5h16v16H4zM4 10h16M9 3v4M15 3v4',
  mail: 'M3 5h18v14H3zM3 6l9 7 9-7',
  check: 'M20 6 9 17l-5-5',
  alert: 'M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z',
}
function Icon({ name, size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  )
}

function Stars() {
  return <span className="lp-stars" role="img" aria-label="5 out of 5 stars">★★★★★</span>
}

function PlanCard({ service, plan, country, phone }) {
  const isCustom = plan.price == null
  const wa = buildWhatsAppLink(phone, `Hi Static Savvy Media, I'm interested in ${service.title}: ${plan.name} plan (${country.label}).`)
  return (
    <article className={`lp-plan${plan.featured ? ' lp-plan--featured' : ''}`}>
      {plan.featured && <span className="lp-plan__badge">Most popular</span>}
      <h3 className="lp-plan__name">{plan.name}</h3>
      <p className="lp-plan__price">
        {isCustom ? <>Custom<span className="lp-plan__unit">Let&rsquo;s talk</span></> : (
          <>
            {formatPrice(country.key, plan.price)}
            <span className="lp-plan__unit">{service.billing === 'month' ? '/month' : 'one-time'}</span>
          </>
        )}
      </p>
      <div className="lp-plan__notes">
        {service.note && <span className="lp-pill lp-pill--warn">+ {service.note.toLowerCase()}</span>}
        {plan.note && <span className="lp-pill">{plan.note}</span>}
        {!plan.note && service.billing === 'month' && <span className="lp-pill">Monthly · no lock-in</span>}
      </div>
      <ul className="lp-plan__list">
        {plan.features.map((f) => (
          <li key={f} className={/^Everything in/i.test(f) ? 'is-inherit' : undefined}>
            <Icon name="check" size={16} />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <a className={`lp-btn ${plan.featured ? 'lp-btn--primary' : 'lp-btn--ghost'} lp-plan__cta`} href={wa} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon size={18} variant="white" /> {isCustom ? 'Discuss your project' : `Choose ${plan.name}`}
      </a>
    </article>
  )
}

function CompareTable({ service, plans, countryKey }) {
  const rows = compareRows(service, countryKey)
  return (
    <div className="lp-compare">
      <h3 className="lp-compare__title">Compare the {service.title} plans</h3>
      <div className="lp-compare__scroll">
        <table className="lp-compare__table">
          <thead>
            <tr>
              <th scope="col">What&rsquo;s included</th>
              {plans.map((p) => <th key={p.name} scope="col" className={p.featured ? 'is-featured' : undefined}>{p.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label}>
                <th scope="row">{r.label}</th>
                {r.tiers.map((v, i) => (
                  <td key={i} className={plans[i]?.featured ? 'is-featured' : undefined}>
                    {typeof v === 'string' ? <span className="lp-compare__val">{v}</span>
                      : v ? <span className="lp-compare__yes" aria-label="Included"><Icon name="check" size={16} /></span>
                        : <span className="lp-compare__no" aria-label="Not included">&ndash;</span>}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="lp-compare__price-row">
              <th scope="row">Price</th>
              {plans.map((p) => (
                <td key={p.name} className={p.featured ? 'is-featured' : undefined}>
                  {p.price == null ? 'Custom quote' : `${formatPrice(countryKey, p.price)}${service.billing === 'month' ? '/mo' : ''}`}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

/**
 * Unlisted proposal-stage pricing landing page for ONE country (/p/<country>-<random>/):
 * noindex,nofollow, not linked from the site, not in the sitemap or llms.txt. One template, per-country
 * data in landingCopy.js (copy) and masterPricing.js (prices, deliverables, FAQs).
 */
export default function CountryPricing({ country = 'india' }) {
  const c = PRICING_COUNTRIES.find((x) => x.key === country) || PRICING_COUNTRIES[0]
  const copy = LANDING_COPY[c.key]
  const path = UNLISTED_PRICING_PATHS[c.key]
  const faqs = useMemo(() => pricingFaqsFor(c.key), [c.key])
  const [tab, setTab] = useState(PRICING_SERVICES[0].key)
  const phone = copy.phone
  const wa = buildWhatsAppLink(phone.display, `Hi Static Savvy Media, I've seen the ${c.label} plans and would like to discuss my proposal.`)
  const waCall = buildWhatsAppLink(phone.display, `Hi Static Savvy Media, I'd like to book a video call (Google Meet or Zoom) about the ${c.label} plans. My preferred day and time: `)
  const tel = `tel:${phone.tel}`
  const s = GBP_REVIEW_SUMMARY

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
          { '@type': 'Organization', '@id': ORG_ID, name: 'Static Savvy Media', url: `${SITE_URL}/`, telephone: '+91 99440 40345', email: EMAIL, sameAs: ORG_SAME_AS },
          strip(faqPageSchema(faqs)),
        ],
      },
    })
  }, [path, c.key, faqs])

  const showPlans = (key) => {
    setTab(key)
  }

  return (
    <div className="lp" data-country={c.key}>
      {/* ---- Slim header ---- */}
      <header className="lp-top">
        <div className="lp-wrap lp-top__inner">
          <span className="lp-top__logo">
            <img src={logoImg} width={480} height={320} alt="Static Savvy Media" />
          </span>
          <div className="lp-top__actions">
            <a className="lp-top__call" href={tel}><Icon name="phone" size={16} /> <span>{phone.display}</span></a>
            <a className="lp-btn lp-btn--primary lp-btn--sm" href={wa} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={16} variant="white" /> WhatsApp</a>
          </div>
        </div>
      </header>

      {/* ---- 1. Hero (Attention) ---- */}
      <section className="lp-hero" aria-labelledby="lp-h1">
        <div className="lp-wrap lp-hero__grid">
          <div className="lp-hero__copy">
            <p className="lp-eyebrow"><span aria-hidden="true">{c.flag}</span> {copy.eyebrow}</p>
            <h1 id="lp-h1" className="lp-hero__title">{copy.headline}</h1>
            <p className="lp-hero__lead">{copy.promise}</p>
            <div className="lp-hero__ctas">
              <a className="lp-btn lp-btn--primary lp-btn--lg" href={wa} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={20} variant="white" /> WhatsApp {phone.display}</a>
              <a className="lp-btn lp-btn--ghost lp-btn--lg" href="#plans">See plans &amp; prices</a>
            </div>
            <ul className="lp-badges" aria-label="Why clients trust us">
              <li><a href={s.url} target="_blank" rel="noopener noreferrer"><GoogleG /> <strong>{s.rating}★</strong> from {s.count} Google reviews</a></li>
              <li><Icon name="calendar" size={16} /> Founded 2021</li>
              <li><Icon name="pin" size={16} /> Madurai · Thoothukudi · Rawang</li>
            </ul>
            <p className="lp-hero__serve">{copy.serve}</p>
          </div>
          <figure className="lp-founder">
            <div className="lp-founder__frame">
              <img src={founderImg} width={740} height={941} alt="Deepan Kanz, founder of Static Savvy Media" fetchPriority="high" decoding="async" />
            </div>
            <figcaption className="lp-founder__cap">
              <strong>Deepan Kanz</strong>
              <span>Founder, Static Savvy Media</span>
              <span className="lp-founder__quote">&ldquo;Thanks Deepan sir, he explained everything evidently&rdquo; <em>Anish Fathima, Google review</em></span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ---- 2. Problem (Interest) ---- */}
      <section className="lp-section" aria-labelledby="lp-pain">
        <div className="lp-wrap">
          <p className="lp-kicker">Sound familiar?</p>
          <h2 id="lp-pain" className="lp-h2">Why good businesses in {c.label} still miss enquiries</h2>
          <div className="lp-pains">
            {copy.pains.map((p) => (
              <article key={p.title} className="lp-card lp-pain">
                <span className="lp-pain__icon"><Icon name="alert" /></span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Solution + process ---- */}
      <section className="lp-section lp-section--alt" aria-labelledby="lp-solution">
        <div className="lp-wrap">
          <p className="lp-kicker">The solution</p>
          <h2 id="lp-solution" className="lp-h2">One team for the channels that bring you enquiries</h2>
          <div className="lp-solution">
            {SOLUTION.map((x) => (
              <article key={x.title} className="lp-card lp-sol">
                <span className="lp-sol__icon"><Icon name={x.icon} /></span>
                <h3>{x.title}</h3>
                <p>{x.text}</p>
              </article>
            ))}
          </div>
          <h3 className="lp-h3 lp-process__title">How we work, in 4 steps</h3>
          <ol className="lp-process">
            {PROCESS.map((x, i) => (
              <li key={x.title} className="lp-step">
                <span className="lp-step__num">{i + 1}</span>
                <div>
                  <h4>{x.title}</h4>
                  <p>{x.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- 3. Proof (Desire) ---- */}
      <section className="lp-section" aria-labelledby="lp-proof">
        <div className="lp-wrap">
          <p className="lp-kicker">Proof, not promises</p>
          <h2 id="lp-proof" className="lp-h2">What clients say about us on Google</h2>
          <ul className="lp-facts">
            {TRUST_FACTS.map((f) => <li key={f.k}><strong>{f.k}</strong><span>{f.v}</span></li>)}
          </ul>
          <ul className="lp-reviews">
            {GOOGLE_REVIEWS.map((r) => (
              <li key={r.id} className="lp-review">
                <figure>
                  <div className="lp-review__top"><Stars /><span className="lp-review__src"><GoogleG size={14} /> Google</span></div>
                  <blockquote><p>&ldquo;{r.text}&rdquo;</p></blockquote>
                  <figcaption>
                    <span className="lp-review__avatar" aria-hidden="true">{r.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}</span>
                    {r.name}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="lp-note">
            Quoted word for word from our Madurai Google Business Profile.{' '}
            <a href={s.url} target="_blank" rel="noopener noreferrer">Read all {s.count} reviews on Google</a>
          </p>
        </div>
      </section>

      {/* ---- 4. Pricing ---- */}
      <section id="plans" className="lp-section lp-section--alt lp-pricing" aria-labelledby="lp-plans">
        <div className="lp-wrap">
          <p className="lp-kicker">Plans &amp; prices · {c.currency}</p>
          <h2 id="lp-plans" className="lp-h2">Pick the plan that fits where you are now</h2>
          <p className="lp-sub">All prices in {CURRENCY_NAMES[c.key]}. Monthly plans unless noted; websites are a one-time fee; ad spend is extra for social media and lead generation.</p>

          <div className="lp-tabs" role="tablist" aria-label="Services">
            {PRICING_SERVICES.map((sv) => (
              <button
                key={sv.key}
                type="button"
                role="tab"
                id={`lp-tab-${sv.key}`}
                aria-selected={tab === sv.key}
                aria-controls={`lp-panel-${sv.key}`}
                className={`lp-tab${tab === sv.key ? ' is-active' : ''}`}
                onClick={() => showPlans(sv.key)}
              >
                {TAB_LABELS[sv.key]}
              </button>
            ))}
          </div>

          {PRICING_SERVICES.map((sv) => {
            const plans = plansFor(sv, c.key)
            return (
              <div
                key={sv.key}
                id={`lp-panel-${sv.key}`}
                role="tabpanel"
                aria-labelledby={`lp-tab-${sv.key}`}
                className={`lp-panel${tab === sv.key ? ' is-active' : ''}`}
              >
                <div className="lp-panel__head">
                  <h3 className="lp-h3">{sv.title} <span className="lp-pill">{sv.billing === 'month' ? 'Monthly' : 'One-time'}</span>{sv.note && <span className="lp-pill lp-pill--warn">{sv.note}</span>}</h3>
                  <p>{sv.blurb}</p>
                </div>
                <div className="lp-plans">
                  {plans.map((p) => <PlanCard key={p.name} service={sv} plan={p} country={c} phone={phone.display} />)}
                </div>
                <CompareTable service={sv} plans={plans} countryKey={c.key} />
              </div>
            )
          })}

          <div className="lp-terms">
            {TERMS.map((t) => (
              <div key={t.title} className="lp-term">
                <span className="lp-term__icon"><Icon name="shield" size={20} /></span>
                <div><strong>{t.title}</strong><p>{t.text}</p></div>
              </div>
            ))}
          </div>
          <p className="lp-note">Not sure which plan fits? <a href={wa} target="_blank" rel="noopener noreferrer">Send us your website or Google Business Profile</a> and we will recommend one before you commit.</p>
        </div>
      </section>

      {/* ---- 6. FAQ (objections) ---- */}
      <section className="lp-section" aria-labelledby="lp-faq">
        <div className="lp-wrap lp-wrap--narrow">
          <p className="lp-kicker">Before you decide</p>
          <h2 id="lp-faq" className="lp-h2">Questions clients ask before they sign</h2>
          <div className="lp-faq">
            {faqs.map((f, i) => (
              <details key={f.question} className="lp-faq__item" open={i === 0}>
                <summary className="lp-faq__question">{f.question}</summary>
                <p className="lp-faq__answer">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---- 7. Final CTA (Action) ---- */}
      <section className="lp-section lp-final" aria-labelledby="lp-final">
        <div className="lp-wrap">
          <div className="lp-final__panel">
            <h2 id="lp-final" className="lp-h2">Ready to start? Talk to the team that will do the work</h2>
            <p>Tell us which plan you are looking at. We will confirm the scope, answer your questions and send the written quote.</p>
            <div className="lp-final__grid">
              <a className="lp-action lp-action--wa" href={wa} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={24} variant="white" /><span><strong>WhatsApp us</strong><small>{phone.display}</small></span>
              </a>
              <a className="lp-action" href={tel}>
                <Icon name="phone" /><span><strong>Call us</strong><small>{phone.display}</small></span>
              </a>
              <a className="lp-action" href={waCall} target="_blank" rel="noopener noreferrer">
                <Icon name="calendar" /><span><strong>Book a video call</strong><small>Google Meet or Zoom</small></span>
              </a>
              <a className="lp-action" href="#pricing-enquiry">
                <Icon name="mail" /><span><strong>Send an enquiry</strong><small>Form below or {EMAIL}</small></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div id="pricing-enquiry" className="lp-enquiry">
        <ContactFormSection />
      </div>

      <footer className="lp-foot">
        <div className="lp-wrap">
          <p>© Static Savvy Media · Madurai · Thoothukudi · Rawang, Selangor · <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
          <p className="lp-foot__small">This page was shared with you privately as part of a proposal. Prices are valid for {c.label} in {c.currency}.</p>
        </div>
      </footer>

      {/* ---- Sticky mobile CTA bar ---- */}
      <nav className="lp-sticky" aria-label="Quick contact">
        <a className="lp-sticky__wa" href={wa} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} variant="white" /> WhatsApp</a>
        <a href={tel}><Icon name="phone" size={18} /> Call</a>
        <a href="#plans">Plans</a>
      </nav>
    </div>
  )
}
