import { useEffect } from 'react'

export function useStructuredData(schemas) {
  if (typeof window === 'undefined') {
    if (schemas && Array.isArray(schemas) && schemas.length) {
      if (!Array.isArray(globalThis.__SEO_JSONLD__)) globalThis.__SEO_JSONLD__ = []
      globalThis.__SEO_JSONLD__.push(...schemas)
    }
  }

  const serialized = JSON.stringify(schemas ?? null)

  useEffect(() => {
    if (typeof document === 'undefined') return undefined
    const existing = document.head.querySelectorAll('script[type="application/ld+json"][data-seo="1"]')
    existing.forEach((el) => el.remove())

    let parsed = null
    try {
      parsed = JSON.parse(serialized)
    } catch {
      parsed = null
    }
    if (!parsed || !Array.isArray(parsed) || parsed.length === 0) return undefined

    const added = []
    for (const schema of parsed) {
      if (!schema) continue
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-seo', '1')
      script.textContent = JSON.stringify(schema)
      document.head.appendChild(script)
      added.push(script)
    }

    return () => {
      for (const el of added) {
        if (el.parentNode) el.parentNode.removeChild(el)
      }
    }
  }, [serialized])
}

export default useStructuredData
