/* Founder (E-E-A-T) facts. Plain data: used by React pages and the build-time SSR/JSON-LD step.
 * sameAs = only the founder profiles already linked from /about/deepan-kanz/ (Founder.jsx). */
export const FOUNDER = {
  name: 'Deepan Kanz',
  jobTitle: 'Founder',
  role: 'Founder & AI Search Specialist',
  path: '/about/deepan-kanz/',
  imagePath: '/images/deepan-kanz-founder.webp',
  bio: 'Deepan Kanz founded Static Savvy Media in Madurai, India, in October 2021. He leads SEO, Local SEO and AI search (GEO and AEO) strategy for clients in Tamil Nadu and Malaysia and reviews every new client’s plan himself.',
  sameAs: [
    'https://www.linkedin.com/in/deepankanz/',
    'https://www.instagram.com/deepankanz',
    'https://www.facebook.com/deepankanz',
    'https://x.com/deepankanz',
  ],
  knowsAbout: ['Search engine optimization', 'Local SEO', 'Google Business Profile', 'Generative Engine Optimization', 'Answer Engine Optimization', 'Google Ads', 'Digital marketing'],
}

export const founderId = (host) => `${host}${FOUNDER.path}#person`

/** schema.org Person node for the founder (use { '@id': founderId(host) } to reference it). */
export const founderPerson = (host) => ({
  '@type': 'Person',
  '@id': founderId(host),
  name: FOUNDER.name,
  jobTitle: FOUNDER.jobTitle,
  description: FOUNDER.bio,
  image: `${host}${FOUNDER.imagePath}`,
  url: `${host}${FOUNDER.path}`,
  worksFor: { '@id': `${host}/#organization` },
  sameAs: FOUNDER.sameAs,
  knowsAbout: FOUNDER.knowsAbout,
})
