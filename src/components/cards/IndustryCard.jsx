import { Link } from 'react-router-dom'
import { cx } from '../../utils/helpers.js'

export default function IndustryCard({ industry, className = '' }) {
  return (
    <article className={cx('industry-card glass-card', className)}>
      <h3 className="industry-card__title">{industry?.name}</h3>
      <p className="industry-card__text">{industry?.summary}</p>
      <Link to={industry?.path} className="industry-card__link">
        Explore
      </Link>
    </article>
  )
}