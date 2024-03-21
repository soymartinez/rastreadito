'use client'

import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import NavbarMenu from './navbar-menu'
import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { usePathname, useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from './ui/dropdown-menu'
import { SignOut } from './auth'
import { createClient } from '@/utils/supabase/client'

interface NavbarProps {
  user: User | null
}

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const [isActive, setIsActive] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    if (isActive) setIsActive(false)
  }, [pathname])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.keyCode === 27) {
        setIsActive(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <nav className='sticky top-0 z-50 bg-white/60 backdrop-blur-md dark:bg-_dark/60'>
      <div className='relative mx-auto flex h-16 max-w-full items-center justify-between px-4'>
        <Link href='/' className='z-10 -mx-0.5 p-0.5 text-2xl font-black uppercase italic'>
          rastreadito
        </Link>
        <ul className='absolute inset-x-0 mx-auto hidden w-auto items-center justify-center text-center text-sm font-medium mid:flex'>
          {siteConfig.mainNav[0]?.items.map((nav) => (
            <li key={nav.title} className='flex h-[30px] items-center justify-center'>
              <Link
                href={nav.href}
                className='whitespace-nowrap rounded-full px-3 py-[5px] transition-colors hover:bg-_darkText hover:text-_white'
              >
                {nav.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className='z-50'>
          {user
            ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className='hidden mid:block'>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>{user.user_metadata.name}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align='end'>
                  <DropdownMenuLabel>{user.user_metadata.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => router.push('/account')}>
                      Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Facturación
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Configuración
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Atajos de teclado
                      <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Equipo</DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Invitar usuarios</DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem>Correo electrónico</DropdownMenuItem>
                          <DropdownMenuItem>Mensaje</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Mas...</DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                      Nuevo equipo
                      <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>GitHub</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuItem disabled>API</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => supabase.auth.signOut()}>
                    Cerrar sesión
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className='hidden items-center gap-2 mid:flex'>
                <Link
                  href='/login'
                  className={clsx(buttonVariants({
                    size: 'sm',
                    className: '!text-sm px-4 h-[30px] !font-medium bg-transparent hover:bg-black/5'
                  }))}
                >
                  Iniciar sesión
                </Link>
                <Link
                  href='/register'
                  className={clsx(buttonVariants({
                    size: 'sm',
                    className: 'px-4 h-[30px] !font-medium !bg-_darkText !text-_white',
                  }))}
                >
                  Registrate
                </Link>
              </div>
            )}
        </div>

        <Button
          onClick={() => setIsActive(!isActive)}
          className='h-min rounded-sm bg-transparent !p-1 hover:bg-_darkText/5 mid:hidden'
        >
          <Menu className='size-7' />
        </Button>
      </div>

      {/* MENU */}
      <AnimatePresence mode='wait'>
        {isActive && <NavbarMenu user={user} setIsActive={setIsActive} />}
      </AnimatePresence>
    </nav >
  )
}
