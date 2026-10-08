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
import '../../styles/pages/hospitality-hotels.css'
import hospitalityHeroImg from '../../assets/images/Industries/04hospital.webp'

const PAGE_TITLE =
  'Digital Marketing for Hotels & Hospitality Businesses | Madurai & Tamil Nadu | Static Savvy Media'
const PAGE_DESCRIPTION =
  'Drive bookings, reviews, and visibility for hotels, restaurants, and hospitality businesses in Madurai and Tamil Nadu.'
const HERO_TITLE =
  'Digital Marketing for Hospitality, More Bookings, Better Reviews, Stronger Brand'
const HERO_PARAGRAPH =
  "Madurai's pilgrimage traffic, leisure travellers, and business guests all search online before they book. Hotels, restaurants, and hospitality businesses that appear on Google, TripAdvisor, OTAs, and AI search at the moment a traveller is comparing options win the booking. Digital marketing for hospitality means owning that journey from first search to confirmed reservation."

const SERVICES = [
  { title: 'Hospitality SEO', icon: 'search', path: '/services/seo/', text: 'Target search queries travellers actually use, "hotel in Madurai", "restaurants near Meenakshi Temple", and niche hospitality searches across Tamil Nadu.' },
  { title: 'GEO & AEO for Hospitality', icon: 'sparkles', path: '/services/geo-aeo-ai-search/', text: 'AI search visibility for the travel queries ChatGPT, Perplexity, and Google AI Overviews are answering when travellers ask for hotel and dining recommendations.' },
  { title: 'Local SEO & Google Maps', icon: 'mappin', path: '/services/local-seo/', text: 'Google Maps and GBP optimization, essential for hospitality where travellers search for hotels and restaurants near their location.' },
  { title: 'Google Ads for Hotels', icon: 'megaphone', path: '/services/google-ads/', text: 'Paid search campaigns targeting high-intent travel queries, structured for booking conversions and WhatsApp enquiry paths.' },
  { title: 'Hospitality Social Media', icon: 'share', path: '/services/social-media-marketing/', text: 'Platform-specific content and advertising for hospitality audiences across Instagram, Facebook, and other channels.' },
  { title: 'Hospitality Website Development', icon: 'code', path: '/services/website-design-development/', text: 'SEO-ready sites with booking-focused content architecture and WhatsApp-first conversion design.' },
]

const JOURNEY_STEPS = [
  { label: 'TRAVELLER SEARCH', sub: 'Google / TripAdvisor / AI', icon: 'search' },
  { label: 'DISCOVERY', sub: 'Maps / OTA / Website', icon: 'compass' },
  { label: 'REVIEWS & INFORMATION', sub: 'Ratings / Photos / Amenities', icon: 'star' },
  { label: 'COMPARISON', sub: 'Options / Pricing / Dates', icon: 'target' },
  { label: 'ENQUIRY / BOOKING', sub: 'WhatsApp / Direct / OTA', icon: 'calendar' },
]

const COMPARISON = {
  thirdParty: [
    { label: 'OTA presence', icon: 'compass' },
    { label: 'Travel platform listings', icon: 'globe' },
    { label: 'Review platform profiles', icon: 'star' },
    { label: 'Search platform visibility', icon: 'search' },
  ],
  owned: [
    { label: 'Your website', icon: 'monitor' },
    { label: 'Google Business Profile', icon: 'mappin' },
    { label: 'Original content', icon: 'book' },
    { label: 'SEO rankings', icon: 'search' },
    { label: 'Social media channels', icon: 'share' },
    { label: 'WhatsApp direct channel', icon: 'whatsapp' },
  ],
}

const CONTENT_PILLARS = [
  { label: 'ROOMS', icon: 'building', text: 'Room types, amenities, pricing transparency, and visual presentation that helps travellers compare options.' },
  { label: 'DINING', icon: 'star', text: 'Restaurant and food content, menus, cuisines, dietary options, and dining experiences that attract local and tourist diners.' },
  { label: 'LOCATION', icon: 'mappin', text: 'Area guides, proximity to landmarks, temple distances, and transport access, the information travellers search for first.' },
  { label: 'EVENTS', icon: 'calendar', text: 'Wedding venues, corporate events, conference facilities, and seasonal celebrations that drive group bookings.' },
  { label: 'DESTINATION', icon: 'compass', text: 'Madurai and regional tourism content, temple visits, cultural experiences, and itinerary suggestions that capture travel search intent.' },
  { label: 'EXPERIENCE', icon: 'sparkles', text: 'Guest stories, hospitality philosophy, and brand narrative that differentiate your property from competitors.' },
]

