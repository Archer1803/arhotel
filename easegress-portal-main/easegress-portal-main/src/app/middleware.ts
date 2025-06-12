import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const user = request.cookies.get('user')?.value || null

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!user || JSON.parse(user).role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  if (request.nextUrl.pathname.startsWith('/user')) {
    if (!user || JSON.parse(user).role !== 'user') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/user/:path*'],
}
