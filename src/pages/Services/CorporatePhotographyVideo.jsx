import { useEffect, useRef, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import FAQSection from '../../components/sections/FAQSection.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import ContactFormSection from '../../components/sections/ContactFormSection.jsx'
import WhatsAppIcon from '../../components/common/WhatsAppIcon.jsx'
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
import '../../styles/pages/corporate-photography-video.css'
import corporateHeroImg from '../../assets/images/services/09corporate.webp'

/* ============================================================
   CONTENT, Approved Static Savvy Media Corporate Photo & Video
   ============================================================ */

const PAGE_TITLE =
  'Corporate Photography & Video Production in Madurai & Tamil Nadu | Static Savvy Media'

const PAGE_DESCRIPTION =
  'Professional corporate photography and video production in Madurai. Team headshots, office photography, brand videos, and event coverage for Tamil Nadu and Malaysia businesses.'

const HERO_TITLE =
  'Corporate Photography & Video, Visuals That Build Trust Before a Word Is Read'

const HERO_PARAGRAPH =
  'Generic stock photos communicate "we are a generic business." Professional photography of your actual team, your actual workspace, and your actual work communicates authenticity and trust, the two things clients are assessing before they decide to contact you. We produce corporate photography and video in Madurai and across Tamil Nadu.'

const PHOTOGRAPHY_SERVICES = [
  {
    number: '01',
    title: 'Team and founder portraits',
    category: 'Photography',
    visual: 'portrait',
    text: 'Professional headshots and group photography for your About page, LinkedIn profiles, and press materials. Lighting, background, and direction included, no photography experience required from your team.',
    inputs: ['CAMERA', 'LIGHTING', 'BACKGROUND', 'DIRECTION'],
    output: 'PROFESSIONAL PORTRAIT',
  },
  {
    number: '02',
    title: 'Office and workspace photography',
    category: 'Photography',
    visual: 'office',
    text: 'Environmental shots of your office, studio, factory, or workspace, for location pages, Google Business Profile, and social media. Builds NAP and entity consistency signals.',
    flow: [
      { label: 'WORKSPACE', icon: 'workspace' },
      { label: 'PHOTOGRAPHY', icon: 'camera' },
    ],
    outputs: ['LOCATION PAGE', 'GOOGLE BUSINESS PROFILE', 'SOCIAL MEDIA'],
  },
  {
    number: '03',
    title: 'Event photography',
    category: 'Photography',
    visual: 'event',
    text: 'Corporate events, product launches, client visits, and team activities documented professionally for marketing reuse.',
    flow: [
      { label: 'EVENT', icon: 'event' },
      { label: 'DOCUMENTED', icon: 'camera' },
      { label: 'MARKETING REUSE', icon: 'share' },
    ],
  },
  {
    number: '04',
    title: 'Industry-specific shoots',
    category: 'Photography',
    visual: 'industry',
    text: 'Experience photographing manufacturing environments (Thoothukudi port/industrial), retail and hospitality spaces (Madurai), and professional service offices across Tamil Nadu.',
    environments: [
      { label: 'MANUFACTURING', sub: 'THOOTHUKUDI PORT / INDUSTRIAL' },
      { label: 'RETAIL & HOSPITALITY', sub: 'MADURAI' },
      { label: 'PROFESSIONAL SERVICES', sub: 'TAMIL NADU' },
    ],
  },
]

const VIDEO_SERVICES = [
  {
    number: '01',
    title: 'Brand films',
    category: 'Video',
    visual: 'brandfilm',
    text: '60–120 second brand overview videos for website hero sections, YouTube, and social media. Scripted, directed, filmed, and edited.',
    badge: '60–120 SEC',
    flow: [
      { label: 'SCRIPT', icon: 'script' },
      { label: 'DIRECT', icon: 'direct' },
      { label: 'FILM', icon: 'camera' },
      { label: 'EDIT', icon: 'edit' },
      { label: 'BRAND FILM', icon: 'film' },
    ],
  },
  {
    number: '02',
    title: 'Service explainer videos',
    category: 'Video',
    visual: 'explainer',
    text: 'Clear, professional explanations of complex or technical services, particularly effective for B2B and professional service firms.',
    flow: [
      { label: 'COMPLEX SERVICE', icon: 'complex' },
      { label: 'EXPLANATION', icon: 'explain' },
      { label: 'CLEAR MESSAGE', icon: 'message' },
    ],
  },
  {
    number: '03',
    title: 'Testimonial videos',
    category: 'Video',
    visual: 'testimonial',
    text: 'Genuine client testimonials filmed professionally, significantly more effective than text testimonials for conversion on service and pricing pages.',
    flow: [
      { label: 'CLIENT', icon: 'customer' },
      { label: 'ON-CAMERA TESTIMONIAL', icon: 'camera' },
      { label: 'PROFESSIONAL EDIT', icon: 'edit' },
      { label: 'WEBSITE / PRICING PAGE', icon: 'page' },
    ],
  },
  {
    number: '04',
    title: 'Social media reels',
    category: 'Video',
    visual: 'reel',
    text: "Vertical format video content for Instagram Reels, YouTube Shorts, and LinkedIn, scripted, filmed, and edited for each platform's format requirements.",
    badge: '9:16',
    platforms: ['Instagram Reels', 'YouTube Shorts', 'LinkedIn'],
  },
]

const VIDEO_WORKFLOW = [
  { label: 'IDEA', icon: 'idea' },
  { label: 'SCRIPT', icon: 'script' },
  { label: 'DIRECTION', icon: 'direct' },
  { label: 'FILMING', icon: 'camera' },
  { label: 'EDITING', icon: 'edit' },
  { label: 'SUBTITLES', icon: 'subtitles' },
  { label: 'PLATFORM EXPORT', icon: 'export' },
]

const FAQS = [
  {
    question: 'Do you come to our location or do we need a studio?',
    answer:
      'Both. We have a studio setup in Madurai for portraits and product work. For environmental and office photography we travel to your location across Tamil Nadu. Travel charges apply for shoots outside Madurai city, contact us on WhatsApp for a specific quote.',
  },
  {
    question: 'In what formats are final files delivered?',
    answer:
      'Photography is delivered in high-resolution JPG (for print) and web-optimised WebP/JPG (for digital use). Videos are delivered in MP4 (H.264) at 1080p minimum, with platform-specific exports (16:9 for YouTube/website, 9:16 for Instagram Reels) as part of the package.',
  },
  {
    question: 'Can you photograph outside Madurai in Tamil Nadu?',
    answer:
      'Yes. We regularly work in Thoothukudi, Tirunelveli, Coimbatore, and Chennai. For multi-city shoots we combine travel days efficiently. Contact us on WhatsApp with your location and we will provide a specific quote.',
  },
]

const RELATED_SERVICES = [
  { name: 'Website Design & Development', path: '/services/website-design-development/' },
  { name: 'Social Media Marketing', path: '/services/social-media-marketing/' },
  { name: 'AI Video Creation', path: '/services/ai-video-creation/' },
  { name: 'Product Photography & Creative Design', path: '/services/product-photography-creative-design/' },
  { name: 'Google Ads', path: '/services/google-ads/' },
]

const PRICING_REFERENCE = [
  { name: 'Product Photography, Half Day', amount: '₹12,000 / MYR 650' },
  { name: 'Corporate Photography, Full Day', amount: '₹20,000 / MYR 1,100' },
  { name: 'Brand Video, 60–90 sec', amount: '₹35,000–55,000 / MYR 1,900–3,000' },
]

const CTA = {
  title: 'Show clients who you really are, with photography that builds trust.',
  label: (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', verticalAlign: 'middle' }}>
      <WhatsAppIcon size={22} />
      <span>WhatsApp: +91 99440 40345</span>
    </span>
  ),
}

/* ============================================================
   ICONS, inline SVG set (stroke style, matches codebase)
   ============================================================ */

const ICONS = {
  camera: (
    <>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </>
  ),
  workspace: (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </>
  ),
  event: (
    <>
      <path d="M8 3v3M16 3v3M3 9h18" />
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M12 12l3 2-3 2" />
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
  script: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 13h6M9 17h4" />
    </>
  ),
  direct: (
    <>
      <path d="M3 11h18M12 5l7 6-7 6" />
    </>
  ),
  edit: (
    <>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z" />
    </>
  ),
  film: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="2" />
      <path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 12h5M17 17h5" />
    </>
  ),
  complex: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" />
    </>
  ),
  explain: (
    <>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 9h8M8 13h5" />
    </>
  ),
  message: (
    <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 1 1 16.1-3.8z" />
  ),
  customer: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
    </>
  ),
  page: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 13h6M9 17h6" />
    </>
  ),
  idea: (
    <>
      <path d="M9 18h6M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.4 1 2.3h6c0-.9.4-1.8 1-2.3A7 7 0 0 0 12 2z" />
    </>
  ),
  subtitles: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 15h10M7 11h6" />
    </>
  ),
  export: (
    <>
      <path d="M12 3v12" />
      <path d="M8 7l4-4 4 4" />
      <path d="M4 13v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
    </>
  ),
  check: <path d="M20 6L9 17l-5-5" />,
  focus: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 1v3M12 20v3M1 12h3M20 12h3" />
    </>
  ),
  play: <polygon points="6 3 20 12 6 21 6 3" />,
  map: (
    <>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
}

