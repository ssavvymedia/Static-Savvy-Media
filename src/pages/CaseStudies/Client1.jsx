import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import ContactFormSection from '../../components/sections/ContactFormSection.jsx'
import WhatsAppIcon from '../../components/common/WhatsAppIcon.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import { breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL } from '../../utils/constants.js'
import '../../styles/pages/client1.css'
import client1HeroImg from '../../assets/images/CaseStudies/01Client.webp'

const META_TITLE = 'Madurai SEO & Local SEO Case Study | Static Savvy Media'
const META_DESC = 'A Madurai business case study covering SEO and Local SEO, including the challenge, approach, methodology, timeline and verified results.'

const SUMMARY = [
  { label: 'Client', value: 'Verified data to be added' },
  { label: 'Industry', value: 'Verified data to be added' },
  { label: 'Location', value: 'Madurai' },
  { label: 'Services Used', value: 'SEO + Local SEO' },
  { label: 'Timeline', value: 'Verified timeline to be added' },
  { label: 'Primary Result', value: 'Verified result to be added' },
]

const APPROACH_STEPS = [
  { num: '01', title: 'SEO Audit', desc: 'Project implementation details to be added.' },
  { num: '02', title: 'Keyword Strategy', desc: 'Project implementation details to be added.' },
  { num: '03', title: 'Technical SEO', desc: 'Project implementation details to be added.' },
  { num: '04', title: 'On-Page Optimization', desc: 'Project implementation details to be added.' },
  { num: '05', title: 'Local SEO', desc: 'Project implementation details to be added.' },
  { num: '06', title: 'Google Business Profile', desc: 'Project implementation details to be added.' },
  { num: '07', title: 'Local Search Optimization', desc: 'Project implementation details to be added.' },
  { num: '08', title: 'Measurement and Reporting', desc: 'Project implementation details to be added.' },
]

const SEO_STRATEGY = ['Research', 'Keyword Mapping', 'Technical Optimization', 'On-Page SEO', 'Content', 'Authority', 'Measurement']
const LOCAL_SEO_STEPS = ['Google Business Profile', 'Local Keywords', 'NAP Consistency', 'Local Citations', 'Reviews', 'Local Landing Pages', 'Maps Visibility']

const RESULTS_METRICS = [
  { label: 'Organic Traffic', value: 'Verified data pending' },
  { label: 'Organic Enquiries', value: 'Verified data pending' },
  { label: 'Keyword Visibility', value: 'Verified data pending' },
  { label: 'Local Visibility', value: 'Verified data pending' },
  { label: 'Primary Result', value: 'Verified data pending' },
]

const WHAT_CHANGED = [
  { title: 'Search Visibility', desc: 'Improved visibility for relevant search queries.' },
  { title: 'Local Presence', desc: 'Improved local search presence.' },
  { title: 'Website Discoverability', desc: 'Improved organic discoverability.' },
  { title: 'Business Enquiries', desc: 'Measured enquiry impact.' },
]

const TAKEAWAYS = [
  'Search visibility needs a structured SEO strategy.',
  'Local businesses need strong Local SEO and Google Business Profile optimization.',
  'Results should be measured using real data.',
  'SEO and Local SEO work best when connected to actual business goals.',
]

const RELATED = [
  { label: 'GEO/AEO Case Study', path: '/case-studies/client-2/' },
  { label: 'Malaysia SEO and Google Ads Case Study', path: '/case-studies/client-3/' },
  { label: 'Thoothukudi Google Ads and Social Case Study', path: '/case-studies/client-4/' },
]

const SERVICES = [
  { name: 'SEO', desc: 'Search Engine Optimization', path: '/services/seo/' },
  { name: 'Local SEO', desc: 'Local Search Engine Optimization', path: '/services/local-seo/' },
]

const METHODOLOGY_STEPS = ['Challenge', 'Research', 'Strategy', 'Implementation', 'Measurement', 'Results']

