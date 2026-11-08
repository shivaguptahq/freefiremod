import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getFallbackIcon } from '../data/apkStore.js'
import ApkDownloadButton from './ApkDownloadButton.jsx'
import useViewportWidth from './useViewportWidth.js'
import { apkColors, getApkLayout } from './apkStoreStyles.js'

export default function ApkStoreCard({ app }) {
  const [hovered, setHovered] = useState(false)
  const width = useViewportWidth()
  const { isTiny } = getApkLayout(width)
  const detailPath = `/apkstore/${app.slug}`
  const iconSize = isTiny ? 64 : 72

  const cardStyle = {
    padding: '0.9rem',
    border: `1px solid ${hovered ? 'rgba(37, 99, 235, 0.28)' : apkColors.border}`,
    borderRadius: 18,
    background: `linear-gradient(180deg, ${apkColors.cardTop}, ${apkColors.cardBottom})`,
    boxShadow: hovered ? '0 14px 30px rgba(2, 6, 23, 0.16)' : '0 10px 24px rgba(2, 6, 23, 0.12)',
    transform: hovered ? 'translateY(-1px)' : 'none',
    transition: 'transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
    minWidth: 0,
    boxSizing: 'border-box',
  }
  const mainStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.9rem',
    minWidth: 0,
    color: 'inherit',
    textDecoration: 'none',
  }
  const iconStyle = {
    width: iconSize,
    height: iconSize,
    flex: '0 0 auto',
    borderRadius: 16,
    background: '#101f3d',
    border: `1px solid ${apkColors.border}`,
    objectFit: 'cover',
    display: 'block',
  }
  const contentStyle = { minWidth: 0, flex: 1 }
  const titleStyle = {
    margin: 0,
    color: apkColors.text,
    fontWeight: 800,
    letterSpacing: '-0.02em',
    fontSize: width <= 360 ? '1rem' : '1.08rem',
    lineHeight: 1.25,
    overflowWrap: 'anywhere',
  }
  const sizeStyle = { margin: '0.28rem 0 0', color: apkColors.secondary, fontSize: '0.94rem', fontWeight: 600 }
  const ctaStyle = { marginTop: '0.75rem', paddingLeft: `calc(${iconSize}px + 0.9rem)`, minWidth: 0 }

  return (
    <article style={cardStyle} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Link style={mainStyle} to={detailPath} aria-label={`Open ${app.title} details`}>
        <img
          style={iconStyle}
          src={app.icon}
          alt={`${app.title} app icon`}
          width={iconSize}
          height={iconSize}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = getFallbackIcon(app.title)
          }}
        />
        <div style={contentStyle}>
          <h2 style={titleStyle}>{app.title}</h2>
          <p style={sizeStyle}>{app.size}</p>
        </div>
      </Link>
      <div style={ctaStyle}>
        <ApkDownloadButton app={app} compact stopPropagation />
      </div>
    </article>
  )
}
