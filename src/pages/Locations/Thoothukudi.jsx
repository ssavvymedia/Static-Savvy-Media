import { useEffect, useRef } from 'react'
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
  localBusinessSchema,
  faqPageSchema,
  breadcrumbListSchema,
} from '../../utils/schema.js'
import { buildWhatsAppLink, cx } from '../../utils/helpers.js'
import {
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
  SITE_URL,
} from '../../utils/constants.js'
import '../../styles/pages/thoothukudi.css'
import thoothukudiHeroImg from '../../assets/images/locations/03thoothukudi.webp'

/* ============================================================
   CONTENT, Approved Static Savvy Media Thoothukudi Page Content
   ============================================================ */

const PAGE_TITLE =
  'Digital Marketing in Thoothukudi (Tuticorin), SEO, Ads & More | Static Savvy Media'

const PAGE_DESCRIPTION =
  "Static Savvy Media serves Thoothukudi businesses with SEO, Local SEO, Google Ads, and social media marketing. Port city specialists, industrial, marine, manufacturing, and retail. WhatsApp: +91-99440-40345."

const HERO_EYEBROW = 'Thoothukudi • Tuticorin • Port City'

const HERO_SUBTITLE =
  'Thoothukudi is a port city with a distinct economic character, built on marine industries, chemical manufacturing, fishing, and trade through one of India’s most important deep-water ports. The businesses that thrive here are often B2B-focused, export-oriented, or serving a specialized industrial client base. We understand this, and we build digital marketing strategies that fit the Thoothukudi economy, not generic campaigns copied from Chennai or Coimbatore playbooks.'

const SERVICES = [
  {
    number: '01',
    title: 'SEO for Thoothukudi Businesses',
    text: 'Local and regional keyword targeting for Tamil Nadu’s port city market.',
    path: '/services/seo/thoothukudi/',
    icon: 'seo',
    color: 'icon-badge--purple',
  },
  {
    number: '02',
    title: 'Local SEO & GBP Optimization',
    text: 'Rank in the Thoothukudi Google Maps pack for your service category.',
    path: '/services/local-seo/thoothukudi/',
    icon: 'local',
    color: 'icon-badge--blue',
  },
  {
    number: '03',
    title: 'GEO & AEO',
    text: 'Particularly valuable for B2B businesses where procurement teams now use AI tools for vendor research.',
    path: '/services/geo-aeo-ai-search/',
    icon: 'geo',
    color: 'icon-badge--cyan',
  },
  {
    number: '04',
    title: 'Google Ads',
    text: 'Industrial, marine, and manufacturing categories with B2B targeting.',
    path: '/services/google-ads/thoothukudi/',
    icon: 'ads',
    color: 'icon-badge--pink',
  },
  {
    number: '05',
    title: 'Social Media',
    text: 'LinkedIn and Facebook for B2B; Instagram for retail and hospitality.',
    path: '/services/social-media-marketing/',
    icon: 'social',
    color: 'icon-badge--orange',
  },
  {
    number: '06',
    title: 'Website Design & Development',
    text: 'SEO-ready websites for Thoothukudi businesses.',
    path: '/services/website-design-development/',
    icon: 'web',
    color: 'icon-badge--green',
  },
  {
    number: '07',
    title: 'AI Business Automation',
    text: 'Workflow tools for port logistics, manufacturing, and service businesses.',
    path: '/services/ai-business-automation/',
    icon: 'automation',
    color: 'icon-badge--gold',
  },
]

const INDUSTRIES = [
  {
    title: 'Port, Shipping & Logistics',
    text: "Thoothukudi Port is one of India’s busiest. We help shipping agencies, freight forwarders, customs brokers, and logistics businesses build professional digital presence and generate inbound enquiries from exporters and importers.",
    icon: 'port',
    color: 'icon-badge--purple',
  },
  {
    title: 'Chemical & Industrial Manufacturing',
    text: "The SIPCOT industrial estate and surrounding areas host a significant chemical and industrial manufacturing cluster. We build B2B digital marketing for manufacturers targeting national and international buyers, including LinkedIn campaigns, website content that converts procurement teams, and AI search visibility.",
    icon: 'industrial',
    color: 'icon-badge--blue',
  },
  {
    title: 'Fishing & Marine',
    text: "From mechanized fishing boats to seafood export businesses, Thoothukudi’s marine sector is increasingly reaching buyers and suppliers online. We help marine businesses build the digital presence needed to access modern B2B and B2C channels.",
    icon: 'marine',
    color: 'icon-badge--cyan',
  },
]

const OFFICE_NOTE =
  'Our primary office is in Madurai. We serve Thoothukudi clients remotely with in-person meetings available by appointment. For most digital marketing work, remote delivery is as effective as in-person, and we have not had a Thoothukudi client who found the arrangement limiting.'

