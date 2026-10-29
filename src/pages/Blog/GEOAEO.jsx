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
   CONTENT, Approved Static Savvy Media GEO Article Content
   ============================================================ */

const PAGE_TITLE = 'What Is Generative Engine Optimization (GEO)? The Complete 2026 Guide'

const PAGE_DESCRIPTION =
  'Generative Engine Optimization (GEO) is the practice of getting your business cited by ChatGPT, Perplexity, and Google AI. This complete guide explains what it is, how it works, and how to get started.'

const AUTHOR = 'Deepan Kanz'
const AUTHOR_ROLE = 'Founder & AI Search Specialist'
const READING_TIME = 'Estimated reading time: approximately 10–12 min'

const INTRODUCTION =
  'If you have asked ChatGPT a question and noticed it cites specific websites or businesses in its answer, that citation did not happen by accident. It happened because that business’s digital presence was built in a way that AI engines trust, understand, and can attribute. That is Generative Engine Optimization. This guide explains exactly what it is, why it matters in 2026, and what you need to do to make AI engines choose your business as a cited source.'

const PRINCIPLES = [
  {
    number: '01',
    title: 'Clear and Consistent Across All Sources',
    text: 'The same business name, address, phone number, description, and services described identically across your website, GBP, LinkedIn, directories, and social profiles. Inconsistency is interpreted by AI models as uncertainty, and uncertain sources are cited less frequently.',
    visual: 'Entity Consistency',
  },
  {
    number: '02',
    title: 'Structured in a Way AI Can Parse',
    text: 'Schema markup (JSON-LD) tells AI engines explicitly what your business is, what it does, where it operates, and what it offers. Without schema, AI engines are inferring this from unstructured text.',
    visual: 'Structured Data',
  },
  {
    number: '03',
    title: 'Verified Through Trusted Third-Party Sources',
    text: 'AI models use authoritative third-party references (GBP, verified directory listings, editorial backlinks) to confirm that your entity is real and your claimed expertise is legitimate.',
    visual: 'Authority Signals',
  },
  {
    number: '04',
    title: 'Written in Answer-Optimised Format',
    text: 'Content that gives clear, concise, direct answers to real questions, rather than long flowing paragraphs, is far more frequently extracted and cited by AI engines.',
    visual: 'Answer-First Content',
  },
]

const COMPARISON_DATA = [
  { dimension: 'Surface', seo: "Google's blue link results page", geo: 'AI-generated answers from ChatGPT, Gemini, Perplexity' },
  { dimension: 'Core Signal', seo: 'Backlinks, keyword usage, technical health', geo: 'Entity clarity, structured data, authority and citation signals' },
  { dimension: 'Primary Goal', seo: 'Rank pages', geo: 'Become a trusted cited source in AI answers' },
  { dimension: 'Scope', seo: 'Primarily website and links', geo: 'Entire digital presence' },
  { dimension: 'User Experience', seo: 'User chooses a result from a list', geo: 'AI provides a synthesized answer with sources' },
]

const HOW_TO_START = [
  'Establish consistent business/entity information across all platforms.',
  'Build a technically clear website with proper schema markup.',
  'Implement appropriate structured data (JSON-LD) for your business type.',
  'Create answer-first content around real customer questions.',
  'Strengthen trusted third-party references and directory listings.',
  'Maintain consistent profiles and business information everywhere.',
  'Monitor AI search visibility and citation frequency.',
  'Continuously improve the entity and content footprint.',
]

