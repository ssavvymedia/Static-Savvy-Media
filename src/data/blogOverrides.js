/**
 * Code-side overrides for Sanity blog posts (title/H1, SEO title, meta description and a contextual
 * service-page link). Used where a CMS post competes with a service page for the same query; keeps
 * the change in the repo until the post is edited in Sanity. Plain data: also read by seoConfig.js
 * so the prerendered head matches.
 */
export const sanityPostOverrides = {
  'seo-audit-services-madurai': {
    title: 'SEO Audit in Madurai: What a Website & Local SEO Audit Checks',
    seoTitle: 'SEO Audit in Madurai: What a Website & Local SEO Audit Checks (2026)',
    seoDescription:
      'What a proper SEO audit for a Madurai business covers: technical, content, local SEO and Google Business Profile, competitors and AI-search visibility, and what you get at the end.',
    callout: {
      text: 'An audit tells you what to fix. If you want a team to do the ongoing work afterwards, see our',
      to: '/services/seo/madurai/',
      label: 'SEO company in Madurai',
    },
  },
  'how-to-choose-the-right-digital-marketing-agency-in-madurai': {
    title: 'How to Choose a Digital Marketing Agency in Madurai: 10 Questions to Ask',
    seoTitle: 'How to Choose a Digital Marketing Agency in Madurai: 10 Questions to Ask',
    seoDescription:
      'Questions to ask any Madurai digital marketing agency before you sign: services, reporting, ownership of accounts, pricing and proof. A practical checklist for local business owners.',
    callout: {
      text: 'Need search engine optimisation specifically? Compare what we include on our',
      to: '/services/seo/madurai/',
      label: 'SEO services in Madurai',
    },
  },
}

export function applySanityOverride(post) {
  if (!post) return post
  const slug = String(post.slug || '').replace(/^\/+|\/+$/g, '')
  const o = sanityPostOverrides[slug]
  return o ? { ...post, title: o.title, seoTitle: o.seoTitle, seoDescription: o.seoDescription, callout: o.callout } : post
}
