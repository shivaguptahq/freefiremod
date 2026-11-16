// Centralized, route-aware ad manager.
// - Popunder: once per browser session per page type (home/store listing).
// - Social Bar: once per browser session in total (home + app detail pages).
// - Direct link/smartlink: opened only by STEP 1 of the app detail download button.
//
// Session caps (sessionStorage with in-memory fallback):
//   ads:popunder:home   - popunder on "/"
//   ads:popunder:store  - popunder on "/apk-store" (listing only)
//   ads:socialbar       - social bar (once total)
//   ads:directlink      - direct link click (once per session by default)

const AD_PLAN = {
  popunder: {
    home: { route: '/', sessionKey: 'ads:popunder:home' },
    store: { route: '/apk-store', sessionKey: 'ads:popunder:store' },
  },
  socialBar: {
    routes: ['/', '/apk-store/:slug'],
    sessionKey: 'ads:socialbar',
  },
  directLink: {
    sessionKey: 'ads:directlink',
    oncePerSession: true,
  },
  sources: {
    socialBar: 'https://bellnewyork.org/14/b54900afe9bb92ecf791f867088f80a3',
    popunder: 'https://accountut.com/1/509d9ca73befa1400f14d666ae050c72',
    smartlink: 'https://ardance.org/4/16b41d6a8c2c73210625a87df50eebd2',
  },
}

const SOCIAL_BAR_SRC = AD_PLAN.sources.socialBar
const POPUNDER_SRC = AD_PLAN.sources.popunder
const SMARTLINK_URL = AD_PLAN.sources.smartlink
const DIRECT_LINK_ONCE_PER_SESSION = AD_PLAN.directLink.oncePerSession

const inFlightLoads = new Map()
const loadedScriptIds = new Set()
const memoryCaps = new Set()

function canUseWindow() {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

function runAfterLoad(fn) {
  if (!canUseWindow()) return
  if (typeof fn !== 'function') return
  if (document.readyState === 'complete') {
    setTimeout(fn, 0)
    return
  }
  window.addEventListener('load', () => setTimeout(fn, 0), { once: true })
}

function hasSessionCap(key) {
  if (!key) return false
  if (memoryCaps.has(key)) return true
  if (!canUseWindow()) return false
  try {
    if (window.sessionStorage.getItem(key) === '1') {
      memoryCaps.add(key)
      return true
    }
  } catch {
    // storage unavailable: fall back to in-memory cap for this page-load session
  }
  return false
}

function setSessionCap(key) {
  if (!key) return
  memoryCaps.add(key)
  if (!canUseWindow()) return
  try {
    window.sessionStorage.setItem(key, '1')
  } catch {
    // storage unavailable: in-memory cap already set
  }
}

function hasScriptTag(src) {
  if (!canUseWindow()) return false
  return Array.from(document.querySelectorAll('script')).some(
    (s) => s.getAttribute('data-src') === src || s.src === src,
  )
}

function loadScript(src, attrs = {}) {
  if (!canUseWindow()) return Promise.resolve(null)

  if (loadedScriptIds.has(src) || hasScriptTag(src)) {
    loadedScriptIds.add(src)
    return Promise.resolve(null)
  }

  if (inFlightLoads.has(src)) return inFlightLoads.get(src)

  const promise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.setAttribute('data-src', src)
    script.src = src
    script.async = true
    for (const [k, v] of Object.entries(attrs)) script.setAttribute(k, v)
    script.onload = () => {
      inFlightLoads.delete(src)
      loadedScriptIds.add(src)
      resolve(script)
    }
    script.onerror = () => {
      inFlightLoads.delete(src)
      reject(new Error(`Failed to load ad script: ${src}`))
    }
    const firstScript = document.head.querySelector('script')
    if (firstScript) document.head.insertBefore(script, firstScript)
    else document.head.appendChild(script)
  })

  inFlightLoads.set(src, promise)
  return promise
}

function loadSocialBarOnce() {
  if (!canUseWindow()) return
  const key = AD_PLAN.socialBar.sessionKey
  if (hasSessionCap(key)) return
  runAfterLoad(() => {
    if (hasSessionCap(key)) return
    loadScript(SOCIAL_BAR_SRC, { 'data-cfasync': 'false' })
      .then(() => setSessionCap(key))
      .catch(() => {
        // Ad provider unavailable; do not break the page.
      })
  })
}

function loadPopunderOnce(kind) {
  if (!canUseWindow()) return
  const cfg = kind && AD_PLAN.popunder[kind]
  if (!cfg) return
  const key = cfg.sessionKey
  if (hasSessionCap(key)) return
  runAfterLoad(() => {
    if (hasSessionCap(key)) return
    loadScript(POPUNDER_SRC, { 'data-cfasync': 'false' })
      .then(() => setSessionCap(key))
      .catch(() => {
        // Ad provider unavailable; do not break the page.
      })
  })
}

function openDirectLink() {
  if (!canUseWindow()) return false
  const key = AD_PLAN.directLink.sessionKey
  const url = AD_PLAN.sources.smartlink
  if (DIRECT_LINK_ONCE_PER_SESSION && hasSessionCap(key)) return false
  try {
    window.open(url, '_blank', 'noopener,noreferrer')
  } catch {
    // ignore popup failure
  }
  setSessionCap(key)
  return true
}

function hasDirectLinkCap() {
  return hasSessionCap(AD_PLAN.directLink.sessionKey)
}

export const adManager = {
  loadSocialBarOnce,
  loadPopunderOnce,
  openDirectLink,
  hasDirectLinkCap,
  runAfterLoad,
}

export {
  loadSocialBarOnce,
  loadPopunderOnce,
  openDirectLink,
  hasDirectLinkCap,
  runAfterLoad,
}

export const AD_CONFIG = {
  ...AD_PLAN,
  SOCIAL_BAR_SRC,
  POPUNDER_SRC,
  SMARTLINK_URL,
  DIRECT_LINK_ONCE_PER_SESSION,
}

export { SMARTLINK_URL }

export default adManager
