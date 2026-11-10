/* Extra in-body links rendered by MainLayout (RelatedLinks): guides that had too few internal links,
 * and a Madurai HQ link on every other city page (Madurai HQ must stay the strongest page). Plain data. */
export const HQ_LINK = { to: '/locations/madurai/', label: 'Static Savvy Media HQ in Madurai' }

export const RELATED_LINKS = {
  '/services/geo-aeo-ai-search/': [
    { to: '/blog/how-to-rank-in-ai-search/', label: 'Guide: how to rank in AI search' },
    { to: '/blog/what-is-geo-generative-engine-optimization-in-digital-marketing/', label: 'What is GEO in digital marketing?' },
  ],
  '/services/geo-aeo-ai-search/madurai/': [
    { to: '/blog/how-to-rank-in-ai-search/', label: 'Guide: how to rank in AI search' },
  ],
  '/services/seo/madurai/': [
    { to: '/blog/seo-audit-services-madurai/', label: 'What an SEO audit in Madurai checks' },
    { to: '/blog/how-to-choose-the-right-digital-marketing-agency-in-madurai/', label: 'How to choose a digital marketing agency in Madurai' },
  ],
  '/locations/madurai/': [
    { to: '/blog/how-to-choose-the-right-digital-marketing-agency-in-madurai/', label: 'How to choose a digital marketing agency in Madurai' },
    { to: '/blog/seo-audit-services-madurai/', label: 'What an SEO audit in Madurai checks' },
    { to: '/blog/local-marketing/', label: 'Local marketing guides' },
  ],
  '/services/local-seo/madurai/': [
    { to: '/blog/local-seo-guide-hardware-stores-retail-madurai/', label: 'Local SEO for hardware and retail stores in Madurai' },
    { to: '/blog/local-marketing/', label: 'Local marketing guides' },
  ],
  '/services/social-media-marketing/madurai/': [
    { to: '/blog/social-media-marketing-salons-aesthetics-madurai/', label: 'Social media marketing for salons and aesthetics clinics in Madurai' },
  ],
  '/industries/healthcare-clinics/': [
    { to: '/blog/social-media-marketing-salons-aesthetics-madurai/', label: 'Social media for salons and aesthetics clinics in Madurai' },
  ],
  '/industries/retail-ecommerce/': [
    { to: '/blog/local-seo-guide-hardware-stores-retail-madurai/', label: 'Local SEO for hardware and retail stores in Madurai' },
  ],
  '/locations/malaysia/': [
    { to: '/blog/small-business-marketing-company-malaysia/', label: 'Small business marketing in Malaysia: 90-day guide' },
    { to: '/blog/social-media-marketing-malaysia-smes/', label: 'Social media marketing for Malaysian SMEs' },
  ],
  '/industries/smes-malaysia-grant-eligible/': [
    { to: '/blog/small-business-marketing-company-malaysia/', label: 'Small business marketing in Malaysia: 90-day guide' },
    { to: '/blog/social-media-marketing-malaysia-smes/', label: 'Social media marketing for Malaysian SMEs' },
  ],
  '/services/social-media-marketing/': [
    { to: '/blog/social-media-marketing-malaysia-smes/', label: 'Social media marketing for Malaysian SMEs' },
  ],
}

/* City pages other than Madurai: /locations/<city>/ and /services/<service>/<city>/. */
export function needsHqLink(path) {
  if (path === '/locations/' || path === '/locations/madurai/') return false
  if (/^\/locations\/[^/]+\/$/.test(path)) return true
  const m = path.match(/^\/services\/[^/]+\/([^/]+)\/$/)
  return Boolean(m && m[1] !== 'madurai')
}
