/**
 * Client data for the private portfolio page (/p/portfolio-6g3sak/). Real data only:
 * ratings re-checked on Google Maps on 31 Oct 2026; review counts, work done and ranking snapshots come
 * from our own October 2026 client reports and rank logs (Maps or web position on the date shown).
 * Do NOT add results, metrics or testimonials that are not in those records. Do not claim we built a
 * client's website: the work is described as SEO / Google Business Profile optimisation.
 */
const maps = (cid) => `https://www.google.com/maps?cid=${cid}`

export const INDUSTRIES = [
  { key: 'home', label: 'Home, interiors & building' },
  { key: 'health', label: 'Healthcare' },
  { key: 'beauty', label: 'Beauty & salon' },
  { key: 'food', label: 'Food & hospitality' },
  { key: 'photo', label: 'Photography' },
  { key: 'travel', label: 'Travel & tourism' },
  { key: 'auto', label: 'Automotive' },
  { key: 'edu', label: 'Education & media' },
  { key: 'security', label: 'Security systems' },
]

/** Section A: Google Business Profile & SEO clients (detailed cards). */
export const GBP_CLIENTS = [
  {
    key: 'aaganyan-hardwares', name: 'Aaganyan Hardwares', industry: 'home', type: 'Architectural hardware store', city: 'Madurai',
    scope: 'Full SEO', rating: 5.0, reviews: 59,
    site: 'https://www.aaganyanhardwares.com/', maps: maps('12485495213073984613'), instagram: 'https://www.instagram.com/aaganyanhardware/',
    shot: 'aaganyan-hardwares',
    results: [
      'Google Maps top 3 for 5 of 20 tracked keywords (19 Oct 2026), up from 3 on 14 Oct',
      '#2 on Maps for “door lock”, “door hinges”, “door stopper” and “digital door lock” (19 Oct 2026)',
    ],
    work: ['GBP description & services', 'Schema & 301 redirect fixes', 'Dealer pages: Hettich, Häfele, Ebco, Quba', 'Thin blogs consolidated with 301s', 'Monthly GBP posts & blogs'],
  },
  {
    key: 'care-to-cure', name: 'CARE to CURE Clinic', industry: 'health', type: 'Physiotherapy centre', city: 'Ellis Nagar, Madurai',
    scope: 'Full SEO', rating: 5.0, reviews: 774,
    site: 'https://caretocuredr.com/', maps: maps('16658333365931790417'),
    shot: 'care-to-cure',
    results: ['#1 on Google for “physiotherapy in Ellis Nagar” (web results, 30 Oct 2026)'],
    work: ['GBP categories & description', 'Monthly GBP posts', 'Weekly blog plan', 'Keyword research (72 keywords)', 'Rank tracking'],
  },
  {
    key: 'aaganyan-interiors', name: 'Aaganyan Interiors', industry: 'home', type: 'Interior designer', city: 'Munichalai, Madurai',
    scope: 'GBP optimisation', rating: null, reviews: 0,
    site: 'https://aaganyan-interiors.localo.site/', maps: maps('15235954001764767619'),
    shot: 'aaganyan-interiors',
    results: ['New profile: “pooja room design Madurai” from not ranked to #9 on Maps; “cabinet maker near me” #7 (26 Oct 2026)'],
    work: ['GBP audit & competitor playbook', 'Categories & phone fixed', 'Service descriptions', 'GBP posts', 'Weekly Maps rank tracking'],
  },
  {
    key: 'rrabs', name: 'RR Advanced Building Systems', industry: 'home', type: 'MEP contractor', city: 'Madurai',
    scope: 'GBP optimisation', rating: 5.0, reviews: 5,
    site: 'https://rrabs.com/', maps: maps('13274985298173754032'),
    shot: 'rrabs',
    results: ['#7 on Maps for “MEP services Madurai”; “hvac contractors in Madurai” and “fire hydrant and sprinkler system Madurai” moved into the top 20 (26 Oct 2026)'],
    work: ['Categories & service areas', '~70 GBP services', 'Attributes', 'Monthly GBP posts', 'Keyword & ranking reports'],
  },
  {
    key: 'dhee-eves', name: 'Dhee Eve’s Beauty Care', industry: 'beauty', type: 'Beauty parlour & training academy', city: 'Shenoy Nagar, Madurai',
    scope: 'GBP optimisation', rating: 4.9, reviews: 1270,
    site: 'https://dheeevesbeautycare.com/', maps: maps('18232296746861425409'), instagram: 'https://www.instagram.com/dheeevesbeautycare/',
    shot: 'dhee-eves',
    results: ['#3 on Google for “beauty parlour Gandhi Nagar Madurai” (web results, 20 Oct 2026)'],
    work: ['Beauty Parlour category added', '5 new services, 9 service descriptions', 'Service areas', 'Review replies', 'Keyword research'],
  },
  {
    key: 'mpk-dry-fruits', name: 'MPK Dry Fruit & Nuts', industry: 'food', type: 'Dry fruit store', city: 'Bypass Road, Madurai',
    scope: 'GBP optimisation', rating: null, reviews: 0,
    site: 'https://www.mpkdryfruits.com/', maps: maps('8199034224792686688'),
    shot: 'mpk-dry-fruits',
    results: ['New profile: #5 on Maps for “deepavali dry fruits gift box madurai” (26 Oct 2026); #8 for “dry fruits shop bypass road madurai” (23 Oct 2026)'],
    work: ['GBP audit & competitor baseline', '9 GBP services', 'WhatsApp booking link', 'Monthly GBP posts', 'Rank tracking'],
  },
  {
    key: 'hashwatha', name: 'Hashwatha Makeovers', industry: 'beauty', type: 'Bridal makeup artist & beauty parlour', city: 'South Gate, Madurai',
    scope: 'GBP optimisation', rating: 4.9, reviews: 72,
    site: 'https://hashwatha-beauty-parlour.localo.site/', maps: maps('4550115321882790523'),
    shot: 'hashwatha',
    results: ['#1 on Maps for “beauty parlour south veli street madurai”, #2 for “beauty parlour south gate madurai” (20 Oct 2026)'],
    work: ['Categories cleaned up', '12 GBP services', 'WhatsApp chat link fixed', 'New GBP description', 'Review replies'],
  },
  {
    key: 'upstrol', name: 'Upstrol Healthcare', industry: 'health', type: 'Custom footwear & foot care', city: 'Saibaba Colony, Coimbatore',
    scope: 'GBP optimisation', rating: 4.9, reviews: 41,
    site: 'https://upstrol.com/', maps: maps('4967245715309194036'),
    shot: 'upstrol',
    results: ['#2 on Google for “custom footwear Coimbatore” (web results, 19 Oct 2026)'],
    work: ['GBP audit & competitors', 'New GBP description', 'Policy-safe services', 'All reviews replied', 'Monthly GBP posts'],
  },
  {
    key: 'leaf9', name: 'Leaf9 Studios', industry: 'photo', type: 'Wedding photography studio', city: 'Koodal Nagar, Madurai',
    scope: 'GBP optimisation', rating: 4.9, reviews: 74,
    site: 'https://leaf9studios.in/', maps: maps('2112677818657547196'),
    shot: 'leaf9',
    results: ['#1 in the Google local 3-pack for “wedding photographer Koodal Nagar” (web results, 30 Oct 2026)'],
    work: ['Categories cleaned up', '13 services & 7 products', 'New GBP description', 'Attributes', 'GBP posts & review replies'],
  },
  {
    key: 'tamilnadu-plywoods', name: 'Tamilnadu Plywoods', industry: 'home', type: 'Plywood supplier', city: 'Madurai',
    scope: 'GBP optimisation', rating: 4.7, reviews: 72,
    site: null, maps: maps('8476940444355544579'),
    shot: null,
    results: [],
    work: ['Keyword & competitor report', 'NAP consistency review', 'GBP optimisation plan'],
  },
  {
    key: 'sacc', name: 'SACC – Substance Abuse Care Centre', industry: 'health', type: 'De-addiction & rehabilitation centre', city: 'Alagar Kovil Road, Madurai',
    scope: 'GBP optimisation', rating: 4.5, reviews: 126,
    site: 'https://www.saccrehabilitation.com/', maps: maps('6064154371925557937'),
    shot: 'sacc',
    results: ['#4 on Maps for “de addiction centre Alagar Kovil Road” (26 Oct 2026, up from #8 on 20 Oct)'],
    work: ['GBP audit & keyword list', 'New description & 9 services', '62 review replies', 'GBP posts', 'Maps rank tracking'],
  },
]

