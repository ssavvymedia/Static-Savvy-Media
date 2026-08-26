import { useEffect, useRef } from 'react'
import HomeTemplate from '../../templates/HomeTemplate.jsx'
import { setSeo } from '../../utils/seo.js'
import { organizationSchema, webSiteSchema, faqPageSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL } from '../../utils/constants.js'

const PAGE_TITLE =
  'Digital Marketing Agency Madurai, SEO, GEO & AI Search | Static Savvy Media'

const PAGE_DESCRIPTION =
  "Static Savvy Media: Madurai's AI-powered digital marketing agency. SEO, GEO/AEO, Local SEO, and Google Ads for Tamil Nadu and Malaysia businesses. WhatsApp: +91-99440-40345."

const HERO = {
  eyebrow: 'Premium Digital Marketing Agency',
  title: (
    <>
      Get Found by Google. Get Cited by ChatGPT.{' '}
      <span className="text-gradient">Win Clients from Both.</span>
    </>
  ),
  intro:
    'Your next client is not just searching Google. They are asking ChatGPT. They are querying Perplexity. They are using AI-powered voice search. Static Savvy Media is the digital marketing agency built for this new reality, the only agency in Tamil Nadu purpose-built to get your business visible across traditional search and AI-powered answer engines.',
}

const SERVICES = [
  {
    slug: 'seo',
    name: 'Search Engine Optimization (SEO)',
    path: '/services/seo/',
    summary:
      'Technical SEO, keyword strategy, content development, and link building that drives consistent organic traffic growth month on month.',
  },
  {
    slug: 'geo-aeo-ai-search',
    name: 'GEO & AEO, AI Search Optimization',
    path: '/services/geo-aeo-ai-search/',
    summary:
      'Our flagship service. We structure your online presence so ChatGPT, Perplexity, and Google AI Overviews cite your business as the authoritative answer in your category.',
  },
  {
    slug: 'local-seo',
    name: 'Local SEO & Google Business Profile',
    path: '/services/local-seo/',
    summary:
      'Rank in Google Maps and local search for every city where your clients are looking, Madurai, Thoothukudi, and beyond.',
  },
  {
    slug: 'google-ads',
    name: 'Google Ads & PPC',
    path: '/services/google-ads/',
    summary:
      'High-ROI paid search campaigns managed by certified specialists. Every rupee and ringgit tracked back to real business outcomes.',
  },
  {
    slug: 'social-media-marketing',
    name: 'Social Media Marketing',
    path: '/services/social-media-marketing/',
    summary:
      'Instagram, Facebook, and LinkedIn content and ad management that builds brand equity and drives qualified leads.',
  },
  {
    slug: 'website-design-development',
    name: 'Website Design & Development',
    path: '/services/website-design-development/',
    summary:
      'SEO-ready, Core Web Vitals-optimised websites built to convert. Next.js or WordPress chosen for your project, not ours.',
  },
  {
    slug: 'ai-business-automation',
    name: 'AI Business Automation',
    path: '/services/ai-business-automation/',
    summary:
      'Automate repetitive workflows, deploy AI chatbots, and integrate intelligent tools that free your team to focus on growth.',
  },
  {
    slug: 'corporate-photography-video',
    name: 'Corporate Photography & Video',
    path: '/services/corporate-photography-video/',
    summary:
      'Professional brand imagery and video production from our Madurai studio, content that builds trust before a word is read.',
  },
  {
    slug: 'ai-video-creation',
    name: 'AI Video Creation',
    path: '/services/ai-video-creation/',
    summary:
      'Marketing-grade videos produced with AI at a fraction of traditional production cost and in a fraction of the time.',
  },
  {
    slug: 'product-photography-creative-design',
    name: 'Product Photography & Creative Design',
    path: '/services/product-photography-creative-design/',
    summary:
      'E-commerce-ready product imagery and graphic design that converts browsers into buyers.',
  },
]

const MARKETS = [
  {
    slug: 'madurai',
    name: 'Madurai, Tamil Nadu',
    path: '/locations/madurai/',
    summary:
      'Our headquarters. Deep local knowledge across textiles, education, healthcare, hospitality, and retail.',
  },
  {
    slug: 'thoothukudi',
    name: 'Thoothukudi (Tuticorin), Tamil Nadu',
    path: '/locations/thoothukudi/',
    summary:
      "Serving the port city's industrial, marine, and manufacturing businesses with B2B and B2C digital marketing.",
  },
  {
    slug: 'malaysia',
    name: 'Rawang & Selangor, Malaysia',
    path: '/locations/malaysia/',
    summary:
      'SME-focused digital marketing with grant-aware strategies. We help Malaysian businesses leverage MDEC and SMECorp digital transformation programmes.',
  },
]

const WHY_CHOOSE = [
  {
    title: 'GEO & AEO First',
    description:
      'The only agency in Tamil Nadu that treats AI search visibility as a primary deliverable, not an afterthought.',
  },
  {
    title: 'Transparent, Verified Results',
    description:
      "We track every metric that matters and report honestly, including what didn't work and why.",
  },
  {
    title: 'WhatsApp-First by Design',
    description:
      'Every campaign is built around driving qualified enquiries to WhatsApp, the channel Indian and Malaysian SMEs actually convert on.',
  },
  {
    title: 'Local Market Depth',
    description:
      'We understand the Madurai textile economy, the Thoothukudi port corridor, and the Malaysian SME grant landscape, because we operate in all three.',
  },
]

const FAQS = [
  {
    question: 'What is GEO and AEO, and why does my business need it?',
    answer:
      'GEO (Generative Engine Optimization) and AEO (Answer Engine Optimization) are strategies that get your business cited inside AI-generated answers, from ChatGPT, Perplexity, and Google AI Overviews. In 2026, AI search is the fastest-growing discovery channel. If your business is not visible there, you are losing clients to competitors who are.',
  },
  {
    question: 'Do you work with businesses outside Tamil Nadu?',
    answer:
      'Yes. We have active offices in Madurai, Thoothukudi, and Rawang, Malaysia. We work remotely with clients across India, Singapore, and Southeast Asia.',
  },
  {
    question: 'How do I get started with Static Savvy Media?',
    answer:
      'The fastest way is WhatsApp, message us at +91-99440-40345. We typically respond within the hour during business hours and will discuss your goals and the right starting point for your business.',
  },
  {
    question: 'Can Malaysian SMEs use government grants to fund your services?',
    answer:
      'Yes. Several of our digital marketing services are eligible for MDEC and SMECorp grant funding. We help qualifying Malaysian clients navigate the application process. Contact us on WhatsApp for details specific to your business.',
  },
]

const CTA = {
  title: 'Ready to be found everywhere your clients are looking?',
  subtitle: 'Message us on WhatsApp, we respond within the hour, every business day.',
  label: 'WhatsApp: +91-99440-40345',
}

export default function Home() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/`,
      ogType: 'website',
    })

    const faqEntities = FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    }))

    const scripts = [
      organizationSchema({ name: 'Static Savvy Media' }),
      webSiteSchema({ name: 'Static Savvy Media' }),
      faqPageSchema({ faqs: faqEntities }),
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
    <HomeTemplate
      hero={HERO}
      services={SERVICES}
      markets={MARKETS}
      whyChoose={WHY_CHOOSE}
      faqs={FAQS}
      cta={CTA}
      whatsappHref={whatsappHref}
    />
  )
}