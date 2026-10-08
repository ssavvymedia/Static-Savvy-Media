/**
 * Small shared helpers.
 */
export function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
}

export function titleCase(value) {
  return String(value)
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export function formatPhone(number) {
  return number || ''
}

export function buildWhatsAppLink(number, message = '') {
  if (!number) return '#'
  const base = `https://wa.me/${number.replace(/[^0-9]/g, '')}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

/**
 * Clean a CMS slug for use in a URL path segment: trims whitespace and leading/trailing
 * slashes (one Sanity post was saved as "/seo-audit-services-madurai").
 */
export function cleanSlug(value) {
  return String(value || '').trim().replace(/^\/+|\/+$/g, '')
}
