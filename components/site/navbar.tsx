'use client'

import Link from 'next/link'
import clsx from 'clsx'
import NavbarMenu from './navbar-menu'
import { useMediaQuery } from '@/hooks/use-media-query'
import { AnimatePresence } from 'framer-motion'
import { Button, buttonVariants } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { ChevronsUpDown, ExternalLink, Menu, PlusCircle } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { usePathname, useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
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
} from '../ui/dropdown-menu'
import { createClient } from '@/utils/supabase/client'
import { Badge } from '../ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '../ui/command'
import { Dialog, DialogBody, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '../ui/drawer'
import { useAuth } from '@/hooks/use-auth'

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
}

export default function Navbar({ variant = 'LANDING' }: NavbarProps) {
  const supabase = createClient()
  const { user, isLoading, signOut } = useAuth()

  const pathname = usePathname()
  const router = useRouter()
  const [isActive, setActive] = useState(false)
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 640px)')

  useEffect(() => {
    if (isActive) setActive(false)
  }, [pathname])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.keyCode === 27) {
        setActive(false)
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
              <div className='hidden h-[2px] w-6 rotate-[130grad] rounded-full bg-gray sm:block' />
              <div className='flex items-center gap-2'>
                <Link href='/martinez' className='flex items-center gap-2'>
                  <Avatar className='!size-5'>
                    <AvatarImage src={undefined} />
                    <AvatarFallback className='bg-primary' />
                  </Avatar>
                  <h3 className='text-sm font-medium'>
                    Martinez
                  </h3>
                </Link>
                <Badge className='hidden mid:block'>
                  hobby
                </Badge>

                <Dialog open={open} onOpenChange={setOpen}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-8 w-6 rounded-sm outline-primary'
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

                          {/* CREATE TEAM */}
                          <CommandGroup>
                            <CommandItem
                              onSelect={() => setOpen(true)}
                              className='gap-2 py-2 text-darkText'
                            >
                              <PlusCircle className='size-5 p-0.5 text-violet' />
                              <span className='text-sm'>
                                Crear equipo
                              </span>
                            </CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  {/* DIALOG MAKE A TEAM */}
                  {isDesktop && (
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Crear equipo</DialogTitle>
                        <DialogDescription>
                          descripción
                        </DialogDescription>
                      </DialogHeader>
                      <DialogBody>
                        <Input
                          defaultValue='Mi equipo'
                          placeholder='Mi equipo'
                        />
                      </DialogBody>
                      <DialogFooter>
                        <Button
                          onClick={() => setOpen(false)}
                          variant='outline'
                        >
                          Cancelar
                        </Button>
                        <Button
                          onClick={() => { }}
                        >
                          Continuar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  )}
                </Dialog>

                {/* DRAWER MAKE A TEAM */}
                {!isDesktop && (
                  <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerContent>
                      <DrawerHeader className="text-left">
                        <DrawerTitle>Crear equipo</DrawerTitle>
                        <DrawerDescription>
                          Make changes to your profile here. Click save when you&apos;re done.
                        </DrawerDescription>
                      </DrawerHeader>
                      <DrawerBody>
                        <Input
                          defaultValue='Mi equipo'
                          placeholder='Mi equipo'
                        />
                      </DrawerBody>
                      <DrawerFooter>
                        <DrawerClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                )}
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
          {user && !isLoading
            ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className='hidden mid:block'>
                    <AvatarImage src='' alt="@shadcn" />
                    <AvatarFallback className='bg-primary'></AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align='end'>
                  <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
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
                  <DropdownMenuItem
                    onClick={() => router.push('/home')}
                  >
                    Inicio
                    <DropdownMenuShortcut>
                      <ExternalLink className='size-4' />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>API</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={async () => {
                      await supabase.auth.signOut()
                      signOut()
                      router.refresh()
                    }}
                  >
                    Cerrar sesión
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : !isLoading && (
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
                  href='/registro'
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
          onClick={() => setActive(!isActive)}
          className='h-min rounded-sm bg-transparent !p-1 hover:bg-darkText/5 mid:hidden'
        >
          <Menu className='size-7' />
        </Button>
      </div>

      {/* MENU */}
      <AnimatePresence mode='wait'>
        {isActive && <NavbarMenu setActive={setActive} />}
      </AnimatePresence>
    </nav >
  )
}
