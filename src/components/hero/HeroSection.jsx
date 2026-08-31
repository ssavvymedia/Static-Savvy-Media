import { cx } from '../../utils/helpers.js'

export function formatTwoColorTitle(title) {
  if (!title) return null
  if (typeof title !== 'string') return title

  const str = title.trim()
  if (!str) return null

  let part1 = ''
  let part2 = ''

  // Rule 1: Check for sentence boundary (period followed by space where there are multiple sentences)
  // e.g. "Get Found by Google. Get Cited by ChatGPT. Win Clients from Both."
  const sentenceMatches = [...str.matchAll(/(?<=\.\s+)(?=[A-Z0-9])/g)]
  if (sentenceMatches.length > 0) {
    const lastIndex = sentenceMatches[sentenceMatches.length - 1].index
    part1 = str.slice(0, lastIndex)
    part2 = str.slice(lastIndex)
  }
  // Rule 2: Check for pipe '|'
  else if (str.includes('|')) {
    const lastPipeIndex = str.lastIndexOf('|')
    part1 = str.slice(0, lastPipeIndex + 1)
    part2 = str.slice(lastPipeIndex + 1)
  }
  // Rule 3: Check for dash ' — ' or ' - '
  else if (str.includes(' — ')) {
    const lastDashIndex = str.lastIndexOf(' — ')
    part1 = str.slice(0, lastDashIndex + 3)
    part2 = str.slice(lastDashIndex + 3)
  } else if (str.includes(' - ')) {
    const lastDashIndex = str.lastIndexOf(' - ')
    part1 = str.slice(0, lastDashIndex + 3)
    part2 = str.slice(lastDashIndex + 3)
  }
  // Rule 4: Check for comma ','
  else if (str.includes(',')) {
    const firstCommaIndex = str.indexOf(',')
    const lastCommaIndex = str.lastIndexOf(',')
    const splitIndex = (str.length - lastCommaIndex < 35 && firstCommaIndex !== lastCommaIndex)
      ? lastCommaIndex
      : firstCommaIndex
    part1 = str.slice(0, splitIndex + 1)
    part2 = str.slice(splitIndex + 1)
  }
  // Rule 5: No punctuation -> Word-based split
  else {
    const words = str.split(/\s+/)
    if (words.length <= 1) {
      const w = words[0] || ''
      if (w.length > 5) {
        const mid = Math.ceil(w.length / 2)
        part1 = w.slice(0, mid)
        part2 = w.slice(mid)
      } else {
        part1 = w
        part2 = ''
      }
    } else if (words.length === 2) {
      part1 = words[0] + ' '
      part2 = words[1]
    } else {
      const splitAt = Math.ceil(words.length * 0.5)
      part1 = words.slice(0, splitAt).join(' ') + ' '
      part2 = words.slice(splitAt).join(' ')
    }
  }

  if (!part2) {
    return <span className="hero__title-white">{part1}</span>
  }

  const needSpace = (!part1.endsWith(' ') && !part2.startsWith(' '))

  return (
    <>
      <span className="hero__title-white">{part1}</span>
      {needSpace ? ' ' : ''}
      <span className="hero__title-gradient">{part2.trim()}</span>
    </>
  )
}

export default function HeroSection({
  eyebrow,
  title,
  subtitle,
  actions,
  children,
  className = '',
  layout = 'default',
}) {
  const formattedTitle = formatTwoColorTitle(title)

  if (layout === 'two-column') {
    return (
      <section className={cx('hero hero--two-column', className)}>
        <div className="hero__inner hero__inner--two-column">
          <div className="hero__content">
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h1 className="hero__title">{formattedTitle}</h1>
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
        <h1 className="hero__title">{formattedTitle}</h1>
        {subtitle && <p className="hero__subtitle">{subtitle}</p>}
        {actions && <div className="hero__actions">{actions}</div>}
        {children}
      </div>
    </section>
  )
}