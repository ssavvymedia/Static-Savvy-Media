import { Link } from 'react-router-dom'
import LocalServicePage from '../../../templates/LocalServicePage.jsx'
import MalaysiaContactBlock from '../../../components/sections/MalaysiaContactBlock.jsx'
import { serviceSchema, professionalServiceSchema } from '../../../utils/schema.js'
import {
  SITE_URL,
  MALAYSIA_OFFICE,
  MALAYSIA_POSTAL_ADDRESS,
  MALAYSIA_OPENING_HOURS_SPEC,
} from '../../../utils/constants.js'

const PATH = '/services/google-ads/kuala-lumpur/'
const DESCRIPTION =
  'Google Ads management for KL businesses: search, Performance Max & call campaigns built around enquiries and WhatsApp leads. Get a custom quote: +60 12-453 7030.'

const content = {
  path: PATH,
  ogImage: '/og/services-google-ads-kuala-lumpur.jpg',
  image: { jpg: '/og/services-google-ads-kuala-lumpur.jpg', webp: '/og/services-google-ads-kuala-lumpur.webp', alt: 'Google Ads agency in Kuala Lumpur, PPC management by Static Savvy Media Malaysia' },
  title: 'Google Ads Agency Kuala Lumpur | PPC Management KL | Static Savvy Media',
  description: DESCRIPTION,
  eyebrow: 'GOOGLE ADS · KUALA LUMPUR',
  h1: 'Google Ads Agency in Kuala Lumpur — For Leads You Can Track',
  intro: [
    'In short: Static Savvy Media manages Google Ads for Kuala Lumpur and Klang Valley businesses. We build Search, Performance Max and call campaigns around the enquiries you actually want, track calls, forms and WhatsApp chats back to each campaign, and charge a flat monthly management fee that is separate from your ad spend.',
    'KL is a crowded ad market: clinics, lawyers, property agents, tuition centres and restaurants all bid on the same mobile searches. Good management is less about spending more and more about cutting wasted clicks, tightening locations and sending people to pages that convert.',
    'We run KL campaigns from our Malaysia office in Rawang, Selangor, with calls on a Malaysian number during Malaysian business hours. Your ad account stays in your company’s name. Page reviewed and updated 25 October 2026 by Deepan Kanz, founder.',
  ],
  phone: { href: MALAYSIA_OFFICE.phoneHref, display: MALAYSIA_OFFICE.phoneDisplay },
  crumbs: [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services/' },
    { name: 'Google Ads', path: '/services/google-ads/' },
    { name: 'Kuala Lumpur', path: PATH },
  ],
  sections: [
    {
      eyebrow: 'Services',
      heading: 'What Our Google Ads Management in KL Covers',
      kind: 'cards',
      items: [
        { title: 'Search Campaigns', text: 'Keyword campaigns for high-intent searches such as "dentist Cheras" or "accounting firm KL", with negative keywords reviewed every week so budget is not spent on job seekers or DIY searches.' },
        { title: 'Performance Max', text: 'Used where you have good conversion tracking and creative assets, with search-term and placement insights checked so PMax does not quietly spend on low-quality traffic.' },
        { title: 'Local & Call Ads', text: 'Location targeting around your outlet or service area, call assets and location assets linked to your Google Business Profile.' },
        { title: 'Remarketing', text: 'Reminder ads to people who visited your site but did not enquire, with frequency limits so you do not annoy them.' },
        { title: 'Conversion Tracking', text: 'Google Ads and GA4 conversions for calls, forms and WhatsApp clicks, set up before we scale spend.' },
        { title: 'Landing Page Advice', text: 'Clear recommendations, or a new landing page if needed, because paid traffic sent to a slow or confusing page wastes money.', link: { to: '/services/website-design-development/', label: 'Website development' } },
      ],
    },
    {
      eyebrow: 'Tracking',
      heading: 'Tracking WhatsApp and Call Leads From Google Ads in Malaysia',
      subtitle: 'In Malaysia many customers would rather WhatsApp than fill a form. If those chats are not tracked, Google optimises for the wrong thing.',
      kind: 'checks',
      items: [
        'WhatsApp click events from your site recorded as conversions in GA4 and Google Ads.',
        'Call assets and website call clicks tracked separately so you can see which campaigns make the phone ring.',
        'Form submissions tracked with thank-you events, not page views alone.',
        'A simple monthly lead sheet so you can mark which enquiries became customers.',
      ],
    },
    {
      eyebrow: 'Ads vs SEO',
      heading: 'Google Ads vs SEO for KL Businesses',
      kind: 'cards',
      items: [
        { title: 'Google Ads', text: 'Visible as soon as campaigns are approved and tracking is live. You pay per click, and leads stop when the budget stops. Best for new services, seasonal offers and fast feedback on what sells.' },
        { title: 'SEO', text: 'Slower to build, usually months, but clicks are not paid for one by one and visibility compounds. Best for services you will sell for years.', link: { to: '/services/seo/kuala-lumpur/', label: 'SEO services in KL' } },
        { title: 'Both together', text: 'Many KL SMEs run ads for immediate enquiries while SEO grows, then shift budget as organic rankings improve. Search-term data from ads also shows which keywords are worth targeting with SEO.' },
      ],
    },
    {
      eyebrow: 'Quotes',
      heading: 'Google Ads Budget and Management Fee in KL',
      kind: 'checks',
      items: [
        'Management fee: a flat monthly fee quoted for your campaign scope (Starter, Growth or Scale), not a percentage of ad spend.',
        'Recommended ad spend: we suggest a starting budget after checking cost per click in your sector and area; competitive sectors such as legal or aesthetics need more.',
        'Ad spend is paid directly to Google from your own account; our fee is invoiced separately.',
      ],
      after: <>For a custom quote, WhatsApp <a href="https://wa.me/60124537030">+60 12-453 7030</a> or <Link to="/contact/">send an enquiry</Link>. We reply with a recommended budget and a written management-fee quote.</>,
    },
    {
      eyebrow: 'Industries',
      heading: 'Google Ads for KL Industries',
      subtitle: 'How we approach common KL sectors. These are approaches, not client case studies.',
      kind: 'cards',
      items: [
        { title: 'Clinics & Aesthetics', text: 'Healthcare ads in Malaysia are subject to Google’s healthcare policies and Malaysian medical advertising rules, so ad copy and landing pages are written carefully and claims are avoided.' },
        { title: 'Property & Renovation', text: 'Project and area-based campaigns with lead forms or WhatsApp, and careful location targeting across KL and Selangor.' },
        { title: 'F&B', text: 'Location and call campaigns around outlets, plus reservation or delivery actions where they apply.' },
        { title: 'Education & Training', text: 'Course-level campaigns timed around intakes, with enquiries tracked by programme.' },
      ],
    },
    {
      eyebrow: 'Process',
      heading: 'Setup Process and Your First 30 Days',
      kind: 'numbered',
      items: [
        { title: 'Audit or plan', text: 'We review your existing account, or plan a new one: services, areas, budget and what a good lead is worth to you.' },
        { title: 'Tracking first', text: 'Conversion tracking for calls, forms and WhatsApp, tested before launch.' },
        { title: 'Build and launch', text: 'Campaign structure, keywords, negative lists, ads and assets, then submission for Google approval.' },
        { title: 'Weeks 2–4: tighten', text: 'Daily checks in the first weeks, search-term clean-up and bid adjustments. First leads typically arrive in these weeks once ads are approved and tracking works.' },
        { title: 'Monthly review', text: 'A plain-language report on cost per enquiry and what we are changing next. Deeper optimisation continues over the first 60–90 days.' },
      ],
    },
    {
      eyebrow: 'Meta ads',
      heading: 'Running Meta Ads Alongside Google in KL',
      kind: 'cards',
      items: [
        { title: 'Google captures demand', text: 'People already searching for what you sell.' },
        { title: 'Meta builds demand', text: 'Facebook and Instagram ads reach people before they search, useful for F&B, events, beauty and new launches.', link: { to: '/services/social-media-marketing/', label: 'Social media marketing' } },
      ],
      after: <>Want both organic and paid? See <Link to="/locations/kuala-lumpur/">all our services in Kuala Lumpur</Link> or the <Link to="/locations/malaysia/">Malaysia office</Link>.</>,
    },
  ],
  contactBlock: <MalaysiaContactBlock heading="Talk to Our Malaysia Team About Google Ads in KL" />,
  related: [
    { name: 'Google Ads management', path: '/services/google-ads/' },
    { name: 'SEO Services in Kuala Lumpur', path: '/services/seo/kuala-lumpur/' },
    { name: 'Google Ads Services', path: '/services/google-ads/' },
    { name: 'Digital Marketing in Kuala Lumpur', path: '/locations/kuala-lumpur/' },
    { name: 'How to choose a digital marketing agency in Malaysia', path: '/blog/how-to-choose-digital-marketing-agency-malaysia/' },
    { name: 'Case Studies', path: '/case-studies/' },
    { name: 'Contact', path: '/contact/' },
  ],
  faqTitle: 'Frequently Asked Questions, Google Ads in Kuala Lumpur',
  quote: { region: 'malaysia', service: 'Google Ads management in Kuala Lumpur', text: 'We review your account, sector and competitors first, then send a written plan with a recommended ad budget and a flat monthly management fee. No percentage of spend, no lock-in.' },
  faqs: [
    { question: 'What is the minimum Google Ads budget in KL?', answer: 'It depends on your sector, area and cost per click. We recommend a starting ad budget, paid directly to Google, after a free review of your market, alongside a flat monthly management fee quoted for your scope. Very competitive sectors such as legal or aesthetics usually need more. Message us on WhatsApp at +60 12-453 7030 or send an enquiry for a custom quote.' },
    { question: 'Do you charge a percentage of ad spend or a flat fee?', answer: 'A flat monthly management fee (Starter, Growth or Scale), quoted for your campaign scope after a free review. It is not a percentage of your ad spend.' },
    { question: 'How fast do Google Ads bring leads?', answer: 'Typically within the first few weeks, once ads are approved and conversion tracking is working. Cost per lead usually improves over the first 60 to 90 days as we cut wasted searches and refine bids.' },
    { question: 'Do you own my ad account?', answer: 'No. The Google Ads account stays in your company’s name and you pay Google directly. We work in it with manager access, which you can remove at any time.' },
    { question: 'Can you track WhatsApp enquiries from ads?', answer: 'Yes. We set up WhatsApp click tracking as a conversion in GA4 and Google Ads, alongside call and form tracking, so you can see which campaigns produce enquiries.' },
    { question: 'Do you manage Meta (Facebook and Instagram) ads too?', answer: 'Yes. Many KL businesses run Meta ads to build demand and Google Ads to capture it. We can plan both together so budgets and tracking are consistent.' },
  ],
  cta: {
    title: 'Want Google Ads That Bring KL Enquiries?',
    subtitle: 'Call +60 12-453 7030 or message us for a free review of your account or campaign plan.',
    label: 'Get a Free Google Ads Review',
  },
  schema: [
    serviceSchema({
      name: 'Google Ads Management in Kuala Lumpur',
      serviceType: 'Google Ads management',
      description: DESCRIPTION,
      url: `${SITE_URL}${PATH}`,
      areaServed: { '@type': 'City', name: 'Kuala Lumpur' },
      provider: {
        '@type': 'ProfessionalService',
        name: MALAYSIA_OFFICE.name,
        url: `${SITE_URL}/locations/malaysia/`,
        telephone: MALAYSIA_OFFICE.phoneE164,
        address: MALAYSIA_POSTAL_ADDRESS,
      },
    }),
    professionalServiceSchema({
      name: MALAYSIA_OFFICE.name,
      url: `${SITE_URL}/locations/malaysia/`,
      telephone: MALAYSIA_OFFICE.phoneE164,
      address: MALAYSIA_POSTAL_ADDRESS,
      openingHoursSpecification: MALAYSIA_OPENING_HOURS_SPEC,
      areaServed: [
        { '@type': 'City', name: 'Kuala Lumpur' },
        { '@type': 'State', name: 'Selangor' },
      ],
    }),
  ],
}

export default function GoogleAds_KualaLumpur() {
  return <LocalServicePage content={content} />
}
