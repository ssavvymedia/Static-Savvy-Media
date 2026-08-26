import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from './constants.js'

/**
 * SEO utilities.
 * Architecture in place; exact meta data populated in the content phase.
 */

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

export function setDocumentTitle(title) {
  document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME
}

export function setSeo({ title, description, canonical, ogType = 'website' }) {
  setDocumentTitle(title)
  setMetaTag('name', 'description', description || SITE_DESCRIPTION)
  setMetaTag('property', 'og:title', title || SITE_NAME)
  setMetaTag('property', 'og:description', description || SITE_DESCRIPTION)
  setMetaTag('property', 'og:type', ogType)
  setMetaTag('property', 'og:url', canonical || SITE_URL)
  setMetaTag('name', 'twitter:card', 'summary_large_image')
  setMetaTag('name', 'twitter:title', title || SITE_NAME)
  setMetaTag('name', 'twitter:description', description || SITE_DESCRIPTION)

  if (canonical) {
    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', canonical)
  }
}
