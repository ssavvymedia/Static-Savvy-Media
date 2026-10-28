import { useEffect, useRef, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import FAQSection from '../../components/sections/FAQSection.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import ContactFormSection from '../../components/sections/ContactFormSection.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import {
  serviceSchema,
  faqPageSchema,
  breadcrumbListSchema,
} from '../../utils/schema.js'
import { buildWhatsAppLink, cx } from '../../utils/helpers.js'
import {
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
  SITE_URL,
} from '../../utils/constants.js'
import '../../styles/templates/service-template.css'
import '../../styles/pages/ai-business-automation.css'
import aiBusinessHeroImg from '../../assets/images/services/07AIBusiness.webp'

/* ============================================================
   CONTENT, Approved Static Savvy Media AI Business Automation
   ============================================================ */

const PAGE_TITLE =
  'AI Business Automation, Workflows, Chatbots & Process Automation | Static Savvy Media'

const PAGE_DESCRIPTION =
  "Automate repetitive workflows, deploy AI chatbots, and integrate intelligent tools. Static Savvy Media's AI business automation service for Indian and Malaysian SMEs."

const HERO_TITLE =
  'AI Business Automation, Streamline Operations, Scale Without Headcount'

const HERO_PARAGRAPH =
  'The businesses winning in 2026 are not necessarily the ones with the most staff, they are the ones using AI to do more with the team they have. AI business automation is now accessible to every SME in Tamil Nadu and Malaysia, and we build it for you without requiring your team to have a technical background.'

const AUTOMATIONS = [
  {
    number: '01',
    title: 'Lead capture and qualification',
    icon: 'lead',
    text: 'AI chatbots that collect lead information, qualify enquiries, and route hot leads directly to WhatsApp, 24/7, without staff involvement.',
    flow: [
      { label: 'CUSTOMER', icon: 'customer' },
      { label: 'AI CHATBOT', icon: 'bot' },
      { label: 'LEAD INFORMATION', icon: 'lead' },
      { label: 'QUALIFICATION', icon: 'qualify' },
      { label: 'HOT LEAD', icon: 'hot' },
      { label: 'WHATSAPP', icon: 'whatsapp' },
    ],
  },
  {
    number: '02',
    title: 'WhatsApp automation',
    icon: 'whatsapp',
    text: 'Automated follow-up sequences, appointment reminders, and status updates through WhatsApp Business API.',
    flow: [
      { label: 'ENQUIRY', icon: 'message' },
      { label: 'FOLLOW-UP', icon: 'followup' },
      { label: 'APPOINTMENT', icon: 'calendar' },
      { label: 'REMINDER', icon: 'bell' },
      { label: 'STATUS UPDATE', icon: 'check' },
    ],
  },
  {
    number: '03',
    title: 'Customer service workflows',
    icon: 'support',
    text: 'FAQ chatbots handling your 20 most common customer questions without human involvement, freeing your team for complex interactions.',
    variant: 'customer-service',
    simpleFlow: [
      { label: 'CUSTOMER QUESTION', icon: 'customer' },
      { label: 'AI FAQ BOT', icon: 'bot' },
      { label: 'ANSWER', icon: 'check' },
    ],
    complexFlow: [
      { label: 'CUSTOMER', icon: 'customer' },
      { label: 'AI', icon: 'ai' },
      { label: 'HUMAN TEAM', icon: 'support' },
    ],
  },
  {
    number: '04',
    title: 'Content workflow automation',
    icon: 'content',
    text: 'Automated content scheduling, social media posting pipelines, and email newsletter workflows integrated with your CMS.',
    flow: [
      { label: 'CONTENT', icon: 'content' },
      { label: 'SCHEDULE', icon: 'clock' },
      { label: 'SOCIAL MEDIA', icon: 'share' },
      { label: 'EMAIL', icon: 'email' },
      { label: 'CMS', icon: 'structure' },
    ],
  },
  {
    number: '05',
    title: 'Reporting automation',
    icon: 'reporting',
    text: 'Automated weekly and monthly performance reports pulled from GA4, GSC, and ad platforms, delivered to your WhatsApp or email without manual assembly.',
    variant: 'reporting',
  },
  {
    number: '06',
    title: 'Document and data processing',
    icon: 'documents',
    text: 'AI tools that extract, categorise, and summarize documents, useful for businesses processing invoices, contracts, or high volumes of enquiry forms.',
    flow: [
      { label: 'DOCUMENTS', icon: 'documents' },
      { label: 'AI EXTRACTION', icon: 'extract' },
      { label: 'CATEGORISE', icon: 'folder' },
      { label: 'SUMMARIZE', icon: 'summarise' },
      { label: 'STRUCTURED DATA', icon: 'database' },
    ],
  },
]

const TOOLS_PARAGRAPH =
  'We build automations using tools your team can manage without ongoing developer dependency: Make (formerly Integromat), Zapier, n8n, WhatsApp Business API, OpenAI API integration, Google Apps Script, and Notion/Airtable as lightweight data layers. Every automation includes documentation so your team can troubleshoot basic issues independently.'

const TOOLS = [
  'Make',
  'Zapier',
  'n8n',
  'WhatsApp Business API',
  'OpenAI API integration',
  'Google Apps Script',
  'Notion',
  'Airtable',
]

const GRANT_TEXT =
  'Our AI automation service is eligible for MDEC and SMECorp digital transformation grants for qualifying Malaysian SMEs. Contact us on WhatsApp to discuss grant eligibility for your specific automation project.'

const FAQS = [
  {
    question: 'Do I need technical staff to use AI automation tools?',
    answer:
      'No. We build automations using no-code and low-code tools (Make, Zapier, n8n) that non-technical business owners can monitor, adjust, and expand with minimal training. We provide documentation and a handover walkthrough for every automation we build.',
  },
  {
    question: 'Can AI automation work with my existing WhatsApp Business number?',
    answer:
      'Yes, but WhatsApp Business API (required for automation) is different from the standard WhatsApp Business app. We handle the API setup and provider onboarding. Your existing phone number can typically be migrated to the API with minimal disruption.',
  },
  {
    question: 'Is AI automation relevant for small businesses, not just larger companies?',
    answer:
      'It is most impactful for small businesses. A 5-person team running a well-built automation stack can handle the enquiry volume and customer communication of a 10-person team, without the corresponding payroll. The ROI per rupee/ringgit spent on automation is typically higher for SMEs than for large companies because the relative efficiency gain is larger.',
  },
]

const RELATED_SERVICES = [
  { name: 'GEO & AEO', path: '/services/geo-aeo-ai-search/' },
  { name: 'Website Design & Development', path: '/services/website-design-development/' },
  { name: 'Social Media Marketing', path: '/services/social-media-marketing/' },
  { name: 'Google Ads', path: '/services/google-ads/' },
  { name: 'SEO', path: '/services/seo/' },
]

const CTA = {
  title: 'Work smarter. Automate the repetitive. Focus on what only you can do.',
  label: 'WhatsApp Us About Automation',
}

/* ============================================================
   ICONS, inline SVG set (stroke style, matches codebase)
   ============================================================ */

const ICONS = {
  customer: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
    </>
  ),
  lead: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" y1="8" x2="19" y2="14" />
      <line x1="22" y1="11" x2="16" y2="11" />
    </>
  ),
  bot: (
    <>
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M12 4v4" />
      <circle cx="9" cy="13" r="1" />
      <circle cx="15" cy="13" r="1" />
    </>
  ),
  whatsapp: (
    <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 1 1 16.1-3.8z" />
  ),
  message: (
    <>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </>
  ),
  support: (
    <>
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
      <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </>
  ),
  content: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </>
  ),
  reporting: (
    <>
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </>
  ),
  documents: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <circle cx="11" cy="14" r="3" />
      <path d="M16 19l-2.5-2.5" />
    </>
  ),
  ai: (
    <>
      <path d="M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4z" />
      <path d="M19 14l.9 2.3L22 17l-2.1.7L19 20l-.9-2.3L16 17l2.1-.7z" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </>
  ),
  zap: (
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </>
  ),
  decision: (
    <>
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </>
  ),
  automation: (
    <>
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="15" width="6" height="6" rx="1" />
      <path d="M9 6h6a3 3 0 0 1 3 3v6" />
    </>
  ),
  email: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6l-10 7L2 6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </>
  ),
  qualify: (
    <>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="M22 4L12 14.01l-3-3" />
    </>
  ),
  process: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
    </>
  ),
  extract: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M12 12v6" />
      <path d="M9 15l3 3 3-3" />
    </>
  ),
  folder: (
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  ),
  summarise: (
    <>
      <line x1="21" y1="6" x2="3" y2="6" />
      <line x1="15" y1="12" x2="3" y2="12" />
      <line x1="17" y1="18" x2="3" y2="18" />
    </>
  ),
  structure: (
    <>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </>
  ),
  check: <path d="M20 6L9 17l-5-5" />,
  hot: (
    <>
      <path d="M12 2s4 4 4 8a4 4 0 0 1-8 0c0-1 .5-2 .5-2S7 10 7 13a5 5 0 0 0 10 0c0-4-5-11-5-11z" />
    </>
  ),
  followup: (
    <>
      <path d="M21 12a9 9 0 1 1-9-9" />
      <path d="M21 3v6h-6" />
    </>
  ),
  share: (
    <>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" />
      <line x1="15.4" y1="6.5" x2="8.6" y2="10.5" />
    </>
  ),
  report: (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 14l4-4 3 3 5-6" />
    </>
  ),
  business: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  transform: (
    <>
      <path d="M17 1l4 4-4 4" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <path d="M7 23l-4-4 4-4" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
}

