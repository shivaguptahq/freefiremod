import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import heroArt from '../assets/Moonlit Battle Royale Island.png'
import heroVideo from '../assets/kling_20261108_VIDEO_Animate_th_4440_0 (1).mp4'
import '../styles/home.css'
import Button from '../components/Button.jsx'
import FeatureList from '../components/FeatureList.jsx'
import StatsStrip from '../components/StatsStrip.jsx'
import FeatureMarquee from '../components/FeatureMarquee.jsx'
import FaqSection from '../components/FaqSection.jsx'
import { ArrowUpRightIcon, ShieldIcon } from '../components/Icons.jsx'
import { useDocumentMeta } from '../components/useDocumentMeta.js'

const features = [
  'Aimbot Feature Information',
  'Pro Skin Availability',
  'Anti-Ban Claims and Verification Status',
  'Latest Version Information',
]

export default function Home() {
  const { hash } = useLocation()
  useDocumentMeta(
    'Free Fire MAX MOD APK – Features, Versions & Information',
    'Explore Free Fire MAX APK information, version details, features, compatibility and screenshots. Find useful information about available game builds.',
  )

  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash])

  return (
    <main id="home">
      <section className="hero" aria-label="FreeFire Mods hero">
        <div className="hero-media" aria-hidden="true">
          <video
            className="hero-video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={heroArt}
            width="1280"
            height="720"
            aria-hidden="true"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <img src={heroArt} alt="" className="hero-image hero-fallback" aria-hidden="true" />
          <div className="hero-overlay" />
        </div>

        <div className="hero-inner">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="title-line">FREE FIRE</span>
              <span className="title-line">
                <span className="title-accent">MAX</span> MOD APK
              </span>
            </h1>

            <p className="hero-description">
              Explore gaming APK information, features, version details and updates in one place.
            </p>

            <FeatureList items={features} />

            <div className="hero-cta">
              <Button to="/apk-store" className="btn-primary" icon={<ArrowUpRightIcon size={18} />}>
                Browse All APKs
              </Button>
              <p className="hero-note">
                <ShieldIcon size={15} />
                <span>APK information and download availability</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <StatsStrip />
      <FeatureMarquee />
      <FaqSection />
    </main>
  )
}
