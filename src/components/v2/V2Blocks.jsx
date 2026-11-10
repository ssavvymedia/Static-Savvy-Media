import { useRef } from 'react'
import { Link } from 'react-router-dom'
import GrowthAuditForm from '../sections/GrowthAuditForm.jsx'
import { GOOGLE_REVIEWS, GBP_REVIEW_SUMMARY } from '../../data/googleReviews.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../../utils/constants.js'
import DeepanFounder from '../../assets/images/About/DeepanFounder.webp'
import SSMLogo from '../../assets/images/logo/SSMLOGO.webp'
import '../../styles/pages/home-v2.css'

/* Shared v2 blocks used on the homepage, /locations/madurai/, /services/seo/madurai/ and Madurai guides.
 * All facts here are verified: 4.9★ from 106 Google reviews (Madurai GBP, re-checked 9 Nov 2026),
 * founded in Madurai in 2021, offices in Madurai (HQ), Thoothukudi and Rawang (Malaysia). */
export const REVIEW_PROOF = `${GBP_REVIEW_SUMMARY.rating}★ from ${GBP_REVIEW_SUMMARY.count} Google reviews (Nov 2026)`

const Svg = ({ d, children }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">{d ? <path d={d} /> : children}</svg>
)
export const Ico = ({ children, d }) => <span className="hv2-ico"><Svg d={d}>{children}</Svg></span>

export function AuditBlock({ formId, defaultCity = 'Madurai', defaultIndustry = '', id = 'audit', eyebrow = 'Free for qualified businesses', title = 'Get your Business Growth Audit.', lead, cover = true, anchors = true }) {
  return (
    <section className="hv2 hv2-section" data-section={formId} aria-labelledby={`${id}-title`}>
      {/* #enquiry / #form: targets of older "Send an enquiry" links (QuoteCTA, city pages) that pointed at the contact form. */}
      {anchors && <span id="enquiry" className="scroll-anchor" aria-hidden="true" />}
      <div className="hv2-wrap">
        <div className={`hv2-audit${cover ? '' : ' hv2-audit--single'}`} id={id}>
          {cover && (
            <div className="hv2-cover" aria-label="Sample audit report cover (illustrative)">
              <img src={SSMLogo} width={480} height={320} alt="" loading="lazy" />
              <h3>Business Growth Audit</h3>
              <p>Prepared for: your business</p>
              <ul>
                <li>Website &amp; SEO health</li>
                <li>Google Business Profile</li>
                <li>AI search presence</li>
                <li>Competitor snapshot</li>
                <li>Prioritised 90-day plan</li>
              </ul>
              <span className="hv2-stamp">Illustrative sample</span>
            </div>
          )}
          <div>
            <span className="hv2-eyebrow">{eyebrow}</span>
            <h2 className="hv2-h2" id={`${id}-title`}>{title}</h2>
            <p className="hv2-lead" style={{ marginTop: 12 }}>
              {lead ||
                'A review of your website, Google visibility, AI search presence and competitors, with a tailored action plan. Prepared by our Madurai team, not an automated score.'}
            </p>
            <GrowthAuditForm formId={formId} defaultCity={defaultCity} defaultIndustry={defaultIndustry} />
          </div>
        </div>
      </div>
    </section>
  )
}