function AutomationIcon({ name, size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name] || null}
    </svg>
  )
}

/* ============================================================
   WORKFLOW PRIMITIVES
   ============================================================ */

function FlowNode({ label, icon, tone = '' }) {
  return (
    <span className={cx('aba-flow__node', tone && `aba-flow__node--${tone}`)}>
      {icon && (
        <span className="aba-flow__node-icon" aria-hidden="true">
          <AutomationIcon name={icon} size={15} />
        </span>
      )}
      <span className="aba-flow__node-label">{label}</span>
    </span>
  )
}

function FlowArrow() {
  return (
    <span className="aba-flow__arrow" aria-hidden="true">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </span>
  )
}

function Flow({ items = [], className = '', direction = 'vertical' }) {
  return (
    <div className={cx('aba-flow', `aba-flow--${direction}`, className)}>
      {items.map((item, index) => (
        <Fragment key={index}>
          {index > 0 && <FlowArrow />}
          <FlowNode {...item} />
        </Fragment>
      ))}
    </div>
  )
}

/* ============================================================
   COMPONENT
   ============================================================ */

export default function AIBusinessAutomation() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/services/ai-business-automation/`,
      ogType: 'website',
    })

    const faqEntities = FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    }))

    const automationService = serviceSchema({
      serviceType: 'AI Business Automation',
      name: 'AI Business Automation, Static Savvy Media',
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/services/ai-business-automation/`,
      provider: {
        '@type': 'Organization',
        name: 'Static Savvy Media',
        url: SITE_URL,
      },
      areaServed: [
        { '@type': 'City', name: 'Madurai' },
        { '@type': 'City', name: 'Thoothukudi' },
        { '@type': 'Country', name: 'Malaysia' },
      ],
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Services', item: `${SITE_URL}/services/` },
        { name: 'AI Business Automation', item: `${SITE_URL}/services/ai-business-automation/` },
      ],
    })

    const scripts = [
      automationService,
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

    return () => {
      jsonLdRef.current.forEach((script) => script.remove())
      jsonLdRef.current = []
    }
  }, [])

  const whatsappHref = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)

  return (
    <div className="service-template aba-page">
      <style>{`
        .aba-page .aba-automations__grid > *:nth-child(1) .aba-automation-card__icon {
          background: linear-gradient(135deg, #a855f7, #7c3aed) !important;
          box-shadow: 0 0 18px rgba(168, 85, 247, 0.45) !important;
        }
        .aba-page .aba-automations__grid > *:nth-child(2) .aba-automation-card__icon {
          background: linear-gradient(135deg, #22c55e, #16a34a) !important;
          box-shadow: 0 0 18px rgba(34, 197, 94, 0.45) !important;
        }
        .aba-page .aba-automations__grid > *:nth-child(3) .aba-automation-card__icon {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8) !important;
          box-shadow: 0 0 18px rgba(59, 130, 246, 0.45) !important;
        }
        .aba-page .aba-automations__grid > *:nth-child(4) .aba-automation-card__icon {
          background: linear-gradient(135deg, #06b6d4, #0891b2) !important;
          box-shadow: 0 0 18px rgba(6, 182, 212, 0.45) !important;
        }
        .aba-page .aba-automations__grid > *:nth-child(5) .aba-automation-card__icon {
          background: linear-gradient(135deg, #f97316, #ea580c) !important;
          box-shadow: 0 0 18px rgba(249, 115, 22, 0.45) !important;
        }
        .aba-page .aba-automations__grid > *:nth-child(6) .aba-automation-card__icon {
          background: linear-gradient(135deg, #ec4899, #db2777) !important;
          box-shadow: 0 0 18px rgba(236, 72, 153, 0.45) !important;
        }
      `}</style>

      {/* ---- Breadcrumbs ---- */}
      <Breadcrumbs />

      {/* ---- Hero ---- */}
      <HeroSection
        layout="two-column"
        eyebrow="Service"
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
              WhatsApp Us About Automation
            </Button>
          </>
        }
      >
        <div className="hero__visual-side">
          <img src={aiBusinessHeroImg} width={1536} height={1024} fetchPriority="high" alt="AI Business Automation" className="hero__image" />
        </div>
      </HeroSection>

      {/* ---- What We Automate ---- */}
      <section className="section aba-automations">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Automation Areas</span>
            <h2 className="section-heading__title">What We Automate</h2>
          </div>
          <div className="aba-automations__grid">
            {AUTOMATIONS.map((item, index) => (
              <ScrollReveal key={item.number} delay={index * 80}>
                <article className="aba-automation-card glass-card">
                  <div className="aba-automation-card__top">
                    <span
                      className="aba-automation-card__icon"
                      aria-hidden="true"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        width: '52px',
                        height: '52px',
                        color: '#fff',
                      }}
                    >
                      <AutomationIcon name={item.icon} size={22} />
                    </span>
                    <span className="aba-automation-card__number" aria-hidden="true">
                      {item.number}
                    </span>
                  </div>
                  <h3 className="aba-automation-card__title">{item.title}</h3>
                  <p className="aba-automation-card__text">{item.text}</p>
                  <div className="aba-automation-card__flow">
                    {item.variant === 'customer-service' && (
                      <div className="aba-flow aba-flow--split">
                        <Flow items={item.simpleFlow} />
                        <span className="aba-flow__or">Complex query</span>
                        <Flow items={item.complexFlow} />
                      </div>
                    )}
                    {item.variant === 'reporting' && (
                      <div className="aba-flow aba-flow--reporting">
                        <div className="aba-flow__inputs">
                          <span className="aba-flow__input-node">
                            <AutomationIcon name="reporting" size={13} /> GA4
                          </span>
                          <span className="aba-flow__input-node">
                            <AutomationIcon name="reporting" size={13} /> GSC
                          </span>
                          <span className="aba-flow__input-node">
                            <AutomationIcon name="reporting" size={13} /> AD PLATFORMS
                          </span>
                        </div>
                        <FlowArrow />
                        <FlowNode label="AUTOMATION" icon="automation" tone="hot" />
                        <FlowArrow />
                        <div className="aba-flow__report">
                          <span className="aba-flow__report-node">
                            <AutomationIcon name="report" size={13} /> WEEKLY REPORT
                          </span>
                          <span className="aba-flow__report-node">
                            <AutomationIcon name="report" size={13} /> MONTHLY REPORT
                          </span>
                        </div>
                        <FlowArrow />
                        <div className="aba-flow__delivery">
                          <span className="aba-flow__delivery-node">
                            <AutomationIcon name="whatsapp" size={13} /> WHATSAPP
                          </span>
                          <span className="aba-flow__delivery-node">
                            <AutomationIcon name="email" size={13} /> EMAIL
                          </span>
                        </div>
                      </div>
                    )}
                    {!item.variant && <Flow items={item.flow} />}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Automation Ecosystem ---- */}
      <section className="section aba-ecosystem">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Automation Ecosystem</span>
            <h2 className="section-heading__title">One Connected Automation Ecosystem</h2>
          </div>
          <ScrollReveal>
            <Flow
              direction="horizontal"
              items={[
                { label: 'CUSTOMER', icon: 'customer' },
                { label: 'LEAD', icon: 'lead' },
                { label: 'AI', icon: 'ai' },
                { label: 'AUTOMATION', icon: 'automation' },
                { label: 'DATA', icon: 'database' },
                { label: 'ACTION', icon: 'zap' },
                { label: 'REPORTING', icon: 'report' },
              ]}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ---- Tools We Use ---- */}
      <section className="section aba-tools">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Technology</span>
            <h2 className="section-heading__title">Tools We Use</h2>
          </div>
          <ScrollReveal>
            <p className="aba-tools__paragraph">{TOOLS_PARAGRAPH}</p>
          </ScrollReveal>

          <div className="aba-tools__stages">
            <Flow
              direction="horizontal"
              items={[
                { label: 'TRIGGER', icon: 'zap' },
                { label: 'AUTOMATION ENGINE', icon: 'automation' },
                { label: 'AI / API', icon: 'ai' },
                { label: 'DATA LAYER', icon: 'database' },
                { label: 'ACTION', icon: 'check' },
              ]}
            />
          </div>

          <ScrollReveal>
            <div className="aba-tools__list">
              {TOOLS.map((tool, index) => (
                <span key={tool} className="aba-tools__chip" style={{ animationDelay: `${index * 120}ms` }}>
                  <span className="aba-tools__chip-dot" aria-hidden="true" />
                  {tool}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- Documentation + Handover ---- */}
      <section className="section aba-handover">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Team Control</span>
            <h2 className="section-heading__title">Documentation + Handover</h2>
          </div>
          <ScrollReveal>
            <Flow
              direction="horizontal"
              items={[
                { label: 'AUTOMATION BUILT', icon: 'automation' },
                { label: 'DOCUMENTATION', icon: 'content' },
                { label: 'HANDOVER WALKTHROUGH', icon: 'support' },
                { label: 'TEAM CAN TROUBLESHOOT BASIC ISSUES', icon: 'check' },
              ]}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ---- Malaysia SME Grant Highlight ---- */}
      <section className="section aba-grant">
        <div className="container">
          <ScrollReveal>
            <div className="aba-grant__card glass-card gradient-border">
              <div className="aba-grant__inner">
                <div className="aba-grant__content">
                  <span className="section-heading__eyebrow">Grant Opportunity</span>
                  <h2 className="aba-grant__title">Malaysian SME Grant Highlight</h2>
                  <p className="aba-grant__text">{GRANT_TEXT}</p>
                  <Button
                    href={whatsappHref}
                    variant="primary"
                    size="lg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp Us About Automation
                  </Button>
                </div>
                <div className="aba-grant__visual" aria-hidden="true">
                  <Flow
                    items={[
                      { label: 'MALAYSIAN SME', icon: 'business' },
                      { label: 'DIGITAL TRANSFORMATION', icon: 'transform' },
                      { label: 'AI AUTOMATION', icon: 'ai' },
                      { label: 'GRANT ELIGIBILITY DISCUSSION', icon: 'whatsapp' },
                    ]}
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- AI Automation Workflow ---- */}
      <section className="section aba-workflow">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">How It Works</span>
            <h2 className="section-heading__title">From Trigger to Report</h2>
          </div>
          <ScrollReveal>
            <Flow
              direction="horizontal"
              items={[
                { label: 'TRIGGER', icon: 'zap' },
                { label: 'DATA', icon: 'database' },
                { label: 'AI PROCESSING', icon: 'ai' },
                { label: 'DECISION', icon: 'decision' },
                { label: 'ACTION', icon: 'check' },
                { label: 'NOTIFICATION', icon: 'bell' },
                { label: 'REPORT', icon: 'report' },
              ]}
            />
          </ScrollReveal>

          <div className="aba-workflow__examples">
            {[
              { label: 'New Lead', arrow: 'AI Qualification', target: 'WhatsApp' },
              { label: 'New Appointment', arrow: 'Reminder', target: 'WhatsApp' },
              { label: 'New Data', arrow: 'Processing', target: 'Report' },
            ].map((example) => (
              <ScrollReveal key={example.label} className="aba-workflow__example">
                <span className="aba-workflow__example-node">{example.label}</span>
                <span className="aba-flow__arrow" aria-hidden="true">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
                <span className="aba-workflow__example-node aba-workflow__example-node--ai">
                  <AutomationIcon name="ai" size={14} /> {example.arrow}
                </span>
                <span className="aba-flow__arrow" aria-hidden="true">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
                <span className="aba-workflow__example-node">{example.target}</span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Business Automation Benefit Visual ---- */}
      <section className="section aba-benefit">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Why It Matters</span>
            <h2 className="section-heading__title">Repetitive Tasks → Automation → Team Focus</h2>
          </div>
          <ScrollReveal>
            <div className="aba-benefit__flow">
              <Flow
                items={[
                  { label: 'REPETITIVE TASKS', icon: 'followup' },
                  { label: 'AUTOMATION', icon: 'automation' },
                  { label: 'TEAM FOCUS', icon: 'target' },
                ]}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <FAQSection
        eyebrow="FAQ"
        title="AI Automation, Frequently Asked Questions"
        faqs={FAQS}
      />

      {/* ---- Related Services ---- */}
      <section className="section aba-related">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Explore More</span>
            <h2 className="section-heading__title">Related Services</h2>
          </div>
          <div className="aba-related__links">
            {RELATED_SERVICES.map((item) => (
              <Link key={item.path} to={item.path} className="related-content__link">
                {item.name}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            ))}
            <Link to="/blog/agentic-ai-tools-small-business-marketing/" className="related-content__link">
              Top Agentic AI Tools Compared
            </Link>
            <Link to="/faq/" className="related-content__link">
              FAQ
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ---- AI Business Automation by Location ---- */}
      <section className="section location-discovery">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Locations</span>
              <h2 className="section-heading__title">AI Business Automation by Location</h2>
              <p className="section-heading__subtitle">
                Explore our AI business automation services for specific markets and business environments.
              </p>
            </div>
          </ScrollReveal>
          <div className="location-discovery__grid">
            <ScrollReveal>
              <div className="location-discovery__card glass-card">
                <div className="location-discovery__card-content">
                  <span className="location-discovery__badge">Malaysia</span>
                  <h3 className="location-discovery__title">AI Business Automation Malaysia</h3>
                  <p className="location-discovery__text">
                    Practical AI automation solutions for Malaysian SMEs, including WhatsApp
                    workflows, lead automation, customer service automation, reporting and
                    document processing.
                  </p>
                  <Link
                    to="/services/ai-business-automation/malaysia/"
                    className="location-discovery__link"
                  >
                    Explore Malaysia
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ---- Final CTA ---- */}
      <CTASection
        title={CTA.title}
        primaryLabel={CTA.label}
        primaryHref={whatsappHref}
      />
      <ContactFormSection />
    </div>
  )
}