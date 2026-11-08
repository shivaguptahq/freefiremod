import { Link } from 'react-router-dom'
import { getFallbackIcon } from '../data/apkStore.js'
import { DownloadIcon } from './Icons.jsx'

function DownloadCta({ app }) {
  const available = app.apkAvailable && !app.isDemo
  if (available) {
    return (
      <a
        className="apk-download-btn apk-download-btn-compact"
        href={app.apkFile}
        download
        onClick={(e) => e.stopPropagation()}
        aria-label={`Download ${app.title} APK`}
      >
        <DownloadIcon size={16} />
        <span>Download</span>
      </a>
    )
  }

  return (
    <button type="button" className="apk-download-btn apk-download-btn-compact" disabled onClick={(e) => e.stopPropagation()}>
      <DownloadIcon size={16} />
      <span>Unavailable</span>
    </button>
  )
}

export default function ApkStoreCard({ app }) {
  const detailPath = `/apkstore/${app.slug}`
  const downloadAvailable = app.apkAvailable && !app.isDemo

  return (
    <article className="apk-store-card">
      <Link className="apk-store-card-main" to={detailPath} aria-label={`Open ${app.title} details`}>
        <img
          className="apk-store-icon"
          src={app.icon}
          alt={`${app.title} app icon`}
          width="72"
          height="72"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = getFallbackIcon(app.title)
          }}
        />
        <div className="apk-store-content">
          <h2 className="apk-store-title">{app.title}</h2>
          <p className="apk-store-size">{app.size}</p>
          {!downloadAvailable ? <p className="apk-store-note">{app.apkStatus || 'APK file not available yet.'}</p> : null}
        </div>
      </Link>
      <div className="apk-store-inline-cta">
        <DownloadCta app={app} />
      </div>
    </article>
  )
}
