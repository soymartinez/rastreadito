import * as z from 'zod'

export const authSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: 'El nombre debe tener al menos 4 caracteres',
    })
    .max(32, {
      message: 'El nombre no debe tener más de 32 caracteres',
    }),
  email: z.string().email({
    message: 'Introduzca una dirección de correo electrónico válida',
  }),
  password: z
    .string()
    .min(6, {
      message: 'La contraseña debe tener al menos 6 caracteres',
    })
    .max(100, {
      message: 'La contraseña no debe tener más de 100 caracteres',
    }),
})

export const authLoginSchema = z.object({
  email: authSchema.shape.email,
  password: authSchema.shape.password,
})

export const authRegisterSchema = z.object({
  email: authSchema.shape.email,
})

export const authPasswordSchema = z.object({
  name: authSchema.shape.name,
  password: authSchema.shape.password,
  confirmPassword: authLoginSchema.shape.password,
})
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

export const verifyEmailSchema = z.object({
  code: z
    .string()
    .min(6, {
      message: 'El código de verificación debe tener 6 caracteres',
    })
    .max(6),
})

export const checkEmailSchema = z.object({
  email: authLoginSchema.shape.email,
})

export const resetPasswordSchema = z
  .object({
    password: authLoginSchema.shape.password,
    confirmPassword: authLoginSchema.shape.password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

export const userPrivateMetadataSchema = z.object({
  stripePriceId: z.string().optional().nullable(),
  stripeSubscriptionId: z.string().optional().nullable(),
  stripeCustomerId: z.string().optional().nullable(),
  stripeCurrentPeriodEnd: z.string().optional().nullable(),
})

export type UserPrivateMetadataSchema = z.infer<
  typeof userPrivateMetadataSchema
>