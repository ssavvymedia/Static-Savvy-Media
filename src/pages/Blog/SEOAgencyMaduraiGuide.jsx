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
    items: ['Crawlability', 'Indexation', 'Site architecture', 'URL structure', 'Canonicals', 'Robots.txt', 'XML sitemap', 'Broken links', 'Redirects', 'Page speed', 'Core Web Vitals', 'Mobile usability', 'Duplicate content', 'Structured data', 'Internal linking'],
    text: 'Technical health is foundational. Without a technically sound website, content and link-building efforts are built on unstable ground.',
  },
  {
    number: '02',
    title: 'Keyword Research & Search Intent',
    items: ['Primary keywords', 'Secondary keywords', 'Long-tail keywords', 'Commercial intent', 'Informational intent', 'Transactional intent', 'Local intent', 'Competitor keywords'],
    text: 'Keyword selection should connect to actual business goals. Targeting irrelevant traffic wastes budget. The goal is qualified visibility that supports outcomes.',
  },
  {
    number: '03',
    title: 'Google Search Console Setup & Monitoring',
    items: ['Impressions', 'Clicks', 'CTR', 'Average position', 'Search queries', 'Indexed pages', 'Indexing issues', 'Search performance trends'],
    text: 'Reporting should not consist only of screenshots or vanity metrics. Work with actual search data.',
  },
  {
    number: '04',
    title: 'On-Page SEO',
    items: ['Title tags', 'Meta descriptions', 'H1 tag', 'H2/H3 structure', 'Content optimisation', 'Search intent alignment', 'Internal links', 'Image alt text', 'URL structure', 'Schema where appropriate'],
    text: 'On-page optimisation ensures every page communicates clearly to both search engines and human visitors.',
  },
  {
    number: '05',
    title: 'Content Strategy',
    items: ['Service pages', 'Location pages', 'Industry pages', 'Blog content', 'FAQ content', 'Comparison pages', 'Educational guides', 'Commercial content'],
    text: 'Content should be created around genuine search demand and customer questions.',
  },
  {
    number: '06',
    title: 'Monthly Reporting',
    items: ['Organic traffic', 'Search visibility', 'Keyword movement', 'Search Console data', 'Technical improvements', 'Content published', 'Conversion information', 'Completed work', 'Next month’s priorities'],
    text: 'The report should help the business understand: What happened? Why did it happen? What was done? What happens next?',
  },
]

const RED_FLAGS = [
  {
    number: '01',
    title: 'Guaranteed #1 Rankings',
    text: 'No legitimate agency can control Google’s ranking systems. Avoid guaranteed ranking promises. The correct approach is to define strategy, KPIs, search visibility goals, organic growth, and conversion goals.',
  },
  {
    number: '02',
    title: 'No Reporting',
    text: 'If an agency cannot show meaningful data and explain what work was performed, be cautious.',
  },
  {
    number: '03',
    title: 'No Schema Knowledge',
    text: 'Modern SEO should understand structured data such as Organization, LocalBusiness, Article/BlogPosting, BreadcrumbList, and FAQPage where appropriate. Schema can help search engines understand content but does not guarantee rankings or rich results.',
  },
  {
    number: '04',
    title: 'Wix-Based / Poorly Optimised Websites',
    text: 'The important evaluation criteria are technical control, site architecture, performance, SEO flexibility, schema implementation, scalability, and the ability to implement required technical changes.',
  },
  {
    number: '05',
    title: 'No Local Examples',
    text: 'A Madurai-focused SEO agency should understand local search and the Madurai market. Look for evidence of local SEO work, location pages, Google Business Profile optimisation, and local search strategy.',
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
    answer: 'A professional agency should discuss organic visibility, qualified traffic, conversions, Search Console data, and business KPIs.',
  },
  {
    number: '02',
    question: 'What schema markup do you implement?',
    answer: 'Look for familiarity with Organization, LocalBusiness, Article/BlogPosting, BreadcrumbList, and FAQPage where appropriate.',
  },
  {
    number: '03',
    question: 'Can I see Google Search Console data?',
    answer: 'Businesses should understand how their search visibility is measured. Access to first-party search data matters.',
  },
  {
    number: '04',
    question: 'Do you offer GEO/AEO?',
    answer: 'Modern search now includes SEO, GEO, AEO, AI Overviews, AI-assisted discovery, and answer engines. Businesses should understand whether the agency considers AI search visibility.',
  },
  {
    number: '05',
    question: 'Who actually works on the account?',
    answer: 'Know whether work is in-house, outsourced, automated, AI-assisted, or human-reviewed. Each model has different implications for quality and accountability.',
  },
  {
    number: '06',
    question: 'What happens during the first 90 days?',
    answer: 'A professional agency should be able to provide a logical roadmap: audit, baseline, technical fixes, and initial optimisations.',
  },
]

