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
  serviceSchema,
  faqPageSchema,
  breadcrumbListSchema,
} from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import {
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
  SITE_URL,
} from '../../utils/constants.js'
import '../../styles/templates/service-template.css'
import '../../styles/pages/local-seo.css'
import localSeoHeroImg from '../../assets/images/services/03LOCALSEO.webp'

/* ============================================================
   CONTENT, Approved Static Savvy Media Local SEO Page Content
   ============================================================ */

const PAGE_TITLE =
  'Local SEO Services, Google Maps & GBP Optimization | Static Savvy Media'

const PAGE_DESCRIPTION =
  'Rank in Google Maps and local search for your city. GBP optimization, citation building, review management, and local content for Madurai, Thoothukudi, and Malaysia businesses.'

const HERO_SUBTITLE =
  'When someone in Madurai searches "digital marketing agency near me," Google shows a map with three businesses. If yours is not one of them, that client goes to a competitor, regardless of how good your service is. Local SEO makes sure your business appears in that map, in that moment, for the queries your clients are actually typing.'

const SERVICE_AREAS = [
  {
    number: '01',
    title: 'Google Business Profile (GBP) Optimization',
    icon: 'gbp',
    content:
      'Your GBP is the single most important asset in local search. We optimize every field: business category, services listed, description with target keywords embedded naturally, opening hours, photos, Q&A section, and post cadence. We ensure your GBP address matches your website schema and all directory listings character-for-character, NAP inconsistency is the most common cause of suppressed local rankings.',
  },
  {
    number: '02',
    title: 'Local Citation Building',
    icon: 'citation',
    content:
      'Citations are mentions of your business name, address, and phone number on third-party websites. More consistent citations on authoritative directories mean more confidence from Google that your business is real and established. We build citations on Justdial, IndiaMART, Sulekha, Google Maps, Bing Places, and relevant industry directories. For Malaysia clients: iProperty, Mymakan, and Malaysia-specific business directories.',
  },
  {
    number: '03',
    title: 'Review Strategy & Management',
    icon: 'review',
    content:
      'Review volume and rating are direct local ranking signals. We build a systematic process for requesting reviews from satisfied customers through WhatsApp follow-ups, QR codes at point of sale, and post-service messaging. We also help you respond to reviews, positive and negative, in ways that build trust and demonstrate responsiveness to Google’s local algorithm.',
  },
  {
    number: '04',
    title: 'Local Landing Pages',
    icon: 'landing',
    content:
      'A generic "Services" page does not rank for "digital marketing agency Madurai." Location-specific landing pages, with local market context, service availability in that city, and local testimonials, are what local search algorithms reward. We build these for every city where you operate.',
  },
]

const CITATION_PLATFORMS_INDIA = [
  'Justdial',
  'IndiaMART',
  'Sulekha',
  'Google Maps',
  'Bing Places',
  'Industry Directories',
]

const CITATION_PLATFORMS_MALAYSIA = [
  'iProperty',
  'Mymakan',
  'Malaysia Directories',
]

const ECOSYSTEM_STEPS = [
  'Google Business Profile',
  'NAP Consistency',
  'Local Citations',
  'Reviews',
  'Location Pages',
  'Local Search Visibility',
  'Qualified Local Enquiries',
]

const LOCATIONS = [
  { name: 'Madurai', path: '/services/local-seo/madurai/' },
  { name: 'Thoothukudi', path: '/services/local-seo/thoothukudi/' },
  { name: 'Malaysia', path: '/services/local-seo/malaysia/' },
]

const FAQS = [
  {
    question: 'What is the difference between SEO and Local SEO?',
    answer:
      'Standard SEO targets any search query regardless of location. Local SEO specifically targets queries with local intent, "near me," "in Madurai", and focuses on the Google Maps pack (the three-business box above traditional results for local queries). Most local businesses need both, but Local SEO is usually the higher priority for brick-and-mortar and service-area businesses.',
  },
  {
    question: 'How long does it take to rank in Google Maps?',
    answer:
      'For low-competition local queries, GBP optimization alone can produce visible movement within 4–8 weeks. For competitive categories in larger cities, expect 3–6 months of consistent effort before reaching the top 3. Citation building and review volume accumulation are the main time drivers.',
  },
  {
    question: 'Do I need a separate GBP for each location?',
    answer:
      'Yes. Each physical location (Madurai, Thoothukudi, Malaysia) needs its own verified GBP with a location-specific address. You cannot rank in Madurai’s local pack with a Thoothukudi GBP. We set up and verify each GBP separately and optimize each for its local market.',
  },
  {
    question: 'What if a competitor is leaving fake negative reviews?',
    answer:
      'We help you identify fake reviews, flag them to Google through proper reporting channels, and craft professional responses demonstrating to genuine customers that the review is not representative. Proactive review volume building is the best long-term defence, a business with 80 real 4.8-star reviews is much harder to damage than one with 10.',
  },
]

