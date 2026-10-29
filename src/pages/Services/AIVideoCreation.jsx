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
import '../../styles/pages/ai-video-creation.css'
import aiVideoHeroImg from '../../assets/images/services/08AIVideo.webp'

/* ============================================================
   CONTENT, Approved Static Savvy Media AI Video Creation
   Source of truth: SSM-Full-Content.html (#ai-video)
   ============================================================ */

const PAGE_TITLE =
  'AI Video Creation, Professional Marketing Videos at Fraction of Traditional Cost | Static Savvy Media'

const PAGE_DESCRIPTION =
  'AI-generated marketing videos for Tamil Nadu and Malaysia businesses. Product demos, explainers, social media reels, and ad creative, produced fast at 30–60% of traditional production cost.'

const HERO_TITLE =
  'AI Video Creation, Marketing-Grade Videos Without the Production Cost'

const HERO_PARAGRAPH =
  'Video is the most consumed content format in 2026, on every platform, in every market. AI video creation removes most of the traditional constraints, delivering professional marketing video content at 30–60% of traditional production cost and in a fraction of the time.'

const WHAT_CREATE = [
  {
    number: '01',
    title: 'Product showcase videos',
    icon: 'box',
    text: 'AI-generated product demos and lifestyle videos for e-commerce, using your product images as the base. Effective for textile, retail, and consumer product businesses.',
    flow: [
      { label: 'PRODUCT IMAGES', icon: 'box' },
      { label: 'AI GENERATION', icon: 'sparkles' },
      { label: 'PRODUCT VIDEO', icon: 'play' },
    ],
  },
  {
    number: '02',
    title: 'Explainer videos',
    icon: 'presentation',
    text: 'Script-to-video explainers for complex services, AI avatar presenters, voiceover, and motion graphics combined. Ideal for B2B service businesses and professional practices.',
    flow: [
      { label: 'COMPLEX SERVICE', icon: 'presentation' },
      { label: 'SCRIPT TO VIDEO', icon: 'script' },
      { label: 'EXPLAINER VIDEO', icon: 'play' },
    ],
  },
  {
    number: '03',
    title: 'Social media content at scale',
    icon: 'reel',
    text: 'Multiple variations of short-form video content (15–60 seconds) for Instagram Reels, YouTube Shorts, and LinkedIn, tested in parallel.',
    flow: [
      { label: '1 TOPIC', icon: 'idea' },
      { label: 'MULTIPLE VARIATIONS', icon: 'share' },
      { label: '15–60 SEC REELS', icon: 'reel' },
    ],
  },
  {
    number: '04',
    title: 'Multilingual video',
    icon: 'globe',
    text: 'AI-generated voiceover in Tamil, English, and Bahasa Malaysia, without the cost and scheduling complexity of recording multiple human voiceover artists.',
    flow: [
      { label: '1 SCRIPT', icon: 'script' },
      { label: 'AI VOICEOVER', icon: 'languages' },
      { label: 'TAMIL · ENGLISH · BAHASA MALAYSIA', icon: 'globe' },
    ],
  },
  {
    number: '05',
    title: 'Ad creative',
    icon: 'megaphone',
    text: 'Video ads for Meta and YouTube campaigns, designed for specific audience segments and A/B tested for conversion performance.',
    flow: [
      { label: 'AUDIENCE SEGMENTS', icon: 'target' },
      { label: 'AI AD CREATIVE', icon: 'sparkles' },
      { label: 'META / YOUTUBE ADS', icon: 'monitor' },
    ],
  },
]

const COMPARISON = [
  {
    factor: 'Turnaround',
    traditional: '2–6 weeks per video',
    ai: '3–7 business days per video',
  },
  {
    factor: 'Cost per video',
    traditional: 'Crew, studio, talent and editing days',
    ai: 'Typically 30–60% of traditional cost, quoted per project',
  },
  {
    factor: 'Language versions',
    traditional: 'Separate recording sessions',
    ai: 'AI voiceover in multiple languages',
  },
  {
    factor: 'Volume',
    traditional: '1–2 videos/month',
    ai: '4–8 videos/month at comparable budget',
  },
]

