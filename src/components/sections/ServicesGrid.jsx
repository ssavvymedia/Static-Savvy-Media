import ServiceCard from '../cards/ServiceCard.jsx'
import SectionHeading from '../common/SectionHeading.jsx'
import { ScrollReveal } from '../animations/ScrollReveal.jsx'
import { services } from '../../data/services.js'

export default function ServicesGrid({ eyebrow = '', title = '', subtitle = '', limit, items }) {
  const list =
    items && items.length > 0
      ? items
      : limit
        ? services.slice(0, limit)
        : services

  return (
    <section className="section services-section">
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="grid grid--3">
          {list.map((service, index) => (
            <ScrollReveal key={service.slug} delay={index * 80}>
              <ServiceCard service={service} number={index + 1} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}