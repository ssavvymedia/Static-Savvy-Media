import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import { localBusinessSchema, breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL, SITE_NAME } from '../../utils/constants.js'

import contactImg from '../../assets/images/Contact.png'
import maduraiImg from '../../assets/images/locations/madurai.png'
import thoothukudiImg from '../../assets/images/locations/thoothukudi.png'
import malaysiaImg from '../../assets/images/locations/malaysia.png'

const WHATSAPP_MSG_PROJECT = 'Hi Static Savvy Media, I want to discuss my project.'
const WHATSAPP_MSG_GENERAL = 'Hi Static Savvy Media, I would like to know more about your services.'

const SERVICES = [
  {
    name: 'SEO',
    desc: 'Search engine optimisation focused on sustainable organic visibility, technical health, content and search intent.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    colorClass: 'purple',
    route: '/services/seo/'
  },
  {
    name: 'GEO & AEO',
    desc: 'Generative Engine Optimization and Answer Engine Optimization for AI-driven discovery, answer engines and modern search.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    colorClass: 'blue',
    route: '/services/geo-aeo-ai-search/'
  },
  {
    name: 'Local SEO',
    desc: 'Google Business Profile, local search visibility, local entity signals and location-focused optimisation.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    colorClass: 'cyan',
    route: '/services/local-seo/'
  },
  {
    name: 'Google Ads',
    desc: 'Paid search campaigns designed to reach high-intent customers and generate qualified enquiries.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 22h4l6-12 6 12h4L12 2z" />
      </svg>
    ),
    colorClass: 'orange',
    route: '/services/google-ads/'
  },
  {
    name: 'Social Media Marketing',
    desc: 'Content strategy, social media campaigns and brand visibility across relevant platforms.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
      </svg>
    ),
    colorClass: 'pink',
    route: '/services/social-media-marketing/'
  },
  {
    name: 'Website Design & Development',
    desc: 'SEO-ready, conversion-focused websites built around business goals and digital visibility.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <path d="M7 8l-3 3 3 3M17 8l3 3-3 3" />
      </svg>
    ),
    colorClass: 'cyan',
    route: '/services/website-design-development/'
  },
  {
    name: 'AI Business Automation',
    desc: 'Workflow automation and AI-powered systems that reduce manual work and help teams focus on growth.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4M8 15h.01M16 15h.01M9 18h6" />
      </svg>
    ),
    colorClass: 'purple',
    route: '/services/ai-business-automation/'
  },
  {
    name: 'Corporate Photography & Video',
    desc: 'Professional brand imagery and video content for stronger trust and communication.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
    colorClass: 'green',
    route: '/services/corporate-photography-video/'
  },
  {
    name: 'AI Video Creation',
    desc: 'Marketing-focused AI video production for faster content creation.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
    colorClass: 'red',
    route: '/services/ai-video-creation/'
  },
  {
    name: 'Product Photography & Creative Design',
    desc: 'E-commerce-ready product imagery and creative design for digital sales and marketing.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    colorClass: 'gold',
    route: '/services/product-photography-creative-design/'
  }
]

