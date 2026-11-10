import { Link } from 'react-router-dom'
import { AuditBlock, ReviewsCarousel, FounderBlock, Ico, REVIEW_PROOF } from '../components/v2/V2Blocks.jsx'
import ClientWork from '../components/v2/ClientWork.jsx'
import { HOME_H1, HOME_INTRO, HOME_MARKETS, HOME_MADURAI_LINKS } from '../data/pages/homeContent.js'
import { HOME_FAQS } from '../data/pages/homeFaqs.js'
import { GBP_REVIEW_SUMMARY } from '../data/googleReviews.js'
import HeroLaptop from '../assets/images/home/hero-laptop.webp'
import IndHealthcare from '../assets/images/home/ind-healthcare.webp'
import IndRealEstate from '../assets/images/home/ind-realestate.webp'
import IndManufacturing from '../assets/images/home/ind-manufacturing.webp'
import IndEducation from '../assets/images/home/ind-education.webp'
import IndHospitality from '../assets/images/home/ind-hospitality.webp'

const P = {
  search: 'M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4-4',
  trend: 'M3 17l6-6 4 4 8-8M14 7h7v7',
  pin: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0116 0zM12 7a3 3 0 100 6 3 3 0 000-6z',
  chat: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
  cal: 'M3 7a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2zM16 3v4M8 3v4M3 10h18',
  globe: 'M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18',
  people: 'M9 4.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM2.5 20a6.5 6.5 0 0113 0M16 4.5a3.5 3.5 0 010 7M21.5 20a6.5 6.5 0 00-4-6',
}

const INDUSTRIES = [
  { name: 'Healthcare & Medical', to: '/industries/healthcare-clinics/', img: IndHealthcare, alt: 'Bright modern clinic reception', d: 'M12 21s-7-4.5-9-9.5C1.8 8 4 4.5 7.5 4.5c2 0 3.4 1.1 4.5 2.6 1.1-1.5 2.5-2.6 4.5-2.6C20 4.5 22.2 8 21 11.5 19 16.5 12 21 12 21zM12 9v5M9.5 11.5h5' },
  { name: 'Real Estate & Construction', to: '/industries/real-estate-builders/', img: IndRealEstate, alt: 'Modern apartment building at golden hour', d: 'M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6' },
  { name: 'Manufacturing & B2B', to: '/industries/manufacturing-b2b/', img: IndManufacturing, alt: 'Modern manufacturing facility with fabric rolls', d: 'M3 21V10l6 4V10l6 4V6l6 3v12zM7 17h2M12 17h2M17 17h2' },
  { name: 'Education & Training', to: '/industries/education-training/', img: IndEducation, alt: 'Students walking on a modern campus', d: 'M2 9l10-5 10 5-10 5zM6 11v5c3 2.5 9 2.5 12 0v-5M22 9v6' },
  { name: 'Hospitality & Travel', to: '/industries/hospitality-hotels/', img: IndHospitality, alt: 'Tropical resort pool at dusk', d: 'M3 18c2 0 2-1.5 4.5-1.5S10 18 12 18s2-1.5 4.5-1.5S19 18 21 18M12 14V7M12 7c-1-2.5-4-3-6-2 1.8.4 3.5 1.5 4 3M12 7c1-2.5 4-3 6-2-1.8.4-3.5 1.5-4 3' },
]

