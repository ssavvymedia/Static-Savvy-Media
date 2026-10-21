import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setSeo } from '../../utils/seo.js'

/**
 * Rendered for any URL that matches no route (replaces the old `*` -> "/" redirect, which turned
 * every typo or dead link into a duplicate of the homepage, i.e. a soft 404).
 *
 * On the server, unknown URLs already get a real HTTP 404 (vercel.json only rewrites known routes
 * to index.html, and public/404.html is served for everything else). This view covers in-app
 * navigation to a bad link, and is marked noindex so it can never be indexed.
 */
export default function NotFound() {
  useEffect(() => {
    setSeo({
      title: 'Page not found | Static Savvy Media',
      description: 'The page you are looking for does not exist or has moved.',
      // noindex page: drop the canonical so neither the homepage's nor the previous page's remains.
      canonical: false,
      robots: 'noindex,follow',
    })
  }, [])

  return (
    <section className="section">
      <div className="container">
        <div className="blog-post-not-found">
          <div className="blog-post-not-found__icon" aria-hidden="true">🔍</div>
          <h1 className="blog-post-not-found__title">Sorry, we can&rsquo;t find that page</h1>
          <p className="blog-post-not-found__text">
            The link may be old or mistyped. These pages might help:
          </p>
          <p className="blog-post-not-found__text">
            <Link to="/services/">Services</Link> · <Link to="/locations/madurai/">Madurai</Link> ·{' '}
            <Link to="/locations/malaysia/">Malaysia</Link> · <Link to="/blog/">Blog</Link> ·{' '}
            <Link to="/contact/">Contact</Link>
          </p>
          <Link to="/" className="btn btn--primary btn--md">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  )
}