const PRICING_LEVELS = [
  {
    tier: 'Starter / Local',
    range: '₹8,000–₹15,000 / month',
    items: ['Local businesses', 'Basic technical optimisation', 'Keyword targeting', 'Google Business Profile support', 'Basic reporting'],
    color: 'purple',
  },
  {
    tier: 'Growth',
    range: '₹15,000–₹25,000 / month',
    items: ['Growing businesses', 'More competitive keywords', 'Content strategy', 'Technical SEO', 'Local SEO', 'Ongoing optimisation', 'Detailed reporting'],
    color: 'cyan',
  },
  {
    tier: 'Competitive / Advanced',
    range: '₹25,000–₹40,000+ / month',
    items: ['Competitive markets', 'Larger websites', 'Aggressive content requirements', 'Advanced technical SEO', 'GEO/AEO', 'Entity strategy', 'Comprehensive reporting'],
    color: 'pink',
  },
]

const TIMELINE_STAGES = [
  {
    month: 'Month 01',
    title: 'Discover & Audit',
    items: ['Website audit', 'Technical SEO audit', 'Keyword research', 'Search intent analysis', 'Competitor research', 'Google Search Console review', 'Analytics review', 'Initial roadmap'],
    color: 'purple',
  },
  {
    month: 'Month 02',
    title: 'Implement & Optimise',
    items: ['Technical fixes', 'On-page optimisation', 'Content improvements', 'Internal linking', 'Schema implementation where appropriate', 'Local SEO improvements', 'Content publishing'],
    color: 'cyan',
  },
  {
    month: 'Month 03',
    title: 'Measure & Expand',
    items: ['Search performance analysis', 'Keyword movement', 'Organic traffic trends', 'Conversion analysis where available', 'Content expansion', 'Technical refinement', 'New opportunities', 'Next-quarter roadmap'],
    color: 'pink',
  },
]

const GEO_AEO_FLOW = [
  { step: 'SEO', result: 'Traditional Search Visibility', color: 'purple' },
  { step: 'GEO', result: 'Generative AI Discovery', color: 'cyan' },
  { step: 'AEO', result: 'Direct Answers / AI Answer Systems', color: 'pink' },
  { step: 'SEO + GEO + AEO', result: 'Modern Search Visibility', color: 'gradient' },
]

const COMPARISON_ROWS = [
  { factor: 'Strategy', weak: 'Generic keyword list', strong: 'Business-focused search strategy' },
  { factor: 'Technical SEO', weak: 'Basic metadata changes', strong: 'Technical audit + implementation' },
  { factor: 'Reporting', weak: 'Vanity metrics', strong: 'Search Console + meaningful KPIs' },
  { factor: 'Content', weak: 'Bulk generic articles', strong: 'Search-intent-driven content' },
  { factor: 'Local SEO', weak: 'Directory submissions only', strong: 'GBP + local relevance + location signals' },
  { factor: 'Schema', weak: 'Not discussed', strong: 'Relevant structured data' },
  { factor: 'AI Search', weak: 'Ignored', strong: 'SEO + GEO + AEO awareness' },
  { factor: 'Communication', weak: 'Unclear', strong: 'Defined reporting and communication' },
  { factor: 'Measurement', weak: 'Rankings only', strong: 'Visibility + traffic + leads / conversions where trackable' },
]

