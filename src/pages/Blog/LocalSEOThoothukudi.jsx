import RelatedReading from '../../components/blog/RelatedReading.jsx'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import BlogFeaturedImage from '../../components/blog/BlogFeaturedImage.jsx'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import { blogPostingSchema, faqPageSchema, breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL } from '../../utils/constants.js'

/* ============================================================
   CONTENT, Approved Static Savvy Media Thoothukudi Local SEO
   ============================================================ */

const PAGE_TITLE = 'Local SEO for Thoothukudi Businesses, Port City Growth Guide 2026'

const PAGE_DESCRIPTION =
  'Local SEO strategies for businesses in Thoothukudi, improving Google Maps visibility, Google Business Profile performance, local search rankings, and digital discovery across the port city.'

const AUTHOR = 'Deepan Kanz'
const AUTHOR_ROLE = 'Founder & AI Search Specialist'
const READING_TIME = 'Approx. 8–10 min read'

const INTRODUCTION =
  'Thoothukudi is one of Tamil Nadu’s most important port-city business ecosystems. Industrial companies, marine businesses, logistics providers, manufacturers, chemical businesses, engineering firms, export-oriented enterprises, retail outlets, hospitality venues, healthcare providers, and educational institutions all operate here. But being physically established in Thoothukudi does not automatically mean customers can find your business online. The gap between physical presence and digital discoverability is where most port-city businesses lose potential customers. This guide explains how to fix that through practical, structured Local SEO.'

const GBP_STEPS = [
  {
    number: '01',
    title: 'Choose the Correct Primary Category',
    text: 'Your primary Google Business Profile category must accurately represent the core business. This is the single most important GBP setting because it determines which searches your profile is eligible to appear in. Choose the category that best describes your primary service, not every service you offer.',
  },
  {
    number: '02',
    title: 'Add Relevant Secondary Categories',
    text: 'Secondary categories help describe additional services without making the profile irrelevant. If you are a manufacturer that also provides installation services, both can be listed. But keep every secondary category genuinely relevant to what the business actually does.',
  },
  {
    number: '03',
    title: 'Set Accurate Service Areas',
    text: 'If you serve clients across Thoothukudi, Madurai, or the broader Tamil Nadu region, represent this correctly in your service area settings. Businesses that serve a 50km radius should not claim to serve all of India. Accurate service areas help Google match your business to realistic local searches.',
  },
  {
    number: '04',
    title: 'Maintain Consistent NAP',
    text: 'NAP, Name, Address, Phone, must remain identical across your website, GBP, LinkedIn, industry directories, and every platform where your business appears. Even small inconsistencies (e.g., ‘Thoothukudi’ vs ‘Tuticorin’ vs ‘Tuticorn’) can weaken local search signals.',
  },
  {
    number: '05',
    title: 'Add High-Quality Photos',
    text: 'Upload professional images of your business exterior, interior, team, products, services, equipment, projects, and brand assets. Photos give potential customers visual confidence and provide Google with additional context about your business. Businesses with complete photo galleries consistently receive more engagement than those with minimal imagery.',
  },
  {
    number: '06',
    title: 'Complete Business Information',
    text: 'Fill in every available field: business description, website, phone number, opening hours, services, attributes, and relevant links. A complete profile signals to Google that your business is active and invested in its online presence. Incomplete profiles are deprioritized in local results.',
  },
  {
    number: '07',
    title: 'Build Review Activity',
    text: 'Authentic customer reviews are one of the strongest local search signals. Encourage satisfied customers to leave genuine reviews. Respond professionally to every review, positive or negative. Regular review acquisition, combined with thoughtful responses, builds both search visibility and customer trust.',
  },
]

const B2B_INDUSTRIES = [
  'Industrial companies',
  'Port and shipping businesses',
  'Logistics companies',
  'Manufacturers',
  'Chemical businesses',
  'Engineering businesses',
  'Export-oriented businesses',
  'Procurement teams',
  'Corporate buyers',
]

