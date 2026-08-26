import { Link } from 'react-router-dom'
import { pricingPlans } from '../../data/pricing.js'
import { useActiveRoute } from '../../hooks/useActiveRoute.js'
import { cx } from '../../utils/helpers.js'

export default function PricingMenu() {
  const { isActive } = useActiveRoute()

  return (
    <div className="mega-menu">
      <ul className="mega-menu__list">
        {pricingPlans.map((plan) => {
          const active = isActive(plan.path)
          return (
            <li key={plan.slug}>
              <Link
                to={plan.path}
                className={cx('mega-menu__link', active && 'is-active')}
                aria-current={active ? 'page' : undefined}
              >
                {plan.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
