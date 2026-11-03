/* Diwali Digital Surprise: canvas fireworks engine and the festive Madurai night scene.
 * Original artwork, drawn in code: night sky, temple gopurams lit with lamp dots, palms,
 * a wall of diyas, a rangoli floor, five firecrackers with their own timelines. */
import { ssmPoints } from './data.js'

export const TAU = Math.PI * 2
export const rand = (a, b) => a + Math.random() * (b - a)
export const pick = (a) => a[(Math.random() * a.length) | 0]
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const ease = (k) => 1 - Math.pow(1 - k, 3)
export const REDUCED = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
export const LOWEND = typeof navigator !== 'undefined' && ((navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 3)

export const PAL = {
  gold: ['#FFE9A8', '#F6C453', '#E8A93A', '#FFF6DC', '#F2B84B'],
  violet: ['#B48CFF', '#9B5CFF', '#E2D4FF'],
  blue: ['#7C95FF', '#4F6BFF', '#C6D2FF'],
  cyan: ['#6FF3FF', '#22D3EE', '#C9FBFF'],
  ruby: ['#FF6F9F', '#FF2E6E', '#FFB3C9'],
  white: ['#FFFFFF', '#FFF8E6'],
}
PAL.brand = [...PAL.violet, ...PAL.blue, ...PAL.cyan]
PAL.multi = [...PAL.gold, ...PAL.brand, ...PAL.ruby]

/* SSM gradient: purple -> royal blue -> cyan, bucketed so the glow-sprite cache stays small. */
const BRAND_STOPS = [[0x9b, 0x5c, 0xff], [0x4f, 0x5b, 0xff], [0x22, 0xd3, 0xee]]
const BRAND_BUCKETS = Array.from({ length: 12 }, (_, i) => {
  const t = i / 11, seg = t < 0.5 ? 0 : 1, k = seg === 0 ? t / 0.5 : (t - 0.5) / 0.5
  const a = BRAND_STOPS[seg], b = BRAND_STOPS[seg + 1]
  const c = a.map((v, j) => Math.round(v + (b[j] - v) * k))
  return '#' + c.map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase()
})
export const brandCol = (t) => BRAND_BUCKETS[clamp(Math.round(t * 11), 0, 11)]

const SPR = new Map()
export function sprite(col) {
  let c = SPR.get(col)
  if (c) return c
  c = document.createElement('canvas')
  c.width = c.height = 64
  const g = c.getContext('2d'), r = g.createRadialGradient(32, 32, 0, 32, 32, 32)
  r.addColorStop(0, 'rgba(255,255,255,1)')
  r.addColorStop(0.2, col)
  r.addColorStop(0.5, col + '55')
  r.addColorStop(1, col + '00')
  g.fillStyle = r
  g.fillRect(0, 0, 64, 64)
  SPR.set(col, c)
  return c
}

function lg(ctx, x0, y0, x1, y1, stops) {
  const g = ctx.createLinearGradient(x0, y0, x1, y1)
  stops.forEach((c, i) => g.addColorStop(i / (stops.length - 1), c))
  return g
}

/** Points sampled from text rendered in `font`, centred on (cx, cy). */
export function textPoints(text, font, cx, cy, maxPts = 600) {
  const c = document.createElement('canvas'), g = c.getContext('2d')
  g.font = font
  const m = g.measureText(text)
  const w = Math.ceil(m.width) + 8
  const fs = parseFloat(/(\d+(?:\.\d+)?)px/.exec(font)?.[1] || '48')
  const h = Math.ceil(fs * 1.5)
  if (w < 4 || w > 4000) return []
  c.width = w
  c.height = h
  g.font = font
  g.textBaseline = 'middle'
  g.fillStyle = '#fff'
  g.fillText(text, 4, h / 2)
  const d = g.getImageData(0, 0, w, h).data
  let filled = 0
  for (let i = 3; i < d.length; i += 16) if (d[i] > 128) filled++
  const step = Math.max(2, Math.ceil(Math.sqrt((filled * 4) / maxPts)))
  const out = []
  for (let y = 0; y < h; y += step) for (let x = 0; x < w; x += step) if (d[(y * w + x) * 4 + 3] > 128) out.push({ x: cx - w / 2 + x, y: cy - h / 2 + y })
  return out
}

/* ---------------- scene art ---------------- */
function gopuram(g, cx, base, w, h, tiers, lamps, u, alpha = 1) {
  g.save()
  g.globalAlpha = alpha
  const plinth = h * 0.13
  // plinth with glowing doorway
  g.fillStyle = lg(g, cx - w / 2, 0, cx + w / 2, 0, ['#130b2c', '#21154a', '#1a1040', '#110a28'])
  g.fillRect(cx - w * 0.5, base - plinth, w, plinth)
  const dw = w * 0.16, dh = plinth * 0.78
  const door = g.createLinearGradient(0, base - dh, 0, base)
  door.addColorStop(0, 'rgba(255,190,100,.55)')
  door.addColorStop(1, 'rgba(255,140,60,.15)')
  g.fillStyle = door
  g.beginPath()
  g.moveTo(cx - dw / 2, base)
  g.lineTo(cx - dw / 2, base - dh * 0.7)
  g.quadraticCurveTo(cx, base - dh * 1.15, cx + dw / 2, base - dh * 0.7)
  g.lineTo(cx + dw / 2, base)
  g.closePath()
  g.fill()
  let y = base - plinth
  const body = h * 0.74, th = body / tiers
  for (let i = 0; i < tiers; i++) {
    const wb = w * (0.9 - (0.5 * i) / tiers), wt = w * (0.9 - (0.5 * (i + 1)) / tiers)
    g.fillStyle = lg(g, cx - wb / 2, 0, cx + wb / 2, 0, ['#120a2a', '#24174f', '#1d1244', '#0f0824'])
    g.beginPath()
    g.moveTo(cx - wb / 2, y)
    g.lineTo(cx - wt / 2, y - th)
    g.lineTo(cx + wt / 2, y - th)
    g.lineTo(cx + wb / 2, y)
    g.closePath()
    g.fill()
    // ledge
    g.fillStyle = '#2b1d5c'
    g.fillRect(cx - wt / 2 - 2 * u, y - th - 1.2 * u, wt + 4 * u, 2.4 * u)
    // niches with sculpted figures (dark arches)
    const n = Math.max(3, Math.round(wb / (11 * u)))
    g.fillStyle = 'rgba(8,4,20,.55)'
    for (let k = 0; k < n; k++) {
      const nx = cx - wb / 2 + ((k + 0.5) * wb) / n, nw = (wb / n) * 0.42
      g.beginPath()
      g.moveTo(nx - nw / 2, y - th * 0.15)
      g.lineTo(nx - nw / 2, y - th * 0.62)
      g.quadraticCurveTo(nx, y - th * 0.95, nx + nw / 2, y - th * 0.62)
      g.lineTo(nx + nw / 2, y - th * 0.15)
      g.fill()
    }
    // lamp dots along the ledge and the slanted edges
    const ln = Math.max(4, Math.round(wt / (6.5 * u)))
    for (let k = 0; k <= ln; k++) lamps.push({ x: cx - wt / 2 + (k * wt) / ln, y: y - th - 1.6 * u, a: alpha })
    lamps.push({ x: cx - wb / 2 + 1 * u, y: y - 1 * u, a: alpha }, { x: cx + wb / 2 - 1 * u, y: y - 1 * u, a: alpha })
    y -= th
  }
  // barrel-vault roof (shala) with kalasam finials
  const rw = w * 0.42, rh = h * 0.1
  g.fillStyle = '#22164b'
  g.beginPath()
  g.moveTo(cx - rw / 2, y)
  g.bezierCurveTo(cx - rw / 2, y - rh * 1.2, cx + rw / 2, y - rh * 1.2, cx + rw / 2, y)
  g.closePath()
  g.fill()
  g.beginPath()
  g.arc(cx - rw / 2, y - rh * 0.35, rh * 0.38, 0, TAU)
  g.arc(cx + rw / 2, y - rh * 0.35, rh * 0.38, 0, TAU)
  g.fill()
  const fin = 5
  for (let k = 0; k < fin; k++) {
    const fx = cx - rw * 0.36 + (k * rw * 0.72) / (fin - 1), fy = y - rh * 0.88
    g.fillStyle = '#c9963f'
    g.beginPath()
    g.ellipse(fx, fy, 1.6 * u, 2.6 * u, 0, 0, TAU)
    g.fill()
    g.fillRect(fx - 0.5 * u, fy - 6 * u, 1 * u, 4 * u)
    lamps.push({ x: fx, y: fy - 6.5 * u, a: alpha })
  }
  for (let k = 0; k <= 10; k++) {
    const tt = k / 10, bx = (1 - tt) ** 3 * (cx - rw / 2) + 3 * (1 - tt) ** 2 * tt * (cx - rw / 2) + 3 * (1 - tt) * tt * tt * (cx + rw / 2) + tt ** 3 * (cx + rw / 2)
    const by = (1 - tt) ** 3 * y + 3 * (1 - tt) ** 2 * tt * (y - rh * 1.2) + 3 * (1 - tt) * tt * tt * (y - rh * 1.2) + tt ** 3 * y
    lamps.push({ x: bx, y: by - 0.5 * u, a: alpha })
  }
  g.restore()
}

function palm(g, x, base, h, lean, u) {
  g.save()
  g.strokeStyle = '#0a0717'
  g.fillStyle = '#0a0717'
  g.lineCap = 'round'
  g.lineWidth = 3.2 * u
  const tx = x + lean * h, ty = base - h
  g.beginPath()
  g.moveTo(x, base)
  g.quadraticCurveTo(x + lean * h * 0.2, base - h * 0.55, tx, ty)
  g.stroke()
  for (let i = 0; i < 9; i++) {
    const a = -Math.PI / 2 + (i - 4) * 0.42 + lean * 0.4, L = h * rand(0.32, 0.44)
    const ex = tx + Math.cos(a) * L, ey = ty + Math.sin(a) * L * 0.55 + L * 0.35
    const mx = tx + Math.cos(a) * L * 0.5, my = ty + Math.sin(a) * L * 0.5 - L * 0.12
    g.lineWidth = 2.2 * u
    g.beginPath()
    g.moveTo(tx, ty)
    g.quadraticCurveTo(mx, my, ex, ey)
    g.stroke()
    // leaflets
    g.lineWidth = 0.9 * u
    for (let k = 1; k < 7; k++) {
      const t = k / 7, px = (1 - t) ** 2 * tx + 2 * (1 - t) * t * mx + t * t * ex, py = (1 - t) ** 2 * ty + 2 * (1 - t) * t * my + t * t * ey
      g.beginPath()
      g.moveTo(px, py)
      g.lineTo(px + Math.cos(a + 1.2) * 5 * u * (1 - t * 0.5), py + 6 * u * (1 - t * 0.4))
      g.moveTo(px, py)
      g.lineTo(px + Math.cos(a - 1.2) * 5 * u * (1 - t * 0.5), py + 6 * u * (1 - t * 0.4))
      g.stroke()
    }
  }
  g.restore()
}

function rangoli(g, cx, cy, R, u) {
  g.save()
  g.translate(cx, cy)
  g.scale(1, 0.32)
  const glow = g.createRadialGradient(0, 0, 0, 0, 0, R * 1.2)
  glow.addColorStop(0, 'rgba(155,92,255,.22)')
  glow.addColorStop(1, 'rgba(34,211,238,0)')
  g.fillStyle = glow
  g.beginPath()
  g.arc(0, 0, R * 1.2, 0, TAU)
  g.fill()
  const ring = (r, n, col, size) => {
    g.fillStyle = col
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU
      g.beginPath()
      g.arc(Math.cos(a) * r, Math.sin(a) * r, size, 0, TAU)
      g.fill()
    }
  }
  const petals = (r0, r1, n, col, rot = 0) => {
    g.fillStyle = col
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU + rot, w = (TAU / n) * 0.42
      g.beginPath()
      g.moveTo(Math.cos(a - w) * r0, Math.sin(a - w) * r0)
      g.quadraticCurveTo(Math.cos(a) * r1 * 1.15, Math.sin(a) * r1 * 1.15, Math.cos(a + w) * r0, Math.sin(a + w) * r0)
      g.closePath()
      g.fill()
    }
  }
  g.globalAlpha = 0.85
  ring(R, 40, '#f5f0ff', 1.6 * u)
  petals(R * 0.62, R * 0.95, 16, '#d0347f')
  petals(R * 0.62, R * 0.86, 16, '#22b8d6', TAU / 32)
  g.strokeStyle = '#f2b84b'
  g.lineWidth = 1.4 * u
  g.beginPath()
  g.arc(0, 0, R * 0.62, 0, TAU)
  g.stroke()
  petals(R * 0.25, R * 0.58, 8, '#f2b84b')
  petals(R * 0.25, R * 0.48, 8, '#5b3df5', TAU / 16)
  ring(R * 0.4, 16, '#fff6dc', 1.1 * u)
  g.fillStyle = '#9b5cff'
  g.beginPath()
  g.arc(0, 0, R * 0.22, 0, TAU)
  g.fill()
  g.fillStyle = '#ffe9a8'
  g.beginPath()
  g.arc(0, 0, R * 0.09, 0, TAU)
  g.fill()
  g.restore()
}

