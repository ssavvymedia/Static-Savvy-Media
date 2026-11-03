/* Diwali Digital Surprise: content, firecracker catalogue and the shared-link codec. */
import { CRACKER_IDS, WISH_LANGS, LIMITS, cleanText } from '../../../data/diwaliCampaign.js'

export const T = {
  en: {
    head: 'Happy Diwali,',
    teaser: 'A Diwali surprise for',
    sig: (n) => `With love, ${n}`,
    wa: (to, link) => `🪔 ${to}, I've sent you a Diwali surprise!\nTap to light your firecracker ✨\n${link}`,
    tpl: [
      'Wishing you a Diwali glowing with joy, good health and new beginnings. May every diya light up your path!',
      'May the festival of lights fill your home with warmth, laughter and prosperity. Happy Diwali!',
      'Like a thousand sparkles in the night sky, may all your dreams shine bright this Deepavali.',
      'Sending you light, love and sweet moments this Diwali. Have a sparkling celebration!',
    ],
  },
  ta: {
    head: 'இனிய தீபாவளி நல்வாழ்த்துகள்,',
    teaser: 'உங்களுக்காக ஒரு தீபாவளி சர்ப்ரைஸ்',
    sig: (n) => `அன்புடன், ${n}`,
    wa: (to, link) => `🪔 ${to}, உங்களுக்காக ஒரு தீபாவளி சர்ப்ரைஸ்!\nபட்டாசைப் பற்ற வைக்க இங்கே தொடுங்கள் ✨\n${link}`,
    tpl: [
      'இந்த தீபாவளி உங்கள் வாழ்வில் மகிழ்ச்சியும் ஆரோக்கியமும் புதிய தொடக்கங்களும் நிறைந்ததாக அமையட்டும்!',
      'தீப ஒளி உங்கள் இல்லத்தில் அன்பும் சிரிப்பும் செழிப்பும் நிறைக்கட்டும். இனிய தீபாவளி!',
      'வானில் மின்னும் பட்டாசுகள் போல உங்கள் கனவுகள் அனைத்தும் ஜொலிக்கட்டும்!',
      'அன்பும் ஒளியும் இனிப்பும் நிறைந்த இனிய தீபாவளி வாழ்த்துகள்!',
    ],
  },
}
export const LANG_LABEL = { en: 'English', ta: 'தமிழ்' }

export const CRACKER_META = {
  ssm: { name: 'SSM Signature', ta: 'எஸ்எஸ்எம் சிக்னேச்சர்', desc: 'Our signature: the SSM monogram drawn in fire', badge: 'SSM Signature' },
  flowerpot: { name: 'Flower Pot', ta: 'புஸ்வாணம்', desc: 'A shimmering fountain of gold and cyan' },
  chakri: { name: 'Chakri', ta: 'தரைச்சக்கரம்', desc: 'A spinning wheel of sparks' },
  rocket: { name: 'Rocket', ta: 'ராக்கெட்', desc: 'Soars up and bursts into colour' },
  sparkler: { name: 'Sparkler', ta: 'மத்தாப்பு', desc: 'A crackling star of light' },
}
export { CRACKER_IDS, WISH_LANGS, LIMITS, cleanText }

