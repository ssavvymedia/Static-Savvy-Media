import { useEffect, useRef, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import SectionHeading from '../../components/common/SectionHeading.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import { localBusinessSchema, reviewSchema, faqPageSchema, breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL } from '../../utils/constants.js'

/* ============================================================
   CONTENT, Approved Static Savvy Media Reviews Page Content
   ============================================================ */

const PAGE_TITLE = 'Client Reviews, Static Savvy Media Madurai, Thoothukudi & Malaysia'

const PAGE_DESCRIPTION =
  'Read client reviews of Static Savvy Media across Madurai, Thoothukudi and Malaysia. Explore real feedback and ratings from our Google Business Profiles.'

/**
 * Reviews dataset.
 *
 * Connect a real Google Business Profile / GMB API source here.
 * The architecture supports loading, error, and empty states.
 *
 * When no reviews are available, the page shows a polished empty state.
 * DO NOT populate this array with fabricated review data.
 */
const REVIEWS = []

const LOCATIONS = [
  { key: 'all', label: 'All Locations' },
  { key: 'Madurai', label: 'Madurai' },
  { key: 'Thoothukudi', label: 'Thoothukudi' },
  { key: 'Malaysia', label: 'Malaysia' },
]

const SORT_OPTIONS = [
  { key: 'recent', label: 'Most Recent' },
  { key: 'highest', label: 'Highest Rated' },
  { key: 'lowest', label: 'Lowest Rated' },
]

/* ============================================================
   HELPER, Star Renderer
   ============================================================ */

function StarRating({ rating, size = '0.9rem' }) {
  return (
    <span aria-label={`${rating} out of 5 stars`} style={{ fontSize: size }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} style={{ color: star <= rating ? '#fbbf24' : 'rgba(251,191,36,0.25)' }}>
          {star <= rating ? '★' : '★'}
        </span>
      ))}
    </span>
  )
}

/* ============================================================
   COMPONENT
   ============================================================ */

