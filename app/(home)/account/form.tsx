'use client'

import Link from 'next/link'
import { Save } from 'lucide-react'

import Mode from '@/components/mode'
import { SignOut } from '@/components/auth'
import { Button } from '@/ui/button'
import { Back } from '@/ui/back'
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
      <div className='flex justify-center items-center py-8 relative'>
        <Back pushRoute='/' className='absolute left-0' />
        <h1 className='font-bold text-xl'>Perfil</h1>
      </div>
      <h1 className='text-5xl font-bold leading-loose truncate'>{user?.user_metadata.name}</h1>
      <div className='flex flex-col gap-5 font-semibold text-lg mt-4'>
        <span className='text-xl text-_grayText'>Organización</span>
        <div className='flex gap-4 justify-between items-center'>
          <span>Nombre</span>
          <input
            autoComplete='off'
            name='name'
            placeholder='Rastreadito'
            className='w-full text-end focus:outline-none dark:text-_primary bg-transparent'
            defaultValue={user?.user_metadata.name}
          />
        </div>
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
    </form>
  )
}