'use client'

import { Button } from '@/ui/button'
import { Categoria, Galeria } from '@prisma/client'
import { ImagePlus, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import NewGallery from './new-gallery'
import { AnimatePresence } from 'framer-motion'
import { Label } from '@/ui/label'
import UploadInput from './upload-input'
import { toast } from 'sonner'
import { useSupabase } from '../supabase-provider'

interface GaleriaProps {
    categoria: Categoria & {
        nombreParams: string
        descripcionParams: string
    }
    galeriaData?: Galeria[]
}

export default function GaleriaView({
    categoria,
    galeriaData,
}: GaleriaProps) {
    const [galerias, setGalerias] = useState<Galeria[] | undefined>([])
    const [imagenes, setImagenes] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [uploadImages, setUploadImages] = useState(false)
    const { supabase } = useSupabase()

    const handleGaleria = useCallback(async () => {
        setGalerias([])
        setLoading(true)

        const res = await fetch('/api/galeria')

        if (!res.ok) {
            throw new Error('Error al obtener imágenes')
        }

        const data: Galeria[] = await res.json()
        const filteredData = data.filter(imagen => imagen.categoriaAcronimo === categoria.acronimo)

        setGalerias(filteredData)
        setLoading(false)
    }, [categoria.acronimo])

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

    const handleDeleteImages = async (url: string, galeriaData: Galeria) => {
        const { data: { user } } = await supabase.auth.getUser()

        if (user?.email) {
            const imageName = url.split('/').pop()
            const path = `${user?.email}/${categoria.acronimo}/${galeriaData.nombre}/${imageName}`

            const remove = async () => {
                const { error } = await supabase
                    .storage
                    .from('galeria')
                    .remove([path])

                if (error) {
                    throw new Error(error.message)
                }

                const { error: errorDelete } = await supabase
                    .from('galeria')
                    .delete()
                    .in('url', [url])

                if (errorDelete) {
                    throw new Error(errorDelete.message)
                }
            }

            toast.promise(remove, {
                loading: 'Eliminando imagen...',
                success: () => {
                    handleGaleria()
                    return 'Imagen eliminada'
                },
                error: (err) => err.message,
            })
        }
    }

    const handleUploadFiles = async (files: { file: File, index: number }[], galeriaData: Galeria) => {
        const { data: { user } } = await supabase.auth.getUser()

        if (files.length && user?.email) {
            let urls: string[] = galeriaData.url
            const upload = async () => {
                const urlImages = await Promise.all(
                    files.map(async ({ file, index }) => {
                        const storage_upload = await supabase
                            .storage
                            .from('galeria')
                            .upload(`${user?.email}/${categoria.acronimo}/${galeriaData.nombre}/image-${index}-${new Date().getTime()}`, file, {
                                cacheControl: '3600',
                                upsert: true,
                            })

                        if (storage_upload.error) {
                            throw new Error('Error al subir imágenes')
                        }

                        const url = supabase.storage.from('galeria').getPublicUrl(storage_upload.data.path).data.publicUrl

                        if (urls[index]) {
                            const imageName = urls[index].split('/').pop()
                            const path = `${user?.email}/${categoria.acronimo}/${galeriaData.nombre}/${imageName}`

                            const { error } = await supabase
                                .storage
                                .from('galeria')
                                .remove([path])

                            if (error) {
                                throw new Error('Error al eliminar la previa imagen')
                            }

                            urls[index] = url
                        } else {
                            urls.push(url)
                        }

                        return url
                    })
                )

                if (urlImages.length !== files.length) {
                    throw new Error('Error al subir imágenes')
                }

                if (urls.length <= 4) {
                    const res = await fetch('/api/galeria', {
                        method: 'POST',
                        body: JSON.stringify({
                            id: galeriaData.id,
                            nombre: galeriaData.nombre,
                            categoria: galeriaData.categoriaAcronimo || '',
                            descripcion: galeriaData.descripcion || '',
                            url: urls,
                        })
                    })

                    if (!res.ok) {
                        throw new Error('Error al guardar imágenes')
                    }

                    urls = []
                    return res
                } else {
                    throw new Error('El número máximo de imágenes es 4')
                }
            }

            toast.promise(upload, {
                loading: 'Subiendo imágenes...',
                success: () => {
                    handleGaleria()
                    return `${files.length} imágenes subidas correctamente`
                },
                error: (err) => err.message,
            })
        }

    }

    useEffect(() => {
        handleGaleria()
    }, [handleGaleria])

    useEffect(() => {
        !galeriaData && handleGaleria()
    }, [categoria, galeriaData, handleGaleria])

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
                    <NewGallery
                        onClose={() => { setUploadImages(false); handleGaleria() }}
                        nombre={categoria.nombreParams}
                        descripcion={categoria.descripcionParams}
                        categoria={categoria.acronimo}
                        boundary={false}
                    />}
            </AnimatePresence>

            <div>
                {galerias && galerias.length > 0
                    ? <div className='flex flex-col gap-6'>
                        {galerias.map((galeria) => (
                            <div key={galeria.id} className='flex flex-col gap-2'>
                                <Label className='text-_darkText dark:text-_primary text-xs font-semibold'>{galeria.nombre}</Label>
                                <div className='grid grid-flow-col gap-5 justify-start overflow-auto scrollbar-none md:scrollbar-thin'>
                                    <UploadInput
                                        urls={galeria.url}
                                        onValue={(values) => handleUploadFiles(values, galeria)}
                                        onRemove={(url) => handleDeleteImages(url, galeria)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    : <>
                        {loading
                            ? <div className='grid grid-flow-row grid-cols-2 sm:grid-cols-4 md:grid-cols-5 justify-center items-center gap-5'>
                                {[...Array(9)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={'relative bg-_gray dark:bg-_darkText animate-pulse rounded-2xl w-28 h-28 m-auto'}
                                    />
                                ))}
                            </div>
                            : <div className='flex justify-center items-center h-52'>
                                {galerias
                                    ? <span>No hay imágenes en esta categoría.</span>
                                    : <span>Selecciona una categoría para ver las imágenes.</span>}
                            </div>}
                    </>
                }
            </div>
        </main>
    )
}
