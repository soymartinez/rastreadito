'use client'

import { useTheme } from 'next-themes'

import { Laptop, Moon, Sun } from 'lucide-react'
import { Button } from '@/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'

export default function Mode() {
  const { setTheme, theme } = useTheme()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='focus:outline-none'>
        <Button variant='ghost' size='sm'>
          <Sun className='rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 dark:text-_primary dark:hover:bg-_darkText' />
          <Moon className='absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:text-_primary' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className={`flex gap-3 text-_darkText dark:text-_white ${theme === 'light' && 'bg-[#f1f5f9] dark:bg-_dark'}`}
        >
          <Sun size={18} /> Claro
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className={`flex gap-3 text-_darkText dark:text-_white ${theme === 'dark' && 'bg-[#f1f5f9] dark:bg-_dark'}`}
        >
          <Moon size={18} /> Oscuro
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className={`flex gap-3 text-_darkText dark:text-_white ${theme === 'system' && 'bg-[#f1f5f9] dark:bg-_dark'}`}
        >
          <Laptop size={18} /> Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
