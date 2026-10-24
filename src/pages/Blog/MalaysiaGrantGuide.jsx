import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import BlogFeaturedImage from '../../components/blog/BlogFeaturedImage.jsx'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import { blogPostingSchema, faqPageSchema, breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL } from '../../utils/constants.js'

/* ============================================================
   CONTENT, Approved Static Savvy Media Malaysia Grant Guide
   ============================================================ */

const PAGE_TITLE = 'Using MDEC & SMECorp Grants for Digital Marketing in Malaysia, 2026 Guide'

const PAGE_DESCRIPTION =
  'A practical guide to MDEC and SMECorp digitalisation grants for Malaysian SMEs, including eligible digital marketing services, application steps, common mistakes, and how Static Savvy Media can help.'

const AUTHOR = 'Deepan Kanz'
const AUTHOR_ROLE = 'Founder & AI Search Specialist'
const READING_TIME = 'Approx. 9–11 min read'

const INTRODUCTION =
  'Malaysia has built a range of programmes supporting SME digitalisation. Many SMEs know that grants exist but may not know which programme applies, what type of digital work may qualify, whether the vendor needs to meet specific requirements, what documents may be needed, how the application process works, or when to apply. This guide is a practical reference to help Malaysian businesses navigate the MDEC and SMECorp grant landscape for digital marketing and related digital services.'

const MDEC_SERVICES = [
  'Website development',
  'Digital marketing',
  'E-commerce',
  'Digital tools',
  'Online business systems',
  'Digital customer engagement',
  'AI / technology adoption where applicable',
]

const MDEC_MARKETING = [
  { area: 'SEO', detail: 'Search engine optimisation for organic visibility' },
  { area: 'Social Media Marketing', detail: 'Social content, advertising, and community management' },
  { area: 'Website Development', detail: 'Business websites, landing pages, and conversion optimisation' },
  { area: 'Digital Advertising', detail: 'Paid search and display campaign management' },
  { area: 'Content', detail: 'Content strategy and creation for digital channels' },
  { area: 'E-commerce Support', detail: 'Online store setup and optimisation' },
  { area: 'Digital Business Tools', detail: 'CRM, automation, and digital process improvement' },
]

const GRANT_FLOW = [
  'ELIGIBLE SME',
  'APPROVED DIGITAL NEED',
  'ELIGIBLE / APPROVED PROVIDER',
  'APPLICATION',
  'APPROVAL',
  'DIGITAL IMPLEMENTATION',
  'DOCUMENTATION / CLAIM',
]

const SERVICE_CARDS = [
  {
    title: 'SEO',
    items: ['Content strategy', 'Technical SEO', 'Keyword research', 'Search visibility'],
    color: 'purple',
  },
  {
    title: 'Website Development',
    items: ['Business website', 'Landing pages', 'Conversion optimisation', 'SEO-ready structure'],
    color: 'cyan',
  },
  {
    title: 'Social Media Marketing',
    items: ['Social content', 'Social advertising', 'Brand visibility', 'Lead generation'],
    color: 'pink',
  },
  {
    title: 'Digital Advertising',
    items: ['Paid search', 'Campaign management', 'Lead generation', 'Performance tracking'],
    color: 'blue',
  },
  {
    title: 'E-commerce',
    items: ['Product listing optimisation', 'E-commerce setup', 'Product photography', 'Marketplace support'],
    color: 'purple',
  },
  {
    title: 'AI / Digital Automation',
    items: ['Business automation', 'AI-powered workflows', 'Chatbots', 'Digital process improvement'],
    color: 'cyan',
  },
]

