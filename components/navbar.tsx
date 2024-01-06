import Link from 'next/link'
import { Fingerprint, Scan } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { User } from '@supabase/supabase-js'
import clsx from 'clsx'

interface NavbarProps {
  user?: User | null
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <nav className='sticky top-0 z-50 bg-white/60 backdrop-blur-[8px] dark:bg-_dark/60'>
      <div className='relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4'>
        <Link href={'/'} className='z-10 text-2xl font-black uppercase italic'>
          rastreadito
        </Link>
        <ul className='absolute inset-x-0 mx-auto flex w-auto items-center justify-center text-center text-sm font-medium'>
          <li className='flex h-[30px] items-center justify-center'>
            <Link href={'/'} className='whitespace-nowrap rounded-full px-3 py-[5px] hover:bg-white/10'>
              Inicio
            </Link>
          </li>
          <li className='flex h-[30px] items-center justify-center'>
            <Link href={'/explore'} className='whitespace-nowrap rounded-full px-3 py-[5px] hover:bg-white/10'>
              Explorar
            </Link>
          </li>
          <li className='flex h-[30px] items-center justify-center'>
            <Link href={'/how-it-works'} className='whitespace-nowrap rounded-full px-3 py-[5px] hover:bg-white/10'>
              ¿Cómo funciona?
            </Link>
          </li>
          <li className='flex h-[30px] items-center justify-center'>
            <Link href={'/pricing'} className='whitespace-nowrap rounded-full px-3 py-[5px] hover:bg-white/10'>
              Precios
            </Link>
          </li>
        </ul>
        <div className='flex items-center gap-2'>
          {/* <Link href={'/scan'} className='rounded-full'>
            <Button
              variant={'ghost'}
              size={'icon'}
              className='border-2 border-_gray dark:border-_darkText'
            >
              <Scan className='dark:text-_white' />
            </Button>
          </Link> */}
          {/* <Link href={user ? '/account' : '/auth'} className='rounded-full'>
            {user
              ? <div className='w-4 h-4 border-2 border-_gray dark:border-_darkText bg-_primary rounded-full' />
              : <Button
                size='icon'
                className='text-[14px] border-2 dark:border-_darkText whitespace-nowrap'
              >
                <Fingerprint />
              </Button>
            }
          </Link> */}
          <Link
            href='/auth/login'
            className={clsx(buttonVariants({
              size: 'sm',
              className: 'text-sm px-4 h-[30px] font-medium bg-transparent text-white hover:bg-white/5'
            }))}
            style={{
              fontSize: 14,
              fontWeight: 500
            }}
          >
            Iniciar sesion
          </Link>
          <Link
            href='/auth/register'
            className={clsx(buttonVariants({
              size: 'sm',
              className: 'text-sm px-4 h-[30px] font-medium',
            }))}
            style={{
              fontSize: 14,
              fontWeight: 500
            }}
          >
            Registrate
          </Link>
        </div>
      </div>
    </nav >
  )
}
