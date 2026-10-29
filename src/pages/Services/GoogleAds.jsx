import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import ProcessSection from '../../components/sections/ProcessSection.jsx'
import FAQSection from '../../components/sections/FAQSection.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import ContactFormSection from '../../components/sections/ContactFormSection.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import {
  serviceSchema,
  faqPageSchema,
  breadcrumbListSchema,
} from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import {
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
  SITE_URL,
} from '../../utils/constants.js'
import '../../styles/templates/service-template.css'
import '../../styles/pages/google-ads.css'
import googleAdsHeroImg from '../../assets/images/services/04GoogleAds.webp'

/* ============================================================
   CONTENT, Approved Static Savvy Media Google Ads Page Content
   ============================================================ */

const PAGE_TITLE =
  'Google Ads Management, Results-Driven PPC for Madurai, Tamil Nadu & Malaysia | Static Savvy Media'

const PAGE_DESCRIPTION =
  'Expert Google Ads management for Tamil Nadu and Malaysia businesses. Search, display, shopping, and remarketing campaigns, every rupee and ringgit tracked to real outcomes.'

const HERO_SUBTITLE =
  'Google Ads is the fastest path to qualified visibility. While SEO builds long-term organic rankings, Google Ads puts your business in front of high-intent buyers today. The critical difference between a Google Ads campaign that makes money and one that burns it is precise audience targeting, quality score management, and conversion-focused landing pages. That is what we build.'

const CAMPAIGN_TYPES = [
  {
    number: '01',
    title: 'Search Campaigns',
    icon: 'search',
    content:
      'Text ads targeting high-intent commercial and local keywords, people actively looking for what you sell right now.',
  },
  {
    number: '02',
    title: 'Display Campaigns',
    icon: 'display',
    content:
      "Visual ads across Google’s display network for brand awareness and retargeting audiences who’ve visited your site.",
  },
  {
    number: '03',
    title: 'Shopping Campaigns',
    icon: 'shopping',
    content:
      'For e-commerce, product listing ads showing your product image, price, and name directly in search results.',
  },
  {
    number: '04',
    title: 'Remarketing',
    icon: 'remarketing',
    content:
      "Re-engage visitors who didn’t convert on their first visit, typically the highest-ROI campaign type once traffic volume is sufficient.",
  },
  {
    number: '05',
    title: 'Performance Max',
    icon: 'pmax',
    content:
      "Google’s AI-optimised campaign type. We set it up correctly, most businesses running PMax without proper configuration are wasting 40–60% of their budget.",
  },
]

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Audit & Account Setup',
    text: 'For new accounts: set up correctly from day one. For existing accounts: audit for wasted spend, quality score issues, and conversion tracking errors, the most common problems we find when taking over from other agencies.',
  },
  {
    number: '02',
    title: 'Keyword & Audience Strategy',
    text: 'Keyword research, match type selection, negative keyword build-out, and audience layering. We invest heavily in the negative keyword list, stopping irrelevant clicks is often worth more than finding new ones.',
  },
  {
    number: '03',
    title: 'Conversion Tracking Setup',
    text: 'WhatsApp click tracking, phone call tracking, and form submission tracking set up in GA4 and Google Ads before spending a rupee. Campaigns without conversion tracking are flying blind.',
  },
  {
    number: '04',
    title: 'Weekly Optimisation',
    text: 'Search term reports, bid adjustments, ad schedule optimisation, device performance review, and quality score improvement. This is the weekly work most agencies skip that directly determines campaign profitability.',
  },
  {
    number: '05',
    title: 'Monthly Reporting',
    text: 'Spend, clicks, impressions, CTR, CPC, conversions, CPA, and ROAS, all clearly reported alongside plain-English summary of what changed, why, and what we do next month.',
  },
]

const REPORTING_METRICS = [
  'Spend',
  'Clicks',
  'Impressions',
  'CTR',
  'CPC',
  'Conversions',
  'CPA',
  'ROAS',
]

