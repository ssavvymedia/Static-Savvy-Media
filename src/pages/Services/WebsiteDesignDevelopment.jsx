import { useEffect, useRef } from 'react'
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
import { buildWhatsAppLink } from '../../utils/helpers.js'
import {
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
  SITE_URL,
} from '../../utils/constants.js'
import '../../styles/templates/service-template.css'
import '../../styles/pages/website-design-development.css'
import websiteHeroImg from '../../assets/images/services/06website.webp'

/* ============================================================
   CONTENT, Approved Static Savvy Media Website Design & Dev
   ============================================================ */

const PAGE_TITLE =
  'Website Design & Development Services | India & Malaysia | Static Savvy Media'

const PAGE_DESCRIPTION =
  'Custom website design and development in Madurai. SEO-ready, Core Web Vitals optimised, mobile-first. WordPress and Next.js builds that rank, load fast, and convert visitors into WhatsApp enquiries.'

const HERO_SUBTITLE =
  'A website that looks good but does not rank, load fast, or convert is an expensive brochure. We build websites with three non-negotiable outcomes: ranking in search, loading fast on 4G mobile, and converting visitors into WhatsApp enquiries. Everything else is secondary.'

const BUILD_TYPES = [
  {
    number: '01',
    title: 'Business websites',
    icon: 'business',
    content:
      '5–30 page sites for service businesses, agencies, consultants, and professional practices. WordPress or Next.js depending on your technical needs.',
  },
  {
    number: '02',
    title: 'E-commerce websites',
    icon: 'ecommerce',
    content:
      'WooCommerce or Next.js + Shopify headless for businesses selling products online. Mobile-first checkout and payment gateway setup.',
  },
  {
    number: '03',
    title: 'Location + service page systems',
    icon: 'locations',
    content:
      'Scalable architectures for businesses with multiple locations or service lines, built to add pages without developer dependency as you grow.',
  },
  {
    number: '04',
    title: 'Landing pages',
    icon: 'landing',
    content:
      'Conversion-optimised single-purpose pages for Google Ads campaigns or product launches.',
  },
]

const BUILD_STANDARDS = [
  {
    number: '01',
    title: 'Core Web Vitals',
    icon: 'vitals',
    text: 'Core Web Vitals: LCP <2.5s, INP <200ms, CLS <0.1 on mobile, tested on real 4G network speeds',
  },
  {
    number: '02',
    title: 'Full SEO Foundation',
    icon: 'seo',
    text: 'Full SEO foundation: schema markup (Organization, Service, FAQPage, BreadcrumbList), canonical tags, hreflang, XML sitemap, robots.txt',
  },
  {
    number: '03',
    title: 'AI Crawler Accessible',
    icon: 'ai',
    text: 'AI crawler accessible: robots.txt explicitly allows GPTBot, PerplexityBot, ClaudeBot, Google-Extended',
  },
  {
    number: '04',
    title: 'WhatsApp CTA',
    icon: 'whatsapp',
    text: 'WhatsApp CTA integrated above the fold and after every primary content block',
  },
  {
    number: '05',
    title: 'Staging Environment',
    icon: 'staging',
    text: 'Staging environment: all builds tested before DNS cutover',
  },
  {
    number: '06',
    title: 'Client Owns the Code',
    icon: 'ownership',
    text: 'Client owns the code: all source code in a repository owned by the client, not the developer',
  },
  {
    number: '07',
    title: 'Analytics + WhatsApp Tracking',
    icon: 'tracking',
    text: 'GA4 + WhatsApp click event tracking installed and verified before launch',
  },
]

const WP_FEATURES = [
  'Faster to build',
  'Easier for non-technical teams',
  'Mature SEO plugin ecosystem',
  'Rank Math',
]

const NEXTJS_FEATURES = [
  'Better Core Web Vitals potential',
  'Custom schema control',
  'Requires experienced production developer',
]

const FAQS = [
  {
    question: 'WordPress or Next.js, which is right for my business?',
    answer:
      "The honest answer depends on your team's technical capability and your developer's experience. WordPress is faster to build, easier for non-technical teams to manage, and has a mature SEO plugin ecosystem (Rank Math). Next.js gives better Core Web Vitals and custom schema control, but only if your developer has shipped production Next.js sites before. A shaky Next.js build performs worse than a well-executed WordPress build. We advise honestly based on your situation.",
  },
  {
    question: 'How long does a website build take?',
    answer:
      'A 15–25 page business website typically takes 6–10 weeks from kickoff to launch, including content production. A 50+ page site with location and service matrix pages takes 10–14 weeks. The most common delay is content, having written, approved copy ready before the build starts cuts timelines by 30–40%.',
  },
  {
    question: 'Should I migrate away from Wix or Squarespace?',
    answer:
      "Yes, and we strongly recommend it. Wix's JavaScript rendering and shallow schema options actively suppress GEO and AEO visibility. Squarespace has similar limitations on structured data customisation. We manage the full migration including 301 redirects from every old URL to its new equivalent, this is where most migrations lose existing rankings, and we do not let that happen.",
  },
]

