// Val Town auth strategy: token-based sessions. The token is kept in the
// clra_token cookie (so middleware can gate routes) and replayed via the
// axios client's request interceptor.
import { AuthApi } from '@/api/providers/valtown/auth'
import { getToken, setToken, clearToken } from '@/lib/auth/token'

export const valtownAuth = {
  // Restore a session on app load. Returns the user, or null if not logged in.
  restoreSession: async () => {
    if (!getToken()) return null
    try {
      return await AuthApi.me()
    } catch {
      clearToken()
      return null
    }
  },
  signIn: async (email, password) => {
    const { token, user } = await AuthApi.login(email, password)
    setToken(token)
    return user
  },
  signUp: async (email, password) => {
    const { token, user } = await AuthApi.signup(email, password)
    setToken(token)
    return user
  },
  signOut: async () => {
    clearToken()
  },
}
