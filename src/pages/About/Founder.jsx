import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import FAQSection from '../../components/sections/FAQSection.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import ContactFormSection from '../../components/sections/ContactFormSection.jsx'
import '../../styles/pages/home-v2.css'
import '../../styles/pages/founder-v2.css'
import { setSeo } from '../../utils/seo.js'
import { personSchema, breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL } from '../../utils/constants.js'
import deepanFounderImg from '../../assets/images/About/DeepanFounder.webp'
import { FOUNDER } from '../../data/founder.js'

/* ============================================================
   CONTENT, Approved Static Savvy Media Founder Page Content
   ============================================================ */

const PAGE_TITLE = 'Deepan Kanz, Founder & AI Search Specialist | Static Savvy Media'

const PAGE_DESCRIPTION =
  'Meet Deepan Kanz, Founder & AI Search Specialist at Static Savvy Media. Learn about his GEO, AEO, SEO and AI business automation expertise and methodology.'

const LEADS = [
  { title: 'AI Search (GEO & AEO)', text: 'Entity building, answer-structured content and AI citation strategy for ChatGPT, Gemini and Google AI Overviews.', to: '/services/geo-aeo-ai-search/' },
  { title: 'SEO & Technical SEO', text: 'Schema markup, Core Web Vitals, site architecture and content that compounds.', to: '/services/seo/' },
  { title: 'Local SEO & Google Business Profile', text: 'Google Business Profile and Google Maps ranking for Tamil Nadu and Malaysia markets.', to: '/services/local-seo/' },
  { title: 'AI Business Automation', text: 'Workflow tools and WhatsApp Business API integration.', to: '/services/ai-business-automation/' },
]

const ROLES = [
  { k: 'Role', v: 'Founder, Static Savvy Media' },
  { k: 'Founded', v: '1 October 2021, Madurai' },
  { k: 'Leads', v: 'SEO, Local SEO and AI search (GEO/AEO) strategy' },
  { k: 'Markets', v: 'Tamil Nadu (Madurai, Thoothukudi) and Malaysia (Rawang, Selangor)' },
  { k: 'Client plans', v: 'Reviews every new client’s plan himself' },
  { k: 'Writes', v: 'The Static Savvy Media blog and guides' },
]

const ARTICLES = [
  { to: '/blog/how-to-rank-in-ai-search/', t: 'How to Make Your Business Visible in ChatGPT, Gemini & Google AI Search' },
  { to: '/blog/what-is-generative-engine-optimization/', t: 'What Is Generative Engine Optimization (GEO)?' },
  { to: '/blog/what-is-answer-engine-optimization/', t: 'What Is Answer Engine Optimization (AEO)?' },
  { to: '/blog/seo-agency-madurai-complete-guide/', t: 'How to Choose an SEO Agency in Madurai' },
  { to: '/blog/how-long-does-seo-take-madurai/', t: 'How Long Does SEO Take for a Madurai Business?' },
  { to: '/blog/gbp-not-showing-on-google-maps-causes-fixes/', t: 'GBP Not Showing on Google Maps: Causes and Fixes' },
  { to: '/blog/google-business-profile-optimisation-malaysia/', t: 'Google Business Profile Optimisation in Malaysia: A Step-by-Step Guide for SMEs' },
  { to: '/blog/how-to-choose-digital-marketing-agency-malaysia/', t: 'How to Choose a Digital Marketing Agency in Malaysia' },
  { to: '/blog/seo-vs-google-ads-madurai/', t: 'SEO vs Google Ads: Which Is Better for Madurai Businesses?' },
]

const SOCIAL = [
  { name: 'LinkedIn', handle: 'Deepan Kanz', href: 'https://www.linkedin.com/in/deepankanz/' },
  { name: 'Instagram', handle: '@deepankanz', href: 'https://www.instagram.com/deepankanz' },
  { name: 'Facebook', handle: '@deepankanz', href: 'https://www.facebook.com/deepankanz' },
  { name: 'X (Twitter)', handle: '@deepankanz', href: 'https://x.com/deepankanz' },
  { name: 'YouTube', handle: '@Deepankanz', href: 'https://www.youtube.com/@Deepankanz' },
  { name: 'Pinterest', handle: '@Deepankanz', href: 'https://in.pinterest.com/Deepankanz/' },
  { name: 'Medium', handle: '@deepankanz', href: 'https://medium.com/@deepankanz' },
]

