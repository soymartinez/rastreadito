'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import qs from 'query-string'

import { Info, Save } from 'lucide-react'

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
import { Categoria, Producto, Qr } from '@prisma/client'
import clsx from 'clsx'

interface FormMetadataProps {
    categorias: Categoria[]
    producto?: Producto
    type?: 'normal' | 'floating'
    className?: string
}

export default function FormMetadata({ categorias, producto, type = 'normal', className }: FormMetadataProps) {
    const { push } = useRouter()
    const {
        nombre,
        descripcion,
        categoria,
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

        if (producto) {
            const updateMetadata = async (data: Producto) => {
                const update = await fetch('/api/metadata', {
                    method: 'POST',
                    body: JSON.stringify(data),
                })

                if (update.status !== 200) {
                    throw new Error('Error al actualizar')
                }

                return await update.json()
            }

            toast.promise(updateMetadata(data), {
                loading: 'Actualizando...',
                success: (producto: Producto) => {
                    return <div>Producto <strong>{producto.nombre}</strong> actualizado</div>
                },
                error: 'Error al actualizar',
            })
        } else {
            const res = async () => {
                const create = await fetch('/api/metadata', {
                    method: 'POST',
                    body: JSON.stringify(data),
                })

                if (create.status !== 200) {
                    throw new Error('Error al guardar')
                }

                return await create.json()
            }

            const qr = async (data: Producto) => {
                const codigo = generateQuery(data)

                if (!codigo) {
                    throw new Error('Faltan datos para generar código QR')
                }

                const create = await fetch('/api/qr', {
                    method: 'POST',
                    body: JSON.stringify({ codigo, idProducto: data.id }),
                })

                return await create.json()
            }

            toast.promise(res, {
                loading: 'Guardando...',
                success: (producto: Producto) => {
                    toast.promise(qr(producto), {
                        loading: 'Generando código QR...',
                        success: (qr: Qr) => {
                            const data = qs.parseUrl(qr.codigo).query
                            const url = '/metadata/generate?' + qs.stringify(data)
                            push(url)
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

    const generateQuery = useCallback((data: Producto) => {
        const updatedQuery: any = {
            fecha: data.fechaRegistro,
            id: data.id,
            nombre: data.nombre,
            categoria: data.categoria,
        }

        const url = qs.stringifyUrl({
            url: '',
            query: updatedQuery
        }, { skipNull: true })

        return url
    }, [])

    return (
        <form onSubmit={handleSubmit} className={clsx('flex flex-col gap-7', className)}>
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between'>
                    <h3 className='font-semibold'>Información</h3>
                    <Info />
                </div>
                <div className='flex flex-col gap-3'>
                    <Input name='nombre' labelText='Nombre' placeholder='Purple Kush' defaultValue={nombre} required />
                    <Textarea name='descripcion' labelText='Descripción' placeholder='Purple Kush' defaultValue={descripcion} required />
                    <Select name='categoria' defaultValue={categoria} required>
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
                    <Input name='imagen' labelText='URL' placeholder='purpleKush.png' defaultValue={imagen} required />
                </div>
            </div>
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
            {type === 'normal' && (
                <div className='absolute w-16 right-4'>
                    <Button type='submit' className='w-16 fixed bottom-8'>
                        <Save />
                    </Button>
                </div>
            )}

            {type === 'floating' && (
                <div className='absolute w-16 right-0 bottom-16'>
                    <Button type='submit' className='w-16 fixed'>
                        <Save />
                    </Button>
                </div>
            )}
        </form>
    )
}
