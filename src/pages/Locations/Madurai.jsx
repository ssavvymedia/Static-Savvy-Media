import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import FAQSection from '../../components/sections/FAQSection.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import {
  localBusinessSchema,
  faqPageSchema,
  breadcrumbListSchema,
} from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import {
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
  SITE_URL,
} from '../../utils/constants.js'
import '../../styles/pages/madurai.css'

/* ============================================================
   CONTENT, Approved Static Savvy Media Madurai Page Content
   ============================================================ */

const PAGE_TITLE =
  'Digital Marketing Agency in Madurai, SEO, GEO/AEO & More | Static Savvy Media'

const PAGE_DESCRIPTION =
  "Static Savvy Media is Madurai’s AI-powered digital marketing agency. SEO, Local SEO, GEO/AEO, Google Ads, social media, web design, and AI automation. Call +91-99440-40345."

const HERO_EYEBROW = 'Madurai • Static Savvy Media HQ'

const HERO_SUBTITLE =
  'Madurai is not just our headquarters, it is our home market. We understand the Madurai business landscape because we have built our own business here: the textile corridor, the education institutions driving student demand, the healthcare cluster, the hospitality businesses serving pilgrims and tourists at Meenakshi Amman Temple, and the growing retail ecosystem. When we build digital marketing for Madurai businesses, we build for the city we live in.'

const SERVICES = [
  {
    number: '01',
    title: 'Search Engine Optimization (SEO)',
    text: 'Ranking your Madurai business for city-specific and Tamil Nadu-wide queries.',
    path: '/services/seo/',
  },
  {
    number: '02',
    title: 'GEO & AEO / AI Search Optimization',
    text: 'Getting cited by ChatGPT, Perplexity, and Google AI Overviews.',
    path: '/services/geo-aeo-ai-search/',
  },
  {
    number: '03',
    title: 'Local SEO & Google Business Profile',
    text: 'Dominating the Google Maps pack for “near me” searches in Madurai.',
    path: '/services/local-seo/',
  },
  {
    number: '04',
    title: 'Google Ads & PPC',
    text: 'Immediate visibility for high-intent buyers searching in Madurai.',
    path: '/services/google-ads/',
  },
  {
    number: '05',
    title: 'Social Media Marketing',
    text: 'Instagram and Facebook for the Madurai consumer market; LinkedIn for B2B.',
    path: '/services/social-media-marketing/',
  },
  {
    number: '06',
    title: 'Website Design & Development',
    text: 'SEO-ready, mobile-first websites built for Madurai businesses.',
    path: '/services/website-design-development/',
  },
  {
    number: '07',
    title: 'AI Business Automation',
    text: 'WhatsApp automation and workflow tools for Madurai SMEs.',
    path: '/services/ai-business-automation/',
  },
  {
    number: '08',
    title: 'Corporate Photography & Video',
    text: 'Professional photography and video production in Madurai.',
    path: '/services/corporate-photography-video/',
  },
  {
    number: '09',
    title: 'AI Video Creation',
    text: 'Marketing videos for Madurai businesses.',
    path: '/services/ai-video-creation/',
  },
  {
    number: '10',
    title: 'Product Photography & Creative Design',
    text: 'E-commerce photography, textile product photography, and brand design.',
    path: '/services/product-photography-creative-design/',
  },
]

