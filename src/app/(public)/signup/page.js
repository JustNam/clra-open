'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import Link from 'next/link'

export default function SignupPage() {
  const { signUp } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error: signUpError } = await signUp(email, password)
    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
    } else {
      router.push(ROUTES.INTERVIEWS.LIST)
    }
  }

  return (
    <div style={{ width: 360 }}>
      <h1>Create account</h1>
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
          {loading ? 'Creating account...' : 'Sign up'}
        </button>
      </form>
      <p>Have an account? <Link href={ROUTES.AUTH.LOGIN}>Sign in</Link></p>
    </div>
  )
}
