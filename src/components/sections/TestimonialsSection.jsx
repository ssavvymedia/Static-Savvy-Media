import TestimonialCard from '../cards/TestimonialCard.jsx'
import SectionHeading from '../common/SectionHeading.jsx'
import GoogleReviewsSection from './GoogleReviewsSection.jsx'
import { ScrollReveal } from '../animations/ScrollReveal.jsx'
import { pickReviews } from '../../data/googleReviews.js'

/**
 * TestimonialsSection. With no testimonials passed it shows real, verbatim Google reviews
 * (src/data/googleReviews.js). Never pass invented testimonials.
 */
export default function TestimonialsSection({ testimonials = [], eyebrow = '', title = '', subtitle = '', offset = 0, count = 3 }) {
  if (!testimonials?.length) {
    return (
      <GoogleReviewsSection
        reviews={pickReviews(offset, count)}
        eyebrow={eyebrow || 'Google reviews'}
        title={title || 'What clients say on Google'}
        subtitle={subtitle}
      />
    )
  }

  return (
    <section className="section testimonials-section">
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="grid grid--3">
          {testimonials.map((item, index) => (
            <ScrollReveal key={index} delay={index * 80}>
              <TestimonialCard testimonial={item} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
