import { useLocation } from 'react-router-dom'

function normalize(path) {
  return path.replace(/\/+$/, '') || '/'
}

export function useActiveRoute() {
  const { pathname } = useLocation()
  const current = normalize(pathname)

  function isActive(path) {
    const target = normalize(path)
    if (target === '/') return current === '/'
    return current === target || current.startsWith(target + '/')
  }

  function isExactActive(path) {
    return current === normalize(path)
  }

  return { isActive, isExactActive, pathname: current }
}
