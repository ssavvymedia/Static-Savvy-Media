import { Link } from 'react-router-dom'
import { cx } from '../../utils/helpers.js'

export default function BlogCard({ post, category, className = '' }) {
  return (
    <article className={cx('blog-card glass-card', className)}>
      {category && <span className="chip blog-card__category">{category?.name}</span>}
      <h3 className="blog-card__title">{post?.name}</h3>
      <Link to={post?.path} className="blog-card__link">
        Read article
      </Link>
    </article>
  )
}