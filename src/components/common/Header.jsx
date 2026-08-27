import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button.jsx'
import DesktopNav from '../navigation/DesktopNav.jsx'
import MobileNav from '../navigation/MobileNav.jsx'
import { cx } from '../../utils/helpers.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER } from '../../utils/constants.js'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const whatsappHref = buildWhatsAppLink(WHATSAPP_NUMBER)

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-header__logo" aria-label="Static Savvy Media, home">
          <span className="site-header__logo-mark">SS</span>
          <span className="site-header__logo-text">Static Savvy Media</span>
        </Link>

        <DesktopNav />

        <div className="site-header__actions">
          <div
            className="site-header__whatsapp"
            onClick={(e) => {
              if (!e.target.closest('.site-header__whatsapp-phone')) {
                window.open(whatsappHref, '_blank', 'noopener,noreferrer')
              }
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                if (!e.target.closest('.site-header__whatsapp-phone')) {
                  window.open(whatsappHref, '_blank', 'noopener,noreferrer')
                }
              }
            }}
            aria-label="Chat on WhatsApp"
          >
            <span className="site-header__whatsapp-icon">
              <svg width="100%" height="100%" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="#ffffff" d="M45 0C20.1 0 0 20.1 0 45C0 53.6 2.4 61.6 6.6 68.5L1.5 87.2L20.8 82.3C27.6 86.4 35.5 88.7 44.1 88.7C69 88.7 89.1 68.6 89.1 43.7C89.1 19.6 69.1 0 45 0Z"/>
                <path fill="#25d366" d="M45 6.7C23.9 6.7 6.7 23.9 6.7 45C6.7 52.3 8.7 59.1 12.2 65L8.5 78.5L22.6 74.9C28.2 78.3 34.7 80.2 41.8 80.2C62.9 80.2 80.1 63 80.1 41.9C80.1 20.8 62.9 6.7 41.9 6.7H45Z"/>
                <path fill="#ffffff" d="M59.3 48.5C58.4 48 53.3 45.5 52.3 45.2C51.4 44.8 50.7 44.7 50.1 45.7C49.5 46.7 47.7 48.8 47.2 49.4C46.7 50 46.1 50.1 45.2 49.6C44.3 49.1 41.3 48.1 37.8 45C35.1 42.6 33.3 39.6 32.7 38.7C32.1 37.7 32.7 37.2 33.2 36.7C33.6 36.3 34.1 35.6 34.6 35C35.1 34.4 35.3 34 35.6 33.4C35.9 32.8 35.8 32.3 35.6 31.8C35.4 31.3 33.6 26.9 32.8 25.1C32.1 23.3 31.3 23.5 30.7 23.5C30.2 23.5 29.5 23.5 28.9 23.5C28.3 23.5 27.2 23.7 26.3 24.7C25.4 25.7 22.8 28.2 22.8 33.2C22.8 38.2 26.4 43.1 26.9 43.8C27.4 44.5 34.1 54.8 44.3 59.2C46.7 60.2 48.6 60.8 50 61.3C52.4 62.1 54.6 62 56.3 61.7C58.2 61.4 62.1 59.3 62.9 57C63.7 54.7 63.7 52.7 63.5 52.3C63.3 51.9 62.7 51.7 61.8 51.2L59.3 48.5Z"/>
              </svg>
            </span>
            <div className="site-header__whatsapp-content">
              <span className="site-header__whatsapp-label">WhatsApp Now!</span>
              <a
                href="tel:+919944040345"
                className="site-header__whatsapp-phone"
                onClick={(e) => e.stopPropagation()}
              >
                +91 99440 40345
              </a>
            </div>
          </div>
          <button
            type="button"
            className="site-header__toggle"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} className={cx(mobileOpen && 'is-open')} />
    </header>
  )
}
