/**
 * Official off-site profiles of Static Savvy Media, used as Organization `sameAs` in every JSON-LD
 * graph (client-side schema, SSR bodies and prerendered fallbacks). Plain data, no imports, so Node
 * build scripts can load it too.
 *
 * Only add a URL once the profile is LIVE, publicly reachable and shows the same name, address and
 * phone as the website (NAP). Pending/blocked as of 2026-10-28: Clutch (claim 2491079), DesignRush,
 * GoodFirms, Apple Business Connect, Justdial and Bing Places public URLs (listings live, add the
 * public profile URL when copied from the browser).
 */
export const ORG_SAME_AS = [
  'https://www.linkedin.com/company/staticsavvymedia/',
  'https://www.facebook.com/staticsavvymedia',
  'https://www.instagram.com/staticsavvymedia',
  'https://x.com/ssavvymedia',
  'https://www.youtube.com/@staticsavvymedia',
  'https://in.pinterest.com/Staticsavvymedia/',
  'https://www.sortlist.com/agency/static-savvy-media',
]

/* Google Maps listings (Google Business Profile), for the matching LocalBusiness `hasMap`. */
export const GBP_MAPS = {
  madurai: 'https://www.google.com/maps/place/?q=place_id:ChIJXTwi96LFADsR5o-MQveOrKw',
  malaysia: 'https://www.google.com/maps/place/?q=place_id:ChIJ-1K74jBDzDER0qr1oLcyvbU',
}
