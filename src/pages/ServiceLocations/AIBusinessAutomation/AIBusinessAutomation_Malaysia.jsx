import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../../components/common/Breadcrumbs.jsx'
import Button from '../../../components/common/Button.jsx'
import HeroSection from '../../../components/hero/HeroSection.jsx'
import FAQSection from '../../../components/sections/FAQSection.jsx'
import CTASection from '../../../components/sections/CTASection.jsx'
import { ScrollReveal } from '../../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../../utils/seo.js'
import {
  serviceSchema,
  faqPageSchema,
  breadcrumbListSchema,
} from '../../../utils/schema.js'
import { buildWhatsAppLink } from '../../../utils/helpers.js'
import {
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
  SITE_URL,
  MALAYSIA_OFFICE,
} from '../../../utils/constants.js'
import '../../../styles/pages/ai-business-automation-malaysia.css'
import heroImage from '../../../assets/images/AIBusinessAutomation/AIBusinessAutomation.webp'

/* ============================================================
   CONTENT, AI Business Automation Malaysia
   ============================================================ */

const PAGE_TITLE =
  'AI Business Automation Malaysia, SME Grant-Eligible Digital Services | Static Savvy Media'

const PAGE_DESCRIPTION =
  "AI business automation for Malaysian SMEs, WhatsApp workflows, lead automation, customer service, reporting and document processing. Explore grant-eligible digital transformation options with Static Savvy Media."

const HERO_EYEBROW = 'AI BUSINESS AUTOMATION · MALAYSIA'

const HERO_TITLE =
  'AI Business Automation Malaysia, SME Grant-Eligible Digital Services'

const HERO_PARAGRAPH =
  'AI business automation is now accessible to every SME in Malaysia, and we build it for you without requiring your team to have a technical background. From lead capture to WhatsApp workflows, we create practical automation systems that help Malaysian businesses operate more efficiently.'

const AUTOMATIONS = [
  {
    number: '01',
    title: 'Lead capture and qualification',
    text: 'AI chatbots that collect lead information, qualify enquiries, and route hot leads directly to WhatsApp, 24/7, without staff involvement.',
  },
  {
    number: '02',
    title: 'WhatsApp automation',
    text: 'Automated follow-up sequences, appointment reminders, and status updates through WhatsApp Business API.',
  },
  {
    number: '03',
    title: 'Customer service workflows',
    text: 'FAQ chatbots handling your 20 most common customer questions without human involvement, freeing your team for complex interactions.',
  },
  {
    number: '04',
    title: 'Content workflow automation',
    text: 'Automated content scheduling, social media posting pipelines, and email newsletter workflows integrated with your CMS.',
  },
  {
    number: '05',
    title: 'Reporting automation',
    text: 'Automated weekly and monthly performance reports pulled from GA4, GSC, and ad platforms, delivered to your WhatsApp or email without manual assembly.',
  },
  {
    number: '06',
    title: 'Document and data processing',
    text: 'AI tools that extract, categorise, and summarize documents, useful for businesses processing invoices, contracts, or high volumes of enquiry forms.',
  },
]

const WHY_MALAYSIA = [
  'Handle customer enquiries outside office hours with automated WhatsApp responses',
  'Follow up consistently with leads who enquired but did not convert immediately',
  'Reduce repetitive administrative work that consumes team time',
  'Centralise customer communication through WhatsApp Business API',
  'Automate reporting across GA4, Google Ads, and social media platforms',
  'Process documents and enquiry forms without manual data entry',
  'Maintain content workflows across multiple platforms simultaneously',
]

const TOOLS = [
  'Make',
  'Zapier',
  'n8n',
  'WhatsApp Business API',
  'OpenAI API',
  'Google Apps Script',
  'Notion',
  'Airtable',
]

const TOOLS_TEXT =
  'We build automations using tools your team can manage without ongoing developer dependency: Make (formerly Integromat), Zapier, n8n, WhatsApp Business API, OpenAI API integration, Google Apps Script, and Notion/Airtable as lightweight data layers. Every automation includes documentation so your team can troubleshoot basic issues independently.'

