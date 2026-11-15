import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const distDir = path.resolve(root, 'dist')
const ssrDir = path.resolve(root, 'dist-ssr')

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function escapeAttr(value) {
  return escapeHtml(value)
}

function findSsrEntry() {
  if (!fs.existsSync(ssrDir)) {
    throw new Error('dist-ssr directory not found. Run the SSR build first.')
  }
  const direct = path.join(ssrDir, 'entry-server.js')
  if (fs.existsSync(direct)) return direct
  const files = fs.readdirSync(ssrDir).filter((f) => f.startsWith('entry-server') && f.endsWith('.js'))
  if (files.length === 0) throw new Error('Could not find SSR entry bundle in dist-ssr.')
  return path.join(ssrDir, files[0])
}

function routeToOutFile(route) {
  if (route === '/') return path.join(distDir, 'index.html')
  const clean = route.replace(/^\/+|\/+$/g, '')
  return path.join(distDir, clean, 'index.html')
}

function buildHeadBlock(head) {
  const tags = []
  tags.push(`    <title>${escapeHtml(head.title)}</title>`)
  if (head.description) {
    tags.push(`    <meta name="description" content="${escapeAttr(head.description)}" />`)
  }
  if (head.canonical) {
    tags.push(`    <link rel="canonical" href="${escapeAttr(head.canonical)}" />`)
  }
  if (head.robots) {
    tags.push(`    <meta name="robots" content="${escapeAttr(head.robots)}" />`)
    tags.push(`    <meta name="googlebot" content="${escapeAttr(head.robots)}" />`)
  }
  tags.push(`    <meta property="og:type" content="${escapeAttr(head.type || 'website')}" />`)
  tags.push(`    <meta property="og:site_name" content="FreeFire Mods" />`)
  if (head.canonical) {
    tags.push(`    <meta property="og:url" content="${escapeAttr(head.canonical)}" />`)
  }
  tags.push(`    <meta property="og:title" content="${escapeAttr(head.title)}" />`)
  if (head.description) {
    tags.push(`    <meta property="og:description" content="${escapeAttr(head.description)}" />`)
  }
  if (head.image) {
    tags.push(`    <meta property="og:image" content="${escapeAttr(head.image)}" />`)
  }
  if (head.imageAlt) {
    tags.push(`    <meta property="og:image:alt" content="${escapeAttr(head.imageAlt)}" />`)
  }
  tags.push(`    <meta name="twitter:card" content="summary_large_image" />`)
  tags.push(`    <meta name="twitter:title" content="${escapeAttr(head.title)}" />`)
  if (head.description) {
    tags.push(`    <meta name="twitter:description" content="${escapeAttr(head.description)}" />`)
  }
  if (head.image) {
    tags.push(`    <meta name="twitter:image" content="${escapeAttr(head.image)}" />`)
  }
  return tags.join('\n')
}

