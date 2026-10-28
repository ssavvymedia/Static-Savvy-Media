import CityLandingTemplate from '../../templates/CityLandingTemplate.jsx'
import { getCityPage } from '../../data/cityPages.js'

/** One component for every /locations/<city>/ landing page; content lives in src/data/cityPages.js. */
export default function CityLanding({ slug }) {
  const city = getCityPage(slug)
  if (!city) return null
  return <CityLandingTemplate city={city} />
}
