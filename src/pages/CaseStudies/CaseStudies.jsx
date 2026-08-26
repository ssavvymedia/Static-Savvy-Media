import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import SectionHeading from '../../components/common/SectionHeading.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import { breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL } from '../../utils/constants.js'
import '../../styles/pages/case-studies.css'

const PAGE_TITLE = 'Client Results & Case Studies | Static Savvy Media'
const PAGE_DESCRIPTION = 'See how Static Savvy Media approaches real digital growth challenges across SEO, Local SEO, GEO/AEO, Google Ads, Social Media and other digital services.'
const HERO_SUBTITLE = 'See how Static Savvy Media approaches real digital growth challenges across SEO, Local SEO, GEO/AEO, Google Ads, Social Media and other digital services.'

const FILTERS = ['All', 'SEO', 'Local SEO', 'GEO/AEO', 'Google Ads', 'Social Media', 'Malaysia', 'Madurai', 'Thoothukudi']

const CASE_STUDIES = [
  {
    title: 'SEO + Local SEO, Madurai Case Study',
    summary: 'Case Study Coming Soon',
    industry: 'Digital Growth',
    location: 'Madurai',
    services: ['SEO', 'Local SEO'],
    slug: '/case-studies/client-1/',
    verified: false,
  },
  {
    title: 'GEO/AEO + SEO Case Study',
    summary: 'Case Study Coming Soon',
    industry: 'AI Search Visibility',
    location: 'India',
    services: ['GEO/AEO', 'SEO'],
    slug: '/case-studies/client-2/',
    verified: false,
  },
  {
    title: 'Malaysia SEO & Google Ads Case Study',
    summary: 'Case Study Coming Soon',
    industry: 'SME Growth',
    location: 'Malaysia',
    services: ['SEO', 'Google Ads'],
    slug: '/case-studies/client-3/',
    verified: false,
  },
  {
    title: 'Thoothukudi Google Ads + Social Case Study',
    summary: 'Case Study Coming Soon',
    industry: 'Industrial',
    location: 'Thoothukudi',
    services: ['Google Ads', 'Social Media'],
    slug: '/case-studies/client-4/',
    verified: false,
  },
]

const METHODOLOGY = [
  { num: '01', title: 'Challenge', desc: 'Understand the actual business problem before selecting the digital strategy.' },
  { num: '02', title: 'Strategy', desc: 'Build a focused strategy around the client\'s goals, market and audience.' },
  { num: '03', title: 'Implementation', desc: 'Execute the agreed SEO, advertising, content, website or digital marketing activities.' },
  { num: '04', title: 'Results', desc: 'Measure the actual outcome using verifiable data.' },
]

