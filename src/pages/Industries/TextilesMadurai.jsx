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
import '../../styles/pages/textiles-madurai.css'
import textileHeroImg from '../../assets/images/Industries/05textile.webp'

const PAGE_TITLE =
  'Digital Marketing for Textile & Garment Businesses in Madurai | Static Savvy Media'

const PAGE_DESCRIPTION =
  "SEO, e-commerce, product photography, and social media for Madurai's textile industry. Sarees, dress materials, and fabric exporters."

const HERO_TITLE =
  'Digital Marketing for Madurai’s Textile Industry, Reach More Buyers, Online and Beyond'

const HERO_PARAGRAPH =
  "Madurai is one of Tamil Nadu’s most important textile trading centres. The silk saree corridors, dress material wholesalers, readymade garment manufacturers, and export-oriented fabric businesses of Madurai have served buyers across Tamil Nadu, India, and the diaspora for generations. Digital marketing opens the same scale of reach, but to a global online audience."

const SERVICES = [
  {
    title: 'SEO for Madurai Textile Businesses',
    icon: 'search',
    color: 'icon-badge--magenta',
    path: '/services/seo/',
    text: 'Local and regional keyword targeting specific to your industry category and buyer search patterns in Tamil Nadu and Malaysia.',
  },
  {
    title: 'GEO & AEO, AI Search Visibility',
    icon: 'sparkles',
    color: 'icon-badge--amber',
    path: '/services/geo-aeo-ai-search/',
    text: 'AI search visibility for industry-specific queries your clients are asking ChatGPT, Perplexity and Google AI Overviews.',
  },
  {
    title: 'Local SEO & Google Business Profile',
    icon: 'mappin',
    color: 'icon-badge--purple',
    path: '/services/local-seo/',
    text: 'Google Maps and GBP optimization, particularly important for businesses where clients search for a provider near their location.',
  },
  {
    title: 'Google Ads for High-Intent Textile Buyers',
    icon: 'megaphone',
    color: 'icon-badge--blue',
    path: '/services/google-ads/',
    text: 'Paid search campaigns targeting high-intent buyers in your category, structured for WhatsApp enquiry conversion.',
  },
  {
    title: 'Social Media Marketing for Textile Brands',
    icon: 'share',
    color: 'icon-badge--pink',
    path: '/services/social-media-marketing/',
    text: "Platform-specific content and advertising for your industry’s audience demographics.",
  },
  {
    title: 'SEO-Ready Website Development',
    icon: 'code',
    color: 'icon-badge--cyan',
    path: '/services/website-design-development/',
    text: 'SEO-ready sites with industry-appropriate content architecture and WhatsApp-first conversion design.',
  },
]

const HERITAGE_CATEGORIES = [
  { icon: 'layers', color: 'icon-badge--magenta', title: 'Silk Sarees', text: "Madurai’s signature textile craft serving buyers across Tamil Nadu and the diaspora." },
  { icon: 'tag', color: 'icon-badge--amber', title: 'Dress Materials', text: 'Wholesale and retail dress material businesses reaching buyers through digital channels.' },
  { icon: 'package', color: 'icon-badge--purple', title: 'Readymade Garments', text: 'Manufacturers and retailers building online visibility for their garment collections.' },
  { icon: 'layers', color: 'icon-badge--blue', title: 'Fabric Businesses', text: 'Fabric suppliers and traders extending their reach beyond the traditional market.' },
  { icon: 'briefcase', color: 'icon-badge--green', title: 'Textile Wholesalers', text: 'Wholesale businesses discovering new retail and B2B buyers through online search.' },
  { icon: 'globe', color: 'icon-badge--cyan', title: 'Export-Oriented', text: 'Textile exporters reaching international buyers through digital presence and e-commerce.' },
]

const JOURNEY_STEPS = [
  { label: 'DISCOVER', sub: 'Google / Instagram / Facebook', icon: 'search', color: 'icon-badge--magenta' },
  { label: 'EXPLORE', sub: 'Website / Catalogue', icon: 'monitor', color: 'icon-badge--amber' },
  { label: 'TRUST', sub: 'Photography / Details / Brand', icon: 'shield', color: 'icon-badge--purple' },
  { label: 'ENQUIRE', sub: 'WhatsApp / Contact', icon: 'message', color: 'icon-badge--blue' },
  { label: 'BUY', sub: 'Website / Marketplace / Direct', icon: 'check', color: 'icon-badge--green' },
]

const PHOTOGRAPHY_STEPS = [
  { icon: 'tag', color: 'icon-badge--magenta', label: 'White Background', desc: 'Product shots on clean backgrounds for e-commerce listings.' },
  { icon: 'star', color: 'icon-badge--amber', label: 'Lifestyle', desc: 'Saree worn and styled in aspirational settings for social media.' },
  { icon: 'layers', color: 'icon-badge--purple', label: 'Texture', desc: 'Close-up shots showing fabric weave and texture detail.' },
  { icon: 'eye', color: 'icon-badge--cyan', label: 'Border Detail', desc: 'Border and pallu detail shots highlighting craftsmanship.' },
  { icon: 'monitor', color: 'icon-badge--blue', label: 'Drape', desc: 'How the saree drapes and falls when worn.' },
  { icon: 'share', color: 'icon-badge--pink', label: 'Social Media Hero', desc: 'Hero imagery optimized for Instagram and Facebook.' },
]