export function ReviewsCarousel({ title = 'Real reviews from Google.', eyebrow = 'What our clients say', grid = false, limit }) {
  const track = useRef(null)
  const items = limit ? GOOGLE_REVIEWS.slice(0, limit) : GOOGLE_REVIEWS
  const go = (dir) => {
    const el = track.current
    const card = el?.querySelector('.hv2-rev')
    if (el && card) el.scrollBy({ left: (card.offsetWidth + 20) * dir, behavior: 'smooth' })
  }
  return (
    <section className={`hv2 hv2-section hv2-section--flush${grid ? ' hv2-reviews--grid' : ''}`} data-section="reviews" aria-labelledby="hv2-reviews-title">
      <div className="hv2-wrap">
        <div className="hv2-head" style={{ marginBottom: 0 }}>
          <div>
            <span className="hv2-eyebrow">{eyebrow}</span>
            <h2 className="hv2-h2" id="hv2-reviews-title">{title}</h2>
          </div>
          {!grid && (
            <div className="hv2-car-ctrl">
              <button type="button" aria-label="Previous review" onClick={() => go(-1)}>‹</button>
              <button type="button" aria-label="Next review" onClick={() => go(1)}>›</button>
            </div>
          )}
        </div>
        <div className="hv2-track" ref={track} tabIndex={0} aria-label="Google reviews">
          {items.map((r) => (
            <figure className="hv2-rev" key={r.id}>
              <span className="hv2-q" aria-hidden="true">“</span>
              <blockquote>{r.text}</blockquote>
              <figcaption>
                <span className="hv2-avatar" aria-hidden="true">{r.name.charAt(0).toUpperCase()}</span>
                <span><b>{r.name}</b><small>Google review</small></span>
                <span className="hv2-stars" aria-label="5 stars">★★★★★</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="hv2-fine" style={{ marginTop: 16 }}>
          Verbatim 5-star reviews from our Madurai Google Business Profile ({REVIEW_PROOF}).{' '}
          <a className="hv2-link" style={{ fontSize: 12.5 }} href={GBP_REVIEW_SUMMARY.url} target="_blank" rel="noopener noreferrer">Read all on Google →</a>
        </p>
      </div>
    </section>
  )
}

export function FounderBlock({ heading = 'Meet the founder.', text }) {
  const wa = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)
  return (
    <section className="hv2 hv2-section hv2-section--flush" data-section="founder" aria-labelledby="hv2-founder-title">
      <div className="hv2-wrap hv2-founder">
        <div className="hv2-founder__photo">
          <img src={DeepanFounder} width={740} height={941} loading="lazy" decoding="async" alt="Deepan Kanz, Founder & AI Search Specialist at Static Savvy Media, Madurai" />
        </div>
        <div>
          <span className="hv2-eyebrow">Founder-led from Madurai</span>
          <h2 className="hv2-h2" id="hv2-founder-title">{heading}</h2>
          <p className="hv2-lead" style={{ marginTop: 14 }}>
            {text ||
              'Deepan Kanz founded Static Savvy Media in Madurai in 2021 and still leads strategy for every account. He specialises in SEO, Local SEO and AI search (GEO and AEO), and is the person behind our GEO/AEO method. Clients talk to him directly, not to a call centre.'}
          </p>
          <ul className="hv2-founder__facts">
            <li><b>Founder &amp; AI Search Specialist</b>Static Savvy Media</li>
            <li><b>Since 2021</b>Madurai HQ, Kamarajar Salai</li>
            <li><b>SEO · Local SEO · GEO/AEO</b>Hands-on in every plan</li>
            <li><b>{REVIEW_PROOF}</b>Madurai Google Business Profile</li>
          </ul>
          <div className="hv2-cta-row">
            <Link className="hv2-btn hv2-btn--ghost" to="/about/deepan-kanz/">About Deepan <span className="hv2-arrow" aria-hidden="true">→</span></Link>
            <a className="hv2-btn hv2-btn--ghost" href={wa} target="_blank" rel="noopener noreferrer" data-track="consultation">Book a Consultation</a>
          </div>
        </div>
      </div>
    </section>
  )
}

/** 40–60 word answer-first block for AI answers and featured snippets. */
export function AnswerFirst({ eyebrow = 'Quick answer', heading, text, facts = [] }) {
  return (
    <section className="hv2 hv2-section" style={{ paddingBottom: 0, paddingTop: 'clamp(28px,4vw,48px)' }} data-section="answer-first">
      <div className="hv2-wrap">
        <div className="hv2-answer">
          <span className="hv2-eyebrow">{eyebrow}</span>
          <h2>{heading}</h2>
          <p>{text}</p>
          {facts.length > 0 && (
            <ul className="hv2-answer__facts">
              {facts.map((f) => <li key={f}>{f}</li>)}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

/** Market-range table (general market ranges, never our prices). */
export function MarketRangeTable({ eyebrow = 'Cost', heading, intro, rows, note, link, colLabel = 'Typical Madurai market range' }) {
  return (
    <section className="hv2 hv2-section hv2-section--flush" data-section="market-ranges" style={{ paddingTop: 'clamp(40px,5vw,64px)' }}>
      <div className="hv2-wrap">
        <span className="hv2-eyebrow">{eyebrow}</span>
        <h2 className="hv2-h2">{heading}</h2>
        {intro && <p className="hv2-lead" style={{ margin: '12px 0 24px' }}>{intro}</p>}
        <div className="hv2-table-wrap">
          <table className="hv2-table">
            <thead><tr><th scope="col">What you buy</th><th scope="col">{colLabel}</th><th scope="col">What drives the price</th></tr></thead>
            <tbody>{rows.map((r) => <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td></tr>)}</tbody>
          </table>
        </div>
        {note && <p className="hv2-fine" style={{ marginTop: 12 }}>{note}</p>}
        {link && <p style={{ marginTop: 14 }}><Link className="hv2-link" to={link.to}>{link.label} <span className="hv2-arrow" aria-hidden="true">→</span></Link></p>}
      </div>
    </section>
  )
}

/** Simple card grid (title, text, optional link) for hub pages. */
export function CardGrid({ eyebrow, heading, intro, items, section = 'cards', cols = 3 }) {
  return (
    <section className="hv2 hv2-section hv2-section--flush" data-section={section} style={{ paddingTop: 'clamp(40px,5vw,64px)' }}>
      <div className="hv2-wrap">
        {eyebrow && <span className="hv2-eyebrow">{eyebrow}</span>}
        <h2 className="hv2-h2">{heading}</h2>
        {intro && <p className="hv2-lead" style={{ margin: '12px 0 0' }}>{intro}</p>}
        <ul className={`hv2-cards hv2-cards--${cols}`}>
          {items.map((it) => (
            <li key={it.title} className="hv2-cardx">
              <h3>{it.link ? <Link to={it.link}>{it.title}</Link> : it.title}</h3>
              <p>{it.text}</p>
              {it.link && <Link className="hv2-link" to={it.link} aria-hidden="true" tabIndex={-1}>{it.linkLabel || 'Learn more'} <span className="hv2-arrow">→</span></Link>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
