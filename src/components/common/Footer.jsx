import { Link } from 'react-router-dom'
import { FOOTER_LINKS } from '../../data/navigation.js'
import { SITE_NAME } from '../../utils/constants.js'
import { useActiveRoute } from '../../hooks/useActiveRoute.js'
import { cx } from '../../utils/helpers.js'

function FooterColumn({ title, links }) {
  const { isActive, isExactActive } = useActiveRoute()

  return (
    <div>
      <h4 className="site-footer__heading">{title}</h4>
      <ul className="site-footer__links">
        {links.map((link) => {
          const active = isActive(link.path)
          const exact = isExactActive(link.path)
          return (
            <li key={link.slug || link.label}>
              <Link
                to={link.path}
                className={cx(active && 'is-active')}
                aria-current={exact ? 'page' : undefined}
              >
                {link.name || link.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link to="/" className="site-header__logo" aria-label={`${SITE_NAME}, home`}>
              <span className="site-header__logo-mark">SS</span>
              <span className="site-header__logo-text">{SITE_NAME}</span>
            </Link>
            <p>Premium digital marketing agency. Placeholder tagline, populated in the content phase.</p>
          </div>

          <FooterColumn title="Services" links={FOOTER_LINKS.services} />
          <FooterColumn title="Locations" links={FOOTER_LINKS.locations} />
          <FooterColumn title="Company" links={FOOTER_LINKS.company} />
          <FooterColumn title="Legal" links={FOOTER_LINKS.legal} />
        </div>

        <div className="site-footer__bottom">
          <span>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</span>
          <span>Madurai · Thoothukudi · Malaysia</span>
        </div>
      </div>
    </footer>
  )
}
