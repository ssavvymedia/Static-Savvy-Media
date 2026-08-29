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
import '../../styles/pages/retail-ecommerce.css'
import retailHeroImg from '../../assets/images/Industries/01retail.png'

const PAGE_TITLE =
  'Digital Marketing for Retail & E-Commerce Businesses | Static Savvy Media'

const PAGE_DESCRIPTION =
  'SEO, Google Shopping, social media, and product photography for retail and e-commerce businesses in Tamil Nadu and Malaysia.'

const HERO_TITLE =
  'Digital Marketing for Retail & E-Commerce, More Traffic, More Sales'

const HERO_PARAGRAPH =
  'Online retail is one of the fastest-growing commerce channels in India and Malaysia. Whether you sell through your own website, marketplaces, social media or multiple channels, digital marketing determines how many people discover your products and how many ultimately buy.'

const SERVICES = [
  {
    title: 'Retail & E-Commerce SEO',
    icon: 'search',
    path: '/services/seo/',
    text: 'Optimize your product and category pages for searches like "organic millet flour Tamil Nadu" and "handmade jewellery Madurai" to capture buyers actively searching online.',
  },
  {
    title: 'GEO & AEO for Product Discovery',
    icon: 'sparkles',
    path: '/services/geo-aeo-ai-search/',
    text: 'Improve AI search visibility when shoppers ask ChatGPT, Perplexity and Google AI Overviews about products, categories and retail businesses in Tamil Nadu.',
  },
  {
    title: 'Local SEO & Google Business Profile',
    icon: 'mappin',
    path: '/services/local-seo/',
    text: 'Optimize Google Maps and Google Business Profile visibility so local customers find your retail store or pickup location easily.',
  },
  {
    title: 'Google Ads & Google Shopping',
    icon: 'megaphone',
    path: '/services/google-ads/',
    text: 'Paid search and Shopping campaigns targeting high-intent buyers searching for specific products, brands and categories in your target markets.',
  },
  {
    title: 'Social Media Marketing',
    icon: 'share',
    path: '/services/social-media-marketing/',
    text: 'Facebook and Instagram campaigns showcasing products, promotions and product education content to drive traffic, interest and purchase intent.',
  },
  {
    title: 'E-Commerce Website Development',
    icon: 'code',
    path: '/services/website-design-development/',
    text: 'Product-focused websites with category architecture, product pages, checkout optimization and WhatsApp-first conversion design.',
  },
]

const JOURNEY_STEPS = [
  { label: 'DISCOVER', sub: 'Search / Social / Ads', icon: 'eye' },
  { label: 'SEARCH', sub: 'Google / Shopping', icon: 'search' },
  { label: 'COMPARE', sub: 'Products / Prices', icon: 'target' },
  { label: 'VIEW PRODUCT', sub: 'Images / Details', icon: 'monitor' },
  { label: 'ADD TO CART', sub: 'Intent', icon: 'shopping-cart' },
  { label: 'CHECKOUT', sub: 'Payment', icon: 'credit-card' },
  { label: 'PURCHASE', sub: 'Conversion', icon: 'check' },
  { label: 'REPEAT', sub: 'Retention', icon: 'refresh' },
]

const CONTENT_CARDS = [
  { icon: 'book', title: 'Product Guides', text: 'Help customers understand products before purchase.' },
  { icon: 'compass', title: 'Buying Guides', text: 'Guide buyers through selection decisions.' },
  { icon: 'target', title: 'Comparisons', text: 'Help buyers evaluate product options.' },
  { icon: 'help', title: 'FAQs', text: 'Answer common product and purchase questions.' },
  { icon: 'code', title: 'How-To Content', text: 'Demonstrate product usage and value.' },
  { icon: 'layers', title: 'Category Content', text: 'Build authority around product categories.' },
]

