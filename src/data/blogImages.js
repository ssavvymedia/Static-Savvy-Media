/**
 * Featured images for hard-coded (non-Sanity) blog posts, generated 1200x630 (public/og/blog/).
 * Also feeds the blog list cards for those posts. Plain data only.
 */
import { newBlogPosts } from './newBlogPosts.js'

const img = (slug) => ({ src: `/og/blog/${slug}.webp`, jpg: `/og/blog/${slug}.jpg` })

export const legacyStaticPosts = [
  { slug: 'what-is-generative-engine-optimization', title: 'What is Generative Engine Optimization (GEO)?', description: 'How AI search engines like ChatGPT, Gemini and Perplexity select and cite sources, and how to optimise for them.', category: 'GEO', publishedAt: '2026-08-01' },
  { slug: 'what-is-answer-engine-optimization', title: 'What is Answer Engine Optimization (AEO)?', description: 'How to structure content so answer engines and AI Overviews can extract and present it.', category: 'AEO', publishedAt: '2026-08-01' },
  { slug: 'seo-agency-madurai-complete-guide', title: 'Hiring for SEO in Madurai? The 2026 Buyer’s Checklist', description: 'Checklist, red flags and questions to ask before you sign with any SEO provider in Madurai.', category: 'Madurai', publishedAt: '2026-08-15' },
  { slug: 'digital-marketing-malaysia-sme-grant-guide', title: 'Using MDEC & SMECorp Grants for Digital Marketing in Malaysia', description: 'A practical guide to MDEC and SMECorp digitalisation grants for Malaysian SMEs.', category: 'Malaysia', publishedAt: '2026-08-20' },
  { slug: 'local-seo-thoothukudi-businesses', title: 'Local SEO for Thoothukudi Businesses', description: 'Local SEO and Google Business Profile guide for businesses in Thoothukudi.', category: 'Thoothukudi', publishedAt: '2026-08-25' },
  { slug: 'top-digital-marketing-companies-in-madurai', title: 'Digital Marketing Companies in Madurai Compared (2026)', description: 'How to compare digital marketing companies in Madurai.', category: 'Madurai', publishedAt: '2026-10-22' },
]

/** Cards for the blog list (newest first). */
export const staticBlogCards = [
  ...[...newBlogPosts].sort((a, b) => (b.published || '2026-10-24').localeCompare(a.published || '2026-10-24')).map((p) => ({ slug: p.slug, title: p.h1, description: p.description, category: p.category, publishedAt: p.published || '2026-10-24', alt: p.imageAlt })),
  ...legacyStaticPosts.map((p) => ({ ...p, alt: `${p.title}, Static Savvy Media blog` })),
].map((p) => ({ ...p, image: img(p.slug), author: 'Deepan Kanz', static: true }))

export function getStaticBlogImage(slug) {
  const p = staticBlogCards.find((x) => x.slug === slug)
  return p ? { ...p.image, alt: p.alt } : null
}
