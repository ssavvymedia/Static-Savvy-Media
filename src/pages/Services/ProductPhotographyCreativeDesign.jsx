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
import '../../styles/pages/product-photography-creative-design.css'
import productHeroImg from '../../assets/images/services/10product.png'

/* ============================================================
   CONTENT, Approved Static Savvy Media Product Photography &
   Creative Design
   Source of truth: SSM-Full-Content.html (#prod-photo)
   ============================================================ */

const PAGE_TITLE =
  'Product Photography & Creative Design, E-Commerce & Brand Visuals | Static Savvy Media Madurai'

const PAGE_DESCRIPTION =
  'E-commerce-ready product photography and creative graphic design in Madurai. Studio photography, lifestyle shots, and brand design for Tamil Nadu and Malaysia businesses.'

const HERO_TITLE =
  'Product Photography & Creative Design, Visuals That Sell'

const HERO_PARAGRAPH =
  'In e-commerce and digital marketing, your product image is the salesperson. Buyers cannot touch, smell, or try your product before purchasing online, they make their decision based on the photograph. Professional product photography directly impacts conversion rates, return rates, and brand perception.'

const PHOTOGRAPHY_SERVICES = [
  {
    number: '01',
    title: 'White background (e-commerce standard)',
    icon: 'box',
    text: 'Clean, marketplace-ready images for Amazon, Flipkart, Shopify, and other e-commerce platforms. Multiple angles per product as standard.',
  },
  {
    number: '02',
    title: 'Lifestyle photography',
    icon: 'sun',
    text: 'Products shown in real-world context. Highest-converting image type for social media ads and website hero sections.',
  },
  {
    number: '03',
    title: 'Detail and texture shots',
    icon: 'search',
    text: 'Close-up photography where material quality, texture, or finish is a key purchase decision, particularly important for textiles, jewellery, and artisan goods.',
  },
  {
    number: '04',
    title: '360° product shots',
    icon: 'rotate',
    text: 'Interactive spin photography for websites where customers want to see all angles before buying.',
  },
]

const DESIGN_SERVICES = [
  {
    number: '01',
    title: 'Brand identity',
    icon: 'palette',
    text: 'Logo, colour palette, typography, and brand guidelines for new businesses or rebrands.',
  },
  {
    number: '02',
    title: 'Social media creative',
    icon: 'grid',
    text: 'On-brand templates and custom graphics for Instagram, Facebook, and LinkedIn, designed once, used repeatedly.',
  },
  {
    number: '03',
    title: 'Marketing collateral',
    icon: 'layers',
    text: 'Brochures, flyers, banners, and digital advertisements for print and digital use.',
  },
  {
    number: '04',
    title: 'WhatsApp catalogue design',
    icon: 'whatsapp',
    text: 'Product images formatted and optimised for WhatsApp Business product catalogues, the primary sales channel for many Tamil Nadu SMEs.',
  },
]

const FAQS = [
  {
    question: 'How many products can be photographed in one session?',
    answer:
      'For standard white-background e-commerce photography, 20–40 products (with 3–5 angles each) can be completed in a full-day studio session. For lifestyle photography with set changes and styling, 8–15 hero images per day is realistic. We advise on the most efficient session structure based on your product count.',
  },
  {
    question: 'Do you photograph textile products and sarees?',
    answer:
      "Yes, and we understand the specific requirements of Madurai's textile industry. We photograph sarees, dress materials, readymade garments, and fabric samples with the lighting and styling that showcases drape, texture, and colour accurately for online buyers.",
  },
  {
    question: 'Can I use your photography for Amazon and Flipkart listings?',
    answer:
      'Yes. We deliver images in the formats and specifications required by major Indian e-commerce platforms: minimum 1000×1000 pixels, sRGB colour space, pure white background for main listing images. We also provide lifestyle images in the proportions recommended for A+ content.',
  },
]

const RELATED_SERVICES = [
  { name: 'Corporate Photography & Video', path: '/services/corporate-photography-video/' },
  { name: 'AI Video Creation', path: '/services/ai-video-creation/' },
  { name: 'Social Media Marketing', path: '/services/social-media-marketing/' },
  { name: 'Website Design & Development', path: '/services/website-design-development/' },
  { name: 'Google Ads', path: '/services/google-ads/' },
]

