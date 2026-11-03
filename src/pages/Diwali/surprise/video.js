/* Diwali Digital Surprise: renders a 1080x1920 vertical video of the wish in the browser.
 * Preferred path: WebCodecs (H.264 + AAC/Opus) muxed to MP4 faster than real time.
 * Fallback: MediaRecorder on the canvas stream (MP4 if the browser records it, else WebM). */
import { Stage, PAL, textPoints } from './fx.js'
import { T } from './data.js'
import { makeGraph, renderOffline, scheduleMusic, SFX } from './audio.js'

const W = 1080, H = 1920, FPS = 30
const SITE = 'staticsavvymedia.com'

const serif = (w, px, it) => `${it ? 'italic ' : ''}${w} ${px}px "Cormorant Garamond", Georgia, serif`
const cinzel = (w, px) => `${w} ${px}px Cinzel, Georgia, serif`
const sans = (w, px, ta) => `${w} ${px}px ${ta ? '"Noto Sans Tamil", ' : ''}Manrope, system-ui, sans-serif`

function wrap(g, text, maxW) {
  const words = text.split(/\s+/).filter(Boolean), lines = []
  let cur = ''
  for (const w of words) {
    const test = cur ? cur + ' ' + w : w
    if (g.measureText(test).width <= maxW || !cur) cur = test
    else { lines.push(cur); cur = w }
    while (g.measureText(cur).width > maxW && cur.length > 1) {
      let k = cur.length - 1
      while (k > 1 && g.measureText(cur.slice(0, k)).width > maxW) k--
      lines.push(cur.slice(0, k))
      cur = cur.slice(k)
    }
  }
  if (cur) lines.push(cur)
  return lines
}
function fitFont(g, text, mk, start, min, maxW) {
  let px = start
  g.font = mk(px)
  while (px > min && g.measureText(text).width > maxW) { px -= 4; g.font = mk(px) }
  return px
}

export async function loadFonts(lang) {
  if (!document.fonts || !document.fonts.load) return
  const list = ['700 64px Cinzel', 'italic 600 64px "Cormorant Garamond"', '700 64px "Cormorant Garamond"', '500 40px Manrope', '700 40px Manrope']
  if (lang === 'ta') list.push('700 48px "Noto Sans Tamil"', '500 40px "Noto Sans Tamil"')
  await Promise.all(list.map((f) => document.fonts.load(f, lang === 'ta' ? 'தீபாவளி' : 'Diwali').catch(() => null)))
}

function loadImg(src) {
  return new Promise((res) => {
    if (!src) return res(null)
    const i = new Image()
    i.onload = () => res(i)
    i.onerror = () => res(null)
    i.src = src
  })
}

/* Video timeline (12 s, 9:16), matching the campaign reference:
 * 0-1 s  scene + faint "A Diwali surprise for you" and the name, SSM logo top-left
 * 1-4 s  the chosen cracker sparks, a rocket shoots up and bursts into a big starburst (~3.7 s)
 * 4 s    the burst lights the greeting (white), then the name in glowing 3D gold
 * 5-8 s  pink and white bursts; the message, then the sign-off fade in; hold
 * 9-12 s everything dims; big SSM logo, "Static Savvy Media", tagline, website; fade to black */
export const VIDEO_DUR = 12
const LOUD = [2, 5]
const BURST_AT = 3.7
const T_HEAD = 4.0, T_NAME = 4.45, T_MSG = 5.3, T_SIG = 6.3, T_DIM = 9.0, T_END_LOGO = 9.4, T_FADE = 11.2

