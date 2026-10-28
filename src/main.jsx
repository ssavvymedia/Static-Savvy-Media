import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

/* After a deploy, a tab (or a cached HTML shell) can still reference JS/CSS chunks that no longer
 * exist. Vite fires vite:preloadError when such a chunk fails to load: reload once to get the new
 * build instead of showing a broken page. The sessionStorage flag stops a reload loop. */
window.addEventListener('vite:preloadError', (event) => {
  const KEY = 'ssm-chunk-reload'
  if (sessionStorage.getItem(KEY)) return
  sessionStorage.setItem(KEY, '1')
  event.preventDefault()
  window.location.reload()
})
window.addEventListener('load', () => setTimeout(() => sessionStorage.removeItem('ssm-chunk-reload'), 10000))

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

/* Prerendered routes ship the full app markup in #root (data-ssr = the route it was rendered for):
 * hydrate it in place so the page does not blank, flash or jump on load. Anything else (SPA
 * fallback, Sanity posts, a shell served for a different path) is rendered fresh. */
const root = document.getElementById('root')
const path = window.location.pathname.endsWith('/') ? window.location.pathname : `${window.location.pathname}/`
if (root.dataset.ssr && root.dataset.ssr === path) {
  hydrateRoot(root, app)
} else {
  root.textContent = ''
  createRoot(root).render(app)
}
