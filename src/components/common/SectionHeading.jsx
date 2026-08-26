import { cx } from '../../utils/helpers.js'

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
}) {
  return (
    <div className={cx('section-heading', `section-heading--${align}`, className)}>
      {eyebrow && <span className="section-heading__eyebrow">{eyebrow}</span>}
      {title && <h2 className="section-heading__title">{title}</h2>}
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    </div>
  )
}