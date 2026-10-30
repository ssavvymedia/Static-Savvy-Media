import { Outlet } from 'react-router-dom'
import SEO from '../utils/seo.js'

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
