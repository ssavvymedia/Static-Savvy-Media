import { useLocation } from 'react-router-dom'
import MainLayout from './MainLayout.jsx'
import AuthorBox from '../components/blog/AuthorBox.jsx'

/* Blog routes: every post (not the /blog/ index) ends with the founder's author box. */
export default function BlogLayout() {
  const { pathname } = useLocation()
  const isPost = /^\/blog\/[^/]+\/?$/.test(pathname)
  return <MainLayout className="layout--blog" afterOutlet={isPost ? <AuthorBox /> : null} />
}
