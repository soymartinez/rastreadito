'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import { authPasswordSchema } from '@/lib/validations/auth'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Loader } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { AuthError } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type Inputs = z.infer<typeof authPasswordSchema>

interface Props {
  onSucceded: () => void
}

export function CompleteRegisterForm({ onSucceded }: Props) {
  const router = useRouter()

  const [loading, setLoading] = React.useState(false)

  const form = useForm<Inputs>({
    resolver: zodResolver(authPasswordSchema),
    defaultValues: {
      name: '',
      password: '',
      confirmPassword: ''
    },
  })

  async function onSubmit(data: Inputs) {
    const complete = async () => {
      setLoading(true)
      const res = await fetch('/api/auth/register/complete', {
        method: 'POST',
        body: JSON.stringify(data),
      })
      setLoading(false)

      if (res.status !== 200) {
        const error = await res.json()
        throw new Error(error.error)
      }

      onSucceded()
      return await res.json()
    }

    toast.promise(complete, {
      loading: 'Creando cuenta...',
      success: () => {
        router.refresh()
        router.push('/')
        return 'Bienvenido'
      },
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
    <>
      <div>
        <h1 className='text-center text-3xl font-semibold leading-normal'>Completa tu registro</h1>
        <h3 className='text-center text-sm font-normal text-grayText'>Por favor, introduzca sus datos.</h3>
      </div>

      <Form {...form}>
        <form className='grid gap-4' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Nombre</FormLabel>
                <FormControl>
                  <Input
                    autoComplete='off'
                    placeholder='rastreadito'
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

          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Confirmar contraseña</FormLabel>
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

          <Button className='mt-2' disabled={loading}>
            {loading && (
              <Loader
                className='mr-2 size-4 animate-spin'
                aria-hidden='true'
              />
            )}
            Continuar
            <span className='sr-only'>continuar</span>
          </Button>
        </form>
      </Form>
    </>
  )
}