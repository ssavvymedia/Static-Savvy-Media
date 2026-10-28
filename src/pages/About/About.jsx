import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import SectionHeading from '../../components/common/SectionHeading.jsx'
import FAQSection from '../../components/sections/FAQSection.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import ContactFormSection from '../../components/sections/ContactFormSection.jsx'
import { ScrollReveal } from '../../components/animations/ScrollReveal.jsx'
import { setSeo } from '../../utils/seo.js'
import { organizationSchema, faqPageSchema, breadcrumbListSchema } from '../../utils/schema.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL } from '../../utils/constants.js'
import aboutHeroImg from '../../assets/images/About/About.webp'
import deepanAboutImg from '../../assets/images/About/DeepanAbout.webp'

/* ============================================================
   CONTENT, Approved Static Savvy Media About Page Content
   ============================================================ */

const PAGE_TITLE = 'About Static Savvy Media | Founded 2021 by Deepan Kanz'

const PAGE_DESCRIPTION =
  'Static Savvy Media is an AI-first digital marketing agency founded on 1 October 2021 by Deepan Kanz. HQ in Madurai, with an office in Rawang, Malaysia. Our story, team and approach.'

const SERVICES = [
  { number: '01', title: 'SEO', text: 'Search engine optimisation designed to improve organic visibility and long-term discoverability.', path: '/services/seo/madurai/' },
  { number: '02', title: 'GEO & AEO', text: 'Generative Engine Optimization and Answer Engine Optimization designed to improve visibility inside AI-generated answers.', path: '/services/geo-aeo-ai-search/' },
  { number: '03', title: 'Local SEO', text: 'Google Business Profile and Google Maps optimisation for local and regional businesses.', path: '/services/local-seo/madurai/' },
  { number: '04', title: 'Google Ads', text: 'High-intent paid search campaigns designed to capture demand and generate measurable enquiries.', path: '/services/google-ads/' },
  { number: '05', title: 'Social Media Marketing', text: 'Platform-specific content and social strategies designed to build audience visibility and business credibility.', path: '/services/social-media-marketing/madurai/' },
  { number: '06', title: 'Website Design & Development', text: 'Conversion-focused websites designed with SEO, AI search visibility and WhatsApp-first enquiry generation in mind.', path: '/services/website-design-development/' },
  { number: '07', title: 'AI Business Automation', text: 'AI-powered workflows and automation systems that reduce manual work and help teams focus on growth.', path: '/services/ai-business-automation/' },
  { number: '08', title: 'Corporate Photography & Video', text: 'Professional brand imagery and video production from the Madurai studio, content designed to build trust before a word is read.', path: '/services/corporate-photography-video/' },
  { number: '09', title: 'AI Video Creation', text: 'Marketing-grade videos produced with AI to reduce production time and cost while maintaining professional presentation.', path: '/services/ai-video-creation/' },
  { number: '10', title: 'Product Photography & Creative Design', text: 'E-commerce-ready product imagery and graphic design designed to help turn browsers into buyers.', path: '/services/product-photography-creative-design/' },
]

const MARKETS = [
  {
    title: 'Madurai, Tamil Nadu',
    text: 'Our headquarters. Deep local knowledge across textiles, education, healthcare, hospitality and retail.',
    tags: ['Textiles', 'Education', 'Healthcare', 'Hospitality', 'Retail'],
    iconClass: 'about-market-card__icon--purple',
    path: '/locations/madurai/',
  },
  {
    title: 'Thoothukudi (Tuticorin), Tamil Nadu',
    text: "Serving the port city's industrial, marine and manufacturing businesses with B2B and B2C digital marketing.",
    tags: ['Industrial', 'Marine', 'Manufacturing', 'B2B', 'B2C'],
    iconClass: 'about-market-card__icon--pink',
    path: '/locations/thoothukudi/',
  },
  {
    title: 'Rawang & Selangor, Malaysia',
    text: 'SME-focused digital marketing with grant-aware strategies. Helping Malaysian businesses leverage MDEC and SMECorp digital transformation programmes.',
    tags: ['MDEC', 'SMECorp', 'SMEs', 'Grant-Aware'],
    iconClass: 'about-market-card__icon--cyan',
    path: '/locations/malaysia/',
  },
]

