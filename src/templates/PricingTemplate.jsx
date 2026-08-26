import Breadcrumbs from '../components/common/Breadcrumbs.jsx'
import HeroSection from '../components/hero/HeroSection.jsx'
import PricingCard from '../components/cards/PricingCard.jsx'
import FAQSection from '../components/sections/FAQSection.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { getPricingPlanBySlug, pricingPlans } from '../data/pricing.js'

/**
 * T07 — PricingTemplate.
 * Pricing package pages (e.g. /pricing/seo/).
 * Actual packages, amounts and features are added in the content phase.
 */
export default function PricingTemplate({ slug }) {
  const plan = getPricingPlanBySlug(slug)
  const related = pricingPlans.filter((item) => item.slug !== slug).slice(0, 3)

  return (
    <div className="pricing-template">
      <Breadcrumbs />
      <HeroSection eyebrow="Pricing" title={plan?.name} />
      <div className="container section pricing-grid">
        {related.map((item) => (
          <PricingCard key={item.slug} plan={item} />
        ))}
      </div>
      <FAQSection eyebrow="FAQ" title="Pricing Questions" />
      <CTASection title="Get a Custom Proposal" />
    </div>
  )
}