const FAQS = [
  { question: 'Who is Deepan Kanz?', answer: 'Deepan Kanz is the founder of Static Savvy Media, a digital marketing agency headquartered in Madurai, India, with an office in Thoothukudi and a team in Rawang, Malaysia. He leads SEO, Local SEO and AI search (GEO and AEO) strategy for clients.' },
  { question: 'When did Deepan Kanz start Static Savvy Media?', answer: 'He founded Static Savvy Media in Madurai on 1 October 2021.' },
  { question: 'What does Deepan Kanz specialise in?', answer: 'Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), Local SEO and Google Business Profile, technical SEO and AI business automation, for businesses in Tamil Nadu and Malaysia.' },
  { question: 'Can I speak to Deepan directly?', answer: 'Yes. Deepan handles first conversations about GEO/AEO or SEO strategy personally for new clients. Call or WhatsApp +91 99440 40345, or connect on LinkedIn.' },
]

export default function Founder() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/about/deepan-kanz/`,
      ogType: 'profile',
    })

    const person = personSchema({
      name: 'Deepan Kanz',
      jobTitle: 'Founder & AI Search Specialist',
      worksFor: {
        '@type': 'Organization',
        name: 'Static Savvy Media',
        url: SITE_URL,
      },
      knowsAbout: [
        'Generative Engine Optimization',
        'Answer Engine Optimization',
        'AI Search',
        'SEO',
        'Digital Marketing',
      ],
      url: `${SITE_URL}/about/deepan-kanz/`,
      '@id': `${SITE_URL}/about/deepan-kanz/#person`,
      image: `${SITE_URL}${FOUNDER.imagePath}`,
      sameAs: FOUNDER.sameAs,
      description: FOUNDER.bio,
    })

    const profilePage = {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      name: 'Deepan Kanz, Founder & AI Search Specialist',
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/about/deepan-kanz/`,
      mainEntity: {
        '@type': 'Person',
        '@id': `${SITE_URL}/about/deepan-kanz/#person`,
        image: `${SITE_URL}${FOUNDER.imagePath}`,
        sameAs: FOUNDER.sameAs,
        name: 'Deepan Kanz',
        jobTitle: 'Founder & AI Search Specialist',
        worksFor: {
          '@type': 'Organization',
          name: 'Static Savvy Media',
          url: SITE_URL,
        },
      },
    }

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'About', item: `${SITE_URL}/about/` },
        { name: 'Deepan Kanz', item: `${SITE_URL}/about/deepan-kanz/` },
      ],
    })

    const scripts = [person, profilePage, breadcrumbs].map((data) => {
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
    <div className="about-template founder-v2">
      <Breadcrumbs />

      <section className="hv2 fv2-hero" aria-labelledby="fv2-title">
        <div className="hv2-wrap fv2-hero__grid">
          <div>
            <span className="hv2-eyebrow">Founder &amp; AI Search Specialist</span>
            <h1 id="fv2-title">Deepan Kanz, <span className="hv2-grad">Founder &amp; AI Search Specialist</span></h1>
            <p className="hv2-lead fv2-bio">{FOUNDER.bio}</p>
            <ul className="fv2-chips" aria-label="Focus areas">
              {['GEO', 'AEO', 'SEO', 'Local SEO', 'AI Search'].map((t) => <li key={t}>{t}</li>)}
            </ul>
            <div className="fv2-actions">
              <a className="hv2-btn hv2-btn--primary" href={whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp Deepan directly</a>
              <a className="hv2-btn hv2-btn--ghost" href="https://www.linkedin.com/in/deepankanz/" target="_blank" rel="noopener noreferrer">Connect on LinkedIn</a>
            </div>
          </div>
          <figure className="fv2-photo">
            <img src={deepanFounderImg} width={740} height={941} fetchPriority="high" alt="Deepan Kanz - Founder & AI Search Specialist" />
            <figcaption><b>Deepan Kanz</b><span>Founder, Static Savvy Media · Madurai</span></figcaption>
          </figure>
        </div>
      </section>

      <section className="hv2 hv2-section fv2-sec" aria-labelledby="fv2-roles">
        <div className="hv2-wrap fv2-two">
          <div>
            <span className="hv2-eyebrow">Background</span>
            <h2 className="hv2-h2" id="fv2-roles">The founder behind Static Savvy Media.</h2>
            <div className="fv2-prose">
              <p>Deepan Kanz founded Static Savvy Media with a single focus: building digital marketing that works in the era of AI search. His background in digital marketing spans SEO, paid search, social media and content strategy.</p>
              <p>His focus shifted in 2024, when AI search engines moved from experimental to mainstream. He spent that year building and testing GEO and AEO methodologies across Static Savvy Media’s client base, studying what made AI engines cite certain businesses and ignore others.</p>
              <p>The entity-building and answer-structured content approaches he developed now form the core of our <Link to="/services/geo-aeo-ai-search/">GEO &amp; AEO service</Link>, alongside <Link to="/services/seo/">SEO</Link> and <Link to="/services/local-seo/">Local SEO</Link> from our <Link to="/locations/madurai/">Madurai head office</Link>.</p>
            </div>
          </div>
          <dl className="fv2-roles">
            {ROLES.map((r) => <div key={r.k}><dt>{r.k}</dt><dd>{r.v}</dd></div>)}
          </dl>
        </div>
      </section>

      <section className="hv2 hv2-section fv2-sec fv2-sec--alt" aria-labelledby="fv2-leads">
        <div className="hv2-wrap">
          <span className="hv2-eyebrow">What he leads</span>
          <h2 className="hv2-h2" id="fv2-leads">Areas Deepan leads at Static Savvy Media.</h2>
          <ul className="fv2-cards">
            {LEADS.map((l) => (
              <li key={l.to}><Link to={l.to}><h3>{l.title}</h3><p>{l.text}</p><span className="hv2-link">Learn more <span className="hv2-arrow" aria-hidden="true">→</span></span></Link></li>
            ))}
          </ul>
          <p className="fv2-more">See how this work runs for clients on our <Link to="/about/">About page</Link>, <Link to="/case-studies/">client work</Link> and <Link to="/growth-audit/">free growth audit</Link>.</p>
        </div>
      </section>

      <section className="hv2 hv2-section fv2-sec" aria-labelledby="fv2-articles">
        <div className="hv2-wrap fv2-two fv2-two--even">
          <div>
            <span className="hv2-eyebrow">Articles</span>
            <h2 className="hv2-h2" id="fv2-articles">Guides written by Deepan.</h2>
            <ul className="fv2-articles">
              {ARTICLES.map((a) => <li key={a.to}><Link to={a.to}>{a.t}</Link></li>)}
            </ul>
            <p className="fv2-more"><Link className="hv2-link" to="/blog/">All articles on the blog <span className="hv2-arrow" aria-hidden="true">→</span></Link></p>
          </div>
          <div>
            <span className="hv2-eyebrow">Connect</span>
            <h2 className="hv2-h2">Connect with Deepan.</h2>
            <ul className="fv2-social">
              {SOCIAL.map((s) => <li key={s.href}><a href={s.href} target="_blank" rel="noopener noreferrer me"><b>{s.name}</b><span>{s.handle}</span><span aria-hidden="true">↗</span></a></li>)}
            </ul>
          </div>
        </div>
      </section>

      <FAQSection eyebrow="FAQ" title="About Deepan Kanz" faqs={FAQS} />

      <CTASection
        eyebrow="Consultation"
        title="Talk directly with Deepan about your digital marketing strategy."
        subtitle="For first conversations about GEO/AEO or SEO strategy, Deepan handles these personally for new clients."
        primaryLabel="WhatsApp Deepan Directly"
        primaryHref={whatsappHref}
        secondaryLabel="Learn more about Static Savvy Media"
        secondaryTo="/about/"
      />
      <ContactFormSection />
    </div>
  )
}
