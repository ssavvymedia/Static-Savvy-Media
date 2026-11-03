import { memo, useEffect, useRef } from 'react'
import logoImg from '../../assets/images/logo/SSMLOGO.webp'
import '../../styles/pages/diwali.css'

/*
 * Diwali Digital Surprise (3-9 Nov 2026 IST).
 * The visitor picks a firecracker, writes a wish (English or Tamil), lights it, and shares an
 * interactive link on WhatsApp or a branded video. This component only renders static,
 * SSR-safe markup; ./surprise/app.js (lazy) drives the screens, canvas and audio.
 */

const CRACKERS = [
  { id: 'ssm', name: 'SSM Signature', ta: 'எஸ்எஸ்எம் சிக்னேச்சர்', desc: 'The SSM monogram drawn in fire', badge: 'Signature' },
  { id: 'flowerpot', name: 'Flower Pot', ta: 'புஸ்வாணம்', desc: 'A fountain of gold and cyan' },
  { id: 'chakri', name: 'Chakri', ta: 'தரைச்சக்கரம்', desc: 'A spinning wheel of sparks' },
  { id: 'rocket', name: 'Rocket', ta: 'ராக்கெட்', desc: 'Soars up and bursts' },
  { id: 'sparkler', name: 'Sparkler', ta: 'மத்தாப்பு', desc: 'A crackling star' },
]

const Icon = {
  back: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  sound: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" /><path className="dw-ic-wave" d="M16 8.5a5 5 0 010 7M18.5 6a8.5 8.5 0 010 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path className="dw-ic-mute" d="M16.5 9.5l5 5m0-5l-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
  ),
  wa: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.2-.4.3-.4.8-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 001.8-1.3 2.2 2.2 0 00.2-1.3c-.1-.1-.3-.2-.5-.3z" /></svg>
  ),
  down: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 20h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
}

