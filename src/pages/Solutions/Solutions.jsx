import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import FAQSection from '../../components/sections/FAQSection.jsx'
import { AnswerFirst, AuditBlock, CardGrid, Ico } from '../../components/v2/V2Blocks.jsx'
import { setSeo } from '../../utils/seo.js'
import { SITE_URL } from '../../utils/constants.js'

/* /solutions/: the five growth solutions, each linking the existing service and service×city pages. */
const PAGE_TITLE = 'Growth Solutions: SEO, AI Search & Google Ads | Static Savvy Media'
const PAGE_DESCRIPTION = 'Five growth solutions from Static Savvy Media, Madurai: SEO & content, AI search (GEO/AEO), Local SEO & Google Business Profile, Google Ads and website development, for India and Malaysia.'

const SOLUTIONS = [
  {
    name: 'SEO & Content Growth',
    text: 'Technical SEO, keyword research by city and service, and content that answers what your buyers actually search. Built to compound: every page we add keeps bringing enquiries after the month it was written.',
    d: 'M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4-4M8 11h6M11 8v6',
    links: [
      { to: '/services/seo/', label: 'SEO services', main: true },
      { to: '/services/seo/madurai/', label: 'SEO company in Madurai (HQ)' },
      { to: '/services/seo/thoothukudi/', label: 'SEO in Thoothukudi' },
      { to: '/services/seo/malaysia/', label: 'SEO company in Malaysia' },
      { to: '/services/seo/kuala-lumpur/', label: 'SEO agency in Kuala Lumpur' },
    ],
  },
  {
    name: 'AI Search (GEO / AEO)',
    text: 'Structure your website, profiles and mentions so ChatGPT, Perplexity, Gemini and Google AI Overviews can understand your business and cite it when buyers ask for a recommendation.',
    d: 'M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2zM19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z',
    links: [
      { to: '/services/geo-aeo-ai-search/', label: 'GEO & AEO, AI search optimisation', main: true },
      { to: '/services/geo-aeo-ai-search/madurai/', label: 'GEO & AEO in Madurai (HQ)' },
      { to: '/blog/what-is-generative-engine-optimization/', label: 'Guide: what is GEO?' },
      { to: '/blog/what-is-answer-engine-optimization/', label: 'Guide: what is AEO?' },
    ],
  },
  {
    name: 'Local SEO & Google Business Profile',
    text: 'Google Business Profile set-up and upkeep, categories, service areas, photos, a reviews routine and local pages, so you show up in the Google Maps pack in every city you serve.',
    d: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0116 0zM12 7a3 3 0 100 6 3 3 0 000-6z',
    links: [
      { to: '/services/local-seo/', label: 'Local SEO services', main: true },
      { to: '/services/local-seo/madurai/', label: 'Local SEO in Madurai (HQ)' },
      { to: '/services/local-seo/thoothukudi/', label: 'Local SEO in Thoothukudi' },
      { to: '/services/local-seo/malaysia/', label: 'Local SEO in Malaysia' },
      { to: '/blog/google-business-profile-checklist-madurai/', label: 'Google Business Profile checklist' },
    ],
  },
  {
    name: 'Google Ads (PPC)',
    text: 'Search, Maps and YouTube campaigns set up around enquiries, not clicks: call and WhatsApp tracking, form conversions and negative keywords reviewed every month, reported from your own Google Ads account.',
    d: 'M3 11l15-6v14L3 13zM7 13v5a2 2 0 004 0v-4',
    links: [
      { to: '/services/google-ads/', label: 'Google Ads management', main: true },
      { to: '/services/advertising-agency/madurai/', label: 'Advertising agency in Madurai (HQ)' },
      { to: '/services/google-ads/thoothukudi/', label: 'Google Ads in Thoothukudi' },
      { to: '/services/google-ads/kuala-lumpur/', label: 'Google Ads in Kuala Lumpur' },
      { to: '/blog/seo-vs-google-ads-madurai/', label: 'Guide: SEO vs Google Ads' },
    ],
  },
  {
    name: 'Website Development',
    text: 'Fast, mobile-first websites with clear service pages, WhatsApp and call buttons, enquiry forms and the technical SEO groundwork done from day one, so the site can rank and convert.',
    d: 'M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14',
    links: [
      { to: '/services/website-design-development/', label: 'Website design & development', main: true },
      { to: '/services/website-design-development/madurai/', label: 'Website design in Madurai (HQ)' },
      { to: '/blog/website-design-company-madurai-checklist/', label: 'Checklist: choosing a website company' },
    ],
  },
]

