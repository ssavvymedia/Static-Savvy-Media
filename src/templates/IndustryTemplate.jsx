import Breadcrumbs from '../components/common/Breadcrumbs.jsx'
import HeroSection from '../components/hero/HeroSection.jsx'
import ServicesGrid from '../components/sections/ServicesGrid.jsx'
import RelatedIndustries from '../components/sections/RelatedIndustries.jsx'
import FAQSection from '../components/sections/FAQSection.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { getIndustryBySlug } from '../data/industries.js'

/**
 * T06 — IndustryTemplate.
 * Industry pages (e.g. /industries/retail-ecommerce/).
 */
export default function IndustryTemplate({ slug }) {
  const industry = getIndustryBySlug(slug)

  return (
    <div className="industry-template">
      <Breadcrumbs />
      <HeroSection eyebrow="Industry" title={industry?.name} />
      <ServicesGrid eyebrow="Services" title="Relevant Services" />
      <RelatedIndustries currentSlug={slug} />
      <FAQSection eyebrow="FAQ" title="Frequently Asked Questions" />
      <CTASection title="Ready to Grow?" />
    </div>
  )
}