import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const isFirstLoad = useRef(true)
  const lastPath = useRef(pathname)

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

    // GTM/GA4 only auto-fires a pageview on the initial document load.
    // React Router changes the URL client-side without a full reload, so
    // every subsequent route change needs its own virtual pageview pushed
    // to the dataLayer, or Analytics only ever sees a single pageview per
    // visit no matter how many pages someone browses.
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return
    }
    // A hash-only change on the same page is not a new pageview.
    if (lastPath.current === pathname) return
    lastPath.current = pathname

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'page_view',
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [pathname, hash])

  return null
}