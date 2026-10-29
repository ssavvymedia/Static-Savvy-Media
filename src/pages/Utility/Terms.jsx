import { useEffect, useRef } from 'react'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import { breadcrumbListSchema } from '../../utils/schema.js'
import { SITE_URL, SITE_NAME } from '../../utils/constants.js'

const SECTIONS = [
  {
    id: 'agreement',
    title: '1. Agreement to Terms',
    content: [
      'By accessing or using the Static Savvy Media website, engaging our services, or communicating with us through any channel, you agree to be bound by these Terms of Service. If you do not agree with any part of these Terms, please do not use our website or services.',
      'These Terms govern the relationship between Static Savvy Media ("we", "us", "our") and any individual, business or organisation ("client", "you", "your") that accesses our website, requests a quotation, enters into a service agreement, or otherwise engages with our business.',
    ],
  },
  {
    id: 'about',
    title: '2. About Static Savvy Media',
    content: [
      'Static Savvy Media is a digital marketing agency operating across India and Malaysia. We provide Search Engine Optimization (SEO), Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), AI search optimization, Local SEO, Google Business Profile management, Google Ads and PPC management, social media marketing, website design and development, AI business automation, AI video creation, corporate photography and video, product photography, and creative design services.',
    ],
  },
  {
    id: 'scope',
    title: '3. Scope of Services',
    content: [
      'The services we provide are those specifically agreed upon in a written quotation, proposal or service agreement between Static Savvy Media and the client. Services may include, but are not limited to:',
    ],
    list: [
      'Search Engine Optimization (SEO)',
      'GEO and AEO, AI Search Optimization',
      'Local SEO and Google Business Profile',
      'Google Ads and PPC management',
      'Social Media Marketing',
      'Website Design and Development',
      'AI Business Automation',
      'AI Video Creation',
      'Corporate Photography and Video',
      'Product Photography and Creative Design',
    ],
    contentAfter: [
      'The specific scope, deliverables, timelines and pricing for each engagement will be defined in the relevant service agreement or proposal.',
    ],
  },
  {
    id: 'engagements',
    title: '4. Service Engagements',
    content: [
      'Service engagements begin upon acceptance of a quotation or proposal and may be structured as:',
    ],
    list: [
      'Monthly retainer engagements (SEO, Local SEO, Google Ads, Social Media)',
      'Project-based engagements (Website Development, Photography, Video, AI Automation)',
    ],
    contentAfter: [
      'Each engagement is governed by the specific terms outlined in the applicable proposal or service agreement. In the event of any conflict between these Terms and a specific service agreement, the service agreement shall take precedence for that engagement.',
    ],
  },
  {
    id: 'responsibilities',
    title: '5. Client Responsibilities',
    content: [
      'To enable us to deliver the agreed services, clients are responsible for:',
    ],
    list: [
      'Providing accurate and complete information about their business, products and services',
      'Providing timely approvals, feedback and decisions required during the service delivery',
      'Granting necessary access to websites, advertising accounts, social media accounts and analytics platforms',
      'Supplying brand assets, content, images and other materials as required',
      'Ensuring they have the legal right to provide all materials and content to Static Savvy Media',
      'Complying with applicable laws and regulations in their jurisdiction',
    ],
    contentAfter: [
      'Delays caused by late client approvals, missing materials or incomplete information may affect project timelines and deliverables. Static Savvy Media is not responsible for delays resulting from circumstances within the client\'s control.',
    ],
  },
  {
    id: 'payments',
    title: '6. Pricing, Fees and Payments',
    content: [
      'Pricing for services is provided in written quotations or proposals and may vary based on the scope of work, market and service type.',
      'Indian clients are invoiced in INR. Malaysian clients are invoiced in MYR. Payment is via bank transfer, we provide local banking details for both markets.',
      'Monthly retainer engagements are invoiced at the beginning of each month. Project-based engagements may be invoiced in milestones as defined in the service agreement.',
      'Late payments may result in suspension of services until payment is received.',
    ],
  },
  {
    id: 'scope-revisions',
    title: '7. Project Scope and Revisions',
    content: [
      'For project-based work, the scope of deliverables is defined in the accepted proposal. Any work beyond the agreed scope will be subject to additional charges and will be communicated to the client before proceeding.',
      'Revision rounds, where applicable, are specified in the service agreement. Additional revisions beyond the agreed scope will be quoted separately.',
    ],
  },
  {
    id: 'ip',
    title: '8. Intellectual Property',
    content: [
      'Upon full payment, the client receives ownership of the final deliverables created specifically for their engagement by Static Savvy Media.',
      'Static Savvy Media retains the right to display completed work in its portfolio, case studies and marketing materials unless otherwise agreed in writing.',
      'Third-party assets, stock images, fonts, plugins, templates and licensed materials used in deliverables remain subject to their original licence terms.',
      'Clients retain full ownership of their pre-existing brand assets, logos, content and materials provided to Static Savvy Media.',
    ],
  },
  {
    id: 'client-content',
    title: '9. Client-Provided Content and Materials',
    content: [
      'Clients warrant that all content, images, videos, logos and materials provided to Static Savvy Media do not infringe on the intellectual property rights, privacy rights or any other rights of third parties.',
      'Clients are solely responsible for the legal compliance of the content they provide. Static Savvy Media is not liable for any legal claims arising from client-provided content.',
    ],
  },
  {
    id: 'third-party',
    title: '10. Third-Party Platforms and Services',
    content: [
      'Our services may involve the use of third-party platforms including but not limited to:',
    ],
    list: [
      'Google (Search, Ads, Business Profile, Analytics)',
      'Meta (Facebook, Instagram)',
      'WhatsApp (Meta)',
      'WordPress and hosting providers',
      'Analytics and tracking platforms',
      'AI search and language model platforms',
    ],
    contentAfter: [
      'Static Savvy Media is not responsible for changes, outages, policy updates or service disruptions on third-party platforms. Clients acknowledge that third-party platform terms of service also apply to their use of those platforms through our services.',
    ],
  },
  {
    id: 'disclaimer',
    title: '11. Results Disclaimer',
    content: [
      'Digital marketing outcomes depend on many factors outside Static Savvy Media\'s direct control, including:',
    ],
    list: [
      'Search engine algorithm changes and updates',
      'Advertising platform policy changes',
      'Industry competition and market conditions',
      'Third-party platform behaviour and AI model updates',
      'Client implementation, approvals and business decisions',
      'Website technical conditions and hosting performance',
    ],
    contentAfter: [
      'Static Savvy Media does not guarantee specific rankings, AI search citations, traffic volumes, lead generation numbers, sales outcomes, advertising ROI or any other specific business results. Past performance does not guarantee future results. We are committed to delivering professional, evidence-based work that maximises the probability of positive outcomes within the constraints of the platforms and market conditions.',
    ],
  },
  {
    id: 'liability',
    title: '12. Limitation of Liability',
    content: [
      'To the maximum extent permitted by applicable law, Static Savvy Media shall not be liable for any indirect, incidental, special, consequential or punitive damages arising from the use of our services or website.',
      'Static Savvy Media\'s total liability for any claim arising from or related to a specific service engagement shall not exceed the total fees paid by the client for that specific engagement during the twelve (12) months preceding the claim.',
      'We are not liable for losses caused by third-party platforms, force majeure events, circumstances beyond our reasonable control, or actions or omissions of the client.',
    ],
  },
  {
    id: 'confidentiality',
    title: '13. Confidentiality',
    content: [
      'Both parties agree to keep confidential any proprietary or sensitive information shared during the course of an engagement. This includes business strategies, financial information, unreleased products, client lists and trade secrets.',
      'Confidential information shall not be disclosed to third parties without prior written consent, except as required by law.',
    ],
  },
  {
    id: 'termination',
    title: '14. Termination',
    content: [
      'Monthly retainer engagements may be terminated by either party with written notice as specified in the service agreement.',
      'Project-based engagements may be terminated only as outlined in the applicable service agreement.',
      'Upon termination, the client shall pay for all work completed up to the date of termination. Any outstanding work beyond the termination date is not obligated unless otherwise agreed.',
      'Static Savvy Media reserves the right to suspend or terminate services if payment is overdue, if the client breaches these Terms, or if continued service would create legal or ethical concerns.',
    ],
  },
  {
    id: 'jurisdiction',
    title: '15. Governing Law and Jurisdiction',
    content: [
      'These Terms are governed by the applicable laws of the market in which the client is served:',
    ],
    list: [
      'India: These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from or related to these Terms or our services to Indian clients shall be subject to the exclusive jurisdiction of the courts in Madurai, Tamil Nadu, India.',
      'Malaysia: These Terms shall be governed by and construed in accordance with the laws of Malaysia. Any disputes arising from or related to these Terms or our services to Malaysian clients shall be subject to the exclusive jurisdiction of the courts in Malaysia.',
    ],
    contentAfter: [
      'Nothing in these Terms limits the client\'s rights under consumer protection or data protection laws applicable in their jurisdiction.',
    ],
  },
  {
    id: 'changes',
    title: '16. Changes to These Terms',
    content: [
      'Static Savvy Media may update these Terms from time to time to reflect changes in our services, business practices or legal requirements.',
      'When material changes are made, we will update the date at the top of this page and, where appropriate, notify existing clients through direct communication.',
      'Continued use of our website or services after changes are posted constitutes acceptance of the updated Terms.',
    ],
  },
  {
    id: 'contact',
    title: '17. Contact Information',
    content: [
      'If you have any questions about these Terms of Service, please contact us:',
    ],
    list: [
      'WhatsApp: +91 99440 40345',
      'Website: staticsavvymedia.com',
    ],
    contentAfter: [
      'We aim to respond to all enquiries within 5 business days.',
    ],
  },
]

