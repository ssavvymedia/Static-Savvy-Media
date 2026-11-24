/**
 * Home page content shared by the React page (src/pages/Home/Home.jsx) and the build-time raw HTML
 * (src/data/prerenderBodies.js). Plain data only (no JSX): loaded by Node at build time.
 *
 * Positioning (from Search Console, 1–28 Oct 2026): every home-page impression came from India and
 * almost all were Madurai or brand queries (the Madurai Google Business Profile links here and ranks
 * in the top 5 for "digital marketing agency in madurai", "seo company in madurai" etc.). So the
 * home page stays "Digital Marketing Agency in Madurai" for the HQ intent and adds the other markets,
 * while each city/country keeps its own landing page under /locations/.
 */
import { HOME_FAQS } from './homeFaqs.js'
import { ORG_SAME_AS, GBP_MAPS } from '../sameAs.js'
import { founderId, founderPerson } from '../founder.js'

const HOST = 'https://www.staticsavvymedia.com'
const PHONE = '+91 99440 40345'
export const ORG_ID = `${HOST}/#organization`
export const MADURAI_ID = `${HOST}/locations/madurai/#localbusiness`

/* v2 hero (approved 10 Nov 2026). The H1 keeps the Madurai head term first: the homepage owns
 * "digital marketing agency in Madurai" (gap-audit P0 #2); /locations/madurai/ is the HQ hub and
 * /services/seo/madurai/ owns "SEO company in Madurai". */
// Hero copy approved by the owner on 19 Nov 2026 (exact wording).
export const HOME_EYEBROW = 'Digital Marketing Agency in Madurai · SEO · AI Search'
export const HOME_H1 = {
  lead: 'We Turn Google & AI Search Into',
  grad: 'Daily Enquiries',
  tail: 'for Clinics & Local Businesses.',
}
export const HOME_H1_TEXT = `${HOME_H1.lead} ${HOME_H1.grad} ${HOME_H1.tail}`
export const HOME_SUB = 'Get more calls and WhatsApp leads from Google Maps and AI Search across Madurai and Malaysia.'
// Proof strip under the hero. 4.9 / 106 = Madurai GBP (googleReviews.js GBP_REVIEW_SUMMARY).
export const HOME_PROOF_STRIP = ['4.9★ from 106 Google reviews', 'Madurai', 'Thoothukudi', 'Malaysia']

export const HOME_INTRO =
  'Static Savvy Media is a Madurai-headquartered digital marketing agency, founded in 2021, that helps businesses get found on Google, Google Maps and AI answer engines like ChatGPT and Perplexity. We run SEO, Local SEO, Google Ads, social media and websites for clients across Tamil Nadu, Malaysia, Singapore and Dubai, with offices in Madurai and Thoothukudi.'

export const HOME_PROOF = [
  { value: '4.9★', label: 'from 106 Google reviews' },
  { value: '2021', label: 'Founded in Madurai' },
  { value: '2 offices', label: 'Madurai (HQ) · Thoothukudi' },
  { value: '4 markets', label: 'India · Malaysia · Singapore · UAE' },
]

/* "Where we work": one card per country, linking every location page. */
export const HOME_MARKETS = [
  {
    key: 'india',
    flag: '🇮🇳',
    country: 'India',
    path: '/locations/tamil-nadu/',
    pathLabel: 'Digital marketing across Tamil Nadu',
    summary: 'Headquarters in Madurai and an office in Thoothukudi. Local SEO, Google Maps, Ads and websites for Tamil Nadu businesses, quoted in INR.',
    contact: 'WhatsApp us',
    cities: [
      { name: 'Madurai (HQ)', path: '/locations/madurai/' },
      { name: 'Chennai', path: '/locations/chennai/' },
      { name: 'Coimbatore', path: '/locations/coimbatore/' },
      { name: 'Trichy', path: '/locations/trichy/' },
      { name: 'Salem', path: '/locations/salem/' },
      { name: 'Tirunelveli', path: '/locations/tirunelveli/' },
      { name: 'Tiruppur', path: '/locations/tiruppur/' },
      { name: 'Thoothukudi', path: '/locations/thoothukudi/' },
      { name: 'Dindigul', path: '/locations/dindigul/' },
      { name: 'Theni', path: '/locations/theni/' },
      { name: 'Sivakasi', path: '/locations/sivakasi/' },
      { name: 'Virudhunagar', path: '/locations/virudhunagar/' },
      { name: 'Karaikudi', path: '/locations/karaikudi/' },
      { name: 'Ramanathapuram', path: '/locations/ramanathapuram/' },
      { name: 'Erode', path: '/locations/erode/' },
    ],
  },
  {
    key: 'malaysia',
    flag: '🇲🇾',
    country: 'Malaysia',
    path: '/locations/malaysia/',
    pathLabel: 'Digital marketing in Malaysia',
    summary: 'Served from our Madurai HQ. SEO for google.com.my, Google Business Profile, Ads and grant-aware plans for Malaysian SMEs, quoted in MYR.',
    contact: 'WhatsApp us',
    cities: [
      { name: 'Kuala Lumpur', path: '/locations/kuala-lumpur/' },
      { name: 'Selangor', path: '/locations/selangor/' },
      { name: 'Shah Alam', path: '/locations/shah-alam/' },
      { name: 'Petaling Jaya', path: '/locations/petaling-jaya/' },
    ],
  },
  {
    key: 'singapore',
    flag: '🇸🇬',
    country: 'Singapore',
    path: '/locations/singapore/',
    pathLabel: 'Digital marketing in Singapore',
    summary: 'Remote SEO, Google Business Profile, Ads and AI-search (GEO/AEO) programmes for Singapore SMEs, quoted in SGD.',
    contact: 'WhatsApp us',
    cities: [{ name: 'Singapore', path: '/locations/singapore/' }],
  },
  {
    key: 'uae',
    flag: '🇦🇪',
    country: 'United Arab Emirates',
    path: '/locations/dubai/',
    pathLabel: 'Digital marketing in Dubai',
    summary: 'Remote SEO, Google Maps, Ads and websites for Dubai businesses, quoted in AED.',
    contact: 'WhatsApp us',
    cities: [{ name: 'Dubai', path: '/locations/dubai/' }],
  },
]

