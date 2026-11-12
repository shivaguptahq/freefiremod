// Centralized, route-aware ad manager.
// - Social Bar: homepage + individual app detail pages.
// - Popunder: only on a genuine user click from /apk-store selection, with per-app 5-min cooldown.
// - Smartlink URL: used by the top Download button on individual app detail pages.

const SOCIAL_BAR_SRC = 'https://bellnewyork.org/14/b54900afe9bb92ecf791f867088f80a3'
const POPUNDER_SRC = 'https://accountut.com/1/509d9ca73befa1400f14d666ae050c72'
const SMARTLINK_URL = 'https://ardance.org/4/16b41d6a8c2c73210625a87df50eebd2'
const POPUNDER_COOLDOWN_MS = 5 * 60 * 1000 // 5 minutes per app
const POPUNDER_KEY = 'freefiremod:popunder:ts'

const inFlightLoads = new Map()

function loadScript(src, attrs = {}) {
  if (typeof window === 'undefined') return Promise.resolve(null)

  // Dedupe: never inject the same script URL twice.
  const existing = Array.from(document.querySelectorAll('script')).find(
    (s) => s.getAttribute('data-src') === src || s.src === src,
  )
  if (existing) return Promise.resolve(existing)

  if (inFlightLoads.has(src)) return inFlightLoads.get(src)

  const promise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.setAttribute('data-src', src)
    script.src = src
    script.async = true
    for (const [k, v] of Object.entries(attrs)) script.setAttribute(k, v)
    script.onload = () => {
      inFlightLoads.delete(src)
      resolve(script)
    }
    script.onerror = () => {
      inFlightLoads.delete(src)
      reject(new Error(`Failed to load ad script: ${src}`))
    }
    // Insert as early as possible in <head> for fastest initialization.
    const firstScript = document.head.querySelector('script')
    if (firstScript) document.head.insertBefore(script, firstScript)
    else document.head.appendChild(script)
  })

  inFlightLoads.set(src, promise)
  return promise
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
  SMARTLINK_URL,
}

export { SMARTLINK_URL }

export default adManager