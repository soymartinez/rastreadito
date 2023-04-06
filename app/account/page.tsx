import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Save } from 'lucide-react'

import Mode from '@/components/mode'
import { SignOut } from '@/components/auth'
import { Button } from '@/ui/button'
import { Back } from '@/ui/back'

import { getCurrentUser } from '@/hooks/auth'

export async function generateMetadata() {
    const user = await getCurrentUser()

    return {
        title: user?.user_metadata.name,
        description: `${user?.user_metadata.name} es una marca de productos cannábicos que busca ofrecer una experiencia de consumo saludable y segura.`,
    }
}

export const revalidate = 0

export default async function Account() {
    const user = await getCurrentUser()
    if (!user) return redirect('/auth')
    return (
        <div className='px-4 min-h-screen relative max-w-7xl mx-auto'>
            <div className='flex justify-center items-center py-8 relative'>
                <Back className='absolute left-0' />
                <h1 className='font-bold text-xl'>Perfil</h1>
            </div>
            <h1 className='text-5xl font-bold leading-loose'>{user?.user_metadata.name}</h1>
            <div className='flex flex-col gap-5 font-semibold text-lg mt-4'>
                <span>Organización</span>
                <div className='flex justify-between'>
                    <span>Plan</span>
                    <Link href={'/pricing'}>
                        <span className='text-_darkText dark:text-_primary hover:text-_primary underline underline-offset-4'>
                            Comunidad
                        </span>
                    </Link>
                </div>
                <div className='flex justify-between'>
                    <span>Posición</span>
                    <span className='text-_darkText dark:text-_primary'>Usuario</span>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='h-px rounded-full bg-_grayTextDisabled dark:bg-_darkText' />
                    <div className='flex justify-between items-center'>
                        <span>Tema</span>
                        <Mode />
                    </div>
                    <div className='h-px rounded-full bg-_grayTextDisabled dark:bg-_darkText' />
                </div>
                <SignOut />
            </div>
            <Button className='w-16 fixed xl:absolute right-4 bottom-8'>
                <Save />
            </Button>
        </div>
    )
}