export default function Terms() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: `Terms of Service | ${SITE_NAME}`,
      description: `Terms of Service governing the use of ${SITE_NAME}'s digital marketing, SEO, AI search, advertising, website and creative services across India and Malaysia.`,
      canonical: `${SITE_URL}/terms/`,
      ogType: 'website',
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Terms of Service', item: `${SITE_URL}/terms/` },
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
    <div className="terms-page">
      <Breadcrumbs />

      {/* HERO */}
      <section className="section">
        <div className="container">
          <div className="terms-hero">
            <span className="terms-hero__badge">Legal / Terms</span>
            <h1 className="hero__title terms-hero__title"><span className="hero__title-white">Terms of </span><span className="hero__title-gradient">Service</span></h1>
            <p className="terms-hero__text">
              These Terms govern the relationship between Static Savvy Media and clients
              across India and Malaysia. They apply to our digital marketing, SEO, GEO,
              AEO, AI search, advertising, website, photography and creative services.
            </p>
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      <section className="section section--alt">
        <div className="container">
          <div className="terms-content">
            <div className="terms-updated">
              <span className="terms-updated__label">Last Updated:</span>
              <span className="terms-updated__date">2026</span>
            </div>

            {SECTIONS.map((section) => (
              <ScrollReveal key={section.id}>
                <article className="terms-section" id={section.id}>
                  <h2 className="terms-section__title">{section.title}</h2>
                  {section.content.map((paragraph, i) => (
                    <p key={i} className="terms-section__text">{paragraph}</p>
                  ))}
                  {section.list && (
                    <ul className="terms-section__list">
                      {section.list.map((item, i) => (
                        <li key={i}>
                          {item.startsWith('WhatsApp:') ? (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', verticalAlign: 'middle' }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#25D366', flexShrink: 0 }} aria-hidden="true">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                              </svg>
                              <span>{item}</span>
                            </span>
                          ) : item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.contentAfter && section.contentAfter.map((paragraph, i) => (
                    <p key={i} className="terms-section__text">{paragraph}</p>
                  ))}
                </article>
              </ScrollReveal>
            ))}

            {/* NAVIGATION SIDEBAR */}
            <nav className="terms-toc" aria-label="Terms of Service sections">
              <h2 className="terms-toc__title">Contents</h2>
              <ul className="terms-toc__list">
                {SECTIONS.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="terms-toc__link">
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
