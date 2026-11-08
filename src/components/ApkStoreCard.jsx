import { Link } from 'react-router-dom'
import { getFallbackIcon } from '../data/apkStore.js'
import ApkDownloadButton from './ApkDownloadButton.jsx'

export default function ApkStoreCard({ app }) {
  const detailPath = `/apkstore/${app.slug}`

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
        </div>
      </Link>
      <div className="apk-store-inline-cta">
        <ApkDownloadButton app={app} className="apk-download-btn-compact" compact stopPropagation />
      </div>
    </article>
  )
}
