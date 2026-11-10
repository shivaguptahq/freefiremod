import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'APK Store', to: '/apk-store' },
  { label: 'About Us', to: '/about' },
  { label: 'FAQ', to: '/#faq' },
]

const infoLinks = [
  { label: 'Contact Us', to: '/contact' },
  { label: 'Latest Updates', to: '/apk-store' },
  { label: 'Compatibility Guide', to: '/#faq' },
  { label: 'Installation Guide', to: '/#faq' },
]

const legalLinks = [
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Disclaimer', to: '/disclaimer' },
  { label: 'DMCA / Copyright Policy', to: '/dmca' },
]

const footerStyle = {
  background: '#07152e',
  borderTop: '1px solid rgba(148, 163, 184, 0.12)',
  color: '#a8b5cc',
}
const innerStyle = {
  width: 'min(100%, 1280px)',
  margin: '0 auto',
  padding: 'clamp(2.5rem, 5vw, 3.75rem) clamp(1rem, 3vw, 2rem) 1.25rem',
}
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.35fr) repeat(3, minmax(0, 1fr))',
  gap: 'clamp(1.5rem, 3vw, 2.5rem)',
  alignItems: 'start',
}
const brandStyle = { maxWidth: '24rem' }
const logoWrapStyle = { marginBottom: '1rem' }
const descStyle = {
  margin: 0,
  color: '#a8b5cc',
  fontSize: '0.95rem',
  lineHeight: 1.7,
}
const headingStyle = {
  margin: '0 0 0.9rem',
  color: '#f8fafc',
  fontSize: '1rem',
  fontWeight: 700,
  letterSpacing: '-0.01em',
}
const listStyle = {
  margin: 0,
  padding: 0,
  listStyle: 'none',
  display: 'grid',
  gap: '0.55rem',
}
const linkStyle = {
  color: '#a8b5cc',
  fontSize: '0.94rem',
  lineHeight: 1.45,
  transition: 'color 160ms ease',
}
const bottomStyle = {
  marginTop: 'clamp(2rem, 4vw, 2.75rem)',
  paddingTop: '1.15rem',
  borderTop: '1px solid rgba(148, 163, 184, 0.12)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  flexWrap: 'wrap',
}
const copyStyle = {
  margin: 0,
  color: '#71829f',
  fontSize: '0.9rem',
}
const bottomLinksStyle = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '0.45rem 1rem',
}

function FooterColumn({ title, links }) {
  return (
    <nav aria-label={title}>
      <h2 style={headingStyle}>{title}</h2>
      <ul style={listStyle}>
        {links.map((link) => (
          <li key={link.label}>
            <Link to={link.to} style={linkStyle}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={innerStyle}>
        <div style={gridStyle}>
          <div style={brandStyle}>
            <div style={logoWrapStyle}>
              <Logo />
            </div>
            <p style={descStyle}>
              An independent informational platform providing gaming APK information, version
              details, updates and resources.
            </p>
          </div>

          <FooterColumn title="Quick Links" links={quickLinks} />
          <FooterColumn title="Information" links={infoLinks} />
          <FooterColumn title="Legal" links={legalLinks} />
        </div>

        <div style={bottomStyle}>
          <p style={copyStyle}>© 2026 FreeFire Mods. All rights reserved.</p>
          <nav style={bottomLinksStyle} aria-label="Legal links">
            <Link to="/privacy-policy" style={linkStyle}>
              Privacy Policy
            </Link>
            <Link to="/terms" style={linkStyle}>
              Terms &amp; Conditions
            </Link>
            <Link to="/disclaimer" style={linkStyle}>
              Disclaimer
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}