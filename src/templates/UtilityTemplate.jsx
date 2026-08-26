import Breadcrumbs from '../components/common/Breadcrumbs.jsx'
import HeroSection from '../components/hero/HeroSection.jsx'
import CTASection from '../components/sections/CTASection.jsx'

/**
 * T12 — UtilityTemplate.
 * Core/utility pages (Contact, FAQ, Privacy, Terms, Sitemap).
 * Page-specific content is passed as children from the page component.
 */
export default function UtilityTemplate({
  eyebrow = '',
  title = '',
  subtitle = '',
  children = null,
  showCTA = false,
}) {
  return (
    <div className="utility-template">
      <Breadcrumbs />
      <HeroSection eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <div className="container section utility-content">{children}</div>
      {showCTA && <CTASection title="Get in Touch" />}
    </div>
  )
}