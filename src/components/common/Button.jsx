import { Link } from 'react-router-dom'
import { cx } from '../../utils/helpers.js'
import WhatsAppIcon from './WhatsAppIcon.jsx'

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

  let content = children
  if (typeof children === 'string' && children.toLowerCase().includes('whatsapp')) {
    content = (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', verticalAlign: 'middle' }}>
        <WhatsAppIcon size={22} />
        <span>{children}</span>
      </span>
    )
  }

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    )
  }

  return (
    <button type={props.type || 'button'} className={classes} {...props}>
      {content}
    </button>
  )
}