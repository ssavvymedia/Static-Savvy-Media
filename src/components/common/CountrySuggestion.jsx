import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

/*
 * Dismissible, non-blocking "Visiting from Malaysia?" suggestion for the home page.
 * - No IP lookup and no redirect: the guess comes only from the browser's own time zone, so there is
 *   no network request and crawlers (which run in US time zones) never see it.
 * - Rendered only after mount (nothing in the server HTML, so no hydration mismatch) and
 *   position: fixed, so it never moves page content (no CLS).
 * - Dismissal is remembered in localStorage.
 */
const SUGGESTIONS = {
  'Asia/Kuala_Lumpur': { country: 'Malaysia', path: '/locations/malaysia/', label: 'See our Malaysia page' },
  'Asia/Kuching': { country: 'Malaysia', path: '/locations/malaysia/', label: 'See our Malaysia page' },
  'Asia/Singapore': { country: 'Singapore', path: '/locations/singapore/', label: 'See our Singapore page' },
  'Asia/Dubai': { country: 'the UAE', path: '/locations/dubai/', label: 'See our Dubai page' },
}
const KEY = 'ssm-country-suggest-dismissed'

export default function CountrySuggestion() {
  const [suggestion, setSuggestion] = useState(null)

  useEffect(() => {
    let timer
    try {
      if (window.localStorage.getItem(KEY)) return undefined
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      const s = SUGGESTIONS[tz]
      if (s) timer = window.setTimeout(() => setSuggestion(s), 1500)
    } catch {
      /* storage or Intl unavailable: show nothing */
    }
    return () => window.clearTimeout(timer)
  }, [])

  if (!suggestion) return null

  const dismiss = () => {
    try {
      window.localStorage.setItem(KEY, '1')
    } catch {
      /* ignore */
    }
    setSuggestion(null)
  }

  return (
    <div className="country-suggest" role="region" aria-label="Country suggestion">
      <span>
        Visiting from {suggestion.country}?{' '}
        <Link to={suggestion.path} onClick={dismiss}>{suggestion.label} →</Link>
      </span>
      <button type="button" className="country-suggest__close" onClick={dismiss} aria-label="Dismiss">
        ×
      </button>
    </div>
  )
}
