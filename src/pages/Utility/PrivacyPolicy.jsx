import { useEffect, useRef } from 'react'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import { breadcrumbListSchema } from '../../utils/schema.js'
import { SITE_URL, SITE_NAME, WHATSAPP_NUMBER } from '../../utils/constants.js'

const SECTIONS = [
  {
    id: 'introduction',
    title: 'Introduction',
    content: [
      'This Privacy Policy explains how Static Savvy Media ("we", "us", "our") collects, uses, stores, protects and handles personal information when you visit our website, use our digital marketing services or communicate with us through WhatsApp, email or other channels.',
      'Static Savvy Media provides digital marketing, SEO, GEO, AEO, AI search optimisation, website development, photography, video and related digital services across India and Malaysia.',
      'By using our website or services, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with the practices described here, please do not use our website or provide your personal information.',
    ],
  },
  {
    id: 'who-we-are',
    title: 'Who We Are',
    content: [
      'Static Savvy Media is a digital marketing agency operating across India and Malaysia. We provide SEO, Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), Google Ads management, social media marketing, website development, corporate photography, video production and AI business automation services.',
      'For the purposes of this Privacy Policy, Static Savvy Media is the data controller responsible for your personal information.',
    ],
  },
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    subtitle: 'Information You Provide Directly',
    content: [
      'When you contact us through WhatsApp, email, our website contact form or other communication channels, we may collect:',
    ],
    list: [
      'Full name',
      'Email address',
      'Phone number or WhatsApp number',
      'Business name and business type',
      'Location (city, state, country)',
      'Project requirements and service enquiries',
      'Any other information you voluntarily provide in your messages',
    ],
  },
  {
    id: 'information-collected-automatically',
    title: 'Information Collected Automatically',
    content: [
      'When you visit our website, certain information is collected automatically through cookies and similar technologies:',
    ],
    list: [
      'IP address (anonymised where possible)',
      'Browser type and version',
      'Device type and operating system',
      'Pages visited and time spent on each page',
      'Referring website or source',
      'General geographic location (city/country level)',
      'Date and time of your visit',
    ],
  },
  {
    id: 'how-we-use-your-information',
    title: 'How We Use Your Information',
    content: [
      'We use the personal information we collect for the following purposes:',
    ],
    list: [
      'Responding to your enquiries and providing quotes for our services',
      'Delivering digital marketing, SEO, website development and related services',
      'Sending project updates, invoices and service-related communications',
      'Improving our website, services and user experience',
      'Analysing website traffic and usage patterns through analytics tools',
      'Meeting legal and regulatory obligations',
      'Communicating about service updates, industry insights or marketing (with your consent where required)',
    ],
  },
  {
    id: 'whatsapp-communication',
    title: 'WhatsApp and Communication Information',
    content: [
      'When you contact us via WhatsApp at +91 99440 40345 or any other WhatsApp number we provide, we may collect:',
    ],
    list: [
      'Your WhatsApp display name and phone number',
      'Messages, images and files you send through WhatsApp',
      'Timestamps of your communications',
    ],
    contentAfter: [
      'WhatsApp communications are subject to Meta\'s Privacy Policy in addition to this Privacy Policy. We retain WhatsApp conversation records as part of our business communication records for service delivery and quality purposes.',
    ],
  },
  {
    id: 'website-analytics',
    title: 'Website Analytics and Tracking',
    content: [
      'We use website analytics tools to understand how visitors interact with our website. These tools may collect:',
    ],
    list: [
      'Pages visited and navigation patterns',
      'Time spent on pages',
      'Scroll depth and click interactions',
      'Traffic sources and referral information',
      'Device and browser information',
    ],
    contentAfter: [
      'Analytics data is used in aggregate to improve our website content and user experience. We do not use analytics data to identify individual visitors except where required for security or legal purposes.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies and Similar Technologies',
    content: [
      'Our website uses cookies and similar tracking technologies to:',
    ],
    list: [
      'Remember your preferences and settings',
      'Analyse website traffic and performance',
      'Enable website functionality',
      'Support security measures',
    ],
    contentAfter: [
      'You can control cookie settings through your browser. Disabling certain cookies may affect website functionality. We do not use third-party advertising cookies without your explicit consent.',
    ],
  },
  {
    id: 'how-we-share-information',
    title: 'How We Share Information',
    content: [
      'We do not sell, rent or trade your personal information. We may share your information only in the following circumstances:',
    ],
    list: [
      'With service providers who assist in delivering our services (e.g., hosting providers, analytics tools, payment processors)',
      'With your explicit consent for specific purposes',
      'When required by law, regulation, legal process or governmental request',
      'To protect the rights, property or safety of Static Savvy Media, our clients or the public',
      'In connection with a merger, acquisition or sale of business assets (with prior notice)',
    ],
  },
  {
    id: 'third-party-providers',
    title: 'Third-Party Service Providers',
    content: [
      'We work with third-party service providers who process data on our behalf. These providers are contractually obligated to:',
    ],
    list: [
      'Use your data only for the purposes we specify',
      'Implement appropriate security measures',
      'Not share your data with other parties without authorization',
      'Comply with applicable data protection laws',
    ],
    contentAfter: [
      'Third-party providers may be located in India, Malaysia or other countries. Where data is transferred internationally, we ensure appropriate safeguards are in place.',
    ],
  },
  {
    id: 'data-storage-security',
    title: 'Data Storage and Security',
    content: [
      'We implement reasonable technical and organisational measures to protect your personal information against unauthorised access, loss, misuse or alteration. These measures include:',
    ],
    list: [
      'Secure data storage with access controls',
      'Encryption of sensitive data in transit',
      'Regular security assessments',
      'Limited access to personal information on a need-to-know basis',
    ],
    contentAfter: [
      'While we take reasonable precautions, no method of electronic transmission or storage is completely secure. We cannot guarantee absolute security of your data.',
    ],
  },
  {
    id: 'data-retention',
    title: 'Data Retention',
    content: [
      'We retain your personal information only for as long as necessary to fulfil the purposes for which it was collected:',
    ],
    list: [
      'Enquiry and quotation data: retained for up to 24 months from last communication',
      'Client project data: retained for the duration of the service engagement plus 12 months',
      'WhatsApp and email communications: retained for up to 24 months for business records',
      'Website analytics data: retained in anonymised form',
    ],
    contentAfter: [
      'When data is no longer required, it is securely deleted or anonymised.',
    ],
  },
  {
    id: 'your-rights',
    title: 'Your Privacy Rights',
    content: [
      'Depending on your location, you may have the following rights regarding your personal information:',
    ],
    list: [
      'Access: Request a copy of the personal information we hold about you',
      'Correction: Request correction of inaccurate or incomplete data',
      'Deletion: Request deletion of your personal information (subject to legal obligations)',
      'Withdrawal of consent: Withdraw consent for data processing where consent was the basis',
      'Objection: Object to certain types of processing',
      'Portability: Request transfer of your data in a structured, machine-readable format',
    ],
    contentAfter: [
      'To exercise any of these rights, please contact us using the details provided at the end of this policy.',
    ],
  },
  {
    id: 'india-dpdp',
    title: 'India, Digital Personal Data Protection Act, 2023',
    content: [
      'For users and clients in India, we process personal data in accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act 2023).',
      'Under the DPDP Act 2023:',
    ],
    list: [
      'Personal data is collected only for specific, clear and lawful purposes',
      'We obtain your consent before processing your personal data, except where processing is required by law or necessary for legitimate business purposes',
      'You have the right to access your personal data and request correction or erasure',
      'You may withdraw consent at any time, subject to legal or contractual restrictions',
      'We implement reasonable security safeguards to protect your personal data from unauthorised access, disclosure or misuse',
      'We do not transfer your personal data outside India except with your consent or as permitted by law',
      'If you have concerns about how your data is processed, you may file a complaint with us or escalate to the Data Protection Board of India',
    ],
    contentAfter: [
      'For any data-related requests or grievances under the DPDP Act 2023, please contact us at the details provided below.',
    ],
  },
  {
    id: 'malaysia-pdpa',
    title: 'Malaysia, Personal Data Protection Act 2010',
    content: [
      'For users and clients in Malaysia, we handle personal data with consideration of the Personal Data Protection Act 2010 (PDPA 2010).',
      'Under the PDPA 2010, we adhere to the following principles:',
    ],
    list: [
      'General Principle: Personal data is not collected or processed without your consent, unless permitted by law',
      'Notification Principle: We inform you of the purpose for which your data is collected and processed',
      'Choice and Consent Principle: We obtain your consent before using your data for purposes beyond the original collection purpose',
      'Data Integrity Principle: We take reasonable steps to ensure your personal data is accurate, complete and not misleading',
      'Security Principle: We implement appropriate security measures to protect your data from loss, misuse, modification, unauthorised access or disclosure',
      'Retention Principle: We do not retain personal data longer than necessary for the purpose for which it was collected',
      'Data Integrity Principle: We take reasonable steps to ensure your data is protected',
      'Access Principle: You have the right to access and correct your personal data held by us',
    ],
    contentAfter: [
      'Malaysian clients may exercise their rights under the PDPA 2010 by contacting us using the details provided below. We will respond to access and correction requests within the timeframes required by the PDPA 2010.',
    ],
  },
  {
    id: 'cross-border',
    title: 'International and Cross-Border Data Considerations',
    content: [
      'Static Savvy Media operates across India and Malaysia. Your personal information may be processed in either country depending on where the service is being delivered.',
      'Where personal data is transferred across borders, we ensure:',
    ],
    list: [
      'The receiving country provides adequate data protection, or',
      'Appropriate contractual safeguards are in place, or',
      'You have provided consent for the transfer',
    ],
    contentAfter: [
      'We do not sell or transfer personal data to third parties for their independent marketing purposes.',
    ],
  },
  {
    id: 'childrens-privacy',
    title: 'Children\'s Privacy',
    content: [
      'Our website and services are not directed at individuals under the age of 18. We do not knowingly collect personal information from children.',
      'If we become aware that we have collected personal information from a child without appropriate parental consent, we will take steps to delete that information promptly.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to This Privacy Policy',
    content: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices, services, legal requirements or other factors.',
      'When we make material changes, we will update the date at the top of this page and, where appropriate, notify you through our website or direct communication.',
      'We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact Us',
    content: [
      'If you have any questions, concerns or requests regarding this Privacy Policy or how we handle your personal information, please contact us:',
    ],
    list: [
      'WhatsApp: +91 99440 40345',
      'Website: staticsavvymedia.com',
      'Email: Available via WhatsApp or website contact form',
    ],
    contentAfter: [
      'We aim to respond to all privacy-related enquiries within 5 business days.',
    ],
  },
]

export default function PrivacyPolicy() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: `Privacy Policy | ${SITE_NAME}`,
      description: `Privacy Policy for ${SITE_NAME} explaining how personal information is collected, used, protected and handled across India and Malaysia.`,
      canonical: `${SITE_URL}/privacy-policy/`,
      ogType: 'website',
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Privacy Policy', item: `${SITE_URL}/privacy-policy/` },
      ],
    })

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(breadcrumbs)
    document.head.appendChild(script)
    jsonLdRef.current = [script]

    return () => {
      jsonLdRef.current.forEach((s) => s.remove())
      jsonLdRef.current = []
    }
  }, [])

  return (
    <div className="privacy-policy-page">
      <Breadcrumbs />

      {/* HERO */}
      <section className="section">
        <div className="container">
          <div className="privacy-hero">
            <span className="privacy-hero__badge">Legal / Privacy</span>
            <h1 className="hero__title privacy-hero__title">Privacy Policy</h1>
            <p className="privacy-hero__text">
              This page explains how Static Savvy Media collects, uses, stores, protects and
              handles personal information across our digital marketing, SEO, GEO, AEO and
              related services in India and Malaysia.
            </p>
          </div>
        </div>
      </section>

      {/* LAST UPDATED */}
      <section className="section section--alt">
        <div className="container">
          <div className="privacy-content">
            <div className="privacy-updated">
              <span className="privacy-updated__label">Last Updated:</span>
              <span className="privacy-updated__date">2026</span>
            </div>

            {/* SECTIONS */}
            {SECTIONS.map((section) => (
              <ScrollReveal key={section.id}>
                <article className="privacy-section" id={section.id}>
                  <h2 className="privacy-section__title">{section.title}</h2>
                  {section.subtitle && (
                    <h3 className="privacy-section__subtitle">{section.subtitle}</h3>
                  )}
                  {section.content.map((paragraph, i) => (
                    <p key={i} className="privacy-section__text">{paragraph}</p>
                  ))}
                  {section.list && (
                    <ul className="privacy-section__list">
                      {section.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {section.contentAfter && section.contentAfter.map((paragraph, i) => (
                    <p key={i} className="privacy-section__text">{paragraph}</p>
                  ))}
                </article>
              </ScrollReveal>
            ))}

            {/* NAVIGATION SIDEBAR */}
            <nav className="privacy-toc" aria-label="Privacy Policy sections">
              <h2 className="privacy-toc__title">Contents</h2>
              <ul className="privacy-toc__list">
                {SECTIONS.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="privacy-toc__link">
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </div>
  )
}
