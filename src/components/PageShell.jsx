import { Link } from 'react-router-dom'
import { useDocumentMeta } from './useDocumentMeta.js'

const shellStyle = {
  background: '#0b1933',
  color: '#f8fafc',
}
const wrapStyle = {
  width: 'min(100%, 920px)',
  margin: '0 auto',
  padding: 'clamp(6.25rem, 10vw, 7.5rem) clamp(1rem, 3vw, 2rem) clamp(3rem, 6vw, 4.5rem)',
}
const breadcrumbNavStyle = { marginBottom: '1.25rem' }
const breadcrumbListStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.35rem',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  color: '#71829f',
  fontSize: '0.88rem',
}
const breadcrumbItemStyle = { display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }
const breadcrumbLinkStyle = {
  color: '#a8b5cc',
  transition: 'color 160ms ease',
}
const headerStyle = {
  marginBottom: '1.75rem',
  paddingBottom: '1.25rem',
  borderBottom: '1px solid rgba(148, 163, 184, 0.14)',
}
const titleStyle = {
  margin: 0,
  color: '#f8fafc',
  fontSize: 'clamp(2rem, 4.5vw, 3rem)',
  fontWeight: 900,
  letterSpacing: '-0.03em',
  lineHeight: 1.08,
}
const leadStyle = {
  margin: '0.85rem 0 0',
  maxWidth: '65ch',
  color: '#a8b5cc',
  fontSize: '1.02rem',
  lineHeight: 1.7,
}
const updatedStyle = {
  margin: '0.85rem 0 0',
  color: '#71829f',
  fontSize: '0.88rem',
}
const articleStyle = { display: 'grid', gap: '1.35rem' }

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
    <main style={shellStyle}>
      <div style={wrapStyle}>
        {breadcrumbs.length > 0 ? (
          <nav style={breadcrumbNavStyle} aria-label="Breadcrumb">
            <ol style={breadcrumbListStyle}>
              {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1
                return (
                  <li key={item.to ?? item.label} style={breadcrumbItemStyle}>
                    {item.to && !isLast ? (
                      <Link to={item.to} style={breadcrumbLinkStyle}>
                        {item.label}
                      </Link>
                    ) : (
                      <span aria-current="page">{item.label}</span>
                    )}
                    {!isLast ? (
                      <span aria-hidden="true" style={{ color: 'rgba(148, 163, 184, 0.45)' }}>
                        /
                      </span>
                    ) : null}
                  </li>
                )
              })}
            </ol>
          </nav>
        ) : null}

        {!hideHeader ? (
          <header style={headerStyle}>
            <h1 style={titleStyle}>{title}</h1>
            {description ? <p style={leadStyle}>{description}</p> : null}
            {updated ? <p style={updatedStyle}>Last updated: {updated}</p> : null}
          </header>
        ) : null}

        <article style={articleStyle}>{children}</article>
      </div>
    </main>
  )
}

export function LegalNotice({ children }) {
  return (
    <p
      style={{
        margin: 0,
        padding: '1rem 1.1rem',
        border: '1px solid rgba(37, 99, 235, 0.22)',
        borderRadius: 14,
        background: 'rgba(37, 99, 235, 0.08)',
        color: '#dbeafe',
        fontSize: '0.95rem',
        lineHeight: 1.7,
      }}
    >
      {children}
    </p>
  )
}

const contentStyle = {
  color: '#a8b5cc',
  fontSize: '0.98rem',
  lineHeight: 1.75,
  display: 'grid',
  gap: '0.85rem',
}

export function Section({ title, children }) {
  return (
    <section
      style={{
        padding: '1.15rem 1.15rem 1.2rem',
        border: '1px solid rgba(148, 163, 184, 0.12)',
        borderRadius: 16,
        background: 'rgba(16, 31, 61, 0.42)',
      }}
    >
      <h2
        style={{
          margin: '0 0 0.7rem',
          color: '#f8fafc',
          fontSize: '1.18rem',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.3,
        }}
      >
        {title}
      </h2>
      <div style={contentStyle}>{children}</div>
    </section>
  )
}