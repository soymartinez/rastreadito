'use client'

import { Button } from '@/ui/button'
import { LogOut } from 'lucide-react'
import { useSupabase } from './supabase-provider'

function SignOut() {
    const { supabase } = useSupabase()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
    }
    return (
        <Button onClick={handleSignOut} variant={'ghost'} className='h-min flex items-center gap-3 self-end'>
            <LogOut size={20} /> <span className='text-lg'>Cerrar sesión</span>
        </Button>
    )
}

export {
    SignOut,
}
