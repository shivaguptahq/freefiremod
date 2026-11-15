import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

function spaFallback404() {
  let isSsr = false
  return {
    name: 'spa-fallback-404',
    apply: 'build',
    configResolved(config) {
      isSsr = !!config.build?.ssr
    },
    closeBundle() {
      if (isSsr) return
      const index = resolve(import.meta.dirname, 'dist/index.html')
      const fallback = resolve(import.meta.dirname, 'dist/404.html')
      if (existsSync(index)) copyFileSync(index, fallback)
    },
  }
}

function sitemapPlugin() {
  let isSsr = false
  return {
    name: 'sitemap-plugin',
    apply: 'build',
    configResolved(config) {
      isSsr = !!config.build?.ssr
    },
    closeBundle() {
      if (isSsr) return
      const siteUrl = 'https://freefiremod.xyz'
      let apps = []
      try {
        const dataPath = resolve(import.meta.dirname, 'public/assets/apks/data/apks.json')
        if (existsSync(dataPath)) {
          const raw = JSON.parse(readFileSync(dataPath, 'utf8'))
          if (Array.isArray(raw)) apps = raw
        }
      } catch (err) {
        console.warn('[sitemap] Could not read apks.json, generating sitemap with static URLs only.', err)
      }

      const appEntries = apps.filter((app) => app && typeof app.slug === 'string' && app.slug)
      const dateRe = /^\d{4}-\d{2}-\d{2}/
      const appDates = appEntries
        .map((app) => (typeof app.lastUpdated === 'string' && dateRe.test(app.lastUpdated) ? app.lastUpdated.slice(0, 10) : null))
        .filter(Boolean)
        .sort()
      const storeLastmod = appDates.length ? appDates[appDates.length - 1] : null

      const urls = [
        { loc: `${siteUrl}/` },
        { loc: `${siteUrl}/apk-store`, lastmod: storeLastmod },
        ...appEntries.map((app) => ({
          loc: `${siteUrl}/apk-store/${app.slug}`,
          lastmod: typeof app.lastUpdated === 'string' && dateRe.test(app.lastUpdated) ? app.lastUpdated.slice(0, 10) : null,
        })),
        { loc: `${siteUrl}/about` },
        { loc: `${siteUrl}/contact` },
      ]

      const urlBlocks = urls
        .map((u) => {
          const lastmod = u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''
          return `  <url>\n    <loc>${u.loc}</loc>${lastmod}\n  </url>`
        })
        .join('\n')

      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlBlocks}\n</urlset>\n`
      const outPath = resolve(import.meta.dirname, 'dist/sitemap.xml')
      writeFileSync(outPath, xml, 'utf8')
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), spaFallback404(), sitemapPlugin()],
})


