/* Diwali Digital Surprise audio: every sound is synthesised with Web Audio (no audio files).
 * The same graph runs live (AudioContext) and offline for the video (OfflineAudioContext). */

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

export function makeGraph(ctx, dest = ctx.destination) {
  const G = { ctx }
  G.master = ctx.createGain()
  G.master.gain.value = 0.9
  const lim = ctx.createDynamicsCompressor()
  lim.threshold.value = -10
  lim.knee.value = 8
  lim.ratio.value = 6
  lim.attack.value = 0.003
  lim.release.value = 0.25
  G.master.connect(lim).connect(dest)
  G.rev = ctx.createConvolver()
  G.rev.buffer = impulse(ctx, 2.6)
  const rg = ctx.createGain()
  rg.gain.value = 0.45
  G.rev.connect(rg).connect(G.master)
  G.fx = ctx.createGain()
  G.fx.connect(G.master)
  G.send = ctx.createGain()
  G.send.connect(G.rev)
  G.music = ctx.createGain()
  G.music.gain.value = 0.42
  G.music.connect(G.master)
  const ms = ctx.createGain()
  ms.gain.value = 0.25
  G.music.connect(ms).connect(G.rev)
  return G
}

function impulse(ctx, dur) {
  const sr = ctx.sampleRate, n = Math.floor(sr * dur), b = ctx.createBuffer(2, n, sr)
  for (let ch = 0; ch < 2; ch++) {
    const d = b.getChannelData(ch)
    let lp = 0
    for (let i = 0; i < n; i++) {
      const t = i / sr
      lp += (Math.random() * 2 - 1 - lp) * 0.3
      d[i] = lp * Math.pow(1 - t / dur, 2.2)
    }
  }
  return b
}

function noiseBuf(c) {
  if (!c._dwNoise) {
    const n = c.sampleRate * 2, b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0)
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1
    c._dwNoise = b
  }
  return c._dwNoise
}
function env(c, t, peak, a, d) {
  const g = c.createGain()
  g.gain.setValueAtTime(0.0001, t)
  g.gain.linearRampToValueAtTime(peak, t + a)
  g.gain.exponentialRampToValueAtTime(0.0001, t + a + d)
  return g
}
function out(G, node, pan, wet) {
  const c = G.ctx
  let n = node
  if (c.createStereoPanner) {
    const p = c.createStereoPanner()
    p.pan.value = clamp(pan || 0, -1, 1)
    node.connect(p)
    n = p
  }
  n.connect(G.fx)
  const s = c.createGain()
  s.gain.value = wet ?? 0.4
  n.connect(s).connect(G.send)
}
function noiseHit(G, t, type, f, peak, a, d, pan, wet, q) {
  const c = G.ctx, n = c.createBufferSource(), x = c.createBiquadFilter(), g = env(c, t, peak, a, d)
  n.buffer = noiseBuf(c)
  n.loop = true
  x.type = type
  x.frequency.value = f
  if (q != null) x.Q.value = q
  n.connect(x).connect(g)
  out(G, g, pan, wet)
  n.start(t, Math.random() * 1.5)
  n.stop(t + a + d + 0.05)
  return x
}
function tone(G, t, f, peak, a, d, pan, wet, type, dest) {
  const c = G.ctx, o = c.createOscillator(), g = env(c, t, peak, a, d)
  o.type = type || 'sine'
  o.frequency.value = f
  o.connect(g)
  if (dest) g.connect(dest)
  else out(G, g, pan, wet)
  o.start(t)
  o.stop(t + a + d + 0.05)
  return o
}

