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

const PATH = '/services/seo/kuala-lumpur/'
const DESCRIPTION =
  'SEO agency in Kuala Lumpur for SMEs: SEO services that rank you on google.com.my and Google Maps across KL, in English and BM. Free review, no lock-in. +60 12-453 7030.'

const content = {
  path: PATH,
  ogImage: '/og/services-seo-kuala-lumpur.jpg',
  image: { jpg: '/og/services-seo-kuala-lumpur.jpg', webp: '/og/services-seo-kuala-lumpur.webp', alt: 'SEO services in Kuala Lumpur for SMEs, Static Savvy Media Malaysia team' },
  title: 'SEO Agency Kuala Lumpur: SEO Services & Company in KL | Static Savvy Media',
  description: DESCRIPTION,
  eyebrow: 'SEO · KUALA LUMPUR',
  h1: 'SEO Agency in Kuala Lumpur: SEO Services for KL SMEs That Want Enquiries',
  intro: [
    'In short: Static Savvy Media is an SEO agency for Kuala Lumpur businesses. We provide SEO services in KL for small and mid-sized businesses. We fix technical issues, build English and Bahasa Malaysia pages around how KL customers search, align your Google Business Profile, and report on calls, WhatsApp chats and form enquiries every month, with no lock-in contract.',
    'Kuala Lumpur is one of the most competitive search markets in Southeast Asia. Your customers might search in English, Bahasa Malaysia or Chinese, on google.com.my, often from a phone and often with "near me" or a neighbourhood name attached. We build SEO that reflects how KL actually searches.',
    'We work with Kuala Lumpur and Klang Valley businesses from our Malaysia office in Rawang, Selangor, just north of the city, with calls on a Malaysian number during Malaysian business hours. Strategy is led by our founder, Deepan Kanz. Page reviewed and updated 30 October 2026.',
  ],
  phone: { href: MALAYSIA_OFFICE.phoneHref, display: MALAYSIA_OFFICE.phoneDisplay },
  crumbs: [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services/' },
    { name: 'SEO', path: '/services/seo/' },
    { name: 'Kuala Lumpur', path: PATH },
  ],
  sections: [
    {
      eyebrow: 'Services',
      heading: 'What Our SEO Services in KL Include',
      subtitle: 'Five strands of work, run together every month. No bought links, no automated "SEO packages" of thousands of directory submissions.',
      kind: 'cards',
      items: [
        { title: 'Technical SEO', text: 'Crawling, indexing, Core Web Vitals, redirects, structured data and mobile speed. Many KL sites are built on page builders or regional templates that load slowly on mobile data, so speed is often the first fix.' },
        { title: 'On-Page SEO', text: 'Titles, meta descriptions, headings, internal links and FAQ schema on the pages that should bring enquiries: your service pages, product categories and location pages.' },
        { title: 'Content That Answers Real Questions', text: 'Service pages, FAQs and articles built from the questions your KL customers ask, written for people first and structured so search engines and AI assistants can cite them.' },
        { title: 'Local SEO & Google Business Profile', text: 'Map results matter in a dense city. We align your website with your Google Business Profile, categories, reviews process and consistent business details across Malaysian directories.', link: { to: '/services/local-seo/malaysia/', label: 'Local SEO Malaysia' } },
        { title: 'Link Earning (Not Buying)', text: 'Mentions from Malaysian industry associations, suppliers, local media and genuinely relevant directories. We do not buy links or use private blog networks; they put your site at risk.' },
        { title: 'Reporting in Plain Language', text: 'Monthly reports built from your own Google Search Console and GA4: clicks, impressions, positions, and enquiries where tracking is set up. You keep all access.' },
      ],
    },
    {
      eyebrow: 'Neighbourhoods',
      heading: 'SEO for KL Neighbourhoods and the Klang Valley',
      subtitle: 'People in KL search by area. A clinic in Bangsar and a clinic in Cheras compete with different businesses, so we plan pages for the areas you genuinely serve, not thin copies with the suburb name swapped.',
      kind: 'cards',
      items: [
        { title: 'KLCC & Bukit Bintang', text: 'Dense, high-competition searches for professional services, hospitality, retail and F&B, often from visitors on mobile. Speed and clear "near me" signals matter most here.' },
        { title: 'Bangsar & Mont Kiara', text: 'Affluent residential and expat audiences who often search in English and compare reviews carefully. Strong service pages and review-rich profiles win.' },
        { title: 'Cheras, Setapak & Kepong', text: 'Large residential catchments with many neighbourhood businesses. Local pack visibility and Bahasa Malaysia content often drive the most calls.' },
        { title: 'Petaling Jaya & Selangor edge', text: 'Many KL buyers cross into PJ, Subang Jaya and Shah Alam. If you serve both, we plan the split carefully so pages do not compete with each other.', link: { to: '/blog/seo-services-selangor-shah-alam-petaling-jaya/', label: 'SEO in Selangor' } },
      ],
    },
    {
      eyebrow: 'Languages',
      heading: 'English, Bahasa Malaysia and Chinese-Language Search in KL',
      kind: 'cards',
      items: [
        { title: 'English', text: 'Most B2B, professional and expat-facing searches in KL happen in English. We research English terms on google.com.my, not global data.' },
        { title: 'Bahasa Malaysia', text: 'We research and write Bahasa Malaysia pages separately, because the search terms and intent are often different from a straight translation, and set language tags so Google shows the right version.' },
        { title: 'Chinese', text: 'Where your customers search in Chinese, we can plan Chinese-language pages with a native writer and set hreflang correctly. We will tell you honestly if the demand is not there.' },
      ],
    },
    {
      eyebrow: 'Process',
      heading: 'Our 90-Day SEO Plan for KL Businesses',
      kind: 'numbered',
      items: [
        { title: 'Days 1–15: Audit and baseline', text: 'Technical crawl, content review, Search Console and GA4 access, enquiry tracking set up, and a record of where you rank today on google.com.my for your priority searches.' },
        { title: 'Days 15–30: Search and competitor map', text: 'Who ranks in KL for your services, what their pages cover, which neighbourhoods and languages matter, and where the gaps are.' },
        { title: 'Days 30–60: Fix the foundations', text: 'Technical issues, titles and descriptions, headings, internal links, schema and Google Business Profile alignment.' },
        { title: 'Days 60–90: Build missing pages', text: 'Service, area and FAQ pages in the languages your customers use, then the first link-earning outreach.' },
        { title: 'Day 90: Review and next quarter', text: 'We review Search Console and enquiry data with you and agree the next set of priorities. No lock-in: you decide whether to continue.' },
      ],
    },
    {
      eyebrow: 'Industries',
      heading: 'SEO for Kuala Lumpur Industries',
      subtitle: 'Typical KL sectors we plan for. These describe how we approach each sector; they are not client case studies.',
      kind: 'cards',
      items: [
        { title: 'Professional Services', text: 'Law firms, accountants, consultants and agencies around KL Sentral, Bangsar South and the Golden Triangle competing on high-value searches.' },
        { title: 'Clinics & Aesthetics', text: 'Dental, medical and aesthetic clinics that need treatment pages written carefully within Malaysian medical advertising rules.' },
        { title: 'Property & Interior Design', text: 'Developers, agents and renovation firms targeting specific KL and Selangor neighbourhoods.' },
        { title: 'F&B and Hospitality', text: 'Restaurants, cafes and hotels relying on "near me" searches from both residents and tourists.' },
        { title: 'Education & Training', text: 'Tuition centres, colleges and corporate trainers with course-specific search demand.' },
        { title: 'SMEs and E-commerce', text: 'Malaysian SMEs selling online that need product and category SEO.', link: { to: '/industries/smes-malaysia-grant-eligible/', label: 'Malaysian SMEs' } },
      ],
      after: <>See our <Link to="/case-studies/">case studies</Link> for the format of the results we report.</>,
    },
    {
      eyebrow: 'Cost',
      heading: 'How Much Do SEO Services Cost in Kuala Lumpur?',
      kind: 'checks',
      items: [
        'Three monthly plans: Google Business Profile management, GBP plus website SEO, and GBP + SEO + AEO + GEO for AI search.',
        'Every plan is quoted after a free review: the fee depends on keywords, locations, languages and content volume. Retainers are monthly with no minimum contract term.',
        'One-off audits are available if you want a diagnosis before committing to monthly work.',
      ],
      after: <>For a custom quote, WhatsApp <a href="https://wa.me/60124537030">+60 12-453 7030</a> or <Link to="/contact/">send an enquiry</Link>. For what agencies typically charge, read <Link to="/blog/seo-cost-malaysia-price-guide/">how much SEO costs in Malaysia</Link>.</>,
    },
    {
      eyebrow: 'Choosing an agency',
      heading: 'How to Choose an SEO Company in Kuala Lumpur',
      subtitle: 'Six checks we suggest before you sign with any KL SEO agency, including us.',
      kind: 'checks',
      items: [
        'Ask to see real Search Console or GA4 screenshots from a past client, not just a ranking report.',
        'Check that they research google.com.my terms in English and Bahasa Malaysia, not global keyword data.',
        'Ask how they earn links. Any offer of hundreds of links a month usually means bought links or private blog networks.',
        'Confirm you keep ownership of your website, Google Business Profile, Search Console and analytics accounts.',
        'Prefer monthly contracts. A long lock-in protects the agency, not you.',
        'Make sure reports track calls, WhatsApp chats and form enquiries, not only traffic.',
      ],
      after: <>For the full checklist, read <Link to="/blog/how-to-choose-digital-marketing-agency-malaysia/">how to choose a digital marketing agency in Malaysia</Link>.</>,
    },
    {
      eyebrow: 'AI Search',
      heading: 'SEO and AI Answers (GEO & AEO) in Malaysia',
      kind: 'cards',
      items: [
        { title: 'Answer-first pages', text: 'Short, direct answers near the top of key pages, so Google AI Overviews, ChatGPT and Gemini can quote you accurately.' },
        { title: 'Consistent entity details', text: 'The same business name, description, address and phone across your site, Google Business Profile and Malaysian directories, so AI tools describe you correctly.' },
        { title: 'Structured data', text: 'Service, LocalBusiness, FAQ and breadcrumb schema that matches what is visible on the page.', link: { to: '/services/geo-aeo-ai-search/', label: 'GEO & AEO services' } },
      ],
    },
    {
      eyebrow: 'Why us',
      heading: 'Why a Madurai-and-Rawang Agency for SEO in KL?',
      kind: 'checks',
      items: [
        'A Malaysia office in Rawang, Selangor, with calls on +60 12-453 7030 during Malaysian business hours (Mon–Fri, 9 AM – 6 PM MYT).',
        'A larger SEO and content team at our Madurai headquarters, so work keeps moving across both time zones.',
        'Rated 4.9★ from 106 Google reviews on our Madurai office profile.',
        'Clear written quotes, monthly contracts and full account ownership for you.',
      ],
      after: <>Need ads as well? See our <Link to="/services/google-ads/kuala-lumpur/">Google Ads agency in Kuala Lumpur</Link> page, or our <Link to="/locations/kuala-lumpur/">digital marketing services in Kuala Lumpur</Link>.</>,
    },
  ],
  contactBlock: <MalaysiaContactBlock heading="Talk to Our Malaysia Team About SEO in KL" />,
  related: [
    { name: 'Google Ads Agency Kuala Lumpur', path: '/services/google-ads/kuala-lumpur/' },
    { name: 'Digital Marketing in Kuala Lumpur', path: '/locations/kuala-lumpur/' },
    { name: 'SEO in Malaysia', path: '/services/seo/malaysia/' },
    { name: 'Local SEO Malaysia', path: '/services/local-seo/malaysia/' },
    { name: 'Google Business Profile optimisation in Malaysia', path: '/blog/google-business-profile-optimisation-malaysia/' },
    { name: 'Malaysia Office', path: '/locations/malaysia/' },
  ],
  faqTitle: 'Frequently Asked Questions, SEO Services in Kuala Lumpur',
  quote: { region: 'malaysia', service: 'SEO in Kuala Lumpur' },
  faqs: [
    { question: 'How much do SEO services cost in KL?', answer: 'It depends on keywords, locations, languages and content volume. We offer three monthly plans (GBP, GBP + website SEO, and GBP + SEO + AEO + GEO) with no minimum contract term, each quoted after a free review. Message us on WhatsApp at +60 12-453 7030 or send an enquiry for a custom quote.' },
    { question: 'How long does SEO take in Kuala Lumpur?', answer: 'Usually 3 to 6 months for local and neighbourhood terms, and longer for competitive city-wide terms. Technical and Google Business Profile fixes can show movement within weeks. We do not guarantee rankings.' },
    { question: 'Do you do Bahasa Malaysia SEO?', answer: 'Yes. We research and optimise English and Bahasa Malaysia content separately, because the search terms and intent are often different. Chinese-language content can be planned where your audience needs it.' },
    { question: 'Do you have an office in Malaysia?', answer: `Yes. Our Malaysia office is at ${MALAYSIA_OFFICE.streetAddress}, ${MALAYSIA_OFFICE.postalCode} ${MALAYSIA_OFFICE.addressLocality}, ${MALAYSIA_OFFICE.addressRegion} (${MALAYSIA_OFFICE.landmark}), north of Kuala Lumpur. Meetings can be in person or online.` },
    { question: 'Do you buy backlinks?', answer: 'No. Links are earned through Malaysian directories, associations, suppliers, PR and useful content. Bought links and private blog networks can lead to Google penalties.' },
    { question: 'Is SEO in Malaysia different from SEO in India?', answer: 'The principles are the same, but the market is not. Malaysian searches use google.com.my, mix several languages, and local directories and media differ. That is why our KL pages, keywords and outreach are planned separately.' },
    { question: 'What does an SEO agency in KL do each month?', answer: 'Each month we fix technical issues, improve or add service and area pages, publish content that answers customer questions, keep your Google Business Profile active, earn relevant Malaysian links, and send a plain-language report from your Search Console and GA4.' },
    { question: 'Which is the best SEO company in Kuala Lumpur?', answer: 'The best SEO company for you is the one that shows real Search Console results, researches google.com.my in your customers\' languages, earns links rather than buying them, lets you keep ownership of every account, and works month to month. Use those checks to compare any KL agency, including us.' },
    { question: 'Do you offer SEO consulting in Kuala Lumpur?', answer: 'Yes. If you have an in-house team, we can run a one-off SEO audit and strategy session, then advise your team monthly instead of doing all the work ourselves.' },
    { question: 'Can you help my business show up for "SEO near me" style searches in KL?', answer: 'Yes. "Near me" searches are mostly decided by Google Maps, so we optimise your Google Business Profile, reviews routine and local citations alongside area pages on your website.' },
    { question: 'How do I contact your Malaysia team?', answer: `Call ${MALAYSIA_OFFICE.phoneDisplay} (${MALAYSIA_OFFICE.hoursDisplay}) or WhatsApp ${MALAYSIA_OFFICE.whatsappDisplay}.` },
  ],
  cta: {
    title: 'Want More Customers From Google in Kuala Lumpur?',
    subtitle: 'Call +60 12-453 7030 or message us for a free SEO review of your website and your top KL competitors.',
    label: 'Get a Free SEO Review',
  },
  schema: [
    serviceSchema({
      name: 'SEO Services in Kuala Lumpur',
      serviceType: 'Search engine optimization',
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

export default function SEO_KualaLumpur() {
  return <LocalServicePage content={content} />
}

