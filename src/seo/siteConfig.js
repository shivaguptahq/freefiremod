// Single source of truth for the production host; canonicals/og:url/sitemap are built from it.
export const SITE_URL = 'https://freefiremod.xyz'
export const SITE_NAME = 'FreeFire Mods'
export function absoluteUrl(path = '/') {
  const clean = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${clean}`
}
