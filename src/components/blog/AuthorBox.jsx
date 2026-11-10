import { Link } from 'react-router-dom'
import founderImg from '../../assets/images/About/DeepanFounder.webp'
import { FOUNDER } from '../../data/founder.js'
import '../../styles/author-box.css'

/** "Written by" box shown on every blog post (rendered by BlogLayout). */
export default function AuthorBox() {
  return (
    <aside className="author-box" aria-label="About the author" data-section="author-box">
      <div className="author-box__inner">
        <img src={founderImg} width={740} height={941} loading="lazy" decoding="async" alt={`${FOUNDER.name}, ${FOUNDER.role} at Static Savvy Media`} className="author-box__img" />
        <div>
          <p className="author-box__eyebrow">Written &amp; reviewed by</p>
          <p className="author-box__name">
            <Link to={FOUNDER.path} rel="author">{FOUNDER.name}</Link>
            <span>{FOUNDER.role}, Static Savvy Media</span>
          </p>
          <p className="author-box__bio">{FOUNDER.bio}</p>
          <p className="author-box__links">
            <Link to={FOUNDER.path}>About Deepan</Link>
            <Link to="/about/">About Static Savvy Media</Link>
            <a href={FOUNDER.sameAs[0]} target="_blank" rel="noopener noreferrer me">LinkedIn</a>
          </p>
        </div>
      </div>
    </aside>
  )
}
