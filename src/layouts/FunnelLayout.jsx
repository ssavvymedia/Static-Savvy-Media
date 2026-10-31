import { Outlet } from 'react-router-dom'
import SEO from '../utils/seo.js'
/* The /p/ page styles ship in the main stylesheet (16 kB, class names only, no prices), not in the
 * lazy CountryPricing chunk: as a chunk CSS file it was only injected after the 475 kB main bundle had
 * downloaded and run, so the prerendered page painted unstyled (giant logo, raw text) for ~2 s on
 * mobile networks before snapping into place. Prices stay in the lazy JS chunk. */
import '../styles/pages/pricing-master.css'
/* Same reason for the private portfolio page's styles (class names only). */
import '../styles/pages/portfolio.css'

/**
 * Distraction-free layout for the unlisted /p/ pricing landing pages: no site nav, footer links,
 * floating WhatsApp or back-to-top buttons. The page renders its own slim header, footer and
 * sticky mobile CTA bar.
 */
export default function FunnelLayout() {
  return (
    <div className="site layout--funnel">
      <SEO />
      <main className="site__main">
        <Outlet />
      </main>
    </div>
  )
}
