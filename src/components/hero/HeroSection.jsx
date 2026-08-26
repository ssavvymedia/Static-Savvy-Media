import { cx } from '../../utils/helpers.js'

export default function HeroSection({
  eyebrow,
  title,
  subtitle,
  actions,
  children,
  className = '',
  layout = 'default',
}) {
  if (layout === 'two-column') {
    return (
      <section className={cx('hero hero--two-column', className)}>
        <div className="hero__inner hero__inner--two-column">
          <div className="hero__content">
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h1 className="hero__title">{title}</h1>
            {subtitle && <p className="hero__subtitle">{subtitle}</p>}
            {actions && <div className="hero__actions">{actions}</div>}
          </div>
          <div className="hero__visual-side">
            {children}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={cx('hero', className)}>
      <div className="hero__inner">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="hero__title">{title}</h1>
        {subtitle && <p className="hero__subtitle">{subtitle}</p>}
        {actions && <div className="hero__actions">{actions}</div>}
        {children}
      </div>
    </section>
  )
}