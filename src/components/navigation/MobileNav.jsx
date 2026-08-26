import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { NAV_LINKS } from '../../data/navigation.js'
import { useActiveRoute } from '../../hooks/useActiveRoute.js'
import Button from '../common/Button.jsx'
import { cx } from '../../utils/helpers.js'

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

  return (
    <li>
      <button
        type="button"
        className={cx('mobile-nav__link', parentActive && 'is-active')}
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
      >
        <span>{link.label}</span>
        <span aria-hidden="true">{expanded ? '−' : '+'}</span>
      </button>
      {expanded && (
        <ul className="mobile-nav__sub">
          {link.menu.map((item) => {
            const subActive = isActive(item.path)
            return (
              <li key={item.slug}>
                <Link
                  to={item.path}
                  className={cx('mobile-nav__sublink', subActive && 'is-active')}
                  onClick={onNavigate}
                  aria-current={subActive ? 'page' : undefined}
                >
                  {item.name || item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </li>
  )
}

export default function MobileNav({ open = false, onClose, className = '' }) {
  return (
    <div className={cx('mobile-nav', className)} aria-hidden={!open}>
      <div className="mobile-nav__header">
        <Link to="/" className="site-header__logo" onClick={onClose}>
          <span className="site-header__logo-mark">SS</span>
          <span className="site-header__logo-text">Static Savvy Media</span>
        </Link>
        <button type="button" className="mobile-nav__close" onClick={onClose} aria-label="Close menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav aria-label="Mobile navigation">
        <ul>
          {NAV_LINKS.map((link) => (
            <MobileNavItem key={link.path} link={link} onNavigate={onClose} />
          ))}
        </ul>
      </nav>

      <div className="mobile-nav__cta">
        <Button to="/contact/" variant="primary" size="lg">
          Get Started
        </Button>
      </div>
    </div>
  )
}
