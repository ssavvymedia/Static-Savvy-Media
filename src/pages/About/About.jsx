import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import ClientWork from '../../components/v2/ClientWork.jsx'
import Offices from '../../components/v2/Offices.jsx'
import { FounderBlock } from '../../components/v2/V2Blocks.jsx'
import FAQSection from '../../components/sections/FAQSection.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import ContactFormSection from '../../components/sections/ContactFormSection.jsx'
import '../../styles/pages/page-v2.css'
import { setSeo } from '../../utils/seo.js'
import { organizationSchema, faqPageSchema, breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL, GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from '../../utils/constants.js'
import aboutHeroImg from '../../assets/images/About/About.webp'

/* ============================================================
   CONTENT, Approved Static Savvy Media About Page Content
   ============================================================ */

const PAGE_TITLE = 'About Static Savvy Media | Madurai Digital Marketing Since 2021'

const PAGE_DESCRIPTION =
  'Meet the Madurai digital marketing agency founded by Deepan Kanz in 2021, rated 4.9★ from 106 Google reviews, with offices in Madurai, Thoothukudi and Rawang.'

const SERVICES = [
  { number: '01', title: 'SEO', text: 'Search engine optimisation designed to improve organic visibility and long-term discoverability.', path: '/services/seo/madurai/' },
  { number: '02', title: 'GEO & AEO', text: 'Generative Engine Optimization and Answer Engine Optimization designed to improve visibility inside AI-generated answers.', path: '/services/geo-aeo-ai-search/' },
  { number: '03', title: 'Local SEO', text: 'Google Business Profile and Google Maps optimisation for local and regional businesses.', path: '/services/local-seo/madurai/' },
  { number: '04', title: 'Google Ads', text: 'High-intent paid search campaigns designed to capture demand and generate measurable enquiries.', path: '/services/google-ads/' },
  { number: '05', title: 'Social Media Marketing', text: 'Platform-specific content and social strategies designed to build audience visibility and business credibility.', path: '/services/social-media-marketing/madurai/' },
  { number: '06', title: 'Website Design & Development', text: 'Conversion-focused websites designed with SEO, AI search visibility and WhatsApp-first enquiry generation in mind.', path: '/services/website-design-development/' },
  { number: '07', title: 'AI Business Automation', text: 'AI-powered workflows and automation systems that reduce manual work and help teams focus on growth.', path: '/services/ai-business-automation/' },
  { number: '08', title: 'Corporate Photography & Video', text: 'Professional brand imagery and video production from the Madurai studio, content designed to build trust before a word is read.', path: '/services/corporate-photography-video/' },
  { number: '09', title: 'AI Video Creation', text: 'Marketing-grade videos produced with AI to reduce production time and cost while maintaining professional presentation.', path: '/services/ai-video-creation/' },
  { number: '10', title: 'Product Photography & Creative Design', text: 'E-commerce-ready product imagery and graphic design designed to help turn browsers into buyers.', path: '/services/product-photography-creative-design/' },
]


const WHY_CHOOSE = [
  {
    title: 'GEO & AEO First',
    text: 'AI search visibility (GEO and AEO) is a core deliverable in our plans, not an afterthought.',
    icon: '✨',
  },
  {
    title: 'Transparent, Verified Results',
    text: "We track every metric that matters and report honestly, including what didn't work and why.",
    icon: '✔',
  },
  {
    title: 'WhatsApp-First by Design',
    text: 'Every campaign is built around driving qualified enquiries to WhatsApp, the channel Indian and Malaysian SMEs actually convert on.',
    icon: '💬',
  },
  {
    title: 'Local Market Depth',
    text: 'We understand the Madurai textile economy, the Thoothukudi port corridor and the Malaysian SME grant landscape, because we operate in all three.',
    icon: '🗺',
  },
]





const FAQS = [
  {
    question: 'What is Static Savvy Media?',
    answer: 'Static Savvy Media is an AI-first digital marketing agency serving businesses across Madurai, Thoothukudi and Malaysia with SEO, GEO, AEO, Local SEO, Google Ads, social media, website development and AI-powered digital solutions.',
  },
  {
    question: 'When was Static Savvy Media founded, and who founded it?',
    answer: 'Static Savvy Media was founded on 1 October 2021 by Deepan Kanz, who still leads strategy as founder. The agency started in Madurai, Tamil Nadu, which remains its headquarters.',
  },
  {
    question: 'Where is Static Savvy Media\u2019s head office?',
    answer: 'The head office is at 2nd Floor, 4/3, Srinivasa Perumal Koil St, Kamarajar Salai, Madurai 625009, Tamil Nadu. Malaysian clients are served from the Rawang, Selangor office. For Madurai services, see the Madurai digital marketing agency page at staticsavvymedia.com/locations/madurai/.',
  },
  {
    question: 'Where does Static Savvy Media operate?',
    answer: 'The agency operates across three key markets: Madurai, Tamil Nadu; Thoothukudi, Tamil Nadu; and Rawang & Selangor, Malaysia. The agency also works remotely with businesses across India, Singapore and Southeast Asia.',
  },
  {
    question: 'What makes Static Savvy Media different?',
    answer: 'Static Savvy Media treats AI search visibility as a primary digital marketing deliverable rather than an afterthought. The agency combines GEO/AEO with SEO, Local SEO, paid search, social media and conversion-focused digital systems.',
  },
  {
    question: 'Does Static Savvy Media work with businesses outside Tamil Nadu?',
    answer: 'Yes. Our head office is in Madurai and we have an office in Rawang, Selangor, so we work with businesses across Tamil Nadu and Malaysia, and remotely with clients elsewhere in India, in Singapore and in Dubai. The same team, process and monthly reporting apply wherever you are.',
  },
  {
    question: 'How do I get started?',
    answer: 'Send the free Growth Audit form or message us on WhatsApp at +91 99440 40345. We reply within 1 working day, review your website, Google Business Profile and competitors, and then suggest where to start, with no obligation to sign up.',
  },
]

/* ============================================================
   COMPONENT
   ============================================================ */

export default function About() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/about/`,
      ogType: 'website',
    })

    const faqEntities = FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    }))

    const org = organizationSchema({
      name: 'Static Savvy Media',
      description: PAGE_DESCRIPTION,
      foundingDate: '2021-10-01',
      founder: {
        '@type': 'Person',
        name: 'Deepan Kanz',
        url: `${SITE_URL}/about/deepan-kanz/`,
      },
      areaServed: [
        { '@type': 'City', name: 'Madurai' },
        { '@type': 'City', name: 'Thoothukudi' },
        { '@type': 'Country', name: 'Malaysia' },
      ],
    })

    const aboutPage = {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Static Savvy Media',
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/about/`,
      mainEntity: {
        '@type': 'Organization',
        name: 'Static Savvy Media',
        url: SITE_URL,
      },
    }

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'About', item: `${SITE_URL}/about/` },
      ],
    })

    const scripts = [org, aboutPage, faqPageSchema({ faqs: faqEntities }), breadcrumbs].map(
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
    <div className="about-template about-v2">
      <Breadcrumbs />

      <section className="hv2 pv2-hero" aria-labelledby="about-title">
        <div className="hv2-wrap pv2-hero__grid">
          <div>
            <span className="hv2-eyebrow">About Static Savvy Media</span>
            <h1 id="about-title">About Static Savvy Media: <span className="hv2-grad">AI-First Marketing Since 2021</span></h1>
            <p className="hv2-lead">Founded on 1 October 2021 by Deepan Kanz, Static Savvy Media is an AI-first digital marketing agency helping businesses become visible, discoverable and credible across traditional search, Google Maps and AI answers.</p>
            <ul className="pv2-stats" aria-label="Key facts">
              <li><b>{GOOGLE_RATING}★</b><span>from {GOOGLE_REVIEW_COUNT} Google reviews</span></li>
              <li><b>Since 2021</b><span>Founded 1 Oct 2021, Madurai</span></li>
              <li><b>3 offices</b><span>Madurai HQ, Thoothukudi, Rawang</span></li>
              <li><b>Tamil &amp; English</b><span>One team, monthly plans</span></li>
            </ul>
            <div className="pv2-actions">
              <Link className="hv2-btn hv2-btn--primary" to="/growth-audit/">Get a free growth audit</Link>
              <a className="hv2-btn hv2-btn--ghost" href={whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp {WHATSAPP_NUMBER}</a>
            </div>
          </div>
          <div className="pv2-hero__img">
            <img src={aboutHeroImg} width={1672} height={941} fetchPriority="high" alt="Static Savvy Media team and office in Madurai" />
          </div>
        </div>
      </section>

      <section className="hv2 hv2-section pv2-sec" aria-labelledby="about-story">
        <div className="hv2-wrap pv2-two">
          <div>
            <span className="hv2-eyebrow">Our story</span>
            <h2 className="hv2-h2" id="about-story">Why Static Savvy Media exists.</h2>
            <div className="pv2-prose">
              <p>The digital discovery landscape is changing. Search is no longer limited to traditional Google results: customers now find businesses on Google Maps, on social platforms and inside AI answers from ChatGPT, Gemini and Google AI Overviews.</p>
              <p>Deepan Kanz started the agency in Madurai to help local businesses become discoverable, credible and visible across all of those channels, and to turn that visibility into real conversations on WhatsApp, calls and forms.</p>
              <p>Today the same team serves Madurai, Thoothukudi and Malaysia from three offices. Read more about <Link to="/about/deepan-kanz/">our founder</Link>, see <Link to="/case-studies/">client work</Link> or read <Link to="/about/reviews/">our Google reviews</Link>.</p>
            </div>
          </div>
          <div>
            <span className="hv2-eyebrow">Our mission</span>
            <h2 className="hv2-h2">How we work.</h2>
            <ul className="pv2-list">
              {WHY_CHOOSE.map((w) => <li key={w.title}><b>{w.title}</b><span>{w.text}</span></li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="hv2 hv2-section pv2-sec pv2-sec--alt" aria-labelledby="about-services">
        <div className="hv2-wrap">
          <span className="hv2-eyebrow">What we do</span>
          <h2 className="hv2-h2" id="about-services">Our services.</h2>
          <ul className="pv2-services">
            {SERVICES.map((sv) => <li key={sv.path}><Link to={sv.path}>{sv.title}</Link></li>)}
          </ul>
        </div>
      </section>

      <Offices />
      <FounderBlock heading="Meet the founder." />
      <ClientWork />
      <FAQSection eyebrow="FAQ" title="Frequently Asked Questions" faqs={FAQS} />
      <CTASection
        eyebrow="Get started"
        title="Your business deserves to be found."
        subtitle="Let's build a digital presence that makes your business visible across search, social and AI."
        primaryLabel="WhatsApp for a Free Consultation"
        primaryHref={whatsappHref}
        secondaryLabel="Get a free growth audit"
        secondaryTo="/growth-audit/"
      />
      <ContactFormSection />
    </div>
  )
}