const TRUST_CARDS = [
  {
    number: '01',
    title: 'GEO & AEO First',
    text: 'AI-search visibility is treated as an important part of modern digital strategy.',
    iconStyle: {
      background: 'rgba(168, 85, 247, 0.1)',
      border: '1px solid rgba(168, 85, 247, 0.3)',
      boxShadow: '0 0 15px rgba(168, 85, 247, 0.2)'
    },
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#geo-aeo-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ filter: 'drop-shadow(0 0 5px rgba(217, 70, 239, 0.7))' }}>
        <defs>
          <linearGradient id="geo-aeo-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <circle cx="10" cy="14" r="1.5" fill="url(#geo-aeo-grad)" />
        <circle cx="10" cy="14" r="5" />
        <circle cx="10" cy="14" r="8.5" />
        <line x1="11.5" y1="12.5" x2="20" y2="4" />
        <path d="M15 4h5v5" />
      </svg>
    )
  },
  {
    number: '02',
    title: 'WhatsApp-First',
    text: 'Start the conversation directly instead of navigating through complicated lead-generation forms.',
    iconStyle: {
      background: 'rgba(59, 130, 246, 0.1)',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      boxShadow: '0 0 15px rgba(59, 130, 246, 0.2)'
    },
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#whatsapp-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ filter: 'drop-shadow(0 0 5px rgba(59, 130, 246, 0.7))' }}>
        <defs>
          <linearGradient id="whatsapp-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        <path d="M15 13.5c-.2-.2-.5-.2-.7 0l-.6.6c-.2.2-.5.2-.7 0-.7-.7-1.3-1.3-2-2-.2-.2-.2-.5 0-.7l.6-.6c.2-.2.2-.5 0-.7L10.5 8.5c-.2-.2-.5-.2-.7 0l-.7.7c-.7.7-.8 1.8-.3 2.6 1 1.6 2.3 2.9 3.9 3.9.8.5 1.9.4 2.6-.3l.7-.7c.2-.2.2-.5 0-.7l-1.5-1.5z" />
      </svg>
    )
  },
  {
    number: '03',
    title: 'Three-Market Experience',
    text: 'Madurai, Thoothukudi, and Malaysia, local expertise across three distinct markets.',
    iconStyle: {
      background: 'rgba(236, 72, 153, 0.1)',
      border: '1px solid rgba(236, 72, 153, 0.3)',
      boxShadow: '0 0 15px rgba(236, 72, 153, 0.2)'
    },
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#three-market-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ filter: 'drop-shadow(0 0 5px rgba(236, 72, 153, 0.7))' }}>
        <defs>
          <linearGradient id="three-market-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#db2777" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
        </defs>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <circle cx="9" cy="7" r="1.5" fill="url(#three-market-grad)" />
        <line x1="9" y1="1.5" x2="9" y2="3" />
        <line x1="9" y1="11" x2="9" y2="12.5" />
        <line x1="3.5" y1="7" x2="5" y2="7" />
        <line x1="13" y1="7" x2="14.5" y2="7" />
      </svg>
    )
  },
  {
    number: '04',
    title: 'Integrated Digital Growth',
    text: 'SEO, GEO/AEO, Local SEO, Ads, Social Media, Web Development, Automation and Creative services work together as one growth system.',
    iconStyle: {
      background: 'rgba(6, 182, 212, 0.1)',
      border: '1px solid rgba(6, 182, 212, 0.3)',
      boxShadow: '0 0 15px rgba(6, 182, 212, 0.2)'
    },
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#growth-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ filter: 'drop-shadow(0 0 5px rgba(6, 182, 212, 0.7))' }}>
        <defs>
          <linearGradient id="growth-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0891b2" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M17 7h4v4" />
        <rect x="4" y="14" width="2.5" height="6" rx="0.5" fill="url(#growth-grad)" stroke="none" />
        <rect x="9" y="10" width="2.5" height="10" rx="0.5" fill="url(#growth-grad)" stroke="none" />
        <rect x="14" y="6" width="2.5" height="14" rx="0.5" fill="url(#growth-grad)" stroke="none" />
      </svg>
    )
  }
]

