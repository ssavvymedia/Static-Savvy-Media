import RelatedReading from '../../components/blog/RelatedReading.jsx'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import { blogPostingSchema, faqPageSchema, breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL } from '../../utils/constants.js'

/* ============================================================
   CONTENT, Approved Static Savvy Media SEO Agency Guide
   ============================================================ */

const PAGE_TITLE = 'How to Choose an SEO Agency in Madurai, Complete 2026 Guide'

const PAGE_DESCRIPTION =
  'Learn how to choose an SEO agency in Madurai, what a good agency should deliver, red flags to avoid, what SEO costs, what questions to ask, and why GEO & AEO matter in 2026.'

const AUTHOR = 'Deepan Kanz'
const AUTHOR_ROLE = 'Founder & AI Search Specialist'
const READING_TIME = 'Approx. 8–10 min read'

const INTRODUCTION =
  'The Madurai digital marketing landscape has changed dramatically. There are more agencies, more SEO claims, more packages, and more confusion. This guide helps businesses understand what a capable SEO agency should actually deliver, what warning signs to look for, what questions to ask, and how SEO is changing with GEO and AEO.'

const DELIVER_CARDS = [
  {
    number: '01',
    title: 'Technical SEO Audit',
    items: ['Crawl analysis', 'Indexation', 'Site architecture', 'Canonical issues', 'Broken links', 'Page speed', 'Core Web Vitals', 'Mobile usability', 'Structured data / schema'],
    text: 'Technical health is foundational. Without a technically sound website, content and link-building efforts are built on unstable ground.',
  },
  {
    number: '02',
    title: 'Keyword Research & Search Intent',
    items: ['Keyword discovery', 'Commercial intent', 'Informational intent', 'Local intent', 'Long-tail keywords', 'Competitor analysis'],
    text: 'Keyword selection should connect to actual business goals. Targeting the wrong keywords wastes budget and creates frustration.',
  },
  {
    number: '03',
    title: 'Google Search Console Setup & Monitoring',
    items: ['GSC setup', 'Search queries', 'Impressions', 'Clicks', 'CTR', 'Average position', 'Indexing issues', 'Search performance'],
    text: 'Real data from Google Search Console matters more than vanity reporting. GSC shows exactly how your site performs in actual search results.',
  },
  {
    number: '04',
    title: 'On-Page SEO',
    items: ['Title tags', 'Meta descriptions', 'H1/H2 structure', 'Internal linking', 'Content optimisation', 'Image alt text', 'Schema where relevant'],
    text: 'On-page optimisation ensures every page communicates clearly to both search engines and human visitors.',
  },
  {
    number: '05',
    title: 'Content Strategy',
    items: ['Search-intent-led content', 'Service pages', 'Location pages', 'Industry pages', 'FAQs', 'Educational content', 'Commercial content'],
    text: 'Content should address real search queries, demonstrate expertise, and guide visitors toward business actions.',
  },
  {
    number: '06',
    title: 'Monthly Reporting',
    items: ['Organic traffic', 'Search visibility', 'Keyword movement', 'Conversions / enquiries', 'Technical improvements', 'Content published', 'Next priorities'],
    text: 'SEO reporting should explain what changed, why it changed, and what happens next.',
  },
]

