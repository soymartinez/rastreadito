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
    onValue?: (value: File[], index?: number) => void
}

export default function UploadInput({ urls = [], className, onValue }: UploadInputProps) {
    const [file, setFile] = useState<File[]>([])
    const [hover, setHover] = useState(false)
    const id = useId()

    const toggleHover = () => setHover(!hover)

    const handlePreview = async (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
        e.preventDefault()

        const diff = 4 - urls.length
        const currentFiles = e.target.files
        const currentFilesArray = Array.from(currentFiles as FileList)

        if (index) {
            setFile(() => {
                const newArray = [...file]
                newArray[index] = currentFilesArray[0]
                return newArray
            })
            console.log({ index })
            return
        }

        if (file.length + currentFilesArray.length > diff) {
            toast.error(`Solo puedes subir ${diff} imagenes.`, {
                style: {
                    background: '#F87171',
                }
            })
            return
        }

        if (file?.length < diff) {
            return setFile(() => {
                if ((file.length + currentFilesArray.length) > 4) {
                    const diff = 4 - file.length
                    const newFiles = currentFilesArray.slice(0, diff)
                    return [...file, ...newFiles]
                }
                return [...file, ...currentFilesArray]
            })
        }

        return setFile(currentFilesArray.slice(0, 4))
    }

    useEffect(() => {
        onValue && onValue(file)
    }, [file])

    return (
        <>
            {urls?.length > 0 && urls.map((url, index) => (
                <div key={url}>
                    {`${id}-${index}`}
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
            {file && file?.length > 0 && file.map((file, index) => (
                <div key={index}>
                    {`file-${id}-${index}`}
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
