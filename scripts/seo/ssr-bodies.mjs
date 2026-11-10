/**
 * Build-time server render of the routes in src/data/ssrRoutes.js. Returns
 * Map(route -> { html, app, schema }): html is the page component's own markup (used for H1/FAQ
 * extraction), app is the full <App /> markup (layout + header + page + footer) that ships inside
 * #root so main.jsx can hydrateRoot() it with no visible flash or layout shift, and schema is a JSON-LD @graph built only from that render plus site constants.
 * A page that fails to render or has no H1 is skipped with a build warning and ships as the plain shell.
 */
import { renderToString } from 'react-dom/server'
import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'
import { ORG_SAME_AS, GBP_MAPS } from '../../src/data/sameAs.js'
import { founderId, founderPerson } from '../../src/data/founder.js'

const HOST = 'https://www.staticsavvymedia.com'
const PHONE = '+91 99440 40345'
const ORG_ID = `${HOST}/#organization`
const EMAIL = 'info@staticsavvymedia.com'
const SANITY_PROJECT = process.env.VITE_SANITY_PROJECT_ID || 'o6wiaocb'
const SANITY_DATASET = process.env.VITE_SANITY_DATASET || 'production'
const decode = (s) => s.replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()

/* Text of every element whose class list has a token ending in `suffix` (React output is well-formed,
 * so matching the close tag by counting same-name open/close tags is reliable). */
function textsByClassSuffix(html, suffix) {
  const out = []
  const re = /<([a-z0-9]+)\b[^>]*\bclass="([^"]*)"[^>]*>/g
  let m
  while ((m = re.exec(html))) {
    if (!m[2].split(/\s+/).some((c) => [].concat(suffix).some((x) => c.endsWith(x)))) continue
    const tag = m[1]
    const tagRe = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'g')
    tagRe.lastIndex = re.lastIndex
    let depth = 1, t, end = html.length
    while ((t = tagRe.exec(html))) {
      depth += t[1] ? -1 : 1
      if (depth === 0) { end = t.index; break }
    }
    out.push(decode(html.slice(re.lastIndex, end)))
  }
  return out
}

/* Vite SSR emits source asset URLs (/src/assets/...); point them at the hashed files in dist/assets. */
function fixAssets(html, distAssets) {
  return html
    .replace(/<link [^>]*rel="preload"[^>]*\/?>/g, '')
    .replace(/\/src\/assets\/[^"\s,]+/g, (u) => {
      const base = u.split('/').pop()
      const dot = base.lastIndexOf('.')
      const stem = base.slice(0, dot), ext = base.slice(dot)
      const hit = distAssets.find((f) => f.startsWith(`${stem}-`) && f.endsWith(ext) && f.length === stem.length + 9 + ext.length)
      if (!hit) throw new Error(`ssr-bodies: no built asset for ${u}`)
      return `/assets/${hit}`
    })
}

