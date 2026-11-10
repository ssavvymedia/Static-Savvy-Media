import Button from '../common/Button.jsx'

/* Shared CTA band: centred heading + buttons inside a padded panel (styles: components.css "CTA band"). */
export default function CTASection({
  eyebrow = '',
  title = '',
  subtitle = '',
  primaryLabel = 'Get Started',
  primaryTo = '/contact/',
  primaryHref = '',
  secondaryLabel = '',
  secondaryTo = '',
  secondaryHref = '',
}) {
  const ext = { target: '_blank', rel: 'noopener noreferrer' }
  return (
    <section className="section cta-section">
      <div className="container">
        <div className="cta-section__panel gradient-border">
          <div className="section-heading section-heading--center cta-section__head">
            {eyebrow && <span className="section-heading__eyebrow cta-section__eyebrow">{eyebrow}</span>}
            {title && <h2 className="section-heading__title cta-section__title">{title}</h2>}
            {subtitle && <p className="section-heading__subtitle cta-section__sub">{subtitle}</p>}
          </div>
          <div className="cta-section__actions">
            {primaryHref ? (
              <Button href={primaryHref} variant="primary" size="lg" className="cta-section__btn" {...ext}>{primaryLabel}</Button>
            ) : (
              <Button to={primaryTo} variant="primary" size="lg" className="cta-section__btn">{primaryLabel}</Button>
            )}
            {secondaryLabel &&
              (secondaryHref ? (
                <Button href={secondaryHref} variant="ghost" size="lg" className="cta-section__btn cta-section__btn--outline" {...ext}>{secondaryLabel}</Button>
              ) : (
                <Button to={secondaryTo} variant="ghost" size="lg" className="cta-section__btn cta-section__btn--outline">{secondaryLabel}</Button>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
