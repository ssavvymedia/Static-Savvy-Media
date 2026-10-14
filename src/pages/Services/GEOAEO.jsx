import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import ProcessSection from '../../components/sections/ProcessSection.jsx'
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
import '../../styles/pages/geo-aeo.css'
import geoAeoHeroImg from '../../assets/images/services/02GEOAEO.webp'

/* ============================================================
   CONTENT, Approved Static Savvy Media GEO & AEO Page Content
   ============================================================ */

const PAGE_TITLE =
  'GEO & AEO Optimization India, Get Cited by ChatGPT, Perplexity & Google AI | Static Savvy Media'

const PAGE_DESCRIPTION =
  "GEO and AEO services from Madurai. We structure your online presence so ChatGPT, Perplexity and Google AI Overviews can understand, trust and cite your business."

const HERO_SUBTITLE =
  'When someone asks ChatGPT "Which digital marketing agency should I hire in Madurai?", your business either appears in the answer, or it doesn’t. Traditional SEO determines what shows in the blue links. GEO and AEO determine what shows in the AI’s response itself. We offer AI search optimisation (GEO and AEO) alongside SEO, so you can be visible in both.'

const FLAGSHIP_HIGHLIGHT =
  "At Static Savvy Media, AI search optimisation (GEO and AEO) is a dedicated service, not an add-on, and it shapes how we plan SEO and content."

const SEARCH_REALITY = {
  paragraph1:
    "In 2024, AI-powered search was a novelty. In 2026, it is the primary discovery channel for a growing share of buyers. Google’s AI Overviews now appear on a significant portion of commercial queries. ChatGPT has over 200 million active users. Perplexity is replacing traditional research for professionals across industries. Microsoft Copilot is embedded in the tools your B2B clients use every day.",
  paragraph2:
    "If an AI engine is asked about a product or service you sell, and your business does not appear in the answer, you have just become invisible to that user. They do not scroll past the AI answer to find you in the blue links. The AI’s answer is the answer.",
}

const GEO_MECHANISMS = [
  {
    title: 'Entity Clarity',
    icon: 'entity',
    content:
      'Making it unambiguous who you are, what you do, where you do it, and who you serve, through consistent, structured information across every platform AI models index.',
  },
  {
    title: 'Citation Authority',
    icon: 'citation',
    content:
      'Building a network of verified third-party references AI models trust, structured data, authoritative backlinks, GBP verification, consistent NAP across directories.',
  },
  {
    title: 'Answer-Structured Content',
    icon: 'answer',
    content:
      'Writing content AI engines can extract, paraphrase, and cite, concise definitions, Q&A structure, definitive factual claims.',
  },
]

const AEO_SIGNALS = [
  {
    title: 'FAQPage Schema',
    icon: 'schema',
    content:
      'Structured Q&A markup that tells search engines and AI models “this is a question and this is the authoritative answer.”',
  },
  {
    title: 'Concise Answer Paragraphs',
    icon: 'paragraph',
    content:
      'AI engines prefer answers of 40–60 words. Content with clean, direct answer sentences consistently outperforms long meandering paragraphs.',
  },
  {
    title: 'Question-Aligned Headings',
    icon: 'heading',
    content:
      'H2 and H3 written as natural-language questions that match the query patterns AI users type and speak.',
  },
  {
    title: 'Entity Linking',
    icon: 'link',
    content:
      'Connecting your content to verified entities, GMB profile, LinkedIn, schema, that AI models use to confirm identity and authority.',
  },
]

