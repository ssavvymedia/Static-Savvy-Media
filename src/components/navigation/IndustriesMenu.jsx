import { Link } from 'react-router-dom'
import { industries } from '../../data/industries.js'
import { useActiveRoute } from '../../hooks/useActiveRoute.js'
import { cx } from '../../utils/helpers.js'

export default function IndustriesMenu() {
  const { isActive } = useActiveRoute()

  return (
    <div className="mega-menu industries-menu">
      <ul className="mega-menu__list">
        {industries.map((industry) => {
          const active = isActive(industry.path)
          return (
            <li key={industry.slug}>
              <Link
                to={industry.path}
                className={cx('mega-menu__link', active && 'is-active')}
                aria-current={active ? 'page' : undefined}
              >
                {industry.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
