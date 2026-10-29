import RelatedReading from '../../components/blog/RelatedReading.jsx'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import BlogFeaturedImage from '../../components/blog/BlogFeaturedImage.jsx'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import { blogPostingSchema, faqPageSchema, breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL } from '../../utils/constants.js'

/* ============================================================
   CONTENT, Approved Static Savvy Media AEO Article
   ============================================================ */

const PAGE_TITLE = 'What Is Answer Engine Optimization (AEO)? How to Get Your Business into AI Answers'

const SEO_TITLE = 'Answer Engine Optimization (AEO): What It Is and How to Do It'

const PAGE_DESCRIPTION =
  'Answer engine optimization (AEO, or optimisation) gets your business cited in Google AI Overviews, ChatGPT and voice answers. Steps, examples and a checklist.'

const UPDATED = '29 October 2026'

const AUTHOR = 'Deepan Kanz'
const AUTHOR_ROLE = 'Founder & AI Search Specialist'
const READING_TIME = 'Approx. 9–12 min'

const INTRODUCTION =
  'When someone searches a question on Google and the AI Overview box appears at the top citing a specific source, that is AEO (Answer Engine Optimization) at work. The business whose content was extracted and cited did not necessarily rank #1 in the blue links. They had content that Google’s AI could extract as a clean, direct answer to the query. This guide explains exactly how that happens and how to make it happen for your business.'

/* Answer-first summary shown right under the hero (AI- and snippet-friendly). */
const QUICK_ANSWER = 'Answer engine optimization (AEO), also spelled answer engine optimisation, is the practice of structuring your content so that answer engines, such as Google AI Overviews, featured snippets, voice assistants, ChatGPT and Perplexity, can find it, trust it and quote it as the direct answer to a question, ideally naming and linking your business.'

const AEO_OUTCOMES = [
  { title: 'Retrieved', text: 'Your page is crawlable, indexed and relevant enough to be pulled in when an answer engine looks for sources.' },
  { title: 'Trusted', text: 'Clear facts, real expertise and consistent business details make your page a safe source to quote.' },
  { title: 'Cited', text: 'The answer uses your wording, names your brand and, where the engine shows sources, links to your page.' },
]

/* Before/after rewrite showing the answer-first pattern on a typical service page. */
const AEO_EXAMPLE = {
  question: 'How much does a website cost for a small business?',
  before: 'We are a passionate team of designers who have built many beautiful websites. Every project is unique and we love working with clients, so please contact us to discuss your requirements and we will be happy to help.',
  after: 'A small business website usually costs a one-time fee that depends on the number of pages, features such as booking or e-commerce, and who writes the content. Our Starter plan covers a simple brochure site; larger or custom builds are quoted after a short call. Below: what each type of site includes and what adds cost.',
}

const MEASURE_STEPS = [
  { number: '01', title: 'Track question queries in Search Console', text: 'Filter Google Search Console queries containing what, how, why, cost, best and near me. Rising impressions on question queries show your answer-first sections are being picked up.' },
  { number: '02', title: 'Run the same prompts every month', text: 'Ask Google (AI Overview), ChatGPT, Perplexity and Gemini the 10 to 20 questions your customers ask. Record whether your brand is named, described correctly and linked.' },
  { number: '03', title: 'Check featured snippets and People Also Ask', text: 'Note which of your target questions show a featured snippet or People Also Ask box, and whose page is used. These are the easiest AEO wins to measure.' },
  { number: '04', title: 'Watch branded search and enquiries', text: 'Being cited in answers tends to show up later as more branded searches, direct visits, calls and WhatsApp enquiries. Track them in Analytics and your Google Business Profile.' },
]

const AEO_TARGETS = [
  'Google AI Overviews',
  'Google Featured Snippets',
  'Voice Search',
  'Google Assistant / Siri / Alexa',
  'Perplexity',
  'ChatGPT citations',
]

