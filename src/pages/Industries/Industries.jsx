import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import { AnswerFirst, AuditBlock, CardGrid, PhotoCards } from '../../components/v2/V2Blocks.jsx'
import { setSeo } from '../../utils/seo.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL } from '../../utils/constants.js'
import IndHealthcare from '../../assets/images/home/ind-healthcare.webp'
import IndRealEstate from '../../assets/images/home/ind-realestate.webp'
import IndManufacturing from '../../assets/images/home/ind-manufacturing.webp'
import IndEducation from '../../assets/images/home/ind-education.webp'
import IndHospitality from '../../assets/images/home/ind-hospitality.webp'

/* Industries hub (v2 design): photo cards for every sector page, then how marketing differs by industry. */
const PAGE_TITLE = 'Digital Marketing by Industry | Static Savvy Media'
const PAGE_DESCRIPTION = 'Industry-focused digital marketing from our Madurai HQ for healthcare, real estate, manufacturing & B2B, education, hospitality, retail, textiles.'

const FEATURED = [
  { name: 'Healthcare & Medical', to: '/industries/healthcare-clinics/', img: IndHealthcare, alt: 'Bright modern clinic reception', text: 'Help patients find your clinic on Google Maps and AI search, trust your doctors and book.', d: 'M12 21s-7-4.5-9-9.5C1.8 8 4 4.5 7.5 4.5c2 0 3.4 1.1 4.5 2.6 1.1-1.5 2.5-2.6 4.5-2.6C20 4.5 22.2 8 21 11.5 19 16.5 12 21 12 21zM12 9v5M9.5 11.5h5' },
  { name: 'Real Estate & Construction', to: '/industries/real-estate-builders/', img: IndRealEstate, alt: 'Modern apartment building at golden hour', text: 'Project pages, local search and Google Ads that bring qualified site-visit enquiries.', d: 'M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6' },
  { name: 'Manufacturing & B2B', to: '/industries/manufacturing-b2b/', img: IndManufacturing, alt: 'Modern manufacturing facility with fabric rolls', text: 'B2B SEO, Google Ads and AI search that bring RFQs from buyers searching by product.', d: 'M3 21V10l6 4V10l6 4V6l6 3v12zM7 17h2M12 17h2M17 17h2' },
  { name: 'Education & Training', to: '/industries/education-training/', img: IndEducation, alt: 'Students walking on a modern campus', text: 'Reach students and parents when they search for courses, admissions and coaching.', d: 'M2 9l10-5 10 5-10 5zM6 11v5c3 2.5 9 2.5 12 0v-5M22 9v6' },
  { name: 'Hospitality & Travel', to: '/industries/hospitality-hotels/', img: IndHospitality, alt: 'Tropical resort pool at dusk', text: 'More direct bookings through Maps, reviews, search and social.', d: 'M3 18c2 0 2-1.5 4.5-1.5S10 18 12 18s2-1.5 4.5-1.5S19 18 21 18M12 14V7M12 7c-1-2.5-4-3-6-2 1.8.4 3.5 1.5 4 3M12 7c1-2.5 4-3 6-2-1.8.4-3.5 1.5-4 3' },
]

const MORE = [
  { title: 'Retail & E-Commerce', text: 'Product discovery and conversion across Google, social platforms, marketplaces and your own online store.', link: '/industries/retail-ecommerce/', linkLabel: 'Retail & e-commerce' },
  { title: 'Textiles (Madurai)', text: 'Visibility for textile retailers, mills and garment makers selling to regional, national and export buyers.', link: '/industries/textiles-madurai/', linkLabel: 'Textiles in Madurai' },
  { title: 'Port, Marine & Industrial (Thoothukudi)', text: 'B2B visibility for shipping, logistics, marine and industrial firms targeting procurement teams.', link: '/industries/port-marine-industrial-thoothukudi/', linkLabel: 'Port, marine & industrial' },
  { title: 'SMEs (Malaysia)', text: 'Growth marketing and digital adoption support for Malaysian SMEs, from our Rawang office in Selangor.', link: '/industries/smes-malaysia-grant-eligible/', linkLabel: 'Malaysian SMEs' },
]

const COMPARISON = [
  ['Healthcare', 'Patients', 'Trust + local discovery', 'Local SEO + Google Ads'],
  ['Real estate', 'Property buyers', 'Qualified leads', 'SEO + Google Ads + lead gen'],
  ['Manufacturing & B2B', 'Procurement teams, engineers', 'RFQs from specification searches', 'B2B SEO + Google Ads + AI search'],
  ['Education', 'Students + parents', 'Admissions', 'SEO + ads + social'],
  ['Hospitality', 'Guests', 'Bookings + reviews', 'Local SEO + Google Maps'],
  ['Retail', 'Consumers', 'Product discovery', 'SEO + social + ads'],
  ['Textiles', 'Retailers + buyers', 'Product visibility', 'SEO + photography + B2B'],
  ['Malaysian SMEs', 'Business owners', 'Digital growth', 'SEO + ads + automation'],
]

