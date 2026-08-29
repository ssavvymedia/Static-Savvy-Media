/**
 * Pricing configuration for India and Malaysia.
 */

export const indiaPricingPlans = [
  { slug: 'seo', name: 'SEO Pricing', path: '/pricing/india/seo/' },
  { slug: 'local-seo', name: 'Local SEO Pricing', path: '/pricing/india/local-seo/' },
  { slug: 'google-ads', name: 'Google Ads Pricing', path: '/pricing/india/google-ads/' },
  { slug: 'social-media', name: 'Social Media Pricing', path: '/pricing/india/social-media/' },
  { slug: 'website', name: 'Website Pricing', path: '/pricing/india/website/' },
  { slug: 'ai-services', name: 'AI Services Pricing', path: '/pricing/india/ai-services/' },
  { slug: 'photography-video', name: 'Photography & Video Pricing', path: '/pricing/india/photography-video/' },
]

export const malaysiaPricingPlans = [
  { slug: 'seo', name: 'SEO Pricing', path: '/pricing/malaysia/seo/' },
  { slug: 'local-seo', name: 'Local SEO Pricing', path: '/pricing/malaysia/local-seo/' },
  { slug: 'google-ads', name: 'Google Ads Pricing', path: '/pricing/malaysia/google-ads/' },
  { slug: 'social-media', name: 'Social Media Pricing', path: '/pricing/malaysia/social-media/' },
  { slug: 'website', name: 'Website Pricing', path: '/pricing/malaysia/website/' },
  { slug: 'ai-services', name: 'AI Services Pricing', path: '/pricing/malaysia/ai-services/' },
  { slug: 'photography-video', name: 'Photography & Video Pricing', path: '/pricing/malaysia/photography-video/' },
]

export const pricingPlans = indiaPricingPlans

export function getPricingPlans(country = 'india') {
  return country === 'malaysia' ? malaysiaPricingPlans : indiaPricingPlans
}

export function getPricingPlanBySlug(slug, country = 'india') {
  const plans = getPricingPlans(country)
  return plans.find((plan) => plan.slug === slug) || null
}
