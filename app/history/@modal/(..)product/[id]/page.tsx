import ModalPage from '@/components/modal/modal-page'
import { prisma } from '@/lib/prisma'

async function getProduct(id: string) {
    const res = await prisma.qr.findUnique({
        where: { productoId: Number(id) },
        include: { producto: true }
    })

    if (!res) throw new Error('No se pudo obtener el producto.')

    return res
}

export default async function ProductId({ params }: { params: { id: string } }) {
    const data = await getProduct(params.id)
    return (
        <ModalPage>
            <code>
                {JSON.stringify(data, null, 2)}
            </code>
        </ModalPage>
    )
}
