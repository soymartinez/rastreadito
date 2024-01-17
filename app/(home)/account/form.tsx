'use client'

import Link from 'next/link'
import { Save } from 'lucide-react'

import Mode from '@/components/mode'
import { SignOut } from '@/components/auth'
import { Button } from '@/components/ui/button'
import { Back } from '@/components/ui/back'
import { User } from '@supabase/supabase-js'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface FormAccountProps {
    user: User | null
}

export default function FormAccount({ user }: FormAccountProps) {
  const { refresh } = useRouter()
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const data = new FormData(form)

    const name = data.get('name')

    const res = await fetch('/api/user', {
      method: 'PATCH',
      body: JSON.stringify({
        name,
      }),
    })

    if (res.status !== 200) {
      throw new Error(await res.text())
    }

    return res.json()
  }


  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      toast.promise(() => handleSave(e), {
        loading: 'Guardando...',
        success: () => {
          refresh()
          return 'Guardado'
        },
        error: 'Error al guardar',
      })
    }}>
      <div className='relative flex items-center justify-center py-8'>
        <Back pushRoute='/' className='absolute left-0' />
        <h1 className='text-xl font-bold'>Perfil</h1>
      </div>
      <h1 className='truncate text-5xl font-bold leading-loose'>{user?.user_metadata.name}</h1>
      <div className='mt-4 flex flex-col gap-5 text-lg font-semibold'>
        <span className='text-xl text-_grayText'>Organización</span>
        <div className='flex items-center justify-between gap-4'>
          <span>Nombre</span>
          <input
            autoComplete='off'
            name='name'
            placeholder='Rastreadito'
            className='w-full bg-transparent text-end focus:outline-none dark:text-_primary'
            defaultValue={user?.user_metadata.name}
          />
        </div>
        <div className='flex justify-between'>
          <span>Plan</span>
          <Link href={'/pricing'}>
            <span className='text-_darkText underline underline-offset-4 hover:text-_primary dark:text-_primary'>
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
          <div className='flex items-center justify-between'>
            <span>Tema</span>
            <Mode />
          </div>
          <div className='h-px rounded-full bg-_grayTextDisabled dark:bg-_darkText' />
        </div>
        <SignOut />
      </div>
      <Button className='fixed bottom-8 right-4 w-16 xl:absolute'>
        <Save />
      </Button>
    </form>
  )
}