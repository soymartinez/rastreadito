import { createServerComponentSupabaseClient, User } from '@supabase/auth-helpers-nextjs'
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

interface UserMetadata {
    name: string
}

export async function getCurrentUser() {
    try {
        const { user } = await useSupabaseServer()

        if (!user) return null

        const currentUser = {
            ...user,
            user_metadata: user?.user_metadata as UserMetadata,
        } as User

        return currentUser
    } catch (error: any) {
        return null
    }
}