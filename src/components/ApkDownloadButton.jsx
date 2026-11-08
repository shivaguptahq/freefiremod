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

export default function ApkDownloadButton({ app, className = '', compact = false, stopPropagation = false }) {
  const available = Boolean(app?.apkFile && app?.fileSizeBytes > 0 && app?.apkAvailable && !app?.isDemo)
  const filename = getDownloadFileName(app)

  function onClick(event) {
    if (stopPropagation) event.stopPropagation()
  }

  if (!available) {
    return (
      <div className={compact ? 'apk-download-wrap apk-download-wrap-compact' : 'apk-download-wrap'}>
        <button
          type="button"
          className={`apk-download-btn ${className}`.trim()}
          disabled
          aria-label="Download currently unavailable"
        >
          <DownloadIcon size={compact ? 16 : 18} />
          <span>Download Currently Unavailable</span>
        </button>
      </div>
    )
  }

  return (
    <div className={compact ? 'apk-download-wrap apk-download-wrap-compact' : 'apk-download-wrap'}>
      <a
        className={`apk-download-btn ${className}`.trim()}
        href={app.apkFile}
        download={filename}
        rel="noopener"
        target="_self"
        onClick={onClick}
        aria-label={`Download ${app?.title || 'APK'} as ${filename}`}
      >
        <DownloadIcon size={compact ? 16 : 18} />
        <span>Download APK</span>
      </a>
    </div>
  )
}
