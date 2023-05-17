'use client'

import { Button } from '@/ui/button'
import { Categoria, Galeria } from '@prisma/client'
import { ImagePlus, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import UploadImages from './new-gallery'
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
    const [galerias, setGalerias] = useState<Galeria[] | undefined>(galeriaData)
    const [imagenes, setImagenes] = useState<string[]>([])
    // const [urls, setUrls] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [uploadImages, setUploadImages] = useState(false)
    const { supabase } = useSupabase()

    const handleGaleria = async () => {
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

    const handleUploadFiles = async (files: { file: File, index: number }[], galeriaData: Galeria) => {
        const { data: { user } } = await supabase.auth.getUser()
        let urls: string[] = []

        console.log(files);

        if (files.length && user?.email) {
            const upload = async () => {
                await Promise.all(
                    files.map(async ({ file, index }) => {
                        const storage_upload = await supabase
                            .storage
                            .from('galeria')
                            .upload(`${user?.email}/${categoria.acronimo}/${galeriaData.nombre}/image-${index + 1}`, file, {
                                cacheControl: '3600',
                                upsert: true,
                            })

                        if (storage_upload.error) {
                            throw new Error('Error al subir imágenes')
                        }

                        const url = supabase.storage.from('galeria').getPublicUrl(storage_upload.data.path).data.publicUrl
                        urls.push(url)
                    })
                )

                if (urls.length === files.length) {
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

                    return res
                }
            }

            toast.promise(upload, {
                loading: 'Subiendo imágenes...',
                success: () => {
                    handleGaleria()
                    return `${files.length} imágenes subidas correctamente`
                },
                error: (err) => {
                    console.error(err)
                    return 'Error al subir imágenes'
                },
            })
        }

    }

    useEffect(() => {
        !galeriaData && handleGaleria()
    }, [categoria])

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
                                    <UploadInput urls={galeria.url} onValue={(values) => handleUploadFiles(values, galeria)} />
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
