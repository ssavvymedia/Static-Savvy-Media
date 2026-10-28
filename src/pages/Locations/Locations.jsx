import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import SectionHeading from '../../components/common/SectionHeading.jsx'
import FAQSection from '../../components/sections/FAQSection.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import ContactFormSection from '../../components/sections/ContactFormSection.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import { breadcrumbListSchema, faqPageSchema } from '../../utils/schema.js'
import { buildWhatsAppLink, cx } from '../../utils/helpers.js'
import {
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
  SITE_URL,
} from '../../utils/constants.js'
import '../../styles/pages/locations-hub.css'
import locationHeroImg from '../../assets/images/locations/Locationmain.webp'

const PAGE_TITLE =
  'Our Locations, Madurai, Thoothukudi & Malaysia | Static Savvy Media'

const PAGE_DESCRIPTION =
  'Static Savvy Media offices in Madurai, Thoothukudi, and Rawang, Selangor (Malaysia). Premium digital marketing, SEO, GEO/AEO, Google Ads, and AI automation, for businesses across Tamil Nadu and Malaysia.'

const HERO_SUBTITLE =
  'We are genuinely local. Tamil-speaking team. Offices in Madurai, Thoothukudi, and Rawang. We understand the markets we serve from the inside.'

const INTRO_TEXT =
  'Static Savvy Media operates across three markets, Madurai, Thoothukudi, and Rawang, Selangor (Malaysia). Each location brings deep local knowledge, industry understanding, and market-specific digital marketing strategies. We do not apply a one-size-fits-all approach. We build around how each market actually works, from local search behaviour and AI visibility to paid campaigns, content, and conversion-focused websites.'

const LOCATIONS = [
  {
    number: '01',
    name: 'Madurai',
    badge: 'HQ',
    description:
      'Madurai is not just our headquarters, it is our home market. We understand the Madurai business landscape because we have built our own business here: the textile corridor, the education institutions driving student demand, the healthcare cluster, the hospitality businesses serving pilgrims and tourists at Meenakshi Amman Temple, and the growing retail ecosystem. When we build digital marketing for Madurai businesses, we build for the city we live in.',
    services: [
      'Search Engine Optimization (SEO)',
      'GEO & AEO / AI Search Optimization',
      'Local SEO & Google Business Profile',
    ],
    path: '/locations/madurai/',
    icon: 'madurai',
  },
  {
    number: '02',
    name: 'Thoothukudi',
    badge: 'Remote',
    description:
      'Fishing & Marine: From mechanized fishing boats to seafood export businesses, Thoothukudi’s marine sector is increasingly reaching buyers and suppliers online. We help marine businesses build the digital presence needed to access modern B2B and B2C channels.',
    note: 'Our primary office is in Madurai. We serve Thoothukudi clients remotely with in-person meetings available by appointment.',
    services: [
      'Port & Marine Digital Marketing',
      'Industrial B2B Visibility',
      'Fishing & Seafood Export Presence',
    ],
    path: '/locations/thoothukudi/',
    icon: 'thoothukudi',
  },
  {
    number: '03',
    name: 'Malaysia',
    badge: 'Grant-Eligible',
    description:
      'Malaysia’s digital economy is one of Southeast Asia’s fastest growing, and the Malaysian government has invested significantly in helping SMEs digitize through grant programmes. If you are a Malaysian SME and have not yet used MDEC, SMECorp, or other digital transformation grants to fund your digital marketing investment, you are leaving money on the table.',
    services: [
      'SEO, GEO/AEO & Google Ads',
      'AI Automation for SMEs',
      'MDEC & SMECorp Grant-Eligible Services',
    ],
    path: '/locations/malaysia/',
    icon: 'malaysia',
  },
  {
    number: '04',
    name: 'Kuala Lumpur',
    badge: 'Klang Valley',
    description:
      'Serving Kuala Lumpur and the Klang Valley from our Rawang, Selangor office: SEO for google.com.my in English and Bahasa Malaysia, Google Ads, social media and WhatsApp automation.',
    services: ['SEO in Kuala Lumpur', 'Google Ads & Social Media', 'WhatsApp & AI Automation'],
    path: '/locations/kuala-lumpur/',
    icon: 'malaysia',
  },
  {
    number: '05',
    name: 'Chennai',
    badge: 'Remote · Madurai HQ',
    description:
      'Locality-level SEO, Google Business Profile and tightly geo-targeted ads for Chennai clinics, manufacturers, IT firms and retailers, run from our Madurai head office.',
    services: ['Locality SEO & GBP', 'Google Ads', 'GEO/AEO'],
    path: '/locations/chennai/',
    icon: 'pin',
  },
  {
    number: '06',
    name: 'Coimbatore',
    badge: 'Remote · Madurai HQ',
    description:
      'Product-catalogue websites, SEO, LinkedIn and Google Ads for Coimbatore pump, motor, textile-machinery and engineering manufacturers, plus clinics and retail.',
    services: ['B2B SEO & websites', 'LinkedIn for buyers', 'Product photography'],
    path: '/locations/coimbatore/',
    icon: 'pin',
  },
  {
    number: '07',
    name: 'Trichy',
    badge: 'Near Madurai HQ',
    description:
      'Local SEO and ads that reach patients, students and pilgrims coming to Trichy from Karur, Pudukkottai, Perambalur, Ariyalur and Thanjavur.',
    services: ['Local SEO & GBP', 'Admissions campaigns', 'Hospital marketing'],
    path: '/locations/trichy/',
    icon: 'pin',
  },
  {
    number: '08',
    name: 'Salem',
    badge: 'Remote · Madurai HQ',
    description:
      'Google Maps, websites and product pages for Salem sago and food units, steel and engineering suppliers, silk weavers, clinics and Yercaud tourism.',
    services: ['GBP clean-up', 'Product pages', 'WhatsApp catalogues'],
    path: '/locations/salem/',
    icon: 'pin',
  },
  {
    number: '09',
    name: 'Tirunelveli',
    badge: 'Near Thoothukudi office',
    description:
      'Online ordering for Tirunelveli sweets and food brands, admissions marketing for Palayamkottai institutions, and local SEO for retailers.',
    services: ['E-commerce & GBP', 'Festival campaigns', 'Education marketing'],
    path: '/locations/tirunelveli/',
    icon: 'pin',
  },
  {
    number: '10',
    name: 'Tiruppur',
    badge: 'Remote · Madurai HQ',
    description:
      'Capability websites, SEO and LinkedIn for Tiruppur knitwear exporters, private-label manufacturers and job-work units.',
    services: ['B2B export websites', 'LinkedIn & SEO', 'Factory photography'],
    path: '/locations/tiruppur/',
    icon: 'pin',
  },
  {
    number: '11',
    name: 'Selangor',
    badge: 'Rawang office',
    description:
      'Petaling Jaya, Shah Alam, Subang Jaya and Klang, served from our office in Rawang, Selangor. Prices in MYR.',
    services: ['SEO & GBP', 'Google Ads', 'Bahasa Malaysia content'],
    path: '/locations/selangor/',
    icon: 'malaysia',
  },
  {
    number: '12',
    name: 'Singapore',
    badge: 'Remote · MY & IN',
    description:
      'Google Business Profile, SEO and AI-search optimisation for Singapore SMEs, run remotely on Singapore time. Prices in SGD.',
    services: ['GBP & local SEO', 'GEO/AEO', 'Answer-first pages'],
    path: '/locations/singapore/',
    icon: 'malaysia',
  },
  {
    number: '13',
    name: 'Dubai',
    badge: 'Remote · India',
    description:
      'Map-pack, SEO and AI-search work for Dubai SMEs, run remotely from India, 1.5 hours ahead of Dubai. Prices in AED.',
    services: ['GBP & local SEO', 'GEO/AEO', 'Google Ads'],
    path: '/locations/dubai/',
    icon: 'malaysia',
  },
]

