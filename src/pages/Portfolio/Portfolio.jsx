import { useEffect, useMemo, useState } from 'react'
import ContactFormSection from '../../components/sections/ContactFormSection.jsx'
import WhatsAppIcon from '../../components/common/WhatsAppIcon.jsx'
import { setSeo } from '../../utils/seo.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { SITE_URL } from '../../utils/constants.js'
import { ORG_SAME_AS } from '../../data/sameAs.js'
import { seoConfig } from '../../data/seoConfig.js'
import { GOOGLE_REVIEWS, GBP_REVIEW_SUMMARY } from '../../data/googleReviews.js'
import { PORTFOLIO_PATH } from '../../data/portfolioLinks.js'
import { INDUSTRIES, GBP_CLIENTS, MORE_BRANDS, PF_PROCESS } from './portfolioData.js'
import logoImg from '../../assets/images/logo/SSMLOGO.webp'

const ORG_ID = `${SITE_URL}/#organization`
const EMAIL = 'info@staticsavvymedia.com'
const IN_PHONE = { display: '+91 99440 40345', tel: '+919944040345' }
const MY_PHONE = { display: '+60 12-453 7030', tel: '+60124537030' }
const SHOTS = '/p/pf'

const ICONS = {
  pin: 'M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Zm0-9a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z',
  phone: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z',
  calendar: 'M4 5h16v16H4zM4 10h16M9 3v4M15 3v4',
  mail: 'M3 5h18v14H3zM3 6l9 7 9-7',
  check: 'M20 6 9 17l-5-5',
  trend: 'M3 17l6-6 4 4 8-8M15 7h6v6',
  globe: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20',
  map: 'M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2ZM9 4v14M15 6v14',
  insta: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm5.5-11.5h.01',
  arrow: 'M7 17 17 7M8 7h9v9',
}
function Icon({ name, size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  )
}
function GoogleG({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  )
}

const ext = { target: '_blank', rel: 'noopener noreferrer' }
const host = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
const initials = (name) => name.replace(/[^A-Za-z0-9 ]/g, '').split(' ').filter(Boolean).map((w) => w[0]).join('').slice(0, 2).toUpperCase()
const industryLabel = (key) => INDUSTRIES.find((i) => i.key === key)?.label || ''

