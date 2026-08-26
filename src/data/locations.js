/**
 * Locations configuration.
 * Structural placeholders only — populated with approved content in the next phase.
 */

export const locations = [
  { slug: 'madurai', name: 'Madurai', path: '/locations/madurai/' },
  { slug: 'malaysia', name: 'Malaysia', path: '/locations/malaysia/' },
  { slug: 'thoothukudi', name: 'Thoothukudi', path: '/locations/thoothukudi/' },
]

export function getLocationBySlug(slug) {
  return locations.find((location) => location.slug === slug) || null
}
