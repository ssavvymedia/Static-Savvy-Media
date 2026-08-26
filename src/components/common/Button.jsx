import { Link } from 'react-router-dom'
import { cx } from '../../utils/helpers.js'

export default function Button({
  children,
  href,
  to,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const classes = cx('btn', `btn--${variant}`, `btn--${size}`, className)

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={props.type || 'button'} className={classes} {...props}>
      {children}
    </button>
  )
}