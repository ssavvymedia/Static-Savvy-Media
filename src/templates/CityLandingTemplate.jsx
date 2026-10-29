import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/common/Breadcrumbs.jsx'
import Button from '../components/common/Button.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import ServicesGrid from '../components/sections/ServicesGrid.jsx'
import FAQSection from '../components/sections/FAQSection.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import ContactFormSection from '../components/sections/ContactFormSection.jsx'
import { ScrollReveal } from '../components/animations/ScrollReveal.jsx'
import { setSeo } from '../utils/seo.js'
import { faqPageSchema, breadcrumbListSchema } from '../utils/schema.js'
import { buildWhatsAppLink } from '../utils/helpers.js'
import { SITE_URL } from '../utils/constants.js'
import { ORG_SAME_AS, GBP_MAPS } from '../data/sameAs.js'
import { PRICE_TIERS, cityPages } from '../data/cityPages.js'
import GoogleReviewsSection from '../components/sections/GoogleReviewsSection.jsx'
import { pickReviews } from '../data/googleReviews.js'
import networkImg from '../assets/images/locations/Locationmain.webp'
import founderImg from '../assets/images/About/DeepanFounder.webp'
import '../styles/pages/city-landing.css'

const SORTLIST_URL = ORG_SAME_AS.find((u) => u.includes('sortlist.com')) || 'https://www.sortlist.com/agency/static-savvy-media'

const PROCESS = [
  { title: 'Free review', text: 'We audit your Google Business Profile, website, competitors and AI-search visibility, and send findings on WhatsApp or a short call.' },
  { title: 'Plan & quote', text: 'A written plan with the pages, profiles and campaigns we will work on first, the monthly fee and the 90-day milestones we will report against.' },
  { title: 'Set-up month', text: 'Profile fixes, tracking (calls, WhatsApp, forms), technical SEO and the first content. You approve anything published in your name.' },
  { title: 'Monthly growth', text: 'Posts, pages, reviews routine and campaign tuning, with a monthly report from your own Google accounts and a review call.' },
]

