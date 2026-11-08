import { Link } from 'react-router-dom'
import { useDocumentMeta } from './useDocumentMeta.js'
import '../styles/legal.css'

export default function PageShell({
  title,
  description,
  updated,
  breadcrumbs = [],
  children,
  canonical,
  hideHeader = false,
}) {
  useDocumentMeta(title, description, canonical)

  return (
    <main className="page-main">
      <div className="page-wrap">
        {breadcrumbs.length > 0 ? (
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              {breadcrumbs.map((item, index) => (
                <li key={item.to ?? item.label}>
                  {item.to && index < breadcrumbs.length - 1 ? (
                    <Link to={item.to}>{item.label}</Link>
                  ) : (
                    <span aria-current="page">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        {!hideHeader ? (
          <header className="page-header">
            <h1 className="page-title">{title}</h1>
            {description ? <p className="page-lead">{description}</p> : null}
            {updated ? <p className="page-updated">Last updated: {updated}</p> : null}
          </header>
        ) : null}

        <article className="page-article">{children}</article>
      </div>
    </main>
  )
}

export function LegalNotice({ children }) {
  return <p className="legal-notice">{children}</p>
}

export function Section({ title, children }) {
  return (
    <section className="legal-section">
      <h2>{title}</h2>
      {children}
    </section>
  )
}