const B2B_CHANNELS = [
  { label: 'Google Search', detail: 'Industry-specific queries and service searches' },
  { label: 'LinkedIn', detail: 'Professional discovery and procurement visibility' },
  { label: 'Company Websites', detail: 'Service pages, capabilities, and case studies' },
  { label: 'Industry Searches', detail: 'Vertical-specific research and vendor comparison' },
  { label: 'AI Search Tools', detail: 'ChatGPT, Perplexity, and Google AI Overviews' },
  { label: 'Vendor Research', detail: 'Detailed evaluation before procurement decisions' },
]

const CONSUMER_CHANNELS = [
  { label: 'Google Maps', detail: 'Location-based discovery and directions' },
  { label: 'Google Business Profile', detail: 'Business information, photos, and reviews' },
  { label: 'Customer Reviews', detail: 'Social proof and trust signals' },
  { label: 'Local Photos', detail: 'Visual confirmation of business quality' },
  { label: 'Local Content', detail: 'Relevant information for local customers' },
  { label: 'Mobile Search', detail: 'On-the-go discovery and immediate action' },
]

const B2B_STRATEGIES = [
  {
    icon: 'LinkedIn',
    title: 'LinkedIn',
    text: 'LinkedIn supports B2B discovery, professional credibility, and procurement visibility. Maintain a complete company page with accurate service descriptions, industry keywords, team information, and regular content updates. Decision-makers and procurement teams use LinkedIn to verify business legitimacy during vendor research.',
  },
  {
    icon: 'Website',
    title: 'Website Content',
    text: 'Create dedicated pages for services, industries, applications, locations, products, capabilities, projects, and FAQs. Each page should target specific search intent and provide comprehensive information that helps procurement teams evaluate your business. Service-specific pages with Thoothukudi location context strengthen local authority.',
  },
  {
    icon: 'Keywords',
    title: 'Industrial Keyword Strategy',
    text: 'Target industry-specific search terms relevant to Thoothukudi’s port-city economy: industrial services, marine services, shipping services, manufacturing services, and industrial suppliers. These terms should appear naturally in your service pages, location content, and industry-specific landing pages.',
  },
  {
    icon: 'Authority',
    title: 'Local Authority',
    text: 'Consistent business information, industry content, relevant mentions, and professional digital profiles strengthen your local authority. When Google sees your business referenced consistently across trusted platforms, it increases confidence in your relevance for local industrial searches.',
  },
  {
    icon: 'Conversion',
    title: 'Enquiry Conversion',
    text: 'Your website should make it easy to call, WhatsApp, submit an enquiry, request a quotation, contact sales, or request a consultation. Every service page should have a clear, prominent call-to-action. Remove friction between interest and action.',
  },
]

const CONSUMER_STRATEGIES = [
  {
    icon: 'Maps',
    title: 'Google Maps Visibility',
    text: 'Google Maps is the primary discovery channel for consumer-facing businesses. When potential customers search for products, services, or businesses in Thoothukudi, Google Maps results appear prominently. A complete, verified, and actively managed Google Business Profile is the foundation of Maps visibility.',
  },
  {
    icon: 'Reviews',
    title: 'Customer Reviews',
    text: 'Reviews are both a ranking signal and a trust signal. Businesses with consistent, authentic positive reviews receive more clicks, more calls, and more visits. Encourage every satisfied customer to leave a review. Respond to all reviews professionally, this demonstrates active management and customer care.',
  },
  {
    icon: 'Photos',
    title: 'Local Photos',
    text: 'Upload high-quality photos of your business, products, team, and facilities. Visual content builds trust before a word is read. Businesses with complete photo galleries receive significantly more engagement in Google search and Maps results.',
  },
  {
    icon: 'Content',
    title: 'Local Content',
    text: 'Create content that addresses local search intent. Blog posts, service pages, and location pages that reference Thoothukudi, specific neighborhoods, and local landmarks help Google understand your geographic relevance. Content about local events, industry happenings, and community involvement strengthens local signals.',
  },
  {
    icon: 'Pages',
    title: 'Location-Based Landing Pages',
    text: 'If you serve multiple areas within Thoothukudi or across Tamil Nadu, create dedicated location pages for each area. These pages should provide genuinely useful information about your services in that specific location, not just swap city names in a template.',
  },
  {
    icon: 'Mobile',
    title: 'Mobile-First Experience',
    text: 'Consumer local search is overwhelmingly mobile. Your website must load fast, display correctly on all screen sizes, and make contact information immediately accessible. Click-to-call buttons, WhatsApp links, and embedded maps remove friction from the mobile experience.',
  },
]

