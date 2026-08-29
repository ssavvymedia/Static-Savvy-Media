import { services } from './services.js'
import { locations } from './locations.js'
import { industries } from './industries.js'
import { pricingPlans } from './pricing.js'
import { caseStudies } from './caseStudies.js'
import { blogCategories, blogPosts } from './blog.js'

/**
 * Navigation configuration.
 * Shared by Header / DesktopNav / MobileNav / Footer and Breadcrumbs.
 */

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services/', menu: services },
  { label: 'Locations', path: '/locations/', menu: locations },
  { label: 'Industries', path: '/industries/', menu: industries },
  { label: 'Case Studies', path: '/case-studies/' },
  { label: 'About', path: '/about/' },
  { label: 'Blog', path: '/blog/' },
  { label: 'FAQ', path: '/faq/' },
  { label: 'Contact', path: '/contact/' },
]

export const FOOTER_LINKS = {
  services,
  locations,
  industries,
  company: [
    { label: 'About', path: '/about/' },
    { label: 'Case Studies', path: '/case-studies/' },
    { label: 'Blog', path: '/blog/' },
    { label: 'Contact', path: '/contact/' },
  ],
  legal: [
    { label: 'FAQ', path: '/faq/' },
    { label: 'Privacy Policy', path: '/privacy-policy/' },
    { label: 'Terms of Service', path: '/terms/' },
    { label: 'Sitemap', path: '/sitemap/' },
  ],
}

export const BREADCRUMB_LABELS = {
  about: 'About',
  'deepan-kanz': 'Deepan Kanz',
  reviews: 'Reviews',
  services: 'Services',
  'geo-aeo-ai-search': 'GEO, AEO & AI Search',
  seo: 'SEO',
  'local-seo': 'Local SEO',
  'google-ads': 'Google Ads',
  'social-media': 'Social Media',
  'social-media-marketing': 'Social Media Marketing',
  website: 'Website',
  'website-design-development': 'Website Design & Development',
  'ai-business-automation': 'AI Business Automation',
  'corporate-photography-video': 'Corporate Photography & Video',
  'ai-video-creation': 'AI Video Creation',
  'product-photography-creative-design': 'Product Photography & Creative Design',
  locations: 'Locations',
  madurai: 'Madurai',
  thoothukudi: 'Thoothukudi',
  malaysia: 'Malaysia',
  industries: 'Industries',
  'retail-ecommerce': 'Retail & E-Commerce',
  'healthcare-clinics': 'Healthcare & Clinics',
  'education-training': 'Education & Training',
  'hospitality-hotels': 'Hospitality & Hotels',
  'textiles-madurai': 'Textiles (Madurai)',
  'port-marine-industrial-thoothukudi': 'Port, Marine & Industrial (Thoothukudi)',
  'smes-malaysia-grant-eligible': 'SMEs (Malaysia, Grant Eligible)',
  'real-estate-builders': 'Real Estate & Builders',
  pricing: 'Pricing',
  india: 'India Pricing',
  'ai-services': 'AI Services',
  'photography-video': 'Photography & Video',
  'case-studies': 'Case Studies',
  blog: 'Blog',
  'geo-aeo': 'GEO & AEO',
  'local-marketing': 'Local Marketing',
  'what-is-generative-engine-optimization': 'What is Generative Engine Optimization',
  'what-is-answer-engine-optimization': 'What is Answer Engine Optimization',
  'seo-agency-madurai-complete-guide': 'SEO Agency Madurai Complete Guide',
  'digital-marketing-malaysia-sme-grant-guide': 'Digital Marketing Malaysia SME Grant Guide',
  'local-seo-thoothukudi-businesses': 'Local SEO for Thoothukudi Businesses',
  contact: 'Contact',
  faq: 'FAQ',
  'privacy-policy': 'Privacy Policy',
  terms: 'Terms',
  sitemap: 'Sitemap',
}

export function getBreadcrumbLabel(segment) {
  return BREADCRUMB_LABELS[segment] || segment
}

// Re-export data collections for convenience.
export { services, locations, industries, pricingPlans, caseStudies, blogCategories, blogPosts }