const COMPARISON_ROWS = [
  {
    dimension: 'Goal',
    seo: 'Rank in Google blue links',
    aeo: 'Appear in direct answer boxes & AI Overviews',
    geo: 'Get cited by AI language models as an authority',
  },
  {
    dimension: 'Primary Signal',
    seo: 'Backlinks, technical health',
    aeo: 'FAQ schema, concise Q&A structure',
    geo: 'Entity consistency, citation network, structured data',
  },
  {
    dimension: 'User Action',
    seo: 'User must click your link',
    aeo: 'User sees your answer directly',
    geo: 'AI cites your brand in its response',
  },
  {
    dimension: 'Time to Result',
    seo: '3–8 months',
    aeo: '4–12 weeks post-schema',
    geo: '2–6 months as entity trust builds',
  },
]

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Entity Foundation Audit',
    text: 'Audit your GBP, schema markup, social profiles, directory listings, and NAP consistency. Every inconsistency reduces AI citation confidence. Fix first, build on top.',
  },
  {
    number: '02',
    title: 'AI-Visibility Question Bank',
    text: 'Research every question your target audience is asking AI engines about your service category, location, and competitors. This question bank becomes the content architecture for your entire site.',
  },
  {
    number: '03',
    title: 'Schema Implementation',
    text: "Full schema stack: Organization, LocalBusiness, Service, FAQPage, BreadcrumbList, Person, Article, validated with Google’s Rich Results Test. This is the machine-readable layer that tells AI engines exactly what your business is.",
  },
  {
    number: '04',
    title: 'Answer-Structured Content Development',
    text: 'Rewrite or create service and location pages in answer-optimised format: concise definitional paragraphs, Q&A-structured headings, FAQ blocks. Written to serve both human readers and AI engines parsing the page.',
  },
  {
    number: '05',
    title: 'Citation Authority Building',
    text: 'Editorial backlinks from industry publications and regional media, verified directory listings, cross-platform entity consistency. Each verified citation tells AI engines: “this business is real and authoritative in its category.”',
  },
  {
    number: '06',
    title: 'AI Visibility Monitoring',
    text: 'Track citation frequency across major AI engines and monitor which queries your business is being cited for. Monthly reporting on AI Overview appearances and branded query growth.',
  },
]

const AEO_CHECKLIST = [
  'Does every service and location page have FAQPage schema implemented and validated?',
  'Are H2/H3 headings written as questions your clients would type into Google or ChatGPT?',
  'Does every key concept have a 40–60 word definitional paragraph that stands alone?',
  'Is Organization schema implemented with a canonical description matching your GMB and LinkedIn?',
  'Do you have a standalone FAQ page that defines key terms in your industry?',
  'Are blog posts written with author E-E-A-T credentials visible (name, role, link to author page)?',
  'Does your robots.txt allow GPTBot, PerplexityBot, ClaudeBot, and Google-Extended?',
]

const FAQS = [
  {
    question: 'What is the difference between GEO and traditional SEO?',
    answer:
      "Traditional SEO optimises your website to appear in Google’s list of blue links. GEO optimises your entire online presence so AI engines, ChatGPT, Perplexity, Google Gemini, cite your business as the authoritative answer when users ask questions in your category. SEO gets you on the list. GEO gets you into the answer itself.",
  },
  {
    question: 'Can ChatGPT and Perplexity actually be optimized for?',
    answer:
      'Yes, but not through the same mechanism as Google. AI language models learn from the indexed web. By ensuring your business has a clear, consistent, and authoritative presence across websites, directories, and structured data, you increase the probability that AI models select your business as a citation when answering relevant queries. It is measurable and improvable.',
  },
  {
    question: 'How quickly will I see results from GEO and AEO?',
    answer:
      "AEO results, appearing in Google’s AI Overviews and featured snippets, can often be seen within 4–12 weeks of schema implementation and content restructuring. GEO results, citations in ChatGPT and Perplexity, take longer, typically 2–6 months as entity trust builds across platforms.",
  },
  {
    question: 'Is GEO/AEO only relevant for large businesses?',
    answer:
      'Not at all. Local SMEs in Tamil Nadu and Malaysia can benefit, because AI tools often answer local questions such as which clinic, shop or supplier to choose. Building clear, well-structured information early helps your business become a reliable source for those answers.',
  },
  {
    question: 'How do you measure GEO and AEO success?',
    answer:
      'We track: appearance frequency in Google AI Overviews (via Search Console), featured snippet capture rate, direct answer box appearances, branded query growth, and inbound enquiry source attribution. We also manually test your citation frequency in ChatGPT and Perplexity monthly.',
  },
  {
    question: 'Is GEO and AEO a separate service at Static Savvy Media?',
    answer:
      'Yes. We offer GEO and AEO as a dedicated service with its own deliverables, not just a label on standard SEO work. It is led by our founder, Deepan Kanz, and usually runs alongside SEO because the two share the same foundations.',
  },
]