const LOCATIONS = [
  {
    title: 'Madurai',
    subtitle: 'Static Savvy Media, Madurai',
    region: 'Madurai, Tamil Nadu',
    phone: '+91-99440-40345',
    hours: 'Monday–Saturday, 9:00 AM – 6:30 PM IST',
    note: 'Headquarters',
    image: maduraiImg
  },
  {
    title: 'Thoothukudi',
    subtitle: 'Static Savvy Media, Thoothukudi',
    region: 'Thoothukudi (Tuticorin), Tamil Nadu',
    phone: '+91-99440-40345',
    hours: null,
    note: "Serving the port city’s industrial, marine, manufacturing and retail businesses.",
    image: thoothukudiImg
  },
  {
    title: 'Malaysia',
    subtitle: 'Static Savvy Media, Malaysia',
    region: 'Rawang & Selangor, Malaysia',
    phone: '+91-99440-40345',
    hours: 'Monday–Friday, 9:00 AM – 6:00 PM MYT',
    note: null,
    image: malaysiaImg
  }
]

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Message Us',
    text: 'Send us a WhatsApp message describing your business and what you want to achieve.',
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80" style={{ filter: 'drop-shadow(0 0 12px rgba(168, 85, 247, 0.55))', marginBottom: '0.5rem' }} aria-hidden="true">
        <defs>
          <linearGradient id="purple-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>
        </defs>
        <circle cx="40" cy="40" r="32" fill="url(#purple-icon-grad)" />
        <g transform="translate(28, 28)" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </g>
      </svg>
    )
  },
  {
    number: '02',
    title: 'Discuss',
    text: 'We’ll understand your business, audience, market and digital requirements.',
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80" style={{ filter: 'drop-shadow(0 0 12px rgba(59, 130, 246, 0.55))', marginBottom: '0.5rem' }} aria-hidden="true">
        <defs>
          <linearGradient id="blue-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
        <circle cx="40" cy="40" r="32" fill="url(#blue-icon-grad)" />
        <g transform="translate(28, 28)" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          <path d="M8 10h8" />
          <path d="M8 14h8" />
          <path d="M8 18h8" />
        </g>
      </svg>
    )
  },
  {
    number: '03',
    title: 'Plan',
    text: 'We’ll recommend the most relevant service, strategy or combination of services.',
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80" style={{ filter: 'drop-shadow(0 0 12px rgba(6, 182, 212, 0.55))', marginBottom: '0.5rem' }} aria-hidden="true">
        <defs>
          <linearGradient id="cyan-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
        </defs>
        <circle cx="40" cy="40" r="32" fill="url(#cyan-icon-grad)" />
        <g transform="translate(28, 28)" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </g>
      </svg>
    )
  }
]

