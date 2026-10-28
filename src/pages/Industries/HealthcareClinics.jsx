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
import '../../styles/pages/healthcare-clinics.css'
import healthcareHeroImg from '../../assets/images/Industries/02healthcare.webp'

/* ============================================================
   CONTENT, Approved Static Savvy Media Healthcare & Clinics
   ============================================================ */

const PAGE_TITLE =
  'Digital Marketing for Healthcare & Clinics | Tamil Nadu & Malaysia | Static Savvy Media'

const PAGE_DESCRIPTION =
  'Local SEO, Google Ads, and AI search visibility for hospitals, clinics, and healthcare practices in Tamil Nadu and Malaysia.'

const HERO_TITLE =
  'Digital Marketing for Healthcare & Clinics, Be Found When Patients Are Looking'

const HERO_PARAGRAPH =
  'Patients search online before they visit a clinic. A healthcare practice that is discoverable, credible, and easy to contact wins the enquiry, and the appointment, before a competitor does. Digital marketing for healthcare clinics means controlling that journey from first search to first visit.'

const SERVICES = [
  {
    title: 'Healthcare SEO',
    icon: 'search',
    path: '/services/seo/',
    text: 'Local and regional keyword targeting for healthcare-specific search queries in Tamil Nadu and Malaysia.',
  },
  {
    title: 'GEO & AEO for Healthcare',
    icon: 'sparkles',
    path: '/services/geo-aeo-ai-search/',
    text: 'AI search visibility for the healthcare queries patients are asking ChatGPT, Perplexity, and Google AI Overviews.',
  },
  {
    title: 'Local SEO & Google Maps',
    icon: 'mappin',
    path: '/services/local-seo/',
    text: 'Google Maps and GBP optimization, critical for healthcare practices where patients search for a clinic near their location.',
  },
  {
    title: 'Google Ads for Healthcare',
    icon: 'megaphone',
    path: '/services/google-ads/',
    text: 'Paid search campaigns targeting high-intent healthcare queries, structured for compliance and WhatsApp enquiry conversion.',
  },
  {
    title: 'Healthcare Social Media',
    icon: 'share',
    path: '/services/social-media-marketing/',
    text: 'Platform-specific content and advertising for healthcare audiences across Instagram, Facebook, and other channels.',
  },
  {
    title: 'Healthcare Website Development',
    icon: 'code',
    path: '/services/website-design-development/',
    text: 'SEO-ready sites with healthcare-appropriate content architecture and WhatsApp-first conversion design.',
  },
]

const FUNNEL = [
  { label: 'SEARCH', sub: 'Google / AI Search', icon: 'search' },
  { label: 'DISCOVERY', sub: 'Website / Services / Info', icon: 'compass' },
  { label: 'TRUST', sub: 'Reviews / GBP / Content', icon: 'shield' },
  { label: 'CONTACT', sub: 'WhatsApp / Form / Call', icon: 'message' },
  { label: 'APPOINTMENT', sub: 'Patient Visit', icon: 'calendar' },
]

const TRUST_SIGNALS = [
  {
    title: 'Clear Business Information',
    icon: 'building',
    text: 'Accurate clinic name, address, phone number, and operating hours across all digital platforms.',
  },
  {
    title: 'Consistent NAP',
    icon: 'mappin',
    text: 'Name, Address, and Phone number matching exactly on your website, Google Business Profile, and directories.',
  },
  {
    title: 'Professional Website',
    icon: 'monitor',
    text: 'A clean, fast, mobile-friendly site that clearly explains your services, team, and how to reach you.',
  },
  {
    title: 'Authentic Reviews',
    icon: 'star',
    text: 'Genuine patient reviews on Google and other platforms, managed ethically and responded to professionally.',
  },
  {
    title: 'Authoritative Healthcare Content',
    icon: 'book',
    text: 'Informative content about services, conditions treated, and clinic policies that demonstrates expertise without making medical claims.',
  },
]

