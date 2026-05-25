import { NextResponse } from 'next/server'

const PUBLIC_ROUTES = ['/login', '/signup']

export function middleware(request) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('sb-access-token')?.value
    || request.cookies.get('supabase-auth-token')?.value

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
