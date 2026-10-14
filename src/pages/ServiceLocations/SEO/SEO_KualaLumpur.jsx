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
  'SEO services for Kuala Lumpur businesses: technical SEO, English and Bahasa Malaysia content, and local search for KL and the Klang Valley. Call +60 12-453 7030.'

const content = {
  path: PATH,
  ogImage: '/og/locations-02malaysia.jpg',
  title: 'SEO Company in Kuala Lumpur | SEO Services KL | Static Savvy Media',
  description: DESCRIPTION,
  eyebrow: 'SEO · KUALA LUMPUR',
  h1: 'SEO Company in Kuala Lumpur, Rank Higher on Google Malaysia',
  intro: [
    'Kuala Lumpur is one of the most competitive search markets in Southeast Asia. Your customers might search in English, Bahasa Malaysia or Chinese, on google.com.my, often from a phone and often with "near me" or a neighbourhood name attached. We build SEO that reflects how KL actually searches.',
    'We work with Kuala Lumpur and Klang Valley businesses from our Malaysia office in Rawang, Selangor, just north of the city, with calls on a Malaysian number during Malaysian business hours.',
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
      heading: 'What Our Kuala Lumpur SEO Services Include',
      kind: 'cards',
      items: [
        { title: 'Technical SEO', text: 'Crawling, indexing, Core Web Vitals, redirects, structured data and mobile speed. Many KL sites are built on page builders or regional templates that load slowly on mobile data, so speed is often the first fix.' },
        { title: 'Multilingual Keyword Research', text: 'We research English and Bahasa Malaysia search terms separately, plus Chinese where it matters for your customers, and set hreflang and language tags correctly so Google shows the right version.' },
        { title: 'Neighbourhood & Service Pages', text: 'Searches in KL are often tied to an area: Bangsar, Mont Kiara, Cheras, KLCC, Bukit Bintang, Setapak or nearby Petaling Jaya. We create useful pages for the areas you genuinely serve, not thin copies.' },
        { title: 'Content That Answers Real Questions', text: 'Service pages, FAQs and articles built from the questions your KL customers ask, written for people first and structured so search engines and AI assistants can cite them.' },
        { title: 'Local SEO & Google Business Profile', text: 'Map results matter in a dense city. We align your website with your Google Business Profile, categories, reviews process and consistent business details across Malaysian directories.', link: { to: '/services/local-seo/malaysia/', label: 'Local SEO Malaysia' } },
        { title: 'Reporting in Plain Language', text: 'Monthly reports built from your own Google Search Console and GA4: clicks, impressions, positions, and enquiries where tracking is set up. You keep all access.' },
      ],
    },
    {
      eyebrow: 'Process',
      heading: 'Our SEO Process for KL Businesses',
      kind: 'numbered',
      items: [
        { title: 'Audit and baseline', text: 'Technical crawl, content review, and a record of where you rank today on google.com.my for your priority searches.' },
        { title: 'Search and competitor map', text: 'We look at who ranks in KL for your services, what their pages cover, and where the gaps are.' },
        { title: 'Fix the foundations', text: 'Technical issues, titles and descriptions, headings, internal links and schema.' },
        { title: 'Build missing pages', text: 'Service, area and FAQ pages in the languages your customers use.' },
        { title: 'Authority', text: 'Earning mentions from relevant Malaysian industry sites, associations and media. No bulk link buying.' },
        { title: 'Measure and refine', text: 'Monthly review of Search Console and analytics data, then the next set of priorities.' },
      ],
    },
    {
      eyebrow: 'Industries',
      heading: 'SEO for Kuala Lumpur Industries',
      kind: 'cards',
      items: [
        { title: 'Professional Services', text: 'Law firms, accountants, consultants and agencies around KL Sentral, Bangsar South and the Golden Triangle competing on high-value searches.' },
        { title: 'Clinics & Aesthetics', text: 'Dental, medical and aesthetic clinics that need treatment pages written carefully within Malaysian advertising guidelines.' },
        { title: 'Property & Interior Design', text: 'Developers, agents and renovation firms targeting specific KL and Selangor neighbourhoods.' },
        { title: 'F&B and Hospitality', text: 'Restaurants, cafes and hotels relying on "near me" searches from both residents and tourists.' },
        { title: 'Education & Training', text: 'Tuition centres, colleges and corporate trainers with course-specific search demand.' },
        { title: 'SMEs and E-commerce', text: 'Malaysian SMEs selling online that need product and category SEO.', link: { to: '/industries/smes-malaysia-grant-eligible/', label: 'Malaysian SMEs' } },
      ],
    },
  ],
  contactBlock: <MalaysiaContactBlock heading="Talk to Our Malaysia Team About SEO in KL" />,
  related: [
    { name: 'Digital Marketing in Kuala Lumpur', path: '/locations/kuala-lumpur/' },
    { name: 'SEO in Malaysia', path: '/services/seo/malaysia/' },
    { name: 'Local SEO Malaysia', path: '/services/local-seo/malaysia/' },
    { name: 'AI Business Automation Malaysia', path: '/services/ai-business-automation/malaysia/' },
    { name: 'SEO Pricing Malaysia', path: '/pricing/malaysia/seo/' },
    { name: 'Malaysia Office', path: '/locations/malaysia/' },
  ],
  faqTitle: 'Frequently Asked Questions, SEO Kuala Lumpur',
  faqs: [
    { question: 'Are you based in Kuala Lumpur?', answer: 'Our Malaysia office is in Rawang, Selangor, near AEON Mall Rawang, north of Kuala Lumpur. We work with clients across KL and the Klang Valley, and meetings can be in person or online.' },
    { question: 'Do you do SEO in Bahasa Malaysia?', answer: 'Yes. We research and optimise English and Bahasa Malaysia content separately, because the search terms and intent are often different. Chinese-language content can be planned where your audience needs it.' },
    { question: 'How long does SEO take in a competitive market like KL?', answer: 'It depends on competition, your site\'s current condition and how much content needs to be created. Technical and on-page fixes can show movement within weeks; competitive terms usually take several months of consistent work. We do not guarantee rankings.' },
    { question: 'Is SEO in Malaysia different from SEO in India?', answer: 'The principles are the same, but the market is not. Malaysian searches use google.com.my, mix several languages, and local directories and media differ. That is why our KL pages, keywords and outreach are planned separately.' },
    { question: 'How do I contact your Malaysia team?', answer: `Call ${MALAYSIA_OFFICE.phoneDisplay} (${MALAYSIA_OFFICE.hoursDisplay}) or WhatsApp ${MALAYSIA_OFFICE.whatsappDisplay}.` },
  ],
  cta: {
    title: 'Want More Customers From Google in Kuala Lumpur?',
    subtitle: 'Message us for a free SEO review of your website and your top KL competitors.',
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

