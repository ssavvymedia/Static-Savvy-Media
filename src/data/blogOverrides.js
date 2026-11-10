/**
 * Code-side overrides for Sanity blog posts (title/H1, SEO title, meta description and a contextual
 * service-page link). Used where a CMS post competes with a service page for the same query; keeps
 * the change in the repo until the post is edited in Sanity. Plain data: also read by seoConfig.js
 * so the prerendered head matches.
 */
export const sanityPostOverrides = {
  /* Meta description trimmed to <=158 chars (title/H1 unchanged from the CMS). */
  'social-media-marketing-salons-aesthetics-madurai': {
    title: 'Social Media Marketing Strategies for Salons & Aesthetics in Madurai',
    seoTitle: 'Social Media Marketing for Salons in Madurai | SSM',
    seoDescription: 'Social media marketing for salons and aesthetics clinics in Madurai: strategies to improve local visibility, attract customers and get more enquiries.',
  },
  'digital-marketing-service-costs-in-madurai-2026-pricing-guide': {
    title: 'Digital Marketing Service Costs in Madurai (2026 Pricing Guide)',
    seoTitle: 'Digital Marketing Service Costs in Madurai: 2026 Pricing Guide',
    seoDescription: 'Digital marketing service costs in Madurai for 2026: SEO, Google Maps, social media and web design cost tiers to help you plan your marketing budget.',
  },
  'seo-audit-services-madurai': {
    title: 'SEO Audit in Madurai: What a Website & Local SEO Audit Checks',
    seoTitle: 'SEO Audit in Madurai: What a Website & Local SEO Audit Checks',
    seoDescription:
      'What a proper SEO audit for a Madurai business covers: technical, content, local SEO and Google Business Profile, competitors and AI-search visibility.',
    callout: {
      text: 'An audit tells you what to fix. If you want a team to do the ongoing work afterwards, see our',
      to: '/services/seo/madurai/',
      label: 'SEO company in Madurai',
    },
  },
  'how-to-choose-the-right-digital-marketing-agency-in-madurai': {
    title: 'How to Choose a Digital Marketing Agency in Madurai: 10 Questions to Ask',
    seoTitle: 'How to Choose a Digital Marketing Agency in Madurai',
    seoDescription:
      'Questions to ask any Madurai digital marketing agency before you sign: services, reporting, ownership of accounts, pricing and proof.',
    callout: {
      text: 'Need search engine optimisation specifically? Compare what we include on our',
      to: '/services/seo/madurai/',
      label: 'SEO services in Madurai',
    },
  },
  'what-is-geo-generative-engine-optimization-in-digital-marketing': {
    title: 'What Is GEO in Digital Marketing? Generative Engine Optimization Explained',
    seoTitle: 'What Is GEO in Digital Marketing? (2026 Guide)',
    seoDescription:
      'GEO (generative engine optimization) gets your brand cited in ChatGPT, Gemini, Perplexity and Google AI Overviews.',
    callout: {
      text: 'Want a team to do GEO and AEO for your business? See our',
      to: '/services/geo-aeo-ai-search/',
      label: 'GEO & AI search optimisation',
    },
  },
}

export function applySanityOverride(post) {
  if (!post) return post
  const slug = String(post.slug || '').replace(/^\/+|\/+$/g, '')
  const o = sanityPostOverrides[slug]
  return o ? { ...post, title: o.title || post.title, seoTitle: o.seoTitle || post.seoTitle, seoDescription: o.seoDescription || post.seoDescription, callout: o.callout || post.callout } : post
}