const RED_FLAGS = [
  {
    number: '01',
    title: 'Guaranteed #1 Rankings',
    text: 'No legitimate SEO agency can guarantee a specific Google ranking for every keyword. Search algorithms change constantly and competition varies.',
  },
  {
    number: '02',
    title: 'No Reporting',
    text: 'If an agency cannot show meaningful reporting, the client cannot evaluate performance. Reporting should include traffic, visibility, and business-relevant metrics.',
  },
  {
    number: '03',
    title: 'No Schema Knowledge',
    text: 'Structured data and modern technical SEO knowledge are essential. An agency unfamiliar with schema markup may not understand current best practices.',
  },
  {
    number: '04',
    title: 'Wix-Based / Poorly Optimised Websites',
    text: 'The platform itself is not the only issue; the concern is whether the agency can properly control technical SEO, performance, structured data, architecture, and scalability.',
  },
  {
    number: '05',
    title: 'No Local Examples',
    text: 'An agency serving Madurai businesses should be able to demonstrate relevant local SEO experience where client data can be shared legitimately.',
  },
  {
    number: '06',
    title: 'No Clear Process',
    text: 'If the agency cannot explain audit, strategy, implementation, measurement, and reporting, the engagement may lack structure and accountability.',
  },
  {
    number: '07',
    title: 'Vanity Metrics Only',
    text: 'Followers, impressions without context, traffic without conversion context, and keyword counts without business relevance tell an incomplete story.',
  },
]

const QUESTIONS = [
  {
    number: '01',
    question: 'How do you measure SEO success?',
    answer: 'A professional agency should discuss traffic, qualified enquiries, conversions, search visibility, and revenue-related metrics where measurable.',
  },
  {
    number: '02',
    question: 'What schema markup do you implement?',
    answer: 'Look for familiarity with Organization, LocalBusiness, Service, FAQ, Article/BlogPosting, Breadcrumb, and other relevant structured data types.',
  },
  {
    number: '03',
    question: 'Can I see Google Search Console data?',
    answer: 'Access to first-party search data matters. It shows real search queries, impressions, clicks, and indexing health.',
  },
  {
    number: '04',
    question: 'Do you offer GEO/AEO?',
    answer: 'Businesses should understand whether the agency considers AI search visibility as part of the modern discovery ecosystem.',
  },
  {
    number: '05',
    question: 'How often will you report?',
    answer: 'Monthly reporting provides a consistent cadence for reviewing progress, identifying issues, and adjusting strategy.',
  },
  {
    number: '06',
    question: 'Who actually works on the account?',
    answer: 'Know whether work is in-house, outsourced, automated, AI-assisted, or human-reviewed. Each model has different implications for quality and accountability.',
  },
  {
    number: '07',
    question: 'What happens during the first 90 days?',
    answer: 'The agency should have clear early-stage priorities: audit, baseline, technical fixes, and initial optimisations.',
  },
]

const PRICING_LEVELS = [
  {
    tier: 'Starter / Local',
    range: '₹8,000–₹15,000 / month',
    suitable: 'Small businesses, local businesses, smaller websites, focused keyword sets',
    color: 'purple',
  },
  {
    tier: 'Growth',
    range: '₹15,000–₹25,000 / month',
    suitable: 'Growing businesses, multiple services, content expansion, more competitive keywords',
    color: 'cyan',
  },
  {
    tier: 'Competitive / Advanced',
    range: '₹25,000–₹40,000+ / month',
    suitable: 'Competitive industries, larger websites, multiple locations, aggressive content, technical SEO, GEO/AEO, advanced reporting',
    color: 'pink',
  },
]

const TIMELINE_STAGES = [
  {
    month: 'Month 01',
    title: 'Discover & Audit',
    items: ['Technical audit', 'Keyword research', 'Competitor analysis', 'Search Console setup', 'Analytics setup', 'Existing content review', 'SEO baseline'],
    color: 'purple',
  },
  {
    month: 'Month 02',
    title: 'Implement & Optimise',
    items: ['On-page optimisation', 'Technical fixes', 'Internal linking', 'Content updates', 'New content', 'Schema implementation'],
    color: 'cyan',
  },
  {
    month: 'Month 03',
    title: 'Measure & Expand',
    items: ['Performance review', 'Keyword movement', 'Content expansion', 'Conversion improvements', 'Local SEO improvements', 'Next-quarter strategy'],
    color: 'pink',
  },
]

