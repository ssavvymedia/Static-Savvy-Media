import { lazy, createElement } from 'react'

/**
 * Route-level code splitting that stays prerender-friendly.
 *  - Browser: each page is its own chunk (React.lazy); a <Suspense> around <Outlet/> in the layouts
 *    keeps the server HTML in place while the chunk loads, so prerendered pages do not blank.
 *  - Build (scripts/seo/ssr-bodies.mjs): preloadAllPages() resolves every chunk first, so
 *    renderToString() renders the real page synchronously, and renderedPageModules records which
 *    page modules a route used (prerender-heads.mjs turns them into <link rel="modulepreload">
 *    and data-page, which main.jsx preloads before hydrating).
 * `id` is the module path from the project root, the same key Vite's build manifest uses.
 */
const registry = new Map()
export const renderedPageModules = new Set()

export function lazyPage(id, factory) {
  const entry = { Comp: null, promise: null }
  entry.load = () => (entry.promise ||= factory().then((m) => { entry.Comp = m.default; return m }))
  registry.set(id, entry)
  const Lazy = lazy(entry.load)
  function Page(props) {
    if (typeof window === 'undefined') renderedPageModules.add(id)
    return entry.Comp ? createElement(entry.Comp, props) : createElement(Lazy, props)
  }
  Page.displayName = `Page(${id.split('/').pop()})`
  return Page
}

export const preloadAllPages = () => Promise.all([...registry.values()].map((e) => e.load()))

/** Preload the page module(s) a prerendered route was built with (ids from #root[data-page]). */
export const preloadPages = (ids) => Promise.all(ids.map((id) => registry.get(id)?.load()).filter(Boolean))