const RELATED_SERVICES = [
  { name: 'SEO', path: '/services/seo/' },
  { name: 'Local SEO', path: '/services/local-seo/' },
  { name: 'AI Business Automation', path: '/services/ai-business-automation/' },
]

const RELATED_LOCATIONS = [
  { name: 'Madurai', path: '/locations/madurai/' },
  { name: 'Thoothukudi', path: '/locations/thoothukudi/' },
  { name: 'Malaysia', path: '/locations/malaysia/' },
]

const CTA = {
  title: 'Make your business easier for AI search to find and cite.',
  subtitle:
    'Ask us for a free check of how AI tools describe your business today. Message us on WhatsApp.',
  label: (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', verticalAlign: 'middle' }}>
      <WhatsAppIcon size={22} />
      <span>WhatsApp: +91-99440-40345</span>
    </span>
  ),
}

const geoCardStyles = {
  entity: {
    background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
    boxShadow: '0 0 15px rgba(168, 85, 247, 0.35)',
  },
  citation: {
    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    boxShadow: '0 0 15px rgba(59, 130, 246, 0.35)',
  },
  answer: {
    background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    boxShadow: '0 0 15px rgba(6, 182, 212, 0.35)',
  },
}

const aeoCardStyles = {
  schema: {
    background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
    boxShadow: '0 0 15px rgba(168, 85, 247, 0.35)',
  },
  paragraph: {
    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    boxShadow: '0 0 15px rgba(59, 130, 246, 0.35)',
  },
  heading: {
    background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    boxShadow: '0 0 15px rgba(6, 182, 212, 0.35)',
  },
  link: {
    background: 'linear-gradient(135deg, #ec4899, #db2777)',
    boxShadow: '0 0 15px rgba(236, 72, 153, 0.35)',
  },
}

/* ============================================================
   COMPONENT
   ============================================================ */

