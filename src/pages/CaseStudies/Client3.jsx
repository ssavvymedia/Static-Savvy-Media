import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import ContactFormSection from '../../components/sections/ContactFormSection.jsx'
import WhatsAppIcon from '../../components/common/WhatsAppIcon.jsx'
import SectionHeading from '../../components/common/SectionHeading.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import { breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL } from '../../utils/constants.js'
import '../../styles/pages/client3.css'
import client3HeroImg from '../../assets/images/CaseStudies/03Client.webp'

const META_TITLE = 'How [Malaysian SME] Leveraged MDEC Grant & SEO to Scale, Malaysia Case Study | Static Savvy Media'
const META_DESC = 'See how a Malaysian SME used SEO, Google Ads and digital transformation support to strengthen its online presence and build a scalable digital marketing foundation.'

const SUMMARY = [
  { label: 'Client', value: 'Verified data to be added' },
  { label: 'Industry', value: 'Verified data to be added' },
  { label: 'Location', value: 'Malaysia' },
  { label: 'Services Used', value: 'SEO + Google Ads' },
  { label: 'Digital Support', value: 'Verified data to be added' },
  { label: 'Primary Result', value: 'Verified result to be added' },
]

const APPROACH_STEPS = [
  { num: '01', title: 'Digital Assessment', desc: 'Strategy areas to be verified.' },
  { num: '02', title: 'SEO Strategy', desc: 'Strategy areas to be verified.' },
  { num: '03', title: 'Google Ads Strategy', desc: 'Strategy areas to be verified.' },
  { num: '04', title: 'Digital Growth Implementation', desc: 'Strategy areas to be verified.' },
  { num: '05', title: 'Measurement & Optimisation', desc: 'Strategy areas to be verified.' },
]

const SEO_ITEMS = ['Keyword Research', 'Search Intent Analysis', 'Technical SEO', 'On-Page Optimisation', 'Content Strategy', 'Internal Linking', 'Location Targeting', 'Malaysian Search Behaviour', 'English Keyword Strategy', 'Bahasa Malaysia Opportunities', 'Selangor Search Visibility', 'Kuala Lumpur / Klang Valley Opportunities']

const GOOGLE_ADS_FLOW = ['Search Query', 'Google Ad', 'Landing Page', 'Enquiry', 'Business Opportunity']

const MALAYSIA_LOCATIONS = ['Malaysia', 'Selangor', 'Rawang', 'Kuala Lumpur', 'Klang Valley']

const SEO_GADS = { seo: ['Organic Visibility', 'Long-term Growth', 'Content', 'Authority', 'Search Rankings'], gads: ['Immediate Visibility', 'High-intent Traffic', 'Campaign Testing', 'Conversion Data', 'Paid Acquisition'] }

const GRANT_WORKFLOW = ['Business Assessment', 'Digital Requirements', 'Grant / Programme Eligibility Review', 'Digital Marketing Plan', 'SEO + Google Ads', 'Measurement', 'Optimisation', 'Business Growth']

const IMPLEMENTATION = {
  seo: ['Search Intent Research', 'Keyword Strategy', 'On-Page Optimisation', 'Content Strategy', 'Technical SEO', 'Internal Linking'],
  gads: ['Search Campaign Strategy', 'Keyword Targeting', 'Ad Copy', 'Landing Page Alignment', 'Conversion Tracking', 'Campaign Optimisation'],
  growth: ['Market Targeting', 'Measurement', 'Continuous Optimisation'],
}

const RESULTS_METRICS = [
  { label: 'Organic Traffic', value: 'Verified client results to be added' },
  { label: 'Organic Search Visibility', value: 'Verified client results to be added' },
  { label: 'Google Ads Leads', value: 'Verified client results to be added' },
  { label: 'Conversion Rate', value: 'Verified client results to be added' },
  { label: 'Qualified Enquiries', value: 'Verified client results to be added' },
  { label: 'Business Growth', value: 'Verified client results to be added' },
]

const BEFORE_ITEMS = ['Limited digital visibility', 'Unstructured acquisition', 'Weak search presence', 'Limited paid-search optimisation']
const AFTER_ITEMS = ['Structured SEO strategy', 'Targeted Google Ads', 'Better search visibility', 'Measurable digital acquisition']

const TIMELINE_STEPS = ['Discovery', 'Digital Assessment', 'SEO Planning', 'Google Ads Planning', 'Implementation', 'Optimisation', 'Measurement']

