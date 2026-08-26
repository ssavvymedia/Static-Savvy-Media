import Breadcrumbs from '../components/common/Breadcrumbs.jsx'
import HeroSection from '../components/hero/HeroSection.jsx'
import ServicesGrid from '../components/sections/ServicesGrid.jsx'
import IndustriesGrid from '../components/sections/IndustriesGrid.jsx'
import RelatedLocations from '../components/sections/RelatedLocations.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { getLocationBySlug } from '../data/locations.js'

/**
 * T05 — LocationTemplate.
 * Location pages (e.g. /locations/madurai/).
 */
export default function LocationTemplate({ slug }) {
  const location = getLocationBySlug(slug)

  return (
    <div className="location-template">
      <Breadcrumbs />
      <HeroSection eyebrow="Location" title={location?.name} />
      <ServicesGrid eyebrow="Services" title="Available Here" />
      <IndustriesGrid eyebrow="Industries" title="Local Industries" />
      <RelatedLocations currentSlug={slug} />
      <CTASection title="Ready to Grow Locally?" />
    </div>
  )
}