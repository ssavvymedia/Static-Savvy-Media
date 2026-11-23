/**
 * dataLayer events for GTM/GA4. Never throws: analytics must not break the page.
 * Events: audit_form_submit, whatsapp_click, consultation_click, cta_click (plus generate_lead).
 *
 * page_view and generate_lead are also sent with gtag() to G-PTL99PJMRS, because container
 * GTM-TT9MF95 has no GA4 Event tag for them. The Google tag's own config page_view is
 * suppressed in index.html (send_page_view: false) so these calls are the only page_view.
 * Do not add a second GTM tag for the same event names.
 */
const GA_MEASUREMENT_ID = 'G-PTL99PJMRS'

export function pagePathname() {
  let path = window.location.pathname || '/'
  if (path !== '/' && !path.endsWith('/') && !/\.[a-z0-9]+$/i.test(path)) path += '/'
  return path
}

/** Direct GA4 hit via the gtag stub / the Google tag GTM already loads. */
export function sendGa4Event(eventName, params = {}) {
  try {
    if (typeof window === 'undefined') return
    window.dataLayer = window.dataLayer || []
    window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments) }
    const payload = { send_to: GA_MEASUREMENT_ID, ...params }
    const fire = () => window.gtag('event', eventName, payload)
    if (window.google_tag_manager) fire()
    else {
      let tries = 0
      const timer = setInterval(() => {
        if (window.google_tag_manager || ++tries > 40) {
          clearInterval(timer)
          fire()
        }
      }, 50)
    }
  } catch {
    /* ignore */
  }
}

let lastPageKey = ''
let pageTimer = 0

/** One page_view per path, after setSeo has written document.title. */
export function schedulePageView() {
  try {
    if (typeof window === 'undefined') return
    clearTimeout(pageTimer)
    pageTimer = setTimeout(() => {
      const page_path = pagePathname()
      const page_title = document.title || ''
      const page_location = window.location.href
      const key = `${page_path}|${page_title}`
      if (!page_title || key === lastPageKey) return
      lastPageKey = key
      const hit = { page_path, page_location, page_title, ssm_pv: 1 }
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event: 'page_view', ...hit })
      sendGa4Event('page_view', hit)
    }, 0)
  } catch {
    /* ignore */
  }
}

export function track(event, params = {}) {
  try {
    if (typeof window === 'undefined') return
    window.dataLayer = window.dataLayer || []
    const hit = { event, page_path: pagePathname(), ...params }
    window.dataLayer.push(hit)
    if (event === 'generate_lead') sendGa4Event('generate_lead', hit)
  } catch {
    /* ignore */
  }
}

const label = (el) => (el.getAttribute('data-cta') || el.getAttribute('aria-label') || el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80)

/**
 * One delegated listener for the whole app (installed once from main.jsx), so every page's
 * WhatsApp links, "Book a Consultation" buttons and CTA buttons are tracked without per-page code.
 *   whatsapp_click     any link to wa.me / api.whatsapp.com
 *   consultation_click any link marked data-track="consultation" or labelled "Book a Consultation"
 *   cta_click          any other .btn / [data-cta] / header or hero CTA link
 */
export function installClickTracking() {
  if (typeof document === 'undefined' || window.__ssmClickTracking) return
  window.__ssmClickTracking = true
  document.addEventListener(
    'click',
    (e) => {
      const el = e.target instanceof Element ? e.target.closest('a,button') : null
      if (!el) return
      const href = el.getAttribute('href') || ''
      const text = label(el)
      const section =
        el.closest('[data-section]')?.getAttribute('data-section') ||
        (el.closest('header') ? 'header' : el.closest('footer') ? 'footer' : 'body')
      const isConsult = el.getAttribute('data-track') === 'consultation' || /book a consultation/i.test(text)
      if (/wa\.me\/|api\.whatsapp\.com/i.test(href)) {
        track('whatsapp_click', { link_text: text, link_url: href.split('?')[0], cta_section: section, consultation: isConsult || undefined })
        if (isConsult) track('consultation_click', { link_text: text, cta_section: section, method: 'whatsapp' })
        return
      }
      if (isConsult) return track('consultation_click', { link_text: text, link_url: href, cta_section: section })
      if (el.matches('.btn, [data-cta], .site-header__cta, .hv2-btn') && el.type !== 'submit') {
        track('cta_click', { link_text: text, link_url: href, cta_section: section })
      }
    },
    { capture: true, passive: true },
  )
}

const ATTR_KEY = 'ssm-attribution'
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid']

/** First-touch attribution for the session: UTM tags, gclid, landing page and external referrer. */
export function captureAttribution() {
  try {
    if (typeof window === 'undefined' || sessionStorage.getItem(ATTR_KEY)) return
    const q = new URLSearchParams(window.location.search)
    const data = { landingPage: window.location.href.split('#')[0].slice(0, 300) }
    for (const k of UTM_KEYS) if (q.get(k)) data[k] = q.get(k).slice(0, 150)
    const ref = document.referrer
    if (ref && !ref.startsWith(window.location.origin)) data.referrer = ref.slice(0, 300)
    sessionStorage.setItem(ATTR_KEY, JSON.stringify(data))
  } catch {
    /* ignore */
  }
}

export function getAttribution() {
  try {
    return JSON.parse(sessionStorage.getItem(ATTR_KEY) || '{}')
  } catch {
    return {}
  }
}
