import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import ContactFormSection from '../../components/sections/ContactFormSection.jsx'
import WhatsAppIcon from '../../components/common/WhatsAppIcon.jsx'
import SectionHeading from '../../components/common/SectionHeading.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import { breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL } from '../../utils/constants.js'
import '../../styles/pages/client4.css'
import client4HeroImg from '../../assets/images/CaseStudies/04Client.webp'

const META_TITLE = 'Google Ads Lead Generation for a Thoothukudi Industrial Business | Static Savvy Media'
const META_DESC = 'See how a Thoothukudi industrial business used Google Ads and social media marketing to strengthen digital visibility, generate relevant enquiries and improve its lead-generation system.'

const SUMMARY = [
  { label: 'Client', value: 'Thoothukudi Industrial Client' },
  { label: 'Industry', value: 'Industrial / B2B' },
  { label: 'Location', value: 'Thoothukudi, Tamil Nadu' },
  { label: 'Services Used', value: 'Google Ads + Social Media' },
  { label: 'Primary Marketing Goal', value: 'Lead Generation' },
  { label: 'Primary Result', value: 'Lead growth case study' },
]

const APPROACH_STEPS = [
  { num: '01', title: 'Business & Market Assessment', desc: 'Understanding the industrial landscape, target buyers and search behaviour in Thoothukudi.' },
  { num: '02', title: 'Audience & Search Intent Research', desc: 'Identifying the keywords, queries and intent signals that signal buyer readiness.' },
  { num: '03', title: 'Google Ads Campaign Structure', desc: 'Organising campaigns around relevant industrial service categories.' },
  { num: '04', title: 'Social Media Positioning', desc: 'Building professional credibility on LinkedIn, Facebook and where relevant, Instagram.' },
  { num: '05', title: 'Conversion Tracking', desc: 'Tracking WhatsApp clicks, phone calls and form submissions through GA4 and Google Ads.' },
  { num: '06', title: 'Optimisation & Reporting', desc: 'Weekly review of search terms, bids and performance. Monthly reporting on spend, leads and cost per lead.' },
]

const GOOGLE_ADS_STEPS = [
  { num: '01', title: 'Keyword Research', desc: 'Identify industrial, marine, logistics and manufacturing search categories relevant to the business.' },
  { num: '02', title: 'Search Intent', desc: 'Separate high-intent searches from informational and irrelevant queries.' },
  { num: '03', title: 'Campaign Structure', desc: 'Organise campaigns and ad groups around relevant service categories.' },
  { num: '04', title: 'Negative Keywords', desc: 'Use negative keyword lists to reduce irrelevant clicks and protect advertising budget.' },
  { num: '05', title: 'Conversion Tracking', desc: 'Track WhatsApp clicks, phone calls and form submissions through Google Ads and GA4.' },
  { num: '06', title: 'Weekly Optimisation', desc: 'Review search terms, bids, ad schedules, device performance, Quality Score and conversion performance.' },
  { num: '07', title: 'Monthly Reporting', desc: 'Track spend, clicks, impressions, CTR, CPC, conversions, CPA and ROAS.' },
]

const SOCIAL_PLATFORMS = [
  { name: 'LinkedIn', desc: 'Primary professional platform. Reach procurement managers, logistics heads, business owners and industry professionals.', icon: 'in' },
  { name: 'Facebook', desc: 'Wider business visibility and audience reach for industrial companies in the Thoothukudi market.', icon: 'fb' },
  { name: 'Instagram', desc: 'Visual content for businesses with products, facilities or projects that benefit from visual storytelling.', icon: 'ig' },
]

const CONTENT_PILLARS = ['Industry Expertise', 'Products & Services', 'Projects / Work', 'Facility / Operations', 'Team & People', 'Client / Market Insights', 'Educational Content', 'Business Credibility']

const LEAD_FUNNEL = ['Relevant Search', 'Google Ad', 'Landing Page', 'Clear Value Proposition', 'WhatsApp / Call / Form', 'Qualified Enquiry', 'Sales Follow-Up', 'Business Opportunity']

