import { useEffect, useRef, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
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
  SITE_NAME,
} from '../../utils/constants.js'
import '../../styles/templates/service-template.css'
import '../../styles/pages/education-training.css'
import educationHeroImg from '../../assets/images/Industries/03education.webp'

/* ============================================================
   CONTENT, Approved Static Savvy Media Education & Training
   Source of truth: SSM-Full-Content.html (#education)
   ============================================================ */

const PAGE_TITLE =
  'Digital Marketing for Schools, Colleges & Training Institutes | Static Savvy Media'

const PAGE_DESCRIPTION =
  'Admissions-focused digital marketing for educational institutions in Tamil Nadu and Malaysia. SEO, Google Ads, social media, and AI search visibility.'

const HERO_TITLE =
  'Digital Marketing for Education, Fill Your Seats, Build Your Reputation'

const HERO_PARAGRAPH =
  'The parent or student researching an educational institution today goes through a digital journey before making contact: Google searches, visiting websites, reading reviews, checking social media. The institution that controls this digital journey effectively wins the admission enquiry before a single brochure is handed out.'

const JOURNEY = [
  { label: 'Search', sub: 'Google & AI search', icon: 'search' },
  { label: 'Website', sub: 'Courses, programmes, credibility', icon: 'monitor' },
  { label: 'Reviews', sub: 'Social proof & reputation', icon: 'star' },
  { label: 'Social Media', sub: 'Campus life & community', icon: 'share' },
  { label: 'Enquiry', sub: 'WhatsApp, form or call', icon: 'message' },
  { label: 'Admission', sub: 'Enrolment', icon: 'cap' },
]

const SERVICES = [
  {
    title: 'SEO',
    icon: 'search',
    path: '/services/seo/',
    text: 'Local and regional keyword targeting specific to your industry category and buyer search patterns in Tamil Nadu and Malaysia.',
  },
  {
    title: 'GEO & AEO',
    icon: 'sparkles',
    path: '/services/geo-aeo-ai-search/',
    text: 'AI search visibility for the industry-specific queries your clients are asking ChatGPT, Perplexity, and Google AI Overviews.',
  },
  {
    title: 'Local SEO',
    icon: 'mappin',
    path: '/services/local-seo/',
    text: 'Google Maps and GBP optimization, particularly important for businesses where clients search for a provider near their location.',
  },
  {
    title: 'Google Ads',
    icon: 'megaphone',
    path: '/services/google-ads/',
    text: 'Paid search campaigns targeting high-intent buyers in your category, structured for WhatsApp enquiry conversion.',
  },
  {
    title: 'Social Media',
    icon: 'share',
    path: '/services/social-media-marketing/',
    text: "Platform-specific content and advertising for your industry's audience demographics.",
  },
  {
    title: 'Website Development',
    icon: 'code',
    path: '/services/website-design-development/',
    text: 'SEO-ready sites with industry-appropriate content architecture and WhatsApp-first conversion design.',
  },
]

const FUNNEL = [
  { label: 'DISCOVER', sub: 'Google / AI Search', icon: 'compass' },
  { label: 'RESEARCH', sub: 'Website / Courses / Programs', icon: 'book' },
  { label: 'TRUST', sub: 'Reviews / Social Proof / Content', icon: 'shield' },
  { label: 'ENQUIRE', sub: 'WhatsApp / Form / Call', icon: 'message' },
  { label: 'ADMISSION', sub: 'Student Enrollment', icon: 'cap' },
]

const SEARCH_CHANNELS = [
  'Google Search',
  'Google Maps',
  'Google AI Overviews',
  'ChatGPT',
  'Perplexity',
  'Social Media',
  'Voice Search',
]

const AUDIENCES = [
  { label: 'Schools', icon: 'cap' },
  { label: 'Colleges', icon: 'building' },
  { label: 'Universities', icon: 'book' },
  { label: 'Coaching Centres', icon: 'users' },
  { label: 'Training Institutes', icon: 'book' },
  { label: 'Skill Development Centres', icon: 'zap' },
  { label: 'IELTS / Language Training', icon: 'globe' },
  { label: 'Professional Training Institutes', icon: 'briefcase' },
  { label: 'Online Education Businesses', icon: 'monitor' },
]

