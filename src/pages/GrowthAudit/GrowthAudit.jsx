import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import FAQSection from '../../components/sections/FAQSection.jsx'
import { AnswerFirst, AuditBlock, CardGrid, ReviewsCarousel } from '../../components/v2/V2Blocks.jsx'
import { setSeo } from '../../utils/seo.js'
import { SITE_URL } from '../../utils/constants.js'
import '../../styles/pages/growth-audit.css'

/* /growth-audit/: landing page for the free Business Growth Audit (leads go by email via the shared form). */
const PAGE_TITLE = 'Free Business Growth Audit | Static Savvy Media, Madurai'
const PAGE_DESCRIPTION = 'Request a free Business Growth Audit: website & SEO health, Google Business Profile, AI search presence, competitors and a prioritised 90-day plan, prepared by our Madurai team.'

const COVERS = [
  { title: 'Website & SEO health', text: 'Speed, mobile usability, indexing, titles, internal links and whether each service and city has a page that can rank.' },
  { title: 'Google Business Profile', text: 'Categories, service areas, pin, photos, hours, reviews and how you appear in the Google Maps pack for your main searches.' },
  { title: 'AI search presence', text: 'Whether ChatGPT, Gemini, Perplexity and Google AI Overviews mention your business when buyers ask for a recommendation, and what they get wrong.' },
  { title: 'Competitor snapshot', text: 'Who ranks above you in search and Maps for your key terms, and what they have that you do not: pages, reviews, links or content.' },
  { title: 'Enquiry paths & tracking', text: 'How easy it is to call, WhatsApp or send an enquiry, and whether calls and forms are tracked so you can see what works.' },
  { title: 'Prioritised 90-day plan', text: 'What to fix first, what can wait and what to ignore, ordered by likely impact on enquiries, not by how much work it creates for us.' },
]

const STEPS = [
  { title: '1. Send the form', text: 'Your business name, website or Google Business Profile link, city, and what you want more of. It takes about a minute.' },
  { title: '2. We confirm the details', text: 'We reply within 1 working day on WhatsApp, phone or email to confirm your main services, locations and competitors.' },
  { title: '3. We prepare the audit', text: 'Our team reviews your website, profile, AI search answers and competitors by hand, not with an automated score.' },
  { title: '4. Walk-through', text: 'We share the findings and the 90-day plan on a short call or by WhatsApp. You keep the plan whether or not you work with us.' },
]

const SAMPLE = [
  { area: 'Website & SEO', finding: 'Example: two services share one page, so neither ranks for its own searches.', action: 'Split into separate service pages with their own titles and FAQs.', level: 'High' },
  { area: 'Google Business Profile', finding: 'Example: primary category is broader than the main service customers search for.', action: 'Change the primary category and add missing secondary ones.', level: 'High' },
  { area: 'AI search', finding: 'Example: an AI assistant lists outdated opening hours for the business.', action: 'Make hours consistent on the website, profile and directories.', level: 'Medium' },
  { area: 'Competitors', finding: 'Example: the top Maps competitor has a page per area served.', action: 'Add area pages only where you genuinely serve customers.', level: 'Medium' },
  { area: 'Tracking', finding: 'Example: WhatsApp clicks are not recorded as enquiries.', action: 'Track calls, WhatsApp and forms as conversions.', level: 'Low' },
]

const FAQS = [
  { question: 'Is the Growth Audit really free?', answer: 'Yes, for qualified businesses. There is no fee and no obligation to hire us. We prepare it by hand, so we may decline requests that are not a fit, for example businesses we cannot help or markets we do not serve.' },
  { question: 'What do I receive?', answer: 'A written review of your website and SEO health, Google Business Profile, AI search presence, competitors and enquiry tracking, plus a prioritised 90-day plan. We walk you through it on a short call or by WhatsApp.' },
  { question: 'How soon will you reply?', answer: 'We reply within 1 working day on WhatsApp, phone or email to confirm the details. The audit itself follows once we have confirmed your main services, locations and competitors.' },
  { question: 'Do you need access to my accounts?', answer: 'No. The audit uses what is publicly visible: your website, Google Business Profile, search results and AI assistant answers. If you later want a deeper review, we can look at Search Console or Analytics with your permission.' },
  { question: 'Which businesses and locations do you audit?', answer: 'Small and mid-sized businesses in Madurai (our HQ), Thoothukudi and across Tamil Nadu and India, in Malaysia through our Rawang office, and selected businesses in Singapore and the UAE.' },
  { question: 'Is the sample report on this page a real client?', answer: 'No. The sample report is illustrative only. It shows the format and the kind of findings we report, not a real client’s data or results.' },
  { question: 'Why do you ask for a budget range?', answer: 'It helps us suggest a plan you can actually run. The ranges are your marketing budget, not our fees, and you can choose “not sure yet”.' },
]

