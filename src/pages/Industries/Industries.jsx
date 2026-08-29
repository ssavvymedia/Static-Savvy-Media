import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import ContactFormSection from '../../components/sections/ContactFormSection.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import { breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink, cx } from '../../utils/helpers.js'
import {
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
  SITE_URL,
  SITE_NAME,
} from '../../utils/constants.js'
import '../../styles/pages/industries-hub.css'
import industriesHeroImg from '../../assets/images/Industries/IndustriesMain.png'

/* ============================================================
   CONTENT
   ============================================================ */

const PAGE_TITLE =
  'Industries We Serve, Digital Marketing by Sector | Static Savvy Media'

const PAGE_DESCRIPTION =
  'Industry-focused digital marketing for retail, healthcare, education, hospitality, textiles, industrial, Malaysian SME, and real estate businesses.'

const HERO_TITLE = 'Digital Marketing Built Around Your Industry'

const HERO_SUBTITLE =
  'Every industry has different customers, search behaviour, buying cycles, competition, and conversion paths. We build digital marketing strategies around how your market actually works, from local search and AI visibility to paid campaigns, content and conversion-focused websites.'

const INDUSTRIES = [
  {
    number: '01',
    name: 'Retail & E-Commerce',
    description:
      'Build visibility, product discovery and conversion across Google, social platforms, marketplaces and your own website.',
    tags: ['SEO', 'Google Ads', 'Social Commerce', 'Product Photography'],
    path: '/industries/retail-ecommerce/',
    icon: 'retail',
  },
  {
    number: '02',
    name: 'Healthcare & Clinics',
    description:
      'Help patients find your clinic, understand your services and take the next step through search, local visibility and trusted digital content.',
    tags: ['Local SEO', 'Google Business Profile', 'Google Ads', 'AI Search'],
    path: '/industries/healthcare-clinics/',
    icon: 'healthcare',
  },
  {
    number: '03',
    name: 'Education & Training',
    description:
      'Reach students and parents when they search for institutions, courses, admissions and training opportunities.',
    tags: ['Education SEO', 'Google Ads', 'Social Media', 'GEO/AEO'],
    path: '/industries/education-training/',
    icon: 'education',
  },
  {
    number: '04',
    name: 'Hospitality & Hotels',
    description:
      'Increase discoverability, direct enquiries, reviews and bookings through search, local SEO, social media and digital conversion systems.',
    tags: ['Local SEO', 'Google Maps', 'Reviews', 'Google Ads'],
    path: '/industries/hospitality-hotels/',
    icon: 'hospitality',
  },
  {
    number: '05',
    name: 'Textiles & Garments',
    description:
      'Build digital visibility for textile retailers, manufacturers, garment businesses and brands targeting regional, national and international buyers.',
    tags: ['SEO', 'Product Photography', 'E-Commerce', 'B2B Marketing'],
    path: '/industries/textiles-madurai/',
    icon: 'textiles',
  },
  {
    number: '06',
    name: 'Port, Marine & Industrial',
    description:
      'Build professional B2B visibility for manufacturers, shipping, logistics, marine and industrial businesses targeting procurement teams and corporate buyers.',
    tags: ['B2B SEO', 'LinkedIn', 'Google Ads', 'AI Search'],
    path: '/industries/port-marine-industrial-thoothukudi/',
    icon: 'industrial',
  },
  {
    number: '07',
    name: 'Malaysian SMEs',
    description:
      'Digital marketing and transformation support for Malaysian SMEs targeting local growth, online visibility and digital adoption.',
    tags: ['SEO', 'GEO/AEO', 'Google Ads', 'AI Automation'],
    path: '/industries/smes-malaysia-grant-eligible/',
    icon: 'sme',
  },
  {
    number: '08',
    name: 'Real Estate & Property Developers',
    description:
      'Generate property visibility and qualified enquiries through local search, paid campaigns, content, websites and digital lead-generation systems.',
    tags: ['Local SEO', 'Google Ads', 'Lead Generation', 'Property Marketing'],
    path: '/industries/real-estate-builders/',
    icon: 'realestate',
  },
]

