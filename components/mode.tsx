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
    const { setTheme } = useTheme()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className='text-_darkText focus:outline-none'>
                <Button variant='ghost' size='sm'>
                    <Sun className='rotate-0 scale-100 transition-all hover:text-_darkText dark:-rotate-90 dark:scale-0 dark:text-_white dark:hover:text-_white' />
                    <Moon className='absolute rotate-90 scale-0 transition-all hover:text-_darkText dark:rotate-0 dark:scale-100 dark:text-_white dark:hover:text-_white' />
                    <span className='sr-only'>Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setTheme('light')} className='flex gap-3'>
                    <Sun size={18} /> Claro
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')} className='flex gap-3'>
                    <Moon size={18} /> Oscuro
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')} className='flex gap-3'>
                    <Laptop size={18} /> Sistema
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
