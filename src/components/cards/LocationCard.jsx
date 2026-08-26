import { Link } from 'react-router-dom'
import { cx } from '../../utils/helpers.js'

export default function LocationCard({ location, className = '' }) {
  return (
    <article className={cx('location-card glass-card', className)}>
      <h3 className="location-card__title">{location?.name}</h3>
      <p className="location-card__text">{location?.summary}</p>
      <Link to={location?.path} className="location-card__link">
        View services
      </Link>
    </article>
  )
}