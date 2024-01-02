import { useSupabaseServer } from '@/hooks/auth'
import { NextResponse } from 'next/server'

export async function PATCH(request: Request) {
  const { supabase } = await useSupabaseServer()
  const {
    name,
  } = await request.json()
  const res = await supabase.auth.updateUser({
    data: {
      name,
    },
  })

  if (res.error) {
    return NextResponse.error()
  }

  return NextResponse.json(res)
}