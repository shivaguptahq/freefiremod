// Centralized, route-aware ad manager.
// - Social Bar: homepage + individual app detail pages.
// - Popunder: only on a genuine user click from /apk-store selection, with per-app 5-min cooldown.

const SOCIAL_BAR_SRC = 'https://bellnewyork.org/14/b54900afe9bb92ecf791f867088f80a3'
const POPUNDER_SRC = 'https://accountut.com/1/509d9ca73befa1400f14d666ae050c72'
const POPUNDER_COOLDOWN_MS = 5 * 60 * 1000 // 5 minutes per app
const POPUNDER_KEY = 'freefiremod:popunder:ts'

function loadScript(src, attrs = {}) {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return resolve(null)
    // Dedupe: never inject the same script URL twice.
    const existing = Array.from(document.querySelectorAll('script')).find(
      (s) => s.getAttribute('data-src') === src || s.src === src,
    )
    if (existing) return resolve(existing)

    const script = document.createElement('script')
    script.setAttribute('data-src', src)
    script.src = src
    for (const [k, v] of Object.entries(attrs)) script.setAttribute(k, v)
    script.async = false
    script.onerror = () => reject(new Error(`Failed to load ad script: ${src}`))
    script.onload = () => resolve(script)
    document.head.appendChild(script)
  })
}

function loadSocialBar() {
  if (typeof window === 'undefined') return Promise.resolve(null)
  return loadScript(SOCIAL_BAR_SRC, { 'data-cfasync': 'false' })
}

// ---- Per-application popunder cooldown tracking ----

function readCooldownMap() {
  try {
    const raw = localStorage.getItem(POPUNDER_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function writeCooldownMap(map) {
  try {
    localStorage.setItem(POPUNDER_KEY, JSON.stringify(map))
  } catch {
    // ignore storage failures
  }
}

function isOnCooldown(slug) {
  if (!slug) return true
  const map = readCooldownMap()
  const ts = map[slug]
  if (!ts) return false
  return Date.now() - ts < POPUNDER_COOLDOWN_MS
}

function markCooldown(slug) {
  if (!slug) return
  const map = readCooldownMap()
  map[slug] = Date.now()
  writeCooldownMap(map)
}

function resetCooldown(slug) {
  if (!slug) return
  const map = readCooldownMap()
  delete map[slug]
  writeCooldownMap(map)
}

function clearAllCooldowns() {
  try { localStorage.removeItem(POPUNDER_KEY) } catch {}
}

function triggerPopunder(slug) {
  if (typeof window === 'undefined') return Promise.resolve(null)
  if (isOnCooldown(slug)) return Promise.resolve(null)
  return loadScript(POPUNDER_SRC, { 'data-cfasync': 'false' }).then((script) => {
    markCooldown(slug)
    return script
  })
}

export const adManager = {
  loadSocialBar,
  triggerPopunder,
  isOnCooldown,
  resetCooldown,
  clearAllCooldowns,
  POPUNDER_COOLDOWN_MS,
}

export { loadSocialBar, triggerPopunder, isOnCooldown, resetCooldown, clearAllCooldowns }

export const AD_CONFIG = {
  SOCIAL_BAR_SRC,
  POPUNDER_SRC,
}

export default adManager