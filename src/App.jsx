import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import SiteLayout from './components/SiteLayout.jsx'
import Home from './pages/Home.jsx'
import ApkStorePage from './pages/ApkStorePage.jsx'
import ApkDetailsPage from './pages/ApkDetailsPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import TermsPage from './pages/TermsPage.jsx'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx'
import DisclaimerPage from './pages/DisclaimerPage.jsx'
import DmcaPage from './pages/DmcaPage.jsx'
import { initBackgroundAudio } from './components/backgroundAudio.js'

export default function App() {
  useEffect(() => initBackgroundAudio(), [])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/apk-store" element={<ApkStorePage />} />
          <Route path="/apk-store/:slug" element={<ApkDetailsPage />} />
          <Route path="/apkstore" element={<ApkStorePage />} />
          <Route path="/apkstore/:slug" element={<ApkDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/dmca" element={<DmcaPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
