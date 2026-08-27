import { Link } from 'react-router-dom'
import { industries } from '../../data/industries.js'
import { useActiveRoute } from '../../hooks/useActiveRoute.js'
import { cx } from '../../utils/helpers.js'

export default function IndustriesMenu() {
  const { isActive } = useActiveRoute()

  return (
    <div className="mega-menu industries-menu">
      <ul className="mega-menu__list">
        {industries.map((industry, index) => {
          const active = isActive(industry.path)
          const formattedIndex = String(index + 1).padStart(2, '0')
          return (
            <li key={industry.slug}>
              <Link
                to={industry.path}
                className={cx('mega-menu__link', active && 'is-active')}
                aria-current={active ? 'page' : undefined}
              >
                <span className="mega-menu__number">{formattedIndex}</span>
                <span className="mega-menu__title">{industry.name}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
