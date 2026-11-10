/**
 * Shared by BlogPost.jsx (client) and scripts/seo/ssr-bodies.mjs (build-time prerender) so the
 * JSON-LD a crawler sees in the raw HTML is the same graph the page sets after hydration.
 * Plain functions over a Sanity post (Portable Text body); no React, no browser APIs.
 */
const HOST = 'https://www.staticsavvymedia.com'
const ORG_ID = `${HOST}/#organization`
const AUTHOR_URLS = { 'Deepan Kanz': `${HOST}/about/deepan-kanz/` }

export const blockText = (b) =>
  b && b._type === 'block' && Array.isArray(b.children) ? b.children.map((c) => c.text || '').join('').trim() : ''

export function bodyWordCount(body) {
  if (!Array.isArray(body)) return 0
  return body.reduce((n, b) => n + blockText(b).split(/\s+/).filter(Boolean).length, 0)
}

const isHeading = (b) => b?._type === 'block' && /^h[1-6]$/.test(b.style || '')
const level = (b) => Number(String(b.style).slice(1))

/* FAQs written in the post body: inside a section whose heading says "FAQ" / "Frequently Asked",
 * every heading ending in "?" is a question and the blocks up to the next heading are its answer.
 * Only text that is visible on the page is used. */
export function portableTextFaqs(body) {
  if (!Array.isArray(body)) return []
  const out = []
  let faqLevel = 0
  let cur = null
  for (const b of body) {
    const t = blockText(b)
    if (isHeading(b)) {
      if (cur && cur.a.length) out.push({ q: cur.q, a: cur.a.join(' ') })
      cur = null
      if (/frequently asked|\bfaqs?\b/i.test(t)) { faqLevel = level(b); continue }
      if (!faqLevel) continue
      if (t.endsWith('?')) { cur = { q: t, a: [] }; continue }
      if (level(b) <= faqLevel) faqLevel = 0
      continue
    }
    if (cur && t) cur.a.push(t)
  }
  if (cur && cur.a.length) out.push({ q: cur.q, a: cur.a.join(' ') })
  return out
}

/** JSON-LD @graph for a Sanity post. imageUrl: absolute 1200px image URL or undefined. */
export function blogPostSchema(post, imageUrl) {
  const slug = String(post.slug || '').replace(/^\/+|\/+$/g, '')
  const url = `${HOST}/blog/${slug}/`
  const faqs = portableTextFaqs(post.body)
  /* Posts with no author in Sanity are credited to the founder (matches the author box); the agency name stays an Organization. */
  if (!post.author) post = { ...post, author: 'Deepan Kanz' }
  const author = post.author === 'Static Savvy Media'
    ? { '@id': ORG_ID }
    : post.author
    ? { '@type': 'Person', name: post.author, ...(AUTHOR_URLS[post.author] ? { url: AUTHOR_URLS[post.author], '@id': `${AUTHOR_URLS[post.author]}#person`, image: `${HOST}/images/deepan-kanz-founder.webp`, jobTitle: 'Founder', sameAs: ['https://www.linkedin.com/in/deepankanz/', 'https://www.instagram.com/deepankanz', 'https://www.facebook.com/deepankanz', 'https://x.com/deepankanz'] } : {}) }
    : { '@id': ORG_ID }
  const graph = [
    {
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      headline: post.title,
      description: post.seoDescription || post.description || '',
      ...(imageUrl ? { image: imageUrl } : {}),
      author,
      datePublished: post.publishedAt,
      dateModified: post._updatedAt || post.publishedAt,
      wordCount: bodyWordCount(post.body),
      mainEntityOfPage: url,
      url,
      publisher: { '@id': ORG_ID },
    },
    { '@type': 'Organization', '@id': ORG_ID, name: 'Static Savvy Media', url: `${HOST}/`, email: 'info@staticsavvymedia.com', telephone: '+91 99440 40345' },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${HOST}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${HOST}/blog/` },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ],
    },
  ]
  if (faqs.length) {
    graph.push({ '@type': 'FAQPage', '@id': `${url}#faq`, mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}

/* GROQ projection used by the page and the build so both render the same post. */
export const BLOG_POST_FIELDS = 'title, "slug": slug.current, category, description, author, mainImage, body, publishedAt, _updatedAt, seoTitle, seoDescription'
