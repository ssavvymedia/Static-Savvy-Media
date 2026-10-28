import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import BlogFeaturedImage from '../../components/blog/BlogFeaturedImage.jsx'
import { setSeo } from '../../utils/seo.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, SITE_URL, ORG_SAME_AS } from '../../utils/constants.js'
import { getNewBlogPost, WA, MY_LINE } from '../../data/newBlogPosts.js'
import { getAffiliate, AFFILIATE_REL } from '../../data/affiliateLinks.js'

/* Outbound provider link from the single swap-ready map in src/data/affiliateLinks.js. */
function AffLink({ k, label, button }) {
  const a = getAffiliate(k)
  return (
    <a href={a.url} target="_blank" rel={AFFILIATE_REL} className={button ? 'btn btn--primary blog-aff-btn' : undefined}>
      {label || `Visit ${a.name}`}
    </a>
  )
}

function Cell({ c }) {
  if (c && typeof c === 'object' && c.aff) return <AffLink k={c.aff} label={c.label} />
  return <Rich text={String(c)} />
}

/* Responsive comparison table: scrolls sideways on small screens instead of squashing. */
function Table({ t }) {
  return (
    <div className="blog-table-wrap" role="region" aria-label={t.caption} tabIndex={0}>
      <table className="blog-table">
        <caption>{t.caption}</caption>
        <thead><tr>{t.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
        <tbody>
          {t.rows.map((r, i) => (
            <tr key={i}>{r.map((c, j) => (j === 0 ? <th key={j} scope="row"><Cell c={c} /></th> : <td key={j} data-label={t.head[j]}><Cell c={c} /></td>))}</tr>
          ))}
        </tbody>
      </table>
      {t.note && <p className="blog-table-note"><Rich text={t.note} /></p>}
    </div>
  )
}

/* Renders [label](/path/) as internal links. */
function Rich({ text }) {
  const parts = []
  const re = /\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0, m, i = 0
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    parts.push(<Link key={i++} to={m[2]}>{m[1]}</Link>)
    last = re.lastIndex
  }
  parts.push(text.slice(last))
  return <>{parts}</>
}

