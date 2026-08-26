import LocationCard from '../cards/LocationCard.jsx'
import SectionHeading from '../common/SectionHeading.jsx'
import { locations } from '../../data/locations.js'

export default function RelatedLocations({ currentSlug }) {
  const related = locations.filter((location) => location.slug !== currentSlug)

  return (
    <section className="section related-section">
      <div className="container">
        <SectionHeading title="Other Locations" />
        <div className="grid grid--3">
          {related.map((location) => (
            <LocationCard key={location.slug} location={location} />
          ))}
        </div>
      </div>
    </section>
  )
}