const SEARCH_QUERIES = {
  local: ['textiles in Madurai', 'silk sarees Madurai'],
  regional: ['Tamil Nadu textile suppliers', 'Tamil Nadu saree suppliers'],
  product: ['silk sarees', 'dress materials', 'fabric', 'readymade garments'],
  international: ['Madurai silk sarees online', 'Tamil textiles overseas'],
}

const BUSINESS_TYPES = [
  { icon: 'layers', color: 'icon-badge--magenta', title: 'Silk Saree Retailers' },
  { icon: 'tag', color: 'icon-badge--amber', title: 'Dress Material Wholesalers' },
  { icon: 'package', color: 'icon-badge--purple', title: 'Readymade Garment Manufacturers' },
  { icon: 'layers', color: 'icon-badge--blue', title: 'Fabric Suppliers' },
  { icon: 'briefcase', color: 'icon-badge--green', title: 'Textile Traders' },
  { icon: 'globe', color: 'icon-badge--cyan', title: 'Export-Oriented Businesses' },
  { icon: 'shopping-cart', color: 'icon-badge--pink', title: 'Online Textile Stores' },
]

const BUYER_TYPES = {
  b2c: ['Saree shoppers', 'Ethnic wear buyers', 'Festival shoppers', 'Diaspora customers', 'Online customers'],
  b2b: ['Retailers', 'Garment businesses', 'Textile traders', 'Distributors', 'Export-oriented buyers'],
}

const FAQS = [
  {
    question: 'Can I sell silk sarees and textile products online effectively?',
    answer:
      'Yes. The Indian silk saree and ethnic wear market online is substantial and growing, driven by diaspora buyers in the US, UK, Singapore, and Malaysia who cannot easily access Tamil Nadu textiles locally. E-commerce on your own website or marketplace platforms, combined with Instagram marketing and WhatsApp catalogue selling, is an effective combination for Madurai textile businesses.',
  },
  {
    question: 'What type of photography do I need for textile products?',
    answer:
      'For e-commerce: white background product shots showing drape, pattern, and border detail clearly. For social media: lifestyle photography showing the saree worn and styled in aspirational settings. Texture close-ups and border detail shots are also important purchase decision content. These are produced from the Madurai studio.',
  },
  {
    question: 'How do I reach Tamil diaspora buyers in Malaysia and Singapore?',
    answer:
      'Facebook and Instagram advertising with location targeting for Malaysia and Singapore, combined with relevant diaspora interest targeting such as Tamil culture, Indian festivals and silk sarees, can reach these audiences. WhatsApp remains a communication channel for diaspora buyers placing orders.',
  },
]