const COMPARISON = {
  generic: [
    { label: 'Traffic', icon: 'target' },
    { label: 'Clicks', icon: 'zap' },
    { label: 'Followers', icon: 'users' },
    { label: 'Impressions', icon: 'eye' },
  ],
  healthcare: [
    { label: 'Patient search intent', icon: 'search' },
    { label: 'Local discovery', icon: 'mappin' },
    { label: 'Trust signals', icon: 'shield' },
    { label: 'Relevant enquiries', icon: 'message' },
    { label: 'Clear contact paths', icon: 'phone' },
    { label: 'Compliant advertising', icon: 'check' },
  ],
}

const FAQS = [
  {
    question: 'Is Google Ads appropriate for healthcare businesses?',
    answer:
      'Yes, with proper compliance. Google Ads allows healthcare advertising, but each platform has its own advertising policies for healthcare-related content. We structure campaigns to comply with Google Ads healthcare policies, including appropriate ad copy, landing page requirements, and targeting restrictions where applicable. This ensures your ads run sustainably without policy violations.',
  },
  {
    question: 'What are the most effective digital marketing channels for a private clinic?',
    answer:
      'For most private clinics, the highest-impact channels are Local SEO and Google Business Profile (where patients search for a clinic near them), Google Ads for high-intent healthcare queries, and a professional website that converts enquiries. Social media, particularly Instagram and Facebook, supports brand awareness and trust-building. We recommend a mix based on your clinic type, location, and patient demographics.',
  },
  {
    question: 'How does AI search affect healthcare marketing?',
    answer:
      'AI search tools like ChatGPT, Perplexity, and Google AI Overviews are increasingly used by patients researching health topics and clinic options. To be visible in these results, your practice needs clear entity signals, authoritative healthcare content, structured information on your website, consistent NAP across directories, and proper schema markup. We do not promise AI will recommend your practice, we ensure the digital signals that AI systems reference are accurate and well-structured.',
  },
]

const CTA = {
  title:
    "Let's grow your Healthcare & Clinics business with digital marketing that understands your sector.",
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
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
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
  eye: (
    <>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  heart: (
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  ),
}

function HealthcareIcon({ name, size = 20 }) {
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
    <span className={cx('hc-node', tone && `hc-node--${tone}`)}>
      {icon && (
        <span className="hc-node__icon" aria-hidden="true">
          <HealthcareIcon name={icon} size={15} />
        </span>
      )}
      <span className="hc-node__labels">
        <span className="hc-node__label">{label}</span>
        {sub && <span className="hc-node__sub">{sub}</span>}
      </span>
    </span>
  )
}

