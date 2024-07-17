'use client'

import { useState } from 'react'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { authLoginSchema } from '@/lib/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AuthError, User } from '@supabase/supabase-js'
import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setLoading] = useState(false)
  const { signInStore } = useAuth()

  const form = useForm<z.infer<typeof authLoginSchema>>({
    resolver: zodResolver(authLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof authLoginSchema>) {
    // const magicLink = async () => {
    //   setLoading(true)
    //   const { data, error } = await supabase.auth.signInWithOtp({
    //     email: values.email,
    //     options: {
    //       shouldCreateUser: false,
    //       emailRedirectTo: 'https://rastreadito.com/confirm'
    //     }
    //   })

    //   toast.promise(() => {
    //     if (error) return Promise.reject(error)
    //     return Promise.resolve(data)
    //   }, {
    //     loading: 'Enviando código de verificación...',
    //     success: 'Código de verificación enviado, revisa tu correo',
    //     error: (error) => error.message,
    //   })
    //   setLoading(false)
    // }

    const signIn = async () => {
      setLoading(true)
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      })
      setLoading(false)

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error)
      }

      const user = await res.json() as User

      signInStore(user.user_metadata.id)
      router.refresh()
      router.push('/')

      return user
    }

    toast.promise(signIn(), {
      loading: 'Iniciando sesión...',
      success: 'Sesión iniciada',
      error: (error: AuthError) => {
        const message = error.message
        switch (message) {
        case 'Invalid login credentials':
          return 'Credenciales inválidas o no hay una cuenta asociada a este correo electrónico.'
        default:
          return error.message
        }
      },
    })
  }

  return (
    <main className='flex min-h-screen items-center justify-center px-4'>
      <div className='mx-auto w-full max-w-sm space-y-6'>
        <div>
          <h1 className='text-center text-3xl font-semibold leading-normal'>Bienvenido</h1>
          <h3 className='text-center text-sm font-normal text-grayText'>Por favor, introduzca sus datos.</h3>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete='off'
                      placeholder='hola@rastreadito.com'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='••••••••'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-end'>
              <Link href='/registro' className='-mx-2 px-2 text-sm underline'>Registrate</Link>
            </div>

            <Button type='submit' className='!mt-6 w-full'>
              {isLoading && <Loader size={20} className='mr-2 animate-spin' />}
              Iniciar sesión
            </Button>
          </form>
        </Form>
      </div>
    </main>
  )
}