const FAQS = [
  {
    question: 'What is GEO?',
    answer: 'GEO optimises your entire online presence so AI engines, ChatGPT, Perplexity, Google Gemini, cite your business as the authoritative answer when users ask questions in your category. SEO gets you on the list. GEO gets you into the answer itself.',
  },
  {
    question: 'Can ChatGPT and Perplexity actually be optimized for?',
    answer: 'Yes, but not through the same mechanism as Google. AI language models learn from the indexed web. By ensuring your business has a clear, consistent, and authoritative presence across websites, directories, and structured data, you increase the probability that AI models select your business as a citation when answering relevant queries. It is measurable and improvable.',
  },
  {
    question: 'How quickly will I see results from GEO and AEO?',
    answer: 'AEO results, appearing in Google’s AI Overviews and featured snippets, can often be seen within 4–12 weeks of schema implementation and content restructuring. GEO results, citations in ChatGPT and Perplexity, take longer, typically 2–6 months as entity trust builds across platforms. Typical timelines depend on competition and implementation quality.',
  },
  {
    question: 'Is GEO/AEO only relevant for large businesses?',
    answer: 'Not at all. Local SMEs in Tamil Nadu and Malaysia have a significant opportunity because most competitors have not yet heard of GEO or AEO. Being the first business in your local category to build AI search visibility is a substantial competitive advantage that compounds over time.',
  },
  {
    question: 'How do you measure GEO and AEO success?',
    answer: 'We track: organic clicks and impressions in Search Console, featured snippet appearances, direct answer box appearances, branded query growth, and inbound enquiry source attribution. We also manually test your citation frequency in ChatGPT and Perplexity monthly.',
  },
  {
    question: 'Is GEO and AEO a separate service at Static Savvy Media?',
    answer: 'Yes. We offer GEO and AEO as a dedicated service with its own deliverables, not just a label on standard SEO work. It is led by our founder, Deepan Kanz, and usually runs alongside SEO because the two share the same foundations.',
  },
]

const RELATED_ARTICLES = [
  {
    title: 'What Is Answer Engine Optimization (AEO)? How to Rank in AI Answers',
    slug: '/blog/what-is-answer-engine-optimization/',
    category: 'AEO',
    categoryClass: 'geo-related-card__category--cyan',
  },
  {
    title: 'How to Choose an SEO Agency in Madurai, Complete 2026 Guide',
    slug: '/blog/seo-agency-madurai-complete-guide/',
    category: 'SEO / Madurai',
    categoryClass: 'geo-related-card__category--blue',
  },
  {
    title: 'Local SEO for Thoothukudi Businesses, Port City Growth Guide 2026',
    slug: '/blog/local-seo-thoothukudi-businesses/',
    category: 'Local SEO',
    categoryClass: '',
  },
]

const TOC_ITEMS = [
  { id: 'what-is-geo', label: 'What Is GEO?' },
  { id: 'why-geo-matters', label: 'Why GEO Matters in 2026' },
  { id: 'how-geo-works', label: 'How Does GEO Work?' },
  { id: 'geo-vs-seo', label: 'GEO vs SEO' },
  { id: 'how-to-start', label: 'How to Get Started' },
  { id: 'seo-aeo-geo', label: 'SEO vs AEO vs GEO' },
  { id: 'ai-ecosystem', label: 'AI Search Ecosystem' },
  { id: 'entity-clarity', label: 'Entity Clarity' },
  { id: 'content-format', label: 'AI-Friendly Content' },
  { id: 'faq', label: 'FAQs' },
  { id: 'takeaways', label: 'Key Takeaways' },
]

/* ============================================================
   COMPONENT
   ============================================================ */

