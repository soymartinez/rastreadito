'use client'

import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { LogOut } from 'lucide-react'
import { useSupabase } from './supabase-provider'
import { toast } from 'sonner'

interface Props {
    name?: string
    email: string
    password: string
}

function SignUp() {
    const { supabase } = useSupabase()

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const form = Object.fromEntries(formData.entries()) as object as Props

        const { error } = await supabase.auth.signUp(
            {
                email: form.email,
                password: form.password,
                options: {
                    data: {
                        name: form.name,
                    }
                }
            }
        )

        toast.promise(() => {
            if (error) return Promise.reject(error)
            return Promise.resolve()
        }, {
            loading: 'Creando cuenta...',
            success: 'Cuenta creada, revisa tu correo para verificarla',
            error: (error) => error.message,
        })
    }
    return (
        <form onSubmit={handleSignUp} className='grid gap-4 mt-10'>
            <Input name='name' placeholder='bee' labelText='Nombre' autoComplete='off' required />
            <Input name='email' placeholder='bee@example.com' type={'email'} labelText='Correo electrónico' autoComplete='off' required />
            <Input name='password' placeholder='••••••••' type={'password'} labelText='Contraseña' required />
            <Button type='submit' className='w-full'>Continuar</Button>
        </form>
    )
}

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
    SignUp,
    SignOut,
}
