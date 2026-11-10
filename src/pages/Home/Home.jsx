import { useEffect } from 'react'
import HomeV2 from '../../templates/HomeV2.jsx'
import CountrySuggestion from '../../components/common/CountrySuggestion.jsx'
import { setSeo } from '../../utils/seo.js'
import { homeSchemaGraph } from '../../data/pages/homeContent.js'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, SITE_URL } from '../../utils/constants.js'

/* Title/description live in seoConfig['/'] (also baked into the raw HTML at build time).
 * v2 homepage (approved 10 Nov 2026): src/templates/HomeV2.jsx. */

export default function Home() {

  useEffect(() => {
    // One JSON-LD graph (Organization with areaServed + Madurai HQ + WebSite + FAQPage), identical to
    // the one baked into the raw HTML; setSeo() writes it to script#json-ld-schema (no duplicates).
    /* Title/description come from the prerendered head on first load and from the layout's
     * useRouteSEO() on client navigation; Home only owns its JSON-LD graph. */
    setSeo({
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content,
      canonical: `${SITE_URL}/`,
      ogType: 'website',
      schema: homeSchemaGraph,
    })
  }, [])

  const whatsappHref = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)

  return (
    <>
      <HomeV2 whatsappHref={whatsappHref} />
      <CountrySuggestion />
    </>
  )
}
