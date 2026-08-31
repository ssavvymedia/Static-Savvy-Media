import { Link } from 'react-router-dom'
import { FOOTER_LINKS } from '../../data/navigation.js'
import { SITE_NAME, SOCIAL_LINKS } from '../../utils/constants.js'
import { useActiveRoute } from '../../hooks/useActiveRoute.js'
import { cx } from '../../utils/helpers.js'
import logoImg from '../../assets/images/logo/SSMLOGO.png'

const COLUMN_ICONS = {
  Services: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-3.05 11a22.35 22.35 0 0 1-3.95 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  ),
  Locations: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Company: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Legal: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.8 17 5 19 5a1 1 0 0 1 1 1z"/>
    </svg>
  ),
}

function FooterColumn({ title, links }) {
  const { isActive, isExactActive } = useActiveRoute()
  const icon = COLUMN_ICONS[title]
  const themeClass = `site-footer__heading-badge--${title.toLowerCase()}`

  return (
    <div className="site-footer__column">
      <div className="site-footer__heading-wrap">
        {icon && <span className={cx('site-footer__heading-badge', themeClass)}>{icon}</span>}
        <h4 className="site-footer__heading">{title}</h4>
      </div>
      <div className={cx('site-footer__heading-line', `site-footer__heading-line--${title.toLowerCase()}`)} />
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
                <span className="site-footer__link-arrow" aria-hidden="true">›</span>
                <span>{link.name || link.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function Footer() {
  const socialLinks = {
    facebook: SOCIAL_LINKS.facebook || 'https://facebook.com',
    instagram: SOCIAL_LINKS.instagram || 'https://instagram.com',
    linkedin: SOCIAL_LINKS.linkedin || 'https://linkedin.com',
    youtube: SOCIAL_LINKS.youtube || 'https://youtube.com',
  }

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link to="/" className="site-footer__logo" aria-label={`${SITE_NAME}, home`}>
              <img src={logoImg} alt={SITE_NAME} className="site-footer__logo-img" />
            </Link>

            <div className="site-footer__socials">
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="site-footer__social-btn site-footer__social-btn--facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="site-footer__social-btn site-footer__social-btn--instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="site-footer__social-btn site-footer__social-btn--linkedin"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"/>
                </svg>
              </a>
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="site-footer__social-btn site-footer__social-btn--youtube"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"/>
                </svg>
              </a>
            </div>

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