const FAQS = [
  {
    question: 'Where are Static Savvy Media offices located?',
    answer:
      'We have offices in Madurai (headquarters), Thoothukudi, and Rawang, Selangor (Malaysia). Our Madurai office is our primary base, and we serve clients across Tamil Nadu and Malaysia from there.',
  },
  {
    question: 'Do you serve clients outside your office locations?',
    answer:
      'Yes. We work with clients across India, Singapore, and Southeast Asia. Our digital marketing services are delivered remotely with in-person meetings available by appointment.',
  },
  {
    question: 'Can Malaysian SMEs use government grants to fund your services?',
    answer:
      'Yes. Several of our digital marketing services are eligible for MDEC and SMECorp grant funding. We help qualifying Malaysian clients navigate the application process. Contact us on WhatsApp for details specific to your business.',
  },
  {
    question: 'Do you have a physical office in Thoothukudi?',
    answer:
      'Our primary office is in Madurai. We serve Thoothukudi clients remotely with in-person meetings available by appointment.',
  },
]

const ICONS = {
  madurai: (
    <>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </>
  ),
  thoothukudi: (
    <>
      <path d="M2 20h20" />
      <path d="M5 20V8l7-5 7 5v12" />
      <path d="M9 20v-6h6v6" />
      <path d="M10 10h.01M14 10h.01" />
    </>
  ),
  malaysia: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
  pin: (
    <>
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  check: <path d="M20 6L9 17l-5-5" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
}

function HubIcon({ name, size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name] || null}
    </svg>
  )
}

