import IndustryCard from '../cards/IndustryCard.jsx'
import SectionHeading from '../common/SectionHeading.jsx'
import { industries } from '../../data/industries.js'

export default function RelatedIndustries({ currentSlug }) {
  const related = industries.filter((industry) => industry.slug !== currentSlug).slice(0, 3)

  return (
    <section className="section related-section">
      <div className="container">
        <SectionHeading title="Related Industries" />
        <div className="grid grid--3">
          {related.map((industry) => (
            <IndustryCard key={industry.slug} industry={industry} />
          ))}
        </div>
      </div>
    </section>
  )
}