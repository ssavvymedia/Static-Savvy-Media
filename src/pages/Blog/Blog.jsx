import { useEffect, useRef, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import SectionHeading from '../../components/common/SectionHeading.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import ContactFormSection from '../../components/sections/ContactFormSection.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import { breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink, cleanSlug } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL } from '../../utils/constants.js'
import { sanityClient, urlFor } from '../../utils/sanityClient.js'
import blogHeroImg from '../../assets/images/Blog/Blog.png'

/* ============================================================
   CONTENT, Approved Static Savvy Media Blog Hub Content
   ============================================================ */

const PAGE_TITLE = 'Digital Marketing Blog, SEO, GEO, AEO & AI Search Insights | Static Savvy Media'

const PAGE_DESCRIPTION =
  "Explore Static Savvy Media's digital marketing insights on SEO, GEO, AEO, AI search, Local SEO and digital growth across Tamil Nadu and Malaysia."

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'SEO', label: 'SEO' },
  { key: 'GEO', label: 'GEO' },
  { key: 'AEO', label: 'AEO' },
  { key: 'AI Search', label: 'AI Search' },
  { key: 'Local SEO', label: 'Local SEO' },
  { key: 'Digital Marketing', label: 'Digital Marketing' },
  { key: 'Madurai', label: 'Madurai' },
  { key: 'Thoothukudi', label: 'Thoothukudi' },
  { key: 'Malaysia', label: 'Malaysia' },
]

const SORT_OPTIONS = [
  { key: 'latest', label: 'Latest' },
  { key: 'featured', label: 'Featured' },
  { key: 'relevant', label: 'Most Relevant' },
]

const CATEGORY_COLORS = {
  GEO: '',
  AEO: 'blog-article-card__category--cyan',
  SEO: 'blog-article-card__category--blue',
  'Local SEO': 'blog-article-card__category--cyan',
  'Digital Marketing': 'blog-article-card__category--pink',
  Madurai: 'blog-article-card__category--blue',
  Thoothukudi: 'blog-article-card__category--pink',
  Malaysia: 'blog-article-card__category--cyan',
  'AI Search': '',
}

const FEATURED_BADGE_COLORS = {
  GEO: '',
  AEO: 'blog-featured-card__badge--cyan',
  SEO: '',
  'AI Search': '',
}

const ARTICLE_ICONS = {
  GEO: '🧠',
  AEO: '🔎',
  SEO: '🔍',
  'Local SEO': '📍',
  'Digital Marketing': '🚀',
  Madurai: '🏛',
  Thoothukudi: '⚓',
  Malaysia: '🇲',
  'AI Search': '🤖',
}

