'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ROUTES } from '@/constants/routes'

export default function AuthenticatedLayout({ children }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push(ROUTES.AUTH.LOGIN)
    }
  }, [user, loading, router])

  if (loading) return null
  if (!user) return null

  return <>{children}</>
}