export function drawDiya(g, x, y, s, t, seed = 0) {
  const f = 1 + 0.09 * Math.sin(t * 9 + seed) + 0.05 * Math.sin(t * 23 + seed * 2)
  g.save()
  g.globalCompositeOperation = 'lighter'
  g.globalAlpha = 0.55
  g.drawImage(sprite('#FF9A3C'), x - 26 * s * f, y - 34 * s * f, 52 * s * f, 52 * s * f)
  g.restore()
  g.fillStyle = lg(g, x - 12 * s, 0, x + 12 * s, 0, ['#3a1208', '#8a3f1c', '#c8743a', '#6a2c12', '#2a0d06'])
  g.beginPath()
  g.moveTo(x - 12 * s, y - 3 * s)
  g.quadraticCurveTo(x, y + 9 * s, x + 12 * s, y - 3 * s)
  g.quadraticCurveTo(x + 15 * s, y - 5 * s, x + 16 * s, y - 7 * s)
  g.lineTo(x + 10 * s, y - 5 * s)
  g.quadraticCurveTo(x, y - 1.5 * s, x - 12 * s, y - 5 * s)
  g.closePath()
  g.fill()
  g.strokeStyle = 'rgba(246,196,83,.7)'
  g.lineWidth = 0.7 * s
  g.beginPath()
  g.ellipse(x, y - 4 * s, 12 * s, 2 * s, 0, 0, TAU)
  g.stroke()
  const fx = x + 13 * s, fy = y - 7 * s, h = 10 * s * f
  const fl = g.createLinearGradient(fx, fy, fx, fy - h)
  fl.addColorStop(0, '#FF7A1A')
  fl.addColorStop(0.35, '#FFC24A')
  fl.addColorStop(0.8, '#FFF6D8')
  fl.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = fl
  g.beginPath()
  g.moveTo(fx - 2.6 * s, fy)
  g.quadraticCurveTo(fx - 3.4 * s, fy - h * 0.5, fx + Math.sin(t * 5 + seed) * 0.8 * s, fy - h)
  g.quadraticCurveTo(fx + 3.4 * s, fy - h * 0.5, fx + 2.6 * s, fy)
  g.closePath()
  g.fill()
}

