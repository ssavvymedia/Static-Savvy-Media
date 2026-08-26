import BlogCard from '../cards/BlogCard.jsx'
import SectionHeading from '../common/SectionHeading.jsx'
import { blogPosts, getBlogCategoryBySlug } from '../../data/blog.js'

export default function RelatedPosts({ currentSlug }) {
  const related = blogPosts.filter((post) => post.slug !== currentSlug).slice(0, 3)

  return (
    <section className="section related-section">
      <div className="container">
        <SectionHeading title="Related Articles" />
        <div className="grid grid--3">
          {related.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
              category={getBlogCategoryBySlug(post.category)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}