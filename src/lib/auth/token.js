// App session cookie. We keep a token in a cookie (not just localStorage) so the
// Next.js middleware can read it server-side to gate routes. Used by both
// backends: valtown stores its JWT here; the supabase strategy mirrors the
// Supabase access token here. See src/middleware.js.
const TOKEN_KEY = 'clra_token'
const MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export function getToken() {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${TOKEN_KEY}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

export function setToken(token) {
  if (typeof document === 'undefined') return
  document.cookie = `${TOKEN_KEY}=${encodeURIComponent(token)}; path=/; max-age=${MAX_AGE}; SameSite=Lax`
}

export function clearToken() {
  if (typeof document === 'undefined') return
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`
}

export { TOKEN_KEY }
