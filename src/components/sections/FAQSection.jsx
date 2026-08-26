import SectionHeading from '../common/SectionHeading.jsx'
import { ScrollReveal } from '../animations/ScrollReveal.jsx'

/**
 * FAQSection — FAQ accordion shell. FAQ copy comes from the content phase.
 */
export default function FAQSection({ faqs = [], eyebrow = '', title = '', subtitle = '' }) {
  const items = faqs.length > 0 ? faqs : [0, 1, 2, 3]

  return (
    <section className="section faq-section">
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="faq-section__list">
          {items.map((faq, index) => {
            const question = typeof faq === 'number' ? '' : faq?.question
            const answer = typeof faq === 'number' ? '' : faq?.answer

            return (
              <ScrollReveal key={index} className="faq-section__item">
                <details className="faq-section__details glass-card">
                  <summary className="faq-section__question">{question}</summary>
                  <p className="faq-section__answer">{answer}</p>
                </details>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}