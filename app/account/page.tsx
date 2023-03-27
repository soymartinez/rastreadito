import Mode from '@/components/mode'
import { Back } from '@/ui/back'
import { Button } from '@/ui/button'
import { LogOut, Save } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'BeeHealthy | QR',
    description: 'BeeHealthy es una marca de productos cannábicos que busca ofrecer una experiencia de consumo saludable y segura.',
}

export default function Account() {
    return (
        <div className='px-4 min-h-screen relative max-w-7xl mx-auto'>
            <div className='flex justify-center items-center py-8 relative'>
                <Back className='absolute left-0' />
                <h1 className='font-bold text-xl'>Perfil</h1>
            </div>
            <h1 className='text-5xl font-bold leading-loose'>BeeHealthy</h1>
            <div className='flex flex-col gap-4 font-semibold text-lg mt-4'>
                <span>Organización</span>
                <div className='flex justify-between'>
                    <span>Posición</span>
                    <span className='text-_darkText dark:text-_primary'>Usuario</span>
                </div>
                <div className='h-px rounded-full bg-_grayTextDisabled dark:bg-_darkText' />
                <div className='flex justify-between'>
                    <span>Tema</span>
                    <Mode />
                </div>
                <div className='h-px rounded-full bg-_grayTextDisabled dark:bg-_darkText' />
                <Link href={'/auth'} className='self-end rounded-2xl'>
                    <Button variant={'ghost'} className='h-min flex items-center gap-3 self-end'>
                        <LogOut size={20} /> <span className='text-lg'>Cerrar sesión</span>
                    </Button>
                </Link>
            </div>
            <Button className='w-16 fixed xl:absolute right-4 bottom-8'>
                <Save />
            </Button>
        </div>
    )
}
