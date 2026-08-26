import LocationCard from '../cards/LocationCard.jsx'
import SectionHeading from '../common/SectionHeading.jsx'
import { ScrollReveal } from '../animations/ScrollReveal.jsx'
import { locations } from '../../data/locations.js'

export default function LocationsGrid({ eyebrow = '', title = '', subtitle = '', limit, items }) {
  const list =
    items && items.length > 0
      ? items
      : limit
        ? locations.slice(0, limit)
        : locations

  return (
    <section className="section locations-section">
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="grid grid--3">
          {list.map((location, index) => (
            <ScrollReveal key={location.slug} delay={index * 80}>
              <LocationCard location={location} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}