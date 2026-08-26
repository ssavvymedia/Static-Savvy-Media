import Breadcrumbs from '../components/common/Breadcrumbs.jsx'
import HeroSection from '../components/hero/HeroSection.jsx'
import ProcessSection from '../components/sections/ProcessSection.jsx'
import RelatedServices from '../components/sections/RelatedServices.jsx'
import RelatedLocations from '../components/sections/RelatedLocations.jsx'
import FAQSection from '../components/sections/FAQSection.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { getServiceBySlug } from '../data/services.js'
import { getLocationBySlug } from '../data/locations.js'

/**
 * T04 — ServiceLocationTemplate.
 * Service × location pages (e.g. /services/seo/madurai/).
 */
export default function ServiceLocationTemplate({ serviceSlug, locationSlug }) {
  const service = getServiceBySlug(serviceSlug)
  const location = getLocationBySlug(locationSlug)

  return (
    <div className="service-location-template">
      <Breadcrumbs />
      <HeroSection eyebrow={location?.name} title={service && location ? `${service.name} in ${location.name}` : ''} />
      <ProcessSection eyebrow="Process" title="How It Works" />
      <RelatedServices currentSlug={serviceSlug} />
      <RelatedLocations currentSlug={locationSlug} />
      <FAQSection eyebrow="FAQ" title="Frequently Asked Questions" />
      <CTASection title="Ready to Start?" />
    </div>
  )
}