const FAQS = [
  {
    question: 'What is Google Shopping and should my retail business use it?',
    answer:
      'Google Shopping campaigns can show a product image, name and price directly in Google search results. For retail businesses with defined product catalogues, Shopping campaigns can be an important part of a product discovery and paid acquisition strategy. We can set up and manage Shopping campaigns for businesses in India and Malaysia.',
  },
  {
    question: 'Do I need a website to sell online, or can I use Shopee and Lazada only?',
    answer:
      'Having your own website is important even when you primarily sell through marketplaces. Your website is an owned digital asset that you control, while marketplace terms, fees and algorithms can change. Your website can also be optimized for Google search traffic beyond people already browsing inside a marketplace.',
  },
  {
    question: 'How important is product photography for e-commerce?',
    answer:
      'Product photography is a critical part of the e-commerce conversion experience because customers cannot physically inspect the product before purchase. Professional images can communicate quality, size, texture, packaging, usage and details. Static Savvy Media offers e-commerce-ready product photography from its Madurai studio for major Indian and Malaysian platform requirements.',
  },
]

const CTA = {
  title:
    'Build product visibility, strengthen your online presence and create a digital customer journey designed around discovery, consideration and purchase.',
  label: '👋 WhatsApp for a Free Consultation',
}

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
  layers: (
    <>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </>
  ),
  home: (
    <>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </>
  ),
  facebook: (
    <>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </>
  ),
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </>
  ),
  'shopping-cart': (
    <>
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </>
  ),
  'credit-card': (
    <>
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </>
  ),
  refresh: (
    <>
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </>
  ),
  package: (
    <>
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </>
  ),
  tag: (
    <>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </>
  ),
}