/* ---- firework voices ---- */
export const SFX = {
  boom(G, t, o) {
    const s = o.s || 1, p = o.pan || 0
    noiseHit(G, t, 'highpass', 1200, 0.7 * s, 0.001, 0.06, p, 0.5)
    const b = noiseHit(G, t, 'lowpass', 2400, 0.75 * s, 0.004, 1.2 * Math.sqrt(s), p, 0.8, 0.4)
    b.frequency.setValueAtTime(2400, t)
    b.frequency.exponentialRampToValueAtTime(120, t + 0.9 * s)
    const th = tone(G, t, 70, 0.6 * s, 0.003, 0.55, 0, 0.1)
    th.frequency.setValueAtTime(70, t)
    th.frequency.exponentialRampToValueAtTime(32, t + 0.5)
  },
  crackle(G, t, o) {
    const c = G.ctx, d = o.d || 1, sr = c.sampleRate, n = Math.floor(sr * d), b = c.createBuffer(1, n, sr), x = b.getChannelData(0), k = o.n || 24
    for (let i = 0; i < k; i++) {
      const p = Math.floor(Math.random() * (n - 400)), amp = (0.35 + Math.random() * 0.65) * (Math.random() < 0.5 ? -1 : 1), len = (6 + Math.random() * 30) | 0
      for (let j = 0; j < len; j++) x[p + j] += amp * (Math.random() * 2 - 1) * Math.exp(-j / (len * 0.35))
    }
    const s = c.createBufferSource(), hp = c.createBiquadFilter(), g = c.createGain()
    s.buffer = b
    hp.type = 'highpass'
    hp.frequency.value = 1700
    g.gain.value = 0.7 * (o.s || 1)
    s.connect(hp).connect(g)
    out(G, g, o.pan || 0, 0.45)
    s.start(t)
  },
  hiss(G, t, o) {
    const c = G.ctx, d = o.d || 2, s = o.s || 1, p = o.pan || 0
    const n = c.createBufferSource(), bp = c.createBiquadFilter(), g = c.createGain()
    n.buffer = noiseBuf(c)
    n.loop = true
    bp.type = 'bandpass'
    bp.frequency.value = o.f || 3600
    bp.Q.value = 0.6
    g.gain.setValueAtTime(0.0001, t)
    g.gain.linearRampToValueAtTime(0.26 * s, t + 0.3)
    g.gain.setValueAtTime(0.26 * s, t + Math.max(0.35, d - 0.5))
    g.gain.exponentialRampToValueAtTime(0.0001, t + d)
    n.connect(bp).connect(g)
    out(G, g, p, 0.35)
    n.start(t, Math.random())
    n.stop(t + d + 0.1)
    if (o.crack) SFX.crackle(G, t + 0.25, { d: Math.max(0.3, d - 0.5), n: Math.round(d * 24), pan: p, s: 0.5 })
  },
  fizz(G, t, o) {
    const d = o.d || 0.6
    SFX.hiss(G, t, { d, f: 6200, s: 0.45 * (o.s || 1), pan: o.pan })
    SFX.crackle(G, t, { d, n: Math.round(d * 40), pan: o.pan, s: 0.45 })
  },
  whoosh(G, t, o) {
    const c = G.ctx, d = o.d || 1.2, p = o.pan || 0, n = c.createBufferSource(), bp = c.createBiquadFilter(), g = c.createGain()
    n.buffer = noiseBuf(c)
    n.loop = true
    bp.type = 'bandpass'
    bp.Q.value = 1.4
    bp.frequency.setValueAtTime(450, t)
    bp.frequency.exponentialRampToValueAtTime(2800, t + d)
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(0.3, t + d * 0.85)
    g.gain.exponentialRampToValueAtTime(0.0001, t + d + 0.06)
    n.connect(bp).connect(g)
    out(G, g, p, 0.45)
    n.start(t, Math.random())
    n.stop(t + d + 0.1)
    if (o.whistle) {
      const w = tone(G, t + 0.05, 1300, 0.03, 0.1, d, p, 0.4)
      w.frequency.setValueAtTime(1300, t)
      w.frequency.linearRampToValueAtTime(2400, t + d)
    }
  },
  shimmer(G, t) {
    noiseHit(G, t, 'highpass', 8000, 0.05, 0.35, 1.6, -0.3, 0.8)
    noiseHit(G, t + 0.15, 'highpass', 9500, 0.035, 0.3, 1.4, 0.3, 0.8)
    ;[1568, 2093, 2637, 3136].forEach((f, i) => tone(G, t + i * 0.09, f, 0.025, 0.004, 1.1, (i - 1.5) * 0.3, 0.7))
  },
}

