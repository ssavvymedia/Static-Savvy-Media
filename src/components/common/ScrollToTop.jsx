import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()
  const isFirstLoad = useRef(true)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })

    // GTM/GA4 only auto-fires a pageview on the initial document load.
    // React Router changes the URL client-side without a full reload, so
    // every subsequent route change needs its own virtual pageview pushed
    // to the dataLayer, or Analytics only ever sees a single pageview per
    // visit no matter how many pages someone browses.
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return
    }

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'page_view',
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [pathname])

  return null
}