import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { headers, cookies } from 'next/headers'

export const useSupabaseServer = async () => {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    })

    const { data: { user } } = await supabase.auth.getUser()

    return {
        supabase,
        user,
    }
}
