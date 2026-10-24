import BlogFeaturedImage from '../../components/blog/BlogFeaturedImage.jsx'
import LocalServicePage from '../../templates/LocalServicePage.jsx'
import { SITE_URL, SITE_NAME } from '../../utils/constants.js'
import { content as base, PATH, DESCRIPTION } from '../../data/pages/topCompaniesMadurai.js'

const content = {
  ...base,
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: base.h1,
      description: DESCRIPTION,
      url: `${SITE_URL}${PATH}`,
      datePublished: '2026-10-22',
      dateModified: '2026-10-22',
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
