import { useEffect, useRef } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import SectionHeading from '../../components/common/SectionHeading.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import FAQSection from '../../components/sections/FAQSection.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import ContactFormSection from '../../components/sections/ContactFormSection.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import { breadcrumbListSchema, faqPageSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL } from '../../utils/constants.js'
import '../../styles/pages/pricing-hub.css'
import pricingHeroImg from '../../assets/images/Pricing/PricingMain.webp'

const PACKAGES = [
  {
    name: 'Starter',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
    ),
    description: 'For businesses new to digital marketing or with constrained budgets. Core deliverables, no long-term commitment, real results at a manageable investment level.',
  },
  {
    name: 'Growth',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
    ),
    description: 'For businesses ready to invest in a more comprehensive strategy. Higher deliverable volume, more data-driven optimisation, and more frequent reporting.',
  },
  {
    name: 'Scale',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
    ),
    description: 'For businesses with serious growth ambitions. Full-service engagement, dedicated account management, and the complete service stack working in integration.',
  },
]

function getServiceList(countrySlug) {
  const prefix = `/pricing/${countrySlug}`
  return [
    {
      name: 'SEO',
      path: `${prefix}/seo/`,
      descriptor: 'Search engine visibility & rankings',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      ),
    },
    {
      name: 'Local SEO',
      path: `${prefix}/local-seo/`,
      descriptor: 'Google Maps & local visibility',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
      ),
    },
    {
      name: 'Google Ads',
      path: `${prefix}/google-ads/`,
      descriptor: 'PPC campaigns & paid search',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
      ),
    },
    {
      name: 'Social Media Marketing',
      path: `${prefix}/social-media/`,
      descriptor: 'Social growth & content strategy',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/><path d="M2 8c0-2.2.7-4.3 2-6"/><path d="M22 8c0-2.2-.7-4.3-2-6"/></svg>
      ),
    },
    {
      name: 'Website Design',
      path: `${prefix}/website/`,
      descriptor: 'Web design & development',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
      ),
    },
    {
      name: 'AI Services',
      path: `${prefix}/ai-services/`,
      descriptor: 'AI automation & AEO/GEO',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
      ),
    },
    {
      name: 'Photography & Video',
      path: `${prefix}/photography-video/`,
      descriptor: 'Corporate & product visuals',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
      ),
    },
  ]
}

