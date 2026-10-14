import { Link } from 'react-router-dom'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { MALAYSIA_OFFICE, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../../utils/constants.js'

/** Visible Malaysia office NAP. Reads the same constants as the LocalBusiness JSON-LD. */
export default function MalaysiaContactBlock({ heading = 'Contact Our Malaysia Office' }) {
  const o = MALAYSIA_OFFICE
  return (
    <section className="section">
      <div className="container">
        <div className="section-heading section-heading--left">
          <span className="section-heading__eyebrow">Malaysia Office</span>
          <h2 className="section-heading__title">{heading}</h2>
        </div>
        <div className="seo-mdu-local-card glass-card">
          <h3 className="seo-mdu-local-card__title">{o.name}</h3>
          <p className="seo-mdu-local-card__text">
            {o.streetAddress}, {o.postalCode} {o.addressLocality}, {o.addressRegion} ({o.landmark})
          </p>
          <p className="seo-mdu-local-card__text">
            Call: <a href={o.phoneHref}>{o.phoneDisplay}</a> · WhatsApp:{' '}
            <a href={buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)} target="_blank" rel="noopener noreferrer">
              {o.whatsappDisplay}
            </a>
          </p>
          <p className="seo-mdu-local-card__text">
            Hours: {o.hoursDisplay} · {o.hoursNote}
          </p>
          <Link to="/locations/malaysia/" className="seo-mdu-local-card__link">
            About our Malaysia office
          </Link>
        </div>
      </div>
    </section>
  )
}