/** SSM monogram, sampled from the brand logo: pairs of (x, y) bytes, 0-255 on the long side. */
const SSM_B64 = '+QD8APkD/APtCfAJ7Q3wDfMQ9hD5EOMT5hPzE/YT+RPjFuYW8xb2FvkWEBwTHBYcGRwcHCAcIxwmHCkcLBwvHDIcNhw5HDwcPxxCHEUcSRxMHNoc3RzgHOoc7RzwHAkgECATIBYgGSAcICAgIyAmICkgLCAvIDIgNiA5IDwgPyBCIEUgSSBYIFwgXyBiIGUgaCBrIG4gciB1IHggeyB+IIEghSCIIIsgjiCRINog3SDgIOog7SDwIAYjECMTIxYjGSMcIyAjIyMmIykjLCMvIzIjNiM5IzwjPyNCI0UjVSNYI1wjXyNiI2UjaCNrI24jciN1I3gjeyN+I4EjhSOII4sjjiORI5Qj2iPdI+Aj6iPtI/AjBiYJJg0mECYTJhYmGSYcJiAmIyYmJikmLCYvJjImNiY5JjwmPyZCJlImVSZYJlwmXyZiJmUmaCZrJm4mciZ1JngmeyZ+JoEmhSaIJosmjiaRJpQmlybTJgMpBikJKQ0pECkTKRYpGSkcKSApIykmKSkpLCkvKTIpNik5KTwpPylPKVIpVSlYKVwpXyliKWUpaClrKW4pcil1KXgpeyl+KYEphSmIKYspjimRKZQplymbKdAp0yngKeMp5ikDLAYsCSwNLBAsEyxMLE8sUixVLFgsXCxfLGIsZSxoLGssbixyLHUseCx7LH4sgSyFLIgsiyyOLJEslCyXLJssnizNLNAs0yzgLOMs5iwDLwYvCS8NLxAvEy9ML08vUi9VL1gvXC+OL5EvlC+XL5svni+hL8ovzS/QL9Mv1y/aL90v4C/jL+YvAzIGMgkyDTIQMkwyTzJSMlUyWDKRMpQylzKbMp4yoTKkMscyyjLNMtAy0zLXMtoy3TLgMuMy5jIDNgY2CTYNNhA2EzZMNk82UjZVNlg2lDaXNps2njahNqQ2pzbENsc2yjbNNtA20zbXNto23TbgNuM25jYDOQY5CTkNORA5EzkWOUw5TzlSOVU5WDmXOZs5njmhOaQ5pzmqOcE5xDnHOco5zTnQOdM51znaOd054DnjOeY5AzwGPAk8DTwQPBM8FjwZPBw8IDwjPCY8KTwsPC88Mjw2PDk8PDw/PEI8TDxPPFI8VTxYPFw8XzybPJ48oTykPKc8qjyuPL08wTzEPMc8yjzNPNA80zzXPNo83TzgPOM85jwGPwk/DT8QPxM/Fj8ZPxw/ID8jPyY/KT8sPy8/Mj82Pzk/PD8/P0I/RT9JP08/Uj9VP1g/XD9fP2I/ZT9oP2s/bj9yP3U/eD97P34/gT+FP4g/iz+eP6E/pD+nP6o/rj+xP7o/vT/BP8Q/xz/KP80/0D/XP9o/3T/gP+M/5j8JQg1CEEITQhZCGUIcQiBCI0ImQilCLEIvQjJCNkI5QjxCP0JCQkVCSUJMQlJCVUJYQlxCX0JiQmVCaEJrQm5CckJ1QnhCe0J+QoFChUKIQotCjkKhQqRCp0KqQq5CsUK0QrdCukK9QsFCxELHQspCzULXQtpC3ULgQuNC5kINRRBFE0UWRRlFHEUgRSNFJkUpRSxFL0UyRTZFOUU8RT9FQkVFRUlFTEVPRVVFWEVcRV9FYkVlRWhFa0VuRXJFdUV4RXtFfkWBRYVFiEWLRY5FkUWkRadFqkWuRbFFtEW3RbpFvUXBRcRFx0XKRddF2kXdReBF40XmRRNJFkkZSRxJIEkjSSZJKUksSS9JMkk2STlJPEk/SUJJRUlJSUxJT0lYSVxJX0liSWVJaElrSW5Jckl1SXhJe0l+SYFJhUmISYtJjkmRSZRJp0mqSa5JsUm0SbdJukm9ScFJxEnHSddJ2kndSeBJ40nmSUJMRUxJTExMT0xSTIVMiEyLTI5MkUyUTKpMrkyxTLRMt0y6TL1MwUzETNdM2kzdTOBM40zmTEJPRU9JT0xPT09ST4hPi0+OT5FPlE+uT7FPtE+3T7pPvU/BT9dP2k/dT+BP40/mT0JSRVJJUkxST1JSUohSi1KOUpFSlFKuUrFStFK3UrpSvVLXUtpS3VLgUuNS5lJCVUVVSVVMVU9VUlWIVYtVjlWRVZRVsVW0VbdVulXXVdpV3VXgVeNV5lU8WD9YQlhFWElYTFhPWFJYgViFWIhYi1iOWJFYlFjXWNpY3VjgWONY5lgNXBBcE1wWXBlcHFwgXCNcJlwpXCxcL1wyXDZcOVw8XD9cQlxFXElcTFxPXFxcX1xiXGVcaFxrXG5cclx1XHhce1x+XIFchVyIXItcjlyRXJRc11zaXN1c4FzjXOZcCV8NXxBfE18WXxlfHF8gXyNfJl8pXyxfL18yXzZfOV88Xz9fQl9FX0lfTF9YX1xfX19iX2VfaF9rX25fcl91X3hfe19+X4FfhV+IX4tfjl+RX9df2l/dX+Bf41/mXwZiCWINYhBiE2IWYhliHGIgYiNiJmIpYixiL2IyYjZiOWI8Yj9iQmJFYkliTGJVYlhiXGJfYmJiZWJoYmtibmJyYnVieGJ7Yn5igWKFYohii2KOYtdi2mLdYuBi42LmYgNlBmUJZQ1lEGUTZRZlGWUcZSBlI2UmZSllLGUvZTJlNmU5ZTxlP2VCZUVlUmVVZVhlXGVfZWJlZWVoZWtlbmVyZXVleGV7ZX5lgWWFZYhli2XXZdpl3WXgZeNlAGgDaAZoCWgNaBBoE2gWaBloHGggaCNoJmgpaCxoL2gyaDZoOWg8aE9oUmhVaFhoXGhfaGJoZWhoaGtobmhyaHVoeGh7aH5ogWjXaNpo3WjgaA=='
let ssmCache = null
export function ssmPoints() {
  if (ssmCache) return ssmCache
  const bin = atob(SSM_B64)
  const out = []
  for (let i = 0; i + 1 < bin.length; i += 2) out.push([bin.charCodeAt(i) / 255, bin.charCodeAt(i + 1) / 255])
  ssmCache = out
  return out
}

