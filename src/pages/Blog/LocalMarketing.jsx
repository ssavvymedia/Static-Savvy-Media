import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import { blogPostingSchema, breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL } from '../../utils/constants.js'

/* ============================================================
   CONTENT, Approved Static Savvy Media Local Marketing Content
   ============================================================ */

const PAGE_TITLE = 'Local Marketing for Tamil Nadu & Malaysia'

const PAGE_DESCRIPTION =
  'Local marketing strategies for businesses in Madurai, Thoothukudi, and Malaysia, combining SEO, Google Business Profile, social media, paid ads, and AI search visibility.'

const READING_TIME = 'Estimated reading time: approximately 2–3 min'

const INTRODUCTION =
  'Local marketing is about making sure your business is visible where your customers are actually looking, in Google search, Google Maps, social media, and increasingly AI search. We do both, for businesses in Madurai, Thoothukudi, and Malaysia.'

const SERVICES = [
  {
    number: '01',
    title: 'Search Engine Optimization (SEO)',
    text: 'Technical SEO, keyword strategy, content development, and link building that drives consistent organic traffic growth month on month.',
    link: '/services/seo',
    color: 'purple',
  },
  {
    number: '02',
    title: 'GEO & AEO, AI Search Optimization',
    text: 'Our flagship service. We structure your online presence so ChatGPT, Perplexity, and Google AI Overviews cite your business as the authoritative answer in your category.',
    link: '/services/geo-aeo-ai-search',
    color: 'pink',
  },
  {
    number: '03',
    title: 'Local SEO & Google Business Profile',
    text: 'Rank in Google Maps and local search for every city where your clients are looking, Madurai, Thoothukudi, and beyond.',
    link: '/services/local-seo',
    color: 'cyan',
  },
  {
    number: '04',
    title: 'Google Ads & PPC',
    text: 'High-ROI paid search campaigns managed by certified specialists. Every rupee and ringgit tracked back to real business outcomes.',
    link: '/services/google-ads',
    color: 'blue',
  },
  {
    number: '05',
    title: 'Social Media Marketing',
    text: 'Instagram, Facebook, and LinkedIn content and ad management that builds brand equity and drives qualified leads.',
    link: '/services/social-media-marketing',
    color: 'pink',
  },
  {
    number: '06',
    title: 'Website Design & Development',
    text: 'SEO-ready, Core Web Vitals-optimised websites built to convert. Next.js or WordPress chosen for your project, not ours.',
    link: '/services/website-design-development',
    color: 'purple',
  },
  {
    number: '07',
    title: 'AI Business Automation',
    text: 'Automate repetitive workflows, deploy AI chatbots, and integrate intelligent tools that free your team to focus on growth.',
    link: '/services/ai-business-automation',
    color: 'cyan',
  },
  {
    number: '08',
    title: 'Corporate Photography & Video',
    text: 'Professional brand imagery and video production from our Madurai studio, content that builds trust before a word is read.',
    link: '/services/corporate-photography-video',
    color: 'blue',
  },
  {
    number: '09',
    title: 'AI Video Creation',
    text: 'Marketing-grade videos produced with AI at a fraction of traditional production cost and in a fraction of the time.',
    link: '/services/ai-video-creation',
    color: 'purple',
  },
  {
    number: '10',
    title: 'Product Photography & Creative Design',
    text: 'E-commerce-ready product imagery and graphic design that converts browsers into buyers.',
    link: '/services/product-photography-creative-design',
    color: 'pink',
  },
]

const MARKETS = [
  {
    location: 'Madurai, Tamil Nadu',
    region: 'Tamil Nadu, India',
    text: 'Our headquarters. Deep local knowledge across textiles, education, healthcare, hospitality, and retail.',
    link: '/locations/madurai',
    icon: 'MADURAI',
  },
  {
    location: 'Thoothukudi (Tuticorin), Tamil Nadu',
    region: 'Tamil Nadu, India',
    text: "Serving the port city's industrial, marine, and manufacturing businesses with B2B and B2C digital marketing.",
    link: '/locations/thoothukudi',
    icon: 'THOOTHUKUDI',
  },
  {
    location: 'Rawang & Selangor, Malaysia',
    region: 'Malaysia',
    text: 'SME-focused digital marketing with grant-aware strategies. We help Malaysian businesses leverage MDEC and SMECorp digital transformation programmes.',
    link: '/locations/malaysia',
    icon: 'MALAYSIA',
  },
]

