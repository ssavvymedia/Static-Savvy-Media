import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { NAV_LINKS } from '../../data/navigation.js'
import { useActiveRoute } from '../../hooks/useActiveRoute.js'
import Button from '../common/Button.jsx'
import { cx } from '../../utils/helpers.js'
import logoImg from '../../assets/images/logo/SSMLOGO.webp'

const MOBILE_NAV_LINKS = NAV_LINKS

function MobileNavItem({ link, onNavigate }) {
  const { isActive } = useActiveRoute()
  const parentActive = isActive(link.path)
  const [expanded, setExpanded] = useState(parentActive)

  useEffect(() => {
    if (parentActive) setExpanded(true)
  }, [parentActive])

  if (!link.menu) {
    return (
      <li>
        <Link
          to={link.path}
          className={cx('mobile-nav__link', parentActive && 'is-active')}
          onClick={onNavigate}
          aria-current={parentActive ? 'page' : undefined}
        >
          {link.label}
        </Link>
      </li>
    )
  }

  const isGrouped = Array.isArray(link.menu) && link.menu.length > 0 && link.menu[0].items

  return (
    <li className="mobile-nav__item">
      <div className={cx('mobile-nav__row', parentActive && 'is-active')}>
        <Link
          to={link.path}
          className={cx('mobile-nav__link', 'mobile-nav__link--title', parentActive && 'is-active')}
          onClick={onNavigate}
          aria-current={parentActive ? 'page' : undefined}
        >
          {link.label}
        </Link>
        <button
          type="button"
          className={cx('mobile-nav__toggle', expanded && 'is-expanded')}
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-label={`Toggle ${link.label} submenu`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>

      {expanded && (
        <div className="mobile-nav__sub-container">
          {isGrouped ? (
            link.menu.map((section) => (
              <div key={section.path || section.title} className="mobile-nav__section">
                <Link
                  to={section.path}
                  className={cx('mobile-nav__section-title', isActive(section.path) && 'is-active')}
                  onClick={onNavigate}
                >
                  {section.title}
                </Link>
                <ul className="mobile-nav__sub">
                  {section.items.map((item, index) => {
                    const subActive = isActive(item.path)
                    const formattedIndex = String(index + 1).padStart(2, '0')
                    return (
                      <li key={item.path || item.slug}>
                        <Link
                          to={item.path}
                          className={cx('mobile-nav__sublink', subActive && 'is-active')}
                          onClick={onNavigate}
                          aria-current={subActive ? 'page' : undefined}
                        >
                          <span className="mobile-nav__number">{formattedIndex}</span>
                          <span className="mobile-nav__title">{item.name || item.label}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))
          ) : (
            <ul className="mobile-nav__sub">
              {link.menu.map((item, index) => {
                const subActive = isActive(item.path)
                const formattedIndex = String(index + 1).padStart(2, '0')
                return (
                  <li key={item.path || item.slug}>
                    <Link
                      to={item.path}
                      className={cx('mobile-nav__sublink', subActive && 'is-active')}
                      onClick={onNavigate}
                      aria-current={subActive ? 'page' : undefined}
                    >
                      <span className="mobile-nav__number">{formattedIndex}</span>
                      <span className="mobile-nav__title">{item.name || item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      )}
    </li>
  )
}

export default function MobileNav({ open = false, onClose, className = '' }) {
  return (
    <>
      <div
        className={cx('mobile-nav-backdrop', open && 'is-open')}
        onClick={onClose}
        aria-hidden="true"
      />
      <div className={cx('mobile-nav', open && 'is-open', className)} aria-hidden={!open}>
        <div className="mobile-nav__header">
          <Link to="/" className="site-header__logo" onClick={onClose} aria-label="Static Savvy Media, home">
            <img src={logoImg} width={480} height={320} alt="Static Savvy Media" className="site-header__logo-img" />
          </Link>
          <button type="button" className="mobile-nav__close" onClick={onClose} aria-label="Close menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile navigation">
          <ul>
            {MOBILE_NAV_LINKS.map((link) => (
              <MobileNavItem key={link.path} link={link} onNavigate={onClose} />
            ))}
          </ul>
        </nav>

        <div className="mobile-nav__cta">
          <Button to="/contact/" variant="primary" size="lg" onClick={onClose}>
            Get Started
          </Button>
        </div>
      </div>
    </>
  )
}