function Icon({ name, size = 20 }) {
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
    <span className={cx('cpv-node', tone && `cpv-node--${tone}`)}>
      {icon && (
        <span className="cpv-node__icon" aria-hidden="true">
          <Icon name={icon} size={15} />
        </span>
      )}
      <span className="cpv-node__label">{label}</span>
    </span>
  )
}

function Arrow() {
  return (
    <span className="cpv-arrow" aria-hidden="true">
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

function Flow({ items = [], className = '', horizontal = false }) {
  return (
    <div className={cx('cpv-flow', horizontal && 'cpv-flow--horizontal', className)}>
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
   MEDIA FRAMES, abstract cinematic placeholders
   (No real photography assets exist; no stock images are used.)
   ============================================================ */

function MediaFrame({ variant }) {
  return (
    <div className={cx('cpv-media', `cpv-media--${variant}`)} aria-hidden="true">
      <span className="cpv-media__corner cpv-media__corner--tl" />
      <span className="cpv-media__corner cpv-media__corner--tr" />
      <span className="cpv-media__corner cpv-media__corner--bl" />
      <span className="cpv-media__corner cpv-media__corner--br" />

      {(variant === 'portrait' || variant === 'testimonial') && (
        <>
          <span className="cpv-media__silhouette">
            <span className="cpv-media__silhouette-head" />
            <span className="cpv-media__silhouette-body" />
          </span>
          <span className="cpv-media__light cpv-media__light--key" />
          <span className="cpv-media__light cpv-media__light--rim" />
        </>
      )}

      {variant === 'office' && (
        <>
          <span className="cpv-media__window" />
          <span className="cpv-media__desk" />
        </>
      )}

      {variant === 'event' && (
        <>
          <span className="cpv-media__stage" />
          <span className="cpv-media__crowd">
            <i /><i /><i /><i /><i /><i /><i /><i />
          </span>
        </>
      )}

      {variant === 'industry' && (
        <>
          <span className="cpv-media__beam cpv-media__beam--1" />
          <span className="cpv-media__beam cpv-media__beam--2" />
          <span className="cpv-media__gear" />
        </>
      )}

      {variant === 'brandfilm' && (
        <>
          <span className="cpv-media__landscape" />
          <span className="cpv-media__play" />
        </>
      )}

      {variant === 'explainer' && (
        <>
          <span className="cpv-media__screen">
            <span className="cpv-media__screen-line" />
            <span className="cpv-media__screen-line" />
            <span className="cpv-media__screen-line" />
          </span>
          <span className="cpv-media__speaker" />
        </>
      )}

      {variant === 'reel' && (
        <>
          <span className="cpv-media__portrait-silhouette" />
          <span className="cpv-media__reel-handle" />
        </>
      )}

      <span className="cpv-media__rec">REC</span>
      <span className="cpv-media__focus cpv-media__focus--tl" />
      <span className="cpv-media__focus cpv-media__focus--br" />
    </div>
  )
}

/* ============================================================
   COMPONENT
   ============================================================ */

export default function CorporatePhotographyVideo() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/services/corporate-photography-video/`,
      ogType: 'website',
    })

    const faqEntities = FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    }))

    const photoService = serviceSchema({
      serviceType: 'Corporate Photography & Video',
      name: 'Corporate Photography & Video, Static Savvy Media',
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/services/corporate-photography-video/`,
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
        { name: 'Corporate Photography & Video', item: `${SITE_URL}/services/corporate-photography-video/` },
      ],
    })

    // VideoObject schema is intentionally NOT generated here: the page embeds
    // no real video asset, so any VideoObject data (URL, thumbnail, duration,
    // upload date) would be fabricated.

    const scripts = [
      photoService,
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
    <div className="service-template cpv-page">
      {/* ---- Breadcrumbs ---- */}
      <Breadcrumbs />

      {/* ---- Hero ---- */}
      <HeroSection
        layout="two-column"
        eyebrow="Service"
        title={HERO_TITLE}
        subtitle={HERO_PARAGRAPH}
        className="cpv-hero"
        actions={
          <>
            <Button
              href={whatsappHref}
              variant="primary"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Photography Session
            </Button>
          </>
        }
      >
        <div className="hero__visual-side">
          <img src={corporateHeroImg} width={1536} height={1024} fetchPriority="high" alt="Corporate Photography & Video" className="hero__image" />
        </div>
      </HeroSection>

      {/* ---- Authenticity / Trust ---- */}
      <section className="section cpv-authenticity">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">The Difference</span>
            <h2 className="section-heading__title">Real Team. Real Workspace. Real Work.</h2>
          </div>
          <ScrollReveal>
            <div className="cpv-authenticity__panel glass-card gradient-border">
              <div className="cpv-authenticity__reals">
                <span className="cpv-authenticity__real">
                  <span className="cpv-authenticity__real-icon">
                    <Icon name="customer" size={20} />
                  </span>
                  REAL TEAM
                </span>
                <span className="cpv-authenticity__real">
                  <span className="cpv-authenticity__real-icon">
                    <Icon name="workspace" size={20} />
                  </span>
                  REAL WORKSPACE
                </span>
                <span className="cpv-authenticity__real">
                  <span className="cpv-authenticity__real-icon">
                    <Icon name="camera" size={20} />
                  </span>
                  REAL WORK
                </span>
              </div>
              <span className="cpv-arrow" aria-hidden="true">
                <svg
                  width="16"
                  height="16"
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
              <span className="cpv-authenticity__outcome cpv-authenticity__outcome--auth">
                AUTHENTICITY
              </span>
              <span className="cpv-arrow" aria-hidden="true">
                <svg
                  width="16"
                  height="16"
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
              <span className="cpv-authenticity__outcome cpv-authenticity__outcome--trust">
                TRUST
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- Photography Services ---- */}
      <section className="section cpv-services">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Still</span>
            <h2 className="section-heading__title">Photography Services</h2>
          </div>
          <div className="cpv-services__grid">
            {PHOTOGRAPHY_SERVICES.map((item, index) => (
              <ScrollReveal key={item.number} delay={index * 80}>
                <article className="cpv-service-card glass-card">
                  <MediaFrame variant={item.visual} />
                  <div className="cpv-service-card__body">
                    <div className="cpv-service-card__top">
                      <span className="chip cpv-service-card__category">{item.category}</span>
                      <span className="cpv-service-card__number" aria-hidden="true">
                        {item.number}
                      </span>
                    </div>
                    <h3 className="cpv-service-card__title">{item.title}</h3>
                    <p className="cpv-service-card__text">{item.text}</p>
                    <div className="cpv-service-card__flow">
                      {item.inputs && (
                        <div className="cpv-flow cpv-flow--inputs">
                          <div className="cpv-flow__inputs">
                            {item.inputs.map((label) => (
                              <span key={label} className="cpv-flow__input">
                                <Icon name="camera" size={12} /> {label}
                              </span>
                            ))}
                          </div>
                          <Arrow />
                          <Node label={item.output} icon="focus" tone="hot" />
                        </div>
                      )}
                      {item.outputs && (
                        <div className="cpv-flow">
                          {item.flow.map((node, i) => (
                            <Fragment key={i}>
                              {i > 0 && <Arrow />}
                              <Node {...node} />
                            </Fragment>
                          ))}
                          <Arrow />
                          <div className="cpv-flow__outputs">
                            {item.outputs.map((label) => (
                              <span key={label} className="cpv-flow__output">
                                <Icon name="check" size={12} /> {label}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {item.environments && (
                        <div className="cpv-flow">
                          {item.environments.map((env, i) => (
                            <Fragment key={i}>
                              {i > 0 && <Arrow />}
                              <span className="cpv-flow__env">
                                <span className="cpv-flow__env-label">{env.label}</span>
                                <span className="cpv-flow__env-sub">{env.sub}</span>
                              </span>
                            </Fragment>
                          ))}
                        </div>
                      )}
                      {item.flow && !item.inputs && !item.outputs && !item.environments && (
                        <Flow items={item.flow} />
                      )}
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Photography Gallery ---- */}
      <section className="section cpv-gallery">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Portfolio Direction</span>
            <h2 className="section-heading__title">Photography Gallery</h2>
          </div>
          <div className="cpv-gallery__grid">
            {[
              { key: 'team', label: 'TEAM', caption: 'Corporate portraits' },
              { key: 'office', label: 'OFFICE', caption: 'Workspace & environment' },
              { key: 'event', label: 'EVENT', caption: 'Events & launches' },
              { key: 'industry', label: 'INDUSTRY', caption: 'Industrial & services' },
            ].map((item, index) => (
              <ScrollReveal key={item.key} delay={index * 80} className="cpv-gallery__cell">
                <figure className="cpv-gallery-card">
                  <MediaFrame variant={item.key} />
                  <figcaption className="cpv-gallery-card__caption">
                    <span className="cpv-gallery-card__label">{item.label}</span>
                    <span className="cpv-gallery-card__text">{item.caption}</span>
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Video Production Services ---- */}
      <section className="section cpv-video">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Motion</span>
            <h2 className="section-heading__title">Video Production Services</h2>
          </div>
          <div className="cpv-services__grid">
            {VIDEO_SERVICES.map((item, index) => (
              <ScrollReveal key={item.number} delay={index * 80}>
                <article className="cpv-service-card glass-card">
                  <MediaFrame variant={item.visual} />
                  <div className="cpv-service-card__body">
                    <div className="cpv-service-card__top">
                      <span className="chip cpv-service-card__category cpv-service-card__category--video">
                        {item.category}
                      </span>
                      <span className="cpv-service-card__number" aria-hidden="true">
                        {item.number}
                      </span>
                    </div>
                    <h3 className="cpv-service-card__title">{item.title}</h3>
                    <p className="cpv-service-card__text">{item.text}</p>
                    <div className="cpv-service-card__flow">
                      {item.badge && (
                        <span className="cpv-flow__badge">{item.badge}</span>
                      )}
                      {item.flow && <Flow items={item.flow} />}
                      {item.platforms && (
                        <div className="cpv-flow__outputs">
                          {item.platforms.map((label) => (
                            <span key={label} className="cpv-flow__output">
                              <Icon name="check" size={12} /> {label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Video Production Workflow ---- */}
      <section className="section cpv-workflow">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Production Pipeline</span>
            <h2 className="section-heading__title">From Idea to Platform Export</h2>
          </div>
          <ScrollReveal>
            <Flow items={VIDEO_WORKFLOW} horizontal />
          </ScrollReveal>
        </div>
      </section>

      {/* ---- Photography + Video Comparison ---- */}
      <section className="section cpv-compare">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Two Crafts</span>
            <h2 className="section-heading__title">Photography + Video</h2>
          </div>
          <div className="cpv-compare__grid">
            <ScrollReveal className="cpv-compare__panel">
              <div className="cpv-compare__panel-inner glass-card">
                <span className="cpv-compare__panel-tag">Still</span>
                <h3 className="cpv-compare__panel-title">Photography</h3>
                <ul className="cpv-compare__list">
                  <li>Team portraits</li>
                  <li>Workspace</li>
                  <li>Events</li>
                  <li>Industry shoots</li>
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal className="cpv-compare__vs">
              <span aria-hidden="true">VS</span>
            </ScrollReveal>
            <ScrollReveal className="cpv-compare__panel">
              <div className="cpv-compare__panel-inner glass-card">
                <span className="cpv-compare__panel-tag cpv-compare__panel-tag--video">Motion</span>
                <h3 className="cpv-compare__panel-title">Video</h3>
                <ul className="cpv-compare__list">
                  <li>Brand films</li>
                  <li>Explainers</li>
                  <li>Testimonials</li>
                  <li>Social reels</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ---- Location Coverage ---- */}
      <section className="section cpv-locations">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Coverage</span>
            <h2 className="section-heading__title">Where We Shoot</h2>
          </div>
          <div className="cpv-locations__grid">
            <ScrollReveal className="cpv-locations__cell">
              <div className="cpv-location-card glass-card">
                <span
                  className="cpv-location-card__icon"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    boxShadow: '0 0 15px rgba(34, 197, 94, 0.35)',
                    width: '52px',
                    height: '52px',
                    color: '#fff',
                    marginBottom: '1rem',
                  }}
                >
                  <Icon name="map" size={22} />
                </span>
                <h3 className="cpv-location-card__title">Madurai</h3>
                <p className="cpv-location-card__text">Studio setup for portraits and product work.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal className="cpv-locations__cell" delay={100}>
              <div className="cpv-location-card glass-card">
                <span
                  className="cpv-location-card__icon"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    boxShadow: '0 0 15px rgba(34, 197, 94, 0.35)',
                    width: '52px',
                    height: '52px',
                    color: '#fff',
                    marginBottom: '1rem',
                  }}
                >
                  <Icon name="map" size={22} />
                </span>
                <h3 className="cpv-location-card__title">Tamil Nadu</h3>
                <p className="cpv-location-card__text">On-location shoots across the state.</p>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal>
            <div className="cpv-locations__note">
              <span className="cpv-locations__note-label">Regularly working in</span>
              <div className="cpv-locations__chips">
                {['Thoothukudi', 'Tirunelveli', 'Coimbatore', 'Chennai'].map((city) => (
                  <span key={city} className="cpv-locations__chip">
                    <Icon name="map" size={12} /> {city}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <FAQSection
        eyebrow="FAQ"
        title="Photography & Video, FAQs"
        faqs={FAQS}
      />

      {/* ---- Related Services ---- */}
      <section className="section cpv-related">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Explore More</span>
            <h2 className="section-heading__title">Related Services</h2>
          </div>
          <div className="cpv-related__links">
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