'use client'

import { useEffect, useId, useState } from 'react'
import clsx from 'clsx'
import { toast } from 'sonner'
import { ImagePlus } from 'lucide-react'
import { Input } from '@/ui/input'
import ImagePreview from './image-preview'

interface UploadInputProps {
    nombre?: string
    categoria?: string
    urls?: string[]
    className?: string
    onValue?: (value: { file: File, index: number }[], index?: number) => void
}

export default function UploadInput({ urls = [], className, onValue }: UploadInputProps) {
    const [files, setFile] = useState<{ file: File, index: number }[]>([])
    const [hover, setHover] = useState(false)
    const id = useId()

    const toggleHover = () => setHover(!hover)

    function cambiarImagen(indice: number, file: File): void {
        if (indice >= 0 && indice < urls.length) {
            setFile((prev) => {
                const newFiles = [...prev]
                // get the file index where inidice is equal to the index
                const urlIndex = urls.findIndex((_, index) => index === indice)
                // add to the new files array the new file and the index
                newFiles.push({ file, index: urlIndex })
                // remove the old file from the new files array
                // newFiles.splice(urlIndex, 1)
                return newFiles
            })
        } else {
            console.log("Índice inválido");
        }
    }

    const handlePreview = async (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
        e.preventDefault()

        // TODO: Controlar las imagenes actuales con las nuevas y si estas se estan cambiando o eliminando

        const diff = 4 - urls.length
        const currentFiles = e.target.files
        const currentFilesArray = Array.from(currentFiles as FileList)

        if (index) {
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
                    return [...prev, ...newFiles.map((file, index) => ({ file, index }))]
                }
                return [...prev, ...currentFilesArray.map((file, index) => ({ file, index }))]
            })
        }

        return setFile(currentFilesArray.map((file, index) => ({ file, index })))
    }

    useEffect(() => {
        onValue && onValue(files)
    }, [files])

    return (
        <>
            {urls?.length > 0 && urls.map((url, index) => (
                <div key={url}>
                    {`${index}`}
                    <label
                        htmlFor={`${id}-${index}`}
                        className={clsx('rounded-2xl overflow-hidden', className)}
                    >
                        <ImagePreview
                            alt={url}
                            src={url}
                        />
                    </label>
                    <Input
                        onChange={(e) => handlePreview(e, index)}
                        className='hidden'
                        id={`${id}-${index}`}
                        name='imagen'
                        type={'file'}
                        accept={'image/*'}
                        required
                    />
                </div>
            ))}
            {files && files?.length > 0 && files.map(({ file, index }, i) => (
                <div key={i}>
                    {`file-${id}-${i}`}
                    <label
                        htmlFor={`file-${id}-${index}`}
                        className={clsx('rounded-2xl overflow-hidden', className)}
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
                        required
                    />
                </div>
            ))}
            {urls.length < 4 && (
                <>
                    <label
                        htmlFor={`upload-${id}`}
                        onMouseEnter={toggleHover}
                        onMouseLeave={toggleHover}
                        className={clsx('rounded-2xl overflow-hidden', className)}
                    >
                        {`upload-${id}`}
                        <div className={clsx(`
                                relative
                                h-28
                                w-28
                                cursor-pointer
                                flex
                                justify-center
                                items-center
                                border
                                border-_gray
                                dark:border-_darkText
                                hover:bg-_gray
                                hover:dark:bg-_darkText
                                rounded-2xl
                                overflow-hidden
                                transition
                            `, className)}
                        >
                            <div className={clsx('absolute inset-0 transition flex justify-center items-center', {
                                'scale-125': hover,
                                'opacity-100 scale-100': !hover,
                            })}>
                                <ImagePlus />
                            </div>
                        </div>
                    </label>
                    <Input
                        onChange={handlePreview}
                        className='hidden'
                        id={`upload-${id}`}
                        name='imagen'
                        type={'file'}
                        accept={'image/*'}
                        multiple
                        required
                    />
                </>
            )}
        </>
    )
}