export default function GEOAEO() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/services/geo-aeo-ai-search/`,
      ogType: 'website',
    })

    const faqEntities = FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    }))

    const geoService = serviceSchema({
      serviceType: 'GEO & AEO Optimization',
      name: 'GEO & AEO Optimization, Static Savvy Media',
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/services/geo-aeo-ai-search/`,
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
        { name: 'GEO & AEO', item: `${SITE_URL}/services/geo-aeo-ai-search/` },
      ],
    })

    const scripts = [
      geoService,
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
    <div className="service-template geo-aeo">
      <style>{`
        /* --- GEO Mechanism Card Icons --- */
        .geo-aeo .geo-aeo-mechanisms__grid > *:nth-child(1) .geo-aeo-mechanism-card__icon {
          background: linear-gradient(135deg, #a855f7, #7c3aed) !important;
          box-shadow: 0 0 18px rgba(168, 85, 247, 0.45) !important;
        }

        .geo-aeo .geo-aeo-mechanisms__grid > *:nth-child(2) .geo-aeo-mechanism-card__icon {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8) !important;
          box-shadow: 0 0 18px rgba(59, 130, 246, 0.45) !important;
        }

        .geo-aeo .geo-aeo-mechanisms__grid > *:nth-child(3) .geo-aeo-mechanism-card__icon {
          background: linear-gradient(135deg, #06b6d4, #0891b2) !important;
          box-shadow: 0 0 18px rgba(6, 182, 212, 0.45) !important;
        }

        /* --- AEO Signal Card Icons --- */
        .geo-aeo .geo-aeo-signals__grid > *:nth-child(1) .geo-aeo-signal-card__icon {
          background: linear-gradient(135deg, #ec4899, #db2777) !important;
          box-shadow: 0 0 18px rgba(236, 72, 153, 0.45) !important;
        }

        .geo-aeo .geo-aeo-signals__grid > *:nth-child(2) .geo-aeo-signal-card__icon {
          background: linear-gradient(135deg, #f97316, #ea580c) !important;
          box-shadow: 0 0 18px rgba(249, 115, 22, 0.45) !important;
        }

        .geo-aeo .geo-aeo-signals__grid > *:nth-child(3) .geo-aeo-signal-card__icon {
          background: linear-gradient(135deg, #22c55e, #16a34a) !important;
          box-shadow: 0 0 18px rgba(34, 197, 94, 0.45) !important;
        }

        .geo-aeo .geo-aeo-signals__grid > *:nth-child(4) .geo-aeo-signal-card__icon {
          background: linear-gradient(135deg, #ef4444, #dc2626) !important;
          box-shadow: 0 0 18px rgba(239, 68, 68, 0.45) !important;
        }
      `}</style>

      {/* ---- Breadcrumbs ---- */}
      <Breadcrumbs />

      {/* ---- Hero ---- */}
      <HeroSection
        layout="two-column"
        eyebrow="Service"
        title="GEO & AEO Optimization, Get Your Business Cited by ChatGPT, Perplexity & Google AI Overviews"
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
          <img src={geoAeoHeroImg} width={1536} height={1024} fetchPriority="high" alt="GEO & AEO Optimization" className="hero__image" />
        </div>
      </HeroSection>

      {/* ---- Flagship Highlight ---- */}
      <section className="section geo-aeo-highlight">
        <div className="container">
          <ScrollReveal>
            <div className="geo-aeo-highlight__card glass-card gradient-border">
              <p className="geo-aeo-highlight__text">{FLAGSHIP_HIGHLIGHT}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- The New Search Reality ---- */}
      <section className="section geo-aeo-reality">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Why It Matters</span>
            <h2 className="section-heading__title">The New Search Reality</h2>
          </div>
          <div className="geo-aeo-reality__content">
            <ScrollReveal>
              <p>{SEARCH_REALITY.paragraph1}</p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p>{SEARCH_REALITY.paragraph2}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ---- What Is GEO ---- */}
      <section className="section geo-aeo-what-is">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">GEO</span>
            <h2 className="section-heading__title">What Is GEO, Generative Engine Optimization?</h2>
          </div>
          <ScrollReveal>
            <p className="geo-aeo-what-is__intro">
              Generative Engine Optimization is the structured practice of building your online
              presence so that large language models, ChatGPT, Google Gemini, Perplexity,
              Microsoft Copilot, select your business as a cited source when users ask
              questions in your category. GEO works through three mechanisms:
            </p>
          </ScrollReveal>
          <div className="geo-aeo-mechanisms__grid">
            {GEO_MECHANISMS.map((item, index) => {
              const cardStyle = geoCardStyles[item.icon] || geoCardStyles.entity
              return (
                <ScrollReveal key={item.title} delay={index * 80}>
                  <article className="geo-aeo-mechanism-card glass-card">
                    <div
                      className="geo-aeo-mechanism-card__icon"
                      aria-hidden="true"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        background: cardStyle.background,
                        boxShadow: cardStyle.boxShadow,
                        width: '52px',
                        height: '52px',
                        color: '#fff',
                      }}
                    >
                      {item.icon === 'entity' && (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="12" cy="12" r="4" />
                          <line x1="12" y1="2" x2="12" y2="6" />
                          <line x1="12" y1="18" x2="12" y2="22" />
                          <line x1="2" y1="12" x2="6" y2="12" />
                          <line x1="18" y1="12" x2="22" y2="12" />
                        </svg>
                      )}
                      {item.icon === 'citation' && (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          <path d="M9 12l2 2 4-4" />
                        </svg>
                      )}
                      {item.icon === 'answer' && (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          <line x1="8" y1="8" x2="16" y2="8" />
                          <line x1="8" y1="12" x2="14" y2="12" />
                        </svg>
                      )}
                    </div>
                    <h3 className="geo-aeo-mechanism-card__title">{item.title}</h3>
                    <p className="geo-aeo-mechanism-card__text">{item.content}</p>
                  </article>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---- What Is AEO ---- */}
      <section className="section geo-aeo-what-is geo-aeo-what-is--alt">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">AEO</span>
            <h2 className="section-heading__title">What Is AEO, Answer Engine Optimization?</h2>
          </div>
          <ScrollReveal>
            <p className="geo-aeo-what-is__intro">
              Answer Engine Optimization structures your content so it appears directly inside
              AI-powered answer boxes, voice search responses, and Google’s AI Overviews
             , without requiring a click. The key AEO signals are:
            </p>
          </ScrollReveal>
          <div className="geo-aeo-signals__grid">
            {AEO_SIGNALS.map((item, index) => {
              const cardStyle = aeoCardStyles[item.icon] || aeoCardStyles.schema
              return (
                <ScrollReveal key={item.title} delay={index * 80}>
                  <article className="geo-aeo-signal-card glass-card">
                    <div
                      className="geo-aeo-signal-card__icon"
                      aria-hidden="true"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        background: cardStyle.background,
                        boxShadow: cardStyle.boxShadow,
                        width: '52px',
                        height: '52px',
                        color: '#fff',
                      }}
                    >
                      {item.icon === 'schema' && (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="16 18 22 12 16 6" />
                          <polyline points="8 6 2 12 8 18" />
                        </svg>
                      )}
                      {item.icon === 'paragraph' && (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="21" y1="6" x2="3" y2="6" />
                          <line x1="17" y1="10" x2="3" y2="10" />
                          <line x1="21" y1="14" x2="3" y2="14" />
                          <line x1="15" y1="18" x2="3" y2="18" />
                        </svg>
                      )}
                      {item.icon === 'heading' && (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 12h8" />
                          <path d="M4 18V6" />
                          <path d="M12 18V6" />
                          <path d="M17 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                          <path d="M17 16v.01" />
                        </svg>
                      )}
                      {item.icon === 'link' && (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                      )}
                    </div>
                    <h3 className="geo-aeo-signal-card__title">{item.title}</h3>
                    <p className="geo-aeo-signal-card__text">{item.content}</p>
                  </article>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---- GEO vs SEO vs AEO ---- */}
      <section className="section geo-aeo-comparison">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Comparison</span>
            <h2 className="section-heading__title">GEO vs SEO vs AEO</h2>
          </div>
          <ScrollReveal>
            <div className="geo-aeo-table-wrapper">
              <table className="geo-aeo-table">
                <thead>
                  <tr>
                    <th>Dimension</th>
                    <th>Traditional SEO</th>
                    <th>AEO</th>
                    <th>GEO</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.dimension}>
                      <td className="geo-aeo-table__dimension">{row.dimension}</td>
                      <td>{row.seo}</td>
                      <td>{row.aeo}</td>
                      <td>{row.geo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- Our GEO & AEO Process ---- */}
      <ProcessSection
        eyebrow="Process"
        title="Our GEO & AEO Process"
        steps={PROCESS_STEPS}
      />

      {/* ---- AEO Implementation Checklist ---- */}
      <section className="section geo-aeo-checklist">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Checklist</span>
            <h2 className="section-heading__title">AEO Implementation Checklist</h2>
          </div>
          <ScrollReveal>
            <div className="geo-aeo-checklist__card glass-card gradient-border">
              <ul className="geo-aeo-checklist__list">
                {AEO_CHECKLIST.map((item, index) => (
                  <li key={index} className="geo-aeo-checklist__item">
                    <span className="geo-aeo-checklist__checkbox" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="3" />
                      </svg>
                    </span>
                    <span className="geo-aeo-checklist__text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>


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
              <Link to="/about/deepan-kanz/" className="related-content__link">
                About / Founder
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

      {/* ---- GEO & AEO by Location ---- */}
      <section className="section geo-location-cta">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Locations</span>
              <h2 className="section-heading__title">GEO & AEO Services in Madurai</h2>
              <p className="section-heading__subtitle">
                Looking for GEO & AEO services specifically for your Madurai business?
                Explore our dedicated Madurai service page for AI Search Optimization.
              </p>
            </div>
          </ScrollReveal>
          <div className="geo-location-cta__grid">
            <ScrollReveal>
              <div className="geo-location-cta__card glass-card">
                <span className="geo-location-cta__badge">Madurai</span>
                <h3 className="geo-location-cta__title">GEO & AEO Services, Madurai</h3>
                <p className="geo-location-cta__text">
                  Discover how Static Savvy Media helps Madurai businesses improve their
                  visibility across AI-powered search and answer engines.
                </p>
                <Link
                  to="/services/geo-aeo-ai-search/madurai/"
                  className="geo-location-cta__link"
                >
                  Explore GEO & AEO Madurai
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
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <FAQSection
        eyebrow="FAQ"
        title="GEO & AEO, Frequently Asked Questions"
        faqs={FAQS}
      />

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