const CTA = {
  title:
    "Let’s Grow Your Textiles & Garments, Madurai Business With Digital Marketing That Understands Your Sector.",
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

function TmIcon({ name, size = 20 }) {
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

function FaqAccordion({ faqs }) {
  const [open, setOpen] = useState(null)

  return (
    <div className="tm-faq__list">
      {faqs.map((faq, index) => {
        const isOpen = open === index
        return (
          <div className={cx('tm-faq__item', 'glass-card', isOpen && 'tm-faq__item--open')} key={index}>
            <h3 className="tm-faq__heading">
              <button
                type="button"
                className="tm-faq__question"
                id={`tm-faq-button-${index}`}
                aria-expanded={isOpen}
                aria-controls={`tm-faq-panel-${index}`}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <span className="tm-faq__question-text">{faq.question}</span>
                <span className="tm-faq__chevron" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={`tm-faq-panel-${index}`}
              role="region"
              aria-labelledby={`tm-faq-button-${index}`}
              className={cx('tm-faq__panel', isOpen && 'tm-faq__panel--open')}
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="tm-faq__panel-inner">
                <p className="tm-faq__answer">{faq.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function TextilesMadurai() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/industries/textiles-madurai/`,
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
      url: `${SITE_URL}/industries/textiles-madurai/`,
      inLanguage: 'en',
      isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
      about: { '@type': 'Service', serviceType: 'Digital Marketing for Madurai Textile Businesses' },
    }

    const service = serviceSchema({
      serviceType: 'Digital Marketing for Madurai Textile Businesses',
      name: 'Digital Marketing for Madurai Textile Businesses, Static Savvy Media',
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/industries/textiles-madurai/`,
      provider: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
      areaServed: [
        { '@type': 'City', name: 'Madurai' },
        { '@type': 'State', name: 'Tamil Nadu' },
        { '@type': 'Country', name: 'India' },
        { '@type': 'Country', name: 'Malaysia' },
        { '@type': 'Country', name: 'Singapore' },
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'United Kingdom' },
      ],
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Industries', item: `${SITE_URL}/industries/` },
        { name: 'Textiles Madurai', item: `${SITE_URL}/industries/textiles-madurai/` },
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
    <div className="service-template tm-page">
      <Breadcrumbs />

      {/* 2. HERO SECTION */}
      <HeroSection
        layout="two-column"
        eyebrow="MADURAI TEXTILES • DIGITAL GROWTH"
        title={HERO_TITLE}
        subtitle={HERO_PARAGRAPH}
        actions={
          <>
            <Button href={whatsappHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">
              WhatsApp for a Free Consultation
            </Button>
            <Button to="/services/" variant="ghost" size="lg">
              Explore Textile Marketing
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Button>
          </>
        }
      >
        <div className="hero__visual-side">
          <img
            src={textileHeroImg}
            width={1536}
            height={1024}
            fetchPriority="high"
            alt="Madurai Textiles"
            className="hero__image"
          />
        </div>
      </HeroSection>

      {/* 3. SMALL HIGHLIGHT / FEATURE CARDS */}
      <section className="section tm-value-strip">
        <div className="container">
          <ScrollReveal>
            <div className="tm-value-strip__grid">
              {[
                { num: '01', label: 'GET DISCOVERED', icon: 'search', color: 'icon-badge--magenta', text: 'Appear when buyers search for textiles, sarees and fabric businesses across Google, social media and AI search.' },
                { num: '02', label: 'BUILD ONLINE PRESENCE', icon: 'monitor', color: 'icon-badge--amber', text: 'Create a professional website, social media presence and Google Business Profile that builds trust with buyers.' },
                { num: '03', label: 'REACH GLOBAL BUYERS', icon: 'globe', color: 'icon-badge--purple', text: 'Extend your reach beyond Madurai to buyers across Tamil Nadu, India, Malaysia, Singapore and the diaspora.' },
                { num: '04', label: 'SELL ONLINE', icon: 'whatsapp', color: 'icon-badge--green', text: 'Convert digital attention into WhatsApp messages, enquiries and orders from retail and wholesale buyers.' },
              ].map((item) => (
                <div key={item.num} className="tm-value-strip__item glass-card">
                  <div className="tm-value-strip__header">
                    <span className="tm-value-strip__num">{item.num}</span>
                    <span className={cx('tm-value-strip__icon', 'icon-badge', item.color)} aria-hidden="true">
                      <TmIcon name={item.icon} size={18} />
                    </span>
                  </div>
                  <span className="tm-value-strip__label">{item.label}</span>
                  <p className="tm-value-strip__text">{item.text}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. TEXTILE HERITAGE */}
      <section className="section tm-heritage" style={{ scrollMarginTop: '6rem' }}>
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Textile Heritage</span>
            <h2 className="section-heading__title">Madurai&rsquo;s Textile Business Has a Story to Tell</h2>
          </div>
          <ScrollReveal>
            <div className="tm-heritage__grid">
              {HERITAGE_CATEGORIES.map((cat) => (
                <div className="tm-heritage__card glass-card" key={cat.title}>
                  <span className={cx('tm-heritage__icon', 'icon-badge', cat.color)} aria-hidden="true">
                    <TmIcon name={cat.icon} size={20} />
                  </span>
                  <h3 className="tm-heritage__title">{cat.title}</h3>
                  <p className="tm-heritage__text">{cat.text}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. DIGITAL TRANSFORMATION */}
      <section className="section tm-digital-transform" style={{ scrollMarginTop: '6rem' }}>
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Digital Transformation</span>
            <h2 className="section-heading__title">Take Madurai&rsquo;s Textile Trade Beyond the Traditional Market</h2>
          </div>
          <ScrollReveal>
            <div className="tm-digital-transform__grid">
              {[
                { label: 'TRADITIONAL TEXTILE BUSINESS', sub: 'Madurai market', icon: 'building', color: 'icon-badge--purple' },
                { label: 'WEBSITE', sub: 'Digital storefront', icon: 'code', color: 'icon-badge--blue' },
                { label: 'SEO', sub: 'Search visibility', icon: 'search', color: 'icon-badge--cyan' },
                { label: 'SOCIAL MEDIA', sub: 'Instagram / Facebook', icon: 'share', color: 'icon-badge--pink' },
                { label: 'E-COMMERCE', sub: 'Online sales', icon: 'shopping-cart', color: 'icon-badge--orange' },
                { label: 'WHATSAPP', sub: 'Buyer enquiries', icon: 'whatsapp', color: 'icon-badge--green' },
                { label: 'GLOBAL BUYERS', sub: 'India + Diaspora', icon: 'globe', color: 'icon-badge--gold' },
              ].map((step, index) => (
                <div className="tm-digital-transform__card glass-card" key={step.label}>
                  <div className="tm-digital-transform__card-top">
                    <span className="tm-digital-transform__step-num">Step 0{index + 1}</span>
                    <span className={cx('tm-digital-transform__icon', 'icon-badge', step.color)} aria-hidden="true">
                      <TmIcon name={step.icon} size={18} />
                    </span>
                  </div>
                  <h3 className="tm-digital-transform__card-title">{step.label}</h3>
                  <p className="tm-digital-transform__card-sub">{step.sub}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 6. SERVICES */}
      <section className="section tm-services" style={{ scrollMarginTop: '6rem' }}>
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Our Services</span>
            <h2 className="section-heading__title">How We Help Textiles &amp; Garments &mdash; Madurai Businesses</h2>
          </div>
          <div className="tm-services__grid">
            {SERVICES.map((svc, i) => (
              <ScrollReveal key={svc.title} delay={i * 60}>
                <Link to={svc.path} className="tm-service-card glass-card">
                  <div className="tm-service-card__top">
                    <span className="tm-service-card__number">{String(i + 1).padStart(2, '0')}</span>
                    <span className={cx('tm-service-card__icon', 'icon-badge', svc.color)} aria-hidden="true">
                      <TmIcon name={svc.icon} size={20} />
                    </span>
                  </div>
                  <h3 className="tm-service-card__title">{svc.title}</h3>
                  <p className="tm-service-card__text">{svc.text}</p>
                  <span className="tm-service-card__cta">
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

      {/* 7. ONLINE TEXTILE SALES */}
      <section className="section tm-online-sales" style={{ scrollMarginTop: '6rem' }}>
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Online Sales</span>
            <h2 className="section-heading__title">Can Madurai Textile Businesses Sell Effectively Online?</h2>
          </div>
          <ScrollReveal>
            <div className="tm-online-sales__card glass-card">
              <p className="tm-online-sales__text">
                Yes. The Indian silk saree and ethnic wear market online is substantial and growing &mdash;
                driven by diaspora buyers in the US, UK, Singapore, and Malaysia who cannot easily
                access Tamil Nadu textiles locally. E-commerce on your own website or marketplace
                platforms, combined with Instagram marketing and WhatsApp catalogue selling, is an
                effective combination for Madurai textile businesses.
              </p>
              <div className="tm-online-sales__grid">
                {[
                  { label: 'PRODUCT', sub: 'Saree / Fabric', icon: 'layers', color: 'icon-badge--magenta' },
                  { label: 'INSTAGRAM', sub: 'Discovery / Reels', icon: 'instagram', color: 'icon-badge--pink' },
                  { label: 'WEBSITE / MARKETPLACE', sub: 'Product page', icon: 'globe', color: 'icon-badge--cyan' },
                  { label: 'WHATSAPP CATALOGUE', sub: 'Buyer conversation', icon: 'whatsapp', color: 'icon-badge--green' },
                  { label: 'ORDER', sub: 'Purchase', icon: 'check', color: 'icon-badge--gold' },
                ].map((item, index) => (
                  <div key={item.label} className="tm-online-sales__step-card glass-card">
                    <div className="tm-online-sales__step-header">
                      <span className="tm-online-sales__step-num">0{index + 1}</span>
                      <span className={cx('tm-online-sales__icon', 'icon-badge', item.color)} aria-hidden="true">
                        <TmIcon name={item.icon} size={18} />
                      </span>
                    </div>
                    <span className="tm-online-sales__step-label">{item.label}</span>
                    <span className="tm-online-sales__step-sub">{item.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 8. GLOBAL BUYERS */}
      <section className="section tm-global-buyers" style={{ scrollMarginTop: '6rem' }}>
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Global Reach</span>
            <h2 className="section-heading__title">From Madurai to Buyers Around the World</h2>
          </div>
          <ScrollReveal>
            <div className="tm-global-buyers__card glass-card">
              <div className="tm-global-buyers__center">
                <span className="icon-badge icon-badge--magenta" aria-hidden="true">
                  <TmIcon name="building" size={22} />
                </span>
                <span className="tm-global-buyers__city">MADURAI HUB</span>
              </div>
              <div className="tm-global-buyers__markets">
                {[
                  { country: 'USA', color: 'icon-badge--blue' },
                  { country: 'UK', color: 'icon-badge--purple' },
                  { country: 'SINGAPORE', color: 'icon-badge--cyan' },
                  { country: 'MALAYSIA', color: 'icon-badge--amber' },
                ].map((m) => (
                  <div key={m.country} className="tm-global-buyers__market glass-card">
                    <span className={cx('tm-global-buyers__market-icon', 'icon-badge', m.color)} aria-hidden="true">
                      <TmIcon name="globe" size={18} />
                    </span>
                    <span className="tm-global-buyers__country">{m.country}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 9. DIASPORA MARKETING */}
      <section className="section tm-diaspora" style={{ scrollMarginTop: '6rem' }}>
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Diaspora Reach</span>
            <h2 className="section-heading__title">Reach Tamil Diaspora Buyers in Malaysia &amp; Singapore</h2>
          </div>
          <ScrollReveal>
            <p className="tm-diaspora__text">
              Facebook and Instagram advertising with location targeting for Malaysia and Singapore,
              combined with relevant diaspora interest targeting such as Tamil culture, Indian festivals
              and silk sarees, can reach these audiences. WhatsApp remains a communication channel
              for diaspora buyers placing orders.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="tm-diaspora__grid">
              <div className="tm-diaspora__item glass-card">
                <span className="icon-badge icon-badge--blue" aria-hidden="true"><TmIcon name="facebook" size={20} /></span>
                <span className="tm-diaspora__item-title">Facebook + Location Targeting</span>
              </div>
              <div className="tm-diaspora__item glass-card">
                <span className="icon-badge icon-badge--pink" aria-hidden="true"><TmIcon name="instagram" size={20} /></span>
                <span className="tm-diaspora__item-title">Instagram + Diaspora Interest Targeting</span>
              </div>
              <div className="tm-diaspora__item glass-card">
                <span className="icon-badge icon-badge--green" aria-hidden="true"><TmIcon name="whatsapp" size={20} /></span>
                <span className="tm-diaspora__item-title">WhatsApp Order Channel</span>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="tm-diaspora__interests">
              <span className="tm-diaspora__interest glass-card">
                <TmIcon name="tag" size={14} /> Tamil culture
              </span>
              <span className="tm-diaspora__interest glass-card">
                <TmIcon name="sparkles" size={14} /> Indian festivals
              </span>
              <span className="tm-diaspora__interest glass-card">
                <TmIcon name="layers" size={14} /> Silk sarees
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 10. TEXTILE E-COMMERCE */}
      <section className="section tm-ecommerce" style={{ scrollMarginTop: '6rem' }}>
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">E-Commerce</span>
            <h2 className="section-heading__title">Build a Textile Store That Sells the Product, Not Just the Website</h2>
          </div>
          <ScrollReveal>
            <div className="tm-ecommerce__mockup glass-card">
              <div className="tm-ecommerce__gallery">
                <div className="tm-ecommerce__main-image">
                  <TmIcon name="layers" size={32} />
                  <span className="tm-ecommerce__image-label">Saree Image</span>
                </div>
                <div className="tm-ecommerce__thumbs">
                  <span className="tm-ecommerce__thumb glass-card"><TmIcon name="tag" size={12} /></span>
                  <span className="tm-ecommerce__thumb glass-card"><TmIcon name="layers" size={12} /></span>
                  <span className="tm-ecommerce__thumb glass-card"><TmIcon name="eye" size={12} /></span>
                </div>
              </div>
              <div className="tm-ecommerce__details">
                <span className="tm-ecommerce__name">Madurai Silk Saree &mdash; Kanchipuram weave</span>
                <span className="tm-ecommerce__category">Silk Sarees</span>
                <span className="tm-ecommerce__price">₹XXX</span>
                <div className="tm-ecommerce__meta">
                  <span className="tm-ecommerce__meta-item glass-card">Colour: Burgundy</span>
                  <span className="tm-ecommerce__meta-item glass-card">Size: Free</span>
                </div>
                <div className="tm-ecommerce__actions">
                  <span className="tm-ecommerce__action tm-ecommerce__action--view glass-card">
                    <TmIcon name="eye" size={16} /> View Product
                  </span>
                  <span className="tm-ecommerce__action tm-ecommerce__action--whatsapp glass-card">
                    <TmIcon name="whatsapp" size={16} /> WhatsApp Enquiry
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="tm-ecommerce__categories">
              <span className="tm-ecommerce__category-chip glass-card">Silk Sarees</span>
              <span className="tm-ecommerce__category-chip glass-card">Dress Materials</span>
              <span className="tm-ecommerce__category-chip glass-card">Readymade Garments</span>
              <span className="tm-ecommerce__category-chip glass-card">Fabrics</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 11. PRODUCT PHOTOGRAPHY */}
      <section className="section tm-photography" style={{ scrollMarginTop: '6rem' }}>
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Product Photography</span>
            <h2 className="section-heading__title">Show the Drape, Texture &amp; Detail</h2>
          </div>
          <ScrollReveal>
            <div className="tm-photography__grid">
              {PHOTOGRAPHY_STEPS.map((step, index) => (
                <div className="tm-photography__card glass-card" key={step.label}>
                  <div className="tm-photography__card-top">
                    <span className="tm-photography__num">0{index + 1}</span>
                    <span className={cx('tm-photography__icon', 'icon-badge', step.color)} aria-hidden="true">
                      <TmIcon name={step.icon} size={18} />
                    </span>
                  </div>
                  <h3 className="tm-photography__label">{step.label}</h3>
                  <p className="tm-photography__desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 12. PHOTOGRAPHY IMPACT */}
      <section className="section tm-photo-connection" style={{ scrollMarginTop: '6rem' }}>
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Photography Impact</span>
            <h2 className="section-heading__title">From Product to Purchase &mdash; Photography Drives Every Step</h2>
          </div>
          <ScrollReveal>
            <div className="tm-photo-connection__grid">
              {[
                { label: 'GOOD PRODUCT', sub: 'Quality textile', icon: 'layers', color: 'icon-badge--magenta' },
                { label: 'GOOD PHOTOGRAPHY', sub: 'Studio images', icon: 'star', color: 'icon-badge--amber' },
                { label: 'BETTER ONLINE PRESENTATION', sub: 'Website / Social', icon: 'monitor', color: 'icon-badge--cyan' },
                { label: 'CUSTOMER UNDERSTANDING', sub: 'Details / Drape / Texture', icon: 'eye', color: 'icon-badge--purple' },
                { label: 'ENQUIRY', sub: 'WhatsApp / Order', icon: 'message', color: 'icon-badge--green' },
              ].map((step, index) => (
                <div className="tm-photo-connection__card glass-card" key={step.label}>
                  <div className="tm-photo-connection__card-top">
                    <span className="tm-photo-connection__step-num">Step 0{index + 1}</span>
                    <span className={cx('tm-photo-connection__icon', 'icon-badge', step.color)} aria-hidden="true">
                      <TmIcon name={step.icon} size={18} />
                    </span>
                  </div>
                  <h3 className="tm-photo-connection__title">{step.label}</h3>
                  <p className="tm-photo-connection__sub">{step.sub}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 13. SOCIAL COMMERCE */}
      <section className="section tm-social-commerce" style={{ scrollMarginTop: '6rem' }}>
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Social Commerce</span>
            <h2 className="section-heading__title">Turn Instagram Browsing Into WhatsApp Conversations</h2>
          </div>
          <ScrollReveal>
            <div className="tm-social-commerce__grid">
              {[
                { label: 'INSTAGRAM POST', sub: 'Saree showcase', icon: 'instagram', color: 'icon-badge--pink' },
                { label: 'PRODUCT INTEREST', sub: 'Buyer engages', icon: 'eye', color: 'icon-badge--amber' },
                { label: 'PROFILE', sub: 'Brand page', icon: 'building', color: 'icon-badge--purple' },
                { label: 'CATALOGUE', sub: 'Product details', icon: 'layers', color: 'icon-badge--magenta' },
                { label: 'WHATSAPP', sub: 'Enquiry message', icon: 'whatsapp', color: 'icon-badge--green' },
                { label: 'ENQUIRY', sub: 'Conversation', icon: 'message', color: 'icon-badge--cyan' },
              ].map((step, index) => (
                <div className="tm-social-commerce__card glass-card" key={step.label}>
                  <div className="tm-social-commerce__card-top">
                    <span className="tm-social-commerce__step-num">0{index + 1}</span>
                    <span className={cx('tm-social-commerce__icon', 'icon-badge', step.color)} aria-hidden="true">
                      <TmIcon name={step.icon} size={18} />
                    </span>
                  </div>
                  <h3 className="tm-social-commerce__card-title">{step.label}</h3>
                  <p className="tm-social-commerce__card-sub">{step.sub}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="tm-social-commerce__examples">
              <div className="tm-social-commerce__example glass-card">
                <span className="icon-badge icon-badge--magenta" aria-hidden="true"><TmIcon name="layers" size={16} /></span>
                <span>New Saree Collection</span>
              </div>
              <div className="tm-social-commerce__example glass-card">
                <span className="icon-badge icon-badge--amber" aria-hidden="true"><TmIcon name="star" size={16} /></span>
                <span>Festival Collection</span>
              </div>
              <div className="tm-social-commerce__example glass-card">
                <span className="icon-badge icon-badge--purple" aria-hidden="true"><TmIcon name="layers" size={16} /></span>
                <span>Silk Saree Showcase</span>
              </div>
              <div className="tm-social-commerce__example glass-card">
                <span className="icon-badge icon-badge--cyan" aria-hidden="true"><TmIcon name="tag" size={16} /></span>
                <span>Dress Material Collection</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 14. BUYER JOURNEY */}
      <section className="section tm-journey" style={{ scrollMarginTop: '6rem' }}>
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Buyer Journey</span>
            <h2 className="section-heading__title">A Digital Journey Built Around How Textile Buyers Shop</h2>
          </div>
          <ScrollReveal>
            <div className="tm-journey__grid">
              {JOURNEY_STEPS.map((step, index) => (
                <div key={step.label} className="tm-journey__card glass-card">
                  <div className="tm-journey__card-top">
                    <span className="tm-journey__step-num">Step 0{index + 1}</span>
                    <span className={cx('tm-journey__icon', 'icon-badge', step.color)} aria-hidden="true">
                      <TmIcon name={step.icon} size={18} />
                    </span>
                  </div>
                  <h3 className="tm-journey__card-title">{step.label}</h3>
                  <p className="tm-journey__card-sub">{step.sub}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 15. BUYER TYPES */}
      <section className="section tm-buyer-types" style={{ scrollMarginTop: '6rem' }}>
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Buyer Types</span>
            <h2 className="section-heading__title">One Digital Presence. Multiple Buyer Types.</h2>
          </div>
          <ScrollReveal>
            <div className="tm-buyer-types__grid">
              <div className="tm-buyer-types__card glass-card">
                <div className="tm-buyer-types__header">
                  <span className="icon-badge icon-badge--magenta" aria-hidden="true"><TmIcon name="users" size={20} /></span>
                  <h3 className="tm-buyer-types__title">B2C &mdash; Retail Buyers</h3>
                </div>
                <ul className="tm-buyer-types__list">
                  {BUYER_TYPES.b2c.map((item) => (
                    <li key={item}>
                      <TmIcon name="check" size={14} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="tm-buyer-types__card glass-card">
                <div className="tm-buyer-types__header">
                  <span className="icon-badge icon-badge--amber" aria-hidden="true"><TmIcon name="briefcase" size={20} /></span>
                  <h3 className="tm-buyer-types__title">B2B &mdash; Wholesale &amp; Trade</h3>
                </div>
                <ul className="tm-buyer-types__list">
                  {BUYER_TYPES.b2b.map((item) => (
                    <li key={item}>
                      <TmIcon name="check" size={14} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 16. MADURAI-SPECIFIC SEO */}
      <section className="section tm-seo-queries" style={{ scrollMarginTop: '6rem' }}>
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">SEO</span>
            <h2 className="section-heading__title">Get Found When Buyers Search for Madurai Textiles</h2>
          </div>
          <ScrollReveal>
            <div className="tm-seo-queries__grid">
              {Object.entries(SEARCH_QUERIES).map(([category, queries], idx) => {
                const colors = ['icon-badge--magenta', 'icon-badge--amber', 'icon-badge--purple', 'icon-badge--cyan']
                return (
                  <div className="tm-seo-queries__category glass-card" key={category}>
                    <div className="tm-seo-queries__header">
                      <span className={cx('tm-seo-queries__icon', 'icon-badge', colors[idx % colors.length])} aria-hidden="true">
                        <TmIcon name="search" size={18} />
                      </span>
                      <h3 className="tm-seo-queries__category-title">{category.toUpperCase()}</h3>
                    </div>
                    <div className="tm-seo-queries__pills">
                      {queries.map((q) => (
                        <span key={q} className="tm-seo-queries__pill glass-card">
                          <TmIcon name="search" size={13} />
                          <span>{q}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 17. AI SEARCH */}
      <section className="section tm-ai-search" style={{ scrollMarginTop: '6rem' }}>
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">AI Search</span>
            <h2 className="section-heading__title">Prepare Your Textile Business for AI Search</h2>
          </div>
          <ScrollReveal>
            <p className="tm-ai-search__text">
              Business owners and buyers increasingly ask AI tools about textile suppliers, saree
              categories and garment businesses. A strong GEO/AEO strategy can help structure your
              digital presence so AI systems can better understand your business and relevance.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="tm-ai-search__grid">
              {[
                { label: 'CUSTOMER QUESTION', sub: '"Best silk sarees in Madurai"', icon: 'search', color: 'icon-badge--magenta' },
                { label: 'AI SEARCH', sub: 'ChatGPT / Perplexity', icon: 'sparkles', color: 'icon-badge--amber' },
                { label: 'BUSINESS INFORMATION', sub: 'Structured data', icon: 'building', color: 'icon-badge--purple' },
                { label: 'WEBSITE / GBP / CONTENT', sub: 'Digital presence', icon: 'globe', color: 'icon-badge--cyan' },
                { label: 'DISCOVERY', sub: 'Business found', icon: 'check', color: 'icon-badge--green' },
              ].map((step, index) => (
                <div key={step.label} className="tm-ai-search__step-card glass-card">
                  <div className="tm-ai-search__step-header">
                    <span className="tm-ai-search__step-num">0{index + 1}</span>
                    <span className={cx('tm-ai-search__icon', 'icon-badge', step.color)} aria-hidden="true">
                      <TmIcon name={step.icon} size={18} />
                    </span>
                  </div>
                  <span className="tm-ai-search__step-label">{step.label}</span>
                  <span className="tm-ai-search__step-sub">{step.sub}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="tm-ai-search__signals">
              {[
                { icon: 'building', label: 'Business Info', color: 'icon-badge--magenta' },
                { icon: 'layers', label: 'Product Expertise', color: 'icon-badge--amber' },
                { icon: 'help', label: 'FAQs', color: 'icon-badge--purple' },
                { icon: 'book', label: 'Useful Content', color: 'icon-badge--blue' },
                { icon: 'star', label: 'Reviews', color: 'icon-badge--gold' },
                { icon: 'code', label: 'Structured Data', color: 'icon-badge--cyan' },
              ].map((sig) => (
                <div className="tm-ai-search__signal glass-card" key={sig.label}>
                  <span className={cx('tm-ai-search__signal-icon', 'icon-badge', sig.color)} aria-hidden="true">
                    <TmIcon name={sig.icon} size={18} />
                  </span>
                  <span className="tm-ai-search__signal-label">{sig.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 18. LOCAL DISCOVERY */}
      <section className="section tm-local" style={{ scrollMarginTop: '6rem' }}>
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Local Discovery</span>
            <h2 className="section-heading__title">Be Visible When Buyers Look for Textile Businesses in Madurai</h2>
          </div>
          <ScrollReveal>
            <div className="tm-local__card glass-card">
              <p className="tm-local__text">
                When local customers search for textile businesses in Madurai, Google Business Profile
                visibility can help your business appear in local search results and Google Maps,
                driving phone calls, direction requests and WhatsApp enquiries.
              </p>
              <div className="tm-local__mockup glass-card">
                <div className="tm-local__header">
                  <span className="icon-badge icon-badge--magenta" aria-hidden="true">
                    <TmIcon name="mappin" size={18} />
                  </span>
                  <div className="tm-local__title-box">
                    <span className="tm-local__business-name">Your Textile Business Name</span>
                    <span className="tm-local__business-sub">Textile Shop / Saree Store • Madurai</span>
                  </div>
                </div>
                <div className="tm-local__body">
                  <div className="tm-local__info">
                    <span>Category: Textile Shop / Saree Store</span>
                    <span>Location: Madurai, Tamil Nadu</span>
                    <span>Rating: Verified Profile</span>
                    <span>Hours: Mon - Sat, 10:00 AM - 9:00 PM</span>
                  </div>
                  <div className="tm-local__actions">
                    <span className="tm-local__action glass-card"><TmIcon name="phone" size={14} /> Call</span>
                    <span className="tm-local__action glass-card"><TmIcon name="compass" size={14} /> Directions</span>
                    <span className="tm-local__action glass-card"><TmIcon name="whatsapp" size={14} /> WhatsApp</span>
                  </div>
                </div>
                <div className="tm-local__products">
                  <span className="tm-local__products-label">Products &amp; Services:</span>
                  <div className="tm-local__products-list">
                    <span className="tm-local__product glass-card">Silk Sarees</span>
                    <span className="tm-local__product glass-card">Dress Materials</span>
                    <span className="tm-local__product glass-card">Readymade Garments</span>
                    <span className="tm-local__product glass-card">Fabric</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 19. TEXTILE BUSINESS TYPES */}
      <section className="section tm-business-types" style={{ scrollMarginTop: '6rem' }}>
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Textile Ecosystem</span>
            <h2 className="section-heading__title">Digital Marketing for Every Part of Madurai&rsquo;s Textile Ecosystem</h2>
          </div>
          <ScrollReveal>
            <div className="tm-business-types__grid">
              {BUSINESS_TYPES.map((bt) => (
                <div className="tm-business-types__card glass-card" key={bt.title}>
                  <span className={cx('tm-business-types__icon', 'icon-badge', bt.color)} aria-hidden="true">
                    <TmIcon name={bt.icon} size={20} />
                  </span>
                  <h3 className="tm-business-types__title">{bt.title}</h3>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 20. MARKET EVOLUTION */}
      <section className="section tm-story" style={{ scrollMarginTop: '6rem' }}>
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Market Evolution</span>
            <h2 className="section-heading__title">From Textile Corridors to Digital Corridors</h2>
          </div>
          <ScrollReveal>
            <div className="tm-story__grid">
              <div className="tm-story__panel tm-story__panel--traditional glass-card">
                <div className="tm-story__panel-header">
                  <span className="icon-badge icon-badge--magenta" aria-hidden="true">
                    <TmIcon name="building" size={20} />
                  </span>
                  <h3 className="tm-story__panel-title">TRADITIONAL MARKET</h3>
                </div>
                <div className="tm-story__panel-items">
                  <span className="tm-story__panel-item glass-card"><TmIcon name="layers" size={14} /> Fabric</span>
                  <span className="tm-story__panel-item glass-card"><TmIcon name="layers" size={14} /> Saree</span>
                  <span className="tm-story__panel-item glass-card"><TmIcon name="briefcase" size={14} /> Wholesale</span>
                  <span className="tm-story__panel-item glass-card"><TmIcon name="tag" size={14} /> Retail</span>
                </div>
              </div>
              <div className="tm-story__panel tm-story__panel--digital glass-card">
                <div className="tm-story__panel-header">
                  <span className="icon-badge icon-badge--amber" aria-hidden="true">
                    <TmIcon name="globe" size={20} />
                  </span>
                  <h3 className="tm-story__panel-title">DIGITAL MARKET</h3>
                </div>
                <div className="tm-story__panel-items">
                  <span className="tm-story__panel-item glass-card"><TmIcon name="search" size={14} /> Google</span>
                  <span className="tm-story__panel-item glass-card"><TmIcon name="instagram" size={14} /> Instagram</span>
                  <span className="tm-story__panel-item glass-card"><TmIcon name="code" size={14} /> Website</span>
                  <span className="tm-story__panel-item glass-card"><TmIcon name="package" size={14} /> Marketplace</span>
                  <span className="tm-story__panel-item glass-card"><TmIcon name="whatsapp" size={14} /> WhatsApp</span>
                  <span className="tm-story__panel-item glass-card"><TmIcon name="sparkles" size={14} /> AI Search</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 21. INTERNATIONAL MARKET */}
      <section className="section tm-international" style={{ scrollMarginTop: '6rem' }}>
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">International Market</span>
            <h2 className="section-heading__title">Take Your Madurai Textile Brand Beyond the Local Market</h2>
          </div>
          <ScrollReveal>
            <div className="tm-international__grid">
              <div className="tm-international__card glass-card">
                <div className="tm-international__card-header">
                  <span className="icon-badge icon-badge--magenta" aria-hidden="true"><TmIcon name="building" size={22} /></span>
                  <span className="tm-international__badge">HUB</span>
                </div>
                <h3 className="tm-international__card-title">MADURAI</h3>
                <p className="tm-international__card-text">Home base &mdash; production hub and local market</p>
              </div>
              <div className="tm-international__card glass-card">
                <div className="tm-international__card-header">
                  <span className="icon-badge icon-badge--amber" aria-hidden="true"><TmIcon name="globe" size={22} /></span>
                  <span className="tm-international__badge">DOMESTIC</span>
                </div>
                <h3 className="tm-international__card-title">INDIA</h3>
                <p className="tm-international__card-text">National buyers through e-commerce and marketplace platforms</p>
              </div>
              <div className="tm-international__card glass-card">
                <div className="tm-international__card-header">
                  <span className="icon-badge icon-badge--cyan" aria-hidden="true"><TmIcon name="globe" size={22} /></span>
                  <span className="tm-international__badge">GLOBAL</span>
                </div>
                <h3 className="tm-international__card-title">DIASPORA</h3>
                <p className="tm-international__card-text">Malaysia, Singapore, US, UK &mdash; social media and WhatsApp</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 22. FAQ */}
      <section className="section tm-faq" style={{ scrollMarginTop: '6rem' }}>
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">FAQ</span>
            <h2 className="section-heading__title">Frequently Asked Questions &mdash; Textiles &amp; Garments &mdash; Madurai</h2>
          </div>
          <FaqAccordion faqs={FAQS} />
        </div>
      </section>

      {/* 23. RELATED INDUSTRIES */}
      <section className="section tm-related" style={{ scrollMarginTop: '6rem' }}>
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Explore More</span>
            <h2 className="section-heading__title">Related Industries</h2>
          </div>
          <div className="tm-related__links">
            <Link to="/industries/retail-ecommerce/" className="related-content__link">Retail &amp; E-Commerce</Link>
            <Link to="/industries/smes-malaysia-grant-eligible/" className="related-content__link">Malaysian SMEs</Link>
            <Link to="/industries/" className="related-content__link">All Industries</Link>
            <Link to="/services/" className="related-content__link">All Services</Link>
            <Link to="/contact/" className="related-content__link">Contact</Link>
            <Link to="/faq/" className="related-content__link">FAQ</Link>
          </div>
        </div>
      </section>

      {/* 24. FINAL CTA & CONTACT FORM */}
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