/* agarbathi (incense stick) the visitor drags to the fuse */
function drawStick(g, st, u, t) {
  const a = st.a ?? -0.9, L = 96 * u, cx = Math.cos(a), sy = Math.sin(a)
  const ex = st.x + cx * L, ey = st.y + sy * L, mx = st.x + cx * L * 0.68, my = st.y + sy * L * 0.68
  g.lineCap = 'round'
  g.strokeStyle = '#d7b27a'
  g.lineWidth = 1.6 * u
  g.beginPath()
  g.moveTo(mx, my)
  g.lineTo(ex, ey)
  g.stroke()
  g.strokeStyle = '#4a2416'
  g.lineWidth = 3.2 * u
  g.beginPath()
  g.moveTo(st.x + cx * 3 * u, st.y + sy * 3 * u)
  g.lineTo(mx, my)
  g.stroke()
  g.strokeStyle = '#9a9090'
  g.lineWidth = 3 * u
  g.beginPath()
  g.moveTo(st.x, st.y)
  g.lineTo(st.x + cx * 3 * u, st.y + sy * 3 * u)
  g.stroke()
  const fl = 0.8 + 0.2 * Math.sin(t * 17) + 0.1 * Math.sin(t * 41)
  g.globalCompositeOperation = 'lighter'
  g.drawImage(sprite('#FF8A2A'), st.x - 12 * u * fl, st.y - 12 * u * fl, 24 * u * fl, 24 * u * fl)
  g.drawImage(sprite('#FFD9A0'), st.x - 4 * u, st.y - 4 * u, 8 * u, 8 * u)
  g.globalCompositeOperation = 'source-over'
  g.lineCap = 'butt'
  // a wisp of smoke
  g.strokeStyle = 'rgba(220,214,235,.18)'
  g.lineWidth = 1.2 * u
  g.beginPath()
  g.moveTo(st.x, st.y)
  for (let k = 1; k < 8; k++) g.lineTo(st.x + Math.sin(t * 2 + k) * 3 * u * k * 0.4, st.y - k * 5 * u)
  g.stroke()
}
function wick(g, x, y, s) {
  g.strokeStyle = '#cbb68b'
  g.lineWidth = 0.9 * s
  g.beginPath()
  g.moveTo(x, y)
  g.quadraticCurveTo(x + 4 * s, y - 5 * s, x + 2 * s, y - 9 * s)
  g.stroke()
}

const GOLDS = ['#6E4612', '#E9C46A', '#FFF0C2', '#C99437', '#6E4612']