const FAQS = [
  {
    question: 'Will AI video look cheap or artificial?',
    answer:
      'The quality gap between AI video and traditional production has closed dramatically in 2025–2026. With the right tools, scripts, and post-production work, AI video is indistinguishable from traditional production for most social media and digital ad contexts. We show you examples before starting, you decide if the quality meets your standard.',
  },
  {
    question: 'Can AI video be produced in Tamil?',
    answer:
      'Yes. We produce AI voiceover in Tamil, English, and Bahasa Malaysia. Tamil AI voiceover quality has improved significantly in 2025–2026, we use the best available models and review for natural pronunciation before delivery.',
  },
  {
    question: 'What do you need from me to get started?',
    answer:
      'For most AI video projects: the key message or goal of the video, your target audience, brand guidelines (logo, colours, fonts), and any product images or footage to incorporate. We handle scripting, production, and editing, your involvement is primarily in approval, not production.',
  },
]

const RELATED_SERVICES = [
  { name: 'AI Business Automation', path: '/services/ai-business-automation/' },
  { name: 'Social Media Marketing', path: '/services/social-media-marketing/' },
  { name: 'Google Ads', path: '/services/google-ads/' },
  { name: 'Corporate Photography & Video', path: '/services/corporate-photography-video/' },
  { name: 'Website Design & Development', path: '/services/website-design-development/' },
]

const CTA = {
  title:
    'Get professional video content, faster and at lower cost than you thought possible.',
  label: '💬 WhatsApp for AI Video Enquiry',
}

/* ============================================================
   ICONS, inline SVG set (stroke style, matches codebase)
   ============================================================ */

const ICONS = {
  box: (
    <>
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="M3.3 7l8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3l1.9 5.8L19.7 10l-5.8 1.9L12 17.7l-1.9-5.8L4.3 10l5.8-1.9z" />
      <path d="M19 15l.7 2.1L21.8 18l-2.1.7L19 20.8l-.7-2.1L16.2 18l2.1-.9z" />
    </>
  ),
  play: <polygon points="6 3 20 12 6 21 6 3" />,
  presentation: (
    <>
      <path d="M2 3h20" />
      <path d="M4 3v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3" />
      <path d="M12 15v6" />
      <path d="M8 21h8" />
    </>
  ),
  script: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 13h6M9 17h4" />
    </>
  ),
  idea: (
    <>
      <path d="M9 18h6M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.4 1 2.3h6c0-.9.4-1.8 1-2.3A7 7 0 0 0 12 2z" />
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
  reel: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 5v14M17 5v14M3 9h4M3 15h4M17 9h4M17 15h4" />
      <path d="M11 10l4 2.5-4 2.5z" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
  languages: (
    <>
      <path d="M5 8l6 6" />
      <path d="M4 14l6-6 2-3" />
      <path d="M2 5h12" />
      <path d="M7 2h1" />
      <path d="M22 14l-5 8" />
      <path d="M20 16l-3 1.5" />
      <path d="M15 21h7" />
    </>
  ),
  megaphone: (
    <>
      <path d="M3 11l18-5v12L3 13v-2z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  monitor: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  camera: (
    <>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </>
  ),
  zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
}

