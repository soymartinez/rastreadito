import { createClient } from '@/utils/supabase/server'

export const getUser = async () => {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    return null
  }

  return data.user
}