async function buildScene(wish, logoSrc, onSfx) {
  await loadFonts(wish.lang)
  const logo = await loadImg(logoSrc)
  const canvas = document.createElement('canvas')
  const st = new Stage(canvas, { scene: 'video', q: 1, onSfx })
  st.resize(W, H, 1)
  st.setObj(wish.cracker)
  const L = T[wish.lang] || T.en
  const ta = wish.lang === 'ta'
  const g = canvas.getContext('2d')
  const ownRocket = wish.cracker === 'ssm' || wish.cracker === 'rocket'
  // the cracker's own play() is started so that its rocket (ssm/rocket) bursts at ~BURST_AT
  const playAt = wish.cracker === 'ssm' ? BURST_AT - 1.7 : wish.cracker === 'rocket' ? BURST_AT - 1.9 : 1.2
  const frames = Math.round(VIDEO_DUR * FPS)
  const nameY = H * 0.47
  const nameFont = () => serif(700, fitFont(g, wish.to, (px) => serif(700, px, true), 150, 70, W * 0.84), true)
  const cues = [
    [playAt, () => st.play()],
    [BURST_AT - 1.5, () => {
      if (ownRocket) return
      const o = st.obj
      st.rocket({
        x0: o.x, y0: o.y - 50 * o.s, x1: W / 2, y1: H * 0.27, dur: 1.5, whistle: true,
        burst: (x, y) => { st.boomAt(x, y, 1.6); st.burst(x, y, { n: 320, speed: 280, pal: PAL.gold, life: 2.1, crackle: 0.35 }); st.burst(x, y, { kind: 'ring', n: 110, speed: 190, pal: PAL.white, life: 1.6, core: false }) },
      })
    }],
    [BURST_AT + 0.05, () => {
      const x = W / 2, y = H * 0.27
      if (ownRocket) st.burst(x, y, { n: 220, speed: 280, pal: PAL.gold, life: 2.1, crackle: 0.3 })
      st.flash(0.9, x, y)
      st.sfx('crackle', { d: 1.4, n: 70, s: 1.2 })
    }],
    [T_HEAD, () => {
      const pts = textPoints(wish.to, nameFont(), W / 2, nameY, 900).map((p) => ({ ...p, col: Math.random() < 0.7 ? '#FFE9A8' : '#F6C453' }))
      st.formTo(pts, { from: { x: W / 2, y: H * 0.27 }, dur: 0.6, stagger: 0.15, hold: 0.7, curve: 90 })
    }],
  ]
  // 5-8 s: pink and white bursts around the text
  ;[[5.0, 0.25, 0.2], [5.8, 0.75, 0.16], [6.6, 0.3, 0.12], [7.4, 0.72, 0.22], [8.2, 0.5, 0.14]].forEach(([t, x, y], i) => {
    cues.push([t, () => {
      const bx = W * x, by = H * y
      st.boomAt(bx, by, 0.7)
      st.burst(bx, by, { n: 170, speed: 200, pal: i % 2 ? PAL.white : PAL.ruby, kind: i === 2 ? 'ring' : 'peony', life: 1.7, glitter: i % 2 === 1 })
    }])
  })
  cues.sort((a, b2) => a[0] - b2[0])
  let ci = 0
  const ramp = (t, a, d = 0.6) => Math.max(0, Math.min(1, (t - a) / d))

  const goldFill = (y, h) => {
    const gr = g.createLinearGradient(0, y - h / 2, 0, y + h / 2)
    gr.addColorStop(0, '#FFF4CF')
    gr.addColorStop(0.45, '#F6C453')
    gr.addColorStop(0.7, '#E0A23A')
    gr.addColorStop(1, '#B07A25')
    return gr
  }
  const brandFill = (x0, x1) => {
    const gr = g.createLinearGradient(x0, 0, x1, 0)
    gr.addColorStop(0, '#B48CFF')
    gr.addColorStop(0.5, '#5B7CFF')
    gr.addColorStop(1, '#3FE0F5')
    return gr
  }

  const draw = (i) => {
    const t = i / FPS
    while (ci < cues.length && cues[ci][0] <= t) cues[ci++][1]()
    st.step(1 / FPS)
    st.render()
    g.setTransform(1, 0, 0, 1, 0, 0)
    g.textAlign = 'center'
    g.textBaseline = 'middle'
    g.shadowBlur = 0
    const dim = ramp(t, T_DIM, 0.7)
    // SSM logo, top-left (until the end card)
    if (logo && dim < 1) {
      g.globalAlpha = 1 - dim
      const lw = 250, lh = (logo.height / logo.width) * lw
      g.drawImage(logo, 48, 46, lw, lh)
      g.globalAlpha = 1
    }
    // 0-~3.6 s: faint, unlit teaser
    const tz = Math.min(ramp(t, 0.1, 0.5), 1 - ramp(t, BURST_AT - 0.3, 0.4))
    if (tz > 0) {
      g.globalAlpha = tz * 0.42
      g.fillStyle = '#D9D0F2'
      g.font = ta ? sans(600, fitFont(g, L.teaser, (px) => sans(600, px, true), 48, 30, W * 0.86), true) : cinzel(700, 54)
      g.fillText(ta ? L.teaser : 'A Diwali surprise for you', W / 2, H * 0.4)
      g.font = nameFont()
      g.fillStyle = '#CDB98A'
      g.fillText(wish.to, W / 2, nameY)
      g.globalAlpha = 1
    }
    // 4 s on: greeting, 3D gold name, message, sign-off
    const keep = 1 - dim * 0.9
    if (t >= T_HEAD - 0.05 && keep > 0) {
      const back = ramp(t, T_HEAD, 0.8) * 0.55 * keep
      const vg = g.createRadialGradient(W / 2, H * 0.53, 0, W / 2, H * 0.53, W * 0.75)
      vg.addColorStop(0, `rgba(6,4,22,${back})`)
      vg.addColorStop(1, 'rgba(6,4,22,0)')
      g.fillStyle = vg
      g.fillRect(0, H * 0.25, W, H * 0.6)
      const lit = ramp(t, T_HEAD, 0.35)
      g.globalAlpha = lit * keep
      g.fillStyle = '#FFFFFF'
      g.shadowColor = 'rgba(255,255,255,.85)'
      g.shadowBlur = 10 + 40 * (1 - ramp(t, T_HEAD, 1.2))
      if (ta) g.font = sans(700, fitFont(g, L.head, (px) => sans(700, px, true), 62, 40, W * 0.88), true)
      else g.font = cinzel(700, 78)
      g.fillText(L.head, W / 2, H * 0.385)
      // name: 3D gold (stacked extrusion + gradient face + glow)
      const na = ramp(t, T_NAME, 0.6) * keep
      if (na > 0) {
        g.font = nameFont()
        g.globalAlpha = na
        g.shadowBlur = 0
        for (let k = 7; k >= 1; k--) {
          g.fillStyle = k > 4 ? '#4A2C08' : '#7A4D14'
          g.fillText(wish.to, W / 2 + k * 0.8, nameY + k * 1.6)
        }
        g.shadowColor = 'rgba(246,196,83,.85)'
        g.shadowBlur = 36
        g.fillStyle = goldFill(nameY, 150)
        g.fillText(wish.to, W / 2, nameY)
        g.shadowBlur = 0
        g.strokeStyle = 'rgba(255,248,220,.55)'
        g.lineWidth = 1.5
        g.strokeText(wish.to, W / 2, nameY - 1)
      }
      g.shadowBlur = 0
      g.globalAlpha = ramp(t, T_MSG, 0.8) * keep
      g.fillStyle = '#F1ECFF'
      g.font = sans(500, ta ? 40 : 44, ta)
      const lines = wrap(g, wish.msg, W * 0.8).slice(0, 6)
      const lh = ta ? 66 : 64
      const y0 = nameY + 150
      lines.forEach((ln, j) => g.fillText(ln, W / 2, y0 + j * lh))
      g.globalAlpha = ramp(t, T_SIG, 0.8) * keep
      g.fillStyle = '#F6C453'
      g.font = ta ? sans(600, 44, true) : serif(600, 58, true)
      g.fillText(L.sig(wish.from), W / 2, y0 + lines.length * lh + 56)
      g.globalAlpha = 1
    }
    // 9-12 s: dim, end card, fade to black
    if (dim > 0) {
      g.fillStyle = `rgba(3,2,12,${dim * 0.82})`
      g.fillRect(0, 0, W, H)
      const la = ramp(t, T_END_LOGO, 0.7)
      if (logo && la > 0) {
        const lw = 640 + 40 * la, lh = (logo.height / logo.width) * lw
        g.globalAlpha = la
        g.drawImage(logo, (W - lw) / 2, H * 0.42 - lh / 2, lw, lh)
      }
      const ny = H * 0.42 + 270
      g.globalAlpha = ramp(t, T_END_LOGO + 0.45, 0.6)
      g.font = cinzel(700, 74)
      const tw = g.measureText('Static Savvy Media').width
      g.fillStyle = brandFill(W / 2 - tw / 2, W / 2 + tw / 2)
      g.shadowColor = 'rgba(91,124,255,.6)'
      g.shadowBlur = 24
      g.fillText('Static Savvy Media', W / 2, ny)
      g.shadowBlur = 0
      g.globalAlpha = ramp(t, T_END_LOGO + 0.85, 0.6)
      g.fillStyle = '#FFFFFF'
      g.font = serif(600, 62, true)
      g.fillText('Light up someone\u2019s Diwali', W / 2, ny + 100)
      g.globalAlpha = ramp(t, T_END_LOGO + 1.2, 0.6)
      g.fillStyle = '#F6C453'
      g.font = sans(700, 44)
      g.fillText(SITE, W / 2, ny + 190)
      g.globalAlpha = 1
    }
    const fb = ramp(t, T_FADE, VIDEO_DUR - T_FADE - 0.05)
    if (fb > 0) {
      g.fillStyle = `rgba(0,0,0,${fb})`
      g.fillRect(0, 0, W, H)
    }
    return canvas
  }
  return { canvas, draw, frames, dur: VIDEO_DUR, log: st.log, loud: LOUD }
}

