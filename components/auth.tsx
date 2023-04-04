'use client'

import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { LogOut } from 'lucide-react'
import { useSupabase } from './supabase-provider'
import { toast } from 'sonner'
import { useState } from 'react'

interface Props {
    name?: string
    email: string
    password: string
}

function SignIn() {
    const { supabase } = useSupabase()
    const [form, setForm] = useState<Props>({} as Props)

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const form = Object.fromEntries(formData.entries()) as object as Props

        const magicLink = async () => {
            const { error } = await supabase.auth.signInWithOtp({
                email: form.email,
                options: {
                    shouldCreateUser: false,
                }
            })

            toast.promise(() => {
                if (error) return Promise.reject(error)
                return Promise.resolve()
            }, {
                loading: 'Enviando código de verificación...',
                success: 'Código de verificación enviado, revisa tu correo',
                error: (error) => error.message,
            })
        }

        const signIn = async () => {
            const { error } = await supabase.auth.signInWithPassword({
                email: form.email,
                password: form.password,
            })

            toast.promise(() => {
                if (error) return Promise.reject(error)
                return Promise.resolve()
            }, {
                loading: 'Iniciando sesión...',
                success: 'Sesión iniciada',
                error: (error) => error.message,
            })
        }

        form.email && form.password
            ? signIn()
            : magicLink()
    }

    return (
        <form onSubmit={handleSignIn} className='grid gap-4 mt-10'>
            <Input
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                name='email'
                placeholder='bee@example.com'
                type={'email'}
                icon={'email'}
                labelText='Correo electrónico'
                autoComplete='off'
                required
            />
            <Input
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                name='password'
                placeholder='••••••••'
                type={'password'}
                icon={'password'}
                labelText='Contraseña'
            />
            <Button type='submit' className='w-full'>
                {form.email && form.password ? 'Iniciar sesión' : 'Link mágico'}
            </Button>
        </form>
    )
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
    SignIn,
    SignUp,
    SignOut,
}