export default function Client1() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({ title: META_TITLE, description: META_DESC, canonical: `${SITE_URL}/case-studies/client-1/`, ogType: 'article' })
    const breadcrumbs = breadcrumbListSchema({ items: [
      { name: 'Home', item: `${SITE_URL}/` },
      { name: 'Case Studies', item: `${SITE_URL}/case-studies/` },
      { name: 'Madurai SEO Case Study', item: `${SITE_URL}/case-studies/client-1/` },
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
    <div className="cs1-page">
      <Breadcrumbs />
      <HeroSection
        layout="two-column"
        eyebrow="CASE STUDY · MADURAI"
        title="Madurai SEO and Local SEO Case Study"
        subtitle="A detailed look at the challenge, SEO strategy, Local SEO implementation and measurable outcomes of a Madurai business project."
        actions={<Button href={whatsappHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">WhatsApp: +91 99440 40345</Button>}
      >
        <div className="hero__visual-side">
          <img src={client1HeroImg} width={1536} height={1024} fetchPriority="high" alt="Madurai SEO and Local SEO Case Study" className="hero__image" />
        </div>
      </HeroSection>

      <section className="section cs1-summary">
        <div className="container">
          <div className="cs1-summary__grid">
            {SUMMARY.map((item) => (
              <div key={item.label} className="cs1-summary__item glass-card">
                <span className="cs1-summary__label">{item.label}</span>
                <span className="cs1-summary__value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cs1-challenge section--alt">
        <div className="container">
          <h2 className="cs1-section-title">The Challenge</h2>
          <p className="cs1-body">Verified client challenge details to be added.</p>
        </div>
      </section>

      <section className="section cs1-approach">
        <div className="container">
          <h2 className="cs1-section-title">Our Approach</h2>
          <p className="cs1-body">Project implementation details to be added.</p>
          <div className="cs1-approach__grid">
            {APPROACH_STEPS.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 80}>
                <div className="cs1-approach__step glass-card">
                  <span className="cs1-approach__num">{step.num}</span>
                  <h3 className="cs1-approach__title">{step.title}</h3>
                  <p className="cs1-approach__desc">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section cs1-strategy section--alt">
        <div className="container">
          <h2 className="cs1-section-title">SEO Strategy</h2>
          <div className="cs1-strategy__chain">
            {SEO_STRATEGY.map((step, i) => (
              <div key={step} className="cs1-strategy__node-wrap">
                <div className="cs1-strategy__node glass-card">
                  <span className="cs1-strategy__node-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="cs1-strategy__node-label">{step}</span>
                </div>
                {i < SEO_STRATEGY.length - 1 && <div className="cs1-strategy__line" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cs1-local-seo">
        <div className="container">
          <h2 className="cs1-section-title">Local SEO Strategy</h2>
          <div className="cs1-strategy__chain">
            {LOCAL_SEO_STEPS.map((step, i) => (
              <div key={step} className="cs1-strategy__node-wrap">
                <div className="cs1-strategy__node glass-card cs1-strategy__node--local">
                  <span className="cs1-strategy__node-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="cs1-strategy__node-label">{step}</span>
                </div>
                {i < LOCAL_SEO_STEPS.length - 1 && <div className="cs1-strategy__line cs1-strategy__line--local" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cs1-results section--alt">
        <div className="container">
          <h2 className="cs1-section-title">The Results</h2>
          <div className="cs1-results__grid">
            {RESULTS_METRICS.map((m, i) => (
              <ScrollReveal key={m.label} delay={i * 100}>
                <div className="cs1-results__card glass-card">
                  <span className="cs1-results__label">{m.label}</span>
                  <span className="cs1-results__value">{m.value}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section cs1-timeline">
        <div className="container">
          <h2 className="cs1-section-title">Project Timeline</h2>
          <div className="cs1-timeline__chain">
            {['Start', 'Implementation', 'Optimization', 'Measurement', 'Results'].map((step, i) => (
              <div key={step} className="cs1-timeline__node-wrap">
                <div className="cs1-timeline__node glass-card">
                  <span className="cs1-timeline__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="cs1-timeline__label">{step}</span>
                </div>
                {i < 4 && <div className="cs1-timeline__line" />}
              </div>
            ))}
          </div>
          <p className="cs1-body cs1-body--center">Verified timeline to be added.</p>
        </div>
      </section>

      <section className="section cs1-changed section--alt">
        <div className="container">
          <h2 className="cs1-section-title">What Changed</h2>
          <div className="cs1-changed__grid">
            {WHAT_CHANGED.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 100}>
                <div className="cs1-changed__card glass-card">
                  <h3 className="cs1-changed__title">{item.title}</h3>
                  <p className="cs1-changed__desc">{item.desc}</p>
                  <span className="cs1-changed__status">Verified outcome to be added</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section cs1-takeaways">
        <div className="container">
          <h2 className="cs1-section-title">Key Takeaways</h2>
          <div className="cs1-takeaways__grid">
            {TAKEAWAYS.map((t, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="cs1-takeaway glass-card">
                  <span className="cs1-takeaway__num">{String(i + 1).padStart(2, '0')}</span>
                  <p className="cs1-takeaway__text">{t}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section cs1-testimonial section--alt">
        <div className="container">
          <h2 className="cs1-section-title">What the Client Says</h2>
          <div className="cs1-testimonial__card glass-card">
            <p className="cs1-testimonial__quote">Client testimonial to be added after approval.</p>
          </div>
        </div>
      </section>

      <section className="section cs1-services">
        <div className="container">
          <h2 className="cs1-section-title">Services Used</h2>
          <div className="cs1-services__grid">
            {SERVICES.map((svc) => (
              <Link key={svc.name} to={svc.path} className="cs1-service glass-card">
                <h3 className="cs1-service__name">{svc.name}</h3>
                <p className="cs1-service__desc">{svc.desc}</p>
                <span className="cs1-service__cta">
                  Learn More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section cs1-methodology section--alt">
        <div className="container">
          <h2 className="cs1-section-title">Our Methodology</h2>
          <div className="cs1-methodology__chain">
            {METHODOLOGY_STEPS.map((step, i) => (
              <div key={step} className="cs1-methodology__node-wrap">
                <div className="cs1-methodology__node glass-card">
                  <span className="cs1-methodology__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="cs1-methodology__label">{step}</span>
                </div>
                {i < METHODOLOGY_STEPS.length - 1 && <div className="cs1-methodology__line" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cs1-related">
        <div className="container">
          <h2 className="cs1-section-title">Related Case Studies</h2>
          <div className="cs1-related__grid">
            {RELATED.map((r) => (
              <Link key={r.label} to={r.path} className="cs1-related__card glass-card">
                <h3 className="cs1-related__label">{r.label}</h3>
                <span className="cs1-related__cta">
                  View Case Study
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Want results like these?"
        title="Let us build your SEO and Local SEO strategy"
        subtitle="Every project starts with understanding your business and your market."
        primaryLabel={
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', verticalAlign: 'middle' }}>
            <WhatsAppIcon size={22} />
            <span>WhatsApp: +91 99440 40345</span>
          </span>
        }
        primaryHref={whatsappHref}
        secondaryLabel="View All Case Studies"
        secondaryTo="/case-studies/"
      />
      <ContactFormSection />
    </div>
  )
}
