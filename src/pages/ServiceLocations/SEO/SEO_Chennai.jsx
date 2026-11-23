import LocalServicePage from '../../../templates/LocalServicePage.jsx'
import { serviceSchema } from '../../../utils/schema.js'
import { SITE_URL } from '../../../utils/constants.js'
import { content as base, PATH, DESCRIPTION } from '../../../data/pages/seoChennai.js'

const content = {
  ...base,
  schema: [
    serviceSchema({
      '@id': `${SITE_URL}${PATH}#service`,
      name: 'SEO services in Chennai',
      serviceType: 'Search engine optimization',
      description: DESCRIPTION,
      url: `${SITE_URL}${PATH}`,
      areaServed: { '@type': 'City', name: 'Chennai', containedInPlace: { '@type': 'State', name: 'Tamil Nadu' } },
      provider: { '@id': `${SITE_URL}/locations/madurai/#localbusiness` },
    }),
  ],
}

export default function SEO_Chennai() {
  return <LocalServicePage content={content} />
}
