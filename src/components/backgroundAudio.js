import soundSrc from '../assets/SoundEffects/Background Sound FreeFire.mp4'

const VOLUME = 0.45
const unlockEvents = ['pointerdown', 'touchstart', 'keydown', 'click']

let audio
let initialized = false
let listening = false

function getAudio() {
  if (audio) return audio
  if (typeof Audio === 'undefined') return null
  audio = new Audio(soundSrc)
  audio.loop = true
  audio.preload = 'auto'
  audio.volume = VOLUME
  audio.muted = false
  return audio
}

async function tryPlay() {
  const el = getAudio()
  if (!el || !el.paused) return
  try {
    el.volume = VOLUME
    await el.play()
    removeUnlockListeners()
  } catch {
    // Autoplay may be blocked until the first legitimate user interaction.
  }
}

function onUnlock() {
  tryPlay()
}

function addUnlockListeners() {
  if (typeof window === 'undefined' || listening) return
  listening = true
  unlockEvents.forEach((event) => window.addEventListener(event, onUnlock, { passive: true }))
}

function removeUnlockListeners() {
  if (typeof window === 'undefined' || !listening) return
  listening = false
  unlockEvents.forEach((event) => window.removeEventListener(event, onUnlock))
}

export function initBackgroundAudio() {
  if (initialized) return () => {}
  initialized = true
  getAudio()
  addUnlockListeners()
  tryPlay()
  return () => {}
}
