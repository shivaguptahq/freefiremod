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
  out = out.replace(/\s*<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '')
  return out
}

function buildJsonLdBlock(jsonld) {
  if (!Array.isArray(jsonld) || jsonld.length === 0) return ''
  return jsonld
    .map((schema) => `    <script type="application/ld+json" data-seo="1">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`)
    .join('\n')
}

function injectHeadAndBody(template, headBlock, jsonldBlock, appHtml, apkDataScript) {
  let out = stripSeoHead(template)
  if (!out.includes('</head>')) throw new Error('Template missing </head>.')
  const blocks = [headBlock, jsonldBlock].filter(Boolean).join('\n')
  out = out.replace('</head>', `\n${blocks}\n  </head>`)

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

function getVisibleBreadcrumbs(appHtml) {
  const navMatch = appHtml.match(/<nav[^>]*aria-label=["']Breadcrumb["'][^>]*>[\s\S]*?<\/nav>/i)
  if (!navMatch) return null
  const nav = navMatch[0]
  const itemRe = /<li[\s\S]*?>([\s\S]*?)<\/li>/gi
  const items = []
  let m
  while ((m = itemRe.exec(nav))) {
    const chunk = m[1]
    const linkMatch = chunk.match(/<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/i)
    if (linkMatch) {
      items.push({ name: linkMatch[2].replace(/<[^>]+>/g, '').trim(), urlPath: linkMatch[1] })
      continue
    }
    const spanMatch = chunk.match(/<span[^>]*aria-current=["']page["'][^>]*>([\s\S]*?)<\/span>/i)
    if (spanMatch) {
      items.push({ name: spanMatch[1].replace(/<[^>]+>/g, '').trim(), current: true })
    }
  }
  return items
}

function findForbidden(obj, path = '$', found = []) {
  if (obj == null) return found
  const forbiddenKeys = new Set(['aggregateRating', 'review', 'rating', 'offers', 'price', 'downloadUrl', 'applicationCategory', 'operatingSystem', 'fileSize'])
  const forbiddenTypes = new Set(['SoftwareApplication'])
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => findForbidden(v, `${path}[${i}]`, found))
    return found
  }
  if (typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      if (forbiddenKeys.has(k)) found.push(`${path}.${k}`)
      if (k === '@type' && forbiddenTypes.has(String(v))) found.push(`${path}.@type=${v}`)
      findForbidden(v, `${path}.${k}`, found)
    }
  }
  return found
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

  const appTitleBySlug = new Map(rawApks.filter((a) => a && a.slug && a.title).map((a) => [a.slug, String(a.title)]))
  const noSchemaRoutes = new Set(['/about', '/contact', '/terms', '/privacy-policy', '/disclaimer', '/dmca'])

  const apkDataScript = `<script>window.__APK_DATA__=${JSON.stringify(rawApks).replace(/</g, '\\u003c')}</script>`
  const summary = []
  const failures = []

  for (const route of routes) {
    const { html: appHtml, head, jsonld } = ssrModule.render(route)
    if (!head) {
      throw new Error(`[prerender] Missing head for route ${route}. A page lacks metadata.`)
    }
    const headBlock = buildHeadBlock(head)
    const jsonldArr = Array.isArray(jsonld) ? jsonld : []
    const jsonldBlock = buildJsonLdBlock(jsonldArr)
    const outHtml = injectHeadAndBody(template, headBlock, jsonldBlock, appHtml, apkDataScript)
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

    // JSON-LD checks
    const scriptRe = /<script\s+type=["']application\/ld\+json["'][^>]*data-seo=["']1["'][^>]*>([\s\S]*?)<\/script>/gi
    const blocks = []
    let sm
    while ((sm = scriptRe.exec(outHtml))) blocks.push(sm[1])
    let parsedBlocks = []
    for (const b of blocks) {
      try {
        parsedBlocks.push(JSON.parse(b))
      } catch {
        failures.push(`${route}: JSON-LD block failed to parse as JSON`)
      }
    }
    const forbidden = parsedBlocks.flatMap((s) => findForbidden(s))
    if (forbidden.length) failures.push(`${route}: forbidden JSON-LD keys/types found: ${forbidden.join(', ')}`)

    if (route === '/') {
      const org = parsedBlocks.filter((s) => s['@type'] === 'Organization')
      const web = parsedBlocks.filter((s) => s['@type'] === 'WebSite')
      if (org.length !== 1 || web.length !== 1) failures.push(`${route}: expected exactly 1 Organization and 1 WebSite, got ${org.length}/${web.length}`)
    }
    if (noSchemaRoutes.has(route)) {
      if (parsedBlocks.length !== 0) failures.push(`${route}: expected no structured data, found ${parsedBlocks.length}`)
    }
    if (route === '/apk-store' || route.startsWith('/apk-store/')) {
      const crumbs = parsedBlocks.filter((s) => s['@type'] === 'BreadcrumbList')
      if (crumbs.length !== 1) failures.push(`${route}: expected 1 BreadcrumbList, got ${crumbs.length}`)
      const crumb = crumbs[0]
      const visible = getVisibleBreadcrumbs(appHtml)
      if (!crumb || !visible) {
        failures.push(`${route}: missing breadcrumb schema or visible breadcrumbs`)
      } else {
        const items = Array.isArray(crumb.itemListElement) ? crumb.itemListElement : []
        const last = items[items.length - 1]
        const expectedLastName = route === '/apk-store' ? 'APK Store' : (appTitleBySlug.get(route.split('/').pop()) || '')
        if (!last || String(last.name) !== expectedLastName) failures.push(`${route}: breadcrumb last item name mismatch (schema="${last?.name}" expected="${expectedLastName}")`)
        if (visible.length !== items.length) failures.push(`${route}: visible breadcrumb count ${visible.length} != schema ${items.length}`)
        const visibleNames = visible.map((v) => v.name)
        const schemaNames = items.map((i) => String(i.name))
        if (JSON.stringify(visibleNames) !== JSON.stringify(schemaNames)) failures.push(`${route}: breadcrumb names mismatch visible=${JSON.stringify(visibleNames)} schema=${JSON.stringify(schemaNames)}`)
        const schemaUrls = items.map((i) => String(i.item || ''))
        const expectedUrls = route === '/apk-store'
          ? ['https://freefiremod.xyz/', 'https://freefiremod.xyz/apk-store']
          : ['https://freefiremod.xyz/', 'https://freefiremod.xyz/apk-store', `https://freefiremod.xyz${route}`]
        if (JSON.stringify(schemaUrls) !== JSON.stringify(expectedUrls)) failures.push(`${route}: breadcrumb URLs mismatch schema=${JSON.stringify(schemaUrls)} expected=${JSON.stringify(expectedUrls)}`)
        if (!visible[visible.length - 1]?.current) failures.push(`${route}: last visible breadcrumb is not aria-current="page" text`)
        if (visible.some((v, i) => i < visible.length - 1 && !v.urlPath)) failures.push(`${route}: non-last visible breadcrumb missing link`)
      }
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
