/**
 * City landing pages (/locations/<slug>/), rendered by src/templates/CityLandingTemplate.jsx.
 * Plain data only (no JSX): also loaded by Node at build time (seoConfig, ssrRoutes, prerender).
 *
 * Honesty rules for this file:
 * - Static Savvy Media's real offices are Madurai (HQ), Thoothukudi and Rawang (Selangor, Malaysia).
 *   No city below claims a local office address unless it really has one (Selangor = Rawang office).
 * - No client names, results or statistics that cannot be verified. The only figures used are the
 *   ones already published site-wide (4.9★ from 100+ Google reviews, founded 1 Oct 2021) and the
 *   published price list (Oct 2026).
 */

export const PRICE_TIERS = {
  india: {
    currency: 'INR',
    symbol: '₹',
    pricingPath: '/pricing/india/',
    plans: [
      { name: 'Google Business Profile', price: 6000, display: '₹6,000', features: ['Google Business Profile optimisation', '12 Google posts a month', 'Review reply support and photo updates', 'Monthly calls, directions and enquiries report'] },
      { name: 'GBP + Website SEO', price: 12000, display: '₹12,000', popular: true, features: ['Everything in the GBP plan', 'On-page and technical SEO for your website', '4 SEO blog posts a month', 'Search Console and GA4 reporting'] },
      { name: 'GBP + SEO + AEO + GEO', price: 20000, display: '₹20,000', features: ['Everything in GBP + Website SEO', 'Answer Engine Optimisation (FAQ, schema, answer-first pages)', 'Generative Engine Optimisation for ChatGPT, Perplexity and Google AI Overviews', 'AI-visibility checks in the monthly report'] },
    ],
  },
  malaysia: {
    currency: 'MYR',
    symbol: 'RM',
    pricingPath: '/pricing/malaysia/',
    plans: [
      { name: 'Google Business Profile', price: 800, display: 'RM 800', features: ['Google Business Profile optimisation', '12 Google posts a month', 'Review reply support and photo updates', 'Monthly calls, directions and enquiries report'] },
      { name: 'GBP + Website SEO', price: 1500, display: 'RM 1,500', popular: true, features: ['Everything in the GBP plan', 'On-page and technical SEO for google.com.my', '4 SEO blog posts a month (English or Bahasa Malaysia)', 'Search Console and GA4 reporting'] },
      { name: 'GBP + SEO + AEO + GEO', price: 2000, display: 'RM 2,000', features: ['Everything in GBP + Website SEO', 'Answer Engine Optimisation (FAQ, schema, answer-first pages)', 'Generative Engine Optimisation for ChatGPT, Perplexity and Google AI Overviews', 'AI-visibility checks in the monthly report'] },
    ],
  },
  singapore: {
    currency: 'SGD',
    symbol: 'S$',
    pricingPath: '/contact/',
    plans: [
      { name: 'Google Business Profile', price: 500, display: 'SGD 500', features: ['Google Business Profile optimisation', '12 Google posts a month', 'Review reply support and photo updates', 'Monthly calls, directions and enquiries report'] },
      { name: 'GBP + Website SEO', price: 1000, display: 'SGD 1,000', popular: true, features: ['Everything in the GBP plan', 'On-page and technical SEO for google.com.sg', '4 SEO blog posts a month', 'Search Console and GA4 reporting'] },
      { name: 'GBP + SEO + AEO + GEO', price: 1500, display: 'SGD 1,500', features: ['Everything in GBP + Website SEO', 'Answer Engine Optimisation (FAQ, schema, answer-first pages)', 'Generative Engine Optimisation for ChatGPT, Perplexity and Google AI Overviews', 'AI-visibility checks in the monthly report'] },
    ],
  },
  dubai: {
    currency: 'AED',
    symbol: 'AED',
    pricingPath: '/contact/',
    plans: [
      { name: 'Google Business Profile', price: 800, display: 'AED 800', features: ['Google Business Profile optimisation', '8 Google posts a month', 'Review reply support and photo updates', 'Monthly calls, directions and enquiries report'] },
      { name: 'GBP + Website SEO', price: 2000, display: 'AED 2,000', popular: true, features: ['Everything in the GBP plan', 'On-page and technical SEO for your website', '4 SEO blog posts a month', 'Search Console and GA4 reporting'] },
      { name: 'GBP + SEO + AEO + GEO', price: 3000, display: 'AED 3,000', features: ['Everything in GBP + Website SEO', 'Answer Engine Optimisation (FAQ, schema, answer-first pages)', 'Generative Engine Optimisation for ChatGPT, Perplexity and Google AI Overviews', 'AI-visibility checks in the monthly report'] },
    ],
  },
}

const IN_WA = { display: '+91 99440 40345', number: '+91 99440 40345' }
const MY_WA = { display: '+60 12-453 7030', number: '+60 12-453 7030' }