const pickMime = () => {
  if (typeof MediaRecorder === 'undefined') return null
  return ['video/mp4;codecs=avc1.42E01E,mp4a.40.2', 'video/mp4', 'video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm'].find((m) => MediaRecorder.isTypeSupported(m)) || null
}

async function pickVideoCodec() {
  if (typeof VideoEncoder === 'undefined') return null
  const cands = [
    ['avc1.640028', 'avc'], ['avc1.4d0028', 'avc'], ['avc1.42003e', 'avc'], ['avc1.42002a', 'avc'],
    ['vp09.00.40.08', 'vp9'],
  ]
  for (const [codec, mux] of cands) {
    const cfg = { codec, width: W, height: H, bitrate: 6_000_000, framerate: FPS, latencyMode: 'quality' }
    if (mux === 'avc') cfg.avc = { format: 'avc' }
    try {
      const s = await VideoEncoder.isConfigSupported(cfg)
      if (s.supported) return { cfg, mux }
    } catch { /* try next */ }
  }
  return null
}
async function pickAudioCodec() {
  if (typeof AudioEncoder === 'undefined') return null
  for (const [codec, mux] of [['mp4a.40.2', 'aac'], ['opus', 'opus']]) {
    const cfg = { codec, sampleRate: 48000, numberOfChannels: 2, bitrate: 128000 }
    try {
      const s = await AudioEncoder.isConfigSupported(cfg)
      if (s.supported) return { cfg, mux }
    } catch { /* next */ }
  }
  return null
}