const WHY_CHOOSE = [
  {
    title: 'GEO & AEO First',
    text: 'AI search visibility (GEO and AEO) is a core deliverable in our plans, not an afterthought.',
    icon: '✨',
  },
  {
    title: 'Transparent, Verified Results',
    text: "We track every metric that matters and report honestly, including what didn't work and why.",
    icon: '✔',
  },
  {
    title: 'WhatsApp-First by Design',
    text: 'Every campaign is built around driving qualified enquiries to WhatsApp, the channel Indian and Malaysian SMEs actually convert on.',
    icon: '💬',
  },
  {
    title: 'Local Market Depth',
    text: 'We understand the Madurai textile economy, the Thoothukudi port corridor and the Malaysian SME grant landscape, because we operate in all three.',
    icon: '🗺',
  },
]

const APPROACH_STEPS = [
  { number: '01', title: 'Understand', text: 'Understand the business, market, customers and competition.' },
  { number: '02', title: 'Discover', text: 'Identify how customers search and where discovery happens.' },
  { number: '03', title: 'Position', text: "Build the business's search, social and AI visibility." },
  { number: '04', title: 'Convert', text: 'Turn digital attention into WhatsApp enquiries, calls, forms, leads and business conversations.' },
  { number: '05', title: 'Optimise', text: 'Measure what matters and continuously improve.' },
]

const PRINCIPLES = [
  { number: '01', title: 'Visibility Should Be Measurable' },
  { number: '02', title: 'AI Search Is Already Here' },
  { number: '03', title: 'Content Should Answer Real Questions' },
  { number: '04', title: 'Local Businesses Need Local Expertise' },
  { number: '05', title: 'Marketing Should Generate Conversations' },
  { number: '06', title: 'Transparency Builds Long-Term Trust' },
]

const SPECIALISATIONS = [
  { number: '01', title: 'Generative Engine Optimization (GEO)', text: 'Entity building and AI citation strategy.' },
  { number: '02', title: 'Answer Engine Optimization (AEO)', text: 'FAQ schema, structured content and voice search optimisation.' },
  { number: '03', title: 'Local SEO', text: 'Google Business Profile and Google Maps ranking for Tamil Nadu and Malaysia markets.' },
  { number: '04', title: 'Technical SEO', text: 'Schema markup, Core Web Vitals and site architecture.' },
  { number: '05', title: 'AI Business Automation', text: 'Workflow tools and WhatsApp Business API integration.' },
]

const INDUSTRIES = [
  { name: 'Education & Training', path: '/industries/education-training/', icon: '🎓' },
  { name: 'Healthcare & Clinics', path: '/industries/healthcare-clinics/', icon: '🏥' },
  { name: 'Hospitality & Hotels', path: '/industries/hospitality-hotels/', icon: '🏨' },
  { name: 'Industrial & Marine', path: '/industries/port-marine-industrial-thoothukudi/', icon: '⚓' },
  { name: 'Real Estate & Builders', path: '/industries/real-estate-builders/', icon: '🏗' },
  { name: 'Retail & E-Commerce', path: '/industries/retail-ecommerce/', icon: '🛒' },
  { name: 'SMEs', path: '/industries/smes-malaysia-grant-eligible/', icon: '💼' },
  { name: 'Textiles', path: '/industries/textiles-madurai/', icon: '🧵' },
]

const FAQS = [
  {
    question: 'What is Static Savvy Media?',
    answer: 'Static Savvy Media is an AI-first digital marketing agency serving businesses across Madurai, Thoothukudi and Malaysia with SEO, GEO, AEO, Local SEO, Google Ads, social media, website development and AI-powered digital solutions.',
  },
  {
    question: 'When was Static Savvy Media founded, and who founded it?',
    answer: 'Static Savvy Media was founded on 1 October 2021 by Deepan Kanz, who still leads strategy as founder. The agency started in Madurai, Tamil Nadu, which remains its headquarters.',
  },
  {
    question: 'Where is Static Savvy Media\u2019s head office?',
    answer: 'The head office is at 2nd Floor, 4/3, Srinivasa Perumal Koil St, Kamarajar Salai, Madurai 625009, Tamil Nadu. Malaysian clients are served from the Rawang, Selangor office. For Madurai services, see the Madurai digital marketing agency page at staticsavvymedia.com/locations/madurai/.',
  },
  {
    question: 'Where does Static Savvy Media operate?',
    answer: 'The agency operates across three key markets: Madurai, Tamil Nadu; Thoothukudi, Tamil Nadu; and Rawang & Selangor, Malaysia. The agency also works remotely with businesses across India, Singapore and Southeast Asia.',
  },
  {
    question: 'What makes Static Savvy Media different?',
    answer: 'Static Savvy Media treats AI search visibility as a primary digital marketing deliverable rather than an afterthought. The agency combines GEO/AEO with SEO, Local SEO, paid search, social media and conversion-focused digital systems.',
  },
  {
    question: 'Does Static Savvy Media work with businesses outside Tamil Nadu?',
    answer: 'Yes. The agency works with businesses across India and Southeast Asia and has an active presence in Tamil Nadu and Malaysia.',
  },
  {
    question: 'How do I get started?',
    answer: 'The fastest way is WhatsApp. Message +91 99440 40345 for an initial conversation about your digital marketing strategy.',
  },
]