const RESULTS_METRICS = [
  { label: 'Google Ads Leads', value: 'Verified campaign data to be added' },
  { label: 'WhatsApp Enquiries', value: 'Verified campaign data to be added' },
  { label: 'Conversion Rate', value: 'Verified campaign data to be added' },
  { label: 'Cost Per Lead', value: 'Verified campaign data to be added' },
]

const BEFORE_ITEMS = ['Referral-dependent acquisition', 'Limited search visibility', 'Unstructured digital advertising', 'Limited conversion tracking', 'Limited measurable lead-generation data']
const AFTER_ITEMS = ['Targeted Google Ads', 'Structured campaign strategy', 'Social media credibility', 'Conversion tracking', 'More measurable acquisition', 'Improved lead-generation system']

const WHY_WORKED = [
  { num: '01', title: 'High-Intent Targeting', desc: 'Focus advertising on people actively searching for relevant industrial products and services.' },
  { num: '02', title: 'B2B Positioning', desc: 'Use professional messaging appropriate for industrial buyers and procurement teams.' },
  { num: '03', title: 'Conversion Tracking', desc: 'Measure WhatsApp, calls and forms rather than only clicks.' },
  { num: '04', title: 'Continuous Optimisation', desc: 'Use search-term and campaign data to improve performance.' },
]

const INDUSTRY_CARDS = [
  { title: 'Port, Shipping & Logistics', desc: 'Digital visibility for shipping agencies, freight forwarders, customs brokers and logistics businesses. Focus: inbound enquiries from exporters and importers.' },
  { title: 'Chemical & Industrial Manufacturing', desc: 'Digital marketing for manufacturers targeting national buyers, international buyers, procurement teams and industrial customers.' },
  { title: 'Fishing & Marine', desc: 'Digital presence for marine businesses, fishing businesses, seafood exporters and suppliers.' },
]

const TIMELINE_STEPS = ['Business & Market Assessment', 'Audience & Search Intent Research', 'Google Ads Campaign Structure', 'Social Media Positioning', 'Conversion Tracking', 'Optimisation & Reporting']

const TAKEAWAYS = [
  'SEO builds a long-term organic visibility foundation.',
  'Google Ads provides immediate access to high-intent search demand.',
  'Digital transformation support can help eligible SMEs plan their digital investment more effectively.',
  'Marketing performance should be measured using real business outcomes rather than vanity metrics.',
]

const RELATED_SERVICES = [
  { name: 'SEO', path: '/services/seo/' },
  { name: 'GEO & AEO', path: '/services/geo-aeo-ai-search/' },
  { name: 'Local SEO', path: '/services/local-seo/' },
  { name: 'Website Design & Development', path: '/services/website-design-development/' },
  { name: 'AI Business Automation', path: '/services/ai-business-automation/' },
]

const RELATED_CASES = [
  { label: 'Madurai SEO + Local SEO Case Study', path: '/case-studies/client-1/' },
  { label: 'GEO/AEO + SEO Case Study', path: '/case-studies/client-2/' },
  { label: 'Malaysia SEO + Google Ads Case Study', path: '/case-studies/client-3/' },
]

const TIMELINE = [
  { num: '01', title: 'Business & Market Assessment', desc: 'Understanding the industrial landscape and target buyer profiles.' },
  { num: '02', title: 'Audience & Search Intent Research', desc: 'Mapping the keywords and queries that signal buyer readiness.' },
  { num: '03', title: 'Google Ads Campaign Structure', desc: 'Building campaigns around relevant industrial service categories.' },
  { num: '04', title: 'Social Media Positioning', desc: 'Establishing professional credibility on LinkedIn and Facebook.' },
  { num: '05', title: 'Conversion Tracking', desc: 'Setting up WhatsApp, call and form tracking through GA4 and Google Ads.' },
  { num: '06', title: 'Optimisation & Reporting', desc: 'Ongoing weekly and monthly performance review.' },
]

const KPI_LIST = ['Impressions', 'Clicks', 'CTR', 'CPC', 'Conversions', 'CPA', 'WhatsApp Enquiries', 'Phone Calls', 'Form Submissions', 'Qualified Leads', 'ROAS']

