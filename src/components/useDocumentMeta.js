import { useEffect } from 'react'
import { absoluteUrl, SITE_NAME } from '../seo/siteConfig.js'
import { buildTitle } from '../seo/metaHelpers.js'

function setMeta(selector, attr, value, createTag = 'meta', createAttrs = {}) {
  if (!value) return
  let el = document.querySelector(selector)
  if (!el) {
    el = document.createElement(createTag)
    for (const [key, val] of Object.entries(createAttrs)) el.setAttribute(key, val)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

export function useDocumentMeta(title, description, canonicalPath, options = {}) {
  const {
    fullTitle = false,
    robots = 'index, follow, max-image-preview:large',
    image = '/og-image.png',
    imageAlt,
    type = 'website',
    skip = false,
  } = options

  const resolvedTitle = buildTitle(title, { full: fullTitle })
  const resolvedImage = image && /^https?:\/\//i.test(image) ? image : absoluteUrl(image || '/og-image.png')
  const resolvedImageAlt = imageAlt || resolvedTitle || SITE_NAME
  const resolvedCanonical = canonicalPath ? absoluteUrl(canonicalPath) : ''

  if (typeof window === 'undefined' && !skip) {
    globalThis.__SEO_HEAD__ = {
      title: resolvedTitle,
      description: description || '',
      canonical: resolvedCanonical,
      robots,
      image: resolvedImage,
      imageAlt: resolvedImageAlt,
      type,
    }
  }

  useEffect(() => {
    if (skip) return
    document.title = resolvedTitle
    setMeta('meta[name="description"]', 'content', description, 'meta', { name: 'description' })
    setMeta('meta[property="og:title"]', 'content', resolvedTitle, 'meta', { property: 'og:title' })
    setMeta('meta[property="og:description"]', 'content', description, 'meta', { property: 'og:description' })
    setMeta('meta[name="twitter:title"]', 'content', resolvedTitle, 'meta', { name: 'twitter:title' })
    setMeta('meta[name="twitter:description"]', 'content', description, 'meta', { name: 'twitter:description' })
    if (resolvedCanonical) {
      setMeta('link[rel="canonical"]', 'href', resolvedCanonical, 'link', { rel: 'canonical' })
      setMeta('meta[property="og:url"]', 'content', resolvedCanonical, 'meta', { property: 'og:url' })
    }
    setMeta('meta[name="robots"]', 'content', robots, 'meta', { name: 'robots' })
    setMeta('meta[name="googlebot"]', 'content', robots, 'meta', { name: 'googlebot' })
    setMeta('meta[property="og:type"]', 'content', type, 'meta', { property: 'og:type' })
    setMeta('meta[property="og:image"]', 'content', resolvedImage, 'meta', { property: 'og:image' })
    setMeta('meta[property="og:image:alt"]', 'content', resolvedImageAlt, 'meta', { property: 'og:image:alt' })
    setMeta('meta[name="twitter:image"]', 'content', resolvedImage, 'meta', { name: 'twitter:image' })
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image', 'meta', { name: 'twitter:card' })
  }, [skip, resolvedTitle, description, resolvedCanonical, robots, type, resolvedImage, resolvedImageAlt])
}
