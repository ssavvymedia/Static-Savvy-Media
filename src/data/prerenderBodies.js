/**
 * Crawlable fallback HTML for key routes, written into <div id="root"> of each route's raw HTML by
 * scripts/seo/prerender-heads.mjs, plus that route's JSON-LD in the <head>.
 *
 * Why: the site is a client-rendered SPA, so the raw HTML of every route had no H1, no body text and
 * no schema. Google renders JavaScript, but many AI crawlers (and some directories/listicle tools)
 * read raw HTML only. React's createRoot() replaces this markup on load, so visitors never see it.
 * The text here must match what the page shows (same H1, same FAQs) — no extra claims.
 * Plain data only (no JSX): this file is loaded by Node at build time.
 */
import { HOME_FAQS } from './pages/homeFaqs.js'
import { ORG_SAME_AS, GBP_MAPS } from './sameAs.js'
import { content as ADS } from './pages/advertisingAgencyMadurai.js'
import { content as TN } from './pages/tamilNadu.js'
import { content as TOP } from './pages/topCompaniesMadurai.js'

const HOST = 'https://www.staticsavvymedia.com'
const PHONE = '+91 99440 40345'

const MADURAI_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: '2nd Floor, 4/3, Srinivasa Perumal Koil St, Kamarajar Salai',
  addressLocality: 'Madurai',
  addressRegion: 'Tamil Nadu',
  postalCode: '625009',
  addressCountry: 'IN',
}

const ORG_ID = `${HOST}/#organization`
const MADURAI_ID = `${HOST}/locations/madurai/#localbusiness`

const maduraiBusiness = {
  '@type': 'ProfessionalService',
  '@id': MADURAI_ID,
  name: 'Static Savvy Media',
  url: `${HOST}/`,
  telephone: PHONE,
  address: MADURAI_ADDRESS,
  hasMap: GBP_MAPS.madurai,
  areaServed: [
    { '@type': 'City', name: 'Madurai' },
    { '@type': 'State', name: 'Tamil Nadu' },
  ],
  parentOrganization: { '@id': ORG_ID },
  knowsAbout: ['Search engine optimization', 'Local SEO', 'Google Ads', 'Social media marketing', 'Website design', 'Generative engine optimization'],
}

const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Static Savvy Media',
  url: `${HOST}/`,
  logo: `${HOST}/og/heroimage.jpg`,
  telephone: PHONE,
  email: 'info@staticsavvymedia.com',
  foundingDate: '2021-10-01',
  founder: { '@type': 'Person', name: 'Deepan Kanz', url: `${HOST}/about/deepan-kanz/` },
  address: MADURAI_ADDRESS,
  sameAs: ORG_SAME_AS,
}

const faqPage = (faqs) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
})

const crumbs = (list) => ({
  '@type': 'BreadcrumbList',
  itemListElement: list.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: `${HOST}${c.path}` })),
})

const graph = (...nodes) => ({ '@context': 'https://schema.org', '@graph': nodes })

/* Convert a LocalServicePage content object into a prerender body. */
function fromContent(c, extraNodes = []) {
  return {
    h1: c.h1,
    intro: c.intro,
    sections: c.sections.map((s) => ({
      heading: s.heading,
      items: s.items.map((it) => (typeof it === 'string' ? { text: it } : { title: it.title, text: it.text, link: it.link })),
    })),
    related: c.related,
    faqs: c.faqs,
    schema: graph(...extraNodes, faqPage(c.faqs), crumbs(c.crumbs)),
  }
}

