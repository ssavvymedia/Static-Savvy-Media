/**
 * AFFILIATE LINK MAP — the ONE place to swap in tracking links.
 *
 * Approved: hostinger_in (28 Oct 2026). Every other `url` below is still the provider's
 * plain official page and `affiliate` is false. When a programme approves Static Savvy Media:
 *   1. paste the tracking URL into `url`
 *   2. set `affiliate: true`
 * Every CTA that uses this map already renders rel="sponsored nofollow noopener" and target="_blank",
 * and each blog post that uses it shows an affiliate disclosure line. Nothing else needs to change.
 * Used by: src/pages/Blog/StaticBlogPost.jsx ({ cta: '<key>' } and { table } rows with a `link` key).
 * Plain data only (also loaded by Node at build time).
 */
export const AFFILIATE_REL = 'sponsored nofollow noopener'

export const AFFILIATE_LINKS = {
  /* ---------- Web hosting (blog: best-web-hosting-india-malaysia-small-business) ---------- */
  hostinger_in: { name: 'Hostinger (India)', url: 'https://www.hostinger.com/in?REFERRALCODE=deepankanz', affiliate: true },
  hostinger_my: { name: 'Hostinger (Malaysia)', url: 'https://www.hostinger.my/web-hosting', affiliate: false },
  milesweb: { name: 'MilesWeb', url: 'https://www.milesweb.in/hosting/web-hosting', affiliate: false },
  exabytes: { name: 'Exabytes', url: 'https://www.exabytes.my/web-hosting/business-web-hosting', affiliate: false },
  siteground: { name: 'SiteGround', url: 'https://www.siteground.com/web-hosting.htm', affiliate: false },
  cloudways: { name: 'Cloudways', url: 'https://www.cloudways.com/en/pricing.php', affiliate: false },

  /* ---------- Agentic AI tools (blog: agentic-ai-tools-small-business-marketing) ---------- */
  zapier_agents: { name: 'Zapier Agents', url: 'https://zapier.com/agents', affiliate: false },
  n8n: { name: 'n8n', url: 'https://n8n.io/pricing/', affiliate: false },
  make: { name: 'Make', url: 'https://www.make.com/en/pricing', affiliate: false },
  lindy: { name: 'Lindy', url: 'https://www.lindy.ai/pricing', affiliate: false },
  hubspot_breeze: { name: 'HubSpot Breeze agents', url: 'https://www.hubspot.com/products/artificial-intelligence', affiliate: false },
}

export function getAffiliate(key) {
  const a = AFFILIATE_LINKS[key]
  if (!a) throw new Error(`affiliateLinks: unknown key "${key}"`)
  return a
}