const FAQS = [
  {
    question: 'Do you have a physical office in Thoothukudi?',
    answer:
      'Our primary office is in Madurai. We serve Thoothukudi clients remotely with in-person meetings available by appointment. For most digital marketing work, remote delivery is as effective as in-person, and we have not had a Thoothukudi client who found the arrangement limiting.',
  },
  {
    question: 'Can you help B2B industrial businesses generate leads online?',
    answer:
      "Yes, and this is a significant opportunity for Thoothukudi’s industrial sector. Most competitors are not investing in B2B digital marketing. A well-built website, Google Ads campaign for industrial keywords, and LinkedIn presence can generate consistent inbound enquiries from buyers who would otherwise not have found you.",
  },
  {
    question: 'Is digital marketing useful for businesses that operate primarily on relationships and referrals?',
    answer:
      "Yes, for a specific reason: when your referral-generated lead searches your name online before calling, what they find will determine whether they follow through. A professional website, positive Google reviews, and a strong LinkedIn presence are the trust signals that convert a referral into a confirmed meeting.",
  },
]

const RELATED_SERVICES = [
  { name: 'SEO', path: '/services/seo/' },
  { name: 'Local SEO', path: '/services/local-seo/' },
  { name: 'GEO & AEO, AI Search', path: '/services/geo-aeo-ai-search/' },
  { name: 'Google Ads', path: '/services/google-ads/' },
  { name: 'Social Media Marketing', path: '/services/social-media-marketing/' },
  { name: 'Website Design & Development', path: '/services/website-design-development/' },
  { name: 'AI Business Automation', path: '/services/ai-business-automation/' },
]

const OTHER_LOCATIONS = [
  { name: 'Madurai', path: '/locations/madurai/' },
  { name: 'Malaysia', path: '/locations/malaysia/' },
  { name: 'All Locations', path: '/locations/' },
]

/* ============================================================
   COMPONENT
   ============================================================ */

