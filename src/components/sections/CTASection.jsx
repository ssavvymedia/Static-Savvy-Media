import Button from '../common/Button.jsx'
import SectionHeading from '../common/SectionHeading.jsx'

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
  return (
    <section className="section cta-section">
      <div className="container">
        <div className="cta-section__panel glass-card gradient-border">
          <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
          <div className="hero__actions">
            {primaryHref ? (
              <Button
                href={primaryHref}
                variant="primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                {primaryLabel}
              </Button>
            ) : (
              <Button to={primaryTo} variant="primary" size="lg">
                {primaryLabel}
              </Button>
            )}
            {secondaryLabel &&
              (secondaryHref ? (
                <Button
                  href={secondaryHref}
                  variant="ghost"
                  size="lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {secondaryLabel}
                </Button>
              ) : (
                <Button to={secondaryTo} variant="ghost" size="lg">
                  {secondaryLabel}
                </Button>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}