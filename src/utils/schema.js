import { SITE_NAME, SITE_URL } from './constants.js'

/**
 * Structured data builders.
 * Schema types prepared; actual data populated in the content phase.
 */

function schema(type, data) {
  return { '@context': 'https://schema.org', '@type': type, ...data }
}

export function organizationSchema(data = {}) {
  return schema('Organization', { name: SITE_NAME, url: SITE_URL, ...data })
}

export function webSiteSchema(data = {}) {
  return schema('WebSite', { name: SITE_NAME, url: SITE_URL, ...data })
}

export function serviceSchema(data = {}) {
  const out = { serviceType: data.serviceType || data.name || SITE_NAME, ...data }
  // schema.org expects provider to be an Organization, not a plain string.
  if (!out.provider || typeof out.provider === 'string') {
    out.provider = { '@type': 'Organization', name: out.provider || SITE_NAME, url: SITE_URL }
  }
  if (typeof out.areaServed === 'string') out.areaServed = { '@type': 'Place', name: out.areaServed }
  return schema('Service', out)
}

export function localBusinessSchema(data = {}) {
  return schema('LocalBusiness', { name: SITE_NAME, url: SITE_URL, ...data })
}

export function professionalServiceSchema(data = {}) {
  return schema('ProfessionalService', { name: SITE_NAME, url: SITE_URL, ...data })
}

export function personSchema(data = {}) {
  return schema('Person', data)
}

/* Accepts faqPageSchema({ faqs }) or faqPageSchema(faqs). Items may already be Question
 * entities, or plain { question, answer } / { q, a } objects. Several pages passed the bare
 * array, which used to produce an FAQPage with an empty mainEntity (invalid). */
export function faqPageSchema(data = {}) {
  const list = Array.isArray(data) ? data : data.faqs || []
  const mainEntity = list
    .map((f) => {
      if (f && f['@type'] === 'Question') return f
      const name = f?.question ?? f?.q ?? f?.name
      const text = f?.answer ?? f?.a ?? f?.text
      if (!name || !text) return null
      return { '@type': 'Question', name: String(name), acceptedAnswer: { '@type': 'Answer', text: String(text) } }
    })
    .filter(Boolean)
  return schema('FAQPage', { mainEntity })
}

/* Accepts breadcrumbListSchema({ items }) or breadcrumbListSchema(items). Items may use
 * { name, item }, { name, url } or { label, path } (relative paths are made absolute). */
export function breadcrumbListSchema(data = {}) {
  const list = Array.isArray(data) ? data : data.items || []
  const abs = (u) => (!u ? undefined : /^https?:/.test(u) ? u : `${SITE_URL}${u.startsWith('/') ? '' : '/'}${u}`)
  return schema('BreadcrumbList', {
    itemListElement: list.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name ?? item.label,
      item: abs(item.item ?? item.url ?? item.path ?? item.to),
    })),
  })
}

export function blogPostingSchema(data = {}) {
  return schema('BlogPosting', data)
}

export function articleSchema(data = {}) {
  return schema('Article', data)
}

export function videoObjectSchema(data = {}) {
  return schema('VideoObject', data)
}

export function reviewSchema(data = {}) {
  return schema('Review', data)
}

export function aggregateRatingSchema(data = {}) {
  return schema('AggregateRating', data)
}

export function offerSchema(data = {}) {
  return schema('Offer', data)
}
