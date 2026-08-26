import { FloatingElement } from '../animations/FloatingElement.jsx'

/**
 * FloatingIcons — decorative neon glyphs floating around the hero.
 * Placeholder positions only; refined in the visual design phase.
 */
export default function FloatingIcons() {
  const slots = [0, 1, 2, 3, 4]

  return (
    <div className="floating-icons" aria-hidden="true">
      {slots.map((slot) => (
        <FloatingElement key={slot} className={`floating-icons__item floating-icons__item--${slot}`}>
          <span className="floating-icons__dot" />
        </FloatingElement>
      ))}
    </div>
  )
}