export default function StaticBlogPost() {
  const { pathname } = useLocation()
  const post = getNewBlogPost(pathname)
  const url = post ? `${SITE_URL}/blog/${post.slug}/` : ''
  const myRegion = post?.region === 'malaysia'
  const isArticle = post?.kind === 'article'
  const waHref = buildWhatsAppLink(WHATSAPP_NUMBER, post ? `Hi Static Savvy Media, I read "${post.h1}" and would like to discuss my business.` : '')

  useEffect(() => {
    if (!post) return
    const image = `${SITE_URL}/og/blog/${post.slug}.jpg`
    setSeo({
      title: post.title,
      description: post.description,
      canonical: url,
      ogType: 'article',
      ogImage: image,
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': isArticle ? 'Article' : 'BlogPosting', headline: post.h1, description: post.description, image, url, mainEntityOfPage: url, datePublished: post.published || '2026-10-24', dateModified: post.modified || post.published || '2026-10-24', author: { '@type': 'Person', name: 'Deepan Kanz', url: `${SITE_URL}/about/deepan-kanz/` }, publisher: { '@type': 'Organization', name: 'Static Savvy Media', url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.png` } } },
          { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'Static Savvy Media', url: `${SITE_URL}/`, telephone: '+91 99440 40345', email: 'info@staticsavvymedia.com', sameAs: ORG_SAME_AS },
          ...(isArticle ? [] : [myRegion
            ? { '@type': 'ProfessionalService', '@id': `${SITE_URL}/locations/malaysia/#localbusiness`, name: 'Static Savvy Media Malaysia', url: `${SITE_URL}/locations/malaysia/`, telephone: '+60 12-453 7030', address: { '@type': 'PostalAddress', addressLocality: 'Rawang', addressRegion: 'Selangor', addressCountry: 'MY' }, parentOrganization: { '@id': `${SITE_URL}/#organization` } }
            : { '@type': 'ProfessionalService', '@id': `${SITE_URL}/locations/madurai/#localbusiness`, name: 'Static Savvy Media', url: `${SITE_URL}/locations/madurai/`, telephone: '+91 99440 40345', address: { '@type': 'PostalAddress', streetAddress: '2nd Floor, 4/3, Srinivasa Perumal Koil St, Kamarajar Salai', addressLocality: 'Madurai', addressRegion: 'Tamil Nadu', postalCode: '625009', addressCountry: 'IN' }, parentOrganization: { '@id': `${SITE_URL}/#organization` } },
          { '@type': 'Service', name: post.h1, serviceType: 'Digital marketing', provider: { '@id': `${SITE_URL}/locations/${myRegion ? 'malaysia' : 'madurai'}/#localbusiness` }, areaServed: myRegion ? { '@type': 'Country', name: 'Malaysia' } : { '@type': 'State', name: 'Tamil Nadu' }, url }]),
          { '@type': 'FAQPage', mainEntity: post.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
          { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` }, { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog/` }, { '@type': 'ListItem', position: 3, name: post.h1, item: url }] },
        ],
      },
    })
    window.scrollTo(0, 0)
  }, [post, url])

  if (!post) return null

  return (
    <div className="about-template">
      <Breadcrumbs />
      <section className="section">
        <div className="container">
          <header className="blog-post-header">
            <span className="blog-post-header__category">{post.category}</span>
            <h1 className="blog-post-header__title">{post.h1}</h1>
            <p className="blog-post-header__description"><Rich text={post.intro} /></p>
            {post.disclosure && <p className="blog-post-disclosure"><strong>Disclosure:</strong> {post.disclosure}</p>}
            <div className="blog-post-header__meta">
              <span className="blog-post-header__meta-item">Deepan Kanz, Static Savvy Media</span>
              <span className="blog-post-header__meta-item">{post.publishedLabel || '24 October 2026'}</span>
              <span className="blog-post-header__meta-item">{post.locationLabel || (myRegion ? 'Rawang, Selangor, Malaysia' : 'Madurai, Tamil Nadu (HQ)')}</span>
            </div>
          </header>
        </div>
      </section>
      <BlogFeaturedImage slug={post.slug} />
      <section className="section">
        <div className="container">
          <div className="blog-post-content">
            <article className="blog-post-body">
              {post.body.map((b) => (
                <div key={b.h2} id={b.id}>
                  <h2>{b.h2}</h2>
                  {(b.p || []).map((t, i) => <p key={i}><Rich text={t} /></p>)}
                  {b.table && <Table t={b.table} />}
                  {b.list && <ul>{b.list.map((t, i) => <li key={i}><Rich text={t} /></li>)}</ul>}
                  {b.after && b.after.map((t, i) => <p key={`a${i}`}><Rich text={t} /></p>)}
                  {(b.ctas || b.cta) && (
                    <p className="blog-cta-row">
                      {(b.ctas || []).map((c) => <AffLink key={c.aff} k={c.aff} label={c.label} button />)}
                      {b.cta && <Link to={b.cta.to} className="btn btn--ghost">{b.cta.label}</Link>}
                    </p>
                  )}
                  {(b.h3 || []).map((h) => (
                    <div key={h.t}>
                      <h3>{h.t}</h3>
                      <p><Rich text={h.p} /></p>
                    </div>
                  ))}
                </div>
              ))}

              <h2>Talk to Static Savvy Media</h2>
              <p>
                Want this done for your business? WhatsApp us on{' '}
                <a href={waHref} target="_blank" rel="noopener noreferrer">{WA}</a>
                {' '}or call our Malaysia line{' '}
                <a href="tel:+60124537030">{MY_LINE}</a>. Our head office is in Madurai, Tamil Nadu, and our Malaysia team is in Rawang, Selangor.
              </p>

              <h2>Frequently asked questions</h2>
              <div className="faq-section__list">
                {post.faqs.map((f) => (
                  <details className="faq-section__details glass-card" key={f.q}>
                    <summary className="faq-section__question">{f.q}</summary>
                    <p className="faq-section__answer">{f.a}</p>
                  </details>
                ))}
              </div>

              <h2>Related services</h2>
              <ul>
                {post.related.map((r) => <li key={r.to}><Link to={r.to}>{r.label}</Link></li>)}
                <li><Link to="/blog/">More articles on the Static Savvy Media blog</Link></li>
              </ul>
            </article>
          </div>
        </div>
      </section>
      <CTASection
        eyebrow={myRegion ? 'Malaysia: Rawang · Kuala Lumpur · Selangor' : 'Madurai HQ · Tamil Nadu'}
        title="Get More Enquiries From Google, Maps and Social"
        subtitle={`WhatsApp ${WA} or call ${MY_LINE} (Malaysia) for a free consultation.`}
        primaryLabel="WhatsApp for a Free Consultation"
        primaryHref={waHref}
        secondaryLabel="Contact Us"
        secondaryTo="/contact/"
      />
    </div>
  )
}
