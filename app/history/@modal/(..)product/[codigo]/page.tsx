import { headers } from 'next/headers'
import { prisma } from '@/lib/prisma'

import ModalPage from '@/components/modal/modal-page'
import {
    ActiveButton,
    DestroyButton,
    UseButton
} from '@/components/status'
import FormMetadata from '@/components/form-metadata'

async function getProduct(codigo: string) {
    const res = await prisma.qr.findUnique({
        where: { codigo },
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

export default async function ProductId({ params }: { params: { codigo: string } }) {
    const {
        estatus,
        producto,
    } = await getProduct(params.codigo)

    const { get } = headers()
    const origin = get('x-origin') || ''
    const categorias = await getCategorias(origin)

    return (
        <ModalPage>
            <div className='sticky top-0 z-50 flex justify-between items-center bg-_white dark:bg-_dark border-b border-_darkText'>
                <h1 className='text-5xl font-bold leading-loose truncate'>{producto.nombre}</h1>
                <div>
                    {estatus === 'ACTIVO' && <ActiveButton />}
                    {estatus === 'DESTRUIDO' && <DestroyButton />}
                    {estatus === 'USADO' && <UseButton />}
                </div>
            </div>
            <FormMetadata
                className='overflow-auto relative'
                categorias={categorias}
                producto={producto}
                type='floating'
            />
        </ModalPage>
    )
}
