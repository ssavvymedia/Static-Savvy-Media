import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import SectionHeading from '../../components/common/SectionHeading.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import { personSchema, faqPageSchema, breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL } from '../../utils/constants.js'

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
                <div className="founder-hero__portrait-initials" aria-hidden="true">DK</div>
                <div className="founder-hero__portrait-name">Deepan Kanz</div>
                <div className="founder-hero__portrait-role">Founder &amp; AI Search Specialist</div>
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
                <Button href="#" variant="ghost" size="lg">
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
            <ScrollReveal delay={0}>
              <div className="founder-connect-card">
                <div className="founder-connect-card__icon founder-connect-card__icon--whatsapp">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div className="founder-connect-card__label">WhatsApp</div>
                <div className="founder-connect-card__value" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#25D366', flexShrink: 0 }} aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>+91-99440-40345</span>
                </div>
                <Button href={whatsappHref} variant="primary" size="sm" target="_blank" rel="noopener noreferrer">
                  WhatsApp Deepan Directly
                </Button>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
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
                <Button href="#" variant="ghost" size="sm">
                  Connect on LinkedIn
                </Button>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <div className="founder-connect-card">
                <div className="founder-connect-card__icon founder-connect-card__icon--instagram">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </div>
                <div className="founder-connect-card__label">Instagram</div>
                <div className="founder-connect-card__value">@staticsavvymedia</div>
                <Button href="https://instagram.com/staticsavvymedia" variant="ghost" size="sm" target="_blank" rel="noopener noreferrer">
                  Follow on Instagram
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
    </div>
  )
}
