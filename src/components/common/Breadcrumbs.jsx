import { Link, useLocation } from 'react-router-dom'
import { getBreadcrumbLabel } from '../../data/navigation.js'
import { titleCase } from '../../utils/helpers.js'

export default function Breadcrumbs() {
  const { pathname } = useLocation()
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0) {
    return null
  }

  const crumbs = segments.map((segment, index) => ({
    path: `/${segments.slice(0, index + 1).join('/')}`,
    label: getBreadcrumbLabel(segment) || titleCase(segment),
    isLast: index === segments.length - 1,
  }))

  return (
    <nav className="container" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/">Home</Link>
        </li>
        {crumbs.map((crumb) => {
          const isBasePricing = crumb.path === '/pricing'
          return (
            <li key={crumb.path} className="breadcrumbs__item">
              {crumb.isLast ? (
                <span aria-current="page">{crumb.label}</span>
              ) : isBasePricing ? (
                <span>{crumb.label}</span>
              ) : (
                <Link to={`${crumb.path}/`}>{crumb.label}</Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}