// Centralized, route-aware ad manager.
// - Social Bar: homepage + individual app detail pages.
// - Popunder: centralized provider integration (homepage load, and /apk-store listing load for genuine user interactions).
// - Smartlink URL: used by the top Download button on individual app detail pages.

const SOCIAL_BAR_SRC = 'https://bellnewyork.org/14/b54900afe9bb92ecf791f867088f80a3'
const POPUNDER_SRC = 'https://accountut.com/1/509d9ca73befa1400f14d666ae050c72'
const SMARTLINK_URL = 'https://ardance.org/4/16b41d6a8c2c73210625a87df50eebd2'

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

function loadPopunder() {
  if (typeof window === 'undefined') return Promise.resolve(null)
  return loadScript(POPUNDER_SRC, { 'data-cfasync': 'false' })
}

export const adManager = {
  loadSocialBar,
  loadPopunder,
}

export { loadSocialBar, loadPopunder }

export const AD_CONFIG = {
  SOCIAL_BAR_SRC,
  POPUNDER_SRC,
  SMARTLINK_URL,
}

export { SMARTLINK_URL }

export default adManager