export default function Thoothukudi() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/locations/thoothukudi/`,
      ogType: 'website',
    })

    const faqEntities = FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    }))

    const localBiz = localBusinessSchema({
      name: 'Static Savvy Media, Thoothukudi',
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/locations/thoothukudi/`,
      telephone: '+919944040345',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '90, Peria Kadai St, Matha Koil',
        addressLocality: 'Thoothukudi',
        addressRegion: 'Tamil Nadu',
        postalCode: '628001',
        addressCountry: 'IN',
      },
      areaServed: [
        { '@type': 'City', name: 'Thoothukudi' },
        { '@type': 'State', name: 'Tamil Nadu' },
      ],
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Locations', item: `${SITE_URL}/locations/` },
        { name: 'Thoothukudi', item: `${SITE_URL}/locations/thoothukudi/` },
      ],
    })

    const scripts = [
      localBiz,
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
    <div className="thoothukudi-page">
      {/* ---- Breadcrumbs ---- */}
      <Breadcrumbs />

      {/* ---- Hero ---- */}
      <HeroSection
        layout="two-column"
        eyebrow={HERO_EYEBROW}
        title="Digital Marketing in Thoothukudi (Tuticorin), Growing the Port City’s Businesses Online"
        subtitle={HERO_SUBTITLE}
        actions={
          <Button
            href={whatsappHref}
            variant="primary"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp: +91-99440-40345
          </Button>
        }
      >
        <div className="hero__visual-side">
          <img
            src={thoothukudiHeroImg}
            width={1536}
            height={1024}
            fetchPriority="high"
            alt="Digital Marketing in Thoothukudi (Tuticorin)"
            className="hero__image"
          />
        </div>
      </HeroSection>

      {/* ---- Digital Marketing Services in Thoothukudi ---- */}
      <section className="section thoothukudi-services">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">What We Deliver</span>
            <h2 className="section-heading__title">Digital Marketing Services in Thoothukudi</h2>
          </div>
          <div className="thoothukudi-services__grid">
            {SERVICES.map((service, index) => (
              <ScrollReveal key={service.number} delay={index * 60}>
                <article className="thoothukudi-service-card glass-card">
                  <div className="thoothukudi-service-card__top">
                    <span className={cx('thoothukudi-service-card__badge', 'icon-badge', service.color)} aria-hidden="true">
                      {service.icon === 'seo' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                      )}
                      {service.icon === 'local' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      )}
                      {service.icon === 'geo' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                        </svg>
                      )}
                      {service.icon === 'ads' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="12" cy="12" r="6" />
                          <circle cx="12" cy="12" r="2" />
                        </svg>
                      )}
                      {service.icon === 'social' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="18" cy="5" r="3" />
                          <circle cx="6" cy="12" r="3" />
                          <circle cx="18" cy="19" r="3" />
                          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                        </svg>
                      )}
                      {service.icon === 'web' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                      )}
                      {service.icon === 'automation' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="4" y="4" width="16" height="16" rx="2" />
                          <rect x="9" y="9" width="6" height="6" />
                          <line x1="9" y1="1" x2="9" y2="4" />
                          <line x1="15" y1="1" x2="15" y2="4" />
                          <line x1="9" y1="20" x2="9" y2="23" />
                          <line x1="15" y1="20" x2="15" y2="23" />
                          <line x1="20" y1="9" x2="23" y2="9" />
                          <line x1="20" y1="15" x2="23" y2="15" />
                          <line x1="1" y1="9" x2="4" y2="9" />
                          <line x1="1" y1="15" x2="4" y2="15" />
                        </svg>
                      )}
                    </span>
                    <span className="thoothukudi-service-card__number" aria-hidden="true">
                      {service.number}
                    </span>
                  </div>
                  <h3 className="thoothukudi-service-card__title">
                    <Link to={service.path}>{service.title}</Link>
                  </h3>
                  <p className="thoothukudi-service-card__text">{service.text}</p>
                  <Link to={service.path} className="thoothukudi-service-card__link">
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
                  </Link>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Industries We Serve in Thoothukudi ---- */}
      <section className="section thoothukudi-industries section--alt">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Industries</span>
            <h2 className="section-heading__title">Industries We Serve in Thoothukudi</h2>
          </div>
          <div className="thoothukudi-industries__grid">
            {INDUSTRIES.map((industry, index) => (
              <ScrollReveal key={industry.title} delay={index * 80}>
                <article className="thoothukudi-industry-card glass-card">
                  <div className={cx('thoothukudi-industry-card__icon', 'icon-badge', industry.color)} aria-hidden="true">
                    {industry.icon === 'port' && (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 20h20" />
                        <path d="M4 20V8l4-4h8l4 4v12" />
                        <path d="M9 20v-4h6v4" />
                        <path d="M12 4v4" />
                        <path d="M8 12h8" />
                      </svg>
                    )}
                    {industry.icon === 'industrial' && (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 20h20" />
                        <path d="M5 20V8l5-4 5 4v12" />
                        <path d="M10 12h4" />
                        <path d="M10 16h4" />
                        <path d="M15 12l4-2v10" />
                        <circle cx="17" cy="14" r="1" />
                      </svg>
                    )}
                    {industry.icon === 'marine' && (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 20c2-1 4-2 6-2s4 1 6 2 4 1 6 0" />
                        <path d="M4 16l2-8h12l2 8" />
                        <path d="M10 8V4h4v4" />
                        <path d="M12 4v-2" />
                        <path d="M8 12h8" />
                      </svg>
                    )}
                  </div>
                  <h3 className="thoothukudi-industry-card__title">{industry.title}</h3>
                  <p className="thoothukudi-industry-card__text">{industry.text}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Serving Thoothukudi Office ---- */}
      <section className="section thoothukudi-office">
        <div className="container">
          <div className="thoothukudi-office__inner glass-card gradient-border">
            <div className="thoothukudi-office__visual" aria-hidden="true">
              <div className="thoothukudi-office__route">
                <div className="thoothukudi-office__city thoothukudi-office__city--madurai">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Madurai HQ</span>
                </div>
                <div className="thoothukudi-office__connector" aria-hidden="true">
                  <svg width="48" height="16" viewBox="0 0 48 16" fill="none">
                    <path d="M0 8h44M40 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="thoothukudi-office__city thoothukudi-office__city--thoothukudi">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Thoothukudi Office</span>
                </div>
              </div>
            </div>
            <div className="thoothukudi-office__details">
              <h2 className="thoothukudi-office__title">Thoothukudi Office &amp; Presence</h2>
              <div className="thoothukudi-office__card glass-card" style={{ marginTop: '1.25rem', padding: '1.5rem' }}>
                <h3 className="thoothukudi-office__name" style={{ fontSize: '1.15rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.75rem' }}>Static Savvy Media, Thoothukudi</h3>
                <p className="thoothukudi-office__address" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#22d3ee', flexShrink: 0, marginTop: '2px' }} aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>
                    90, Peria Kadai St, Matha Koil,<br />
                    Thoothukudi - 628001
                  </span>
                </p>
                <p className="thoothukudi-office__text" style={{ marginTop: '0.85rem' }}>{OFFICE_NOTE}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Related Content ---- */}
      <section className="section thoothukudi-related section--alt">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Explore More</span>
            <h2 className="section-heading__title">Related Services &amp; Locations</h2>
          </div>

          <div className="thoothukudi-related__group">
            <h3 className="thoothukudi-related__group-title">Our Services</h3>
            <div className="thoothukudi-related__links">
              {RELATED_SERVICES.map((item) => (
                <Link key={item.path} to={item.path} className="thoothukudi-related__link">
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
            </div>
          </div>

          <div className="thoothukudi-related__group">
            <h3 className="thoothukudi-related__group-title">Other Locations</h3>
            <div className="thoothukudi-related__links">
              {OTHER_LOCATIONS.map((item) => (
                <Link key={item.path} to={item.path} className="thoothukudi-related__link">
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
            </div>
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <FAQSection
        eyebrow="FAQ"
        title="Thoothukudi, Frequently Asked Questions"
        faqs={FAQS}
      />

      {/* ---- Final CTA ---- */}
      <CTASection
        title="Grow your Thoothukudi business with digital marketing that understands the port city economy."
        subtitle=""
        primaryLabel="WhatsApp: +91-99440-40345"
        primaryHref={whatsappHref}
      />
      <ContactFormSection />
    </div>
  )
}
