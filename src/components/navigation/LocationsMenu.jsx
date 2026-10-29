import { Link } from 'react-router-dom'
import { locationGroups } from '../../data/locations.js'
import { useActiveRoute } from '../../hooks/useActiveRoute.js'
import { cx } from '../../utils/helpers.js'

/* Header "Locations" dropdown: every location page grouped by market (always in the markup, so the
 * links are in the prerendered HTML; CSS only toggles visibility). */
export default function LocationsMenu() {
  const { isActive } = useActiveRoute()

  return (
    <div className="mega-menu mega-menu--locations">
      <div className="mega-menu__columns mega-menu__columns--locations">
        {locationGroups.map((group) => (
          <div key={group.title} className="mega-menu__group">
            <Link
              to={group.path}
              className={cx('mega-menu__category-heading', isActive(group.path) && 'is-active')}
            >
              {group.title}
            </Link>
            <ul className="mega-menu__list">
              {group.items.map((item) => {
                const active = isActive(item.path)
                return (
                  <li key={item.slug}>
                    <Link
                      to={item.path}
                      className={cx('mega-menu__link', active && 'is-active')}
                      aria-current={active ? 'page' : undefined}
                    >
                      <span className="mega-menu__title">{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
      <Link to="/locations/" className="mega-menu__all-link">All locations →</Link>
    </div>
  )
}