export default function Client4() {
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Case Studies', path: '/case-studies/' },
    { label: 'Thoothukudi Industrial Case Study', path: '/case-studies/client-4/' },
  ]

  const faqSchema = null
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Google Ads Lead Generation for a Thoothukudi Industrial Business',
    description: META_DESC,
    author: { '@type': 'Organization', name: 'Static Savvy Media' },
    publisher: { '@type': 'Organization', name: 'Static Savvy Media', url: SITE_URL },
    datePublished: '2025-01-01',
    dateModified: '2025-01-01',
    mainEntityOfPage: SITE_URL + '/case-studies/client-4/',
  }

  useEffect(() => {
    setSeo({ title: META_TITLE, description: META_DESC, canonical: SITE_URL + '/case-studies/client-4/' })
    const schemas = [breadcrumbListSchema(breadcrumbs), articleSchema]
    schemas.forEach(s => {
      const el = document.createElement('script')
      el.type = 'application/ld+json'
      el.text = JSON.stringify(s)
      document.head.appendChild(el)
    })
  }, [])

  const whatsappHref = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)

  return (
    <main className="client4-page">
      <Breadcrumbs items={breadcrumbs} />

      <HeroSection
        layout="two-column"
        eyebrow="CASE STUDY · THOOTHUKUDI · GOOGLE ADS + SOCIAL MEDIA"
        title="Google Ads Lead Generation for a Thoothukudi Industrial Business"
        subtitle="A Thoothukudi-focused industrial case study demonstrating how targeted Google Ads, social media marketing and conversion-focused digital strategy can help B2B businesses generate stronger inbound enquiry opportunities."
        actions={
          <>
            <Button to="/contact/" variant="primary" size="lg">Discuss Your Growth Strategy</Button>
            <Button to="/services/google-ads/" variant="secondary" size="lg">Explore Google Ads</Button>
          </>
        }
      >
        <div className="hero__visual-side">
          <img src={client4HeroImg} width={1536} height={1024} fetchPriority="high" alt="Google Ads Lead Generation for a Thoothukudi Industrial Business" className="hero__image" />
        </div>
      </HeroSection>

      {/* Client Summary */}
      <ScrollReveal>
        <section className="c4-summary">
          <div className="c4-summary-grid">
            {SUMMARY.map((s, i) => (
              <div key={i} className="c4-summary-card">
                <div className="c4-summary-label">{s.label}</div>
                <div className="c4-summary-value">{s.value}</div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* The Challenge */}
      <ScrollReveal>
        <section className="c4-challenge">
          <SectionHeading eyebrow="THE CHALLENGE" title="The Digital Marketing Challenge" />
          <div className="c4-challenge-content">
            <p>Thoothukudi's industrial economy is built around the port, SIPCOT industrial areas, marine sector, shipping, logistics, chemical manufacturing and industrial suppliers. These businesses operate primarily in B2B environments, serving corporates, government entities, manufacturers, procurement teams, exporters and international buyers.</p>
            <p>Most industrial businesses in Thoothukudi have historically relied on existing relationships, referrals, procurement networks and repeat customers. Offline business development has been the norm, with digital marketing seen as secondary to traditional channels.</p>
            <p>The challenge is clear: when a potential buyer searches Google for an industrial supplier, if the business is not visible for relevant keywords, competitors capture that search demand. Without a measurable digital strategy, industrial businesses miss high-intent enquiries and lose ground to digitally visible competitors.</p>
          </div>
        </section>
      </ScrollReveal>

      {/* The Thoothukudi Opportunity */}
      <ScrollReveal>
        <section className="c4-opportunity">
          <SectionHeading eyebrow="MARKET OPPORTUNITY" title="Why Digital Marketing Matters for Thoothukudi's Industrial Businesses" />
          <div className="c4-opportunity-content">
            <p>Thoothukudi is a major port and industrial market. Businesses around Thoothukudi Port, SIPCOT industrial areas, the marine sector, shipping, logistics, chemical manufacturing and industrial manufacturing operate largely in B2B environments. Their customers can include corporates, government entities, manufacturers, procurement teams, exporters, importers and international buyers.</p>
            <p>For these businesses, digital marketing is not simply about likes or followers. It is about:</p>
          </div>
          <div className="c4-opportunity-grid">
            <div className="c4-opportunity-card"><span>Professional Credibility</span></div>
            <div className="c4-opportunity-card"><span>Search Visibility</span></div>
            <div className="c4-opportunity-card"><span>Inbound Enquiries</span></div>
            <div className="c4-opportunity-card"><span>Business Opportunities</span></div>
          </div>
        </section>
      </ScrollReveal>

      {/* Strategy */}
      <ScrollReveal>
        <section className="c4-strategy">
          <SectionHeading eyebrow="OUR STRATEGY" title="Our Google Ads + Social Media Strategy" />
          <div className="c4-strategy-flow">
            <div className="c4-strategy-col">
              <h3>Google Ads</h3>
              <div className="c4-flow">
                <div className="c4-flow-node">SEARCH INTENT</div>
                <div className="c4-flow-arrow">↓</div>
                <div className="c4-flow-node">GOOGLE ADS</div>
                <div className="c4-flow-arrow">↓</div>
                <div className="c4-flow-node">LANDING PAGE</div>
                <div className="c4-flow-arrow">↓</div>
                <div className="c4-flow-node">ENQUIRY</div>
                <div className="c4-flow-arrow">↓</div>
                <div className="c4-flow-node">FOLLOW-UP</div>
                <div className="c4-flow-arrow">↓</div>
                <div className="c4-flow-node c4-flow-node--accent">BUSINESS OPPORTUNITY</div>
              </div>
            </div>
            <div className="c4-strategy-col">
              <h3>Social Media</h3>
              <div className="c4-flow">
                <div className="c4-flow-node">SOCIAL MEDIA</div>
                <div className="c4-flow-arrow">↓</div>
                <div className="c4-flow-node">AWARENESS</div>
                <div className="c4-flow-arrow">↓</div>
                <div className="c4-flow-node">CREDIBILITY</div>
                <div className="c4-flow-arrow">↓</div>
                <div className="c4-flow-node">ENGAGEMENT</div>
                <div className="c4-flow-arrow">↓</div>
                <div className="c4-flow-node">RETARGETING</div>
                <div className="c4-flow-arrow">↓</div>
                <div className="c4-flow-node c4-flow-node--accent">ENQUIRY</div>
              </div>
            </div>
          </div>
          <div className="c4-strategy-note">
            <p>Google Ads and Social Media have different roles. Google Ads captures high-intent demand from people actively searching. Social Media builds audience awareness, credibility and ongoing engagement.</p>
          </div>
        </section>
      </ScrollReveal>

      {/* Google Ads */}
      <ScrollReveal>
        <section className="c4-google-ads">
          <SectionHeading eyebrow="GOOGLE ADS" title="Capturing High-Intent Industrial Searches" />
          <div className="c4-ga-steps">
            {GOOGLE_ADS_STEPS.map((step, i) => (
              <div key={i} className="c4-ga-step-card">
                <div className="c4-ga-step-num">{step.num}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Social Media */}
      <ScrollReveal>
        <section className="c4-social-media">
          <SectionHeading eyebrow="SOCIAL MEDIA" title="Building Industrial Brand Credibility Through Social Media" />
          <div className="c4-social-platforms">
            {SOCIAL_PLATFORMS.map((p, i) => (
              <div key={i} className="c4-social-card">
                <div className="c4-social-icon">{p.icon}</div>
                <h4>{p.name}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="c4-content-pillars">
            <h3>Content Pillars</h3>
            <div className="c4-pillars-grid">
              {CONTENT_PILLARS.map((pillar, i) => (
                <div key={i} className="c4-pillar-chip">{pillar}</div>
              ))}
            </div>
          </div>
          <div className="c4-social-note">
            <p><strong>Important:</strong> Do not claim that specific campaigns or posts were published unless verified.</p>
          </div>
        </section>
      </ScrollReveal>

      {/* Lead Generation System */}
      <ScrollReveal>
        <section className="c4-lead-gen">
          <SectionHeading eyebrow="CONVERSION FUNNEL" title="From Clicks to Qualified Enquiries" />
          <div className="c4-funnel">
            {LEAD_FUNNEL.map((step, i) => (
              <div key={i} className="c4-funnel-item">
                <div className="c4-funnel-num">STEP {String(i + 1).padStart(2, '0')}</div>
                <div className="c4-funnel-label">{step}</div>
                {i < LEAD_FUNNEL.length - 1 && <div className="c4-funnel-connector">↓</div>}
              </div>
            ))}
          </div>
          <div className="c4-funnel-note">
            <p>Generating clicks alone is not enough. The objective is to generate relevant enquiries that can be followed up by the business.</p>
          </div>
        </section>
      </ScrollReveal>

      {/* WhatsApp Conversion */}
      <ScrollReveal>
        <section className="c4-whatsapp">
          <SectionHeading eyebrow="CONVERSION" title="Making Enquiries Easy" />
          <div className="c4-wa-flow">
            <div className="c4-wa-step"><span>GOOGLE SEARCH</span></div>
            <div className="c4-wa-arrow">→</div>
            <div className="c4-wa-step"><span>AD</span></div>
            <div className="c4-wa-arrow">→</div>
            <div className="c4-wa-step"><span>WEBSITE</span></div>
            <div className="c4-wa-arrow">→</div>
            <div className="c4-wa-step c4-wa-step--highlight"><span>WHATSAPP</span></div>
            <div className="c4-wa-arrow">→</div>
            <div className="c4-wa-step"><span>SALES TEAM</span></div>
          </div>
          <div className="c4-wa-note">
            <p>WhatsApp click tracking can be implemented as a conversion event in Google Ads and GA4. Every tracked WhatsApp click can be associated with the campaign, ad group and keyword that generated it.</p>
          </div>
          <div className="c4-wa-cta">
            <Button variant="primary" as={Link} to={buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)}>
              Start a Conversation
            </Button>
          </div>
        </section>
      </ScrollReveal>

      {/* Results */}
      <ScrollReveal>
        <section className="c4-results">
          <SectionHeading eyebrow="THE RESULTS" title="The Results" />
          <div className="c4-results-primary">
            <div className="c4-results-headline">
              <div className="c4-results-label">More qualified enquiries</div>
              <div className="c4-results-sublabel">Tracked through WhatsApp, calls and forms</div>
            </div>
          </div>
          <div className="c4-results-grid">
            {RESULTS_METRICS.map((m, i) => (
              <div key={i} className="c4-results-card">
                <div className="c4-results-card-label">{m.label}</div>
                <div className="c4-results-card-value">{m.value}</div>
              </div>
            ))}
          </div>
          <div className="c4-results-note">
            <p>Specific figures will be published here only once verified campaign data can be shared.</p>
          </div>
        </section>
      </ScrollReveal>

      {/* Before vs After */}
      <ScrollReveal>
        <section className="c4-before-after">
          <SectionHeading eyebrow="TRANSFORMATION" title="From Traditional Lead Generation to Digital Acquisition" />
          <div className="c4-ba-panels">
            <div className="c4-ba-panel c4-ba-panel--before">
              <h3>Before</h3>
              <ul>
                {BEFORE_ITEMS.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="c4-ba-panel c4-ba-panel--after">
              <h3>After</h3>
              <ul>
                {AFTER_ITEMS.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="c4-ba-label">Strategic Transformation</div>
        </section>
      </ScrollReveal>

      {/* What Made the Strategy Work */}
      <ScrollReveal>
        <section className="c4-why-worked">
          <SectionHeading eyebrow="SUCCESS FACTORS" title="Why the Strategy Worked" />
          <div className="c4-why-grid">
            {WHY_WORKED.map((item, i) => (
              <div key={i} className="c4-why-card">
                <div className="c4-why-num">{item.num}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Thoothukudi Industrial Market */}
      <ScrollReveal>
        <section className="c4-industry">
          <SectionHeading eyebrow="LOCAL MARKET" title="Built for Thoothukudi's Business Environment" />
          <div className="c4-industry-grid">
            {INDUSTRY_CARDS.map((card, i) => (
              <div key={i} className="c4-industry-card">
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Implementation Timeline */}
      <ScrollReveal>
        <section className="c4-timeline">
          <SectionHeading eyebrow="IMPLEMENTATION" title="Our Approach in Detail" />
          <div className="c4-timeline-grid">
            {TIMELINE_STEPS.map((step, i) => (
              <div key={i} className="c4-timeline-card">
                <div className="c4-timeline-num">{String(i + 1).padStart(2, '0')}</div>
                <h4>{step}</h4>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Measurement */}
      <ScrollReveal>
        <section className="c4-measurement">
          <SectionHeading eyebrow="MEASUREMENT" title="Measuring What Actually Matters" />
          <div className="c4-kpi-grid">
            {KPI_LIST.map((kpi, i) => (
              <div key={i} className="c4-kpi-card">
                <span>{kpi}</span>
              </div>
            ))}
          </div>
          <div className="c4-measurement-note">
            <p>The goal is not simply to increase traffic. The goal is to understand which campaigns generate meaningful business opportunities.</p>
          </div>
        </section>
      </ScrollReveal>

      {/* Client Testimonial */}
      <ScrollReveal>
        <section className="c4-testimonial">
          <SectionHeading eyebrow="TESTIMONIAL" title="Client Testimonial" />
          <div className="c4-testimonial-content">
            <p>"Client testimonial to be added after approval."</p>
          </div>
        </section>
      </ScrollReveal>

      {/* Services Used */}
      <ScrollReveal>
        <section className="c4-services">
          <SectionHeading eyebrow="SERVICES USED" title="Services Used" />
          <div className="c4-services-grid">
            <div className="c4-service-card">
              <h4>Google Ads</h4>
              <p>High-intent paid search campaigns designed around relevant industrial search demand.</p>
              <Button variant="secondary" as={Link} to="/services/google-ads/">Learn More</Button>
            </div>
            <div className="c4-service-card">
              <h4>Social Media Marketing</h4>
              <p>Professional content and platform-specific marketing designed for B2B audience visibility and credibility.</p>
              <Button variant="secondary" as={Link} to="/services/social-media-marketing/">Learn More</Button>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Related Services */}
      <ScrollReveal>
        <section className="c4-related-services">
          <SectionHeading eyebrow="EXPLORE" title="Other Services for Industrial Businesses" />
          <div className="c4-related-grid">
            {RELATED_SERVICES.map((svc, i) => (
              <div key={i} className="c4-related-card">
                <h4>{svc.name}</h4>
                <Button variant="secondary" as={Link} to={svc.path}>Explore</Button>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Related Case Studies */}
      <ScrollReveal>
        <section className="c4-related-cases">
          <SectionHeading eyebrow="CASE STUDIES" title="Explore More Case Studies" />
          <div className="c4-cases-grid">
            {RELATED_CASES.map((cs, i) => (
              <div key={i} className="c4-case-card">
                <h4>{cs.label}</h4>
                <Button variant="secondary" as={Link} to={cs.path}>View Case Study</Button>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Thoothukudi Location CTA */}
      <ScrollReveal>
        <section className="c4-location-cta">
          <div className="c4-location-cta-content">
            <h2>Need More Industrial Leads in Thoothukudi?</h2>
            <p>Build stronger search visibility and a measurable lead generation system with Google Ads, Social Media and conversion-focused digital marketing.</p>
            <div className="c4-location-cta-buttons">
              <Button variant="primary" as={Link} to="/contact/">Get a Free Consultation</Button>
              <Button variant="secondary" as={Link} to="/locations/thoothukudi/">Explore Thoothukudi Services</Button>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Final CTA */}
      <CTASection
        title="Turn Industrial Searches into Business Enquiries"
        subtitle="Your next customer may already be searching for the service you provide. Make sure they can find you."
        primaryLabel={
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', verticalAlign: 'middle' }}>
            <WhatsAppIcon size={22} />
            <span>WhatsApp: +91-99440-40345</span>
          </span>
        }
        primaryHref={whatsappHref}
      />
      <ContactFormSection />
    </main>
  )
}

