import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx'
import Button from '../../components/common/Button.jsx'
import HeroSection from '../../components/hero/HeroSection.jsx'
import FAQSection from '../../components/sections/FAQSection.jsx'
import { AnswerFirst, AuditBlock, CardGrid } from '../../components/v2/V2Blocks.jsx'
import { setSeo } from '../../utils/seo.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { SITE_URL, WHATSAPP_NUMBER } from '../../utils/constants.js'
import heroImg from '../../assets/images/home/ind-manufacturing.webp'

/* /industries/manufacturing-b2b/: digital marketing for manufacturers, exporters and B2B suppliers. */
const PAGE_TITLE = 'Manufacturing & B2B Digital Marketing | Static Savvy Media'
const PAGE_DESCRIPTION = 'B2B SEO, Google Ads, AI search and websites for manufacturers, exporters and industrial suppliers in Madurai, Tamil Nadu and Malaysia. Get a free Growth Audit from our Madurai HQ.'
const WA_MSG = 'Hi Static Savvy Media, I run a manufacturing / B2B business and would like a Growth Audit.'

const ANSWER = 'Static Savvy Media runs B2B digital marketing for manufacturers, exporters and industrial suppliers from its Madurai HQ, with offices in Thoothukudi and Rawang, Malaysia. We build product and capability pages that rank for the specifications buyers search, run Google Ads for high-intent enquiry terms, make your company easy for AI assistants to cite, and track every call, WhatsApp chat and RFQ back to its source.'

const WHO = [
  { title: 'Manufacturers & fabricators', text: 'Engineering works, fabrication units, foundries, plastics, packaging, food processing and component makers that sell to other businesses and want more qualified RFQs, not more traffic.' },
  { title: 'Textile & garment producers', text: 'Spinning mills, weaving units, garment makers and home-textile producers selling to wholesalers, brands and importers in India and abroad.', link: '/industries/textiles-madurai/', linkLabel: 'Textiles in Madurai' },
  { title: 'Exporters', text: 'Businesses that need international buyers to find them on Google in English, trust the website, and send a proper enquiry with quantities and destination.' },
  { title: 'Industrial suppliers & distributors', text: 'Machinery dealers, spares, chemicals, electrical and safety-equipment suppliers whose buyers search by product name, part number, brand or application.' },
  { title: 'Port, marine & logistics', text: 'Shipping, clearing and forwarding, marine services and industrial firms around Thoothukudi and other port towns.', link: '/industries/port-marine-industrial-thoothukudi/', linkLabel: 'Port, marine & industrial' },
  { title: 'Malaysian manufacturers', text: 'Factories and B2B suppliers in Shah Alam, Klang, Rawang and the wider Klang Valley, marketed in English and Bahasa Malaysia from our Rawang office.', link: '/locations/shah-alam/', linkLabel: 'Shah Alam page' },
]

const CHALLENGES = [
  { title: 'Long, multi-person buying cycles', text: 'A purchase manager researches, an engineer checks specifications and an owner approves. Your website has to answer each of them, with specifications, certifications, capacity and proof of past supply.' },
  { title: 'Buyers search by specification', text: 'B2B buyers rarely search “best manufacturer”. They search the product, grade, size, material, standard or application. Each product family needs its own page written around those terms.' },
  { title: 'Directories take the enquiry', text: 'Many manufacturers rely on B2B marketplaces where the same lead goes to several competitors. Your own website and Google Business Profile let buyers contact you directly.' },
  { title: 'AI assistants shortlist suppliers', text: 'Buyers increasingly ask ChatGPT, Gemini or Perplexity for supplier shortlists. Assistants cite companies whose websites state clearly what they make, where, at what capacity and to which standards.' },
]

