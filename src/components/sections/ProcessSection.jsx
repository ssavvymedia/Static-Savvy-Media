import SectionHeading from '../common/SectionHeading.jsx'
import { ScrollReveal } from '../animations/ScrollReveal.jsx'

/**
 * ProcessSection — timeline / process steps.
 * Accepts custom steps via the `steps` prop, or falls back to placeholder slots.
 */
export default function ProcessSection({ eyebrow = '', title = '', subtitle = '', steps = [] }) {
  const items =
    steps.length > 0
      ? steps
      : [0, 1, 2, 3].map((n) => ({ number: `0${n + 1}`, title: '', text: '' }))

  return (
    <section className="section process-section">
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="process-section__timeline">
          {items.map((step, index) => (
            <ScrollReveal key={index} className="process-section__item" delay={index * 80}>
              <span className="process-section__number">{step.number}</span>
              <div className="process-section__content">
                <h3 className="process-section__title">{step.title}</h3>
                <p className="process-section__text">{step.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}