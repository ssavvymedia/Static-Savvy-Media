/* Inline each prerendered page's critical CSS and load the full stylesheet without blocking render.
 * Runs after prerender-heads.mjs inside `vite build`. Beasties keeps only the rules whose selectors
 * match the page's server-rendered markup; theme/state rules toggled by JS are always kept so the
 * light theme, open menus and the scrolled header never flash unstyled. */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import Beasties from 'beasties'
import { PurgeCSS } from 'purgecss'

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist')
const files = []
const walk = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f)
    if (statSync(p).isDirectory()) { if (f !== 'assets') walk(p) }
    else if (f === 'index.html') files.push(p)
  }
}
walk(DIST)

/* 1) Drop CSS rules no page or script can use. Content = every built HTML page + every JS chunk
 * (class names survive minification as string literals). Classes built from template strings
 * (`foo--${variant}`) are found in src/ and kept by prefix; theme/state selectors are always kept. */
const SRC = join(DIST, '..', 'src')
const srcFiles = []
const walkSrc = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) walkSrc(p); else if (/\.(jsx?|tsx?)$/.test(f)) srcFiles.push(p) } }
walkSrc(SRC)
const prefixes = new Set()
for (const f of srcFiles) for (const m of readFileSync(f, 'utf8').matchAll(/([a-zA-Z0-9_-]+(?:--|__|-))\$\{/g)) prefixes.add(m[1])
const esc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const dynamic = [...prefixes].map((p) => new RegExp(`(^|[^a-zA-Z0-9_-])${esc(p)}`))
const cssFiles = readdirSync(join(DIST, 'assets')).filter((f) => f.endsWith('.css')).map((f) => join(DIST, 'assets', f))
const jsFiles = readdirSync(join(DIST, 'assets')).filter((f) => f.endsWith('.js')).map((f) => join(DIST, 'assets', f))
for (const css of cssFiles) {
  const before = readFileSync(css, 'utf8')
  const [res] = await new PurgeCSS().purge({
    content: [...files, ...jsFiles, join(DIST, '404.html'), ...srcFiles],
    css: [{ raw: before }],
    defaultExtractor: (c) => c.match(/[A-Za-z0-9_:/-]+/g) || [],
    variables: false,
    keyframes: false,
    fontFace: false,
    safelist: {
      standard: [/^is-/, /^has-/, 'active', 'open', 'menu-open', 'visible', 'show', 'html', 'body', ':root'],
      deep: [/data-theme/, /--scrolled/, /is-[a-z]+/, /--open/, /--active/, /--visible/, /hidden/],
      greedy: [/data-theme/, /aria-/, /data-/, ...dynamic],
    },
  })
  writeFileSync(css, res.css)
  console.log(`critical-css: purged ${css.split('/').pop()} ${Math.round(before.length / 1024)} KB → ${Math.round(res.css.length / 1024)} KB (${prefixes.size} dynamic prefixes kept).`)
}

const beasties = new Beasties({
  path: DIST,
  publicPath: '/',
  preload: 'media',
  noscriptFallback: true,
  inlineFonts: false,
  preloadFonts: false,
  pruneSource: false,
  reduceInlineStyles: false,
  mergeStylesheets: true,
  compress: true,
  logLevel: 'warn',
  allowRules: [/data-theme/, /is-[a-z]+/, /--open/, /menu-open/, /--scrolled/, /\.active/, /visible/, /mobile-nav/, /:root/, /^html/, /^body/, /@font-face/],
})

let done = 0, bytes = 0
for (const f of files) {
  const html = readFileSync(f, 'utf8')
  if (!/<div id="root"[^>]*>\s*<[a-z]/i.test(html)) continue // no server-rendered body: keep the blocking stylesheet
  const out = await beasties.process(html)
  const m = out.match(/<style>([\s\S]*?)<\/style>/)
  bytes += m ? m[1].length : 0
  writeFileSync(f, out)
  done++
}
console.log(`critical-css: inlined critical CSS in ${done}/${files.length} pages (avg ${Math.round(bytes / Math.max(done, 1) / 1024)} KB).`)