/* ---------------- firecrackers ---------------- */
export const CRACKERS = {
  ssm: {
    fz: [2, -55],
    draw(g, o) {
      const { x, y, s } = o
      g.fillStyle = 'rgba(0,0,0,.45)'
      g.beginPath()
      g.ellipse(x, y, 22 * s, 4.5 * s, 0, 0, TAU)
      g.fill()
      g.fillStyle = lg(g, x - 17 * s, 0, x + 17 * s, 0, ['#2a1270', '#6a3df5', '#3b5bff', '#1fb6d8', '#0d4f70'])
      g.fillRect(x - 17 * s, y - 44 * s, 34 * s, 44 * s)
      g.beginPath()
      g.ellipse(x, y, 17 * s, 3.4 * s, 0, 0, Math.PI)
      g.fill()
      g.fillStyle = lg(g, x - 17 * s, 0, x + 17 * s, 0, GOLDS)
      g.fillRect(x - 17 * s, y - 38 * s, 34 * s, 2.2 * s)
      g.fillRect(x - 17 * s, y - 8 * s, 34 * s, 2.2 * s)
      g.fillStyle = '#b8a4ff'
      g.beginPath()
      g.ellipse(x, y - 44 * s, 17 * s, 3.4 * s, 0, 0, TAU)
      g.fill()
      g.fillStyle = '#fff'
      g.font = `700 ${11 * s}px Cinzel, Georgia, serif`
      g.textAlign = 'center'
      g.textBaseline = 'middle'
      g.fillText('SSM', x, y - 22 * s)
      g.textAlign = 'start'
      if (!o.lit) wick(g, x, y - 46 * s, s)
    },
    play(fx) {
      const o = fx.obj, s = o.s, card = fx.scene === 'card'
      const vid = fx.scene === 'video'
      const cx = fx.W / 2, cy = fx.H * (card ? 0.36 : vid ? 0.2 : 0.3)
      const size = vid ? fx.W * 0.55 : Math.min(fx.W * (card ? 0.86 : 0.84), 330 * fx.u)
      fx.ignite(o.x + 2 * s, o.y - 55 * s, 0.5)
      fx.at(0.5, () => {
        o.lit = true
        fx.rocket({
          x0: o.x, y0: o.y - 46 * s, x1: cx, y1: cy, dur: 1.2, whistle: true, pal: ['#C9B6FF', '#7C95FF', '#C9FBFF'],
          burst: (x, y) => {
            fx.boomAt(x, y, 1.5)
            fx.burst(x, y, { kind: 'ring', n: 110, speed: 250, pal: PAL.brand, life: 1.2, glitter: true })
            const pts = ssmPoints(), k = fx.o.preview ? 4 : fx.q < 0.75 ? 2 : 1, hgt = size * 0.41
            const targets = []
            pts.forEach(([px, py], i) => {
              if (i % k) return
              targets.push({ x: cx + (px - 0.5) * size, y: cy + py * size - hgt / 2, col: brandCol(px) })
            })
            fx.formTo(targets, { from: { x, y }, dur: 1.1, stagger: 0.3, hold: 1.6, curve: 40 })
            fx.at(1.15, () => fx.sfx('shimmer'))
            fx.at(3.0, () => fx.rain(1.8, PAL.gold))
          },
        })
      })
      return { reveal: 5.0, end: 7.2 }
    },
  },
  flowerpot: {
    fz: [0, -38],
    draw(g, o) {
      const { x, y, s } = o
      g.fillStyle = 'rgba(0,0,0,.4)'
      g.beginPath()
      g.ellipse(x, y, 16 * s, 3 * s, 0, 0, TAU)
      g.fill()
      g.fillStyle = lg(g, x - 14 * s, 0, x + 14 * s, 0, ['#35136e', '#7b4dff', '#4a2ac0', '#1d0c4a'])
      g.beginPath()
      g.moveTo(x - 14 * s, y)
      g.lineTo(x - 6 * s, y - 34 * s)
      g.lineTo(x + 6 * s, y - 34 * s)
      g.lineTo(x + 14 * s, y)
      g.closePath()
      g.fill()
      g.fillStyle = lg(g, x - 14 * s, 0, x + 14 * s, 0, GOLDS)
      ;[[0.25, 2.2], [0.62, 1.6]].forEach(([k, h]) => {
        const yy = y - 34 * s * k, w = 14 - 8 * k
        g.fillRect(x - w * s, yy - (h * s) / 2, 2 * w * s, h * s)
      })
      g.beginPath()
      g.ellipse(x, y - 34 * s, 6 * s, 1.8 * s, 0, 0, TAU)
      g.fill()
      if (!o.lit) wick(g, x, y - 35 * s, s)
    },
    play(fx) {
      const o = fx.obj, s = o.s, top = o.y - 35 * s
      fx.ignite(o.x, top, 0.55)
      fx.at(0.55, () => {
        o.lit = true
        fx.fountain({ x: o.x, y: top, dur: 3.8, rate: 300, speed: 340, spread: 0.3, surge: 2.1, accent: 0.18, apal: PAL.cyan })
      })
      fx.at(2.15, () => { fx.flash(0.45, o.x, top - 60 * fx.u); fx.sfx('crackle', { d: 1.2, n: 40 }) })
      fx.at(4.35, () => fx.burst(o.x, top - 30 * fx.u, { n: 50, speed: 90, life: 1, glitter: true, pal: PAL.gold }))
      return { reveal: 2.3, end: 5 }
    },
  },
  chakri: {
    fz: [16, -6],
    draw(g, o) {
      const { x, y, s } = o, a = o.angle || 0
      g.fillStyle = 'rgba(0,0,0,.4)'
      g.beginPath()
      g.ellipse(x, y, 20 * s, 4 * s, 0, 0, TAU)
      g.fill()
      g.save()
      g.translate(x, y - 5 * s)
      g.scale(1, 0.38)
      g.fillStyle = lg(g, -16 * s, 0, 16 * s, 0, ['#1d2c8f', '#3b5bff', '#16a6c8'])
      g.beginPath()
      g.arc(0, 0, 16 * s, 0, TAU)
      g.fill()
      g.strokeStyle = '#E9C46A'
      g.lineWidth = 1.6 * s
      g.beginPath()
      for (let i = 0; i < 60; i++) {
        const k = i / 60, r = (3 + 13 * k) * s, aa = a + k * TAU * 2.2
        if (i) g.lineTo(Math.cos(aa) * r, Math.sin(aa) * r)
        else g.moveTo(Math.cos(aa) * r, Math.sin(aa) * r)
      }
      g.stroke()
      g.restore()
      if (!o.lit) wick(g, x + 15 * s, y - 6 * s, s)
    },
    play(fx) {
      const o = fx.obj, s = o.s
      fx.ignite(o.x + 15 * s, o.y - 7 * s, 0.5)
      fx.at(0.5, () => {
        o.lit = true
        fx.spinner({ x: () => o.x, y: () => o.y - 5 * s, dur: 4.4, omega: 30, r: 16 * s, rate: 300, speed: 170, surge: 2.4 })
        let t = 0
        const x0 = o.x
        fx.em.push({ update: (dt) => { t += dt; o.x = x0 + Math.sin(t * 1.3) * 10 * fx.u * Math.min(1, t); return t < 4.4 } })
      })
      fx.at(2.5, () => { fx.flash(0.5, o.x, o.y - 20 * fx.u); fx.sfx('crackle', { d: 0.8, n: 30 }) })
      return { reveal: 2.6, end: 5.4 }
    },
  },
  rocket: {
    fz: [0, -52],
    draw(g, o) {
      const { x, y, s } = o
      g.fillStyle = lg(g, x - 10 * s, 0, x + 10 * s, 0, GOLDS)
      g.beginPath()
      g.moveTo(x - 5 * s, y - 18 * s)
      g.quadraticCurveTo(x - 12 * s, y - 10 * s, x - 9 * s, y - 1 * s)
      g.lineTo(x + 9 * s, y - 1 * s)
      g.quadraticCurveTo(x + 12 * s, y - 10 * s, x + 5 * s, y - 18 * s)
      g.closePath()
      g.fill()
      const rx = o.flying ? o.rx : x, ry = o.flying ? o.ry : y - 18 * s
      if (!o.flying) {
        g.strokeStyle = '#8B6A3E'
        g.lineWidth = 1.2 * s
        g.beginPath()
        g.moveTo(rx, ry + 16 * s)
        g.lineTo(rx, ry - 26 * s)
        g.stroke()
      }
      const by = o.flying ? ry + 10 * s : ry - 26 * s
      g.fillStyle = lg(g, rx - 3.5 * s, 0, rx + 3.5 * s, 0, ['#2a1270', '#6a3df5', '#3b5bff', '#1fb6d8'])
      g.fillRect(rx - 3.5 * s, by - 20 * s, 7 * s, 20 * s)
      g.fillStyle = lg(g, rx - 3.5 * s, 0, rx + 3.5 * s, 0, GOLDS)
      g.fillRect(rx - 3.5 * s, by - 14 * s, 7 * s, 2 * s)
      g.beginPath()
      g.moveTo(rx - 3.5 * s, by - 20 * s)
      g.lineTo(rx, by - 28 * s)
      g.lineTo(rx + 3.5 * s, by - 20 * s)
      g.fill()
      if (!o.lit) wick(g, rx, by, s)
    },
    play(fx) {
      const o = fx.obj, s = o.s, u = fx.u
      fx.ignite(o.x, o.y - 44 * s, 0.6)
      fx.at(0.6, () => {
        o.lit = true
        fx.rocket({
          x0: o.x, y0: o.y - 44 * s, x1: o.x + 12 * u, y1: fx.H * 0.24, dur: 1.3, carry: true, whistle: true,
          burst: (x, y) => {
            fx.boomAt(x, y, 1.3)
            fx.burst(x, y, { n: 220, speed: 210, pal: PAL.gold, crackle: 0.3, life: 2 })
            fx.burst(x, y, { kind: 'ring', n: 80, speed: 140, pal: PAL.cyan, life: 1.6, core: false })
            fx.at(0.45, () => { const bx = x - 70 * u, by = y + 30 * u; fx.boomAt(bx, by, 0.8); fx.burst(bx, by, { n: 110, speed: 150, pal: PAL.violet, life: 1.5 }) })
            fx.at(0.8, () => { const bx = x + 75 * u, by = y + 20 * u; fx.boomAt(bx, by, 0.8); fx.burst(bx, by, { n: 110, speed: 150, pal: PAL.blue, life: 1.5, glitter: true }) })
          },
        })
      })
      return { reveal: 2.3, end: 5 }
    },
  },
  sparkler: {
    fz: [0, -62],
    draw(g, o) {
      const { x, y, s } = o, burn = o.burn || 0
      g.fillStyle = 'rgba(0,0,0,.4)'
      g.beginPath()
      g.ellipse(x, y, 12 * s, 2.6 * s, 0, 0, TAU)
      g.fill()
      // small clay holder
      g.fillStyle = lg(g, x - 9 * s, 0, x + 9 * s, 0, ['#3a1208', '#9a4a22', '#5a220e'])
      g.beginPath()
      g.moveTo(x - 9 * s, y - 8 * s)
      g.quadraticCurveTo(x, y + 4 * s, x + 9 * s, y - 8 * s)
      g.closePath()
      g.fill()
      const top = y - 62 * s, coat = top + burn * 44 * s
      g.strokeStyle = '#9b9bb0'
      g.lineWidth = 1 * s
      g.beginPath()
      g.moveTo(x, y - 6 * s)
      g.lineTo(x, top)
      g.stroke()
      g.strokeStyle = '#5e5a66'
      g.lineWidth = 2.6 * s
      g.beginPath()
      g.moveTo(x, y - 24 * s)
      g.lineTo(x, coat)
      g.stroke()
      o.tip = { x, y: coat }
      if (!o.lit) wick(g, x, top, s)
    },
    play(fx) {
      const o = fx.obj, s = o.s, u = fx.u
      fx.ignite(o.x, o.y - 62 * s, 0.4)
      fx.at(0.4, () => {
        o.lit = true
        let t = 0, acc = 0
        const dur = 4.2
        fx.sfx('hiss', { d: dur, f: 5200, s: 0.8, crack: true })
        fx.em.push({
          update: (dt) => {
            t += dt
            if (t > dur) return false
            o.burn = Math.min(1, t / dur)
            const tip = { x: o.x, y: o.y - 62 * s + o.burn * 44 * s }
            const envl = Math.min(1, t / 0.3) * Math.min(1, (dur - t) / 0.4)
            fx.flash(0.08 + 0.12 * envl, tip.x, tip.y)
            acc += 260 * envl * fx.q * (fx.o.preview ? 0.5 : 1) * dt
            while (acc >= 1) {
              acc--
              const a = rand(0, TAU), v = rand(60, 190) * u
              const p = fx.add(tip.x, tip.y, Math.cos(a) * v, Math.sin(a) * v, { life: rand(0.18, 0.42), size: rand(1, 1.8) * u, col: pick(['#FFFFFF', '#FFF6DC', '#FFE9A8', '#C9FBFF']), drag: 3, g: 40 * u })
              if (p && Math.random() < 0.18) p.die = (f, q) => { for (let k = 0; k < 3; k++) { const b = rand(0, TAU), w = rand(30, 70) * u; f.add(q.x, q.y, Math.cos(b) * w, Math.sin(b) * w, { life: 0.14, size: 1 * u, col: '#FFFFFF', drag: 4, g: 0 }) } }
            }
            return true
          },
        })
      })
      fx.at(2.4, () => fx.sfx('crackle', { d: 1, n: 36 }))
      fx.at(4.5, () => { const x = fx.W / 2, y = fx.H * 0.28; fx.boomAt(x, y, 1); fx.burst(x, y, { n: 160, speed: 190, pal: PAL.brand, life: 1.7, glitter: true }) })
      return { reveal: 2.4, end: 5.6 }
    },
  },
}