const CORE_ELEMENTS = [
  {
    number: '01',
    title: 'Direct Answers',
    text: 'Start important sections with concise answers. Answer the question first, then provide supporting detail. This gives answer engines a clean extractable response.',
    example: { q: 'What is AEO?', a: 'AEO is the practice of structuring content so answer engines can extract and present it as a direct response to user queries.' },
  },
  {
    number: '02',
    title: 'Question-Based Content',
    text: 'Modern search queries often appear as What, Why, How, When, Where, Which, and Who questions. Build content around real questions users ask in your industry.',
  },
  {
    number: '03',
    title: 'FAQ Structure',
    text: 'FAQ sections help organise common questions and answers. Use FAQ schema only where appropriate and supported by current search guidelines. Do not imply that FAQ schema guarantees rich results.',
  },
  {
    number: '04',
    title: 'Structured Data / Schema',
    text: 'Use relevant schema such as Article/BlogPosting, Organization, LocalBusiness, BreadcrumbList, and FAQPage where appropriate. Schema helps machines understand content but does not guarantee rankings.',
  },
  {
    number: '05',
    title: 'Entity Clarity',
    text: 'Clearly communicate who you are, what you do, where you operate, who you serve, and what you specialize in. Use consistent business name, location, services, and organization information across all platforms.',
  },
  {
    number: '06',
    title: 'Content Depth',
    text: 'Direct answers need supporting context. Use definitions, examples, steps, comparisons, FAQs, supporting evidence, and relevant internal links. Avoid thin one-paragraph answers.',
  },
]

const IMPLEMENTATION_STEPS = [
  { number: '01', title: 'Identify Real Questions', text: 'Gather questions from search queries, Google Search Console, sales conversations, customer support, FAQs, Google autocomplete, related searches, and industry questions.' },
  { number: '02', title: 'Create Answer-First Sections', text: 'Put the direct answer near the beginning of each section, then expand with supporting detail and context.' },
  { number: '03', title: 'Use Clear Heading Hierarchy', text: 'Use H2 and H3 tags with question-based headings, short paragraphs, bullets, and tables where useful.' },
  { number: '04', title: 'Add Relevant Schema', text: 'Use structured data that accurately represents the visible page content. Never add schema for content that does not exist on the page.' },
  { number: '05', title: 'Strengthen Internal Linking', text: 'Link related services, location pages, blog posts, FAQs, and guides to build topical connections.' },
  { number: '06', title: 'Improve Technical Accessibility', text: 'Ensure crawlability, indexation, mobile usability, page performance, clean HTML structure, and accessible content.' },
  { number: '07', title: 'Build Authority and Entity Signals', text: 'Connect the business consistently across your website, business profiles, directories, social profiles, industry references, and other credible sources.' },
  { number: '08', title: 'Monitor Performance', text: 'Track search impressions, clicks, CTR, featured snippet visibility where measurable, AI Overview visibility where available, branded searches, and organic conversions.' },
]

const COMPARISON_DATA = [
  { dimension: 'Primary Focus', seo: 'Traditional search visibility, ranking web pages, organic traffic', aeo: 'Direct answers, featured snippets, AI answer extraction, voice search', geo: 'Generative AI discovery, AI-generated responses, entity visibility, AI citations' },
  { dimension: 'Target Surface', seo: 'Google organic results', aeo: 'AI Overviews, featured snippets, voice answers', geo: 'ChatGPT, Perplexity, Google AI, generative responses' },
  { dimension: 'Content Approach', seo: 'Keyword-optimised pages', aeo: 'Answer-first, question-based, structured content', geo: 'Entity-rich, authoritative, cross-platform presence' },
]

const LOCAL_BUSINESSES = ['Restaurants', 'Clinics', 'Hotels', 'Real estate', 'Educational institutions', 'Professional services', 'Local retailers']

