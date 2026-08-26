/**
 * Industries configuration.
 * Structural placeholders only — populated with approved content in the next phase.
 */

export const industries = [
  { slug: 'retail-ecommerce', name: 'Retail & E-Commerce', path: '/industries/retail-ecommerce/' },
  { slug: 'healthcare-clinics', name: 'Healthcare & Clinics', path: '/industries/healthcare-clinics/' },
  { slug: 'education-training', name: 'Education & Training', path: '/industries/education-training/' },
  { slug: 'hospitality-hotels', name: 'Hospitality & Hotels', path: '/industries/hospitality-hotels/' },
  { slug: 'textiles-madurai', name: 'Textiles (Madurai)', path: '/industries/textiles-madurai/' },
  { slug: 'port-marine-industrial-thoothukudi', name: 'Port, Marine & Industrial (Thoothukudi)', path: '/industries/port-marine-industrial-thoothukudi/' },
  { slug: 'smes-malaysia-grant-eligible', name: 'SMEs (Malaysia, Grant Eligible)', path: '/industries/smes-malaysia-grant-eligible/' },
  { slug: 'real-estate-builders', name: 'Real Estate & Builders', path: '/industries/real-estate-builders/' },
]

export function getIndustryBySlug(slug) {
  return industries.find((industry) => industry.slug === slug) || null
}
