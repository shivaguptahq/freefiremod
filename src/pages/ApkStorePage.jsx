import { useEffect, useState } from 'react'
import ApkStoreCard from '../components/ApkStoreCard.jsx'
import { fetchApkStore } from '../data/apkStore.js'
import { useDocumentMeta } from '../components/useDocumentMeta.js'
import '../styles/apk-store.css'

export default function ApkStorePage() {
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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

  return (
    <main className="apk-page apk-page-listing">
      <div className="apk-page-wrap">
        {loading ? <p className="apk-state" role="status">Loading applications…</p> : null}
        {error ? <p className="apk-state apk-state-error" role="alert">{error}</p> : null}
        {!loading && !error ? (
          <div className="apk-listing" aria-label="Application listings">
            {apps.map((app) => (
              <ApkStoreCard key={app.slug} app={app} />
            ))}
          </div>
        ) : null}
      </div>
    </main>
  )
}