const WHAT = [
  { title: 'B2B SEO for product & capability pages', text: 'Keyword research by product, grade and application; one page per product family with specifications, MOQ, lead time, certifications and an RFQ form. Technical SEO so Google crawls the full catalogue.', link: '/services/seo/', linkLabel: 'SEO services' },
  { title: 'Google Ads for high-intent enquiries', text: 'Search campaigns on product and “supplier / manufacturer” terms, by state or country, with negative keywords to keep out jobseekers and retail buyers. Calls, WhatsApp and forms tracked as conversions.', link: '/services/google-ads/', linkLabel: 'Google Ads management' },
  { title: 'AI search visibility (GEO / AEO)', text: 'Clear company facts, product FAQs, structured data and consistent listings so AI assistants can understand and cite your company when buyers ask for suppliers.', link: '/services/geo-aeo-ai-search/', linkLabel: 'GEO & AEO' },
  { title: 'Google Business Profile & local SEO', text: 'A verified profile for each factory or office with the right categories, photos of the plant and products, and a reviews routine with your existing buyers.', link: '/services/local-seo/', linkLabel: 'Local SEO' },
  { title: 'A website buyers trust', text: 'Fast, mobile-first site with capability pages, a downloadable catalogue, certifications, plant photos and an RFQ form that asks for quantity, specification and destination.', link: '/services/website-design-development/', linkLabel: 'Website development' },
  { title: 'Plant & product photography', text: 'Real photos of your machinery, processes and finished goods. Buyers trust a plant they can see more than stock images.', link: '/services/corporate-photography-video/', linkLabel: 'Photography & video' },
]

const PROCESS = [
  { title: '1. Audit', text: 'We review your website, Google Business Profile, current rankings, competitors and how buyers search for your products, then list what to fix first.' },
  { title: '2. Product & keyword map', text: 'We map each product family to the searches buyers use and decide which pages to build, improve or merge.' },
  { title: '3. Build & fix', text: 'Product pages, technical fixes, RFQ forms, tracking, profile updates and, where it fits, a Google Ads test on the highest-intent terms.' },
  { title: '4. Report & improve', text: 'A monthly plain-English report from your own Google accounts: enquiries, calls, WhatsApp chats, rankings and what we are doing next.' },
]

const FAQS = [
  { question: 'Does digital marketing work for B2B manufacturers?', answer: 'Yes, when it is built around how B2B buyers search. Buyers search by product, specification and application, then compare suppliers’ websites before sending an RFQ. Pages that answer those searches with specifications, capacity and certifications bring fewer but far more qualified enquiries than general advertising.' },
  { question: 'Should a manufacturer use SEO or Google Ads?', answer: 'Usually both, in that order of importance over time. Google Ads can bring enquiries within weeks on high-intent product terms and shows which products have demand. SEO takes longer but keeps bringing enquiries without paying per click. We often start with a small Ads test while the product pages are built.' },
  { question: 'Do we still need B2B marketplaces?', answer: 'Marketplaces can bring volume, but the same lead often goes to several suppliers. Your own website and Google Business Profile bring direct enquiries that only you receive. Most manufacturers keep one or two marketplace listings and grow their own site alongside them.' },
  { question: 'Can you help us reach export buyers?', answer: 'Yes. We build English product pages around the terms international buyers use, target Google Ads by country where it makes sense, and make sure the website shows the details importers check: certifications, capacity, packing, ports and payment terms. We do not promise specific orders or countries.' },
  { question: 'How long before we see B2B enquiries from SEO?', answer: 'For specific product terms with little competition, pages can start ranking within two to four months. Broader or more competitive terms usually take six to twelve months. Google Ads can bring enquiries sooner. We show progress monthly from your own Search Console and Analytics.' },
  { question: 'Do you work with manufacturers outside Madurai?', answer: 'Yes. Our HQ is in Madurai with an office in Thoothukudi, and we work with manufacturers across Tamil Nadu, including Coimbatore, Tiruppur and Sivakasi, by visit, video call and WhatsApp. Our Malaysia office in Rawang serves factories in Selangor and the Klang Valley.' },
  { question: 'What do you need from us to start?', answer: 'Your product list or catalogue, any specifications and certifications you can share, access to your website and Google Business Profile, and an hour with the person who knows your buyers best. We handle the rest and agree every page with you before it goes live.' },
  { question: 'How much does B2B digital marketing cost?', answer: 'It depends on the number of product families, your markets and whether Google Ads is included. We quote after the free Growth Audit, once we know the scope. Our cost guide shows typical market ranges in Madurai, which are not our prices.' },
]