const COMPARISON = [
  {
    industry: 'Retail',
    audience: 'Consumers',
    need: 'Product Discovery',
    channels: 'SEO + Social + Ads',
  },
  {
    industry: 'Healthcare',
    audience: 'Patients',
    need: 'Trust + Local Discovery',
    channels: 'Local SEO + Google Ads',
  },
  {
    industry: 'Education',
    audience: 'Students + Parents',
    need: 'Admissions',
    channels: 'SEO + Ads + Social',
  },
  {
    industry: 'Hospitality',
    audience: 'Guests',
    need: 'Bookings + Reviews',
    channels: 'Local SEO + Google Maps',
  },
  {
    industry: 'Textiles',
    audience: 'Retailers + Buyers',
    need: 'Product Visibility',
    channels: 'SEO + Photography + B2B',
  },
  {
    industry: 'Industrial',
    audience: 'Procurement Teams',
    need: 'B2B Enquiries',
    channels: 'SEO + LinkedIn + Google Ads',
  },
  {
    industry: 'Malaysian SMEs',
    audience: 'Business Owners',
    need: 'Digital Growth',
    channels: 'SEO + Ads + Automation',
  },
  {
    industry: 'Real Estate',
    audience: 'Property Buyers',
    need: 'Qualified Leads',
    channels: 'SEO + Google Ads + Lead Gen',
  },
]

const VALUE_BLOCKS = [
  {
    number: '01',
    title: 'Industry Search Intent',
    text: 'Understand the exact searches customers use in each sector.',
  },
  {
    number: '02',
    title: 'Industry-Specific Content',
    text: 'Build content around real customer questions, services and buying decisions.',
  },
  {
    number: '03',
    title: 'Industry-Specific Conversion',
    text: 'Use the right CTA, landing page and enquiry mechanism for each market.',
  },
  {
    number: '04',
    title: 'Industry-Specific AI Visibility',
    text: 'Optimize content so AI search engines can understand your expertise and relevance.',
  },
]

const AI_CHANNELS = [
  'Google AI Overviews',
  'ChatGPT',
  'Perplexity',
  'AI-Powered Search',
]

/* ============================================================
   ICONS, inline SVG set (stroke style, matches codebase)
   ============================================================ */

const ICONS = {
  retail: (
    <>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </>
  ),
  healthcare: (
    <>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </>
  ),
  education: (
    <>
      <path d="M22 9l-10-5-10 5 10 5 10-5z" />
      <path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
      <path d="M22 9v5" />
    </>
  ),
  hospitality: (
    <>
      <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" />
    </>
  ),
  textiles: (
    <>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </>
  ),
  industrial: (
    <>
      <path d="M2 20h20" />
      <path d="M5 20V8l7-5 7 5v12" />
      <path d="M9 20v-6h6v6" />
      <path d="M10 10h.01M14 10h.01" />
    </>
  ),
  sme: (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </>
  ),
  realestate: (
    <>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </>
  ),
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
  target: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.2 7.8 14.2 14.2 7.8 16.2 9.8 9.8 16.2 7.8" />
    </>
  ),
  check: <path d="M20 6L9 17l-5-5" />,
  arrow: (
    <path d="M5 12h14M13 6l6 6-6 6" />
  ),
  chevron: (
    <path d="M6 9l6 6 6-6" />
  ),
}