const INDUSTRIES = [
  {
    title: 'Textiles & Garments',
    text: "Madurai is one of Tamil Nadu’s most important textile trading hubs. We build digital presence for silk saree retailers, textile manufacturers, readymade garment businesses, and export-oriented garment units, including product photography optimised for Indian and international e-commerce platforms.",
    path: '/industries/textiles-madurai/',
  },
  {
    title: 'Education & Training',
    text: "Madurai’s concentration of engineering colleges, arts and science colleges, and coaching institutes makes education one of the city’s highest-competition digital marketing categories. We help educational institutions rank for admission-intent queries and build the authoritative online presence that today’s student-parents research before enrolling.",
    path: '/industries/education-training/',
  },
  {
    title: 'Healthcare & Clinics',
    text: "From specialist clinics to dental chains, Madurai’s healthcare businesses are increasingly competing on digital visibility. Local SEO and Google Business Profile optimisation are the highest-ROI starting points for most healthcare clients.",
    path: '/industries/healthcare-clinics/',
  },
  {
    title: 'Hospitality & Restaurants',
    text: "Year-round pilgrim and tourist traffic to Meenakshi Amman Temple drives significant hospitality demand in Madurai. We help hotels, restaurants, and wedding venues capture this high-intent traffic through Google Maps ranking and AI travel platform visibility.",
    path: '/industries/hospitality-hotels/',
  },
]

