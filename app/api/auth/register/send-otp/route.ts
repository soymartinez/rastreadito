import { getUrl } from '@/lib/utils'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  const { email } = await request.json()
  const supabase = createClient()

  try {
    const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
      redirectTo: getUrl(),
    })

    if (error) {
      switch (error.code) {
      case 'email_exists':
        throw new Error('Un usuario con esta dirección de correo electrónico ya ha sido registrado')
      default:
        throw new Error(error.message)
      }
    }

    return Response.json(data)
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 })
  }
}
