import { NextResponse } from 'next/server'

const PUBLIC_ROUTES = ['/login', '/signup']

// The session cookie name depends on the active backend.
const BACKEND = process.env.NEXT_PUBLIC_BACKEND || 'valtown'
const TOKEN_COOKIE = BACKEND === 'supabase' ? 'sb-access-token' : 'clra_token'

export function middleware(request) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(TOKEN_COOKIE)?.value

  const isPublic = PUBLIC_ROUTES.some(route => pathname.startsWith(route))

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token && isPublic) {
    return NextResponse.redirect(new URL('/interviews/list', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