const GEO_AEO_FLOW = [
  { step: 'TRADITIONAL SEO', result: 'SEARCH RESULTS', color: 'purple' },
  { step: 'GEO', result: 'GENERATIVE AI DISCOVERY', color: 'cyan' },
  { step: 'AEO', result: 'DIRECT ANSWERS / AI ANSWERS', color: 'pink' },
  { step: 'SEO + GEO + AEO', result: 'MODERN SEARCH VISIBILITY', color: 'gradient' },
]

const COMPARISON_ROWS = [
  { factor: 'Strategy', weak: 'Generic package', strong: 'Business-specific strategy' },
  { factor: 'Technical SEO', weak: 'Basic / unclear', strong: 'Technical audit + implementation' },
  { factor: 'Reporting', weak: 'Vanity metrics', strong: 'GSC + analytics + business metrics' },
  { factor: 'Content', weak: 'Keyword stuffing', strong: 'Search intent + expertise' },
  { factor: 'Local SEO', weak: 'Directory submissions', strong: 'GBP + local content + citations' },
  { factor: 'Schema', weak: 'Ignored', strong: 'Relevant structured data' },
  { factor: 'AI Search', weak: 'Ignored', strong: 'GEO/AEO awareness' },
  { factor: 'Communication', weak: 'Irregular', strong: 'Defined reporting / communication' },
  { factor: 'Measurement', weak: 'Rankings only', strong: 'Visibility + traffic + conversions' },
]

const SSM_SERVICES = [
  { name: 'SEO', items: ['Technical SEO', 'Keyword strategy', 'Content development', 'Link building'] },
  { name: 'GEO & AEO', items: ['Entity building', 'AI search visibility', 'Answer-structured content', 'AI citation strategy'] },
  { name: 'Local SEO', items: ['Google Business Profile', 'Google Maps', 'Local search visibility'] },
  { name: 'Google Ads', items: ['Paid search', 'Performance tracking', 'Lead generation'] },
  { name: 'Website Development', items: ['SEO-ready websites', 'Core Web Vitals', 'Conversion-focused structure'] },
  { name: 'AI Business Automation', items: ['AI workflows', 'Chatbots', 'WhatsApp automation', 'Business process automation'] },
]

const CHECKLIST = [
  'Technical SEO audit included',
  'Keyword research included',
  'Search intent considered',
  'Google Search Console configured',
  'Analytics configured',
  'On-page SEO included',
  'Content strategy included',
  'Schema knowledge demonstrated',
  'Internal linking strategy',
  'Local SEO where relevant',
  'Monthly reporting',
  'Clear KPIs',
  'Conversion tracking',
  'GEO/AEO awareness',
  'Clear 90-day roadmap',
  'Transparent communication',
]

const FAQS = [
  {
    question: 'How do I choose the best SEO agency in Madurai?',
    answer: 'There is no universally "best" agency. Choose based on relevant experience, technical competence, transparent reporting, clear strategy, business understanding, communication, and measurable outcomes.',
  },
  {
    question: 'How much does SEO cost in Madurai?',
    answer: 'Indicative range: ₹8,000–₹40,000+ per month depending on scope and competition. Pricing varies based on website size, competition, industry, number of target locations, technical complexity, content requirements, and reporting needs.',
  },
  {
    question: 'How long does SEO take to work?',
    answer: 'SEO is cumulative and timelines vary by website, competition, authority, industry, and implementation speed. Avoid agencies that guarantee specific timelines. Discuss factors such as competition, website authority, technical health, content quality, and search demand.',
  },
  {
    question: 'Should I choose an SEO agency that guarantees #1 rankings?',
    answer: 'No. Specific ranking guarantees are unreliable. A professional agency should focus on process, visibility, qualified traffic, conversions, and long-term search performance.',
  },
  {
    question: 'Does Static Savvy Media offer GEO and AEO?',
    answer: 'Yes. GEO and AEO are part of Static Savvy Media\'s modern search visibility offering, covering AI search, Google AI Overviews, ChatGPT, Perplexity, and answer engines.',
  },
]

