'use client'

import { useEffect, useId, useState } from 'react'
import clsx from 'clsx'
import { toast } from 'sonner'
import { ImagePlus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import ImagePreview from './image-preview'

interface UploadInputProps {
    nombre?: string
    categoria?: string
    urls?: string[]
    className?: string
    onValue?: (value: { file: File, index: number }[], index?: number) => void
    onRemove?: (url: string) => void
}

export default function UploadInput({ urls = [], className, onValue, onRemove }: UploadInputProps) {
  const [files, setFile] = useState<{ file: File, index: number }[]>([])
  const [hover, setHover] = useState(false)
  const id = useId()

  const toggleHover = () => setHover(!hover)

  function cambiarImagen(indice: number, file: File): void {
    if (indice < urls.length) {
      setFile(prev => [...prev, { file, index: indice }])
    } else {
      console.log('Índice inválido')
    }
  }

  const handlePreview = async (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    e.preventDefault()

    const diff = 4 - urls.length
    const currentFiles = e.target.files
    const currentFilesArray = Array.from(currentFiles as FileList)

    if (index !== undefined) {
      return cambiarImagen(index, currentFilesArray[0])
    }

    if (files.length + currentFilesArray.length > diff) {
      toast.error(urls.length > 0 ? `Solo puedes subir ${diff} más` : 'Solo puedes subir 4 imagenes', {
        style: {
          background: '#F87171',
        }
      })
      return
    }

    if (files?.length < diff) {
      return setFile((prev) => {
        if ((prev.length + currentFilesArray.length) > 4) {
          const diff = 4 - prev.length
          const newFiles = currentFilesArray.slice(0, diff)
          return [...prev, ...newFiles.map((file, index) => ({ file, index: urls.length + index }))]
        }
        return [...prev, ...currentFilesArray.map((file, index) => ({ file, index: urls.length + index }))]
      })
    }

    return setFile(currentFilesArray.map((file, index) => ({ file, index: urls.length + index })))
  }

  useEffect(() => {
    onValue && onValue(files)
  }, [files, onValue])

  return (
    <>
      {urls?.length > 0 && urls.map((url, index) => (
        <div key={url + index}>
          <label
            htmlFor={`${id}-${index}`}
            className={clsx('relative overflow-hidden rounded-2xl', className)}
          >
            <ImagePreview
              alt={`${id}-${index}`}
              src={files[index]?.file ? URL.createObjectURL(files[index]?.file) : url}
              onRemoveImage={onRemove && (() => onRemove(url))}
            />
          </label>
          <Input
            onChange={(e) => handlePreview(e, index)}
            className='hidden'
            id={`${id}-${index}`}
            name='imagen'
            type={'file'}
            accept={'image/*'}
          />
        </div>
      ))}
      {files && files?.length > 0 && files.map(({ file, index }, i) => (
        <div key={i}>
          <label
            htmlFor={`file-${id}-${index}`}
            className={clsx('overflow-hidden rounded-2xl', className)}
          >
            <ImagePreview
              alt={file.name}
              src={URL.createObjectURL(file)}
            />
          </label>
          <Input
            onChange={(e) => handlePreview(e, index)}
            className='hidden'
            id={`file-${id}-${index}`}
            name='imagen'
            type={'file'}
            accept={'image/*'}
          />
        </div>
      ))}
      {urls.length + files.length < 4 && (
        <>
          <label
            htmlFor={`upload-${id}`}
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            className={clsx('overflow-hidden rounded-2xl', className)}
          >
            <div
              className={clsx(`
                relative
                flex
                h-28
                w-28
                cursor-pointer
                items-center
                justify-center
                overflow-hidden
                rounded-2xl
                border
                border-_gray
                transition
                hover:bg-_gray
                dark:border-_darkText
                hover:dark:bg-_darkText
              `, className)}
            >
              <div className={clsx('absolute inset-0 flex items-center justify-center transition', {
                'scale-125': hover,
                'opacity-100 scale-100': !hover,
              })}>
                <ImagePlus />
              </div>
            </div>
          </label>
          <Input
            onChange={handlePreview}
            className='sr-only'
            id={`upload-${id}`}
            name='imagen'
            type={'file'}
            accept={'image/*'}
            multiple
            required={urls.length === 0 ? true : false}
          />
        </>
      )}
    </>
  )
}
