import { useState, useEffect, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle.jsx'
import DesktopNav from '../navigation/DesktopNav.jsx'
import MobileNav from '../navigation/MobileNav.jsx'
import { cx } from '../../utils/helpers.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../../utils/constants.js'

import logoImg from '../../assets/images/logo/SSMLOGO.webp'

/* false during the server render and the hydration pass, true afterwards: the mobile-nav portal
 * (into document.body) is not part of the prerendered HTML, so it mounts right after hydration. */
const noopSubscribe = () => () => {}
const useHydrated = () => useSyncExternalStore(noopSubscribe, () => true, () => false)

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const hydrated = useHydrated()
  const whatsappHref = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)

  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }
    return () => {
      document.body.classList.remove('menu-open')
    }
  }, [mobileOpen])

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-header__logo" aria-label="Static Savvy Media, home">
          <span className="site-header__logo-plate">
            <img src={logoImg} width={480} height={320} alt="Static Savvy Media" className="site-header__logo-img" />
          </span>
          <span className="site-header__brand">
            <span className="site-header__brand-name">Static Savvy Media</span>
            <span className="site-header__brand-tag">AI Search · SEO · Lead Generation</span>
          </span>
        </Link>

        <DesktopNav />

        <div className="site-header__actions">
          <ThemeToggle />
          {/* Book a Consultation: WhatsApp for now; Growth Audit form lands with PR-F (contact form until then). */}
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="site-header__cta site-header__cta--ghost">Book a Consultation</a>
          <Link to="/contact/#form" className="site-header__cta site-header__cta--primary">Get a Growth Audit</Link>
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

      {hydrated && createPortal(
        <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} className={cx(mobileOpen && 'is-open')} />,
        document.body
      )}
    </header>
  )
}