function ClientCard({ c }) {
  return (
    <article className="pf-card" data-industry={c.industry}>
      <div className="pf-card__shot">
        {c.shot ? (
          <img
            src={`${SHOTS}/${c.shot}-640.webp`}
            srcSet={`${SHOTS}/${c.shot}-640.webp 640w, ${SHOTS}/${c.shot}-1280.webp 1280w`}
            sizes="(min-width: 1200px) 370px, (min-width: 700px) 45vw, 92vw"
            width={640}
            height={400}
            loading="lazy"
            decoding="async"
            alt={`${c.name} website home page`}
          />
        ) : (
          <div className="pf-card__noshot" aria-hidden="true"><span>{initials(c.name)}</span></div>
        )}
        <span className={`pf-scope${c.scope === 'Full SEO' ? ' pf-scope--full' : ''}`}>{c.scope}</span>
      </div>
      <div className="pf-card__body">
        <p className="pf-card__meta"><span>{c.type}</span><span className="pf-card__city"><Icon name="pin" size={13} /> {c.city}</span></p>
        <h3 className="pf-card__name">{c.name}</h3>
        <p className="pf-card__rating">
          <GoogleG size={14} />
          {c.rating != null
            ? <><strong>{c.rating.toFixed(1)}★</strong> <span>{String(c.reviews).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Google reviews</span></>
            : <span>New Google Business Profile</span>}
        </p>
        {c.results.length > 0 && (
          <ul className="pf-results" aria-label="Ranking snapshots">
            {c.results.map((r) => <li key={r}><Icon name="trend" size={16} /><span>{r}</span></li>)}
          </ul>
        )}
        <ul className="pf-work" aria-label="Work we do">
          {c.work.map((w) => <li key={w}>{w}</li>)}
        </ul>
        <div className="pf-card__links">
          {c.site && <a href={c.site} {...ext}><Icon name="globe" size={15} /> {host(c.site)}</a>}
          <a href={c.maps} {...ext}><Icon name="map" size={15} /> Google Maps</a>
          {c.instagram && <a href={c.instagram} {...ext}><Icon name="insta" size={15} /> Instagram</a>}
        </div>
      </div>
    </article>
  )
}

/**
 * Private portfolio page (/p/portfolio-6g3sak/), shared only when a prospect asks: noindex,nofollow
 * (meta + X-Robots-Tag), not linked from the site, not in the sitemap. Real client data only
 * (portfolioData.js); reviews are the same verbatim Google reviews used on the city pages (no review schema).
 */
export default function Portfolio() {
  const [filter, setFilter] = useState('all')
  const s = GBP_REVIEW_SUMMARY
  const wa = buildWhatsAppLink(IN_PHONE.display, 'Hi Static Savvy Media, I saw your client portfolio and would like to discuss my business.')
  const waMy = buildWhatsAppLink(MY_PHONE.display, 'Hi Static Savvy Media, I saw your client portfolio and would like to discuss my business in Malaysia.')
  const tel = `tel:${IN_PHONE.tel}`
  const counts = useMemo(() => {
    const m = {}
    for (const x of [...GBP_CLIENTS, ...MORE_BRANDS]) m[x.industry] = (m[x.industry] || 0) + 1
    return m
  }, [])
  const total = GBP_CLIENTS.length + MORE_BRANDS.length
  const show = (x) => filter === 'all' || x.industry === filter
  const shownA = GBP_CLIENTS.filter(show)
  const shownB = MORE_BRANDS.filter(show)

  useEffect(() => {
    const cfg = seoConfig[PORTFOLIO_PATH.replace(/\/$/, '')].seo
    setSeo({
      ...cfg,
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'WebPage', '@id': `${SITE_URL}${PORTFOLIO_PATH}#webpage`, name: 'Brands we’ve grown', url: `${SITE_URL}${PORTFOLIO_PATH}`, about: { '@id': ORG_ID }, publisher: { '@id': ORG_ID } },
          { '@type': 'Organization', '@id': ORG_ID, name: 'Static Savvy Media', url: `${SITE_URL}/`, telephone: IN_PHONE.display, email: EMAIL, sameAs: ORG_SAME_AS },
        ],
      },
    })
  }, [])

  return (
    <div className="lp pf">
      <header className="lp-top">
        <div className="lp-wrap lp-top__inner">
          <span className="lp-top__logo">
            <img src={logoImg} width={480} height={320} alt="Static Savvy Media" />
          </span>
          <div className="lp-top__actions">
            <a className="lp-top__call" href={tel}><Icon name="phone" size={16} /> <span>{IN_PHONE.display}</span></a>
            <a className="lp-btn lp-btn--primary lp-btn--sm" href={wa} {...ext}><WhatsAppIcon size={16} variant="white" /> WhatsApp</a>
          </div>
        </div>
      </header>

      {/* ---- Hero ---- */}
      <section className="lp-hero pf-hero" aria-labelledby="pf-h1">
        <div className="lp-wrap pf-hero__inner">
          <p className="lp-eyebrow">Client portfolio · shared privately</p>
          <h1 id="pf-h1" className="lp-hero__title">Brands we&rsquo;ve grown</h1>
          <p className="lp-hero__lead pf-hero__lead">
            {total} businesses across Tamil Nadu trust us with their Google Business Profile, SEO and digital marketing,
            from hardware stores and clinics to bridal studios and MEP contractors. Every rating, review count and ranking
            below is real and dated. No made-up numbers.
          </p>
          <ul className="lp-badges pf-trust" aria-label="Why clients trust us">
            <li><a href={s.url} {...ext}><GoogleG /> <strong>{s.rating}★</strong> from {s.count} Google reviews</a></li>
            <li><Icon name="calendar" size={16} /> Founded 2021</li>
            <li><Icon name="pin" size={16} /> 3 offices: Madurai · Thoothukudi · Rawang</li>
          </ul>
          <div className="lp-hero__ctas pf-hero__ctas">
            <a className="lp-btn lp-btn--primary lp-btn--lg" href={wa} {...ext}><WhatsAppIcon size={20} variant="white" /> WhatsApp {IN_PHONE.display}</a>
            <a className="lp-btn lp-btn--ghost lp-btn--lg" href="#gbp-clients">See client work</a>
          </div>
        </div>
      </section>

      {/* ---- Industry filter ---- */}
      <div className="pf-filter-bar">
        <div className="lp-wrap">
          <div className="pf-filters" role="group" aria-label="Filter clients by industry">
            <button type="button" className={`pf-chip${filter === 'all' ? ' is-active' : ''}`} aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>
              All <span>{total}</span>
            </button>
            {INDUSTRIES.map((i) => (
              <button key={i.key} type="button" className={`pf-chip${filter === i.key ? ' is-active' : ''}`} aria-pressed={filter === i.key} onClick={() => setFilter(i.key)}>
                {i.label} <span>{counts[i.key] || 0}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Section A: GBP & SEO clients ---- */}
      <section id="gbp-clients" className="lp-section pf-section" aria-labelledby="pf-a">
        <div className="lp-wrap">
          <p className="lp-kicker">Ongoing work</p>
          <h2 id="pf-a" className="lp-h2">Google Business Profile &amp; SEO clients</h2>
          <p className="lp-sub">Profiles we manage every week. Ratings checked on Google Maps on 31 Oct 2026; review counts and ranking snapshots are from our October 2026 client reports (position on the date shown).</p>
          {shownA.length > 0 ? (
            <div className="pf-grid">
              {shownA.map((c) => <ClientCard key={c.key} c={c} />)}
            </div>
          ) : (
            <p className="pf-empty">No Google Business Profile clients in this industry yet. See the brands below.</p>
          )}
        </div>
      </section>

      {/* ---- Section B: more brands ---- */}
      <section className="lp-section lp-section--alt pf-section" aria-labelledby="pf-b">
        <div className="lp-wrap">
          <p className="lp-kicker">Across Tamil Nadu</p>
          <h2 id="pf-b" className="lp-h2">More brands we&rsquo;ve worked with</h2>
          <p className="lp-sub">Digital marketing, social media and promotion projects for businesses across Tamil Nadu.</p>
          {shownB.length > 0 ? (
            <ul className="pf-brands">
              {shownB.map((b) => (
                <li key={b.name} className="pf-brand" data-industry={b.industry}>
                  <span className="pf-brand__mono" aria-hidden="true">{initials(b.name)}</span>
                  <span className="pf-brand__text">
                    <strong>{b.name}</strong>
                    <small>{b.label}</small>
                  </span>
                  {b.url && <a className="pf-brand__link" href={b.url} {...ext} aria-label={`${b.name} ${b.linkLabel}`}><Icon name={b.linkLabel === 'Instagram' ? 'insta' : 'arrow'} size={16} /></a>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="pf-empty">No other brands in {industryLabel(filter).toLowerCase()} yet.</p>
          )}
        </div>
      </section>

      {/* ---- Process ---- */}
      <section className="lp-section" aria-labelledby="pf-process">
        <div className="lp-wrap">
          <p className="lp-kicker">How we work</p>
          <h2 id="pf-process" className="lp-h2">The same four steps for every client</h2>
          <ol className="lp-process pf-process">
            {PF_PROCESS.map((x, i) => (
              <li key={x.title} className="lp-step">
                <span className="lp-step__num">{i + 1}</span>
                <div>
                  <h3 className="pf-step__title">{x.title}</h3>
                  <p>{x.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- Reviews ---- */}
      <section className="lp-section lp-section--alt" aria-labelledby="pf-reviews">
        <div className="lp-wrap">
          <p className="lp-kicker">In their words</p>
          <h2 id="pf-reviews" className="lp-h2">What clients say about us on Google</h2>
          <ul className="lp-reviews">
            {GOOGLE_REVIEWS.map((r) => (
              <li key={r.id} className="lp-review">
                <figure>
                  <div className="lp-review__top"><span className="lp-stars" role="img" aria-label="5 out of 5 stars">★★★★★</span><span className="lp-review__src"><GoogleG size={14} /> Google</span></div>
                  <blockquote><p>&ldquo;{r.text}&rdquo;</p></blockquote>
                  <figcaption>
                    <span className="lp-review__avatar" aria-hidden="true">{initials(r.name)}</span>
                    {r.name}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="lp-note">
            Quoted word for word from our Madurai Google Business Profile.{' '}
            <a href={s.url} {...ext}>Read all {s.count} reviews on Google</a>
          </p>
        </div>
      </section>

      {/* ---- Final CTA ---- */}
      <section className="lp-section lp-final" aria-labelledby="pf-final">
        <div className="lp-wrap">
          <div className="lp-final__panel">
            <h2 id="pf-final" className="lp-h2">Want your business on this page next?</h2>
            <p>Send us your Google Business Profile or website. We will check where you rank today against your top competitors and tell you honestly what we would fix first.</p>
            <div className="lp-final__grid">
              <a className="lp-action lp-action--wa" href={wa} {...ext}>
                <WhatsAppIcon size={24} variant="white" /><span><strong>WhatsApp (India)</strong><small>{IN_PHONE.display}</small></span>
              </a>
              <a className="lp-action" href={waMy} {...ext}>
                <WhatsAppIcon size={24} /><span><strong>WhatsApp (Malaysia)</strong><small>{MY_PHONE.display}</small></span>
              </a>
              <a className="lp-action" href={tel}>
                <Icon name="phone" /><span><strong>Call us</strong><small>{IN_PHONE.display}</small></span>
              </a>
              <a className="lp-action" href="#portfolio-enquiry">
                <Icon name="mail" /><span><strong>Send an enquiry</strong><small>Form below or {EMAIL}</small></span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <div id="portfolio-enquiry" className="lp-enquiry">
        <ContactFormSection />
      </div>
      <footer className="lp-foot">
        <div className="lp-wrap">
          <p>© Static Savvy Media · Madurai · Thoothukudi · Rawang, Selangor · <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
          <p className="lp-foot__small">This page was shared with you privately. Rankings are snapshots on the dates shown and change over time.</p>
        </div>
      </footer>

      <nav className="lp-sticky" aria-label="Quick contact">
        <a className="lp-sticky__wa" href={wa} {...ext}><WhatsAppIcon size={18} variant="white" /> WhatsApp</a>
        <a href={tel}><Icon name="phone" size={18} /> Call</a>
        <a href="#portfolio-enquiry">Enquire</a>
      </nav>
    </div>
  )
}
