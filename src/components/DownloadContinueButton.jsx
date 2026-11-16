import { useEffect, useState } from 'react'
import { DownloadIcon } from './Icons.jsx'
import { openDirectLink, hasDirectLinkCap } from './adManager.js'

export default function DownloadContinueButton({ compact = false }) {
  // Initial state is always STEP 1 so prerendered HTML is identical for everyone.
  const [step, setStep] = useState(1)

  useEffect(() => {
    // Read sessionStorage only after mount (client-side).
    if (hasDirectLinkCap()) setStep(2)
  }, [])

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.45rem',
    minHeight: compact ? 38 : 48,
    width: '100%',
    maxWidth: 420,
    padding: compact ? '0.62rem 0.9rem' : '0.72rem 1rem',
    borderRadius: 999,
    border: '1px solid transparent',
    font: 'inherit',
    fontSize: compact ? '0.88rem' : '0.92rem',
    fontWeight: 700,
    lineHeight: 1,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    cursor: 'pointer',
    background: '#2563eb',
    color: '#f8fafc',
    transition: 'filter 160ms ease, transform 160ms ease',
  }
  const wrapStyle = { width: '100%', minWidth: 0 }
  const hintStyle = {
    margin: '0.45rem 0 0',
    fontSize: '0.78rem',
    lineHeight: 1.35,
    color: '#cbd5e1',
    textAlign: 'center',
    maxWidth: 420,
  }

  function scrollToRealDownload() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return
    const target = document.getElementById('real-download')
    if (!target) return
    const reduceMotion = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    try {
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
    } catch {
      target.scrollIntoView()
    }
    const focusable = target.querySelector('a,button,[tabindex]:not([tabindex="-1"])')
    if (focusable && typeof focusable.focus === 'function') {
      try {
        focusable.focus({ preventScroll: true })
      } catch {
        focusable.focus()
      }
    }
  }

  function handleClick() {
    if (step === 1) {
      // Opens existing direct-link/smartlink URL in a new tab (no other ad opens).
      openDirectLink()
      setStep(2)
      return
    }
    scrollToRealDownload()
  }

  if (step === 1) {
    return (
      <div style={wrapStyle}>
        <button
          type="button"
          style={baseStyle}
          aria-label="Continue to download"
          onClick={handleClick}
          onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.06)' }}
          onMouseLeave={(e) => { e.currentTarget.style.filter = 'none' }}
        >
          <DownloadIcon size={compact ? 16 : 18} />
          <span>Continue to download</span>
        </button>
        <p style={hintStyle}>A sponsored page opens first. Return to this tab and tap again.</p>
      </div>
    )
  }

  return (
    <div style={wrapStyle}>
      <button
        type="button"
        style={baseStyle}
        aria-label="Go to download"
        onClick={handleClick}
        onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.06)' }}
        onMouseLeave={(e) => { e.currentTarget.style.filter = 'none' }}
      >
        <DownloadIcon size={compact ? 16 : 18} />
        <span>Go to download ↓</span>
      </button>
    </div>
  )
}
