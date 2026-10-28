import { Link } from 'react-router-dom'

/* Internal-link block for the hand-built guide pages: related services, pricing and guides. */
export default function RelatedReading({ title = 'Related services and guides', links }) {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: '860px' }}>
        <h2 className="section-heading__title">{title}</h2>
        <ul className="pricing-next-steps__links" style={{ marginTop: '1rem' }}>
          {links.map(([to, label]) => (
            <li key={to}><Link to={to} style={{ color: 'var(--color-violet)', fontWeight: 600 }}>{label}</Link></li>
          ))}
        </ul>
      </div>
    </section>
  )
}