const FAQS = [
  {
    question: 'What keywords should an educational institution in Madurai focus on?',
    answer:
      "The highest-value categories are: course-specific queries ('BCA colleges in Madurai', 'IELTS coaching Madurai'), admission-intent queries ('engineering college admission Tamil Nadu 2026'), and institution-type queries ('top arts and science colleges near Madurai'). We build a full keyword map for your institution based on your specific programmes and target student profile.",
  },
  {
    question: 'How do Facebook and Instagram work for student recruitment?',
    answer:
      'Facebook is highly effective for reaching parents, primary decision-influencers for most Tamil Nadu admissions. Instagram reaches students directly, particularly for programmes attracting 17–22 year olds. We run separate creative and messaging strategies for each audience on each platform, with WhatsApp as the conversion channel for both.',
  },
  {
    question: 'How quickly can I expect admissions enquiries from digital marketing?',
    answer:
      'Google Ads for admissions-intent keywords can generate enquiries within days of going live. SEO and social media take 2–4 months to build meaningful organic reach. For admission seasons, we recommend starting Google Ads 3–4 months before the primary application window.',
  },
]

const CTA = {
  title:
    "Let's grow your Education & Training business with digital marketing that understands your sector.",
  label: '💬 WhatsApp for a Free Consultation',
}

/* ============================================================
   ICONS, inline SVG set (stroke style, matches codebase)
   ============================================================ */