/* ---- music: an original festive loop in raga Mohanam (D E F# A B), 96 BPM, 8 bars ---- */
const BPM = 96
const BEAT = 60 / BPM
const BAR = BEAT * 4
export const LOOP = BAR * 8
const NOTES = [293.66, 329.63, 369.99, 440, 493.88, 587.33, 659.25, 739.99, 880]
// melody: [beat offset within loop, scale index, length in beats]
const MEL = [
  [0, 5, 1], [1, 4, 0.5], [1.5, 3, 0.5], [2, 4, 1], [3, 5, 1],
  [4, 6, 1.5], [5.5, 5, 0.5], [6, 4, 1], [7, 3, 1],
  [8, 2, 1], [9, 3, 0.5], [9.5, 4, 0.5], [10, 5, 1], [11, 3, 1],
  [12, 4, 2], [14, 3, 1], [15, 2, 1],
  [16, 3, 1], [17, 4, 0.5], [17.5, 5, 0.5], [18, 6, 1], [19, 7, 1],
  [20, 8, 1.5], [21.5, 7, 0.5], [22, 6, 1], [23, 5, 1],
  [24, 6, 1], [25, 5, 0.5], [25.5, 4, 0.5], [26, 3, 1], [27, 2, 1],
  [28, 3, 1.5], [29.5, 2, 0.5], [30, 1, 0.5], [30.5, 2, 0.5], [31, 0, 1],
]
const BASS = [0, 0, 3, 3, 4, 4, 0, 0] // per bar: D D A A B B D D (scale index, an octave down twice)

