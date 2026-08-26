import ServiceCard from '../cards/ServiceCard.jsx'
import SectionHeading from '../common/SectionHeading.jsx'
import { services } from '../../data/services.js'

export default function RelatedServices({ currentSlug }) {
  const related = services.filter((service) => service.slug !== currentSlug).slice(0, 3)

  return (
    <section className="section related-section">
      <div className="container">
        <SectionHeading title="Related Services" />
        <div className="grid grid--3">
          {related.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}