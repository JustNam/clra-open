// Val Town auth strategy: token-based sessions.
//
// Hits the Hono backend's /api/auth/* endpoints via the shared axios client,
// and keeps the JWT in the clra_token cookie (so middleware can gate routes;
// the axios client's interceptor also replays it on subsequent requests).
import apiClient from '@/lib/api/client'
import { getToken, setToken, clearToken } from '@/lib/auth/token'

async function fetchMe() {
  const { data } = await apiClient.get('/api/auth/me')
  return data.user
}

export const valtownAuth = {
  // Restore a session on app load. Returns the user, or null if not logged in.
  restoreSession: async () => {
    if (!getToken()) return null
    try {
      return await fetchMe()
    } catch {
      clearToken()
      return null
    }
  },
  signIn: async (email, password) => {
    const { data } = await apiClient.post('/api/auth/login', { email, password })
    setToken(data.token)
    return data.user
  },
  signUp: async (email, password) => {
    const { data } = await apiClient.post('/api/auth/signup', { email, password })
    setToken(data.token)
    return data.user
  },
  signOut: async () => {
    clearToken()
  },
}
