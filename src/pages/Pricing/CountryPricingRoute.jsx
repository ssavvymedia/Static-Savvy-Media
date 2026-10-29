import { useEffect, useState } from 'react'
import { getLoadedCountryPricing, preloadCountryPricing } from './countryPricingLoader.js'

/** Route element for the unlisted /p/ price pages: renders CountryPricing once its chunk is loaded. */
export default function CountryPricingRoute(props) {
  const [Page, setPage] = useState(() => getLoadedCountryPricing())
  useEffect(() => {
    if (Page) return undefined
    let alive = true
    preloadCountryPricing().then((C) => { if (alive) setPage(() => C) })
    return () => { alive = false }
  }, [Page])
  return Page ? <Page {...props} /> : null
}