/* ---------------- the stage ---------------- */
export class Stage {
  constructor(canvas, o = {}) {
    this.c = canvas
    this.ctx = canvas.getContext('2d')
    this.o = o
    this.scene = o.scene || 'full'
    this.layer = document.createElement('canvas')
    this.l = this.layer.getContext('2d')
    this.p = []
    this.form = []
    this.em = []
    this.ev = []
    this.log = []
    this.t = 0
    this.flashA = 0
    this.fx = 0
    this.fy = 0
    this.q = (o.q || 1) * (REDUCED ? 0.55 : 1) * (LOWEND ? 0.7 : 1)
    this.max = o.max || (this.scene === 'card' ? 600 : 2600)
    this.obj = null
    this.stick = null
    this.ambient = false
    this.ambT = 1
    this.lastBurst = null
    this.W = 1
    this.H = 1
    this.dpr = 1
  }
  resize(w, h, dpr = 1) {
    this.W = w
    this.H = h
    this.dpr = dpr
    for (const c of [this.c, this.layer]) {
      c.width = Math.max(1, Math.round(w * dpr))
      c.height = Math.max(1, Math.round(h * dpr))
    }
    this.u = (h > w * 1.2 ? Math.min(w, h * 0.62) : Math.min(w, h)) / 400
    this.gy = h * (this.scene === 'card' ? 0.72 : 0.7)
    this.floorY = this.scene === 'card' ? h * 0.9 : this.gy + (h - this.gy) * 0.5
    this.buildBg()
    if (this.obj) {
      this.obj.x = w / 2
      this.obj.y = this.floorY
      this.obj.s = this.objScale()
    }
  }
  objScale() {
    return this.u * (this.scene === 'card' ? 1.05 : this.scene === 'video' ? 1.7 : 1.5)
  }
  buildBg() {
    const { W, H, u, gy } = this
    const bg = document.createElement('canvas')
    bg.width = Math.round(W * this.dpr)
    bg.height = Math.round(H * this.dpr)
    const g = bg.getContext('2d')
    g.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    const sky = g.createLinearGradient(0, 0, 0, gy)
    sky.addColorStop(0, '#04031a')
    sky.addColorStop(0.55, '#120a3a')
    sky.addColorStop(1, '#2a1356')
    g.fillStyle = sky
    g.fillRect(0, 0, W, gy + 2)
    const glow = (x, y, r, col) => {
      const rg = g.createRadialGradient(x, y, 0, x, y, r)
      rg.addColorStop(0, col)
      rg.addColorStop(1, 'rgba(0,0,0,0)')
      g.fillStyle = rg
      g.fillRect(0, 0, W, gy)
    }
    glow(W * 0.5, gy, Math.max(W, H) * 0.55, 'rgba(155,92,255,.22)')
    glow(W * 0.85, gy * 0.35, W * 0.6, 'rgba(59,91,255,.12)')
    glow(W * 0.1, gy * 0.6, W * 0.5, 'rgba(34,211,238,.06)')
    // stars
    this.stars = Array.from({ length: Math.round((W * gy) / (this.scene === 'card' ? 900 : 2400)) }, () => ({ x: Math.random() * W, y: Math.random() * gy * 0.85, r: Math.random() * 1.1 + 0.3, ph: Math.random() * TAU }))
    // floor
    const fl = g.createLinearGradient(0, gy, 0, H)
    fl.addColorStop(0, '#1a0f38')
    fl.addColorStop(0.4, '#0f0a24')
    fl.addColorStop(1, '#05040c')
    g.fillStyle = fl
    g.fillRect(0, gy, W, H - gy)
    this.lamps = []
    const portrait = H > W * 1.1
    if (this.scene === 'card') {
      gopuram(g, W * 0.1, gy, W * 0.28, H * 0.5, 5, this.lamps, u * 0.8, 0.9)
      gopuram(g, W * 0.92, gy, W * 0.24, H * 0.44, 5, this.lamps, u * 0.8, 0.9)
      palm(g, W * 0.26, gy, H * 0.22, 0.1, u * 0.6)
      palm(g, W * 0.76, gy, H * 0.2, -0.12, u * 0.6)
    } else {
      const gh = portrait ? H * 0.34 : H * 0.5
      const gw = portrait ? W * 0.36 : gh * 0.62
      gopuram(g, portrait ? W * 0.62 : W * 0.5, gy, gw * 0.42, gh * 0.4, 5, this.lamps, u * 0.6, 0.45)
      if (!portrait) {
        gopuram(g, W * 0.3, gy, gw * 0.5, gh * 0.5, 6, this.lamps, u * 0.7, 0.55)
        gopuram(g, W * 0.7, gy, gw * 0.5, gh * 0.48, 6, this.lamps, u * 0.7, 0.55)
      }
      palm(g, portrait ? W * 0.3 : W * 0.24, gy, gh * 0.42, 0.12, u)
      palm(g, portrait ? W * 0.74 : W * 0.78, gy, gh * 0.38, -0.14, u)
      palm(g, portrait ? W * 0.46 : W * 0.4, gy, gh * 0.3, -0.06, u * 0.8)
      if (!portrait) palm(g, W * 0.6, gy, gh * 0.33, 0.08, u * 0.8)
      gopuram(g, portrait ? W * 0.1 : W * 0.12, gy, gw, gh, 7, this.lamps, u, 1)
      gopuram(g, portrait ? W * 0.92 : W * 0.88, gy, gw * 0.9, gh * 0.92, 7, this.lamps, u, 1)
    }
    // compound wall on the horizon
    g.fillStyle = '#160d30'
    g.fillRect(0, gy - 6 * u, W, 6 * u)
    g.fillStyle = '#2b1d5c'
    g.fillRect(0, gy - 7 * u, W, 1.4 * u)
    for (let x = 4 * u; x < W; x += 9 * u) this.lamps.push({ x, y: gy - 8 * u, a: 0.8 })
    // rangoli on the floor, under the firecracker
    rangoli(g, W / 2, this.floorY + 2 * u, Math.min(W * 0.4, (this.scene === 'card' ? 60 : 130) * u), u * (this.scene === 'card' ? 0.7 : 1))
    // diyas along the front of the wall
    this.diyas = []
    if (this.scene !== 'card') {
      const n = portrait ? 5 : 9
      for (let i = 0; i < n; i++) {
        const x = (W * (i + 0.5)) / n
        if (Math.abs(x - W / 2) < W * 0.08) continue
        this.diyas.push({ x, y: gy + (H - gy) * 0.16 + (i % 2) * 4 * u, seed: i * 1.7 })
      }
    }
    // static lamp glow
    g.globalCompositeOperation = 'lighter'
    for (const l of this.lamps) {
      g.globalAlpha = 0.5 * l.a
      g.drawImage(sprite('#FFB347'), l.x - 4 * u, l.y - 4 * u, 8 * u, 8 * u)
    }
    g.globalAlpha = 1
    g.globalCompositeOperation = 'source-over'
    this.bg = bg
  }
  reset() {
    this.p.length = 0
    this.form.length = 0
    this.em.length = 0
    this.ev.length = 0
    this.log.length = 0
    this.flashA = 0
    this.lastBurst = null
    this.l.setTransform(1, 0, 0, 1, 0, 0)
    this.l.clearRect(0, 0, this.layer.width, this.layer.height)
  }
  at(d, fn) { this.ev.push({ t: this.t + d, fn }) }
  sfx(n, o = {}) {
    this.log.push({ n, t: this.t, o })
    if (this.o.onSfx) this.o.onSfx(n, o)
  }
  pan(x) { return clamp(((x / this.W) * 2 - 1) * 0.8, -0.9, 0.9) }
  add(x, y, vx, vy, o) {
    if (this.p.length >= this.max) return null
    const p = { x, y, vx, vy, life: o.life || 1, max: o.life || 1, size: o.size || 2, col: o.col || '#FFE9A8', g: o.g ?? 55 * this.u, drag: o.drag ?? 1.6, flick: o.flick || 0, seed: Math.random() * 99, die: o.die || null }
    this.p.push(p)
    return p
  }
  flash(a, x, y) { if (a > this.flashA) { this.flashA = a; this.fx = x; this.fy = y } }
  boomAt(x, y, s = 1) { this.flash(0.5 * s, x, y); this.sfx('boom', { s, pan: this.pan(x), delay: 0.03 + (1 - y / this.H) * 0.12 }) }
  crackleAt(x, y) {
    const u = this.u
    for (let i = 0; i < 4; i++) { const a = rand(0, TAU), v = rand(20, 60) * u; this.add(x, y, Math.cos(a) * v, Math.sin(a) * v, { life: rand(0.08, 0.18), size: 1.3 * u, col: '#FFFFFF', drag: 3, g: 0 }) }
  }
  burst(x, y, o = {}) {
    this.lastBurst = { x, y }
    const u = this.u, n = Math.round((o.n || 120) * this.q * (this.o.preview ? 0.45 : 1)), sp = (o.speed || 180) * u, pal = o.pal || PAL.gold, kind = o.kind || 'peony'
    const life = o.life || 1.7, size = (o.size || 2.2) * u
    for (let i = 0; i < n; i++) {
      let a = rand(0, TAU), v = sp * (0.3 + 0.7 * Math.sqrt(Math.random()))
      if (kind === 'ring') { a = (i / n) * TAU; v = sp * rand(0.97, 1.03) }
      if (kind === 'lotus') { a = (i / n) * TAU; v = sp * (0.42 + 0.58 * Math.abs(Math.cos((a * 8) / 2))) }
      let vx = Math.cos(a) * v, vy = Math.sin(a) * v
      if (kind === 'heart') {
        const t = (i / n) * TAU, hx = 16 * Math.pow(Math.sin(t), 3), hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
        vx = (hx / 17) * sp
        vy = (hy / 17) * sp
      }
      const die = o.crackle && Math.random() < o.crackle ? (fx, p) => fx.crackleAt(p.x, p.y) : null
      this.add(x, y, vx, vy, { life: rand(life * 0.75, life * 1.15), size: size * rand(0.7, 1.15), col: pick(pal), g: (o.g ?? 55) * u, drag: o.drag ?? 1.6, flick: o.glitter ? 1 : 0, die })
    }
    if (o.core !== false) for (let i = 0; i < Math.round(12 * this.q); i++) { const a = rand(0, TAU), v = rand(10, 40) * u; this.add(x, y, Math.cos(a) * v, Math.sin(a) * v, { life: 0.35, size: 4 * u, col: '#FFF6DC', drag: 2, g: 0 }) }
    if (o.crackle) this.at(life * 0.75, () => this.sfx('crackle', { d: 1, n: 34, pan: this.pan(x) }))
  }
  ignite(x, y, d = 0.55) {
    const u = this.u
    let t = 0
    this.sfx('fizz', { d: d + 0.1, s: 0.7, pan: this.pan(x) })
    this.em.push({
      update: (dt) => {
        t += dt
        for (let i = 0; i < 3; i++) { const a = rand(-2.6, -0.5), v = rand(30, 90) * u; this.add(x, y, Math.cos(a) * v, Math.sin(a) * v, { life: rand(0.12, 0.3), size: 1.3 * u, col: pick(['#FFFFFF', '#FFE9A8', '#FFB347']), drag: 2, g: 80 * u }) }
        this.flash(0.1, x, y)
        return t < d
      },
    })
  }
  fountain(o) {
    const u = this.u
    let t = 0, acc = 0
    this.sfx('hiss', { d: o.dur, s: 1.1, crack: true, pan: this.pan(o.x) })
    this.em.push({
      update: (dt) => {
        t += dt
        if (t > o.dur) return false
        const env = Math.min(1, t / 0.7) * Math.min(1, (o.dur - t) / 0.6)
        const surge = o.surge && t > o.surge && t < o.surge + 0.8 ? 1.6 : 1
        acc += (o.rate || 260) * env * surge * this.q * (this.o.preview ? 0.5 : 1) * dt
        this.flash(0.08 + 0.16 * env * surge, o.x, o.y)
        while (acc >= 1) {
          acc--
          const a = -Math.PI / 2 + rand(-1, 1) * (o.spread || 0.32), v = rand(0.65, 1) * (o.speed || 330) * u * Math.sqrt(env) * (surge > 1 ? 1.15 : 1)
          const col = Math.random() < (o.accent || 0) ? pick(o.apal || PAL.ruby) : pick(o.pal || PAL.gold)
          this.add(o.x + rand(-2, 2) * u, o.y, Math.cos(a) * v, Math.sin(a) * v, { life: rand(0.8, 1.5), size: rand(1.2, 2.2) * u, col, drag: 0.55, g: 170 * u, die: Math.random() < 0.06 ? (fx, p) => fx.crackleAt(p.x, p.y) : null })
        }
        return true
      },
    })
  }
  spinner(o) {
    const u = this.u
    let t = 0, ang = 0, acc = 0
    this.sfx('hiss', { d: o.dur, f: 2600, s: 1, pan: this.pan(o.x()) })
    this.em.push({
      update: (dt) => {
        t += dt
        if (t > o.dur) return false
        const env = Math.min(1, t / 0.5) * Math.min(1, (o.dur - t) / 0.5), w = o.omega * (0.25 + 0.75 * Math.min(1, t / 1.3))
        ang += w * dt
        if (this.obj) this.obj.angle = ang
        const cx = o.x(), cy = o.y(), surge = o.surge && t > o.surge && t < o.surge + 0.7
        acc += (o.rate || 220) * env * (surge ? 2 : 1) * this.q * (this.o.preview ? 0.5 : 1) * dt
        this.flash(0.1 + 0.14 * env, cx, cy)
        while (acc >= 1) {
          acc--
          const a = ang + (Math.random() < 0.5 ? 0 : Math.PI) + rand(-0.12, 0.12), sp = rand(0.7, 1) * (o.speed || 150) * u
          const px = cx + Math.cos(a) * o.r, py = cy + Math.sin(a) * o.r * 0.38
          const ta = a + Math.PI / 2
          this.add(px, py, Math.cos(ta) * sp, Math.sin(ta) * sp * 0.45 - rand(10, 60) * u, { life: rand(0.4, 0.8), size: rand(1.1, 1.9) * u, col: Math.random() < 0.3 ? pick(PAL.cyan) : pick(PAL.gold), drag: 1.4, g: 120 * u })
        }
        return true
      },
    })
  }
  rocket(o) {
    const u = this.u
    let t = 0
    this.sfx('whoosh', { d: o.dur, whistle: o.whistle, pan: this.pan(o.x0) })
    const ob = this.obj
    if (o.carry && ob) ob.flying = true
    this.em.push({
      update: (dt) => {
        t += dt
        const k = Math.min(1, t / o.dur), e = 1 - Math.pow(1 - k, 2)
        const x = o.x0 + (o.x1 - o.x0) * e + Math.sin(k * 9) * 3 * u, y = o.y0 + (o.y1 - o.y0) * e
        if (o.carry && ob) { ob.rx = x; ob.ry = y }
        for (let i = 0; i < 4; i++) this.add(x + rand(-1, 1) * u, y + rand(0, 4) * u, rand(-15, 15) * u, rand(30, 80) * u, { life: rand(0.3, 0.6), size: rand(1, 1.8) * u, col: pick(o.pal || ['#FFD27A', '#FFF1C9', '#FFB347']), drag: 2, g: 40 * u })
        if (k >= 1) {
          if (o.carry && ob) ob.flying = false, (ob.gone = true)
          o.burst && o.burst(x, y)
          return false
        }
        return true
      },
    })
  }
  formTo(pts, o = {}) {
    const u = this.u, dur = o.dur || 1, st = o.stagger ?? 0.3, hold = o.hold ?? 1
    for (const p of pts) {
      const sx = o.from ? o.from.x + rand(-14, 14) * u : p.x + rand(-1, 1) * this.W * 0.5
      const sy = o.from ? o.from.y + rand(-14, 14) * u : p.y + rand(-1, 1) * this.H * 0.4
      this.form.push({ x: sx, y: sy, sx, sy, tx: p.x, ty: p.y, t0: this.t + Math.random() * st, dur: dur * rand(0.85, 1.15), hold: hold + rand(0, 0.3), col: p.col || pick(o.pal || PAL.gold), size: (o.size || 1.5) * u * rand(0.8, 1.25), cv: rand(-1, 1) * (o.curve ?? 60) * u, seed: Math.random() * 9 })
    }
  }
  rain(d = 1.6, pal = PAL.gold) {
    let t = 0
    const u = this.u
    this.em.push({
      update: (dt) => {
        t += dt
        const n = Math.round(60 * dt * 6 * this.q)
        for (let i = 0; i < n; i++) this.add(rand(0.05, 0.95) * this.W, rand(-0.02, 0.25) * this.H, rand(-8, 8) * u, rand(10, 40) * u, { life: rand(1, 1.8), size: rand(0.9, 1.6) * u, col: pick(pal), drag: 1.2, g: 25 * u, flick: 1 })
        return t < d
      },
    })
  }
  tapAt(x, y) {
    const pal = pick([PAL.gold, PAL.brand, PAL.cyan, PAL.violet, PAL.ruby, PAL.multi])
    this.boomAt(x, y, 0.9)
    this.burst(x, y, { n: 140, speed: rand(150, 210), pal, kind: pick(['peony', 'ring', 'lotus', 'peony']), life: 1.6, glitter: Math.random() < 0.5, crackle: Math.random() < 0.3 ? 0.25 : 0 })
  }
  setObj(type) {
    this.obj = { type, x: this.W / 2, y: this.floorY, s: this.objScale(), angle: 0, lit: false, burn: 0 }
  }
  fusePt() {
    const o = this.obj
    if (!o) return null
    const f = CRACKERS[o.type].fz
    return { x: o.x + f[0] * o.s, y: o.y + f[1] * o.s }
  }
  play() {
    return CRACKERS[this.obj.type].play(this)
  }
  step(dt) {
    this.t += dt
    const u = this.u
    for (let i = this.ev.length - 1; i >= 0; i--) if (this.ev[i].t <= this.t) { const e = this.ev[i]; this.ev.splice(i, 1); e.fn() }
    for (let i = this.em.length - 1; i >= 0; i--) if (!this.em[i].update(dt)) this.em.splice(i, 1)
    for (let i = this.p.length - 1; i >= 0; i--) {
      const p = this.p[i]
      p.life -= dt
      if (p.life <= 0) {
        if (p.die) p.die(this, p)
        this.p[i] = this.p[this.p.length - 1]
        this.p.pop()
        continue
      }
      const d = Math.exp(-p.drag * dt)
      p.vx *= d
      p.vy = p.vy * d + p.g * dt
      p.x += p.vx * dt
      p.y += p.vy * dt
    }
    for (let i = this.form.length - 1; i >= 0; i--) {
      const f = this.form[i], lt = this.t - f.t0
      if (lt < 0) continue
      if (lt < f.dur) {
        const k = ease(lt / f.dur), mx = (f.sx + f.tx) / 2 + f.cv, my = (f.sy + f.ty) / 2 - Math.abs(f.cv) * 0.5
        f.x = (1 - k) * (1 - k) * f.sx + 2 * (1 - k) * k * mx + k * k * f.tx
        f.y = (1 - k) * (1 - k) * f.sy + 2 * (1 - k) * k * my + k * k * f.ty
      } else if (lt < f.dur + f.hold) {
        f.x = f.tx + Math.sin(this.t * 3 + f.seed) * 0.4 * u
        f.y = f.ty
      } else {
        this.add(f.x, f.y, rand(-12, 12) * u, rand(-6, 14) * u, { life: rand(0.7, 1.3), size: f.size, col: f.col, drag: 1.4, g: 40 * u, flick: 1 })
        this.form.splice(i, 1)
      }
    }
    this.flashA *= Math.exp(-6 * dt)
    if (this.stick) {
      const s = this.stick, k = 1 - Math.exp(-(s.k || 6) * dt)
      s.x += (s.tx - s.x) * k
      s.y += (s.ty - s.y) * k
    }
    if (this.ambient) {
      this.ambT -= dt
      if (this.ambT <= 0) {
        const calm = this.ambient === 'calm'
        this.ambT = calm ? rand(2.6, 4.5) : rand(0.7, 1.4)
        const x = rand(0.15, 0.85) * this.W, y = rand(0.1, calm ? 0.3 : 0.4) * this.H
        if (calm) {
          this.burst(x, y, { n: 60, speed: 110, pal: pick([PAL.gold, PAL.brand, PAL.cyan]), life: 1.3, core: false })
          this.sfx('boom', { s: 0.35, pan: this.pan(x), delay: 0.2 })
        } else this.tapAt(x, y)
      }
    }
  }
  render() {
    const g = this.ctx, l = this.l, dpr = this.dpr, u = this.u, W = this.W, H = this.H, t = this.t
    g.setTransform(1, 0, 0, 1, 0, 0)
    if (this.bg) g.drawImage(this.bg, 0, 0)
    else { g.fillStyle = '#05040f'; g.fillRect(0, 0, this.c.width, this.c.height) }
    g.setTransform(dpr, 0, 0, dpr, 0, 0)
    // twinkling stars and lamp dots
    g.fillStyle = '#fff'
    for (const s of this.stars) {
      g.globalAlpha = 0.35 + 0.45 * Math.sin(t * 1.7 + s.ph) ** 2
      g.fillRect(s.x, s.y, s.r, s.r)
    }
    g.globalCompositeOperation = 'lighter'
    const ls = sprite('#FFC46B')
    for (let i = 0; i < this.lamps.length; i++) {
      const lp = this.lamps[i]
      g.globalAlpha = lp.a * (0.35 + 0.35 * Math.sin(t * 2.3 + i * 1.37))
      g.drawImage(ls, lp.x - 3 * u, lp.y - 3 * u, 6 * u, 6 * u)
    }
    g.globalAlpha = 1
    g.globalCompositeOperation = 'source-over'
    for (const d of this.diyas) drawDiya(g, d.x, d.y, u * (this.scene === 'video' ? 1.1 : 1), t, d.seed)
    // trails layer
    l.setTransform(1, 0, 0, 1, 0, 0)
    l.globalCompositeOperation = 'destination-out'
    l.fillStyle = 'rgba(0,0,0,.24)'
    l.fillRect(0, 0, this.layer.width, this.layer.height)
    l.globalCompositeOperation = 'lighter'
    l.setTransform(dpr, 0, 0, dpr, 0, 0)
    for (const p of this.p) {
      let a = p.life / p.max
      if (p.flick) a *= 0.45 + 0.55 * Math.abs(Math.sin(t * 38 + p.seed))
      const r = p.size * (1.6 + a)
      l.globalAlpha = Math.min(1, a * 1.2)
      l.drawImage(sprite(p.col), p.x - r, p.y - r, r * 2, r * 2)
    }
    l.globalAlpha = 1
    g.setTransform(1, 0, 0, 1, 0, 0)
    g.globalCompositeOperation = 'lighter'
    g.drawImage(this.layer, 0, 0)
    g.setTransform(dpr, 0, 0, dpr, 0, 0)
    // formed shapes (logo, names) drawn crisp on top
    for (const f of this.form) {
      if (this.t < f.t0) continue
      const tw = 0.7 + 0.3 * Math.sin(t * 9 + f.seed * 3), r = f.size * 2.4 * tw
      g.globalAlpha = 1
      g.drawImage(sprite(f.col), f.x - r, f.y - r, r * 2, r * 2)
    }
    if (this.flashA > 0.01) {
      const rg = g.createRadialGradient(this.fx, this.fy, 0, this.fx, this.fy, Math.max(W, H) * 0.7)
      rg.addColorStop(0, `rgba(255,236,200,${this.flashA * 0.5})`)
      rg.addColorStop(1, 'rgba(255,236,200,0)')
      g.globalAlpha = 1
      g.fillStyle = rg
      g.fillRect(0, 0, W, H)
    }
    g.globalCompositeOperation = 'source-over'
    if (this.obj && !this.obj.gone) CRACKERS[this.obj.type].draw(g, this.obj, t)
    else if (this.obj && this.obj.type === 'rocket') CRACKERS.rocket.draw(g, { ...this.obj, flying: true, rx: -999, ry: -999, lit: true }, t)
    if (this.stick && this.stick.vis) {
      const fz = this.fusePt()
      if (fz && this.obj && !this.obj.lit) {
        const pu = 0.5 + 0.5 * Math.sin(t * 5)
        g.strokeStyle = `rgba(251,235,184,${0.25 + 0.35 * pu})`
        g.lineWidth = 1.4 * u
        g.beginPath()
        g.arc(fz.x, fz.y, (7 + 5 * pu) * u, 0, TAU)
        g.stroke()
      }
      drawStick(g, this.stick, u, t)
    }
    g.setTransform(1, 0, 0, 1, 0, 0)
  }
}
