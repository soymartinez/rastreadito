import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const requestHeaders = new Headers(req.headers)
    requestHeaders.set('x-search', req.nextUrl.search)
    requestHeaders.set('x-origin', req.nextUrl.origin)

    const res = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })

    const supabase = createMiddlewareSupabaseClient({ req, res })
    const {
        data: { session },
    } = await supabase.auth.getSession()

    const protectedRoutes = [
        '/',
        '/account',
        '/metadata',
    ]
    const url = new URL(req.url)

    if (!session && protectedRoutes.includes(req.nextUrl.pathname)) {
        url.pathname = '/auth'
        return NextResponse.redirect(url)
    }

    if (session && req.nextUrl.pathname === '/auth') {
        url.pathname = '/'
        return NextResponse.redirect(url)
    }

    return res
}