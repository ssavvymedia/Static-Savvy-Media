import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../../components/common/Breadcrumbs.jsx'
import Button from '../../../components/common/Button.jsx'
import HeroSection from '../../../components/hero/HeroSection.jsx'
import CTASection from '../../../components/sections/CTASection.jsx'
import { ScrollReveal } from '../../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../../utils/seo.js'
import {
  serviceSchema,
  faqPageSchema,
  breadcrumbListSchema,
} from '../../../utils/schema.js'
import { buildWhatsAppLink } from '../../../utils/helpers.js'
import {
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
  SITE_URL,
} from '../../../utils/constants.js'
import '../../../styles/pages/geo-aeo-madurai.css'
import heroImage from '../../../assets/images/GEOAEO/GEOAEO.png'

/* ============================================================
   CONTENT, GEO & AEO Madurai
   ============================================================ */

const PAGE_TITLE =
  'GEO & AEO Services in Madurai | AI Search Optimization | Static Savvy Media'

const PAGE_DESCRIPTION =
  "Get your Madurai business discovered and cited across ChatGPT, Google AI Overviews, Perplexity and other AI search engines with Static Savvy Media's GEO & AEO services."

const HERO_EYEBROW = 'GEO & AEO, MADURAI'

const HERO_TITLE =
  'GEO & AEO Services in Madurai, Get Found by Google. Get Cited by AI.'

const HERO_PARAGRAPH =
  'Your next customer is no longer searching only through traditional Google results. They are asking ChatGPT, Perplexity, Google AI Overviews and other AI-powered answer engines. Static Savvy Media helps businesses in Madurai structure their content, entities, schema and digital signals so AI engines can understand, trust and cite their business.'

const WHY_GEO_AEO = [
  'Which is the best service provider in Madurai?',
  'Which digital marketing agency should I choose?',
  'Who provides a particular service near me?',
  'Which company is trustworthy?',
  'Which business has expertise in a specific industry?',
]

const WHAT_IS = [
  {
    title: 'GEO, Generative Engine Optimization',
    text: 'The practice of improving a brand’s visibility and representation inside AI-generated responses and generative search experiences. GEO ensures your business is discoverable, understandable and citable by AI-powered search systems.',
  },
  {
    title: 'AEO, Answer Engine Optimization',
    text: 'Structuring content so answer engines can understand, extract and use the information when responding to user questions. AEO focuses on FAQ schema, concise Q&A content and question-aligned headings that AI engines can parse.',
  },
]

const COMPARISON = [
  { label: 'SEO', text: 'Get discovered in search results.' },
  { label: 'GEO', text: 'Get represented in generative AI answers.' },
  { label: 'AEO', text: 'Get selected as a useful answer source.' },
]

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Entity & Brand Understanding',
    text: 'Build a clear and consistent understanding of the business, services, locations, industries and expertise.',
  },
  {
    number: '02',
    title: 'Search Intent & Question Mapping',
    text: 'Identify the questions customers are asking across Google and AI search platforms.',
  },
  {
    number: '03',
    title: 'AI-Ready Content Structure',
    text: 'Create content that is easy for search engines and AI systems to understand and extract.',
  },
  {
    number: '04',
    title: 'Schema & Structured Data',
    text: 'Implement appropriate structured data and schema markup.',
  },
  {
    number: '05',
    title: 'Entity Linking & Attribution',
    text: 'Connect the business with verified entities, profiles and authoritative references.',
  },
  {
    number: '06',
    title: 'Continuous Optimization',
    text: 'Monitor visibility, search behaviour, content performance and AI discovery opportunities.',
  },
]

const OPTIMIZATIONS = [
  {
    title: 'AI Search Visibility',
    text: 'Improve how your business is represented in AI-powered search experiences.',
  },
  {
    title: 'Answer-Ready Content',
    text: 'Structure content around real customer questions.',
  },
  {
    title: 'FAQ Optimization',
    text: 'Create useful question-and-answer content that AI systems can understand.',
  },
  {
    title: 'Schema Markup',
    text: 'Implement relevant structured data to improve machine understanding.',
  },
  {
    title: 'Entity Signals',
    text: 'Strengthen the relationship between your brand, services, people, locations and trusted profiles.',
  },
  {
    title: 'Content Authority',
    text: 'Develop authoritative content that demonstrates expertise and relevance.',
  },
  {
    title: 'Local Madurai Signals',
    text: 'Strengthen location relevance for customers searching for businesses and services in Madurai.',
  },
  {
    title: 'AI Citation Opportunities',
    text: 'Identify content opportunities where the business can become a useful cited source.',
  },
]

const PLATFORMS = [
  'Google AI Overviews',
  'ChatGPT',
  'Perplexity',
  'Microsoft Copilot',
  'AI-powered voice search',
  'Other generative search experiences',
]

