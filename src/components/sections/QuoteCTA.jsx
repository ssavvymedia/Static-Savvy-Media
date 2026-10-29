import Button from '../common/Button.jsx'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import '../../styles/quote-cta.css'

const INDIA_WA = '+91 99440 40345'
const MALAYSIA_WA = '+60 12-453 7030'

/**
 * "Get a custom quote" block. Replaces every public price card (owner's instruction, 29 Oct 2026):
 * prices are shared only at proposal time, never on public pages. WhatsApp +91 99440 40345, or
 * +60 12-453 7030 on Malaysia pages (region="malaysia"), plus the enquiry form.
 */
export default function QuoteCTA({
  region = 'india',
  eyebrow = 'Custom quote',
  title = 'Get a custom quote',
  text = 'Every business needs a different mix of work, so we quote after a free review of your website, Google Business Profile and competitors. You get a written plan with scope, milestones and a monthly fee before you commit.',
  points = ['Free review before any quote', 'No lock-in contracts', 'Reporting from your own Google accounts'],
  service = 'digital marketing',
  formHref = '#enquiry',
  className = '',
}) {
  const wa = region === 'malaysia' ? MALAYSIA_WA : INDIA_WA
  const waHref = buildWhatsAppLink(wa, `Hi Static Savvy Media, I'd like a custom quote for ${service}.`)
  const formIsAnchor = formHref.startsWith('#')
  return (
    <section className={`section quote-cta ${className}`.trim()} aria-label={title}>
      <div className="container">
        <div className="quote-cta__panel glass-card gradient-border">
          <div className="quote-cta__copy">
            <p className="quote-cta__eyebrow">{eyebrow}</p>
            <h2 className="quote-cta__title">{title}</h2>
            <p className="quote-cta__text">{text}</p>
            {points?.length ? (
              <ul className="quote-cta__points">
                {points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            ) : null}
          </div>
          <div className="quote-cta__actions">
            <Button href={waHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">
              {`WhatsApp ${wa}`}
            </Button>
            {formIsAnchor ? (
              <Button href={formHref} variant="ghost" size="lg">Send an enquiry</Button>
            ) : (
              <Button to={formHref} variant="ghost" size="lg">Send an enquiry</Button>
            )}
            <p className="quote-cta__note">We usually reply within one working day.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
