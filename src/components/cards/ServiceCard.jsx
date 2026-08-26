import { Link } from 'react-router-dom'
import { cx } from '../../utils/helpers.js'

export default function ServiceCard({ service, number, className = '' }) {
  return (
    <article className={cx('service-card glass-card', className)}>
      <div className="service-card__top">
        <span className="service-card__badge" aria-hidden="true">
          {service?.monogram || 'SS'}
        </span>
        {number != null && (
          <span className="service-card__number" aria-hidden="true">
            0{number}
          </span>
        )}
      </div>

      {service?.category && (
        <span className="chip service-card__category">{service.category}</span>
      )}

      <h3 className="service-card__title">{service?.name}</h3>
      <p className="service-card__text">{service?.summary}</p>

      <Link to={service?.path} className="service-card__link" aria-label={`Learn more about ${service?.name}`}>
        Learn More
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </Link>
    </article>
  )
}