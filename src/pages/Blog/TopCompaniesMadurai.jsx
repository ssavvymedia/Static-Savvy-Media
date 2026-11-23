import { Link } from 'react-router-dom'
import BlogFeaturedImage from '../../components/blog/BlogFeaturedImage.jsx'
import LocalServicePage from '../../templates/LocalServicePage.jsx'
import { SITE_URL, SITE_NAME } from '../../utils/constants.js'
import { content as base, PATH, DESCRIPTION, UPDATED } from '../../data/pages/topCompaniesMadurai.js'

const content = {
  ...base,
  intro: [
    <>
      Disclosure first: this comparison is written by Static Savvy Media, one of the agencies listed, and we have not ranked anyone. If you are hiring, the service page is our <Link to="/locations/madurai/">digital marketing agency in Madurai</Link> page. Search-only work is on <Link to="/services/seo/madurai/">SEO company in Madurai</Link>. Other companies below are described from their own websites and public Google listings.
    </>,
    ...base.intro.slice(1),
  ],
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: base.h1,
      description: DESCRIPTION,
      url: `${SITE_URL}${PATH}`,
      datePublished: '2026-10-22',
      dateModified: UPDATED,
      about: { '@type': 'Thing', name: 'Digital marketing companies in Madurai' },
      author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    },
  ],
}

export default function TopCompaniesMadurai() {
  return (
    <>
      <LocalServicePage content={content} />
      <BlogFeaturedImage slug="top-digital-marketing-companies-in-madurai" />
    </>
  )
}
