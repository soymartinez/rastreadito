'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import { verifyEmailSchema } from '@/lib/validations/auth'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Loader } from 'lucide-react'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'

type Inputs = z.infer<typeof verifyEmailSchema>

interface Props {
  onSucceded: () => void
}

export function VerifyEmailForm({ onSucceded }: Props) {
  const [loading, setLoading] = React.useState(false)

  const form = useForm<Inputs>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      code: '',
    },
  })

  async function onSubmit(data: Inputs) {
    setLoading(true)
    const res = await fetch('/api/auth/register/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email: localStorage.getItem('email-to-verify'), code: data.code }),
    })

    if (res.status === 200) {
      onSucceded()
    }
    setLoading(false)

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error)
    }

    return await res.json()
  }

  return (
    <>
      <div>
        <h1 className='text-center text-3xl font-semibold leading-normal'>Verifica tu cuenta</h1>
        <h3 className='text-center text-sm font-normal text-grayText'>
          Antes de continuar es necesario que verifiques tu cuenta.
        </h3>
      </div>

      <Form {...form}>
        <form className='grid gap-4' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='code'
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Codigo de verificación</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field} autoFocus>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Por favor, introduzca el codigo enviado a su correo electrónico.
                </FormDescription>
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