const GRANTS = [
  {
    number: '01',
    title: 'MDEC, Digital Economy Programme',
    text: 'Supports SME adoption of digital tools and automation. Our AI automation services may qualify under the digital transformation spend category.',
  },
  {
    number: '02',
    title: 'SMECorp, SME Digitalisation Initiative',
    text: 'Government matching grants for SME digital adoption. AI automation and workflow tools from registered vendors may be eligible for matching grants.',
  },
  {
    number: '03',
    title: 'TEKUN, Bumiputera Digital Grant',
    text: 'Digital tools and automation support grants for Bumiputera-owned businesses.',
  },
  {
    number: '04',
    title: 'Cradle Fund, CIP Spark',
    text: 'Technology commercialisation funding that can support automation and digital presence building for technology-related SMEs.',
  },
]

const GRANT_DISCLAIMER =
  'Grant programme terms, eligibility criteria, and funding availability change regularly. Contact us on WhatsApp to discuss which current programmes may be applicable to your business. We do not guarantee grant approval, we help you understand your options and connect you with the right channels.'

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Understand',
    text: 'Understand your business process, repetitive tasks, customer communication patterns and operational bottlenecks.',
  },
  {
    number: '02',
    title: 'Map',
    text: 'Map the existing workflow and identify what can be automated for maximum efficiency gain.',
  },
  {
    number: '03',
    title: 'Build',
    text: 'Build the automation using appropriate no-code, low-code, API and AI tools.',
  },
  {
    number: '04',
    title: 'Test',
    text: 'Test the workflow, integrations, notifications and exception handling thoroughly.',
  },
  {
    number: '05',
    title: 'Handover',
    text: 'Provide documentation and a handover walkthrough so your team can manage basic issues independently.',
  },
]

const TRUST_POINTS = [
  'Practical, business-focused automation, not technical demos',
  'No-code and low-code implementation, no developer dependency',
  'Complete documentation and handover for every automation',
  'WhatsApp Business API workflows built and managed for you',
  'Grant-aware project planning for Malaysian SMEs',
  'Reduced operational costs through workflow automation',
]

const FAQS = [
  {
    question: 'Do I need technical staff to use AI automation tools?',
    answer:
      'No. We build automations using no-code and low-code tools such as Make, Zapier and n8n that non-technical business owners can monitor, adjust and expand with minimal training. We provide documentation and a handover walkthrough for every automation we build.',
  },
  {
    question: 'Can AI automation work with my existing WhatsApp Business number?',
    answer:
      'Yes, but WhatsApp Business API, which is required for automation, is different from the standard WhatsApp Business app. We handle the API setup and provider onboarding. Your existing phone number can typically be migrated to the API with minimal disruption.',
  },
  {
    question: 'Is AI automation relevant for small businesses, not just larger companies?',
    answer:
      'It is most impactful for small businesses. A 5-person team running a well-built automation stack can handle the enquiry volume and customer communication of a 10-person team, without the corresponding payroll. The ROI per ringgit spent on automation is typically higher for SMEs than for large companies because the relative efficiency gain is larger.',
  },
  {
    question: 'Can Malaysian SMEs use government grants for AI automation?',
    answer:
      'Qualifying Malaysian SMEs may be able to use applicable digitalisation or digital transformation grant programmes, depending on the current programme rules and the business’s eligibility. Static Savvy Media can help you understand which current programmes may be relevant to your automation project, but grant approval is not guaranteed.',
  },
]

const CTA = {
  title: 'Work smarter. Automate the repetitive. Focus on what only you can do.',
  label: 'WhatsApp Us About Automation',
}

const WHATSAPP_MSG = 'Hi Static Savvy Media, I would like to know more about AI business automation for my Malaysian business.'

/* ============================================================
   COMPONENT
   ============================================================ */

