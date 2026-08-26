import { useEffect, useRef, useState } from 'react'

/**
 * CounterAnimation — animates a number from 0 to `value` when scrolled into view.
 */
export function CounterAnimation({ value = 0, prefix = '', suffix = '', duration = 1400 }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        const start = performance.now()
        const target = Number(value) || 0

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setDisplay(Math.round(target * eased))
          if (progress < 1) {
            requestAnimationFrame(tick)
          }
        }

        requestAnimationFrame(tick)
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration])

  return (
    <span ref={ref} className="counter">
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  )
}

export default CounterAnimation