const SOLUTIONS = [
  { name: 'SEO & Content Growth', to: '/services/seo/', text: 'Technical SEO and content that compounds.', d: 'M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4-4M8 11h6M11 8v6' },
  { name: 'AI Search (GEO/AEO)', to: '/services/geo-aeo-ai-search/', text: 'Get cited in ChatGPT, Perplexity & AI Overviews.', d: 'M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2zM19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z' },
  { name: 'Local SEO & GBP', to: '/services/local-seo/', text: 'Rank in Google Maps in every city you serve.', d: P.pin },
  { name: 'Google Ads (PPC)', to: '/services/google-ads/', text: 'Campaigns tracked to real enquiries.', d: 'M3 11l15-6v14L3 13zM7 13v5a2 2 0 004 0v-4' },
  { name: 'Website Development', to: '/services/website-design-development/', text: 'Fast, mobile-first sites built to convert.', d: 'M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14' },
]
const MORE_SERVICES = [
  { name: 'Social media marketing', to: '/services/social-media-marketing/' },
  { name: 'AI business automation', to: '/services/ai-business-automation/' },
  { name: 'Corporate photography & video', to: '/services/corporate-photography-video/' },
  { name: 'AI video creation', to: '/services/ai-video-creation/' },
  { name: 'Product photography & design', to: '/services/product-photography-creative-design/' },
]

const STEPS = [
  { t: 'Audit & Discover', p: 'Understand your business, market and opportunities.', d: P.search },
  { t: 'Strategy & Plan', p: 'A customised growth roadmap with clear goals.', d: 'M12 3a9 9 0 100 18 9 9 0 000-18zM12 7a5 5 0 100 10 5 5 0 000-10zM12 11.5v1' },
  { t: 'Implement', p: 'SEO, AI search, Maps, ads and website improvements.', d: 'M12 2l9 5-9 5-9-5zM3 12l9 5 9-5M3 17l9 5 9-5' },
  { t: 'Track & Optimise', p: 'Monitor performance and continuously improve.', d: 'M4 20V10M10 20V4M16 20v-7M22 20H2' },
  { t: 'Grow & Scale', p: 'Build long-term visibility and consistent leads.', d: 'M5 19c1-4 4-7 8-8l3-3c2-2 5-2 5-2s0 3-2 5l-3 3c-1 4-4 7-8 8M9 15l-4 4' },
]

const TX = [
  { b: 'Monthly reports', s: 'Plain-English summary and recommendations.', d: 'M6 3h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2zM8 8h8M8 12h8M8 16h5' },
  { b: 'Progress tracking', s: 'A shared work log: done, next, who and when.', d: 'M9 11l3 3 8-8M20 12v7a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2h9' },
  { b: 'Clear KPIs', s: 'Visibility, calls, forms, Maps actions, lead quality.', d: 'M4 19V5M4 19h16M8 15l3-3 3 2 5-6' },
  { b: 'Strategy reviews', s: 'Monthly calls with agreed next steps in writing.', d: 'M12 3a9 9 0 100 18 9 9 0 000-18zM12 7v5l3 2' },
]

