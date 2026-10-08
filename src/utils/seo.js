import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getSeoForPath } from '../data/seoConfig.js'
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from './constants.js'

function setMetaTag(attr, key, content) {
  if (!content) return
  let meta = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attr, key)
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', content)
}

function setJsonLd(schemaData) {
  let script = document.head.querySelector('script[id="json-ld-schema"]')
  if (!script) {
    script = document.createElement('script')
    script.setAttribute('type', 'application/ld+json')
    script.setAttribute('id', 'json-ld-schema')
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(schemaData || {})
}

/**
 * Normalise any canonical/og:url to the single production form:
 *   https://www.staticsavvymedia.com/<path>/
 * Accepts absolute URLs on any host (e.g. the old non-www constant), relative paths, and
 * strips query strings and hashes. Paths are given a trailing slash (the form the site's
 * internal links, the sitemap and the server config use); file-like paths (*.xml) are left alone.
 */
export function toCanonicalUrl(url) {
  const base = new URL(SITE_URL)
  const u = new URL(url || '/', base)
  u.protocol = base.protocol
  u.host = base.host
  u.search = ''
  u.hash = ''
  let path = u.pathname.replace(/\/{2,}/g, '/')
  if (!path.endsWith('/') && !/\.[a-z0-9]+$/i.test(path)) path += '/'
  u.pathname = path
  return u.toString()
}

export function setDocumentTitle(title) {
  document.title = title || SITE_NAME
}

export function setSeo({
  title,
  description,
  canonical,
  focusKeyword,
  ogTitle,
  ogDescription,
  ogImage,
  schema,
  robots = 'index,follow',
  ogType = 'website',
}) {
  const finalTitle = title || SITE_NAME
  const finalDesc = description || SITE_DESCRIPTION
  const finalCanonical = toCanonicalUrl(canonical || '/')

  setDocumentTitle(finalTitle)

  // Standard Meta Tags
  setMetaTag('name', 'description', finalDesc)
  setMetaTag('name', 'robots', robots)

  // Open Graph
  setMetaTag('property', 'og:title', ogTitle || finalTitle)
  setMetaTag('property', 'og:description', ogDescription || finalDesc)
  setMetaTag('property', 'og:type', ogType)
  setMetaTag('property', 'og:url', finalCanonical)
  setMetaTag('property', 'og:site_name', SITE_NAME)
  if (ogImage) {
    setMetaTag('property', 'og:image', ogImage)
  }

  // Twitter Cards
  setMetaTag('name', 'twitter:card', 'summary_large_image')
  setMetaTag('name', 'twitter:title', ogTitle || finalTitle)
  setMetaTag('name', 'twitter:description', ogDescription || finalDesc)
  if (ogImage) {
    setMetaTag('name', 'twitter:image', ogImage)
  }

  // Canonical Link
  let link = document.head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', finalCanonical)

  // JSON-LD Schema
  if (schema) {
    setJsonLd(schema)
  }
}

/**
 * Custom Hook: useRouteSEO
 * Automatically updates SEO metadata whenever the route path changes based on seoConfig.js.
 */
export function useRouteSEO(customPath) {
  const location = useLocation()
  const path = customPath || location.pathname

  useEffect(() => {
    const config = getSeoForPath(path)
    if (config && config.seo) {
      setSeo(config.seo)
    }
  }, [path])
}

/**
 * Reusable SEO Component
 */
export default function SEO({ path }) {
  useRouteSEO(path)
  return null
}