const TOC_ITEMS = [
  { id: 'what-agency-delivers', label: 'What a Good SEO Agency Delivers' },
  { id: 'red-flags', label: 'Red Flags' },
  { id: 'questions-to-ask', label: 'Questions to Ask' },
  { id: 'seo-cost', label: 'SEO Cost in Madurai' },
  { id: 'first-90-days', label: 'First 90 Days' },
  { id: 'geo-aeo', label: 'GEO & AEO' },
  { id: 'comparing-agencies', label: 'Comparing Agencies' },
  { id: 'why-ssm', label: 'Why Static Savvy Media' },
  { id: 'selection-checklist', label: 'SEO Selection Checklist' },
  { id: 'faq', label: 'FAQs' },
]

/* ============================================================
   COMPONENT
   ============================================================ */

export default function SEO() {
  const jsonLdRef = useRef([])
  const progressRef = useRef(null)

  useEffect(() => {
    setSeo({
      title: `${PAGE_TITLE} | Static Savvy Media`,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/blog/seo-agency-madurai-complete-guide/`,
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
      url: `${SITE_URL}/blog/seo-agency-madurai-complete-guide/`,
      mainEntityOfPage: `${SITE_URL}/blog/seo-agency-madurai-complete-guide/`,
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Blog', item: `${SITE_URL}/blog/` },
        { name: 'SEO Agency Madurai Guide', item: `${SITE_URL}/blog/seo-agency-madurai-complete-guide/` },
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
      <div className="seo-guide-progress" aria-hidden="true">
        <div className="seo-guide-progress__bar" ref={progressRef} />
      </div>

      <Breadcrumbs />

      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="section">
        <div className="container">
          <div className="seo-guide-hero">
            <div className="seo-guide-hero__content">
              <span className="seo-guide-hero__badge">SEO GUIDE</span>
              <h1 className="hero__title">
                How to Choose an SEO Agency in Madurai{' '}
                <span className="text-gradient">,  Complete 2026 Guide</span>
              </h1>
              <div className="seo-guide-hero__meta">
                <span className="seo-guide-hero__meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  {AUTHOR}
                </span>
                <span className="seo-guide-hero__meta-item">Static Savvy Media</span>
                <span className="seo-guide-hero__meta-item">Madurai, Tamil Nadu</span>
                <span className="seo-guide-hero__meta-item">{READING_TIME}</span>
              </div>
              <p className="seo-guide-hero__intro">{INTRODUCTION}</p>
            </div>
            <div className="seo-guide-hero__visual">
              <div className="seo-guide-hero__visual-card">
                <div className="seo-guide-hero__visual-label">SEO Evaluation</div>
                <div className="seo-guide-hero__visual-flow">
                  <div className="seo-guide-hero__visual-step seo-guide-hero__visual-step--search">Search Query</div>
                  <div className="seo-guide-hero__visual-arrow" aria-hidden="true">↓</div>
                  <div className="seo-guide-hero__visual-step seo-guide-hero__visual-step--audit">Technical Audit</div>
                  <div className="seo-guide-hero__visual-arrow" aria-hidden="true">↓</div>
                  <div className="seo-guide-hero__visual-step seo-guide-hero__visual-step--strategy">Strategy</div>
                  <div className="seo-guide-hero__visual-arrow" aria-hidden="true">↓</div>
                  <div className="seo-guide-hero__visual-step seo-guide-hero__visual-step--result">Measurable Results</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          ARTICLE BODY + TOC
          ============================================================ */}
      <section className="section section--alt">
        <div className="container">
          <div className="seo-guide-article">
            <div className="seo-guide-article__body">

              {/* ---- Introduction ---- */}
              <div className="seo-guide-intro">
                <p>The Madurai digital marketing landscape has changed dramatically. More agencies, more claims, more confusion. This guide cuts through it.</p>
                <p>Businesses in Madurai now have many choices when selecting an SEO agency. The problem is not finding an agency. The problem is identifying whether the agency actually understands SEO, can explain its methodology, uses measurable data, understands technical SEO, understands search intent, can demonstrate reporting, understands local search, understands modern AI search, and understands GEO and AEO.</p>
                <p>A business should evaluate an SEO agency based on process, transparency, technical competence, reporting, and business outcomes rather than promises alone.</p>
              </div>

              {/* ---- Section 01: What Does a Good SEO Agency Deliver ---- */}
              <h2 id="what-agency-delivers">What Does a Good SEO Agency in Madurai Actually Deliver?</h2>
              <p>
                A professional SEO engagement should include a structured process rather than simply "posting blogs." Here is what a capable agency should deliver.
              </p>

              <div className="seo-guide-deliver-grid">
                {DELIVER_CARDS.map((card, index) => (
                  <ScrollReveal key={card.number} delay={index * 60}>
                    <div className="seo-guide-deliver-card">
                      <div className="seo-guide-deliver-card__number">{card.number}</div>
                      <h3 className="seo-guide-deliver-card__title">{card.title}</h3>
                      <ul className="seo-guide-deliver-card__list">
                        {card.items.map((item) => (
                          <li key={item} className="seo-guide-deliver-card__item">{item}</li>
                        ))}
                      </ul>
                      <p className="seo-guide-deliver-card__text">{card.text}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* ---- Section 02: Red Flags ---- */}
              <h2 id="red-flags">Red Flags When Evaluating a Madurai SEO Agency</h2>
              <p>
                Watch for these warning signs when evaluating any SEO agency.
              </p>

              <div className="seo-guide-redflags">
                {RED_FLAGS.map((flag) => (
                  <ScrollReveal key={flag.number}>
                    <div className="seo-guide-redflag-card">
                      <div className="seo-guide-redflag-card__warning" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                          <line x1="12" y1="9" x2="12" y2="13" />
                          <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                      </div>
                      <div className="seo-guide-redflag-card__number">{flag.number}</div>
                      <h3 className="seo-guide-redflag-card__title">{flag.title}</h3>
                      <p className="seo-guide-redflag-card__text">{flag.text}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* ---- Section 03: Questions to Ask ---- */}
              <h2 id="questions-to-ask">Questions to Ask Before Signing With Any Madurai SEO Agency</h2>
              <p>
                Ask these strategic questions before committing to any SEO engagement.
              </p>

              <div className="seo-guide-questions">
                {QUESTIONS.map((q) => (
                  <ScrollReveal key={q.number}>
                    <div className="seo-guide-question-card">
                      <div className="seo-guide-question-card__number">{q.number}</div>
                      <div className="seo-guide-question-card__content">
                        <h3 className="seo-guide-question-card__question">{q.question}</h3>
                        <p className="seo-guide-question-card__answer">{q.answer}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* ---- Section 04: SEO Cost ---- */}
              <h2 id="seo-cost">What Does SEO Cost in Madurai?</h2>
              <p>
                An indicative pricing range for SEO in Madurai is approximately <strong>₹8,000–₹40,000 per month</strong> depending on scope. Pricing depends on website size, competition, industry, number of target locations, number of pages, technical complexity, content requirements, link acquisition, local SEO requirements, GEO/AEO requirements, and reporting requirements.
              </p>

              <div className="seo-guide-pricing-grid">
                {PRICING_LEVELS.map((level, index) => (
                  <ScrollReveal key={level.tier} delay={index * 80}>
                    <div className={`seo-guide-pricing-card seo-guide-pricing-card--${level.color}`}>
                      <div className="seo-guide-pricing-card__tier">{level.tier}</div>
                      <div className="seo-guide-pricing-card__range">{level.range}</div>
                      <div className="seo-guide-pricing-card__suitable">{level.suitable}</div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal>
                <div className="seo-guide-pricing-warning">
                  <p>Be cautious with sub-₹5,000 SEO packages when the scope promises technical SEO, content, backlinks, reporting, local SEO and continuous optimisation. At that price, the scope may be too limited to support meaningful work.</p>
                </div>
              </ScrollReveal>

              {/* ---- Section 05: First 90 Days ---- */}
              <h2 id="first-90-days">What Should You Expect in the First 90 Days?</h2>
              <p>
                A professional agency should have a clear 90-day roadmap. SEO timelines vary by website, competition, authority, industry, and implementation speed.
              </p>

              <div className="seo-guide-timeline">
                {TIMELINE_STAGES.map((stage, index) => (
                  <ScrollReveal key={stage.month} delay={index * 80}>
                    <div className={`seo-guide-timeline-card seo-guide-timeline-card--${stage.color}`}>
                      <div className="seo-guide-timeline-card__month">{stage.month}</div>
                      <h3 className="seo-guide-timeline-card__title">{stage.title}</h3>
                      <ul className="seo-guide-timeline-card__list">
                        {stage.items.map((item) => (
                          <li key={item} className="seo-guide-timeline-card__item">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* ---- Section 06: GEO & AEO ---- */}
              <h2 id="geo-aeo">Why GEO and AEO Now Matter More Than Traditional SEO in 2026</h2>
              <p>
                The search environment has expanded beyond traditional Google results. Google AI Overviews, ChatGPT, Perplexity, voice search, and answer engines are reshaping how businesses get discovered.
              </p>
              <p>
                <strong>SEO</strong> helps search engines discover, understand and rank web pages. <strong>GEO</strong> focuses on building an online presence and entity signals that can support visibility in generative AI responses. <strong>AEO</strong> structures content so answer engines can extract concise, useful answers.
              </p>

              <div className="seo-guide-geo-aeo-visual">
                {GEO_AEO_FLOW.map((item, index) => (
                  <ScrollReveal key={item.step} delay={index * 80}>
                    <div className={`seo-guide-geo-aeo-card seo-guide-geo-aeo-card--${item.color}`}>
                      <div className="seo-guide-geo-aeo-card__step">{item.step}</div>
                      <div className="seo-guide-geo-aeo-card__arrow" aria-hidden="true">↓</div>
                      <div className="seo-guide-geo-aeo-card__result">{item.result}</div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <p>
                These three disciplines work together. Businesses that combine SEO, GEO, and AEO build modern search visibility that covers traditional search, AI-generated answers, and direct responses.
              </p>

              <ScrollReveal>
                <div className="seo-guide-cta-inline">
                  <Link to="/services/geo-aeo-ai-search/" className="seo-guide-cta-inline__link">
                    Explore GEO &amp; AEO Services →
                  </Link>
                </div>
              </ScrollReveal>

              {/* ---- Section 07: Comparing Agencies ---- */}
              <h2 id="comparing-agencies">How to Compare SEO Agencies in Madurai</h2>
              <p>
                Use this comparison framework when evaluating agencies.
              </p>

              <ScrollReveal>
                <div className="seo-guide-comparison">
                  <div className="seo-guide-comparison__header">
                    <div className="seo-guide-comparison__cell seo-guide-comparison__cell--factor">Evaluation Factor</div>
                    <div className="seo-guide-comparison__cell seo-guide-comparison__cell--weak">Weak Agency</div>
                    <div className="seo-guide-comparison__cell seo-guide-comparison__cell--strong">Professional Agency</div>
                  </div>
                  {COMPARISON_ROWS.map((row) => (
                    <div key={row.factor} className="seo-guide-comparison__row">
                      <div className="seo-guide-comparison__cell seo-guide-comparison__cell--factor" data-label="Factor">{row.factor}</div>
                      <div className="seo-guide-comparison__cell seo-guide-comparison__cell--weak" data-label="Weak">{row.weak}</div>
                      <div className="seo-guide-comparison__cell seo-guide-comparison__cell--strong" data-label="Professional">{row.strong}</div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* ---- Section 08: Why Static Savvy Media ---- */}
              <h2 id="why-ssm">What Makes Static Savvy Media Different?</h2>
              <p>
                Static Savvy Media is a Madurai-based digital marketing agency with GEO and AEO as a core specialization. We combine traditional SEO with modern AI search visibility.
              </p>

              <div className="seo-guide-services-grid">
                {SSM_SERVICES.map((service, index) => (
                  <ScrollReveal key={service.name} delay={index * 40}>
                    <div className="seo-guide-service-block">
                      <h3 className="seo-guide-service-block__name">{service.name}</h3>
                      <ul className="seo-guide-service-block__list">
                        {service.items.map((item) => (
                          <li key={item} className="seo-guide-service-block__item">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* ---- Section 09: Selection Checklist ---- */}
              <h2 id="selection-checklist">SEO Agency Selection Checklist</h2>
              <p>
                Use this checklist when evaluating any SEO agency.
              </p>

              <div className="seo-guide-checklist">
                {CHECKLIST.map((item, index) => (
                  <ScrollReveal key={item} delay={index * 30}>
                    <div className="seo-guide-checklist__item">
                      <div className="seo-guide-checklist__check" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="seo-guide-checklist__text">{item}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal>
                <div className="seo-guide-checklist-note">
                  <p>If an agency cannot clearly explain several of these areas, ask more questions before signing.</p>
                </div>
              </ScrollReveal>

              {/* ---- FAQ ---- */}
              <h2 id="faq">Frequently Asked Questions About Choosing an SEO Agency in Madurai</h2>
              <div className="seo-guide-faq">
                {FAQS.map((faq, index) => (
                  <ScrollReveal key={index}>
                    <div className="seo-guide-faq__item">
                      <details className="seo-guide-faq__details glass-card">
                        <summary className="seo-guide-faq__question">{faq.question}</summary>
                        <p className="seo-guide-faq__answer">{faq.answer}</p>
                      </details>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* ---- Author Bio ---- */}
              <div className="seo-guide-author">
                <div className="seo-guide-author__avatar" aria-hidden="true">DK</div>
                <div>
                  <div className="seo-guide-author__name">{AUTHOR}</div>
                  <div className="seo-guide-author__role">{AUTHOR_ROLE}, Static Savvy Media</div>
                  <Link to="/about/deepan-kanz/" className="seo-guide-author__link">View Full Profile →</Link>
                </div>
              </div>

            </div>

            {/* ---- Sticky TOC ---- */}
            <aside className="seo-guide-toc" aria-label="Table of Contents">
              <div className="seo-guide-toc__title">Table of Contents</div>
              <ul className="seo-guide-toc__list">
                {TOC_ITEMS.map((item) => (
                  <li key={item.id} className="seo-guide-toc__item">
                    <a href={`#${item.id}`} className="seo-guide-toc__link">{item.label}</a>
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
      <RelatedReading links={[['/services/seo/madurai/', 'SEO services in Madurai'], ['/services/local-seo/madurai/', 'Local SEO in Madurai'], ['/blog/affordable-seo-company-madurai-pricing/', 'Affordable SEO in Madurai: 2026 prices'], ['/blog/how-long-does-seo-take-madurai/', 'How long does SEO take?'], ['/blog/is-seo-worth-it-small-business-madurai/', 'Is SEO worth it for a small business?'], ['/contact/', 'Get a custom quote'], ['/locations/madurai/', 'Digital marketing agency in Madurai']]} />

      <CTASection
        eyebrow="SEO Services"
        title="Looking for an SEO Agency in Madurai?"
        subtitle="Choose SEO based on strategy, technical capability, transparent reporting and measurable business outcomes, not empty ranking promises."
        primaryLabel="Talk to Static Savvy Media"
        primaryHref={whatsappHref}
      />
    </div>
  )
}