const CTA = {
  title: 'Make your products irresistible online.',
  label: '💬 WhatsApp for Photography Quote',
}

/* ============================================================
   ICONS, inline SVG set (stroke style, matches codebase)
   ============================================================ */

const ICONS = {
  box: (
    <>
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="M3.3 7l8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  ),
  rotate: (
    <>
      <path d="M20 12a8 8 0 1 1-2.3-5.7" />
      <path d="M20 3v5h-5" />
    </>
  ),
  palette: (
    <>
      <path d="M12 22a10 10 0 1 1 10-10c0 1.7-1.3 3-3 3h-2.3a2 2 0 0 0-1.4 3.4c.6.6.2 1.6-.8 1.6z" />
      <circle cx="7.5" cy="11.5" r="1" />
      <circle cx="11" cy="7.5" r="1" />
      <circle cx="15.5" cy="9.5" r="1" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </>
  ),
  layers: (
    <>
      <path d="M12 2l9 5-9 5-9-5z" />
      <path d="M3 12l9 5 9-5" />
      <path d="M3 17l9 5 9-5" />
    </>
  ),
  whatsapp: (
    <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 1 1 16.1-3.8z" />
  ),
  tag: (
    <>
      <path d="M12 2H2v10l9.29 9.29a1 1 0 0 0 1.42 0l8.58-8.58a1 1 0 0 0 0-1.42z" />
      <circle cx="7" cy="7" r="1" />
    </>
  ),
}

function PPCIcon({ name, size = 20 }) {
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

export default function ProductPhotographyCreativeDesign() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/services/product-photography-creative-design/`,
      ogType: 'website',
    })

    const faqEntities = FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    }))

    const photoDesignService = serviceSchema({
      serviceType: 'Product Photography & Creative Design',
      name: 'Product Photography & Creative Design, Static Savvy Media',
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/services/product-photography-creative-design/`,
      provider: {
        '@type': 'Organization',
        name: 'Static Savvy Media',
        url: SITE_URL,
      },
      areaServed: [
        { '@type': 'City', name: 'Madurai' },
        { '@type': 'State', name: 'Tamil Nadu' },
        { '@type': 'Country', name: 'India' },
        { '@type': 'Country', name: 'Malaysia' },
      ],
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Services', item: `${SITE_URL}/services/` },
        { name: 'Product Photography & Creative Design', item: `${SITE_URL}/services/product-photography-creative-design/` },
      ],
    })

    const scripts = [
      photoDesignService,
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
    <div className="service-template ppcd-page">
      <style>{`
        /* --- Product Photography Services Icons --- */
        .ppcd-photo__grid > *:nth-child(1) .ppcd-photo-card__thumb-icon {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8) !important;
          box-shadow: 0 0 18px rgba(59, 130, 246, 0.45) !important;
        }
        .ppcd-photo__grid > *:nth-child(2) .ppcd-photo-card__thumb-icon {
          background: linear-gradient(135deg, #f97316, #ea580c) !important;
          box-shadow: 0 0 18px rgba(249, 115, 22, 0.45) !important;
        }
        .ppcd-photo__grid > *:nth-child(3) .ppcd-photo-card__thumb-icon {
          background: linear-gradient(135deg, #a855f7, #7c3aed) !important;
          box-shadow: 0 0 18px rgba(168, 85, 247, 0.45) !important;
        }
        .ppcd-photo__grid > *:nth-child(4) .ppcd-photo-card__thumb-icon {
          background: linear-gradient(135deg, #22c55e, #16a34a) !important;
          box-shadow: 0 0 18px rgba(34, 197, 94, 0.45) !important;
        }

        /* --- Creative Design Services Icons --- */
        .ppcd-design__grid > *:nth-child(1) .ppcd-design-card__icon {
          background: linear-gradient(135deg, #a855f7, #7c3aed) !important;
          box-shadow: 0 0 18px rgba(168, 85, 247, 0.45) !important;
        }
        .ppcd-design__grid > *:nth-child(2) .ppcd-design-card__icon {
          background: linear-gradient(135deg, #ec4899, #db2777) !important;
          box-shadow: 0 0 18px rgba(236, 72, 153, 0.45) !important;
        }
        .ppcd-design__grid > *:nth-child(3) .ppcd-design-card__icon {
          background: linear-gradient(135deg, #06b6d4, #0891b2) !important;
          box-shadow: 0 0 18px rgba(6, 182, 212, 0.45) !important;
        }
        .ppcd-design__grid > *:nth-child(4) .ppcd-design-card__icon {
          background: linear-gradient(135deg, #22c55e, #16a34a) !important;
          box-shadow: 0 0 18px rgba(34, 197, 94, 0.45) !important;
        }
      `}</style>

      {/* ---- Breadcrumbs ---- */}
      <Breadcrumbs />

      {/* ---- Hero ---- */}
      <HeroSection
        layout="two-column"
        eyebrow="Service"
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
              WhatsApp for Photography Quote
            </Button>
            <Button to="/pricing/photography-video/" variant="ghost" size="lg">
              View Photography &amp; Video Pricing
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
          <img src={productHeroImg} alt="Product Photography & Creative Design" className="hero__image" />
        </div>
      </HeroSection>

      {/* ---- Product Photography Services ---- */}
      <section className="section ppcd-photo">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Photography</span>
            <h2 className="section-heading__title">Product Photography Services</h2>
          </div>
          <div className="ppcd-photo__grid">
            {PHOTOGRAPHY_SERVICES.map((item, index) => (
              <ScrollReveal key={item.number} delay={index * 80}>
                <article className="ppcd-photo-card glass-card">
                  <div className="ppcd-photo-card__thumb" aria-hidden="true">
                    <span className="ppcd-photo-card__thumb-icon">
                      <PPCIcon name={item.icon} size={26} />
                    </span>
                    <span className="ppcd-photo-card__thumb-flash" />
                  </div>
                  <div className="ppcd-photo-card__body">
                    <div className="ppcd-photo-card__top">
                      <h3 className="ppcd-photo-card__title">{item.title}</h3>
                      <span className="ppcd-photo-card__number" aria-hidden="true">
                        {item.number}
                      </span>
                    </div>
                    <p className="ppcd-photo-card__text">{item.text}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Creative Design Services ---- */}
      <section className="section ppcd-design">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Design</span>
            <h2 className="section-heading__title">Creative Design Services</h2>
          </div>
          <div className="ppcd-design__grid">
            {DESIGN_SERVICES.map((item, index) => (
              <ScrollReveal key={item.number} delay={index * 80}>
                <article className="ppcd-design-card glass-card">
                  <span
                    className="ppcd-design-card__icon"
                    aria-hidden="true"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      width: '52px',
                      height: '52px',
                      color: '#fff',
                      marginBottom: '1rem',
                    }}
                  >
                    <PPCIcon name={item.icon} size={22} />
                  </span>
                  <div className="ppcd-design-card__body">
                    <div className="ppcd-design-card__top">
                      <h3 className="ppcd-design-card__title">{item.title}</h3>
                      <span className="ppcd-design-card__number" aria-hidden="true">
                        {item.number}
                      </span>
                    </div>
                    <p className="ppcd-design-card__text">{item.text}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <FAQSection
        eyebrow="FAQ"
        title="Product Photography, FAQs"
        faqs={FAQS}
      />

      {/* ---- Related Services ---- */}
      <section className="section ppcd-related">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Explore More</span>
            <h2 className="section-heading__title">Related Services</h2>
          </div>
          <div className="ppcd-related__links">
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

      {/* ---- Photography & Video Pricing Link ---- */}
      <section className="section pricing-link-section">
        <div className="container">
          <div className="pricing-link-section__inner glass-card gradient-border">
            <div className="pricing-link-section__text">
              <h3>Photography &amp; Video Pricing</h3>
              <p>
                Product photography and creative design projects are scoped and quoted per
                project. View the current Photography &amp; Video pricing page for project
                pricing.
              </p>
            </div>
            <Button to="/pricing/photography-video/" variant="primary" size="lg">
              View Photography &amp; Video Pricing
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
        </div>
      </section>

      {/* ---- Final CTA ---- */}
      <CTASection
        title={CTA.title}
        primaryLabel={CTA.label}
        primaryHref={whatsappHref}
        secondaryLabel="View Photography & Video Pricing"
        secondaryTo="/pricing/photography-video/"
      />
      <ContactFormSection />
    </div>
  )
}