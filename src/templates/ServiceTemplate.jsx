import Breadcrumbs from '../components/common/Breadcrumbs.jsx'
import HeroSection from '../components/hero/HeroSection.jsx'
import ProcessSection from '../components/sections/ProcessSection.jsx'
import RelatedServices from '../components/sections/RelatedServices.jsx'
import FAQSection from '../components/sections/FAQSection.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { getServiceBySlug } from '../data/services.js'

/**
 * T03 — ServiceTemplate.
 * Individual service pages (e.g. /services/seo/).
 */
export default function ServiceTemplate({ slug }) {
  const service = getServiceBySlug(slug)

  return (
    <div className="service-template">
      <Breadcrumbs />
      <HeroSection eyebrow="Service" title={service?.name} />
      <ProcessSection eyebrow="Process" title="How It Works" />
      <RelatedServices currentSlug={slug} />
      <FAQSection eyebrow="FAQ" title="Frequently Asked Questions" />
      <CTASection title="Ready to Start?" />
    </div>
  )
}