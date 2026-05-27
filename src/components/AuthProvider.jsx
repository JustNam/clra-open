'use client'

import { createContext, useState, useEffect } from 'react'
import { AuthApi } from '@/api/auth'
import { getToken, setToken, clearToken } from '@/lib/auth/token'

export const AuthContext = createContext(null)

// Pull a human-readable message out of an axios error.
function toError(err) {
  const message = err?.response?.data?.error || err?.message || 'Something went wrong'
  return { message }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // On mount, restore the session from the stored token (if any).
  useEffect(() => {
    if (!getToken()) {
      setLoading(false)
      return
    }
    AuthApi.me()
      .then((u) => setUser(u))
      .catch(() => {
        clearToken()
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const signIn = async (email, password) => {
    try {
      const { token, user: u } = await AuthApi.login(email, password)
      setToken(token)
      setUser(u)
      return { error: null }
    } catch (err) {
      return { error: toError(err) }
    }
  }

  const signUp = async (email, password) => {
    try {
      const { token, user: u } = await AuthApi.signup(email, password)
      setToken(token)
      setUser(u)
      return { error: null }
    } catch (err) {
      return { error: toError(err) }
    }
  }

  const signOut = async () => {
    clearToken()
    setUser(null)
    return { error: null }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
