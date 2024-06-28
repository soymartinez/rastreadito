'use client'

import { useState } from 'react'
import { Info, Loader } from 'lucide-react'
import { toast } from 'sonner'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { authRegisterSchema } from '@/lib/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegistroPage() {
  const router = useRouter()
  const [isLoading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof authRegisterSchema>>({
    resolver: zodResolver(authRegisterSchema),
    defaultValues: {
      email: '',
    }
  })

  async function onSubmit(values: z.infer<typeof authRegisterSchema>) {
    const signUp = async () => {
      setLoading(true)
      const res = await fetch('/api/auth/register/send-otp', {
        method: 'POST',
        body: JSON.stringify({ email: values.email }),
      })
      setLoading(false)

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error)
      }

      return await res.json()
    }

    toast.promise(signUp(), {
      loading: 'Creando cuenta...',
      success: () => {
        localStorage.setItem('email-to-verify', form.getValues('email'))
        router.push('/registro/verificar')
        return 'Correo electrónico enviado, revisa tu bandeja de entrada'
      },
      error: (error) => error.message,
    })
  }

  return (
    <main className='flex min-h-screen items-center justify-center px-4'>
      <div className='mx-auto w-full max-w-sm space-y-6'>

        <div>
          <h1 className='text-center text-3xl font-semibold leading-normal'>Crea una cuenta</h1>
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

            <div className='flex justify-end'>
              <Link href='/login' className='text-sm underline'>Iniciar sesión</Link>
            </div>

            <Button type='submit' className='!mt-6 w-full'>
              {isLoading && <Loader size={20} className='mr-2 animate-spin' />}
              Registrarse
            </Button>

            <div className='!mt-8 flex items-center justify-center gap-x-2 px-8 pb-16'>
              <Info size={18} />
              <span className='text-xs'>
                Te enviaremos un correo electrónico para crear tu contraseña.
              </span>
            </div>
          </form>
        </Form>

      </div>
    </main>
  )
}