export default function AIBusinessAutomation_Malaysia() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/services/ai-business-automation/malaysia/`,
      ogType: 'website',
    })

    const service = serviceSchema({
      name: 'AI Business Automation Malaysia',
      description:
        'AI business automation services for Malaysian SMEs, including lead capture, WhatsApp automation, customer service workflows, content workflows, reporting automation and document/data processing.',
      url: `${SITE_URL}/services/ai-business-automation/malaysia/`,
      areaServed: 'Malaysia',
    })

    const faq = faqPageSchema({
      faqs: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Services', item: `${SITE_URL}/services/` },
        { name: 'AI Business Automation', item: `${SITE_URL}/services/ai-business-automation/` },
        { name: 'Malaysia', item: `${SITE_URL}/services/ai-business-automation/malaysia/` },
      ],
    })

    const scripts = [service, faq, breadcrumbs].map((data) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.text = JSON.stringify(data)
      document.head.appendChild(script)
      return script
    })
    jsonLdRef.current = scripts

    return () => {
      jsonLdRef.current.forEach((s) => s.remove())
      jsonLdRef.current = []
    }
  }, [])

  const whatsappHref = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MSG)

  return (
    <div className="aba-malaysia-page">
      <Breadcrumbs />

      {/* HERO */}
      <HeroSection
        layout="two-column"
        eyebrow={HERO_EYEBROW}
        title={HERO_TITLE}
        subtitle={HERO_PARAGRAPH}
        actions={
          <>
            <Button
              href={whatsappHref}
              variant="primary"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              {CTA.label}
            </Button>
            <Button href="/services/ai-business-automation/" variant="ghost" size="lg">
              Explore AI Business Automation
            </Button>
          </>
        }
      >
        <div className="hero__visual-side">
          <img
            src={heroImage}
            width={1536}
            height={1024}
            fetchPriority="high"
            alt="AI Business Automation"
            className="hero__image"
          />
        </div>
      </HeroSection>

      {/* WHAT WE AUTOMATE */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Services</span>
              <h2 className="section-heading__title">What We Automate</h2>
              <p className="section-heading__subtitle">
                Six core automation areas designed for Malaysian SME operations.
              </p>
            </div>
          </ScrollReveal>
          <div className="aba-malaysia-automations">
            {AUTOMATIONS.map((item) => (
              <ScrollReveal key={item.number}>
                <div className="aba-malaysia-automation glass-card">
                  <span className="aba-malaysia-automation__number">{item.number}</span>
                  <h3 className="aba-malaysia-automation__title">{item.title}</h3>
                  <p className="aba-malaysia-automation__text">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY MALAYSIA */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Malaysia</span>
              <h2 className="section-heading__title">Why AI Automation Matters for Malaysian SMEs</h2>
              <p className="section-heading__subtitle">
                Malaysian businesses face unique operational challenges. Automation helps you
                handle more with the team you have.
              </p>
            </div>
          </ScrollReveal>
          <div className="aba-malaysia-why">
            <ul className="aba-malaysia-why__list">
              {WHY_MALAYSIA.map((item, i) => (
                <li key={i} className="aba-malaysia-why__item">
                  <span className="aba-malaysia-why__check" aria-hidden="true">&#10003;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Tools</span>
              <h2 className="section-heading__title">Tools We Use</h2>
            </div>
          </ScrollReveal>
          <p className="aba-malaysia-tools__text">{TOOLS_TEXT}</p>
          <div className="aba-malaysia-tools">
            {TOOLS.map((tool) => (
              <span key={tool} className="aba-malaysia-tool glass-card">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* GRANTS */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Grants</span>
              <h2 className="section-heading__title">Malaysia SME Digital Transformation Grants</h2>
              <p className="section-heading__subtitle">
                Our AI automation service is eligible for MDEC and SMECorp digital transformation
                grants for qualifying Malaysian SMEs.
              </p>
            </div>
          </ScrollReveal>
          <div className="aba-malaysia-grants">
            {GRANTS.map((item) => (
              <ScrollReveal key={item.number}>
                <div className="aba-malaysia-grant glass-card">
                  <span className="aba-malaysia-grant__number">{item.number}</span>
                  <h3 className="aba-malaysia-grant__title">{item.title}</h3>
                  <p className="aba-malaysia-grant__text">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="aba-malaysia-grant-disclaimer glass-card">
            <p>{GRANT_DISCLAIMER}</p>
          </div>
        </div>
      </section>

      {/* MALAYSIA CONTEXT */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Local</span>
              <h2 className="section-heading__title">AI Automation for Businesses in Malaysia</h2>
            </div>
          </ScrollReveal>
          <div className="aba-malaysia-context">
            <p>
              Malaysian SMEs in Selangor, Rawang, Kuala Lumpur and the Klang Valley are
              increasingly adopting AI automation to stay competitive. Whether you run a
              service business, retail operation, or professional practice, automation helps
              you handle customer enquiries, manage workflows and process information more
              efficiently.
            </p>
            <p>
              We work with businesses operating in English and Bahasa Malaysia environments,
              building WhatsApp-based automation systems that match how Malaysian customers
              actually communicate. From SME digitalisation to workflow optimisation, our
              automation services are designed for the Malaysian business context.
            </p>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Process</span>
              <h2 className="section-heading__title">How AI Automation Works</h2>
            </div>
          </ScrollReveal>
          <div className="aba-malaysia-process">
            {PROCESS_STEPS.map((step) => (
              <div key={step.number} className="aba-malaysia-process__step">
                <span className="aba-malaysia-process__number">{step.number}</span>
                <div className="aba-malaysia-process__content">
                  <h3 className="aba-malaysia-process__title">{step.title}</h3>
                  <p className="aba-malaysia-process__text">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Why Us</span>
              <h2 className="section-heading__title">Why Malaysian SMEs Work With Static Savvy Media</h2>
            </div>
          </ScrollReveal>
          <div className="aba-malaysia-trust">
            {TRUST_POINTS.map((point, i) => (
              <div key={i} className="aba-malaysia-trust__point glass-card">
                <span className="aba-malaysia-trust__check" aria-hidden="true">&#10003;</span>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NAP */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="aba-malaysia-nap glass-card">
              <h2 className="aba-malaysia-nap__title">Static Savvy Media, Malaysia</h2>
              <div className="aba-malaysia-nap__details">
                <p>
                  {MALAYSIA_OFFICE.streetAddress}, {MALAYSIA_OFFICE.postalCode} {MALAYSIA_OFFICE.addressLocality}, {MALAYSIA_OFFICE.addressRegion}, Malaysia
                </p>
                <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem', margin: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Call: <a href={MALAYSIA_OFFICE.phoneHref} aria-label={`Call Static Savvy Media Malaysia on ${MALAYSIA_OFFICE.phoneDisplay}`}>{MALAYSIA_OFFICE.phoneDisplay}</a></span>
                </p>
                <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem', margin: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#25D366', flexShrink: 0 }} aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>WhatsApp: <a href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp Static Savvy Media on ${MALAYSIA_OFFICE.whatsappDisplay}`}>{MALAYSIA_OFFICE.whatsappDisplay}</a></span>
                </p>
                <p>Hours: {MALAYSIA_OFFICE.hoursDisplay} · {MALAYSIA_OFFICE.hoursNote}</p>
              </div>
              <div className="aba-malaysia-nap__links">
                <a
                  href={whatsappHref}
                  className="btn btn--primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {CTA.label}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Further reading: guides and related Malaysia services */}
      <section className="section">
        <div className="container">
          <div className="section-heading section-heading--left">
            <span className="section-heading__eyebrow">Plan Your Automation</span>
            <h2 className="section-heading__title">Guides and Related Services</h2>
          </div>
          <ul className="related-content__links" style={{ listStyle: 'none', padding: 0 }}>
            <li><Link to="/blog/agentic-ai-tools-small-business-marketing/" className="related-content__link">Top agentic AI tools for small business marketing (compared)</Link></li>
            <li><Link to="/contact/" className="related-content__link">Get a custom quote for AI automation (WhatsApp +60 12-453 7030)</Link></li>
            <li><Link to="/blog/digital-marketing-malaysia-sme-grant-guide/" className="related-content__link">Malaysia SME digital grant guide</Link></li>
            <li><Link to="/industries/smes-malaysia-grant-eligible/" className="related-content__link">Digital marketing for grant-eligible Malaysian SMEs</Link></li>
            <li><Link to="/services/seo/malaysia/" className="related-content__link">SEO services in Malaysia</Link></li>
            <li><Link to="/locations/malaysia/" className="related-content__link">Static Savvy Media Malaysia (Rawang)</Link></li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">FAQ</span>
              <h2 className="section-heading__title">AI Business Automation Malaysia, Frequently Asked Questions</h2>
            </div>
          </ScrollReveal>
          <div className="aba-malaysia-faqs">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection title={CTA.title} />
    </div>
  )
}

/* ============================================================
   FAQ ITEM COMPONENT
   ============================================================ */

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false)
  const answerId = `aba-malaysia-faq-answer-${faq.question.slice(0, 30).replace(/\s/g, '-')}`
  const questionId = `aba-malaysia-faq-question-${faq.question.slice(0, 30).replace(/\s/g, '-')}`

  return (
    <div className={`aba-malaysia-faq glass-card ${open ? 'aba-malaysia-faq--open' : ''}`}>
      <button
        className="aba-malaysia-faq__trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={answerId}
        id={questionId}
      >
        <span className="aba-malaysia-faq__question">{faq.question}</span>
        <span className="aba-malaysia-faq__icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>
      <div
        className="aba-malaysia-faq__answer-wrap"
        id={answerId}
        role="region"
        aria-labelledby={questionId}
        hidden={!open}
      >
        <p className="aba-malaysia-faq__answer">{faq.answer}</p>
      </div>
    </div>
  )
}
