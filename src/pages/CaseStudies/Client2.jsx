import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import SectionHeading from '../../components/common/SectionHeading.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import { breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL } from '../../utils/constants.js'
import '../../styles/pages/client2.css'

const META_TITLE = 'How [CLIENT/DESCRIPTOR] Got Cited by AI Search, GEO/AEO + SEO Case Study | Static Savvy Media'
const META_DESC = 'Improved AI search visibility using Static Savvy Media\'s GEO/AEO and SEO strategy. Explore the challenge, methodology, implementation and verified results.'

const SUMMARY = [
  { label: 'Client', value: 'Verified data to be added' },
  { label: 'Industry', value: 'Verified data to be added' },
  { label: 'Location', value: 'Verified data to be added' },
  { label: 'Services Used', value: 'GEO/AEO + SEO' },
  { label: 'Timeline', value: 'Verified timeline to be added' },
  { label: 'Primary Result', value: 'Verified data to be added' },
]

const APPROACH_STEPS = [
  { num: '01', title: 'SEO Foundation', desc: 'Project implementation details to be verified.' },
  { num: '02', title: 'Entity Understanding', desc: 'Project implementation details to be verified.' },
  { num: '03', title: 'Answer-Focused Content', desc: 'Project implementation details to be verified.' },
  { num: '04', title: 'Structured Information', desc: 'Project implementation details to be verified.' },
  { num: '05', title: 'Authority Signals', desc: 'Project implementation details to be verified.' },
  { num: '06', title: 'AI Search Optimization', desc: 'Project implementation details to be verified.' },
  { num: '07', title: 'Measurement', desc: 'Project implementation details to be verified.' },
]

const GEO_FLOW = ['Business Entity', 'Relevant Content', 'Context', 'Authority', 'Structured Information', 'AI Understanding', 'Potential Citation']
const AEO_FLOW = ['Question', 'Answer', 'Supporting Evidence', 'Entity', 'Source']

const ENTITY_NODES = ['Business / Brand', 'Website', 'Services', 'Location', 'Industry', 'People', 'Social Profiles', 'Business Directories', 'Publications', 'Reviews', 'Structured Data', 'External References']

const CONTENT_CARDS = [
  { num: '01', title: 'Clear Definitions' },
  { num: '02', title: 'Direct Answers' },
  { num: '03', title: 'Structured Headings' },
  { num: '04', title: 'Question-Based Content' },
  { num: '05', title: 'Supporting Evidence' },
  { num: '06', title: 'Relevant Entities' },
  { num: '07', title: 'Consistent Information' },
]

const IMPLEMENTATION = {
  seo: ['Technical SEO', 'On-Page SEO', 'Internal Linking', 'Search Intent', 'Content Optimization', 'Structured Data'],
  geo: ['Entity Clarity', 'Contextual Content', 'Authority Signals', 'AI-Readable Information', 'Brand Consistency'],
  aeo: ['FAQ Content', 'Question-Based Content', 'Direct Answers', 'Structured Headings', 'Conversational Search Optimization'],
}

const RESULTS_METRICS = [
  { label: 'AI Search Citations', value: 'Verified results will be added after measurement and client approval.' },
  { label: 'AI Search Visibility', value: 'Verified results will be added after measurement and client approval.' },
  { label: 'Organic Search Visibility', value: 'Verified results will be added after measurement and client approval.' },
  { label: 'Relevant Keywords', value: 'Verified results will be added after measurement and client approval.' },
  { label: 'Qualified Enquiries', value: 'Verified results will be added after measurement and client approval.' },
  { label: 'Primary Business Outcome', value: 'Verified results will be added after measurement and client approval.' },
]

const TAKEAWAYS = [
  'SEO remains the foundation of digital discoverability.',
  'GEO/AEO helps businesses prepare for answer-driven search experiences.',
  'Clear entities and structured information improve machine understanding.',
  'AI search visibility should be measured using real observations and evidence.',
]

