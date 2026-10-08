import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import SectionHeading from '../../components/common/SectionHeading.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import ContactFormSection from '../../components/sections/ContactFormSection.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import { personSchema, faqPageSchema, breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL } from '../../utils/constants.js'
import deepanFounderImg from '../../assets/images/About/DeepanFounder.webp'

/* ============================================================
   CONTENT, Approved Static Savvy Media Founder Page Content
   ============================================================ */

const PAGE_TITLE = 'Deepan Kanz, Founder & AI Search Specialist | Static Savvy Media'

const PAGE_DESCRIPTION =
  'Meet Deepan Kanz, Founder & AI Search Specialist at Static Savvy Media. Learn about his GEO, AEO, SEO and AI business automation expertise and methodology.'

const SPECIALISATIONS = [
  {
    number: '01',
    title: 'Generative Engine Optimization (GEO)',
    text: 'Entity building and AI citation strategy.',
    iconClass: 'founder-spec-card__icon--purple',
    icon: '⚙',
  },
  {
    number: '02',
    title: 'Answer Engine Optimization (AEO)',
    text: 'FAQ schema, structured content, and voice search optimization.',
    iconClass: 'founder-spec-card__icon--cyan',
    icon: '❓',
  },
  {
    number: '03',
    title: 'Local SEO',
    text: 'Google Business Profile and Google Maps ranking for Tamil Nadu and Malaysia markets.',
    iconClass: 'founder-spec-card__icon--pink',
    icon: '📍',
  },
  {
    number: '04',
    title: 'Technical SEO',
    text: 'Schema markup, Core Web Vitals, site architecture.',
    iconClass: 'founder-spec-card__icon--blue',
    icon: '💻',
  },
  {
    number: '05',
    title: 'AI Business Automation',
    text: 'Workflow tools and WhatsApp Business API integration.',
    iconClass: 'founder-spec-card__icon--purple',
    icon: '🤖',
  },
]

const APPROACH_STEPS = [
  { number: '01', title: 'Understand', text: 'Study how AI engines discover and understand businesses.' },
  { number: '02', title: 'Test', text: 'Build and test GEO/AEO methodologies in real business contexts.' },
  { number: '03', title: 'Learn', text: 'Study what makes AI engines cite certain businesses and ignore others.' },
  { number: '04', title: 'Build', text: 'Develop entity-building and answer-structured content systems.' },
]

const EXPERTISE_TAGS = [
  { label: 'SEO', active: false },
  { label: 'Paid Search', active: false },
  { label: 'Social Media', active: false },
  { label: 'Content Strategy', active: false },
  { label: 'GEO', active: true },
  { label: 'AEO', active: true },
  { label: 'Technical SEO', active: true },
  { label: 'AI Automation', active: true },
]

/* ============================================================
   COMPONENT
   ============================================================ */