export default function GEOAEO() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/blog/what-is-generative-engine-optimization/`,
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
      url: `${SITE_URL}/blog/what-is-generative-engine-optimization/`,
      mainEntityOfPage: `${SITE_URL}/blog/what-is-generative-engine-optimization/`,
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Blog', item: `${SITE_URL}/blog/` },
        { name: 'What Is GEO', item: `${SITE_URL}/blog/what-is-generative-engine-optimization/` },
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
          <div className="geo-hero">
            <div className="geo-hero__content">
              <span className="geo-hero__badge">GEO / AI Search</span>
              <h1 className="hero__title">
                What Is Generative Engine Optimization (GEO)?{' '}
                <span className="text-gradient">The Complete 2026 Guide</span>
              </h1>
              <div className="geo-hero__meta">
                <span className="geo-hero__meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  {AUTHOR}
                </span>
                <span className="geo-hero__meta-item">{AUTHOR_ROLE}</span>
                <span className="geo-hero__meta-item">{READING_TIME}</span>
              </div>
              <p className="geo-hero__intro">{INTRODUCTION}</p>
            </div>
            <div className="geo-hero__visual">
              <div className="geo-hero__visual-card">
                <div className="geo-hero__visual-label">AI Search Flow</div>
                <div className="geo-hero__visual-flow">
                  <div className="geo-hero__visual-step geo-hero__visual-step--query">User Query</div>
                  <div className="geo-hero__visual-arrow" aria-hidden="true">↓</div>
                  <div className="geo-hero__visual-step geo-hero__visual-step--ai">AI Engine</div>
                  <div className="geo-hero__visual-arrow" aria-hidden="true">↓</div>
                  <div className="geo-hero__visual-step geo-hero__visual-step--entity">Business Entity</div>
                  <div className="geo-hero__visual-arrow" aria-hidden="true">↓</div>
                  <div className="geo-hero__visual-step geo-hero__visual-step--citation">Citation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BlogFeaturedImage slug="what-is-generative-engine-optimization" />

      {/* ============================================================
          ARTICLE BODY + TOC
          ============================================================ */}
      <section className="section section--alt">
        <div className="container">
          <div className="geo-article">
            <div className="geo-article__body">

              {/* ---- What Is GEO? ---- */}
              <h2 id="what-is-geo">What Is Generative Engine Optimization (GEO)?</h2>
              <p>
                Generative Engine Optimization (GEO) is the practice of structuring your online presence so that AI language models, including ChatGPT (OpenAI), Google Gemini, Perplexity, and Microsoft Copilot, cite your business as an authority when users ask questions in your category.
              </p>
              <p>
                Unlike traditional SEO, which optimises your website to appear in Google&apos;s list of blue link results, GEO optimises your entire digital presence, website, schema markup, directory listings, social profiles, and third-party mentions, for the way AI engines discover, assess, and cite sources.
              </p>
              <p>
                When a user asks ChatGPT &ldquo;What is the best digital marketing agency for SEO in Madurai?&rdquo;, GEO is what determines whether your business appears in the answer, and with what confidence the AI cites it.
              </p>

              {/* ---- Why GEO Matters ---- */}
              <h2 id="why-geo-matters">Why GEO Matters in 2026</h2>
              <p>
                AI search is no longer a novelty. Google&apos;s AI Overviews now appear on hundreds of millions of daily searches. ChatGPT serves over 200 million active users. Perplexity has emerged as the preferred research tool for a growing segment of professionals. These platforms are not supplementing traditional search, for a growing share of users and query types, they are replacing it.
              </p>
              <p>
                When a user asks an AI engine a question and the AI gives a direct answer with citations, most users do not then go and search Google for additional results. The AI answer is the answer. If your business is not in that answer, you are invisible to that user at that moment.
              </p>

              {/* ---- How Does GEO Work? ---- */}
              <h2 id="how-geo-works">How Does GEO Work?</h2>
              <p>
                AI language models learn from the content they are trained on, an enormous portion of the publicly indexed web. GEO works by ensuring your business&apos;s information is:
              </p>
              <div className="geo-principles">
                {PRINCIPLES.map((p) => (
                  <ScrollReveal key={p.number}>
                    <div className="geo-principle-card">
                      <div className="geo-principle-card__number">{p.number}</div>
                      <h3 className="geo-principle-card__title">{p.title}</h3>
                      <p className="geo-principle-card__text">{p.text}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* ---- GEO vs SEO ---- */}
              <h2 id="geo-vs-seo">GEO vs SEO: The Key Differences</h2>
              <ScrollReveal>
                <div className="geo-comparison">
                  <div className="geo-comparison__header">
                    <div className="geo-comparison__header-cell">Dimension</div>
                    <div className="geo-comparison__header-cell geo-comparison__header-cell--seo">Traditional SEO</div>
                    <div className="geo-comparison__header-cell geo-comparison__header-cell--geo">GEO</div>
                  </div>
                  {COMPARISON_DATA.map((row) => (
                    <div key={row.dimension} className="geo-comparison__row">
                      <div className="geo-comparison__cell" data-label="Dimension">{row.dimension}</div>
                      <div className="geo-comparison__cell" data-label="SEO">{row.seo}</div>
                      <div className="geo-comparison__cell" data-label="GEO">{row.geo}</div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* ---- Major Takeaway ---- */}
              <ScrollReveal>
                <div className="geo-takeaway">
                  <div className="geo-takeaway__line geo-takeaway__line--muted">SEO gets you on the list.</div>
                  <div className="geo-takeaway__line geo-takeaway__line--highlight">GEO gets you into the answer itself.</div>
                </div>
              </ScrollReveal>

              {/* ---- How to Get Started ---- */}
              <h2 id="how-to-start">How to Get Started with GEO</h2>
              <p>
                Implementing GEO is a systematic process. Here are the practical principles for building AI search visibility:
              </p>
              <div className="geo-content-stack">
                {HOW_TO_START.map((step, index) => (
                  <ScrollReveal key={index} delay={index * 50}>
                    <div className="geo-content-stack__step">
                      <div className="geo-content-stack__number">{index + 1}</div>
                      <div className="geo-content-stack__text">{step}</div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* ---- SEO vs AEO vs GEO ---- */}
              <h2 id="seo-aeo-geo">SEO vs AEO vs GEO</h2>
              <p>
                These three disciplines work together as a complete digital visibility system. Each serves a different function in how your business gets discovered:
              </p>
              <div className="geo-three-col">
                <ScrollReveal delay={0}>
                  <div className="geo-three-col__card">
                    <div className="geo-three-col__icon" aria-hidden="true">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    </div>
                    <div className="geo-three-col__label">SEO</div>
                    <div className="geo-three-col__title">FIND</div>
                    <div className="geo-three-col__text">Visibility in traditional search results. Rank pages on Google.</div>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={80}>
                  <div className="geo-three-col__card">
                    <div className="geo-three-col__icon" aria-hidden="true">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                    </div>
                    <div className="geo-three-col__label">AEO</div>
                    <div className="geo-three-col__title">ANSWER</div>
                    <div className="geo-three-col__text">Optimisation for direct answers, featured snippets, AI Overviews and voice search.</div>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={160}>
                  <div className="geo-three-col__card">
                    <div className="geo-three-col__icon" aria-hidden="true">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
                    </div>
                    <div className="geo-three-col__label">GEO</div>
                    <div className="geo-three-col__title">CITE</div>
                    <div className="geo-three-col__text">Optimisation of the broader digital presence so AI systems can understand, trust and cite the business.</div>
                  </div>
                </ScrollReveal>
              </div>

              {/* ---- AI Search Ecosystem ---- */}
              <h2 id="ai-ecosystem">Where AI Search Finds Your Business</h2>
              <p>
                GEO is broader than simply optimising one webpage. AI systems reference information from across your entire digital footprint:
              </p>
              <ScrollReveal>
                <div className="geo-ecosystem">
                  <div className="geo-ecosystem__ring">
                    <div className="geo-ecosystem__node geo-ecosystem__node--active">ChatGPT</div>
                    <div className="geo-ecosystem__node">Google AI / Gemini</div>
                    <div className="geo-ecosystem__node geo-ecosystem__node--active">Perplexity</div>
                  </div>
                  <div className="geo-ecosystem__arrows" aria-hidden="true">
                    <span>↓</span>
                    <span>↓</span>
                    <span>↓</span>
                  </div>
                  <div className="geo-ecosystem__ring">
                    <div className="geo-ecosystem__node">Google Business Profile</div>
                    <div className="geo-ecosystem__node">Website</div>
                    <div className="geo-ecosystem__node">Directories</div>
                  </div>
                  <div className="geo-ecosystem__arrows" aria-hidden="true">
                    <span>↓</span>
                    <span>↓</span>
                  </div>
                  <div className="geo-ecosystem__ring">
                    <div className="geo-ecosystem__node">Social Profiles</div>
                    <div className="geo-ecosystem__node geo-ecosystem__node--active">Third-Party Publications</div>
                  </div>
                  <div className="geo-ecosystem__arrows" aria-hidden="true">
                    <span>↓</span>
                  </div>
                  <div className="geo-ecosystem__center">Business Entity</div>
                </div>
              </ScrollReveal>

              {/* ---- Entity Clarity ---- */}
              <h2 id="entity-clarity">Why Entity Clarity Matters</h2>
              <p>
                AI systems need to understand six core things about your business before they can confidently cite it:
              </p>
              <p>
                <strong>Who you are.</strong> Your business name, brand identity, and entity structure.
              </p>
              <p>
                <strong>What you do.</strong> Your services, specialisms, and areas of expertise.
              </p>
              <p>
                <strong>Where you operate.</strong> Your service locations and geographic coverage.
              </p>
              <p>
                <strong>Who you serve.</strong> Your target market, industry verticals, and client types.
              </p>
              <p>
                <strong>What you are known for.</strong> Your authority signals, mentions, and reputation.
              </p>
              <p>
                <strong>What services you provide.</strong> Your specific offerings, packaged clearly.
              </p>
              <ScrollReveal>
                <div className="geo-entity">
                  <div className="geo-entity__name">Static Savvy Media</div>
                  <div className="geo-entity__type">Digital Marketing Agency</div>
                  <div className="geo-entity__tags">
                    <span className="geo-entity__tag">SEO</span>
                    <span className="geo-entity__tag geo-entity__tag--pink">GEO</span>
                    <span className="geo-entity__tag geo-entity__tag--cyan">AEO</span>
                    <span className="geo-entity__tag">Local SEO</span>
                    <span className="geo-entity__tag geo-entity__tag--pink">AI Search</span>
                    <span className="geo-entity__tag geo-entity__tag--cyan">Tamil Nadu</span>
                    <span className="geo-entity__tag">Malaysia</span>
                  </div>
                </div>
              </ScrollReveal>

              {/* ---- Content Format ---- */}
              <h2 id="content-format">Content AI Engines Can Understand</h2>
              <p>
                The format of your content matters as much as the substance. AI engines extract and cite content that follows these patterns:
              </p>
              <p>
                <strong>Direct answers</strong>, Clear, concise responses to specific questions.
              </p>
              <p>
                <strong>Clear headings</strong>, Structured content that signals topic boundaries.
              </p>
              <p>
                <strong>Question-based sections</strong>, Content organized around real user queries.
              </p>
              <p>
                <strong>Definitions</strong>, Explicit explanations of concepts and terms.
              </p>
              <p>
                <strong>Structured lists</strong>, Numbered and bulleted content for easy extraction.
              </p>
              <p>
                <strong>FAQs</strong>, Question-and-answer format optimized for direct extraction.
              </p>
              <p>
                <strong>Schema markup</strong>, Structured data that explicitly tells AI what your content means.
              </p>
              <ScrollReveal>
                <div className="geo-content-stack">
                  <div className="geo-content-stack__step">
                    <div className="geo-content-stack__number">Q</div>
                    <div className="geo-content-stack__text">Question</div>
                  </div>
                  <div className="geo-content-stack__arrow" aria-hidden="true">↓</div>
                  <div className="geo-content-stack__step">
                    <div className="geo-content-stack__number">A</div>
                    <div className="geo-content-stack__text">Direct Answer</div>
                  </div>
                  <div className="geo-content-stack__arrow" aria-hidden="true">↓</div>
                  <div className="geo-content-stack__step">
                    <div className="geo-content-stack__number">E</div>
                    <div className="geo-content-stack__text">Explanation</div>
                  </div>
                  <div className="geo-content-stack__arrow" aria-hidden="true">↓</div>
                  <div className="geo-content-stack__step">
                    <div className="geo-content-stack__number">V</div>
                    <div className="geo-content-stack__text">Evidence</div>
                  </div>
                  <div className="geo-content-stack__arrow" aria-hidden="true">↓</div>
                  <div className="geo-content-stack__step">
                    <div className="geo-content-stack__number">S</div>
                    <div className="geo-content-stack__text">Structured Data</div>
                  </div>
                </div>
              </ScrollReveal>

              {/* ---- FAQ ---- */}
              <h2 id="faq">Frequently Asked Questions</h2>
              <div className="geo-faq">
                {FAQS.map((faq, index) => (
                  <ScrollReveal key={index}>
                    <div className="geo-faq__item">
                      <details className="geo-faq__details glass-card">
                        <summary className="geo-faq__question">{faq.question}</summary>
                        <p className="geo-faq__answer">{faq.answer}</p>
                      </details>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* ---- Key Takeaways ---- */}
              <h2 id="takeaways">Key Takeaways</h2>
              <div className="geo-summary">
                <ScrollReveal delay={0}>
                  <div className="geo-summary-card">
                    <div className="geo-summary-card__number">1</div>
                    <div className="geo-summary-card__icon" aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    </div>
                    <h3 className="geo-summary-card__title">GET FOUND</h3>
                    <p className="geo-summary-card__text">Traditional SEO gets your business on the search results list.</p>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={80}>
                  <div className="geo-summary-card">
                    <div className="geo-summary-card__number">2</div>
                    <div className="geo-summary-card__icon" aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                    </div>
                    <h3 className="geo-summary-card__title">GET ANSWERED</h3>
                    <p className="geo-summary-card__text">AEO puts your content into AI Overviews, featured snippets and voice answers.</p>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={160}>
                  <div className="geo-summary-card">
                    <div className="geo-summary-card__number">3</div>
                    <div className="geo-summary-card__icon" aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                    </div>
                    <h3 className="geo-summary-card__title">GET CITED</h3>
                    <p className="geo-summary-card__text">GEO gets your business cited directly in AI-generated answers.</p>
                  </div>
                </ScrollReveal>
              </div>

              {/* ---- Author ---- */}
              <div className="geo-author">
                <div className="geo-author__avatar" aria-hidden="true">DK</div>
                <div>
                  <div className="geo-author__name">{AUTHOR}</div>
                  <div className="geo-author__role">{AUTHOR_ROLE}, Static Savvy Media</div>
                  <div className="geo-author__date">Published: [DATE] &middot; Updated: [DATE]</div>
                </div>
              </div>

            </div>

            {/* ---- Sticky TOC ---- */}
            <aside className="geo-toc" aria-label="Table of Contents">
              <div className="geo-toc__title">Table of Contents</div>
              <ul className="geo-toc__list">
                {TOC_ITEMS.map((item) => (
                  <li key={item.id} className="geo-toc__item">
                    <a href={`#${item.id}`} className="geo-toc__link">{item.label}</a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* ============================================================
          RELATED ARTICLES
          ============================================================ */}
      <section className="section">
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: 'var(--fs-h2)', fontWeight: 800, marginBottom: '2rem' }}>
            Related Articles
          </h2>
          <div className="geo-related">
            {RELATED_ARTICLES.map((article, index) => (
              <ScrollReveal key={article.slug} delay={index * 80}>
                <Link to={article.slug} style={{ textDecoration: 'none', display: 'flex' }}>
                  <div className="geo-related-card">
                    <span className={`geo-related-card__category ${article.categoryClass}`}>{article.category}</span>
                    <h3 className="geo-related-card__title">{article.title}</h3>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          GEO & AEO BY LOCATION
          ============================================================ */}
      <section className="section geo-location-cta">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Locations</span>
              <h2 className="section-heading__title">GEO & AEO Services by Location</h2>
              <p className="section-heading__subtitle">
                Looking for GEO & AEO services specifically for your local market?
                Explore our Madurai-focused AI Search Optimization services.
              </p>
            </div>
          </ScrollReveal>
          <div className="geo-location-cta__grid">
            <ScrollReveal>
              <div className="geo-location-cta__card glass-card">
                <span className="geo-location-cta__badge">Madurai</span>
                <h3 className="geo-location-cta__title">GEO & AEO Services in Madurai</h3>
                <p className="geo-location-cta__text">
                  Explore our Madurai-focused GEO & AEO strategy designed to help local
                  businesses improve their visibility across Google AI Overviews, ChatGPT,
                  Perplexity and other AI-powered search experiences.
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

      {/* ============================================================
          FINAL CTA
          ============================================================ */}
      <RelatedReading links={[['/services/geo-aeo-ai-search/', 'GEO & AEO services for AI search'], ['/services/geo-aeo-ai-search/madurai/', 'GEO & AEO in Madurai'], ['/blog/what-is-answer-engine-optimization/', 'What is answer engine optimisation (AEO)?'], ['/blog/agentic-ai-tools-small-business-marketing/', 'Top agentic AI tools for small business marketing'], ['/blog/seo-agency-madurai-complete-guide/', 'Hiring for SEO in Madurai: buyer’s checklist'], ['/contact/', 'Get a custom quote']]} />

      <CTASection
        eyebrow="Get Started"
        title="Be the first business in your category to be cited by AI search."
        subtitle="Ask us for a free check of how AI tools describe your business today. Message us on WhatsApp."
        primaryLabel="Start Your GEO/AEO Strategy"
        primaryHref={whatsappHref}
      />
    </div>
  )
}
