import Breadcrumbs from '../components/common/Breadcrumbs.jsx'
import HeroSection from '../components/hero/HeroSection.jsx'
import CTASection from '../components/sections/CTASection.jsx'

/**
 * T02 — HubTemplate.
 * Listing / hub pages (Services, Locations, Industries, Pricing, Case Studies, Blog).
 */
export default function HubTemplate({
  eyebrow = '',
  title = '',
  subtitle = '',
  grid = null,
  heroVisual = null,
  ctaTitle = '',
  ctaSubtitle = '',
  ctaLabel = '',
  ctaHref = '',
}) {
  return (
    <div className="hub-template">
      <Breadcrumbs />
      <HeroSection eyebrow={eyebrow} title={title} subtitle={subtitle}>
        {heroVisual}
      </HeroSection>
      {grid && <div className="hub-grid">{grid}</div>}
      <CTASection
        title={ctaTitle}
        subtitle={ctaSubtitle}
        primaryLabel={ctaLabel || undefined}
        primaryHref={ctaHref}
      />
    </div>
  )
}