const TAKEAWAYS = [
  'SEO builds a long-term organic visibility foundation.',
  'Google Ads provides immediate access to high-intent search demand.',
  'Digital transformation support can help eligible SMEs plan their digital investment more effectively.',
  'Marketing performance should be measured using real business outcomes rather than vanity metrics.',
]

const SERVICES_USED = [
  { name: 'SEO', desc: 'Build long-term organic visibility through technical, content and search-intent optimisation.', path: '/services/seo/' },
  { name: 'Google Ads', desc: 'Reach high-intent customers through targeted search campaigns and measurable advertising.', path: '/services/google-ads/' },
]

const RELATED_SERVICES = [
  { name: 'SEO Malaysia', path: '/services/seo/malaysia/' },
  { name: 'Local SEO Malaysia', path: '/services/local-seo/malaysia/' },
  { name: 'Google Ads Malaysia', path: '/services/google-ads/' },
  { name: 'GEO/AEO Malaysia', path: '/services/geo-aeo-ai-search/' },
  { name: 'AI Business Automation Malaysia', path: '/services/ai-business-automation/malaysia/' },
]

const RELATED_CASES = [
  { label: 'Madurai SEO + Local SEO Case Study', path: '/case-studies/client-1/' },
  { label: 'GEO/AEO + SEO Case Study', path: '/case-studies/client-2/' },
  { label: 'Thoothukudi Google Ads + Social Case Study', path: '/case-studies/client-4/' },
]

