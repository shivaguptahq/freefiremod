import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppRoutes } from './App.jsx'

export function render(url) {
  globalThis.__SEO_HEAD__ = null
  globalThis.__SEO_JSONLD__ = []
  const html = renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>,
  )
  return { html, head: globalThis.__SEO_HEAD__, jsonld: globalThis.__SEO_JSONLD__ }
}