const FUNNEL = [
  { label: 'SEARCH', sub: 'Google / Maps / AI / TripAdvisor', icon: 'search' },
  { label: 'MAPS / SEARCH / AI', sub: 'Discovery & Comparison', icon: 'compass' },
  { label: 'WEBSITE / PROFILE', sub: 'Information & Photos', icon: 'monitor' },
  { label: 'REVIEWS & TRUST', sub: 'Google / TripAdvisor', icon: 'star' },
  { label: 'WHATSAPP / CALL', sub: 'Direct Enquiry', icon: 'whatsapp' },
  { label: 'BOOKING', sub: 'Reservation Confirmed', icon: 'calendar' },
]

const FAQS = [
  {
    question: 'How do I get my hotel to rank higher on Google Maps?',
    answer: 'Google Maps ranking for hotels depends on several factors: a complete and verified Google Business Profile with accurate property name, category, address, phone, website, and operating hours. High-quality photos of rooms, amenities, and property. Amenity details, parking, Wi-Fi, pool, restaurant. Regular review volume and recency. Local SEO signals including consistent NAP across directories, relevant local content, and proper schema markup on your website. No single factor guarantees a top position, the approach is building a complete, trustworthy digital presence.',
  },
  {
    question: 'Is Google Ads worth using for a hotel in Madurai?',
    answer: 'Google Ads can be effective for hotels targeting high-intent queries like "hotel in Madurai" or "book hotel near Meenakshi Temple", especially during peak travel seasons, festival periods, and pilgrimage seasons when search volume increases. However, whether it is worth the investment depends on multiple factors: your property type, budget, competition level, seasonality, and booking cycle. We structure campaigns with proper targeting, landing pages, and tracking so you can evaluate performance against your actual booking goals, not just clicks.',
  },
  {
    question: 'Can AI search help my restaurant get discovered by tourists?',
    answer: 'AI search tools like ChatGPT, Perplexity, and Google AI Overviews increasingly influence how travellers discover restaurants and hotels. To improve visibility in these results, your property needs clear entity signals, accurate name, verified Google Business Profile, structured information on your website, authentic reviews across platforms, consistent NAP across directories, TripAdvisor presence, and proper schema markup. We do not promise AI will recommend your property, we ensure the digital signals AI systems reference are accurate, well-structured, and complete.',
  },
]

const CTA = {
  title: "Let's grow your Hospitality & Hotels business with digital marketing that understands your sector.",
  label: 'WhatsApp for a Free Consultation',
}