export default function Founder() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/about/deepan-kanz/`,
      ogType: 'profile',
    })

    const person = personSchema({
      name: 'Deepan Kanz',
      jobTitle: 'Founder & AI Search Specialist',
      worksFor: {
        '@type': 'Organization',
        name: 'Static Savvy Media',
        url: SITE_URL,
      },
      knowsAbout: [
        'Generative Engine Optimization',
        'Answer Engine Optimization',
        'AI Search',
        'SEO',
        'Digital Marketing',
      ],
      url: `${SITE_URL}/about/deepan-kanz/`,
    })

    const profilePage = {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      name: 'Deepan Kanz, Founder & AI Search Specialist',
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/about/deepan-kanz/`,
      mainEntity: {
        '@type': 'Person',
        name: 'Deepan Kanz',
        jobTitle: 'Founder & AI Search Specialist',
        worksFor: {
          '@type': 'Organization',
          name: 'Static Savvy Media',
          url: SITE_URL,
        },
      },
    }

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'About', item: `${SITE_URL}/about/` },
        { name: 'Deepan Kanz', item: `${SITE_URL}/about/deepan-kanz/` },
      ],
    })

    const scripts = [person, profilePage, breadcrumbs].map((data) => {
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
    <div className="about-template">
      <Breadcrumbs />

      {/* ============================================================
          HERO, Split Screen
          ============================================================ */}
      <section className="section">
        <div className="container">
          <div className="founder-hero">
            <div className="founder-hero__visual">
              <div className="founder-hero__portrait">
                <img src={deepanFounderImg} width={740} height={941} fetchPriority="high" alt="Deepan Kanz - Founder & AI Search Specialist" className="founder-hero__portrait-img" />
                <div className="founder-hero__portrait-glow" aria-hidden="true" />
              </div>
            </div>
            <div className="founder-hero__content">
              <span className="eyebrow">FOUNDER &amp; AI SEARCH SPECIALIST</span>
              <h1 className="hero__title">
                Deepan Kanz , {' '}
                <span className="text-gradient">Founder &amp; AI Search Specialist</span>
              </h1>
              <p className="hero__subtitle">
                Building digital marketing that works in the era of AI search.
              </p>
              <div className="founder-hero__badges">
                <span className="founder-hero__badge founder-hero__badge--purple">GEO</span>
                <span className="founder-hero__badge founder-hero__badge--pink">AEO</span>
                <span className="founder-hero__badge founder-hero__badge--cyan">SEO</span>
                <span className="founder-hero__badge founder-hero__badge--blue">AI Search</span>
                <span className="founder-hero__badge founder-hero__badge--purple">Digital Marketing</span>
              </div>
              <div className="founder-hero__actions">
                <Button href={whatsappHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">
                  WhatsApp Deepan Directly
                </Button>
                <Button href="https://www.linkedin.com/in/deepankanz/" variant="ghost" size="lg" target="_blank" rel="noopener noreferrer">
                  Connect on LinkedIn
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FOUNDER INTRODUCTION
          ============================================================ */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="founder-editorial">
              <div className="founder-editorial__content">
                <SectionHeading
                  eyebrow="Founder"
                  title="The Founder Behind Static Savvy Media"
                  align="left"
                />
                <p>
                  Deepan Kanz founded Static Savvy Media with a single focus: building digital marketing that works in the era of <span className="founder-editorial__highlight">AI Search</span>.
                </p>
                <p>
                  He is Tamil Nadu&apos;s first dedicated practitioner of Generative Engine Optimization (<span className="founder-editorial__highlight">GEO</span>) and Answer Engine Optimization (<span className="founder-editorial__highlight--cyan">AEO</span>), and the person behind Static Savvy Media&apos;s <span className="founder-editorial__highlight--pink">GEO/AEO</span> methodology.
                </p>
                <p>
                  His work in <span className="founder-editorial__highlight">Digital Marketing</span> is focused on making businesses visible across traditional search and the rapidly growing world of AI search.
                </p>
              </div>
              <div className="founder-editorial__visual">
                <div className="founder-editorial__card">
                  <div className="founder-editorial__card-label">Core Focus Areas</div>
                  <div className="founder-editorial__card-grid">
                    <div className="founder-editorial__card-node founder-editorial__card-node--purple">GEO</div>
                    <div className="founder-editorial__card-node founder-editorial__card-node--cyan">AEO</div>
                    <div className="founder-editorial__card-node founder-editorial__card-node--pink">SEO</div>
                    <div className="founder-editorial__card-node founder-editorial__card-node--blue">AI Search</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================================
          BACKGROUND & EXPERTISE
          ============================================================ */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Background"
            title="Background & Expertise"
          />
          <ScrollReveal>
            <div className="founder-background">
              <p>
                Deepan&apos;s background in digital marketing spans SEO, paid search, social media, and content strategy.
              </p>
              <p>
                His focus shifted significantly in 2024 when AI search engines moved from experimental to mainstream.
              </p>
              <p>
                He recognized that the fundamental mechanics of online discovery were shifting, and that agencies still building 2019-era SEO strategies were going to leave their clients behind.
              </p>
              <p>
                He spent 2024 building and testing GEO and AEO methodologies across Static Savvy Media&apos;s client base, studying what made AI engines cite certain businesses and ignore others, and developing the entity-building and answer-structured content approaches that form the core of Static Savvy Media&apos;s offering today.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================================
          THE SHIFT TO AI SEARCH
          ============================================================ */}
      <section className="section section--alt">
        <div className="container">
          <SectionHeading
            eyebrow="The Shift"
            title="From Traditional Search to AI Search"
          />
          <ScrollReveal>
            <div className="founder-timeline">
              <div className="founder-timeline__step">
                <div className="founder-timeline__dot founder-timeline__dot--start">S</div>
                <div className="founder-timeline__text">Traditional SEO</div>
              </div>
              <div className="founder-timeline__connector" />
              <div className="founder-timeline__step">
                <div className="founder-timeline__dot founder-timeline__dot--mid">24</div>
                <div className="founder-timeline__text founder-timeline__text--muted">2024</div>
              </div>
              <div className="founder-timeline__connector" />
              <div className="founder-timeline__step">
                <div className="founder-timeline__dot founder-timeline__dot--active">AI</div>
                <div className="founder-timeline__text">AI Search Becomes Mainstream</div>
              </div>
              <div className="founder-timeline__connector" />
              <div className="founder-timeline__step">
                <div className="founder-timeline__dot founder-timeline__dot--active">G</div>
                <div className="founder-timeline__text">GEO, Generative Engine Optimization</div>
              </div>
              <div className="founder-timeline__connector" />
              <div className="founder-timeline__step">
                <div className="founder-timeline__dot founder-timeline__dot--active">A</div>
                <div className="founder-timeline__text">AEO, Answer Engine Optimization</div>
              </div>
              <div className="founder-timeline__connector" />
              <div className="founder-timeline__step">
                <div className="founder-timeline__dot founder-timeline__dot--end">V</div>
                <div className="founder-timeline__text">AI Search Visibility</div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div style={{ textAlign: 'center', marginTop: '2rem', maxWidth: '700px', marginInline: 'auto' }}>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                His focus shifted significantly in 2024 when AI search engines moved from experimental to mainstream. He recognized that the fundamental mechanics of online discovery were shifting.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================================
          THE PROBLEM DEEPAN IDENTIFIED
          ============================================================ */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="The Shift"
            title="The Digital Discovery Landscape Is Changing"
            subtitle="Agencies still building 2019-era SEO strategies risk leaving their clients behind as people increasingly discover businesses through AI-generated answers and conversational search."
          />
          <div className="founder-comparison">
            <ScrollReveal delay={0}>
              <div className="founder-comparison__card">
                <span className="founder-comparison__label founder-comparison__label--old">Old Model</span>
                <div className="founder-comparison__flow">
                  <div className="founder-comparison__step">
                    <div className="founder-comparison__step-icon founder-comparison__step-icon--old">K</div>
                    Keywords
                  </div>
                  <div className="founder-comparison__arrow" aria-hidden="true">↓</div>
                  <div className="founder-comparison__step">
                    <div className="founder-comparison__step-icon founder-comparison__step-icon--old">R</div>
                    Rankings
                  </div>
                  <div className="founder-comparison__arrow" aria-hidden="true">↓</div>
                  <div className="founder-comparison__step">
                    <div className="founder-comparison__step-icon founder-comparison__step-icon--old">T</div>
                    Website Traffic
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="founder-comparison__card">
                <span className="founder-comparison__label founder-comparison__label--new">New Model</span>
                <div className="founder-comparison__flow">
                  <div className="founder-comparison__step">
                    <div className="founder-comparison__step-icon founder-comparison__step-icon--new">E</div>
                    Entity
                  </div>
                  <div className="founder-comparison__arrow" aria-hidden="true">↓</div>
                  <div className="founder-comparison__step">
                    <div className="founder-comparison__step-icon founder-comparison__step-icon--new">A</div>
                    Authority
                  </div>
                  <div className="founder-comparison__arrow" aria-hidden="true">↓</div>
                  <div className="founder-comparison__step">
                    <div className="founder-comparison__step-icon founder-comparison__step-icon--new">S</div>
                    Structured Answers
                  </div>
                  <div className="founder-comparison__arrow" aria-hidden="true">↓</div>
                  <div className="founder-comparison__step">
                    <div className="founder-comparison__step-icon founder-comparison__step-icon--new">C</div>
                    AI Citations
                  </div>
                  <div className="founder-comparison__arrow" aria-hidden="true">↓</div>
                  <div className="founder-comparison__step">
                    <div className="founder-comparison__step-icon founder-comparison__step-icon--new">D</div>
                    Discovery
                  </div>
                  <div className="founder-comparison__arrow" aria-hidden="true">↓</div>
                  <div className="founder-comparison__step">
                    <div className="founder-comparison__step-icon founder-comparison__step-icon--new">Q</div>
                    Enquiry
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============================================================
          GEO / AEO METHODOLOGY
          ============================================================ */}
      <section className="section section--alt">
        <div className="container">
          <SectionHeading
            eyebrow="Methodology"
            title="Building the GEO & AEO Methodology"
          />
          <ScrollReveal>
            <div className="founder-methodology">
              <div className="founder-methodology__flow">
                <div className="founder-methodology__step">
                  <div className="founder-methodology__step-number">B</div>
                  <div className="founder-methodology__step-title">Business</div>
                </div>
                <div className="founder-methodology__arrow" aria-hidden="true">↓</div>
                <div className="founder-methodology__step">
                  <div className="founder-methodology__step-number">E</div>
                  <div className="founder-methodology__step-title">Entity</div>
                </div>
                <div className="founder-methodology__arrow" aria-hidden="true">↓</div>
                <div className="founder-methodology__step">
                  <div className="founder-methodology__step-number">C</div>
                  <div className="founder-methodology__step-title">Content</div>
                </div>
                <div className="founder-methodology__arrow" aria-hidden="true">↓</div>
                <div className="founder-methodology__step">
                  <div className="founder-methodology__step-number">S</div>
                  <div className="founder-methodology__step-title">Structure</div>
                </div>
                <div className="founder-methodology__arrow" aria-hidden="true">↓</div>
                <div className="founder-methodology__step">
                  <div className="founder-methodology__step-number">A</div>
                  <div className="founder-methodology__step-title">Authority</div>
                </div>
                <div className="founder-methodology__arrow" aria-hidden="true">↓</div>
                <div className="founder-methodology__step">
                  <div className="founder-methodology__step-number">AC</div>
                  <div className="founder-methodology__step-title">AI Citation</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="founder-methodology__content">
              <p>
                Deepan spent 2024 building and testing GEO and AEO methodologies across Static Savvy Media&apos;s client base.
              </p>
              <p>The work focused on studying:</p>
              <ul className="founder-methodology__list">
                <li>What makes AI engines cite certain businesses?</li>
                <li>Why are some businesses ignored?</li>
                <li>How can businesses become more discoverable inside AI-generated answers?</li>
                <li>How can entity-building and answer-structured content improve digital visibility?</li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================================
          AREAS OF SPECIALIZATION
          ============================================================ */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Specialization"
            title="Areas of Specialization"
          />
          <div className="founder-spec-grid">
            {SPECIALISATIONS.map((spec, index) => (
              <ScrollReveal key={spec.number} delay={index * 60}>
                <div className="founder-spec-card">
                  <div className={`founder-spec-card__icon ${spec.iconClass}`}>{spec.icon}</div>
                  <h3 className="founder-spec-card__title">{spec.title}</h3>
                  <p className="founder-spec-card__text">{spec.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          EXPERTISE ECOSYSTEM
          ============================================================ */}
      <section className="section section--alt">
        <div className="container">
          <SectionHeading
            eyebrow="Expertise"
            title="Expertise Ecosystem"
            subtitle="Interconnected areas of expertise working as one system."
          />
          <ScrollReveal>
            <div className="founder-ecosystem">
              <div className="founder-ecosystem__ring">
                <div className="founder-ecosystem__node">GEO</div>
                <div className="founder-ecosystem__node">AEO</div>
                <div className="founder-ecosystem__node">SEO</div>
              </div>
              <div className="founder-ecosystem__arrows" aria-hidden="true">
                <span>↓</span>
                <span>↓</span>
                <span>↓</span>
              </div>
              <div className="founder-ecosystem__center">Deepan Kanz</div>
              <div className="founder-ecosystem__arrows" aria-hidden="true">
                <span>↓</span>
                <span>↓</span>
              </div>
              <div className="founder-ecosystem__ring">
                <div className="founder-ecosystem__node">Local SEO</div>
                <div className="founder-ecosystem__node">Technical SEO</div>
                <div className="founder-ecosystem__node">AI Automation</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================================
          PERSONAL APPROACH
          ============================================================ */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Approach"
            title="A Practical Approach to AI Search"
          />
          <div className="founder-approach-grid">
            {APPROACH_STEPS.map((step, index) => (
              <ScrollReveal key={step.number} delay={index * 80}>
                <div className="founder-approach-card">
                  <div className="founder-approach-card__number">{step.number}</div>
                  <div>
                    <div className="founder-approach-card__title">{step.title}</div>
                    <div className="founder-approach-card__text">{step.text}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          WHY GEO & AEO MATTER
          ============================================================ */}
      <section className="section section--alt">
        <div className="container">
          <SectionHeading
            eyebrow="GEO & AEO"
            title="Why AI Search Visibility Matters"
            subtitle="Search is no longer limited to traditional search engine result pages. Businesses increasingly need to understand how AI systems discover, interpret and cite information."
          />
          <div className="founder-geo-aeo-grid">
            <ScrollReveal delay={0}>
              <div className="founder-geo-aeo-card">
                <span className="founder-geo-aeo-card__label founder-geo-aeo-card__label--geo">GEO</span>
                <h3 className="founder-geo-aeo-card__title">Generative Engine Optimization</h3>
                <ul className="founder-geo-aeo-card__list">
                  <li>Entity building</li>
                  <li>AI citation strategy</li>
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div className="founder-geo-aeo-card">
                <span className="founder-geo-aeo-card__label founder-geo-aeo-card__label--aeo">AEO</span>
                <h3 className="founder-geo-aeo-card__title">Answer Engine Optimization</h3>
                <ul className="founder-geo-aeo-card__list">
                  <li>FAQ schema</li>
                  <li>Structured content</li>
                  <li>Voice search optimization</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============================================================
          CORE EXPERTISE
          ============================================================ */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Expertise"
            title="Core Expertise"
          />
          <ScrollReveal>
            <div className="founder-expertise-strip">
              {EXPERTISE_TAGS.map((tag) => (
                <div
                  key={tag.label}
                  className={`founder-expertise-strip__item ${tag.active ? 'founder-expertise-strip__item--active' : ''}`}
                >
                  {tag.label}
                </div>
              ))}
            </div>
            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', maxWidth: '700px', marginInline: 'auto', lineHeight: 1.7 }}>
              Deepan&apos;s background in digital marketing spans SEO, paid search, social media, and content strategy, with his current focus on GEO, AEO and AI search visibility.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================================
          CONNECT WITH DEEPAN
          ============================================================ */}
      <section className="section section--alt">
        <div className="container">
          <SectionHeading
            eyebrow="Connect"
            title="Connect With Deepan"
          />
          <div className="founder-connect-grid">
            {/* 1. Instagram */}
            <ScrollReveal delay={0}>
              <div className="founder-connect-card">
                <div className="founder-connect-card__icon founder-connect-card__icon--instagram">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </div>
                <div className="founder-connect-card__label">Instagram</div>
                <div className="founder-connect-card__value">@deepankanz</div>
                <Button href="https://www.instagram.com/deepankanz" variant="ghost" size="sm" target="_blank" rel="noopener noreferrer">
                  Follow on Instagram
                </Button>
              </div>
            </ScrollReveal>

            {/* 2. Facebook */}
            <ScrollReveal delay={60}>
              <div className="founder-connect-card">
                <div className="founder-connect-card__icon founder-connect-card__icon--facebook">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div className="founder-connect-card__label">Facebook</div>
                <div className="founder-connect-card__value">@deepankanz</div>
                <Button href="https://www.facebook.com/deepankanz" variant="ghost" size="sm" target="_blank" rel="noopener noreferrer">
                  Follow on Facebook
                </Button>
              </div>
            </ScrollReveal>

            {/* 3. LinkedIn */}
            <ScrollReveal delay={120}>
              <div className="founder-connect-card">
                <div className="founder-connect-card__icon founder-connect-card__icon--linkedin">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <div className="founder-connect-card__label">LinkedIn</div>
                <div className="founder-connect-card__value">Deepan Kanz</div>
                <Button href="https://www.linkedin.com/in/deepankanz/" variant="ghost" size="sm" target="_blank" rel="noopener noreferrer">
                  Connect on LinkedIn
                </Button>
              </div>
            </ScrollReveal>

            {/* 4. X / Twitter */}
            <ScrollReveal delay={180}>
              <div className="founder-connect-card">
                <div className="founder-connect-card__icon founder-connect-card__icon--x">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                <div className="founder-connect-card__label">X (Twitter)</div>
                <div className="founder-connect-card__value">@deepankanz</div>
                <Button href="https://x.com/deepankanz" variant="ghost" size="sm" target="_blank" rel="noopener noreferrer">
                  Follow on X
                </Button>
              </div>
            </ScrollReveal>

            {/* 5. YouTube */}
            <ScrollReveal delay={240}>
              <div className="founder-connect-card">
                <div className="founder-connect-card__icon founder-connect-card__icon--youtube">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <div className="founder-connect-card__label">YouTube</div>
                <div className="founder-connect-card__value">@Deepankanz</div>
                <Button href="https://www.youtube.com/@Deepankanz" variant="ghost" size="sm" target="_blank" rel="noopener noreferrer">
                  Subscribe on YouTube
                </Button>
              </div>
            </ScrollReveal>

            {/* 6. Pinterest */}
            <ScrollReveal delay={300}>
              <div className="founder-connect-card">
                <div className="founder-connect-card__icon founder-connect-card__icon--pinterest">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345c-.091.379-.293 1.194-.333 1.361-.053.225-.174.271-.401.165-1.495-.696-2.43-2.878-2.43-4.632 0-3.774 2.744-7.24 7.906-7.24 4.15 0 7.377 2.957 7.377 6.912 0 4.123-2.599 7.44-6.207 7.44-1.212 0-2.352-.63-2.743-1.377l-.747 2.848c-.27 1.033-1.002 2.327-1.492 3.115C9.845 23.856 10.908 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div className="founder-connect-card__label">Pinterest</div>
                <div className="founder-connect-card__value">@Deepankanz</div>
                <Button href="https://in.pinterest.com/Deepankanz/" variant="ghost" size="sm" target="_blank" rel="noopener noreferrer">
                  Follow on Pinterest
                </Button>
              </div>
            </ScrollReveal>

            {/* 7. Medium */}
            <ScrollReveal delay={360}>
              <div className="founder-connect-card">
                <div className="founder-connect-card__icon founder-connect-card__icon--medium">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                  </svg>
                </div>
                <div className="founder-connect-card__label">Medium</div>
                <div className="founder-connect-card__value">@deepankanz</div>
                <Button href="https://medium.com/@deepankanz" variant="ghost" size="sm" target="_blank" rel="noopener noreferrer">
                  Read on Medium
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============================================================
          DIRECT CONSULTATION CTA
          ============================================================ */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="founder-cta-panel glass-card gradient-border">
              <SectionHeading
                eyebrow="Consultation"
                title="Talk Directly With Deepan About Your Digital Marketing Strategy."
              />
              <p className="founder-cta-panel__subtitle">
                For first conversations about GEO/AEO or SEO strategy, Deepan handles these personally for new clients.
              </p>
              <div className="hero__actions">
                <Button href={whatsappHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">
                  WhatsApp Deepan Directly
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA
          ============================================================ */}
      <CTASection
        eyebrow="About Static Savvy Media"
        title="Learn More About Static Savvy Media"
        subtitle="Explore our services, markets and approach to digital marketing in the AI era."
        primaryLabel="Visit About Page"
        primaryTo="/about/"
        secondaryLabel="View All Services"
        secondaryTo="/services/"
      />
      <ContactFormSection />
    </div>
  )
}
