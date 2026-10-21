import { useState, useEffect, useMemo, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { sanityClient, urlFor } from '../../utils/sanityClient.js'
import { setSeo } from '../../utils/seo.js'
import { breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink, cleanSlug } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL } from '../../utils/constants.js'

/* ============================================================
   Portable Text renderers — how each block/mark looks
   ============================================================ */
const portableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure>
          <img src={urlFor(value).width(1400).url()} alt={value.alt || ''} loading="lazy" />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      )
    },
  },
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    normal: ({ children }) => <p>{children}</p>,
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
}

/* ---- Rough reading-time estimate from Portable Text body ---- */
function estimateReadingTime(body) {
  if (!Array.isArray(body)) return null
  const wordCount = body.reduce((total, block) => {
    if (block?._type !== 'block' || !Array.isArray(block.children)) return total
    const text = block.children.map((child) => child.text || '').join(' ')
    return total + text.split(/\s+/).filter(Boolean).length
  }, 0)
  if (wordCount === 0) return null
  return `${Math.max(1, Math.round(wordCount / 200))} min read`
}

function formatDate(dateString) {
  if (!dateString) return null
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return null
  }
}

/* ============================================================
   COMPONENT
   ============================================================ */
export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(undefined) // undefined = loading, null = not found
  const jsonLdRef = useRef([])

  useEffect(() => {
    setPost(undefined)
    sanityClient
      .fetch(
        // Also match a slug saved with a stray leading slash in Sanity ("/my-post"), so the post
        // still renders at /blog/my-post/. The content itself should still be fixed in Sanity.
        `*[_type == "post" && slug.current in [$slug, "/" + $slug]][0]{
          title, "slug": slug.current, category, description, author, mainImage, body, publishedAt, seoTitle, seoDescription
        }`,
        { slug: cleanSlug(slug) },
      )
      .then((data) => setPost(data ?? null))
      .catch((err) => {
        console.error('Sanity fetch failed:', err)
        setPost(null)
      })
    window.scrollTo(0, 0)
  }, [slug])

  const readingTime = useMemo(() => estimateReadingTime(post?.body), [post])
  const publishedLabel = useMemo(() => formatDate(post?.publishedAt), [post])
  const whatsappHref = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)
  const pageUrl = post ? `${SITE_URL}/blog/${cleanSlug(post.slug)}` : ''

  useEffect(() => {
    if (post === null) {
      // Only known slugs are served by Vercel (others 404); this covers in-app links to an
      // unpublished post. Keep it out of the index and drop the canonical.
      setSeo({
        title: 'Article not found | Static Savvy Media Blog',
        description: 'This post may have been unpublished or the link is incorrect.',
        canonical: false,
        robots: 'noindex,follow',
      })
      return undefined
    }
    if (!post) return undefined

    setSeo({
      title: post.seoTitle || `${post.title} | Static Savvy Media Blog`,
      description: post.seoDescription || post.description || '',
      canonical: `${pageUrl}/`,
      ogType: 'article',
      ogImage: post.mainImage ? urlFor(post.mainImage).width(1200).height(630).fit('crop').url() : undefined,
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Blog', item: `${SITE_URL}/blog/` },
        { name: post.title, item: `${pageUrl}/` },
      ],
    })

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description || '',
      image: post.mainImage ? urlFor(post.mainImage).width(1200).url() : undefined,
      author: { '@type': 'Person', name: post.author || 'Static Savvy Media' },
      datePublished: post.publishedAt,
      mainEntityOfPage: `${pageUrl}/`,
      publisher: { '@type': 'Organization', name: 'Static Savvy Media', url: SITE_URL },
    }

    const scripts = [breadcrumbs, articleSchema].map((data) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.text = JSON.stringify(data)
      document.head.appendChild(script)
      return script
    })
    jsonLdRef.current = scripts

    return () => {
      jsonLdRef.current.forEach((s) => s.remove())
      jsonLdRef.current = []
    }
  }, [post, pageUrl])

  /* ---- Loading skeleton ---- */
  if (post === undefined) {
    return (
      <div className="about-template">
        <Breadcrumbs />
        <section className="section">
          <div className="container">
            <div className="blog-post-skeleton">
              <div className="blog-post-skeleton__line blog-post-skeleton__badge" />
              <div className="blog-post-skeleton__line blog-post-skeleton__title" />
              <div className="blog-post-skeleton__line blog-post-skeleton__title blog-post-skeleton__title--short" />
            </div>
            <div className="blog-post-skeleton__line blog-post-skeleton__cover" />
          </div>
        </section>
      </div>
    )
  }

  /* ---- Not found ---- */
  if (post === null) {
    return (
      <div className="about-template">
        <Breadcrumbs />
        <section className="section">
          <div className="container">
            <div className="blog-post-not-found">
              <div className="blog-post-not-found__icon">🔍</div>
              <h1 className="blog-post-not-found__title">Article not found</h1>
              <p className="blog-post-not-found__text">
                This post may have been unpublished or the link is incorrect.
              </p>
              <Link to="/blog" className="btn btn--primary btn--md">
                Back to Blog
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  /* ---- Article ---- */
  return (
    <div className="about-template">
      <Breadcrumbs />

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <Link to="/blog" className="blog-post-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to all articles
          </Link>

          <ScrollReveal>
            <header className="blog-post-header">
              {post.category && <span className="blog-post-header__category">{post.category}</span>}
              <h1 className="blog-post-header__title">{post.title}</h1>
              {post.description && (
                <p className="blog-post-header__description">{post.description}</p>
              )}
              <div className="blog-post-header__meta">
                {post.author && (
                  <span className="blog-post-header__meta-item">
                    <span className="blog-post-header__author-avatar" aria-hidden="true">
                      {post.author.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                    </span>
                    {post.author}
                  </span>
                )}
                {publishedLabel && (
                  <span className="blog-post-header__meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    {publishedLabel}
                  </span>
                )}
                {readingTime && (
                  <span className="blog-post-header__meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {readingTime}
                  </span>
                )}
              </div>
            </header>
          </ScrollReveal>

          {post.mainImage && (
            <ScrollReveal delay={80}>
              <div className="blog-post-cover">
                <img src={urlFor(post.mainImage).width(1400).url()} alt={post.title} />
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal delay={120}>
            <div className="blog-post-content">
              <div className="blog-post-body">
                {Array.isArray(post.body) && post.body.length > 0 ? (
                  <PortableText value={post.body} components={portableTextComponents} />
                ) : (
                  <p>This article's content is coming soon.</p>
                )}
              </div>

              <div className="blog-post-share">
                <span className="blog-post-share__label">Share this article</span>
                <div className="blog-post-share__buttons">
                  <a
                    className="blog-post-share__btn"
                    href={buildWhatsAppLink(WHATSAPP_NUMBER, `Check this out: ${post.title} ${pageUrl}/`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on WhatsApp"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.1.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2 0-.3 0-.5-.1-.1-.6-1.5-.9-2-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s1 2.5 1.1 2.7c.1.2 2 3 4.7 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.6-.7 1.9-1.3.2-.6.2-1.1.2-1.3-.1-.1-.3-.2-.5-.3z" />
                      <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
                    </svg>
                  </a>
                  <a
                    className="blog-post-share__btn"
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${pageUrl}/`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on X (Twitter)"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M18.9 2H22l-7.5 8.6L23 22h-6.8l-5.3-6.9L4.7 22H1.6l8-9.2L1 2h7l4.8 6.3L18.9 2zm-1.2 18h1.9L7.4 4H5.3l12.4 16z" />
                    </svg>
                  </a>
                  <a
                    className="blog-post-share__btn"
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${pageUrl}/`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on LinkedIn"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.2V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.4H3.6V9h3.5v11.4z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {post.author && (
        <section className="section section--alt">
          <div className="container">
            <ScrollReveal>
              <div className="blog-author" style={{ maxWidth: '720px' }}>
                <div className="blog-author__avatar" aria-hidden="true">
                  {post.author.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>
                <div className="blog-author__info">
                  <h3 className="blog-author__name">{post.author}</h3>
                  <p className="blog-author__role">Static Savvy Media</p>
                  <p className="blog-author__text">
                    Practical insights on SEO, GEO, AEO, AI search and digital marketing strategy.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      <CTASection
        eyebrow="Grow Your Business"
        title="Ready to Turn Search Visibility Into Business Growth?"
        subtitle="Whether your customers are searching Google or asking AI, your business needs to be visible where decisions are being made."
        primaryLabel="WhatsApp for a Free Consultation"
        primaryHref={whatsappHref}
        secondaryLabel="Explore More Articles"
        secondaryTo="/blog/"
      />
    </div>
  )
}