const FAQS = [
  {
    question: 'What types of businesses do you work with in Madurai?',
    answer:
      'Businesses across Madurai’s main economic sectors: textiles and garments, education, healthcare, hospitality, retail, and professional services. Our smallest Madurai clients are 2–3 person businesses; our largest have 50+ staff. Message us on WhatsApp and we will advise on the right starting point for your business.',
  },
  {
    question: 'Do you offer Tamil-language digital marketing?',
    answer:
      "Yes. We create Tamil-language content for social media, local SEO, and blog posts for clients targeting Tamil Nadu’s Tamil-speaking audience, particularly for voice search optimisation. Our team is Tamil-native and we do not rely on machine translation.",
  },
  {
    question: 'Can I come to your office in Madurai for a consultation?',
    answer:
      'Yes, and we welcome it. In-person consultations are available Monday through Saturday by appointment. Message us on WhatsApp to schedule. We are also happy to meet via Google Meet or WhatsApp video call.',
  },
  {
    question: 'Is digital marketing worth investing in for a small business in Madurai?',
    answer:
      "Yes, particularly Local SEO and Google Business Profile optimization, which have the highest ROI for small local businesses. A Madurai business that does not appear in the top 3 Google Maps results for its category is missing the majority of local search-driven enquiries. The cost of fixing this is lower than most business owners expect, and the return is consistent and compounding.",
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
  { name: 'Corporate Photography & Video', path: '/services/corporate-photography-video/' },
  { name: 'AI Video Creation', path: '/services/ai-video-creation/' },
  { name: 'Product Photography & Creative Design', path: '/services/product-photography-creative-design/' },
]

const OTHER_LOCATIONS = [
  { name: 'Thoothukudi', path: '/locations/thoothukudi/' },
  { name: 'Malaysia', path: '/locations/malaysia/' },
  { name: 'All Locations', path: '/locations/' },
]

/* ============================================================
   COMPONENT
   ============================================================ */

export default function Madurai() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/locations/madurai/`,
      ogType: 'website',
    })

    const faqEntities = FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    }))

    const localBiz = localBusinessSchema({
      name: 'Static Savvy Media, Madurai',
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/locations/madurai/`,
      telephone: '+919944040345',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Madurai',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'IN',
      },
      areaServed: [
        { '@type': 'City', name: 'Madurai' },
        { '@type': 'State', name: 'Tamil Nadu' },
      ],
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Locations', item: `${SITE_URL}/locations/` },
        { name: 'Madurai', item: `${SITE_URL}/locations/madurai/` },
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
    <div className="madurai-page">
      {/* ---- Breadcrumbs ---- */}
      <Breadcrumbs />

      {/* ---- Hero ---- */}
      <HeroSection
        eyebrow={HERO_EYEBROW}
        title="Digital Marketing Agency in Madurai, Static Savvy Media HQ"
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
      />

      {/* ---- Digital Marketing Services in Madurai ---- */}
      <section className="section madurai-services">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">What We Deliver</span>
            <h2 className="section-heading__title">Digital Marketing Services in Madurai</h2>
          </div>
          <div className="madurai-services__grid">
            {SERVICES.map((service, index) => (
              <ScrollReveal key={service.number} delay={index * 60}>
                <article className="madurai-service-card glass-card">
                  <div className="madurai-service-card__top">
                    <span className="madurai-service-card__badge" aria-hidden="true">
                      {service.number}
                    </span>
                    <span className="madurai-service-card__number" aria-hidden="true">
                      {service.number}
                    </span>
                  </div>
                  <h3 className="madurai-service-card__title">
                    <Link to={service.path}>{service.title}</Link>
                  </h3>
                  <p className="madurai-service-card__text">{service.text}</p>
                  <Link to={service.path} className="madurai-service-card__link">
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

      {/* ---- Industries We Serve in Madurai ---- */}
      <section className="section madurai-industries section--alt">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Industries</span>
            <h2 className="section-heading__title">Industries We Serve in Madurai</h2>
          </div>
          <div className="madurai-industries__grid">
            {INDUSTRIES.map((industry, index) => (
              <ScrollReveal key={industry.title} delay={index * 80}>
                <article className="madurai-industry-card glass-card">
                  <div className="madurai-industry-card__icon" aria-hidden="true">
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
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h3 className="madurai-industry-card__title">{industry.title}</h3>
                  <p className="madurai-industry-card__text">{industry.text}</p>
                  <Link to={industry.path} className="madurai-industry-card__link">
                    Explore {industry.title}
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

      {/* ---- Our Madurai Office ---- */}
      <section className="section madurai-office">
        <div className="container">
          <div className="madurai-office__inner glass-card gradient-border">
            <div className="madurai-office__visual" aria-hidden="true">
              <div className="madurai-office__pin">
                <svg
                  width="32"
                  height="32"
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
              </div>
              <span className="madurai-office__label">Madurai, Tamil Nadu</span>
            </div>
            <div className="madurai-office__details">
              <h2 className="madurai-office__title">Our Madurai Office</h2>
              <div className="madurai-office__card glass-card">
                <h3 className="madurai-office__name">Static Savvy Media, Madurai</h3>
                <p className="madurai-office__address">
                  [Street Address], Madurai, Tamil Nadu [PIN]
                </p>
                <div className="madurai-office__meta">
                  <div className="madurai-office__meta-item">
                    <span className="madurai-office__meta-label">Phone/WhatsApp</span>
                    <a href={whatsappHref} className="madurai-office__meta-value" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#25D366', flexShrink: 0 }} aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      +91-99440-40345
                    </a>
                  </div>
                  <div className="madurai-office__meta-item">
                    <span className="madurai-office__meta-label">Hours</span>
                    <span className="madurai-office__meta-value">
                      Monday–Saturday, 9:00 AM – 6:30 PM IST
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Related Content ---- */}
      <section className="section madurai-related section--alt">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Explore More</span>
            <h2 className="section-heading__title">Related Services &amp; Locations</h2>
          </div>

          <div className="madurai-related__group">
            <h3 className="madurai-related__group-title">Our Services</h3>
            <div className="madurai-related__links">
              {RELATED_SERVICES.map((item) => (
                <Link key={item.path} to={item.path} className="madurai-related__link">
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

          <div className="madurai-related__group">
            <h3 className="madurai-related__group-title">Other Locations</h3>
            <div className="madurai-related__links">
              {OTHER_LOCATIONS.map((item) => (
                <Link key={item.path} to={item.path} className="madurai-related__link">
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
        title="Madurai, Frequently Asked Questions"
        faqs={FAQS}
      />

      {/* ---- Final CTA ---- */}
      <CTASection
        title="Ready to grow your Madurai business?"
        subtitle="Message us on WhatsApp, Madurai’s only GEO & AEO agency is ready to talk."
        primaryLabel="WhatsApp: +91-99440-40345"
        primaryHref={whatsappHref}
      />
    </div>
  )
}
