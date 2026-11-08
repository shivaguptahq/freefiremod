import { Link } from 'react-router-dom'

export default function Logo({ className = '' }) {
  return (
    <Link className={`logo ${className}`.trim()} to="/" aria-label="FreeFire Mods home">
      <span className="logo-mark" aria-hidden="true">
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
          <rect x="1" y="1" width="32" height="32" rx="10" fill="#0B1933" stroke="rgba(34, 211, 238, 0.45)" />
          <path d="M12 24V10h10v3.2h-6.5v2.7h5.7v3.1h-5.7V24H12Z" fill="#22D3EE" />
          <path d="M12 24V10h10v3.2h-6.5v2.7h5.7v3.1h-5.7V24H12Z" fill="url(#f-glow)" fillOpacity="0.35" />
          <defs>
            <linearGradient id="f-glow" x1="12" y1="10" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563EB" />
              <stop offset="1" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
        </svg>
      </span>
      <span className="logo-text">
        FreeFire <span className="logo-accent">Mods</span>
      </span>
    </Link>
  )
}
