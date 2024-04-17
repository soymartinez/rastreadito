'use client'

import { Input } from '@/components/ui/input'
import clsx from 'clsx'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import UploadInput from './upload-input'
import { createClient } from '@/utils/supabase/client'

interface NewGalleryProps {
    nombre?: string
    descripcion?: string
    categoria: string
    boundary?: boolean
    onClose: () => void
}

export default function NewGallery({
  nombre,
  descripcion,
  categoria,
  boundary = true,
  onClose
}: NewGalleryProps) {
  const [files, setFiles] = useState<{ file: File, index: number }[]>([])

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const formUpload = Object.fromEntries(formData.entries()) as { nombre: string, descripcion: string }

    const { data: { user } } = await supabase.auth.getUser()

    if (files && user?.email) {
      let urls: string[] = []
      const upload = async () => {
        const upload = await Promise.all(
          files.map(async ({ file, index }) => {
            const storage_upload = await supabase
              .storage
              .from('galeria')
              .upload(`${user?.email}/${categoria}/${formUpload.nombre?.replace(/[^\w\s]/gi, '')}/image-${index}-${new Date().getTime()}`, file, {
                cacheControl: '3600',
                upsert: true,
              })

            if (storage_upload.error) {
              throw new Error(storage_upload.error.message)
            }

            const url = supabase.storage.from('galeria').getPublicUrl(storage_upload.data.path).data.publicUrl

            urls.push(url)
          })
        )

        if (upload.length !== files.length) {
          throw new Error('Error al subir imágenes')
        }

        const res = await fetch('/api/galeria', {
          method: 'POST',
          body: JSON.stringify({
            nombre: formUpload.nombre,
            descripcion: formUpload.descripcion,
            url: urls,
            categoria,
          })
        })

        if (!res.ok) {
          throw new Error(res.statusText)
        }

        onClose()
      }

      toast.promise(upload, {
        loading: 'Creando galería...',
        success: 'Galería creada',
        error: (err) => err.message,
      })
    }
  }

  const variants = {
    initial: {
      height: 0,
      overflow: 'hidden',
      opacity: 0,
      padding: 0
    },
    animate: {
      height: 'auto',
      overflow: 'block',
      opacity: 1,
      padding: boundary ? '1rem' : '0'
    },
  }

  return (
    <motion.div
      variants={variants}
      initial={'initial'}
      animate={'animate'}
      exit={'initial'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={clsx('relative w-full rounded-2xl dark:bg-dark', {
        'border border-gray dark:border-darkText p-4': boundary,
      })}
    >
      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-6 gap-4 p-1 md:grid-rows-4'
      >
        <div className='col-span-2 row-span-3 row-start-1'>
          <div className={clsx('grid h-full', {
            'grid-cols-2 grid-rows-2': files?.length > 0,
          })}>
            <UploadInput onValue={(files) => setFiles(files)} className='size-full' />
          </div>
        </div>
        <Input name='nombre' className='col-span-4 col-start-3 row-start-1' labelText='Nombre' defaultValue={nombre} required />
        <Input name='descripcion' className='col-span-4 col-start-3 row-start-2' labelText='Descripción' defaultValue={descripcion} />
        <Input name='categoria' className='col-span-4 col-start-3 row-start-3' labelText='Categoría' defaultValue={categoria} disabled={categoria ? true : false} required />
        <Button variant='default' className='col-span-4 col-start-3 row-start-4'>Subir</Button>
      </form>
    </motion.div>
  )
}
