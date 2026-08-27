import { useEffect, useRef } from 'react'
import HomeTemplate from '../../templates/HomeTemplate.jsx'
import { setSeo } from '../../utils/seo.js'
import { organizationSchema, webSiteSchema, faqPageSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL } from '../../utils/constants.js'

import maduraiImage from '../../assets/images/locations/madurai.png'
import thoothukudiImage from '../../assets/images/locations/thoothukudi.png'
import malaysiaImage from '../../assets/images/locations/malaysia.png'

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
    monogram: (
      <div className="premium-icon-container premium-icon-container--purple">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </div>
    ),
  },
  {
    slug: 'geo-aeo-ai-search',
    name: 'GEO & AEO, AI Search Optimization',
    path: '/services/geo-aeo-ai-search/',
    summary:
      'Our flagship service. We structure your online presence so ChatGPT, Perplexity, and Google AI Overviews cite your business as the authoritative answer in your category.',
    monogram: (
      <div className="premium-icon-container premium-icon-container--blue">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9.81 22.33a1.72 1.72 0 0 0 3.07 0l2-4.14 4.14-2a1.72 1.72 0 0 0 0-3.07l-4.14-2-2-4.14a1.72 1.72 0 0 0-3.07 0l-2 4.14-4.14 2a1.72 1.72 0 0 0 0 3.07l4.14 2z" />
        </svg>
      </div>
    ),
  },
  {
    slug: 'local-seo',
    name: 'Local SEO & Google Business Profile',
    path: '/services/local-seo/',
    summary:
      'Rank in Google Maps and local search for every city where your clients are looking, Madurai, Thoothukudi, and beyond.',
    monogram: (
      <div className="premium-icon-container premium-icon-container--cyan">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      </div>
    ),
  },
  {
    slug: 'google-ads',
    name: 'Google Ads & PPC',
    path: '/services/google-ads/',
    summary:
      'High-ROI paid search campaigns managed by certified specialists. Every rupee and ringgit tracked back to real business outcomes.',
    monogram: (
      <div className="premium-icon-container premium-icon-container--orange">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      </div>
    ),
  },
  {
    slug: 'social-media-marketing',
    name: 'Social Media Marketing',
    path: '/services/social-media-marketing/',
    summary:
      'Instagram, Facebook, and LinkedIn content and ad management that builds brand equity and drives qualified leads.',
    monogram: (
      <div className="premium-icon-container premium-icon-container--pink">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      </div>
    ),
  },
  {
    slug: 'website-design-development',
    name: 'Website Design & Development',
    path: '/services/website-design-development/',
    summary:
      'SEO-ready, Core Web Vitals-optimised websites built to convert. Next.js or WordPress chosen for your project, not ours.',
    monogram: (
      <div className="premium-icon-container premium-icon-container--purple">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      </div>
    ),
  },
  {
    slug: 'ai-business-automation',
    name: 'AI Business Automation',
    path: '/services/ai-business-automation/',
    summary:
      'Automate repetitive workflows, deploy AI chatbots, and integrate intelligent tools that free your team to focus on growth.',
    monogram: (
      <div className="premium-icon-container premium-icon-container--green">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </div>
    ),
  },
  {
    slug: 'corporate-photography-video',
    name: 'Corporate Photography & Video',
    path: '/services/corporate-photography-video/',
    summary:
      'Professional brand imagery and video production from our Madurai studio, content that builds trust before a word is read.',
    monogram: (
      <div className="premium-icon-container premium-icon-container--orange">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      </div>
    ),
  },
  {
    slug: 'ai-video-creation',
    name: 'AI Video Creation',
    path: '/services/ai-video-creation/',
    summary:
      'Marketing-grade videos produced with AI at a fraction of traditional production cost and in a fraction of the time.',
    monogram: (
      <div className="premium-icon-container premium-icon-container--blue">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M23 7l-7 5 7 5V7z" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      </div>
    ),
  },
  {
    slug: 'product-photography-creative-design',
    name: 'Product Photography & Creative Design',
    path: '/services/product-photography-creative-design/',
    summary:
      'E-commerce-ready product imagery and graphic design that converts browsers into buyers.',
    monogram: (
      <div className="premium-icon-container premium-icon-container--gold">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      </div>
    ),
  },
]