const WHY_US = [
  {
    title: 'GEO & AEO First',
    text: 'AI search visibility (GEO and AEO) is a core deliverable in our plans, not an afterthought.',
  },
  {
    title: 'Transparent, Verified Results',
    text: "We track every metric that matters and report honestly, including what didn't work and why.",
  },
]

const FLOW_STEPS = [
  'LOCAL CUSTOMER',
  'SEARCH / MAPS / SOCIAL / AI',
  'STATIC SAVVY MEDIA',
  'BUSINESS',
]

const TAKEAWAY_ITEMS = ['SEARCH', 'MAPS', 'SOCIAL', 'ADS', 'AI SEARCH', 'WEBSITE']

/* ============================================================
   COMPONENT
   ============================================================ */

export default function LocalMarketing() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: `${PAGE_TITLE} | Static Savvy Media Blog`,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/blog/local-marketing/`,
      ogType: 'article',
    })

    const blogPost = blogPostingSchema({
      headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      author: { '@type': 'Organization', name: 'Static Savvy Media' },
      publisher: {
        '@type': 'Organization',
        name: 'Static Savvy Media',
        url: SITE_URL,
      },
      url: `${SITE_URL}/blog/local-marketing/`,
      mainEntityOfPage: `${SITE_URL}/blog/local-marketing/`,
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Blog', item: `${SITE_URL}/blog/` },
        { name: 'Local Marketing', item: `${SITE_URL}/blog/local-marketing/` },
      ],
    })

    const scripts = [blogPost, breadcrumbs].map((data) => {
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

  const whatsappHref = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)

  return (
    <div className="about-template">
      <Breadcrumbs />

      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="section">
        <div className="container">
          <div className="local-marketing-hero">
            <div className="local-marketing-hero__content">
              <span className="local-marketing-hero__badge">LOCAL MARKETING</span>
              <h1 className="hero__title">
                Local Marketing for Tamil Nadu{' '}
                <span className="text-gradient">&amp; Malaysia</span>
              </h1>
              <div className="local-marketing-hero__meta">
                <span className="local-marketing-hero__meta-item">Static Savvy Media</span>
                <span className="local-marketing-hero__meta-item">Local Marketing</span>
                <span className="local-marketing-hero__meta-item">2026</span>
              </div>
              <p className="local-marketing-hero__intro">
                Grow your local visibility across Madurai, Thoothukudi,
                and Malaysia with search, social, paid advertising,
                and AI-powered marketing.
              </p>
            </div>
            <div className="local-marketing-hero__visual">
              <div className="local-marketing-hero__visual-card">
                <div className="local-marketing-hero__visual-label">Local Search Flow</div>
                <div className="local-marketing-hero__visual-flow">
                  <div className="local-marketing-hero__visual-step local-marketing-hero__visual-step--query">User Query</div>
                  <div className="local-marketing-hero__visual-arrow" aria-hidden="true">↓</div>
                  <div className="local-marketing-hero__visual-step local-marketing-hero__visual-step--maps">Google Maps</div>
                  <div className="local-marketing-hero__visual-arrow" aria-hidden="true">↓</div>
                  <div className="local-marketing-hero__visual-step local-marketing-hero__visual-step--ai">AI Engines</div>
                  <div className="local-marketing-hero__visual-arrow" aria-hidden="true">↓</div>
                  <div className="local-marketing-hero__visual-step local-marketing-hero__visual-step--business">Your Business</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          ARTICLE INTRO
          ============================================================ */}
      <section className="section section--alt">
        <div className="container">
          <div className="local-marketing-intro">
            <p className="local-marketing-intro__text">{INTRODUCTION}</p>
          </div>
        </div>
      </section>

      {/* ============================================================
          WHAT DOES LOCAL MARKETING INCLUDE?
          ============================================================ */}
      <section className="section">
        <div className="container">
          <h2 className="section__title">What Does Local Marketing Include?</h2>
          <div className="local-marketing-services">
            {SERVICES.map((service, index) => (
              <ScrollReveal key={service.number} delay={index * 40}>
                <Link to={service.link} className="local-marketing-service-card" style={{ textDecoration: 'none' }}>
                  <div className="local-marketing-service-card__top">
                    <span className={`local-marketing-service-card__number local-marketing-service-card__number--${service.color}`}>
                      {service.number}
                    </span>
                    <span className={`local-marketing-service-card__icon local-marketing-service-card__icon--${service.color}`} aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="local-marketing-service-card__title">{service.title}</h3>
                  <p className="local-marketing-service-card__text">{service.text}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SERVING THREE MARKETS
          ============================================================ */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="section__title">Serving Three Markets</h2>
          <div className="local-marketing-markets">
            {MARKETS.map((market, index) => (
              <ScrollReveal key={market.link} delay={index * 80}>
                <Link to={market.link} className="local-marketing-market-card" style={{ textDecoration: 'none' }}>
                  <div className="local-marketing-market-card__icon" aria-hidden="true">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="local-marketing-market-card__badge">{market.icon}</div>
                  <h3 className="local-marketing-market-card__location">{market.location}</h3>
                  <p className="local-marketing-market-card__text">{market.text}</p>
                  <span className="local-marketing-market-card__arrow">Explore Location →</span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          WHY LOCAL MARKETING MATTERS
          ============================================================ */}
      <section className="section">
        <div className="container">
          <h2 className="section__title">Why Local Marketing Matters</h2>
          <div className="local-marketing-matters">
            <p className="local-marketing-matters__text">
              Local visibility is no longer limited to Google search results.
              Customers discover businesses through Google Maps, social platforms,
              AI search engines, recommendations, and local digital ecosystems.
            </p>
            <div className="local-marketing-matters__visual">
              <div className="local-marketing-matters__channels">
                <div className="local-marketing-matters__channel">LOCAL SEO</div>
                <div className="local-marketing-matters__plus" aria-hidden="true">+</div>
                <div className="local-marketing-matters__channel">SOCIAL MEDIA</div>
                <div className="local-marketing-matters__plus" aria-hidden="true">+</div>
                <div className="local-marketing-matters__channel">PAID SEARCH</div>
                <div className="local-marketing-matters__plus" aria-hidden="true">+</div>
                <div className="local-marketing-matters__channel">GEO / AEO</div>
                <div className="local-marketing-matters__plus" aria-hidden="true">+</div>
                <div className="local-marketing-matters__channel">WEBSITE</div>
              </div>
              <div className="local-marketing-matters__flow">
                {FLOW_STEPS.map((step, index) => (
                  <div key={step} className="local-marketing-matters__flow-item">
                    <div className={`local-marketing-matters__flow-step ${index === 0 ? 'local-marketing-matters__flow-step--active' : ''}`}>{step}</div>
                    {index < FLOW_STEPS.length - 1 && (
                      <div className="local-marketing-matters__flow-arrow" aria-hidden="true">↓</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          WHY CHOOSE STATIC SAVVY MEDIA
          ============================================================ */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="section__title">Why Choose Static Savvy Media</h2>
          <div className="local-marketing-why-us">
            {WHY_US.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 80}>
                <div className="local-marketing-why-card">
                  <div className="local-marketing-why-card__number">{index === 0 ? '01' : '02'}</div>
                  <h3 className="local-marketing-why-card__title">{item.title}</h3>
                  <p className="local-marketing-why-card__text">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          KEY TAKEAWAY
          ============================================================ */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="local-marketing-takeaway glass-card">
              <div className="local-marketing-takeaway__label">LOCAL MARKETING</div>
              <div className="local-marketing-takeaway__sublabel">is not one channel.</div>
              <div className="local-marketing-takeaway__intro">It is the combination of:</div>
              <div className="local-marketing-takeaway__items">
                {TAKEAWAY_ITEMS.map((item, index) => (
                  <span key={item} className="local-marketing-takeaway__item">
                    {item}
                    {index < TAKEAWAY_ITEMS.length - 1 && <span className="local-marketing-takeaway__plus" aria-hidden="true">+</span>}
                  </span>
                ))}
              </div>
              <p className="local-marketing-takeaway__supporting">
                Build visibility across the places your local customers
                already use to discover and evaluate businesses.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA
          ============================================================ */}
      <CTASection
        eyebrow="Get Started"
        title="Ready to grow your local visibility?"
        subtitle="Let’s build a digital presence that helps customers find, trust, and choose your business."
        primaryLabel="Talk to Static Savvy Media"
        primaryHref={whatsappHref}
      />
    </div>
  )
}
