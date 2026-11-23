import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { schedulePageView } from '../../utils/track.js'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const lastPath = useRef('')

  useEffect(() => {
    // In-page targets such as /contact/#form: scroll to the element once the new page has rendered.
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      let tries = 0
      const seek = () => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        else if (tries++ < 20) setTimeout(seek, 100)
      }
      seek()
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }

    // First load and later path changes each schedule one page_view. Hash-only
    // updates (/contact/#form) do not. setSeo() schedules the same helper after
    // the title is written; the helper sends a single hit.
    if (lastPath.current === pathname) return
    lastPath.current = pathname
    schedulePageView()
  }, [pathname, hash])

  return null
}