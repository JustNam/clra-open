// Supabase auth strategy.
//
// Supabase-js persists its own session (localStorage) and refreshes tokens
// automatically. On top of that we mirror the access token into the clra_token
// cookie so the Next.js middleware can gate routes server-side — the same
// cookie the valtown strategy uses, so middleware needs no backend-specific logic.
import { getSupabaseClient } from '@/lib/supabase/client'
import { setToken, clearToken } from '@/lib/auth/token'

function mapUser(user) {
  return user ? { id: user.id, email: user.email } : null
}

export const supabaseAuth = {
  restoreSession: async () => {
    const { data } = await getSupabaseClient().auth.getSession()
    const session = data.session
    if (!session) {
      clearToken()
      return null
    }
    setToken(session.access_token)
    return mapUser(session.user)
  },
  signIn: async (email, password) => {
    const { data, error } = await getSupabaseClient().auth.signInWithPassword({ email, password })
    if (error) throw error
    if (data.session?.access_token) setToken(data.session.access_token)
    return mapUser(data.user)
  },
  signUp: async (email, password) => {
    const { data, error } = await getSupabaseClient().auth.signUp({ email, password })
    if (error) throw error
    // If email confirmation is enabled, session is null until the user confirms.
    if (data.session?.access_token) setToken(data.session.access_token)
    return mapUser(data.user)
  },
  signOut: async () => {
    await getSupabaseClient().auth.signOut()
    clearToken()
  },
}
