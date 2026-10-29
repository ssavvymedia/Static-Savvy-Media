import Button from '../components/common/Button.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import HeroSection from '../components/hero/HeroSection.jsx'
import FloatingIcons from '../components/hero/FloatingIcons.jsx'
import ServicesGrid from '../components/sections/ServicesGrid.jsx'
import { Link } from 'react-router-dom'
import { HOME_MADURAI_LINKS } from '../data/pages/homeContent.js'
import FAQSection from '../components/sections/FAQSection.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import ContactFormSection from '../components/sections/ContactFormSection.jsx'
import { ScrollReveal } from '../components/animations/ScrollReveal.jsx'
import HeroImage from '../assets/images/Heroimage.webp'
import '../styles/pages/home.css'

/**
 * T01 — HomeTemplate.
 * Composes the approved Static Savvy Media Home Page content
 * passed down from Home.jsx using the reusable section components.
 */
export default function HomeTemplate({
  hero,
  services,
  markets,
  proof,
  whyChoose,
  faqs,
  cta,
  whatsappHref,
}) {
  return (
    <div className="home-template">
      <FloatingIcons />

      <HeroSection
        eyebrow={hero?.eyebrow}
        title={hero?.title}
        subtitle={hero?.intro}
        layout="two-column"
        actions={
          <>
            <Button
              href={whatsappHref}
              variant="primary"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp for a Free Consultation
            </Button>
            <Button to="/contact/" variant="outline" size="lg">
              Contact Us
            </Button>
            {hero?.trust && <p className="hero__trust">{hero.trust}</p>}
          </>
        }
      >
        <div className="hero-image-container">
          <img
            src={HeroImage}
            width={1536}
            height={1024}
            fetchPriority="high"
            alt="Static Savvy Media Hero Visual - Google SEO and AI Search Citations"
            className="hero-image"
          />
        </div>
      </HeroSection>

      {proof?.length > 0 && (
        <section className="home-proof" aria-label="Static Savvy Media at a glance">
          <div className="container">
            <ul className="home-proof__list">
              {proof.map((p) => (
                <li key={p.label} className="home-proof__item">
                  <strong className="home-proof__value">{p.value}</strong>
                  <span className="home-proof__label">{p.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section why-2026">
        <div className="container">
          <SectionHeading title="Why 2026 Search Is Different, And Why It Matters" />
          <div className="why-2026__copy">
            <p className="why-2026__lead">
              Every month, millions of queries that used to produce blue links on Google now
              get answered directly inside AI engines, Google AI Overviews, ChatGPT, Perplexity,
              Microsoft Copilot. The businesses that appear in those answers get authority. The
              businesses that don't become invisible to the fastest-growing segment of search users.
            </p>
            <p className="why-2026__highlight glass-card gradient-border">
              Traditional SEO gets you on page one. GEO and AEO get you inside the answer itself.
            </p>
          </div>
        </div>
      </section>

      <ServicesGrid title="Our Services" items={services} />

      <section className="section where-we-work" id="where-we-work">
        <div className="container">
          <SectionHeading
            title="Where We Work"
            subtitle="Headquartered in Madurai since 2021, with offices in Thoothukudi and Rawang (Malaysia). Pick your country or city for local services and contact details."
          />
          <div className="where-we-work__grid">
            {markets.map((m) => (
              <article key={m.key} className="where-we-work__card glass-card">
                <h3 className="where-we-work__country">
                  <span className="where-we-work__flag" aria-hidden="true">{m.flag}</span>
                  <Link to={m.path}>{m.country}</Link>
                </h3>
                <p className="where-we-work__summary">{m.summary}</p>
                <ul className="where-we-work__cities">
                  {m.cities.map((c) => (
                    <li key={c.path}>
                      <Link to={c.path} className="where-we-work__city">{c.name}</Link>
                    </li>
                  ))}
                </ul>
                <p className="where-we-work__contact">{m.contact}</p>
                <Link to={m.path} className="where-we-work__more">{m.pathLabel} →</Link>
              </article>
            ))}
          </div>
          <div className="where-we-work__hq glass-card">
            <h3 className="where-we-work__hq-title">Madurai headquarters</h3>
            <ul className="where-we-work__hq-links">
              {HOME_MADURAI_LINKS.map((l) => (
                <li key={l.path}>
                  <Link to={l.path}>{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section why-choose">
        <div className="container">
          <SectionHeading title="Why Choose Static Savvy Media" />
          <div className="why-choose__grid grid grid--4">
            {whyChoose.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 80}>
                <div className="why-choose__card glass-card">
                  {item.icon || <span className="why-choose__mark" aria-hidden="true" />}
                  <h3 className="why-choose__title">{item.title}</h3>
                  <p className="why-choose__text">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <FAQSection title="Frequently Asked Questions" faqs={faqs} />

      <CTASection
        title={cta?.title}
        subtitle={cta?.subtitle}
        primaryLabel={cta?.label}
        primaryHref={whatsappHref}
      />
      <ContactFormSection />
    </div>
  )
}