export const cityPages = [
  /* ================================ CHENNAI ================================ */
  {
    slug: 'chennai',
    name: 'Chennai',
    region: 'india',
    areaType: 'City',
    containedIn: 'Tamil Nadu',
    whatsapp: IN_WA,
    title: 'Digital Marketing Agency in Chennai | Static Savvy Media',
    description: 'Digital marketing for Chennai businesses: SEO, Google Business Profile, Ads, websites and AI search. Plans from ₹6,000/month, run from our Madurai HQ. WhatsApp +91 99440 40345.',
    eyebrow: 'Chennai · Served from our Madurai HQ',
    h1: 'Digital Marketing Agency for Chennai Businesses',
    answer: 'Static Savvy Media runs SEO, Google Business Profile, Google and Meta ads, websites and AI search optimisation (GEO/AEO) for Chennai businesses. We do not have a Chennai office: the work is done by our team at our Madurai head office, with video calls, WhatsApp updates and in-person meetings in Chennai by appointment. Monthly plans start at ₹6,000 (Google Business Profile), ₹12,000 (GBP + website SEO) and ₹20,000 (GBP + SEO + AEO + GEO).',
    intro: [
      'Chennai is the most crowded digital market in Tamil Nadu. A broad phrase like “best clinic in Chennai” is contested by hundreds of businesses and by national aggregators, so a Chennai campaign is won locality by locality and service by service, not with one generic city page.',
      'That is how we plan Chennai work: one real Google Business Profile per staffed branch, pages that speak to the specific localities you actually serve, and search ads held to tight geo-targets so OMR budgets are not spent on Ambattur clicks.',
    ],
    howWeServe: {
      mode: 'Remote, with on-site meetings by appointment',
      points: [
        'Kick-off and monthly review calls on Google Meet or Zoom, in Tamil or English',
        'A WhatsApp group with the people doing your work, not a call centre',
        'In-person workshop or shoot in Chennai when the project needs it (planned in advance)',
        'Reporting from your own Google Business Profile, Search Console and GA4 accounts',
      ],
    },
    industries: [
      { title: 'Healthcare & specialty clinics', text: 'Chennai draws patients from across India and abroad for specialist care. Clinics need a page per speciality and per doctor, accurate GBP categories and factual, guideline-safe copy, because patients compare carefully before they travel.' },
      { title: 'Automotive & manufacturing suppliers', text: 'The Sriperumbudur–Oragadam belt, Guindy and Ambattur industrial estates are full of component makers and job shops. Buyers search by part, process and certification, so detailed capability pages beat generic “we manufacture quality products” copy.' },
      { title: 'IT services & SaaS on OMR', text: 'Companies along the OMR and Guindy corridors sell to national and global buyers. We focus on LinkedIn, service pages written for procurement teams, and GEO so AI assistants describe the company accurately.' },
      { title: 'Retail, real estate & education', text: 'T. Nagar and Mylapore retail, residential projects on the city’s growth corridors, and coaching centres and colleges all live on Google Maps and Instagram. Seasonal planning (wedding season, Deepavali, admissions) decides the year.' },
    ],
    areas: ['T. Nagar', 'Anna Nagar', 'Velachery', 'OMR / Sholinganallur', 'Adyar', 'Mylapore', 'Guindy', 'Porur', 'Tambaram', 'Ambattur', 'Perungudi', 'Nungambakkam'],
    priorities: [
      { title: 'Locality pages, not one city page', text: 'We map the localities you genuinely serve and build pages and GBP service areas around them. Areas you do not serve stay out, which keeps you inside Google’s guidelines.' },
      { title: 'Exact-match ads with weekly negatives', text: 'Chennai clicks are expensive. Campaigns use exact and phrase match on high-intent terms, radius targeting around each branch, and a weekly negative-keyword pass (jobs, free, course, salary).' },
      { title: 'Tamil and English by audience', text: 'Consumer creatives often work in Tamil or Tanglish on Instagram and YouTube; B2B buyers search in English. We plan language per audience instead of translating everything.' },
      { title: 'Measure cost per real enquiry', text: 'Calls, WhatsApp chats and forms are tracked by source so you can cut spend that only brings clicks.' },
    ],
    faqs: [
      { question: 'Do you have an office in Chennai?', answer: 'No. Our offices are in Madurai (head office), Thoothukudi and Rawang, Malaysia. Chennai clients are served by our Madurai team over video calls and WhatsApp, with in-person meetings in Chennai by appointment.' },
      { question: 'How much does digital marketing cost for a Chennai business?', answer: 'Our monthly plans are ₹6,000 for Google Business Profile management (12 posts a month), ₹12,000 for GBP plus website SEO with 4 blog posts, and ₹20,000 for GBP, SEO, AEO and GEO. Ad spend, if you run ads, is paid separately to Google or Meta.' },
      { question: 'Can a Madurai-based agency rank a Chennai business?', answer: 'Yes. Rankings depend on your website, your Google Business Profile and your reviews, not on where the agency sits. What matters is local knowledge of Chennai localities and Tamil Nadu buyers, which our team has.' },
      { question: 'Should a business with several Chennai branches have several Google profiles?', answer: 'One profile per real, staffed location, each with its own address and phone. Creating profiles for areas where you have no premises breaks Google’s guidelines and risks suspension.' },
      { question: 'Is SEO worth it in a market as competitive as Chennai?', answer: 'Usually yes, if you target specific services and localities rather than only broad head terms. Narrow, high-intent searches are more achievable and tend to convert better.' },
      { question: 'Do you work in Tamil as well as English?', answer: 'Yes. Our team writes and reports in Tamil and English, and we choose the language per audience and channel.' },
      { question: 'How soon will a Chennai business see results?', answer: 'Google Business Profile and ads changes can show in weeks; organic SEO in a competitive city typically takes several months. We agree measurable 90-day milestones before we start.' },
    ],
    related: [
      { to: '/blog/digital-marketing-agency-chennai-businesses/', label: 'Guide: digital marketing for Chennai businesses' },
      { to: '/services/seo/', label: 'SEO services' },
      { to: '/services/local-seo/', label: 'Local SEO & Google Business Profile' },
      { to: '/services/google-ads/', label: 'Google Ads management' },
      { to: '/locations/tamil-nadu/', label: 'Digital marketing across Tamil Nadu' },
    ],
  },

  /* ================================ COIMBATORE ================================ */
  {
    slug: 'coimbatore',
    name: 'Coimbatore',
    region: 'india',
    areaType: 'City',
    containedIn: 'Tamil Nadu',
    whatsapp: IN_WA,
    title: 'Digital Marketing Agency in Coimbatore | Static Savvy Media',
    description: 'SEO, Google Business Profile, Ads and B2B websites for Coimbatore manufacturers, clinics and retailers. Plans from ₹6,000/month, run from our Madurai HQ. WhatsApp +91 99440 40345.',
    eyebrow: 'Coimbatore · Served from our Madurai HQ',
    h1: 'Digital Marketing for Coimbatore Manufacturers, Clinics and Retailers',
    answer: 'Static Savvy Media helps Coimbatore businesses get enquiries from Google, Google Maps, LinkedIn and AI assistants, with a special focus on manufacturers who sell B2B and export. We have no Coimbatore office: our Madurai team runs the work remotely, with meetings and factory or product shoots in Coimbatore by appointment. Plans start at ₹6,000, ₹12,000 and ₹20,000 a month.',
    intro: [
      'Coimbatore is an engineering city. Pumps and motors, wet grinders, textile machinery, foundries and precision job shops sell mostly through dealers and referrals, yet purchase managers in India and abroad now shortlist suppliers online before they ever call.',
      'For those businesses a website is a catalogue and a salesperson. We build product-range pages with real specifications, datasheets and application notes, then use SEO, LinkedIn and tightly targeted Google Ads to put them in front of buyers who search by model, rating and use case.',
    ],
    howWeServe: {
      mode: 'Remote, with factory visits and shoots by appointment',
      points: [
        'Discovery call with your sales head to list products, buyer types and export markets',
        'Product and plant photography planned in Coimbatore when you need fresh visuals',
        'Weekly WhatsApp updates; monthly review on video call',
        'Enquiry tracking by product page and campaign so you see which ranges bring orders',
      ],
    },
    industries: [
      { title: 'Pumps, motors & engineering', text: 'Buyers search specific terms such as “5 HP submersible borewell pump” or “three-phase induction motor manufacturer”. Product + specification + application pages, with Product schema, are how these businesses win organic enquiries.' },
      { title: 'Textile mills & textile machinery', text: 'Spinning mills, yarn traders and machinery makers need pages written for technical buyers: counts, capacities, certifications you actually hold and dispatch terms. LinkedIn helps reach consultants and purchase teams.' },
      { title: 'Hospitals, clinics & diagnostics', text: 'Coimbatore is a healthcare destination for western Tamil Nadu and Kerala. Speciality pages, doctor profiles and a well-kept Google Business Profile help patients from outside the city decide before they travel.' },
      { title: 'Education & retail', text: 'Engineering colleges, coaching centres and retailers on Cross Cut Road and Brookefields compete on Google Maps and Instagram, with demand peaking at admissions and festival seasons.' },
    ],
    areas: ['RS Puram', 'Gandhipuram', 'Peelamedu', 'Saravanampatti', 'Avinashi Road', 'Singanallur', 'Saibaba Colony', 'Ganapathy', 'Kuniyamuthur', 'Vadavalli', 'Kalapatti', 'Thudiyalur'],
    priorities: [
      { title: 'A real product catalogue online', text: 'One page per product range with models, technical data, materials, applications and a working enquiry form. Thin pages rarely rank or convert.' },
      { title: 'Export-ready pages', text: 'If you export, pages for the markets and standards you genuinely serve, written in plain international English, plus fast response on WhatsApp and email across time zones.' },
      { title: 'LinkedIn for purchase managers', text: 'Installation stories, plant capabilities and technical explainers shared from the company page and the founder’s profile, aimed at buyers, consultants and EPC contractors.' },
      { title: 'Ads that exclude retail and job seekers', text: 'Google Ads on narrow product keywords with negatives for retail, price-shopping and job terms, so the budget only reaches buyers.' },
    ],
    faqs: [
      { question: 'Do you have an office in Coimbatore?', answer: 'No. We serve Coimbatore from our Madurai head office, about four hours away by road, with video calls, WhatsApp and visits by appointment for meetings, factory walk-throughs or product shoots.' },
      { question: 'Does SEO work for industrial manufacturers in Coimbatore?', answer: 'Yes, especially for specific product and application searches where competition is lower and buyer intent is high. It needs detailed product pages rather than generic blog content.' },
      { question: 'What does a Coimbatore business pay per month?', answer: '₹6,000 for Google Business Profile management, ₹12,000 for GBP plus website SEO with 4 blogs a month, and ₹20,000 for GBP, SEO, AEO and GEO. Website builds and ad spend are quoted separately.' },
      { question: 'Can you help us get export enquiries?', answer: 'We can build and optimise English pages for the export markets and standards you actually serve, and track enquiries by source. We do not promise orders; we show which pages and campaigns bring qualified enquiries.' },
      { question: 'Is LinkedIn useful for a B2B manufacturer?', answer: 'Usually more than Instagram or Facebook. It reaches purchase managers, consultants and contractors. YouTube is useful for product demos and installation videos.' },
      { question: 'Will you write technical content correctly?', answer: 'We draft from your datasheets and a call with your engineers, then send every technical page for your approval before it goes live.' },
      { question: 'How do we start?', answer: 'Send a WhatsApp message to +91 99440 40345 or use the form on this page. We begin with a free review of your website, Google Business Profile and the competitors you care about.' },
    ],
    related: [
      { to: '/blog/digital-marketing-coimbatore-manufacturers-b2b/', label: 'Guide: digital marketing for Coimbatore manufacturers' },
      { to: '/services/seo/', label: 'SEO services' },
      { to: '/services/website-design-development/', label: 'Website design & development' },
      { to: '/services/product-photography-creative-design/', label: 'Product photography' },
      { to: '/locations/tiruppur/', label: 'Digital marketing in Tiruppur' },
    ],
  },

  /* ================================ TRICHY ================================ */
  {
    slug: 'trichy',
    name: 'Trichy',
    altName: 'Tiruchirappalli',
    region: 'india',
    areaType: 'City',
    containedIn: 'Tamil Nadu',
    whatsapp: IN_WA,
    title: 'Digital Marketing Agency in Trichy | Static Savvy Media',
    description: 'Local SEO, Google Business Profile, Ads and websites for Trichy (Tiruchirappalli) hospitals, colleges, retailers and fabricators. From ₹6,000/month. WhatsApp +91 99440 40345.',
    eyebrow: 'Trichy · A short drive from our Madurai HQ',
    h1: 'Digital Marketing Agency for Trichy (Tiruchirappalli) Businesses',
    answer: 'Static Savvy Media is a Madurai-headquartered agency that runs Local SEO, Google Business Profile, Google and Meta ads, websites and AI search optimisation for Trichy businesses. Trichy is about two and a half hours from our Madurai office, so on-site meetings are practical; day-to-day work is done remotely. Plans start at ₹6,000 a month.',
    intro: [
      'Trichy serves the whole of central Tamil Nadu. Patients come from Karur, Pudukkottai, Perambalur and Ariyalur, students arrive from across the state, and pilgrims head to Srirangam, Samayapuram and the Rockfort. Many Trichy customers are searching from outside the city before they travel.',
      'So a Trichy campaign has to be visible to people in surrounding districts, not just to people already in Thillai Nagar. We plan search terms, Google Business Profile content and ad targeting around where your customers actually come from.',
    ],
    howWeServe: {
      mode: 'Remote, with regular on-site visits possible',
      points: [
        'Trichy is close enough to our Madurai office for in-person kick-offs and shoots',
        'Monthly review on video call or in person, in Tamil or English',
        'WhatsApp group with your account team for quick approvals',
        'Reports from your own Google accounts: calls, direction requests, forms, rankings',
      ],
    },
    industries: [
      { title: 'Hospitals & specialty clinics', text: 'Speciality and doctor pages with qualifications, timings and booking steps, plus search ads for specific treatments targeted at surrounding districts. Copy stays factual and within medical advertising guidelines.' },
      { title: 'Colleges, schools & coaching', text: 'Trichy’s education base competes for students across Tamil Nadu. Course pages, admission FAQs for parents and campaigns that start months before applications open matter more than glossy brochures.' },
      { title: 'Fabrication & engineering units', text: 'The industrial cluster around Thiruverumbur supplies heavy engineering and power projects. Capability pages, certifications you actually hold and LinkedIn presence help these units reach buyers beyond referrals.' },
      { title: 'Retail, textiles & temple tourism', text: 'Shoppers on Chinna Kadai Street and in Thillai Nagar check Google first; hotels and restaurants near Srirangam depend on pilgrim searches in Tamil and English and on replying to every review.' },
    ],
    areas: ['Thillai Nagar', 'Srirangam', 'Cantonment', 'KK Nagar', 'Woraiyur', 'Thiruverumbur', 'Chathiram', 'Puthur', 'Ariyamangalam', 'Edamalaipatti Pudur', 'Samayapuram', 'Manachanallur'],
    priorities: [
      { title: 'Target the surrounding districts', text: 'Search terms and ad geo-targets that include Karur, Pudukkottai, Perambalur, Ariyalur and Thanjavur for businesses people travel to Trichy for.' },
      { title: 'Admissions-season calendar', text: 'For education clients, content and ads are scheduled months before applications open, so rankings are in place when parents start researching.' },
      { title: 'Google Business Profile as the shop window', text: 'Correct categories, Tamil and English descriptions, current festival timings, fresh photos and a review-reply routine.' },
      { title: 'One clear WhatsApp path', text: 'Every page and ad ends in a one-tap WhatsApp or call, because most Trichy enquiries arrive on a phone.' },
    ],
    faqs: [
      { question: 'Do you have an office in Trichy?', answer: 'No. Our head office is in Madurai, roughly two and a half hours from Trichy by road. Most work is done remotely, and we visit Trichy clients for meetings or shoots when needed.' },
      { question: 'How can a Trichy hospital reach patients from nearby districts?', answer: 'With speciality and doctor pages, an optimised Google Business Profile, genuine reviews and search ads for specific treatments targeted at the surrounding districts.' },
      { question: 'When should Trichy colleges start admission marketing?', answer: 'Several months before applications open, so pages and rankings are ready when parents and students begin comparing.' },
      { question: 'What are your prices for Trichy businesses?', answer: '₹6,000 a month for Google Business Profile management, ₹12,000 for GBP plus website SEO with 4 blogs, and ₹20,000 for GBP, SEO, AEO and GEO. Ad spend is separate.' },
      { question: 'Is a Google Business Profile enough for a Trichy shop?', answer: 'It is the most important starting point. A simple fast website, WhatsApp and Instagram help convert the people who find you on Maps.' },
      { question: 'Do you create content in Tamil?', answer: 'Yes. We write Tamil and English content and choose the language per audience.' },
      { question: 'How do I start?', answer: 'WhatsApp +91 99440 40345 or fill in the form on this page for a free review of your website and Google Business Profile.' },
    ],
    related: [
      { to: '/blog/digital-marketing-trichy-businesses/', label: 'Guide: digital marketing in Trichy' },
      { to: '/services/local-seo/', label: 'Local SEO & Google Business Profile' },
      { to: '/industries/healthcare-clinics/', label: 'Healthcare & clinics marketing' },
      { to: '/industries/education-training/', label: 'Education & training marketing' },
      { to: '/locations/madurai/', label: 'Our Madurai head office' },
    ],
  },

  /* ================================ SALEM ================================ */
  {
    slug: 'salem',
    name: 'Salem',
    region: 'india',
    areaType: 'City',
    containedIn: 'Tamil Nadu',
    whatsapp: IN_WA,
    title: 'Digital Marketing Agency in Salem | Static Savvy Media',
    description: 'SEO, Google Maps, Ads and websites for Salem businesses: sago and food brands, steel and engineering, silk and handloom, clinics and retail. From ₹6,000/month. WhatsApp +91 99440 40345.',
    eyebrow: 'Salem · Served from our Madurai HQ',
    h1: 'Digital Marketing Agency for Salem Businesses',
    answer: 'Static Savvy Media runs SEO, Google Business Profile, Google and Meta ads, websites and AI search optimisation for Salem businesses from our Madurai head office. We have no Salem office; work is managed remotely, with visits by appointment. Plans start at ₹6,000 (GBP), ₹12,000 (GBP + SEO) and ₹20,000 (GBP + SEO + AEO + GEO) a month.',
    intro: [
      'Salem’s economy is unusually varied: sago (javvarisi) and starch units, steel and engineering, silk and handloom weaving, mango trade, transport operators and the tourism that flows up to Yercaud. Many of these businesses already sell beyond the district through traders, and the opportunity is to reach buyers directly.',
      'For Salem we usually start with the Google Business Profile and a credible website, then add product or service pages aimed at the buyers outside Salem who are already searching for what you make.',
    ],
    howWeServe: {
      mode: 'Remote, with visits by appointment',
      points: [
        'Video-call kick-off to map products, buyers and the districts or states you sell to',
        'Tamil and English content, reviewed by you before it goes live',
        'Product, unit or showroom photography planned on-site when needed',
        'Monthly report from your own Google Business Profile, Search Console and GA4',
      ],
    },
    industries: [
      { title: 'Sago, starch & food products', text: 'Buyers search by product grade, pack size and supply capacity. Clear product pages, FSSAI and quality details you actually hold, and a quick WhatsApp quote path help units sell beyond commission agents.' },
      { title: 'Steel, fabrication & engineering', text: 'Suppliers around the steel plant and the city’s engineering units win with capability pages, certifications, machinery lists and LinkedIn presence aimed at purchase teams.' },
      { title: 'Silk, handloom & textiles', text: 'Weavers and saree retailers can reach customers across India with real product photography, catalogue pages, Instagram reels and WhatsApp catalogues for repeat buyers.' },
      { title: 'Clinics, schools & Yercaud tourism', text: 'Clinics and schools live on Google Maps reviews and accurate listings; resorts and homestays heading up to Yercaud depend on weekend and holiday searches from Bengaluru and Chennai.' },
    ],
    areas: ['Fairlands', 'Hasthampatti', 'Five Roads', 'Alagapuram', 'Suramangalam', 'Ammapet', 'Shevapet', 'Kondalampatti', 'Gugai', 'Omalur Road', 'Attur', 'Yercaud'],
    priorities: [
      { title: 'Sell beyond the district', text: 'Pages and ads written for buyers in other districts and states who already search for Salem products, with delivery, MOQ and dispatch answered up front.' },
      { title: 'Google Business Profile cleanup', text: 'Many local listings are incomplete. Correct categories, products, photos and Tamil and English descriptions make a visible difference on Maps.' },
      { title: 'Real photography', text: 'For textiles and food products, honest photos and short process videos build more trust than stock images.' },
      { title: 'WhatsApp for repeat orders', text: 'A WhatsApp Business catalogue and quick-reply templates so trade buyers can reorder without a phone call.' },
    ],
    faqs: [
      { question: 'Do you have an office in Salem?', answer: 'No. We serve Salem from our Madurai head office with video calls, WhatsApp and on-site visits by appointment. Our other offices are in Thoothukudi and Rawang, Malaysia.' },
      { question: 'What does digital marketing cost for a Salem business?', answer: '₹6,000 a month for Google Business Profile management (12 posts), ₹12,000 for GBP plus website SEO with 4 blogs a month, and ₹20,000 for GBP, SEO, AEO and GEO. Ad spend is paid separately.' },
      { question: 'Can you help a sago or food unit get direct buyers?', answer: 'We can build product pages, optimise for the searches trade buyers use, and set up WhatsApp and enquiry tracking. Orders depend on your pricing and supply, but you will see exactly which pages bring enquiries.' },
      { question: 'Is SEO useful for a Salem textile or saree business?', answer: 'Yes, combined with good product photography and Instagram. Searches for specific weaves and sarees come from all over India.' },
      { question: 'Do you do websites as well as marketing?', answer: 'Yes. We design fast, mobile-first websites with clear WhatsApp and call buttons, and SEO built in from the start.' },
      { question: 'Do you work in Tamil?', answer: 'Yes. Our team works in Tamil and English.' },
      { question: 'How do we get started?', answer: 'Message +91 99440 40345 on WhatsApp or use the form on this page. We start with a free review of your listing, website and competitors.' },
    ],
    related: [
      { to: '/services/local-seo/', label: 'Local SEO & Google Business Profile' },
      { to: '/services/website-design-development/', label: 'Website design & development' },
      { to: '/services/social-media-marketing/', label: 'Social media marketing' },
      { to: '/blog/whatsapp-marketing-madurai-businesses/', label: 'Guide: safe WhatsApp marketing' },
      { to: '/locations/tamil-nadu/', label: 'Digital marketing across Tamil Nadu' },
    ],
  },

  /* ================================ TIRUNELVELI ================================ */
  {
    slug: 'tirunelveli',
    name: 'Tirunelveli',
    region: 'india',
    areaType: 'City',
    containedIn: 'Tamil Nadu',
    whatsapp: IN_WA,
    title: 'Digital Marketing Agency in Tirunelveli | Static Savvy Media',
    description: 'SEO, Google Business Profile, e-commerce and ads for Tirunelveli sweets brands, Palayamkottai schools, clinics and retailers. Near our Thoothukudi office. From ₹6,000/month.',
    eyebrow: 'Tirunelveli · Near our Thoothukudi office',
    h1: 'Digital Marketing Agency for Tirunelveli and Palayamkottai Businesses',
    answer: 'Static Savvy Media serves Tirunelveli from our nearby Thoothukudi office and our Madurai head office. We run Google Business Profile, SEO, e-commerce and social media, ads and AI search optimisation for local brands, schools, clinics and retailers, with on-site visits easy to arrange. Plans start at ₹6,000 a month.',
    intro: [
      'Tirunelveli has products that people outside the district already want, from its famous halwa and sweets to food products and handicrafts, and an education base in Palayamkottai that draws students from across southern Tamil Nadu.',
      'For many Tirunelveli businesses the real growth is beyond the district: customers in Chennai, Bengaluru and overseas who want to order. We help with both sides, being found on Google Maps locally and selling online to everyone else.',
    ],
    howWeServe: {
      mode: 'Remote, with easy on-site visits from Thoothukudi and Madurai',
      points: [
        'Our Thoothukudi office is close by, so meetings and shoots in Tirunelveli are straightforward',
        'Tamil-first communication, with English content where buyers need it',
        'WhatsApp updates and a monthly review call or visit',
        'Reporting from your own Google Business Profile, Search Console and store data',
      ],
    },
    industries: [
      { title: 'Sweets, halwa & food brands', text: 'People ordering from outside worry about freshness, shelf life and delivery. Product pages that answer those questions, visible FSSAI details, real photos and festive-season planning (Deepavali, Pongal) build trust.' },
      { title: 'Schools, colleges & coaching in Palayamkottai', text: 'Institutions compete for parents across the southern districts. Course pages, admission information, hostel and transport details and quick WhatsApp replies convert better than brochures.' },
      { title: 'Clinics & diagnostics', text: 'A complete Google Business Profile with the correct categories, timings and genuine reviews is the main way patients choose. We keep medical copy factual.' },
      { title: 'Retail, showrooms & local services', text: 'Textile shops, jewellers, two-wheeler showrooms and service businesses win on Maps with accurate details, fresh photos and Tamil and English descriptions.' },
    ],
    areas: ['Palayamkottai', 'Tirunelveli Town', 'Tirunelveli Junction', 'Vannarpettai', 'Maharaja Nagar', 'Perumalpuram', 'KTC Nagar', 'NGO Colony', 'Melapalayam', 'Pettai', 'Tharuvai', 'Sankar Nagar'],
    priorities: [
      { title: 'Online ordering that builds trust', text: 'An e-commerce site or WhatsApp catalogue with shelf life, packaging, delivery areas and timelines answered on every product.' },
      { title: 'Festival and gifting calendar', text: 'Gift boxes, product pages and ads prepared weeks before Deepavali, Pongal and wedding season, when gifting searches peak.' },
      { title: 'Google Maps for every real outlet', text: 'One accurate profile per real shop or branch, with areas served listed only where you genuinely deliver or serve.' },
      { title: 'Instagram reels of the real process', text: 'Short videos of preparation and packing, or of campus life for schools, are the most believable content.' },
    ],
    faqs: [
      { question: 'Do you have an office in Tirunelveli?', answer: 'No. Our nearest office is in Thoothukudi, and our head office is in Madurai. Both are within easy reach, so we can meet Tirunelveli clients in person when needed.' },
      { question: 'How can a Tirunelveli sweet shop sell online across India?', answer: 'With an e-commerce site or marketplace listings that clearly state shelf life and delivery, courier partners that suit the product, and promotion through Google, Instagram and WhatsApp.' },
      { question: 'Is local SEO useful for Tirunelveli businesses?', answer: 'Yes. Most local searches happen on Google Maps, and many local profiles are incomplete, so a well-kept profile can stand out.' },
      { question: 'What do your plans cost?', answer: '₹6,000 a month for Google Business Profile management, ₹12,000 for GBP plus website SEO with 4 blogs a month, and ₹20,000 for GBP, SEO, AEO and GEO.' },
      { question: 'Should we market in Tamil or English?', answer: 'Tamil usually works best for local and regional customers; use English alongside it for buyers outside Tamil Nadu.' },
      { question: 'Can you help schools in Palayamkottai with admissions?', answer: 'Yes: course and admission pages, parent FAQs, Google Business Profile and seasonal campaigns planned before applications open.' },
      { question: 'How do we start?', answer: 'WhatsApp +91 99440 40345 or use the form on this page for a free review.' },
    ],
    related: [
      { to: '/blog/digital-marketing-tirunelveli-businesses/', label: 'Guide: digital marketing in Tirunelveli' },
      { to: '/locations/thoothukudi/', label: 'Our Thoothukudi office' },
      { to: '/services/local-seo/', label: 'Local SEO & Google Business Profile' },
      { to: '/services/website-design-development/', label: 'Website & e-commerce development' },
      { to: '/blog/local-seo-thoothukudi-businesses/', label: 'Guide: local SEO in southern Tamil Nadu' },
    ],
  },

  /* ================================ TIRUPPUR ================================ */
  {
    slug: 'tiruppur',
    name: 'Tiruppur',
    region: 'india',
    areaType: 'City',
    containedIn: 'Tamil Nadu',
    whatsapp: IN_WA,
    title: 'Digital Marketing for Tiruppur Garment Exporters | Static Savvy Media',
    description: 'B2B websites, SEO, LinkedIn and Google Ads for Tiruppur knitwear exporters, garment manufacturers and job-work units, plus local SEO for retailers. From ₹6,000/month.',
    eyebrow: 'Tiruppur · Served from our Madurai HQ',
    h1: 'Digital Marketing for Tiruppur Knitwear Exporters and Garment Manufacturers',
    answer: 'Static Savvy Media helps Tiruppur knitwear exporters, garment manufacturers and job-work units win buyer enquiries online with B2B websites, SEO, LinkedIn and Google Ads, and helps local retailers on Google Maps. We serve Tiruppur from our Madurai head office, remotely and with visits by appointment. Plans start at ₹6,000 a month.',
    intro: [
      'Tiruppur is India’s knitwear export hub. Exporters, private-label manufacturers and dyeing, printing and stitching job-work units deal with buyers in Europe, the US and across India, and those buyers increasingly start with a Google search, a website check and a LinkedIn profile before the first sample request.',
      'Our Tiruppur work is built for that buyer: capability pages that show product categories, monthly capacity, fabrics, processes and compliance certificates you actually hold, and a fast, credible enquiry path for sourcing teams in other time zones.',
    ],
    howWeServe: {
      mode: 'Remote, with unit visits and shoots by appointment',
      points: [
        'Discovery call with the merchandising or export team',
        'Factory, product and process photography planned on-site when needed',
        'English content written for international sourcing teams, reviewed by you',
        'Enquiry tracking by page and campaign, reported monthly',
      ],
    },
    industries: [
      { title: 'Knitwear exporters & private label', text: 'Sourcing teams compare suppliers on capability, capacity and compliance. Product-category pages (T-shirts, polos, innerwear, kidswear, activewear) with real photos and MOQ details help you get on shortlists.' },
      { title: 'Dyeing, printing & job-work units', text: 'Job-work units sell to other manufacturers. Clear process pages (screen print, sublimation, compacting, embroidery), machinery lists and a Google Business Profile make you findable when a unit needs capacity fast.' },
      { title: 'Domestic brands & wholesalers', text: 'Brands selling across India need catalogue websites, Instagram and WhatsApp catalogues for retailers and distributors, and ads around seasonal launches.' },
      { title: 'Local retail & services', text: 'Showrooms, clinics and schools in Tiruppur win on Google Maps with complete profiles, photos and review replies.' },
    ],
    areas: ['Avinashi Road', 'Kangeyam Road', 'Palladam Road', 'Perumanallur Road', 'Anupparpalayam', 'Veerapandi', 'Mangalam Road', 'Dharapuram Road', 'Avinashi', 'Palladam', 'Uthukuli', 'Kangeyam'],
    priorities: [
      { title: 'Capability pages buyers can shortlist from', text: 'Categories, fabrics, processes, monthly capacity and certifications you hold, with downloadable company profile and a sample-request form.' },
      { title: 'LinkedIn for sourcing teams', text: 'A complete company page and founder or export-manager profiles that share production updates and capabilities with buyers and buying agents.' },
      { title: 'Search ads for B2B terms', text: 'Narrow campaigns on manufacturer and private-label terms, excluding retail shoppers and job seekers, aimed at the countries you ship to.' },
      { title: 'Fast replies across time zones', text: 'Enquiry routing to WhatsApp and email with auto-acknowledgement, so overseas buyers get an answer the same day.' },
    ],
    faqs: [
      { question: 'Do you have an office in Tiruppur?', answer: 'No. We serve Tiruppur from our Madurai head office with video calls and WhatsApp, and visit units for meetings or photography by appointment.' },
      { question: 'Can SEO bring export buyers to a Tiruppur manufacturer?', answer: 'It can bring qualified enquiries from sourcing teams who search for specific garment categories and capabilities. Conversion still depends on your samples, pricing and response time.' },
      { question: 'Should a Tiruppur exporter be on LinkedIn?', answer: 'Yes. Buyers and buying agents check LinkedIn to verify suppliers. A complete company page and active profiles add credibility.' },
      { question: 'What do your plans cost?', answer: '₹6,000 a month for Google Business Profile management, ₹12,000 for GBP plus website SEO with 4 blogs a month, and ₹20,000 for GBP, SEO, AEO and GEO. Website builds and ad spend are separate.' },
      { question: 'Can you photograph our products and factory?', answer: 'Yes. We offer product photography and creative design, and corporate photo and video, planned on-site in Tiruppur.' },
      { question: 'Will you claim certifications or clients we do not have?', answer: 'No. We only publish certifications, capacities and buyer names you confirm in writing.' },
      { question: 'How do we start?', answer: 'WhatsApp +91 99440 40345 or use the form on this page. We start with a free review of your website, LinkedIn and Google presence.' },
    ],
    related: [
      { to: '/services/website-design-development/', label: 'B2B website design & development' },
      { to: '/services/seo/', label: 'SEO services' },
      { to: '/services/product-photography-creative-design/', label: 'Product photography & creative design' },
      { to: '/blog/digital-marketing-coimbatore-manufacturers-b2b/', label: 'Guide: B2B digital marketing for manufacturers' },
      { to: '/locations/coimbatore/', label: 'Digital marketing in Coimbatore' },
    ],
  },

  /* ================================ SELANGOR ================================ */
  {
    slug: 'selangor',
    name: 'Selangor',
    region: 'malaysia',
    areaType: 'State',
    containedIn: 'Malaysia',
    whatsapp: MY_WA,
    office: 'malaysia',
    title: 'Digital Marketing Agency in Selangor | Static Savvy Media',
    description: 'Selangor digital marketing from our Rawang office: SEO, Google Business Profile, Ads and websites for Petaling Jaya, Shah Alam, Subang Jaya and Klang. From RM 800/month.',
    eyebrow: 'Selangor · Our Malaysia office is in Rawang',
    h1: 'Digital Marketing Agency in Selangor: Petaling Jaya, Shah Alam, Subang Jaya and Klang',
    answer: 'Static Savvy Media’s Malaysia office is in Rawang, Selangor, so Selangor is home ground. We run SEO, Google Business Profile, Google and Meta ads, websites and AI search optimisation for businesses in Petaling Jaya, Shah Alam, Subang Jaya, Klang and the rest of the state, with meetings at our office or yours. Plans are RM 800, RM 1,500 and RM 2,000 a month.',
    intro: [
      'Selangor is Malaysia’s most populous and industrialised state, and it behaves like several markets at once: manufacturing and logistics in Shah Alam and around Port Klang, dense retail and F&B in Petaling Jaya and Subang Jaya, private colleges and tech firms around Cyberjaya, and fast-growing townships in the north such as Rawang.',
      'Customers here search on google.com.my in English, Bahasa Malaysia and Chinese, check reviews, then start a WhatsApp chat. We plan pages, Google Business Profiles and ad targeting around the townships you actually serve, and language per channel rather than translating everything.',
    ],
    howWeServe: {
      mode: 'Local office in Rawang, Selangor',
      points: [
        'Meet us at NO.9, Jalan Anggun 2J, Taman Anggun 2, 48000 Rawang (near AEON Mall Rawang), Mon–Fri, 9 AM–6 PM',
        'Or we come to you in PJ, Shah Alam, Subang Jaya or Klang by appointment',
        'Quotes and invoices in MYR, Malaysian working hours',
        'Monthly reports from your own Google and Meta accounts',
      ],
    },
    industries: [
      { title: 'Manufacturing & logistics', text: 'Factories in Shah Alam, Klang and the Port Klang area sell B2B. Capability pages, certifications you hold and LinkedIn reach procurement teams; Google Ads on narrow product terms bring quote requests.' },
      { title: 'F&B, retail & services in PJ and Subang', text: 'Neighbourhood competition is intense. A complete Google Business Profile per outlet, fresh photos, review replies and Instagram content timed to Hari Raya, Chinese New Year and Deepavali drive footfall.' },
      { title: 'Clinics, aesthetics & wellness', text: 'Patients compare reviews and credentials. We keep healthcare copy and ads factual and within Malaysian advertising rules for medical services.' },
      { title: 'Education & professional services', text: 'Private colleges, tuition centres, accountants and law firms need answer-first service pages and GEO, so they are cited when people ask AI assistants for recommendations.' },
    ],
    areas: ['Petaling Jaya', 'Shah Alam', 'Subang Jaya', 'Klang', 'Puchong', 'Rawang', 'Sungai Buloh', 'Kajang', 'Seri Kembangan', 'Cyberjaya', 'Bandar Sunway', 'Setia Alam'],
    priorities: [
      { title: 'Township-level targeting', text: 'PJ, Shah Alam and Klang can be separate markets. Pages, GBP service areas and ad radiuses follow the townships you really serve.' },
      { title: 'Language per channel', text: 'English for most search, Bahasa Malaysia for reviews and some audiences, Chinese where your customers use it, planned per channel.' },
      { title: 'WhatsApp-first enquiries', text: 'Every page and ad starts a WhatsApp conversation in one tap, with tracking so you know which source it came from.' },
      { title: 'Grant-aware planning', text: 'Some Malaysian SMEs can offset digital spend through government programmes. We can prepare documentation for eligible services; eligibility is decided by the programme.' },
    ],
    faqs: [
      { question: 'Where is your Selangor office?', answer: 'NO.9, Jalan Anggun 2J, Taman Anggun 2, 48000 Rawang, Selangor, near AEON Mall Rawang. We are open Monday to Friday, 9 AM to 6 PM (MYT).' },
      { question: 'Do you serve Petaling Jaya, Shah Alam and Klang?', answer: 'Yes. We work with businesses across Selangor and meet clients in PJ, Shah Alam, Subang Jaya and Klang by appointment.' },
      { question: 'How much does SEO cost in Selangor?', answer: 'Our plans are RM 800 a month for Google Business Profile management (12 posts), RM 1,500 for GBP plus website SEO with 4 blogs a month, and RM 2,000 for GBP, SEO, AEO and GEO. Ad spend is separate.' },
      { question: 'Can you write in Bahasa Malaysia?', answer: 'Yes, we produce English and Bahasa Malaysia content and plan the language per channel and audience.' },
      { question: 'How do I contact your Malaysia team?', answer: 'Call or WhatsApp +60 12-453 7030, or use the form on this page.' },
      { question: 'Can my business use a grant for digital marketing?', answer: 'Some SMEs qualify for government digitalisation programmes. We can prepare documentation for eligible services, but the programme decides eligibility.' },
      { question: 'Do you also serve Kuala Lumpur?', answer: 'Yes. See our Kuala Lumpur page for KL-specific details; the same Rawang team serves the whole Klang Valley.' },
    ],
    related: [
      { to: '/blog/seo-services-selangor-shah-alam-petaling-jaya/', label: 'Guide: SEO in Selangor (Shah Alam, PJ, Klang, Rawang)' },
      { to: '/blog/rawang-local-seo-google-business-profile/', label: 'Guide: Rawang local SEO' },
      { to: '/locations/malaysia/', label: 'Our Malaysia office (Rawang)' },
      { to: '/locations/kuala-lumpur/', label: 'Digital marketing in Kuala Lumpur' },
      { to: '/services/local-seo/malaysia/', label: 'Local SEO in Malaysia' },
      { to: '/pricing/malaysia/', label: 'Malaysia pricing' },
    ],
  },

  /* ================================ SINGAPORE ================================ */
  {
    slug: 'singapore',
    name: 'Singapore',
    region: 'singapore',
    areaType: 'Country',
    containedIn: null,
    whatsapp: IN_WA,
    title: 'Digital Marketing Agency for Singapore SMEs | Static Savvy Media',
    description: 'SEO, Google Business Profile, AI search (GEO/AEO) and websites for Singapore SMEs, run remotely by our Malaysia and India team. Plans SGD 500, 1,000 and 1,500/month.',
    eyebrow: 'Singapore · Remote service from Malaysia & India',
    h1: 'Digital Marketing for Singapore SMEs, Run Remotely by a Specialist Team',
    answer: 'Static Savvy Media serves Singapore businesses remotely from our offices in Rawang, Malaysia (same time zone as Singapore) and Madurai, India. We run Google Business Profile, SEO, AI search optimisation (GEO/AEO), websites and ads for SMEs. We have no Singapore office. Plans are SGD 500, SGD 1,000 and SGD 1,500 a month.',
    intro: [
      'Singapore SMEs face agency fees set for a high-cost city. Much of the work that drives enquiries, keeping a Google Business Profile complete and active, publishing useful service pages and making sure AI assistants describe you correctly, does not need to be done in Singapore.',
      'We run that work remotely with a team on Singapore time. You get video-call reviews, WhatsApp updates and reports from your own Google accounts, and you keep full ownership of your website, profiles and data.',
    ],
    howWeServe: {
      mode: 'Fully remote, on Singapore time',
      points: [
        'Our Malaysia team works on the same clock as Singapore (UTC+8)',
        'Kick-off and monthly reviews on Google Meet, Zoom or Teams',
        'WhatsApp updates; you own every account and login',
        'No Singapore office or address is claimed on your listings or ours',
      ],
    },
    industries: [
      { title: 'F&B and retail outlets', text: 'Diners pick from Google Maps ratings and photos. Complete profiles per outlet, fresh photos, menu links and review replies matter more than another social campaign.' },
      { title: 'Clinics, aesthetics & wellness', text: 'Healthcare advertising in Singapore is regulated. We keep copy factual, avoid testimonials and claims the rules restrict, and focus on clear service and practitioner information.' },
      { title: 'Tuition, enrichment & education', text: 'Parents research carefully. Programme pages, schedules, fees approach and answer-first FAQs help centres in Tampines, Jurong or Bukit Timah show up and get chosen.' },
      { title: 'Renovation, interior design & home services', text: 'Homeowners compare portfolios and reviews. Project galleries, service-area pages for the estates you cover and a fast WhatsApp quote path convert those searches.' },
    ],
    areas: ['CBD / Raffles Place', 'Orchard', 'Tanjong Pagar', 'Paya Lebar', 'Tampines', 'Jurong East', 'Woodlands', 'Punggol', 'Bukit Timah', 'Ang Mo Kio', 'Bedok', 'Toa Payoh'],
    priorities: [
      { title: 'Google Business Profile done properly', text: 'Correct categories, services, opening hours, photos and regular posts, plus a review-request routine that follows Google’s rules.' },
      { title: 'Answer-first service pages', text: 'Pages that answer the questions customers and AI assistants ask, with FAQ and service schema, so you are easier to cite in Google AI Overviews and ChatGPT.' },
      { title: 'PDPA-aware forms and tracking', text: 'Enquiry forms with a clear consent and privacy notice, and analytics configured with your data obligations in mind.' },
      { title: 'Lean ads, if needed', text: 'Tightly targeted search campaigns for high-intent terms only, with cost per real enquiry reported monthly.' },
    ],
    faqs: [
      { question: 'Do you have an office in Singapore?', answer: 'No. We serve Singapore remotely from our Malaysia office in Rawang, Selangor, and our head office in Madurai, India. Our Malaysia team works on the same time zone as Singapore.' },
      { question: 'How much do your Singapore plans cost?', answer: 'SGD 500 a month for Google Business Profile management (12 posts), SGD 1,000 for GBP plus website SEO with 4 blogs a month, and SGD 1,500 for GBP, SEO, AEO and GEO. Ad spend, if any, is paid directly to the ad platform.' },
      { question: 'Can a remote agency do local SEO in Singapore?', answer: 'Yes. Local SEO depends on your Google Business Profile, website, reviews and citations, all of which are managed online. What we cannot do is visit you in person, so photos usually come from you or a local photographer.' },
      { question: 'Who owns the accounts and the website?', answer: 'You do. We work inside your Google Business Profile, Search Console, Analytics and ad accounts with access you grant, and you can remove it at any time.' },
      { question: 'Do you handle healthcare advertising rules?', answer: 'We write healthcare copy conservatively and avoid content the Singapore rules restrict, but you remain responsible for compliance and we recommend your own review before publishing.' },
      { question: 'How do we communicate?', answer: 'By WhatsApp (+91 99440 40345), email and scheduled video calls during Singapore business hours.' },
      { question: 'How do we start?', answer: 'Send a WhatsApp message or use the form on this page. We start with a free review of your Google Business Profile, website and AI-search visibility.' },
    ],
    related: [
      { to: '/services/geo-aeo-ai-search/', label: 'GEO & AEO (AI search optimisation)' },
      { to: '/services/local-seo/', label: 'Local SEO & Google Business Profile' },
      { to: '/blog/what-is-generative-engine-optimization/', label: 'Guide: what is GEO?' },
      { to: '/blog/google-business-profile-optimisation-malaysia/', label: 'Guide: Google Business Profile optimisation' },
      { to: '/locations/malaysia/', label: 'Our Malaysia office' },
    ],
  },

  /* ================================ DUBAI ================================ */
  {
    slug: 'dubai',
    name: 'Dubai',
    region: 'dubai',
    areaType: 'City',
    containedIn: 'United Arab Emirates',
    whatsapp: IN_WA,
    title: 'Digital Marketing Agency for Dubai SMEs | Static Savvy Media',
    description: 'Google Business Profile, SEO, AI search (GEO/AEO) and websites for Dubai SMEs, run remotely by our India team, 1.5 hours ahead of Dubai. Plans AED 800, 2,000 and 3,000/month.',
    eyebrow: 'Dubai · Remote service from India',
    h1: 'Digital Marketing for Dubai SMEs, Managed Remotely from India',
    answer: 'Static Savvy Media serves Dubai businesses remotely from our head office in Madurai, India, which is only 1.5 hours ahead of Dubai. We run Google Business Profile, SEO, AI search optimisation (GEO/AEO), websites and ads for SMEs, with no Dubai office claimed. Plans are AED 800, AED 2,000 and AED 3,000 a month.',
    intro: [
      'Dubai is one of the most competitive local-search markets in the region: restaurants, clinics, brokers, trading companies and service businesses all fight for the same map results in Business Bay, Marina, JLT and Deira.',
      'Many Dubai SMEs pay large retainers for work that is mostly done online. We offer a remote alternative: a specialist team on a near-identical working day, honest reporting from your own accounts, and clear monthly pricing in AED.',
    ],
    howWeServe: {
      mode: 'Fully remote, overlapping Dubai working hours',
      points: [
        'India is 1.5 hours ahead of Dubai, so our working day overlaps yours',
        'Video-call kick-off and monthly reviews; WhatsApp for day-to-day',
        'You own every account, listing and login',
        'English content as standard; we tell you upfront how any Arabic pages would be produced and reviewed',
      ],
    },
    industries: [
      { title: 'Restaurants, cafés & cloud kitchens', text: 'Diners choose from Google Maps photos, ratings and menus. Complete profiles per outlet, frequent photo updates and fast review replies are the core of the work.' },
      { title: 'Real estate brokers & property services', text: 'Buyers and tenants research agents before calling. Area guides for the communities you genuinely cover, team profiles and answer-first FAQs build trust and AI-search visibility.' },
      { title: 'Clinics & wellness', text: 'Healthcare advertising in Dubai needs regulatory approval. We keep copy factual and plan campaigns around the approvals you hold.' },
      { title: 'Trading, B2B & e-commerce', text: 'Trading companies in Deira, Al Quoz and the free zones sell regionally. Product and capability pages, LinkedIn and targeted search ads reach buyers across the GCC.' },
    ],
    areas: ['Business Bay', 'Downtown Dubai', 'Dubai Marina', 'JLT', 'Deira', 'Bur Dubai', 'Al Barsha', 'Al Quoz', 'JVC', 'Dubai Silicon Oasis', 'Karama', 'Jebel Ali'],
    priorities: [
      { title: 'Win the map pack per outlet', text: 'A complete, verified Google Business Profile for each real location, with categories, photos, offers and review replies maintained every month.' },
      { title: 'Community pages only where you operate', text: 'Pages for the Dubai communities you really serve, written for the questions customers ask, without fake addresses or doorway pages.' },
      { title: 'AI search visibility', text: 'Structured, answer-first content and schema so ChatGPT, Perplexity and Google AI Overviews describe your business accurately.' },
      { title: 'Measured ads', text: 'If ads are needed, narrow high-intent campaigns with call and WhatsApp tracking and a monthly cost-per-enquiry report.' },
    ],
    faqs: [
      { question: 'Do you have an office in Dubai?', answer: 'No. We serve Dubai remotely from our head office in Madurai, India, with support from our Malaysia office. We do not claim a Dubai address on any listing.' },
      { question: 'How much do your Dubai plans cost?', answer: 'AED 800 a month for Google Business Profile management (8 posts a month), AED 2,000 for GBP plus website SEO with 4 blogs a month, and AED 3,000 for GBP, SEO, AEO and GEO. Ad spend is separate.' },
      { question: 'How do you handle the time difference?', answer: 'India is only 1.5 hours ahead of Dubai, so most of our working day overlaps yours. Calls are scheduled in Dubai business hours.' },
      { question: 'Can you run healthcare ads in Dubai?', answer: 'Only for advertising you have the required approvals for. We write conservatively and plan around your approvals; compliance remains your responsibility.' },
      { question: 'Do you create Arabic content?', answer: 'Our standard work is in English. If you need Arabic pages, we agree upfront how they will be produced and reviewed by a native speaker before anything goes live.' },
      { question: 'Who owns our accounts?', answer: 'You do. We work in your Google Business Profile, Search Console, Analytics and ad accounts with access you control.' },
      { question: 'How do we start?', answer: 'WhatsApp +91 99440 40345 or use the form on this page for a free review of your Google presence and AI-search visibility.' },
    ],
    related: [
      { to: '/services/local-seo/', label: 'Local SEO & Google Business Profile' },
      { to: '/services/geo-aeo-ai-search/', label: 'GEO & AEO (AI search optimisation)' },
      { to: '/services/google-ads/', label: 'Google Ads management' },
      { to: '/blog/what-is-answer-engine-optimization/', label: 'Guide: what is AEO?' },
      { to: '/services/website-design-development/', label: 'Website design & development' },
    ],
  },
]

export function getCityPage(slug) {
  return cityPages.find((c) => c.slug === slug) || null
}