const SERVICES_USED = [
  { name: 'GEO/AEO', desc: 'Generative Engine Optimization + Answer Engine Optimization', path: '/services/geo-aeo-ai-search/' },
  { name: 'SEO', desc: 'Search Engine Optimization', path: '/services/seo/' },
]

const RELATED_SERVICES = [
  { name: 'SEO', path: '/services/seo/' },
  { name: 'GEO/AEO', path: '/services/geo-aeo-ai-search/' },
  { name: 'Local SEO', path: '/services/local-seo/' },
  { name: 'AI Business Automation', path: '/services/ai-business-automation/' },
]

const RELATED_CASES = [
  { label: 'Madurai SEO + Local SEO Case Study', path: '/case-studies/client-1/' },
  { label: 'Malaysia SEO + Google Ads Case Study', path: '/case-studies/client-3/' },
  { label: 'Thoothukudi Google Ads + Social Case Study', path: '/case-studies/client-4/' },
]

const TIMELINE_STEPS = ['Discovery', 'SEO Audit', 'Entity Research', 'Content Strategy', 'GEO/AEO Implementation', 'Optimization', 'Measurement']

const BEFORE_ITEMS = [
  'Traditional search visibility',
  'Limited answer-engine presence',
  'Unstructured information',
  'Weak entity clarity',
]

const AFTER_ITEMS = [
  'SEO + GEO/AEO strategy',
  'Stronger entity clarity',
  'Answer-focused content',
  'Structured information',
  'Improved AI search readiness',
]