/* ============================================================
   COMPONENT
   ============================================================ */

export default function About() {
  const jsonLdRef = useRef([])

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/about/`,
      ogType: 'website',
    })

    const faqEntities = FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    }))

    const org = organizationSchema({
      name: 'Static Savvy Media',
      description: PAGE_DESCRIPTION,
      foundingDate: '2021-10-01',
      founder: {
        '@type': 'Person',
        name: 'Deepan Kanz',
        url: `${SITE_URL}/about/deepan-kanz/`,
      },
      areaServed: [
        { '@type': 'City', name: 'Madurai' },
        { '@type': 'City', name: 'Thoothukudi' },
        { '@type': 'Country', name: 'Malaysia' },
      ],
    })

    const aboutPage = {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Static Savvy Media',
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/about/`,
      mainEntity: {
        '@type': 'Organization',
        name: 'Static Savvy Media',
        url: SITE_URL,
      },
    }

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'About', item: `${SITE_URL}/about/` },
      ],
    })

    const scripts = [org, aboutPage, faqPageSchema({ faqs: faqEntities }), breadcrumbs].map(
      (data) => {
        const script = document.createElement('script')
        script.type = 'application/ld+json'
        script.text = JSON.stringify(data)
        document.head.appendChild(script)
        return script
      },
    )
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
          HERO
          ============================================================ */}
      <HeroSection
        layout="two-column"
        eyebrow="ABOUT STATIC SAVVY MEDIA"
        title={
          <>
            About Static Savvy Media:{' '}
            <span className="text-gradient">AI-First Marketing Since 2021</span>
          </>
        }
        subtitle="Founded on 1 October 2021 by Deepan Kanz, Static Savvy Media is an AI-first digital marketing agency helping businesses become visible, discoverable and credible across traditional search, Google Maps and AI answers."
        actions={
          <>
            <Button href={whatsappHref} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">
              Start a Conversation
            </Button>
            <Button to="/about/deepan-kanz/" variant="ghost" size="lg">
              Meet Our Founder
            </Button>
          </>
        }
      >
        <div className="hero__visual-side">
          <img src={aboutHeroImg} width={1536} height={1024} fetchPriority="high" alt="About Static Savvy Media" className="hero__image" />
        </div>
      </HeroSection>

      {/* ============================================================
          SECTION 01, WHO WE ARE
          ============================================================ */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="about-who-we-are">
              <div className="about-who-we-are__content">
                <SectionHeading
                  eyebrow="Who We Are"
                  title="Digital Marketing Should Work for How People Discover Businesses Now"
                  align="left"
                />
                <p>
                  Static Savvy Media is a digital marketing agency built around one simple idea: digital marketing should work for the way people discover businesses now, not the way they searched five years ago.
                </p>
                <p>
                  Our work combines SEO, GEO, AEO, Local SEO, Google Ads, Social Media, Website Development, AI Business Automation and Creative Production. We help businesses build a stronger digital presence across search engines, maps, social platforms and AI-generated answers.
                </p>
                <p>
                  The agency is headquartered in Madurai and serves businesses across Tamil Nadu, Thoothukudi and Malaysia. If you are a local business looking for a{' '}
                  <Link to="/">digital marketing company in Madurai</Link>, start with our{' '}
                  <Link to="/locations/madurai/">Madurai digital marketing agency page</Link>{' '}
                  for services, pricing and our Kamarajar Salai office. Malaysian businesses can see our{' '}
                  <Link to="/locations/kuala-lumpur/">Kuala Lumpur digital marketing services</Link>.
                </p>
                <ul className="about-who-we-are__facts">
                  <li><strong>Founded:</strong> 1 October 2021</li>
                  <li><strong>Founder:</strong> <Link to="/about/deepan-kanz/">Deepan Kanz</Link></li>
                  <li><strong>Headquarters:</strong> Kamarajar Salai, Madurai, Tamil Nadu</li>
                  <li><strong>Malaysia office:</strong> Rawang, Selangor</li>
                  <li><strong>Google rating (Madurai):</strong> 4.9★ from 100+ reviews</li>
                </ul>
                <div className="about-who-we-are__services">
                  <span className="about-who-we-are__chip">SEO</span>
                  <span className="about-who-we-are__chip about-who-we-are__chip--pink">GEO</span>
                  <span className="about-who-we-are__chip about-who-we-are__chip--cyan">AEO</span>
                  <span className="about-who-we-are__chip">Local SEO</span>
                  <span className="about-who-we-are__chip about-who-we-are__chip--blue">Google Ads</span>
                  <span className="about-who-we-are__chip about-who-we-are__chip--pink">Social Media</span>
                  <span className="about-who-we-are__chip">Websites</span>
                  <span className="about-who-we-are__chip about-who-we-are__chip--cyan">AI Automation</span>
                  <span className="about-who-we-are__chip about-who-we-are__chip--blue">Creative</span>
                </div>
              </div>
              <div className="about-who-we-are__visual">
                <div className="about-who-we-are__visual-card">
                  <div className="about-who-we-are__visual-label">Digital Presence Ecosystem</div>
                  <div className="about-who-we-are__visual-grid">
                    <div className="about-who-we-are__visual-node about-who-we-are__visual-node--purple">SEO</div>
                    <div className="about-who-we-are__visual-node about-who-we-are__visual-node--pink">GEO</div>
                    <div className="about-who-we-are__visual-node about-who-we-are__visual-node--cyan">AEO</div>
                    <div className="about-who-we-are__visual-node about-who-we-are__visual-node--blue">Maps</div>
                    <div className="about-who-we-are__visual-node about-who-we-are__visual-node--purple">Social</div>
                    <div className="about-who-we-are__visual-node about-who-we-are__visual-node--pink">Ads</div>
                    <div className="about-who-we-are__visual-node about-who-we-are__visual-node--cyan">AI</div>
                    <div className="about-who-we-are__visual-node about-who-we-are__visual-node--blue">Web</div>
                    <div className="about-who-we-are__visual-node about-who-we-are__visual-node--purple">Leads</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================================
          SECTION 02, OUR STORY
          ============================================================ */}
      <section className="section section--alt">
        <div className="container">
          <SectionHeading
            eyebrow="Our Story"
            title="Why Static Savvy Media Exists"
            subtitle="The digital discovery landscape is changing. Search is no longer limited to traditional Google results."
          />
          <ScrollReveal>
            <div className="about-story-journey">
              <div className="about-story-journey__step">
                <div className="about-story-journey__dot">1</div>
                <div className="about-story-journey__text">
                  <div className="about-story-journey__label">Discoverable</div>
                </div>
              </div>
              <div className="about-story-journey__step">
                <div className="about-story-journey__dot">2</div>
                <div className="about-story-journey__text">
                  <div className="about-story-journey__label">Credible</div>
                </div>
              </div>
              <div className="about-story-journey__step">
                <div className="about-story-journey__dot">3</div>
                <div className="about-story-journey__text">
                  <div className="about-story-journey__label">Visible</div>
                </div>
              </div>
              <div className="about-story-journey__step">
                <div className="about-story-journey__dot">4</div>
                <div className="about-story-journey__text">
                  <div className="about-story-journey__label">Citable</div>
                </div>
              </div>
              <div className="about-story-journey__step">
                <div className="about-story-journey__dot">5</div>
                <div className="about-story-journey__text">
                  <div className="about-story-journey__label">Contactable</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div style={{ textAlign: 'center', marginTop: '2rem', maxWidth: '700px', marginInline: 'auto' }}>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                People increasingly discover businesses through Google Search, Google Maps, Social Media, AI Search, ChatGPT, Perplexity, Google AI Overviews and Voice Search. Static Savvy Media was built around this shift. Instead of treating AI search as an afterthought, the agency approaches GEO and AEO as important parts of modern digital visibility.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================================
          SECTION 03, WHAT WE DO
          ============================================================ */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="What We Do"
            title="Our Services"
            subtitle="Comprehensive digital marketing designed for the AI era."
          />
          <div className="about-service-grid">
            {SERVICES.map((service, index) => (
              <ScrollReveal key={service.number} delay={index * 60}>
                <Link to={service.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="about-service-card">
                    <div className="about-service-card__number">{service.number}</div>
                    <h3 className="about-service-card__title">{service.title}</h3>
                    <p className="about-service-card__text">{service.text}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 04, OUR MARKETS
          ============================================================ */}
      <section className="section section--alt">
        <div className="container">
          <SectionHeading
            eyebrow="Our Markets"
            title="Serving Three Markets"
            subtitle="Deep local expertise across Tamil Nadu and Malaysia."
          />
          <div className="about-markets-grid">
            {MARKETS.map((market, index) => (
              <ScrollReveal key={market.title} delay={index * 80}>
                <Link to={market.path} style={{ textDecoration: 'none' }}>
                  <div className="about-market-card">
                    <div className={`about-market-card__icon ${market.iconClass}`}>
                      {market.title.includes('Madurai') ? '🏛' : market.title.includes('Thoothukudi') ? '⚓' : '🇲'}
                    </div>
                    <h3 className="about-market-card__title">{market.title}</h3>
                    <p className="about-market-card__text">{market.text}</p>
                    <div className="about-market-card__tags">
                      {market.tags.map((tag) => (
                        <span key={tag} className="about-market-card__tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 05, WHY CHOOSE STATIC SAVVY MEDIA
          ============================================================ */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Why Choose Static Savvy Media"
          />
          <div className="about-why-grid">
            {WHY_CHOOSE.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 80}>
                <div className="about-why-card">
                  <div className="about-why-card__icon">{item.icon}</div>
                  <h3 className="about-why-card__title">{item.title}</h3>
                  <p className="about-why-card__text">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 06, OUR APPROACH
          ============================================================ */}
      <section className="section section--alt">
        <div className="container">
          <SectionHeading
            eyebrow="Our Approach"
            title="How We Think About Digital Marketing"
          />
          <div className="about-approach-flow">
            {APPROACH_STEPS.map((step, index) => (
              <ScrollReveal key={step.number} delay={index * 80}>
                <div className="about-approach-step">
                  <div className="about-approach-step__number">{step.number}</div>
                  <div className="about-approach-step__content">
                    <div className="about-approach-step__title">{step.title}</div>
                    <div className="about-approach-step__text">{step.text}</div>
                  </div>
                </div>
                {index < APPROACH_STEPS.length - 1 && (
                  <div className="about-approach-arrow" aria-hidden="true">&#8595;</div>
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 07, THE AI-FIRST DIFFERENCE
          ============================================================ */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="AI-First"
            title="Built for Search Beyond Google"
            subtitle="Traditional SEO focuses primarily on ranking web pages. Modern digital visibility also requires understanding how AI systems discover, understand and cite businesses."
          />
          <ScrollReveal>
            <div className="about-ai-ecosystem">
              <div className="about-ai-node about-ai-node--active">Google</div>
              <div className="about-ai-node">ChatGPT</div>
              <div className="about-ai-node">Perplexity</div>
              <div className="about-ai-node about-ai-node--active">AI Overviews</div>
              <div className="about-ai-node">Voice Search</div>
            </div>
          </ScrollReveal>
          <div className="about-ai-geo-aeo-grid">
            <ScrollReveal delay={80}>
              <div className="about-ai-type-card">
                <span className="about-ai-type-card__label about-ai-type-card__label--geo">GEO</span>
                <h3 className="about-ai-type-card__title">Generative Engine Optimization</h3>
                <ul className="about-ai-type-card__list">
                  <li>Entity building</li>
                  <li>AI citations</li>
                  <li>Brand mentions</li>
                  <li>Structured content</li>
                  <li>Topical authority</li>
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <div className="about-ai-type-card">
                <span className="about-ai-type-card__label about-ai-type-card__label--aeo">AEO</span>
                <h3 className="about-ai-type-card__title">Answer Engine Optimization</h3>
                <ul className="about-ai-type-card__list">
                  <li>FAQ content</li>
                  <li>Structured answers</li>
                  <li>Schema markup</li>
                  <li>Voice search</li>
                  <li>Question-based search</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 08, OUR PRINCIPLES
          ============================================================ */}
      <section className="section section--alt">
        <div className="container">
          <SectionHeading
            eyebrow="Principles"
            title="What We Believe"
          />
          <div className="about-principles-grid">
            {PRINCIPLES.map((principle, index) => (
              <ScrollReveal key={principle.number} delay={index * 60}>
                <div className="about-principle-card">
                  <div className="about-principle-card__number">{principle.number}</div>
                  <h3 className="about-principle-card__title">{principle.title}</h3>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 09, OUR FOUNDER
          ============================================================ */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Founder"
            title="Meet the Founder"
          />
          <ScrollReveal>
            <div className="about-founder-card">
              <div className="about-founder-card__image">
                <img src={deepanAboutImg} width={651} height={941} loading="lazy" decoding="async" alt="Deepan Kanz - Founder & AI Search Specialist" className="about-founder-card__img" />
              </div>
              <div className="about-founder-card__info">
                <h3 className="about-founder-card__name">Deepan Kanz</h3>
                <p className="about-founder-card__role">Founder &amp; AI Search Specialist</p>
                <p className="about-founder-card__bio">
                  Deepan Kanz founded Static Savvy Media with a single focus: building digital marketing that works in the era of AI search. He specialises in Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO), and the person behind Static Savvy Media&apos;s GEO/AEO methodology.
                </p>
                <p className="about-founder-card__bio">
                  His background in digital marketing spans SEO, paid search, social media and content strategy. His focus shifted significantly in 2024 when AI search engines moved from experimental to mainstream. He recognized that the fundamental mechanics of online discovery were shifting, and that agencies still building 2019-era SEO strategies were going to leave their clients behind.
                </p>
                <p className="about-founder-card__bio">
                  He spent 2024 building and testing GEO and AEO methodologies across Static Savvy Media&apos;s client base, studying what made AI engines cite certain businesses and ignore others, and developing entity-building and answer-structured content approaches that form the core of Static Savvy Media&apos;s offering today.
                </p>
                <div className="about-founder-card__badges">
                  <span className="about-founder-card__badge about-founder-card__badge--purple">GEO</span>
                  <span className="about-founder-card__badge about-founder-card__badge--pink">AEO</span>
                  <span className="about-founder-card__badge about-founder-card__badge--cyan">Local SEO</span>
                  <span className="about-founder-card__badge about-founder-card__badge--purple">Technical SEO</span>
                  <span className="about-founder-card__badge about-founder-card__badge--pink">AI Automation</span>
                </div>
                <div className="about-founder-card__actions">
                  <Button to="/about/deepan-kanz/" variant="primary" size="lg">
                    Meet Deepan Kanz
                  </Button>
                  <Button to="/about/reviews/" variant="ghost" size="lg">
                    Read Reviews
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================================
          SECTION 10, FOUNDER SPECIALISATIONS
          ============================================================ */}
      <section className="section section--alt">
        <div className="container">
          <SectionHeading
            eyebrow="Specialisations"
            title="Areas of Specialisation"
          />
          <div className="about-specialisation-grid">
            {SPECIALISATIONS.map((spec, index) => (
              <ScrollReveal key={spec.number} delay={index * 60}>
                <div className="about-specialisation-card">
                  <div className="about-specialisation-card__number">{spec.number}</div>
                  <h3 className="about-specialisation-card__title">{spec.title}</h3>
                  <p className="about-specialisation-card__text">{spec.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 11, OUR SERVICE PHILOSOPHY
          ============================================================ */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Service Philosophy"
            title="One Digital Partner. Multiple Growth Channels."
            subtitle="Our services are not isolated. They work together as a digital growth system."
          />
          <ScrollReveal>
            <div className="about-ecosystem">
              <div className="about-ecosystem__grid">
                <div className="about-ecosystem__node">SEO</div>
                <div className="about-ecosystem__node about-ecosystem__node--highlight">GEO / AEO</div>
                <div className="about-ecosystem__node">Local SEO</div>
              </div>
              <div className="about-ecosystem__arrows" aria-hidden="true">
                <span>&#8595;</span>
                <span>&#8595;</span>
                <span>&#8595;</span>
              </div>
              <div className="about-ecosystem__center">Digital Visibility</div>
              <div className="about-ecosystem__arrows" aria-hidden="true">
                <span>&#8595;</span>
                <span>&#8595;</span>
                <span>&#8595;</span>
              </div>
              <div className="about-ecosystem__grid">
                <div className="about-ecosystem__node">Google Ads</div>
                <div className="about-ecosystem__node about-ecosystem__node--highlight">Social Media</div>
                <div className="about-ecosystem__node">Website</div>
              </div>
              <div className="about-ecosystem__arrows" aria-hidden="true">
                <span>&#8595;</span>
                <span>&#8595;</span>
              </div>
              <div className="about-ecosystem__center">Enquiries</div>
              <div className="about-ecosystem__arrows" aria-hidden="true">
                <span>&#8595;</span>
              </div>
              <div className="about-ecosystem__grid" style={{ maxWidth: '280px', marginInline: 'auto' }}>
                <div className="about-ecosystem__node about-ecosystem__node--highlight" style={{ gridColumn: 'span 2' }}>AI Automation</div>
                <div className="about-ecosystem__node">WhatsApp</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================================
          SECTION 12, WHO WE SERVE
          ============================================================ */}
      <section className="section section--alt">
        <div className="container">
          <SectionHeading
            eyebrow="Industries"
            title="Businesses We Help"
          />
          <div className="about-industry-grid">
            {INDUSTRIES.map((industry, index) => (
              <ScrollReveal key={industry.name} delay={index * 60}>
                <Link to={industry.path} style={{ textDecoration: 'none' }}>
                  <div className="about-industry-card">
                    <div className="about-industry-card__icon" aria-hidden="true">{industry.icon}</div>
                    <div className="about-industry-card__name">{industry.name}</div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 13, TRUST / CREDIBILITY
          ============================================================ */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Credibility"
            title="Built on Strategy. Measured by Results."
          />
          <div className="about-trust-grid">
            <ScrollReveal delay={0}>
              <div className="about-trust-card">
                <div className="about-trust-card__icon">&#9889;</div>
                <h3 className="about-trust-card__title">AI-First Strategy</h3>
                <p className="about-trust-card__text">GEO and AEO built into every engagement from day one.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div className="about-trust-card">
                <div className="about-trust-card__icon">&#9878;</div>
                <h3 className="about-trust-card__title">Local Market Depth</h3>
                <p className="about-trust-card__text">Deep knowledge of Madurai, Thoothukudi and Malaysian markets.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <div className="about-trust-card">
                <div className="about-trust-card__icon">&#128202;</div>
                <h3 className="about-trust-card__title">Transparent Reporting</h3>
                <p className="about-trust-card__text">Honest metrics including what did not work and why.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={240}>
              <div className="about-trust-card">
                <div className="about-trust-card__icon">&#128172;</div>
                <h3 className="about-trust-card__title">WhatsApp-First Conversion</h3>
                <p className="about-trust-card__text">Every campaign drives qualified enquiries to WhatsApp.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={320}>
              <div className="about-trust-card">
                <div className="about-trust-card__icon">&#128269;</div>
                <h3 className="about-trust-card__title">Search Visibility</h3>
                <p className="about-trust-card__text">Visible across Google, AI search and social platforms.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <div className="about-trust-card">
                <div className="about-trust-card__icon">&#128640;</div>
                <h3 className="about-trust-card__title">Multi-Channel Marketing</h3>
                <p className="about-trust-card__text">SEO, ads, social and AI working as one system.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 14, FAQ
          ============================================================ */}
      <FAQSection
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        faqs={FAQS}
      />

      {/* ============================================================
          SECTION 15, FINAL CTA
          ============================================================ */}
      <CTASection
        eyebrow="Get Started"
        title="Your Business Deserves to Be Found."
        subtitle="Search is changing. AI is changing how people discover businesses. Your digital strategy should change with it. Let's build a digital presence that makes your business visible across search, social and AI."
        primaryLabel="Start a Conversation"
        primaryTo="/contact/"
        secondaryLabel="WhatsApp Us"
        secondaryHref={whatsappHref}
      />
      <ContactFormSection />
    </div>
  )
}