const APPLY_STEPS = [
  {
    number: '01',
    title: 'Confirm Business Eligibility',
    text: 'The SME must first check the current programme eligibility requirements. Different programmes have different criteria for company size, registration status, revenue thresholds, and industry classification.',
  },
  {
    number: '02',
    title: 'Identify the Right Programme',
    text: 'Compare the available programme with the actual business requirement. Not every programme covers every type of digital work. Match your specific digital need to the programme that best fits.',
  },
  {
    number: '03',
    title: 'Define the Digital Project',
    text: 'Clearly document what the business wants to implement. Examples include a new website, SEO services, digital marketing campaigns, e-commerce setup, or business automation tools. A clear scope helps during application and implementation.',
  },
  {
    number: '04',
    title: 'Check Provider / Vendor Requirements',
    text: 'Some programmes require approved or registered providers. Verify whether your chosen provider meets the current programme requirements before committing to a project.',
  },
  {
    number: '05',
    title: 'Prepare Documents',
    text: 'Possible documents may include business registration details, company information, quotation, project scope, financial or tax documents where required, and other programme-specific documents. Exact documentation varies by programme.',
  },
  {
    number: '06',
    title: 'Submit the Application',
    text: 'Application method varies by programme. Follow the specific submission process for the programme you are applying to. Ensure all required documents are complete before submission.',
  },
  {
    number: '07',
    title: 'Wait for Approval',
    text: 'Do not assume approval before receiving official confirmation. Wait for the programme administrator to review and approve your application before beginning implementation.',
  },
  {
    number: '08',
    title: 'Implement and Maintain Documentation',
    text: 'Once approved, implement the project and maintain all documentation: invoices, receipts, project documentation, implementation evidence, payment records, and any required claims documentation.',
  },
]

const MISTAKES = [
  {
    number: '01',
    title: 'Choosing a service before checking eligibility',
    text: 'Selecting a digital service without first verifying that the programme covers it can result in wasted time and unexpected costs.',
  },
  {
    number: '02',
    title: 'Assuming every digital marketing service is automatically funded',
    text: 'Not all digital marketing activities are eligible under every programme. Each programme has specific scope and eligible expense categories.',
  },
  {
    number: '03',
    title: 'Using a provider without checking programme requirements',
    text: 'Some programmes require approved or registered vendors. Using a non-compliant provider may disqualify your application.',
  },
  {
    number: '04',
    title: 'Starting the project before approval when prior approval is required',
    text: 'Beginning work before receiving official approval can invalidate your claim. Always confirm whether pre-approval is needed.',
  },
  {
    number: '05',
    title: 'Not maintaining proper quotations and invoices',
    text: 'Incomplete or missing documentation is one of the most common reasons claims are rejected. Keep every invoice, receipt, and record.',
  },
  {
    number: '06',
    title: 'Treating the grant as a marketing budget instead of a digital transformation investment',
    text: 'Grants support structured digital transformation, not general marketing spend. Align your project with genuine digital improvement.',
  },
  {
    number: '07',
    title: 'Failing to verify current programme terms',
    text: 'Programme rules, deadlines, and eligibility criteria change. What worked last year may not apply this year. Always check current terms.',
  },
]

const STRATEGY_EXAMPLES = [
  {
    problem: 'Low Google visibility',
    solution: 'SEO + Local SEO + Website optimisation',
    color: 'purple',
  },
  {
    problem: 'Weak online presence',
    solution: 'Website + Social Media',
    color: 'cyan',
  },
  {
    problem: 'Manual repetitive processes',
    solution: 'AI Business Automation',
    color: 'pink',
  },
  {
    problem: 'Poor e-commerce visibility',
    solution: 'E-commerce optimisation + Product Photography',
    color: 'blue',
  },
]

const SERVICES = [
  { name: 'SEO', text: 'Technical SEO, keyword strategy, content development, and link building that drives consistent organic traffic growth.' },
  { name: 'GEO & AEO', text: 'Our flagship service. We structure your online presence so ChatGPT, Perplexity, and Google AI Overviews cite your business as the authoritative answer in your category.' },
  { name: 'Local SEO', text: 'Rank in Google Maps and local search for every city where your clients are looking.' },
  { name: 'Google Ads', text: 'High-ROI paid search campaigns managed by certified specialists. Every rupee and ringgit tracked back to real business outcomes.' },
  { name: 'Social Media', text: 'Instagram, Facebook, and LinkedIn content and ad management that builds brand equity and drives qualified leads.' },
  { name: 'Website Development', text: 'SEO-ready, Core Web Vitals-optimised websites built to convert.' },
  { name: 'AI Business Automation', text: 'Automate repetitive workflows, deploy AI chatbots, and integrate intelligent tools that free your team to focus on growth.' },
]

