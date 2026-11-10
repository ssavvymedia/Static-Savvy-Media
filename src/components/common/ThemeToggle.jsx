/* Light / dark switch. The theme lives on <html data-theme> (set before first paint by the inline
 * script in index.html) and in localStorage "ssm-theme". Icons swap in CSS from the attribute, so the
 * server render and the hydrated markup are identical whatever theme the visitor uses. */
export default function ThemeToggle({ className = '' }) {
  const toggle = () => {
    const root = document.documentElement
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light'
    root.setAttribute('data-theme', next)
    try { localStorage.setItem('ssm-theme', next) } catch { /* private mode: theme still applies for this page */ }
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', next === 'light' ? '#faf8f5' : '#060a17')
  }
  return (
    <button type="button" className={`theme-toggle ${className}`.trim()} onClick={toggle} aria-label="Switch between light and dark theme" title="Light / dark theme">
      <svg className="theme-toggle__moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
      <svg className="theme-toggle__sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
    </button>
  )
}
