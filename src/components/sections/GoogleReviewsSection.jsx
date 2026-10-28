import SectionHeading from '../common/SectionHeading.jsx'
import { GOOGLE_REVIEWS, GBP_REVIEW_SUMMARY } from '../../data/googleReviews.js'
import '../../styles/google-reviews.css'

function GoogleG() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  )
}

/**
 * Real Google reviews (verbatim) from the Madurai Google Business Profile. Visible only, no schema.
 * Mobile: swipeable scroll-snap carousel. Desktop: grid.
 */
export default function GoogleReviewsSection({
  reviews = GOOGLE_REVIEWS.slice(0, 3),
  eyebrow = 'Google reviews',
  title = 'What clients say on Google',
  subtitle = '',
  className = '',
}) {
  const s = GBP_REVIEW_SUMMARY
  return (
    <section id="google-reviews" className={`section greviews ${className}`.trim()} aria-label="Google reviews">
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <a className="greviews__summary" href={s.url} target="_blank" rel="noopener noreferrer">
          <GoogleG />
          <strong>{s.rating}/5</strong>
          <span className="greviews__stars" aria-hidden="true">★★★★★</span>
          <span>from {s.count} Google reviews</span>
        </a>
        <ul className={`greviews__list greviews__list--${reviews.length}`}>
          {reviews.map((r) => (
            <li key={r.id} className="greviews__card">
              <figure>
                <div className="greviews__top">
                  <span className="greviews__stars" role="img" aria-label="5 out of 5 stars">★★★★★</span>
                  <span className="greviews__src"><GoogleG /> Google review</span>
                </div>
                <blockquote className="greviews__quote"><p>&ldquo;{r.text}&rdquo;</p></blockquote>
                <figcaption className="greviews__meta">
                  <span className="greviews__avatar" aria-hidden="true">{r.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}</span>
                  <span className="greviews__name">{r.name}</span>
                  <a className="greviews__link" href={s.url} target="_blank" rel="noopener noreferrer">View on Google</a>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p className="greviews__note">
          Quoted word for word from our Madurai Google Business Profile.{' '}
          <a href={s.url} target="_blank" rel="noopener noreferrer">Read all {s.count} reviews on Google →</a>
        </p>
      </div>
    </section>
  )
}
