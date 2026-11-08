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

export default function ApkDownloadButton({ app, className = '', compact = false, stopPropagation = false }) {
  const [state, setState] = useState('idle')

  const available = Boolean(app?.apkFile && app?.fileSizeBytes > 0 && app?.apkAvailable && !app?.isDemo)
  const filename = getDownloadFileName(app)

  async function handleClick(event) {
    if (stopPropagation) event.stopPropagation()
    if (!available || state === 'checking') return

    setState('checking')
    try {
      const response = await fetch(app.apkFile, { method: 'HEAD', cache: 'no-store' })
      if (!response.ok) throw new Error('missing')
      const link = document.createElement('a')
      link.href = app.apkFile
      link.download = filename
      link.rel = 'noopener'
      document.body.appendChild(link)
      link.click()
      link.remove()
      setState('idle')
    } catch {
      try {
        window.location.assign(app.apkFile)
      } catch {
        setState('error')
        return
      }
      setState('idle')
    }
  }

  const label = !available
    ? 'Download Currently Unavailable'
    : state === 'checking'
      ? 'Checking file...'
      : state === 'error'
        ? 'Download failed'
        : 'Download APK'

  return (
    <div className={compact ? 'apk-download-wrap apk-download-wrap-compact' : 'apk-download-wrap'}>
      <button
        type="button"
        className={`apk-download-btn ${className}`.trim()}
        onClick={handleClick}
        disabled={!available || state === 'checking'}
        aria-label={available ? `Download ${app?.title || 'APK'} as ${filename}` : 'Download currently unavailable'}
      >
        <DownloadIcon size={compact ? 16 : 18} />
        <span>{label}</span>
      </button>
      {!compact && state === 'error' ? <p className="apk-card-note apk-state-error" role="alert">The APK file could not be accessed. Please try again later.</p> : null}
    </div>
  )
}