/* ---- shared link: /diwali-2026/#w=<base64url(JSON)> ---- */
const MAX_TOKEN = 1600
const b64urlEncode = (obj) => {
  const bytes = new TextEncoder().encode(JSON.stringify(obj))
  let s = ''
  bytes.forEach((c) => { s += String.fromCharCode(c) })
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}
const b64urlDecode = (tok) => {
  const s = tok.replace(/-/g, '+').replace(/_/g, '/')
  const bin = atob(s)
  return JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0))))
}

/** Cleans and length-limits a wish; returns null when it is not a playable wish. */
export function sanitizeWish(w) {
  if (!w || typeof w !== 'object') return null
  const to = cleanText(typeof w.to === 'string' ? w.to : '', LIMITS.name[1])
  const from = cleanText(typeof w.from === 'string' ? w.from : '', LIMITS.name[1])
  const msg = cleanText(typeof w.msg === 'string' ? w.msg : '', LIMITS.message[1])
  const cracker = CRACKER_IDS.includes(w.cracker) ? w.cracker : null
  const lang = WISH_LANGS.includes(w.lang) ? w.lang : 'en'
  if (!to || !from || !msg || !cracker) return null
  return { to, from, msg, cracker, lang }
}

export function encodeWish(w) {
  const s = sanitizeWish(w)
  if (!s) throw new Error('invalid wish')
  return b64urlEncode({ v: 1, c: s.cracker, t: s.to, f: s.from, m: s.msg, l: s.lang })
}

/** Reads a wish token from a location hash or search string. Never throws. */
export function decodeWishFromLocation(loc) {
  try {
    const fromHash = /(?:^#|&)w=([A-Za-z0-9_-]+)/.exec(loc.hash || '')
    const fromQuery = new URLSearchParams(loc.search || '').get('w')
    const tok = (fromHash && fromHash[1]) || fromQuery || ''
    if (!tok) return { present: false, wish: null }
    if (tok.length > MAX_TOKEN || !/^[A-Za-z0-9_-]+$/.test(tok)) return { present: true, wish: null }
    const o = b64urlDecode(tok)
    if (!o || o.v !== 1) return { present: true, wish: null }
    return { present: true, wish: sanitizeWish({ cracker: o.c, to: o.t, from: o.f, msg: o.m, lang: o.l }) }
  } catch {
    return { present: true, wish: null }
  }
}
