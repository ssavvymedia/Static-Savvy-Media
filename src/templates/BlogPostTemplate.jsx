import Breadcrumbs from '../components/common/Breadcrumbs.jsx'
import HeroSection from '../components/hero/HeroSection.jsx'
import RelatedPosts from '../components/sections/RelatedPosts.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { getBlogPostBySlug } from '../data/blog.js'

/**
 * T09 — BlogPostTemplate.
 * Individual blog articles. Article body is added in the content phase.
 */
export default function BlogPostTemplate({ slug }) {
  const post = getBlogPostBySlug(slug)

  return (
    <div className="blog-template">
      <Breadcrumbs />
      <HeroSection eyebrow="Blog" title={post?.name} />
      <article className="container section blog-template__body" />
      <RelatedPosts currentSlug={slug} />
      <CTASection title="Need Help Implementing This?" />
    </div>
  )
}