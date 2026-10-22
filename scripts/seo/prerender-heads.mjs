#!/usr/bin/env node
/**
 * Post-build step: writes dist/<route>/index.html for every real route in vercel.json, each a
 * copy of dist/index.html whose <head> carries that route's own canonical, og:url and, where
 * src/data/seoConfig.js has an entry, its title, meta description and og/twitter title+description.
 *
 * Why: dist/index.html is the homepage shell (canonical = homepage, Madurai homepage title).
 * Without this step every route's raw HTML told crawlers "canonical = homepage" until JavaScript
 * replaced it. Vercel serves a matching static file before applying rewrites, so these files win;
 * the vercel.json rewrites stay as a fallback to the shell.
 *
 * Runs at the end of `vite build` (plugin in vite.config.js). Fails the build if a route can't be written.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const DIST = join(ROOT, 'dist')
const HOST = 'https://www.staticsavvymedia.com'

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function setTag(html, re, replacement, label, route) {
  if (!re.test(html)) throw new Error(`prerender-heads: ${label} tag not found in dist/index.html (route ${route})`)
  return html.replace(re, replacement)
}

const vite = await createServer({
  root: ROOT,
  configFile: false,
  logLevel: 'error',
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
})
let getSeoForPath, prerenderBodies, renderBodyHtml
try {
  ;({ getSeoForPath } = await vite.ssrLoadModule('/src/data/seoConfig.js'))
  ;({ prerenderBodies, renderBodyHtml } = await vite.ssrLoadModule('/src/data/prerenderBodies.js'))
} finally {
  await vite.close()
}

/* Sanity blog posts (public CDN, read-only): same title/description rules as BlogPost.jsx.
 * If the fetch fails the post shells still get the right canonical, just the default title. */
const SANITY_PROJECT = process.env.VITE_SANITY_PROJECT_ID || 'o6wiaocb'
const SANITY_DATASET = process.env.VITE_SANITY_DATASET || 'production'
const posts = new Map()
try {
  const q = '*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]{"slug": slug.current, title, seoTitle, description, seoDescription}'
  const res = await fetch(
    `https://${SANITY_PROJECT}.apicdn.sanity.io/v2024-01-01/data/query/${SANITY_DATASET}?query=${encodeURIComponent(q)}`,
    { signal: AbortSignal.timeout(15000) },
  )
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  for (const p of (await res.json()).result || []) {
    if (!p.slug || !p.title) continue
    const slug = String(p.slug).trim().replace(/^\/+|\/+$/g, '')
    posts.set(`/blog/${slug}/`, {
      title: p.seoTitle || `${p.title} | Static Savvy Media Blog`,
      description: p.seoDescription || p.description || '',
    })
  }
} catch (err) {
  console.warn(`prerender-heads: Sanity fetch failed (${err.message}); blog post shells keep the default title`)
}

const shell = readFileSync(join(DIST, 'index.html'), 'utf8')
const vercel = JSON.parse(readFileSync(join(ROOT, 'vercel.json'), 'utf8'))
const routes = vercel.rewrites.filter((r) => r.destination === '/index.html').map((r) => r.source)

let withMeta = 0
let withBody = 0
for (const route of routes) {
  if (!route.startsWith('/') || !route.endsWith('/') || route.includes(':') || route.includes('(')) {
    throw new Error(`prerender-heads: unexpected rewrite source ${route}`)
  }
  const url = `${HOST}${route}`
  let html = shell
  html = setTag(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`, 'canonical', route)
  if (/<meta property="og:url"[^>]*>/.test(html)) {
    html = html.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`)
  } else {
    html = html.replace('<meta property="og:type"', `<meta property="og:url" content="${url}" />\n    <meta property="og:type"`)
  }
  const entry = getSeoForPath(route)
  const seo = entry ? { ...entry, ...(entry.seo || {}) } : posts.get(route) || null
  if (seo && seo.title) {
    withMeta++
    const title = esc(seo.title)
    const desc = seo.description ? esc(seo.description) : null
    html = setTag(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`, 'title', route)
    html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${esc(seo.ogTitle || seo.title)}" />`)
    if (desc) {
      html = setTag(html, /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/, `<meta name="description" content="${desc}" />`, 'description', route)
      html = html.replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${esc(seo.ogDescription || seo.description)}" />`)
    }
    if (seo.ogImage) {
      const img = esc(seo.ogImage.replace(/^https?:\/\/[^/]+/, HOST))
      html = html.replace(/<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${img}" />`)
      html = html.replace(/<meta name="twitter:image" content="[^"]*"\s*\/?>/, `<meta name="twitter:image" content="${img}" />`)
    }
  }
  /* Crawlable body + JSON-LD for key routes (src/data/prerenderBodies.js). React's createRoot()
   * replaces #root on load; the runtime setSeo() overwrites the script with the same id. */
  const body = prerenderBodies[route]
  if (body) {
    withBody++
    html = setTag(html, /<div id="root"><\/div>/, `<div id="root">${renderBodyHtml(body)}</div>`, 'root', route)
    const ld = JSON.stringify(body.schema).replace(/</g, '\\u003c')
    html = html.replace('</head>', `  <script type="application/ld+json" id="json-ld-schema">${ld}</script>\n  </head>`)
  }
  const outDir = join(DIST, route)
  mkdirSync(outDir, { recursive: true })
  const out = join(outDir, 'index.html')
  writeFileSync(out, html)
  if (!existsSync(out)) throw new Error(`prerender-heads: failed to write ${out}`)
}
/* Homepage: dist/index.html itself (every other route already has its own file above). */
if (prerenderBodies['/']) {
  let home = setTag(shell, /<div id="root"><\/div>/, `<div id="root">${renderBodyHtml(prerenderBodies['/'])}</div>`, 'root', '/')
  const ld = JSON.stringify(prerenderBodies['/'].schema).replace(/</g, '\\u003c')
  home = home.replace('</head>', `  <script type="application/ld+json" id="json-ld-schema">${ld}</script>\n  </head>`)
  writeFileSync(join(DIST, 'index.html'), home)
  withBody++
}
console.log(`prerender-heads: wrote ${routes.length} route shells (${withMeta} with their own title/description, ${withBody} with crawlable body + JSON-LD).`)
