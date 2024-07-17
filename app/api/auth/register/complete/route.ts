import { prisma } from '@/lib/prisma'
import { authPasswordSchema } from '@/lib/validations/auth'
import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'

export async function POST(request: Request) {
  const { name, password } = await request.json() as z.infer<typeof authPasswordSchema>
  const supabase = createClient()

  try {
    const { data, error } = await supabase.auth.updateUser({
      password,
      data: {
        name
      }
    })

    if (error) {
      throw new Error(error.message)
    }

    if (data.user.email) {
      await prisma.user.create({
        data: {
          name,
          email: data.user.email,
        }
      }).then(async (user) => {
        await supabase.auth.updateUser({
          data: {
            id: user.id
          }
        })
      })

      return Response.json(data)
    }
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 })
  }
}
