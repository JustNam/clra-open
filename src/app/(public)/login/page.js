'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import Link from 'next/link'

export default function LoginPage() {
  const { signIn } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error: signInError } = await signIn(email, password)
    if (signInError) {
      setError(signInError.message)
      setLoading(false)
    } else {
      router.push(ROUTES.INTERVIEWS.LIST)
    }
  }

  return (
    <div style={{ width: 360 }}>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type='submit' disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
      <p>No account? <Link href={ROUTES.AUTH.SIGNUP}>Sign up</Link></p>
    </div>
  )
}
