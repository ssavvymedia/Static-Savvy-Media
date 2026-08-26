import Breadcrumbs from '../components/common/Breadcrumbs.jsx'
import HeroSection from '../components/hero/HeroSection.jsx'
import StatsSection from '../components/sections/StatsSection.jsx'
import ProcessSection from '../components/sections/ProcessSection.jsx'
import CTASection from '../components/sections/CTASection.jsx'

/**
 * T10 — AboutTemplate.
 * About / Founder pages (e.g. /about/, /about/deepan-kanz/).
 * Copy is added in the content phase.
 */
export default function AboutTemplate({ eyebrow = '', title = '', subtitle = '' }) {
  return (
    <div className="about-template">
      <Breadcrumbs />
      <HeroSection eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <StatsSection />
      <ProcessSection eyebrow="Values" title="How We Work" />
      <CTASection title="Work With Us" />
    </div>
  )
}