import { useEffect, useState } from 'react'
import ApkStoreCard from '../components/ApkStoreCard.jsx'
import { fetchApkStore } from '../data/apkStore.js'
import { useDocumentMeta } from '../components/useDocumentMeta.js'
import useViewportWidth from '../components/useViewportWidth.js'
import { apkColors, getApkLayout } from '../components/apkStoreStyles.js'

export default function ApkStorePage() {
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const width = useViewportWidth()
  const { isTiny, isDesktop } = getApkLayout(width)

  useDocumentMeta(
    'APK Store',
    'Browse application listings from the project data source.',
    '/apkstore',
  )

  useEffect(() => {
    let active = true
    fetchApkStore()
      .then((data) => {
        if (!active) return
        setApps(data)
        setError('')
      })
      .catch((err) => {
        if (!active) return
        setError(err instanceof Error ? err.message : 'Unable to load APK listings.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const pageStyle = {
    width: '100%',
    minWidth: 0,
    padding: `calc(var(--nav-height, 80px) + 1rem) ${isTiny ? '0.85rem' : '1rem'} 1.25rem`,
    boxSizing: 'border-box',
  }
  const wrapStyle = {
    width: '100%',
    maxWidth: isDesktop ? 1040 : 960,
    margin: '0 auto',
    minWidth: 0,
  }
  const listStyle = { display: 'grid', gap: '0.85rem', minWidth: 0 }
  const stateStyle = { margin: '0.42rem 0 0', color: apkColors.secondary, fontSize: '0.9rem', lineHeight: 1.5 }
  const errorStyle = { ...stateStyle, color: apkColors.error }

  return (
    <main style={pageStyle}>
      <div style={wrapStyle}>
        {loading ? <p style={stateStyle} role="status">Loading applications…</p> : null}
        {error ? <p style={errorStyle} role="alert">{error}</p> : null}
        {!loading && !error ? (
          <div style={listStyle} aria-label="Application listings">
            {apps.map((app) => (
              <ApkStoreCard key={app.slug} app={app} />
            ))}
          </div>
        ) : null}
      </div>
    </main>
  )
}
