'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { ImageOff, ImagePlus, Info, Save } from 'lucide-react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/ui/select'
import { Input } from '@/ui/input'
import { Textarea } from '@/ui/textarea'
import { Button } from '@/ui/button'
import { Categoria, Galeria, Producto, Qr } from '@prisma/client'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Label } from '@/ui/label'
import ImagePreview from './gallery/image-preview'
import ModalDialog from './modal/modal-dialog'
import { Tabs, TabsContent, TabsList } from '@/ui/tabs'
import GaleriaView from './gallery/galeria-view'
import TabTrigger from './tab-trigger'
import { CategoriaGaleriaType } from '@/types'

interface FormMetadataProps {
    categorias?: CategoriaGaleriaType[]
    producto?: Producto
    type?: 'normal' | 'floating'
    className?: string
    onEditChange?: () => void
}

export default function FormMetadata({ producto, type = 'normal', className, onEditChange }: FormMetadataProps) {
    const { push, refresh } = useRouter()
    const [galeria, setGaleria] = useState<Galeria[]>()
    const [categorias, setCategorias] = useState<CategoriaGaleriaType[]>([])
    const [imagenes, setImagenes] = useState<string[]>(producto?.imagen || [])
    const [infoImages, setInfoImages] = useState<{ nombre?: string, descripcion?: string }>({ nombre: '', descripcion: '' })
    const [loading, setLoading] = useState(false)
    const [currentCategoria, setCurrentCategoria] = useState<string>()
    const [searchGaleria, setSearchGaleria] = useState('')
    const [uploadImages, setUploadImages] = useState(false)

    const {
        id,
        nombre,
        descripcion,
        categoria: categoriaProducto,
        cepa,
        thc,
        cbd,
        imagen,
        aroma,
        efecto,
        fabricante,
        pais,
        proveedor,
        precio,
        peso,
        fechaCosecha,
        fechaEnvasado,
        fechaCaducidad,
        lote,
        certificado,
        notas,
    } = producto || {}

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const data = Object.fromEntries(formData.entries()) as object as Producto

        if (imagenes.length === 0) {
            toast('Selecciona al menos una imagen', {
                icon: <ImageOff size={18} />,
            })

            push('/metadata#galeria')
            return
        }

        if (producto) {
            const updateMetadata = async (data: Producto) => {
                const update = await fetch('/api/metadata', {
                    method: 'POST',
                    body: JSON.stringify({
                        ...data,
                        id,
                        imagen: imagenes,
                    }),
                })

                if (update.status !== 200) {
                    throw new Error('Error al actualizar')
                }

                return await update.json()
            }

            toast.promise(updateMetadata(data), {
                loading: 'Actualizando...',
                success: (producto: Producto) => {
                    refresh()
                    onEditChange?.()
                    return <div>Producto <strong>{producto.nombre}</strong> actualizado</div>
                },
                error: 'Error al actualizar',
            })
        } else {
            const res = async () => {
                const create = await fetch('/api/metadata', {
                    method: 'POST',
                    body: JSON.stringify({
                        ...data,
                        imagen: imagenes,
                    }),
                })

                if (create.status !== 200) {
                    throw new Error('Error al guardar')
                }

                return await create.json()
            }

            const qr = async (producto: Producto) => {
                const create = await fetch('/api/qr', {
                    method: 'POST',
                    body: JSON.stringify({ producto }),
                })

                return await create.json()
            }

            toast.promise(res, {
                loading: 'Guardando...',
                success: (producto: Producto) => {
                    toast.promise(qr(producto), {
                        loading: 'Generando código QR...',
                        success: (qr: Qr) => {
                            push('/metadata/generate/' + qr.codigo)
                            return <div>Código QR <strong>#{qr.id}</strong> generado</div>
                        },
                        error: 'Error al generar código QR',
                    })
                    return <div>Producto <strong>{producto.nombre}</strong> guardado</div>
                },
                error: 'Error al guardar',
            })
        }
    }

    const handleGaleria = async (categoriaSeleccionada: string) => {
        setGaleria([])
        setLoading(true)
        setCurrentCategoria(categoriaSeleccionada)

        const res = await fetch('/api/galeria', {
            next: {
                revalidate: 1,
            }
        })

        if (!res.ok) {
            throw new Error('Error al obtener imágenes')
        }

        const data: Galeria[] = await res.json()
        const filteredData = data.filter(imagen => imagen.categoriaAcronimo === categoriaSeleccionada)

        setGaleria(filteredData)
        setLoading(false)
    }

    const handleCategoria = async () => {
        const res = await fetch('/api/categorias')
        const data = await res.json()

        setCategorias(data)
    }

    const filterGaleria = (galeriaNombre: string) => {
        const nombre = galeriaNombre.toLowerCase()
        const search = searchGaleria.toLowerCase()

        return nombre.includes(search)
    }

    useEffect(() => {
        categoriaProducto && handleGaleria(categoriaProducto)
    }, [categoriaProducto])

    useEffect(() => {
        handleCategoria()
    }, [])

    return (
        <>
            <form onSubmit={handleSubmit} className={clsx('flex flex-col gap-7', className)}>
                <div className='flex flex-col gap-4'>
                    <div className='flex justify-between'>
                        <h3 className='font-semibold'>Información</h3>
                        <Info />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Input
                            name='nombre'
                            labelText='Nombre'
                            placeholder='Purple Kush'
                            onChange={(e) => setInfoImages((info) => ({ ...info, nombre: e.target.value }))}
                            defaultValue={nombre}
                            required />
                        <Textarea
                            name='descripcion'
                            labelText='Descripción'
                            placeholder='Purple Kush'
                            rows={6}
                            onChange={(e) => setInfoImages((info) => ({ ...info, descripcion: e.target.value }))}
                            defaultValue={descripcion}
                            required />
                        <Select onValueChange={handleGaleria} name='categoria' defaultValue={categoriaProducto} required>
                            <SelectTrigger labelText='Tipo de producto'>
                                <SelectValue placeholder='Selecciona un tipo de producto' />
                            </SelectTrigger>
                            <SelectContent>
                                {categorias.map(({ nombre, acronimo }) => (
                                    <SelectItem
                                        className='first:rounded-t-xl last:rounded-b-xl placeholder:text-_primary'
                                        key={acronimo}
                                        value={acronimo}
                                    >
                                        {nombre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <div className='flex flex-col gap-6 px-5 py-3 border border-_gray dark:border-_darkText rounded-2xl' id='galeria'>
                            <div className='flex flex-col justify-between items-start gap-2'>
                                <Label className='text-_darkText dark:text-_primary text-xs font-semibold'>Galeria</Label>
                                {galeria && galeria.length > 0
                                    && <div className='flex justify-end items-center gap-3 h-11 w-full max-w-sm ml-auto'>
                                        <Input
                                            variant='search'
                                            name='search'
                                            onChange={(e) => setSearchGaleria(e.target.value)}
                                            placeholder='Buscar por nombre'
                                            className='p-1 h-full border-2'
                                            defaultValue={infoImages.nombre}
                                        />
                                        <Button
                                            type='button'
                                            onClick={() => setUploadImages(!uploadImages)}
                                            className='p-2'
                                            variant={'outline'}
                                            size={'nothing'}
                                        >
                                            <ImagePlus />
                                        </Button>
                                    </div>}
                            </div>
                            {galeria && galeria.length > 0
                                ? <div className='flex flex-col gap-6'>
                                    <div
                                        style={{
                                            display: 'grid',
                                            gap: '1.25rem',
                                            gridTemplateColumns: 'repeat(auto-fill, minmax(112px, 112px))',
                                        }}
                                    >
                                        {galeria.filter(({ nombre }) => filterGaleria(nombre)).length
                                            ? galeria.filter(({ nombre }) => filterGaleria(nombre)).map(({ id, nombre, url }) => (
                                                <div key={id} className='flex flex-col gap-2 overflow-hidden'>
                                                    <Label className='text-_darkText dark:text-_white text-xs font-semibold truncate'>{nombre}</Label>
                                                    <div className='w-28 h-28' onClick={() => setImagenes(url)}>
                                                        {url.length > 0
                                                            ? url.map((imagenUrl, i) => (
                                                                <div key={i} className='absolute'>
                                                                    {i > 0 &&
                                                                        <div className='w-6 h-6 bg-_dark absolute z-40 rounded-full top-1 left-1 text-_primary flex justify-center items-center'>
                                                                            <Label className='text-xs'>+{url.length}</Label>
                                                                        </div>}
                                                                    <ImagePreview
                                                                        key={`${nombre}-${i}`}
                                                                        alt={nombre}
                                                                        src={imagenUrl}
                                                                        changeIcon={false}
                                                                        selected={imagenes.includes(imagenUrl)}
                                                                    />
                                                                </div>
                                                            ))
                                                            : <div
                                                                title='Galeria vacía'
                                                                className={`
                                                            relative
                                                            w-28 h-28
                                                            cursor-not-allowed
                                                            flex
                                                            justify-center 
                                                            items-center
                                                            border
                                                            border-_gray
                                                            dark:border-_darkText
                                                            rounded-2xl
                                                            overflow-hidden
                                                        `}
                                                            >
                                                                <ImageOff />
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            ))
                                            : <div className='h-32 flex justify-center items-center text-sm text-center dark:text-_grayText'>
                                                <span><strong>{searchGaleria}</strong> no coincide con ningún resultado.</span>
                                            </div>}
                                    </div>
                                </div>
                                : <div className='text-sm text-center'>
                                    {loading
                                        ? <div className='flex flex-col gap-2'>
                                            <div className='bg-_gray dark:bg-_darkText rounded-xl h-4 w-20 animate-pulse' />
                                            <div className='grid grid-flow-col gap-5 justify-start overflow-auto scrollbar-none md:scrollbar-thin p-1'>
                                                {[...Array(4)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={'relative bg-_gray dark:bg-_darkText animate-pulse rounded-2xl w-28 h-28 m-auto'}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        : <div className='h-36 flex justify-center items-center'>
                                            {galeria && galeria.length === 0
                                                ? <div className='inline-flex gap-2 items-center justify-center'>
                                                    <p className='text-sm text-center dark:text-_grayText'>No hay imágenes en esta categoría.</p>{' '}
                                                    <Button
                                                        type='button'
                                                        onClick={() => setUploadImages(!uploadImages)}
                                                        className='p-2'
                                                        variant={'outline'}
                                                        size={'nothing'}
                                                    >
                                                        <ImagePlus />
                                                    </Button>
                                                </div>
                                                : <p className='text-sm text-center dark:text-_grayText'>Selecciona una categoría para ver las imágenes.</p>}
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div >
                <div className='flex flex-col gap-4'>
                    <div className='flex justify-between'>
                        <h3 className='font-semibold'>Características</h3>
                        <Info />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Input name='cepa' labelText='Cepa' placeholder='Purple Kush' defaultValue={cepa} required />
                        <Input name='thc' labelText='THC' placeholder='0.0' required variant='porcentage' defaultValue={thc} />
                        <Input name='cbd' labelText='CBD' placeholder='0.0' required variant='porcentage' defaultValue={cbd} />
                        <Input name='aroma' labelText='Aroma' placeholder='Tierra, pino, dulce' required defaultValue={aroma} />
                        <Input name='efecto' labelText='Efectos' placeholder='Relajante, calmante, eufórico' defaultValue={efecto} required />
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='flex justify-between'>
                        <h3 className='font-semibold'>Fabricación</h3>
                        <Info />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Input name='fabricante' labelText='Fabricante' placeholder='Rastreadito' defaultValue={fabricante} required />
                        <Input name='pais' labelText='País' placeholder='México' defaultValue={pais} required />
                        <Input name='proveedor' labelText='Proveedor' placeholder='Rastreadito Co.' defaultValue={proveedor} required />
                        <Input name='precio' labelText='PRECIO' placeholder='0' variant='currency' defaultValue={precio || 0} />
                        <Input name='peso' labelText='PESO' placeholder='0' variant='weight' defaultValue={peso || 0} />
                        <Input name='fechaCosecha' labelText='Cosecha' variant='date' defaultValue={fechaCosecha?.toLocaleString('en-CA').substring(0, 10)} />
                        <Input name='fechaEnvasado' labelText='Envasado' variant='date' defaultValue={fechaEnvasado?.toLocaleString('en-CA').substring(0, 10)} />
                        <Input name='fechaCaducidad' labelText='Caducidad' variant='date' defaultValue={fechaCaducidad?.toLocaleString('en-CA').substring(0, 10)} />
                        <Input name='lote' labelText='Lote' placeholder='RD-2023-01-01' defaultValue={lote || undefined} />
                        <Input name='certificado' labelText='Certificado' placeholder='URL de analisis de laboratorio' defaultValue={certificado || undefined} />
                        <Textarea name='notas' labelText='Notas' placeholder='Este producto se cosecho 4:20am' defaultValue={notas || undefined} />
                    </div>
                </div>

                {
                    type === 'normal' && (
                        <div className='absolute w-16 right-4'>
                            <Button type='submit' className='w-16 fixed bottom-8'>
                                <Save />
                            </Button>
                        </div>
                    )
                }

                {
                    type === 'floating' && (
                        <div className='absolute w-16 right-0 bottom-16'>
                            <Button type='submit' className='w-16 fixed'>
                                <Save />
                            </Button>
                        </div>
                    )
                }
            </form>

            {uploadImages &&
                <ModalDialog
                    onOpenChange={() => {
                        setUploadImages(false)
                        handleGaleria(currentCategoria || '')
                    }}
                >
                    <Tabs className='overflow-hidden' defaultValue={currentCategoria}>
                        <div className='sticky top-0 z-50 flex flex-col bg-_white dark:bg-_dark'>
                            <div className='py-4'>
                                <h1 className='text-5xl font-bold'>Galeria</h1>
                            </div>
                            <TabsList className='py-2 overflow-x-auto scrollbar-none sm:scrollbar-thin scrollbar-thumb-_gray dark:scrollbar-thumb-_darkText scrollbar-thumb-rounded-full'>
                                <div className='flex gap-2 w-min'>
                                    {categorias.map((categoria: Categoria) => (
                                        <TabTrigger
                                            key={categoria.id}
                                            className='capitalize'
                                            value={categoria.acronimo}
                                            label={categoria.acronimo.toLowerCase()}
                                        />
                                    ))}
                                </div>
                            </TabsList>
                        </div>
                        <div className='pt-4' style={{ height: 'calc(100% - 144px)' }}>
                            <div className='overflow-auto h-full'>
                                {categorias.map((categoria) => (
                                    <TabsContent key={categoria.id} value={categoria.acronimo} className='overflow-auto relative'>
                                        <div className='flex flex-col gap-2'>
                                            <GaleriaView
                                                categoria={{
                                                    ...categoria,
                                                    nombreParams: infoImages.nombre || '',
                                                    descripcionParams: infoImages.descripcion || '',
                                                }}
                                                galeriaData={categoria.galeria}
                                            />
                                        </div>
                                    </TabsContent>
                                ))}
                            </div>
                        </div>
                    </Tabs>
                </ModalDialog>
            }
        </>
    )
}