const INDUSTRIES = [
  {
    title: 'Textile & Apparel',
    text: 'Madurai’s textile businesses can become visible when buyers ask AI engines about fabric suppliers, garment manufacturers and textile wholesalers.',
  },
  {
    title: 'Healthcare & Clinics',
    text: 'Hospitals, clinics and healthcare providers can appear in AI answers when patients search for medical specialists and healthcare services.',
  },
  {
    title: 'Education & Training',
    text: 'Colleges, coaching centres and training institutions can be cited when students and parents ask about educational options.',
  },
  {
    title: 'Real Estate',
    text: 'Builders and real estate agents can gain visibility when buyers ask about property options and investment opportunities in Madurai.',
  },
  {
    title: 'Hospitality',
    text: 'Hotels, restaurants and event venues can appear in AI recommendations for dining, accommodation and event planning.',
  },
  {
    title: 'Retail & Ecommerce',
    text: 'Retail businesses can be discovered when customers ask AI engines about product availability and shopping options.',
  },
  {
    title: 'Professional Services',
    text: 'Law firms, accountants and consultants can be cited when businesses search for professional expertise.',
  },
  {
    title: 'Manufacturing & Industrial',
    text: 'Manufacturers can gain visibility when B2B buyers ask AI engines about suppliers and production capabilities.',
  },
]

const WHY_CHOOSE = [
  {
    number: '01',
    title: 'Madurai Market Understanding',
    text: 'Deep knowledge of Madurai’s business landscape, customer behaviour and competitive environment.',
  },
  {
    number: '02',
    title: 'SEO + GEO + AEO Approach',
    text: 'Integrated strategy that covers traditional search, generative AI and answer engine optimization.',
  },
  {
    number: '03',
    title: 'Technical + Content + Entity Strategy',
    text: 'Combination of technical implementation, content development and entity authority building.',
  },
  {
    number: '04',
    title: 'Built for the AI Search Era',
    text: 'Purpose-built for the era of AI-powered search, not retrofitted from traditional SEO.',
  },
]

const INTEGRATION_VISUAL = [
  { label: 'Traditional SEO', result: 'Search Visibility' },
  { label: 'GEO', result: 'Generative Search Visibility' },
  { label: 'AEO', result: 'Answer Engine Visibility' },
]

const FAQS = [
  {
    question: 'What is GEO in digital marketing?',
    answer:
      'GEO (Generative Engine Optimization) is the practice of optimizing your online presence so AI-powered search engines, such as ChatGPT, Perplexity and Google AI Overviews, cite your business as an authoritative source when users ask questions in your category. Unlike traditional SEO, which focuses on ranking in blue links, GEO focuses on being included in AI-generated answers.',
  },
  {
    question: 'What is AEO and how is it different from SEO?',
    answer:
      'AEO (Answer Engine Optimization) structures your content so answer engines can understand, extract and present it as a direct answer to user questions. While SEO focuses on ranking web pages in search results, AEO focuses on making your content the source that AI systems select when providing answers. AEO uses FAQ schema, concise answer paragraphs and question-aligned headings.',
  },
  {
    question: 'Can GEO help my business appear in ChatGPT answers?',
    answer:
      'GEO improves the signals, content structure and entity understanding that can influence AI discovery and citation. While we cannot guarantee specific AI responses or citations, businesses with strong entity signals, structured data and authoritative content are more likely to be selected by AI engines when answering relevant queries.',
  },
  {
    question: 'Is AEO useful for businesses in Madurai?',
    answer:
      'Yes. Madurai businesses benefit from being discoverable when customers ask AI-powered search tools questions about local services, businesses and providers. As more consumers and businesses use AI search tools, having answer-optimized content gives Madurai businesses a competitive advantage.',
  },
  {
    question: 'How long does GEO and AEO optimization take?',
    answer:
      'Results vary depending on your current authority, technical health, content quality, competition and existing digital signals. AEO improvements, such as featured snippet and AI Overview appearances, can often be seen within 4–12 weeks. GEO results, citations in AI engines, typically take 2–6 months as entity trust builds across platforms.',
  },
]

const RELATED_SERVICES = [
  { name: 'SEO', path: '/services/seo/' },
  { name: 'Local SEO', path: '/services/local-seo/' },
  { name: 'Website Design & Development', path: '/services/website-design-development/' },
  { name: 'Google Ads', path: '/services/google-ads/' },
  { name: 'AI Business Automation', path: '/services/ai-business-automation/' },
]

const LOCATIONS = [
  { name: 'Madurai', path: '/locations/madurai/', active: true },
  { name: 'Thoothukudi', path: '/locations/thoothukudi/' },
  { name: 'Malaysia', path: '/locations/malaysia/' },
]

