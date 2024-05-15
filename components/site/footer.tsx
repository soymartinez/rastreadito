'use client'

import { Monitor, MoonStar, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Icons } from '../icons'
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { useMounted } from '@/hooks/use-mounted'

export default function Footer() {
  const { theme, setTheme } = useTheme()
  const mounted = useMounted()
  return (
    <footer className='border-t bg-white px-4 pb-8 pt-7'>
      <div className='mx-auto max-w-screen-desktop space-y-4'>
        <div className='flex h-10 items-center justify-between'>
          <div className='z-10 -mx-0.5 p-0.5 text-xl font-black uppercase italic'>
            rastreadito
          </div>

          {/* THEME */}
          {mounted && (
            <div className='grid grid-cols-3'>
              <button
                onClick={() => setTheme('dark')}
                data-selected={theme === 'dark'}
                className='flex size-8 items-center justify-center rounded-full text-grayText data-[selected="true"]:bg-gray data-[selected="true"]:text-darkText'
              >
                <MoonStar className='size-4' />
              </button>

              <button
                onClick={() => setTheme('light')}
                data-selected={theme === 'light'}
                className='flex size-8 items-center justify-center rounded-full text-grayText data-[selected="true"]:bg-gray data-[selected="true"]:text-darkText'
              >
                <Sun className='size-4' />
              </button>

              <button
                onClick={() => setTheme('system')}
                data-selected={theme === 'system'}
                className='flex size-8 items-center justify-center rounded-full text-grayText data-[selected="true"]:bg-gray data-[selected="true"]:text-darkText'
              >
                <Monitor className='size-4' />
              </button>
            </div>
          )}
        </div>

        <div className='flex h-9 items-center justify-between'>
          {/* SOCIAL */}
          <div className='flex'>
            <a
              href={siteConfig.links.x}
              target='_blank'
              className='mr-4'
            >
              <Icons.x />
            </a>
            <a
              href={siteConfig.links.ig}
              target='_blank'
              className='mr-4'
            >
              <Icons.ig />
            </a>
          </div>

          {/* ROUTES */}
          {siteConfig.footerNav[1]?.items.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              target={item.external ? '_blank' : '_self'}
              className='py-1 text-sm'
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
