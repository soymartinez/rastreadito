import { createClient } from '@/utils/supabase/server'

export async function GET() {
  const supabase = createClient()
  const { data: { users }, error } = await supabase.auth.admin.listUsers()

  return Response.json(users)
}