function AIVIcon({ name, size = 20 }) {
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

function Node({ label, icon, tone = '' }) {
  return (
    <span className={cx('aiv-node', tone && `aiv-node--${tone}`)}>
      {icon && (
        <span className="aiv-node__icon" aria-hidden="true">
          <AIVIcon name={icon} size={14} />
        </span>
      )}
      <span className="aiv-node__label">{label}</span>
    </span>
  )
}

function Arrow() {
  return (
    <span className="aiv-arrow" aria-hidden="true">
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
    <div className={cx('aiv-flow', `aiv-flow--${direction}`, className)}>
      {items.map((item, index) => (
        <Fragment key={index}>
          {index > 0 && <Arrow />}
          <Node {...item} />
        </Fragment>
      ))}
    </div>
  )
}

/* ============================================================
   COMPONENT
   ============================================================ */

export default function AIVideoCreation() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/services/ai-video-creation/`,
      ogType: 'website',
    })

    const faqEntities = FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    }))

    const videoService = serviceSchema({
      serviceType: 'AI Video Creation',
      name: 'AI Video Creation, Static Savvy Media',
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/services/ai-video-creation/`,
      provider: {
        '@type': 'Organization',
        name: 'Static Savvy Media',
        url: SITE_URL,
      },
      areaServed: [
        { '@type': 'City', name: 'Madurai' },
        { '@type': 'Country', name: 'India' },
        { '@type': 'Country', name: 'Malaysia' },
      ],
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Services', item: `${SITE_URL}/services/` },
        { name: 'AI Video Creation', item: `${SITE_URL}/services/ai-video-creation/` },
      ],
    })

    const scripts = [
      videoService,
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
    <div className="service-template aiv-page">
      <style>{`
        .aiv-page .aiv-create__grid > *:nth-child(1) .aiv-create-card__icon {
          background: linear-gradient(135deg, #ef4444, #dc2626) !important;
          box-shadow: 0 0 18px rgba(239, 68, 68, 0.45) !important;
        }
        .aiv-page .aiv-create__grid > *:nth-child(2) .aiv-create-card__icon {
          background: linear-gradient(135deg, #a855f7, #7c3aed) !important;
          box-shadow: 0 0 18px rgba(168, 85, 247, 0.45) !important;
        }
        .aiv-page .aiv-create__grid > *:nth-child(3) .aiv-create-card__icon {
          background: linear-gradient(135deg, #ec4899, #db2777) !important;
          box-shadow: 0 0 18px rgba(236, 72, 153, 0.45) !important;
        }
        .aiv-page .aiv-create__grid > *:nth-child(4) .aiv-create-card__icon {
          background: linear-gradient(135deg, #06b6d4, #0891b2) !important;
          box-shadow: 0 0 18px rgba(6, 182, 212, 0.45) !important;
        }
        .aiv-page .aiv-create__grid > *:nth-child(5) .aiv-create-card__icon {
          background: linear-gradient(135deg, #f97316, #ea580c) !important;
          box-shadow: 0 0 18px rgba(249, 115, 22, 0.45) !important;
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
              WhatsApp for AI Video Enquiry
            </Button>
          </>
        }
      >
        <div className="hero__visual-side">
          <img src={aiVideoHeroImg} width={1536} height={1024} fetchPriority="high" alt="AI Video Creation" className="hero__image" />
        </div>
      </HeroSection>

      {/* ---- What We Create ---- */}
      <section className="section aiv-create">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Our Work</span>
            <h2 className="section-heading__title">What We Create</h2>
          </div>
          <div className="aiv-create__grid">
            {WHAT_CREATE.map((item, index) => (
              <ScrollReveal key={item.number} delay={index * 80}>
                <article className="aiv-create-card glass-card">
                  <div className="aiv-create-card__top">
                    <span
                      className="aiv-create-card__icon"
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
                      <AIVIcon name={item.icon} size={22} />
                    </span>
                    <span className="aiv-create-card__number" aria-hidden="true">
                      {item.number}
                    </span>
                  </div>
                  <h3 className="aiv-create-card__title">{item.title}</h3>
                  <p className="aiv-create-card__text">{item.text}</p>
                  <div className="aiv-create-card__flow">
                    <Flow items={item.flow} />
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Traditional Video vs AI Video ---- */}
      <section className="section aiv-compare">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">The Comparison</span>
            <h2 className="section-heading__title">Traditional Video vs AI Video</h2>
          </div>

          <ScrollReveal>
            <div className="aiv-compare__table">
              <div className="aiv-compare__head" aria-hidden="true">
                <span className="aiv-compare__factor">Factor</span>
                <span className="aiv-compare__cell aiv-compare__cell--trad">
                  <span className="aiv-compare__cell-value">
                    <AIVIcon name="camera" size={16} /> Traditional Video
                  </span>
                </span>
                <span className="aiv-compare__cell aiv-compare__cell--ai">
                  <span className="aiv-compare__cell-value">
                    <AIVIcon name="sparkles" size={16} /> AI Video
                  </span>
                </span>
              </div>

              {COMPARISON.map((row) => (
                <div className="aiv-compare__row" key={row.factor}>
                  <span className="aiv-compare__factor">{row.factor}</span>
                  <span className="aiv-compare__cell aiv-compare__cell--trad">
                    <span className="aiv-compare__cell-label">Traditional Video</span>
                    <span className="aiv-compare__cell-value">{row.traditional}</span>
                  </span>
                  <span className="aiv-compare__cell aiv-compare__cell--ai">
                    <span className="aiv-compare__cell-label">AI Video</span>
                    <span className="aiv-compare__cell-value">{row.ai}</span>
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <FAQSection
        eyebrow="FAQ"
        title="AI Video, FAQs"
        faqs={FAQS}
      />

      {/* ---- Related Services ---- */}
      <section className="section aiv-related">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Explore More</span>
            <h2 className="section-heading__title">Related Services</h2>
          </div>
          <div className="aiv-related__links">
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