/* ICONS */
const ICONS = {
  search: (<><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>),
  sparkles: (<><path d="M12 3l1.9 5.8L19.7 10l-5.8 1.9L12 17.7l-1.9-5.8L4.3 10l5.8-1.9z" /><path d="M19 15l.7 2.1L21.8 18l-2.1.7L19 20.8l-.7-2.1L16.2 18l2.1-.9z" /></>),
  mappin: (<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>),
  megaphone: (<><path d="M3 11l18-5v12L3 13v-2z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></>),
  share: (<><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.6" y1="13.5" x2="15.4" y2="17.5" /><line x1="15.4" y1="6.5" x2="8.6" y2="10.5" /></>),
  code: (<><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>),
  calendar: (<><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>),
  check: <path d="M20 6L9 17l-5-5" />,
  whatsapp: <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 1 1 16.1-3.8z" />,
  globe: (<><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>),
  book: (<><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>),
  users: (<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>),
  compass: (<><circle cx="12" cy="12" r="10" /><polygon points="16.2 7.8 14.2 14.2 7.8 16.2 9.8 9.8 16.2 7.8" /></>),
  message: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></>,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
  target: (<><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>),
  zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  monitor: (<><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></>),
  building: (<><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 6h2M13 6h2M9 10h2M13 10h2M9 14h2M13 14h2M9 18h2M13 18h2" /></>),
  briefcase: (<><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>),
  phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />,
  eye: (<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>),
  bed: (<><path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path d="M6 8v9" /></>),
}

function HospitalityIcon({ name, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name] || null}
    </svg>
  )
}

/* WORKFLOW PRIMITIVES */
function Node({ label, sub = '', icon, tone = '' }) {
  return (
    <span className={cx('hh-node', tone && `hh-node--${tone}`)}>
      {icon && (<span className="hh-node__icon" aria-hidden="true"><HospitalityIcon name={icon} size={15} /></span>)}
      <span className="hh-node__labels">
        <span className="hh-node__label">{label}</span>
        {sub && <span className="hh-node__sub">{sub}</span>}
      </span>
    </span>
  )
}

function Arrow() {
  return (
    <span className="hh-arrow" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </span>
  )
}

function Flow({ items = [], className = '', direction = 'vertical' }) {
  return (
    <div className={cx('hh-flow', `hh-flow--${direction}`, className)}>
      {items.map((item, index) => (
        <Fragment key={index}>
          {index > 0 && <Arrow />}
          <Node {...item} />
        </Fragment>
      ))}
    </div>
  )
}

/* FAQ ACCORDION */
function FaqAccordion({ faqs }) {
  const [open, setOpen] = useState(null)
  return (
    <div className="hh-faq__list">
      {faqs.map((faq, index) => {
        const isOpen = open === index
        return (
          <div className="hh-faq__item glass-card" key={index}>
            <h3 className="hh-faq__heading">
              <button type="button" className="hh-faq__question" id={`hh-faq-button-${index}`} aria-expanded={isOpen} aria-controls={`hh-faq-panel-${index}`} onClick={() => setOpen(isOpen ? null : index)}>
                <span className="hh-faq__question-text">{faq.question}</span>
                <span className="hh-faq__chevron" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                </span>
              </button>
            </h3>
            <div id={`hh-faq-panel-${index}`} role="region" aria-labelledby={`hh-faq-button-${index}`} className="hh-faq__panel" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
              <div className="hh-faq__panel-inner"><p>{faq.answer}</p></div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* MAIN COMPONENT */
export default function HospitalityHotels() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({ title: PAGE_TITLE, description: PAGE_DESCRIPTION, canonical: `${SITE_URL}/industries/hospitality-hotels/`, ogType: 'website' })

    const faqEntities = FAQS.map((faq) => ({
      '@type': 'Question', name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    }))

    const webPage = {
      '@context': 'https://schema.org', '@type': 'WebPage', name: PAGE_TITLE,
      description: PAGE_DESCRIPTION, url: `${SITE_URL}/industries/hospitality-hotels/`,
      inLanguage: 'en', isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
      about: { '@type': 'Service', serviceType: 'Digital Marketing for Hospitality & Hotels' },
    }

    const hospitalityService = serviceSchema({
      serviceType: 'Digital Marketing for Hospitality & Hotels',
      name: 'Digital Marketing for Hospitality & Hotels, Static Savvy Media',
      description: PAGE_DESCRIPTION, url: `${SITE_URL}/industries/hospitality-hotels/`,
      provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
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
        { name: 'Hospitality & Hotels', item: `${SITE_URL}/industries/hospitality-hotels/` },
      ],
    })

    const scripts = [webPage, hospitalityService, faqPageSchema({ faqs: faqEntities }), breadcrumbs].map((data) => {
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
    <div className="service-template hh-page">
      <Breadcrumbs />

      {/* HERO */}
      <HeroSection
        layout="two-column"
        eyebrow="HOSPITALITY & HOTELS"
        title={HERO_TITLE}
        subtitle={HERO_PARAGRAPH}
        actions={
          <>
            <Button href={whatsappHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">
              WhatsApp for a Free Consultation
            </Button>
            <Button to="/industries/" variant="ghost" size="lg">
              Explore Our Industries
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Button>
          </>
        }
      >
        <div className="hero__visual-side">
          <img
            src={hospitalityHeroImg}
            width={1536}
            height={1024}
            fetchPriority="high"
            alt="Hospitality & Hotels"
            className="hero__image"
          />
        </div>
      </HeroSection>

      {/* TRUST STRIP */}
      <section className="hh-strip" aria-label="Key benefits for hospitality businesses">
        <div className="container">
          <div className="hh-strip__inner">
            {[
              { label: 'Get Discovered', icon: 'search' },
              { label: 'Build Trust', icon: 'shield' },
              { label: 'Drive Enquiries', icon: 'message' },
              { label: 'Grow Direct Visibility', icon: 'eye' },
            ].map((item, index) => (
              <span key={item.label} className="hh-strip__item">
                <span className="hh-strip__num" aria-hidden="true">{index + 1}</span>
                <span className="hh-strip__icon" aria-hidden="true"><HospitalityIcon name={item.icon} size={18} /></span>
                <span>{item.label}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="section hh-intro">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">The Traveller Journey</span>
            <h2 className="section-heading__title">Travellers Search Before They Book</h2>
          </div>
          <ScrollReveal>
            <p className="hh-intro__text">
              Modern hospitality discovery starts online. Before a traveller calls, messages, or books, they search on Google, check Google Maps, read TripAdvisor reviews, compare options on OTAs, and increasingly ask AI tools for recommendations. Your property needs to be discoverable, credible, and easy to contact across every platform travellers use during their decision-making process.
            </p>
          </ScrollReveal>
          <div className="hh-intro__steps">
            {[
              { step: 'Discovery', icon: 'search', color: 'icon-badge--purple', desc: 'Google Search & Maps' },
              { step: 'Trust', icon: 'shield', color: 'icon-badge--blue', desc: 'TripAdvisor & Reviews' },
              { step: 'Consideration', icon: 'target', color: 'icon-badge--cyan', desc: 'OTAs & Amenities' },
              { step: 'Enquiry', icon: 'message', color: 'icon-badge--orange', desc: 'WhatsApp & Direct Call' },
              { step: 'Booking', icon: 'calendar', color: 'icon-badge--pink', desc: 'Confirmed Reservation' },
            ].map((item, index) => (
              <ScrollReveal key={item.step} className="hh-intro__step-card glass-card" delay={index * 60}>
                <div className="hh-intro__step-header">
                  <span className="hh-intro__step-num">0{index + 1}</span>
                  <span className={cx('hh-intro__step-icon', 'icon-badge', item.color)} aria-hidden="true">
                    <HospitalityIcon name={item.icon} size={18} />
                  </span>
                </div>
                <span className="hh-intro__step-label">{item.step}</span>
                <span className="hh-intro__step-sub">{item.desc}</span>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <blockquote className="hh-intro__quote glass-card">
              <span className="hh-intro__quote-icon" aria-hidden="true">“</span>
              <p>A hospitality business that is discoverable, credible, and easy to contact wins the enquiry, and the booking, before a competitor does.</p>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* HOSPITALITY SEARCH JOURNEY */}
      <section className="section hh-journey">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">The System</span>
            <h2 className="section-heading__title">From Traveller Search to Booking</h2>
          </div>
          <ScrollReveal>
            <p className="hh-journey__intro">
              We build more than individual marketing activities, a complete digital traveller acquisition system that moves a prospective guest from first search to confirmed booking.
            </p>
          </ScrollReveal>
          <div className="hh-journey__grid">
            {JOURNEY_STEPS.map((step, index) => {
              const colors = ['icon-badge--purple', 'icon-badge--blue', 'icon-badge--cyan', 'icon-badge--pink', 'icon-badge--gold']
              return (
                <ScrollReveal key={step.label} delay={index * 70}>
                  <div className="hh-journey__card glass-card">
                    <div className="hh-journey__card-top">
                      <span className="hh-journey__step-badge">Step 0{index + 1}</span>
                      <span className={cx('hh-journey__icon', 'icon-badge', colors[index % colors.length])} aria-hidden="true">
                        <HospitalityIcon name={step.icon} size={18} />
                      </span>
                    </div>
                    <h3 className="hh-journey__card-title">{step.label}</h3>
                    <p className="hh-journey__card-sub">{step.sub}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
          <ScrollReveal>
            <div className="hh-journey__search-examples">
              <p className="hh-journey__search-label">Traveller search queries:</p>
              <div className="hh-journey__searches">
                {['hotel in Madurai', 'best restaurant near Meenakshi Temple', 'budget hotels near railway station', 'wedding venue Madurai', 'hotel with pool Madurai'].map((query, index) => (
                  <span key={query} className="hh-journey__search" style={{ animationDelay: `${index * 80}ms` }}>
                    <HospitalityIcon name="search" size={14} />{query}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section hh-services">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Our Services</span>
            <h2 className="section-heading__title">How We Help Hospitality &amp; Hotels Businesses</h2>
          </div>
          <ScrollReveal>
            <p className="hh-services__intro">
              Every hospitality business depends on being found when travellers start searching. Our digital marketing for hospitality builds visibility, enquiries, and bookings across the platforms your guests actually use.
            </p>
          </ScrollReveal>
          <div className="hh-services__grid">
            {SERVICES.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 80}>
                <Link to={item.path} className="hh-service-card glass-card">
                  <span className="hh-service-card__icon" aria-hidden="true"><HospitalityIcon name={item.icon} size={26} /></span>
                  <h3 className="hh-service-card__title">{item.title}</h3>
                  <p className="hh-service-card__text">{item.text}</p>
                  <span className="hh-service-card__link">
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* GOOGLE MAPS */}
      <section className="section hh-local">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Google Maps</span>
            <h2 className="section-heading__title">When Travellers Search &quot;Hotels Near Me&quot;</h2>
          </div>
          <ScrollReveal>
            <p className="hh-local__intro">
              When a traveller searches for a hotel or restaurant, the intent is immediate and local. &quot;Near me&quot; searches for hotels, restaurants, and attractions are among the most common hospitality queries. Google Maps and your Google Business Profile are often the first interaction a traveller has with your property, before they visit your website or call.
            </p>
          </ScrollReveal>
          <div className="hh-local__searches">
            {['hotel in Madurai', 'hotels near Meenakshi Temple', 'restaurant near Meenakshi Temple', 'budget hotel Madurai'].map((query, index) => (
              <span key={query} className="hh-local__search" style={{ animationDelay: `${index * 80}ms` }}>
                <HospitalityIcon name="search" size={14} />{query}
              </span>
            ))}
          </div>
          <ScrollReveal>
            <div className="hh-local__signals">
              {[
                { icon: 'mappin', text: 'Google Business Profile' },
                { icon: 'globe', text: 'Google Maps' },
                { icon: 'building', text: 'NAP Consistency' },
                { icon: 'star', text: 'Guest Reviews' },
                { icon: 'book', text: 'Local Content' },
              ].map((signal) => (
                <div key={signal.text} className="hh-local__signal">
                  <span className="hh-local__signal-icon" aria-hidden="true"><HospitalityIcon name={signal.icon} size={18} /></span>
                  <span>{signal.text}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* GOOGLE BUSINESS PROFILE */}
      <section className="section hh-gbp">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Google Business Profile</span>
            <h2 className="section-heading__title">Your Google Business Profile Is Your Digital Front Desk</h2>
          </div>
          <ScrollReveal>
            <p className="hh-gbp__intro">
              For hospitality businesses, your Google Business Profile is often the first impression a traveller has of your property. It appears in Google Maps results, local search packs, and voice search answers. Keeping it complete, accurate, and active is essential for capturing booking enquiries.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="hh-gbp__mock glass-card">
              <div className="hh-gbp__mock-header">
                <span className="hh-gbp__mock-avatar" aria-hidden="true"><HospitalityIcon name="bed" size={22} /></span>
                <div className="hh-gbp__mock-info">
                  <span className="hh-gbp__mock-name">Your Hotel Name</span>
                  <span className="hh-gbp__mock-category">Hotel in Madurai</span>
                </div>
              </div>
              <div className="hh-gbp__mock-fields">
                {[
                  { icon: 'building', label: 'Property Name & Category' },
                  { icon: 'mappin', label: 'Location & Address' },
                  { icon: 'phone', label: 'Phone Number' },
                  { icon: 'globe', label: 'Website Link' },
                  { icon: 'calendar', label: 'Operating Hours' },
                  { icon: 'star', label: 'Amenities Listed' },
                  { icon: 'eye', label: 'Photos & Virtual Tours' },
                  { icon: 'star', label: 'Guest Reviews' },
                  { icon: 'compass', label: 'Directions' },
                ].map((field) => (
                  <span key={field.label} className="hh-gbp__mock-field">
                    <span className="hh-gbp__mock-field-icon" aria-hidden="true"><HospitalityIcon name={field.icon} size={14} /></span>
                    {field.label}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* REVIEWS & REPUTATION */}
      <section className="section hh-reviews">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Reviews &amp; Reputation</span>
            <h2 className="section-heading__title">Better Reviews Build Stronger Hospitality Brands</h2>
          </div>
          <ScrollReveal>
            <p className="hh-reviews__intro">
              Travellers read reviews before they book. Google reviews, TripAdvisor ratings, and feedback on other platforms directly influence booking decisions. The hospitality review ecosystem is about volume, recency, authentic guest feedback, and professional management, not fabricated ratings.
            </p>
          </ScrollReveal>
          <div className="hh-reviews__ecosystem">
            {[
              { label: 'Google Reviews', icon: 'star', color: 'icon-badge--gold', text: 'The most visible review platform, influences Maps ranking and traveller trust.' },
              { label: 'TripAdvisor', icon: 'globe', color: 'icon-badge--cyan', text: 'The dedicated travel review platform travellers check before booking hotels and restaurants.' },
              { label: 'Other Platforms', icon: 'compass', color: 'icon-badge--purple', text: 'OTA reviews, Facebook recommendations, and industry-specific platforms that contribute to overall reputation.' },
            ].map((item, index) => (
              <ScrollReveal key={item.label} delay={index * 80}>
                <div className="hh-reviews__card glass-card">
                  <div className="hh-reviews__card-header">
                    <span className={cx('hh-reviews__card-icon', 'icon-badge', item.color)} aria-hidden="true">
                      <HospitalityIcon name={item.icon} size={22} />
                    </span>
                    <span className="hh-reviews__stars-badge" aria-hidden="true">★★★★★</span>
                  </div>
                  <h3 className="hh-reviews__card-title">{item.label}</h3>
                  <p className="hh-reviews__card-text">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div className="hh-reviews__focus glass-card">
              <div className="hh-reviews__focus-header">
                <span className="icon-badge icon-badge--blue" aria-hidden="true">
                  <HospitalityIcon name="shield" size={22} />
                </span>
                <h3 className="hh-reviews__focus-title">Our Approach to Reviews</h3>
              </div>
              <div className="hh-reviews__focus-items">
                {[
                  { text: 'Volume, encourage genuine guest feedback', color: 'icon-badge--purple' },
                  { text: 'Recency, consistent flow of new reviews', color: 'icon-badge--blue' },
                  { text: 'Authenticity, real experiences from real guests', color: 'icon-badge--green' },
                  { text: 'Professional responses, thank, address concerns, show care', color: 'icon-badge--pink' },
                ].map((item) => (
                  <div key={item.text} className="hh-reviews__focus-item-card glass-card">
                    <span className={cx('hh-reviews__check-badge', 'icon-badge', item.color)} aria-hidden="true">
                      <HospitalityIcon name="check" size={14} />
                    </span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
              <p className="hh-reviews__focus-note">
                We do not encourage or create fake reviews. We help you build a system that earns authentic guest feedback and manages your reputation professionally.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* DIRECT VS THIRD-PARTY */}
      <section className="section hh-compare">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Own Your Presence</span>
            <h2 className="section-heading__title">Own Your Digital Presence, Don't Depend on One Platform</h2>
          </div>
          <ScrollReveal>
            <div className="hh-compare__panels">
              <div className="hh-compare__panel hh-compare__panel--thirdparty glass-card">
                <span className="hh-compare__head"><HospitalityIcon name="compass" size={16} /> Third-Party Platforms</span>
                <ul>
                  {COMPARISON.thirdParty.map((item) => (
                    <li key={item.label}><HospitalityIcon name={item.icon} size={14} />{item.label}</li>
                  ))}
                </ul>
              </div>
              <span className="hh-compare__vs" aria-hidden="true">VS</span>
              <div className="hh-compare__panel hh-compare__panel--owned glass-card">
                <span className="hh-compare__head"><HospitalityIcon name="shield" size={16} /> Owned Channels</span>
                <ul>
                  {COMPARISON.owned.map((item) => (
                    <li key={item.label}><HospitalityIcon name={item.icon} size={14} />{item.label}</li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <p className="hh-compare__note">
              Third-party platforms like OTAs drive bookings and visibility, they are an important part of hospitality marketing. The goal is not to replace them, but to also build channels you own, your website, your Google Business Profile, your content, and your direct booking paths, so you are not entirely dependent on any single platform.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* MADURAI HOSPITALITY */}
      <section className="section hh-madurai">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Madurai Focus</span>
            <h2 className="section-heading__title">Capture Hospitality Demand in Madurai</h2>
          </div>
          <ScrollReveal>
            <div className="hh-madurai__card glass-card">
              <p className="hh-madurai__intro">
                Madurai attracts temple visitors, cultural tourists, business travellers, and transit guests, creating consistent local search demand for hotels, restaurants, and hospitality services. Travellers searching for accommodation and dining options in Madurai are high-intent searchers ready to enquire or book.
              </p>
              <div className="hh-madurai__searches">
                {['hotels in Madurai', 'hotel near Meenakshi Temple', 'restaurants near Meenakshi Temple', 'best hotels in Madurai', 'budget hotel near Madurai railway station'].map((query, index) => (
                  <span key={query} className="hh-madurai__search" style={{ animationDelay: `${index * 80}ms` }}>
                    <HospitalityIcon name="search" size={14} />{query}
                  </span>
                ))}
              </div>
              <p className="hh-madurai__text">
                Tourism and pilgrimage demand create local search opportunities for hospitality businesses across Madurai. We help hotels, restaurants, and hospitality services rank for these high-intent queries, ensuring your property appears when travellers are actively searching for accommodation and dining options in the city.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* AI SEARCH */}
      <section className="section hh-ai">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">AI Search</span>
            <h2 className="section-heading__title">Be Visible When Travellers Ask AI</h2>
          </div>
          <ScrollReveal>
            <p className="hh-ai__intro">
              Travellers increasingly use AI tools like ChatGPT, Perplexity, and Google AI Overviews to research destinations, find hotel recommendations, and discover restaurants. To be visible in these results, your property needs clear entity signals, verified information, structured content, and authentic reviews across platforms.
            </p>
          </ScrollReveal>
          <div className="hh-ai__channels">
            {['Google AI Overviews', 'ChatGPT', 'Perplexity'].map((channel, index) => (
              <span key={channel} className="hh-ai__channel" style={{ animationDelay: `${index * 80}ms` }}>
                <span className="hh-ai__channel-dot" aria-hidden="true" />{channel}
              </span>
            ))}
          </div>
          <ScrollReveal>
            <div className="hh-ai__signals">
              {[
                { icon: 'building', label: 'Entity Signals' },
                { icon: 'mappin', label: 'Location & Category' },
                { icon: 'star', label: 'Amenities & Services' },
                { icon: 'book', label: 'Reviews & Content' },
                { icon: 'code', label: 'Schema & NAP' },
              ].map((signal) => (
                <div key={signal.label} className="hh-ai__signal glass-card">
                  <span className="hh-ai__signal-icon" aria-hidden="true"><HospitalityIcon name={signal.icon} size={20} /></span>
                  <span className="hh-ai__signal-label">{signal.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <p className="hh-ai__note">
              We do not promise AI will recommend your property. We ensure the digital signals that AI systems reference are accurate, well-structured, and complete.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CONTENT STRATEGY */}
      <section className="section hh-content">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Content Strategy</span>
            <h2 className="section-heading__title">Content That Sells the Experience</h2>
          </div>
          <ScrollReveal>
            <p className="hh-content__intro">
              Hospitality content is not just information, it is the digital version of your property's experience. The right content helps travellers imagine their stay, understand your offerings, and feel confident choosing your property.
            </p>
          </ScrollReveal>
          <div className="hh-content__grid">
            {CONTENT_PILLARS.map((pillar, index) => (
              <ScrollReveal key={pillar.label} delay={index * 80}>
                <div className="hh-content-card glass-card">
                  <span className="hh-content-card__icon" aria-hidden="true"><HospitalityIcon name={pillar.icon} size={24} /></span>
                  <h3 className="hh-content-card__title">{pillar.label}</h3>
                  <p className="hh-content-card__text">{pillar.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* MARKETING FUNNEL */}
      <section className="section hh-funnel">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">The Funnel</span>
            <h2 className="section-heading__title">The Hospitality Marketing Funnel</h2>
          </div>
          <ScrollReveal>
            <p className="hh-funnel__intro">
              Every marketing activity connects to a clear funnel, from first search to confirmed booking. Understanding this flow ensures every channel works together to drive measurable results.
            </p>
          </ScrollReveal>
          <div className="hh-funnel__grid">
            {FUNNEL.map((step, index) => {
              const isLast = index === FUNNEL.length - 1
              const colors = ['icon-badge--purple', 'icon-badge--blue', 'icon-badge--cyan', 'icon-badge--pink', 'icon-badge--green', 'icon-badge--gold']
              return (
                <ScrollReveal key={step.label} delay={index * 60}>
                  <div className={cx('hh-funnel__card', 'glass-card', isLast && 'hh-funnel__card--final')}>
                    <div className="hh-funnel__card-top">
                      <span className="hh-funnel__step-num">0{index + 1}</span>
                      <span className={cx('hh-funnel__icon', 'icon-badge', colors[index % colors.length])} aria-hidden="true">
                        <HospitalityIcon name={step.icon} size={18} />
                      </span>
                    </div>
                    <h3 className="hh-funnel__card-title">{step.label}</h3>
                    <p className="hh-funnel__card-sub">{step.sub}</p>
                    {isLast && <span className="hh-funnel__goal-badge">Goal Achieved</span>}
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section hh-faq">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">FAQ</span>
            <h2 className="section-heading__title">Frequently Asked Questions, Hospitality &amp; Hotels</h2>
          </div>
          <FaqAccordion faqs={FAQS} />
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="section hh-locations">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Coverage</span>
            <h2 className="section-heading__title">Hospitality Digital Marketing Across Tamil Nadu &amp; Malaysia</h2>
          </div>
          <div className="hh-locations__grid">
            <ScrollReveal className="hh-locations__cell">
              <div className="hh-location-card glass-card">
                <span className="hh-location-card__icon" aria-hidden="true"><HospitalityIcon name="mappin" size={26} /></span>
                <h3 className="hh-location-card__title">Tamil Nadu</h3>
                <p className="hh-location-card__text">
                  From Madurai to Coimbatore and Chennai, we help hotels, restaurants, and hospitality businesses rank for traveller-intent searches in the cities where guests are looking, with campaigns matched to local and regional search patterns.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal className="hh-locations__cell" delay={100}>
              <div className="hh-location-card glass-card">
                <span className="hh-location-card__icon" aria-hidden="true"><HospitalityIcon name="globe" size={26} /></span>
                <h3 className="hh-location-card__title">Malaysia</h3>
                <p className="hh-location-card__text">
                  For hospitality businesses and hotels serving Malaysian travellers and international guests, we build campaigns tuned to local search intent and the platforms Malaysian audiences use, including strategies adapted for multi-location properties.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* RELATED INDUSTRIES */}
      <section className="section hh-related">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Explore More</span>
            <h2 className="section-heading__title">Related Industries</h2>
          </div>
          <div className="hh-related__links">
            <Link to="/industries/retail-ecommerce/" className="related-content__link">Retail &amp; E-Commerce</Link>
            <Link to="/industries/healthcare-clinics/" className="related-content__link">Healthcare &amp; Clinics</Link>
            <Link to="/industries/education-training/" className="related-content__link">Education &amp; Training</Link>
            <Link to="/industries/real-estate-builders/" className="related-content__link">Real Estate &amp; Builders</Link>
            <Link to="/industries/" className="related-content__link">All Industries</Link>
            <Link to="/services/" className="related-content__link">All Services</Link>
            <Link to="/contact/" className="related-content__link">Contact</Link>
            <Link to="/faq/" className="related-content__link">FAQ</Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
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