function Arrow() {
  return (
    <span className="hc-arrow" aria-hidden="true">
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
    <div className={cx('hc-flow', `hc-flow--${direction}`, className)}>
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
    <div className="hc-faq__list">
      {faqs.map((faq, index) => {
        const isOpen = open === index
        return (
          <div className="hc-faq__item glass-card" key={index}>
            <h3 className="hc-faq__heading">
              <button
                type="button"
                className="hc-faq__question"
                id={`hc-faq-button-${index}`}
                aria-expanded={isOpen}
                aria-controls={`hc-faq-panel-${index}`}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <span className="hc-faq__question-text">{faq.question}</span>
                <span className="hc-faq__chevron" aria-hidden="true">
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
              id={`hc-faq-panel-${index}`}
              role="region"
              aria-labelledby={`hc-faq-button-${index}`}
              className="hc-faq__panel"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="hc-faq__panel-inner">
                <p className="hc-faq__answer">{faq.answer}</p>
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

export default function HealthcareClinics() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/industries/healthcare-clinics/`,
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
      url: `${SITE_URL}/industries/healthcare-clinics/`,
      inLanguage: 'en',
      isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
      about: { '@type': 'Service', serviceType: 'Digital Marketing for Healthcare & Clinics' },
    }

    const healthcareService = serviceSchema({
      serviceType: 'Digital Marketing for Healthcare & Clinics',
      name: 'Digital Marketing for Healthcare & Clinics, Static Savvy Media',
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/industries/healthcare-clinics/`,
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
        { name: 'Healthcare & Clinics', item: `${SITE_URL}/industries/healthcare-clinics/` },
      ],
    })

    const scripts = [webPage, healthcareService, faqPageSchema({ faqs: faqEntities }), breadcrumbs].map(
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
    <div className="service-template hc-page">
      {/* ---- Breadcrumbs ---- */}
      <Breadcrumbs />

      {/* ---- Hero ---- */}
      <HeroSection
        layout="two-column"
        eyebrow="HEALTHCARE & CLINICS"
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
            src={healthcareHeroImg}
            width={1536}
            height={1024}
            fetchPriority="high"
            alt="Healthcare & Clinics"
            className="hero__image"
          />
        </div>
      </HeroSection>

      {/* ---- Trust Strip ---- */}
      <section className="hc-strip" aria-label="Key benefits for healthcare businesses">
        <div className="container">
          <div className="hc-strip__inner">
            {[
              { label: 'Be Found', icon: 'search' },
              { label: 'Build Trust', icon: 'shield' },
              { label: 'Drive Enquiries', icon: 'message' },
              { label: 'Stay Visible', icon: 'eye' },
            ].map((item, index) => (
              <span key={item.label} className="hc-strip__item">
                <span className="hc-strip__num" aria-hidden="true">{index + 1}</span>
                <span className="hc-strip__icon" aria-hidden="true">
                  <HealthcareIcon name={item.icon} size={18} />
                </span>
                <span>{item.label}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Introduction / Problem ---- */}
      <section className="section hc-intro">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">The Patient Journey</span>
            <h2 className="section-heading__title">Patients Search Before They Visit</h2>
          </div>

          <ScrollReveal>
            <p className="hc-intro__text">
              Modern healthcare discovery starts online. Before a patient calls or visits,
              they search for a clinic near them, a specialist, a treatment, or reviews.
              They look for directions, appointment information, and operating hours. Your
              website needs to be discoverable, credible, accessible, and easy to contact.
            </p>
          </ScrollReveal>

          <div className="hc-intro__steps">
            {[
              'Clinic near them',
              'Specialist',
              'Treatment',
              'Reviews',
              'Directions',
              'Appointment info',
            ].map((step, index) => (
              <Fragment key={step}>
                {index > 0 && <span className="hc-intro__arrow" aria-hidden="true" />}
                <ScrollReveal className="hc-intro__step" delay={index * 60}>
                  <span className="hc-intro__step-dot" aria-hidden="true" />
                  <span className="hc-intro__step-label">{step}</span>
                </ScrollReveal>
              </Fragment>
            ))}
          </div>

          <ScrollReveal>
            <p className="hc-intro__quote">
              "A healthcare practice that is discoverable, credible, and easy to contact
              wins the enquiry, and the appointment, before a competitor does."
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- Healthcare Digital Journey ---- */}
      <section className="section hc-journey">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">The System</span>
            <h2 className="section-heading__title">From Patient Search to Clinic Enquiry</h2>
          </div>
          <ScrollReveal>
            <p className="hc-journey__intro">
              We build more than individual marketing activities, a complete digital patient
              acquisition system that moves a prospective patient from first search to first
              visit.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="hc-journey__flow">
              <Flow items={FUNNEL} direction="horizontal" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- Services ---- */}
      <section className="section hc-services">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Our Services</span>
            <h2 className="section-heading__title">How We Help Healthcare &amp; Clinics Businesses</h2>
          </div>
          <ScrollReveal>
            <p className="hc-services__intro">
              Every healthcare practice depends on being found when patients start
              searching. Our digital marketing for healthcare builds visibility, enquiries,
              and appointments across the platforms your patients actually use.
            </p>
          </ScrollReveal>

          <div className="hc-services__grid">
            {SERVICES.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 80}>
                <Link to={item.path} className="hc-service-card glass-card">
                  <span className="hc-service-card__icon" aria-hidden="true">
                    <HealthcareIcon name={item.icon} size={26} />
                  </span>
                  <h3 className="hc-service-card__title">{item.title}</h3>
                  <p className="hc-service-card__text">{item.text}</p>
                  <span className="hc-service-card__link">
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

      {/* ---- Local SEO ---- */}
      <section className="section hc-local">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Local SEO</span>
            <h2 className="section-heading__title">When Patients Search &quot;Near Me&quot;</h2>
          </div>
          <ScrollReveal>
            <p className="hc-local__intro">
              When a patient searches for a healthcare provider, the intent is immediate
              and local. &quot;Near me&quot; searches for clinics, specialists, and treatments
              are among the most common healthcare queries. Local SEO ensures your practice
              appears when it matters most, at the moment a patient is deciding where to go.
            </p>
          </ScrollReveal>

          <div className="hc-local__searches">
            {['dentist near me', 'clinic near me', 'cardiologist Madurai'].map(
              (query, index) => (
                <span key={query} className="hc-local__search" style={{ animationDelay: `${index * 80}ms` }}>
                  <HealthcareIcon name="search" size={14} />
                  {query}
                </span>
              ),
            )}
          </div>

          <ScrollReveal>
            <div className="hc-local__signals">
              <div className="hc-local__signal">
                <span className="hc-local__signal-icon" aria-hidden="true">
                  <HealthcareIcon name="mappin" size={18} />
                </span>
                <span>Google Business Profile</span>
              </div>
              <div className="hc-local__signal">
                <span className="hc-local__signal-icon" aria-hidden="true">
                  <HealthcareIcon name="globe" size={18} />
                </span>
                <span>Google Maps</span>
              </div>
              <div className="hc-local__signal">
                <span className="hc-local__signal-icon" aria-hidden="true">
                  <HealthcareIcon name="building" size={18} />
                </span>
                <span>NAP Consistency</span>
              </div>
              <div className="hc-local__signal">
                <span className="hc-local__signal-icon" aria-hidden="true">
                  <HealthcareIcon name="star" size={18} />
                </span>
                <span>Patient Reviews</span>
              </div>
              <div className="hc-local__signal">
                <span className="hc-local__signal-icon" aria-hidden="true">
                  <HealthcareIcon name="book" size={18} />
                </span>
                <span>Local Content</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- Google Business Profile ---- */}
      <section className="section hc-gbp">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Google Business Profile</span>
            <h2 className="section-heading__title">
              Your Google Business Profile Is Part of Your Digital Front Door
            </h2>
          </div>
          <ScrollReveal>
            <p className="hc-gbp__intro">
              For healthcare practices, your Google Business Profile is often the first
              impression a patient has of your clinic. It appears in Google Maps results,
              local search packs, and voice search answers. Keeping it complete, accurate,
              and active is essential for patient acquisition.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="hc-gbp__mock glass-card">
              <div className="hc-gbp__mock-header">
                <span className="hc-gbp__mock-avatar" aria-hidden="true">
                  <HealthcareIcon name="building" size={22} />
                </span>
                <div className="hc-gbp__mock-info">
                  <span className="hc-gbp__mock-name">Your Clinic Name</span>
                  <span className="hc-gbp__mock-category">Healthcare Clinic</span>
                </div>
              </div>
              <div className="hc-gbp__mock-fields">
                {[
                  { icon: 'mappin', label: 'Location & Address' },
                  { icon: 'phone', label: 'Phone Number' },
                  { icon: 'calendar', label: 'Operating Hours' },
                  { icon: 'globe', label: 'Website Link' },
                  { icon: 'star', label: 'Patient Reviews' },
                  { icon: 'search', label: 'Services Listed' },
                  { icon: 'compass', label: 'Directions' },
                ].map((field) => (
                  <span key={field.label} className="hc-gbp__mock-field">
                    <span className="hc-gbp__mock-field-icon" aria-hidden="true">
                      <HealthcareIcon name={field.icon} size={14} />
                    </span>
                    {field.label}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- AI Search ---- */}
      <section className="section hc-ai">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">AI Search</span>
            <h2 className="section-heading__title">Be Visible When Patients Ask AI</h2>
          </div>
          <ScrollReveal>
            <p className="hc-ai__intro">
              Patients increasingly use AI tools like ChatGPT, Perplexity, and Google AI
              Overviews to research healthcare topics and find providers. To be visible in
              these results, your practice needs clear entity signals, authoritative content,
              structured information, consistent NAP across directories, and proper schema
              markup.
            </p>
          </ScrollReveal>

          <div className="hc-ai__channels">
            {['Google AI Overviews', 'ChatGPT', 'Perplexity'].map(
              (channel, index) => (
                <span key={channel} className="hc-ai__channel" style={{ animationDelay: `${index * 80}ms` }}>
                  <span className="hc-ai__channel-dot" aria-hidden="true" />
                  {channel}
                </span>
              ),
            )}
          </div>

          <ScrollReveal>
            <div className="hc-ai__signals">
              <div className="hc-ai__signal glass-card">
                <span className="hc-ai__signal-icon" aria-hidden="true">
                  <HealthcareIcon name="building" size={20} />
                </span>
                <span className="hc-ai__signal-label">Entity Clarity</span>
              </div>
              <div className="hc-ai__signal glass-card">
                <span className="hc-ai__signal-icon" aria-hidden="true">
                  <HealthcareIcon name="book" size={20} />
                </span>
                <span className="hc-ai__signal-label">Authoritative Content</span>
              </div>
              <div className="hc-ai__signal glass-card">
                <span className="hc-ai__signal-icon" aria-hidden="true">
                  <HealthcareIcon name="monitor" size={20} />
                </span>
                <span className="hc-ai__signal-label">Structured Info</span>
              </div>
              <div className="hc-ai__signal glass-card">
                <span className="hc-ai__signal-icon" aria-hidden="true">
                  <HealthcareIcon name="mappin" size={20} />
                </span>
                <span className="hc-ai__signal-label">Consistent NAP</span>
              </div>
              <div className="hc-ai__signal glass-card">
                <span className="hc-ai__signal-icon" aria-hidden="true">
                  <HealthcareIcon name="code" size={20} />
                </span>
                <span className="hc-ai__signal-label">Schema Markup</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <p className="hc-ai__note">
              We do not promise AI will recommend your practice. We ensure the digital
              signals that AI systems reference are accurate, well-structured, and complete.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- Trust Signals ---- */}
      <section className="section hc-trust">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Trust Signals</span>
            <h2 className="section-heading__title">Build Digital Trust Before the First Call</h2>
          </div>
          <ScrollReveal>
            <p className="hc-trust__intro">
              Patients choose healthcare providers based on trust. Your digital presence
              must communicate credibility before a patient ever picks up the phone or
              walks through your door.
            </p>
          </ScrollReveal>

          <div className="hc-trust__grid">
            {TRUST_SIGNALS.map((signal, index) => (
              <ScrollReveal key={signal.title} delay={index * 80}>
                <div className="hc-trust-card glass-card">
                  <span className="hc-trust-card__icon" aria-hidden="true">
                    <HealthcareIcon name={signal.icon} size={24} />
                  </span>
                  <h3 className="hc-trust-card__title">{signal.title}</h3>
                  <p className="hc-trust-card__text">{signal.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Comparison ---- */}
      <section className="section hc-compare">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Why Healthcare Is Different</span>
            <h2 className="section-heading__title">Healthcare Marketing Is Different</h2>
          </div>
          <ScrollReveal>
            <div className="hc-compare__panels">
              <div className="hc-compare__panel hc-compare__panel--generic glass-card">
                <span className="hc-compare__head">
                  <HealthcareIcon name="target" size={16} /> Generic Marketing
                </span>
                <ul>
                  {COMPARISON.generic.map((item) => (
                    <li key={item.label}>
                      <HealthcareIcon name={item.icon} size={14} />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
              <span className="hc-compare__vs" aria-hidden="true">
                VS
              </span>
              <div className="hc-compare__panel hc-compare__panel--healthcare glass-card">
                <span className="hc-compare__head">
                  <HealthcareIcon name="heart" size={16} /> Healthcare Marketing
                </span>
                <ul>
                  {COMPARISON.healthcare.map((item) => (
                    <li key={item.label}>
                      <HealthcareIcon name={item.icon} size={14} />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- Conversion ---- */}
      <section className="section hc-conversion">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Convert</span>
            <h2 className="section-heading__title">
              Make It Easy for Patients to Take the Next Step
            </h2>
          </div>
          <ScrollReveal>
            <p className="hc-conversion__text">
              Every digital touchpoint should lead to a clear action. WhatsApp is the
              primary conversion channel, patients message directly with questions and
              booking requests. A clear, prominent WhatsApp button turns traffic into
              enquiries.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="hc-conversion__actions">
              <Button
                href={whatsappHref}
                variant="primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 WhatsApp for a Free Consultation
              </Button>
              <Button to="/contact/" variant="ghost" size="lg">
                Talk to Our Team
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
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="section hc-faq">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">FAQ</span>
            <h2 className="section-heading__title">
              Frequently Asked Questions, Healthcare &amp; Clinics
            </h2>
          </div>
          <FaqAccordion faqs={FAQS} />
        </div>
      </section>

      {/* ---- Locations ---- */}
      <section className="section hc-locations">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Coverage</span>
            <h2 className="section-heading__title">
              Healthcare Digital Marketing Across Tamil Nadu &amp; Malaysia
            </h2>
          </div>

          <div className="hc-locations__grid">
            <ScrollReveal className="hc-locations__cell">
              <div className="hc-location-card glass-card">
                <span className="hc-location-card__icon" aria-hidden="true">
                  <HealthcareIcon name="mappin" size={26} />
                </span>
                <h3 className="hc-location-card__title">Tamil Nadu</h3>
                <p className="hc-location-card__text">
                  From Madurai to Coimbatore and Chennai, we help clinics, hospitals, and
                  healthcare practices rank for patient-intent searches in the cities where
                  patients are looking, with campaigns matched to local and regional search
                  intent.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal className="hc-locations__cell" delay={100}>
              <div className="hc-location-card glass-card">
                <span className="hc-location-card__icon" aria-hidden="true">
                  <HealthcareIcon name="globe" size={26} />
                </span>
                <h3 className="hc-location-card__title">Malaysia</h3>
                <p className="hc-location-card__text">
                  For healthcare businesses and clinics serving Malaysian patients and
                  families, we build campaigns tuned to local search intent and the platforms
                  Malaysian audiences use, including strategies adapted for multi-location
                  practices.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ---- Related Industries & Explore ---- */}
      <section className="section hc-related">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Explore More</span>
            <h2 className="section-heading__title">Related Industries</h2>
          </div>
          <div className="hc-related__links">
            <Link to="/industries/retail-ecommerce/" className="related-content__link">
              Retail &amp; E-Commerce
            </Link>
            <Link to="/industries/education-training/" className="related-content__link">
              Education &amp; Training
            </Link>
            <Link to="/industries/hospitality-hotels/" className="related-content__link">
              Hospitality &amp; Hotels
            </Link>
            <Link to="/industries/" className="related-content__link">
              All Industries
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
        secondaryLabel="Explore All Industries"
        secondaryTo="/industries/"
      />
      <ContactFormSection />
    </div>
  )
}
