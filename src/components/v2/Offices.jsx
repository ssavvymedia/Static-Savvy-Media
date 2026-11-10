import { Link } from 'react-router-dom'
import { WHATSAPP_NUMBER, MALAYSIA_OFFICE } from '../../utils/constants.js'
import '../../styles/pages/page-v2.css'

/* The three real offices (addresses match the GBP / LocalBusiness data in seoConfig + constants). */
export const OFFICES = [
  {
    key: 'madurai', tag: 'Head office', name: 'Madurai HQ', to: '/locations/madurai/',
    lines: ['2nd Floor, 4/3, Srinivasa Perumal Koil St', 'Kamarajar Salai, Madurai 625009', 'Tamil Nadu, India'],
    phone: { label: `Call / WhatsApp ${WHATSAPP_NUMBER}`, href: 'tel:+919944040345' },
    hours: 'Mon–Sat, 9:00 AM – 6:30 PM IST',
    map: '2nd Floor, 4/3, Srinivasa Perumal Koil St, Kamarajar Salai, Madurai 625009',
  },
  {
    key: 'thoothukudi', tag: 'Office', name: 'Thoothukudi', to: '/locations/thoothukudi/',
    lines: ['90, Peria Kadai St, Matha Koil', 'Thoothukudi 628001', 'Tamil Nadu, India'],
    phone: { label: `Call / WhatsApp ${WHATSAPP_NUMBER}`, href: 'tel:+919944040345' },
    hours: 'By appointment',
    map: '90, Peria Kadai St, Matha Koil, Thoothukudi 628001',
  },
  {
    key: 'rawang', tag: 'Malaysia office', name: 'Rawang, Selangor', to: '/locations/malaysia/',
    lines: [MALAYSIA_OFFICE.streetAddress, `${MALAYSIA_OFFICE.postalCode} ${MALAYSIA_OFFICE.addressLocality}, ${MALAYSIA_OFFICE.addressRegion}`, `Malaysia · ${MALAYSIA_OFFICE.landmark}`],
    phone: { label: `Call ${MALAYSIA_OFFICE.phoneDisplay}`, href: MALAYSIA_OFFICE.phoneHref },
    hours: MALAYSIA_OFFICE.hoursDisplay,
    map: `${MALAYSIA_OFFICE.streetAddress}, ${MALAYSIA_OFFICE.postalCode} ${MALAYSIA_OFFICE.addressLocality}, ${MALAYSIA_OFFICE.addressRegion}, Malaysia`,
  },
]

export default function Offices({ title = 'Three offices, one team.', eyebrow = 'Our offices', maps = false, id = 'offices' }) {
  return (
    <section className="hv2 hv2-section pv2-sec" data-section="offices" aria-labelledby={`${id}-title`}>
      <div className="hv2-wrap">
        <span className="hv2-eyebrow">{eyebrow}</span>
        <h2 className="hv2-h2" id={`${id}-title`}>{title}</h2>
        <ul className="pv2-offices">
          {OFFICES.map((o) => (
            <li key={o.key} className="pv2-office">
              {maps && (
                <iframe className="pv2-map" title={`Map: Static Savvy Media ${o.name}`} src={`https://www.google.com/maps?q=${encodeURIComponent(o.map)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" width="600" height="220" />
              )}
              <div className="pv2-office__body">
                <span className="pv2-tag">{o.tag}</span>
                <h3>{o.name}</h3>
                <address>{o.lines.map((l) => <span key={l}>{l}</span>)}</address>
                <p className="pv2-office__meta">{o.hours}</p>
                <div className="pv2-office__links">
                  <a href={o.phone.href}>{o.phone.label}</a>
                  <Link to={o.to}>Office page →</Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
