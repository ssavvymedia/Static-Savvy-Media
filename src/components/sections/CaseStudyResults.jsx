import SectionHeading from '../common/SectionHeading.jsx'

/**
 * CaseStudyResults — metric slots. NO fabricated numbers are rendered;
 * verified client results are added in the content phase.
 */
export default function CaseStudyResults({ metrics = [], eyebrow = '', title = '', subtitle = '' }) {
  const slots = metrics.length > 0 ? metrics : [0, 1, 2, 3]

  return (
    <section className="section case-study-results">
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="grid grid--4">
          {slots.map((metric, index) => {
            const value = typeof metric === 'number' ? '' : metric?.value
            const label = typeof metric === 'number' ? '' : metric?.label

            return (
              <div key={index} className="case-study-results__item glass-card">
                <strong className="case-study-results__value">{value}</strong>
                <span className="case-study-results__label">{label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}