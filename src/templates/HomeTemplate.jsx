import Button from '../components/common/Button.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import HeroSection from '../components/hero/HeroSection.jsx'
import FloatingIcons from '../components/hero/FloatingIcons.jsx'
import ServicesGrid from '../components/sections/ServicesGrid.jsx'
import LocationsGrid from '../components/sections/LocationsGrid.jsx'
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

      <LocationsGrid title="Serving Three Markets" items={markets} />

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

      <FAQSection title="Home Page, Frequently Asked Questions" faqs={faqs} />

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