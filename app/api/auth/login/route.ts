import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  const { email, password } = await request.json()
  const supabase = createClient()

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw new Error(error.message)
    }

    return Response.json(data.user)
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 })
  }
}
