import IndustryCard from '../cards/IndustryCard.jsx'
import SectionHeading from '../common/SectionHeading.jsx'
import { ScrollReveal } from '../animations/ScrollReveal.jsx'
import { industries } from '../../data/industries.js'

export default function IndustriesGrid({ eyebrow = '', title = '', subtitle = '', limit }) {
  const items = limit ? industries.slice(0, limit) : industries

  return (
    <section className="section industries-section">
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="grid grid--4">
          {items.map((industry, index) => (
            <ScrollReveal key={industry.slug} delay={index * 60}>
              <IndustryCard industry={industry} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}