export default function HomeV2({ whatsappHref }) {
  const half = Math.ceil(HOME_FAQS.length / 2)
  const faqCols = [HOME_FAQS.slice(0, half), HOME_FAQS.slice(half)]
  return (
    <div className="hv2 home-v2">
      {/* Hero */}
      <section className="hv2-hero" data-section="hero">
        <div className="hv2-wrap">
          <div>
            <span className="hv2-eyebrow">AI Search · SEO · Lead Generation</span>
            <h1>
              <span className="hv2-kw">{HOME_H1.kw}</span>
              <span className="hv2-sr">: </span>
              <span className="hv2-big">
                {HOME_H1.lead} <span className="hv2-grad">{HOME_H1.grad}</span> {HOME_H1.tail}
              </span>
            </h1>
            <p className="hv2-lead">{HOME_INTRO}</p>
            <div className="hv2-cta-row">
              <a className="hv2-btn hv2-btn--primary" href="#audit" data-cta="hero_growth_audit">Get a Free Growth Audit <span className="hv2-arrow" aria-hidden="true">→</span></a>
              <a className="hv2-btn hv2-btn--ghost" href={whatsappHref} target="_blank" rel="noopener noreferrer" data-track="consultation">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d={P.cal} /></svg>
                Book a Consultation
              </a>
            </div>
            <ul className="hv2-benefits">
              <li><Ico d={P.search} />Be visible<br />on Google &amp; AI</li>
              <li><Ico d={P.people} />Attract<br />qualified leads</li>
              <li><Ico d={P.trend} />Grow<br />revenue</li>
            </ul>
          </div>
          <div className="hv2-visual">
            <div className="hv2-frame">
              <img src={HeroLaptop} width={1280} height={720} fetchPriority="high" alt="Laptop showing a glowing growth dashboard on a dark desk (illustrative)" />
            </div>
            <span className="hv2-tag">Illustrative</span>
            <div className="hv2-chip hv2-chip--1"><Ico d={P.trend} /><span>Organic visibility<small>Tracked monthly</small></span></div>
            <div className="hv2-chip hv2-chip--2"><Ico d={P.chat} /><span>Qualified enquiries<small>Calls · forms · WhatsApp</small></span></div>
          </div>
        </div>
      </section>

      {/* Trust strip: verified facts only */}
      <section className="hv2-trust" aria-label="Verified facts">
        <div className="hv2-wrap">
          <ul>
            <li>
              <span className="hv2-glogo" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>
              </span>
              <a href={GBP_REVIEW_SUMMARY.url} target="_blank" rel="noopener noreferrer"><strong>{GBP_REVIEW_SUMMARY.rating} <span className="hv2-stars" aria-hidden="true">★★★★★</span></strong><small>{GBP_REVIEW_SUMMARY.count} Google reviews · Madurai</small></a>
            </li>
            <li><Ico d={P.cal} /><span><strong>Est. 2021</strong><small>Founded in Madurai</small></span></li>
            <li><Ico d={P.pin} /><span><strong>3 Offices</strong><small>Madurai (HQ) · Thoothukudi · Rawang</small></span></li>
            <li><Ico d={P.globe} /><span><strong>Serving businesses in</strong><small>India · Malaysia · Singapore · UAE</small></span></li>
          </ul>
        </div>
      </section>

      {/* Industries */}
      <section className="hv2-section" data-section="industries">
        <div className="hv2-wrap">
          <div className="hv2-head">
            <div><span className="hv2-eyebrow">Industries we serve</span><h2 className="hv2-h2">Industry-focused growth solutions.</h2></div>
            <p className="hv2-lead">Tailored digital strategies for high-growth business sectors. <Link className="hv2-link" to="/industries/">Explore all industries <span className="hv2-arrow" aria-hidden="true">→</span></Link></p>
          </div>
          <div className="hv2-ind">
            {INDUSTRIES.map((i) => (
              <Link className="hv2-card" to={i.to} key={i.to}>
                <div className="hv2-ph"><img loading="lazy" decoding="async" src={i.img} width={640} height={480} alt={i.alt} /></div>
                <div className="hv2-body"><Ico d={i.d} /><h3>{i.name}</h3><span className="hv2-arrow" aria-hidden="true">→</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions band */}
      <section className="hv2-section hv2-section--flush" data-section="solutions">
        <div className="hv2-wrap">
          <div className="hv2-band dark-zone">
            <div className="hv2-band-grid">
              <div className="hv2-band-head">
                <div>
                  <span className="hv2-eyebrow">Our growth solutions</span>
                  <h2 className="hv2-h2">Integrated digital growth solutions.</h2>
                  <p className="hv2-lead">A results-driven approach to improve visibility, generate qualified leads and grow your business.</p>
                </div>
                <Link className="hv2-link" to="/solutions/">Explore all solutions <span className="hv2-arrow" aria-hidden="true">→</span></Link>
              </div>
              <div className="hv2-tiles">
                {SOLUTIONS.map((s) => (
                  <Link className="hv2-tile" to={s.to} key={s.to}><Ico d={s.d} /><h3>{s.name}</h3><p>{s.text}</p></Link>
                ))}
              </div>
              <div className="hv2-more">
                <span className="hv2-more__label">Also:</span>
                <ul>{MORE_SERVICES.map((m) => <li key={m.to}><Link to={m.to}>{m.name}</Link></li>)}</ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client work (real portfolio data only; replaces the case-study placeholder) */}
      <ClientWork />

      {/* Process */}
      <section className="hv2-section" data-section="process">
        <div className="hv2-wrap">
          <div className="hv2-head" style={{ marginBottom: 0 }}>
            <div><span className="hv2-eyebrow">Our process</span><h2 className="hv2-h2">A clear &amp; proven growth process.</h2></div>
            <p className="hv2-lead">A transparent, strategic and measurable approach, from first audit to scale.</p>
          </div>
          <ol className="hv2-steps">
            {STEPS.map((s, i) => (
              <li key={s.t}><Ico d={s.d} /><div><span className="hv2-num">{String(i + 1).padStart(2, '0')}</span><h3>{s.t}</h3><p>{s.p}</p></div></li>
            ))}
          </ol>
        </div>
      </section>

      {/* Transparency (dashboard is illustrative) */}
      <section className="hv2-section hv2-tx-band" data-section="transparency">
        <div className="hv2-wrap hv2-tx">
          <div>
            <span className="hv2-eyebrow">Transparency</span>
            <h2 className="hv2-h2">You always know what we did, and what&apos;s next.</h2>
            <p className="hv2-lead" style={{ marginTop: 14 }}>Honest reporting from your own accounts. No vanity dashboards, no guaranteed-ranking promises.</p>
            <ul className="hv2-tx-list">
              {TX.map((t) => <li key={t.b}><Ico d={t.d} /><b>{t.b}</b><span>{t.s}</span></li>)}
            </ul>
          </div>
          <div className="hv2-dash" role="img" aria-label="Illustrative reporting dashboard layout, sample only, no real client data">
            <div className="hv2-dash-top"><b>Monthly growth report</b><span className="hv2-tag">Illustrative · demo layout</span></div>
            <div className="hv2-dash-grid">
              <div className="hv2-panel"><span>Organic visibility trend</span>
                <svg className="hv2-trend" viewBox="0 0 300 140" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="hv2g1" x1="0" x2="1"><stop offset="0" stopColor="#a855f7" /><stop offset=".55" stopColor="#5b6cf9" /><stop offset="1" stopColor="#22d3ee" /></linearGradient><linearGradient id="hv2g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5b6cf9" stopOpacity=".3" /><stop offset="1" stopColor="#5b6cf9" stopOpacity="0" /></linearGradient></defs><path d="M0 120 C40 115 60 105 90 100 S140 88 170 80 220 60 250 48 300 25 300 25 V140 H0Z" fill="url(#hv2g2)" /><path d="M0 120 C40 115 60 105 90 100 S140 88 170 80 220 60 250 48 300 25" fill="none" stroke="url(#hv2g1)" strokeWidth="3" strokeLinecap="round" /></svg>
              </div>
              <div className="hv2-panel"><span>Lead sources</span>
                <div className="hv2-donut"><svg width="120" height="120" viewBox="0 0 42 42" aria-hidden="true"><circle cx="21" cy="21" r="15.9" fill="none" stroke="var(--line)" strokeWidth="5" /><circle cx="21" cy="21" r="15.9" fill="none" stroke="#a855f7" strokeWidth="5" strokeDasharray="40 60" strokeDashoffset="25" /><circle cx="21" cy="21" r="15.9" fill="none" stroke="#5b6cf9" strokeWidth="5" strokeDasharray="30 70" strokeDashoffset="-15" /><circle cx="21" cy="21" r="15.9" fill="none" stroke="#22d3ee" strokeWidth="5" strokeDasharray="20 80" strokeDashoffset="-45" /></svg></div>
                <div className="hv2-mini"><div>Search</div><div>Maps</div><div>Ads</div></div>
              </div>
              <div className="hv2-panel" style={{ gridColumn: '1 / -1' }}><span>Work completed vs planned</span>
                <div className="hv2-bars"><div>Technical SEO<i style={{ '--w': '80%' }} /></div><div>Google Business Profile<i style={{ '--w': '65%' }} /></div><div>Content<i style={{ '--w': '50%' }} /></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AuditBlock formId="growth_audit_home" />

      <FounderBlock />

      <div style={{ height: 'clamp(64px,8vw,112px)' }} aria-hidden="true" />
      <ReviewsCarousel />

      {/* Where we work (compact, keeps the Madurai HQ internal links) */}
      <section className="hv2-section" data-section="where-we-work" id="where-we-work">
        <div className="hv2-wrap">
          <div className="hv2-head">
            <div><span className="hv2-eyebrow">Where we work</span><h2 className="hv2-h2">Madurai HQ, with offices in Thoothukudi and Rawang.</h2></div>
            <p className="hv2-lead">Headquartered in Madurai since 2021. Pick your city for local services and contact details.</p>
          </div>
          <div className="hv2-where">
            <div className="hv2-where__box hv2-where__box--hq">
              <h3>Madurai headquarters</h3>
              <p className="hv2-fine" style={{ marginBottom: 14 }}>2nd Floor, 4/3, Srinivasa Perumal Koil St, Kamarajar Salai, Madurai 625009 · {REVIEW_PROOF}</p>
              <ul className="hv2-where__links">
                {HOME_MADURAI_LINKS.map((l) => <li key={l.path}><Link to={l.path}>{l.name}</Link></li>)}
              </ul>
            </div>
            <div className="hv2-where__box hv2-where__markets">
              {HOME_MARKETS.map((m) => (
                <p key={m.key}>
                  <Link to={m.path}>{m.country}</Link>{' · '}
                  {m.cities.filter((c) => c.path !== '/locations/madurai/').slice(0, 6).map((c, i, arr) => (
                    <span key={c.path}><Link to={c.path} style={{ fontWeight: 500 }}>{c.name}</Link>{i < arr.length - 1 ? ', ' : ''}</span>
                  ))}
                  <br />{m.contact}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ: same questions as the FAQPage schema */}
      <section className="hv2-section hv2-section--flush" data-section="faq">
        <div className="hv2-wrap">
          <div style={{ textAlign: 'center' }}><span className="hv2-eyebrow">FAQ</span><h2 className="hv2-h2">Frequently asked questions.</h2></div>
          <div className="hv2-faq-grid">
            {faqCols.map((col, ci) => (
              <div className="hv2-faq-col" key={ci}>
                {col.map((f, i) => (
                  <details key={f.question} open={ci === 0 && i === 0}>
                    <summary>{f.question}</summary>
                    <p>{f.answer}</p>
                  </details>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="hv2-section" data-section="final-cta">
        <div className="hv2-wrap">
          <div className="hv2-final dark-zone">
            <svg className="hv2-wave" viewBox="0 0 1200 300" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="hv2wv" x1="0" x2="1"><stop offset="0" stopColor="#c084fc" /><stop offset="1" stopColor="#22d3ee" /></linearGradient></defs><path d="M0 220 C200 140 380 280 600 200 S1000 120 1200 160" stroke="url(#hv2wv)" strokeWidth="2" fill="none" opacity=".8" /><path d="M0 250 C220 180 420 300 640 230 S1020 160 1200 200" stroke="url(#hv2wv)" strokeWidth="1.5" fill="none" opacity=".5" /></svg>
            <div><h2>Ready to accelerate your business growth?</h2><p>Let&apos;s discuss your goals and create a customised growth plan for your business.</p></div>
            <div className="hv2-cta-row">
              <a className="hv2-btn hv2-btn--ghost" href={whatsappHref} target="_blank" rel="noopener noreferrer" data-track="consultation">Book a Consultation</a>
              <a className="hv2-btn hv2-btn--white" href="#audit" data-cta="final_growth_audit">Get a Free Growth Audit <span className="hv2-arrow" aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
