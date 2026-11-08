const APK_DATA_URL = `${import.meta.env.BASE_URL}assets/apks/data/apks.json`

function toAssetUrl(value) {
  if (typeof value !== 'string' || !value) return value
  if (/^(?:[a-z]+:)?\/\//i.test(value) || value.startsWith('data:') || value.startsWith('blob:')) return value
  if (value.startsWith('/')) return `${import.meta.env.BASE_URL}${value.slice(1)}`
  return value
}

const REQUIRED_FIELDS = [
  'id',
  'slug',
  'title',
  'icon',
  'shortDescription',
  'description',
  'category',
  'developer',
  'packageName',
  'version',
  'androidVersion',
  'size',
  'lastUpdated',
  'rating',
  'featured',
  'screenshots',
  'apkFile',
  'fileSizeBytes',
  'isDemo',
  'apkAvailable',
  'apkStatus',
]

let cache = null
let pending = null

export function getFallbackIcon(title = 'App') {
  const letter = encodeURIComponent((title.trim()[0] || 'A').toUpperCase())
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" rx="96" fill="#101F3D"/><rect x="24" y="24" width="464" height="464" rx="78" fill="none" stroke="rgba(37,99,235,0.35)"/><text x="256" y="290" text-anchor="middle" font-family="Arial,sans-serif" font-size="180" font-weight="700" fill="#65F044">${letter}</text></svg>`
  return `data:image/svg+xml;charset=UTF-8,${svg}`
}

export function getFallbackScreenshot() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="1280" viewBox="0 0 720 1280"><rect width="720" height="1280" fill="#0B1933"/><rect x="36" y="36" width="648" height="1208" rx="24" fill="#101F3D" stroke="rgba(148,163,184,0.18)"/><text x="360" y="652" text-anchor="middle" font-family="Arial,sans-serif" font-size="30" fill="#71829F">Screenshot unavailable</text></svg>`
  return `data:image/svg+xml;charset=UTF-8,${svg}`
}

function hasValue(value) {
  if (Array.isArray(value)) return value.length > 0
  return value !== undefined && value !== null && value !== ''
}

function normalizeApp(raw, index) {
  const issues = []
  for (const field of REQUIRED_FIELDS) {
    if (!hasValue(raw?.[field]) && typeof raw?.[field] !== 'boolean' && raw?.[field] !== 0) {
      issues.push(`${raw?.id || raw?.slug || `index ${index}`}: missing ${field}`)
    }
  }
  if (!Array.isArray(raw?.screenshots) || raw.screenshots.length < 1) {
    issues.push(`${raw?.id || raw?.slug || `index ${index}`}: screenshots must contain at least 1 item`)
  }

  const screenshots = Array.isArray(raw?.screenshots) ? raw.screenshots.filter(Boolean) : []
  const fileSizeBytes = Number.isFinite(raw?.fileSizeBytes) ? raw.fileSizeBytes : 0
  const apkFile = typeof raw?.apkFile === 'string' ? raw.apkFile : ''
  const explicitAvailable = typeof raw?.apkAvailable === 'boolean' ? raw.apkAvailable : null
  const distributionAuthorized = raw?.distributionAuthorized !== false
  const apkAvailable = Boolean(
    (explicitAvailable ?? true) && apkFile && fileSizeBytes > 0 && distributionAuthorized,
  )
  const defaultStatus = distributionAuthorized
    ? 'APK file not available yet.'
    : 'Download unavailable: redistribution authorization is not verified for this package.'
  const apkStatus = typeof raw?.apkStatus === 'string' && raw.apkStatus.trim()
    ? raw.apkStatus
    : apkAvailable
      ? 'APK file available.'
      : defaultStatus

  return {
    app: {
      id: raw?.id ?? `app-${index}`,
      slug: raw?.slug ?? `app-${index}`,
      title: raw?.title ?? 'Untitled app',
      publisher: typeof raw?.publisher === 'string' ? raw.publisher : raw?.developer ?? '',
      isDemo: Boolean(raw?.isDemo),
      icon: toAssetUrl(raw?.icon) || getFallbackIcon(raw?.title),
      shortDescription: raw?.shortDescription ?? '',
      description: raw?.description ?? '',
      category: raw?.category ?? 'Uncategorized',
      developer: raw?.developer ?? 'Unknown',
      packageName: raw?.packageName ?? '',
      version: raw?.version ?? '',
      androidVersion: raw?.androidVersion ?? '',
      size: raw?.size ?? '',
      lastUpdated: raw?.lastUpdated ?? '',
      rating: raw?.rating ?? 'N/A',
      featured: Boolean(raw?.featured),
      screenshots: screenshots.map(toAssetUrl).filter(Boolean),
      apkFile: toAssetUrl(apkFile),
      downloadFileName: typeof raw?.downloadFileName === 'string' && raw.downloadFileName.trim() ? raw.downloadFileName.trim() : '',
      distributionAuthorized,
      apkAvailable,
      apkStatus,
      fileSizeBytes,
    },
    issues,
  }
}

function normalizeList(data) {
  const list = Array.isArray(data) ? data : []
  const issues = []
  const apps = list.map((item, index) => {
    const result = normalizeApp(item, index)
    issues.push(...result.issues)
    return result.app
  })
  if (issues.length && typeof console !== 'undefined') {
    console.warn('APK store data validation issues:', issues)
  }
  return apps
}

export async function fetchApkStore({ force = false } = {}) {
  if (cache && !force) return cache
  if (pending && !force) return pending

  pending = (async () => {
    const response = await fetch(APK_DATA_URL, { headers: { Accept: 'application/json' } })
    if (!response.ok) {
      throw new Error(`Failed to load APK data (${response.status})`)
    }
    const data = await response.json()
    cache = normalizeList(data)
    return cache
  })()

  try {
    return await pending
  } finally {
    pending = null
  }
}

export async function getAllApks(options) {
  return fetchApkStore(options)
}

export async function getFeaturedApks(options) {
  const apps = await fetchApkStore(options)
  return apps.filter((app) => app.featured)
}

export async function getApkBySlug(slug, options) {
  if (!slug) return null
  const apps = await fetchApkStore(options)
  return apps.find((app) => app.slug === slug) ?? null
}

export async function getApkCategories(options) {
  const apps = await fetchApkStore(options)
  return [...new Set(apps.map((app) => app.category).filter(Boolean))].sort()
}

export function formatLastUpdated(value) {
  if (!value) return 'Unknown'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function filterApksByCategory(apps, category) {
  if (!category || category === 'all') return apps
  return apps.filter((app) => app.category === category)
}

export function searchApks(apps, query) {
  const q = (query || '').trim().toLowerCase()
  if (!q) return apps
  return apps.filter((app) =>
    [app.title, app.shortDescription, app.category, app.developer, app.packageName]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(q)),
  )
}

export function clearApkStoreCache() {
  cache = null
}
