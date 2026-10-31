/**
 * Lazy loader for the private portfolio page (own chunk, so public pages don't ship it). main.jsx calls
 * preloadPortfolio() before hydrating the prerendered page so hydration matches the server HTML.
 */
let loadedPage = null
let loading = null

export function getLoadedPortfolio() {
  return loadedPage
}

export function preloadPortfolio() {
  if (!loading) {
    loading = import('./Portfolio.jsx').then((m) => {
      loadedPage = m.default
      return loadedPage
    })
  }
  return loading
}
