import LocalServicePage from '../../templates/LocalServicePage.jsx'
import MalaysiaContactBlock from '../../components/sections/MalaysiaContactBlock.jsx'
import { localBusinessSchema } from '../../utils/schema.js'
import {
  SITE_URL,
  MALAYSIA_OFFICE,
  MALAYSIA_POSTAL_ADDRESS,
  MALAYSIA_OPENING_HOURS_SPEC,
} from '../../utils/constants.js'

const PATH = '/locations/kuala-lumpur/'
const DESCRIPTION =
  'Digital marketing agency for Kuala Lumpur businesses: SEO, Google Ads, social media, websites and AI automation, from our Rawang, Selangor office.'

const content = {
  path: PATH,
  ogImage: '/og/locations-02malaysia.jpg',
  title: 'Digital Marketing Agency in Kuala Lumpur | Static Savvy Media',
  description: DESCRIPTION,
  eyebrow: 'KUALA LUMPUR · DIGITAL MARKETING',
  h1: 'Digital Marketing Agency in Kuala Lumpur, Helping KL Businesses Get Found and Chosen',
  intro: [
    'Customers in Kuala Lumpur compare options quickly: a Google search, a look at your reviews, a scroll through your Instagram, then a WhatsApp message. We help KL businesses show up and make a good impression at each of those steps.',
    'Static Savvy Media serves Kuala Lumpur and the wider Klang Valley from our Malaysia office in Rawang, Selangor, near AEON Mall Rawang. You get a Malaysian phone line, Malaysian working hours and campaigns planned for the Malaysian market.',
  ],
  phone: { href: MALAYSIA_OFFICE.phoneHref, display: MALAYSIA_OFFICE.phoneDisplay },
  crumbs: [
    { name: 'Home', path: '/' },
    { name: 'Locations', path: '/locations/' },
    { name: 'Kuala Lumpur', path: PATH },
  ],
  sections: [
    {
      eyebrow: 'Services',
      heading: 'Digital Marketing Services for Kuala Lumpur',
      kind: 'cards',
      items: [
        { title: 'SEO', text: 'Rank on google.com.my for the services and neighbourhoods you serve, in English and Bahasa Malaysia.', link: { to: '/services/seo/kuala-lumpur/', label: 'SEO in Kuala Lumpur' } },
        { title: 'Local SEO & Google Maps', text: 'Google Business Profile optimisation, reviews process and consistent business details so you appear in KL map results.', link: { to: '/services/local-seo/malaysia/', label: 'Local SEO Malaysia' } },
        { title: 'Google Ads', text: 'Search and Performance Max campaigns with tight geo-targeting around your outlets, and conversion tracking on calls, forms and WhatsApp.', link: { to: '/services/google-ads/', label: 'Google Ads' } },
        { title: 'Social Media Marketing', text: 'Instagram, Facebook, TikTok-ready short video and LinkedIn content, planned around Malaysian festive seasons such as Hari Raya, Chinese New Year and Deepavali.', link: { to: '/services/social-media-marketing/', label: 'Social media marketing' } },
        { title: 'Website Design & Development', text: 'Fast, mobile-first websites in English and Bahasa Malaysia, with clear WhatsApp and call actions and a privacy notice aligned with PDPA requirements.', link: { to: '/services/website-design-development/', label: 'Website development' } },
        { title: 'AI & WhatsApp Automation', text: 'Instant replies, lead qualification and booking flows on WhatsApp so enquiries are answered after hours.', link: { to: '/services/ai-business-automation/malaysia/', label: 'AI automation Malaysia' } },
      ],
    },
    {
      eyebrow: 'Why KL Is Different',
      heading: 'Marketing in Kuala Lumpur: What We Plan For',
      kind: 'cards',
      items: [
        { title: 'Multilingual audiences', text: 'The same customer may search in English, read reviews in Bahasa Malaysia and chat in Chinese or Tamil. We plan language per channel instead of translating everything.' },
        { title: 'Dense, hyper-local competition', text: 'Bangsar, Mont Kiara, Cheras, KLCC and Petaling Jaya can feel like separate markets. Ads and pages are targeted to the areas you actually serve.' },
        { title: 'Mobile and WhatsApp first', text: 'Most enquiries arrive on a phone. Every page and campaign is built to start a conversation in one tap.' },
        { title: 'Grant-aware planning', text: 'Some Malaysian SMEs can offset digital spend through government digitalisation programmes. We can prepare documentation for eligible services; eligibility is decided by the programme, not by us.', link: { to: '/blog/digital-marketing-malaysia-sme-grant-guide/', label: 'Malaysia SME grant guide' } },
      ],
    },
    {
      eyebrow: 'How We Start',
      heading: 'Getting Started With Our KL Team',
      kind: 'numbered',
      items: [
        { title: 'Free review', text: 'We review your website, Google Business Profile, social pages and the competitors you care about.' },
        { title: 'Plan', text: 'A short plan with priorities, deliverables and costs in MYR.' },
        { title: 'Launch', text: 'Tracking first, then the fixes, content and campaigns agreed in the plan.' },
        { title: 'Monthly review', text: 'A report from your own Google and Meta accounts, and a call to set the next month\'s priorities.' },
      ],
    },
  ],
  contactBlock: <MalaysiaContactBlock heading="Visit or Call Our Malaysia Office" />,
  related: [
    { name: 'SEO in Kuala Lumpur', path: '/services/seo/kuala-lumpur/' },
    { name: 'Malaysia Office (Rawang, Selangor)', path: '/locations/malaysia/' },
    { name: 'Malaysia Pricing', path: '/pricing/malaysia/' },
    { name: 'Malaysian SMEs', path: '/industries/smes-malaysia-grant-eligible/' },
    { name: 'All Locations', path: '/locations/' },
  ],
  faqTitle: 'Frequently Asked Questions, Digital Marketing Kuala Lumpur',
  faqs: [
    { question: 'Where is your office for Kuala Lumpur clients?', answer: `Our Malaysia office is at ${MALAYSIA_OFFICE.streetAddress}, ${MALAYSIA_OFFICE.postalCode} ${MALAYSIA_OFFICE.addressLocality}, ${MALAYSIA_OFFICE.addressRegion}, near AEON Mall Rawang. We serve clients across Kuala Lumpur and the Klang Valley.` },
    { question: 'What are your office hours in Malaysia?', answer: `${MALAYSIA_OFFICE.hoursDisplay}. ${MALAYSIA_OFFICE.hoursNote}.` },
    { question: 'How can I contact you?', answer: `Call ${MALAYSIA_OFFICE.phoneDisplay} or WhatsApp ${MALAYSIA_OFFICE.whatsappDisplay}.` },
    { question: 'Do you quote in Malaysian Ringgit?', answer: 'Yes. Malaysia plans are quoted in MYR. See our Malaysia pricing page for starting points.' },
    { question: 'Can you work with businesses outside KL?', answer: 'Yes. We work across Selangor and the rest of Malaysia, and our team also runs offices in Madurai and Thoothukudi, India.' },
  ],
  cta: {
    title: 'Grow Your Kuala Lumpur Business Online',
    subtitle: 'Book a free review with our Malaysia team.',
    label: 'Get a Free Review',
  },
  schema: [
    localBusinessSchema({
      '@type': 'ProfessionalService',
      name: MALAYSIA_OFFICE.name,
      description: DESCRIPTION,
      url: `${SITE_URL}/locations/malaysia/`,
      telephone: MALAYSIA_OFFICE.phoneE164,
      address: MALAYSIA_POSTAL_ADDRESS,
      openingHoursSpecification: MALAYSIA_OPENING_HOURS_SPEC,
      areaServed: [
        { '@type': 'City', name: 'Kuala Lumpur' },
        { '@type': 'State', name: 'Selangor' },
        { '@type': 'Country', name: 'Malaysia' },
      ],
    }),
  ],
}

export default function KualaLumpur() {
  return <LocalServicePage content={content} />
}
