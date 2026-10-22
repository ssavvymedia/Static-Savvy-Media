import LocalServicePage from '../../templates/LocalServicePage.jsx'
import { serviceSchema } from '../../utils/schema.js'
import { SITE_URL, GOOGLE_TRUST_LINE } from '../../utils/constants.js'
import { content as base, PATH, DESCRIPTION } from '../../data/pages/tamilNadu.js'

const content = {
  ...base,
  trust: GOOGLE_TRUST_LINE,
  schema: [
    serviceSchema({
      name: 'Digital Marketing in Tamil Nadu',
      serviceType: 'Digital marketing',
      description: DESCRIPTION,
      url: `${SITE_URL}${PATH}`,
      areaServed: 'Tamil Nadu, India',
    }),
  ],
}

export default function TamilNadu() {
  return <LocalServicePage content={content} />
}
