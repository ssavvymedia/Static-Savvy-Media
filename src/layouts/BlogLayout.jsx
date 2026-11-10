import { useLocation } from 'react-router-dom'
import MainLayout from './MainLayout.jsx'
import AuthorBox from '../components/blog/AuthorBox.jsx'
import { AuditBlock } from '../components/v2/V2Blocks.jsx'

/* Posts that already place their own Growth Audit form inside the article. */
const HAS_OWN_AUDIT = new Set(['/blog/seo/', '/blog/seo-agency-madurai-complete-guide/', '/blog/top-digital-marketing-companies-in-madurai/'])

/* Default audit-form city from the post slug (visitors can change it). */
function cityForSlug(slug) {
  if (/malaysia|selangor|rawang|kuala-lumpur|shah-alam|petaling|klang/.test(slug)) {
    if (/rawang/.test(slug)) return 'Rawang'
    if (/kuala-lumpur/.test(slug)) return 'Kuala Lumpur'
    if (/selangor|shah-alam|petaling/.test(slug)) return 'Other Selangor'
    return 'Other Malaysia'
  }
  for (const [k, v] of [['thoothukudi', 'Thoothukudi'], ['chennai', 'Chennai'], ['coimbatore', 'Coimbatore'], ['trichy', 'Trichy'], ['tirunelveli', 'Tirunelveli'], ['madurai', 'Madurai']]) {
    if (slug.includes(k)) return v
  }
  return ''
}

/* Blog routes: every post (not the /blog/ index) ends with the Growth Audit form and the founder's author box. */
export default function BlogLayout() {
  const { pathname } = useLocation()
  const m = pathname.match(/^\/blog\/([^/]+)\/?$/)
  const path = m ? `/blog/${m[1]}/` : ''
  const after = m ? (
    <>
      {!HAS_OWN_AUDIT.has(path) && (
        <AuditBlock
          formId={`growth_audit_blog_${m[1].replace(/-/g, '_')}`.slice(0, 80)}
          defaultCity={cityForSlug(m[1])}
          eyebrow="Free Growth Audit"
          title="Want this done for your business?"
          lead="Send your website or Google Business Profile. We review your SEO, Google Maps, AI search presence and competitors, then reply with what to fix first. Prepared by our team, not an automated score."
          cover={false}
        />
      )}
      <AuthorBox />
    </>
  ) : null
  return <MainLayout className="layout--blog" afterOutlet={after} />
}