export default function Contact() {
  const jsonLdRef = useRef([])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setFormSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      })
    }, 1200)
  }

  useEffect(() => {
    setSeo({
      title: 'Contact Static Savvy Media, WhatsApp, Madurai · Thoothukudi · Malaysia',
      description: 'Contact Static Savvy Media for SEO, GEO/AEO, Local SEO, Google Ads, websites, social media, AI automation and creative services. WhatsApp us at +91-99440-40345.',
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
        name: SITE_NAME,
        url: SITE_URL,
        telephone: '+91-99440-40345',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+91-99440-40345',
          contactType: 'customer service',
          availableLanguage: ['English', 'Tamil'],
        },
      },
    }

    const localBiz = localBusinessSchema({
      telephone: '+91-99440-40345',
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
  const whatsappProject = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MSG_PROJECT)

  return (
    <div className="contact-page">
      <style>{`
        /* ---- Custom Badge Pill for Process ---- */
        .process-badge-pill {
          display: inline-block;
          font-size: 0.725rem;
          font-weight: 800;
          color: #a855f7;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.4rem 1.1rem;
          border-radius: 9999px;
          background: rgba(168, 85, 247, 0.05);
          border: 1px dashed rgba(168, 85, 247, 0.35);
          margin-bottom: 0.75rem;
          text-shadow: 0 0 10px rgba(168, 85, 247, 0.2);
        }

        /* ---- Custom Process Grid ---- */
        .process-custom-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.25rem;
          margin-top: 3.5rem;
          width: 100%;
        }

        .process-step-custom {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          text-align: left;
        }

        .process-step-custom__icon {
          flex-shrink: 0;
        }

        .process-step-custom__content {
          flex-grow: 1;
        }

        .process-step-custom__title-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.5rem;
          position: relative;
          overflow: visible;
        }

        .process-step-custom__number {
          font-size: 0.85rem;
          font-weight: 800;
          color: #f472b6;
          opacity: 0.8;
          font-family: var(--font-mono, monospace);
        }

        .process-step-custom__title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          white-space: nowrap;
        }

        .process-step-custom__line {
          flex-grow: 1;
          height: 0px;
          border-top: 1.5px dashed rgba(255, 255, 255, 0.15);
          margin-left: 0.75rem;
          margin-right: -1rem;
          position: relative;
          top: 1px;
        }

        .process-step-custom__line::after {
          content: '';
          position: absolute;
          right: 0;
          top: -3.5px;
          width: 6px;
          height: 6px;
          border-top: 1.5px solid rgba(255, 255, 255, 0.35);
          border-right: 1.5px solid rgba(255, 255, 255, 0.35);
          transform: rotate(45deg);
        }

        .process-step-custom__text {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.6;
          margin: 0;
        }

        /* ---- Custom CTA Card ---- */
        .cta-card-custom {
          background: linear-gradient(135deg, rgba(9, 6, 36, 0.95), rgba(30, 9, 64, 0.95));
          border: 1px solid rgba(139, 92, 246, 0.28);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.65), 0 0 35px rgba(139, 92, 246, 0.18);
          border-radius: 20px;
          padding: 3rem 2.5rem;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 2.5rem;
          text-align: left;
          position: relative;
          overflow: hidden;
        }

        /* Grid dots overlay */
        .cta-card-custom::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(139, 92, 246, 0.08) 1.2px, transparent 1.2px);
          background-size: 18px 18px;
          pointer-events: none;
          z-index: 1;
        }

        .cta-card-custom__left,
        .cta-card-custom__middle,
        .cta-card-custom__right {
          position: relative;
          z-index: 2;
        }

        .cta-card-custom__left {
          flex-shrink: 0;
        }

        .cta-card-custom__middle {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .cta-card-custom__title {
          font-size: 1.65rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .cta-card-custom__text {
          font-size: 0.925rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.7;
          margin: 0;
          max-width: 580px;
        }

        .cta-card-custom__right {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          width: 290px;
        }

        /* CTA Buttons */
        .cta-card-custom__btn-wa {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          background: linear-gradient(135deg, #22c55e, #15803d);
          color: #ffffff;
          font-size: 0.9rem;
          font-weight: 700;
          padding: 0.9rem 1.5rem;
          border-radius: 99px;
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(34, 197, 94, 0.35);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border: none;
          cursor: pointer;
        }

        .cta-card-custom__btn-wa:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(34, 197, 94, 0.45);
        }

        .cta-card-custom__btn-wa svg {
          flex-shrink: 0;
        }

        .cta-card-custom__btn-phone {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.85);
          font-size: 0.9rem;
          font-weight: 700;
          padding: 0.9rem 1.5rem;
          border-radius: 99px;
          text-decoration: none;
          transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease, color 0.2s ease;
          cursor: pointer;
        }

        .cta-card-custom__btn-phone:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.28);
          color: #ffffff;
          transform: translateY(-1px);
        }

        .cta-card-custom__btn-phone svg {
          flex-shrink: 0;
        }

        /* ---- Responsive Styling ---- */
        @media (max-width: 968px) {
          .process-custom-container {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .process-step-custom__line {
            display: none;
          }
          .cta-card-custom {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 1.75rem;
            padding: 2.5rem 1.5rem;
            justify-items: center;
          }
          .cta-card-custom__middle {
            align-items: center;
          }
          .cta-card-custom__right {
            width: 100%;
            max-width: 320px;
          }
        }

        /* ---- Equal Height Grid Cards ---- */
        .contact-services-grid,
        .contact-trust-grid,
        .contact-locations-grid {
          align-items: stretch !important;
        }

        .contact-services-grid > .reveal,
        .contact-trust-grid > .reveal,
        .contact-locations-grid > .reveal {
          display: flex !important;
          flex-direction: column !important;
          height: 100% !important;
        }

        .contact-service-card,
        .contact-trust-card,
        .contact-location-card {
          display: flex !important;
          flex-direction: column !important;
          height: 100% !important;
          flex-grow: 1 !important;
          box-sizing: border-box !important;
        }

        .contact-service-card__desc,
        .contact-trust-card__text {
          flex-grow: 1 !important;
        }

        .contact-location-card__info {
          flex-grow: 1 !important;
          display: flex !important;
          flex-direction: column !important;
        }

        .contact-location-card__note {
          margin-top: auto !important;
        }

        /* ---- Service Grid Columns Override (4+4+2 Layout) ---- */
        @media (min-width: 1025px) {
          .contact-services-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 1.25rem !important;
          }
          .contact-services-grid > .reveal:nth-child(9) {
            grid-column: 2 !important;
          }
          .contact-services-grid > .reveal:nth-child(10) {
            grid-column: 3 !important;
          }
        }
        @media (max-width: 1024px) and (min-width: 769px) {
          .contact-services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.25rem !important;
          }
          .contact-services-grid > .reveal:nth-child(9),
          .contact-services-grid > .reveal:nth-child(10) {
            grid-column: auto !important;
          }
        }
        @media (max-width: 768px) {
          .contact-services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
          }
          .contact-services-grid > .reveal:nth-child(9),
          .contact-services-grid > .reveal:nth-child(10) {
            grid-column: auto !important;
          }
        }
        @media (max-width: 480px) {
          .contact-services-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }

        /* ---- Contact Form Section ---- */
        .contact-form-section {
          padding-top: 5rem;
          padding-bottom: 5rem;
          position: relative;
        }

        .contact-form-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 3.5rem 3rem;
          background: linear-gradient(135deg, rgba(11, 17, 36, 0.7), rgba(22, 14, 51, 0.75));
          border: 1px solid rgba(139, 92, 246, 0.25);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(139, 92, 246, 0.15);
          border-radius: 24px;
          position: relative;
          overflow: hidden;
        }

        /* Glass Form glows and decorative accents */
        .contact-form-container::before {
          content: '';
          position: absolute;
          top: -20%;
          right: -20%;
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }

        .contact-form-container::after {
          content: '';
          position: absolute;
          bottom: -20%;
          left: -20%;
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }

        .contact-form-header {
          text-align: center;
          margin-bottom: 3rem;
          position: relative;
          z-index: 2;
        }

        .contact-form-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 800;
          color: #22d3ee;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.4rem 1.1rem;
          border-radius: 9999px;
          background: rgba(34, 211, 238, 0.05);
          border: 1px dashed rgba(34, 211, 238, 0.35);
          margin-bottom: 1rem;
          text-shadow: 0 0 10px rgba(34, 211, 238, 0.2);
        }

        .contact-form-title {
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 0.75rem;
          background: linear-gradient(135deg, #ffffff 30%, #e2e8f0 70%, rgba(139, 92, 246, 0.8) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .contact-form-subtitle {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.65);
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .contact-form-element {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .contact-form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          text-align: left;
        }

        .form-group--full {
          grid-column: span 2;
        }

        .form-group label {
          font-size: 0.85rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.85);
          letter-spacing: 0.02em;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          background: rgba(7, 11, 24, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 0.9rem 1.1rem;
          color: #ffffff;
          font-size: 0.95rem;
          font-family: inherit;
          transition: all 0.3s ease;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        /* Fix select styling dropdown arrow */
        .form-group select {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 1.1rem center;
          background-size: 1.1rem;
          padding-right: 2.75rem;
        }

        /* Styling option colors inside dropdown */
        .form-group select option {
          background-color: #0b1124;
          color: #ffffff;
        }

        /* Hover and focus states */
        .form-group input:hover,
        .form-group select:hover,
        .form-group textarea:hover {
          border-color: rgba(139, 92, 246, 0.4);
          background: rgba(7, 11, 24, 0.7);
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #8b5cf6;
          background: rgba(7, 11, 24, 0.85);
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2), inset 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: rgba(255, 255, 255, 0.35);
        }

        /* Prominent Submit Button */
        .contact-form-submit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          background: linear-gradient(135deg, #8b5cf6 0%, #db2777 50%, #ec4899 100%);
          background-size: 200% auto;
          color: #ffffff;
          border: none;
          border-radius: 99px;
          padding: 1.1rem 2.5rem;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 5px 20px rgba(139, 92, 246, 0.35), 0 0 30px rgba(236, 72, 153, 0.15);
          align-self: center;
          margin-top: 1rem;
          width: 100%;
          max-width: 320px;
        }

        .contact-form-submit-btn:hover {
          background-position: right center;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(139, 92, 246, 0.55), 0 0 40px rgba(236, 72, 153, 0.25);
        }

        .contact-form-submit-btn:active {
          transform: translateY(1px);
        }

        .contact-form-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .contact-form-submit-btn svg {
          transition: transform 0.3s ease;
        }

        .contact-form-submit-btn:hover svg {
          transform: translate(2px, -2px);
        }

        /* Success screen styling */
        .contact-form-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 1.5rem;
          text-align: center;
          position: relative;
          z-index: 2;
          animation: fadeIn 0.4s ease;
        }

        .success-icon-wrapper {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: rgba(34, 211, 238, 0.1);
          border: 2px solid #22d3ee;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #22d3ee;
          margin-bottom: 1.5rem;
          box-shadow: 0 0 30px rgba(34, 211, 238, 0.25);
        }

        .success-title {
          font-size: 1.75rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 0.75rem;
        }

        .success-message {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 450px;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .success-reset-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.85);
          padding: 0.8rem 1.8rem;
          border-radius: 99px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .success-reset-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
          color: #ffffff;
          transform: translateY(-1px);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .contact-form-container {
            padding: 2.5rem 1.75rem;
            border-radius: 20px;
          }
          .contact-form-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
          .form-group--full {
            grid-column: span 1;
          }
          .contact-form-submit-btn {
            width: 100%;
          }
        }

        /* Increase size and visibility of numbers on service cards */
        .contact-service-card__number {
          font-size: 1.05rem !important;
          opacity: 0.75 !important;
          font-weight: 800 !important;
        }
      `}</style>
      <Breadcrumbs />

      {/* HERO */}
      <section className="section">
        <div className="container">
          <div className="contact-hero-container">
            <div className="contact-hero__left">
              <span className="contact-hero__badge">CONTACT STATIC SAVVY MEDIA</span>
              <h1 className="hero__title contact-hero__title">
                Let's Talk About Your{' '}
                <span className="text-gradient">Digital Growth</span>
              </h1>
              <p className="contact-hero__text">
                Ready to improve your search visibility, generate more qualified leads, strengthen your local presence, or build a stronger digital system for your business? Talk to Static Savvy Media directly on WhatsApp.
              </p>
              <div className="contact-hero__cta">
                <a
                  href={whatsappGeneral}
                  className="btn btn--primary btn--lg contact-whatsapp-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact Static Savvy Media on WhatsApp"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Us
                </a>
                <a
                  href="tel:+919944040345"
                  className="btn btn--ghost btn--lg"
                  aria-label="Call Static Savvy Media"
                >
                  +91-99440-40345
                </a>
              </div>
            </div>
            <div className="contact-hero__right">
              <img src={contactImg} alt="Contact Static Savvy Media" className="contact-hero__img" />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section section--alt">
        <div className="container">
          <div className="contact-section-header">
            <h2 className="section-title">What Can We Help You With?</h2>
            <p className="contact-section-sub">Tell us what you are trying to achieve. We can help identify the right digital marketing, search visibility and automation approach for your business.</p>
          </div>
          <div className="contact-services-grid">
            {SERVICES.map((svc, i) => (
              <ScrollReveal key={svc.name} delay={i * 40}>
                <Link to={svc.route} className="contact-service-card glass-card">
                  <div className="contact-service-card__header">
                    <div className={`contact-service-card__icon contact-service-card__icon--${svc.colorClass}`}>
                      {svc.icon}
                    </div>
                    <span className="contact-service-card__number">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="contact-service-card__name">{svc.name}</h3>
                  <p className="contact-service-card__desc">{svc.desc}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CONTACT US */}
      <section className="section">
        <div className="container">
          <div className="contact-section-header">
            <h2 className="section-title">Why Talk to Static Savvy Media?</h2>
          </div>
          <div className="contact-trust-grid">
            {TRUST_CARDS.map((card) => (
              <ScrollReveal key={card.number}>
                <div className="contact-trust-card glass-card">
                  <div className="contact-trust-card__icon" style={card.iconStyle}>{card.icon}</div>
                  <h3 className="contact-trust-card__title">{card.title}</h3>
                  <p className="contact-trust-card__text">{card.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="section section--alt">
        <div className="container">
          <div className="contact-section-header">
            <h2 className="section-title">Serving Businesses Across Three Markets</h2>
          </div>
          <div className="contact-locations-grid">
            {LOCATIONS.map((loc) => (
              <ScrollReveal key={loc.title}>
                <div className="contact-location-card glass-card">
                  <div className="contact-location-card__img-wrapper">
                    <img src={loc.image} alt={loc.title} className="contact-location-card__img" />
                  </div>
                  <div className="contact-location-card__info">
                    <h3 className="contact-location-card__title">{loc.title}</h3>
                    <div className="contact-location-card__subtitle">{loc.subtitle}</div>
                    <div className="contact-location-card__region">{loc.region}</div>
                    <div className="contact-location-card__phone">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <a href="tel:+919944040345">{loc.phone}</a>
                    </div>
                    {loc.hours && <div className="contact-location-card__hours">{loc.hours}</div>}
                    {loc.note && <div className="contact-location-card__note">{loc.note}</div>}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container">
          <div className="contact-section-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="process-badge-pill">OUR PROCESS</span>
            <h2 className="section-title" style={{ marginTop: '0.25rem' }}>How It Works</h2>
          </div>
          <div className="process-custom-container">
            {PROCESS_STEPS.map((step, index) => (
              <ScrollReveal key={step.number} delay={index * 80}>
                <div className="process-step-custom">
                  <div className="process-step-custom__icon">
                    {step.icon}
                  </div>
                  <div className="process-step-custom__content">
                    <div className="process-step-custom__title-row">
                      <span className="process-step-custom__number">{step.number}</span>
                      <h3 className="process-step-custom__title">{step.title}</h3>
                      {index < 2 && <div className="process-step-custom__line" />}
                    </div>
                    <p className="process-step-custom__text">{step.text}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CTA */}
      <section className="section section--alt" style={{ overflow: 'hidden' }}>
        <div className="container">
          <ScrollReveal>
            <div className="cta-card-custom">
              <div className="cta-card-custom__left">
                <svg width="84" height="84" viewBox="0 0 84 84" style={{ filter: 'drop-shadow(0 0 14px rgba(34, 197, 94, 0.45))' }} aria-hidden="true">
                  <defs>
                    <linearGradient id="whatsapp-green-grad-cta" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#15803d" />
                    </linearGradient>
                  </defs>
                  <rect x="6" y="6" width="72" height="72" rx="20" fill="url(#whatsapp-green-grad-cta)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <g transform="translate(24, 24) scale(1.5)" fill="#ffffff">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </g>
                </svg>
              </div>
              <div className="cta-card-custom__middle">
                <h2 className="cta-card-custom__title">Have a Project in Mind?</h2>
                <p className="cta-card-custom__text">
                  Whether you need SEO, GEO/AEO, Local SEO, Google Ads, social media marketing, website development, AI automation, or creative production, start with a conversation.
                </p>
              </div>
              <div className="cta-card-custom__right">
                <a
                  href={whatsappProject}
                  className="cta-card-custom__btn-wa"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact Static Savvy Media on WhatsApp"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Static Savvy Media
                </a>
                <a href="tel:+919944040345" className="cta-card-custom__btn-phone" aria-label="Call Static Savvy Media">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  +91-99440-40345
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section className="section section--alt contact-form-section">
        <div className="container">
          <ScrollReveal>
            <div className="contact-form-container glass-card">
              <div className="contact-form-header">
                <span className="contact-form-badge">GET IN TOUCH</span>
                <h2 className="contact-form-title">Let’s Start a Conversation</h2>
                <p className="contact-form-subtitle">
                  Tell us about your digital requirements, and we'll help identify the right strategy for your growth.
                </p>
              </div>

              {formSubmitted ? (
                <div className="contact-form-success">
                  <div className="success-icon-wrapper">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h3 className="success-title">Thank You!</h3>
                  <p className="success-message">
                    Your request has been received. Our team will review your details and get back to you shortly.
                  </p>
                  <button className="success-reset-btn" onClick={() => setFormSubmitted(false)}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="contact-form-element" onSubmit={handleSubmit}>
                  <div className="contact-form-grid">
                    <div className="form-group">
                      <label htmlFor="form-name">Name</label>
                      <input
                        type="text"
                        id="form-name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="form-email">Email Address</label>
                      <input
                        type="email"
                        id="form-email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="form-phone">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        id="form-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 99440 40345"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="form-service">Service Needed</label>
                      <select
                        id="form-service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="" disabled hidden>Select a Service</option>
                        {SERVICES.map((s) => (
                          <option key={s.name} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group form-group--full">
                    <label htmlFor="form-message">Message / Project Details</label>
                    <textarea
                      id="form-message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5"
                      placeholder="Tell us about your project, goals, or any specific requirements..."
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="contact-form-submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
