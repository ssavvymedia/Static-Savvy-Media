import { useEffect, useRef } from 'react'
import ClientWork from '../../components/v2/ClientWork.jsx'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import SectionHeading from '../../components/common/SectionHeading.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import ContactFormSection from '../../components/sections/ContactFormSection.jsx'
import WhatsAppIcon from '../../components/common/WhatsAppIcon.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import { breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL } from '../../utils/constants.js'
import '../../styles/pages/case-studies.css'
import casestudiesMain from '../../assets/images/CaseStudies/casestudiesMain.webp'

const PAGE_TITLE = 'Client Work & Case Studies | Static Savvy Media'
const PAGE_DESCRIPTION = 'Client work by Static Savvy Media: real SEO and Google Business Profile clients in Madurai and Coimbatore, the work we did and their Google ratings.'
const HERO_SUBTITLE = 'Real businesses we work with on SEO and Google Business Profile, with the work we did and their Google ratings. Full case studies are published only with verified data and client permission.'

const METHODOLOGY = [
  { num: '01', title: 'Challenge', desc: 'Understand the actual business problem before selecting the digital strategy.' },
  { num: '02', title: 'Strategy', desc: 'Build a focused strategy around the client\'s goals, market and audience.' },
  { num: '03', title: 'Implementation', desc: 'Execute the agreed SEO, advertising, content, website or digital marketing activities.' },
  { num: '04', title: 'Results', desc: 'Measure the actual outcome using verifiable data.' },
]

export default function CaseStudies() {
  const jsonLdRef = useRef([])

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

  return (
    <div className="cs-page">
      <Breadcrumbs />
      <HeroSection
        layout="two-column"
        eyebrow="CASE STUDIES"
        title="Client Work & Case Studies"
        subtitle={HERO_SUBTITLE}
        actions={
          <Button href={whatsappHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">
            Let's Talk
          </Button>
        }
      >
        <div className="hero__visual-side">
          <img src={casestudiesMain} width={1672} height={941} fetchPriority="high" alt="Client work and case studies" className="hero__image" />
        </div>
      </HeroSection>

      <ClientWork title="Businesses we work with." />

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
        primaryLabel={
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', verticalAlign: 'middle' }}>
            <WhatsAppIcon size={22} />
            <span>WhatsApp: +91 99440 40345</span>
          </span>
        }
        primaryHref={whatsappHref}
        secondaryLabel="Explore Our Services"
        secondaryTo="/services/"
      />
      <ContactFormSection />
    </div>
  )
}