const CITATION_ELEMENTS = [
  'Business Name',
  'Address',
  'Phone',
  'Website',
  'Category',
]

const CONTENT_EXAMPLES = [
  { type: 'Service Content', example: 'Digital marketing services in Thoothukudi', description: 'Targets direct service searches' },
  { type: 'Industry Content', example: 'Digital marketing for industrial businesses in Thoothukudi', description: 'Targets vertical-specific queries' },
  { type: 'Location Content', example: 'Businesses and services in Thoothukudi', description: 'Targets geographic discovery' },
  { type: 'Problem-Solving', example: 'How to improve Google Maps visibility', description: 'Targets educational intent' },
  { type: 'Buyer Content', example: 'What to check before choosing an industrial supplier', description: 'Targets procurement research' },
  { type: 'FAQ Content', example: 'Questions customers and procurement teams actually ask', description: 'Targets direct question queries' },
]

const CHECKLIST = [
  'Google Business Profile claimed',
  'Correct primary category',
  'Relevant secondary categories',
  'Accurate NAP across platforms',
  'Complete business information',
  'Service areas configured',
  'High-quality business photos',
  'Authentic customer reviews',
  'Website optimized for local intent',
  'Thoothukudi location page',
  'Service-specific pages',
  'Industry-specific content',
  'Internal links between pages',
  'Local citations on trusted platforms',
  'Mobile-friendly website',
  'Clear WhatsApp / enquiry CTA',
  'Local SEO monitoring and reporting',
]

const GEO_AEO_FLOW = [
  'LOCAL SEO',
  'SEARCH + MAPS + WEBSITE',
  'ENTITY & CONTENT SIGNALS',
  'GEO / AEO',
  'AI DISCOVERY',
]

const FAQS = [
  {
    question: 'What is Local SEO for a Thoothukudi business?',
    answer: 'Local SEO improves a business’s visibility in location-based Google searches, Google Maps, business profiles, local content, and relevant online listings. For Thoothukudi businesses, this means appearing when potential customers search for products, services, suppliers, or businesses in the port city. It encompasses Google Business Profile optimization, website local content, citation building, review management, and structured data implementation.',
  },
  {
    question: 'How do I improve my Google Maps visibility in Thoothukudi?',
    answer: 'Improving Google Maps visibility requires a complete Google Business Profile with the correct primary category, accurate business information, high-quality photos, authentic customer reviews, relevant local content, a website optimized for local intent, and consistent citations across trusted platforms. The process is cumulative, each element strengthens the others. There is no single shortcut to Maps visibility.',
  },
  {
    question: 'Is Local SEO useful for B2B businesses in Thoothukudi?',
    answer: 'Yes. B2B buyers, procurement teams, corporate decision-makers, and suppliers use search engines and professional digital channels during vendor research. Industry-specific website pages, LinkedIn presence, Google search visibility, and AI search tools all play a role in B2B discovery. Local SEO helps Thoothukudi’s industrial and manufacturing businesses appear in these professional searches.',
  },
  {
    question: 'How long does Local SEO take to show results?',
    answer: 'Local SEO is cumulative, and timelines vary depending on competition, current website authority, Google Business Profile completeness, reviews, citation consistency, content quality, industry, and existing visibility. Some improvements, like GBP completion and basic citation setup, can show early signals within weeks. More competitive improvements typically take several months of consistent effort.',
  },
  {
    question: 'Can Static Savvy Media help my Thoothukudi business with Local SEO?',
    answer: 'Yes. Static Savvy Media provides Local SEO, SEO, GEO/AEO, Google Ads, social media marketing, website development, and AI business automation for businesses in Thoothukudi. We serve port-city businesses from our Madurai office with deep local knowledge across industrial, marine, manufacturing, retail, B2B, and B2C segments.',
  },
]

