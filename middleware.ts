import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { createClient } from './utils/supabase/server'

const publicRoutes = [
  '/',
  '/login',
  '/signup',
  '/sso-callback',
  '/api'
]

export async function middleware(request: NextRequest) {
  const supabase = createClient()
  const url = new URL(request.nextUrl.origin)

  // Supabase user
  const { data: { user } } = await supabase.auth.getUser()

  //  For public routes, we don't need to do anything
  if (publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  //  redirect them to the sign in page
  if (!user?.id) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}