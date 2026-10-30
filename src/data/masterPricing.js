import { PLAN_TIERS } from './cityPages.js'
import { PRICING_COUNTRIES, UNLISTED_PRICING_PATHS } from './pricingLinks.js'

/**
 * Country pricing (unlisted, noindex pages under /p/): four services x four countries. Prices supplied by the owner on
 * 28 Oct 2026. Plain data only (also read by the build-time prerender for Offer schema).
 * SEO tier names and features reuse PLAN_TIERS (cityPages.js) so the city pages and this page never
 * disagree; the SEO amounts live only here (no prices on public pages, owner's instruction 29 Oct 2026).
 */

/** Monthly SEO & GBP prices per country, in the order of PLAN_TIERS[country].plans. */
const SEO_PRICES = { india: [6000, 12000, 20000], malaysia: [800, 1500, 2000], dubai: [800, 2000, 3000], singapore: [500, 1000, 1500] }
/* PRICING_COUNTRIES and UNLISTED_PRICING_PATHS live in pricingLinks.js (no amounts) so the main bundle
 * (seoConfig.js) can import them without pulling these prices in. */
export { PRICING_COUNTRIES, UNLISTED_PRICING_PATHS }

export function formatPrice(country, amount) {
  const c = PRICING_COUNTRIES.find((x) => x.key === country)
  return `${c.symbol}${amount.toLocaleString(country === 'india' ? 'en-IN' : 'en-US')}`
}

const seoPlans = (country) => PLAN_TIERS[country].plans.map((p, i) => ({ name: p.name, price: SEO_PRICES[country][i], features: p.features }))

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
    /* Deliverables come from the site's website service page (build standards and build types). `from` = first tier that includes it. */
    rows: [
      { t: 'Mobile-first business website, WordPress or Next.js', from: 0 },
      { t: 'WhatsApp CTA above the fold and after key sections', from: 0 },
      { t: 'SEO foundation: schema, canonical tags, XML sitemap, robots.txt', from: 0 },
      { t: 'GA4 + WhatsApp click tracking, verified before launch', from: 0 },
      { t: 'Tested on a staging site before go-live', from: 0 },
      { t: 'Service and location page structure that grows with you', from: 1 },
      { t: 'Core Web Vitals targets on mobile (LCP < 2.5s, INP < 200ms, CLS < 0.1)', from: 1 },
      { t: 'AI crawler access (GPTBot, PerplexityBot, ClaudeBot, Google-Extended)', from: 1 },
      { t: '301 redirects for every old URL when you move from Wix, Squarespace or an old site', from: 1 },
      { t: 'You own the code, in a repository in your name', from: 1 },
      { t: 'E-commerce (WooCommerce or headless Shopify), multi-location systems or Ads landing pages', from: 2 },
      { t: 'Scope, timeline and milestones agreed in writing', from: 2 },
    ],
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
    /* From the social media service page (what is included, posting frequency per tier). */
    rows: [
      { label: 'Posting frequency', vals: ['3 posts a week per platform', '5 posts a week', 'Daily posting plus stories'] },
      { t: 'Monthly content calendar, approved by you before anything is scheduled', from: 0 },
      { t: 'Graphic design and platform-native captions', from: 0 },
      { t: 'Hashtag and keyword strategy', from: 0 },
      { t: 'Monthly report: reach, engagement, followers, link and WhatsApp clicks', from: 0 },
      { t: 'Carousels, reel scripts and editing', from: 1 },
      { t: 'Community management: comments and DMs within agreed windows', from: 1 },
      { t: 'Meta ad campaign management with WhatsApp conversion tracking', from: 1 },
      { t: 'LinkedIn and YouTube planning where your buyers are', from: 2 },
    ],
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
    /* From the Google Ads and social service pages (set-up, tracking, optimisation, reporting). */
    rows: [
      { t: 'Ad account audit or clean set-up', from: 0 },
      { t: 'Keyword and audience research, with a negative keyword list', from: 0 },
      { t: 'Call, form and WhatsApp conversion tracking in GA4 and the ad platform', from: 0 },
      { t: 'Google Search campaign for your core service', from: 0 },
      { t: 'Monthly report: spend, leads and cost per lead, in plain English', from: 0 },
      { t: 'Meta (Facebook and Instagram) lead campaigns', from: 1 },
      { t: 'Remarketing to visitors who did not enquire', from: 1 },
      { t: 'Weekly optimisation: search terms, bids, schedule and devices', from: 1 },
      { t: 'LinkedIn and B2B search campaigns aimed at decision-makers', from: 2 },
      { t: 'Lead forms with qualifying questions', from: 2 },
    ],
  },
]

