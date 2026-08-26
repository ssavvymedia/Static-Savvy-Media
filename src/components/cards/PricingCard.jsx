import { Link } from 'react-router-dom'
import { cx } from '../../utils/helpers.js'

export default function PricingCard({ plan, className = '' }) {
  return (
    <article className={cx('pricing-card glass-card', className)}>
      <h3 className="pricing-card__title">{plan?.name}</h3>
      <p className="pricing-card__price">{plan?.price}</p>
      <ul className="pricing-card__features">{plan?.features}</ul>
      <Link to={plan?.path} className="pricing-card__link">
        View pricing
      </Link>
    </article>
  )
}