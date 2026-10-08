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
export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/staticsavvymedia',
  facebook: 'https://www.facebook.com/staticsavvymedia',
  linkedin: 'https://www.linkedin.com/company/staticsavvymedia/',
  x: 'https://x.com/ssavvymedia',
  youtube: 'https://www.youtube.com/@staticsavvymedia',
  pinterest: 'https://in.pinterest.com/Staticsavvymedia/',
}
