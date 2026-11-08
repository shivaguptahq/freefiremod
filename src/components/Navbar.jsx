import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from './Button.jsx'
import Logo from './Logo.jsx'
import {
  ArrowUpRightIcon,
  CloseIcon,
  HelpIcon,
  HomeIcon,
  InfoIcon,
  MenuIcon,
  StoreIcon,
} from './Icons.jsx'

const navItems = [
  { label: 'Home', to: '/', icon: HomeIcon },
  { label: 'APK Store', to: '/apk-store', icon: StoreIcon },
  { label: 'About', to: '/about', icon: InfoIcon },
  { label: 'FAQ', to: '/#faq', icon: HelpIcon },
]

function isActive(item, pathname, hash) {
  if (item.to === '/') return pathname === '/' && !hash
  if (item.to.startsWith('/#')) return pathname === '/' && hash === item.to.slice(1)
  return pathname === item.to
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="nav-shell">
        <div className="nav-left">
          <Logo />
        </div>

        <nav className="nav-center" aria-label="Primary">
          <ul className="nav-list">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item, pathname, hash)
              return (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className={`nav-link${active ? ' is-active' : ''}`}
                    aria-current={active ? 'page' : undefined}
                    onClick={close}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="nav-right">
          <Button
            to="/apk-store"
            className="btn-nav nav-cta-desktop"
            icon={<ArrowUpRightIcon size={16} />}
          >
            Explore APKs
          </Button>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" className={`mobile-panel${open ? ' is-open' : ''}`}>
        <nav aria-label="Mobile primary">
          <ul className="mobile-list">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item, pathname, hash)
              return (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className={`mobile-link${active ? ' is-active' : ''}`}
                    aria-current={active ? 'page' : undefined}
                    onClick={close}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
          <Button
            to="/apk-store"
            className="btn-nav btn-mobile"
            icon={<ArrowUpRightIcon size={16} />}
            onClick={close}
          >
            Explore APKs
          </Button>
        </nav>
      </div>
    </header>
  )
}
