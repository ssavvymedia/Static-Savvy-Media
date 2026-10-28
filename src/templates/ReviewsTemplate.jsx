import Breadcrumbs from '../components/common/Breadcrumbs.jsx'
import HeroSection from '../components/hero/HeroSection.jsx'
import TestimonialsSection from '../components/sections/TestimonialsSection.jsx'
import CTASection from '../components/sections/CTASection.jsx'

/**
 * T11 — ReviewsTemplate.
 * Reviews page. Verified reviews are added in the content phase.
 */
export default function ReviewsTemplate() {
  return (
    <div className="reviews-template">
      <Breadcrumbs />
      <HeroSection eyebrow="Reviews" title="Client Reviews" />
      <TestimonialsSection title="Verified Google Reviews" count={7} />
      <CTASection title="Join Our Happy Clients" />
    </div>
  )
}