export default function CaseStudies() {
  const jsonLdRef = useRef([])
  const [activeFilter, setActiveFilter] = useState('All')

  useEffect(() => {
    setSeo({ title: PAGE_TITLE, description: PAGE_DESCRIPTION, canonical: `${SITE_URL}/case-studies/`, ogType: 'website' })
    const breadcrumbs = breadcrumbListSchema({ items: [
      { name: 'Home', item: `${SITE_URL}/` },
      { name: 'Case Studies', item: `${SITE_URL}/case-studies/` },
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

  const filteredStudies = activeFilter === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((s) => s.services.includes(activeFilter) || s.location === activeFilter)

  return (
    <div className="cs-page">
      <Breadcrumbs />
      <HeroSection
        eyebrow="CASE STUDIES"
        title="Client Results & Case Studies"
        subtitle={HERO_SUBTITLE}
        actions={<Button href={whatsappHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">Let's Talk</Button>}
      >
        <div className="cs-hero-visual" aria-hidden="true">
          <div className="cs-hero-visual__dashboard">
            <div className="cs-hero-visual__dash-bar" />
            <div className="cs-hero-visual__dash-row">
              <div className="cs-hero-visual__dash-chart">
                <svg width="100%" height="60" viewBox="0 0 200 60" fill="none">
                  <polyline points="0,50 30,40 60,45 90,30 120,25 150,15 180,10 200,8" stroke="url(#cs-grad1)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7"/>
                  <defs><linearGradient id="cs-grad1" x1="0" y1="0" x2="200" y2="0"><stop offset="0%" stopColor="rgba(139,92,246,0.4)"/><stop offset="100%" stopColor="rgba(34,211,238,0.7)"/></linearGradient></defs>
                </svg>
              </div>
              <div className="cs-hero-visual__dash-metrics">
                <div className="cs-hero-visual__dash-metric" />
                <div className="cs-hero-visual__dash-metric" />
                <div className="cs-hero-visual__dash-metric" />
              </div>
            </div>
          </div>
          <div className="cs-hero-visual__badges">
            <div className="cs-hero-visual__badge">SEO</div>
            <div className="cs-hero-visual__badge cs-hero-visual__badge--accent">GEO/AEO</div>
            <div className="cs-hero-visual__badge">Google Ads</div>
            <div className="cs-hero-visual__badge cs-hero-visual__badge--accent">Social</div>
          </div>
        </div>
      </HeroSection>

      <section className="section cs-intro">
        <div className="container">
          <div className="cs-intro__inner glass-card">
            <h2 className="cs-intro__title">Real Work. Real Challenges. Real Results.</h2>
            <p className="cs-intro__text">Our case studies document the problem, strategy, implementation and measurable outcomes behind selected client projects.</p>
            <p className="cs-intro__text">Every result shown on this page should be based on real, verifiable project data.</p>
            <p className="cs-intro__text">We focus on the methodology as much as the outcome, so potential clients can understand not only what changed, but how the work was done.</p>
          </div>
        </div>
      </section>

      <section className="section cs-directory">
        <div className="container">
          <div className="cs-filters">
            {FILTERS.map((f) => (
              <button key={f} className={`cs-filter ${activeFilter === f ? 'cs-filter--active' : ''}`} onClick={() => setActiveFilter(f)}>{f}</button>
            ))}
          </div>
          <div className="cs-grid">
            {filteredStudies.map((study, index) => (
              <ScrollReveal key={study.slug} delay={index * 100}>
                <article className="cs-card glass-card">
                  <div className="cs-card__visual" aria-hidden="true">
                    {index === 0 && (
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                    )}
                    {index === 1 && (
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    )}
                    {index === 2 && (
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    )}
                    {index === 3 && (
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                    )}
                  </div>
                  <div className="cs-card__badges">
                    {study.services.map((s) => (
                      <span key={s} className="cs-card__badge">{s}</span>
                    ))}
                    <span className="cs-card__location">{study.location}</span>
                  </div>
                  <h3 className="cs-card__title">{study.title}</h3>
                  {!study.verified && (
                    <span className="cs-card__status">Case Study Coming Soon</span>
                  )}
                  <Link to={study.slug} className="cs-card__cta" aria-label={'View ' + study.title}>
                    View Case Study
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  </Link>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section cs-methodology section--alt">
        <div className="container">
          <SectionHeading eyebrow="METHODOLOGY" title="What Our Case Studies Show" subtitle="" />
          <div className="cs-methodology__grid">
            {METHODOLOGY.map((m, index) => (
              <ScrollReveal key={m.title} delay={index * 100}>
                <div className="cs-method-card glass-card">
                  <span className="cs-method-card__num">{m.num}</span>
                  <h3 className="cs-method-card__title">{m.title}</h3>
                  <p className="cs-method-card__desc">{m.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section cs-process">
        <div className="container">
          <div className="cs-process__visual">
            {['Challenge', 'Research', 'Strategy', 'Implementation', 'Measurement', 'Results'].map((step, i) => (
              <div key={step} className="cs-process__node-wrap">
                <div className="cs-process__node glass-card">
                  <span className="cs-process__node-num">0{i + 1}</span>
                  <span className="cs-process__node-label">{step}</span>
                </div>
                {i < 5 && <div className="cs-process__line" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cs-proof section--alt">
        <div className="container">
          <div className="cs-proof__inner glass-card">
            <h2 className="cs-proof__title">Proof Over Promises</h2>
            <p className="cs-proof__text">Every business has different goals, markets and constraints.</p>
            <p className="cs-proof__text">That is why our case studies focus on the actual problem, the work performed and the evidence behind the outcome, rather than generic marketing promises.</p>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow=""
        title="Have a Digital Growth Challenge?"
        subtitle="Tell us what you are trying to achieve. We will help you identify the right digital strategy, services and next steps."
        primaryLabel="Let's Talk"
        primaryHref={whatsappHref}
        secondaryLabel="Explore Our Services"
        secondaryTo="/services/"
      />
    </div>
  )
}
