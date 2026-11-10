import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import ContactFormSection from '../../components/sections/ContactFormSection.jsx'
import FAQSection from '../../components/sections/FAQSection.jsx'
import Offices from '../../components/v2/Offices.jsx'
import { setSeo } from '../../utils/seo.js'
import { localBusinessSchema, breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, SITE_URL, SITE_NAME, MALAYSIA_OFFICE, ORG_SAME_AS, CONTACT_EMAIL, GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from '../../utils/constants.js'
import '../../styles/pages/home-v2.css'
import '../../styles/pages/page-v2.css'

const WHATSAPP_MSG_GENERAL = 'Hi Static Savvy Media, I would like to know more about your services.'

const FAQS = [
  { question: 'How quickly will you reply?', answer: 'We reply within one business day (Mon–Sat, 9:00 AM–6:30 PM IST). WhatsApp +91 99440 40345 is usually the fastest way to reach us.' },
  { question: 'Which number should I use in Malaysia?', answer: `Call our Malaysia office on ${MALAYSIA_OFFICE.phoneDisplay} (${MALAYSIA_OFFICE.hoursDisplay}). WhatsApp stays on +91 99440 40345 for all markets.` },
  { question: 'Can I visit your office?', answer: 'Yes. Our head office is at 2nd Floor, 4/3, Srinivasa Perumal Koil St, Kamarajar Salai, Madurai 625009. The Thoothukudi and Rawang offices take meetings by appointment.' },
  { question: 'What happens after I send the form?', answer: 'Our Madurai team reviews your website, Google Business Profile and competitors, then calls or WhatsApps you to agree the next step. There is no obligation and no lock-in.' },
]

export default function Contact() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: 'Contact Static Savvy Media | Madurai, Thoothukudi & Malaysia',
      description: 'Contact Static Savvy Media for SEO, GEO/AEO, Local SEO, Google Ads, websites, social media, AI automation and creative services.',
      canonical: `${SITE_URL}/contact/`,
      ogType: 'website',
    })

    const contactPage = {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Static Savvy Media',
      url: `${SITE_URL}/contact/`,
      mainEntity: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        email: 'info@staticsavvymedia.com',
        sameAs: ORG_SAME_AS,
        telephone: '+91 99440 40345',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+91 99440 40345',
          contactType: 'customer service',
          availableLanguage: ['English', 'Tamil'],
        },
      },
    }

    const localBiz = localBusinessSchema({
      telephone: '+91 99440 40345',
      areaServed: ['Madurai', 'Thoothukudi', 'Malaysia'],
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Contact', item: `${SITE_URL}/contact/` },
      ],
    })

    const scripts = [contactPage, localBiz, breadcrumbs].map((data) => {
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

  const whatsappGeneral = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MSG_GENERAL)

  return (
    <div className="contact-page contact-v2">
      <Breadcrumbs />
      <section className="hv2 pv2-hero" aria-labelledby="contact-title">
        <div className="hv2-wrap">
          <span className="hv2-eyebrow">Contact Static Savvy Media</span>
          <h1 id="contact-title">Let&apos;s Talk About Your <span className="hv2-grad">Digital Growth</span></h1>
          <p className="hv2-lead">Talk to our Madurai team on WhatsApp, call our Malaysia office, email us or send the form below. Rated {GOOGLE_RATING}★ from {GOOGLE_REVIEW_COUNT} Google reviews.</p>
          <ul className="pv2-channels" aria-label="Ways to contact us">
            <li><a href={whatsappGeneral} target="_blank" rel="noopener noreferrer" data-track="whatsapp_contact"><b>WhatsApp / call (India)</b><span>{WHATSAPP_NUMBER}</span></a></li>
            <li><a href={MALAYSIA_OFFICE.phoneHref} data-track="call_malaysia"><b>Call (Malaysia)</b><span>{MALAYSIA_OFFICE.phoneDisplay}</span></a></li>
            <li><a href={`mailto:${CONTACT_EMAIL}`} data-track="email_contact"><b>Email</b><span>{CONTACT_EMAIL}</span></a></li>
          </ul>
          <p className="pv2-actions" style={{ marginTop: 16 }}><Link className="hv2-link" to="/growth-audit/">Prefer a full review? Request a free growth audit <span className="hv2-arrow" aria-hidden="true">→</span></Link></p>
        </div>
      </section>
      <ContactFormSection />
      <Offices title="Visit or call an office." maps id="contact-offices" />
      <FAQSection eyebrow="FAQ" title="Contact questions" faqs={FAQS} />
    </div>
  )
}
