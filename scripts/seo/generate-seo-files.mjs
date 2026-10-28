#!/usr/bin/env node
/**
 * Generates the routing + crawl files for the production host (Vercel):
 *
 *   vercel.json         explicit rewrites for every real route (direct loads return 200),
 *                       301s for duplicate/alias URLs and legacy URLs, and a no-slash -> slash
 *                       redirect for real routes. Anything else is a real 404 (public/404.html).
 *   public/sitemap.xml  www host, trailing-slash URLs, aliases removed, Sanity posts included.
 *   public/robots.txt   Sitemap line on the www host.
 *
 * Inputs:
 *   src/routes/AppRoutes.jsx          every <Route path="..."> (the router is the source of truth)
 *   scripts/seo/legacy-redirects.csv  legacy URL map (rows with action=redirect become 301s)
 *   Sanity (public CDN, read-only)    blog posts for the sitemap; falls back to
 *                                     scripts/seo/sanity-posts.json when offline
 *
 * Usage:
 *   npm run seo:generate            # rewrite the three files
 *   npm run seo:check               # exit 1 if vercel.json is out of date with the router/CSV
 *
 * Run it after adding or removing a non-blog route, or publishing a Sanity post you want in the
 * sitemap. Blog posts are listed explicitly (unknown /blog/<x>/ paths 404), so a newly published
 * Sanity post needs `npm run seo:generate` (refreshes scripts/seo/sanity-posts.json) and a deploy.
 * --check uses the committed snapshot so it is deterministic.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const HOST = 'https://www.staticsavvymedia.com'
const SANITY_PROJECT = process.env.VITE_SANITY_PROJECT_ID || 'o6wiaocb'
const SANITY_DATASET = process.env.VITE_SANITY_DATASET || 'production'
const CHECK = process.argv.includes('--check')

const slash = (p) => (p.endsWith('/') ? p : `${p}/`)
const read = (rel) => readFileSync(join(ROOT, rel), 'utf8')

/* Router routes that duplicate another page (same component, canonical already points to the
 * target). Served as permanent redirects instead of second copies. */
const ALIASES = {
  '/pricing/india/social-media-marketing': '/pricing/india/social-media',
  '/pricing/india/website-design-development': '/pricing/india/website',
  '/pricing/malaysia/social-media-marketing': '/pricing/malaysia/social-media',
  '/pricing/malaysia/website-design-development': '/pricing/malaysia/website',
  '/blog/seo': '/blog/seo-agency-madurai-complete-guide',
  '/blog/geo-aeo': '/blog/what-is-generative-engine-optimization',
}

/* Sitemap changefreq/priority (kept from the original hand-written sitemap). First match wins. */
const SITEMAP_RULES = [
  [/^\/$/, 'weekly', '1.0'],
  [/^\/about$/, 'monthly', '0.7'],
  [/^\/about\//, 'monthly', '0.5'],
  [/^\/services$/, 'weekly', '0.9'],
  [/^\/services\/(corporate-photography-video|ai-video-creation|product-photography-creative-design)$/, 'weekly', '0.7'],
  [/^\/services\//, 'weekly', '0.8'],
  [/^\/locations/, 'weekly', '0.8'],
  [/^\/industries$/, 'weekly', '0.7'],
  [/^\/industries\//, 'weekly', '0.6'],
  [/^\/pricing\/india$/, 'weekly', '0.8'],
  [/^\/pricing\/india\//, 'weekly', '0.7'],
  [/^\/pricing\/malaysia$/, 'weekly', '0.7'],
  [/^\/pricing\/malaysia\//, 'weekly', '0.6'],
  [/^\/case-studies$/, 'monthly', '0.6'],
  [/^\/case-studies\//, 'monthly', '0.5'],
  [/^\/blog$/, 'weekly', '0.7'],
  [/^\/blog\//, 'monthly', '0.6'],
  [/^\/contact$/, 'monthly', '0.7'],
  [/^\/faq$/, 'monthly', '0.5'],
  [/^\/(privacy-policy|terms)$/, 'yearly', '0.3'],
  [/^\/sitemap$/, 'monthly', '0.3'],
]

function parseCsv(text) {
  const rows = []
  let row = [], field = '', q = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (q) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++ }
      else if (c === '"') q = false
      else field += c
    } else if (c === '"') q = true
    else if (c === ',') { row.push(field); field = '' }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      row.push(field); field = ''
      if (row.some((v) => v !== '')) rows.push(row)
      row = []
    } else field += c
  }
  if (field || row.length) { row.push(field); rows.push(row) }
  const [head, ...body] = rows
  return body.map((r) => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ''])))
}

