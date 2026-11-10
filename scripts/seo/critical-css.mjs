/* Inline each prerendered page's critical CSS and load the full stylesheet without blocking render.
 * Runs after prerender-heads.mjs inside `vite build`. Beasties keeps only the rules whose selectors
 * match the page's server-rendered markup; theme/state rules toggled by JS are always kept so the
 * light theme, open menus and the scrolled header never flash unstyled. */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import Beasties from 'beasties'

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
