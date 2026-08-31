import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import { breadcrumbListSchema } from '../../utils/schema.js'
import { SITE_URL, SITE_NAME } from '../../utils/constants.js'

const SITEMAP_SECTIONS = [
  {
    title: 'Main',
    links: [
      { label: 'Home', path: '/' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Services', path: '/services' },
      { label: 'Search Engine Optimization (SEO)', path: '/services/seo' },
      { label: 'GEO & AEO / AI Search Optimization', path: '/services/geo-aeo-ai-search' },
      { label: 'Local SEO & Google Business Profile', path: '/services/local-seo' },
      { label: 'Google Ads & PPC', path: '/services/google-ads' },
      { label: 'Social Media Marketing', path: '/services/social-media-marketing' },
      { label: 'Website Design & Development', path: '/services/website-design-development' },
      { label: 'AI Business Automation', path: '/services/ai-business-automation' },
      { label: 'AI Video Creation', path: '/services/ai-video-creation' },
      { label: 'Corporate Photography & Video', path: '/services/corporate-photography-video' },
      { label: 'Product Photography & Creative Design', path: '/services/product-photography-creative-design' },
    ],
  },
  {
    title: 'Locations',
    links: [
      { label: 'Locations', path: '/locations' },
      { label: 'Madurai', path: '/locations/madurai' },
      { label: 'Thoothukudi', path: '/locations/thoothukudi' },
      { label: 'Malaysia', path: '/locations/malaysia' },
    ],
  },
  {
    title: 'Industries',
    links: [
      { label: 'Industries', path: '/industries' },
      { label: 'Retail & Ecommerce', path: '/industries/retail-ecommerce' },
      { label: 'Healthcare & Clinics', path: '/industries/healthcare-clinics' },
      { label: 'Education & Training', path: '/industries/education-training' },
      { label: 'Hospitality & Hotels', path: '/industries/hospitality-hotels' },
      { label: 'Textiles, Madurai', path: '/industries/textiles-madurai' },
      { label: 'Port / Marine / Industrial, Thoothukudi', path: '/industries/port-marine-industrial-thoothukudi' },
      { label: 'SMEs, Malaysia', path: '/industries/smes-malaysia-grant-eligible' },
      { label: 'Real Estate & Builders', path: '/industries/real-estate-builders' },
    ],
  },
  {
    title: 'Case Studies',
    links: [
      { label: 'Case Studies', path: '/case-studies' },
      { label: 'Client 1', path: '/case-studies/client-1' },
      { label: 'Client 2', path: '/case-studies/client-2' },
      { label: 'Client 3', path: '/case-studies/client-3' },
      { label: 'Client 4', path: '/case-studies/client-4' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', path: '/about' },
      { label: 'Founder', path: '/about/deepan-kanz' },
      { label: 'Reviews', path: '/about/reviews' },
      { label: 'Contact', path: '/contact' },
    ],
  },
  {
    title: 'Blog',
    links: [
      { label: 'Blog', path: '/blog' },
      { label: 'SEO', path: '/blog/seo' },
      { label: 'GEO / AEO', path: '/blog/geo-aeo' },
      { label: 'Local Marketing', path: '/blog/local-marketing' },
      { label: 'What Is GEO', path: '/blog/what-is-generative-engine-optimization' },
      { label: 'What Is AEO', path: '/blog/what-is-answer-engine-optimization' },
      { label: 'SEO Agency Madurai Guide', path: '/blog/seo-agency-madurai-complete-guide' },
      { label: 'Malaysia SME Grant Guide', path: '/blog/digital-marketing-malaysia-sme-grant-guide' },
      { label: 'Local SEO Thoothukudi', path: '/blog/local-seo-thoothukudi-businesses' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'FAQ', path: '/faq' },
      { label: 'Privacy Policy', path: '/privacy-policy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Sitemap', path: '/sitemap' },
    ],
  },
]

export default function Sitemap() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: `HTML Sitemap | ${SITE_NAME}`,
      description: `Explore the ${SITE_NAME} website through our HTML sitemap, including services, locations, industries, pricing, case studies, blog, company and legal pages.`,
      canonical: `${SITE_URL}/sitemap/`,
      ogType: 'website',
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Sitemap', item: `${SITE_URL}/sitemap/` },
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
    <div className="sitemap-page">
      <Breadcrumbs />

      {/* HERO */}
      <section className="section">
        <div className="container">
          <div className="sitemap-hero">
            <h1 className="hero__title sitemap-hero__title"><span className="hero__title-white">Site</span><span className="hero__title-gradient">map</span></h1>
            <p className="sitemap-hero__text">
              An organized overview of the main Static Savvy Media website pages.
              Find services, locations, industries, pricing, case studies, blog
              articles and company information quickly.
            </p>
          </div>
        </div>
      </section>

      {/* SITEMAP LINKS */}
      <section className="section section--alt">
        <div className="container">
          <div className="sitemap-grid">
            {SITEMAP_SECTIONS.map((section) => (
              <ScrollReveal key={section.title}>
                <div className="sitemap-section">
                  <h2 className="sitemap-section__title">{section.title}</h2>
                  <ul className="sitemap-section__list">
                    {section.links.map((link) => (
                      <li key={link.path}>
                        <Link to={link.path} className="sitemap-link">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
