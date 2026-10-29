/**
 * Locations configuration.
 * `locations` is the flat list (hub pages + every city page); `locationGroups` is the same set grouped
 * by market for the header "Locations" dropdown, the mobile menu and the footer, so every location
 * page is linked site-wide (no orphans). Plain data only: also loaded by Node at build time.
 */

export const locationGroups = [
  {
    title: '🇮🇳 India',
    path: '/locations/tamil-nadu/',
    items: [
      { slug: 'madurai', name: 'Madurai (HQ)', path: '/locations/madurai/' },
      { slug: 'chennai', name: 'Chennai', path: '/locations/chennai/' },
      { slug: 'coimbatore', name: 'Coimbatore', path: '/locations/coimbatore/' },
      { slug: 'trichy', name: 'Trichy', path: '/locations/trichy/' },
      { slug: 'salem', name: 'Salem', path: '/locations/salem/' },
      { slug: 'tirunelveli', name: 'Tirunelveli', path: '/locations/tirunelveli/' },
      { slug: 'tiruppur', name: 'Tiruppur', path: '/locations/tiruppur/' },
      { slug: 'thoothukudi', name: 'Thoothukudi', path: '/locations/thoothukudi/' },
    ],
  },
  {
    title: '🇲🇾 Malaysia',
    path: '/locations/malaysia/',
    items: [
      { slug: 'kuala-lumpur', name: 'Kuala Lumpur', path: '/locations/kuala-lumpur/' },
      { slug: 'selangor', name: 'Selangor (Rawang office)', path: '/locations/selangor/' },
    ],
  },
  {
    title: '🌏 Singapore & UAE',
    path: '/locations/',
    items: [
      { slug: 'singapore', name: 'Singapore', path: '/locations/singapore/' },
      { slug: 'dubai', name: 'Dubai', path: '/locations/dubai/' },
    ],
  },
]

export const locations = [
  { slug: 'madurai', name: 'Madurai', path: '/locations/madurai/' },
  { slug: 'malaysia', name: 'Malaysia', path: '/locations/malaysia/' },
  { slug: 'thoothukudi', name: 'Thoothukudi', path: '/locations/thoothukudi/' },
  { slug: 'tamil-nadu', name: 'Tamil Nadu', path: '/locations/tamil-nadu/' },
]

export function getLocationBySlug(slug) {
  return locations.find((location) => location.slug === slug) || null
}
