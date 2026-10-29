import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/common/Breadcrumbs.jsx'
import Button from '../components/common/Button.jsx'
import { formatTwoColorTitle } from '../components/hero/HeroSection.jsx'
import FAQSection from '../components/sections/FAQSection.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import QuoteCTA from '../components/sections/QuoteCTA.jsx'
import { ScrollReveal } from '../components/animations/ScrollReveal.jsx'
import { setSeo } from '../utils/seo.js'
import { faqPageSchema, breadcrumbListSchema } from '../utils/schema.js'
import { buildWhatsAppLink } from '../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL } from '../utils/constants.js'
import '../styles/pages/seo-madurai.css'

/**
 * Service × location page, same layout and styles as /services/seo/madurai/ (seo-mdu-* classes),
 * driven by a content object so new city pages don't copy 700 lines of JSX.
 *
 * content: { path, title, description, eyebrow, h1, intro, trust, phone, contactBlock,
 *            crumbs: [{ name, path }] (Home first, current page last),
 *            sections: [{ eyebrow, heading, subtitle, kind: 'cards'|'numbered'|'checks', items, after }],
 *            related: [{ name, path }], faqs, faqTitle, cta: { title, subtitle, label }, schema: [],
 *            quote?: QuoteCTA props ({ region, service, text }), shown instead of public prices }
 */
export default function LocalServicePage({ content }) {
  const hasRun = useRef(false)
  const url = `${SITE_URL}${content.path}`

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true
    setSeo({
      title: content.title,
      description: content.description,
      canonical: url,
      ogImage: content.ogImage ? `${SITE_URL}${content.ogImage}` : undefined,
      ogType: 'website',
      schema: [
        ...(content.schema || []),
        faqPageSchema(content.faqs),
        breadcrumbListSchema(content.crumbs),
      ],
    })
  }, [content, url])

  const whatsappHref = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)

  return (
    <div className="page">
      <section className="section" style={{ paddingTop: 'var(--space-lg)', paddingBottom: 0 }}>
        <div className="container">
          <Breadcrumbs />
        </div>
      </section>

      <section className="section seo-mdu-hero-section">
        <div className="container">
          <div className="seo-mdu-hero">
            <div className="seo-mdu-hero__content">
              <ScrollReveal>
                <span className="seo-mdu-hero__badge">{content.eyebrow}</span>
              </ScrollReveal>
              <ScrollReveal delay={80}>
                <h1 className="seo-mdu-hero__title">{formatTwoColorTitle(content.h1)}</h1>
              </ScrollReveal>
              <ScrollReveal delay={160}>
                {content.intro.map((para) => (
                  <p key={para.slice(0, 40)} className="seo-mdu-hero__paragraph">{para}</p>
                ))}
              </ScrollReveal>
              <ScrollReveal delay={240}>
                <div className="seo-mdu-hero__actions">
                  <Button href={whatsappHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">
                    WhatsApp for a Free Consultation
                  </Button>
                  {content.phone ? (
                    <Button href={content.phone.href} variant="outline" size="lg">
                      Call {content.phone.display}
                    </Button>
                  ) : (
                    <Button to="/contact/" variant="outline" size="lg">
                      Contact Us
                    </Button>
                  )}
                </div>
                {content.trust && <p className="seo-mdu-hero__trust">{content.trust}</p>}
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {content.image && (
        <div className="container">
          <figure style={{ margin: '0 auto 2rem', maxWidth: '1000px' }}>
            <picture>
              <source srcSet={content.image.webp} type="image/webp" />
              <img src={content.image.jpg} alt={content.image.alt} width={1200} height={630} loading="eager" style={{ width: '100%', height: 'auto', borderRadius: '16px' }} />
            </picture>
          </figure>
        </div>
      )}

      {content.quickAnswer && (
        <section className="section">
          <div className="container">
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h2 className="section-heading__title">{content.quickAnswer.heading}</h2>
              {content.quickAnswer.text.map((para) => (
                <p key={para.slice(0, 32)}>{para}</p>
              ))}
              {content.quickAnswer.facts && (
                <dl style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
                  {content.quickAnswer.facts.map((f) => (
                    <div key={f.label}>
                      <dt style={{ fontWeight: 600, opacity: 0.8 }}>{f.label}</dt>
                      <dd style={{ margin: 0 }}>
                        {f.value}
                        {f.link && (
                          <>
                            {' '}
                            <Link to={f.link.to}>{f.link.label}</Link>
                          </>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </div>
        </section>
      )}

      {content.sections.map((sec) => (
        <section key={sec.heading} className="section">
          <div className="container">
            <ScrollReveal>
              <div className="section-heading section-heading--left">
                {sec.eyebrow && <span className="section-heading__eyebrow">{sec.eyebrow}</span>}
                <h2 className="section-heading__title">{sec.heading}</h2>
                {sec.subtitle && <p className="section-heading__subtitle">{sec.subtitle}</p>}
              </div>
            </ScrollReveal>
            {sec.kind === 'checks' ? (
              <div className="seo-mdu-measurement-grid">
                {sec.items.map((item) => (
                  <div key={item} className="seo-mdu-measurement-item glass-card">
                    <span className="seo-mdu-measurement-item__check" aria-hidden="true">✓</span>
                    <p className="seo-mdu-measurement-item__text">{item}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className={sec.kind === 'numbered' ? 'seo-mdu-process-grid' : 'seo-mdu-industry-grid'}>
                {sec.items.map((item, i) => (
                  <ScrollReveal key={item.title} delay={(i % 4) * 80}>
                    <div className={sec.kind === 'numbered' ? 'seo-mdu-process-card glass-card' : 'seo-mdu-industry-card glass-card'}>
                      {sec.kind === 'numbered' && (
                        <span className="seo-mdu-process-card__number">{item.number || String(i + 1).padStart(2, '0')}</span>
                      )}
                      <h3 className={sec.kind === 'numbered' ? 'seo-mdu-process-card__title' : 'seo-mdu-industry-card__title'}>{item.title}</h3>
                      <p className={sec.kind === 'numbered' ? 'seo-mdu-process-card__text' : 'seo-mdu-industry-card__text'}>{item.text}</p>
                      {item.link && (
                        <Link to={item.link.to} className="seo-mdu-local-card__link">{item.link.label}</Link>
                      )}
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            )}
            {sec.after && <div className="section-heading__subtitle" style={{ marginTop: 'var(--space-lg)' }}>{sec.after}</div>}
          </div>
        </section>
      ))}

      {content.contactBlock}

      <section className="section seo-mdu-related-section">
        <div className="container">
          <div className="section-heading section-heading--left">
            <span className="section-heading__eyebrow">Explore More</span>
            <h2 className="section-heading__title">Related Services & Guides</h2>
          </div>
          <div className="seo-mdu-related-links">
            {content.related.map((item) => (
              <Link key={item.path} to={item.path} className="seo-mdu-related-link">{item.name}</Link>
            ))}
          </div>
        </div>
      </section>

      {content.quote && <QuoteCTA formHref="/contact/" {...content.quote} />}

      <FAQSection eyebrow="FAQ" title={content.faqTitle} faqs={content.faqs} />

      <CTASection
        title={content.cta.title}
        subtitle={content.cta.subtitle}
        primaryLabel={content.cta.label}
        primaryHref={whatsappHref}
      />
    </div>
  )
}
