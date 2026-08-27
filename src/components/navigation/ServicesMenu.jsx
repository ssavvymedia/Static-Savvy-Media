import { Link } from 'react-router-dom'
import { services } from '../../data/services.js'
import { useActiveRoute } from '../../hooks/useActiveRoute.js'
import { cx } from '../../utils/helpers.js'

export default function ServicesMenu() {
  const { isActive } = useActiveRoute()

  return (
    <div className="mega-menu">
      <ul className="mega-menu__list">
        {services.map((service, index) => {
          const active = isActive(service.path)
          const formattedIndex = String(index + 1).padStart(2, '0')
          return (
            <li key={service.slug}>
              <Link
                to={service.path}
                className={cx('mega-menu__link', active && 'is-active')}
                aria-current={active ? 'page' : undefined}
              >
                <span className="mega-menu__number">{formattedIndex}</span>
                <span className="mega-menu__title">{service.name}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
