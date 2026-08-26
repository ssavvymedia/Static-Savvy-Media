import TestimonialCard from '../cards/TestimonialCard.jsx'
import SectionHeading from '../common/SectionHeading.jsx'
import { ScrollReveal } from '../animations/ScrollReveal.jsx'

/**
 * TestimonialsSection — structural shell. No fake testimonials are rendered;
 * verified reviews are added in the content phase.
 */
export default function TestimonialsSection({ testimonials = [], eyebrow = '', title = '', subtitle = '' }) {
  const items = testimonials?.length > 0 ? testimonials : [0, 1, 2]

  return (
    <section className="section testimonials-section">
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="grid grid--3">
          {items.map((item, index) => (
            <ScrollReveal key={index} delay={index * 80}>
              <TestimonialCard testimonial={typeof item === 'number' ? {} : item} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}