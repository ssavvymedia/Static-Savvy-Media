import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button.jsx'
import WhatsAppIcon from './WhatsAppIcon.jsx'
import DesktopNav from '../navigation/DesktopNav.jsx'
import MobileNav from '../navigation/MobileNav.jsx'
import { cx } from '../../utils/helpers.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER } from '../../utils/constants.js'

import logoImg from '../../assets/images/logo/SSMLOGO.png'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const whatsappHref = buildWhatsAppLink(WHATSAPP_NUMBER)

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-header__logo" aria-label="Static Savvy Media, home">
          <img src={logoImg} alt="Static Savvy Media" className="site-header__logo-img" />
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
              <WhatsAppIcon size="100%" />
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