const CHECKLIST = [
  'I understand my current digital business problem',
  'I have identified the right digital solution',
  'I checked the current grant programme',
  'I checked my business eligibility',
  'I checked provider / vendor requirements',
  'I have a clear project scope',
  'I have quotations where required',
  'I have the required business documents',
  'I understand the application process',
  'I know whether approval is required before starting',
  'I will retain invoices and implementation records',
  'I will verify the current programme rules before applying',
]

const FAQS = [
  {
    question: 'Can Malaysian SMEs use government grants for digital marketing?',
    answer: 'Some digitalisation programmes may support digital marketing or related digital services, but eligibility depends on the specific programme, business, provider, and current rules. Not every programme covers every type of digital marketing activity.',
  },
  {
    question: 'Does MDEC fund SEO and website development?',
    answer: 'Digital marketing and website-related work may be relevant to certain programmes, but businesses must verify the exact current programme scope and eligibility. Programme coverage varies and changes over time.',
  },
  {
    question: 'How much can an SME receive from a digitalisation grant?',
    answer: 'Funding limits vary by programme and may change. Different programmes have different caps, matching requirements, and eligible expense categories. Always check the current programme details for specific funding information.',
  },
  {
    question: 'Do I need an approved vendor?',
    answer: 'Some programmes have provider or vendor requirements. Businesses should verify whether the chosen provider meets the current programme requirements before applying. Using a non-compliant provider may affect eligibility.',
  },
  {
    question: 'Can Static Savvy Media help with Malaysia grant-aware digital marketing?',
    answer: 'Static Savvy Media operates from Rawang, Selangor. We provide SEO, GEO/AEO, Local SEO, Google Ads, Social Media Marketing, Website Design & Development, AI Business Automation, and creative services. We can help businesses understand which digital marketing requirements they need to address and prepare a suitable digital project scope.',
  },
]

const TOC_ITEMS = [
  { id: 'grant-landscape', label: 'Malaysia SME Grant Landscape' },
  { id: 'mdec', label: 'MDEC' },
  { id: 'sme-digitalisation', label: 'SME Digitalisation Initiative' },
  { id: 'qualifying-services', label: 'Qualifying Digital Marketing Services' },
  { id: 'application-process', label: 'Application Process' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'grant-aware-strategy', label: 'Grant-Aware Strategy' },
  { id: 'sme-transformation', label: 'SME Digital Transformation' },
  { id: 'grant-checklist', label: 'Grant Checklist' },
  { id: 'faq', label: 'FAQs' },
]

/* ============================================================
   COMPONENT
   ============================================================ */

