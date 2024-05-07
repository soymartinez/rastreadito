'use client'

import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import NavbarMenu from './navbar-menu'
import { useEffect, useState } from 'react'
import { Check, ChevronsUpDown, Menu, PlusCircle } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { usePathname, useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from './ui/dropdown-menu'
import { createClient } from '@/utils/supabase/client'
import { Badge } from './ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './ui/command'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'

const options = [
  {
    id: 'martinez',
    image: '',
    name: 'Martinez',
    value: 'martinez',
  },
  {
    id: 'adios',
    image: '',
    name: 'Adios',
    value: 'adios',
  },
  {
    id: 'nuevo',
    image: '',
    name: 'Nuevo',
    value: 'nuevo',
  },
  {
    id: 'mac',
    image: '',
    name: 'Mac',
    value: 'mac',
  },
]

interface NavbarProps {
  variant?: 'LANDING' | 'HOME'
  user: User | null
}

export default function Navbar({ user, variant = 'LANDING' }: NavbarProps) {
  const supabase = createClient()

  const pathname = usePathname()
  const router = useRouter()
  const [isActive, setIsActive] = useState(false)

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
    <nav className='sticky top-0 z-50 bg-white/60 backdrop-blur-md dark:bg-dark/60'>
      <div className='relative mx-auto flex h-16 max-w-full items-center justify-between px-4'>
        <div className='flex items-center gap-3'>
          <Link href='/' className='z-10 -mx-0.5 p-0.5 text-2xl font-black uppercase italic'>
            rastreadito
          </Link>

          {variant === 'HOME' && (
            <>
              <div className='h-[2px] w-6 rotate-[130grad] rounded-full bg-gray' />
              <div className='flex items-center gap-2'>
                <Avatar className='!size-5'>
                  <AvatarImage src={undefined} />
                  <AvatarFallback className='bg-primary' />
                </Avatar>
                <h3 className='text-sm font-medium'>
                  Martinez
                </h3>
                <Badge>
                  hobby
                </Badge>

                <Dialog>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-8 w-6 rounded-sm'
                      >
                        <ChevronsUpDown className='size-4' />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-[250px] p-0' align='start' alignOffset={-7}>
                      <Command>
                        <CommandInput placeholder='Buscar equipo' />
                        <CommandList>
                          <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                          <CommandGroup heading='Equipos' className='h-min'>
                            {options.map((option) => {
                              return (
                                <CommandItem
                                  key={option.value}
                                  onSelect={() => router.push(`/${option.id}`)}
                                  className='gap-2 py-2'
                                >
                                  <Avatar className='!size-5'>
                                    <AvatarImage src={undefined} />
                                    <AvatarFallback className='bg-primary' />
                                  </Avatar>
                                  <span className='text-sm'>{option.name}</span>
                                </CommandItem>
                              )
                            })}
                          </CommandGroup>
                          <CommandSeparator />
                          <CommandGroup>
                            <DialogTrigger className='w-full'>
                              <CommandItem
                                className='gap-2 py-2 text-darkText'
                              >
                                <PlusCircle className='size-5 p-0.5 text-violet' />
                                <span className='text-sm'>
                                  Crear equipo
                                </span>
                              </CommandItem>
                            </DialogTrigger>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Crear equipo</DialogTitle>
                      <DialogDescription>
                        <Input
                          value='Mi equipo'
                          placeholder=''
                        />
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className='bg-white2'>
                      hola
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

            </>
          )}
        </div>

        {variant === 'LANDING' && (
          <ul className='absolute inset-x-0 mx-auto hidden w-auto items-center justify-center text-center text-sm font-medium mid:flex'>
            {siteConfig.mainNav[0]?.items.map((nav) => (
              <li key={nav.title} className='flex h-[30px] items-center justify-center'>
                <Link
                  href={nav.href}
                  className='whitespace-nowrap rounded-full px-3 py-[5px] transition-colors hover:bg-darkText hover:text-white'
                >
                  {nav.title}
                </Link>
              </li>
            ))}
          </ul>
        )}

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
                  <DropdownMenuItem
                    onClick={async () => {
                      await supabase.auth.signOut()
                      router.refresh()
                    }}
                  >
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
                    className: 'px-4 h-[30px] !font-medium !bg-darkText !text-white',
                  }))}
                >
                  Registrate
                </Link>
              </div>
            )}
        </div>

        <Button
          onClick={() => setIsActive(!isActive)}
          className='h-min rounded-sm bg-transparent !p-1 hover:bg-darkText/5 mid:hidden'
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
