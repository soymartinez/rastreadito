import { Metadata } from 'next'
import { env } from '@/env'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: 'Inicia sesión',
  description: 'Inicia sesión en tu cuenta',
}

export default function LoginLayout(props: { children: ReactNode }) {
  return (
    <div>
      {props.children}
    </div>
  )
}
