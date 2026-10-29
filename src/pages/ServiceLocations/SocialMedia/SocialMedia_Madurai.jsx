import { Link } from 'react-router-dom'
import LocalServicePage from '../../../templates/LocalServicePage.jsx'
import { serviceSchema } from '../../../utils/schema.js'
import { SITE_URL, GOOGLE_TRUST_LINE } from '../../../utils/constants.js'

const PATH = '/services/social-media-marketing/madurai/'
const DESCRIPTION =
  'Social media marketing company in Madurai: Facebook, Instagram and YouTube marketing, Meta ads, reels and content in Tamil and English. Rated 4.9★ on Google.'

const content = {
  path: PATH,
  ogImage: '/og/services-05socialmediamarketing.jpg',
  title: 'Social Media Marketing Agency in Madurai | Static Savvy Media',
  description: DESCRIPTION,
  eyebrow: 'SOCIAL MEDIA · MADURAI',
  h1: 'Social Media Marketing Company in Madurai, Facebook & Instagram That Bring Enquiries',
  intro: [
    'Most people in Madurai discover a new shop, clinic, restaurant or course on Instagram or Facebook before they ever visit a website. We plan, create and run your social media so those first impressions turn into WhatsApp messages, calls and walk-ins.',
    'Our team is based in Madurai, so we shoot locally, write in Tamil and English, and plan around the festivals and seasons that actually move sales here.',
  ],
  trust: GOOGLE_TRUST_LINE,
  crumbs: [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services/' },
    { name: 'Social Media Marketing', path: '/services/social-media-marketing/' },
    { name: 'Madurai', path: PATH },
  ],
  sections: [
    {
      eyebrow: 'Services',
      heading: 'Social Media Marketing Services in Madurai',
      kind: 'cards',
      items: [
        {
          title: 'Facebook Marketing',
          text: 'Page setup and clean-up, regular posts, community replies and Facebook ads aimed at people in Madurai and nearby towns. Facebook still reaches parents, business owners and older customers well, so it suits clinics, schools, real estate and B2B.',
        },
        {
          title: 'Instagram Marketing',
          text: 'Reels, carousels and stories that show your products, space and people. Instagram works especially well for textiles and sarees, jewellery, salons, cafes and restaurants, where visuals decide the visit.',
        },
        {
          title: 'YouTube Marketing',
          text: 'Channel setup, video ideas and promotions that help Madurai businesses show their work, explain services and appear in YouTube and Google video results.',
        },
        {
          title: 'Meta Ads (Facebook + Instagram)',
          text: 'Lead forms, WhatsApp click-to-chat ads and offer campaigns with tight location targeting. We set up the Meta Pixel and conversion tracking so you can see the cost of each enquiry, not just likes.',
        },
        {
          title: 'Content Creation in Tamil & English',
          text: 'Monthly content calendars, graphics, short videos and captions. We plan around Chithirai festival, Pongal, Deepavali, wedding season and school admissions, the moments when Madurai customers are ready to buy.',
          link: { to: '/services/product-photography-creative-design/', label: 'Photography & creative design' },
        },
        {
          title: 'WhatsApp-first Lead Handling',
          text: 'Most enquiries here end up on WhatsApp. We connect your ads and profile to WhatsApp Business, set quick replies and can automate first responses so no lead waits overnight.',
          link: { to: '/services/ai-business-automation/', label: 'WhatsApp & AI automation' },
        },
        {
          title: 'Reporting You Can Check',
          text: 'A monthly report in plain language: reach, engagement, messages, leads and ad spend, taken directly from Meta Business Suite. You keep ownership of your pages and ad account.',
        },
      ],
    },
    {
      eyebrow: 'Process',
      heading: 'How We Run Your Social Media',
      kind: 'numbered',
      items: [
        { title: 'Profile & competitor review', text: 'We review your Facebook and Instagram pages, your ad history if any, and what similar Madurai businesses are posting.' },
        { title: 'Goals and audience', text: 'We agree on one main goal per month, such as walk-ins, WhatsApp enquiries or online orders, and define who we are trying to reach.' },
        { title: 'Content calendar', text: 'You approve a monthly calendar before anything goes live, with posts, reels and any festival or offer campaigns.' },
        { title: 'Shoot, design and publish', text: 'We create the content, publish at the times your audience is active and reply to comments and messages within agreed hours.' },
        { title: 'Ads and optimisation', text: 'If you run paid campaigns, we test creatives and audiences, and move budget to what produces enquiries.' },
        { title: 'Monthly review', text: 'We go through the numbers with you and adjust the plan for the next month.' },
      ],
    },
    {
      eyebrow: 'Industries',
      heading: 'Social Media for Madurai Businesses',
      subtitle: 'What works on social depends on the business. A few examples of how we approach common Madurai sectors:',
      kind: 'cards',
      items: [
        { title: 'Textiles & Sarees', text: 'New-arrival reels, saree draping videos and festival collections, with ads targeting buyers in Madurai and across Tamil Nadu.', link: { to: '/industries/textiles-madurai/', label: 'Textile marketing' } },
        { title: 'Salons & Aesthetics', text: 'Before-and-after content (with consent), service menus and booking links on Instagram.', link: { to: '/blog/social-media-marketing-salons-aesthetics-madurai/', label: 'Salon social media guide' } },
        { title: 'Clinics & Hospitals', text: 'Doctor introductions, health awareness posts and appointment campaigns that stay within medical advertising rules.', link: { to: '/industries/healthcare-clinics/', label: 'Healthcare marketing' } },
        { title: 'Restaurants, Cafes & Hotels', text: 'Menu reels, location tags and offers for locals and the visitors who come for the Meenakshi Amman Temple.', link: { to: '/industries/hospitality-hotels/', label: 'Hospitality marketing' } },
        { title: 'Schools & Coaching Centres', text: 'Admission campaigns, results announcements and parent-focused Facebook content.', link: { to: '/industries/education-training/', label: 'Education marketing' } },
        { title: 'Real Estate & Builders', text: 'Site walkthrough videos and lead-form ads for specific localities and budgets.', link: { to: '/industries/real-estate-builders/', label: 'Real estate marketing' } },
      ],
    },
    {
      eyebrow: 'Included',
      heading: 'What Every Plan Includes',
      kind: 'checks',
      items: [
        'Facebook and Instagram profile optimisation',
        'Monthly content calendar for your approval',
        'Designed posts, carousels and short-form reels',
        'Captions in Tamil, English or both',
        'Comment and message monitoring',
        'Meta Pixel and conversion tracking set-up for ads',
        'Monthly performance report and review call',
        'Full ownership of your pages, content and ad account',
      ],
      after: (
        <p>
          <Link to="/contact/">Get a custom quote</Link> (or WhatsApp +91 99440 40345), or read our guide to{' '}
          <Link to="/blog/social-media-marketing-madurai-small-businesses/">social media marketing for Madurai small businesses</Link>.
        </p>
      ),
    },
  ],
  related: [
    { name: 'Social Media Marketing (all locations)', path: '/services/social-media-marketing/' },
    { name: 'SEO Company in Madurai', path: '/services/seo/madurai/' },
    { name: 'Local SEO Services in Madurai', path: '/services/local-seo/madurai/' },
    { name: 'Digital Marketing in Madurai', path: '/locations/madurai/' },
    { name: 'Contact', path: '/contact/' },
    { name: 'Google Ads', path: '/services/google-ads/' },
  ],
  faqTitle: 'Frequently Asked Questions, Social Media Marketing Madurai',
  quote: { service: 'social media marketing in Madurai' },
  faqs: [
    {
      question: 'Which is better for a Madurai business, Facebook or Instagram?',
      answer: 'It depends on who your customers are. Instagram tends to work better for visual, younger-audience businesses like fashion, salons and cafes. Facebook still reaches families, parents and business owners well. Most businesses do best with both, sharing content but running different ads.',
    },
    {
      question: 'Do you create content in Tamil?',
      answer: 'Yes. We write captions and on-screen text in Tamil, English or a mix, depending on how your customers speak and search.',
    },
    {
      question: 'Do you also run Facebook and Instagram ads?',
      answer: 'Yes. We manage Meta ads for lead generation, WhatsApp enquiries, store visits and online sales. The ad budget is paid directly to Meta from your account, separate from our management fee.',
    },
    {
      question: 'How soon will I see results from social media marketing?',
      answer: 'Paid ads can start bringing enquiries within the first few weeks once tracking is in place. Organic growth from regular posting builds more slowly, usually over several months. We do not promise follower numbers or viral posts.',
    },
    {
      question: 'Will I own my pages and content?',
      answer: 'Yes. Your Facebook page, Instagram account, ad account and the content we create for you remain yours.',
    },
    {
      question: 'Can you shoot photos and videos at our shop in Madurai?',
      answer: 'Yes. Our team is in Madurai, so on-site shoots for products, interiors, staff and events can be scheduled as part of your plan.',
    },
  ],
  cta: {
    title: 'Ready to Turn Followers Into Customers in Madurai?',
    subtitle: 'Message us on WhatsApp for a free review of your Facebook and Instagram pages.',
    label: 'Get a Free Social Media Review',
  },
  schema: [
    serviceSchema({
      name: 'Social Media Marketing in Madurai',
      serviceType: 'Social media marketing',
      description: DESCRIPTION,
      url: `${SITE_URL}${PATH}`,
      areaServed: 'Madurai, Tamil Nadu',
    }),
  ],
}

export default function SocialMedia_Madurai() {
  return <LocalServicePage content={content} />
}