const CTA = {
  title: 'Make Your Madurai Business Visible in the AI Search Era',
  subtitle:
    'Don’t rely only on traditional search results. Build the content, authority, structured data and entity signals that help AI-powered search systems understand your business.',
  label: 'WhatsApp for GEO & AEO Consultation',
}

/* ============================================================
   FAQ ITEM COMPONENT
   ============================================================ */

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false)
  const answerId = `geo-aeo-madurai-faq-answer-${faq.question.slice(0, 30).replace(/\s/g, '-')}`
  const questionId = `geo-aeo-madurai-faq-question-${faq.question.slice(0, 30).replace(/\s/g, '-')}`

  return (
    <div className={`geo-aeo-madurai-faq glass-card ${open ? 'geo-aeo-madurai-faq--open' : ''}`}>
      <button
        className="geo-aeo-madurai-faq__trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={answerId}
        id={questionId}
      >
        <span className="geo-aeo-madurai-faq__question">{faq.question}</span>
        <span className="geo-aeo-madurai-faq__icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>
      <div
        className="geo-aeo-madurai-faq__answer-wrap"
        id={answerId}
        role="region"
        aria-labelledby={questionId}
        hidden={!open}
      >
        <p className="geo-aeo-madurai-faq__answer">{faq.answer}</p>
      </div>
    </div>
  )
}

/* ============================================================
   COMPONENT
   ============================================================ */

