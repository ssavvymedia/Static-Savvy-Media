import { Link } from 'react-router-dom'
import { locations } from '../../data/locations.js'
import { useActiveRoute } from '../../hooks/useActiveRoute.js'
import { cx } from '../../utils/helpers.js'

export default function LocationsMenu() {
  const { isActive } = useActiveRoute()

  return (
    <div className="mega-menu">
      <ul className="mega-menu__list">
        {locations.map((location) => {
          const active = isActive(location.path)
          return (
            <li key={location.slug}>
              <Link
                to={location.path}
                className={cx('mega-menu__link', active && 'is-active')}
                aria-current={active ? 'page' : undefined}
              >
                {location.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