/** Normalised plans for one service + country: [{ name, price|null, features?, note?, featured }] */
export function plansFor(service, country) {
  const list = service.plansByCountry
    ? service.plansByCountry[country]
    : service.tiers.map((name, i) => ({ name, price: service.prices[country][i], note: service.tierNotes?.[i], features: tierFeatures(service, i) }))
  return list.map((p, i) => ({ ...p, featured: i === 1 }))
}

/** Card list for tier i: tier 0 lists its rows; later tiers say "Everything in <previous>" plus what they add.
 * A row with `vals` (one value per tier, e.g. posting frequency) is shown on every tier. */
function tierFeatures(service, i) {
  const own = service.rows.filter((r) => r.vals || r.from === i).map((r) => (r.vals ? r.vals[i] : r.t))
  const vals = own.filter((_, k) => service.rows.filter((r) => r.vals || r.from === i)[k].vals)
  const rest = own.filter((x) => !vals.includes(x))
  return i === 0 ? own : [...vals, `Everything in ${service.tiers[i - 1]}`, ...rest]
}

/** Comparison-table rows for one service + country: [{ label, tiers: [bool, bool, bool] }]. */
export function compareRows(service, country) {
  if (service.rows) return service.rows.map((r) => (r.vals ? { label: r.label, tiers: r.vals } : { label: r.t, tiers: [0, 1, 2].map((i) => i >= r.from) }))
  /* SEO: derive from the PLAN_TIERS lists (each tier = everything in the previous + its own items). */
  const plans = service.plansByCountry[country]
  const out = []
  plans.forEach((p, i) => p.features.filter((f) => !/^Everything in/i.test(f)).forEach((f) => out.push({ label: f, tiers: [0, 1, 2].map((j) => j >= i) })))
  return out
}

export const CURRENCY_NAMES = { india: 'Indian rupees (₹)', malaysia: 'Malaysian ringgit (RM)', dubai: 'UAE dirham (AED)', singapore: 'Singapore dollars (SGD)' }

/** FAQs for one country's page (objection handling; every answer restates something the site already says). */
export function pricingFaqsFor(country) {
  const posts = country === 'dubai' ? 8 : 12
  const wa = PRICING_COUNTRIES.find((x) => x.key === country).whatsapp
  return [
    { question: 'Is there a minimum contract or lock-in?', answer: 'No. Our monthly plans have no lock-in. Retainers are invoiced at the start of each month and either side can end them with written notice, as set out in your service agreement. Your Google Business Profile, Search Console, Analytics and ad accounts stay in your name throughout.' },
    { question: 'How soon will I see results?', answer: 'It depends on the channel. Google Business Profile improvements can lift Maps visibility within weeks. Website rankings for competitive keywords usually take several months and build as content, reviews and links grow. Paid ads can bring enquiries within days of launch, with the first 2 to 4 weeks spent learning and optimising. Organic social media compounds over 3 to 6 months.' },
    { question: 'Do you guarantee rankings or a number of leads?', answer: 'No, and you should be wary of anyone who does. Rankings, AI citations and lead numbers depend on search engines, ad platforms and your market, which nobody controls. What we commit to is the agreed monthly work, honest reporting and a clear plan for what we do next.' },
    { question: 'How will I know what you are doing each month?', answer: 'You get a monthly report taken from your own Google Business Profile, Search Console, GA4 and ad accounts, with a plain-English summary of what changed and what we do next. Day-to-day updates come over WhatsApp from the people doing your work, and we hold kick-off and monthly review calls on Google Meet or Zoom.' },
    { question: 'Is ad spend included in social media and lead generation plans?', answer: 'No. Ad spend is extra and is paid directly to Google, Meta or LinkedIn. The plan price covers our management work. We recommend a starting budget after reviewing your market and competitors.' },
    { question: 'How do payments work?', answer: 'Monthly plans are invoiced at the beginning of each month. Website projects are a one-time fee and may be invoiced in milestones set out in your agreement. Payment is by bank transfer.' },
    { question: 'Can I cancel or change plans later?', answer: 'Yes. If your needs change, tell us and we will re-scope the plan in writing. A monthly plan can be ended with written notice under your service agreement. You pay for work completed up to the end date, and you keep your accounts and data.' },
    { question: 'What is the difference between the three SEO plans?', answer: `The first plan covers your Google Business Profile (${posts} posts a month). The second adds on-page and technical website SEO with 4 blog posts a month. The third adds Answer Engine Optimisation (AEO) and Generative Engine Optimisation (GEO) so AI tools such as ChatGPT, Perplexity and Google AI Overviews can find and cite you.` },
    { question: 'Who owns the website and content?', answer: 'You do. Website code sits in a repository owned by you, and once paid in full you own the deliverables created for you. Third-party themes, plugins, fonts and stock images stay under their own licences.' },
    { question: 'How do we get started?', answer: `Message us on WhatsApp at ${wa} or send the enquiry form. We start with a free review of your website, Google Business Profile and competitors, then send a written plan and quote before you commit.` },
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
