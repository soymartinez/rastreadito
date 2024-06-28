import { Metadata } from 'next'
import { env } from '@/env'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: 'Registro',
  description: 'Registrate en rastreadito',
}

export default function RegisterLayout(props: { children: ReactNode }) {
  return (
    <div>
      {props.children}
    </div>
  )
}
