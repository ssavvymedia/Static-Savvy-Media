import Breadcrumbs from '../components/common/Breadcrumbs.jsx'
import HeroSection from '../components/hero/HeroSection.jsx'
import CaseStudyResults from '../components/sections/CaseStudyResults.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { getCaseStudyBySlug } from '../data/caseStudies.js'

/**
 * T08 — CaseStudyTemplate.
 * Individual case study pages (e.g. /case-studies/client-1/).
 * Verified client names, metrics and results are added in the content phase.
 */
export default function CaseStudyTemplate({ slug }) {
  const study = getCaseStudyBySlug(slug)

  return (
    <div className="case-study-template">
      <Breadcrumbs />
      <HeroSection eyebrow="Case Study" title={study?.name} />
      <CaseStudyResults eyebrow="Results" title="Verified Outcomes" />
      <CTASection title="Want Results Like This?" />
    </div>
  )
}