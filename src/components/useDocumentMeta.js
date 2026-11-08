import { useEffect } from 'react'

const siteName = 'FreeFire Mods'

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

export function useDocumentMeta(title, description, canonicalPath) {
  useEffect(() => {
    document.title = title ? `${title} | ${siteName}` : siteName
    setMeta('meta[name="description"]', 'content', description, 'meta', { name: 'description' })
    setMeta('meta[property="og:title"]', 'content', title ? `${title} | ${siteName}` : siteName, 'meta', { property: 'og:title' })
    setMeta('meta[property="og:description"]', 'content', description, 'meta', { property: 'og:description' })
    if (canonicalPath && typeof window !== 'undefined') {
      setMeta('link[rel="canonical"]', 'href', `${window.location.origin}${canonicalPath}`, 'link', { rel: 'canonical' })
      setMeta('meta[property="og:url"]', 'content', `${window.location.origin}${canonicalPath}`, 'meta', { property: 'og:url' })
    }
  }, [title, description, canonicalPath])
}
