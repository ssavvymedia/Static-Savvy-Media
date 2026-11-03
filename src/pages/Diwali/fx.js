/**
 * Diwali sky: one full-screen canvas for drifting embers, fireworks (auto, on tap, on demand) and a
 * sparkle trail behind the pointer. Lazy-loaded by Diwali2026.jsx after first paint; never runs when
 * the user prefers reduced motion. Pauses when the tab is hidden. Returns { burst, finale, destroy }.
 */
const TAU = Math.PI * 2
const PALETTE = ['#f5c66b', '#ffd98a', '#a855f7', '#3b82f6', '#22d3ee', '#ec4899', '#fff3d1']

export function startSky(canvas, { auto = true } = {}) {
  const ctx = canvas.getContext('2d', { alpha: true })
  const small = Math.min(window.innerWidth, window.innerHeight) < 600
  const MAX = small ? 520 : 1100
  let W = 0, H = 0, dpr = 1, raf = 0, running = true, last = performance.now(), nextAuto = 900
  const parts = [] // fireworks + sparkles
  const rockets = []
  const embers = Array.from({ length: small ? 26 : 48 }, () => ember(true))

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    W = window.innerWidth
    H = window.innerHeight
    canvas.width = Math.round(W * dpr)
    canvas.height = Math.round(H * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  function ember(init) {
    return { x: Math.random() * (W || window.innerWidth), y: init ? Math.random() * (H || window.innerHeight) : (H || window.innerHeight) + 10, r: 0.6 + Math.random() * 1.8, vy: 8 + Math.random() * 22, ph: Math.random() * TAU, c: Math.random() < 0.7 ? '#f5c66b' : '#22d3ee' }
  }
  function explode(x, y, opts = {}) {
    const n = opts.n || (small ? 60 : 95)
    const hue = opts.color || PALETTE[(Math.random() * PALETTE.length) | 0]
    const alt = PALETTE[(Math.random() * PALETTE.length) | 0]
    const ring = Math.random() < 0.35
    const speed = opts.speed || (110 + Math.random() * 90)
    for (let i = 0; i < n && parts.length < MAX; i++) {
      const a = (i / n) * TAU + Math.random() * 0.08
      const s = ring ? speed : speed * (0.35 + Math.random() * 0.75)
      parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, decay: 0.45 + Math.random() * 0.4, r: 1.1 + Math.random() * 1.4, c: i % 3 ? hue : alt, tw: Math.random() < 0.3, g: 60 })
    }
  }
  function launch(tx, ty, opts) {
    const x0 = tx + (Math.random() - 0.5) * 60
    rockets.push({ x: x0, y: H + 8, tx, ty, vy: -(Math.sqrt(2 * 260 * Math.max(60, H - ty)) ), opts })
  }
  function sparkle(x, y) {
    for (let i = 0; i < 2 && parts.length < MAX; i++) {
      parts.push({ x, y, vx: (Math.random() - 0.5) * 40, vy: (Math.random() - 0.5) * 40 - 10, life: 1, decay: 1.6 + Math.random(), r: 0.8 + Math.random() * 1.2, c: Math.random() < 0.6 ? '#ffd98a' : '#22d3ee', tw: true, g: 20 })
    }
  }

  function frame(t) {
    if (!running) return
    const dt = Math.min(0.05, (t - last) / 1000)
    last = t
    ctx.globalCompositeOperation = 'source-over'
    ctx.clearRect(0, 0, W, H)
    ctx.globalCompositeOperation = 'lighter'
    // embers
    for (const e of embers) {
      e.y -= e.vy * dt
      e.ph += dt * 2
      e.x += Math.sin(e.ph) * 0.25
      if (e.y < -10) Object.assign(e, ember(false))
      const a = 0.35 + 0.35 * Math.sin(e.ph * 1.7)
      ctx.fillStyle = e.c
      ctx.globalAlpha = a
      ctx.beginPath(); ctx.arc(e.x, e.y, e.r, 0, TAU); ctx.fill()
    }
    // rockets
    for (let i = rockets.length - 1; i >= 0; i--) {
      const r = rockets[i]
      r.vy += 260 * dt
      r.y += r.vy * dt
      r.x += (r.tx - r.x) * Math.min(1, dt * 2.2)
      ctx.globalAlpha = 0.9
      ctx.fillStyle = '#ffe7a8'
      ctx.beginPath(); ctx.arc(r.x, r.y, 1.8, 0, TAU); ctx.fill()
      if (Math.random() < 0.6 && parts.length < MAX) parts.push({ x: r.x, y: r.y + 4, vx: (Math.random() - 0.5) * 12, vy: 20, life: 0.7, decay: 1.8, r: 1, c: '#f5c66b', g: 10 })
      if (r.vy >= -20 || r.y <= r.ty) { explode(r.x, r.y, r.opts); rockets.splice(i, 1) }
    }
    // particles
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i]
      p.vx *= 0.985; p.vy = p.vy * 0.985 + p.g * dt
      p.x += p.vx * dt; p.y += p.vy * dt
      p.life -= p.decay * dt
      if (p.life <= 0) { parts.splice(i, 1); continue }
      ctx.globalAlpha = p.tw ? p.life * (0.5 + 0.5 * Math.sin(t / 40 + i)) : p.life
      ctx.fillStyle = p.c
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (0.6 + p.life * 0.6), 0, TAU); ctx.fill()
    }
    ctx.globalAlpha = 1
    if (auto) {
      nextAuto -= dt * 1000
      if (nextAuto <= 0) {
        launch(W * (0.15 + Math.random() * 0.7), H * (0.12 + Math.random() * 0.3))
        nextAuto = 2600 + Math.random() * 3200
      }
    }
    raf = requestAnimationFrame(frame)
  }

  const onVis = () => {
    if (document.hidden) { running = false; cancelAnimationFrame(raf) } else if (!running) { running = true; last = performance.now(); raf = requestAnimationFrame(frame) }
  }
  let lastSpark = 0
  const onMove = (e) => {
    if (e.pointerType === 'touch') return
    const now = performance.now()
    if (now - lastSpark > 24) { lastSpark = now; sparkle(e.clientX, e.clientY) }
  }
  const onTap = (e) => {
    if (e.target.closest && e.target.closest('a,button,input,select,textarea,label,form,[data-no-sky]')) return
    launch(e.clientX, e.clientY)
  }

  resize()
  window.addEventListener('resize', resize, { passive: true })
  document.addEventListener('visibilitychange', onVis)
  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerdown', onTap, { passive: true })
  raf = requestAnimationFrame(frame)

  return {
    burst(x, y, opts) { explode(x, y, opts) },
    rocket(x, y, opts) { launch(x, y, opts) },
    finale() {
      for (let i = 0; i < 6; i++) setTimeout(() => launch(W * (0.1 + 0.8 * Math.random()), H * (0.1 + 0.35 * Math.random()), { n: small ? 70 : 110 }), i * 260)
    },
    destroy() {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onTap)
    },
  }
}