/** Section B: more brands we've worked with (compact chips; a link only where we know it). */
export const MORE_BRANDS = [
  { name: 'Neemtrix Aesthetic & Salon', industry: 'beauty', label: 'Aesthetics & salon' },
  { name: 'New Look Interiors', industry: 'home', label: 'Interior design', url: 'https://www.instagram.com/newlook_interior/', linkLabel: 'Instagram' },
  { name: 'Nifa Holidays', industry: 'travel', label: 'Travel' },
  { name: 'MPK Group of Companies', industry: 'home', label: 'Plumbing & electricals', url: 'https://www.instagram.com/mpk_electrical_plumbing/', linkLabel: 'Instagram' },
  { name: 'Hotel Mudaliyar', industry: 'food', label: 'Restaurant' },
  { name: 'ArasiyalToday', industry: 'edu', label: 'Digital promotion' },
  { name: 'Krishna Eye Care', industry: 'health', label: 'Healthcare' },
  { name: 'Xpress Motors', industry: 'auto', label: 'Tata commercial vehicles · Nagercoil & Marthandam' },
  { name: 'VAK Architects & Interiors', industry: 'home', label: 'Architecture & interiors' },
  { name: '3D Wheel Alignment & Tyre Point', industry: 'auto', label: 'Tyres & wheel alignment · Madurai' },
  { name: 'Aadukalam Agri Tourism Park', industry: 'travel', label: 'Agri-tourism' },
  { name: 'Kaniyan Books / Kaniyan IAS Academy', industry: 'edu', label: 'Education', url: 'https://www.kaniyanbooks.in/', linkLabel: 'Website' },
  { name: 'K Media Photography', industry: 'photo', label: 'Photography' },
  { name: 'OSD Photography', industry: 'photo', label: 'Photography' },
  { name: 'Christ Holidays and Travels Pvt Ltd', industry: 'travel', label: 'Travel agency · Salem', url: 'https://christholidaystravels.com/', linkLabel: 'Website' },
  { name: '32 Sparkles Dental Clinic', industry: 'health', label: 'Dental clinic · Kochi', url: 'https://32sparklesdental.com/', linkLabel: 'Website' },
  { name: 'NAS Catering College', industry: 'edu', label: 'Catering & hotel management college · Madurai', url: 'https://www.nascollegemadurai.com/', linkLabel: 'Website' },
  { name: '3D Security Solutions', industry: 'security', label: 'CCTV & security systems · Madurai', url: 'https://www.3dsecuritysolutions.com/', linkLabel: 'Website' },
]

/** How the GBP work runs month to month (matches the work logged in the client reports above). */
export const PF_PROCESS = [
  { title: 'Audit & baseline', text: 'We audit your Google Business Profile, website and top competitors, and record where you rank today for 20 target keywords.' },
  { title: 'Fix the foundations', text: 'Categories, services, description, hours, phone, website link and attributes: set up so Google understands what you do and where.' },
  { title: 'Post, reply & publish', text: 'Regular GBP posts, replies to every review and, on SEO plans, website pages and blogs that target the same keywords.' },
  { title: 'Track & report', text: 'We re-check your rankings against the baseline and report honestly on what moved, what didn’t and what we do next.' },
]
