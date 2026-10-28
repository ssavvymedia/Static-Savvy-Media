import { useLocation } from 'react-router-dom'
import { buildWhatsAppLink } from '../../utils/helpers.js'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, MALAYSIA_OFFICE } from '../../utils/constants.js'

// Routes whose floating button opens the Malaysia (+60) WhatsApp line instead of the Indian one.
const MY_WHATSAPP_ROUTES = ['/locations/selangor']

export default function WhatsAppButton() {
  const { pathname } = useLocation()
  const isMy = MY_WHATSAPP_ROUTES.some((r) => pathname === r || pathname.startsWith(`${r}/`))
  const href = buildWhatsAppLink(isMy ? MALAYSIA_OFFICE.phoneE164 : WHATSAPP_NUMBER, WHATSAPP_MESSAGE)

  return (
    <a
      className="whatsapp-btn"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Static Savvy Media on WhatsApp"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.83 14.12c-.25.7-1.44 1.33-2.01 1.39-.51.05-1.16.08-1.87-.12-.44-.12-1-.29-1.71-.56-3.01-1.3-4.98-4.33-5.13-4.53-.15-.2-1.22-1.63-1.22-3.1 0-1.48.77-2.2 1.05-2.5.28-.3.6-.38.8-.38h.58c.19 0 .44-.07.68.52.25.6.85 2.08.93 2.23.07.15.13.33.03.53-.1.2-.15.33-.3.5-.15.18-.32.4-.45.53-.15.15-.31.32-.13.62.18.3.79 1.3 1.7 2.11 1.17 1.04 2.15 1.36 2.45 1.52.3.15.48.13.66-.08.18-.2.76-.89.96-1.19.2-.3.4-.25.67-.15.28.1 1.75.83 2.05.98.3.15.5.22.58.35.07.12.07.73-.18 1.4Z" />
      </svg>
    </a>
  )
}