const MORE = [
  { title: 'Social media marketing', text: 'Content calendars, reels and paid social for Instagram and Facebook, tied back to enquiries.', link: '/services/social-media-marketing/', linkLabel: 'Social media marketing' },
  { title: 'AI business automation', text: 'WhatsApp, lead routing and follow-up automations so enquiries are answered and tracked.', link: '/services/ai-business-automation/', linkLabel: 'AI business automation' },
  { title: 'Photography, video & creative', text: 'Corporate shoots, product photography, design and AI video for your website, ads and profiles.', link: '/services/corporate-photography-video/', linkLabel: 'Photography & video' },
]

const FAQS = [
  { question: 'Which growth solution should I start with?', answer: 'It depends on how your customers find you. If most enquiries come from people searching near them, start with Local SEO and your Google Business Profile. If buyers compare options online before calling, SEO and content come first. Google Ads is the fastest way to test demand while SEO builds. The free Growth Audit tells you which one to start with for your business.' },
  { question: 'Can I combine several solutions?', answer: 'Yes, and most clients do. SEO, Local SEO and AI search share the same groundwork (a fast website, clear service pages, consistent business details), so running them together costs less effort than running them separately. We agree the scope and priorities with you before any work starts.' },
  { question: 'Do you offer these solutions outside Madurai?', answer: 'Yes. Our HQ is in Madurai, Tamil Nadu, with an office in Thoothukudi and a Malaysia office in Rawang, Selangor. We work with businesses across Tamil Nadu, India and Malaysia, in person where we have an office and by video call and WhatsApp elsewhere.' },
  { question: 'How do you report results?', answer: 'You get a monthly plain-English report from your own Google accounts (Search Console, Analytics, Business Profile and Ads), covering rankings, Maps actions, calls, WhatsApp chats and form enquiries, plus a shared log of the work done and what comes next.' },
  { question: 'How much do these solutions cost?', answer: 'Pricing depends on your market, competition and scope, so we quote after the audit. Our cost guides for Madurai and Malaysia show typical market ranges for each type of work, and those ranges are not our prices.' },
]

export default function Solutions() {
  useEffect(() => {
    setSeo({ title: PAGE_TITLE, description: PAGE_DESCRIPTION, canonical: `${SITE_URL}/solutions/`, ogType: 'website' })
  }, [])

  return (
    <div className="solutions-page">
      <Breadcrumbs />
      <section className="hv2 hv2-section" style={{ paddingBottom: 0 }} data-section="hero">
        <div className="hv2-wrap">
          <span className="hv2-eyebrow">Growth solutions · Madurai HQ · India & Malaysia</span>
          <h1 className="hv2-h2" style={{ fontSize: 'clamp(32px,4.4vw,52px)', marginTop: 12 }}>Growth Solutions: SEO, AI Search, Local SEO, Google Ads and Websites</h1>
          <p className="hv2-lead" style={{ marginTop: 16, maxWidth: 760 }}>Five ways we help small and mid-sized businesses get found and get enquiries, run from our Madurai HQ with offices in Thoothukudi and Rawang, Malaysia. Each solution links to the full service page and the city pages where we offer it.</p>
          <p style={{ marginTop: 22 }}><a className="hv2-link" href="#audit">Not sure where to start? Get a free Growth Audit <span className="hv2-arrow" aria-hidden="true">→</span></a></p>
        </div>
      </section>

      <AnswerFirst heading="What are Static Savvy Media’s growth solutions?" text="Static Savvy Media groups its services into five growth solutions: SEO & Content Growth, AI Search (GEO/AEO), Local SEO & Google Business Profile, Google Ads (PPC) and Website Development. They are delivered from our Madurai HQ for businesses in Tamil Nadu, India and Malaysia, and reported monthly from your own Google accounts." facts={['5 growth solutions', 'Madurai HQ since 2021', 'Offices: Thoothukudi, Rawang (Malaysia)', 'WhatsApp +91 99440 40345']} />

      <section className="hv2 hv2-section hv2-section--flush" data-section="solutions" style={{ paddingTop: 'clamp(40px,5vw,64px)' }}>
        <div className="hv2-wrap">
          <span className="hv2-eyebrow">The five solutions</span>
          <h2 className="hv2-h2">Pick the solution that matches how your customers find you.</h2>
          <div className="hv2-sol">
            {SOLUTIONS.map((s) => (
              <article className="hv2-sol__item" key={s.name}>
                <Ico d={s.d} />
                <div><h3>{s.name}</h3><p>{s.text}</p></div>
                <ul className="hv2-sol__links">
                  {s.links.map((l) => <li key={l.to}><Link to={l.to} className={l.main ? 'is-main' : undefined}>{l.label} →</Link></li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CardGrid section="more-services" eyebrow="Also available" heading="More services that support growth" items={MORE} />

      <FAQSection eyebrow="FAQ" title="Growth solutions: frequently asked questions" faqs={FAQS} />

      <AuditBlock formId="growth_audit_solutions" defaultCity="" />
    </div>
  )
}
