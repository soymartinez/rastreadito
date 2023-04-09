'use client'

import { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Productos, Qr } from '@prisma/client'
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
import { Back } from '@/ui/back'
import { Input } from '@/ui/input'
import { Textarea } from '@/ui/textarea'
import { Button } from '@/ui/button'

const productTypes = {
    FLOR: 'Flor de cannabis',
    GOTEO: 'Goteros de cannabis',
    UNGUENTO: 'Ungüento de cannabis',
    EDIBLES: 'Edibles de cannabis',
    CARTUCHO: 'Carts de cannabis',
    ACEITE: 'Aceite de cannabis',
}

export default function Metadata() {
    const router = useRouter()
    const params = useSearchParams()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const data = Object.fromEntries(formData.entries()) as object as Productos

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

        const qr = async (data: Productos) => {
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
            success: (producto: Productos) => {
                toast.promise(qr(producto), {
                    loading: 'Generando código QR...',
                    success: (qr: Qr) => {
                        router.push(qr.codigo)
                        return <div>Código QR <strong>#{qr.id}</strong> generado</div>
                    },
                    error: 'Error al generar código QR',
                })
                return <div>Producto <strong>{producto.nombre}</strong> guardado</div>
            },
            error: 'Error al guardar',
        })
    }

    const generateQuery = useCallback((data: Productos) => {
        const updatedQuery: any = {
            fecha: data.createdAt,
            id: data.id,
            nombre: data.nombre,
            tipo: data.tipo,
        }

        const url = qs.stringifyUrl({
            url: '/metadata/generate',
            query: updatedQuery
        }, { skipNull: true })

        return url
    }, [router, params])

    return (
        <div className='px-4 min-h-screen relative max-w-7xl mx-auto'>
            <div className='flex justify-center items-center py-8 relative'>
                <Back className='absolute left-0' />
                <h1 className='font-bold text-xl'>Metadata</h1>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-7'>
                <div className='flex flex-col gap-4'>
                    <div className='flex justify-between'>
                        <h3 className='font-semibold'>Información</h3>
                        <Info />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Input name='nombre' labelText='Nombre' placeholder='Purple Kush' required />
                        <Textarea name='descripcion' labelText='Descripción' placeholder='Purple Kush' required />
                        <Select name='tipo' required>
                            <SelectTrigger labelText='Tipo de producto'>
                                <SelectValue placeholder='Selecciona un tipo de producto' />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(productTypes).map(([key, value]) => (
                                    <SelectItem className='first:rounded-t-xl last:rounded-b-xl placeholder:text-_primary' key={key} value={key}>
                                        {value}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='flex justify-between'>
                        <h3 className='font-semibold'>Características</h3>
                        <Info />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Input name='cepa' labelText='Cepa' placeholder='Purple Kush' required />
                        <Input name='thc' labelText='THC' placeholder='0.0' required variant='porcentage' />
                        <Input name='cbd' labelText='CBD' placeholder='0.0' required variant='porcentage' />
                        <Input name='aroma' labelText='Aroma' placeholder='Tierra, pino, dulce' required />
                        <Input name='efecto' labelText='Efectos' placeholder='Relajante, calmante, eufórico' required />
                    </div>
                </div>
                <Button type='submit' className='w-16 fixed xl:absolute right-4 bottom-8'>
                    <Save />
                </Button>
            </form>
        </div>
    )
}
