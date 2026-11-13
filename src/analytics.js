const TRACK_ENDPOINT = 'https://snljpxdofqzdivifkuua.supabase.co/functions/v1/track-visitor'
const SESSION_FLAG = 'ffm_visitor_tracked'

let inFlight = false

export async function trackVisitor() {
  if (typeof window === 'undefined') return
  if (inFlight) return

  // Avoid duplicate tracking on re-renders/remounts within the same browser session.
  try {
    if (window.sessionStorage.getItem(SESSION_FLAG) === '1') return
  } catch {
    // sessionStorage may be unavailable; continue with in-memory guard only.
  }

  const url = import.meta.env.VITE_SUPABASE_URL
    ? `${import.meta.env.VITE_SUPABASE_URL.replace(/\/$/, '')}/functions/v1/track-visitor`
    : TRACK_ENDPOINT
  const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  if (!apiKey) return

  inFlight = true
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        apikey: apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
      keepalive: true,
    })
    if (res.ok) {
      try {
        window.sessionStorage.setItem(SESSION_FLAG, '1')
      } catch {
        // ignore storage errors
      }
    }
    return res
  } catch {
    // Tracking must never affect site functionality.
    return null
  } finally {
    inFlight = false
  }
}
