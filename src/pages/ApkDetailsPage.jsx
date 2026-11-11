import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DownloadIcon, PackageIcon, StarIcon, TagIcon } from '../components/Icons.jsx'
import ApkDownloadButton from '../components/ApkDownloadButton.jsx'
import { formatLastUpdated, getApkBySlug, getFallbackIcon, getFallbackScreenshot } from '../data/apkStore.js'
import { useDocumentMeta } from '../components/useDocumentMeta.js'
import useViewportWidth from '../components/useViewportWidth.js'
import { apkColors, getApkLayout } from '../components/apkStoreStyles.js'

function RedirectDownloadButton({ compact }) {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.45rem',
    minHeight: compact ? 38 : 48,
    width: '100%',
    maxWidth: 420,
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
    cursor: 'pointer',
    background: '#2563eb',
    color: '#f8fafc',
    transition: 'filter 160ms ease, transform 160ms ease',
  }
  const wrapStyle = { width: '100%', minWidth: 0 }

  return (
    <div style={wrapStyle}>
      <a
        style={baseStyle}
        href="https://asiafilm.org/4/1c6b892479a76ef79115e63d0da33af9"
        target="_blank"
        rel="noopener"
        aria-label="Download APK"
        onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.06)' }}
        onMouseLeave={(e) => { e.currentTarget.style.filter = 'none' }}
      >
        <DownloadIcon size={compact ? 16 : 18} />
        <span>Download APK</span>
      </a>
    </div>
  )
}

function MetadataBlock({ icon, label, value }) {
  const blockStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.45rem',
    minWidth: 0,
    flex: '1 1 0',
    padding: '0.55rem 0.6rem',
    border: `1px solid ${apkColors.borderSoft}`,
    borderRadius: 12,
    background: apkColors.detailCard,
    boxSizing: 'border-box',
    overflow: 'hidden',
  }
  const iconStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    flex: '0 0 auto',
    borderRadius: 8,
    color: apkColors.green,
    background: 'rgba(37, 99, 235, 0.14)',
    border: '1px solid rgba(37, 99, 235, 0.18)',
  }
  const copyStyle = { minWidth: 0, display: 'grid', gap: '0.08rem' }
  const labelStyle = { color: apkColors.muted, fontSize: '0.64rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }
  const valueStyle = { color: apkColors.text, fontSize: '0.84rem', fontWeight: 700, lineHeight: 1.2, overflowWrap: 'anywhere', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }

  return (
    <div style={blockStyle}>
      <span style={iconStyle} aria-hidden="true">{icon}</span>
      <div style={copyStyle}>
        <span style={labelStyle}>{label}</span>
        <span style={valueStyle} title={value}>{value}</span>
      </div>
    </div>
  )
}