export default function CityLandingTemplate({ city }) {
  const tiers = PRICE_TIERS[city.region]
  const path = `/locations/${city.slug}/`
  const pageUrl = `${SITE_URL}${path}`
  const waMessage = `Hi Static Savvy Media, I run a business in ${city.name} and would like a free digital marketing review.`
  const waHref = buildWhatsAppLink(city.whatsapp.number, waMessage)
  const reviewsHref = GBP_MAPS.madurai
  const isMalaysia = city.region === 'malaysia'

  useEffect(() => {
    const area = { '@type': city.areaType, name: city.name, ...(city.containedIn ? { containedInPlace: { '@type': city.containedIn === 'Tamil Nadu' ? 'State' : 'Country', name: city.containedIn } } : {}) }
    const service = {
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      name: `Digital marketing in ${city.name}`,
      serviceType: 'Digital marketing',
      url: pageUrl,
      areaServed: area,
      provider: { '@id': `${SITE_URL}/#organization` },
      offers: tiers.plans.map((p) => ({
        '@type': 'Offer',
        name: p.name,
        price: String(p.price),
        priceCurrency: tiers.currency,
        url: pageUrl,
        priceSpecification: { '@type': 'UnitPriceSpecification', price: String(p.price), priceCurrency: tiers.currency, unitText: 'MONTH' },
      })),
    }
    const org = { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'Static Savvy Media', url: `${SITE_URL}/`, telephone: '+91 99440 40345', email: 'info@staticsavvymedia.com', sameAs: ORG_SAME_AS, foundingDate: '2021-10-01' }
    const faq = faqPageSchema(city.faqs)
    const crumbs = breadcrumbListSchema([
      { name: 'Home', item: '/' },
      { name: 'Locations', item: '/locations/' },
      { name: city.name, item: path },
    ])
    const strip = (node) => {
      const rest = { ...node }
      delete rest['@context']
      return rest
    }
    setSeo({
      title: city.title,
      description: city.description,
      canonical: pageUrl,
      ogImage: `${SITE_URL}${networkImg}`,
      schema: { '@context': 'https://schema.org', '@graph': [service, org, strip(faq), strip(crumbs)] },
    })
  }, [city, tiers, path, pageUrl])

  return (
    <div className={`city-page city-page--${city.region}`}>
      <Breadcrumbs />

      {/* ---------------- HERO ---------------- */}
      <section className="city-hero">
        <div className="container city-hero__inner">
          <div className="city-hero__copy">
            <p className="city-eyebrow">{city.eyebrow}</p>
            <h1 className="city-hero__title">{city.h1}</h1>
            <p className="city-hero__lead">{city.answer}</p>
            <div className="city-hero__actions">
              <Button href={waHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">
                WhatsApp {city.whatsapp.display}
              </Button>
              <Button href="#city-enquiry" variant="ghost" size="lg">Get a free review</Button>
            </div>
            <ul className="city-trust" aria-label="Why businesses trust Static Savvy Media">
              <li><a href={reviewsHref} target="_blank" rel="noopener noreferrer"><strong>4.9★</strong> from 106 Google reviews</a></li>
              <li><strong>Since 2021</strong> founded 1 Oct 2021</li>
              <li><a href={SORTLIST_URL} target="_blank" rel="noopener noreferrer"><strong>Sortlist</strong> verified agency profile</a></li>
              <li><strong>3 offices</strong> Madurai · Thoothukudi · Rawang</li>
            </ul>
          </div>
          <figure className="city-hero__founder">
            <img src={founderImg} width={740} height={941} fetchPriority="high" alt={`Deepan Kanz, founder of Static Savvy Media, who leads strategy for ${city.name} clients`} />
            <figcaption><strong>Deepan Kanz</strong> Founder &amp; AI Search Specialist</figcaption>
          </figure>
        </div>
      </section>

      {/* ---------------- INTRO + HOW WE SERVE ---------------- */}
      <section className="section city-intro">
        <div className="container city-intro__grid">
          <div className="city-intro__copy">
            <SectionHeading align="left" eyebrow={`Why ${city.name} is different`} title={`Marketing built for how ${city.name} customers buy`} />
            {city.intro.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </div>
          <aside className="city-card city-serve" aria-label={`How we serve ${city.name}`}>
            <p className="city-serve__label">How we serve {city.name}</p>
            <p className="city-serve__mode">{city.howWeServe.mode}</p>
            <ul className="city-checklist">
              {city.howWeServe.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
            <img className="city-serve__img" src={networkImg} width={1536} height={1024} loading="lazy" alt={`Map of Static Savvy Media offices in Madurai, Thoothukudi and Rawang (Malaysia), the team that serves ${city.name} clients`} />
          </aside>
        </div>
      </section>

      {/* ---------------- INDUSTRIES ---------------- */}
      <section className="section section--alt city-industries">
        <div className="container">
          <SectionHeading eyebrow="Local industries" title={`${city.name} industries we plan campaigns for`} subtitle="Every sector searches differently. This is where we start for each." />
          <div className="city-grid city-grid--2">
            {city.industries.map((ind, i) => (
              <ScrollReveal key={ind.title} delay={i * 60}>
                <article className="city-card city-industry">
                  <h3>{ind.title}</h3>
                  <p>{ind.text}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
          <div className="city-areas">
            <h3>Areas we serve in and around {city.name}</h3>
            <ul>{city.areas.map((a) => <li key={a}>{a}</li>)}</ul>
          </div>
        </div>
      </section>

      {/* ---------------- FIRST PRIORITIES ---------------- */}
      <section className="section city-priorities">
        <div className="container">
          <SectionHeading eyebrow="Our approach" title={`What we do first for a ${city.name} business`} />
          <ol className="city-grid city-grid--2 city-priorities__list">
            {city.priorities.map((p, i) => (
              <li key={p.title} className="city-card">
                <span className="city-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                {p.link && <Link to={p.link.to} className="city-priorities__link">{p.link.label} →</Link>}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- FULL SERVICES GRID ---------------- */}
      <ServicesGrid eyebrow="Services" title={`Every service available to ${city.name} clients`} subtitle="Pick one channel or combine them. Each links to the full service page." />

      {/* ---------------- PROCESS ---------------- */}
      <section className="section section--alt city-process">
        <div className="container">
          <SectionHeading eyebrow="Process" title="How working with us goes" />
          <ol className="city-steps">
            {PROCESS.map((s, i) => (
              <li key={s.title} className="city-step">
                <span className="city-step__n">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- PRICING ---------------- */}
      <section className="section city-pricing" id="pricing">
        <div className="container">
          <SectionHeading eyebrow="Pricing" title={`Monthly plans for ${city.name} (${tiers.currency})`} subtitle="Published monthly prices. Ad spend, if you run ads, is paid directly to Google or Meta." />
          <div className="city-grid city-grid--3">
            {tiers.plans.map((p) => (
              <article key={p.name} className={`city-card city-price${p.popular ? ' city-price--popular' : ''}`}>
                {p.popular && <span className="city-price__badge">Recommended</span>}
                <h3>{p.name}</h3>
                <p className="city-price__amount">{p.display}<span>/month</span></p>
                <ul className="city-checklist">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
                <Button href={buildWhatsAppLink(city.whatsapp.number, `Hi Static Savvy Media, I'm interested in the ${p.name} plan (${p.display}/month) for my ${city.name} business.`)} variant={p.popular ? 'primary' : 'ghost'} size="md" target="_blank" rel="noopener noreferrer">
                  Ask on WhatsApp
                </Button>
              </article>
            ))}
          </div>
          <p className="city-note">
            {tiers.pricingPath !== '/contact/' ? <>Full price list: <Link to={tiers.pricingPath}>{isMalaysia ? 'Malaysia' : 'India'} pricing</Link>. </> : null}
            Website builds, ads management and photography are quoted separately.
          </p>
        </div>
      </section>

      {/* ---------------- RESULTS + REVIEWS ---------------- */}
      <section className="section section--alt city-proof">
        <div className="container city-proof__grid">
          <div className="city-card city-reviews">
            <p className="city-serve__label">Google reviews</p>
            <p className="city-reviews__score">4.9<span>/5</span></p>
            <p className="city-reviews__stars" aria-hidden="true">★★★★★</p>
            <p>Rated 4.9 out of 5 from 106 Google reviews on our Madurai Google Business Profile. Read every review, unedited, on Google.</p>
            <Button href={reviewsHref} variant="ghost" size="md" target="_blank" rel="noopener noreferrer">Read our Google reviews</Button>
          </div>
          <div className="city-card city-results">
            <p className="city-serve__label">Results, honestly</p>
            <h2 className="city-results__title">What we can show you</h2>
            <ul className="city-checklist">
              <li>Our own Madurai site averages position 9.6 on Google for “digital marketing company in madurai” (Google Search Console, 28 Apr–26 Oct 2026). We practise what we sell.</li>
              <li>Client results are shared only with the client’s permission. On a call we walk you through real, anonymised Search Console and Google Business Profile reports relevant to your industry.</li>
              <li>Every client gets reporting from their own Google accounts, so the numbers are never ours to edit.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- GOOGLE REVIEWS (verbatim, visible only, no schema) ---------------- */}
      <GoogleReviewsSection
        reviews={pickReviews(Math.max(0, cityPages.findIndex((c) => c.slug === city.slug)) * 3, 3)}
        title={`What clients say about working with us`}
        subtitle={`Real Google reviews from our Madurai clients. ${city.name} clients get the same team and process.`}
      />

      {/* ---------------- FOUNDER ---------------- */}
      <section className="section city-founder">
        <div className="container city-founder__grid">
          <img src={founderImg} width={740} height={941} loading="lazy" alt="Deepan Kanz, founder and AI search specialist at Static Savvy Media" />
          <div>
            <p className="city-eyebrow">Meet the founder</p>
            <h2>Deepan Kanz plans every {city.name} engagement personally</h2>
            <p>Deepan founded Static Savvy Media in Madurai on 1 October 2021 with a focus on search: SEO, Google Business Profile and, more recently, getting businesses cited by AI assistants (GEO and AEO). He reviews each new client’s plan himself and handles first conversations about strategy.</p>
            <div className="city-hero__actions">
              <Button href={waHref} variant="primary" size="md" target="_blank" rel="noopener noreferrer">WhatsApp Deepan’s team</Button>
              <Button to="/about/deepan-kanz/" variant="ghost" size="md">About Deepan</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <FAQSection eyebrow="FAQs" title={`Questions from ${city.name} businesses`} faqs={city.faqs} />

      {/* ---------------- INTERNAL LINKS ---------------- */}
      <section className="section city-related">
        <div className="container">
          <SectionHeading eyebrow="Keep reading" title={`Guides and services for ${city.name}`} />
          <ul className="city-related__list">
            {city.related.map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}
            <li><Link to="/locations/">All Static Savvy Media locations</Link></li>
          </ul>
        </div>
      </section>

      {/* ---------------- CTA BAND ---------------- */}
      <CTASection
        eyebrow={`Grow in ${city.name}`}
        title={`Get a free review of your ${city.name} business on Google`}
        subtitle="Send us your website or Google Business Profile link. We reply with what to fix first, no obligation."
        primaryLabel={`WhatsApp ${city.whatsapp.display}`}
        primaryHref={waHref}
        secondaryLabel="View all services"
        secondaryTo="/services/"
      />

      {/* ---------------- ENQUIRY FORM ---------------- */}
      <div id="city-enquiry" className="city-enquiry-anchor">
        <ContactFormSection />
      </div>
    </div>
  )
}
