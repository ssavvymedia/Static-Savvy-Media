/**
 * Lazy loader for the unlisted /p/ price pages. CountryPricing (and masterPricing.js, which holds the
 * amounts) is split into its own chunk so prices are not shipped in the main bundle of public pages.
 * main.jsx calls preloadCountryPricing() before hydrating a prerendered /p/ page, so hydration renders
 * the full page synchronously and matches the server HTML (no flash, no mismatch).
 */
let loadedPage = null
let loading = null

export function getLoadedCountryPricing() {
  return loadedPage
}

export function preloadCountryPricing() {
  if (!loading) {
    loading = import('./CountryPricing.jsx').then((m) => {
      loadedPage = m.default
      return loadedPage
    })
  }
  return loading
}