function fail(msg) {
  console.error(`seo:generate: ${msg}`)
  process.exit(1)
}

/* ---------- routes ---------- */
const routes = [...read('src/routes/AppRoutes.jsx').matchAll(/path="([^"]+)"/g)].map((m) => m[1])
const pages = routes.filter((p) => p !== '*' && !p.includes(':') && !(p in ALIASES))
if (!routes.includes('/blog/:slug')) fail('expected a /blog/:slug route in AppRoutes.jsx')
const isPage = (p) => p === '/' || pages.includes(p.replace(/\/$/, ''))

/* ---------- Sanity posts ---------- */
async function loadPosts() {
  const snapshot = 'scripts/seo/sanity-posts.json'
  const query = '*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc){"slug": slug.current, _updatedAt}'
  const url = `https://${SANITY_PROJECT}.apicdn.sanity.io/v2024-01-01/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`
  if (CHECK) return JSON.parse(read(snapshot))
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(15000) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const posts = (await res.json()).result
    writeFileSync(join(ROOT, snapshot), `${JSON.stringify(posts, null, 2)}\n`)
    return posts
  } catch (err) {
    console.warn(`Sanity fetch failed (${err.message}); using ${snapshot}`)
    return JSON.parse(read(snapshot))
  }
}

const posts = await loadPosts()
const cleanSlug = (s) => String(s || '').trim().replace(/^\/+|\/+$/g, '')
const blogPosts = posts
  .map((p) => ({ path: `/blog/${cleanSlug(p.slug)}`, lastmod: (p._updatedAt || '').slice(0, 10), raw: p.slug }))
  .filter((p) => /^\/blog\/[a-z0-9-]+$/.test(p.path) && !pages.includes(p.path) && !(p.path in ALIASES))

const blogSlugPaths = blogPosts.map((b) => b.path)

// Only known blog posts (Sanity snapshot) are served; any other /blog/<x>/ is a real 404.
const isBlogSlug = (p) => blogSlugPaths.includes(p.replace(/\/$/, ''))

/* ---------- redirects ---------- */
const legacy = parseCsv(read('scripts/seo/legacy-redirects.csv')).filter((r) => r.action === 'redirect')
const redirects = []
const seen = new Set()
function addRedirect(source, destination, why) {
  const key = source.replace(/\/$/, '') || '/'
  if (seen.has(key)) fail(`duplicate redirect source ${source}`)
  seen.add(key)
  if (key !== '/' && isPage(key)) fail(`redirect source ${source} is a live page (${why})`)
  if (isBlogSlug(key) && !(key in ALIASES)) fail(`redirect source ${source} would shadow a blog post (${why})`)
  if (key.includes('?')) fail(`query-string sources are not supported: ${source}`)
  const dest = slash(destination)
  if (!isPage(dest) && !isBlogSlug(dest)) fail(`redirect target ${dest} for ${source} is not a live page`)
  // "{/}?" matches with and without the trailing slash, so old links get ONE hop to the target.
  redirects.push({ source: `${key}{/}?`, destination: dest, statusCode: 301 })
}
for (const [from, to] of Object.entries(ALIASES)) addRedirect(from, to, 'alias')
for (const r of legacy) addRedirect(r.legacy_path, r.target, 'legacy')
for (const r of redirects) {
  if (seen.has(r.destination.replace(/\/$/, ''))) fail(`redirect chain: ${r.source} -> ${r.destination}`)
}
// Real pages: /about -> /about/ (the form used by canonicals, the sitemap and internal links).
// Unknown no-slash paths are NOT redirected; they 404 directly.
for (const p of pages) if (p !== '/') redirects.push({ source: p, destination: slash(p), statusCode: 308 })
for (const b of blogSlugPaths) redirects.push({ source: b, destination: slash(b), statusCode: 308 })

