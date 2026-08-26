/**
 * TestimonialCard — structural placeholder. NO fake testimonials are added.
 * Real verified reviews are inserted in the content phase.
 */
export default function TestimonialCard({ testimonial = {} }) {
  return (
    <figure className="testimonial-card glass-card">
      <blockquote>
        <p className="testimonial-card__quote">{testimonial?.quote}</p>
      </blockquote>
      <figcaption className="testimonial-card__meta">
        <strong className="testimonial-card__name">{testimonial?.name}</strong>
        <span className="testimonial-card__role">{testimonial?.role}</span>
      </figcaption>
    </figure>
  )
}