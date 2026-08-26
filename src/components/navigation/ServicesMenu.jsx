import { Link } from 'react-router-dom'
import { services } from '../../data/services.js'
import { useActiveRoute } from '../../hooks/useActiveRoute.js'
import { cx } from '../../utils/helpers.js'

export default function ServicesMenu() {
  const { isActive } = useActiveRoute()

  return (
    <div className="mega-menu">
      <ul className="mega-menu__list">
        {services.map((service) => {
          const active = isActive(service.path)
          return (
            <li key={service.slug}>
              <Link
                to={service.path}
                className={cx('mega-menu__link', active && 'is-active')}
                aria-current={active ? 'page' : undefined}
              >
                {service.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
