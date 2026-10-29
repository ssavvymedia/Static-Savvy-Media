import { useEffect, useRef, useState } from 'react'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import { faqPageSchema, breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, SITE_URL } from '../../utils/constants.js'
import faqHeroImg from '../../assets/images/Faq/FAQ.webp'

const WHATSAPP_MSG = 'Hi Static Savvy Media, I have a question about your digital marketing services.'

const FAQ_SECTIONS = [
  {
    title: 'About GEO & AEO',
    items: [
      {
        id: 'geo-01',
        question: 'What is Generative Engine Optimization (GEO)?',
        answer: 'Generative Engine Optimization is the practice of building your online presence so that AI language models, ChatGPT, Google Gemini, Perplexity, Microsoft Copilot, cite your business as a source when users ask questions in your category. Unlike traditional SEO, which optimizes for Google’s blue link results, GEO optimizes for the AI-generated answer itself.',
      },
      {
        id: 'aeo-01',
        question: 'What is Answer Engine Optimization (AEO)?',
        answer: 'Answer Engine Optimization is the practice of structuring your website content so it gets extracted and cited by AI-powered answer engines, including Google’s AI Overviews, Google Featured Snippets, and voice search responses. AEO focuses on FAQ schema markup, concise Q&A content structure, and question-aligned headings that AI engines can parse and present as direct answers.',
      },
      {
        id: 'geo-02',
        question: 'Why is AI search visibility important for my business in 2026?',
        answer: 'An increasing share of commercial search queries, particularly research-phase queries like “which service is best for X”, are now being answered directly by AI engines without users clicking through to websites. If your business is not cited in these AI answers, you are invisible to users who never reach the blue links. Businesses building AI search visibility now are gaining compounding advantages over competitors who are waiting.',
      },
      {
        id: 'geo-03',
        question: 'Which AI search engines should I be optimizing for?',
        answer: 'The most important AI search surfaces for Indian and Malaysian businesses currently are: Google AI Overviews, ChatGPT, and Perplexity. We optimize for all three simultaneously, the underlying signals overlap significantly.',
      },
    ],
  },
  {
    title: 'About SEO',
    items: [
      {
        id: 'seo-01',
        question: 'How long does SEO take to work in Tamil Nadu?',
        answer: 'For lower-competition local queries in Madurai and Thoothukudi, well-executed technical SEO and on-page optimization can produce visible ranking improvements within 60–90 days. For competitive categories, page one rankings typically require 4–8 months of sustained effort. The compounding nature of SEO means results from month 6 are usually significantly better than results from month 2, even with consistent effort throughout.',
      },
      {
        id: 'seo-02',
        question: 'Do I need to blog for SEO?',
        answer: 'For most businesses, yes, but not in the “post 500 words twice a week” way most agencies recommend. The most effective blogging for SEO is cornerstone content: long, authoritative, genuinely useful articles that answer the specific questions your target clients are searching for. Fewer, better articles consistently outperform high-volume thin content, and they are far more likely to be cited by AI search engines.',
      },
    ],
  },
  {
    title: 'About Our Services & Quotes',
    items: [
      {
        id: 'svc-01',
        question: 'Do you offer monthly retainer contracts or project-based work?',
        answer: 'Both. SEO, Local SEO, Google Ads management, and social media management are typically month-to-month retainer engagements. Website development, photography, and AI automation are typically project-based. We do not lock clients into long-term contracts, if our work stops delivering value, you should not be paying for it.',
      },
      {
        id: 'svc-02',
        question: 'Are Malaysian clients billed in MYR?',
        answer: 'Yes. Malaysian clients are quoted and invoiced in MYR. Indian clients are invoiced in INR. Payment is via bank transfer, we provide local banking details for both markets.',
      },
      {
        id: 'svc-03',
        question: 'Can you take over from our existing digital marketing agency?',
        answer: 'Yes. We take over existing accounts regularly. Our first step is always an audit of what has been done, what is working, and what is not, without assumptions. We provide the audit results honestly before recommending changes.',
      },
    ],
  },
]

function FAQItem({ item }) {
  const [open, setOpen] = useState(false)
  const answerId = `faq-answer-${item.id}`
  const questionId = `faq-question-${item.id}`

  return (
    <div className={`faq-item glass-card ${open ? 'faq-item--open' : ''}`}>
      <button
        className="faq-item__trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={answerId}
        id={questionId}
      >
        <span className="faq-item__question">{item.question}</span>
        <span className="faq-item__icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>
      <div
        className="faq-item__answer-wrap"
        id={answerId}
        role="region"
        aria-labelledby={questionId}
        hidden={!open}
      >
        <p className="faq-item__answer">{item.answer}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: 'FAQs, Digital Marketing, SEO, GEO, AEO & AI Search | Static Savvy Media',
      description: 'Answers to the most common questions about GEO, AEO, SEO, local digital marketing, and working with Static Savvy Media. Tamil Nadu and Malaysia’s AI search agency.',
      canonical: `${SITE_URL}/faq/`,
      ogType: 'website',
    })

    const allFaqs = FAQ_SECTIONS.flatMap((section) => section.items)
    const faqEntities = allFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    }))

    const faqPage = faqPageSchema({ faqs: faqEntities })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'FAQ', item: `${SITE_URL}/faq/` },
      ],
    })

    const scripts = [faqPage, breadcrumbs].map((data) => {
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
    <div className="faq-hub">
      <Breadcrumbs />

      {/* HERO */}
      <HeroSection
        layout="two-column"
        eyebrow="FAQ"
        title={
          <>
            Frequently Asked Questions{' '}
            <span className="text-gradient">&mdash; Digital Marketing, SEO, GEO & AEO</span>
          </>
        }
        subtitle="Your questions about digital marketing in the AI era &mdash; answered directly. If your question is not covered here, message us on WhatsApp and we will answer it within the hour."
      >
        <div className="hero__visual-side">
          <img
            src={faqHeroImg}
            width={1536}
            height={1024}
            fetchPriority="high"
            alt="Frequently Asked Questions - Digital Marketing, SEO, GEO & AEO"
            className="hero__image"
          />
        </div>
      </HeroSection>

      {/* FAQ SECTIONS */}
      <section className="section section--alt">
        <div className="container">
          <div className="faq-hub-content">
            {FAQ_SECTIONS.map((section) => (
              <div key={section.title} className="faq-hub-section">
                <ScrollReveal>
                  <h2 className="faq-hub-section__title">{section.title}</h2>
                </ScrollReveal>
                <div className="faq-hub-section__list">
                  {section.items.map((item) => (
                    <ScrollReveal key={item.id}>
                      <FAQItem item={item} />
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            ))}

            {/* WHATSAPP CTA */}
            <ScrollReveal>
              <div className="faq-hub-cta glass-card">
                <h2 className="faq-hub-cta__title">Your question is not here? Ask us directly.</h2>
                <p className="faq-hub-cta__text">
                  We respond to WhatsApp messages within the hour on business days.
                </p>
                <a
                  href={whatsappHref}
                  className="btn btn--primary btn--lg faq-hub-whatsapp-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact Static Savvy Media on WhatsApp"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp: +91 99440 40345
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  )
}
