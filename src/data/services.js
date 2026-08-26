/**
 * Services configuration.
 * Approved service names and descriptions for the Static Savvy Media website.
 */

export const SERVICE_CATEGORIES = [
  { slug: 'search-visibility', label: 'Search & Visibility' },
  { slug: 'brand-growth', label: 'Brand & Growth' },
  { slug: 'ai-automation', label: 'AI & Automation' },
  { slug: 'visual-content', label: 'Visual Content' },
]

export const services = [
  {
    slug: 'seo',
    name: 'Search Engine Optimization (SEO)',
    path: '/services/seo/',
    icon: 'seo',
    monogram: 'SEO',
    category: 'Search & Visibility',
    summary:
      'Technical SEO, keyword strategy, content development, and link building that drives consistent organic traffic growth month on month.',
  },
  {
    slug: 'geo-aeo-ai-search',
    name: 'GEO & AEO, AI Search Optimization',
    path: '/services/geo-aeo-ai-search/',
    icon: 'geo-aeo',
    monogram: 'GEO',
    category: 'Search & Visibility',
    summary:
      'Our flagship service. We structure your online presence so ChatGPT, Perplexity, and Google AI Overviews cite your business as the authoritative answer in your category.',
  },
  {
    slug: 'local-seo',
    name: 'Local SEO & Google Business Profile',
    path: '/services/local-seo/',
    icon: 'local-seo',
    monogram: 'LOC',
    category: 'Search & Visibility',
    summary:
      'Rank in Google Maps and local search for every city where your clients are looking, Madurai, Thoothukudi, and beyond.',
  },
  {
    slug: 'google-ads',
    name: 'Google Ads & PPC',
    path: '/services/google-ads/',
    icon: 'google-ads',
    monogram: 'ADS',
    category: 'Search & Visibility',
    summary:
      'High-ROI paid search campaigns managed by certified specialists. Every rupee and ringgit tracked back to real business outcomes.',
  },
  {
    slug: 'social-media-marketing',
    name: 'Social Media Marketing',
    path: '/services/social-media-marketing/',
    icon: 'social-media',
    monogram: 'SMM',
    category: 'Brand & Growth',
    summary:
      'Instagram, Facebook, and LinkedIn content and ad management that builds brand equity and drives qualified leads.',
  },
  {
    slug: 'website-design-development',
    name: 'Website Design & Development',
    path: '/services/website-design-development/',
    icon: 'website',
    monogram: 'WEB',
    category: 'Brand & Growth',
    summary:
      'SEO-ready, Core Web Vitals-optimised websites built to convert. Next.js or WordPress chosen for your project, not ours.',
  },
  {
    slug: 'ai-business-automation',
    name: 'AI Business Automation',
    path: '/services/ai-business-automation/',
    icon: 'ai-automation',
    monogram: 'AI',
    category: 'AI & Automation',
    summary:
      'Automate repetitive workflows, deploy AI chatbots, and integrate intelligent tools that free your team to focus on growth.',
  },
  {
    slug: 'ai-video-creation',
    name: 'AI Video Creation',
    path: '/services/ai-video-creation/',
    icon: 'ai-video',
    monogram: 'VID',
    category: 'AI & Automation',
    summary:
      'Marketing-grade videos produced with AI at a fraction of traditional production cost and in a fraction of the time.',
  },
  {
    slug: 'corporate-photography-video',
    name: 'Corporate Photography & Video',
    path: '/services/corporate-photography-video/',
    icon: 'photo-video',
    monogram: 'MED',
    category: 'Visual Content',
    summary:
      'Professional brand imagery and video production from our Madurai studio, content that builds trust before a word is read.',
  },
  {
    slug: 'product-photography-creative-design',
    name: 'Product Photography & Creative Design',
    path: '/services/product-photography-creative-design/',
    icon: 'creative',
    monogram: 'CRE',
    category: 'Visual Content',
    summary:
      'E-commerce-ready product imagery and graphic design that converts browsers into buyers.',
  },
]

export function getServiceBySlug(slug) {
  return services.find((service) => service.slug === slug) || null
}