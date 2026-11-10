import { Link, useLocation } from 'react-router-dom'
import { RELATED_LINKS, HQ_LINK, needsHqLink } from '../../data/relatedLinks.js'

/** Small "Related" link list at the end of <main> (see src/data/relatedLinks.js). */
export default function RelatedLinks() {
  const { pathname } = useLocation()
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`
  const links = [...(needsHqLink(path) ? [HQ_LINK] : []), ...(RELATED_LINKS[path] || [])]
  if (!links.length) return null
  return (
    <nav className="hv2 hv2-section hv2-section--flush" aria-label="Related pages" data-section="related-links" style={{ paddingTop: 'clamp(24px,3vw,40px)', paddingBottom: 'clamp(24px,3vw,40px)' }}>
      <div className="hv2-wrap">
        <span className="hv2-eyebrow">Related</span>
        <ul className="hv2-sol__links" style={{ marginTop: 12 }}>
          {links.map((l) => <li key={l.to}><Link to={l.to}>{l.label} →</Link></li>)}
        </ul>
      </div>
    </nav>
  )
}
