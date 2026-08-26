import StatCard from '../cards/StatCard.jsx'
import SectionHeading from '../common/SectionHeading.jsx'
import { ScrollReveal } from '../animations/ScrollReveal.jsx'

/**
 * StatsSection — animated number counters. Stats are supplied via props;
 * placeholder only until verified numbers are provided in the content phase.
 */
export default function StatsSection({ stats = [], eyebrow = '', title = '', subtitle = '' }) {
  const rendered = stats.length > 0 ? stats : [0, 1, 2, 3]

  return (
    <section className="section stats-section">
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="stats-section__grid grid grid--4">
          {rendered.map((stat, index) => (
            <ScrollReveal key={index} className="stats-section__item">
              <StatCard stat={typeof stat === 'number' ? {} : stat} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}