const ICONS = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3l1.9 5.8L19.7 10l-5.8 1.9L12 17.7l-1.9-5.8L4.3 10l5.8-1.9z" />
      <path d="M19 15l.7 2.1L21.8 18l-2.1.7L19 20.8l-.7-2.1L16.2 18l2.1-.9z" />
    </>
  ),
  mappin: (
    <>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  megaphone: (
    <>
      <path d="M3 11l18-5v12L3 13v-2z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
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
  code: (
    <>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </>
  ),
  cap: (
    <>
      <path d="M22 9l-10-5-10 5 10 5 10-5z" />
      <path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
      <path d="M22 9v5" />
    </>
  ),
  check: <path d="M20 6L9 17l-5-5" />,
  whatsapp: (
    <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 1 1 16.1-3.8z" />
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
  book: (
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </>
  ),
  users: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.2 7.8 14.2 14.2 7.8 16.2 9.8 9.8 16.2 7.8" />
    </>
  ),
  message: (
    <>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </>
  ),
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  star: (
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  monitor: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 6h2M13 6h2M9 10h2M13 10h2M9 14h2M13 14h2M9 18h2M13 18h2" />
    </>
  ),
  briefcase: (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  play: <polygon points="6 3 20 12 6 21 6 3" />,
}

function EduIcon({ name, size = 20 }) {
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

function Node({ label, sub = '', icon, tone = '' }) {
  return (
    <span className={cx('edu-node', tone && `edu-node--${tone}`)}>
      {icon && (
        <span className="edu-node__icon" aria-hidden="true">
          <EduIcon name={icon} size={15} />
        </span>
      )}
      <span className="edu-node__labels">
        <span className="edu-node__label">{label}</span>
        {sub && <span className="edu-node__sub">{sub}</span>}
      </span>
    </span>
  )
}

function Arrow() {
  return (
    <span className="edu-arrow" aria-hidden="true">
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
    <div className={cx('edu-flow', `edu-flow--${direction}`, className)}>
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
   FAQ ACCORDION, accessible, single-open, smooth animation
   ============================================================ */

function FaqAccordion({ faqs }) {
  const [open, setOpen] = useState(null)

  return (
    <div className="edu-faq__list">
      {faqs.map((faq, index) => {
        const isOpen = open === index
        return (
          <div className="edu-faq__item glass-card" key={index}>
            <h3 className="edu-faq__heading">
              <button
                type="button"
                className="edu-faq__question"
                id={`edu-faq-button-${index}`}
                aria-expanded={isOpen}
                aria-controls={`edu-faq-panel-${index}`}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <span className="edu-faq__question-text">{faq.question}</span>
                <span className="edu-faq__chevron" aria-hidden="true">
                  <svg
                    width="18"
                    height="18"
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
              </button>
            </h3>
            <div
              id={`edu-faq-panel-${index}`}
              role="region"
              aria-labelledby={`edu-faq-button-${index}`}
              className="edu-faq__panel"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="edu-faq__panel-inner">
                <p className="edu-faq__answer">{faq.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ============================================================
   COMPONENT
   ============================================================ */

export default function EducationTraining() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/industries/education-training/`,
      ogType: 'website',
    })

    const faqEntities = FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    }))

    const webPage = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/industries/education-training/`,
      inLanguage: 'en',
      isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
      about: { '@type': 'Service', serviceType: 'Digital Marketing for Education & Training' },
    }

    const educationService = serviceSchema({
      serviceType: 'Digital Marketing for Education & Training',
      name: 'Digital Marketing for Education, Static Savvy Media',
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/industries/education-training/`,
      provider: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
      areaServed: [
        { '@type': 'State', name: 'Tamil Nadu' },
        { '@type': 'Country', name: 'India' },
        { '@type': 'Country', name: 'Malaysia' },
      ],
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Industries', item: `${SITE_URL}/industries/` },
        { name: 'Education & Training', item: `${SITE_URL}/industries/education-training/` },
      ],
    })

    const scripts = [webPage, educationService, faqPageSchema({ faqs: faqEntities }), breadcrumbs].map(
      (data) => {
        const script = document.createElement('script')
        script.type = 'application/ld+json'
        script.text = JSON.stringify(data)
        document.head.appendChild(script)
        return script
      },
    )
    jsonLdRef.current = scripts

    return () => {
      jsonLdRef.current.forEach((script) => script.remove())
      jsonLdRef.current = []
    }
  }, [])

  const whatsappHref = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)

  return (
    <div className="service-template edu-page">
      {/* ---- Breadcrumbs ---- */}
      <Breadcrumbs />

      {/* ---- Hero ---- */}
      <HeroSection
        layout="two-column"
        eyebrow="EDUCATION & TRAINING"
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
              WhatsApp for a Free Consultation
            </Button>
            <Button to="/services/" variant="ghost" size="lg">
              Explore Our Services
              <svg
                width="16"
                height="16"
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
            </Button>
          </>
        }
      >
        <div className="hero__visual-side">
          <img
            src={educationHeroImg}
            width={1536}
            height={1024}
            fetchPriority="high"
            alt="Education & Training"
            className="hero__image"
          />
        </div>
      </HeroSection>

      {/* ---- Value Strip ---- */}
      <section className="edu-strip" aria-label="Services for education and training businesses">
        <div className="container">
          <div className="edu-strip__inner">
            {SERVICES.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className="edu-strip__item"
                aria-label={`Learn more about ${item.title}`}
              >
                <span className="edu-strip__icon" aria-hidden="true">
                  <EduIcon name={item.icon} size={18} />
                </span>
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Introduction / Problem ---- */}
      <section className="section edu-journey">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">The Student Journey</span>
            <h2 className="section-heading__title">Education Decisions Start Online</h2>
          </div>

          <ScrollReveal>
            <p className="edu-journey__intro">
              Parents and students research on their own terms before they ever contact an
              institution. Education marketing for schools, colleges, and training institutes
              means being present at every step of that research, and controlling the journey
              from first search to final admission.
            </p>
          </ScrollReveal>

          <div className="edu-journey__timeline">
            {JOURNEY.map((step, index) => (
              <Fragment key={step.label}>
                {index > 0 && <span className="edu-journey__arrow" aria-hidden="true" />}
                <ScrollReveal className="edu-journey__step" delay={index * 60}>
                  <span className="edu-journey__icon" aria-hidden="true">
                    <EduIcon name={step.icon} size={20} />
                  </span>
                  <span className="edu-journey__label">{step.label}</span>
                  <span className="edu-journey__sub">{step.sub}</span>
                </ScrollReveal>
              </Fragment>
            ))}
          </div>

          <ScrollReveal>
            <blockquote className="edu-journey__quote">
              “The institution that controls this digital journey effectively wins the admission
              enquiry before a single brochure is handed out.”
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- Services ---- */}
      <section className="section edu-services">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Our Services</span>
            <h2 className="section-heading__title">How We Help Education &amp; Training Businesses</h2>
          </div>
          <ScrollReveal>
            <p className="edu-services__intro">
              Every education business depends on being found when students and parents start
              searching. Our digital marketing for education builds visibility, enquiries, and
              admissions across the platforms your audience actually uses.
            </p>
          </ScrollReveal>

          <div className="edu-services__grid">
            {SERVICES.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 80}>
                <Link to={item.path} className="edu-service-card glass-card">
                  <span className="edu-service-card__icon" aria-hidden="true">
                    <EduIcon name={item.icon} size={26} />
                  </span>
                  <h3 className="edu-service-card__title">{item.title}</h3>
                  <p className="edu-service-card__text">{item.text}</p>
                  <span className="edu-service-card__link">
                    Learn more
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
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Education Marketing Funnel ---- */}
      <section className="section edu-funnel">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">The System</span>
            <h2 className="section-heading__title">From Search to Admission</h2>
          </div>
          <ScrollReveal>
            <p className="edu-funnel__intro">
              We build more than social media posts, a complete digital acquisition system that
              moves a prospective student from first discovery to enrollment.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="edu-funnel__flow">
              <Flow items={FUNNEL} direction="horizontal" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- SEO + AI Search ---- */}
      <section className="section edu-ai">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Search + AI</span>
            <h2 className="section-heading__title">Be Visible Where Students and Parents Are Searching</h2>
          </div>
          <ScrollReveal>
            <p className="edu-ai__intro">
              Students and parents no longer stop at the first page of Google. They ask AI
              assistants, check maps, and watch social media before choosing an institution.
              Modern education discovery happens across every one of these channels.
            </p>
          </ScrollReveal>

          <div className="edu-ai__channels">
            {SEARCH_CHANNELS.map((channel, index) => (
              <span key={channel} className="edu-ai__channel" style={{ animationDelay: `${index * 80}ms` }}>
                <span className="edu-ai__channel-dot" aria-hidden="true" />
                {channel}
              </span>
            ))}
          </div>

          <ScrollReveal>
            <div className="edu-ai__compare">
              <div className="edu-ai__compare-panel edu-ai__compare-panel--trad">
                <span className="edu-ai__compare-head">
                  <EduIcon name="search" size={16} /> Traditional SEO
                </span>
                <ul>
                  <li>Rank on search engine result pages</li>
                  <li>Optimised for Google only</li>
                  <li>Answers stop at the blue link</li>
                </ul>
              </div>
              <span className="edu-ai__compare-vs" aria-hidden="true">
                VS
              </span>
              <div className="edu-ai__compare-panel edu-ai__compare-panel--geo">
                <span className="edu-ai__compare-head">
                  <EduIcon name="sparkles" size={16} /> GEO + AEO
                </span>
                <ul>
                  <li>Rank in AI-generated answers</li>
                  <li>Optimised for ChatGPT, Perplexity &amp; Google AI Overviews</li>
                  <li>Become part of the answer itself</li>
                </ul>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <p className="edu-ai__quote">Get discovered in search, and become part of the answer.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- Target Audiences ---- */}
      <section className="section edu-audiences">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Who We Help</span>
            <h2 className="section-heading__title">Built for Education &amp; Training Businesses</h2>
          </div>
          <ScrollReveal>
            <p className="edu-audiences__intro">
              Whether you run a school, a coaching centre, or an online learning business, our
              education digital marketing is built around how your audience searches and decides.
            </p>
          </ScrollReveal>

          <div className="edu-audiences__grid">
            {AUDIENCES.map((audience) => (
              <span key={audience.label} className="edu-audiences__chip">
                <span className="edu-audiences__icon" aria-hidden="true">
                  <EduIcon name={audience.icon} size={16} />
                </span>
                {audience.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Location / Market ---- */}
      <section className="section edu-locations">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Coverage</span>
            <h2 className="section-heading__title">Education Marketing Across Tamil Nadu &amp; Malaysia</h2>
          </div>

          <div className="edu-locations__grid">
            <ScrollReveal className="edu-locations__cell">
              <div className="edu-location-card glass-card">
                <span className="edu-location-card__icon" aria-hidden="true">
                  <EduIcon name="mappin" size={26} />
                </span>
                <h3 className="edu-location-card__title">Tamil Nadu</h3>
                <p className="edu-location-card__text">
                  From Madurai to Coimbatore and Chennai, we help schools, colleges, and training
                  institutes rank for admission-intent searches in the cities where students and
                  parents are looking, with campaigns matched to local and regional search intent.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal className="edu-locations__cell" delay={100}>
              <div className="edu-location-card glass-card">
                <span className="edu-location-card__icon" aria-hidden="true">
                  <EduIcon name="globe" size={26} />
                </span>
                <h3 className="edu-location-card__title">Malaysia</h3>
                <p className="edu-location-card__text">
                  For education businesses and institutions serving Malaysian students and
                  families, we build campaigns tuned to local search intent and the platforms
                  Malaysian audiences use.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="section edu-faq">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">FAQ</span>
            <h2 className="section-heading__title">Frequently Asked Questions, Education &amp; Training</h2>
          </div>
          <FaqAccordion faqs={FAQS} />
        </div>
      </section>

      {/* ---- Related Industries & Explore ---- */}
      <section className="section edu-related">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Explore More</span>
            <h2 className="section-heading__title">Related Industries</h2>
          </div>
          <div className="edu-related__links">
            <Link to="/industries/retail-ecommerce/" className="related-content__link">
              Retail &amp; E-Commerce
            </Link>
            <Link to="/industries/healthcare-clinics/" className="related-content__link">
              Healthcare &amp; Clinics
            </Link>
            <Link to="/industries/hospitality-hotels/" className="related-content__link">
              Hospitality &amp; Hotels
            </Link>
            <Link to="/services/" className="related-content__link">
              All Services
            </Link>
            <Link to="/contact/" className="related-content__link">
              Contact
            </Link>
            <Link to="/faq/" className="related-content__link">
              FAQ
            </Link>
          </div>
        </div>
      </section>

      {/* ---- Final CTA ---- */}
      <CTASection
        title={CTA.title}
        primaryLabel={CTA.label}
        primaryHref={whatsappHref}
        secondaryLabel="Explore Our Services"
        secondaryTo="/services/"
      />
      <ContactFormSection />
    </div>
  )
}