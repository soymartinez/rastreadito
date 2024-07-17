import { Metadata } from 'next'
import { env } from '@/env'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: 'Verificar',
  description: 'Verifica tu correo electrónico',
}

export default function WelcomeLayout(props: { children: ReactNode }) {
  return (
    <div>
      {props.children}
    </div>
  )
}