export default function Client3() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({ title: META_TITLE, description: META_DESC, canonical: `${SITE_URL}/case-studies/client-3/`, ogType: 'article' })
    const breadcrumbs = breadcrumbListSchema({ items: [
      { name: 'Home', item: `${SITE_URL}/` },
      { name: 'Case Studies', item: `${SITE_URL}/case-studies/` },
      { name: 'Malaysia Case Study', item: `${SITE_URL}/case-studies/client-3/` },
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
    <div className="cs3-page">
      <Breadcrumbs />
      <HeroSection
        layout="two-column"
        eyebrow="CASE STUDY · MALAYSIA · SEO + GOOGLE ADS"
        title="How [Malaysian SME] Leveraged MDEC Grant & SEO to Scale"
        subtitle="A practical case study showing how SEO, Google Ads and digital transformation planning can help a Malaysian SME build stronger digital visibility and create a scalable growth foundation."
        actions={<Button href={whatsappHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">Talk to Static Savvy Media</Button>}
      >
        <div className="hero__visual-side">
          <img src={client3HeroImg} width={1536} height={1024} fetchPriority="high" alt="Malaysia SEO and Google Ads Case Study" className="hero__image" />
        </div>
      </HeroSection>

      {/* Summary */}
      <section className="section cs3-summary">
        <div className="container">
          <div className="cs3-summary__grid">
            {SUMMARY.map((item) => (
              <div key={item.label} className="cs3-summary__item glass-card">
                <span className="cs3-summary__label">{item.label}</span>
                <span className="cs3-summary__value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="section cs3-challenge section--alt">
        <div className="container">
          <SectionHeading eyebrow="THE CHALLENGE" title="The Challenge" subtitle="Building a scalable digital acquisition foundation across organic and paid search." />
          <p className="cs3-body">Verified client challenge details to be added. The business needed stronger digital acquisition foundations across organic and paid search channels.</p>
          <p className="cs3-body cs3-body--mt">A scalable approach to digital marketing was required, combining long-term organic growth with immediate paid visibility for high-intent searches.</p>
        </div>
      </section>

      {/* Digital Growth Opportunity */}
      <section className="section cs3-opportunity">
        <div className="container">
          <SectionHeading eyebrow="OPPORTUNITY" title="The Digital Growth Opportunity for Malaysian SMEs" subtitle="Malaysia has invested significantly in helping SMEs adopt digital tools." />
          <p className="cs3-body">Malaysia has developed various digitalisation support programmes to help SMEs strengthen their digital capabilities. Programmes from organisations such as MDEC, SMECorp, TEKUN and Cradle Fund may provide relevant support for eligible businesses.</p>
          <p className="cs3-body cs3-body--mt">These programmes have different eligibility criteria and terms. Grant eligibility was evaluated as part of the digital assessment process.</p>
        </div>
      </section>

      {/* MDEC Context */}
      <section className="section cs3-mdec section--alt">
        <div className="container">
          <SectionHeading eyebrow="MDEC" title="Understanding the MDEC Opportunity" subtitle="MDEC digital economy programmes can support SME adoption of digital tools." />
          <p className="cs3-body">Services such as SEO, Social Media, Website Development and Digital Marketing may potentially qualify depending on the programme, vendor requirements and current eligibility rules.</p>
          <div className="cs3-grant-disclaimer glass-card">
            <h4 className="cs3-grant-disclaimer__title">Important</h4>
            <p className="cs3-grant-disclaimer__text">Grant programme terms, eligibility criteria and funding availability can change. Grant approval is not guaranteed. Businesses should verify current requirements with the relevant Malaysian programme or authority.</p>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section cs3-approach">
        <div className="container">
          <SectionHeading eyebrow="OUR APPROACH" title="Our Approach" subtitle="How SEO and paid advertising work together to build scalable digital growth." />
          <p className="cs3-body">Our approach combines long-term organic visibility through SEO with immediate paid visibility through Google Ads. Together, they create a comprehensive digital growth system.</p>
          <div className="cs3-approach__grid">
            {APPROACH_STEPS.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 80}>
                <div className="cs3-approach__step glass-card">
                  <span className="cs3-approach__num">{step.num}</span>
                  <h3 className="cs3-approach__title">{step.title}</h3>
                  <p className="cs3-approach__desc">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Strategy */}
      <section className="section cs3-seo section--alt">
        <div className="container">
          <SectionHeading eyebrow="SEO" title="Building the SEO Foundation" subtitle="Long-term organic visibility through search-intent and content optimisation." />
          <p className="cs3-body">The SEO strategy covers keyword research, technical SEO, on-page optimisation, content structure and location targeting. Understanding Malaysian search behaviour, including English keyword strategy and Bahasa Malaysia keyword opportunities, is essential for effective search visibility in the Malaysian market.</p>
          <div className="cs3-seo__grid">
            {SEO_ITEMS.map((item, i) => (
              <ScrollReveal key={item} delay={i * 50}>
                <div className="cs3-seo__item glass-card">
                  <span className="cs3-seo__check">&#10003;</span>
                  <span>{item}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Google Ads Strategy */}
      <section className="section cs3-gads">
        <div className="container">
          <SectionHeading eyebrow="GOOGLE ADS" title="Accelerating Visibility with Google Ads" subtitle="Immediate access to high-intent search demand through targeted campaigns." />
          <p className="cs3-body">Google Ads provides immediate visibility for high-intent search queries. Campaign structure, keyword targeting, ad copy, landing page relevance and conversion tracking work together to create measurable customer acquisition.</p>
          <div className="cs3-flow">
            {GOOGLE_ADS_FLOW.map((step, i) => (
              <div key={step} className="cs3-flow__node-wrap">
                <div className="cs3-flow__node glass-card">
                  <span className="cs3-flow__label">{step}</span>
                </div>
                {i < GOOGLE_ADS_FLOW.length - 1 && <div className="cs3-flow__arrow">&#8594;</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Malaysia Market Targeting */}
      <section className="section cs3-market section--alt">
        <div className="container">
          <SectionHeading eyebrow="MALAYSIA" title="Reaching the Malaysian Market" subtitle="Location-specific strategies for the Malaysian market." />
          <p className="cs3-body">Understanding Malaysian search behaviour, local search intent and market-specific content is essential for effective digital marketing in Malaysia. Location-specific landing pages and market-appropriate content help businesses reach their target audience more effectively.</p>
          <div className="cs3-market__map">
            {MALAYSIA_LOCATIONS.map((loc, i) => (
              <div key={loc} className="cs3-market__node-wrap">
                <div className="cs3-market__node glass-card">
                  <span className="cs3-market__label">{loc}</span>
                </div>
                {i < MALAYSIA_LOCATIONS.length - 1 && <div className="cs3-market__arrow">&#8595;</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO + Google Ads Together */}
      <section className="section cs3-synergy">
        <div className="container">
          <SectionHeading eyebrow="SYNERGY" title="SEO + Google Ads: One Growth System" subtitle="How organic and paid search create comprehensive digital visibility." />
          <div className="cs3-synergy__grid">
            <div className="cs3-synergy__panel glass-card">
              <h3 className="cs3-synergy__heading cs3-synergy__heading--seo">SEO</h3>
              <ul className="cs3-synergy__list">
                {SEO_GADS.seo.map((item) => <li key={item} className="cs3-synergy__item">{item}</li>)}
              </ul>
            </div>
            <div className="cs3-synergy__center glass-card">
              <span className="cs3-synergy__label">DIGITAL GROWTH</span>
            </div>
            <div className="cs3-synergy__panel glass-card cs3-synergy__panel--ads">
              <h3 className="cs3-synergy__heading cs3-synergy__heading--ads">Google Ads</h3>
              <ul className="cs3-synergy__list">
                {SEO_GADS.gads.map((item) => <li key={item} className="cs3-synergy__item">{item}</li>)}
              </ul>
            </div>
          </div>
          <p className="cs3-body cs3-body--center cs3-body--mt-lg">SEO creates long-term search visibility while Google Ads provides immediate access to high-intent search demand.</p>
        </div>
      </section>

      {/* Grant + Marketing Workflow */}
      <section className="section cs3-grant-workflow section--alt">
        <div className="container">
          <SectionHeading eyebrow="WORKFLOW" title="From Digital Support to Digital Growth" subtitle="A structured approach to digital transformation." />
          <div className="cs3-grant-flow">
            {GRANT_WORKFLOW.map((step, i) => (
              <div key={step} className="cs3-grant-flow__node-wrap">
                <div className="cs3-grant-flow__node glass-card">
                  <span className="cs3-grant-flow__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="cs3-grant-flow__label">{step}</span>
                </div>
                {i < GRANT_WORKFLOW.length - 1 && <div className="cs3-grant-flow__line" />}
              </div>
            ))}
          </div>
          <p className="cs3-body cs3-body--center cs3-body--mt">Eligibility and approval must be determined separately. Grant funding does not automatically pay for all services.</p>
        </div>
      </section>

      {/* Implementation */}
      <section className="section cs3-implementation">
        <div className="container">
          <SectionHeading eyebrow="IMPLEMENTATION" title="What We Implemented" subtitle="Strategy areas to be verified for this client." />
          <div className="cs3-impl__grid">
            <div className="cs3-impl__col glass-card">
              <h3 className="cs3-impl__col-title">SEO</h3>
              {IMPLEMENTATION.seo.map((item) => (
                <div key={item} className="cs3-impl__item"><span className="cs3-impl__check">&#10003;</span><span>Strategy Area: {item}</span></div>
              ))}
            </div>
            <div className="cs3-impl__col glass-card">
              <h3 className="cs3-impl__col-title">Google Ads</h3>
              {IMPLEMENTATION.gads.map((item) => (
                <div key={item} className="cs3-impl__item"><span className="cs3-impl__check">&#10003;</span><span>Strategy Area: {item}</span></div>
              ))}
            </div>
            <div className="cs3-impl__col glass-card">
              <h3 className="cs3-impl__col-title">Digital Growth</h3>
              {IMPLEMENTATION.growth.map((item) => (
                <div key={item} className="cs3-impl__item"><span className="cs3-impl__check">&#10003;</span><span>Strategy Area: {item}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section cs3-results section--alt">
        <div className="container">
          <SectionHeading eyebrow="RESULTS" title="The Results" subtitle="Verified client results to be added after measurement and client verification." />
          <div className="cs3-results__grid">
            {RESULTS_METRICS.map((m, i) => (
              <ScrollReveal key={m.label} delay={i * 100}>
                <div className="cs3-results__card glass-card">
                  <span className="cs3-results__label">{m.label}</span>
                  <span className="cs3-results__value">{m.value}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="section cs3-beforeafter">
        <div className="container">
          <SectionHeading eyebrow="COMPARISON" title="Before vs After" subtitle="Strategic Before / After Framework" />
          <div className="cs3-beforeafter__grid">
            <div className="cs3-beforeafter__panel glass-card">
              <h3 className="cs3-beforeafter__heading cs3-beforeafter__heading--before">Before</h3>
              <ul className="cs3-beforeafter__list">
                {BEFORE_ITEMS.map((item) => <li key={item} className="cs3-beforeafter__item">{item}</li>)}
              </ul>
            </div>
            <div className="cs3-beforeafter__panel glass-card cs3-beforeafter__panel--after">
              <h3 className="cs3-beforeafter__heading cs3-beforeafter__heading--after">After</h3>
              <ul className="cs3-beforeafter__list">
                {AFTER_ITEMS.map((item) => <li key={item} className="cs3-beforeafter__item">{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section cs3-timeline section--alt">
        <div className="container">
          <SectionHeading eyebrow="TIMELINE" title="Project Timeline" subtitle="Timeline to be added after client verification." />
          <div className="cs3-timeline__chain">
            {TIMELINE_STEPS.map((step, i) => (
              <div key={step} className="cs3-timeline__node-wrap">
                <div className="cs3-timeline__node glass-card">
                  <span className="cs3-timeline__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="cs3-timeline__label">{step}</span>
                </div>
                {i < TIMELINE_STEPS.length - 1 && <div className="cs3-timeline__line" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Takeaways */}
      <section className="section cs3-takeaways">
        <div className="container">
          <SectionHeading eyebrow="TAKEAWAYS" title="Key Takeaways" />
          <div className="cs3-takeaways__grid">
            {TAKEAWAYS.map((t, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="cs3-takeaway glass-card">
                  <span className="cs3-takeaway__num">{String(i + 1).padStart(2, '0')}</span>
                  <p className="cs3-takeaway__text">{t}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section cs3-testimonial section--alt">
        <div className="container">
          <SectionHeading eyebrow="TESTIMONIAL" title="What the Client Says" />
          <div className="cs3-testimonial__card glass-card">
            <p className="cs3-testimonial__quote">Client testimonial to be added after approval.</p>
          </div>
        </div>
      </section>

      {/* Grant Disclaimer */}
      <section className="section cs3-grant-section">
        <div className="container">
          <div className="cs3-grant-full glass-card">
            <h3 className="cs3-grant-full__title">Important Grant Information</h3>
            <p className="cs3-grant-full__text">MDEC, SMECorp, TEKUN, Cradle Fund and other digitalisation programmes may have different eligibility requirements, application processes, funding limits and availability. Programme terms can change. Static Savvy Media does not guarantee grant approval. We help businesses understand relevant digitalisation options and plan appropriate digital marketing activities. Businesses should confirm current eligibility and programme requirements with the relevant Malaysian authority.</p>
          </div>
        </div>
      </section>

      {/* Services Used */}
      <section className="section cs3-services section--alt">
        <div className="container">
          <SectionHeading eyebrow="SERVICES" title="Services Used" />
          <div className="cs3-services__grid">
            {SERVICES_USED.map((svc) => (
              <Link key={svc.name} to={svc.path} className="cs3-service glass-card">
                <h3 className="cs3-service__name">{svc.name}</h3>
                <p className="cs3-service__desc">{svc.desc}</p>
                <span className="cs3-service__cta">
                  Learn More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Malaysia Services */}
      <section className="section cs3-related-services">
        <div className="container">
          <SectionHeading eyebrow="SERVICES" title="Digital Marketing Services for Malaysian SMEs" />
          <div className="cs3-related-services__grid">
            {RELATED_SERVICES.map((svc) => (
              <Link key={svc.name} to={svc.path} className="cs3-related-service glass-card">
                <h3 className="cs3-related-service__name">{svc.name}</h3>
                <span className="cs3-related-service__cta">
                  Learn More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      <section className="section cs3-related-cases section--alt">
        <div className="container">
          <SectionHeading eyebrow="CASE STUDIES" title="Explore More Case Studies" />
          <div className="cs3-related-cases__grid">
            {RELATED_CASES.map((r) => (
              <Link key={r.label} to={r.path} className="cs3-related-case glass-card">
                <h3 className="cs3-related-case__label">{r.label}</h3>
                <span className="cs3-related-case__cta">
                  View Case Study
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Author Block */}
      <section className="section cs3-author">
        <div className="container">
          <div className="cs3-author__card glass-card">
            <h3 className="cs3-author__title">Built for Business Growth</h3>
            <p className="cs3-author__desc">Static Savvy Media supports Malaysian businesses with SEO, Google Ads and digital growth strategies built around the local market.</p>
            <Link to="/about/deepan-kanz/" className="cs3-author__link">
              Meet the Team
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        eyebrow="Ready to Scale Your Malaysian Business?"
        title="Ready to Scale Your Malaysian Business?"
        subtitle="Build a stronger digital presence with SEO, Google Ads and a digital strategy designed around your market."
        primaryLabel={
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', verticalAlign: 'middle' }}>
            <WhatsAppIcon size={22} />
            <span>WhatsApp: +91 99440 40345</span>
          </span>
        }
        primaryHref={whatsappHref}
        secondaryLabel="Explore SEO"
        secondaryTo="/services/seo/"
      />
      <ContactFormSection />
    </div>
  )
}