const FAQS = [
  {
    question: 'What is the minimum budget for Google Ads in India?',
    answer:
      'You need enough monthly ad spend to gather meaningful data; below that, there are too few clicks to optimise effectively. The right starting budget depends on your market, sector and cost per click, so we recommend one after a free review of your account and competitors. Ad spend is paid directly to Google; our management fee is quoted separately.',
  },
  {
    question: 'How quickly does Google Ads start generating leads?',
    answer:
      'Paid search can generate clicks on the first day a campaign goes live. However, the first 2–4 weeks are a learning and optimisation phase. Most clients see qualified lead flow within the first month, with ROI improving significantly in months 2–3.',
  },
  {
    question: 'How do you track ROI when leads come through WhatsApp?',
    answer:
      'We implement WhatsApp click tracking as a conversion event in Google Ads and GA4. Every WhatsApp button click from an ad-driven visitor is recorded and attributed to the specific campaign, ad group, and keyword that generated it, giving you clear attribution from ad spend to WhatsApp enquiry.',
  },
]

const RELATED_SERVICES = [
  { name: 'Google Ads Agency Kuala Lumpur', path: '/services/google-ads/kuala-lumpur/' },
  { name: 'SEO', path: '/services/seo/' },
  { name: 'Local SEO', path: '/services/local-seo/' },
  { name: 'GEO & AEO', path: '/services/geo-aeo-ai-search/' },
]

const CTA = {
  title: 'Stop wasting your ad budget. Start converting clicks into clients.',
  subtitle:
    'Message us on WhatsApp for a free Google Ads account audit, we will identify where your budget is being wasted.',
  label: 'Free Ads Audit on WhatsApp',
}

/* ============================================================
   COMPONENT
   ============================================================ */

