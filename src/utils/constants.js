/**
 * Global site constants.
 * Structural configuration only — populated further in the content phase.
 */
export const SITE_NAME = 'Static Savvy Media'
// Canonical production origin (no trailing slash). The site is served on www; the bare domain
// 308-redirects to it. VITE_SITE_URL can override this at build time (Vite exposes VITE_* vars on
// import.meta.env; `process.env` does not exist in browser code, so it was silently ignored before).
const DEFAULT_SITE_URL = 'https://www.staticsavvymedia.com'
export const SITE_URL = (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, '')
export const SITE_TAGLINE = 'Premium Digital Marketing Agency'
export const SITE_DESCRIPTION = ''
export const CONTACT_PHONE = ''
export const CONTACT_EMAIL = ''
export const WHATSAPP_NUMBER = '+91 99440 40345'
export const WHATSAPP_MESSAGE = 'Hi Static Savvy Media, I would like to know more about your services.'

// Madurai Google Business Profile rating, owner-supplied (2026-10-12). Update both values together
// when the profile changes. Visible text only: do NOT emit as AggregateRating/Review JSON-LD
// (Google treats self-hosted first-party review markup as self-serving).
export const GOOGLE_RATING = '4.9'
export const GOOGLE_REVIEW_COUNT = 108
export const GOOGLE_TRUST_LINE = `${GOOGLE_RATING}★ from ${GOOGLE_REVIEW_COUNT} Google reviews · Madurai office`

// Malaysia office (Rawang, Selangor). Owner-confirmed details: calls go to the Malaysian
// number; WhatsApp stays on the Indian number (WHATSAPP_NUMBER). Keep visible text and
// LocalBusiness JSON-LD in sync by reading from here.
export const MALAYSIA_OFFICE = {
  name: 'Static Savvy Media, Malaysia',
  phoneDisplay: '+60 12-453 7030',
  phoneE164: '+60124537030',
  phoneHref: 'tel:+60124537030',
  whatsappDisplay: '+91 99440 40345',
  whatsappNumber: WHATSAPP_NUMBER,
  hoursDisplay: 'Mon–Fri, 9 AM – 6 PM (MYT)',
  hoursNote: 'Sat & Sun closed',
  streetAddress: 'NO.9, Jalan Anggun 2J, Taman Anggun 2',
  postalCode: '48000',
  addressLocality: 'Rawang',
  addressRegion: 'Selangor',
  addressCountry: 'MY',
  landmark: 'Near AEON Mall Rawang',
}

// schema.org fragments for the Malaysia office (used by LocalBusiness / ProfessionalService JSON-LD).
export const MALAYSIA_POSTAL_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: MALAYSIA_OFFICE.streetAddress,
  addressLocality: MALAYSIA_OFFICE.addressLocality,
  addressRegion: MALAYSIA_OFFICE.addressRegion,
  postalCode: MALAYSIA_OFFICE.postalCode,
  addressCountry: MALAYSIA_OFFICE.addressCountry,
}

export const MALAYSIA_OPENING_HOURS_SPEC = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
]
export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/staticsavvymedia',
  facebook: 'https://www.facebook.com/staticsavvymedia',
  linkedin: 'https://www.linkedin.com/company/staticsavvymedia/',
  x: 'https://x.com/ssavvymedia',
  youtube: 'https://www.youtube.com/@staticsavvymedia',
  pinterest: 'https://in.pinterest.com/Staticsavvymedia/',
}