const RELATED_SERVICES = [
  { name: 'SEO', path: '/services/seo/' },
  { name: 'GEO & AEO', path: '/services/geo-aeo-ai-search/' },
  { name: 'Local SEO', path: '/services/local-seo/' },
  { name: 'Google Ads', path: '/services/google-ads/' },
  { name: 'Social Media Marketing', path: '/services/social-media-marketing/' },
  { name: 'AI Business Automation', path: '/services/ai-business-automation/' },
  { name: 'Corporate Photography & Video', path: '/services/corporate-photography-video/' },
  { name: 'AI Video Creation', path: '/services/ai-video-creation/' },
  { name: 'Product Photography & Creative Design', path: '/services/product-photography-creative-design/' },
]

const CTA = {
  title: 'Build a website that works as hard as you do.',
  subtitle:
    'Message us on WhatsApp to discuss your project. We will advise on the right platform, realistic timeline, and whether a rebuild or enhancement is the right starting point.',
  label: (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', verticalAlign: 'middle' }}>
      <WhatsAppIcon size={22} />
      <span>WhatsApp: +91-99440-40345</span>
    </span>
  ),
}

const PIPELINE_STEPS = [
  'Discovery',
  'Architecture',
  'Design',
  'Development',
  'SEO',
  'Staging',
  'Testing',
  'Launch',
  'Tracking',
]

/* ============================================================
   COMPONENT
   ============================================================ */