function pluck(G, t, f, v, len) {
  const c = G.ctx
  const g = c.createGain()
  g.gain.setValueAtTime(0.0001, t)
  g.gain.linearRampToValueAtTime(v, t + 0.006)
  g.gain.exponentialRampToValueAtTime(0.0001, t + Math.max(0.5, len * 1.6))
  const lp = c.createBiquadFilter()
  lp.type = 'lowpass'
  lp.frequency.setValueAtTime(5200, t)
  lp.frequency.exponentialRampToValueAtTime(900, t + 0.5)
  const o1 = c.createOscillator(), o2 = c.createOscillator()
  o1.type = 'triangle'
  o2.type = 'sine'
  o1.frequency.setValueAtTime(f * 0.985, t)
  o1.frequency.exponentialRampToValueAtTime(f, t + 0.06) // veena-like meend into the note
  o2.frequency.value = f * 2
  const g2 = c.createGain()
  g2.gain.value = 0.25
  o1.connect(lp)
  o2.connect(g2).connect(lp)
  lp.connect(g).connect(G.music)
  const end = t + Math.max(0.5, len * 1.6) + 0.05
  o1.start(t); o2.start(t); o1.stop(end); o2.stop(end)
}
/* bansuri-like flute: sine with delayed vibrato and a little breath noise */
function flute(G, t, f, v, len) {
  const c = G.ctx, d = Math.max(0.22, len)
  const g = c.createGain()
  g.gain.setValueAtTime(0.0001, t)
  g.gain.linearRampToValueAtTime(v, t + 0.06)
  g.gain.setValueAtTime(v * 0.85, t + d * 0.7)
  g.gain.exponentialRampToValueAtTime(0.0001, t + d + 0.18)
  const o = c.createOscillator(), o2 = c.createOscillator(), g2 = c.createGain()
  o.type = 'sine'
  o2.type = 'sine'
  o.frequency.setValueAtTime(f * 0.97, t)
  o.frequency.exponentialRampToValueAtTime(f, t + 0.05)
  o2.frequency.value = f * 2
  g2.gain.value = 0.12
  const lfo = c.createOscillator(), lg = c.createGain()
  lfo.frequency.value = 5.4
  lg.gain.setValueAtTime(0, t)
  lg.gain.linearRampToValueAtTime(f * 0.007, t + Math.min(0.35, d))
  lfo.connect(lg)
  lg.connect(o.frequency)
  o.connect(g)
  o2.connect(g2).connect(g)
  const n = c.createBufferSource(), bp = c.createBiquadFilter(), ng = c.createGain()
  n.buffer = noiseBuf(c)
  bp.type = 'bandpass'
  bp.frequency.value = f * 2.2
  bp.Q.value = 2
  ng.gain.value = v * 0.18
  n.connect(bp).connect(ng).connect(g)
  g.connect(G.music)
  const end = t + d + 0.25
  ;[o, o2, lfo].forEach((x) => { x.start(t); x.stop(end) })
  n.start(t, Math.random()); n.stop(end)
}
/* warm string pad: detuned saws, slow bow attack */
function strings(G, t, freqs, d) {
  const c = G.ctx, lp = c.createBiquadFilter(), g = c.createGain()
  lp.type = 'lowpass'
  lp.frequency.value = 1500
  lp.Q.value = 0.5
  g.gain.setValueAtTime(0.0001, t)
  g.gain.linearRampToValueAtTime(0.05, t + 0.45)
  g.gain.setValueAtTime(0.05, t + d * 0.75)
  g.gain.exponentialRampToValueAtTime(0.0001, t + d + 0.3)
  lp.connect(g).connect(G.music)
  for (const f of freqs) for (const det of [-7, 6]) {
    const o = c.createOscillator()
    o.type = 'sawtooth'
    o.frequency.value = f
    o.detune.value = det
    o.connect(lp)
    o.start(t)
    o.stop(t + d + 0.4)
  }
}
function drone(G, t, f, d) {
  const c = G.ctx, o = c.createOscillator(), lp = c.createBiquadFilter(), g = c.createGain()
  o.type = 'sawtooth'
  o.frequency.value = f
  lp.type = 'lowpass'
  lp.frequency.value = 700
  g.gain.setValueAtTime(0.0001, t)
  g.gain.linearRampToValueAtTime(0.05, t + 0.08)
  g.gain.exponentialRampToValueAtTime(0.006, t + d)
  o.connect(lp).connect(g).connect(G.music)
  o.start(t)
  o.stop(t + d + 0.05)
}
function drum(G, t, kind) {
  const c = G.ctx
  if (kind === 'tha') {
    const o = c.createOscillator(), g = env(c, t, 0.5, 0.003, 0.32)
    o.frequency.setValueAtTime(110, t)
    o.frequency.exponentialRampToValueAtTime(52, t + 0.25)
    o.connect(g).connect(G.music)
    o.start(t); o.stop(t + 0.4)
  } else if (kind === 'ki') {
    const o = c.createOscillator(), g = env(c, t, 0.18, 0.002, 0.16)
    o.frequency.setValueAtTime(330, t)
    o.frequency.exponentialRampToValueAtTime(260, t + 0.1)
    o.connect(g).connect(G.music)
    o.start(t); o.stop(t + 0.22)
    const n = c.createBufferSource(), bp = c.createBiquadFilter(), ng = env(c, t, 0.12, 0.001, 0.05)
    n.buffer = noiseBuf(c)
    bp.type = 'bandpass'
    bp.frequency.value = 2400
    n.connect(bp).connect(ng).connect(G.music)
    n.start(t, Math.random()); n.stop(t + 0.08)
  } else {
    const n = c.createBufferSource(), hp = c.createBiquadFilter(), g = env(c, t, 0.05, 0.001, 0.07)
    n.buffer = noiseBuf(c)
    hp.type = 'highpass'
    hp.frequency.value = 7500
    n.connect(hp).connect(g).connect(G.music)
    n.start(t, Math.random()); n.stop(t + 0.1)
  }
}