export default function ManufacturingB2B() {
  useEffect(() => {
    setSeo({ title: PAGE_TITLE, description: PAGE_DESCRIPTION, canonical: `${SITE_URL}/industries/manufacturing-b2b/`, ogType: 'website' })
  }, [])
  const wa = buildWhatsAppLink(WHATSAPP_NUMBER, WA_MSG)

  return (
    <div className="industry-page manufacturing-page">
      <Breadcrumbs />
      <HeroSection
        layout="two-column"
        eyebrow="Industries · Manufacturing & B2B"
        title="Digital Marketing for Manufacturing & B2B Companies"
        subtitle="B2B SEO, Google Ads, AI search and websites for manufacturers, exporters and industrial suppliers, run from our Madurai HQ for businesses across Tamil Nadu, India and Malaysia. Built to bring qualified RFQs from buyers who search by product and specification."
        actions={
          <>
            <Button href="#audit" variant="primary" size="lg">Get a free Growth Audit</Button>
            <Button href={wa} variant="ghost" size="lg" target="_blank" rel="noopener noreferrer">WhatsApp: +91 99440 40345</Button>
          </>
        }
      >
        <div className="hero__visual-side">
          <img src={heroImg} width={640} height={480} fetchPriority="high" alt="Modern manufacturing facility with fabric rolls on the production floor" className="hero__image" />
        </div>
      </HeroSection>

      <AnswerFirst heading="How does Static Savvy Media market manufacturing and B2B companies?" text={ANSWER} facts={['B2B SEO by product & specification', 'Google Ads for RFQs', 'AI search (GEO/AEO)', 'HQ: Madurai, Tamil Nadu', 'Malaysia office: Rawang']} />

      <CardGrid section="mfg-who" eyebrow="Who it is for" heading="Manufacturing and B2B businesses we work with" items={WHO} />
      <CardGrid section="mfg-challenges" eyebrow="Why B2B is different" heading="What makes manufacturing marketing different" intro="Industrial buyers behave differently from retail customers. These are the four things we plan around." items={CHALLENGES} cols={2} />
      <CardGrid section="mfg-what" eyebrow="What we do" heading="Growth solutions for manufacturers and B2B suppliers" items={WHAT} />
      <CardGrid section="mfg-process" eyebrow="How it works" heading="Our process for B2B companies" items={PROCESS} cols={4} />

      <section className="hv2 hv2-section hv2-section--flush" data-section="mfg-related" style={{ paddingTop: 'clamp(40px,5vw,64px)' }}>
        <div className="hv2-wrap">
          <span className="hv2-eyebrow">Related</span>
          <h2 className="hv2-h2">More for manufacturers</h2>
          <ul className="hv2-sol__links" style={{ marginTop: 18 }}>
            <li><Link to="/locations/madurai/">Static Savvy Media HQ in Madurai →</Link></li>
            <li><Link to="/blog/digital-marketing-coimbatore-manufacturers-b2b/">Guide: digital marketing for Coimbatore manufacturers →</Link></li>
            <li><Link to="/industries/textiles-madurai/">Digital marketing for textile businesses in Madurai →</Link></li>
            <li><Link to="/industries/port-marine-industrial-thoothukudi/">Port, marine & industrial marketing in Thoothukudi →</Link></li>
            <li><Link to="/blog/seo-services-selangor-shah-alam-petaling-jaya/">SEO for Selangor, Shah Alam & Petaling Jaya →</Link></li>
            <li><Link to="/solutions/">All growth solutions →</Link></li>
            <li><Link to="/industries/">All industries →</Link></li>
          </ul>
        </div>
      </section>

      <FAQSection eyebrow="FAQ" title="Manufacturing & B2B marketing: frequently asked questions" faqs={FAQS} />

      <AuditBlock formId="growth_audit_industry_manufacturing_b2b" defaultCity="" defaultIndustry="Textiles & Manufacturing" />
    </div>
  )
}
