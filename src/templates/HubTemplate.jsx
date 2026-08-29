import Breadcrumbs from '../components/common/Breadcrumbs.jsx'
import HeroSection from '../components/hero/HeroSection.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import ContactFormSection from '../components/sections/ContactFormSection.jsx'

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
      <HeroSection
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        layout={heroVisual ? 'two-column' : 'default'}
      >
        {heroVisual}
      </HeroSection>
      {grid && <div className="hub-grid">{grid}</div>}
      <CTASection
        title={ctaTitle}
        subtitle={ctaSubtitle}
        primaryLabel={ctaLabel || undefined}
        primaryHref={ctaHref}
      />
      <ContactFormSection />
    </div>
  )
}