export async function ssrBodies(root, distAssets) {
  const vite = await createServer({ root, mode: 'production', logLevel: 'error', server: { middlewareMode: true, hmr: false, watch: null, ws: false }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] } })
  const out = new Map()
  try {
    const { ssrRoutes } = await vite.ssrLoadModule('/src/data/ssrRoutes.js')
    const { getBreadcrumbLabel } = await vite.ssrLoadModule('/src/data/navigation.js')
    const C = await vite.ssrLoadModule('/src/utils/constants.js')
    const App = (await vite.ssrLoadModule('/src/App.jsx')).default
    /* The unlisted /p/ price pages are code-split (prices kept out of the main bundle): load that chunk
     * first so the full-app render includes the page, matching the client, which preloads before hydrating. */
    await (await vite.ssrLoadModule('/src/pages/Pricing/countryPricingLoader.js')).preloadCountryPricing()
    await (await vite.ssrLoadModule('/src/pages/Portfolio/portfolioLoader.js')).preloadPortfolio()
    /* Full-app render: must match what the client renders on its first pass (hydrateRoot). */
    /* Route pages are code-split (src/routes/lazyPage.js): resolve every page chunk first so the
     * full-app render is synchronous, and record which page modules each route rendered. */
    const { preloadAllPages, renderedPageModules } = await vite.ssrLoadModule('/src/routes/lazyPage.js')
    await preloadAllPages()
    let lastPages = []
    const renderApp = (route) => {
      renderedPageModules.clear()
      const html = fixAssets(renderToString(React.createElement(MemoryRouter, { initialEntries: [route] }, React.createElement(App))), distAssets)
      lastPages = [...renderedPageModules]
      return html
    }
    try { out.set('/', { app: renderApp('/'), pages: lastPages }) } catch (e) { console.warn(`ssr-bodies: home app render skipped: ${String(e?.message || e).slice(0, 300)}`) }
    const madurai = {
      '@type': 'ProfessionalService', '@id': `${HOST}/locations/madurai/#localbusiness`, name: 'Static Savvy Media', url: `${HOST}/locations/madurai/`, telephone: PHONE,
      address: { '@type': 'PostalAddress', streetAddress: '2nd Floor, 4/3, Srinivasa Perumal Koil St, Kamarajar Salai', addressLocality: 'Madurai', addressRegion: 'Tamil Nadu', postalCode: '625009', addressCountry: 'IN' },
      hasMap: GBP_MAPS.madurai, parentOrganization: { '@id': ORG_ID },
    }
    const malaysia = {
      '@type': 'ProfessionalService', '@id': `${HOST}/locations/malaysia/#localbusiness`, name: C.MALAYSIA_OFFICE.name, url: `${HOST}/locations/malaysia/`,
      address: C.MALAYSIA_POSTAL_ADDRESS, telephone: C.MALAYSIA_OFFICE.phoneE164, hasMap: GBP_MAPS.malaysia, parentOrganization: { '@id': ORG_ID },
    }
    for (const r of ssrRoutes) {
     /* One page failing to render must not strip the crawlable body from every other route:
      * skip it (it ships as the plain shell, as before) and say so in the build log. */
     try {
      const mod = await vite.ssrLoadModule(r.module)
      const Page = mod.default
      let raw
      try {
        raw = renderToString(React.createElement(MemoryRouter, { initialEntries: [r.route] }, React.createElement(Page, r.props || null)))
      } catch (e) {
        throw new Error(`${r.route}: ${e.message.slice(0, 160)} [Page=${typeof Page} keys=${Object.keys(mod).join(',')} MemoryRouter=${typeof MemoryRouter} react=${React.version}]`)
      }
      const html = fixAssets(raw, distAssets)
      const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)
      if (!h1) throw new Error(`ssr-bodies: no <h1> rendered for ${r.route}`)
      const qs = textsByClassSuffix(html, ['faq__question', 'faq-section__question', 'faq-item__question']), as = textsByClassSuffix(html, ['faq__answer', 'faq-section__answer', 'faq-item__answer'])
      if (qs.length !== as.length) throw new Error(`ssr-bodies: ${qs.length} FAQ questions vs ${as.length} answers on ${r.route}`)
      const faqs = qs.map((q, i) => ({ q, a: as[i] })).filter((f) => f.q && f.a)
      const segs = r.route.split('/').filter(Boolean)
      /* Unmapped slugs (blog posts etc.) would show the raw slug: use the page H1 for the last crumb. */
      const crumbName = (s, i) => { const l = getBreadcrumbLabel(s); return l === s && i === segs.length - 1 ? decode(h1[1]) : l }
      const crumbs = [{ name: 'Home', path: '/' }, ...segs.map((s, i) => ({ name: crumbName(s, i), path: `/${segs.slice(0, i + 1).join('/')}/` }))]
      const biz = r.office === 'madurai' ? madurai : r.office === 'org' ? null : malaysia
      const isAbout = r.kind === 'about'
      const crumbList = { '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: `${HOST}${c.path}` })) }
      const org = { '@type': 'Organization', '@id': ORG_ID, name: 'Static Savvy Media', url: `${HOST}/`, telephone: PHONE, email: EMAIL, sameAs: ORG_SAME_AS, founder: { '@id': founderId(HOST) } }
      const person = founderPerson(HOST)
      /* 'article' = guide post (no Service claim); 'page' = hub/utility page (WebPage subtype, e.g. CollectionPage, ContactPage). */
      const nodes = r.kind === 'article' ? [org, crumbList]
        : r.kind === 'page' ? [
          { '@type': r.pageType || 'WebPage', '@id': `${HOST}${r.route}#webpage`, name: decode(h1[1]), url: `${HOST}${r.route}`, isPartOf: { '@type': 'WebSite', '@id': `${HOST}/#website`, url: `${HOST}/`, name: 'Static Savvy Media' }, about: { '@id': ORG_ID }, publisher: { '@id': ORG_ID } },
          ...(r.extraNodes || []),
          ...(r.office && biz ? [biz] : []),
          org,
          ...(r.noCrumbs ? [] : [crumbList]),
        ]
        : isAbout ? [
        { '@type': 'AboutPage', '@id': `${HOST}${r.route}#webpage`, name: decode(h1[1]), url: `${HOST}${r.route}`, about: { '@id': ORG_ID }, mainEntity: { '@id': ORG_ID } },
        { '@type': 'Organization', '@id': ORG_ID, name: 'Static Savvy Media', url: `${HOST}/`, telephone: PHONE, email: EMAIL, sameAs: ORG_SAME_AS, foundingDate: '2021-10-01', foundingLocation: { '@type': 'Place', name: 'Madurai, Tamil Nadu, India' }, founder: { '@id': `${HOST}/about/deepan-kanz/#person` }, areaServed: [{ '@type': 'City', name: 'Madurai' }, { '@type': 'City', name: 'Thoothukudi' }, { '@type': 'Country', name: 'Malaysia' }], subOrganization: [{ '@id': madurai['@id'] }, { '@id': malaysia['@id'] }] },
        person,
        madurai,
        malaysia,
        { '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: `${HOST}${c.path}` })) },
      ] : [
        { '@type': 'Service', name: r.service || decode(h1[1]), serviceType: r.serviceType, provider: { '@id': biz ? biz['@id'] : ORG_ID }, areaServed: r.area, url: `${HOST}${r.route}` },
        ...(biz ? [biz] : []),
        org,
        { '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: `${HOST}${c.path}` })) },
      ]
      if (r.route.startsWith('/blog/') && r.kind !== 'page') {
        const slug = segs[segs.length - 1]
        nodes.push({ '@type': r.kind === 'article' ? 'Article' : 'BlogPosting', headline: decode(h1[1]), image: `${HOST}/og/blog/${slug}.jpg`, url: `${HOST}${r.route}`, mainEntityOfPage: `${HOST}${r.route}`, datePublished: r.published || '2026-10-24', dateModified: r.modified || r.published || '2026-10-24', author: { '@id': founderId(HOST) }, publisher: { '@id': ORG_ID } })
        if (!nodes.includes(person)) nodes.push(person)
      }
      /* Founder Person node: profile page (mainEntity), and any page that shows the founder block or byline. */
      if (r.pageType === 'ProfilePage') nodes[0].mainEntity = { '@id': founderId(HOST) }
      if (!nodes.includes(person) && (r.pageType === 'ProfilePage' || /hv2-founder|city-founder|author-box--founder/.test(html))) nodes.push(person)
      if (faqs.length) nodes.push({ '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) })
      let app = null
      try { app = renderApp(r.route) } catch (e) { console.warn(`ssr-bodies: ${r.route} full-app render failed, shipping page body only: ${String(e?.message || e).slice(0, 200)}`) }
      out.set(r.route, { html: `<main data-prerender="ssr">${html}</main>`, app, pages: app ? lastPages : [], schema: { '@context': 'https://schema.org', '@graph': nodes }, h1: decode(h1[1]), faqCount: faqs.length })
     } catch (e) {
      console.warn(`ssr-bodies: skipped ${r.route} (ships as plain shell): ${String(e?.message || e).slice(0, 300)}`)
     }
    }
    /* Sanity CMS posts (/blog/:slug): fetch each published post at build time and server-render the
     * real BlogPost page with it, so the raw HTML carries the H1, full body, FAQs and JSON-LD.
     * `preload` ships as window.__SSM_POST__ so the client hydrates the same markup without refetching.
     * A failed fetch only drops the bodies (posts then ship as the plain shell, as before). */
    try {
      const { BLOG_POST_FIELDS, blogPostSchema, bodyWordCount } = await vite.ssrLoadModule('/src/utils/blogPostSchema.js')
      const { urlFor } = await vite.ssrLoadModule('/src/utils/sanityClient.js')
      const { applySanityOverride } = await vite.ssrLoadModule('/src/data/blogOverrides.js')
      const q = `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]{ ${BLOG_POST_FIELDS} }`
      const res = await fetch(`https://${SANITY_PROJECT}.apicdn.sanity.io/v2024-01-01/data/query/${SANITY_DATASET}?query=${encodeURIComponent(q)}`, { signal: AbortSignal.timeout(20000) })
      if (!res.ok) throw new Error(`Sanity HTTP ${res.status}`)
      for (const raw of (await res.json()).result || []) {
        const slug = String(raw.slug || '').trim().replace(/^\/+|\/+$/g, '')
        if (!slug || !raw.title) continue
        const route = `/blog/${slug}/`
        try {
          globalThis.__SSM_POST__ = raw
          const app = renderApp(route)
          const h1 = app.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)
          if (!h1 || /not found/i.test(h1[1])) throw new Error('no post <h1> rendered')
          const post = applySanityOverride(raw)
          const schema = blogPostSchema(post, post.mainImage ? urlFor(post.mainImage).width(1200).url() : undefined)
          out.set(route, { app, pages: lastPages, html: '', schema, preload: raw, h1: decode(h1[1]), words: bodyWordCount(raw.body) })
        } catch (e) {
          console.warn(`ssr-bodies: Sanity post ${route} skipped (ships as plain shell): ${String(e?.message || e).slice(0, 200)}`)
        } finally {
          delete globalThis.__SSM_POST__
        }
      }
    } catch (e) {
      console.warn(`ssr-bodies: Sanity posts not prerendered: ${String(e?.message || e).slice(0, 200)}`)
    }
  } finally {
    await vite.close()
  }
  return out
}
