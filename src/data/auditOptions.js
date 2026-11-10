/* Options for the Growth Audit form (src/components/sections/GrowthAuditForm.jsx). Plain data. */
export const AUDIT_INDUSTRIES = [
  'Healthcare & Medical',
  'Real Estate & Construction',
  'Textiles & Manufacturing',
  'Education & Training',
  'Hospitality & Travel',
  'Retail & E-commerce',
  'Professional Services',
  'Other',
]

export const AUDIT_CITIES = [
  { value: 'Madurai', market: 'IN' },
  { value: 'Thoothukudi', market: 'IN' },
  { value: 'Chennai', market: 'IN' },
  { value: 'Coimbatore', market: 'IN' },
  { value: 'Trichy', market: 'IN' },
  { value: 'Salem', market: 'IN' },
  { value: 'Tirunelveli', market: 'IN' },
  { value: 'Tiruppur', market: 'IN' },
  { value: 'Dindigul', market: 'IN' },
  { value: 'Sivakasi', market: 'IN' },
  { value: 'Other Tamil Nadu', market: 'IN' },
  { value: 'Other India', market: 'IN' },
  { value: 'Kuala Lumpur', market: 'MY' },
  { value: 'Rawang', market: 'MY' },
  { value: 'Shah Alam', market: 'MY' },
  { value: 'Petaling Jaya', market: 'MY' },
  { value: 'Other Selangor', market: 'MY' },
  { value: 'Other Malaysia', market: 'MY' },
  { value: 'Singapore', market: 'INTL' },
  { value: 'Dubai / UAE', market: 'INTL' },
  { value: 'Other country', market: 'INTL' },
]

/** Default city for a page's audit form: the city itself if listed, else the region's catch-all. */
export function auditCityFor(name, region) {
  if (name && AUDIT_CITIES.some((c) => c.value === name)) return name
  if (name === 'Selangor') return 'Other Selangor'
  if (name === 'Dubai') return 'Dubai / UAE'
  if (region === 'malaysia' || name === 'Malaysia') return 'Other Malaysia'
  if (region === 'india' || name === 'Tamil Nadu') return 'Other Tamil Nadu'
  return ''
}

/* The visitor's own monthly marketing budget (helps us prepare). These are not our fees. */
export const BUDGETS = {
  IN: ['Below ₹10,000 / month', '₹10,000 – ₹20,000 / month', '₹20,000 – ₹35,000 / month', '₹35,000 – ₹60,000 / month', '₹60,000+ / month'],
  MY: ['Below RM1,000 / month', 'RM1,000 – RM2,500 / month', 'RM2,500 – RM5,000 / month', 'RM5,000 – RM10,000 / month', 'RM10,000+ / month'],
  INTL: ['Below US$500 / month', 'US$500 – US$1,500 / month', 'US$1,500 – US$3,000 / month', 'US$3,000+ / month'],
}
export const NOT_SURE = 'Not sure yet'
