/**
 * Case studies configuration.
 * Structural placeholders only. Real client names, metrics and results will be
 * added in a later phase — nothing is fabricated at this stage.
 */

export const caseStudies = [
  { slug: 'client-1', name: 'Client 1', path: '/case-studies/client-1/' },
  { slug: 'client-2', name: 'Client 2', path: '/case-studies/client-2/' },
  { slug: 'client-3', name: 'Client 3', path: '/case-studies/client-3/' },
  { slug: 'client-4', name: 'Client 4', path: '/case-studies/client-4/' },
]

export function getCaseStudyBySlug(slug) {
  return caseStudies.find((study) => study.slug === slug) || null
}
