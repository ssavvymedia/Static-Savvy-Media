import { useEffect, useRef } from 'react'
import HubTemplate from '../../templates/HubTemplate.jsx'
import ServicesGrid from '../../components/sections/ServicesGrid.jsx'
import { setSeo } from '../../utils/seo.js'
import { organizationSchema, breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL } from '../../utils/constants.js'
import '../../styles/pages/service.css'

const PAGE_TITLE =
  'Digital Marketing Services, SEO, GEO/AEO, Ads & More | Static Savvy Media'

const PAGE_DESCRIPTION =
  'Digital marketing services in Madurai, SEO, GEO/AEO, Local SEO, Google Ads, social media, website design and AI automation from Static Savvy Media. WhatsApp: +91-99440-40345.'

const INTRO =
  'Static Savvy Media is a Madurai-based digital marketing agency delivering services across Search Engine Optimization (SEO), GEO & AEO AI search, Local SEO, Google Ads & PPC, social media marketing, website design & development, AI business automation, and photography-video content creation, with offices in Madurai, Thoothukudi, and Rawang, Malaysia.'

const CTA = {
  title: 'Ready to be found everywhere your clients are looking?',
  subtitle: 'Message us on WhatsApp, we respond within the hour, every business day.',
  label: 'WhatsApp: +91-99440-40345',
}

export default function Services() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/services/`,
      ogType: 'website',
    })

    const scripts = [
      organizationSchema({ name: 'Static Savvy Media' }),
      breadcrumbListSchema({
        items: [
          { name: 'Home', item: `${SITE_URL}/` },
          { name: 'Services', item: `${SITE_URL}/services/` },
        ],
      }),
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
    <HubTemplate
      eyebrow="Services"
      title="Digital Marketing Services, SEO, GEO/AEO, Ads & More"
      subtitle={INTRO}
      grid={<ServicesGrid title="Our Digital Marketing Services" />}
      ctaTitle={CTA.title}
      ctaSubtitle={CTA.subtitle}
      ctaLabel={CTA.label}
      ctaHref={whatsappHref}
    />
  )
}