const MISTAKES = [
  { number: '01', title: 'Writing for keywords instead of questions', text: 'Content should address real user questions, not just target keyword strings.' },
  { number: '02', title: 'Creating generic AI-generated content without human review', text: 'AI-generated content needs human oversight for accuracy, voice, and quality.' },
  { number: '03', title: 'Adding FAQ schema without useful visible FAQ content', text: 'Schema should match visible content. Hidden-only FAQ content violates guidelines.' },
  { number: '04', title: 'Making answers too vague', text: 'Vague answers give answer engines nothing clean to extract. Be specific and direct.' },
  { number: '05', title: 'Creating extremely short content without context', text: 'Thin content lacks the depth answer engines need to understand topical authority.' },
  { number: '06', title: 'Ignoring technical SEO', text: 'If search engines cannot crawl and index your content, AEO optimisation is wasted.' },
  { number: '07', title: 'Ignoring entity consistency', text: 'Inconsistent business information across platforms confuses answer engines.' },
  { number: '08', title: 'Making unsupported claims', text: 'Unverifiable claims reduce credibility with both users and answer engines.' },
  { number: '09', title: 'Expecting immediate AI citations', text: 'AEO is cumulative. Results build over time as authority and content depth grow.' },
  { number: '10', title: 'Treating AEO as a replacement for SEO', text: 'AEO complements SEO. A strong strategy combines both for modern search visibility.' },
]

const CHECKLIST = [
  'Real customer questions identified',
  'Direct answers included',
  'Clear H2/H3 structure',
  'Short readable paragraphs',
  'Relevant schema implemented',
  'Visible FAQ content where appropriate',
  'Strong internal linking',
  'Technical SEO healthy',
  'Entity information consistent',
  'Local information accurate where relevant',
  'Author / expertise signals present',
  'Content reviewed by humans',
  'Supporting evidence included',
  'Performance monitored',
]

const FAQS = [
  {
    question: 'What is Answer Engine Optimization (AEO)?',
    answer: 'AEO is the practice of structuring website content so AI-powered answer engines can understand, extract, and potentially present it as a direct answer to user queries.',
  },
  {
    question: 'Is AEO the same as SEO?',
    answer: 'No. AEO and SEO overlap but have different emphasis. SEO focuses on search visibility and rankings. AEO focuses on structuring information for direct answers, featured snippets, voice search, and AI answer systems.',
  },
  {
    question: 'How do I optimise my website for AEO?',
    answer: 'Start by identifying real customer questions, creating concise answer-first content, using clear heading structure, implementing relevant structured data, improving technical SEO, strengthening internal links, and monitoring search performance.',
  },
  {
    question: 'Does FAQ schema guarantee Google AI Overview visibility?',
    answer: 'No. Schema helps search engines understand content but does not guarantee rankings, featured snippets, AI Overview visibility, or citations.',
  },
  {
    question: 'Does AEO replace SEO?',
    answer: 'No. AEO should complement SEO. A strong modern search strategy can combine SEO, AEO, GEO, technical SEO, content strategy, and entity building.',
  },
  {
    question: 'What is an answer engine?',
    answer: 'An answer engine is a search or AI system that replies with a written answer instead of only a list of links. Examples include Google AI Overviews and featured snippets, voice assistants, ChatGPT, Perplexity and Gemini.',
  },
  {
    question: 'What is the difference between AEO and GEO?',
    answer: 'AEO focuses on winning the answer to specific questions, in featured snippets, AI Overviews, voice and AI chat. GEO (generative engine optimization) is broader: it works on how generative AI systems understand and describe your brand overall, through entity clarity, consistent business facts and mentions on other credible sites.',
  },
  {
    question: 'Is it answer engine optimization or optimisation?',
    answer: 'Both are correct. Optimization is the US spelling and optimisation is the UK, Indian and Malaysian spelling. They describe the same practice.',
  },
  {
    question: 'How long does AEO take to show results?',
    answer: 'Featured snippet and People Also Ask changes can appear within weeks of Google recrawling an improved page. Being named consistently in AI answers usually takes months, because it also depends on your overall authority and mentions elsewhere. Nobody can guarantee a citation.',
  },
  {
    question: 'How do I measure AEO?',
    answer: 'Track impressions for question queries in Google Search Console, run the same customer questions in Google AI Overviews, ChatGPT and Perplexity each month and record whether your brand is named and linked, and watch branded searches and enquiries over time.',
  },
  {
    question: 'How much does AEO cost with Static Savvy Media?',
    answer: 'AEO and GEO are included in our top monthly plan, together with Google Business Profile management and website SEO, with no lock-in. We quote it after a free review of your site: WhatsApp +91 99440 40345 (India) or +60 12-453 7030 (Malaysia), or send an enquiry.',
  },
]

