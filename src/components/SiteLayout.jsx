import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

function hideFooterForPath(pathname) {
  return pathname === '/apkstore' || pathname.startsWith('/apkstore/') || pathname === '/apk-store' || pathname.startsWith('/apk-store/')
}

export default function SiteLayout() {
  const { pathname } = useLocation()
  const hideFooter = hideFooterForPath(pathname)

  return (
    <div
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ScrollManager />
      <Navbar />
      <div style={{ flex: '1 0 auto' }}>
        <Outlet />
      </div>
      {!hideFooter ? <Footer /> : null}
    </div>
  )
}
