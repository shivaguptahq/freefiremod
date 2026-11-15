import { SITE_NAME } from './siteConfig.js'

export function buildTitle(title, { full = false } = {}) {
  if (!title) return SITE_NAME
  if (full || title.includes(SITE_NAME)) return title
  const suffixed = `${title} | ${SITE_NAME}`
  return suffixed.length <= 60 ? suffixed : title
}

export function truncateAtWord(text, max = 158) {
  const clean = (text || '').replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max - 1)
  const space = cut.lastIndexOf(' ')
  return `${(space > 0 ? cut.slice(0, space) : cut).trimEnd()}…`
}

export function buildAppTitle(app) {
  const name = app?.title || 'Application'
  const version = app?.version
  return version ? `${name} APK – Version ${version}` : `${name} APK`
}

export function buildAppDescription(app) {
  const name = app?.title || 'Application'
  const version = app?.version
  const size = app?.size
  const short = app?.shortDescription || ''
  const parts = [`${name} APK`]
  if (version) parts.push(` v${version}`)
  if (size) parts.push(` (${size})`)
  const base = `${parts.join('')}. ${short}`.trim()
  return truncateAtWord(base, 158)
}
