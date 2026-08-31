import { Outlet } from 'react-router-dom'
import Header from '../components/common/Header.jsx'
import Footer from '../components/common/Footer.jsx'
import BackToTop from '../components/common/BackToTop.jsx'
import WhatsAppButton from '../components/common/WhatsAppButton.jsx'
import SEO from '../utils/seo.js'
import { cx } from '../utils/helpers.js'

export default function MainLayout({ className = '' }) {
  return (
    <div className={cx('site', className)}>
      <SEO />
      <Header />
      <main className="site__main">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  )
}