/* Unlisted pages (/p/...): served, but noindex,nofollow via header and never in the sitemap. */
const UNLISTED = (p) => p.startsWith('/p/')

const vercel = {
  $schema: 'https://openapi.vercel.sh/vercel.json',
  headers: [
    /* Vite's content-hashed build files never change under the same name: cache them for a year. */
    { source: '/assets/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    { source: '/p/(.*)', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
  ],
  redirects,
  // Only real routes are rewritten to the SPA shell. Static files (assets, sitemap.xml,
  // robots.txt, favicons) are served first by the filesystem and are never rewritten.
  rewrites: [
    ...pages.filter((p) => p !== '/').map((p) => ({ source: slash(p), destination: '/index.html' })),
    ...blogSlugPaths.map((b) => ({ source: slash(b), destination: '/index.html' })),
  ],
}
const vercelJson = `${JSON.stringify(vercel, null, 2)}\n`

if (CHECK) {
  const current = read('vercel.json')
  if (current !== vercelJson) fail('vercel.json is out of date. Run `npm run seo:generate` and commit the result.')
  console.log(`vercel.json is up to date (${vercel.rewrites.length} rewrites, ${redirects.length} redirects).`)
  process.exit(0)
}

/* ---------- sitemap.xml ---------- */
const rule = (p) => SITEMAP_RULES.find(([re]) => re.test(p)) || fail(`no sitemap rule for ${p}`)
const entry = (p, lastmod) => {
  const [, freq, prio] = rule(p)
  return `  <url><loc>${HOST}${slash(p)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}<changefreq>${freq}</changefreq><priority>${prio}</priority></url>`
}
const lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<!-- Generated by scripts/seo/generate-seo-files.mjs (npm run seo:generate). Do not edit by hand. -->', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
let group = null
for (const p of pages.filter((x) => !UNLISTED(x))) {
  const g = p === '/' ? '/' : p.split('/')[1] + (p.startsWith('/pricing/malaysia') ? '-my' : '')
  if (group !== null && g !== group) lines.push('')
  group = g
  lines.push(entry(p))
  if (p === pages.filter((x) => x.startsWith('/blog')).at(-1) && blogPosts.length) {
    lines.push('  <!-- Sanity CMS posts (rendered by /blog/:slug); lastmod = Sanity _updatedAt -->')
    for (const b of blogPosts) lines.push(entry(b.path, b.lastmod))
  }
}
lines.push('</urlset>', '')
const sitemap = lines.join('\n')
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
if (new Set(locs).size !== locs.length) fail('duplicate URLs in sitemap')

/* ---------- robots.txt ---------- */
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${HOST}/sitemap.xml\n`

writeFileSync(join(ROOT, 'vercel.json'), vercelJson)
writeFileSync(join(ROOT, 'public/sitemap.xml'), sitemap)
writeFileSync(join(ROOT, 'public/robots.txt'), robots)
const legacyCount = legacy.length
console.log(`vercel.json: ${vercel.rewrites.length} rewrites, ${redirects.length} redirects (${Object.keys(ALIASES).length} alias + ${legacyCount} legacy 301s, ${pages.length - 1} slash 308s + blog post 308s)`)
console.log(`sitemap.xml: ${locs.length} URLs (${pages.length} routes + ${blogPosts.length} Sanity posts)`)
const fixed = blogPosts.filter((b) => b.raw !== cleanSlug(b.raw))
if (fixed.length) console.log(`note: Sanity slug(s) with stray slashes, fix in Sanity Studio: ${fixed.map((b) => JSON.stringify(b.raw)).join(', ')}`)