export default function Reviews() {
  const [activeLocation, setActiveLocation] = useState('all')
  const [sortBy, setSortBy] = useState('recent')
  const [expandedIds, setExpandedIds] = useState(new Set())
  const [loading] = useState(false)
  const [error] = useState(null)
  const jsonLdRef = useRef([])

  /* ---- SEO + Schema ---- */
  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/about/reviews/`,
      ogType: 'website',
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'About', item: `${SITE_URL}/about/` },
        { name: 'Reviews', item: `${SITE_URL}/about/reviews/` },
      ],
    })

    const scripts = [breadcrumbs].map((data) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.text = JSON.stringify(data)
      document.head.appendChild(script)
      return script
    })

    /* Only add LocalBusiness + AggregateRating + Review schemas if real reviews exist */
    if (REVIEWS.length > 0) {
      const averageRating = REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length

      const localBiz = localBusinessSchema({
        name: 'Static Savvy Media',
        url: SITE_URL,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: Math.round(averageRating * 10) / 10,
          reviewCount: REVIEWS.length,
          bestRating: 5,
          worstRating: 1,
        },
        review: REVIEWS.map((review) => ({
          '@type': 'Review',
          reviewBody: review.reviewText,
          author: { '@type': 'Person', name: review.reviewerName },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: review.rating,
            bestRating: 5,
            worstRating: 1,
          },
          itemReviewed: {
            '@type': 'Organization',
            name: 'Static Savvy Media',
            url: SITE_URL,
          },
        })),
      })

      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.text = JSON.stringify(localBiz)
      document.head.appendChild(script)
      scripts.push(script)
    }

    jsonLdRef.current = scripts

    return () => {
      jsonLdRef.current.forEach((s) => s.remove())
      jsonLdRef.current = []
    }
  }, [])

  /* ---- Derived Data ---- */
  const filteredReviews = useMemo(() => {
    let result = activeLocation === 'all'
      ? REVIEWS
      : REVIEWS.filter((r) => r.location === activeLocation)

    if (sortBy === 'highest') {
      result = [...result].sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'lowest') {
      result = [...result].sort((a, b) => a.rating - b.rating)
    } else {
      result = [...result].sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    return result
  }, [activeLocation, sortBy])

  const ratingStats = useMemo(() => {
    const source = activeLocation === 'all' ? REVIEWS : REVIEWS.filter((r) => r.location === activeLocation)
    if (source.length === 0) {
      return { average: 0, total: 0, distribution: [0, 0, 0, 0, 0] }
    }
    const total = source.length
    const sum = source.reduce((acc, r) => acc + r.rating, 0)
    const average = sum / total
    const distribution = [0, 0, 0, 0, 0]
    source.forEach((r) => {
      if (r.rating >= 1 && r.rating <= 5) distribution[r.rating - 1]++
    })
    return { average, total, distribution }
  }, [activeLocation])

  const locationStats = useMemo(() => {
    const stats = {}
    for (const loc of ['Madurai', 'Thoothukudi', 'Malaysia']) {
      const locReviews = REVIEWS.filter((r) => r.location === loc)
      if (locReviews.length > 0) {
        const avg = locReviews.reduce((s, r) => s + r.rating, 0) / locReviews.length
        stats[loc] = { average: Math.round(avg * 10) / 10, count: locReviews.length }
      } else {
        stats[loc] = null
      }
    }
    return stats
  }, [])

  /* ---- Read More Toggle ---- */
  const toggleExpanded = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const whatsappHref = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)
  const hasReviews = REVIEWS.length > 0

  /* ============================================================
     RENDER
     ============================================================ */
  return (
    <div className="about-template">
      <Breadcrumbs />

      {/* ============================================================
          HERO
          ============================================================ */}
      <HeroSection
        eyebrow="CLIENT REVIEWS"
        title={
          <>
            Client Reviews , {' '}
            <span className="text-gradient">Static Savvy Media</span>
          </>
        }
        subtitle="See what clients across Madurai, Thoothukudi and Malaysia say about working with Static Savvy Media."
      >
        <div className="reviews-hero-visual" aria-hidden="true">
          <div className="reviews-hero-dashboard glass-card gradient-border">
            <div className="reviews-hero-dashboard__header">
              <div className="reviews-hero-dashboard__dots">
                <div className="reviews-hero-dashboard__dot" />
                <div className="reviews-hero-dashboard__dot reviews-hero-dashboard__dot--pink" />
                <div className="reviews-hero-dashboard__dot reviews-hero-dashboard__dot--cyan" />
              </div>
              <div className="reviews-hero-dashboard__rating-display">
                <div className="reviews-hero-dashboard__rating-number">
                  {hasReviews ? ratingStats.average.toFixed(1) : ', '}
                </div>
                <div className="reviews-hero-dashboard__rating-label">
                  {hasReviews ? `/ 5 · ${ratingStats.total} reviews` : 'Rating data loading...'}
                </div>
              </div>
            </div>
            <div className="reviews-hero-dashboard__stars">
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} className={`reviews-hero-dashboard__star ${s > (hasReviews ? Math.round(ratingStats.average) : 0) ? 'reviews-hero-dashboard__star--empty' : ''}`}>
                  ★
                </span>
              ))}
            </div>
            <div className="reviews-hero-dashboard__cards">
              <div className="reviews-hero-dashboard__mini-card">
                <span className="reviews-hero-dashboard__mini-stars">★★★★★</span>
                <span className="reviews-hero-dashboard__mini-text">
                  {hasReviews ? 'Verified client feedback' : 'Google Business Profile reviews'}
                </span>
              </div>
              <div className="reviews-hero-dashboard__mini-card">
                <span className="reviews-hero-dashboard__mini-stars">★★★★★</span>
                <span className="reviews-hero-dashboard__mini-text">
                  {hasReviews ? `${ratingStats.total} total reviews` : '3 locations covered'}
                </span>
              </div>
            </div>
            <div className="reviews-hero-dashboard__footer">
              <span className="reviews-hero-dashboard__tag">Madurai</span>
              <span className="reviews-hero-dashboard__tag reviews-hero-dashboard__tag--pink">Thoothukudi</span>
              <span className="reviews-hero-dashboard__tag reviews-hero-dashboard__tag--cyan">Malaysia</span>
            </div>
          </div>
        </div>
      </HeroSection>

      {/* ============================================================
          LOADING STATE
          ============================================================ */}
      {loading && (
        <section className="section">
          <div className="container">
            <SectionHeading eyebrow="Loading" title="Loading Reviews..." />
            <div className="reviews-skeleton">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="reviews-skeleton__card">
                  <div className="reviews-skeleton__line reviews-skeleton__line--stars" />
                  <div className="reviews-skeleton__line" />
                  <div className="reviews-skeleton__line reviews-skeleton__line--medium" />
                  <div className="reviews-skeleton__line reviews-skeleton__line--short" />
                  <div className="reviews-skeleton__avatar" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          ERROR STATE
          ============================================================ */}
      {!loading && error && (
        <section className="section">
          <div className="container">
            <div className="reviews-error">
              <div className="reviews-error__icon">⚠</div>
              <h2 className="reviews-error__title">Unable to load reviews</h2>
              <p className="reviews-error__text">
                We couldn&apos;t load the latest review data right now. Please check back shortly.
              </p>
              <Button to="/about/reviews/" variant="primary">
                Try Again
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          MAIN CONTENT (No Loading / No Error)
          ============================================================ */}
      {!loading && !error && (
        <>
          {/* ---- Location Filter ---- */}
          <section className="section">
            <div className="container">
              <SectionHeading
                eyebrow="Filter"
                title="Our Client Feedback"
                subtitle="Filter reviews by location to see feedback from specific markets."
              />

              <div className="reviews-filter">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc.key}
                    className={`reviews-filter__btn ${activeLocation === loc.key ? 'reviews-filter__btn--active' : ''}`}
                    onClick={() => setActiveLocation(loc.key)}
                    type="button"
                  >
                    {loc.label}
                  </button>
                ))}
              </div>

              {/* ---- Sort Control ---- */}
              {hasReviews && (
                <div className="reviews-sort">
                  <span className="reviews-sort__label">Sort by:</span>
                  <select
                    className="reviews-sort__select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.key} value={opt.key}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* ---- Rating Summary ---- */}
              {hasReviews && (
                <ScrollReveal>
                  <div className="reviews-rating-summary glass-card gradient-border">
                    <div className="reviews-rating-summary__big">
                      <div className="reviews-rating-summary__number">
                        {ratingStats.average.toFixed(1)}
                      </div>
                      <div className="reviews-rating-summary__label">Average Rating</div>
                      <div className="reviews-rating-summary__count">
                        {ratingStats.total} {ratingStats.total === 1 ? 'review' : 'reviews'}
                      </div>
                    </div>
                    <div className="reviews-rating-summary__bars">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count = ratingStats.distribution[star - 1]
                        const pct = ratingStats.total > 0 ? (count / ratingStats.total) * 100 : 0
                        return (
                          <div key={star} className="reviews-rating-summary__bar-row">
                            <span className="reviews-rating-summary__bar-label">{star} ★</span>
                            <div className="reviews-rating-summary__bar-track">
                              <div
                                className="reviews-rating-summary__bar-fill"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="reviews-rating-summary__bar-count">{count}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {/* ---- Location Summary Cards ---- */}
              <div className="reviews-location-grid">
                {['Madurai', 'Thoothukudi', 'Malaysia'].map((loc, index) => (
                  <ScrollReveal key={loc} delay={index * 80}>
                    <div className="reviews-location-card">
                      <div className={`reviews-location-card__icon ${
                        loc === 'Madurai' ? 'reviews-location-card__icon--purple' :
                        loc === 'Thoothukudi' ? 'reviews-location-card__icon--pink' :
                        'reviews-location-card__icon--cyan'
                      }`}>
                        {loc === 'Madurai' ? '🏛' : loc === 'Thoothukudi' ? '⚓' : '🇲'}
                      </div>
                      <h3 className="reviews-location-card__name">{loc}</h3>
                      {locationStats[loc] ? (
                        <>
                          <div className="reviews-location-card__rating">
                            ★ {locationStats[loc].average} / 5
                          </div>
                          <div className="reviews-location-card__count">
                            {locationStats[loc].count} {locationStats[loc].count === 1 ? 'review' : 'reviews'}
                          </div>
                        </>
                      ) : (
                        <div className="reviews-location-card__unavailable">Review data unavailable</div>
                      )}
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* ---- Reviews Grid or Empty State ---- */}
          <section className="section section--alt">
            <div className="container">
              {hasReviews ? (
                <>
                  <SectionHeading
                    eyebrow="Reviews"
                    title={`${activeLocation === 'all' ? 'All' : activeLocation} Client Reviews`}
                    subtitle={`Showing ${filteredReviews.length} ${filteredReviews.length === 1 ? 'review' : 'reviews'}`}
                  />
                  <div className="reviews-grid">
                    {filteredReviews.map((review, index) => (
                      <ScrollReveal key={review.id} delay={index * 60}>
                        <div className="review-card">
                          <div className="review-card__header">
                            <StarRating rating={review.rating} />
                            <span className="review-card__source">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                              </svg>
                              {review.source}
                            </span>
                          </div>
                          <p className={`review-card__text ${!expandedIds.has(review.id) ? 'review-card__text--collapsed' : ''}`}>
                            &ldquo;{review.reviewText}&rdquo;
                          </p>
                          {review.reviewText.length > 200 && (
                            <button
                              className="review-card__read-more"
                              onClick={() => toggleExpanded(review.id)}
                              type="button"
                            >
                              {expandedIds.has(review.id) ? 'Show Less' : 'Read More'}
                            </button>
                          )}
                          <div className="review-card__meta">
                            {review.avatar ? (
                              <img
                                src={review.avatar}
                                alt={review.reviewerName}
                                className="review-card__avatar"
                                loading="lazy"
                              />
                            ) : (
                              <div className="review-card__avatar">
                                {review.reviewerName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
                              </div>
                            )}
                            <div className="review-card__info">
                              <div className="review-card__name">{review.reviewerName}</div>
                              {(review.company || review.role) && (
                                <div className="review-card__role">
                                  {review.role}{review.role && review.company ? ', ' : ''}{review.company}
                                </div>
                              )}
                            </div>
                            <div className="review-card__location">{review.location}</div>
                            {review.date && (
                              <div className="review-card__date">{review.date}</div>
                            )}
                          </div>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </>
              ) : (
                /* ---- Empty State ---- */
                <ScrollReveal>
                  <div className="reviews-empty">
                    <div className="reviews-empty__icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </div>
                    <h2 className="reviews-empty__title">Client Reviews</h2>
                    <p className="reviews-empty__text">
                      Our latest client reviews will appear here.
                    </p>
                    <p className="reviews-empty__subtext">
                      Reviews are currently being synced from our Google Business Profiles.
                    </p>
                  </div>
                </ScrollReveal>
              )}
            </div>
          </section>

          {/* ============================================================
              TRUST SECTION
              ============================================================ */}
          <section className="section">
            <div className="container">
              <SectionHeading
                eyebrow="Trust"
                title="Built Around Real Client Feedback"
                subtitle="Our reviews are collected from real client interactions and location-specific Google Business Profiles."
              />
              <div className="reviews-trust-grid">
                <ScrollReveal delay={0}>
                  <div className="reviews-trust-card">
                    <div className="reviews-trust-card__icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </div>
                    <h3 className="reviews-trust-card__title">Google Business Profile</h3>
                    <p className="reviews-trust-card__text">Reviews sourced directly from our verified GBP listings.</p>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={80}>
                  <div className="reviews-trust-card">
                    <div className="reviews-trust-card__icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <h3 className="reviews-trust-card__title">Real Client Feedback</h3>
                    <p className="reviews-trust-card__text">Every review represents a genuine client interaction.</p>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={160}>
                  <div className="reviews-trust-card">
                    <div className="reviews-trust-card__icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <h3 className="reviews-trust-card__title">Three Markets</h3>
                    <p className="reviews-trust-card__text">Location-specific reviews from Madurai, Thoothukudi and Malaysia.</p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* ============================================================
              LOCAL REVIEW CONTEXT
              ============================================================ */}
          <section className="section section--alt">
            <div className="container">
              <SectionHeading
                eyebrow="Locations"
                title="Reviews From the Markets We Serve"
              />
              <ScrollReveal>
                <div className="reviews-context">
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, maxWidth: '600px', marginInline: 'auto' }}>
                    Static Savvy Media serves businesses across Madurai, Thoothukudi and Malaysia, with location-specific digital marketing and search visibility strategies.
                  </p>
                  <div className="reviews-context__locations">
                    <Link to="/locations/madurai/" className="reviews-context__location">Madurai</Link>
                    <Link to="/locations/thoothukudi/" className="reviews-context__location">Thoothukudi</Link>
                    <Link to="/locations/malaysia/" className="reviews-context__location">Malaysia</Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </>
      )}

      {/* ============================================================
          CTA SECTION
          ============================================================ */}
      <CTASection
        eyebrow="Get Started"
        title="Ready to Grow Your Business?"
        subtitle="Let's build a digital presence that earns attention, trust and visibility across search and AI-driven discovery."
        primaryLabel="WhatsApp for a Free Consultation"
        primaryHref={whatsappHref}
        secondaryLabel="Explore Our Services"
        secondaryTo="/services/"
      />
    </div>
  )
}
