import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/utils/supabase/server'
import { getUrl } from '@/lib/utils'

export async function POST(request: NextRequest) {
  const { email, code } = await request.json()

  const supabase = createClient()

  const { error } = await supabase.auth.verifyOtp({
    email,
    token: code,
    type: 'email'
  })

  if (!error) {
    return Response.json({
      status: 'succeeded'
    })
  }

  return Response.json({
    status: 'error',
    error: error.message
  }, { status: 400 })
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'

  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next
  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')

  if (token_hash && type) {
    const supabase = createClient()
    await supabase.auth.refreshSession({ refresh_token: token_hash })

    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
      options: {
        redirectTo: getUrl()
      }
    })

    if (error) {
      return Response.json({ error: error.message }, { status: 400 })
    }

    if (data) {
      redirectTo.searchParams.delete('next')

      // switch (type) {
      // case 'invite':
      //   redirectTo.pathname = '/registro/verificar'
      //   break
      // default:
      //   break
      // }

      return NextResponse.redirect(redirectTo)
    }
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = '/error'
  return NextResponse.redirect(redirectTo)
}