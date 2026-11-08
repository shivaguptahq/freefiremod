const APK_DATA_URL = '/assets/apks/data/apks.json'

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
  'downloads',
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
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720"><rect width="1280" height="720" fill="#0B1933"/><rect x="48" y="48" width="1184" height="624" rx="24" fill="#101F3D" stroke="rgba(148,163,184,0.18)"/><text x="640" y="372" text-anchor="middle" font-family="Arial,sans-serif" font-size="36" fill="#71829F">Screenshot unavailable</text></svg>`
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
  if (!Array.isArray(raw?.screenshots) || raw.screenshots.length < 5) {
    issues.push(`${raw?.id || raw?.slug || `index ${index}`}: screenshots must contain at least 5 items`)
  }

  const screenshots = Array.isArray(raw?.screenshots) ? raw.screenshots.filter(Boolean) : []
  const safeScreenshots = screenshots.length >= 5 ? screenshots : [...screenshots]

  return {
    app: {
      id: raw?.id ?? `app-${index}`,
      slug: raw?.slug ?? `app-${index}`,
      title: raw?.title ?? 'Untitled app',
      isDemo: Boolean(raw?.isDemo),
      icon: raw?.icon || getFallbackIcon(raw?.title),
      shortDescription: raw?.shortDescription ?? '',
      description: raw?.description ?? '',
      category: raw?.category ?? 'Uncategorized',
      developer: raw?.developer ?? 'Unknown',
      packageName: raw?.packageName ?? '',
      version: raw?.version ?? '',
      androidVersion: raw?.androidVersion ?? '',
      size: raw?.size ?? '',
      lastUpdated: raw?.lastUpdated ?? '',
      downloads: raw?.downloads ?? 'N/A',
      rating: raw?.rating ?? 'N/A',
      featured: Boolean(raw?.featured),
      screenshots: safeScreenshots,
      apkFile: raw?.apkFile ?? '',
      apkAvailable: Boolean(raw?.apkAvailable),
      apkStatus: raw?.apkStatus ?? 'APK file not available yet.',
      fileSizeBytes: Number.isFinite(raw?.fileSizeBytes) ? raw.fileSizeBytes : 0,
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
