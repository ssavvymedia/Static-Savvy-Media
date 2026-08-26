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
  return schema('Service', { serviceType: data.serviceType || SITE_NAME, ...data })
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

export function faqPageSchema(data = {}) {
  return schema('FAQPage', { mainEntity: data.faqs || [] })
}

export function breadcrumbListSchema(data = {}) {
  return schema('BreadcrumbList', {
    itemListElement: (data.items || []).map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
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