/** Schedules every music event that starts in [from, to) (seconds of music time), mapped to ctx time base + t. */
export function scheduleMusic(G, base, from, to) {
  const first = Math.floor(from / LOOP), last = Math.floor(to / LOOP)
  for (let k = first; k <= last; k++) {
    const L0 = k * LOOP
    const inWin = (mt) => mt >= from && mt < to
    for (const [b, n, len] of MEL) {
      const mt = L0 + b * BEAT
      if (inWin(mt)) flute(G, base + mt, NOTES[n], 0.13, len * BEAT)
    }
    for (let bar = 0; bar < 8; bar++) {
      const bt = L0 + bar * BAR
      if (inWin(bt)) {
        drone(G, base + bt, NOTES[BASS[bar]] / 4, BAR)
        const r = NOTES[BASS[bar]] / 2
        strings(G, base + bt, [r, r * 1.5, r * 2], BAR)
        if (bar % 2 === 0) pluck(G, base + bt, r, 0.08, BEAT)
      }
      for (let s = 0; s < 8; s++) {
        const mt = bt + s * (BEAT / 2)
        if (!inWin(mt)) continue
        if (s === 0 || s === 5) drum(G, base + mt, 'tha')
        else if (s === 2 || s === 6) drum(G, base + mt, 'ki')
        else drum(G, base + mt, 'bell')
      }
    }
  }
}

/* ---- live sound: lazily created on the first user gesture ---- */
const SOUND_KEY = 'ssm-diwali-sound'
export const Sound = {
  ctx: null,
  G: null,
  on: true,
  musicT0: 0,
  musicAt: 0,
  timer: 0,
  load() {
    try { this.on = localStorage.getItem(SOUND_KEY) !== 'off' } catch { /* private mode */ }
  },
  init() {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return
    if (!this.ctx) {
      this.ctx = new AC({ latencyHint: 'interactive' })
      this.G = makeGraph(this.ctx)
      this.apply()
    }
    if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {})
  },
  apply() {
    if (this.G) this.G.master.gain.setTargetAtTime(this.on ? 0.9 : 0, this.ctx.currentTime, 0.05)
  },
  toggle() {
    this.on = !this.on
    try { localStorage.setItem(SOUND_KEY, this.on ? 'on' : 'off') } catch { /* ignore */ }
    this.init()
    this.apply()
    if (this.on) this.startMusic()
    return this.on
  },
  play(name, o = {}) {
    if (!this.G || !this.on || !SFX[name]) return
    try { SFX[name](this.G, this.ctx.currentTime + 0.01 + (o.delay || 0), o) } catch { /* ignore */ }
  },
  startMusic() {
    if (!this.G || this.timer) return
    this.musicT0 = this.ctx.currentTime + 0.1
    this.musicAt = 0
    const tick = () => {
      const now = this.ctx.currentTime - this.musicT0
      const until = now + 1.5
      if (until > this.musicAt) {
        scheduleMusic(this.G, this.musicT0, this.musicAt, until)
        this.musicAt = until
      }
    }
    tick()
    this.timer = setInterval(tick, 400)
  },
}
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (!Sound.ctx) return
    if (document.hidden) Sound.ctx.suspend().catch(() => {})
    else Sound.ctx.resume().catch(() => {})
  })
}

/** Renders music + the logged firework sounds of a video scene into a stereo AudioBuffer. */
export async function renderOffline(log, dur, opts = {}, sr = 48000) {
  const OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext
  if (!OAC) return null
  const oc = new OAC(2, Math.ceil(sr * dur), sr)
  const G = makeGraph(oc)
  // fade the music out over the last 1.5 s
  G.music.gain.setValueAtTime(0.42, 0)
  G.music.gain.setValueAtTime(0.42, Math.max(0, dur - 1.6))
  G.music.gain.linearRampToValueAtTime(0.0001, dur - 0.05)
  G.master.gain.setValueAtTime(0.9, Math.max(0, dur - 1))
  G.master.gain.linearRampToValueAtTime(0.0001, dur)
  if (opts.loud) {
    // fireworks loud from 2 s to 5 s, then sit back under the music
    const [a, b] = opts.loud
    for (const node of [G.fx, G.send]) {
      node.gain.setValueAtTime(0.7, 0)
      node.gain.linearRampToValueAtTime(1.5, a)
      node.gain.setValueAtTime(1.5, b)
      node.gain.linearRampToValueAtTime(0.45, b + 1.5)
    }
  }
  scheduleMusic(G, 0.05, 0, dur)
  for (const e of log) if (SFX[e.n] && e.t < dur - 0.2) SFX[e.n](G, e.t + 0.01 + (e.o.delay || 0), e.o)
  return oc.startRendering()
}
