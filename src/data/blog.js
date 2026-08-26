/**
 * Blog configuration.
 * Structural placeholders only — populated with approved content in the next phase.
 */

export const blogCategories = [
  { slug: 'seo', name: 'SEO', path: '/blog/seo/' },
  { slug: 'geo-aeo', name: 'GEO & AEO', path: '/blog/geo-aeo/' },
  { slug: 'local-marketing', name: 'Local Marketing', path: '/blog/local-marketing/' },
]

export const blogPosts = [
  {
    slug: 'what-is-generative-engine-optimization',
    name: 'What is Generative Engine Optimization',
    category: 'geo-aeo',
    path: '/blog/what-is-generative-engine-optimization/',
  },
  {
    slug: 'what-is-answer-engine-optimization',
    name: 'What is Answer Engine Optimization',
    category: 'geo-aeo',
    path: '/blog/what-is-answer-engine-optimization/',
  },
  {
    slug: 'seo-agency-madurai-complete-guide',
    name: 'SEO Agency Madurai Complete Guide',
    category: 'seo',
    path: '/blog/seo-agency-madurai-complete-guide/',
  },
  {
    slug: 'digital-marketing-malaysia-sme-grant-guide',
    name: 'Digital Marketing for Malaysian SMEs, Grant Guide',
    category: 'seo',
    path: '/blog/digital-marketing-malaysia-sme-grant-guide/',
  },
  {
    slug: 'local-seo-thoothukudi-businesses',
    name: 'Local SEO for Thoothukudi Businesses',
    category: 'local-marketing',
    path: '/blog/local-seo-thoothukudi-businesses/',
  },
]

export function getBlogPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug) || null
}

export function getBlogCategoryBySlug(slug) {
  return blogCategories.find((category) => category.slug === slug) || null
}

export function getPostsByCategory(categorySlug) {
  return blogPosts.filter((post) => post.category === categorySlug)
}
