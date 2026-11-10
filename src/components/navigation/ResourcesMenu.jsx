import { Link } from 'react-router-dom'
import { RESOURCE_LINKS } from '../../data/navigation.js'
import { useActiveRoute } from '../../hooks/useActiveRoute.js'
import { cx } from '../../utils/helpers.js'

/* Header "Resources" dropdown (always in the markup; CSS toggles visibility). */
export default function ResourcesMenu() {
  const { isActive } = useActiveRoute()
  return (
    <div className="mega-menu mega-menu--compact">
      <ul className="mega-menu__list">
        {RESOURCE_LINKS.map((item) => {
          const active = isActive(item.path)
          return (
            <li key={item.slug}>
              <Link to={item.path} className={cx('mega-menu__link', active && 'is-active')} aria-current={active ? 'page' : undefined}>
                <span className="mega-menu__title">{item.name}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
