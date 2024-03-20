import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

import { siteConfig } from '@/config/site'
import { X } from 'lucide-react'
import clsx from 'clsx'

import { Button, buttonVariants } from './ui/button'
import { User } from '@supabase/supabase-js'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { SignOut } from './auth'

interface NavbarMenuProps {
  user: User | null
  setIsActive: (value: boolean) => void
}

export default function NavbarMenu({ user, setIsActive }: NavbarMenuProps) {
  const pathname = usePathname()
  const [selectedIndicator, setSelectedIndicator] = useState(pathname)

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className='
        fixed
        right-0
        top-0
        z-50
        h-screen
        w-screen
        bg-_primary
        text-_darkText
      '
    >
      <div
        className='
          box-border
          flex
          h-full
          flex-col
          justify-between
        '
      >
        <div
          onMouseLeave={() => { setSelectedIndicator(location.pathname) }}
          className='
            flex
            flex-col
            gap-3
            truncate
            whitespace-nowrap
            text-3xl
            font-bold
            uppercase
            leading-[60px] mid:text-5xl
            mid:!leading-[72px]
            mid:tracking-[2px]
          '
        >
          {/* NAVBAR */}
          <nav
            className='
              mx-auto
              mb-4
              w-full
              max-w-6xl
              text-_white
            '
          >
            <div
              className='
                mx-auto
                flex
                h-16
                w-full
                max-w-6xl
                items-center
                justify-between
                px-4
                lg:py-4
              '
            >
              {/* LOGO */}
              <div className='flex items-center'>
                <Link href={'/'} className='z-10 text-2xl font-black uppercase italic text-_darkText'>
                  rastreadito
                </Link>
              </div>

              <div className='flex items-center'>
                <Button
                  onClick={() => setIsActive(false)}
                  className='h-min rounded-sm bg-transparent !p-1 !outline-white'
                >
                  <X className='size-7' />
                </Button>
              </div>
            </div>
          </nav>

          <div className='mx-auto w-full max-w-6xl px-4'>
            {/* MENU */}
            {siteConfig.mainNav[0]?.items.map((data, index) => {
              return (
                <LinkMenu
                  key={index}
                  data={{ ...data, index }}
                  isActive={selectedIndicator == data.href}
                  setSelectedIndicator={setSelectedIndicator}
                  setIsActive={setIsActive}
                ></LinkMenu>
              )
            })}

            {/* USER */}
            {user && (
              <LinkMenu
                data={{
                  href: '/account',
                  title: 'Cuenta',
                  index: siteConfig.mainNav[0]?.items.length!
                }}
                isActive={selectedIndicator == '/account'}
                setSelectedIndicator={setSelectedIndicator}
                setIsActive={setIsActive}
              ></LinkMenu>
            )}
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className='mx-auto flex w-full max-w-6xl flex-col-reverse gap-16 px-4 py-8'>
          <div className='text-sm md:text-base'>
            <p className='text-center'>
              &copy; Rastreadito
            </p>
          </div>

          {/* SOCIAL / ACCOUNT */}
          {user
            ? (
              <div className='flex items-center justify-center gap-2'>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>{user.role}</AvatarFallback>
                </Avatar>

                <Button
                  size='sm'
                  onClick={SignOut}
                >Cerrar sesión</Button>
              </div>
            ) : (
              <div className='flex items-center justify-center gap-3'>
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
      </div>
      <Curve />
    </motion.div>
  )
}

function Curve() {
  const initialPath = `M100 0 L200 0 L200 ${window.innerHeight} L100 ${window.innerHeight} Q-100 ${window.innerHeight / 2} 100 0`
  const targetPath = `M100 0 L200 0 L200 ${window.innerHeight} L100 ${window.innerHeight} Q100 ${window.innerHeight / 2} 100 0`

  const curve = {
    initial: {
      d: initialPath
    },
    enter: {
      d: targetPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    }
  }

  return (
    <svg
      className='
        absolute
        left-[-99px]
        top-0
        h-full
        w-[100px]
        !fill-_primary
        stroke-none
      '
    >
      <motion.path variants={curve} initial="initial" animate="enter" exit="exit"></motion.path>
    </svg>
  )
}

function LinkMenu(props: {
  data: {
    title: string
    href: string
    index: number
  },
  isActive: boolean,
  setSelectedIndicator: React.Dispatch<React.SetStateAction<string>>
  setIsActive: (value: boolean) => void
}) {
  const { title, href, index } = props.data
  return (
    <motion.div
      className='
        relative
        flex
        items-center
      '
      onMouseEnter={() => { props.setSelectedIndicator(href) }}
      onClick={() => props.setIsActive(false)}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        variants={scale}
        animate={props.isActive ? 'open' : 'closed'}
        className='
          absolute
          left-[-20px]
          size-[10px]
          rounded-full
          bg-_darkText
          mid:left-[-30px]
        '
      />
      <a href={href} className='w-full'>{title}</a>
    </motion.div>
  )
}

const menuSlide = {
  initial: { x: 'calc(100% + 100px)' },
  enter: { x: '0', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  exit: { x: 'calc(100% + 100px)', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
}

const slide = {
  initial: { x: 80 },
  enter: (i: number) => ({ x: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i } }),
  exit: (i: number) => ({ x: 80, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i } })
}

const scale = {
  open: { scale: 1, transition: { duration: 0.3 } },
  closed: { scale: 0, transition: { duration: 0.4 } }
}