const nextTick = () => new Promise((r) => setTimeout(r, 0))

async function viaWebCodecs(wish, logoSrc, onProgress, cancelled) {
  const vc = await pickVideoCodec()
  const ac = await pickAudioCodec()
  if (!vc || !ac || !window.OfflineAudioContext) return null
  const { Muxer, ArrayBufferTarget } = await import('./vendor/mp4-muxer.mjs')
  const sc = await buildScene(wish, logoSrc)
  const muxer = new Muxer({
    target: new ArrayBufferTarget(),
    video: { codec: vc.mux, width: W, height: H, frameRate: FPS },
    audio: { codec: ac.mux, sampleRate: 48000, numberOfChannels: 2 },
    fastStart: 'in-memory',
    firstTimestampBehavior: 'offset',
  })
  let err = null
  const venc = new VideoEncoder({ output: (c, m) => muxer.addVideoChunk(c, m), error: (e) => { err = e } })
  venc.configure(vc.cfg)
  for (let i = 0; i < sc.frames; i++) {
    if (cancelled()) { try { venc.close() } catch { /* */ } throw new Error('cancelled') }
    if (err) throw err
    const cv = sc.draw(i)
    const fr = new VideoFrame(cv, { timestamp: Math.round((i * 1e6) / FPS), duration: Math.round(1e6 / FPS) })
    venc.encode(fr, { keyFrame: i % (FPS * 2) === 0 })
    fr.close()
    while (venc.encodeQueueSize > 6) await new Promise((r) => setTimeout(r, 4))
    if (i % 3 === 0) { onProgress((i / sc.frames) * 0.86); await nextTick() }
  }
  await venc.flush()
  venc.close()
  if (err) throw err
  onProgress(0.88)
  const buf = await renderOffline(sc.log, sc.dur, { loud: sc.loud })
  if (cancelled()) throw new Error('cancelled')
  onProgress(0.93)
  const aenc = new AudioEncoder({ output: (c, m) => muxer.addAudioChunk(c, m), error: (e) => { err = e } })
  aenc.configure(ac.cfg)
  const n = buf.length, CH = 4800
  const l = buf.getChannelData(0), r = buf.getChannelData(1)
  for (let off = 0; off < n; off += CH) {
    const len = Math.min(CH, n - off), data = new Float32Array(len * 2)
    data.set(l.subarray(off, off + len), 0)
    data.set(r.subarray(off, off + len), len)
    const ad = new AudioData({ format: 'f32-planar', sampleRate: 48000, numberOfFrames: len, numberOfChannels: 2, timestamp: Math.round((off / 48000) * 1e6), data })
    aenc.encode(ad)
    ad.close()
  }
  await aenc.flush()
  aenc.close()
  if (err) throw err
  muxer.finalize()
  onProgress(1)
  const blob = new Blob([muxer.target.buffer], { type: 'video/mp4' })
  return { blob, mime: 'video/mp4', ext: 'mp4', codec: `${vc.cfg.codec}+${ac.cfg.codec}`, dur: sc.dur }
}

