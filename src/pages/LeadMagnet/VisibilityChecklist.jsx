import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import GrowthAuditForm from '../../components/sections/GrowthAuditForm.jsx'
import { setSeo } from '../../utils/seo.js'
import { SITE_URL } from '../../utils/constants.js'
import '../../styles/pages/growth-audit.css'
import '../../styles/pages/visibility-checklist.css'

const PAGE_TITLE = 'Free Local Visibility Checklist | Google + Maps + AI | Static Savvy Media'
const PAGE_DESCRIPTION = 'Get the free 2026 Local Business Visibility Checklist: practical steps for Google Search, Google Maps and AI answers (GEO/AEO). Instant value for Madurai, Tamil Nadu & Malaysia businesses.'

const CHECKLIST = [
  { section: 'Google Business Profile', items: [
    'Primary category matches what customers actually search for',
    'Secondary categories cover related services',
    'Business name, address and phone are consistent everywhere',
    'Photos uploaded in the last 30 days (cover, interior, team, products)',
    'Opening hours accurate and special hours set for holidays',
    'Services and products listed with descriptions',
    'Recent reviews responded to (positive and negative)',
    'Google Posts published at least twice a month',
  ]},
  { section: 'Website & SEO basics', items: [
    'Each main service has its own page with a clear title and H1',
    'City or area pages exist for locations you genuinely serve',
    'Mobile speed is acceptable (Core Web Vitals)',
    'Contact details (phone + WhatsApp) visible above the fold',
    'Schema markup for LocalBusiness / Organization present',
    'Internal links between related services and locations',
  ]},
  { section: 'AI Search (GEO / AEO)', items: [
    'Business name and key facts appear consistently on the website',
    'Clear answers to common customer questions on the site',
    'Google Business Profile and website data match',
    'You are monitoring how ChatGPT, Gemini and Perplexity describe you',
    'Content is structured so AI tools can extract accurate facts',
  ]},
  { section: 'Tracking & next steps', items: [
    'Calls, WhatsApp clicks and form submissions are tracked',
    'You know which pages and channels produce enquiries',
    'A simple 90-day priority list exists (or request our free Growth Audit)',
  ]},
]

export default function VisibilityChecklist() {
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    setSeo({ title: PAGE_TITLE, description: PAGE_DESCRIPTION, canonical: `${SITE_URL}/free-visibility-checklist/`, ogType: 'website' })
  }, [])

  return (
    <div className="growth-audit-page">
      <Breadcrumbs />
      <section className="hv2 hv2-section" style={{ paddingBottom: 0 }} data-section="hero">
        <div className="hv2-wrap">
          <span className="hv2-eyebrow">Free instant checklist · Madurai team</span>
          <h1 className="hv2-h2" style={{ fontSize: 'clamp(32px,4.4vw,52px)', marginTop: 12 }}>
            The 2026 Local Visibility Checklist
          </h1>
          <p className="hv2-lead" style={{ marginTop: 16, maxWidth: 760 }}>
            Practical steps to get found on Google Search, Google Maps and AI assistants (ChatGPT, Gemini, Perplexity). Built for local businesses in Madurai, Tamil Nadu, Malaysia and beyond.
          </p>
          <p style={{ marginTop: 22 }}>
            <a className="hv2-btn hv2-btn--primary" href="#get-checklist">Get the free checklist</a>
          </p>
        </div>
      </section>

      <section className="hv2 hv2-section" style={{ paddingTop: 'clamp(28px,4vw,48px)' }}>
        <div className="hv2-wrap">
          <h2 className="hv2-h2">What you will check</h2>
          <p className="hv2-lead">A short, actionable list — no fluff. Use it yourself or as the starting point for our free Growth Audit.</p>
          <div className="vc-grid">
            {CHECKLIST.map((block) => (
              <div key={block.section} className="vc-card">
                <h3 className="vc-card__title">{block.section}</h3>
                <ul className="vc-list">
                  {block.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="get-checklist" className="hv2 hv2-section" style={{ paddingTop: 'clamp(40px,5vw,64px)' }}>
        <div className="hv2-wrap">
          <span className="hv2-eyebrow">Unlock & get your copy</span>
          <h2 className="hv2-h2">Send me the checklist</h2>
          <p className="hv2-lead">Enter your details. We’ll email you the checklist and, if it makes sense, follow up with your free Business Growth Audit.</p>
          <div style={{ marginTop: 24, maxWidth: 640 }}>
            <GrowthAuditForm formId="visibility_checklist" defaultCity="Madurai" compact />
          </div>
          <p style={{ marginTop: 16 }} className="hv2-fine">
            Prefer the full hand-prepared review? <Link className="hv2-link" to="/growth-audit/">Request the free Growth Audit</Link>.
          </p>
        </div>
      </section>
    </div>
  )
}