function stripSeoHead(html) {
  let out = html
  out = out.replace(/\s*<title>[\s\S]*?<\/title>/i, '')
  out = out.replace(/\s*<meta\s+name=["']description["'][^>]*>/gi, '')
  out = out.replace(/\s*<link\s+rel=["']canonical["'][^>]*>/gi, '')
  out = out.replace(/\s*<meta\s+name=["']robots["'][^>]*>/gi, '')
  out = out.replace(/\s*<meta\s+name=["']googlebot["'][^>]*>/gi, '')
  out = out.replace(/\s*<meta\s+property=["']og:[^"']+["'][^>]*>/gi, '')
  out = out.replace(/\s*<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, '')
  return out
}

function injectHeadAndBody(template, headBlock, appHtml, apkDataScript) {
  let out = stripSeoHead(template)
  if (!out.includes('</head>')) throw new Error('Template missing </head>.')
  out = out.replace('</head>', `\n${headBlock}\n  </head>`)

  if (!out.includes('<div id="root"></div>')) throw new Error('Template missing <div id="root"></div>.')
  out = out.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

  const moduleScriptRe = /<script\s+type=["']module["'][^>]*src=["'][^"']*["'][^>]*><\/script>/
  if (!moduleScriptRe.test(out)) throw new Error('Template missing module script tag.')
  out = out.replace(moduleScriptRe, `${apkDataScript}\n    $&`)
  return out
}

function write404(distPath) {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page not found | FreeFire Mods</title>
    <meta name="robots" content="noindex, follow" />
  </head>
  <body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0b1933;color:#f8fafc;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;">
    <main style="max-width:32rem;padding:2rem;text-align:center;">
      <h1 style="margin:0 0 0.75rem;font-size:2rem;line-height:1.2;">Page not found</h1>
      <p style="margin:0 0 1.25rem;color:#cbd5e1;line-height:1.6;">This page could not be found.</p>
      <p style="margin:0;line-height:1.8;"><a href="/" style="color:#93c5fd;">Go to Home</a> · <a href="/apk-store" style="color:#93c5fd;">Go to APK Store</a></p>
    </main>
  </body>
</html>
`
  fs.writeFileSync(path.join(distPath, '404.html'), html, 'utf8')
}

async function main() {
  const apksPath = path.resolve(root, 'public/assets/apks/data/apks.json')
  if (!fs.existsSync(apksPath)) throw new Error(`Missing ${apksPath}`)
  const rawApks = JSON.parse(fs.readFileSync(apksPath, 'utf8'))
  if (!Array.isArray(rawApks)) throw new Error('apks.json must be an array.')
  globalThis.__APK_DATA__ = rawApks

  const ssrEntry = findSsrEntry()
  const ssrModule = await import(pathToFileURL(ssrEntry).href)
  if (typeof ssrModule.render !== 'function') throw new Error('SSR bundle does not export render(url).')

  const templatePath = path.join(distDir, 'index.html')
  if (!fs.existsSync(templatePath)) throw new Error('dist/index.html not found. Run client build first.')
  const template = fs.readFileSync(templatePath, 'utf8')

  const appSlugs = rawApks.filter((a) => a && typeof a.slug === 'string' && a.slug).map((a) => a.slug)
  const routes = [
    '/',
    '/apk-store',
    ...appSlugs.map((slug) => `/apk-store/${slug}`),
    '/about',
    '/contact',
    '/terms',
    '/privacy-policy',
    '/disclaimer',
    '/dmca',
  ]

  const apkDataScript = `<script>window.__APK_DATA__=${JSON.stringify(rawApks).replace(/</g, '\\u003c')}</script>`
  const summary = []
  const failures = []

  for (const route of routes) {
    const { html: appHtml, head } = ssrModule.render(route)
    if (!head) {
      throw new Error(`[prerender] Missing head for route ${route}. A page lacks metadata.`)
    }
    const headBlock = buildHeadBlock(head)
    const outHtml = injectHeadAndBody(template, headBlock, appHtml, apkDataScript)
    const outFile = routeToOutFile(route)
    fs.mkdirSync(path.dirname(outFile), { recursive: true })
    fs.writeFileSync(outFile, outHtml, 'utf8')

    const hasH1 = /<h1[\s>]/i.test(appHtml)
    const hasTitle = !!(head.title && String(head.title).trim())
    const hasCanonical = !!(head.canonical && String(head.canonical).trim())
    if (!hasH1 || !hasTitle || !hasCanonical) {
      failures.push(`${route}: h1=${hasH1} title=${hasTitle} canonical=${hasCanonical}`)
    }
    if (/Loading application/i.test(outHtml)) {
      failures.push(`${route}: contains "Loading application"`)
    }
    summary.push({ route, file: path.relative(root, outFile), title: head.title, length: outHtml.length })
  }

  write404(distDir)

  console.log('\n[prerender] Summary:')
  console.log('route | file | title | html length')
  for (const row of summary) {
    console.log(`${row.route} | ${row.file} | ${row.title} | ${row.length}`)
  }
  console.log(`[prerender] Wrote ${summary.length} route(s) and dist\\404.html`)

  if (failures.length) {
    console.error('\n[prerender] Validation failures:')
    for (const f of failures) console.error(` - ${f}`)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('[prerender] Failed:', err)
  process.exit(1)
})
