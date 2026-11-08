import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PackageIcon, StarIcon, TagIcon } from '../components/Icons.jsx'
import ApkDownloadButton from '../components/ApkDownloadButton.jsx'
import { formatLastUpdated, getApkBySlug, getFallbackIcon, getFallbackScreenshot } from '../data/apkStore.js'
import { useDocumentMeta } from '../components/useDocumentMeta.js'
import '../styles/apk-store.css'

function MetadataBlock({ icon, label, value }) {
  return (
    <div className="apk-meta-block">
      <span className="apk-meta-icon" aria-hidden="true">{icon}</span>
      <div className="apk-meta-copy">
        <span className="apk-meta-label">{label}</span>
        <span className="apk-meta-value">{value}</span>
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

  if (loading) {
    return (
      <main className="apk-page apk-page-detail">
        <div className="apk-page-wrap"><p className="apk-state" role="status">Loading application…</p></div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="apk-page apk-page-detail">
        <div className="apk-page-wrap"><p className="apk-state apk-state-error" role="alert">{error}</p></div>
      </main>
    )
  }

  if (!app) {
    return (
      <main className="apk-page apk-page-detail">
        <div className="apk-page-wrap"><p className="apk-state apk-state-error" role="alert">Application listing not found.</p></div>
      </main>
    )
  }

  const screenshots = Array.isArray(app.screenshots) ? app.screenshots.filter(Boolean) : []

  return (
    <main className="apk-page apk-page-detail">
      <div className="apk-page-wrap">
        <article className="apk-detail" aria-label={`${app.title} details`}>
          <header className="apk-detail-hero">
            <img
              className="apk-detail-icon"
              src={app.icon}
              alt={`${app.title} app icon`}
              width="112"
              height="112"
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = getFallbackIcon(app.title)
              }}
            />
            <div className="apk-detail-hero-copy">
              <h1 className="apk-detail-title">{app.title}</h1>
              {app.publisher ? <p className="apk-detail-publisher">Published by {app.publisher}</p> : null}
              <p className="apk-detail-size">{app.size}</p>
            </div>
          </header>

          <section className="apk-meta-grid" aria-label="Application metadata">
            <MetadataBlock icon={<StarIcon size={18} />} label="Rating" value={app.rating} />
            <MetadataBlock icon={<PackageIcon size={18} />} label="File Size" value={app.size} />
            <MetadataBlock icon={<TagIcon size={18} />} label="Version" value={app.version} />
          </section>

          <section className="apk-detail-section" aria-label={`${app.title} screenshots`}>
            {screenshots.length ? (
              <div className="apk-screenshots" ref={galleryRef} tabIndex={0}>
                {screenshots.map((src, index) => (
                  <figure className="apk-shot-frame" key={`${src}-${index}`}>
                    <img
                      src={src}
                      alt={`${app.title} screenshot ${index + 1}`}
                      className="apk-shot"
                      loading="lazy"
                      decoding="async"
                      width="360"
                      height="640"
                      onError={(e) => {
                        e.currentTarget.onerror = null
                        e.currentTarget.src = getFallbackScreenshot()
                      }}
                    />
                  </figure>
                ))}
              </div>
            ) : (
              <p className="apk-state">Screenshots are not available for this listing.</p>
            )}
          </section>

          <section className="apk-detail-section" aria-labelledby={`description-${app.slug}`}>
            <h2 id={`description-${app.slug}`} className="apk-section-title">Description</h2>
            <div className="apk-description">
              {(app.description || 'No description available.').split(/\n+/).filter(Boolean).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="apk-detail-section" aria-labelledby={`updated-${app.slug}`}>
            <h2 id={`updated-${app.slug}`} className="apk-section-title">Last Updated</h2>
            <p className="apk-updated-value">{formatLastUpdated(app.lastUpdated)}</p>
          </section>

          <section className="apk-detail-download" aria-label="Download">
            <ApkDownloadButton app={app} className="apk-download-btn-primary" />
          </section>
        </article>
      </div>
    </main>
  )
}