function RetIcon({ name, size = 20 }) {
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

function Node({ label, sub = '', icon }) {
  return (
    <span className="ret-node">
      {icon && (
        <span className="ret-node__icon" aria-hidden="true">
          <RetIcon name={icon} size={15} />
        </span>
      )}
      <span className="ret-node__labels">
        <span className="ret-node__label">{label}</span>
        {sub && <span className="ret-node__sub">{sub}</span>}
      </span>
    </span>
  )
}

function Arrow() {
  return (
    <span className="ret-arrow" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </span>
  )
}

function Flow({ items = [], className = '', direction = 'vertical' }) {
  return (
    <div className={cx('ret-flow', `ret-flow--${direction}`, className)}>
      {items.map((item, index) => (
        <Fragment key={index}>
          {index > 0 && <Arrow />}
          <Node {...item} />
        </Fragment>
      ))}
    </div>
  )
}

function FaqAccordion({ faqs }) {
  const [open, setOpen] = useState(null)

  return (
    <div className="ret-faq__list">
      {faqs.map((faq, index) => {
        const isOpen = open === index
        return (
          <div className="ret-faq__item glass-card" key={index}>
            <h3 className="ret-faq__heading">
              <button
                type="button"
                className="ret-faq__question"
                id={`ret-faq-button-${index}`}
                aria-expanded={isOpen}
                aria-controls={`ret-faq-panel-${index}`}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <span className="ret-faq__question-text">{faq.question}</span>
                <span className="ret-faq__chevron" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={`ret-faq-panel-${index}`}
              role="region"
              aria-labelledby={`ret-faq-button-${index}`}
              className="ret-faq__panel"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="ret-faq__panel-inner">
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function RetailEcommerce() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/industries/retail-ecommerce/`,
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
      url: `${SITE_URL}/industries/retail-ecommerce/`,
      inLanguage: 'en',
      isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
      about: { '@type': 'Service', serviceType: 'Digital Marketing for Retail & E-Commerce Businesses' },
    }

    const service = serviceSchema({
      serviceType: 'Digital Marketing for Retail & E-Commerce Businesses',
      name: 'Digital Marketing for Retail & E-Commerce Businesses, Static Savvy Media',
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/industries/retail-ecommerce/`,
      provider: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
      areaServed: [
        { '@type': 'City', name: 'Madurai' },
        { '@type': 'City', name: 'Chennai' },
        { '@type': 'City', name: 'Coimbatore' },
        { '@type': 'State', name: 'Tamil Nadu' },
        { '@type': 'Country', name: 'India' },
        { '@type': 'Country', name: 'Malaysia' },
      ],
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Industries', item: `${SITE_URL}/industries/` },
        { name: 'Retail & E-Commerce', item: `${SITE_URL}/industries/retail-ecommerce/` },
      ],
    })

    const scripts = [webPage, service, faqPageSchema({ faqs: faqEntities }), breadcrumbs].map(
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
    <div className="service-template ret-page">
      <Breadcrumbs />

      {/* Hero */}
      <HeroSection
        layout="two-column"
        eyebrow="RETAIL • E-COMMERCE • D2C"
        title={HERO_TITLE}
        subtitle={HERO_PARAGRAPH}
        actions={
          <>
            <Button href={whatsappHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">
              WhatsApp for a Free Consultation
            </Button>
            <Button to="/services/" variant="ghost" size="lg">
              Explore Services
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Button>
          </>
        }
      >
        <div className="hero__visual-side">
          <img
            src={retailHeroImg}
            alt="Retail & E-Commerce"
            className="hero__image"
          />
        </div>
      </HeroSection>

      {/* Value Strip */}
      <section className="section ret-value-strip">
        <div className="container">
          <ScrollReveal>
            <div className="ret-value-strip__grid">
              <div className="ret-value-strip__item glass-card">
                <span className="ret-value-strip__num">01</span>
                <span className="ret-value-strip__label">GET DISCOVERED</span>
                <span className="ret-value-strip__text">Appear when shoppers search for products in your categories across Google, social media and AI search.</span>
              </div>
              <div className="ret-value-strip__item glass-card">
                <span className="ret-value-strip__num">02</span>
                <span className="ret-value-strip__label">SHOWCASE PRODUCTS</span>
                <span className="ret-value-strip__text">Present your products with professional imagery, clear information and compelling descriptions.</span>
              </div>
              <div className="ret-value-strip__item glass-card">
                <span className="ret-value-strip__num">03</span>
                <span className="ret-value-strip__label">DRIVE PURCHASE INTENT</span>
                <span className="ret-value-strip__text">Convert product interest into add-to-cart actions, checkout initiations and WhatsApp enquiries.</span>
              </div>
              <div className="ret-value-strip__item glass-card">
                <span className="ret-value-strip__num">04</span>
                <span className="ret-value-strip__label">BUILD OWNED TRAFFIC</span>
                <span className="ret-value-strip__text">Grow your website audience so you are not entirely dependent on marketplace algorithms and fees.</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Introduction */}
      <section className="section ret-intro">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Your Customers</span>
            <h2 className="section-heading__title">Your Customers Are Already Searching for Products Online</h2>
          </div>
          <ScrollReveal>
            <p className="ret-intro__text">
              Whether you sell through your own website, Amazon, Flipkart, Shopee, Lazada, or social media,
              your products exist in a competitive digital landscape. Buyers compare options, check reviews,
              evaluate images and make purchase decisions based on what they find online. Digital marketing
              determines how many potential customers discover your products and how many of them ultimately buy.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Marketplace Ecosystem */}
      <section className="section ret-marketplace-eco">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Where Your Customers Shop</span>
            <h2 className="section-heading__title">Be Present Wherever Your Customers Shop</h2>
          </div>
          <ScrollReveal>
            <div className="ret-marketplace-eco__grid">
              <div className="ret-marketplace-eco__card glass-card">
                <RetIcon name="search" size={22} />
                <h4 className="ret-marketplace-eco__title">Google</h4>
                <span className="ret-marketplace-eco__sub">Search, Shopping, AI Overviews</span>
              </div>
              <div className="ret-marketplace-eco__card glass-card">
                <RetIcon name="instagram" size={22} />
                <h4 className="ret-marketplace-eco__title">Social</h4>
                <span className="ret-marketplace-eco__sub">Instagram, Facebook</span>
              </div>
              <div className="ret-marketplace-eco__card glass-card">
                <RetIcon name="package" size={22} />
                <h4 className="ret-marketplace-eco__title">Marketplaces</h4>
                <span className="ret-marketplace-eco__sub">Amazon, Flipkart, Shopee, Lazada</span>
              </div>
              <div className="ret-marketplace-eco__card glass-card">
                <RetIcon name="globe" size={22} />
                <h4 className="ret-marketplace-eco__title">Owned Channel</h4>
                <span className="ret-marketplace-eco__sub">Your Website</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Journey Flow */}
      <section className="section ret-journey">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Buyer Journey</span>
            <h2 className="section-heading__title">From Product Discovery to Repeat Purchase</h2>
          </div>
          <ScrollReveal>
            <Flow items={JOURNEY_STEPS} direction="horizontal" className="ret-journey__flow" />
          </ScrollReveal>
        </div>
      </section>

      {/* Services */}
      <section className="section ret-services">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Our Services</span>
            <h2 className="section-heading__title">How We Help Retail &amp; E-Commerce Businesses</h2>
          </div>
          <div className="ret-services__grid">
            {SERVICES.map((svc, i) => (
              <ScrollReveal key={svc.title} delay={i * 60}>
                <Link to={svc.path} className="ret-service-card glass-card">
                  <span className="ret-service-card__number">{String(i + 1).padStart(2, '0')}</span>
                  <span className="ret-service-card__icon" aria-hidden="true"><RetIcon name={svc.icon} size={22} /></span>
                  <h3 className="ret-service-card__title">{svc.title}</h3>
                  <p className="ret-service-card__text">{svc.text}</p>
                  <span className="ret-service-card__cta">
                    Learn More
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

      {/* Google Shopping */}
      <section className="section ret-shopping">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Google Shopping</span>
            <h2 className="section-heading__title">Put Your Products Directly in Front of Buyers</h2>
          </div>
          <ScrollReveal>
            <p className="ret-shopping__text">
              Google Shopping campaigns show product images, names and prices directly in search results,
              helping shoppers make visual purchase decisions before they even click. This can be a
              powerful acquisition channel for retail businesses with defined product catalogues.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="ret-shopping__mockup glass-card">
              <div className="ret-shopping__bar">
                <RetIcon name="search" size={16} />
                <span className="ret-shopping__query">organic millet flour Tamil Nadu</span>
              </div>
              <div className="ret-shopping__grid">
                {[1, 2, 3].map((n) => (
                  <div className="ret-shopping__product glass-card" key={n}>
                    <div className="ret-shopping__product-image">
                      <RetIcon name="tag" size={24} />
                      <span className="ret-shopping__product-label">Product Image</span>
                    </div>
                    <div className="ret-shopping__product-info">
                      <div className="ret-shopping__product-name">Conceptual Product Name</div>
                      <div className="ret-shopping__product-price">₹XXX</div>
                      <div className="ret-shopping__product-store">Store Name</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="ret-shopping__queries">
                <span className="ret-shopping__example">Example: &ldquo;handmade jewellery Madurai&rdquo;</span>
                <span className="ret-shopping__example">Example: &ldquo;organic millet flour&rdquo;</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Product Discovery Funnel */}
      <section className="section ret-funnel">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Discovery Funnel</span>
            <h2 className="section-heading__title">From First Search to Repeat Customer</h2>
          </div>
          <ScrollReveal>
            <div className="ret-funnel__flow">
              <Flow
                items={[
                  { label: 'SEARCH', sub: 'Google / AI', icon: 'search' },
                  { label: 'SHOPPING/SOCIAL', sub: 'Instagram / Facebook', icon: 'share' },
                  { label: 'PRODUCT PAGE', sub: 'Images / Details', icon: 'monitor' },
                  { label: 'PRODUCT INFO', sub: 'Benefits / Specs', icon: 'book' },
                  { label: 'ADD TO CART', sub: 'Intent', icon: 'shopping-cart' },
                  { label: 'CHECKOUT', sub: 'Payment', icon: 'credit-card' },
                  { label: 'PURCHASE', sub: 'Conversion', icon: 'check' },
                ]}
                direction="horizontal"
                className="ret-funnel__main-flow"
              />
              <div className="ret-funnel__post">
                <span className="ret-funnel__post-arrow" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                </span>
                <div className="ret-funnel__retention">
                  <span className="ret-funnel__retention-label">RETENTION</span>
                  <div className="ret-funnel__retention-channels">
                    <span className="ret-funnel__channel glass-card">Retargeting</span>
                    <span className="ret-funnel__channel glass-card">Email / WhatsApp</span>
                    <span className="ret-funnel__channel glass-card">Repeat Purchase</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Product Page */}
      <section className="section ret-product-page">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Product Page</span>
            <h2 className="section-heading__title">Your Product Page Is Your Digital Salesperson</h2>
          </div>
          <ScrollReveal>
            <p className="ret-product-page__text">
              When a shopper lands on your product page, the page must do the work of a salesperson &mdash;
              present the product clearly, communicate its value, address concerns and make the next
              action obvious. A well-structured product page supports conversion from any traffic source.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="ret-product-page__mockup glass-card">
              <div className="ret-product-page__gallery">
                <div className="ret-product-page__main-image">
                  <RetIcon name="tag" size={32} />
                  <span className="ret-product-page__image-label">Product Image</span>
                </div>
                <div className="ret-product-page__thumbs">
                  <span className="ret-product-page__thumb glass-card"><RetIcon name="tag" size={12} /></span>
                  <span className="ret-product-page__thumb glass-card"><RetIcon name="tag" size={12} /></span>
                  <span className="ret-product-page__thumb glass-card"><RetIcon name="tag" size={12} /></span>
                </div>
              </div>
              <div className="ret-product-page__details">
                <span className="ret-product-page__name">Conceptual Product Name</span>
                <span className="ret-product-page__price">₹XXX</span>
                <div className="ret-product-page__variants">
                  <span className="ret-product-page__variant glass-card">Variant 1</span>
                  <span className="ret-product-page__variant glass-card">Variant 2</span>
                  <span className="ret-product-page__variant glass-card">Variant 3</span>
                </div>
                <div className="ret-product-page__benefits">
                  <span className="ret-product-page__benefit"><RetIcon name="check" size={14} /> Benefit 1</span>
                  <span className="ret-product-page__benefit"><RetIcon name="check" size={14} /> Benefit 2</span>
                  <span className="ret-product-page__benefit"><RetIcon name="check" size={14} /> Benefit 3</span>
                </div>
                <div className="ret-product-page__features">
                  <span className="ret-product-page__feature"><RetIcon name="layers" size={14} /> Features</span>
                  <span className="ret-product-page__feature"><RetIcon name="zap" size={14} /> Specifications</span>
                </div>
                <div className="ret-product-page__actions">
                  <span className="ret-product-page__action ret-product-page__action--cart glass-card">
                    <RetIcon name="shopping-cart" size={16} /> Add to Cart
                  </span>
                  <span className="ret-product-page__action ret-product-page__action--whatsapp glass-card">
                    <RetIcon name="whatsapp" size={16} /> WhatsApp Enquiry
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Product Photography */}
      <section className="section ret-photography">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Product Photography</span>
            <h2 className="section-heading__title">Make Your Products Look as Good Online as They Do in Real Life</h2>
          </div>
          <ScrollReveal>
            <p className="ret-photography__text">
              Product photography is a critical part of the e-commerce conversion experience because
              customers cannot physically inspect the product before purchase. Professional images can
              communicate quality, size, texture, packaging, usage and details that support buyer
              confidence and purchase decisions.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="ret-photography__transformation">
              <div className="ret-photography__step glass-card">
                <RetIcon name="tag" size={24} />
                <span className="ret-photography__step-label">Basic Photo</span>
                <span className="ret-photography__step-desc">Standard product image</span>
              </div>
              <span className="ret-photography__arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
              </span>
              <div className="ret-photography__step glass-card">
                <RetIcon name="star" size={24} />
                <span className="ret-photography__step-label">Professional Image</span>
                <span className="ret-photography__step-desc">Studio-quality product shot</span>
              </div>
              <span className="ret-photography__arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
              </span>
              <div className="ret-photography__step glass-card">
                <RetIcon name="monitor" size={24} />
                <span className="ret-photography__step-label">E-Commerce Product Card</span>
                <span className="ret-photography__step-desc">Platform-optimized listing</span>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="ret-photography__formats">
              <span className="ret-photography__format glass-card">White Background</span>
              <span className="ret-photography__format glass-card">Lifestyle / Context</span>
              <span className="ret-photography__format glass-card">Detail / Macro</span>
              <span className="ret-photography__format glass-card">Scale Reference</span>
              <span className="ret-photography__format glass-card">Packaging</span>
              <span className="ret-photography__format glass-card">Infographic Overlay</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Marketplace vs Website */}
      <section className="section ret-marketplace-vs">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Marketplace vs Website</span>
            <h2 className="section-heading__title">Your Marketplace Store Is Useful. Your Website Is an Asset.</h2>
          </div>
          <ScrollReveal>
            <div className="ret-marketplace-vs__panels">
              <div className="ret-marketplace-vs__panel glass-card">
                <h4 className="ret-marketplace-vs__panel-title"><RetIcon name="package" size={20} /> Marketplace Store</h4>
                <ul className="ret-marketplace-vs__list">
                  <li>Access to existing marketplace traffic</li>
                  <li>Built-in buyer trust and payment systems</li>
                  <li>Platform-controlled fees and algorithms</li>
                  <li>Limited brand customization</li>
                  <li>Competing alongside similar products</li>
                </ul>
              </div>
              <div className="ret-marketplace-vs__panel glass-card">
                <h4 className="ret-marketplace-vs__panel-title"><RetIcon name="globe" size={20} /> Your Own Website</h4>
                <ul className="ret-marketplace-vs__list">
                  <li>Full control over brand experience</li>
                  <li>SEO traffic you own and can grow</li>
                  <li>Direct customer relationship and data</li>
                  <li>Flexible pricing without marketplace commissions</li>
                  <li>Long-term digital asset you control</li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Social Commerce */}
      <section className="section ret-social-commerce">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Social Commerce</span>
            <h2 className="section-heading__title">Turn Social Attention Into Product Interest</h2>
          </div>
          <ScrollReveal>
            <p className="ret-social-commerce__text">
              Facebook and Instagram are primary discovery and consideration platforms for retail
              consumers. Product-focused content, demonstrations and promotions can help move shoppers
              from casual browsing to purchase intent and ultimately to your website, marketplace
              store or WhatsApp conversation.
            </p>
          </ScrollReveal>
          <div className="ret-social-commerce__grid">
            <ScrollReveal delay={0}><div className="ret-social-card glass-card"><RetIcon name="instagram" size={20} /><h4 className="ret-social-card__title">Instagram Reel</h4><p className="ret-social-card__text">Short product showcase and unboxing content.</p></div></ScrollReveal>
            <ScrollReveal delay={60}><div className="ret-social-card glass-card"><RetIcon name="instagram" size={20} /><h4 className="ret-social-card__title">Carousel Post</h4><p className="ret-social-card__text">Multi-image product feature and benefits showcase.</p></div></ScrollReveal>
            <ScrollReveal delay={120}><div className="ret-social-card glass-card"><RetIcon name="facebook" size={20} /><h4 className="ret-social-card__title">Facebook Ad</h4><p className="ret-social-card__text">Paid product campaigns targeting buyer audiences.</p></div></ScrollReveal>
            <ScrollReveal delay={180}><div className="ret-social-card glass-card"><RetIcon name="tag" size={20} /><h4 className="ret-social-card__title">Product Post</h4><p className="ret-social-card__text">Organic product content and collection highlights.</p></div></ScrollReveal>
            <ScrollReveal delay={240}><div className="ret-social-card glass-card"><RetIcon name="monitor" size={20} /><h4 className="ret-social-card__title">Short-form Video</h4><p className="ret-social-card__text">Product demonstrations and usage content.</p></div></ScrollReveal>
          </div>
        </div>
      </section>

      {/* Local Retail */}
      <section className="section ret-local-seo">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Local Retail</span>
            <h2 className="section-heading__title">Help Nearby Customers Find Your Store</h2>
          </div>
          <ScrollReveal>
            <p className="ret-local-seo__text">
              When local customers search for products nearby, Google Business Profile visibility
              can help your retail store appear in local search results and Google Maps, driving
              foot traffic and local enquiries.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="ret-local-seo__mockup glass-card">
              <div className="ret-local-seo__header">
                <RetIcon name="mappin" size={18} />
                <span className="ret-local-seo__business-name">Your Retail Store</span>
              </div>
              <div className="ret-local-seo__body">
                <div className="ret-local-seo__info">
                  <span>Category: Retail Store</span>
                  <span>Location: Madurai, Tamil Nadu</span>
                  <span>Rating: Verified Profile</span>
                  <span>Hours: Mon - Sun, 10:00 AM - 9:00 PM</span>
                </div>
                <div className="ret-local-seo__actions">
                  <span className="ret-local-seo__action">Call</span>
                  <span className="ret-local-seo__action">Directions</span>
                  <span className="ret-local-seo__action">WhatsApp</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* GEO / AEO */}
      <section className="section ret-geo">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">AI Search</span>
            <h2 className="section-heading__title">Make Your Products Easier for AI Search to Understand</h2>
          </div>
          <ScrollReveal>
            <p className="ret-geo__text">
              Shoppers increasingly ask AI tools about products, brands, categories and where to buy.
              A strong GEO/AEO strategy can help structure your digital presence so AI systems can
              better understand your products, business and relevance to retail searches.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="ret-geo__signals">
              <div className="ret-geo__signal glass-card"><RetIcon name="tag" size={18} /><span>Product Info</span></div>
              <div className="ret-geo__signal glass-card"><RetIcon name="building" size={18} /><span>Business Info</span></div>
              <div className="ret-geo__signal glass-card"><RetIcon name="layers" size={18} /><span>Category Expertise</span></div>
              <div className="ret-geo__signal glass-card"><RetIcon name="help" size={18} /><span>FAQs</span></div>
              <div className="ret-geo__signal glass-card"><RetIcon name="book" size={18} /><span>Useful Content</span></div>
              <div className="ret-geo__signal glass-card"><RetIcon name="code" size={18} /><span>Structured Data</span></div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <section className="section ret-content">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Content</span>
            <h2 className="section-heading__title">Content That Helps Customers Choose</h2>
          </div>
          <div className="ret-content__grid">
            {CONTENT_CARDS.map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 60}>
                <div className="ret-content-card glass-card">
                  <span className="ret-content-card__icon" aria-hidden="true"><RetIcon name={card.icon} size={20} /></span>
                  <h3 className="ret-content-card__title">{card.title}</h3>
                  <p className="ret-content-card__text">{card.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing System */}
      <section className="section ret-ecosystem">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Marketing System</span>
            <h2 className="section-heading__title">The Retail Marketing System</h2>
          </div>
          <ScrollReveal>
            <div className="ret-ecosystem__flow">
              <div className="ret-ecosystem__channels glass-card">
                <span className="ret-ecosystem__channel-label">MARKETING CHANNELS</span>
                <div className="ret-ecosystem__channel-list">
                  <span className="ret-ecosystem__channel"><RetIcon name="search" size={14} /> SEO</span>
                  <span className="ret-ecosystem__channel"><RetIcon name="megaphone" size={14} /> Google Search</span>
                  <span className="ret-ecosystem__channel"><RetIcon name="tag" size={14} /> Google Shopping</span>
                  <span className="ret-ecosystem__channel"><RetIcon name="instagram" size={14} /> Social Media</span>
                  <span className="ret-ecosystem__channel"><RetIcon name="mappin" size={14} /> Local SEO</span>
                  <span className="ret-ecosystem__channel"><RetIcon name="sparkles" size={14} /> GEO/AEO</span>
                  <span className="ret-ecosystem__channel"><RetIcon name="package" size={14} /> Marketplace</span>
                  <span className="ret-ecosystem__channel"><RetIcon name="globe" size={14} /> Website</span>
                </div>
              </div>
              <span className="ret-ecosystem__arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
              </span>
              <span className="ret-ecosystem__node glass-card"><RetIcon name="search" size={16} /><span>Product Discovery</span></span>
              <span className="ret-ecosystem__arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
              </span>
              <span className="ret-ecosystem__node glass-card"><RetIcon name="monitor" size={16} /><span>Product Page</span></span>
              <span className="ret-ecosystem__arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
              </span>
              <span className="ret-ecosystem__node glass-card"><RetIcon name="check" size={16} /><span>Purchase</span></span>
              <span className="ret-ecosystem__arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
              </span>
              <span className="ret-ecosystem__node glass-card"><RetIcon name="refresh" size={16} /><span>Repeat Customer</span></span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Retention */}
      <section className="section ret-retention">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Retention</span>
            <h2 className="section-heading__title">The First Purchase Should Not Be the Last</h2>
          </div>
          <ScrollReveal>
            <p className="ret-retention__text">
              Acquiring a new customer is typically more expensive than retaining an existing one.
              A retention strategy using email, WhatsApp, retargeting and social media can help
              turn one-time buyers into repeat customers.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="ret-retention__grid">
              <div className="ret-retention__item glass-card"><RetIcon name="message" size={20} /><span>Email</span></div>
              <div className="ret-retention__item glass-card"><RetIcon name="whatsapp" size={20} /><span>WhatsApp</span></div>
              <div className="ret-retention__item glass-card"><RetIcon name="target" size={20} /><span>Retargeting</span></div>
              <div className="ret-retention__item glass-card"><RetIcon name="instagram" size={20} /><span>Social Media</span></div>
              <div className="ret-retention__item glass-card"><RetIcon name="book" size={20} /><span>Content</span></div>
              <div className="ret-retention__item glass-card"><RetIcon name="tag" size={20} /><span>Product Recommendations</span></div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section ret-faq">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">FAQ</span>
            <h2 className="section-heading__title">Frequently Asked Questions &mdash; Retail &amp; E-Commerce</h2>
          </div>
          <FaqAccordion faqs={FAQS} />
        </div>
      </section>

      {/* Locations */}
      <section className="section ret-locations">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Coverage</span>
            <h2 className="section-heading__title">Retail &amp; E-Commerce Digital Marketing Across Tamil Nadu &amp; Malaysia</h2>
          </div>
          <div className="ret-locations__grid">
            <ScrollReveal className="ret-locations__cell">
              <div className="ret-location-card glass-card">
                <span className="ret-location-card__icon" aria-hidden="true"><RetIcon name="mappin" size={26} /></span>
                <h3 className="ret-location-card__title">Tamil Nadu</h3>
                <p className="ret-location-card__text">
                  From Madurai to Chennai, Coimbatore and beyond, we help retail and e-commerce businesses
                  rank for product-intent searches across Tamil Nadu.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal className="ret-locations__cell">
              <div className="ret-location-card glass-card">
                <span className="ret-location-card__icon" aria-hidden="true"><RetIcon name="globe" size={26} /></span>
                <h3 className="ret-location-card__title">Malaysia</h3>
                <p className="ret-location-card__text">
                  We help retail businesses operating across Malaysia with digital marketing strategies
                  tailored to the Malaysian consumer landscape, Shopee, Lazada and local search behaviour.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Related Industries */}
      <section className="section ret-related">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Explore More</span>
            <h2 className="section-heading__title">Related Industries</h2>
          </div>
          <div className="ret-related__links">
            <Link to="/industries/education-training/" className="related-content__link">Education &amp; Training</Link>
            <Link to="/industries/healthcare-clinics/" className="related-content__link">Healthcare &amp; Clinics</Link>
            <Link to="/industries/textiles-madurai/" className="related-content__link">Textiles &amp; Madurai</Link>
            <Link to="/industries/" className="related-content__link">All Industries</Link>
            <Link to="/services/" className="related-content__link">All Services</Link>
            <Link to="/contact/" className="related-content__link">Contact</Link>
            <Link to="/faq/" className="related-content__link">FAQ</Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
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