export default function GEOAEO_Madurai() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/services/geo-aeo-ai-search/madurai/`,
      ogType: 'website',
    })

    const service = serviceSchema({
      serviceType: 'GEO & AEO Optimization',
      name: 'GEO & AEO Services in Madurai',
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/services/geo-aeo-ai-search/madurai/`,
      areaServed: 'Madurai',
    })

    const faq = faqPageSchema({
      faqs: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Services', item: `${SITE_URL}/services/` },
        { name: 'GEO & AEO', item: `${SITE_URL}/services/geo-aeo-ai-search/` },
        { name: 'Madurai', item: `${SITE_URL}/services/geo-aeo-ai-search/madurai/` },
      ],
    })

    const scripts = [service, faq, breadcrumbs].map((data) => {
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

  const whatsappHref = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MSG)

  return (
    <div className="geo-aeo-madurai-page">
      <Breadcrumbs />

      {/* HERO */}
      <HeroSection
        layout="two-column"
        eyebrow={HERO_EYEBROW}
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
              {CTA.label}
            </Button>
            <Button href="/services/geo-aeo-ai-search/" variant="ghost" size="lg">
              View GEO & AEO Services
            </Button>
          </>
        }
      >
        <div className="hero__visual-side">
          <img
            src={heroImage}
            alt="GEO and AEO Services"
            className="hero__image"
          />
        </div>
      </HeroSection>

      {/* WHY GEO & AEO MATTER */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Why It Matters</span>
              <h2 className="section-heading__title">Why GEO & AEO Matter for Madurai Businesses</h2>
              <p className="section-heading__subtitle">
                Traditional SEO helps a business appear in search results. GEO and AEO extend
                that visibility into AI-generated answers.
              </p>
            </div>
          </ScrollReveal>
          <div className="geo-aeo-madurai-why">
            <p className="geo-aeo-madurai-why__intro">
              Customers increasingly ask AI-powered search engines:
            </p>
            <div className="geo-aeo-madurai-questions">
              {WHY_GEO_AEO.map((q, i) => (
                <div key={i} className="geo-aeo-madurai-question glass-card">
                  <span className="geo-aeo-madurai-question__icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                    </svg>
                  </span>
                  <span>{q}</span>
                </div>
              ))}
            </div>
            <p className="geo-aeo-madurai-why__conclusion">
              The objective is not simply ranking a webpage. The objective is to make the business
              discoverable, understandable, authoritative, attributable and citeable to AI-powered
              search and answer systems.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT ARE GEO AND AEO */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Definitions</span>
              <h2 className="section-heading__title">What Are GEO and AEO?</h2>
            </div>
          </ScrollReveal>
          <div className="geo-aeo-madurai-cards">
            {WHAT_IS.map((item, i) => (
              <ScrollReveal key={i}>
                <div className="geo-aeo-madurai-card glass-card">
                  <h3 className="geo-aeo-madurai-card__title">{item.title}</h3>
                  <p className="geo-aeo-madurai-card__text">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="geo-aeo-madurai-comparison">
            {COMPARISON.map((item, i) => (
              <div key={i} className="geo-aeo-madurai-comparison__item">
                <span className="geo-aeo-madurai-comparison__label">{item.label}</span>
                <span className="geo-aeo-madurai-comparison__text">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Process</span>
              <h2 className="section-heading__title">Our GEO & AEO Strategy for Madurai Businesses</h2>
            </div>
          </ScrollReveal>
          <div className="geo-aeo-madurai-process">
            {PROCESS_STEPS.map((step) => (
              <div key={step.number} className="geo-aeo-madurai-process__step">
                <span className="geo-aeo-madurai-process__number">{step.number}</span>
                <div className="geo-aeo-madurai-process__content">
                  <h3 className="geo-aeo-madurai-process__title">{step.title}</h3>
                  <p className="geo-aeo-madurai-process__text">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE OPTIMIZE */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Services</span>
              <h2 className="section-heading__title">What We Optimize</h2>
            </div>
          </ScrollReveal>
          <div className="geo-aeo-madurai-optimizations">
            {OPTIMIZATIONS.map((item, i) => (
              <ScrollReveal key={i}>
                <div className="geo-aeo-madurai-optimization glass-card">
                  <span className="geo-aeo-madurai-optimization__number">0{i + 1}</span>
                  <h3 className="geo-aeo-madurai-optimization__title">{item.title}</h3>
                  <p className="geo-aeo-madurai-optimization__text">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Platforms</span>
              <h2 className="section-heading__title">Built for AI Search Platforms</h2>
              <p className="section-heading__subtitle">
                Designed to improve your eligibility and visibility across major AI-powered
                search and answer engines.
              </p>
            </div>
          </ScrollReveal>
          <div className="geo-aeo-madurai-platforms">
            {PLATFORMS.map((platform) => (
              <span key={platform} className="geo-aeo-madurai-platform glass-card">
                {platform}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Industries</span>
              <h2 className="section-heading__title">GEO & AEO for Different Madurai Industries</h2>
            </div>
          </ScrollReveal>
          <div className="geo-aeo-madurai-industries">
            {INDUSTRIES.map((item, i) => (
              <ScrollReveal key={i}>
                <div className="geo-aeo-madurai-industry glass-card">
                  <h3 className="geo-aeo-madurai-industry__title">{item.title}</h3>
                  <p className="geo-aeo-madurai-industry__text">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Why Us</span>
              <h2 className="section-heading__title">Why Choose Static Savvy Media for GEO & AEO in Madurai?</h2>
            </div>
          </ScrollReveal>
          <div className="geo-aeo-madurai-why-choose">
            {WHY_CHOOSE.map((item) => (
              <ScrollReveal key={item.number}>
                <div className="geo-aeo-madurai-why-choose__card glass-card">
                  <span className="geo-aeo-madurai-why-choose__number">{item.number}</span>
                  <h3 className="geo-aeo-madurai-why-choose__title">{item.title}</h3>
                  <p className="geo-aeo-madurai-why-choose__text">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATION */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Integration</span>
              <h2 className="section-heading__title">SEO + GEO + AEO, One Integrated Search Strategy</h2>
            </div>
          </ScrollReveal>
          <div className="geo-aeo-madurai-integration">
            {INTEGRATION_VISUAL.map((item, i) => (
              <div key={i} className="geo-aeo-madurai-integration__item">
                <div className="geo-aeo-madurai-integration__label glass-card">{item.label}</div>
                <span className="geo-aeo-madurai-integration__arrow" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                  </svg>
                </span>
                <div className="geo-aeo-madurai-integration__result">{item.result}</div>
              </div>
            ))}
          </div>
          <p className="geo-aeo-madurai-integration__note">
            The three approaches should not operate independently. Strong technical SEO, useful
            content, structured data, entity signals and authority all contribute to a stronger
            digital presence.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">FAQ</span>
              <h2 className="section-heading__title">Frequently Asked Questions About GEO & AEO in Madurai</h2>
            </div>
          </ScrollReveal>
          <div className="geo-aeo-madurai-faqs">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* RELATED SERVICES */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Services</span>
              <h2 className="section-heading__title">Related Services</h2>
            </div>
          </ScrollReveal>
          <div className="geo-aeo-madurai-related">
            {RELATED_SERVICES.map((service) => (
              <Link key={service.path} to={service.path} className="geo-aeo-madurai-related__link glass-card">
                <span>{service.name}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Locations</span>
              <h2 className="section-heading__title">Explore Static Savvy Media by Location</h2>
            </div>
          </ScrollReveal>
          <div className="geo-aeo-madurai-locations">
            {LOCATIONS.map((location) => (
              <Link
                key={location.path}
                to={location.path}
                className={`geo-aeo-madurai-location glass-card ${location.active ? 'geo-aeo-madurai-location--active' : ''}`}
              >
                <span>{location.name}</span>
                {!location.active && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection title={CTA.title} subtitle={CTA.subtitle} />
    </div>
  )
}

const WHATSAPP_MSG = 'Hi Static Savvy Media, I would like to know more about GEO & AEO services for my business in Madurai.'