export default function GoogleAds() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/services/google-ads/`,
      ogType: 'website',
    })

    const faqEntities = FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    }))

    const googleAdsService = serviceSchema({
      serviceType: 'Google Ads Management',
      name: 'Google Ads Management, Static Savvy Media',
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/services/google-ads/`,
      provider: {
        '@type': 'Organization',
        name: 'Static Savvy Media',
        url: SITE_URL,
      },
      areaServed: [
        { '@type': 'City', name: 'Madurai' },
        { '@type': 'City', name: 'Thoothukudi' },
        { '@type': 'Country', name: 'Malaysia' },
      ],
    })

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Services', item: `${SITE_URL}/services/` },
        { name: 'Google Ads', item: `${SITE_URL}/services/google-ads/` },
      ],
    })

    const scripts = [
      googleAdsService,
      faqPageSchema({ faqs: faqEntities }),
      breadcrumbs,
    ].map((data) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.text = JSON.stringify(data)
      document.head.appendChild(script)
      return script
    })
    jsonLdRef.current = scripts

    return () => {
      jsonLdRef.current.forEach((script) => script.remove())
      jsonLdRef.current = []
    }
  }, [])

  const whatsappHref = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)

  return (
    <div className="service-template google-ads">
      <style>{`
        .google-ads .gads-campaigns__grid > *:nth-child(1) .gads-campaign-card__icon {
          background: linear-gradient(135deg, #f97316, #ea580c) !important;
          box-shadow: 0 0 18px rgba(249, 115, 22, 0.45) !important;
        }

        .google-ads .gads-campaigns__grid > *:nth-child(2) .gads-campaign-card__icon {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8) !important;
          box-shadow: 0 0 18px rgba(59, 130, 246, 0.45) !important;
        }

        .google-ads .gads-campaigns__grid > *:nth-child(3) .gads-campaign-card__icon {
          background: linear-gradient(135deg, #eab308, #ca8a04) !important;
          box-shadow: 0 0 18px rgba(234, 179, 8, 0.45) !important;
        }

        .google-ads .gads-campaigns__grid > *:nth-child(4) .gads-campaign-card__icon {
          background: linear-gradient(135deg, #06b6d4, #0891b2) !important;
          box-shadow: 0 0 18px rgba(6, 182, 212, 0.45) !important;
        }

        .google-ads .gads-campaigns__grid > *:nth-child(5) .gads-campaign-card__icon {
          background: linear-gradient(135deg, #a855f7, #7c3aed) !important;
          box-shadow: 0 0 18px rgba(168, 85, 247, 0.45) !important;
        }
      `}</style>

      {/* ---- Breadcrumbs ---- */}
      <Breadcrumbs />

      {/* ---- Hero ---- */}
      <HeroSection
        layout="two-column"
        eyebrow="Service"
        title="Google Ads Management, Results-Driven PPC for Tamil Nadu & Malaysia"
        subtitle={HERO_SUBTITLE}
        actions={
          <Button
            href={whatsappHref}
            variant="primary"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Free Ads Audit on WhatsApp
          </Button>
        }
      >
        <div className="hero__visual-side">
          <img src={googleAdsHeroImg} width={1536} height={1024} fetchPriority="high" alt="Google Ads Management" className="hero__image" />
        </div>
      </HeroSection>

      {/* ---- What We Manage ---- */}
      <section className="section gads-campaigns">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Campaigns</span>
            <h2 className="section-heading__title">What We Manage</h2>
          </div>
          <div className="gads-campaigns__grid">
            {CAMPAIGN_TYPES.map((campaign, index) => (
              <ScrollReveal key={campaign.number} delay={index * 80}>
                <article className="gads-campaign-card glass-card">
                  <div className="gads-campaign-card__top">
                    <div
                      className="gads-campaign-card__icon"
                      aria-hidden="true"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        width: '52px',
                        height: '52px',
                        color: '#fff',
                      }}
                    >
                      {campaign.icon === 'search' && (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8" />
                          <path d="M21 21l-4.35-4.35" />
                        </svg>
                      )}
                      {campaign.icon === 'display' && (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                      )}
                      {campaign.icon === 'shopping' && (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                          <line x1="3" y1="6" x2="21" y2="6" />
                          <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                      )}
                      {campaign.icon === 'remarketing' && (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="23 4 23 10 17 10" />
                          <polyline points="1 20 1 14 7 14" />
                          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                        </svg>
                      )}
                      {campaign.icon === 'pmax' && (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <h3 className="gads-campaign-card__title">{campaign.title}</h3>
                  <p className="gads-campaign-card__text">{campaign.content}</p>
                  {/* Conceptual visual for each campaign type */}
                  {campaign.icon === 'search' && (
                    <div className="gads-campaign-card__visual gads-campaign-card__visual--search">
                      <div className="gads-visual-search__bar" />
                      <div className="gads-visual-search__result">
                        <span className="gads-visual-search__ad-tag">Ad</span>
                        <div className="gads-visual-search__lines">
                          <span /><span /><span />
                        </div>
                      </div>
                    </div>
                  )}
                  {campaign.icon === 'display' && (
                    <div className="gads-campaign-card__visual gads-campaign-card__visual--display">
                      <div className="gads-visual-display__site">
                        <div className="gads-visual-display__ad-slot" />
                      </div>
                      <div className="gads-visual-display__arrow" />
                      <div className="gads-visual-display__user" />
                    </div>
                  )}
                  {campaign.icon === 'shopping' && (
                    <div className="gads-campaign-card__visual gads-campaign-card__visual--shopping">
                      <div className="gads-visual-shopping__img" />
                      <div className="gads-visual-shopping__info">
                        <span className="gads-visual-shopping__name" />
                        <span className="gads-visual-shopping__price" />
                      </div>
                    </div>
                  )}
                  {campaign.icon === 'remarketing' && (
                    <div className="gads-campaign-card__visual gads-campaign-card__visual--remarketing">
                      <div className="gads-visual-remarketing__step">Visit</div>
                      <div className="gads-visual-remarketing__arrow">→</div>
                      <div className="gads-visual-remarketing__step gads-visual-remarketing__step--active">Retarget</div>
                      <div className="gads-visual-remarketing__arrow">→</div>
                      <div className="gads-visual-remarketing__step">Convert</div>
                    </div>
                  )}
                  {campaign.icon === 'pmax' && (
                    <div className="gads-campaign-card__visual gads-campaign-card__visual--pmax">
                      <div className="gads-visual-pmax__channels">
                        <span>Search</span>
                        <span>Display</span>
                        <span>YouTube</span>
                        <span>Discover</span>
                        <span>Gmail</span>
                        <span>Maps</span>
                      </div>
                      <div className="gads-visual-pmax__center">PMax</div>
                    </div>
                  )}
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Our Google Ads Process ---- */}
      <ProcessSection
        eyebrow="Process"
        title="Our Google Ads Process"
        steps={PROCESS_STEPS}
      />

      {/* ---- Reporting Metrics Visual ---- */}
      <section className="section gads-metrics">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Reporting</span>
            <h2 className="section-heading__title">Every Rupee Tracked to Real Outcomes</h2>
          </div>
          <ScrollReveal>
            <div className="gads-metrics__dashboard glass-card gradient-border">
              <div className="gads-metrics__grid">
                {REPORTING_METRICS.map((metric, index) => (
                  <div key={metric} className="gads-metrics__item">
                    <span className="gads-metrics__label">{metric}</span>
                    <span className="gads-metrics__placeholder" />
                  </div>
                ))}
              </div>
              <div className="gads-metrics__flow">
                <div className="gads-metrics__flow-step">
                  <span className="gads-metrics__flow-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </span>
                  <span>Ad Spend</span>
                </div>
                <div className="gads-metrics__flow-arrow" />
                <div className="gads-metrics__flow-step">
                  <span className="gads-metrics__flow-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                      <polyline points="10 17 15 12 10 7" />
                      <line x1="15" y1="12" x2="3" y2="12" />
                    </svg>
                  </span>
                  <span>Clicks</span>
                </div>
                <div className="gads-metrics__flow-arrow" />
                <div className="gads-metrics__flow-step">
                  <span className="gads-metrics__flow-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <line x1="3" y1="9" x2="21" y2="9" />
                      <line x1="9" y1="21" x2="9" y2="9" />
                    </svg>
                  </span>
                  <span>Landing Page</span>
                </div>
                <div className="gads-metrics__flow-arrow" />
                <div className="gads-metrics__flow-step gads-metrics__flow-step--active">
                  <span className="gads-metrics__flow-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>Conversion</span>
                </div>
                <div className="gads-metrics__flow-arrow" />
                <div className="gads-metrics__flow-step">
                  <span className="gads-metrics__flow-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </span>
                  <span>Attribution</span>
                </div>
                <div className="gads-metrics__flow-arrow" />
                <div className="gads-metrics__flow-step">
                  <span className="gads-metrics__flow-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </span>
                  <span>Report</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- Conversion Tracking Visual ---- */}
      <section className="section gads-tracking">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Tracking</span>
            <h2 className="section-heading__title">Conversion Tracking Architecture</h2>
          </div>
          <ScrollReveal>
            <div className="gads-tracking__card glass-card gradient-border">
              <div className="gads-tracking__actions">
                <div className="gads-tracking__action">
                  <span className="gads-tracking__action-icon gads-tracking__action-icon--whatsapp">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </span>
                  <span>WhatsApp Click</span>
                </div>
                <div className="gads-tracking__action">
                  <span className="gads-tracking__action-icon gads-tracking__action-icon--phone">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  <span>Phone Call</span>
                </div>
                <div className="gads-tracking__action">
                  <span className="gads-tracking__action-icon gads-tracking__action-icon--form">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  </span>
                  <span>Form Submission</span>
                </div>
              </div>
              <div className="gads-tracking__connector" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
              </div>
              <div className="gads-tracking__platforms">
                <span className="gads-tracking__platform">GA4</span>
                <span className="gads-tracking__platform">Google Ads</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <FAQSection
        eyebrow="FAQ"
        title="Google Ads, Frequently Asked Questions"
        faqs={FAQS}
      />

      {/* ---- Related Services ---- */}
      <section className="section related-content">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Explore More</span>
            <h2 className="section-heading__title">Related Services</h2>
          </div>
          <div className="related-content__links">
            {RELATED_SERVICES.map((item) => (
              <Link key={item.path} to={item.path} className="related-content__link">
                {item.name}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            ))}
            <Link to="/faq/" className="related-content__link">
              FAQ
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>


      {/* ---- Google Ads by Location ---- */}
      <section className="section ga-location-cta">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading section-heading--left">
              <span className="section-heading__eyebrow">Locations</span>
              <h2 className="section-heading__title">Google Ads Services by Location</h2>
              <p className="section-heading__subtitle">
                Explore Google Ads management tailored to the market and industry environment
                of each location we serve.
              </p>
            </div>
          </ScrollReveal>
          <div className="ga-location-cta__grid">
            <ScrollReveal>
              <div className="ga-location-cta__card glass-card">
                <span className="ga-location-cta__badge">Thoothukudi</span>
                <h3 className="ga-location-cta__title">Google Ads Agency Thoothukudi</h3>
                <p className="ga-location-cta__text">
                  PPC campaigns for Thoothukudi's port, marine, industrial, manufacturing,
                  B2B and local business sectors.
                </p>
                <Link
                  to="/services/google-ads/thoothukudi/"
                  className="ga-location-cta__link"
                >
                  Explore Google Ads Thoothukudi
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ---- Final CTA ---- */}
      <CTASection
        title={CTA.title}
        subtitle={CTA.subtitle}
        primaryLabel={CTA.label}
        primaryHref={whatsappHref}
      />
      <ContactFormSection />
    </div>
  )
}
