import { ReactNode } from 'react'
import StackMenu from '@/components/site/stack-menu'

export default async function TeamIdLayout({ children }: { children: ReactNode }) {
  return (
    <main className='flex min-h-screen flex-col'>
      <StackMenu />
      <div className='flex-1'>
        {children}
      </div>
    </main>
  )
}
