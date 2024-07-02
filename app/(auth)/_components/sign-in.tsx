'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/utils/supabase/client'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export function SignIn() {
  const router = useRouter()
  const supabase = createClient()
  const [form, setForm] = useState()
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
      // INICAR SESION
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      })

      toast.promise(() => {
        if (error) return Promise.reject(error)
        return Promise.resolve(data)
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
        placeholder='hola@rastreadito.com'
        type={'email'}
        autoComplete='off'
        required
      />
      <Input
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        name='password'
        placeholder='••••••••'
        type={'password'}
      />
      <Button type='submit' className='w-full gap-2'>
        {loading && <Loader size={20} className='mr-2 animate-spin' />} {form.email && form.password ? 'Iniciar sesión' : 'Link mágico'}
      </Button>
    </form>
  )
}