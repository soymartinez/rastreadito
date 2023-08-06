import { prisma } from '@/lib/prisma'
import ModalProduct from '@/components/modal/modal-product'

async function getProduct(codigo: string) {
    const res = await prisma.qr.findUnique({
        where: { codigo },
        include: { producto: true }
    })

    if (!res) throw new Error('No se pudo obtener el producto.')

    return res
}

export default async function ProductId({ params }: { params: { codigo: string } }) {
    const { producto } = await getProduct(params.codigo)
    return (
        <ModalProduct data={producto} />
    )
}