const MARKETS = [
  {
    slug: 'madurai',
    name: (
      <>
        <div className="location-card__image-wrapper">
          <img src={maduraiImage} alt="Madurai cityscape landmark" />
        </div>
        <span className="location-card__title-text">Madurai, Tamil Nadu</span>
      </>
    ),
    path: '/locations/madurai/',
    summary:
      'Our headquarters. Deep local knowledge across textiles, education, healthcare, hospitality, and retail.',
  },
  {
    slug: 'thoothukudi',
    name: (
      <>
        <div className="location-card__image-wrapper">
          <img src={thoothukudiImage} alt="Thoothukudi harbour coastal scenery" />
        </div>
        <span className="location-card__title-text">Thoothukudi (Tuticorin), Tamil Nadu</span>
      </>
    ),
    path: '/locations/thoothukudi/',
    summary:
      "Serving the port city's industrial, marine, and manufacturing businesses with B2B and B2C digital marketing.",
  },
  {
    slug: 'malaysia',
    name: (
      <>
        <div className="location-card__image-wrapper">
          <img src={malaysiaImage} alt="Selangor Malaysia cityscape skyline" />
        </div>
        <span className="location-card__title-text">Rawang & Selangor, Malaysia</span>
      </>
    ),
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
  label: (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', verticalAlign: 'middle' }}>
      <svg width="20" height="20" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} aria-hidden="true">
        <path fill="#ffffff" d="M45 0C20.1 0 0 20.1 0 45C0 53.6 2.4 61.6 6.6 68.5L1.5 87.2L20.8 82.3C27.6 86.4 35.5 88.7 44.1 88.7C69 88.7 89.1 68.6 89.1 43.7C89.1 19.6 69.1 0 45 0Z"/>
        <path fill="#25d366" d="M45 6.7C23.9 6.7 6.7 23.9 6.7 45C6.7 52.3 8.7 59.1 12.2 65L8.5 78.5L22.6 74.9C28.2 78.3 34.7 80.2 41.8 80.2C62.9 80.2 80.1 63 80.1 41.9C80.1 20.8 62.9 6.7 41.9 6.7H45Z"/>
        <path fill="#ffffff" d="M59.3 48.5C58.4 48 53.3 45.5 52.3 45.2C51.4 44.8 50.7 44.7 50.1 45.7C49.5 46.7 47.7 48.8 47.2 49.4C46.7 50 46.1 50.1 45.2 49.6C44.3 49.1 41.3 48.1 37.8 45C35.1 42.6 33.3 39.6 32.7 38.7C32.1 37.7 32.7 37.2 33.2 36.7C33.6 36.3 34.1 35.6 34.6 35C35.1 34.4 35.3 34 35.6 33.4C35.9 32.8 35.8 32.3 35.6 31.8C35.4 31.3 33.6 26.9 32.8 25.1C32.1 23.3 31.3 23.5 30.7 23.5C30.2 23.5 29.5 23.5 28.9 23.5C28.3 23.5 27.2 23.7 26.3 24.7C25.4 25.7 22.8 28.2 22.8 33.2C22.8 38.2 26.4 43.1 26.9 43.8C27.4 44.5 34.1 54.8 44.3 59.2C46.7 60.2 48.6 60.8 50 61.3C52.4 62.1 54.6 62 56.3 61.7C58.2 61.4 62.1 59.3 62.9 57C63.7 54.7 63.7 52.7 63.5 52.3C63.3 51.9 62.7 51.7 61.8 51.2L59.3 48.5Z"/>
      </svg>
      <span>WhatsApp: +91-99440-40345</span>
    </span>
  ),
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
    <>
      <style>{`
        /* --- Service Badges & Containers --- */
        .home-template .service-card__badge {
          border-radius: 50% !important;
          background: none !important;
          box-shadow: none !important;
          padding: 0 !important;
          width: 3.25rem !important;
          height: 3.25rem !important;
        }

        .home-template .service-card__badge .premium-icon-container {
          width: 100% !important;
          height: 100% !important;
          margin: 0 !important;
        }

        /* --- Premium Centralized CSS overrides --- */
        .premium-icon-container {
          width: 3.25rem;
          height: 3.25rem;
          border-radius: 50% !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          color: #ffffff !important;
          flex-shrink: 0 !important;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border: none !important;
          box-sizing: border-box !important;
          background-clip: padding-box !important;
        }

        .premium-icon-container svg {
          width: 1.35rem !important;
          height: 1.35rem !important;
          color: #ffffff !important;
        }

        .premium-icon-container--purple {
          background: linear-gradient(135deg, #a855f7, #7c3aed) !important;
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.35) !important;
        }

        .premium-icon-container--blue {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8) !important;
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.35) !important;
        }

        .premium-icon-container--cyan {
          background: linear-gradient(135deg, #06b6d4, #0891b2) !important;
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.35) !important;
        }

        .premium-icon-container--pink {
          background: linear-gradient(135deg, #ec4899, #db2777) !important;
          box-shadow: 0 0 15px rgba(236, 72, 153, 0.35) !important;
        }

        .premium-icon-container--orange {
          background: linear-gradient(135deg, #f97316, #ea580c) !important;
          box-shadow: 0 0 15px rgba(249, 115, 22, 0.35) !important;
        }

        .premium-icon-container--green {
          background: linear-gradient(135deg, #22c55e, #16a34a) !important;
          box-shadow: 0 0 15px rgba(34, 197, 94, 0.35) !important;
        }

        .premium-icon-container--gold {
          background: linear-gradient(135deg, #eab308, #ca8a04) !important;
          box-shadow: 0 0 15px rgba(234, 179, 8, 0.35) !important;
        }

        .home-template .service-card:hover .premium-icon-container {
          transform: translateY(-3px) scale(1.06) !important;
        }

        /* --- Redesigned Premium Service Card Numbers --- */
        .home-template .service-card__number {
          font-size: 1.55rem !important;
          font-weight: 900 !important;
          color: rgba(255, 255, 255, 0.45) !important;
          letter-spacing: 0.05em !important;
          text-shadow: 0 0 8px rgba(139, 92, 246, 0.25) !important;
          transition: color 0.3s ease, text-shadow 0.3s ease, transform 0.3s ease !important;
        }

        .home-template .service-card:hover .service-card__number {
          color: #ffffff !important;
          text-shadow: 0 0 15px rgba(139, 92, 246, 0.75), 0 0 25px rgba(34, 211, 238, 0.4) !important;
          transform: scale(1.05) !important;
        }

        /* --- Location Cards Visual Treatment --- */
        .home-template .location-card {
          overflow: hidden !important;
          padding-top: 1.75rem !important;
          position: relative !important;
        }

        .home-template .location-card__title {
          display: flex !important;
          flex-direction: column !important;
          margin-top: 0 !important;
        }

        .home-template .location-card__title-text {
          font-size: 1.15rem !important;
          font-weight: 700 !important;
          color: #fff !important;
        }

        .home-template .location-card__image-wrapper {
          margin: -1.75rem -1.75rem 1rem -1.75rem !important;
          height: 160px !important;
          overflow: hidden !important;
          border-top-left-radius: inherit !important;
          border-top-right-radius: inherit !important;
        }

        .home-template .location-card__image-wrapper img {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          transition: transform 0.3s ease !important;
        }

        .home-template .location-card:hover .location-card__image-wrapper img {
          transform: scale(1.05) !important;
        }

        /* --- Why Choose Section Styling --- */
        .home-template .why-choose__mark {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 3.25rem !important;
          height: 3.25rem !important;
          border-radius: 50% !important;
          margin-bottom: 1rem !important;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          position: relative !important;
        }

        .home-template .why-choose__mark::before {
          content: "" !important;
          display: block !important;
          width: 1.35rem !important;
          height: 1.35rem !important;
          background-size: contain !important;
          background-repeat: no-repeat !important;
          background-position: center !important;
        }

        .home-template .why-choose__card:hover .why-choose__mark {
          transform: translateY(-3px) scale(1.06) !important;
        }

        /* Card 1: GEO & AEO First */
        .home-template .why-choose__card:nth-child(1) .why-choose__mark {
          background: linear-gradient(135deg, #a855f7, #7c3aed) !important;
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.35) !important;
        }
        .home-template .why-choose__card:nth-child(1) .why-choose__mark::before {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z'/%3E%3Cpath d='M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z'/%3E%3Cpath d='M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'/%3E%3C/svg%3E") !important;
        }

        /* Card 2: Transparent, Verified Results */
        .home-template .why-choose__card:nth-child(2) .why-choose__mark {
          background: linear-gradient(135deg, #06b6d4, #0891b2) !important;
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.35) !important;
        }
        .home-template .why-choose__card:nth-child(2) .why-choose__mark::before {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'/%3E%3Cpath d='M9 11l2 2 4-4'/%3E%3C/svg%3E") !important;
        }

        /* Card 3: WhatsApp-First by Design */
        .home-template .why-choose__card:nth-child(3) .why-choose__mark {
          background: linear-gradient(135deg, #22c55e, #16a34a) !important;
          box-shadow: 0 0 15px rgba(34, 197, 94, 0.35) !important;
        }
        .home-template .why-choose__card:nth-child(3) .why-choose__mark::before {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'/%3E%3C/svg%3E") !important;
        }

        /* Card 4: Local Market Depth */
        .home-template .why-choose__card:nth-child(4) .why-choose__mark {
          background: linear-gradient(135deg, #f97316, #ea580c) !important;
          box-shadow: 0 0 15px rgba(249, 115, 22, 0.35) !important;
        }
        .home-template .why-choose__card:nth-child(4) .why-choose__mark::before {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolygon points='3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21'/%3E%3Cline x1='9' y1='3' x2='9' y2='18'/%3E%3Cline x1='15' y1='6' x2='15' y2='21'/%3E%3C/svg%3E") !important;
        }

        /* --- Redesigned Premium CTA Section --- */
        .home-template .cta-section {
          padding: 6rem 0 !important;
          position: relative !important;
          overflow: hidden !important;
        }

        /* Subtle decorative gradient background glow under cta-section */
        .home-template .cta-section::before {
          content: "" !important;
          position: absolute !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          width: 600px !important;
          height: 350px !important;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(34, 211, 238, 0.08) 50%, transparent 100%) !important;
          filter: blur(80px) !important;
          pointer-events: none !important;
          z-index: 1 !important;
        }

        .home-template .cta-section__panel {
          position: relative !important;
          z-index: 2 !important;
          background: linear-gradient(135deg, rgba(30, 27, 75, 0.45) 0%, rgba(15, 23, 42, 0.6) 100%) !important;
          backdrop-filter: blur(16px) !important;
          border: 1px solid rgba(139, 92, 246, 0.25) !important;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(139, 92, 246, 0.15) !important;
          padding: 4.5rem 3rem !important;
          border-radius: 24px !important;
          max-width: 950px !important;
          margin: 0 auto !important;
        }

        .home-template .cta-section .section-heading__title {
          font-size: 2.25rem !important;
          font-weight: 800 !important;
          letter-spacing: -0.02em !important;
          margin-bottom: 1rem !important;
          line-height: 1.25 !important;
          background: linear-gradient(135deg, #ffffff 60%, #cbd5e1 100%) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
        }

        .home-template .cta-section .section-heading__subtitle {
          font-size: 1.125rem !important;
          color: #94a3b8 !important;
          max-width: 600px !important;
          margin: 0 auto 2.5rem auto !important;
        }

        .home-template .cta-section .hero__actions {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          margin-top: 0 !important;
          gap: 1.5rem !important;
        }

        .home-template .cta-section .btn {
          padding: 1rem 2.25rem !important;
          font-weight: 700 !important;
          font-size: 1.1rem !important;
          border-radius: 9999px !important;
          box-shadow: 0 4px 20px rgba(37, 211, 102, 0.35) !important;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease !important;
        }

        .home-template .cta-section .btn--primary {
          background: #25d366 !important;
          border-color: #25d366 !important;
          color: #ffffff !important;
        }

        .home-template .cta-section .btn--primary:hover {
          background: #20ba5a !important;
          border-color: #20ba5a !important;
          transform: translateY(-2px) scale(1.02) !important;
          box-shadow: 0 6px 25px rgba(37, 211, 102, 0.5) !important;
        }

        @media (max-width: 768px) {
          .home-template .cta-section__panel {
            padding: 3rem 1.5rem !important;
          }
          .home-template .cta-section .section-heading__title {
            font-size: 1.75rem !important;
          }
        }
      `}</style>

      <HomeTemplate
        hero={HERO}
        services={SERVICES}
        markets={MARKETS}
        whyChoose={WHY_CHOOSE}
        faqs={FAQS}
        cta={CTA}
        whatsappHref={whatsappHref}
      />
    </>
  )
}