export default function ApkDetailsPage() {
  const { slug } = useParams()
  const [app, setApp] = useState(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const galleryRef = useRef(null)
  const width = useViewportWidth()
const { isTiny, isDesktop } = getApkLayout(width)

  useEffect(() => {
    let active = true
    getApkBySlug(slug)
      .then((data) => {
        if (!active) return
        setApp(data)
        setError('')
      })
      .catch((err) => {
        if (!active) return
        setError(err instanceof Error ? err.message : 'Unable to load app details.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [slug])

  useEffect(() => {
    const el = galleryRef.current
    if (!el) return undefined
    const onWheel = (event) => {
      if (el.scrollWidth <= el.clientWidth) return
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return
      event.preventDefault()
      el.scrollLeft += event.deltaY
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [app])

  useDocumentMeta(
    app?.title || (loading ? 'Loading application' : 'Application Not Found'),
    app?.shortDescription || 'Application details loaded from the project data source.',
    `/apkstore/${slug || ''}`,
  )

  const pageStyle = {
    width: '100%',
    minWidth: 0,
    padding: `calc(var(--nav-height, 80px) + 1rem) ${isTiny ? '0.85rem' : '1rem'} 1.25rem`,
    boxSizing: 'border-box',
  }
  const wrapStyle = { width: '100%', maxWidth: isDesktop ? 1040 : 960, margin: '0 auto', minWidth: 0 }
  const stateStyle = { margin: '0.42rem 0 0', color: apkColors.secondary, fontSize: '0.9rem', lineHeight: 1.5 }
  const errorStyle = { ...stateStyle, color: apkColors.error }

  if (loading) {
    return (
      <main style={pageStyle}><div style={wrapStyle}><p style={stateStyle} role="status">Loading application…</p></div></main>
    )
  }
  if (error) {
    return (
      <main style={pageStyle}><div style={wrapStyle}><p style={errorStyle} role="alert">{error}</p></div></main>
    )
  }
  if (!app) {
    return (
      <main style={pageStyle}><div style={wrapStyle}><p style={errorStyle} role="alert">Application listing not found.</p></div></main>
    )
  }

const screenshots = Array.isArray(app.screenshots) ? app.screenshots.filter(Boolean) : []
  const iconSize = isTiny ? 84 : 92
  const isLandscapeGallery = app.slug === 'dark-aura-mod-menu' || app.slug === 'macro-headshot-panel'
  const shotBasis = isLandscapeGallery
    ? (isDesktop ? 420 : isTiny ? '72vw' : 'clamp(320px, 60vw, 460px)')
    : (isDesktop ? 210 : isTiny ? '46vw' : 'clamp(160px, 42vw, 220px)')

  const heroStyle = { display: 'flex', gap: '1rem', alignItems: isTiny ? 'flex-start' : 'center', minWidth: 0 }
  const iconStyle = {
    width: iconSize,
    height: iconSize,
    flex: '0 0 auto',
    borderRadius: 20,
    background: '#101f3d',
    border: `1px solid ${apkColors.border}`,
    objectFit: 'cover',
    display: 'block',
  }
  const heroCopyStyle = { minWidth: 0 }
  const titleStyle = { margin: 0, color: apkColors.text, fontWeight: 800, letterSpacing: '-0.02em', fontSize: width <= 360 ? '1.45rem' : 'clamp(1.45rem, 4.5vw, 2rem)', lineHeight: 1.12, overflowWrap: 'anywhere' }
  const publisherStyle = { margin: '0.32rem 0 0', color: apkColors.publisher, fontSize: '0.92rem', fontWeight: 500, lineHeight: 1.4 }
  const sizeStyle = { margin: '0.28rem 0 0', color: apkColors.secondary, fontSize: '1rem', fontWeight: 600 }
const metaGridStyle = {
    marginTop: '1rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: isTiny ? '0.4rem' : '0.6rem',
  }
  const sectionStyle = { marginTop: '1.15rem', minWidth: 0 }
  const sectionTitleStyle = { margin: '0 0 0.65rem', color: apkColors.text, fontWeight: 800, letterSpacing: '-0.02em', fontSize: '1.02rem' }
  const galleryStyle = {
    display: 'flex',
    gap: '0.8rem',
    overflowX: 'auto',
    overflowY: 'hidden',
    padding: '0.1rem 0 0.55rem',
    scrollSnapType: 'x mandatory',
    scrollPaddingInline: '0.1rem',
    WebkitOverflowScrolling: 'touch',
    overscrollBehavior: 'contain',
    scrollbarWidth: 'thin',
    touchAction: 'pan-x pan-y',
    minWidth: 0,
  }
  const shotFrameStyle = { flex: `0 0 ${shotBasis}`, margin: 0, scrollSnapAlign: 'start', minWidth: 0 }
  const shotStyle = {
    display: 'block',
    width: '100%',
    aspectRatio: isLandscapeGallery ? '16 / 9' : '9 / 16',
    height: 'auto',
    borderRadius: 16,
    border: `1px solid ${apkColors.borderSoft}`,
    background: '#0b1933',
    objectFit: isLandscapeGallery ? 'contain' : 'cover',
  }
  const descWrapStyle = { maxWidth: '72ch', minWidth: 0 }
  const paraStyle = { margin: '0 0 0.85rem', color: apkColors.desc, fontSize: '0.98rem', lineHeight: 1.75, overflowWrap: 'anywhere' }
  const updatedStyle = { margin: 0, color: apkColors.desc, fontSize: '0.98rem', lineHeight: 1.75, overflowWrap: 'anywhere' }

  return (
    <main style={pageStyle}>
      <div style={wrapStyle}>
        <article style={{ width: '100%', minWidth: 0 }} aria-label={`${app.title} details`}>
          <header style={heroStyle}>
            <img
              style={iconStyle}
              src={app.icon}
              alt={`${app.title} app icon`}
              width={iconSize}
              height={iconSize}
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = getFallbackIcon(app.title)
              }}
            />
            <div style={heroCopyStyle}>
              <h1 style={titleStyle}>{app.title}</h1>
              {app.publisher ? <p style={publisherStyle}>Published by {app.publisher}</p> : null}
              <p style={sizeStyle}>{app.size}</p>
            </div>
          </header>

<section style={metaGridStyle} aria-label="Application metadata">
            <MetadataBlock icon={<StarIcon size={18} />} label="Rating" value={app.rating} />
            <MetadataBlock icon={<PackageIcon size={18} />} label="File Size" value={app.size} />
            <MetadataBlock icon={<TagIcon size={18} />} label="Version" value={app.version} />
          </section>

          <section style={sectionStyle} aria-label="Download">
            <RedirectDownloadButton compact={isTiny} />
          </section>

          <section style={sectionStyle} aria-label={`${app.title} screenshots`}>
            {screenshots.length ? (
              <div style={galleryStyle} ref={galleryRef} tabIndex={0}>
                {screenshots.map((src, index) => (
                  <figure style={shotFrameStyle} key={`${src}-${index}`}>
                    <img
                      src={src}
                      alt={`${app.title} screenshot ${index + 1}`}
                      style={shotStyle}
                      loading="lazy"
                      decoding="async"
                      width={isLandscapeGallery ? 640 : 360}
                      height={isLandscapeGallery ? 360 : 640}
                      onError={(e) => {
                        e.currentTarget.onerror = null
                        e.currentTarget.src = getFallbackScreenshot()
                      }}
                    />
                  </figure>
                ))}
              </div>
            ) : (
              <p style={stateStyle}>Screenshots are not available for this listing.</p>
            )}
          </section>

          <section style={sectionStyle} aria-labelledby={`description-${app.slug}`}>
            <h2 id={`description-${app.slug}`} style={sectionTitleStyle}>Description</h2>
            <div style={descWrapStyle}>
              {(app.description || 'No description available.').split(/\n+/).filter(Boolean).map((paragraph, index, arr) => (
                <p key={index} style={index === arr.length - 1 ? { ...paraStyle, marginBottom: 0 } : paraStyle}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section style={sectionStyle} aria-labelledby={`updated-${app.slug}`}>
            <h2 id={`updated-${app.slug}`} style={sectionTitleStyle}>Last Updated</h2>
            <p style={updatedStyle}>{formatLastUpdated(app.lastUpdated)}</p>
          </section>

          <section style={sectionStyle} aria-label="Download">
            <ApkDownloadButton app={app} />
          </section>
        </article>
      </div>
    </main>
  )
}
