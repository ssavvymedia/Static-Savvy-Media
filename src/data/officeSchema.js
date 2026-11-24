/**
 * Shared LocalBusiness / ProfessionalService nodes for the real offices (Madurai, Thoothukudi).
 * Used by prerender (scripts/seo/ssr-bodies.mjs) and the location pages, so crawlers
 * and the hydrated client emit the same entity (same @id) instead of duplicate blocks.
 *
 * aggregateRating is opt-in and only for the office location pages (real Google figures).
 * It stays off Service pages. Geo is omitted: no coordinates are stored in the repo.
 */
import {
  SITE_URL,
  ORG_SAME_AS,
  GBP_MAPS,
  MADURAI_OFFICE,
  MADURAI_POSTAL_ADDRESS,
  MADURAI_OPENING_HOURS_SPEC,
  THOOTHUKUDI_OFFICE,
  THOOTHUKUDI_POSTAL_ADDRESS,
} from '../utils/constants.js'

export const ORG_ID = `${SITE_URL}/#organization`

/** Routes that should include aggregateRating on their office LocalBusiness node. */
export const OFFICE_LOCATION_ROUTES = {
  '/locations/madurai/': 'madurai',
  '/locations/thoothukudi/': 'thoothukudi',
}

/* Real Google review totals. Thoothukudi has 0 reviews, so it has no entry. */
const RATINGS = {
  madurai: { ratingValue: '4.9', reviewCount: 106, bestRating: 5 },
}

const OFFICES = {
  madurai: {
    name: MADURAI_OFFICE.name,
    url: `${SITE_URL}/locations/madurai/`,
    id: `${SITE_URL}/locations/madurai/#localbusiness`,
    geo: { '@type': 'GeoCoordinates', latitude: 9.925, longitude: 78.1195 },
    telephone: MADURAI_OFFICE.phoneDisplay,
    address: MADURAI_POSTAL_ADDRESS,
    openingHoursSpecification: MADURAI_OPENING_HOURS_SPEC,
    hasMap: GBP_MAPS.madurai,
    image: `${SITE_URL}/og/locations-01madurai.jpg`,
  },
  thoothukudi: {
    name: THOOTHUKUDI_OFFICE.name,
    url: `${SITE_URL}/locations/thoothukudi/`,
    id: `${SITE_URL}/locations/thoothukudi/#localbusiness`,
    geo: { '@type': 'GeoCoordinates', latitude: 8.8032, longitude: 78.157 },
    telephone: THOOTHUKUDI_OFFICE.phoneDisplay,
    address: THOOTHUKUDI_POSTAL_ADDRESS,
    image: `${SITE_URL}/og/locations-03thoothukudi.jpg`,
  },
}

/* Malaysia has no office (owner, 24 Nov 2026): Malaysian pages point at the Madurai business. */
const OFFICE_ALIAS = { malaysia: 'madurai' }

export function officeLocalBusiness(key, { includeRating = false } = {}) {
  const o = OFFICES[OFFICE_ALIAS[key] || key]
  if (!o) return null
  const node = {
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': o.id,
    name: o.name,
    url: o.url,
    telephone: o.telephone,
    address: o.address,
    image: o.image,
    sameAs: ORG_SAME_AS,
    parentOrganization: { '@id': ORG_ID },
  }
  if (o.openingHoursSpecification) node.openingHoursSpecification = o.openingHoursSpecification
  if (o.hasMap) node.hasMap = o.hasMap
  if (o.geo) node.geo = o.geo
  if (includeRating && RATINGS[key]) {
    node.aggregateRating = { '@type': 'AggregateRating', ...RATINGS[key] }
  }
  return node
}

/** Build a single @graph JSON-LD document, stripping per-node @context. */
export function schemaGraph(...nodes) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean).map((n) => {
      const rest = { ...n }
      delete rest['@context']
      return rest
    }),
  }
}
