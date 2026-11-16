import { Link } from 'react-router-dom'
import { apkColors } from './apkStoreStyles.js'

export default function Breadcrumbs({ items = [] }) {
  if (!Array.isArray(items) || items.length === 0) return null

  const navStyle = {
    marginBottom: '0.5rem',
  }
  const listStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '0.35rem',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    fontSize: '14px',
    lineHeight: 1.4,
  }
  const linkStyle = {
    color: apkColors.secondary,
    textDecoration: 'none',
  }
  const currentStyle = {
    color: apkColors.text,
  }
  const sepStyle = {
    color: apkColors.muted,
  }

  return (
    <nav aria-label="Breadcrumb" style={navStyle}>
      <ol style={listStyle}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.path}-${index}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', minWidth: 0 }}>
              {index > 0 ? <span aria-hidden="true" style={sepStyle}>/</span> : null}
              {isLast ? (
                <span aria-current="page" style={currentStyle}>{item.name}</span>
              ) : (
                <Link to={item.path} style={linkStyle}>{item.name}</Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