export default function MalaysiaGrantGuide() {
  const jsonLdRef = useRef([])
  const progressRef = useRef(null)

  useEffect(() => {
    setSeo({
      title: `${PAGE_TITLE} | Static Savvy Media`,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/blog/digital-marketing-malaysia-sme-grant-guide/`,
      ogType: 'article',
    })

    const faqEntities = FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    }))

    const blogPost = blogPostingSchema({
      headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      author: { '@type': 'Person', name: AUTHOR, jobTitle: AUTHOR_ROLE },
      publisher: {
        '@type': 'Organization',
        name: 'Static Savvy Media',
        url: SITE_URL,
      },
      url: `${SITE_URL}/blog/digital-marketing-malaysia-sme-grant-guide/`,
      mainEntityOfPage: `${SITE_URL}/blog/digital-marketing-malaysia-sme-grant-guide/`,
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Blog', item: `${SITE_URL}/blog/` },
        { name: 'Malaysia SME Grant Guide', item: `${SITE_URL}/blog/digital-marketing-malaysia-sme-grant-guide/` },
      ],
    })

    const scripts = [
      blogPost,
      faqPageSchema({ faqs: faqEntities }),
      breadcrumbs,
    ].map((data) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.text = JSON.stringify(data)
      document.head.appendChild(script)
      return script
    })
    jsonLdRef.current = scripts

    const handleScroll = () => {
      if (!progressRef.current) return
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (window.scrollY / docHeight) * 100
      progressRef.current.style.width = `${Math.min(scrolled, 100)}%`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      jsonLdRef.current.forEach((s) => s.remove())
      jsonLdRef.current = []
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const whatsappHref = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)

  return (
    <div className="about-template">
      <div className="malaysia-progress" aria-hidden="true">
        <div className="malaysia-progress__bar" ref={progressRef} />
      </div>

      <Breadcrumbs />

      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="section">
        <div className="container">
          <div className="malaysia-hero">
            <div className="malaysia-hero__content">
              <span className="malaysia-hero__badge">MALAYSIA SME GRANTS</span>
              <h1 className="hero__title">
                Using MDEC &amp; SMECorp Grants for Digital Marketing in Malaysia{' '}
                <span className="text-gradient">,  2026 Guide</span>
              </h1>
              <div className="malaysia-hero__meta">
                <span className="malaysia-hero__meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  {AUTHOR}
                </span>
                <span className="malaysia-hero__meta-item">Static Savvy Media</span>
                <span className="malaysia-hero__meta-item">Rawang, Selangor, Malaysia</span>
                <span className="malaysia-hero__meta-item">{READING_TIME}</span>
              </div>
              <p className="malaysia-hero__intro">
                A practical guide for Malaysian SMEs exploring government-supported digital transformation, digital marketing, SEO, websites, social media, and AI-powered growth.
              </p>
            </div>
            <div className="malaysia-hero__visual">
              <div className="malaysia-hero__visual-card">
                <div className="malaysia-hero__visual-label">Malaysia SME Grants</div>
                <div className="malaysia-hero__visual-flow">
                  <div className="malaysia-hero__visual-step malaysia-hero__visual-step--mdec">MDEC</div>
                  <div className="malaysia-hero__visual-step malaysia-hero__visual-step--smecorp">SMECorp</div>
                  <div className="malaysia-hero__visual-arrow" aria-hidden="true">↓</div>
                  <div className="malaysia-hero__visual-step malaysia-hero__visual-step--sme">Malaysian SME</div>
                  <div className="malaysia-hero__visual-arrow" aria-hidden="true">↓</div>
                  <div className="malaysia-hero__visual-step malaysia-hero__visual-step--digital">Digital Transformation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BlogFeaturedImage slug="digital-marketing-malaysia-sme-grant-guide" />

      {/* ============================================================
          ARTICLE BODY + TOC
          ============================================================ */}
      <section className="section section--alt">
        <div className="container">
          <div className="malaysia-article">
            <div className="malaysia-article__body">

              {/* ---- Introduction ---- */}
              <div className="malaysia-intro">
                <p>{INTRODUCTION}</p>
              </div>

              {/* ---- Grant Disclaimer ---- */}
              <ScrollReveal>
                <div className="malaysia-disclaimer">
                  <div className="malaysia-disclaimer__icon" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <div className="malaysia-disclaimer__content">
                    <div className="malaysia-disclaimer__title">Important Grant Notice</div>
                    <p className="malaysia-disclaimer__text">
                      Grant programmes, eligibility requirements, funding limits, approved vendor requirements, application windows, and eligible expenses can change. The information in this article is intended for general guidance and should not be treated as a guarantee of eligibility or approval. Always verify the latest requirements with the relevant Malaysian programme administrator before committing to a project.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* ---- Section 01: What Is MDEC ---- */}
              <h2 id="mdec">What Is MDEC and What Digital Marketing Does It Fund?</h2>
              <p>
                MDEC, Malaysia Digital Economy Corporation, is associated with Malaysia&apos;s digital economy and SME digitalisation ecosystem. It supports programmes designed to help businesses adopt digital technologies, improve online presence, and accelerate digital transformation.
              </p>

              <ScrollReveal>
                <div className="malaysia-info-card">
                  <div className="malaysia-info-card__badge">MDEC</div>
                  <div className="malaysia-info-card__title">Malaysia Digital Economy Corporation</div>
                  <p className="malaysia-info-card__text">
                    Supports Malaysia&apos;s digital economy through programmes that help businesses adopt digital technologies and accelerate digital transformation.
                  </p>
                </div>
              </ScrollReveal>

              <p>Potential digital transformation areas relevant to businesses include:</p>
              <div className="malaysia-tag-list">
                {MDEC_SERVICES.map((s) => (
                  <span key={s} className="malaysia-tag">{s}</span>
                ))}
              </div>

              <p>Specifically for digital marketing, the following service areas may fit depending on the current programme and eligibility:</p>

              <div className="malaysia-marketing-grid">
                {MDEC_MARKETING.map((item) => (
                  <ScrollReveal key={item.area}>
                    <div className="malaysia-marketing-card">
                      <div className="malaysia-marketing-card__area">{item.area}</div>
                      <div className="malaysia-marketing-card__detail">{item.detail}</div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <p className="malaysia-note">
                Eligibility depends on the specific programme, approved vendor status, business eligibility, and current funding rules.
              </p>

              {/* ---- Section 02: SME Digitalisation Initiative ---- */}
              <h2 id="sme-digitalisation">What Is the SME Digitalisation Initiative?</h2>
              <p>
                The SME Digitalisation Initiative focuses on helping small and medium enterprises adopt digital solutions. It typically involves a matching-grant concept where the government supports a portion of digital transformation costs, subject to programme-specific rules.
              </p>

              <p>
                Some SME digitalisation programmes have offered matching support, but the exact percentage, cap, eligible expenses, vendor requirements, and application window can change. Businesses should verify current programme terms before making decisions.
              </p>

              <ScrollReveal>
                <div className="malaysia-flow">
                  <div className="malaysia-flow__title">Grant Application Flow</div>
                  {GRANT_FLOW.map((step, index) => (
                    <div key={step} className="malaysia-flow__item">
                      <div className={`malaysia-flow__step ${index === 0 ? 'malaysia-flow__step--active' : ''}`}>{step}</div>
                      {index < GRANT_FLOW.length - 1 && <div className="malaysia-flow__arrow" aria-hidden="true">↓</div>}
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* ---- Section 03: Qualifying Services ---- */}
              <h2 id="qualifying-services">Which Digital Marketing Services May Qualify for SME Grants?</h2>
              <p>
                Different programmes cover different types of digital work. Here are service categories that may be relevant, depending on the programme scope and eligibility requirements.
              </p>

              <div className="malaysia-service-grid">
                {SERVICE_CARDS.map((card, index) => (
                  <ScrollReveal key={card.title} delay={index * 60}>
                    <div className={`malaysia-service-card malaysia-service-card--${card.color}`}>
                      <h3 className="malaysia-service-card__title">{card.title}</h3>
                      <ul className="malaysia-service-card__list">
                        {card.items.map((item) => (
                          <li key={item} className="malaysia-service-card__item">{item}</li>
                        ))}
                      </ul>
                      <p className="malaysia-service-card__disclaimer">
                        Eligibility depends on the specific programme, approved vendor status, and current grant rules.
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* ---- Section 04: How to Apply ---- */}
              <h2 id="application-process">How to Apply for SME Digital Marketing Grants, Step by Step</h2>
              <p>
                The application process varies by programme, but here is a general framework for approaching SME digital marketing grants.
              </p>

              <div className="malaysia-steps">
                {APPLY_STEPS.map((step) => (
                  <ScrollReveal key={step.number}>
                    <div className="malaysia-step">
                      <div className="malaysia-step__number">{step.number}</div>
                      <div className="malaysia-step__content">
                        <h3 className="malaysia-step__title">{step.title}</h3>
                        <p className="malaysia-step__text">{step.text}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* ---- Section 05: Common Mistakes ---- */}
              <h2 id="common-mistakes">Common Mistakes Malaysian SMEs Make With Digital Marketing Grants</h2>
              <p>
                Avoid these common pitfalls when exploring grant-funded digital marketing.
              </p>

              <div className="malaysia-mistakes">
                {MISTAKES.map((mistake) => (
                  <ScrollReveal key={mistake.number}>
                    <div className="malaysia-mistake-card">
                      <div className="malaysia-mistake-card__warning" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                          <line x1="12" y1="9" x2="12" y2="13" />
                          <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                      </div>
                      <div className="malaysia-mistake-card__number">{mistake.number}</div>
                      <h3 className="malaysia-mistake-card__title">{mistake.title}</h3>
                      <p className="malaysia-mistake-card__text">{mistake.text}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* ---- Section 06: Grant-Aware Strategy ---- */}
              <h2 id="grant-aware-strategy">Grant-Aware Digital Marketing Strategy for Malaysian SMEs</h2>
              <p>
                The best approach connects your actual business problem to a digital solution, then maps that solution to an eligible programme and service provider.
              </p>

              <ScrollReveal>
                <div className="malaysia-flow malaysia-flow--wide">
                  <div className="malaysia-flow__title">Strategy Framework</div>
                  {['BUSINESS PROBLEM', 'DIGITAL REQUIREMENT', 'ELIGIBLE PROGRAMME', 'ELIGIBLE SERVICE', 'IMPLEMENTATION', 'MEASUREMENT'].map((step, index) => (
                    <div key={step} className="malaysia-flow__item">
                      <div className={`malaysia-flow__step ${index === 0 ? 'malaysia-flow__step--active' : ''}`}>{step}</div>
                      {index < 5 && <div className="malaysia-flow__arrow" aria-hidden="true">↓</div>}
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <p>Here are strategic examples of how common business problems map to digital solutions:</p>

              <div className="malaysia-examples">
                {STRATEGY_EXAMPLES.map((ex, index) => (
                  <ScrollReveal key={ex.problem} delay={index * 60}>
                    <div className={`malaysia-example-card malaysia-example-card--${ex.color}`}>
                      <div className="malaysia-example-card__problem">
                        <span className="malaysia-example-card__label">Problem</span>
                        <span className="malaysia-example-card__value">{ex.problem}</span>
                      </div>
                      <div className="malaysia-example-card__arrow" aria-hidden="true">→</div>
                      <div className="malaysia-example-card__solution">
                        <span className="malaysia-example-card__label">Possible Solution</span>
                        <span className="malaysia-example-card__value">{ex.solution}</span>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <p className="malaysia-note">
                These are strategic examples only. Do not assume that the examples are automatically grant-funded. Eligibility depends on the specific programme and current rules.
              </p>

              {/* ---- Section 07: SME Digital Transformation ---- */}
              <h2 id="sme-transformation">Why Digital Marketing Should Be Part of Your SME Transformation</h2>
              <p>
                Digital transformation is broader than simply building a website. It encompasses discoverability, trust-building, customer acquisition, digital sales, customer communication, automation, data-driven decisions, and AI search visibility.
              </p>

              <div className="malaysia-services-grid">
                {SERVICES.map((service, index) => (
                  <ScrollReveal key={service.name} delay={index * 40}>
                    <div className="malaysia-service-block">
                      <h3 className="malaysia-service-block__name">{service.name}</h3>
                      <p className="malaysia-service-block__text">{service.text}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* ---- Section 08: Grant Checklist ---- */}
              <h2 id="grant-checklist">MDEC / SMECorp Grant Checklist for Malaysian SMEs</h2>
              <p>
                Use this checklist before applying for any digital marketing grant programme.
              </p>

              <div className="malaysia-checklist">
                {CHECKLIST.map((item, index) => (
                  <ScrollReveal key={item} delay={index * 30}>
                    <label className="malaysia-checklist__item">
                      <input type="checkbox" className="malaysia-checklist__checkbox" />
                      <span className="malaysia-checklist__check" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className="malaysia-checklist__text">{item}</span>
                    </label>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal>
                <div className="malaysia-checklist-warning">
                  <p>
                    Grant rules can change. Always verify current eligibility, funding limits, approved vendors, deadlines, and documentation requirements before making a business decision.
                  </p>
                </div>
              </ScrollReveal>

              {/* ---- Section 09: Why Static Savvy Media ---- */}
              <h2 id="why-ssm">Why Static Savvy Media for Malaysian SMEs?</h2>
              <p>
                Static Savvy Media serves Malaysian SMEs from Rawang, Selangor with grant-aware digital marketing strategies. We understand the Malaysian market and SME-focused approach to digital transformation.
              </p>

              <div className="malaysia-why-us">
                <ScrollReveal delay={0}>
                  <div className="malaysia-why-card">
                    <div className="malaysia-why-card__number">01</div>
                    <h3 className="malaysia-why-card__title">Malaysia Market Understanding</h3>
                    <p className="malaysia-why-card__text">Based in Rawang, Selangor. We understand the local SME landscape, market dynamics, and digital transformation needs.</p>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={80}>
                  <div className="malaysia-why-card">
                    <div className="malaysia-why-card__number">02</div>
                    <h3 className="malaysia-why-card__title">Grant-Aware Approach</h3>
                    <p className="malaysia-why-card__text">We help businesses understand which digital marketing requirements they need to address and prepare suitable project scopes.</p>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={160}>
                  <div className="malaysia-why-card">
                    <div className="malaysia-why-card__number">03</div>
                    <h3 className="malaysia-why-card__title">Complete Service Ecosystem</h3>
                    <p className="malaysia-why-card__text">SEO, GEO/AEO, Local SEO, Google Ads, Social Media, Website Development, AI Automation, and creative services, everything under one roof.</p>
                  </div>
                </ScrollReveal>
              </div>

              {/* ---- FAQ ---- */}
              <h2 id="faq">Frequently Asked Questions About Malaysia SME Digital Grants</h2>
              <div className="malaysia-faq">
                {FAQS.map((faq, index) => (
                  <ScrollReveal key={index}>
                    <div className="malaysia-faq__item">
                      <details className="malaysia-faq__details glass-card">
                        <summary className="malaysia-faq__question">{faq.question}</summary>
                        <p className="malaysia-faq__answer">{faq.answer}</p>
                      </details>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* ---- Author Bio ---- */}
              <div className="malaysia-author">
                <div className="malaysia-author__avatar" aria-hidden="true">DK</div>
                <div>
                  <div className="malaysia-author__name">{AUTHOR}</div>
                  <div className="malaysia-author__role">{AUTHOR_ROLE}, Static Savvy Media</div>
                  <Link to="/about/deepan-kanz/" className="malaysia-author__link">View Full Profile →</Link>
                </div>
              </div>

            </div>

            {/* ---- Sticky TOC ---- */}
            <aside className="malaysia-toc" aria-label="Table of Contents">
              <div className="malaysia-toc__title">Table of Contents</div>
              <ul className="malaysia-toc__list">
                {TOC_ITEMS.map((item) => (
                  <li key={item.id} className="malaysia-toc__item">
                    <a href={`#${item.id}`} className="malaysia-toc__link">{item.label}</a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA
          ============================================================ */}
      <CTASection
        eyebrow="Malaysia SME Services"
        title="Grow Your Malaysian Business With Grant-Aware Digital Marketing"
        subtitle="Explore the digital improvements your business needs, understand the relevant programme requirements, and build a practical implementation plan."
        primaryLabel="WhatsApp for Malaysia Services & Grants"
        primaryHref={whatsappHref}
      />
    </div>
  )
}
