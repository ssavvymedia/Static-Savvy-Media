import { Link } from 'react-router-dom'
import { indiaPricingPlans, malaysiaPricingPlans } from '../../data/pricing.js'
import { useActiveRoute } from '../../hooks/useActiveRoute.js'
import { cx } from '../../utils/helpers.js'

export default function PricingMenu() {
  const { isActive } = useActiveRoute()

  return (
    <div className="mega-menu mega-menu--pricing">
      <div className="mega-menu__columns" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <Link
            to="/pricing/india/"
            className={cx('mega-menu__category-heading', isActive('/pricing/india/') && 'is-active')}
            style={{ fontWeight: 'bold', fontSize: '1.05rem', color: 'var(--color-primary-400)', display: 'block', marginBottom: '0.75rem' }}
          >
            🇮🇳 India Pricing (INR)
          </Link>
          <ul className="mega-menu__list">
            {indiaPricingPlans.map((plan, index) => {
              const active = isActive(plan.path)
              const formattedIndex = String(index + 1).padStart(2, '0')
              return (
                <li key={plan.path}>
                  <Link
                    to={plan.path}
                    className={cx('mega-menu__link', active && 'is-active')}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span className="mega-menu__number">{formattedIndex}</span>
                    <span className="mega-menu__title">{plan.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div>
          <Link
            to="/pricing/malaysia/"
            className={cx('mega-menu__category-heading', isActive('/pricing/malaysia/') && 'is-active')}
            style={{ fontWeight: 'bold', fontSize: '1.05rem', color: 'var(--color-primary-400)', display: 'block', marginBottom: '0.75rem' }}
          >
            🇲🇾 Malaysia Pricing (MYR)
          </Link>
          <ul className="mega-menu__list">
            {malaysiaPricingPlans.map((plan, index) => {
              const active = isActive(plan.path)
              const formattedIndex = String(index + 1).padStart(2, '0')
              return (
                <li key={plan.path}>
                  <Link
                    to={plan.path}
                    className={cx('mega-menu__link', active && 'is-active')}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span className="mega-menu__number">{formattedIndex}</span>
                    <span className="mega-menu__title">{plan.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
