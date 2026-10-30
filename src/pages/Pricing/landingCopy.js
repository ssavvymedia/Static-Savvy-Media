/**
 * Per-country copy for the unlisted /p/ pricing landing pages. Loaded only with CountryPricing.jsx
 * (lazy chunk). Every claim restates something already on the site (city pages, service pages,
 * Terms); no invented numbers.
 */
const IN_PHONE = { display: '+91 99440 40345', tel: '+919944040345' }
const MY_PHONE = { display: '+60 12-453 7030', tel: '+60124537030' }

export const LANDING_COPY = {
  india: {
    phone: IN_PHONE,
    eyebrow: 'Your proposal · India pricing in INR',
    headline: 'More calls, WhatsApp chats and walk-ins from Google, Maps and social, across India',
    promise: 'We run your Google Business Profile, SEO, website, social media and lead campaigns from our Madurai head office, and we report from your own accounts every month so you can see what is working.',
    serve: 'Madurai head office and a Thoothukudi office · Tamil and English content · meetings in person or on video',
    pains: [
      { title: 'Competitors take the map pack', text: 'Most "near me" searches are decided on Google Maps. An incomplete or inactive Business Profile hands those calls to the business down the road.' },
      { title: 'Agencies report traffic, not enquiries', text: 'Impressions and likes do not pay salaries. You need calls, forms and WhatsApp chats tracked back to the channel that produced them.' },
      { title: 'Lock-ins and lost logins', text: 'Many businesses find their profile, website or ad account is in the agency’s name. When they leave, they start again from zero.' },
    ],
  },
  malaysia: {
    phone: MY_PHONE,
    eyebrow: 'Your proposal · Malaysia pricing in RM',
    headline: 'Get found on google.com.my and Google Maps, and turn searches into WhatsApp enquiries',
    promise: 'Our Malaysia team in Rawang, Selangor runs your Google Business Profile, SEO, website, social media and lead campaigns in English and Bahasa Malaysia, with monthly reports from your own accounts.',
    serve: 'Office in Rawang, Selangor (near AEON Mall Rawang) · Mon–Fri, 9 AM–6 PM MYT · meetings in KL by appointment',
    pains: [
      { title: 'The map pack decides "near me"', text: 'Customers in KL and the Klang Valley pick from the top Google Maps results. Weak categories, photos and reviews push you out of it.' },
      { title: 'English-only content misses buyers', text: 'Many customers search and compare in Bahasa Malaysia. Content planned per channel and audience reaches more of them than a straight translation.' },
      { title: 'Ad budgets without tracking', text: 'Without call, form and WhatsApp tracking you cannot tell which campaign brought the enquiry, so budget keeps going to the wrong place.' },
    ],
  },
  dubai: {
    phone: IN_PHONE,
    eyebrow: 'Your proposal · Dubai pricing in AED',
    headline: 'Win more Dubai enquiries on Google Maps, Search and social, without a Dubai-sized retainer',
    promise: 'A specialist remote team runs your Google Business Profile, SEO, website, social media and lead campaigns from India, which is only 1.5 hours ahead of Dubai, with a clear written quote and honest monthly reports.',
    serve: 'Fully remote from our India head office · working day overlaps Dubai · no Dubai office claimed',
    pains: [
      { title: 'One of the toughest map markets', text: 'Restaurants, clinics, brokers and service firms in Business Bay, Marina, JLT and Deira all fight for the same Google Maps results.' },
      { title: 'Large retainers for online work', text: 'Many Dubai SMEs pay big agency fees for work that is mostly done online. You should pay for the work, not the office address.' },
      { title: 'You cannot see what you pay for', text: 'Reports built in an agency’s own tool are hard to check. Reporting from your own Google and ad accounts shows the real numbers.' },
    ],
  },
  singapore: {
    phone: IN_PHONE,
    eyebrow: 'Your proposal · Singapore pricing in SGD',
    headline: 'Digital marketing on Singapore time, without Singapore agency overheads',
    promise: 'Our team in Rawang, Malaysia (same time zone as Singapore) and Madurai, India runs your Google Business Profile, SEO, website, social media and lead campaigns, with reports from your own accounts.',
    serve: 'Remote from Malaysia and India · same clock as Singapore (UTC+8) · no Singapore office claimed',
    pains: [
      { title: 'Fees set for a high-cost city', text: 'Singapore SMEs face agency fees set for a high-cost city, yet most of the work that drives enquiries does not need to be done in Singapore.' },
      { title: 'Quiet profiles lose to busy ones', text: 'Diners, parents and homeowners choose from Google Maps ratings and photos. An outdated profile loses the enquiry before your website is even seen.' },
      { title: 'AI assistants describe you wrongly', text: 'Buyers now ask ChatGPT and Google AI Overviews for recommendations. If your pages are not answer-first, you are left out of the answer.' },
    ],
  },
}

/** What we run (the solution), shared by every country. */
export const SOLUTION = [
  { icon: 'pin', title: 'SEO & Google Business Profile', text: 'Profile optimisation, Google posts, review replies, website SEO, blogs, plus AEO and GEO for AI search.' },
  { icon: 'web', title: 'Website development', text: 'Fast, mobile-first sites with WhatsApp CTAs, tracking and an SEO foundation. You own the code.' },
  { icon: 'social', title: 'Social media marketing', text: 'Content calendar, design, captions, community management and Meta ads with WhatsApp tracking.' },
  { icon: 'leads', title: 'Lead generation', text: 'Google, Meta and LinkedIn campaigns with call, form and WhatsApp conversion tracking.' },
]

/** How we work: 4 steps. */
export const PROCESS = [
  { title: 'Free review', text: 'We review your website, Google Business Profile and the competitors you care about, before any quote.' },
  { title: 'Written plan & quote', text: 'You get a clear plan with what is included each month, what ad spend is separate and the first priorities.' },
  { title: 'Set-up & launch', text: 'We fix the foundations, set up call, form and WhatsApp tracking, and start the monthly work.' },
  { title: 'Report & improve', text: 'A monthly report from your own accounts, a review call, and a plan for what we change next month.' },
]

/** Trust facts already stated on the site. */
export const TRUST_FACTS = [
  { k: '4.9★', v: 'from 106 Google reviews' },
  { k: '2021', v: 'founded, 1 October 2021' },
  { k: '3 offices', v: 'Madurai, Thoothukudi & Rawang' },
  { k: '100%', v: 'of accounts stay in your name' },
]

/** Terms the site already states (Terms page, city pages, service pages). */
export const TERMS = [
  { title: 'No lock-in', text: 'Monthly plans, ended with written notice under your service agreement.' },
  { title: 'You own everything', text: 'Google Business Profile, Search Console, Analytics, ad accounts and website code stay in your name.' },
  { title: 'Clear billing', text: 'Retainers invoiced at the start of each month; websites are one-time, in agreed milestones. Bank transfer.' },
  { title: 'No fake guarantees', text: 'Nobody controls Google’s rankings. We commit to the agreed work and honest reporting instead.' },
]
