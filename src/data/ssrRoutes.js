/**
 * Routes whose real page component is server-rendered at build time (scripts/seo/prerender-heads.mjs)
 * so the raw HTML carries the same H1, body copy, FAQs and internal links visitors see, plus a
 * Service + LocalBusiness + FAQPage + BreadcrumbList JSON-LD graph built from that render.
 * Order: Madurai first, then Malaysia (Rawang / Kuala Lumpur). `office` picks the LocalBusiness node.
 * Plain data only (no JSX): loaded by Node at build time.
 */
export const ssrRoutes = [
  { route: '/services/seo/madurai/', module: '/src/pages/ServiceLocations/SEO/SEO_Madurai.jsx', office: 'madurai', service: 'SEO services in Madurai', serviceType: 'Search engine optimization', area: { '@type': 'City', name: 'Madurai' } },
  { route: '/services/social-media-marketing/madurai/', module: '/src/pages/ServiceLocations/SocialMedia/SocialMedia_Madurai.jsx', office: 'madurai', service: 'Social media marketing in Madurai', serviceType: 'Social media marketing', area: { '@type': 'City', name: 'Madurai' } },
  { route: '/services/local-seo/madurai/', module: '/src/pages/ServiceLocations/LocalSEO/LocalSEO_Madurai.jsx', office: 'madurai', service: 'Local SEO and Google Business Profile optimisation in Madurai', serviceType: 'Local SEO', area: { '@type': 'City', name: 'Madurai' } },
  { route: '/services/website-design-development/madurai/', module: '/src/pages/ServiceLocations/WebsiteDevelopment/WebsiteDevelopment_Madurai.jsx', office: 'madurai', service: 'Website design and development in Madurai', serviceType: 'Website design', area: { '@type': 'City', name: 'Madurai' } },
  { route: '/services/geo-aeo-ai-search/madurai/', module: '/src/pages/ServiceLocations/GEOAEO/GEOAEO_Madurai.jsx', office: 'madurai', service: 'GEO & AEO (AI search optimisation) in Madurai', serviceType: 'Generative engine optimization', area: { '@type': 'City', name: 'Madurai' } },
  { route: '/industries/textiles-madurai/', module: '/src/pages/Industries/TextilesMadurai.jsx', office: 'madurai', service: 'Digital marketing for textile businesses in Madurai', serviceType: 'Digital marketing', area: { '@type': 'City', name: 'Madurai' } },
  { route: '/locations/malaysia/', module: '/src/pages/Locations/Malaysia.jsx', office: 'malaysia', service: 'Digital marketing in Malaysia', serviceType: 'Digital marketing', area: { '@type': 'Country', name: 'Malaysia' } },
  { route: '/locations/kuala-lumpur/', module: '/src/pages/Locations/KualaLumpur.jsx', office: 'malaysia', service: 'Digital marketing in Kuala Lumpur', serviceType: 'Digital marketing', area: { '@type': 'City', name: 'Kuala Lumpur' } },
  { route: '/services/seo/malaysia/', module: '/src/pages/ServiceLocations/SEO/SEO_Malaysia.jsx', office: 'malaysia', service: 'SEO services in Malaysia', serviceType: 'Search engine optimization', area: { '@type': 'Country', name: 'Malaysia' } },
  { route: '/services/seo/kuala-lumpur/', module: '/src/pages/ServiceLocations/SEO/SEO_KualaLumpur.jsx', office: 'malaysia', service: 'SEO services in Kuala Lumpur', serviceType: 'Search engine optimization', area: { '@type': 'City', name: 'Kuala Lumpur' } },
  { route: '/services/local-seo/malaysia/', module: '/src/pages/ServiceLocations/LocalSEO/LocalSEO_Malaysia.jsx', office: 'malaysia', service: 'Local SEO in Malaysia', serviceType: 'Local SEO', area: { '@type': 'Country', name: 'Malaysia' } },
  { route: '/services/ai-business-automation/malaysia/', module: '/src/pages/ServiceLocations/AIBusinessAutomation/AIBusinessAutomation_Malaysia.jsx', office: 'malaysia', service: 'AI business automation in Malaysia', serviceType: 'Business automation', area: { '@type': 'Country', name: 'Malaysia' } },
  { route: '/industries/smes-malaysia-grant-eligible/', module: '/src/pages/Industries/SMEsMalaysia.jsx', office: 'malaysia', service: 'Digital marketing for Malaysian SMEs', serviceType: 'Digital marketing', area: { '@type': 'Country', name: 'Malaysia' } },
]
