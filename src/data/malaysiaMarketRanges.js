/* General Malaysian SEO market ranges (never Static Savvy Media prices).
 * Source: /blog/seo-cost-malaysia-price-guide/ (October 2026), which cites an October 2026 survey of
 * 16 Malaysian agencies that publish prices (RM650 – RM10,000 a month). Update both together. */
export const MY_SEO_RANGES = [
  ['Starter / local SEO', 'About RM500 – RM1,500 / month', 'Technical fixes, a small keyword set, key pages, Google Business Profile basics'],
  ['Growth SEO', 'About RM1,500 – RM5,000 / month', 'More keywords and pages, regular content, schema, local SEO across several Klang Valley areas'],
  ['Competitive / national SEO', 'RM5,000+ / month', 'Large or e-commerce sites, many locations, PR-level links, advanced technical SEO'],
  ['One-off SEO audit', 'Fixed fee', 'A technical and keyword audit without ongoing work, before you commit to a retainer'],
]
export const MY_RANGES_INTRO = 'General monthly market ranges for Malaysian SMEs, from our Malaysia SEO cost guide (October 2026). These are not Static Savvy Media prices: we quote in MYR after a free review, with no lock-in.'
export const MY_RANGES_NOTE = 'An October 2026 survey of 16 Malaysian agencies that print their prices found packages from RM650 to RM10,000 a month. Google or Meta ad spend is always separate.'
export const MY_RANGES_LINK = { to: '/blog/seo-cost-malaysia-price-guide/', label: 'Read the Malaysia SEO cost guide' }
export const MY_RANGES_COL = 'Typical Malaysian market range'
export const MY_COST_ANSWER = 'Published Malaysian market ranges are roughly RM500 to RM1,500 a month for starter or local SEO, RM1,500 to RM5,000 for growth SEO, and RM5,000 or more for competitive or national campaigns (our Malaysia SEO cost guide, October 2026). These are market ranges, not our prices: we quote each business in MYR after a free review, with no minimum term. Ad spend is always separate.'
/** Ready-made props for <MarketRangeTable>. */
export const myRangeTable = (heading) => ({ heading, intro: MY_RANGES_INTRO, colLabel: MY_RANGES_COL, rows: MY_SEO_RANGES, note: MY_RANGES_NOTE, link: MY_RANGES_LINK })
