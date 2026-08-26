import { Link } from 'react-router-dom'
import { cx } from '../../utils/helpers.js'

export default function CaseStudyCard({ study, className = '' }) {
  return (
    <article className={cx('case-study-card glass-card', className)}>
      <h3 className="case-study-card__title">{study?.name}</h3>
      <p className="case-study-card__text">{study?.summary}</p>
      <Link to={study?.path} className="case-study-card__link">
        View case study
      </Link>
    </article>
  )
}