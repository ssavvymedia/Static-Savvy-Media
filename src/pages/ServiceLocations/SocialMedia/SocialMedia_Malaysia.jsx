import LocalServicePage from '../../../templates/LocalServicePage.jsx'
import { serviceSchema } from '../../../utils/schema.js'
import { SITE_URL } from '../../../utils/constants.js'
import { content as base, PATH, DESCRIPTION } from '../../../data/pages/socialMediaMalaysia.js'

const content = {
  ...base,
  schema: [
    serviceSchema({
      '@id': `${SITE_URL}${PATH}#service`,
      name: 'Social media marketing in Malaysia',
      serviceType: 'Social media marketing',
      description: DESCRIPTION,
      url: `${SITE_URL}${PATH}`,
      areaServed: { '@type': 'Country', name: 'Malaysia' },
      provider: { '@id': `${SITE_URL}/locations/madurai/#localbusiness` },
    }),
  ],
}

export default function SocialMedia_Malaysia() {
  return <LocalServicePage content={content} />
}