const TOC_ITEMS = [
  { id: 'search-landscape', label: 'Thoothukudi Local Search Landscape' },
  { id: 'google-business-profile', label: 'Google Business Profile Setup' },
  { id: 'b2b-seo', label: 'B2B Industrial Local SEO' },
  { id: 'consumer-seo', label: 'Consumer Local SEO' },
  { id: 'citations', label: 'Citation Landscape' },
  { id: 'local-content', label: 'Local Content Strategy' },
  { id: 'checklist', label: 'Local SEO Checklist' },
  { id: 'geo-aeo', label: 'GEO & AEO Connection' },
  { id: 'why-ssm', label: 'Why Static Savvy Media' },
  { id: 'faq', label: 'FAQs' },
]

/* ============================================================
   COMPONENT
   ============================================================ */

export default function LocalSEOThoothukudi() {
  const jsonLdRef = useRef([])
  const progressRef = useRef(null)

  useEffect(() => {
    setSeo({
      title: `${PAGE_TITLE} | Static Savvy Media`,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/blog/local-seo-thoothukudi-businesses/`,
      ogType: 'article',
    })

    const faqEntities = FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    }))

    const blogPost = blogPostingSchema({
      headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      author: { '@type': 'Person', name: AUTHOR, jobTitle: AUTHOR_ROLE },
      publisher: {
        '@type': 'Organization',
        name: 'Static Savvy Media',
        url: SITE_URL,
      },
      url: `${SITE_URL}/blog/local-seo-thoothukudi-businesses/`,
      mainEntityOfPage: `${SITE_URL}/blog/local-seo-thoothukudi-businesses/`,
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Blog', item: `${SITE_URL}/blog/` },
        { name: 'Local SEO Thoothukudi', item: `${SITE_URL}/blog/local-seo-thoothukudi-businesses/` },
      ],
    })

    const scripts = [
      blogPost,
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

    /* Reading progress bar */
    const handleScroll = () => {
      if (!progressRef.current) return
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (window.scrollY / docHeight) * 100
      progressRef.current.style.width = `${Math.min(scrolled, 100)}%`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      jsonLdRef.current.forEach((s) => s.remove())
      jsonLdRef.current = []
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const whatsappHref = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)

  return (
    <div className="about-template">
      {/* Reading Progress Bar */}
      <div className="thoothukudi-progress" aria-hidden="true">
        <div className="thoothukudi-progress__bar" ref={progressRef} />
      </div>

      <Breadcrumbs />

      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="section">
        <div className="container">
          <div className="thoothukudi-hero">
            <div className="thoothukudi-hero__content">
              <span className="thoothukudi-hero__badge">LOCAL SEO</span>
              <h1 className="hero__title">
                Local SEO for Thoothukudi Businesses{' '}
                <span className="text-gradient">,  Port City Growth Guide 2026</span>
              </h1>
              <div className="thoothukudi-hero__meta">
                <span className="thoothukudi-hero__meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  {AUTHOR}
                </span>
                <span className="thoothukudi-hero__meta-item">Static Savvy Media</span>
                <span className="thoothukudi-hero__meta-item">Local SEO</span>
                <span className="thoothukudi-hero__meta-item">{READING_TIME}</span>
              </div>
              <p className="thoothukudi-hero__intro">
                A practical guide to improving local search visibility, Google Maps rankings, Google Business Profile performance, and digital discovery for businesses in Thoothukudi.
              </p>
            </div>
            <div className="thoothukudi-hero__visual">
              <div className="thoothukudi-hero__visual-card">
                <div className="thoothukudi-hero__visual-label">Local Search Flow</div>
                <div className="thoothukudi-hero__visual-flow">
                  <div className="thoothukudi-hero__visual-step thoothukudi-hero__visual-step--query">User Query</div>
                  <div className="thoothukudi-hero__visual-arrow" aria-hidden="true">↓</div>
                  <div className="thoothukudi-hero__visual-step thoothukudi-hero__visual-step--maps">Google Maps</div>
                  <div className="thoothukudi-hero__visual-arrow" aria-hidden="true">↓</div>
                  <div className="thoothukudi-hero__visual-step thoothukudi-hero__visual-step--profile">Business Profile</div>
                  <div className="thoothukudi-hero__visual-arrow" aria-hidden="true">↓</div>
                  <div className="thoothukudi-hero__visual-step thoothukudi-hero__visual-step--action">Customer Action</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BlogFeaturedImage slug="local-seo-thoothukudi-businesses" />

      {/* ============================================================
          ARTICLE BODY + TOC
          ============================================================ */}
      <section className="section section--alt">
        <div className="container">
          <div className="thoothukudi-article">
            <div className="thoothukudi-article__body">

              {/* ---- Introduction ---- */}
              <div className="thoothukudi-intro">
                <p>{INTRODUCTION}</p>
              </div>

              {/* ---- Section 01: The Thoothukudi Local Search Landscape ---- */}
              <h2 id="search-landscape">The Thoothukudi Local Search Landscape</h2>
              <p>
                Understanding how customers search for businesses in Thoothukudi requires recognizing two distinct patterns: B2B industrial search and consumer local search. Each follows different logic, uses different platforms, and requires different optimization strategies.
              </p>

              <div className="thoothukudi-comparison">
                <ScrollReveal delay={0}>
                  <div className="thoothukudi-comparison__card thoothukudi-comparison__card--b2b">
                    <div className="thoothukudi-comparison__badge">B2B / INDUSTRIAL SEARCH</div>
                    <h3 className="thoothukudi-comparison__title">Industrial & B2B Discovery</h3>
                    <p className="thoothukudi-comparison__text">
                      B2B buyers in Thoothukudi’s port economy, industrial companies, shipping businesses, logistics providers, manufacturers, chemical businesses, engineering firms, and export-oriented enterprises, use a different search process than consumers.
                    </p>
                    <div className="thoothukudi-comparison__items">
                      {B2B_INDUSTRIES.map((item) => (
                        <span key={item} className="thoothukudi-comparison__item">{item}</span>
                      ))}
                    </div>
                    <div className="thoothukudi-comparison__channels">
                      <div className="thoothukudi-comparison__channels-label">Search Channels</div>
                      {B2B_CHANNELS.map((ch) => (
                        <div key={ch.label} className="thoothukudi-comparison__channel">
                          <span className="thoothukudi-comparison__channel-label">{ch.label}</span>
                          <span className="thoothukudi-comparison__channel-detail">{ch.detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={80}>
                  <div className="thoothukudi-comparison__card thoothukudi-comparison__card--consumer">
                    <div className="thoothukudi-comparison__badge thoothukudi-comparison__badge--cyan">CONSUMER LOCAL SEARCH</div>
                    <h3 className="thoothukudi-comparison__title">Consumer Discovery</h3>
                    <p className="thoothukudi-comparison__text">
                      Consumer-facing businesses in Thoothukudi, retail, hospitality, healthcare, education, restaurants, and local services, rely on a different set of discovery channels focused on immediacy, convenience, and local relevance.
                    </p>
                    <div className="thoothukudi-comparison__channels">
                      <div className="thoothukudi-comparison__channels-label">Key Channels</div>
                      {CONSUMER_CHANNELS.map((ch) => (
                        <div key={ch.label} className="thoothukudi-comparison__channel">
                          <span className="thoothukudi-comparison__channel-label">{ch.label}</span>
                          <span className="thoothukudi-comparison__channel-detail">{ch.detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* ---- Section 02: Setting Up Your Google Business Profile ---- */}
              <h2 id="google-business-profile">Setting Up Your Google Business Profile for Thoothukudi</h2>
              <p>
                Google Business Profile is the single most important local search asset for any Thoothukudi business. A complete, accurate, and actively managed GBP directly influences your visibility in Google Search and Google Maps. Here are the essential steps.
              </p>

              <div className="thoothukudi-steps">
                {GBP_STEPS.map((step) => (
                  <ScrollReveal key={step.number}>
                    <div className="thoothukudi-step">
                      <div className="thoothukudi-step__number">{step.number}</div>
                      <div className="thoothukudi-step__content">
                        <h3 className="thoothukudi-step__title">{step.title}</h3>
                        <p className="thoothukudi-step__text">{step.text}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* ---- Section 03: Local SEO for B2B Industrial Businesses ---- */}
              <h2 id="b2b-seo">Local SEO for B2B Industrial Businesses in Thoothukudi</h2>
              <p>
                Thoothukudi’s industrial ecosystem requires a different Local SEO approach than consumer-facing businesses. B2B buyers, procurement teams, and corporate decision-makers use search engines, professional networks, and industry-specific channels during vendor research. Your digital presence must be structured to appear in these professional search contexts.
              </p>

              <div className="thoothukudi-strategies">
                {B2B_STRATEGIES.map((strategy, index) => (
                  <ScrollReveal key={strategy.title} delay={index * 60}>
                    <div className="thoothukudi-strategy-card">
                      <div className="thoothukudi-strategy-card__icon" aria-hidden="true">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                      <h3 className="thoothukudi-strategy-card__title">{strategy.title}</h3>
                      <p className="thoothukudi-strategy-card__text">{strategy.text}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* ---- Section 04: Local SEO for Consumer-Facing Businesses ---- */}
              <h2 id="consumer-seo">Local SEO for Consumer-Facing Businesses in Thoothukudi</h2>
              <p>
                Consumer local SEO is about reducing friction between search and action. When a potential customer searches for a product, service, or business in Thoothukudi, every step from discovery to enquiry should be seamless.
              </p>

              <ScrollReveal>
                <div className="thoothukudi-flow">
                  <div className="thoothukudi-flow__title">Consumer Discovery Flow</div>
                  {['DISCOVERY', 'GOOGLE SEARCH / MAPS', 'BUSINESS PROFILE', 'WEBSITE / REVIEWS', 'TRUST', 'ENQUIRY / VISIT'].map((step, index) => (
                    <div key={step} className="thoothukudi-flow__item">
                      <div className={`thoothukudi-flow__step ${index === 0 ? 'thoothukudi-flow__step--active' : ''}`}>{step}</div>
                      {index < 5 && <div className="thoothukudi-flow__arrow" aria-hidden="true">↓</div>}
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <div className="thoothukudi-strategies">
                {CONSUMER_STRATEGIES.map((strategy, index) => (
                  <ScrollReveal key={strategy.title} delay={index * 60}>
                    <div className="thoothukudi-strategy-card">
                      <div className="thoothukudi-strategy-card__icon thoothukudi-strategy-card__icon--cyan" aria-hidden="true">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                      <h3 className="thoothukudi-strategy-card__title">{strategy.title}</h3>
                      <p className="thoothukudi-strategy-card__text">{strategy.text}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* ---- Section 05: The Thoothukudi Citation Landscape ---- */}
              <h2 id="citations">The Thoothukudi Citation Landscape</h2>
              <p>
                Local citations are online mentions of your business that include your core identifying information. They appear across business directories, industry directories, local directories, business listings, social profiles, and professional directories. The fundamental principle is consistency: your Name, Address, and Phone must remain identical across every platform.
              </p>

              <ScrollReveal>
                <div className="thoothukudi-citation">
                  <div className="thoothukudi-citation__items">
                    {CITATION_ELEMENTS.map((el) => (
                      <span key={el} className="thoothukudi-citation__item">{el}</span>
                    ))}
                  </div>
                  <div className="thoothukudi-citation__arrow" aria-hidden="true">↓</div>
                  <div className="thoothukudi-citation__result">
                    CONSISTENT LOCAL SIGNALS
                  </div>
                </div>
              </ScrollReveal>

              <p>
                Focus on relevant and trustworthy platforms rather than mass directory submissions. Quality citations from industry-specific directories and authoritative local platforms carry more weight than hundreds of low-quality listings.
              </p>

              {/* ---- Section 06: Local Content ---- */}
              <h2 id="local-content">Local Content That Works for Thoothukudi Businesses</h2>
              <p>
                Businesses should create content around real customer search intent. Here are content types that address actual queries from potential customers and procurement teams in Thoothukudi.
              </p>

              <div className="thoothukudi-content-examples">
                {CONTENT_EXAMPLES.map((item) => (
                  <ScrollReveal key={item.type}>
                    <div className="thoothukudi-content-card">
                      <div className="thoothukudi-content-card__type">{item.type}</div>
                      <div className="thoothukudi-content-card__example">&ldquo;{item.example}&rdquo;</div>
                      <div className="thoothukudi-content-card__description">{item.description}</div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* ---- Section 07: Local SEO Checklist ---- */}
              <h2 id="checklist">A Practical Local SEO Checklist for Thoothukudi</h2>
              <p>
                Use this checklist to audit and improve your local search presence. Each item represents a concrete action that strengthens your visibility in Thoothukudi’s local search ecosystem.
              </p>

              <div className="thoothukudi-checklist">
                {CHECKLIST.map((item, index) => (
                  <ScrollReveal key={item} delay={index * 30}>
                    <div className="thoothukudi-checklist__item">
                      <div className="thoothukudi-checklist__check" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="thoothukudi-checklist__text">{item}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* ---- Section 08: How Local SEO Connects With GEO & AEO ---- */}
              <h2 id="geo-aeo">How Local SEO Connects With GEO &amp; AEO</h2>
              <p>
                Local SEO and AI search optimization are not separate systems. The signals you build through Local SEO, consistent business information, structured website content, authoritative third-party mentions, and entity clarity, are the same signals that can improve your visibility in AI search engines like ChatGPT, Perplexity, and Google AI Overviews.
              </p>

              <ScrollReveal>
                <div className="thoothukudi-flow thoothukudi-flow--wide">
                  <div className="thoothukudi-flow__title">From Local SEO to AI Discovery</div>
                  {GEO_AEO_FLOW.map((step, index) => (
                    <div key={step} className="thoothukudi-flow__item">
                      <div className={`thoothukudi-flow__step ${index === 0 ? 'thoothukudi-flow__step--active' : ''} ${index === GEO_AEO_FLOW.length - 1 ? 'thoothukudi-flow__step--highlight' : ''}`}>{step}</div>
                      {index < GEO_AEO_FLOW.length - 1 && <div className="thoothukudi-flow__arrow" aria-hidden="true">↓</div>}
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <p>
                Businesses that invest in Local SEO build the foundational entity and content signals that AI systems reference when determining which businesses to cite. This means your Google Business Profile optimization, website content, structured data, and citation consistency all contribute to AI search discoverability.
              </p>

              {/* ---- Section 09: Why Static Savvy Media ---- */}
              <h2 id="why-ssm">Why Static Savvy Media for Local SEO in Thoothukudi?</h2>
              <p>
                Static Savvy Media serves Thoothukudi businesses with SEO, Local SEO, Google Ads, and social media marketing from our Madurai office. We have deep local knowledge across Thoothukudi’s key sectors: port city operations, industrial businesses, marine services, manufacturing, retail, B2B, and B2C.
              </p>

              <div className="thoothukudi-why-us">
                <ScrollReveal delay={0}>
                  <div className="thoothukudi-why-card">
                    <div className="thoothukudi-why-card__number">01</div>
                    <h3 className="thoothukudi-why-card__title">Local SEO</h3>
                    <p className="thoothukudi-why-card__text">Complete Google Business Profile optimization, local content strategy, citation building, and review management for Thoothukudi businesses.</p>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={60}>
                  <div className="thoothukudi-why-card">
                    <div className="thoothukudi-why-card__number">02</div>
                    <h3 className="thoothukudi-why-card__title">SEO</h3>
                    <p className="thoothukudi-why-card__text">Technical SEO, keyword strategy, content development, and link building that drives consistent organic traffic growth.</p>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={120}>
                  <div className="thoothukudi-why-card">
                    <div className="thoothukudi-why-card__number">03</div>
                    <h3 className="thoothukudi-why-card__title">GEO &amp; AEO</h3>
                    <p className="thoothukudi-why-card__text">Our flagship service. We structure your online presence so AI engines cite your business as the authoritative answer in your category.</p>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={180}>
                  <div className="thoothukudi-why-card">
                    <div className="thoothukudi-why-card__number">04</div>
                    <h3 className="thoothukudi-why-card__title">Google Ads</h3>
                    <p className="thoothukudi-why-card__text">High-ROI paid search campaigns managed by certified specialists, with every rupee tracked to real business outcomes.</p>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={240}>
                  <div className="thoothukudi-why-card">
                    <div className="thoothukudi-why-card__number">05</div>
                    <h3 className="thoothukudi-why-card__title">Social Media</h3>
                    <p className="thoothukudi-why-card__text">Instagram, Facebook, and LinkedIn content and ad management that builds brand equity and drives qualified leads.</p>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={300}>
                  <div className="thoothukudi-why-card">
                    <div className="thoothukudi-why-card__number">06</div>
                    <h3 className="thoothukudi-why-card__title">Website Development</h3>
                    <p className="thoothukudi-why-card__text">SEO-ready, Core Web Vitals-optimized websites built to convert. Next.js or WordPress chosen for your project.</p>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={360}>
                  <div className="thoothukudi-why-card">
                    <div className="thoothukudi-why-card__number">07</div>
                    <h3 className="thoothukudi-why-card__title">AI Business Automation</h3>
                    <p className="thoothukudi-why-card__text">Automate workflows, deploy AI chatbots, and integrate intelligent tools that free your team to focus on growth.</p>
                  </div>
                </ScrollReveal>
              </div>

              {/* ---- FAQ ---- */}
              <h2 id="faq">Frequently Asked Questions About Local SEO in Thoothukudi</h2>
              <div className="thoothukudi-faq">
                {FAQS.map((faq, index) => (
                  <ScrollReveal key={index}>
                    <div className="thoothukudi-faq__item">
                      <details className="thoothukudi-faq__details glass-card">
                        <summary className="thoothukudi-faq__question">{faq.question}</summary>
                        <p className="thoothukudi-faq__answer">{faq.answer}</p>
                      </details>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* ---- Author Bio ---- */}
              <div className="thoothukudi-author">
                <div className="thoothukudi-author__avatar" aria-hidden="true">DK</div>
                <div>
                  <div className="thoothukudi-author__name">{AUTHOR}</div>
                  <div className="thoothukudi-author__role">{AUTHOR_ROLE}, Static Savvy Media</div>
                  <Link to="/about/deepan-kanz/" className="thoothukudi-author__link">View Full Profile →</Link>
                </div>
              </div>

            </div>

            {/* ---- Sticky TOC ---- */}
            <aside className="thoothukudi-toc" aria-label="Table of Contents">
              <div className="thoothukudi-toc__title">Table of Contents</div>
              <ul className="thoothukudi-toc__list">
                {TOC_ITEMS.map((item) => (
                  <li key={item.id} className="thoothukudi-toc__item">
                    <a href={`#${item.id}`} className="thoothukudi-toc__link">{item.label}</a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA
          ============================================================ */}
      <RelatedReading links={[['/services/local-seo/thoothukudi/', 'Local SEO in Thoothukudi'], ['/services/seo/thoothukudi/', 'SEO in Thoothukudi'], ['/services/google-ads/thoothukudi/', 'Google Ads in Thoothukudi'], ['/locations/thoothukudi/', 'Digital marketing in Thoothukudi'], ['/industries/port-marine-industrial-thoothukudi/', 'Port, marine and industrial marketing'], ['/contact/', 'Get a custom quote']]} />

      <CTASection
        eyebrow="Local SEO"
        title="Need Local SEO for Your Thoothukudi Business?"
        subtitle="Static Savvy Media helps businesses in Thoothukudi build stronger local search visibility across Google, Maps, websites, and modern AI search."
        primaryLabel="Talk to Static Savvy Media"
        primaryHref={whatsappHref}
      />
    </div>
  )
}