export default function Locations() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/locations/`,
      ogType: 'website',
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Locations', item: `${SITE_URL}/locations/` },
      ],
    })

    const faqEntities = FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    }))

    const faqSchema = faqPageSchema({ faqs: faqEntities })

    const scripts = [breadcrumbs, faqSchema].map((data) => {
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
    <div className="locations-hub">
      <Breadcrumbs />

      <HeroSection
        layout="two-column"
        eyebrow="LOCATIONS"
        title={
          <>
            Our Locations &mdash; Madurai, Thoothukudi{' '}
            <span className="text-gradient">&amp; Malaysia</span>
          </>
        }
        subtitle={HERO_SUBTITLE}
        actions={
          <>
            <Button href="#location-grid" variant="primary" size="lg">
              Explore Our Locations
            </Button>
            <Button
              href={whatsappHref}
              variant="ghost"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Talk to Our Team
            </Button>
          </>
        }
      >
        <div className="hero__visual-side">
          <img
            src={locationHeroImg}
            width={1536}
            height={1024}
            fetchPriority="high"
            alt="Our Locations - Madurai, Thoothukudi & Malaysia"
            className="hero__image"
          />
        </div>
      </HeroSection>

      <section className="section lh-intro">
        <div className="container">
          <ScrollReveal>
            <p className="lh-intro__text">{INTRO_TEXT}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section lh-cards" id="location-grid">
        <div className="container">
          <SectionHeading
            eyebrow="Our Markets"
            title="Where We Operate"
            subtitle="Each location brings deep local knowledge, industry understanding, and market-specific digital marketing strategies."
          />
          <div className="lh-cards__grid">
            {LOCATIONS.map((loc, index) => (
              <ScrollReveal key={loc.icon} delay={index * 80}>
                <article className="lh-card glass-card">
                  <div className="lh-card__top">
                    <span className="lh-card__number">{loc.number}</span>
                    <span className={cx('lh-card__badge', `lh-card__badge--${loc.icon}`)}>
                      {loc.badge}
                    </span>
                  </div>
                  <div className="lh-card__icon-row">
                    <span className={cx('lh-card__icon', 'icon-badge', index === 0 ? 'icon-badge--purple' : index === 1 ? 'icon-badge--blue' : 'icon-badge--cyan')} aria-hidden="true">
                      <HubIcon name={loc.icon} size={24} />
                    </span>
                    <h3 className="lh-card__title">{loc.name}</h3>
                  </div>
                  <p className="lh-card__text">{loc.description}</p>
                  {loc.note && <p className="lh-card__note">{loc.note}</p>}
                  <ul className="lh-card__services">
                    {loc.services.map((service) => (
                      <li key={service} className="lh-card__service">
                        <span className="lh-card__check" aria-hidden="true">
                          <HubIcon name="check" size={14} />
                        </span>
                        {service}
                      </li>
                    ))}
                  </ul>
                  <Link to={loc.path} className="lh-card__link">
                    Explore {loc.name}
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section lh-presence section--alt">
        <div className="container">
          <SectionHeading
            eyebrow="Why Us"
            title="Genuinely Local. Truly Digital."
          />
          <div className="lh-presence__grid">
            <ScrollReveal>
              <div className="lh-presence__card glass-card">
                <span className="lh-presence__icon icon-badge icon-badge--purple" aria-hidden="true">
                  <HubIcon name="madurai" size={22} />
                </span>
                <h3 className="lh-presence__title">Headquarters</h3>
                <p className="lh-presence__text">
                  Madurai is our home market. We understand the textile corridor, education
                  institutions, healthcare cluster, hospitality businesses, and the growing retail
                  ecosystem.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div className="lh-presence__card glass-card">
                <span className="lh-presence__icon icon-badge icon-badge--blue" aria-hidden="true">
                  <HubIcon name="thoothukudi" size={22} />
                </span>
                <h3 className="lh-presence__title">Regional Reach</h3>
                <p className="lh-presence__text">
                  Serving Thoothukudi clients remotely with in-person meetings available by
                  appointment. Deep knowledge of the port city's industrial and marine sectors.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <div className="lh-presence__card glass-card">
                <span className="lh-presence__icon icon-badge icon-badge--cyan" aria-hidden="true">
                  <HubIcon name="malaysia" size={22} />
                </span>
                <h3 className="lh-presence__title">International</h3>
                <p className="lh-presence__text">
                  Malaysia office in Rawang, Selangor. Grant-eligible digital marketing for
                  Malaysian SMEs through MDEC and SMECorp digital transformation programmes.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <FAQSection
        faqs={FAQS}
        eyebrow="Questions"
        title="Frequently Asked Questions"
        subtitle="Common questions about our locations and service coverage."
      />

      <CTASection
        title="Ready to Grow Your Business Locally?"
        subtitle="Message us on WhatsApp, we respond within the hour, every business day."
        primaryLabel="WhatsApp: +91 99440 40345"
        primaryHref={whatsappHref}
        secondaryLabel="Explore Our Services"
        secondaryTo="/services/"
      />
      <ContactFormSection />
    </div>
  )
}
