import { cx } from '../../utils/helpers.js'

/**
 * FloatingElement — applies the floating (up/down) animation.
 */
export function FloatingElement({ children, className = '', duration = 5 }) {
  const style = { animationDuration: `${duration}s` }
  return (
    <div className={cx('animate-float', className)} style={style}>
      {children}
    </div>
  )
}

export default FloatingElement