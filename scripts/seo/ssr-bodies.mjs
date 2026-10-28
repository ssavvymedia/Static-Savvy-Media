/**
 * Build-time server render of the routes in src/data/ssrRoutes.js. Returns
 * Map(route -> { html, schema }) where html is the page component's own markup (React's createRoot()
 * replaces it on load) and schema is a JSON-LD @graph built only from that render plus site constants.
 * Throws if a page has no H1, so a broken render fails the build instead of shipping empty HTML.
 */
import { renderToString } from 'react-dom/server'
import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'

const HOST = 'https://www.staticsavvymedia.com'
const PHONE = '+91 99440 40345'
const ORG_ID = `${HOST}/#organization`
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
    const madurai = {
      '@type': 'ProfessionalService', '@id': `${HOST}/locations/madurai/#localbusiness`, name: 'Static Savvy Media', url: `${HOST}/locations/madurai/`, telephone: PHONE,
      address: { '@type': 'PostalAddress', streetAddress: '2nd Floor, 4/3, Srinivasa Perumal Koil St, Kamarajar Salai', addressLocality: 'Madurai', addressRegion: 'Tamil Nadu', postalCode: '625009', addressCountry: 'IN' },
      parentOrganization: { '@id': ORG_ID },
    }
    const malaysia = {
      '@type': 'ProfessionalService', '@id': `${HOST}/locations/malaysia/#localbusiness`, name: C.MALAYSIA_OFFICE.name, url: `${HOST}/locations/malaysia/`,
      address: C.MALAYSIA_POSTAL_ADDRESS, parentOrganization: { '@id': ORG_ID },
    }
    for (const r of ssrRoutes) {
      const mod = await vite.ssrLoadModule(r.module)
      const Page = mod.default
      let raw
      try {
        raw = renderToString(React.createElement(MemoryRouter, { initialEntries: [r.route] }, React.createElement(Page)))
      } catch (e) {
        throw new Error(`${r.route}: ${e.message.slice(0, 160)} [Page=${typeof Page} keys=${Object.keys(mod).join(',')} MemoryRouter=${typeof MemoryRouter} react=${React.version}]`)
      }
      const html = fixAssets(raw, distAssets)
      const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)
      if (!h1) throw new Error(`ssr-bodies: no <h1> rendered for ${r.route}`)
      const qs = textsByClassSuffix(html, ['faq__question', 'faq-section__question']), as = textsByClassSuffix(html, ['faq__answer', 'faq-section__answer'])
      if (qs.length !== as.length) throw new Error(`ssr-bodies: ${qs.length} FAQ questions vs ${as.length} answers on ${r.route}`)
      const faqs = qs.map((q, i) => ({ q, a: as[i] })).filter((f) => f.q && f.a)
      const segs = r.route.split('/').filter(Boolean)
      const crumbs = [{ name: 'Home', path: '/' }, ...segs.map((s, i) => ({ name: getBreadcrumbLabel(s), path: `/${segs.slice(0, i + 1).join('/')}/` }))]
      const biz = r.office === 'madurai' ? madurai : malaysia
      const isAbout = r.kind === 'about'
      const nodes = isAbout ? [
        { '@type': 'AboutPage', '@id': `${HOST}${r.route}#webpage`, name: decode(h1[1]), url: `${HOST}${r.route}`, about: { '@id': ORG_ID }, mainEntity: { '@id': ORG_ID } },
        { '@type': 'Organization', '@id': ORG_ID, name: 'Static Savvy Media', url: `${HOST}/`, telephone: PHONE, foundingDate: '2021-10-01', foundingLocation: { '@type': 'Place', name: 'Madurai, Tamil Nadu, India' }, founder: { '@id': `${HOST}/about/deepan-kanz/#person` }, areaServed: [{ '@type': 'City', name: 'Madurai' }, { '@type': 'City', name: 'Thoothukudi' }, { '@type': 'Country', name: 'Malaysia' }], subOrganization: [{ '@id': madurai['@id'] }, { '@id': malaysia['@id'] }] },
        { '@type': 'Person', '@id': `${HOST}/about/deepan-kanz/#person`, name: 'Deepan Kanz', jobTitle: 'Founder', url: `${HOST}/about/deepan-kanz/`, worksFor: { '@id': ORG_ID } },
        madurai,
        malaysia,
        { '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: `${HOST}${c.path}` })) },
      ] : [
        { '@type': 'Service', name: r.service, serviceType: r.serviceType, provider: { '@id': biz['@id'] }, areaServed: r.area, url: `${HOST}${r.route}`, ...(r.offers ? { offers: r.offers.map(([name, price]) => ({ '@type': 'Offer', name, price: String(price), priceCurrency: 'INR', url: `${HOST}${r.route}`, priceSpecification: { '@type': 'UnitPriceSpecification', price: String(price), priceCurrency: 'INR', unitText: 'MONTH' } })) } : {}) },
        biz,
        { '@type': 'Organization', '@id': ORG_ID, name: 'Static Savvy Media', url: `${HOST}/`, telephone: PHONE },
        { '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: `${HOST}${c.path}` })) },
      ]
      if (r.route.startsWith('/blog/')) {
        const slug = segs[segs.length - 1]
        nodes.push({ '@type': 'BlogPosting', headline: decode(h1[1]), image: `${HOST}/og/blog/${slug}.jpg`, url: `${HOST}${r.route}`, mainEntityOfPage: `${HOST}${r.route}`, datePublished: r.published || '2026-10-24', dateModified: r.published || '2026-10-24', author: { '@type': 'Person', name: 'Deepan Kanz', url: `${HOST}/about/deepan-kanz/` }, publisher: { '@id': ORG_ID } })
      }
      if (faqs.length) nodes.push({ '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) })
      out.set(r.route, { html: `<main data-prerender="ssr">${html}</main>`, schema: { '@context': 'https://schema.org', '@graph': nodes }, h1: decode(h1[1]), faqCount: faqs.length })
    }
  } finally {
    await vite.close()
  }
  return out
}
