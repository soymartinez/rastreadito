'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader, LogOut } from 'lucide-react'
import { toast } from 'sonner'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

function SignUp() {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
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

    setLoading(false)
  }
  return (
    <form onSubmit={handleSignUp} className='mt-10 grid gap-4'>
      <Input
        name='name'
        placeholder='bee'
        // labelText='Nombre'
        autoComplete='off'
        required
      />
      <Input
        name='email'
        placeholder='bee@example.com'
        type={'email'}
        // labelText='Correo electrónico'
        autoComplete='off'
        required
      />
      <Input
        name='password'
        placeholder='••••••••'
        type={'password'}
        // labelText='Contraseña'
        required
      />
      <Button type='submit' className='w-full'>
        {loading && <Loader size={20} className='animate-spin' />} Registrarse
      </Button>
    </form>
  )
}

function SignOut() {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) router.push('/')
  }
  return (
    <Button onClick={handleSignOut} type={'button'} variant={'ghost'} className='flex h-min items-center gap-3 self-end'>
      <LogOut size={20} /> <span className='text-lg'>Cerrar sesión</span>
    </Button>
  )
}

export {
  SignUp,
  SignOut,
}