export default function WebsiteDesignDevelopment() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/services/website-design-development/`,
      ogType: 'website',
    })

    const faqEntities = FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    }))

    const webService = serviceSchema({
      serviceType: 'Website Design & Development',
      name: 'Website Design & Development, Static Savvy Media',
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/services/website-design-development/`,
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
        { name: 'Website Design & Development', item: `${SITE_URL}/services/website-design-development/` },
      ],
    })

    const scripts = [
      webService,
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
    <div className="service-template website-design">
      <style>{`
        .website-design .wdd-build__grid > *:nth-child(1) .wdd-build-card__icon {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8) !important;
          box-shadow: 0 0 18px rgba(59, 130, 246, 0.45) !important;
        }
        .website-design .wdd-build__grid > *:nth-child(2) .wdd-build-card__icon {
          background: linear-gradient(135deg, #f97316, #ea580c) !important;
          box-shadow: 0 0 18px rgba(249, 115, 22, 0.45) !important;
        }
        .website-design .wdd-build__grid > *:nth-child(3) .wdd-build-card__icon {
          background: linear-gradient(135deg, #06b6d4, #0891b2) !important;
          box-shadow: 0 0 18px rgba(6, 182, 212, 0.45) !important;
        }
        .website-design .wdd-build__grid > *:nth-child(4) .wdd-build-card__icon {
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
        title="Website Design & Development, Sites That Rank, Load Fast & Convert"
        subtitle={HERO_SUBTITLE}
        actions={
          <>
            <Button
              href={whatsappHref}
              variant="primary"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discuss Your Website Project
            </Button>
          </>
        }
      >
        <div className="hero__visual-side">
          <img src={websiteHeroImg} width={1536} height={1024} fetchPriority="high" alt="Website Design & Development" className="hero__image" />
        </div>
      </HeroSection>

      {/* ---- Performance Visual ---- */}
      <section className="section wdd-performance">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Outcomes</span>
            <h2 className="section-heading__title">Three Non-Negotiable Outcomes</h2>
          </div>
          <div className="wdd-performance__flow">
            <ScrollReveal>
              <div className="wdd-performance__step">
                <span className="wdd-performance__icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </span>
                <span className="wdd-performance__label">RANK</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div className="wdd-performance__arrow" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <div className="wdd-performance__step">
                <span className="wdd-performance__icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </span>
                <span className="wdd-performance__label">LOAD FAST</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={240}>
              <div className="wdd-performance__arrow" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={320}>
              <div className="wdd-performance__step">
                <span className="wdd-performance__icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="wdd-performance__label">CONVERT</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ---- What We Build ---- */}
      <section className="section wdd-build">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Builds</span>
            <h2 className="section-heading__title">What We Build</h2>
          </div>
          <div className="wdd-build__grid">
            {BUILD_TYPES.map((build, index) => (
              <ScrollReveal key={build.number} delay={index * 80}>
                <article className="wdd-build-card glass-card">
                  <div className="wdd-build-card__top">
                    <div
                      className="wdd-build-card__icon"
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
                      {build.icon === 'business' && (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                      )}
                      {build.icon === 'ecommerce' && (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="9" cy="21" r="1" />
                          <circle cx="20" cy="21" r="1" />
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                      )}
                      {build.icon === 'locations' && (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      )}
                      {build.icon === 'landing' && (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 3h18v18H3z" />
                          <path d="M3 9h18" />
                          <path d="M9 21V9" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <h3 className="wdd-build-card__title">{build.title}</h3>
                  <p className="wdd-build-card__text">{build.content}</p>
                  {/* Conceptual visual */}
                  <div className="wdd-build-card__visual" aria-hidden="true">
                    {build.icon === 'business' && (
                      <div className="wdd-visual-business">
                        <div className="wdd-visual-business__desktop" />
                        <div className="wdd-visual-business__mobile" />
                        <span className="wdd-visual-business__tag">5–30 PAGES</span>
                      </div>
                    )}
                    {build.icon === 'ecommerce' && (
                      <div className="wdd-visual-ecommerce">
                        <div className="wdd-visual-ecommerce__product" />
                        <div className="wdd-visual-ecommerce__product" />
                        <div className="wdd-visual-ecommerce__product" />
                      </div>
                    )}
                    {build.icon === 'locations' && (
                      <div className="wdd-visual-locations">
                        <div className="wdd-visual-locations__root">SITE</div>
                        <div className="wdd-visual-locations__branches">
                          <span>LOC 01</span>
                          <span>LOC 02</span>
                          <span>SVC 01</span>
                          <span>SVC 02</span>
                        </div>
                      </div>
                    )}
                    {build.icon === 'landing' && (
                      <div className="wdd-visual-landing">
                        <span className="wdd-visual-landing__step">AD</span>
                        <span className="wdd-visual-landing__arrow">→</span>
                        <span className="wdd-visual-landing__step">PAGE</span>
                        <span className="wdd-visual-landing__arrow">→</span>
                        <span className="wdd-visual-landing__step wdd-visual-landing__step--active">CTA</span>
                      </div>
                    )}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Build Standards ---- */}
      <section className="section wdd-standards">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Standards</span>
            <h2 className="section-heading__title">Our Build Standards, Non-Negotiable</h2>
          </div>
          <div className="wdd-standards__list">
            {BUILD_STANDARDS.map((standard, index) => (
              <ScrollReveal key={standard.number} delay={index * 60}>
                <article className="wdd-standard glass-card">
                  <div className="wdd-standard__number" aria-hidden="true">
                    {standard.number}
                  </div>
                  <div className="wdd-standard__content">
                    <h3 className="wdd-standard__title">{standard.title}</h3>
                    <p className="wdd-standard__text">{standard.text}</p>
                    {/* Standard-specific visual */}
                    {standard.icon === 'vitals' && (
                      <div className="wdd-standard__visual wdd-standard__visual--vitals">
                        <div className="wdd-vitals__metric">
                          <span className="wdd-vitals__label">LCP</span>
                          <span className="wdd-vitals__value">&lt; 2.5s</span>
                        </div>
                        <div className="wdd-vitals__metric">
                          <span className="wdd-vitals__label">INP</span>
                          <span className="wdd-vitals__value">&lt; 200ms</span>
                        </div>
                        <div className="wdd-vitals__metric">
                          <span className="wdd-vitals__label">CLS</span>
                          <span className="wdd-vitals__value">&lt; 0.1</span>
                        </div>
                        <span className="wdd-vitals__tag">TARGET STANDARD</span>
                      </div>
                    )}
                    {standard.icon === 'seo' && (
                      <div className="wdd-standard__visual wdd-standard__visual--seo">
                        <div className="wdd-seo__schema">
                          <span>Organization</span>
                          <span>Service</span>
                          <span>FAQPage</span>
                          <span>BreadcrumbList</span>
                        </div>
                        <div className="wdd-seo__extras">
                          <span>Canonical</span>
                          <span>Hreflang</span>
                          <span>Sitemap</span>
                          <span>Robots.txt</span>
                        </div>
                      </div>
                    )}
                    {standard.icon === 'ai' && (
                      <div className="wdd-standard__visual wdd-standard__visual--ai">
                        <div className="wdd-ai__crawlers">
                          <span>GPTBot</span>
                          <span>PerplexityBot</span>
                          <span>ClaudeBot</span>
                          <span>Google-Extended</span>
                        </div>
                        <div className="wdd-ai__arrow" aria-hidden="true">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <polyline points="19 12 12 19 5 12" />
                          </svg>
                        </div>
                        <div className="wdd-ai__robots">robots.txt</div>
                      </div>
                    )}
                    {standard.icon === 'whatsapp' && (
                      <div className="wdd-standard__visual wdd-standard__visual--whatsapp">
                        <div className="wdd-whatsapp__blocks">
                          <span>HERO</span>
                          <span>CONTENT</span>
                          <span>SERVICE</span>
                        </div>
                        <span className="wdd-whatsapp__cta">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                          WhatsApp
                        </span>
                      </div>
                    )}
                    {standard.icon === 'staging' && (
                      <div className="wdd-standard__visual wdd-standard__visual--staging">
                        <div className="wdd-staging__flow">
                          <span>DEV</span>
                          <span>STAGING</span>
                          <span>TEST</span>
                          <span>APPROVE</span>
                          <span>DNS</span>
                          <span>LIVE</span>
                        </div>
                      </div>
                    )}
                    {standard.icon === 'ownership' && (
                      <div className="wdd-standard__visual wdd-standard__visual--ownership">
                        <div className="wdd-ownership__card">
                          <span className="wdd-ownership__label">CLIENT REPOSITORY</span>
                          <span className="wdd-ownership__icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                              <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                          </span>
                          <span className="wdd-ownership__text">CLIENT OWNERSHIP</span>
                        </div>
                      </div>
                    )}
                    {standard.icon === 'tracking' && (
                      <div className="wdd-standard__visual wdd-standard__visual--tracking">
                        <div className="wdd-tracking__flow">
                          <span>SITE</span>
                          <span>GA4</span>
                          <span>+ WhatsApp Event</span>
                          <span>REPORT</span>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- WordPress vs Next.js ---- */}
      <section className="section wdd-platforms">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Platform</span>
            <h2 className="section-heading__title">WordPress vs Next.js</h2>
          </div>
          <div className="wdd-platforms__grid">
            <ScrollReveal>
              <article className="wdd-platform-card glass-card">
                <h3 className="wdd-platform-card__title">WordPress</h3>
                <ul className="wdd-platform-card__list">
                  {WP_FEATURES.map((feature) => (
                    <li key={feature}>
                      <span className="wdd-platform-card__check" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <article className="wdd-platform-card glass-card">
                <h3 className="wdd-platform-card__title">Next.js</h3>
                <ul className="wdd-platform-card__list">
                  {NEXTJS_FEATURES.map((feature) => (
                    <li key={feature}>
                      <span className="wdd-platform-card__check" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          </div>
          <ScrollReveal>
            <p className="wdd-platforms__note">
              Which is right depends on your team&apos;s technical capability and developer experience.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- Development Pipeline ---- */}
      <section className="section wdd-pipeline">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Pipeline</span>
            <h2 className="section-heading__title">How the Website Works as a Business Asset</h2>
          </div>
          <ScrollReveal>
            <div className="wdd-pipeline__flow">
              {PIPELINE_STEPS.map((step, index) => (
                <div key={step} className="wdd-pipeline__step-wrapper">
                  <div className="wdd-pipeline__step glass-card">
                    <span className="wdd-pipeline__step-number" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="wdd-pipeline__step-text">{step}</span>
                  </div>
                  {index < PIPELINE_STEPS.length - 1 && (
                    <div className="wdd-pipeline__arrow" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

      {/* ---- FAQ ---- */}
      <FAQSection
        eyebrow="FAQ"
        title="Website Design, Frequently Asked Questions"
        faqs={FAQS}
      />

      {/* ---- Related Services ---- */}
      <section className="section related-content">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Explore More</span>
            <h2 className="section-heading__title">Related Services</h2>
          </div>
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
            <Link to="/services/website-design-development/madurai/" className="related-content__link">
              Website Development in Madurai
            </Link>
            <Link to="/blog/best-web-hosting-india-malaysia-small-business/" className="related-content__link">
              Best Web Hosting: Top 5 Compared
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