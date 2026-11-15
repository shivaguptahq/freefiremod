import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppRoutes } from './App.jsx'

export function render(url) {
  globalThis.__SEO_HEAD__ = null
  const html = renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>,
  )
  return { html, head: globalThis.__SEO_HEAD__ }
}
