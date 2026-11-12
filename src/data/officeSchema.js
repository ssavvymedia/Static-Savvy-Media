/**
 * Shared LocalBusiness / ProfessionalService nodes for the three real offices.
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
  MALAYSIA_OFFICE,
  MALAYSIA_POSTAL_ADDRESS,
  MALAYSIA_OPENING_HOURS_SPEC,
} from '../utils/constants.js'

export const ORG_ID = `${SITE_URL}/#organization`

/** Routes that should include aggregateRating on their office LocalBusiness node. */
export const OFFICE_LOCATION_ROUTES = {
  '/locations/madurai/': 'madurai',
  '/locations/thoothukudi/': 'thoothukudi',
  '/locations/malaysia/': 'malaysia',
  '/locations/rawang/': 'malaysia',
}

/* Real Google review totals. Thoothukudi has 0 reviews, so it has no entry. */
const RATINGS = {
  madurai: { ratingValue: '4.9', reviewCount: 106, bestRating: 5 },
  malaysia: { ratingValue: '5.0', reviewCount: 1, bestRating: 5 },
}

const OFFICES = {
  madurai: {
    name: MADURAI_OFFICE.name,
    url: `${SITE_URL}/locations/madurai/`,
    id: `${SITE_URL}/locations/madurai/#localbusiness`,
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
    telephone: THOOTHUKUDI_OFFICE.phoneDisplay,
    address: THOOTHUKUDI_POSTAL_ADDRESS,
    image: `${SITE_URL}/og/locations-03thoothukudi.jpg`,
  },
  malaysia: {
    name: MALAYSIA_OFFICE.name,
    url: `${SITE_URL}/locations/malaysia/`,
    id: `${SITE_URL}/locations/malaysia/#localbusiness`,
    telephone: MALAYSIA_OFFICE.phoneDisplay,
    address: MALAYSIA_POSTAL_ADDRESS,
    openingHoursSpecification: MALAYSIA_OPENING_HOURS_SPEC,
    hasMap: GBP_MAPS.malaysia,
    image: `${SITE_URL}/og/locations-02malaysia.jpg`,
  },
}

export function officeLocalBusiness(key, { includeRating = false } = {}) {
  const o = OFFICES[key]
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
