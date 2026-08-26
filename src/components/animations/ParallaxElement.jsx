import { useRef } from 'react'
import { cx } from '../../utils/helpers.js'

/**
 * ParallaxElement — subtle mouse-movement parallax using transform.
 */
export function ParallaxElement({ children, className = '', strength = 16 }) {
  const ref = useRef(null)

  const handleMove = (event) => {
    const el = ref.current
    if (!el) return
    const x = (event.clientX / window.innerWidth - 0.5) * 2
    const y = (event.clientY / window.innerHeight - 0.5) * 2
    el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = ''
  }

  return (
    <div
      ref={ref}
      className={cx('parallax-element', className)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  )
}

export default ParallaxElement