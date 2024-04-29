'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader, LogOut } from 'lucide-react'
import { toast } from 'sonner'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

interface Props {
    name?: string
    email: string
    password: string
}

export function SignIn() {
  const router = useRouter()
  const supabase = createClient()
  const [form, setForm] = useState<Props>({} as Props)
  const [loading, setLoading] = useState(false)

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const form = Object.fromEntries(formData.entries()) as object as Props

    const magicLink = async () => {
      setLoading(true)
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

      setLoading(false)
    }

    const signIn = async () => {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      })

      toast.promise(() => {
        if (error) return Promise.reject(error)
        return Promise.resolve()
      }, {
        loading: 'Iniciando sesión...',
        success: () => {
          router.refresh()
          router.push('/')
          return 'Sesión iniciada'
        },
        error: (error) => error.message,
      })

      setLoading(false)
    }

    form.email && form.password
      ? signIn()
      : magicLink()
  }

  return (
    <form onSubmit={handleSignIn} className='mt-10 grid gap-4'>
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
      <Button type='submit' className='w-full gap-2'>
        {loading && <Loader size={20} className='animate-spin' />} {form.email && form.password ? 'Iniciar sesión' : 'Link mágico'}
      </Button>
    </form>
  )
}

function SignInWhitGoogle() {
  const supabase = createClient()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  return (
    <button onClick={handleSignIn} className='flex size-12 items-center justify-center rounded-full bg-gray transition-all hover:opacity-80 dark:hover:opacity-90'>
      <svg width={16} height={17} viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <mask id='mask0_42_69' maskUnits='userSpaceOnUse' x='0' y='0' width='16' height='17'>
          <path d='M15.9034 0H0V17H15.9034V0Z' fill='white' />
        </mask>
        <g mask='url(#mask0_42_69)'>
          <path d='M15.9034 8.69519C15.9034 8.11738 15.8587 7.53646 15.7633 6.96802H8.11119V10.2412H12.4932C12.3113 11.2969 11.7271 12.2308 10.8716 12.8241V14.9479H13.4859C15.0211 13.4675 15.9034 11.2813 15.9034 8.69519Z' fill='#4285F4' />
          <path d='M8.11119 17.0001C10.2992 17.0001 12.1444 16.2474 13.4888 14.9481L10.8745 12.8243C10.1472 13.3428 9.20818 13.6364 8.11416 13.6364C5.99769 13.6364 4.20315 12.1402 3.55927 10.1289H0.861496V12.3183C2.2387 15.1887 5.04379 17.0001 8.11119 17.0001Z' fill='#34A853' />
          <path d='M3.55628 10.1289C3.21645 9.07327 3.21645 7.93015 3.55628 6.87448V4.68506H0.8615C-0.28915 7.08686 -0.28915 9.91655 0.8615 12.3183L3.55628 10.1289Z' fill='#FBBC04' />
          <path d='M8.11119 3.36385C9.2678 3.34512 10.3857 3.80111 11.2233 4.63816L13.5395 2.21136C12.0729 0.768411 10.1263 -0.0249017 8.11119 8.45217e-05C5.04377 8.45217e-05 2.2387 1.81159 0.861496 4.685L3.55628 6.87442C4.19718 4.8599 5.9947 3.36385 8.11119 3.36385Z' fill='#EA4335' />
        </g>
      </svg>
    </button>
  )
}

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
      <Input name='name' placeholder='bee' labelText='Nombre' autoComplete='off' required />
      <Input name='email' placeholder='bee@example.com' type={'email'} labelText='Correo electrónico' autoComplete='off' required />
      <Input name='password' placeholder='••••••••' type={'password'} labelText='Contraseña' required />
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
  SignInWhitGoogle,
  SignUp,
  SignOut,
}