export default function Pricing({ country: propCountry }) {
  const { country: paramCountry } = useParams()
  const location = useLocation()
  const activeCountry = propCountry || paramCountry || (location.pathname.includes('/malaysia') ? 'malaysia' : 'india')
  const isMalaysia = activeCountry === 'malaysia'

  const currencySymbol = isMalaysia ? 'RM' : '₹'
  const currencyText = isMalaysia ? 'MYR, Malaysia' : 'INR, India'
  const countryName = isMalaysia ? 'Malaysia' : 'India'
  const currencyCode = isMalaysia ? 'MYR' : 'INR'

  const pageTitle = `Digital Marketing Pricing ${countryName} (${currencyCode}) | Static Savvy Media`
  const pageDescription = `Transparent digital marketing pricing for ${countryName}. SEO, Local SEO, Google Ads, Social Media, Website Design, AI Services, and Photography in ${currencyCode}.`
  const heroSubtitle = `Every package on this page is a real, buyable service. Prices are shown in ${currencyCode} (${countryName}). For custom requirements, message us on WhatsApp and we will build a proposal within 24 hours.`

  const faqs = [
    {
      question: 'Are there long-term contracts or lock-in periods?',
      answer: 'No. All retainer services are month-to-month. We ask for 30 days notice before ending an engagement. We do not charge cancellation fees or lock clients into annual contracts.',
    },
    {
      question: isMalaysia ? 'Do prices include SST?' : 'Do prices include GST?',
      answer: isMalaysia
        ? 'Prices displayed are exclusive of tax. SST at the applicable rate applies for Malaysian clients. Tax-compliant invoices are issued for all engagements.'
        : 'Prices displayed are exclusive of tax. 18% GST applies for Indian clients. Tax-compliant invoices are issued for all engagements.',
    },
    {
      question: 'Can I bundle services for a discount?',
      answer: 'Yes. Clients running three or more services receive a bundled rate. Contact us on WhatsApp for a multi-service proposal.',
    },
  ]

  const services = getServiceList(activeCountry)
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({ title: pageTitle, description: pageDescription, canonical: `${SITE_URL}/pricing/${activeCountry}/`, ogType: 'website' })
    const breadcrumbs = breadcrumbListSchema({ items: [
      { name: 'Home', item: `${SITE_URL}/` },
      { name: `${countryName} Pricing`, item: `${SITE_URL}/pricing/${activeCountry}/` },
    ]})
    const faq = faqPageSchema({ faqs })
    const scripts = [breadcrumbs, faq].map((data) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.text = JSON.stringify(data)
      document.head.appendChild(script)
      return script
    })
    jsonLdRef.current = scripts
    return () => { jsonLdRef.current.forEach((s) => s.remove()); jsonLdRef.current = [] }
  }, [activeCountry, countryName, pageTitle, pageDescription, faqs])

  const whatsappHref = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)

  return (
    <div className="pricing-hub-page">
      <Breadcrumbs />

      <HeroSection
        layout="two-column"
        eyebrow={`${countryName.toUpperCase()} PRICING`}
        title={`Transparent Pricing (${currencyCode}), Plans for Every Stage of Growth`}
        subtitle={heroSubtitle}
        actions={<Button href={whatsappHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">WhatsApp: +91 99440 40345</Button>}
      >
        <div className="hero__visual-side">
          <img
            src={pricingHeroImg}
            width={1536}
            height={1024}
            fetchPriority="high"
            alt={`${countryName} Digital Marketing Pricing`}
            className="hero__image"
          />
        </div>
      </HeroSection>

      <section className="section phub-transparency">
        <div className="container">
          <div className="phub-transparency__badges">
            <div className="phub-transparency__badge glass-card">
              <span className="phub-transparency__badge-symbol">{currencySymbol}</span>
              <span className="phub-transparency__badge-text">{currencyText}</span>
            </div>
            <div className="phub-transparency__badge glass-card">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span className="phub-transparency__badge-text">No Hidden Fees</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section phub-packages section--alt">
        <div className="container">
          <SectionHeading eyebrow="STRUCTURE" title="Our Package Structure" subtitle="" />
          <div className="phub-packages__grid">
            {PACKAGES.map((pkg, index) => (
              <ScrollReveal key={pkg.name} delay={index * 100}>
                <article className="phub-package glass-card">
                  <div className="phub-package__icon" aria-hidden="true">{pkg.icon}</div>
                  <h3 className="phub-package__name">{pkg.name}</h3>
                  <p className="phub-package__desc">{pkg.description}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section phub-services">
        <div className="container">
          <SectionHeading eyebrow="SERVICE PRICING" title={`Find the Right ${countryName} Plan for Your Service`} subtitle={`Transparent ${currencyCode} packages for each service.`} />
          <div className="phub-services__grid">
            {services.map((svc, index) => (
              <ScrollReveal key={svc.path} delay={index * 80}>
                <Link to={svc.path} className="phub-service glass-card">
                  <div className="phub-service__icon" aria-hidden="true">{svc.icon}</div>
                  <div className="phub-service__content">
                    <h3 className="phub-service__name">{svc.name}</h3>
                    <p className="phub-service__descriptor">{svc.descriptor}</p>
                  </div>
                  <span className="phub-service__cta">
                    View Pricing
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <FAQSection
        eyebrow="FAQ"
        title="Pricing, Common Questions"
        faqs={faqs}
      />

      <CTASection
        eyebrow=""
        title="Need a Custom Proposal?"
        subtitle="For custom requirements, message us on WhatsApp and we will build a proposal within 24 hours."
        primaryLabel={'💬 WhatsApp Us'}
        primaryHref={whatsappHref}
      />

      <ContactFormSection />
    </div>
  )
}
