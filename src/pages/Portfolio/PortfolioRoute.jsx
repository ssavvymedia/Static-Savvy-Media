import { useEffect, useState } from 'react'
import { getLoadedPortfolio, preloadPortfolio } from './portfolioLoader.js'

/** Route element for the private portfolio page: renders Portfolio once its chunk is loaded. */
export default function PortfolioRoute(props) {
  const [Page, setPage] = useState(() => getLoadedPortfolio())
  useEffect(() => {
    if (Page) return undefined
    let alive = true
    preloadPortfolio().then((C) => { if (alive) setPage(() => C) })
    return () => { alive = false }
  }, [Page])
  return Page ? <Page {...props} /> : null
}