const VALUES = [
  { title: 'Industry search intent', text: 'We research the exact searches customers use in your sector, by service, product and city, before writing a single page.' },
  { title: 'Industry-specific content', text: 'Pages built around real customer questions, services and buying decisions, not generic marketing copy.' },
  { title: 'Industry-specific conversion', text: 'The right call to action for each market: a booking for a clinic, a site visit for a builder, an RFQ for a manufacturer.' },
  { title: 'AI search visibility', text: 'Clear facts, FAQs and structured data so Google AI Overviews, ChatGPT and Perplexity can understand and cite your expertise.' },
]

const COVERAGE = [
  { title: 'Madurai (HQ)', text: 'Healthcare, education, textiles, hospitality, real estate and retail: deep experience with Madurai’s core industries from our headquarters.', link: '/locations/madurai/', linkLabel: 'Madurai HQ' },
  { title: 'Thoothukudi', text: 'Industrial, marine, logistics and B2B marketing for port and manufacturing businesses.', link: '/locations/thoothukudi/', linkLabel: 'Thoothukudi office' },
  { title: 'Malaysia', text: 'SMEs, manufacturing, retail and professional services, from our Rawang office in Selangor.', link: '/locations/malaysia/', linkLabel: 'Malaysia office' },
]

export default function Industries() {
  useEffect(() => {
    setSeo({ title: PAGE_TITLE, description: PAGE_DESCRIPTION, canonical: `${SITE_URL}/industries/`, ogType: 'website' })
  }, [])
  const wa = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)

  return (
    <div className="industries-hub">
      <Breadcrumbs />
      <section className="hv2 hv2-section" style={{ paddingBottom: 0 }} data-section="hero">
        <div className="hv2-wrap">
          <span className="hv2-eyebrow">Industries we serve</span>
          <h1 className="hv2-h2" style={{ fontSize: 'clamp(32px,4.4vw,52px)', marginTop: 12 }}>Digital Marketing Built Around Your Industry</h1>
          <p className="hv2-lead" style={{ marginTop: 16, maxWidth: 780 }}>Every industry has different customers, search behaviour, buying cycles, competition and conversion paths. From our Madurai HQ and offices in Thoothukudi and Rawang, Malaysia, we build SEO, AI search, Google Maps, ads and websites around how your market actually buys.</p>
          <p style={{ marginTop: 22, display: 'flex', gap: 22, flexWrap: 'wrap' }}>
            <a className="hv2-link" href="#audit">Get a free Growth Audit <span className="hv2-arrow" aria-hidden="true">→</span></a>
            <a className="hv2-link" href={wa} target="_blank" rel="noopener noreferrer">WhatsApp +91 99440 40345 <span className="hv2-arrow" aria-hidden="true">→</span></a>
          </p>
        </div>
      </section>

      <AnswerFirst heading="Which industries does Static Savvy Media work with?" text="Static Savvy Media works with healthcare and clinics, real estate and construction, manufacturing and B2B, education and training, hospitality and travel, retail and e-commerce, textiles, port and industrial businesses, and Malaysian SMEs. Each sector has its own page explaining how buyers search and what we do for them." facts={['9 industry pages', 'Madurai HQ since 2021', 'Tamil Nadu, India & Malaysia']} />

      <PhotoCards section="industries-featured" eyebrow="Choose your industry" heading="Industries we serve" items={FEATURED} cols={5} />
      <CardGrid section="industries-more" eyebrow="More sectors" heading="Sector and regional specialisms" items={MORE} cols={4} />

      <section className="hv2 hv2-section hv2-section--flush" data-section="industries-compare" style={{ paddingTop: 'clamp(40px,5vw,64px)' }}>
        <div className="hv2-wrap">
          <span className="hv2-eyebrow">The difference</span>
          <h2 className="hv2-h2">Different industries, different digital journeys.</h2>
          <p className="hv2-lead" style={{ margin: '12px 0 24px' }}>A clinic does not win patients the way an online store wins orders, and a manufacturer does not sell like a hotel. This is how the plan changes by sector.</p>
          <div className="hv2-table-wrap">
            <table className="hv2-table">
              <thead><tr><th scope="col">Industry</th><th scope="col">Primary audience</th><th scope="col">Key digital need</th><th scope="col">Core channels</th></tr></thead>
              <tbody>{COMPARISON.map((r) => <tr key={r[0]}>{r.map((c) => <td key={c}>{c}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>

      <CardGrid section="industries-values" eyebrow="Our approach" heading="Why industry-specific digital marketing works better" items={VALUES} cols={4} />
      <CardGrid section="industries-coverage" eyebrow="Coverage" heading="Industry expertise across Tamil Nadu and Malaysia" items={COVERAGE} />

      <section className="hv2 hv2-section hv2-section--flush" style={{ paddingTop: 'clamp(32px,4vw,48px)' }}>
        <div className="hv2-wrap"><p className="hv2-lead">Looking for a specific service instead? See all <Link className="hv2-link" to="/solutions/">growth solutions</Link> or our <Link className="hv2-link" to="/services/geo-aeo-ai-search/">AI search optimisation</Link> service.</p></div>
      </section>

      <AuditBlock formId="growth_audit_industries" defaultCity="" />
    </div>
  )
}