function Diwali2026() {
  const root = useRef(null)
  useEffect(() => {
    let alive = true
    let app = null
    import('./surprise/app.js')
      .then((m) => {
        if (alive && root.current) app = m.mount(root.current)
      })
      .catch(() => {
        const el = root.current && root.current.querySelector('#dw-boot-error')
        if (el) el.hidden = false
      })
    return () => {
      alive = false
      if (app) app.destroy()
    }
  }, [])

  return (
    <div className="dw" ref={root} data-screen="welcome" data-logo={logoImg}>
      <canvas className="dw-stage" id="dw-stage" aria-hidden="true" />
      <div className="dw-vignette" aria-hidden="true" />

      <header className="dw-top">
        <button type="button" className="dw-icon-btn" id="dw-back" aria-label="Back" hidden>
          {Icon.back}
        </button>
        <a className="dw-brand" href="/" aria-label="Static Savvy Media home">
          <img src={logoImg} alt="Static Savvy Media" width="480" height="320" />
          <span>Diwali Surprise</span>
        </a>
        <button type="button" className="dw-icon-btn dw-sound" id="dw-sound" aria-label="Sound on" aria-pressed="true">
          {Icon.sound}
        </button>
      </header>

      {/* Welcome */}
      <section className="dw-screen dw-welcome is-on" id="dw-s-welcome" aria-labelledby="dw-h1">
        <p className="dw-eyebrow">Static Savvy Media presents</p>
        <h1 id="dw-h1" className="dw-h1">
          Diwali Digital Surprise
        </h1>
        <p className="dw-lede">
          Pick a firecracker, write your wish in English or <span lang="ta">தமிழ்</span>, and send a surprise your loved ones can light up on WhatsApp.
        </p>
        <button type="button" className="dw-btn dw-btn--gold" id="dw-start">
          Create a Surprise ✨
        </button>
        <p className="dw-note" id="dw-window">Free to create · 3 to 9 Nov 2026</p>
        <p className="dw-note dw-note--warn" id="dw-boot-error" hidden>
          Something went wrong loading the fireworks. Please refresh the page.
        </p>
      </section>

      {/* Step 1: firecracker */}
      <section className="dw-screen dw-choose" id="dw-s-choose" aria-labelledby="dw-h-choose" hidden>
        <p className="dw-step">Step 1 of 2</p>
        <h2 id="dw-h-choose" className="dw-h2">Choose Your Firecracker</h2>
        <div className="dw-cards" role="radiogroup" aria-label="Firecrackers">
          {CRACKERS.map((c, i) => (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={i === 0 ? 'true' : 'false'}
              className={`dw-card${i === 0 ? ' is-sel dw-card--hero' : ''}`}
              data-cracker={c.id}
            >
              <canvas className="dw-card-cv" aria-hidden="true" />
              {c.badge ? <span className="dw-badge">{c.badge}</span> : null}
              <span className="dw-card-txt">
                <strong>{c.name}</strong>
                <span lang="ta">{c.ta}</span>
                <small>{c.desc}</small>
              </span>
            </button>
          ))}
        </div>
        <div className="dw-dock">
          <button type="button" className="dw-btn dw-btn--ghost" id="dw-preview">Preview</button>
          <button type="button" className="dw-btn dw-btn--gold" id="dw-continue">Continue</button>
        </div>
      </section>

      {/* Light: preview, sender check, recipient */}
      <section className="dw-screen dw-light" id="dw-s-light" aria-labelledby="dw-light-title" hidden>
        <p className="dw-step" id="dw-light-step">Preview</p>
        <h2 className="dw-h2" id="dw-light-title">Light the firecracker</h2>
        <p className="dw-sub" id="dw-light-sub" />
        <p className="dw-hint" id="dw-light-hint">Drag the agarbathi to the fuse, or tap the button</p>
        <div className="dw-light-ctl">
          <button type="button" className="dw-btn dw-btn--gold dw-btn--pulse" id="dw-light-btn">Light it 🪔</button>
          <div className="dw-after" id="dw-light-after" hidden>
            <button type="button" className="dw-btn dw-btn--ghost" id="dw-light-again">Again</button>
            <button type="button" className="dw-btn dw-btn--gold" id="dw-light-pick">Choose this</button>
          </div>
        </div>
      </section>

      {/* Step 2: personalise */}
      <section className="dw-screen dw-create" id="dw-s-create" aria-labelledby="dw-h-create" hidden>
        <p className="dw-step">Step 2 of 2</p>
        <h2 id="dw-h-create" className="dw-h2">Personalise Your Wish</h2>
        <div className="dw-pcard" id="dw-pcard" aria-label="Live preview of your wish">
          <canvas className="dw-pcard-cv" id="dw-pcard-cv" aria-hidden="true" />
          <div className="dw-pcard-txt">
            <p className="dw-pc-head" id="dw-pc-head">Happy Diwali,</p>
            <p className="dw-pc-name" id="dw-pc-name">Someone special</p>
            <p className="dw-pc-msg" id="dw-pc-msg" />
            <p className="dw-pc-sig" id="dw-pc-sig">With love, you</p>
          </div>
        </div>
        <form className="dw-form" id="dw-form" noValidate>
          <div className="dw-seg" role="radiogroup" aria-label="Wish language">
            <button type="button" role="radio" aria-checked="true" className="is-on" data-lang="en">English</button>
            <button type="button" role="radio" aria-checked="false" data-lang="ta" lang="ta">தமிழ்</button>
          </div>
          <div className="dw-row">
            <label className="dw-field">
              <span>To</span>
              <input id="dw-to" name="recipient" type="text" autoComplete="off" maxLength="24" placeholder="Recipient's name" required />
              <em className="dw-err" data-err="recipient" />
            </label>
            <label className="dw-field">
              <span>From</span>
              <input id="dw-from" name="sender" type="text" autoComplete="name" maxLength="24" placeholder="Your name" required />
              <em className="dw-err" data-err="sender" />
            </label>
          </div>
          <label className="dw-field">
            <span>Your phone (sender)</span>
            <input id="dw-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength="16" placeholder="+91 98765 43210" required />
            <em className="dw-err" data-err="phone" />
          </label>
          <div className="dw-field">
            <span id="dw-chips-label">Pick a ready-made wish</span>
            <div className="dw-chips" id="dw-chips" role="list" aria-labelledby="dw-chips-label" />
          </div>
          <label className="dw-field">
            <span>
              Your message <b className="dw-count" id="dw-count">0/180</b>
            </span>
            <textarea id="dw-msg" name="message" rows="3" maxLength="180" placeholder="Write your Diwali wish" required />
            <em className="dw-err" data-err="message" />
          </label>
          <label className="dw-hp" aria-hidden="true">
            Website <input name="website" type="text" tabIndex="-1" autoComplete="off" />
          </label>
          <p className="dw-form-err" id="dw-form-err" role="alert" />
          <button type="submit" className="dw-btn dw-btn--gold dw-btn--wide" id="dw-submit">Create My Diwali Surprise ✨</button>
          <p className="dw-fine">
            Your name and phone are saved by Static Savvy Media for this Diwali campaign. We never show your number in the shared wish.
          </p>
        </form>
      </section>

      {/* Reveal */}
      <section className="dw-screen dw-reveal" id="dw-s-reveal" aria-live="polite" hidden>
        <div className="dw-wish" id="dw-wish">
          <p className="dw-w-head" id="dw-r-head" />
          <p className="dw-w-name" id="dw-r-name" />
          <p className="dw-w-msg" id="dw-r-msg" />
          <p className="dw-w-sig" id="dw-r-sig" />
        </div>
        <p className="dw-hint dw-tap" id="dw-tap">Tap the sky for more fireworks</p>
        <div className="dw-sheet" id="dw-sheet">
          <div className="dw-sheet-sender" id="dw-sheet-sender">
            <a className="dw-btn dw-btn--wa dw-btn--wide" id="dw-wa" href="https://wa.me/" target="_blank" rel="noopener noreferrer">
              {Icon.wa} Share on WhatsApp
            </a>
            <button type="button" className="dw-btn dw-btn--gold dw-btn--wide" id="dw-video">
              {Icon.down} Download Diwali Video
            </button>
            <div className="dw-mini">
              <button type="button" id="dw-copy">Copy link</button>
              <button type="button" id="dw-replay">Replay</button>
              <button type="button" id="dw-another">Another</button>
            </div>
          </div>
          <div className="dw-sheet-recip" id="dw-sheet-recip" hidden>
            <div className="dw-mini">
              <button type="button" id="dw-r-replay">Replay</button>
              <button type="button" id="dw-r-video">Save video</button>
            </div>
            <button type="button" className="dw-btn dw-btn--ghost dw-btn--wide" id="dw-own">Create your own Diwali surprise ✨</button>
          </div>
          <p className="dw-made">
            Made with <span aria-label="love">❤</span> by <a href="/">Static Savvy Media</a>
          </p>
        </div>
      </section>

      {/* Video modal */}
      <div className="dw-modal" id="dw-modal" role="dialog" aria-modal="true" aria-labelledby="dw-m-title" hidden>
        <div className="dw-modal-box">
          <div id="dw-m-progress">
            <h2 className="dw-h3" id="dw-m-title">Crafting your Diwali video…</h2>
            <div className="dw-bar"><i id="dw-m-bar" /></div>
            <p className="dw-sub" id="dw-m-pct">Rendering 0%</p>
            <button type="button" className="dw-btn dw-btn--ghost" id="dw-m-cancel">Cancel</button>
          </div>
          <div id="dw-m-ready" hidden>
            <h2 className="dw-h3">Your Diwali video is ready</h2>
            <video id="dw-m-video" playsInline controls muted loop preload="metadata" />
            <button type="button" className="dw-btn dw-btn--wa dw-btn--wide" id="dw-m-share">{Icon.wa} Share to WhatsApp Status</button>
            <a className="dw-btn dw-btn--gold dw-btn--wide" id="dw-m-save" href="#save" download="diwali-surprise.mp4">{Icon.down} Save video</a>
            <p className="dw-fine" id="dw-m-note" />
            <button type="button" className="dw-link" id="dw-m-close">Close</button>
          </div>
        </div>
      </div>

      <div className="dw-toast" id="dw-toast" role="status" aria-live="polite" />
    </div>
  )
}

export default memo(Diwali2026)
