import { GBP_CLIENTS, MORE_BRANDS, INDUSTRIES } from '../../pages/Portfolio/portfolioData.js'
import '../../styles/pages/home-v2.css'

/*
 * Client work showcase (home + /case-studies/). Real data only, from the portfolio records:
 * name, type, city, scope, Google rating/review count and the work logged in our client reports.
 * No metrics, percentages or quotes. Screenshots live in /images/clients/ (copied from the portfolio set).
 */
const AS_OF = 'Oct 2026'
const FEATURED = 'care-to-cure'
const CARDS = ['aaganyan-hardwares', 'dhee-eves', 'upstrol']
const ALSO = ['leaf9', 'hashwatha', 'sacc', 'rrabs', 'mpk-dry-fruits']
const ALSO_BRANDS = ['Krishna Eye Care', 'NAS Catering College', '32 Sparkles Dental Clinic', 'Xpress Motors']

const byKey = (k) => GBP_CLIENTS.find((c) => c.key === k)
const indLabel = (k) => INDUSTRIES.find((i) => i.key === k)?.label || ''
const services = (c) => (c.scope === 'Full SEO' ? ['SEO', 'Google Business Profile'] : ['Google Business Profile'])

function Rating({ c }) {
  if (!c.rating) return null
  return (
    <p className="cw-rating">
      <span className="cw-star" aria-hidden="true">★</span> <b>{c.rating.toFixed(1)}</b> Google rating · {c.reviews.toLocaleString('en-IN')} reviews <span className="cw-asof">(as of {AS_OF})</span>
    </p>
  )
}

function Shot({ c, w = 640, h = 400 }) {
  return <img className="cw-shot" src={`/images/clients/${c.shot}-640.webp`} width={w} height={h} alt={`${c.name} website homepage`} loading="lazy" decoding="async" />
}

function Visit({ c }) {
  return c.site ? <a className="cw-visit" href={c.site} target="_blank" rel="nofollow noopener noreferrer">Visit website <span aria-hidden="true">↗</span></a> : null
}

export default function ClientWork({ id = 'client-work', title = 'Businesses we work with.', headingLevel = 2 }) {
  const f = byKey(FEATURED)
  const cards = CARDS.map(byKey).filter(Boolean)
  const also = [...ALSO.map((k) => byKey(k)?.name).filter(Boolean), ...ALSO_BRANDS.filter((n) => MORE_BRANDS.some((b) => b.name === n))]
  const H = `h${headingLevel}`
  return (
    <section className="hv2 hv2-section hv2-cw" data-section="client-work" aria-labelledby={`${id}-title`}>
      <div className="hv2-wrap">
        <div className="cw-head">
          <div>
            <span className="hv2-eyebrow">Client work</span>
            <H className="hv2-h2" id={`${id}-title`}>{title}</H>
          </div>
          <p className="cw-note">Real clients, real scope. Google ratings and review counts as of {AS_OF}.</p>
        </div>
        <div className="cw-grid">
          <article className="cw-feat">
            <Shot c={f} />
            <div className="cw-body">
              <span className="cw-tag">Featured client</span>
              <h3>{f.name}</h3>
              <p className="cw-meta">{f.type} · {f.city} · {indLabel(f.industry)}</p>
              <ul className="cw-chips">{services(f).map((s) => <li key={s}>{s}</li>)}</ul>
              <Rating c={f} />
              <p className="cw-wd">What we did</p>
              <ul className="cw-list">{f.work.map((w) => <li key={w}>{w}</li>)}</ul>
              <Visit c={f} />
            </div>
          </article>
          <ul className="cw-side">
            {cards.map((c) => (
              <li className="cw-card" key={c.key}>
                <Shot c={c} />
                <div>
                  <h3>{c.name}</h3>
                  <p className="cw-meta" title={`${c.type} · ${c.city}`}>{c.type} · {c.city}</p>
                  <div className="cw-row"><ul className="cw-chips">{services(c).map((s) => <li key={s}>{s}</li>)}</ul><Visit c={c} /></div>
                  <Rating c={c} />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="cw-also">
          <span>Also trusted by:</span>
          <ul>{also.map((n) => <li key={n}>{n}</li>)}</ul>
        </div>
      </div>
    </section>
  )
}