const SSM_SERVICES = [
  { name: 'SEO', items: ['Technical SEO', 'Keyword strategy', 'Content development', 'Link building'] },
  { name: 'GEO & AEO', items: ['Entity building', 'AI search visibility', 'Answer-structured content', 'AI citation strategy'] },
  { name: 'Local SEO', items: ['Google Business Profile', 'Google Maps', 'Local search visibility'] },
  { name: 'Google Ads', items: ['Paid search', 'Performance tracking', 'Lead generation'] },
  { name: 'Website Design & Development', items: ['SEO-ready websites', 'Core Web Vitals', 'Conversion-focused structure'] },
  { name: 'AI Business Automation', items: ['AI workflows', 'Chatbots', 'WhatsApp automation', 'Business process automation'] },
]

const CHECKLIST = [
  'Technical SEO audit',
  'Keyword research',
  'Search intent analysis',
  'Google Search Console',
  'Analytics',
  'On-page SEO',
  'Content strategy',
  'Schema',
  'Internal linking',
  'Local SEO',
  'Monthly reporting',
  'KPIs',
  'Conversion tracking',
  'GEO/AEO awareness',
  '90-day roadmap',
  'Transparent communication',
]

const FAQS = [
  {
    question: 'How do I choose the best SEO agency in Madurai?',
    answer: 'Look for an agency with a clear SEO process, technical SEO capability, real Google Search Console reporting, transparent communication, search-intent-based content strategy, relevant local experience, and a clear roadmap for measuring business outcomes.',
  },
  {
    question: 'How much does SEO cost in Madurai?',
    answer: 'Indicative SEO pricing can range from around ₹8,000 to ₹40,000+ per month depending on scope, competition, website complexity, content requirements and technical work. Pricing varies by agency and business requirements.',
  },
  {
    question: 'How long does SEO take to work?',
    answer: 'SEO is a long-term process. Some technical and on-page improvements can be implemented quickly, while measurable organic growth generally depends on the website’s existing authority, competition, content quality, search demand and implementation consistency. Avoid agencies that guarantee a specific ranking timeline.',
  },
  {
    question: 'Should I choose an SEO agency that guarantees #1 rankings?',
    answer: 'No. Google rankings depend on many factors outside an agency’s direct control. A professional agency should define strategy, KPIs, search visibility goals, traffic goals, and lead/conversion goals where measurable rather than promising a guaranteed position.',
  },
  {
    question: 'Does Static Savvy Media offer GEO and AEO?',
    answer: 'Yes. Static Savvy Media provides GEO & AEO-focused search visibility services designed to help businesses prepare their content, entity signals and website structure for AI-driven discovery and answer engines.',
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
  { id: 'selection-checklist', label: 'Selection Checklist' },
  { id: 'why-ssm', label: 'Why Static Savvy Media' },
  { id: 'faq', label: 'FAQs' },
]

export default function SEOAgencyMaduraiGuide() {
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

      <BlogFeaturedImage slug="seo-agency-madurai-complete-guide" />

      <section className="section section--alt">
        <div className="container">
          <div className="seo-guide-article">
            <div className="seo-guide-article__body">

              <div className="seo-guide-intro">
                <p>Madurai businesses are increasingly investing in search visibility, Google rankings, local SEO, Google Business Profile, content marketing, Google Ads, and AI search visibility.</p>
                <p>At the same time, the number of agencies and SEO promises has increased. This creates a problem: businesses often cannot distinguish between real SEO strategy, basic keyword insertion, automated reports, low-quality link building, generic website optimisation, and actual technical SEO.</p>
                <p>This guide is designed to help a business owner evaluate an SEO agency based on process, transparency, technical capability, and measurable outcomes.</p>
              </div>

              <h2 id="what-agency-delivers">What Does a Good SEO Agency in Madurai Actually Deliver?</h2>
              <p>A professional SEO engagement should include a structured process. A capable agency should have a clearly defined process covering technical, strategic, and measurable work.</p>

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

              <h2 id="red-flags">Red Flags When Evaluating a Madurai SEO Agency</h2>
              <p>Watch for these warning signs when evaluating any SEO agency.</p>

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

              <h2 id="questions-to-ask">Questions to Ask Before Signing With Any Madurai SEO Agency</h2>
              <p>Ask these strategic questions before committing to any SEO engagement.</p>

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

              <h2 id="seo-cost">What Does SEO Cost in Madurai?</h2>
              <p>An indicative pricing range for SEO in Madurai is approximately <strong>₹8,000–₹40,000 per month</strong> depending on scope. Pricing should be evaluated based on scope, expertise, website complexity, competition, content volume, technical requirements, reporting, and business objectives.</p>

              <div className="seo-guide-pricing-grid">
                {PRICING_LEVELS.map((level, index) => (
                  <ScrollReveal key={level.tier} delay={index * 80}>
                    <div className={`seo-guide-pricing-card seo-guide-pricing-card--${level.color}`}>
                      <div className="seo-guide-pricing-card__tier">{level.tier}</div>
                      <div className="seo-guide-pricing-card__range">{level.range}</div>
                      <ul className="seo-guide-deliver-card__list">
                        {level.items.map((item) => (
                          <li key={item} className="seo-guide-deliver-card__item">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal>
                <div className="seo-guide-pricing-warning">
                  <p>Be cautious with sub-₹5,000 SEO packages when the scope promises technical SEO, content, backlinks, reporting, local SEO and continuous optimisation simultaneously. At that price, the scope may be too limited to support meaningful work.</p>
                </div>
              </ScrollReveal>

              <h2 id="first-90-days">What Should You Expect in the First 90 Days?</h2>
              <p>A professional agency should have a clear 90-day roadmap. SEO outcomes depend on competition, website history, technical condition, content quality, authority, search demand, and implementation speed.</p>

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

              <h2 id="geo-aeo">Why GEO and AEO Now Matter More Than Traditional SEO in 2026</h2>
              <p>The search environment has expanded beyond traditional Google results. Google AI Overviews, ChatGPT, Perplexity, voice search, and answer engines are reshaping how businesses get discovered.</p>
              <p><strong>SEO</strong> focuses on visibility in traditional search results. <strong>AEO</strong> focuses on making content easier for answer engines to extract and understand. <strong>GEO</strong> focuses on visibility within generative AI discovery.</p>

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

              <p>These three disciplines work together. Businesses that combine SEO, GEO, and AEO build modern search visibility that covers traditional search, AI-generated answers, and direct responses.</p>

              <ScrollReveal>
                <div className="seo-guide-cta-inline">
                  <Link to="/services/geo-aeo-ai-search/" className="seo-guide-cta-inline__link">
                    Explore GEO &amp; AEO Services →
                  </Link>
                </div>
              </ScrollReveal>

              <h2 id="comparing-agencies">How to Compare SEO Agencies in Madurai</h2>
              <p>Use this comparison framework when evaluating agencies.</p>

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

              <h2 id="selection-checklist">SEO Agency Selection Checklist</h2>
              <p>Use this checklist when evaluating any SEO agency.</p>

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

              <h2 id="why-ssm">What Makes Static Savvy Media Different?</h2>
              <p>Static Savvy Media is a Madurai-based digital marketing agency with GEO and AEO as a core specialisation. We approach search visibility as a connected digital growth system rather than treating SEO as isolated keyword work.</p>

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

              <div className="seo-guide-author">
                <div className="seo-guide-author__avatar" aria-hidden="true">DK</div>
                <div>
                  <div className="seo-guide-author__name">{AUTHOR}</div>
                  <div className="seo-guide-author__role">{AUTHOR_ROLE}, Static Savvy Media</div>
                  <Link to="/about/deepan-kanz/" className="seo-guide-author__link">View Full Profile →</Link>
                </div>
              </div>

            </div>

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

      <CTASection
        eyebrow="SEO Services"
        title="Ready to Choose the Right SEO Strategy for Your Business?"
        subtitle="Evaluate SEO based on strategy, technical capability, transparency, measurable data and long-term search visibility."
        primaryLabel="Talk to Static Savvy Media"
        primaryHref={whatsappHref}
      />
    </div>
  )
}
