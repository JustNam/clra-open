'use client'

import { createContext, useState, useEffect } from 'react'
import { authStrategy } from '@/auth/strategy'

export const AuthContext = createContext(null)

// Pull a human-readable message out of an error (axios or otherwise).
function toError(err) {
  const message = err?.response?.data?.error || err?.message || 'Something went wrong'
  return { message }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // On mount, restore the session via the active backend's strategy.
  useEffect(() => {
    authStrategy
      .restoreSession()
      .then((u) => setUser(u ?? null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const signIn = async (email, password) => {
    try {
      setUser(await authStrategy.signIn(email, password))
      return { error: null }
    } catch (err) {
      return { error: toError(err) }
    }
  }

  const signUp = async (email, password) => {
    try {
      setUser(await authStrategy.signUp(email, password))
      return { error: null }
    } catch (err) {
      return { error: toError(err) }
    }
  }

  const signOut = async () => {
    await authStrategy.signOut()
    setUser(null)
    return { error: null }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
