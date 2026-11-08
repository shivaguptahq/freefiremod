import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import '../styles/footer.css'

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

function FooterColumn({ title, links }) {
  return (
    <nav className="footer-col" aria-label={title}>
      <h2 className="footer-heading">{title}</h2>
      <ul className="footer-list">
        {links.map((link) => (
          <li key={link.label}>
            <Link className="footer-link" to={link.to}>
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
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo className="footer-logo" />
            <p className="footer-desc">
              An independent informational platform providing gaming APK information, version
              details, updates and resources.
            </p>
          </div>

          <FooterColumn title="Quick Links" links={quickLinks} />
          <FooterColumn title="Information" links={infoLinks} />
          <FooterColumn title="Legal" links={legalLinks} />
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2026 FreeFire Mods. All rights reserved.</p>
          <nav className="footer-bottom-links" aria-label="Legal links">
            <Link className="footer-bottom-link" to="/privacy-policy">
              Privacy Policy
            </Link>
            <Link className="footer-bottom-link" to="/terms">
              Terms &amp; Conditions
            </Link>
            <Link className="footer-bottom-link" to="/disclaimer">
              Disclaimer
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