function HubIcon({ name, size = 20 }) {
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
   COMPONENT
   ============================================================ */

export default function Industries() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/industries/`,
      ogType: 'website',
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Industries', item: `${SITE_URL}/industries/` },
      ],
    })

    const itemList = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Industries We Serve, Static Savvy Media',
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/industries/`,
      numberOfItems: INDUSTRIES.length,
      itemListElement: INDUSTRIES.map((ind, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: ind.name,
        url: `${SITE_URL}${ind.path}`,
      })),
    }

    const webPage = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/industries/`,
      inLanguage: 'en',
      isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
      about: {
        '@type': 'Service',
        serviceType: 'Industry Digital Marketing Services',
      },
    }

    const scripts = [breadcrumbs, itemList, webPage].map((data) => {
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
    <div className="industries-hub">
      {/* ---- Breadcrumbs ---- */}
      <Breadcrumbs />

      {/* ---- Hero ---- */}
      <HeroSection
        layout="two-column"
        eyebrow="INDUSTRIES WE SERVE"
        title={HERO_TITLE}
        subtitle={HERO_SUBTITLE}
        actions={
          <>
            <Button
              href="#industry-grid"
              variant="primary"
              size="lg"
            >
              Find Your Industry
            </Button>
            <Button
              href={whatsappHref}
              variant="ghost"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Talk to Our Team
            </Button>
          </>
        }
      >
        <div className="hero__visual-side">
          <img
            src={industriesHeroImg}
            alt="Industries We Serve"
            className="hero__image"
          />
        </div>
      </HeroSection>

      {/* ---- Industry Navigation Strip ---- */}
      <nav className="ihub-nav-strip" aria-label="Industry quick navigation">
        <div className="container">
          <div className="ihub-nav-strip__inner">
            {INDUSTRIES.map((ind) => (
              <a
                key={ind.slug}
                href="#industry-grid"
                className="ihub-nav-strip__chip"
                onClick={(e) => {
                  const el = document.getElementById(`industry-${ind.icon}`)
                  if (el) {
                    e.preventDefault()
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }
                }}
              >
                {ind.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ---- Introduction ---- */}
      <section className="section ihub-intro">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Why It Matters</span>
            <h2 className="section-heading__title">
              One Strategy Doesn&#x2019;t Fit Every Industry
            </h2>
          </div>
          <ScrollReveal>
            <p className="ihub-intro__text">
              A healthcare clinic does not acquire customers like an e-commerce store. A college
              does not market like a textile manufacturer. A hotel does not sell like a B2B
              industrial company. A real estate developer does not have the same buyer journey as a
              local retailer.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <p className="ihub-intro__text">
              We combine SEO, Local SEO, GEO/AEO, Google Ads, Social Media and Website
              Development with industry-specific positioning, so your marketing works the way
              your customers actually buy.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- Industry Cards Grid ---- */}
      <section className="section ihub-grid section--alt" id="industry-grid">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Choose Your Industry</span>
            <h2 className="section-heading__title">Industries We Serve</h2>
          </div>

          <div className="ihub-cards">
            {INDUSTRIES.map((ind, index) => (
              <ScrollReveal key={ind.icon} delay={index * 60}>
                <article
                  className="ihub-card glass-card"
                  id={`industry-${ind.icon}`}
                >
                  <div className="ihub-card__top">
                    <span className="ihub-card__number">{ind.number}</span>
                    <span className="ihub-card__icon" aria-hidden="true">
                      <HubIcon name={ind.icon} size={22} />
                    </span>
                  </div>
                  <h3 className="ihub-card__title">{ind.name}</h3>
                  <p className="ihub-card__text">{ind.description}</p>
                  <div className="ihub-card__tags">
                    {ind.tags.map((tag) => (
                      <span key={tag} className="ihub-card__tag">{tag}</span>
                    ))}
                  </div>
                  <Link to={ind.path} className="ihub-card__link">
                    Explore {ind.name.split(' ')[0]} &rarr;
                  </Link>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Industry → Marketing Approach ---- */}
      <section className="section ihub-comparison">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">The Difference</span>
            <h2 className="section-heading__title">
              Different Industries. Different Digital Journeys.
            </h2>
          </div>

          <ScrollReveal>
            <div className="ihub-table-wrap">
              <table className="ihub-table" role="table">
                <thead>
                  <tr>
                    <th scope="col">Industry</th>
                    <th scope="col">Primary Audience</th>
                    <th scope="col">Key Digital Need</th>
                    <th scope="col">Core Channels</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.industry}>
                      <td data-label="Industry">{row.industry}</td>
                      <td data-label="Primary Audience">{row.audience}</td>
                      <td data-label="Key Digital Need">{row.need}</td>
                      <td data-label="Core Channels">{row.channels}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- Why Industry-Specific Marketing ---- */}
      <section className="section ihub-values section--alt">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Our Approach</span>
            <h2 className="section-heading__title">
              Why Industry-Specific Digital Marketing Works Better
            </h2>
          </div>

          <div className="ihub-values__grid">
            {VALUE_BLOCKS.map((block, index) => (
              <ScrollReveal key={block.number} delay={index * 80}>
                <div className="ihub-value-card glass-card">
                  <span className="ihub-value-card__number">{block.number}</span>
                  <h3 className="ihub-value-card__title">{block.title}</h3>
                  <p className="ihub-value-card__text">{block.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- GEO + AEO Angle ---- */}
      <section className="section ihub-ai">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">AI Search</span>
            <h2 className="section-heading__title">
              Be the Business AI Search Recommends
            </h2>
          </div>

          <ScrollReveal>
            <p className="ihub-ai__text">
              Industry-specific authority matters not only in traditional search but also in
              AI-powered engines. When your content demonstrates deep sector expertise, AI
              platforms are more likely to surface your business as a trusted recommendation.
            </p>
          </ScrollReveal>

          <div className="ihub-ai__channels">
            {AI_CHANNELS.map((ch, i) => (
              <span key={ch} className="ihub-ai__chip" style={{ animationDelay: `${i * 100}ms` }}>
                <span className="ihub-ai__dot" aria-hidden="true" />
                {ch}
              </span>
            ))}
          </div>

          <ScrollReveal>
            <div className="ihub-ai__cta-row">
              <Button
                to="/services/geo-aeo-ai-search/"
                variant="ghost"
                size="md"
              >
                Explore AI Search Optimization
                <HubIcon name="arrow" size={14} />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- Location Coverage ---- */}
      <section className="section ihub-locations section--alt">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Coverage</span>
            <h2 className="section-heading__title">
              Industry Expertise Across Tamil Nadu &amp; Malaysia
            </h2>
          </div>

          <div className="ihub-locations__grid">
            <ScrollReveal>
              <div className="ihub-loc-card glass-card">
                <span className="ihub-loc-card__icon" aria-hidden="true">
                  <HubIcon name="target" size={22} />
                </span>
                <h3 className="ihub-loc-card__title">Madurai</h3>
                <p className="ihub-loc-card__text">
                  Textiles, Healthcare, Education, Hospitality, deep sector expertise for
                  Madurai&#x2019;s core industries.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div className="ihub-loc-card glass-card">
                <span className="ihub-loc-card__icon" aria-hidden="true">
                  <HubIcon name="industrial" size={22} />
                </span>
                <h3 className="ihub-loc-card__title">Thoothukudi</h3>
                <p className="ihub-loc-card__text">
                  Industrial, Marine, Logistics, B2B marketing for port and manufacturing
                  businesses.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <div className="ihub-loc-card glass-card">
                <span className="ihub-loc-card__icon" aria-hidden="true">
                  <HubIcon name="globe" size={22} />
                </span>
                <h3 className="ihub-loc-card__title">Malaysia</h3>
                <p className="ihub-loc-card__text">
                  SMEs, Manufacturing, Retail, digital transformation and growth marketing for
                  Malaysian businesses.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ---- Final CTA ---- */}
      <CTASection
        title="Not Sure Which Digital Strategy Fits Your Industry?"
        subtitle="Tell us what you sell, who you serve and where you operate. We&#x2019;ll help identify the digital channels and industry-specific opportunities worth prioritizing."
        primaryLabel="WhatsApp for a Free Consultation"
        primaryHref={whatsappHref}
        secondaryLabel="Explore Our Services"
        secondaryTo="/services/"
      />
      <ContactFormSection />
    </div>
  )
}