/* ============================================================
   COMPONENT
   ============================================================ */

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const jsonLdRef = useRef([])

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "post"] | order(publishedAt desc){
        title, "slug": slug.current, category, description, author, featured, mainImage, publishedAt
      }`)
      .then(setPosts)
      .catch((err) => console.error('Sanity fetch failed:', err))
  }, [])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/blog/`,
      ogType: 'website',
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Blog', item: `${SITE_URL}/blog/` },
      ],
    })

    const collectionPage = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Digital Marketing Blog, SEO, GEO, AEO & AI Search Insights',
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/blog/`,
      publisher: {
        '@type': 'Organization',
        name: 'Static Savvy Media',
        url: SITE_URL,
      },
    }

    const scripts = [breadcrumbs, collectionPage].map((data) => {
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
  }, [])

  /* ---- Filtering + Search + Sort ---- */
  const filteredPosts = useMemo(() => {
    let result = posts

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q),
      )
    }

    if (sortBy === 'featured') {
      result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return result
  }, [posts, activeCategory, searchQuery, sortBy])

  const FEATURED_ARTICLE = useMemo(() => posts.find((p) => p.featured), [posts])

  const whatsappHref = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)

  return (
    <div className="about-template">
      <Breadcrumbs />

      {/* ============================================================
          HERO
          ============================================================ */}
      <HeroSection
        layout="two-column"
        eyebrow="STATIC SAVVY MEDIA BLOG"
        title={
          <>
            Digital Marketing Insights for{' '}
            <span className="text-gradient">the AI Search Era</span>
          </>
        }
        subtitle="Practical insights on SEO, GEO, AEO, Local SEO, AI search, digital marketing and business growth across Tamil Nadu and Malaysia."
        actions={
          <>
            <Button to="#blog-articles" variant="primary" size="lg">
              Explore Our Insights
            </Button>
            <Button href={whatsappHref} variant="ghost" size="lg" target="_blank" rel="noopener noreferrer">
              Talk to an Expert
            </Button>
          </>
        }
      >
        <div className="hero__visual-side">
          <img src={blogHeroImg} alt="Static Savvy Media Blog" className="hero__image" />
        </div>
      </HeroSection>

      {/* ============================================================
          FEATURED ARTICLE
          ============================================================ */}
      {FEATURED_ARTICLE && (
        <section className="section">
          <div className="container">
            <SectionHeading eyebrow="Featured" title="Featured Insight" />
            <ScrollReveal>
              <div className="blog-featured">
                <div>
                  <span className="blog-featured__badge">GEO / AI Search</span>
                  <h2 className="blog-featured__title">{FEATURED_ARTICLE.title}</h2>
                  <p className="blog-featured__description">{FEATURED_ARTICLE.description}</p>
                  <div className="blog-featured__meta">
                    <span className="blog-featured__meta-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      {FEATURED_ARTICLE.author}
                    </span>
                    {FEATURED_ARTICLE.readingTime && (
                      <span className="blog-featured__meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {FEATURED_ARTICLE.readingTime}
                      </span>
                    )}
                  </div>
                  <Button to={`/blog/${cleanSlug(FEATURED_ARTICLE.slug)}/`} variant="primary" size="lg">
                    Read the Full Guide
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Button>
                </div>
                <div className="blog-featured__visual">
                  <div className="blog-featured__visual-card">
                    <div className="blog-featured__visual-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                        <line x1="12" y1="22.08" x2="12" y2="12" />
                      </svg>
                    </div>
                    <div className="blog-featured__visual-label">GEO Ecosystem</div>
                    <div className="blog-featured__visual-nodes">
                      <span className="blog-featured__visual-node">ChatGPT</span>
                      <span className="blog-featured__visual-node blog-featured__visual-node--pink">Perplexity</span>
                      <span className="blog-featured__visual-node blog-featured__visual-node--cyan">Google AI</span>
                      <span className="blog-featured__visual-node">Entity</span>
                      <span className="blog-featured__visual-node blog-featured__visual-node--pink">Citation</span>
                      <span className="blog-featured__visual-node blog-featured__visual-node--cyan">Schema</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ============================================================
          SEARCH + FILTER + SORT + GRID
          ============================================================ */}
      <section className="section section--alt" id="blog-articles">
        <div className="container">
          <SectionHeading
            eyebrow="Articles"
            title="Latest Insights"
            subtitle="Practical strategies, search insights and digital growth ideas for businesses navigating Google and AI-powered search."
          />

          {/* ---- Search ---- */}
          <div className="blog-search">
            <svg className="blog-search__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className="blog-search__input"
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* ---- Categories ---- */}
          <div className="blog-categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                className={`blog-categories__btn ${activeCategory === cat.key ? 'blog-categories__btn--active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
                type="button"
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* ---- Sort ---- */}
          <div className="blog-sort">
            <span className="blog-sort__label">Sort by:</span>
            <select
              className="blog-sort__select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.key} value={opt.key}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* ---- Article Grid or Empty ---- */}
          {filteredPosts.length > 0 ? (
            <div className="blog-grid">
              {filteredPosts.map((post, index) => (
                <ScrollReveal key={post.slug} delay={index * 60}>
                  <Link to={`/blog/${cleanSlug(post.slug)}/`} style={{ textDecoration: 'none', display: 'flex' }}>
                    <article className="blog-article-card">
                      <div className="blog-article-card__image">
                        {post.mainImage ? (
                          <img
                            src={urlFor(post.mainImage).width(600).height(360).fit('crop').url()}
                            alt={post.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <span className="blog-article-card__image-icon">
                            {ARTICLE_ICONS[post.category] || '📝'}
                          </span>
                        )}
                        <span className="blog-article-card__image-number">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <div className="blog-article-card__body">
                        <span className={`blog-article-card__category ${CATEGORY_COLORS[post.category] || ''}`}>
                          {post.category}
                        </span>
                        <h3 className="blog-article-card__title">{post.title}</h3>
                        {post.description && (
                          <p className="blog-article-card__description">{post.description}</p>
                        )}
                        <div className="blog-article-card__footer">
                          <div className="blog-article-card__meta">
                            <span className="blog-article-card__author">{post.author}</span>
                            {post.readingTime && (
                              <span className="blog-article-card__reading-time">{post.readingTime}</span>
                            )}
                          </div>
                          <span className="blog-article-card__link">
                            Read Article
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <ScrollReveal>
              <div className="blog-empty">
                <div className="blog-empty__icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <h3 className="blog-empty__title">No articles found</h3>
                <p className="blog-empty__text">
                  Try adjusting your search or category filter.
                </p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* ============================================================
          FEATURED CONTENT ROW
          ============================================================ */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Start Here"
            title="Start With These Guides"
          />
          <div className="blog-featured-row">
            <ScrollReveal delay={0}>
              <Link to="/blog/what-is-generative-engine-optimization/" style={{ textDecoration: 'none', display: 'flex' }}>
                <div className="blog-featured-card">
                  <span className="blog-featured-card__badge">GEO</span>
                  <h3 className="blog-featured-card__title">
                    What Is Generative Engine Optimization (GEO)?
                  </h3>
                  <p className="blog-featured-card__text">
                    GEO is the practice of getting your business cited by ChatGPT, Perplexity and Google AI.
                  </p>
                  <span className="blog-article-card__link">
                    Read GEO Guide
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <Link to="/blog/what-is-answer-engine-optimization/" style={{ textDecoration: 'none', display: 'flex' }}>
                <div className="blog-featured-card">
                  <span className="blog-featured-card__badge blog-featured-card__badge--cyan">AEO</span>
                  <h3 className="blog-featured-card__title">
                    What Is Answer Engine Optimization (AEO)?
                  </h3>
                  <p className="blog-featured-card__text">
                    Learn how AEO structures content so AI-powered answer engines can extract and present it.
                  </p>
                  <span className="blog-article-card__link">
                    Read AEO Guide
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <Link to="/blog/seo-agency-madurai-complete-guide/" style={{ textDecoration: 'none', display: 'flex' }}>
                <div className="blog-featured-card">
                  <span className="blog-featured-card__badge blog-featured-card__badge--pink">SEO / Madurai</span>
                  <h3 className="blog-featured-card__title">
                    How to Choose an SEO Agency in Madurai
                  </h3>
                  <p className="blog-featured-card__text">
                    The complete guide to evaluating SEO agencies in Madurai.
                  </p>
                  <span className="blog-article-card__link">
                    Read Madurai SEO Guide
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============================================================
          AI SEARCH SECTION
          ============================================================ */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="blog-ai-search">
              <div className="blog-ai-search__content">
                <SectionHeading
                  eyebrow="AI Search"
                  title="Search Is Changing. Your Strategy Should Too."
                  align="left"
                />
                <p>
                  Traditional search is evolving into an ecosystem of Google, AI Overviews, ChatGPT, Perplexity, voice search and answer engines.
                </p>
                <p>
                  Static Savvy Media helps businesses build visibility across traditional search and AI-powered discovery.
                </p>
                <div style={{ marginTop: '1.5rem' }}>
                  <Button to="/services/geo-aeo-ai-search/" variant="primary" size="lg">
                    Explore GEO & AEO Services
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Button>
                </div>
              </div>
              <div className="blog-ai-search__visual">
                <div className="blog-ai-search__visual-card">
                  <div className="blog-featured__visual-label">AI Search Ecosystem</div>
                  <div className="blog-ai-search__visual-nodes">
                    <div className="blog-ai-search__node blog-ai-search__node--active">Google</div>
                    <div className="blog-ai-search__node">ChatGPT</div>
                    <div className="blog-ai-search__node blog-ai-search__node--pink">Perplexity</div>
                    <div className="blog-ai-search__node blog-ai-search__node--active">AI Overviews</div>
                    <div className="blog-ai-search__node blog-ai-search__node--cyan">Voice Search</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================================
          AUTHOR SECTION
          ============================================================ */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Author"
            title="Insights From Static Savvy Media"
          />
          <ScrollReveal>
            <div className="blog-author">
              <div className="blog-author__avatar" aria-hidden="true">DK</div>
              <div className="blog-author__info">
                <h3 className="blog-author__name">Deepan Kanz</h3>
                <p className="blog-author__role">Founder &amp; AI Search Specialist</p>
                <p className="blog-author__text">
                  Insights on SEO, GEO, AEO, AI search and digital marketing strategy from Static Savvy Media.
                </p>
                <div style={{ marginTop: '1rem' }}>
                  <Button to="/about/deepan-kanz/" variant="ghost" size="sm">
                    Meet the Founder
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================================
          NEWSLETTER / CONTENT CTA
          ============================================================ */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', maxWidth: '600px', marginInline: 'auto' }}>
              <SectionHeading
                eyebrow="Stay Updated"
                title="Stay Ahead of Search"
                subtitle="Get practical insights on SEO, AI search, local visibility and digital growth."
              />
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                <Button href={whatsappHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">
                  Get in Touch
                </Button>
                <Button to="/services/" variant="ghost" size="lg">
                  Explore Services
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA
          ============================================================ */}
      <CTASection
        eyebrow="Grow Your Business"
        title="Ready to Turn Search Visibility Into Business Growth?"
        subtitle="Whether your customers are searching Google or asking AI, your business needs to be visible where decisions are being made."
        primaryLabel="WhatsApp for a Free Consultation"
        primaryHref={whatsappHref}
        secondaryLabel="Explore Our Services"
        secondaryTo="/services/"
      />
      <ContactFormSection />
    </div>
  )
}
