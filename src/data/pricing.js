/**
 * Pricing configuration.
 * Structural placeholders only — populated with approved content in the next phase.
 * NO pricing amounts are invented at this stage.
 */

export const pricingPlans = [
  { slug: 'seo', name: 'SEO Pricing', path: '/pricing/seo/' },
  { slug: 'local-seo', name: 'Local SEO Pricing', path: '/pricing/local-seo/' },
  { slug: 'google-ads', name: 'Google Ads Pricing', path: '/pricing/google-ads/' },
  { slug: 'social-media-marketing', name: 'Social Media Marketing Pricing', path: '/pricing/social-media-marketing/' },
  { slug: 'website-design-development', name: 'Website Design & Development Pricing', path: '/pricing/website-design-development/' },
  { slug: 'ai-services', name: 'AI Services Pricing', path: '/pricing/ai-services/' },
  { slug: 'photography-video', name: 'Photography & Video Pricing', path: '/pricing/photography-video/' },
]

export function getPricingPlanBySlug(slug) {
  return pricingPlans.find((plan) => plan.slug === slug) || null
}
