import LocalServicePage from '../../../templates/LocalServicePage.jsx'
import { serviceSchema } from '../../../utils/schema.js'
import { SITE_URL, GOOGLE_TRUST_LINE } from '../../../utils/constants.js'
import { content as base, PATH, DESCRIPTION } from '../../../data/pages/advertisingAgencyMadurai.js'

const content = {
  ...base,
  trust: GOOGLE_TRUST_LINE,
  schema: [
    serviceSchema({
      name: 'Digital Advertising in Madurai',
      serviceType: 'Online advertising (Google Ads, Meta Ads, YouTube Ads)',
      description: DESCRIPTION,
      url: `${SITE_URL}${PATH}`,
      areaServed: 'Madurai, Tamil Nadu',
    }),
  ],
}

export default function AdvertisingAgency_Madurai() {
  return <LocalServicePage content={content} />
}