export default function Client2() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({ title: META_TITLE, description: META_DESC, canonical: `${SITE_URL}/case-studies/client-2/`, ogType: 'article' })
    const breadcrumbs = breadcrumbListSchema({ items: [
      { name: 'Home', item: `${SITE_URL}/` },
      { name: 'Case Studies', item: `${SITE_URL}/case-studies/` },
      { name: 'GEO/AEO + SEO Case Study', item: `${SITE_URL}/case-studies/client-2/` },
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
    <div className="cs2-page">
      <Breadcrumbs />
      <HeroSection
        eyebrow="CASE STUDY · GEO/AEO + SEO"
        title="How [Client] Got Cited by AI Search"
        subtitle="Building AI Search Visibility with GEO/AEO + SEO. A detailed case study covering the challenge, SEO foundation, GEO/AEO strategy, entity optimization, answer-focused content and AI search visibility."
        actions={<Button href={whatsappHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">Talk to Static Savvy Media</Button>}
      >
        <div className="cs2-hero-visual" aria-hidden="true">
          <div className="cs2-hero-visual__ai-panel">
            <div className="cs2-hero-visual__query-chip">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              Best [industry] in [location]
            </div>
            <div className="cs2-hero-visual__answer">
              <span className="cs2-hero-visual__ai-label">AI Overview</span>
              <div className="cs2-hero-visual__answer-lines">
                <div className="cs2-hero-visual__line" />
                <div className="cs2-hero-visual__line cs2-hero-visual__line--short" />
                <div className="cs2-hero-visual__line" />
              </div>
            </div>
            <div className="cs2-hero-visual__citations">
              <div className="cs2-hero-visual__cite">
                <span className="cs2-hero-visual__cite-dot" />
                Source 01
              </div>
              <div className="cs2-hero-visual__cite cs2-hero-visual__cite--active">
                <span className="cs2-hero-visual__cite-dot cs2-hero-visual__cite-dot--active" />
                Your Website
              </div>
              <div className="cs2-hero-visual__cite">
                <span className="cs2-hero-visual__cite-dot" />
                Source 03
              </div>
            </div>
          </div>
          <div className="cs2-hero-visual__labels">
            <div className="cs2-hero-visual__label">GEO</div>
            <div className="cs2-hero-visual__label cs2-hero-visual__label--accent">AEO</div>
            <div className="cs2-hero-visual__label">SEO</div>
          </div>
        </div>
      </HeroSection>

      {/* Summary */}
      <section className="section cs2-summary">
        <div className="container">
          <div className="cs2-summary__grid">
            {SUMMARY.map((item) => (
              <div key={item.label} className="cs2-summary__item glass-card">
                <span className="cs2-summary__label">{item.label}</span>
                <span className="cs2-summary__value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="section cs2-challenge section--alt">
        <div className="container">
          <SectionHeading eyebrow="THE CHALLENGE" title="The Challenge" subtitle="Understanding the gap between traditional search and AI-driven discovery." />
          <p className="cs2-body">Verified client challenge details to be added. Users are no longer relying only on traditional search engines. They increasingly interact with Google AI Overviews, ChatGPT, Perplexity, Microsoft Copilot and other answer engines. Traditional SEO helps businesses become discoverable through search results. GEO/AEO focuses on helping businesses become useful, understandable and citable within AI-generated answers.</p>
          <p className="cs2-body cs2-body--mt">Verified client-specific challenge details to be added.</p>
        </div>
      </section>

      {/* AI Search Challenge */}
      <section className="section cs2-ai-challenge">
        <div className="container">
          <SectionHeading eyebrow="THE AI SHIFT" title="From Search Rankings to AI Citations" subtitle="The search environment has fundamentally changed." />
          <p className="cs2-body">The way people find information has evolved beyond typing keywords into a search box. Users now ask questions directly to AI systems. These systems retrieve information from across the web, synthesize it and present answers. Being visible in this new environment requires more than traditional search rankings. It requires a business to be understood, trusted and referenceable by AI systems.</p>
          <p className="cs2-body cs2-body--mt">Traditional SEO helps businesses rank in search results. GEO/AEO helps businesses prepare to be found and potentially cited within AI-generated answers. Both strategies work together to build comprehensive digital visibility.</p>
        </div>
      </section>

      {/* Approach */}
      <section className="section cs2-approach section--alt">
        <div className="container">
          <SectionHeading eyebrow="OUR APPROACH" title="Our Approach" subtitle="How Static Savvy Media builds visibility across traditional and AI search." />
          <p className="cs2-body">Our approach combines traditional SEO fundamentals with Generative Engine Optimization and Answer Engine Optimization. We build a strong technical and content foundation, then layer entity clarity, structured information and answer-focused content that AI systems can understand and reference.</p>
          <div className="cs2-approach__grid">
            {APPROACH_STEPS.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 80}>
                <div className="cs2-approach__step glass-card">
                  <span className="cs2-approach__num">{step.num}</span>
                  <h3 className="cs2-approach__title">{step.title}</h3>
                  <p className="cs2-approach__desc">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Foundation */}
      <section className="section cs2-seo-foundation">
        <div className="container">
          <SectionHeading eyebrow="SEO FOUNDATION" title="Building the SEO Foundation" subtitle="Traditional SEO remains the bedrock of AI search visibility." />
          <p className="cs2-body">Before any GEO or AEO work begins, a solid SEO foundation must exist. Technical SEO ensures the site is crawlable and indexable. On-page optimization ensures content is relevant and well-structured. Internal linking helps search systems understand site hierarchy. Structured data provides explicit context. These fundamentals are not replaced by GEO and AEO. They are strengthened by it.</p>
          <div className="cs2-seo-foundation__items">
            {['Technical SEO', 'Website Structure', 'Search Intent', 'Keyword Research', 'On-Page Optimization', 'Internal Linking', 'Content Quality', 'Structured Data', 'Crawlability', 'Indexability'].map((item) => (
              <div key={item} className="cs2-seo-foundation__item glass-card">
                <span className="cs2-seo-foundation__check">&#10003;</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GEO Strategy */}
      <section className="section cs2-geo section--alt">
        <div className="container">
          <SectionHeading eyebrow="GEO" title="Generative Engine Optimization" subtitle="Improving how a business can be understood and potentially referenced by generative AI systems." />
          <p className="cs2-body">GEO focuses on making a business entity, its content and its expertise clearly understandable to AI systems. By building entity clarity, contextual content and structured information, a business increases its potential to appear in AI-generated answers as a relevant, trusted source.</p>
          <div className="cs2-flow">
            {GEO_FLOW.map((step, i) => (
              <div key={step} className="cs2-flow__node-wrap">
                <div className="cs2-flow__node glass-card">
                  <span className="cs2-flow__label">{step}</span>
                </div>
                {i < GEO_FLOW.length - 1 && <div className="cs2-flow__arrow">&#8594;</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AEO Strategy */}
      <section className="section cs2-aeo">
        <div className="container">
          <SectionHeading eyebrow="AEO" title="Answer Engine Optimization" subtitle="Optimizing content for answer-driven search experiences." />
          <p className="cs2-body">AEO ensures content is structured so that answer engines can extract direct answers, identify supporting evidence and connect them to the right entity. This includes question-based content, FAQ structures, clear definitions and conversational search optimization.</p>
          <div className="cs2-flow">
            {AEO_FLOW.map((step, i) => (
              <div key={step} className="cs2-flow__node-wrap">
                <div className="cs2-flow__node glass-card cs2-flow__node--aeo">
                  <span className="cs2-flow__label">{step}</span>
                </div>
                {i < AEO_FLOW.length - 1 && <div className="cs2-flow__arrow cs2-flow__arrow--aeo">&#8594;</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Entity Optimization */}
      <section className="section cs2-entity section--alt">
        <div className="container">
          <SectionHeading eyebrow="ENTITY" title="Building a Strong Digital Entity" subtitle="Consistent entity information helps search systems understand what a business is and who it serves." />
          <p className="cs2-body">An entity map ensures every digital touchpoint reinforces the same identity. When a business entity is consistent across its website, directories, social profiles and publications, search and AI systems can connect the dots more reliably.</p>
          <div className="cs2-entity__map">
            <div className="cs2-entity__center glass-card">Business / Brand</div>
            <div className="cs2-entity__nodes">
              {ENTITY_NODES.map((node) => (
                <div key={node} className="cs2-entity__node glass-card">
                  <span className="cs2-entity__connector" />
                  {node}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Answer-Focused Content */}
      <section className="section cs2-content-strategy">
        <div className="container">
          <SectionHeading eyebrow="CONTENT" title="Creating Content AI Can Understand" subtitle="Structured, answer-focused content that works for humans and machines." />
          <p className="cs2-body">Content should be written for humans first while remaining structured and understandable to search and answer systems. Clear definitions, direct answers and supporting evidence make content more useful across both traditional and AI search.</p>
          <div className="cs2-content__grid">
            {CONTENT_CARDS.map((card, i) => (
              <ScrollReveal key={card.num} delay={i * 60}>
                <div className="cs2-content__card glass-card">
                  <span className="cs2-content__num">{card.num}</span>
                  <h3 className="cs2-content__title">{card.title}</h3>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* AI Citation Visual */}
      <section className="section cs2-ai-visual section--alt">
        <div className="container">
          <SectionHeading eyebrow="VISUALIZATION" title="From Search Result to AI Citation" subtitle="How the search experience has evolved." />
          <div className="cs2-compare">
            <div className="cs2-compare__panel glass-card">
              <h3 className="cs2-compare__heading">Traditional Search</h3>
              <div className="cs2-compare__flow">
                {['User Query', 'Search Engine', 'Search Results', 'Website'].map((step, i) => (
                  <div key={step} className="cs2-compare__node-wrap">
                    <div className="cs2-compare__node">{step}</div>
                    {i < 3 && <div className="cs2-compare__arrow">&#8595;</div>}
                  </div>
                ))}
              </div>
            </div>
            <div className="cs2-compare__panel glass-card cs2-compare__panel--ai">
              <h3 className="cs2-compare__heading">AI Search</h3>
              <div className="cs2-compare__flow">
                {['User Query', 'AI / Answer Engine', 'Retrieved Information', 'Generated Answer', 'Potential Source Citation'].map((step, i) => (
                  <div key={step} className="cs2-compare__node-wrap">
                    <div className="cs2-compare__node">{step}</div>
                    {i < 4 && <div className="cs2-compare__arrow">&#8595;</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="cs2-body cs2-body--center cs2-body--mt-lg">GEO and AEO does not guarantee AI citation. It builds the foundation for potential inclusion.</p>
        </div>
      </section>

      {/* Implementation */}
      <section className="section cs2-implementation">
        <div className="container">
          <SectionHeading eyebrow="IMPLEMENTATION" title="What We Implemented" subtitle="Project implementation details to be verified." />
          <div className="cs2-impl__grid">
            <div className="cs2-impl__col glass-card">
              <h3 className="cs2-impl__col-title">SEO</h3>
              {IMPLEMENTATION.seo.map((item) => (
                <div key={item} className="cs2-impl__item">
                  <span className="cs2-impl__check">&#10003;</span>
                  <span>Project implementation details to be verified: {item}</span>
                </div>
              ))}
            </div>
            <div className="cs2-impl__col glass-card">
              <h3 className="cs2-impl__col-title">GEO</h3>
              {IMPLEMENTATION.geo.map((item) => (
                <div key={item} className="cs2-impl__item">
                  <span className="cs2-impl__check">&#10003;</span>
                  <span>Project implementation details to be verified: {item}</span>
                </div>
              ))}
            </div>
            <div className="cs2-impl__col glass-card">
              <h3 className="cs2-impl__col-title">AEO</h3>
              {IMPLEMENTATION.aeo.map((item) => (
                <div key={item} className="cs2-impl__item">
                  <span className="cs2-impl__check">&#10003;</span>
                  <span>Project implementation details to be verified: {item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section cs2-results section--alt">
        <div className="container">
          <SectionHeading eyebrow="RESULTS" title="The Results" subtitle="Verified outcomes will be added after measurement and client approval." />
          <div className="cs2-results__grid">
            {RESULTS_METRICS.map((m, i) => (
              <ScrollReveal key={m.label} delay={i * 100}>
                <div className="cs2-results__card glass-card">
                  <span className="cs2-results__label">{m.label}</span>
                  <span className="cs2-results__value">{m.value}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* AI Search Result Visualization */}
      <section className="section cs2-ai-dashboard">
        <div className="container">
          <SectionHeading eyebrow="VISUALIZATION" title="AI Search Result Visualization" subtitle="Conceptual illustration of how AI search retrieves and cites information." />
          <span className="cs2-dashboard__label">Conceptual AI Search Visualization</span>
          <div className="cs2-dashboard glass-card">
            <div className="cs2-dashboard__query">
              <span className="cs2-dashboard__query-label">Search Query</span>
              <span className="cs2-dashboard__query-text">"Best [industry] in [location]"</span>
            </div>
            <div className="cs2-dashboard__answer">
              <span className="cs2-dashboard__answer-label">AI Answer</span>
              <div className="cs2-dashboard__answer-lines">
                <div className="cs2-dashboard__line" />
                <div className="cs2-dashboard__line cs2-dashboard__line--short" />
                <div className="cs2-dashboard__line" />
              </div>
            </div>
            <div className="cs2-dashboard__sources">
              <span className="cs2-dashboard__sources-label">Sources</span>
              <div className="cs2-dashboard__source">Source 01</div>
              <div className="cs2-dashboard__source">Source 02</div>
              <div className="cs2-dashboard__source cs2-dashboard__source--highlight">Static Savvy Media Client</div>
            </div>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="section cs2-beforeafter section--alt">
        <div className="container">
          <SectionHeading eyebrow="COMPARISON" title="Before vs After" subtitle="The transformation from traditional search to AI search readiness." />
          <div className="cs2-beforeafter__grid">
            <div className="cs2-beforeafter__panel glass-card">
              <h3 className="cs2-beforeafter__heading cs2-beforeafter__heading--before">Before</h3>
              <ul className="cs2-beforeafter__list">
                {BEFORE_ITEMS.map((item) => (
                  <li key={item} className="cs2-beforeafter__item">{item}</li>
                ))}
              </ul>
            </div>
            <div className="cs2-beforeafter__panel glass-card cs2-beforeafter__panel--after">
              <h3 className="cs2-beforeafter__heading cs2-beforeafter__heading--after">After</h3>
              <ul className="cs2-beforeafter__list">
                {AFTER_ITEMS.map((item) => (
                  <li key={item} className="cs2-beforeafter__item">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section cs2-timeline">
        <div className="container">
          <SectionHeading eyebrow="TIMELINE" title="Project Timeline" subtitle="Timeline to be added." />
          <div className="cs2-timeline__chain">
            {TIMELINE_STEPS.map((step, i) => (
              <div key={step} className="cs2-timeline__node-wrap">
                <div className="cs2-timeline__node glass-card">
                  <span className="cs2-timeline__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="cs2-timeline__label">{step}</span>
                </div>
                {i < TIMELINE_STEPS.length - 1 && <div className="cs2-timeline__line" />}
              </div>
            ))}
          </div>
          <p className="cs2-body cs2-body--center">Timeline to be added.</p>
        </div>
      </section>

      {/* Takeaways */}
      <section className="section cs2-takeaways section--alt">
        <div className="container">
          <SectionHeading eyebrow="TAKEAWAYS" title="Key Takeaways" />
          <div className="cs2-takeaways__grid">
            {TAKEAWAYS.map((t, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="cs2-takeaway glass-card">
                  <span className="cs2-takeaway__num">{String(i + 1).padStart(2, '0')}</span>
                  <p className="cs2-takeaway__text">{t}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section cs2-testimonial">
        <div className="container">
          <SectionHeading eyebrow="TESTIMONIAL" title="What the Client Says" />
          <div className="cs2-testimonial__card glass-card">
            <p className="cs2-testimonial__quote">Client testimonial to be added after approval.</p>
          </div>
        </div>
      </section>

      {/* Services Used */}
      <section className="section cs2-services section--alt">
        <div className="container">
          <SectionHeading eyebrow="SERVICES" title="Services Used" />
          <div className="cs2-services__grid">
            {SERVICES_USED.map((svc) => (
              <Link key={svc.name} to={svc.path} className="cs2-service glass-card">
                <h3 className="cs2-service__name">{svc.name}</h3>
                <p className="cs2-service__desc">{svc.desc}</p>
                <span className="cs2-service__cta">
                  Learn More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="section cs2-related-services">
        <div className="container">
          <SectionHeading eyebrow="SERVICES" title="Build Your AI Search Visibility" />
          <div className="cs2-related-services__grid">
            {RELATED_SERVICES.map((svc) => (
              <Link key={svc.name} to={svc.path} className="cs2-related-service glass-card">
                <h3 className="cs2-related-service__name">{svc.name}</h3>
                <span className="cs2-related-service__cta">
                  Learn More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      <section className="section cs2-related-cases section--alt">
        <div className="container">
          <SectionHeading eyebrow="CASE STUDIES" title="Explore More Case Studies" />
          <div className="cs2-related-cases__grid">
            {RELATED_CASES.map((r) => (
              <Link key={r.label} to={r.path} className="cs2-related-case glass-card">
                <h3 className="cs2-related-case__label">{r.label}</h3>
                <span className="cs2-related-case__cta">
                  View Case Study
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Author Block */}
      <section className="section cs2-author">
        <div className="container">
          <div className="cs2-author__card glass-card">
            <h3 className="cs2-author__title">Built Around AI Search Strategy</h3>
            <p className="cs2-author__desc">Static Savvy Media combines traditional SEO expertise with forward-looking GEO/AEO methodology to help businesses prepare for the future of search.</p>
            <Link to="/about/deepan-kanz/" className="cs2-author__link">
              Meet the Team
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        eyebrow="Ready for the AI Search Era?"
        title="Ready for the AI Search Era?"
        subtitle="Your customers are changing how they search. Build a digital presence that works across traditional search and emerging AI-powered answer experiences."
        primaryLabel="Let's Talk"
        primaryHref={whatsappHref}
        secondaryLabel="Explore GEO/AEO"
        secondaryTo="/services/geo-aeo-ai-search/"
      />
    </div>
  )
}