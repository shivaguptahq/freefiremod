import { useState } from 'react'
import { DownloadIcon } from './Icons.jsx'

function toSafeFilename(value) {
  const base = (value || 'download').replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '')
  return base.toLowerCase().endsWith('.apk') ? base : `${base || 'download'}.apk`
}

function getDownloadFileName(app) {
  if (app?.downloadFileName) return toSafeFilename(app.downloadFileName)
  const parts = [app?.title, app?.version].filter(Boolean).join('-')
  return toSafeFilename(parts || app?.slug || 'app')
}

export default function ApkDownloadButton({ app, compact = false, stopPropagation = false }) {
  const [hovered, setHovered] = useState(false)
  const available = Boolean(app?.apkFile && app?.fileSizeBytes > 0 && app?.apkAvailable && !app?.isDemo)
  const filename = getDownloadFileName(app)

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.45rem',
    minHeight: compact ? 38 : 48,
    width: compact ? 'auto' : '100%',
    maxWidth: compact ? 'none' : 420,
    padding: compact ? '0.62rem 0.9rem' : '0.72rem 1rem',
    borderRadius: 999,
    border: '1px solid transparent',
    font: 'inherit',
    fontSize: compact ? '0.88rem' : '0.92rem',
    fontWeight: 700,
    lineHeight: 1,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    transition: 'filter 160ms ease, transform 160ms ease, border-color 160ms ease',
  }
  const enabledStyle = {
    ...baseStyle,
    background: '#2563eb',
    color: '#f8fafc',
    cursor: 'pointer',
    transform: hovered ? 'translateY(-1px)' : 'none',
    filter: hovered ? 'brightness(1.06)' : 'none',
  }
  const disabledStyle = {
    ...baseStyle,
    cursor: 'not-allowed',
    background: 'rgba(148, 163, 184, 0.14)',
    color: '#a8b5cc',
    border: '1px solid rgba(148, 163, 184, 0.12)',
  }
  const wrapStyle = { width: compact ? 'auto' : '100%', minWidth: 0 }

  function onClick(event) {
    if (stopPropagation) event.stopPropagation()
  }

  if (!available) {
    return (
      <div style={wrapStyle}>
        <button type="button" style={disabledStyle} disabled aria-label="Download currently unavailable">
          <DownloadIcon size={compact ? 16 : 18} />
          <span>Download Currently Unavailable</span>
        </button>
      </div>
    )
  }

  return (
    <div style={wrapStyle}>
      <a
        style={enabledStyle}
        href={app.apkFile}
        download={filename}
        rel="noopener"
        target="_self"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={`Download ${app?.title || 'APK'} as ${filename}`}
      >
        <DownloadIcon size={compact ? 16 : 18} />
        <span>Download APK</span>
      </a>
    </div>
  )
}