export default function GrowthAudit() {
  useEffect(() => {
    setSeo({ title: PAGE_TITLE, description: PAGE_DESCRIPTION, canonical: `${SITE_URL}/growth-audit/`, ogType: 'website' })
  }, [])

  return (
    <div className="growth-audit-page">
      <Breadcrumbs />
      <section className="hv2 hv2-section" style={{ paddingBottom: 0 }} data-section="hero">
        <div className="hv2-wrap">
          <span className="hv2-eyebrow">Free for qualified businesses · Prepared by our Madurai team</span>
          <h1 className="hv2-h2" style={{ fontSize: 'clamp(32px,4.4vw,52px)', marginTop: 12 }}>Get a Free Business Growth Audit</h1>
          <p className="hv2-lead" style={{ marginTop: 16, maxWidth: 760 }}>Find out why customers are, or are not, finding you on Google, Google Maps and AI assistants, and what to fix first. A hand-prepared review of your website, Google Business Profile, AI search presence and competitors, with a prioritised 90-day plan.</p>
          <p style={{ marginTop: 22, display: 'flex', gap: 22, flexWrap: 'wrap' }}>
            <a className="hv2-btn hv2-btn--primary" href="#audit">Request my free audit</a>
            <a className="hv2-link" href="#sample-report">See a sample report <span className="hv2-arrow" aria-hidden="true">→</span></a>
          </p>
        </div>
      </section>

      <AnswerFirst heading="What is the Static Savvy Media Growth Audit?" text="The Growth Audit is a free, hand-prepared review by Static Savvy Media’s Madurai team of your website and SEO health, Google Business Profile, AI search presence, competitors and enquiry tracking, ending in a prioritised 90-day plan. Send the form and we reply within 1 working day on WhatsApp, phone or email." facts={['Free for qualified businesses', 'Reply within 1 working day', 'No account access needed', 'No obligation']} />

      <CardGrid section="audit-covers" eyebrow="What the audit covers" heading="Six things we check" items={COVERS} />

      <section className="hv2 hv2-section hv2-section--flush" data-section="sample-report" style={{ paddingTop: 'clamp(40px,5vw,64px)' }} id="sample-report">
        <div className="hv2-wrap">
          <span className="hv2-eyebrow">Sample report</span>
          <h2 className="hv2-h2">What a findings page looks like</h2>
          <p className="hv2-lead" style={{ margin: '12px 0 24px' }}>The format we use for every audit: the area, what we found, what to do and how much it matters.</p>
          <div className="ga-sample">
            <div className="ga-sample__label" role="note">Illustrative sample only. Not a real client, not real data or results.</div>
            <div className="ga-sample__head">
              <strong>Business Growth Audit</strong>
              <span>Prepared for: Example Clinic, Madurai (fictional)</span>
            </div>
            <div className="hv2-table-wrap">
              <table className="hv2-table">
                <caption className="ga-sample__cap">Illustrative findings (fictional example)</caption>
                <thead><tr><th scope="col">Area</th><th scope="col">Finding</th><th scope="col">Recommended action</th><th scope="col">Priority</th></tr></thead>
                <tbody>
                  {SAMPLE.map((r) => (
                    <tr key={r.area}><td>{r.area}</td><td>{r.finding}</td><td>{r.action}</td><td><span className={`ga-pill ga-pill--${r.level.toLowerCase()}`}>{r.level}</span></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="hv2-fine" style={{ marginTop: 12 }}>Your audit is written for your business, locations and competitors. Findings above are examples of the format only.</p>
          </div>
        </div>
      </section>

      <CardGrid section="audit-process" eyebrow="How it works" heading="From form to plan in four steps" items={STEPS} cols={4} />

      <AuditBlock formId="growth_audit_landing" defaultCity="" eyebrow="Free Growth Audit" title="Request your Business Growth Audit." lead="Tell us about your business. We reply within 1 working day on WhatsApp, phone or email. Your request goes straight to our team by email." />

      <ReviewsCarousel limit={3} />

      <FAQSection eyebrow="FAQ" title="Growth Audit: frequently asked questions" faqs={FAQS} />

      <section className="hv2 hv2-section hv2-section--flush" style={{ paddingTop: 'clamp(24px,3vw,40px)' }}>
        <div className="hv2-wrap"><p className="hv2-lead">Prefer to read first? See our <Link className="hv2-link" to="/solutions/">growth solutions</Link>, the <Link className="hv2-link" to="/locations/madurai/">Madurai HQ</Link> page or <Link className="hv2-link" to="/about/reviews/">Google reviews</Link>.</p></div>
      </section>
    </div>
  )
}