async function viaRecorder(wish, logoSrc, onProgress, cancelled) {
  const mime = pickMime()
  if (!mime) throw new Error('Video recording is not supported in this browser')
  const AC = window.AudioContext || window.webkitAudioContext
  let actx = null, G = null, dest = null
  if (AC) {
    actx = new AC()
    dest = actx.createMediaStreamDestination()
    G = makeGraph(actx, dest)
  }
  const onSfx = (n, o) => { if (G && SFX[n]) try { SFX[n](G, actx.currentTime + 0.02 + (o.delay || 0), o) } catch { /* */ } }
  const sc = await buildScene(wish, logoSrc, onSfx)
  const vs = sc.canvas.captureStream(FPS)
  const tracks = [...vs.getVideoTracks(), ...(dest ? dest.stream.getAudioTracks() : [])]
  const rec = new MediaRecorder(new MediaStream(tracks), { mimeType: mime, videoBitsPerSecond: 6_000_000 })
  const parts = []
  rec.ondataavailable = (e) => e.data && e.data.size && parts.push(e.data)
  const done = new Promise((res) => { rec.onstop = res })
  if (actx) { await actx.resume().catch(() => {}); scheduleMusic(G, actx.currentTime + 0.05, 0, sc.dur) }
  rec.start(500)
  const t0 = performance.now()
  let i = 0
  await new Promise((resolve, reject) => {
    const tick = () => {
      if (cancelled()) { rec.stop(); reject(new Error('cancelled')); return }
      const want = Math.min(sc.frames, Math.floor(((performance.now() - t0) / 1000) * FPS))
      while (i < want) { sc.draw(i); i++ }
      onProgress(i / sc.frames)
      if (i >= sc.frames) resolve()
      else setTimeout(tick, 1000 / FPS / 2)
    }
    tick()
  })
  rec.stop()
  await done
  if (actx) actx.close().catch(() => {})
  const type = mime.split(';')[0]
  return { blob: new Blob(parts, { type }), mime: type, ext: type === 'video/mp4' ? 'mp4' : 'webm', codec: mime, dur: sc.dur }
}

export async function exportVideo({ wish, logoSrc, onProgress = () => {}, isCancelled = () => false }) {
  let res
  try {
    res = await viaWebCodecs(wish, logoSrc, onProgress, isCancelled)
  } catch (e) {
    if (e && e.message === 'cancelled') throw e
    res = null
  }
  if (!res) res = await viaRecorder(wish, logoSrc, onProgress, isCancelled)
  if (!res.blob || !res.blob.size) throw new Error('The video came out empty')
  return res
}