const TOC_ITEMS = [
  { id: 'quick-answer', label: 'AEO in One Paragraph' },
  { id: 'what-is-aeo', label: 'What Is AEO?' },
  { id: 'aeo-seo', label: 'Why AEO Is Inseparable from SEO' },
  { id: 'how-aeo-works', label: 'How AEO Works' },
  { id: 'core-elements', label: 'Core Elements of AEO' },
  { id: 'how-to-optimise', label: 'How to Optimise for AEO' },
  { id: 'aeo-vs-seo-geo', label: 'AEO vs SEO vs GEO' },
  { id: 'local-businesses', label: 'AEO for Local Businesses' },
  { id: 'service-businesses', label: 'AEO for Service Businesses' },
  { id: 'voice-search', label: 'AEO and Voice Search' },
  { id: 'ai-overviews', label: 'AEO and Google AI Overviews' },
  { id: 'chatgpt-perplexity', label: 'AEO and ChatGPT / Perplexity' },
  { id: 'aeo-example', label: 'AEO Example: Before and After' },
  { id: 'measure-aeo', label: 'How to Measure AEO' },
  { id: 'common-mistakes', label: 'Common AEO Mistakes' },
  { id: 'content-template', label: 'Practical AEO Template' },
  { id: 'aeo-checklist', label: 'AEO Checklist' },
  { id: 'aeo-2026', label: 'What AEO Means for Businesses' },
  { id: 'faq', label: 'FAQs' },
]

/* ============================================================
   COMPONENT
   ============================================================ */

