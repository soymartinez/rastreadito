import { headers } from 'next/headers'
import { Save } from 'lucide-react'
import { Categoria } from '@prisma/client'
import { prisma } from '@/lib/prisma'

import ModalPage from '@/components/modal/modal-page'
import {
    ActiveButton,
    DestroyButton,
    UseButton
} from '@/components/status'
import { Textarea } from '@/ui/textarea'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/ui/select'

async function getProduct(id: string) {
    const res = await prisma.qr.findUnique({
        where: { productoId: Number(id) },
        include: { producto: true }
    })

    if (!res) throw new Error('No se pudo obtener el producto.')

    return res
}

const getCategorias = async (origin: string) => {
    const res = await fetch(origin + '/api/categorias')
    const data = await res.json()
    return data
}

export default async function ProductId({ params }: { params: { id: string } }) {
    const {
        estatus,
        producto: {
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
        }
    } = await getProduct(params.id)

    const { get } = headers()
    const origin = get('x-origin') || ''
    const categorias = await getCategorias(origin)

    return (
        <ModalPage>
            <div className='sticky top-0 z-50 flex justify-between items-center bg-_white dark:bg-_dark border-b border-_darkText'>
                <h1 className='text-5xl font-bold leading-loose truncate'>{nombre}</h1>
                <div>
                    {estatus === 'ACTIVO' && <ActiveButton />}
                    {estatus === 'DESTRUIDO' && <DestroyButton />}
                    {estatus === 'USADO' && <UseButton />}
                </div>
            </div>
            <form className='flex flex-col gap-5 font-semibold text-lg relative px-1 overflow-auto h-full'>
                <div className='flex flex-col gap-4'>
                    <h3 className='font-semibold sticky top-0 bg-_white dark:bg-_dark leading-loose'>Información</h3>
                    <div className='flex flex-col gap-3'>
                        <Input name='nombre' labelText='Nombre' placeholder='Purple Kush' defaultValue={nombre} required />
                        <Textarea name='descripcion' labelText='Descripción' placeholder='Purple Kush' defaultValue={descripcion} required />
                        <Select name='categoria' defaultValue={categoria} required>
                            <SelectTrigger labelText='Tipo de producto'>
                                <SelectValue placeholder='Selecciona un tipo de producto' />
                            </SelectTrigger>
                            <SelectContent>
                                {categorias.map((categoria: Categoria) => (
                                    <SelectItem
                                        className='first:rounded-t-xl last:rounded-b-xl placeholder:text-_primary'
                                        key={categoria.acronimo}
                                        value={categoria.acronimo}
                                    >
                                        {categoria.nombre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Input name='imagen' labelText='URL' placeholder='purpleKush.png' defaultValue={imagen} required />
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <h3 className='font-semibold sticky top-0 bg-_white dark:bg-_dark leading-loose'>Características</h3>
                    <div className='flex flex-col gap-3'>
                        <Input name='cepa' labelText='Cepa' defaultValue={cepa} required />
                        <Input name='thc' labelText='THC' placeholder='0.0' defaultValue={thc} required variant='porcentage' />
                        <Input name='cbd' labelText='CBD' placeholder='0.0' required defaultValue={cbd} variant='porcentage' />
                        <Input name='aroma' labelText='Aroma' placeholder='Tierra, pino, dulce' defaultValue={aroma} required />
                        <Input name='efecto' labelText='Efectos' placeholder='Relajante, calmante, eufórico' defaultValue={efecto} required />
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <h3 className='font-semibold sticky top-0 bg-_white dark:bg-_dark leading-loose'>Fabricación</h3>
                    <div className='flex flex-col gap-3'>
                        <Input name='fabricante' labelText='Fabricante' placeholder='Rastreadito' defaultValue={fabricante} required />
                        <Input name='pais' labelText='País' placeholder='México' defaultValue={pais} required />
                        <Input name='proveedor' labelText='Proveedor' placeholder='Rastreadito Co.' defaultValue={proveedor} required />
                        <Input name='precio' labelText='PRECIO' placeholder='0' defaultValue={Number(precio)} variant='currency' />
                        <Input name='peso' labelText='PESO' placeholder='0' defaultValue={peso ?? 'No registrado'} variant='weight' />
                        <Input name='fechaCosecha' labelText='Cosecha' defaultValue={fechaCosecha?.toString()} variant='date' />
                        <Input name='fechaEnvasado' labelText='Envasado' defaultValue={fechaEnvasado?.toString()} variant='date' />
                        <Input name='fechaCaducidad' labelText='Caducidad' defaultValue={fechaCaducidad?.toString()} variant='date' />
                        <Input name='lote' labelText='Lote' placeholder='RD-2023-01-01' defaultValue={lote ?? 'No registrado'} />
                        <Input name='certificado' labelText='Certificado' placeholder='URL de analisis de laboratorio' defaultValue={certificado ?? 'No registrado'} />
                        <Textarea name='notas' labelText='Notas' placeholder='Este producto se cosecho 4:20am' defaultValue={notas ?? 'No registrado'} />
                    </div>
                </div>
                <div className='absolute w-16 right-1 bottom-16'>
                    <Button type='submit' className='w-16 fixed'>
                        <Save />
                    </Button>
                </div>
            </form>
        </ModalPage>
    )
}
