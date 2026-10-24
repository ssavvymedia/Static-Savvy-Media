import { getStaticBlogImage } from '../../data/blogImages.js'

/** Featured image (1200x630) for a hard-coded blog post. */
export default function BlogFeaturedImage({ slug }) {
  const img = getStaticBlogImage(slug)
  if (!img) return null
  return (
    <div className="container">
      <figure className="blog-post-cover" style={{ margin: '0 auto 2rem', maxWidth: '1000px' }}>
        <picture>
          <source srcSet={img.src} type="image/webp" />
          <img src={img.jpg} alt={img.alt} width={1200} height={630} style={{ width: '100%', height: 'auto', borderRadius: '16px' }} />
        </picture>
      </figure>
    </div>
  )
}
