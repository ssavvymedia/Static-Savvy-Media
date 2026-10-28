import { Link } from 'react-router-dom'
import '../../styles/templates/service-template.css'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER } from '../../utils/constants.js'

/* Shared "next steps" block for the per-service pricing pages: answer-first guidance, internal links
 * to the matching service / location pages and guides, a short FAQ (rendered with the faq-section
 * classes so the build-time SSR emits FAQPage JSON-LD), and a value-led WhatsApp CTA.
 * Every FAQ answer restates facts already on the pricing page (monthly, no minimum term, guide prices). */
const MAP = {
  seo: {
    label: 'SEO',
    india: [['/services/seo/madurai/', 'SEO services in Madurai'], ['/blog/affordable-seo-company-madurai-pricing/', 'Affordable SEO in Madurai: what each plan includes'], ['/blog/how-long-does-seo-take-madurai/', 'How long SEO takes to show results']],
    malaysia: [['/services/seo/malaysia/', 'SEO services in Malaysia'], ['/services/seo/kuala-lumpur/', 'SEO in Kuala Lumpur'], ['/blog/seo-cost-malaysia-price-guide/', 'SEO cost in Malaysia: 2026 price guide']],
  },
  'local-seo': {
    label: 'Local SEO',
    india: [['/services/local-seo/madurai/', 'Local SEO in Madurai'], ['/services/local-seo/thoothukudi/', 'Local SEO in Thoothukudi'], ['/blog/affordable-seo-company-madurai-pricing/', 'Google Business Profile plans explained']],
    malaysia: [['/services/local-seo/malaysia/', 'Local SEO in Malaysia'], ['/blog/google-business-profile-optimisation-malaysia/', 'Google Business Profile optimisation in Malaysia'], ['/blog/rawang-local-seo-google-business-profile/', 'Local SEO in Rawang']],
  },
  'google-ads': {
    label: 'Google Ads',
    adSpend: true,
    india: [['/services/google-ads/', 'Google Ads management'], ['/services/google-ads/thoothukudi/', 'Google Ads in Thoothukudi'], ['/blog/facebook-instagram-google-ads-agency-madurai/', 'Google, Facebook and Instagram ads in Madurai']],
    malaysia: [['/services/google-ads/kuala-lumpur/', 'Google Ads in Kuala Lumpur'], ['/services/google-ads/', 'Google Ads management'], ['/blog/how-to-choose-digital-marketing-agency-malaysia/', 'How to choose an agency in Malaysia']],
  },
  'social-media': {
    label: 'social media marketing',
    india: [['/services/social-media-marketing/madurai/', 'Social media marketing in Madurai'], ['/blog/whatsapp-marketing-madurai-businesses/', 'WhatsApp marketing for Madurai businesses'], ['/blog/facebook-instagram-google-ads-agency-madurai/', 'Facebook and Instagram ads in Madurai']],
    malaysia: [['/services/social-media-marketing/', 'Social media marketing'], ['/blog/social-media-marketing-malaysia-smes/', 'Social media plan for Malaysian SMEs'], ['/locations/kuala-lumpur/', 'Digital marketing in Kuala Lumpur']],
  },
  website: {
    label: 'website design',
    india: [['/services/website-design-development/madurai/', 'Website design in Madurai'], ['/blog/website-design-company-madurai-checklist/', 'Website design company checklist'], ['/blog/best-web-hosting-india-malaysia-small-business/', 'Best web hosting: top 5 compared']],
    malaysia: [['/services/website-design-development/', 'Website design and development'], ['/blog/best-web-hosting-india-malaysia-small-business/', 'Best web hosting in Malaysia: top 5 compared'], ['/services/seo/malaysia/', 'SEO services in Malaysia']],
  },
  ai: {
    label: 'AI automation',
    india: [['/services/ai-business-automation/', 'AI business automation'], ['/blog/agentic-ai-tools-small-business-marketing/', 'Top agentic AI tools compared'], ['/services/geo-aeo-ai-search/madurai/', 'GEO & AEO in Madurai']],
    malaysia: [['/services/ai-business-automation/malaysia/', 'AI business automation in Malaysia'], ['/blog/agentic-ai-tools-small-business-marketing/', 'Top agentic AI tools compared'], ['/blog/digital-marketing-malaysia-sme-grant-guide/', 'Malaysia SME digital grant guide']],
  },
  photography: {
    label: 'photography and video',
    india: [['/services/corporate-photography-video/', 'Corporate photography and video'], ['/services/product-photography-creative-design/', 'Product photography and creative design'], ['/services/ai-video-creation/', 'AI video creation']],
    malaysia: [['/services/corporate-photography-video/', 'Corporate photography and video'], ['/services/product-photography-creative-design/', 'Product photography and creative design'], ['/services/ai-video-creation/', 'AI video creation']],
  },
}

export default function PricingNextSteps({ service, country }) {
  const m = MAP[service]
  if (!m) return null
  const my = country === 'malaysia'
  const where = my ? 'Malaysia' : 'India'
  const links = [
    ...m[my ? 'malaysia' : 'india'],
    [my ? '/locations/malaysia/' : '/locations/madurai/', my ? 'Static Savvy Media Malaysia (Rawang)' : 'Static Savvy Media Madurai (HQ)'],
    [`/pricing/${my ? 'malaysia' : 'india'}/`, `All ${where} pricing`],
    ['/case-studies/', 'Case studies'],
  ]
  const wa = buildWhatsAppLink(WHATSAPP_NUMBER, `Hi Static Savvy Media, I saw your ${m.label} pricing for ${where}. Which plan fits my business?`)
  const faqs = [
    { q: `Are these ${m.label} prices monthly, and is there a contract?`, a: 'Retainer prices on this page are per month with no minimum contract term. They are guide prices: the final quote depends on the scope of your project.' },
    ...(m.adSpend ? [{ q: 'Is Google Ads spend included in the management fee?', a: 'No. The management fee is what we charge to run your campaigns. Ad spend is a separate amount you pay to Google directly.' }] : []),
    { q: `How do I get an exact ${m.label} quote?`, a: `Message us on WhatsApp at ${WHATSAPP_NUMBER}${my ? ' or call our Malaysia line on +60 12-453 7030' : ''} with your website and goals. We reply with a recommended plan and a written quote.` },
    { q: 'Which plan should I start with?', a: 'Start with the smallest plan that covers your main goal, such as more calls, more WhatsApp enquiries or more online sales, then move up when the results justify it.' },
  ]
  return (
    <section className="section pricing-next-steps">
      <div className="container" style={{ maxWidth: '860px' }}>
        <h2 className="section-heading__title">Which {m.label} plan is right for you?</h2>
        <p>
          Pick the plan that matches the result you need first. If you are not sure, send us your website and we will
          recommend a starting plan for your business in {where} before you pay anything.
        </p>
        <h3>Related services and guides</h3>
        <ul className="pricing-next-steps__links">
          {links.map(([to, label]) => <li key={to}><Link to={to}>{label}</Link></li>)}
        </ul>
        <h3>{m.label.charAt(0).toUpperCase() + m.label.slice(1)} pricing FAQs</h3>
        <div className="faq-section__list">
          {faqs.map((f) => (
            <details className="faq-section__details glass-card" key={f.q}>
              <summary className="faq-section__question">{f.q}</summary>
              <p className="faq-section__answer">{f.a}</p>
            </details>
          ))}
        </div>
        <p style={{ marginTop: '1.5rem' }}>
          <a className="btn btn--primary" href={wa} target="_blank" rel="noopener noreferrer">Get free plan advice on WhatsApp</a>
        </p>
      </div>
    </section>
  )
}
