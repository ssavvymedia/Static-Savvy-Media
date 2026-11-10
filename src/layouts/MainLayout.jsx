import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/common/Header.jsx'
import Footer from '../components/common/Footer.jsx'
import BackToTop from '../components/common/BackToTop.jsx'
import WhatsAppButton from '../components/common/WhatsAppButton.jsx'
import SEO from '../utils/seo.js'
import { cx } from '../utils/helpers.js'

export default function MainLayout({ className = '', afterOutlet = null }) {
  return (
    <div className={cx('site', className)}>
      <SEO />
      <Header />
      <main className="site__main">
        {/* Route chunks (src/routes/lazyPage.js): server HTML stays until the page chunk loads. */}
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
        {afterOutlet}
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  )
}