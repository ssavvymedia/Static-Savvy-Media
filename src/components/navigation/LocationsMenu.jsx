import { Link } from 'react-router-dom'
import { locations } from '../../data/locations.js'
import { useActiveRoute } from '../../hooks/useActiveRoute.js'
import { cx } from '../../utils/helpers.js'

export default function LocationsMenu() {
  const { isActive } = useActiveRoute()

  return (
    <div className="mega-menu">
      <ul className="mega-menu__list">
        {locations.map((location, index) => {
          const active = isActive(location.path)
          const formattedIndex = String(index + 1).padStart(2, '0')
          return (
            <li key={location.slug}>
              <Link
                to={location.path}
                className={cx('mega-menu__link', active && 'is-active')}
                aria-current={active ? 'page' : undefined}
              >
                <span className="mega-menu__number">{formattedIndex}</span>
                <span className="mega-menu__title">{location.name}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
