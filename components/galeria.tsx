'use client'

import { Button } from '@/ui/button'
import { Galeria } from '@prisma/client'
import clsx from 'clsx'
import { ImagePlus, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import UploadImages from './upload-images'
import { AnimatePresence } from 'framer-motion'

interface GaleriaProps {
    nombre?: string
    descripcion?: string
    categoria: string
}

export default function Galeria({ nombre, descripcion, categoria }: GaleriaProps) {
    const [galeria, setGaleria] = useState<Galeria[]>()
    const [imagenes, setImagenes] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [uploadImages, setUploadImages] = useState(false)

    const handleGaleria = async () => {
        setGaleria([])
        setLoading(true)

        const res = await fetch('/api/galeria')

        if (!res.ok) {
            throw new Error('Error al obtener imágenes')
        }

        const data: Galeria[] = await res.json()
        const filteredData = data.filter(imagen => imagen.categoriaAcronimo === categoria)

        setGaleria(filteredData)
        setLoading(false)
    }

    const handleImages = (url: string) => {
        setImagenes(prev => {
            const MAX_IMAGES = 4

            if (prev.includes(url)) {
                return prev.filter(imagen => imagen !== url)
            }

            if (prev.length === MAX_IMAGES) {
                return prev
            }

            return [...prev, url]
        })
    }

    useEffect(() => {
        handleGaleria()
    }, [])

    return (
        <main className='flex flex-col gap-4'>
            <div className='flex justify-end items-center p-1'>
                <Button
                    type='button'
                    onClick={() => setUploadImages(!uploadImages)}
                    className='p-2'
                    variant={'outline'}
                    size={'nothing'}
                >
                    <h1 className='sr-only text-base font-semibold whitespace-nowrap text-_grayText'>
                        {uploadImages ? 'Cancelar' : 'Subir imágenes'}
                    </h1>
                    {uploadImages ? <X size={24} /> : <ImagePlus />}
                </Button>
            </div>

            <AnimatePresence>
                {uploadImages &&
                    <UploadImages
                        onClose={() => { setUploadImages(false); handleGaleria() }}
                        nombre={nombre}
                        descripcion={descripcion}
                        categoria={categoria} />}
            </AnimatePresence>

            <div>
                {galeria && galeria.length > 0
                    ? <div className='grid grid-flow-row grid-cols-2 sm:grid-cols-4 md:grid-cols-5 justify-center items-center gap-5'>
                        {galeria.map(({ id, nombre, url }) => (
                            <Button
                                key={id}
                                variant={'image'}
                                size={'nothing'}
                                type={'button'}
                                className={'w-28 h-28 m-auto'}
                                style={{ padding: 0 }}
                                onClick={() => handleImages(url)}
                            >
                                <Image
                                    alt={nombre}
                                    src={url}
                                    width={200}
                                    height={200}
                                    className='hover:scale-105 transition-transform'
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className={clsx('absolute inset-0 pointer-events-none', {
                                    'bg-_primary bg-opacity-50': imagenes.includes(url),
                                })} />
                            </Button>
                        ))}
                    </div>
                    : <div className='text-sm text-center'>
                        {loading
                            ? <div className='grid grid-flow-row grid-cols-2 sm:grid-cols-4 md:grid-cols-5 justify-center items-center gap-5'>
                                {[...Array(9)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={'relative bg-_gray dark:bg-_darkText animate-pulse rounded-2xl w-28 h-28 m-auto'}
                                    />
                                ))}
                            </div>
                            : galeria
                                ? <span>No hay imágenes en esta categoría.</span>
                                : <span>Selecciona una categoría para ver las imágenes.</span>}

                    </div>
                }
            </div >
        </main>
    )
}