export default function WhatIsAEO() {
  const jsonLdRef = useRef([])
  const progressRef = useRef(null)

  useEffect(() => {
    setSeo({
      title: SEO_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/blog/what-is-answer-engine-optimization/`,
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
      url: `${SITE_URL}/blog/what-is-answer-engine-optimization/`,
      datePublished: '2026-08-01',
      dateModified: '2026-10-29',
      mainEntityOfPage: `${SITE_URL}/blog/what-is-answer-engine-optimization/`,
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Blog', item: `${SITE_URL}/blog/` },
        { name: 'What Is AEO', item: `${SITE_URL}/blog/what-is-answer-engine-optimization/` },
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
      <div className="aeo-progress" aria-hidden="true">
        <div className="aeo-progress__bar" ref={progressRef} />
      </div>

      <Breadcrumbs />

      {/* HERO */}
      <section className="section">
        <div className="container">
          <div className="aeo-hero">
            <div className="aeo-hero__content">
              <span className="aeo-hero__badge">AEO GUIDE</span>
              <h1 className="hero__title">
                What Is Answer Engine Optimization (AEO)?{' '}
                <span className="text-gradient">How to Get Your Business into AI Answers</span>
              </h1>
              <div className="aeo-hero__meta">
                <span className="aeo-hero__meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  {AUTHOR}
                </span>
                <span className="aeo-hero__meta-item">Static Savvy Media</span>
                <span className="aeo-hero__meta-item">{READING_TIME}</span>
                <span className="aeo-hero__meta-item">Updated {UPDATED}</span>
              </div>
              <p className="aeo-hero__intro">{INTRODUCTION}</p>
            </div>
            <div className="aeo-hero__visual">
              <div className="aeo-hero__visual-card">
                <div className="aeo-hero__visual-label">AEO Flow</div>
                <div className="aeo-hero__visual-flow">
                  <div className="aeo-hero__visual-step aeo-hero__visual-step--q">User Question</div>
                  <div className="aeo-hero__visual-arrow" aria-hidden="true">↓</div>
                  <div className="aeo-hero__visual-step aeo-hero__visual-step--ai">Answer Engine</div>
                  <div className="aeo-hero__visual-arrow" aria-hidden="true">↓</div>
                  <div className="aeo-hero__visual-step aeo-hero__visual-step--extract">Content Extraction</div>
                  <div className="aeo-hero__visual-arrow" aria-hidden="true">↓</div>
                  <div className="aeo-hero__visual-step aeo-hero__visual-step--cite">Citation / Answer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BlogFeaturedImage slug="what-is-answer-engine-optimization" />

      {/* ARTICLE + TOC */}
      <section className="section section--alt">
        <div className="container">
          <div className="aeo-article">
            <div className="aeo-article__body">

              {/* 00 Quick answer */}
              <h2 id="quick-answer">Answer Engine Optimization in One Paragraph</h2>
              <div className="aeo-template aeo-quick">
                <p className="aeo-quick__answer">{QUICK_ANSWER}</p>
                <div className="aeo-quick__outcomes">
                  {AEO_OUTCOMES.map((o, i) => (
                    <div key={o.title} className="aeo-quick__outcome">
                      <span className="aeo-quick__step">{i + 1}</span>
                      <h3 className="aeo-quick__title">{o.title}</h3>
                      <p className="aeo-quick__text">{o.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 01 What Is AEO */}
              <h2 id="what-is-aeo">What Is AEO (Answer Engine Optimization)?</h2>
              <p>Answer Engine Optimization is the practice of structuring your website content, its format, schema markup, and writing style, so that AI-powered answer engines can extract your content and present it as a direct answer to user queries.</p>
              <p>The primary AEO targets in 2026 include:</p>
              <div className="aeo-tag-list">{AEO_TARGETS.map((t) => <span key={t} className="aeo-tag">{t}</span>)}</div>
              <p>AEO is not simply &ldquo;adding FAQs&rdquo;. It is about structuring information so answer systems can understand, extract, summarise, and potentially cite it. The goal is to make your content the cleanest, most direct answer to the questions your audience asks.</p>

              {/* 02 Why AEO Is Inseparable from SEO */}
              <h2 id="aeo-seo">Why AEO Is Now Inseparable from SEO</h2>
              <p>Google&rsquo;s shift to AI-first search has restructured the results page. The transition from traditional blue links to AI-assisted direct answers has fundamentally changed how businesses get discovered.</p>
              <ScrollReveal>
                <div className="aeo-flow">
                  <div className="aeo-flow__title">Search Evolution</div>
                  {['Traditional Search', 'Blue Links', 'AI-Assisted Search', 'Direct Answers / AI Overviews'].map((step, i) => (
                    <div key={step} className="aeo-flow__item">
                      <div className={`aeo-flow__step ${i === 3 ? 'aeo-flow__step--highlight' : ''}`}>{step}</div>
                      {i < 3 && <div className="aeo-flow__arrow" aria-hidden="true">↓</div>}
                    </div>
                  ))}
                </div>
              </ScrollReveal>
              <p>Before AI Overviews, top organic results could receive significant click-through rates. With AI Overviews, some informational and research queries can be answered directly within the search experience. Two outcomes are possible: your content becomes a cited source, or your page remains a blue-link result below the AI-generated answer.</p>

              {/* 03 How AEO Works */}
              <h2 id="how-aeo-works">How AEO Works</h2>
              <ScrollReveal>
                <div className="aeo-flow">
                  <div className="aeo-flow__title">AEO Process</div>
                  {['User Question', 'Answer Engine', 'Content Understanding', 'Answer Extraction', 'Source / Citation'].map((step, i) => (
                    <div key={step} className="aeo-flow__item">
                      <div className={`aeo-flow__step ${i === 4 ? 'aeo-flow__step--highlight' : ''}`}>{step}</div>
                      {i < 4 && <div className="aeo-flow__arrow" aria-hidden="true">↓</div>}
                    </div>
                  ))}
                </div>
              </ScrollReveal>
              <p>Answer engines need content that is clear, direct, well structured, semantically understandable, supported by relevant context, and technically accessible. AEO involves both content structure and technical structure working together.</p>

              {/* 04 Core Elements */}
              <h2 id="core-elements">The Core Elements of AEO</h2>
              <div className="aeo-elements">
                {CORE_ELEMENTS.map((el) => (
                  <ScrollReveal key={el.number}>
                    <div className="aeo-element-card">
                      <div className="aeo-element-card__number">{el.number}</div>
                      <h3 className="aeo-element-card__title">{el.title}</h3>
                      <p className="aeo-element-card__text">{el.text}</p>
                      {el.example && (
                        <div className="aeo-element-card__example">
                          <div className="aeo-element-card__example-q"><strong>Q:</strong> {el.example.q}</div>
                          <div className="aeo-element-card__example-a"><strong>A:</strong> {el.example.a}</div>
                        </div>
                      )}
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* 05 How to Optimise */}
              <h2 id="how-to-optimise">How to Optimise a Website for AEO</h2>
              <div className="aeo-steps">
                {IMPLEMENTATION_STEPS.map((step) => (
                  <ScrollReveal key={step.number}>
                    <div className="aeo-step">
                      <div className="aeo-step__number">{step.number}</div>
                      <div className="aeo-step__content">
                        <h3 className="aeo-step__title">{step.title}</h3>
                        <p className="aeo-step__text">{step.text}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* 06 AEO vs SEO vs GEO */}
              <h2 id="aeo-vs-seo-geo">AEO vs SEO vs GEO</h2>
              <p>SEO, AEO, and GEO are complementary disciplines that together form modern search visibility.</p>
              <ScrollReveal>
                <div className="aeo-comparison">
                  <div className="aeo-comparison__header">
                    <div className="aeo-comparison__cell">Dimension</div>
                    <div className="aeo-comparison__cell aeo-comparison__cell--seo">SEO</div>
                    <div className="aeo-comparison__cell aeo-comparison__cell--aeo">AEO</div>
                    <div className="aeo-comparison__cell aeo-comparison__cell--geo">GEO</div>
                  </div>
                  {COMPARISON_DATA.map((row) => (
                    <div key={row.dimension} className="aeo-comparison__row">
                      <div className="aeo-comparison__cell aeo-comparison__cell--dim" data-label="Dimension">{row.dimension}</div>
                      <div className="aeo-comparison__cell" data-label="SEO">{row.seo}</div>
                      <div className="aeo-comparison__cell" data-label="AEO">{row.aeo}</div>
                      <div className="aeo-comparison__cell" data-label="GEO">{row.geo}</div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <div className="aeo-takeaway">
                  <div className="aeo-takeaway__line">SEO + AEO + GEO</div>
                  <div className="aeo-takeaway__arrow" aria-hidden="true">↓</div>
                  <div className="aeo-takeaway__result">Modern Search Visibility</div>
                </div>
              </ScrollReveal>

              {/* 07 Local Businesses */}
              <h2 id="local-businesses">AEO for Local Businesses</h2>
              <p>Local businesses can use AEO to structure content around questions potential customers ask. Whether you run a restaurant, clinic, hotel, real estate business, educational institution, professional service, or local retail store, the principle is the same.</p>
              <div className="aeo-tag-list">{LOCAL_BUSINESSES.map((b) => <span key={b} className="aeo-tag aeo-tag--cyan">{b}</span>)}</div>
              <p>Instead of manipulating &ldquo;best&rdquo; claims, create useful content around your services, location, specialisation, experience, FAQs, business information, and customer needs. Include local entity signals: business name, address, phone, service area, opening hours, Google Business Profile, and LocalBusiness schema where appropriate.</p>

              {/* 08 Service Businesses */}
              <h2 id="service-businesses">AEO for Service Businesses</h2>
              <p>Service businesses can structure pages around questions such as: How much does SEO cost? How long does SEO take? What does SEO include? What is GEO? What is AEO? How can I improve my Google visibility? What should I ask an SEO agency?</p>
              <p>Use the question → direct answer → detailed explanation structure for each topic. This format gives answer engines a clean extract while providing the depth needed for topical authority.</p>

              {/* 09 Voice Search */}
              <h2 id="voice-search">AEO and Voice Search</h2>
              <p>Voice assistants often require concise answers. AEO can support voice-search-oriented content by improving clarity and structure. Focus on conversational queries, long-tail questions, natural language, local questions, FAQ content, and concise answers.</p>
              <p>Voice search queries tend to be longer and more conversational than typed queries. Structuring content around natural questions helps both traditional and voice search visibility.</p>

              {/* 10 AI Overviews */}
              <h2 id="ai-overviews">AEO and Google AI Overviews</h2>
              <p>Google AI Overviews can synthesise information from multiple sources. Being visible in an AI Overview is not the same thing as simply ranking #1 in traditional organic search. Useful content should provide clear answers, strong topical context, reliable information, structured content, technical accessibility, and entity clarity.</p>
              <p>Never promise that implementation guarantees AI Overview inclusion. Focus on creating genuinely useful, well-structured content that serves users first.</p>

              {/* 11 ChatGPT / Perplexity */}
              <h2 id="chatgpt-perplexity">AEO and ChatGPT / Perplexity</h2>
              <p>AI assistants and answer engines can use web information and other sources to generate responses, depending on the product, query, browsing state, and available sources.</p>
              <p>The role of clear entity information, consistent business information, useful content, authoritative references, structured answers, and topical expertise all contribute to how your business information appears across AI-driven discovery systems. These practices can improve the clarity and discoverability of your information.</p>

              {/* 11b Example */}
              <h2 id="aeo-example">AEO Example: Rewriting a Section Answer-First</h2>
              <p>The quickest AEO win is usually rewriting the opening of a section so the first two sentences answer the question directly. Here is the same section before and after, for the question &ldquo;{AEO_EXAMPLE.question}&rdquo;</p>
              <div className="aeo-example">
                <div className="aeo-example__card aeo-example__card--before">
                  <span className="aeo-example__label">Before: hard to quote</span>
                  <p>{AEO_EXAMPLE.before}</p>
                </div>
                <div className="aeo-example__card aeo-example__card--after">
                  <span className="aeo-example__label">After: answer-first</span>
                  <p>{AEO_EXAMPLE.after}</p>
                </div>
              </div>
              <p>The &ldquo;after&rdquo; version answers in the first sentence, names what changes the price and promises the detail that follows. An answer engine can lift that first sentence as a complete answer, and a visitor knows straight away they are in the right place. Pair it with a matching FAQ and accurate schema, as on our <Link to="/blog/affordable-seo-company-madurai-pricing/">SEO pricing guide for Madurai</Link>.</p>

              {/* 11c Measure */}
              <h2 id="measure-aeo">How to Measure AEO</h2>
              <p>There is no single &ldquo;AEO ranking&rdquo; report, so measure the signals you can see. This is the routine we use for our own site and for clients:</p>
              <div className="aeo-steps">
                {MEASURE_STEPS.map((step) => (
                  <div key={step.number} className="aeo-step">
                    <div className="aeo-step__number">{step.number}</div>
                    <div className="aeo-step__content">
                      <h3 className="aeo-step__title">{step.title}</h3>
                      <p className="aeo-step__text">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p>Want this done for you? AEO and GEO are part of our <Link to="/services/geo-aeo-ai-search/">GEO and AEO (AI search optimisation) service</Link>, available in India from our Madurai head office and in Malaysia from our Rawang office.</p>

              {/* 12 Common Mistakes */}
              <h2 id="common-mistakes">Common AEO Mistakes</h2>
              <div className="aeo-mistakes">
                {MISTAKES.map((m) => (
                  <ScrollReveal key={m.number}>
                    <div className="aeo-mistake-card">
                      <div className="aeo-mistake-card__warning" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                      </div>
                      <div className="aeo-mistake-card__number">{m.number}</div>
                      <h3 className="aeo-mistake-card__title">{m.title}</h3>
                      <p className="aeo-mistake-card__text">{m.text}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* 13 Content Template */}
              <h2 id="content-template">A Practical AEO Content Template</h2>
              <p>Use this reusable format for service pages, blog posts, location pages, FAQ pages, product pages, and industry pages.</p>
              <ScrollReveal>
                <div className="aeo-template">
                  <div className="aeo-template__row"><span className="aeo-template__label">QUESTION:</span> <span className="aeo-template__value">What is [topic]?</span></div>
                  <div className="aeo-template__row"><span className="aeo-template__label">DIRECT ANSWER:</span> <span className="aeo-template__value">[One or two concise sentences answering the question]</span></div>
                  <div className="aeo-template__row"><span className="aeo-template__label">DETAILED EXPLANATION:</span> <span className="aeo-template__value">[Context and supporting detail]</span></div>
                  <div className="aeo-template__row"><span className="aeo-template__label">KEY POINTS:</span> <span className="aeo-template__value">Point 1 / Point 2 / Point 3</span></div>
                  <div className="aeo-template__row"><span className="aeo-template__label">EXAMPLE:</span> <span className="aeo-template__value">[Practical example]</span></div>
                  <div className="aeo-template__row"><span className="aeo-template__label">FAQ:</span> <span className="aeo-template__value">[Related question]</span></div>
                  <div className="aeo-template__row"><span className="aeo-template__label">NEXT STEP:</span> <span className="aeo-template__value">[Relevant internal link / CTA]</span></div>
                </div>
              </ScrollReveal>

              {/* 14 Checklist */}
              <h2 id="aeo-checklist">AEO Checklist</h2>
              <div className="aeo-checklist">
                {CHECKLIST.map((item, i) => (
                  <ScrollReveal key={item} delay={i * 25}>
                    <div className="aeo-checklist__item">
                      <div className="aeo-checklist__check" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                      <span className="aeo-checklist__text">{item}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* 15 What AEO Means */}
              <h2 id="aeo-2026">What Does AEO Mean for Businesses in 2026?</h2>
              <p>Search behaviour is moving toward questions, answers, AI summaries, voice interfaces, conversational search, and generative discovery. Businesses should optimise not only for &ldquo;Where do I rank?&rdquo; but also: Can an answer engine understand what my business does? Can it identify our expertise? Can it extract a useful answer from our content? Is our business information consistent? Do credible sources support our entity?</p>

              {/* FAQ */}
              <h2 id="faq">Frequently Asked Questions About AEO</h2>
              <div className="aeo-faq">
                {FAQS.map((faq, i) => (
                  <ScrollReveal key={i}>
                    <div className="aeo-faq__item">
                      <details className="aeo-faq__details glass-card">
                        <summary className="aeo-faq__question">{faq.question}</summary>
                        <p className="aeo-faq__answer">{faq.answer}</p>
                      </details>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Author */}
              <div className="aeo-author">
                <div className="aeo-author__avatar" aria-hidden="true">DK</div>
                <div>
                  <div className="aeo-author__name">{AUTHOR}</div>
                  <div className="aeo-author__role">{AUTHOR_ROLE}, Static Savvy Media</div>
                  <Link to="/about/deepan-kanz/" className="aeo-author__link">View Full Profile →</Link>
                </div>
              </div>

            </div>

            {/* Sticky TOC */}
            <aside className="aeo-toc" aria-label="Table of Contents">
              <div className="aeo-toc__title">Table of Contents</div>
              <ul className="aeo-toc__list">
                {TOC_ITEMS.map((item) => (
                  <li key={item.id} className="aeo-toc__item">
                    <a href={`#${item.id}`} className="aeo-toc__link">{item.label}</a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <RelatedReading links={[['/services/geo-aeo-ai-search/', 'GEO & AEO services for AI search'], ['/services/geo-aeo-ai-search/madurai/', 'GEO & AEO in Madurai'], ['/blog/what-is-generative-engine-optimization/', 'What is generative engine optimisation (GEO)?'], ['/services/seo/madurai/', 'SEO services in Madurai'], ['/blog/affordable-seo-company-madurai-pricing/', 'SEO prices in Madurai (incl. AEO + GEO plan)']]} />

      <CTASection
        eyebrow="AEO Strategy"
        title="Ready to Build Your AEO Strategy?"
        subtitle="Make your content easier for search engines, answer engines and AI-driven discovery systems to understand."
        primaryLabel="WhatsApp for AEO Consultation"
        primaryHref={whatsappHref}
      />
    </div>
  )
}