const RELATED_SERVICES = [
  { name: 'SEO', path: '/services/seo/' },
  { name: 'GEO & AEO', path: '/services/geo-aeo-ai-search/' },
  { name: 'Google Ads', path: '/services/google-ads/' },
]

const RELATED_LOCATIONS = [
  { name: 'Madurai', path: '/locations/madurai/' },
  { name: 'Thoothukudi', path: '/locations/thoothukudi/' },
  { name: 'Malaysia', path: '/locations/malaysia/' },
]

const CTA = {
  title: 'Get your business into Google’s local pack.',
  subtitle:
    'Message us on WhatsApp for a free local presence audit, we will tell you exactly what it would take to rank in the top 3 for your city.',
  label: 'WhatsApp for Local SEO Audit',
}

/* ============================================================
   COMPONENT
   ============================================================ */

export default function LocalSEO() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/services/local-seo/`,
      ogType: 'website',
    })

    const faqEntities = FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    }))

    const localSeoService = serviceSchema({
      serviceType: 'Local SEO Services',
      name: 'Local SEO Services, Static Savvy Media',
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/services/local-seo/`,
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
        { name: 'Local SEO', item: `${SITE_URL}/services/local-seo/` },
      ],
    })

    const scripts = [
      localSeoService,
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
    <div className="service-template local-seo">
      <style>{`
        .local-seo .local-seo-covers__grid > *:nth-child(1) .local-seo-service-card__icon {
          background: linear-gradient(135deg, #06b6d4, #0891b2) !important;
          box-shadow: 0 0 18px rgba(6, 182, 212, 0.45) !important;
        }

        .local-seo .local-seo-covers__grid > *:nth-child(2) .local-seo-service-card__icon {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8) !important;
          box-shadow: 0 0 18px rgba(59, 130, 246, 0.45) !important;
        }

        .local-seo .local-seo-covers__grid > *:nth-child(3) .local-seo-service-card__icon {
          background: linear-gradient(135deg, #eab308, #ca8a04) !important;
          box-shadow: 0 0 18px rgba(234, 179, 8, 0.45) !important;
        }

        .local-seo .local-seo-covers__grid > *:nth-child(4) .local-seo-service-card__icon {
          background: linear-gradient(135deg, #a855f7, #7c3aed) !important;
          box-shadow: 0 0 18px rgba(168, 85, 247, 0.45) !important;
        }
      `}</style>

      {/* ---- Breadcrumbs ---- */}
      <Breadcrumbs />

      {/* ---- Hero ---- */}
      <HeroSection
        layout="two-column"
        eyebrow="Service"
        title="Local SEO Services, Dominate Google Maps in Your City"
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
          <img src={localSeoHeroImg} width={1536} height={1024} fetchPriority="high" alt="Local SEO Services" className="hero__image" />
        </div>
      </HeroSection>

      {/* ---- What Local SEO Covers ---- */}
      <section className="section local-seo-covers">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Services</span>
            <h2 className="section-heading__title">What Local SEO Covers</h2>
          </div>
          <div className="local-seo-covers__grid">
            {SERVICE_AREAS.map((area, index) => (
              <ScrollReveal key={area.number} delay={index * 80}>
                <article className="local-seo-service-card glass-card">
                  <div className="local-seo-service-card__top">
                    <div
                      className="local-seo-service-card__icon"
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
                      {area.icon === 'gbp' && (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      )}
                      {area.icon === 'citation' && (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                        </svg>
                      )}
                      {area.icon === 'review' && (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      )}
                      {area.icon === 'landing' && (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <line x1="3" y1="9" x2="21" y2="9" />
                          <path d="M9 14l2 2 4-4" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <h3 className="local-seo-service-card__title">{area.title}</h3>
                  <p className="local-seo-service-card__text">{area.content}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- NAP Consistency Visual ---- */}
      <section className="section local-seo-nap">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Foundation</span>
            <h2 className="section-heading__title">NAP Consistency</h2>
          </div>
          <ScrollReveal>
            <div className="local-seo-nap__card glass-card gradient-border">
              <div className="local-seo-nap__identity">
                <div className="local-seo-nap__field">
                  <span className="local-seo-nap__label">Business Name</span>
                  <span className="local-seo-nap__value">Your Business Name</span>
                </div>
                <div className="local-seo-nap__field">
                  <span className="local-seo-nap__label">Address</span>
                  <span className="local-seo-nap__value">Your Business Address</span>
                </div>
                <div className="local-seo-nap__field">
                  <span className="local-seo-nap__label">Phone</span>
                  <span className="local-seo-nap__value">Your Phone Number</span>
                </div>
              </div>
              <div className="local-seo-nap__connector" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
              </div>
              <div className="local-seo-nap__platforms">
                <span className="local-seo-nap__platform">Website</span>
                <span className="local-seo-nap__platform">GBP</span>
                <span className="local-seo-nap__platform">Directories</span>
                <span className="local-seo-nap__platform">Location Pages</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- Local Citation Platforms ---- */}
      <section className="section local-seo-citations">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Citations</span>
            <h2 className="section-heading__title">Citation Platforms We Build On</h2>
          </div>
          <div className="local-seo-citations__groups">
            <ScrollReveal>
              <div className="local-seo-citations__group">
                <h3 className="local-seo-citations__group-title">India</h3>
                <div className="local-seo-citations__badges">
                  {CITATION_PLATFORMS_INDIA.map((platform) => (
                    <span key={platform} className="local-seo-citations__badge glass-card">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="local-seo-citations__group">
                <h3 className="local-seo-citations__group-title">Malaysia</h3>
                <div className="local-seo-citations__badges">
                  {CITATION_PLATFORMS_MALAYSIA.map((platform) => (
                    <span key={platform} className="local-seo-citations__badge glass-card">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ---- Local SEO Ecosystem ---- */}
      <section className="section local-seo-ecosystem">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Ecosystem</span>
            <h2 className="section-heading__title">How Local SEO Works</h2>
          </div>
          <ScrollReveal>
            <div className="local-seo-ecosystem__flow">
              {ECOSYSTEM_STEPS.map((step, index) => (
                <div key={step} className="local-seo-ecosystem__step-wrapper">
                  <div className="local-seo-ecosystem__step glass-card">
                    <span className="local-seo-ecosystem__step-number" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="local-seo-ecosystem__step-text">{step}</span>
                  </div>
                  {index < ECOSYSTEM_STEPS.length - 1 && (
                    <div className="local-seo-ecosystem__arrow" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <polyline points="19 12 12 19 5 12" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- Location Coverage ---- */}
      <section className="section local-seo-locations">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Locations</span>
            <h2 className="section-heading__title">Local SEO Coverage</h2>
          </div>
          <div className="local-seo-locations__grid">
            {LOCATIONS.map((location, index) => (
              <ScrollReveal key={location.path} delay={index * 80}>
                <Link to={location.path} className="local-seo-locations__card glass-card gradient-border">
                  <div className="local-seo-locations__pin" aria-hidden="true">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <h3 className="local-seo-locations__name">{location.name}</h3>
                  <span className="local-seo-locations__link">
                    View Local SEO
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <FAQSection
        eyebrow="FAQ"
        title="Local SEO, Frequently Asked Questions"
        faqs={FAQS}
      />

      {/* ---- Related Content ---- */}
      <section className="section related-content">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Explore More</span>
            <h2 className="section-heading__title">Related Services &amp; Locations</h2>
          </div>

          <div className="related-content__group">
            <h3 className="related-content__group-title">Related Services</h3>
            <div className="related-content__links">
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

          <div className="related-content__group">
            <h3 className="related-content__group-title">Locations</h3>
            <div className="related-content__links">
              {RELATED_LOCATIONS.map((item) => (
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
            </div>
          </div>
        </div>
      </section>


      {/* ---- Final CTA ---- */}
      <CTASection
        title={CTA.title}
        subtitle={CTA.subtitle}
        primaryLabel={CTA.label}
        primaryHref={whatsappHref}
      />
      <ContactFormSection />
    </div>
  )
}
