import { Link } from 'react-router-dom'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../../utils/constants.js'

/** Contact card for Malaysian pages. No Malaysian address or number on the site (owner, 24 Nov 2026):
 * Malaysian clients are served from the Madurai HQ on the one WhatsApp line. */
export default function MalaysiaContactBlock({ heading = 'Contact Our Team' }) {
  return (
    <section className="section">
      <div className="container">
        <div className="section-heading section-heading--left">
          <span className="section-heading__eyebrow">Contact</span>
          <h2 className="section-heading__title">{heading}</h2>
        </div>
        <div className="seo-mdu-local-card glass-card">
          <h3 className="seo-mdu-local-card__title">Static Savvy Media</h3>
          <p className="seo-mdu-local-card__text">
            We serve businesses across Malaysia from our head office in Madurai, India, over WhatsApp and video calls.
          </p>
          <p className="seo-mdu-local-card__text">
            <a href={buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)} target="_blank" rel="noopener noreferrer">
              Chat on WhatsApp
            </a>
          </p>
          <Link to="/locations/malaysia/" className="seo-mdu-local-card__link">
            Digital marketing in Malaysia
          </Link>
        </div>
      </div>
    </section>
  )
}