/* Madurai HQ services (keeps the home page's Madurai relevance and passes it to the Madurai pages). */
export const HOME_MADURAI_LINKS = [
  { name: 'Digital marketing agency in Madurai', path: '/locations/madurai/' },
  { name: 'SEO company in Madurai', path: '/services/seo/madurai/' },
  { name: 'Local SEO in Madurai', path: '/services/local-seo/madurai/' },
  { name: 'Advertising agency in Madurai', path: '/services/advertising-agency/madurai/' },
  { name: 'Social media marketing in Madurai', path: '/services/social-media-marketing/madurai/' },
  { name: 'Website design in Madurai', path: '/services/website-design-development/madurai/' },
]

export const MADURAI_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: '2nd Floor, 4/3, Srinivasa Perumal Koil St, Kamarajar Salai',
  addressLocality: 'Madurai',
  addressRegion: 'Tamil Nadu',
  postalCode: '625009',
  addressCountry: 'IN',
}

const city = (name, country) => ({ '@type': 'City', name, containedInPlace: { '@type': 'Country', name: country } })

export const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Static Savvy Media',
  url: `${HOST}/`,
  logo: `${HOST}/og/heroimage.jpg`,
  telephone: PHONE,
  email: 'info@staticsavvymedia.com',
  foundingDate: '2021-10-01',
  founder: { '@id': founderId(HOST) },
  address: MADURAI_ADDRESS,
  areaServed: [
    { '@type': 'Country', name: 'India' },
    { '@type': 'Country', name: 'Malaysia' },
    { '@type': 'Country', name: 'Singapore' },
    { '@type': 'Country', name: 'United Arab Emirates' },
    city('Madurai', 'India'),
    city('Chennai', 'India'),
    city('Coimbatore', 'India'),
    city('Tiruchirappalli', 'India'),
    city('Salem', 'India'),
    city('Tirunelveli', 'India'),
    city('Tiruppur', 'India'),
    city('Thoothukudi', 'India'),
    city('Dindigul', 'India'),
    city('Theni', 'India'),
    city('Sivakasi', 'India'),
    city('Virudhunagar', 'India'),
    city('Karaikudi', 'India'),
    city('Ramanathapuram', 'India'),
    city('Erode', 'India'),
    city('Kuala Lumpur', 'Malaysia'),
    { '@type': 'State', name: 'Selangor', containedInPlace: { '@type': 'Country', name: 'Malaysia' } },
    city('Dubai', 'United Arab Emirates'),
  ],
  sameAs: ORG_SAME_AS,
}

export const maduraiBusiness = {
  '@type': 'ProfessionalService',
  '@id': MADURAI_ID,
  name: 'Static Savvy Media',
  url: `${HOST}/`,
  telephone: PHONE,
  address: MADURAI_ADDRESS,
  hasMap: GBP_MAPS.madurai,
  areaServed: [
    { '@type': 'City', name: 'Madurai' },
    { '@type': 'State', name: 'Tamil Nadu' },
  ],
  parentOrganization: { '@id': ORG_ID },
  knowsAbout: ['Search engine optimization', 'Local SEO', 'Google Ads', 'Social media marketing', 'Website design', 'Generative engine optimization'],
}

const faqPage = (faqs) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
})

export const homeSchemaGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    organization,
    founderPerson(HOST),
    maduraiBusiness,
    { '@type': 'WebSite', name: 'Static Savvy Media', url: `${HOST}/`, publisher: { '@id': ORG_ID } },
    faqPage(HOME_FAQS),
  ],
}
