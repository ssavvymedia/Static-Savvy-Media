import { Link } from 'react-router-dom'
import LocalServicePage from '../../../templates/LocalServicePage.jsx'
import { serviceSchema } from '../../../utils/schema.js'
import { SITE_URL, GOOGLE_TRUST_LINE } from '../../../utils/constants.js'

const PATH = '/services/website-design-development/madurai/'
const DESCRIPTION =
  'Web design company in Madurai since 2021: mobile-first, SEO-ready business, WordPress and e-commerce websites, landing pages from ₹15,000. Rated 4.9★ on Google.'

const content = {
  path: PATH,
  ogImage: '/og/services-06website.jpg',
  title: 'Web Design & Development Company in Madurai | Static Savvy Media',
  description: DESCRIPTION,
  eyebrow: 'WEBSITE DESIGN · MADURAI',
  h1: 'Website Design & Development Company in Madurai, Sites That Rank and Bring Enquiries',
  intro: [
    'A website is often the first thing a Madurai customer checks after finding you on Google Maps or Instagram. We design and build fast, mobile-first websites that explain what you do, load quickly on mobile data and turn visits into WhatsApp messages, calls and form enquiries.',
    'Every site we build is set up for search from day one: clean URLs, page titles and meta descriptions, schema markup, Core Web Vitals and Google Search Console, so your SEO does not have to start with a rebuild.',
  ],
  trust: GOOGLE_TRUST_LINE,
  phone: { href: 'tel:+919944040345', display: '+91 99440 40345' },
  image: { jpg: '/og/services-06website.jpg', webp: '/og/services-06website.webp', alt: 'Website design and development company in Madurai, Static Savvy Media' },
  quickAnswer: {
    heading: 'Looking for a web design company in Madurai?',
    text: [
      'Static Savvy Media is a website design and development company headquartered in Madurai, at Kamarajar Salai, building business websites, WordPress sites, e-commerce stores and ad landing pages since 2021. Every site is mobile-first, set up for Google search and AI answers, and built to turn visitors into WhatsApp messages, calls and enquiries.',
    ],
    facts: [
      { label: 'Madurai office', value: '2nd Floor, 4/3, Srinivasa Perumal Koil St, Kamarajar Salai, Madurai 625009 (visits by appointment)' },
      { label: 'Building websites since', value: '1 October 2021' },
      { label: 'Google rating', value: '4.9★ from 100+ Google reviews' },
      { label: 'Website prices', value: 'Landing pages from ₹15,000, business websites from ₹45,000, e-commerce from ₹80,000', link: { to: '/pricing/india/website/', label: 'See website pricing' } },
      { label: 'Languages', value: 'Tamil and English' },
      { label: 'Phone / WhatsApp', value: '+91 99440 40345' },
    ],
  },
  crumbs: [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services/' },
    { name: 'Website Design & Development', path: '/services/website-design-development/' },
    { name: 'Madurai', path: PATH },
  ],
  sections: [
    {
      eyebrow: 'Services',
      heading: 'Website Development Services in Madurai',
      kind: 'cards',
      items: [
        { title: 'Business Websites', text: 'Service, about, location and contact pages written around what your Madurai customers actually search for, with clear calls to action on every page.' },
        { title: 'WordPress & CMS Websites', text: 'Easy-to-edit WordPress or headless CMS sites so your team can update offers, photos and blog posts without calling a developer.' },
        { title: 'E-commerce Websites', text: 'Online stores for textiles, jewellery, food and retail brands with product catalogues, payment gateway integration and order notifications on WhatsApp.' },
        { title: 'Landing Pages for Ads', text: 'Focused pages for Google Ads and Meta campaigns, with conversion tracking set up so you can see the cost of each lead.', link: { to: '/services/google-ads/', label: 'Google Ads management' } },
        { title: 'Website Redesign & Speed Fixes', text: 'We rebuild slow or outdated sites, keep your existing rankings with proper 301 redirects and fix Core Web Vitals issues.' },
        { title: 'SEO-Ready Build', text: 'Titles, meta descriptions, headings, image alt text, schema markup, XML sitemap and Search Console set up before launch.', link: { to: '/services/seo/madurai/', label: 'SEO services in Madurai' } },
      ],
    },
    {
      eyebrow: 'Pricing',
      heading: 'Website Design Prices in Madurai',
      subtitle: 'Guide prices from our published website pricing. You get a written quote after a short discovery call, and you own the finished site.',
      kind: 'cards',
      items: [
        { title: 'Landing Page: ₹15,000–25,000', text: 'One conversion-focused page for a Google Ads campaign or product launch, with WhatsApp button, GA4 and conversion tracking. Usually 5–10 business days.' },
        { title: 'Business Website: ₹45,000–75,000', text: 'Up to 20 pages on WordPress or Next.js with an SEO foundation (schema, sitemap, canonical tags), WhatsApp CTA, GA4 and 30 days of support.' },
        { title: 'E-commerce Website: ₹80,000–1,50,000', text: 'WooCommerce or custom store for up to 500 products with Razorpay payments, SEO foundation and 60 days of support.', link: { to: '/pricing/india/website/', label: 'Full website pricing' } },
      ],
    },
    {
      eyebrow: 'Industries',
      heading: 'Websites Built Around How Madurai Customers Buy',
      kind: 'cards',
      items: [
        { title: 'Textiles, Sarees & Handloom', text: 'Product catalogues with clear photos, price ranges and WhatsApp ordering, plus pages that can rank for searches beyond Madurai.', link: { to: '/industries/textiles-madurai/', label: 'Digital marketing for textiles' } },
        { title: 'Jewellery & Retail Showrooms', text: 'Collection pages, store location with directions and Google Maps, and offer banners your team can update for festivals.' },
        { title: 'Hospitals & Clinics', text: 'Doctor and department pages, timings, appointment enquiry forms and click-to-call, written in plain Tamil and English.' },
        { title: 'Schools, Colleges & Training Centres', text: 'Course and admission pages, fee enquiry forms and event updates that parents and students can read easily on mobile.' },
        { title: 'Hotels, Restaurants & Travel', text: 'Menus, rooms or packages with photos, booking enquiries on WhatsApp and pages for temple-visit and tourist searches.' },
        { title: 'Builders, Real Estate & B2B Suppliers', text: 'Project and product pages with specifications, brochures and enquiry forms that capture qualified leads.' },
      ],
    },
    {
      eyebrow: 'Process',
      heading: 'How We Build Your Website',
      kind: 'numbered',
      items: [
        { title: 'Discovery', text: 'We look at your business, competitors in Madurai and the keywords your customers use.' },
        { title: 'Sitemap and content plan', text: 'We agree the pages, the message on each page and what action each visitor should take.' },
        { title: 'Design', text: 'Mobile-first design for your approval before development starts.' },
        { title: 'Development', text: 'Fast, secure build with forms, WhatsApp click-to-chat, analytics and tracking.' },
        { title: 'SEO and launch checks', text: 'Redirects, sitemap, schema, speed and mobile tests before the site goes live.' },
        { title: 'Support', text: 'Updates, backups and improvements after launch, based on what the data shows.' },
      ],
    },
    {
      eyebrow: 'Included',
      heading: 'What Every Website Includes',
      kind: 'checks',
      items: [
        'Mobile-responsive design',
        'Page titles, meta descriptions and heading structure',
        'Schema markup (Organization / LocalBusiness / Service / FAQ)',
        'WhatsApp click-to-chat and enquiry forms',
        'Google Analytics 4 and Search Console set-up',
        'XML sitemap and robots.txt',
        'Core Web Vitals and image optimisation',
        'Full ownership of your domain, hosting and content',
      ],
      after: (
        <p>
          See <Link to="/pricing/india/website/">website pricing</Link>, or pair your new site with{' '}
          <Link to="/services/local-seo/madurai/">local SEO in Madurai</Link> and{' '}
          <Link to="/services/geo-aeo-ai-search/madurai/">AI search optimisation (GEO)</Link>. Choosing a host?
          Compare price, renewal and uptime in our{' '}
          <Link to="/blog/best-web-hosting-india-malaysia-small-business/">top 5 web hosting guide</Link>, or use our{' '}
          <Link to="/blog/website-design-company-madurai-checklist/">website design company checklist</Link>.
        </p>
      ),
    },
  ],
  related: [
    { name: 'Website Design & Development (all locations)', path: '/services/website-design-development/' },
    { name: 'SEO Company in Madurai', path: '/services/seo/madurai/' },
    { name: 'Local SEO Services in Madurai', path: '/services/local-seo/madurai/' },
    { name: 'Social Media Marketing in Madurai', path: '/services/social-media-marketing/madurai/' },
    { name: 'Digital Marketing in Madurai', path: '/locations/madurai/' },
    { name: 'Best Web Hosting: Top 5 Compared', path: '/blog/best-web-hosting-india-malaysia-small-business/' },
    { name: 'Contact', path: '/contact/' },
  ],
  faqTitle: 'Frequently Asked Questions, Website Development Madurai',
  faqs: [
    { question: 'How much does a website cost in Madurai?', answer: 'Our published guide prices are ₹15,000–25,000 for a landing page, ₹45,000–75,000 for a business website of up to 20 pages and ₹80,000–1,50,000 for an e-commerce website. The final price depends on the number of pages, features and content, and we send a written quote after a short discovery call.' },
    { question: 'What is the best web design company in Madurai for a small business?', answer: 'Choose a Madurai web design company that shows its prices, builds mobile-first, sets up SEO basics (titles, schema, sitemap, Search Console) before launch, adds WhatsApp and call buttons, and gives you full ownership of your domain and website. Static Savvy Media does all of these from its Madurai office and is rated 4.9★ from 100+ Google reviews.' },
    { question: 'What is the difference between web design and website development?', answer: 'Web design is the layout, look and content plan of each page. Website development is the build: code or CMS, speed, forms, payments, tracking and security. We handle both, so the design you approve is the site that goes live.' },
    { question: 'How long does it take to build a website?', answer: 'A small business website usually takes a few weeks from approved content to launch. E-commerce and custom builds take longer. We share a timeline before starting.' },
    { question: 'Will my website be SEO-friendly?', answer: 'Yes. Titles, meta descriptions, headings, schema markup, sitemap, speed and Search Console are set up before launch, so the site is ready to rank.' },
    { question: 'Do you redesign existing websites without losing Google rankings?', answer: 'Yes. We map your old URLs to the new pages with 301 redirects and check Search Console after launch to protect existing traffic.' },
    { question: 'Do you build e-commerce websites?', answer: 'Yes, including product catalogues, payment gateways and order notifications, for Madurai retailers, textile and jewellery businesses.' },
    { question: 'Will I own my website?', answer: 'Yes. Your domain, hosting account, content and website files belong to you.' },
    { question: 'Can you build my website in Tamil and English?', answer: 'Yes. Our Madurai team writes and builds pages in Tamil and English, so local customers can read your offers in the language they prefer.' },
    { question: 'Can I meet your team in Madurai?', answer: 'Yes. Our office is at 2nd Floor, 4/3, Srinivasa Perumal Koil St, Kamarajar Salai, Madurai 625009. Visits are by appointment, so message us on WhatsApp at +91 99440 40345 first.' },
  ],
  cta: {
    title: 'Planning a New Website in Madurai?',
    subtitle: 'Message us on WhatsApp for a free review of your current site or a quote for a new one.',
    label: 'Get a Free Website Review',
  },
  schema: [
    serviceSchema({
      name: 'Website Design & Development in Madurai',
      serviceType: 'Website design and development',
      description: DESCRIPTION,
      url: `${SITE_URL}${PATH}`,
      areaServed: 'Madurai, Tamil Nadu',
    }),
  ],
}

export default function WebsiteDevelopment_Madurai() {
  return <LocalServicePage content={content} />
}
