/**
 * Countries and unlisted /p/ paths for the private per-country price pages. No amounts here: the prices
 * live only in masterPricing.js, which is loaded lazily on the /p/ pages, so they are not in the main bundle.
 */
export const PRICING_COUNTRIES = [
  { key: 'india', label: 'India', flag: '🇮🇳', currency: 'INR', symbol: '₹', iso: 'IN', countryName: 'India', whatsapp: '+91 99440 40345' },
  { key: 'malaysia', label: 'Malaysia', flag: '🇲🇾', currency: 'MYR', symbol: 'RM ', iso: 'MY', countryName: 'Malaysia', whatsapp: '+60 12-453 7030' },
  { key: 'dubai', label: 'Dubai', flag: '🇦🇪', currency: 'AED', symbol: 'AED ', iso: 'AE', countryName: 'United Arab Emirates', whatsapp: '+91 99440 40345' },
  { key: 'singapore', label: 'Singapore', flag: '🇸🇬', currency: 'SGD', symbol: 'SGD ', iso: 'SG', countryName: 'Singapore', whatsapp: '+91 99440 40345' },
]

/** Unlisted per-country pricing pages: noindex,nofollow, never linked, not in the sitemap or llms.txt. */
export const UNLISTED_PRICING_PATHS = {
  india: '/p/india-9xajei/',
  malaysia: '/p/malaysia-2josdx/',
  dubai: '/p/dubai-a8aokh/',
  singapore: '/p/singapore-xseszo/',
}