export const prerenderBodies = {
  '/': {
    h1: 'Digital Marketing Company in Madurai: Get Found by Google. Get Cited by ChatGPT.',
    intro: [
      'Static Savvy Media is a Madurai digital marketing agency helping businesses stay visible across traditional search and AI-powered answer engines: SEO, Local SEO and Google Business Profile, Google Ads, social media marketing, website design and GEO/AEO.',
      `Offices in Madurai, Thoothukudi and Rawang (Selangor, Malaysia). WhatsApp ${PHONE}.`,
    ],
    sections: [
      {
        heading: 'Digital marketing services in Madurai',
        items: [
          { title: 'SEO Company in Madurai', link: { to: '/services/seo/madurai/', label: 'SEO services in Madurai' } },
          { title: 'Local SEO & Google Business Profile', link: { to: '/services/local-seo/madurai/', label: 'Local SEO in Madurai' } },
          { title: 'Advertising: Google & Meta Ads', link: { to: '/services/advertising-agency/madurai/', label: 'Advertising agency in Madurai' } },
          { title: 'Social Media Marketing', link: { to: '/services/social-media-marketing/madurai/', label: 'Social media marketing company in Madurai' } },
          { title: 'Website Design & Development', link: { to: '/services/website-design-development/madurai/', label: 'Website design in Madurai' } },
          { title: 'GEO & AEO (AI search)', link: { to: '/services/geo-aeo-ai-search/madurai/', label: 'AI search optimisation in Madurai' } },
        ],
      },
    ],
    related: [
      { name: 'Digital Marketing Agency in Madurai', path: '/locations/madurai/' },
      { name: 'Digital Marketing Agency in Tamil Nadu', path: '/locations/tamil-nadu/' },
      { name: 'Top Digital Marketing Companies in Madurai (guide)', path: '/blog/top-digital-marketing-companies-in-madurai/' },
      { name: 'Pricing (India)', path: '/pricing/india/' },
      { name: 'Contact', path: '/contact/' },
    ],
    faqs: HOME_FAQS,
    schema: graph(organization, maduraiBusiness, { '@type': 'WebSite', name: 'Static Savvy Media', url: `${HOST}/`, publisher: { '@id': ORG_ID } }, faqPage(HOME_FAQS)),
  },
  /* /locations/madurai/ is server-rendered from its real component via src/data/ssrRoutes.js. */
  [ADS.path]: fromContent(ADS, [{ '@type': 'Service', name: 'Digital Advertising in Madurai', serviceType: 'Online advertising', provider: { '@id': MADURAI_ID }, areaServed: { '@type': 'City', name: 'Madurai' }, url: `${HOST}${ADS.path}` }, maduraiBusiness]),
  [TN.path]: fromContent(TN, [{ '@type': 'Service', name: 'Digital Marketing in Tamil Nadu', serviceType: 'Digital marketing', provider: { '@id': ORG_ID }, areaServed: { '@type': 'State', name: 'Tamil Nadu' }, url: `${HOST}${TN.path}` }, organization]),
  [TOP.path]: fromContent(TOP, [{ '@type': 'Article', headline: TOP.h1, datePublished: '2026-10-22', dateModified: '2026-10-22', author: { '@id': ORG_ID }, publisher: { '@id': ORG_ID }, url: `${HOST}${TOP.path}` }, organization]),
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function renderBodyHtml(b) {
  const out = [`<main data-prerender="1"><h1>${esc(b.h1)}</h1>`]
  for (const p of b.intro || []) out.push(`<p>${esc(p)}</p>`)
  for (const s of b.sections || []) {
    out.push(`<section><h2>${esc(s.heading)}</h2><ul>`)
    for (const it of s.items) {
      const t = it.title ? `<strong>${esc(it.title)}</strong>` : ''
      const x = it.text ? ` ${esc(it.text)}` : ''
      const l = it.link ? ` <a href="${esc(it.link.to)}">${esc(it.link.label)}</a>` : ''
      out.push(`<li>${t}${x}${l}</li>`)
    }
    out.push('</ul></section>')
  }
  if (b.related?.length) {
    out.push('<nav aria-label="Related"><h2>Related services &amp; guides</h2><ul>')
    for (const r of b.related) out.push(`<li><a href="${esc(r.path)}">${esc(r.name)}</a></li>`)
    out.push('</ul></nav>')
  }
  if (b.faqs?.length) {
    out.push('<section><h2>Frequently asked questions</h2>')
    for (const f of b.faqs) out.push(`<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`)
    out.push('</section>')
  }
  out.push(`<p>Static Savvy Media, 2nd Floor, 4/3, Srinivasa Perumal Koil St, Kamarajar Salai, Madurai 625009. WhatsApp <a href="https://wa.me/919944040345">${PHONE}</a>.</p></main>`)
  return out.join('')
}
