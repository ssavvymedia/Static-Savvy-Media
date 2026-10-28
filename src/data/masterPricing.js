import { PRICE_TIERS } from './cityPages.js'

/**
 * Country pricing (unlisted, noindex pages under /p/): four services x four countries. Prices supplied by the owner on
 * 28 Oct 2026. Plain data only (also read by the build-time prerender for Offer schema).
 * SEO tier features reuse PRICE_TIERS (cityPages.js) so the city pages and this page never disagree.
 */
export const PRICING_COUNTRIES = [
  { key: 'india', label: 'India', flag: '🇮🇳', currency: 'INR', symbol: '₹', iso: 'IN', countryName: 'India', whatsapp: '+91 99440 40345' },
  { key: 'malaysia', label: 'Malaysia', flag: '🇲🇾', currency: 'MYR', symbol: 'RM ', iso: 'MY', countryName: 'Malaysia', whatsapp: '+60 12-453 7030' },
  { key: 'dubai', label: 'Dubai', flag: '🇦🇪', currency: 'AED', symbol: 'AED ', iso: 'AE', countryName: 'United Arab Emirates', whatsapp: '+91 99440 40345' },
  { key: 'singapore', label: 'Singapore', flag: '🇸🇬', currency: 'SGD', symbol: 'SGD ', iso: 'SG', countryName: 'Singapore', whatsapp: '+91 99440 40345' },
]

/** Unlisted per-country pricing pages: noindex,nofollow, never linked, not in the sitemap or llms.txt. */
export const UNLISTED_PRICING_PATHS = {
  india: '/p/india-9xajei/',
  malaysia: '/p/malaysia-2josdx/',
  dubai: '/p/dubai-a8aokh/',
  singapore: '/p/singapore-xseszo/',
}

export function formatPrice(country, amount) {
  const c = PRICING_COUNTRIES.find((x) => x.key === country)
  return `${c.symbol}${amount.toLocaleString(country === 'india' ? 'en-IN' : 'en-US')}`
}

const seoPlans = (country) => PRICE_TIERS[country].plans.map((p) => ({ name: p.name, price: p.price, features: p.features }))

const P = (india, malaysia, dubai, singapore) => ({ india, malaysia, dubai, singapore })

/** billing: 'month' | 'once'. A tier with price null is "Custom - Let's Talk". */
export const PRICING_SERVICES = [
  {
    key: 'seo',
    title: 'SEO & Google Business Profile',
    serviceType: 'Search engine optimization',
    billing: 'month',
    blurb: 'Google Business Profile management, website SEO with 4 blogs a month, and AI search optimisation (AEO + GEO).',
    plansByCountry: P(seoPlans('india'), seoPlans('malaysia'), seoPlans('dubai'), seoPlans('singapore')),
  },
  {
    key: 'website',
    title: 'Website development',
    serviceType: 'Website design and development',
    billing: 'once',
    blurb: 'One-time website build. Need something bigger or bespoke? Tell us what you need and we will quote it.',
    tiers: ['Starter', 'Business', 'Custom'],
    tierNotes: ['One-time fee', 'One-time fee', 'Scoped and quoted for your project'],
    prices: P([15000, 30000, null], [1500, 2500, null], [2000, 4000, null], [1500, 2500, null]),
  },
  {
    key: 'social',
    title: 'Social media marketing',
    serviceType: 'Social media marketing',
    billing: 'month',
    note: 'Ad spend extra',
    blurb: 'Monthly social media management. Ad spend is not included and is billed separately.',
    tiers: ['Starter', 'Growth', 'Pro'],
    prices: P([8000, 15000, 30000], [1200, 2000, 3000], [1000, 2000, 3000], [800, 2200, 3500]),
  },
  {
    key: 'leads',
    title: 'Lead generation',
    serviceType: 'Lead generation',
    billing: 'month',
    note: 'Ad spend extra',
    blurb: 'Monthly lead generation campaigns, including a B2B plan. Ad spend is not included and is billed separately.',
    tiers: ['Starter', 'Growth', 'B2B'],
    prices: P([10000, 25000, 30000], [1000, 2000, 3000], [1200, 2000, 3500], [800, 1200, 2500]),
  },
]

/** Normalised plans for one service + country: [{ name, price|null, features?, note?, featured }] */
export function plansFor(service, country) {
  const list = service.plansByCountry
    ? service.plansByCountry[country]
    : service.tiers.map((name, i) => ({ name, price: service.prices[country][i], note: service.tierNotes?.[i] }))
  return list.map((p, i) => ({ ...p, featured: i === 1 }))
}

const CURRENCY_NAMES = { india: 'Indian rupees (₹)', malaysia: 'Malaysian ringgit (RM)', dubai: 'UAE dirham (AED)', singapore: 'Singapore dollars (SGD)' }

/** FAQs for one country's page (no mention of the other countries' pages). */
export function pricingFaqsFor(country) {
  const posts = country === 'dubai' ? 8 : 12
  return [
    { question: 'Are these prices monthly?', answer: 'SEO & Google Business Profile, social media marketing and lead generation are monthly fees. Website development is a one-time fee.' },
    { question: 'Is ad spend included in social media and lead generation plans?', answer: 'No. Ad spend is extra for social media marketing and lead generation. The plan price covers our management work; the budget you spend on ads is separate.' },
    { question: 'What is the difference between the three SEO plans?', answer: `The first plan covers your Google Business Profile only (${posts} posts a month). The second adds website SEO with 4 blog posts a month. The third adds Answer Engine Optimisation (AEO) and Generative Engine Optimisation (GEO) for AI search tools such as ChatGPT, Perplexity and Google AI Overviews.` },
    { question: 'Which currency are these prices in?', answer: `All prices on this page are in ${CURRENCY_NAMES[country]}.` },
    { question: 'How much does a custom website cost?', answer: 'Custom websites are quoted per project. Message us on WhatsApp or send an enquiry with what you need and we will scope it and send a written quote.' },
    { question: 'How do I get started?', answer: 'Message us on WhatsApp or send the enquiry form with your business and the plan you are interested in. We will review your current setup and confirm the right plan before you commit.' },
  ]
}

/** Service nodes with one Offer per priced tier for one country. */
export function pricingServiceNodes(host, orgId, countryKey) {
  const c = PRICING_COUNTRIES.find((x) => x.key === countryKey)
  const url = `${host}${UNLISTED_PRICING_PATHS[countryKey]}`
  return PRICING_SERVICES.map((s) => ({
    '@type': 'Service',
    '@id': `${url}#${s.key}`,
    name: s.title,
    serviceType: s.serviceType,
    provider: { '@id': orgId },
    url,
    areaServed: { '@type': 'Country', name: c.countryName },
    offers: plansFor(s, c.key).filter((p) => p.price != null).map((p) => ({
      '@type': 'Offer',
      name: `${s.title}: ${p.name}`,
      price: String(p.price),
      priceCurrency: c.currency,
      eligibleRegion: { '@type': 'Country', name: c.countryName },
      url,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: String(p.price),
        priceCurrency: c.currency,
        ...(s.billing === 'month' ? { unitText: 'MONTH' } : {}),
      },
    })),
  }))
}
