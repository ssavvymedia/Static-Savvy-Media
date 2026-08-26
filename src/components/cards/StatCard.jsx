import { CounterAnimation } from '../animations/CounterAnimation.jsx'
import { cx } from '../../utils/helpers.js'

export default function StatCard({ stat = {}, className = '' }) {
  return (
    <div className={cx('stat-card', className)}>
      <CounterAnimation value={stat?.value} prefix={stat?.prefix} suffix={stat?.suffix} />
      <p className="stat-card__label">{stat?.label}</p>
    </div>
  )
}