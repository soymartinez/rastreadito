import Empty from '@/components/empty'
import ModalPage from '@/components/modal/modal-page'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

async function getQr(acronimo: string) {
    const res = await prisma.qr.findMany({
        where: {
            producto: {
                categoria: {
                    contains: acronimo,
                }
            }
        },
        include: {
            producto: true
        }
    })

    return res
}

export default async function CategoriaNombre({ params }: { params: { nombre: string } }) {
    const qr = await getQr(params.nombre.toUpperCase())
    return (
        <ModalPage>
            <div className='py-4'>
                <h1 className='text-5xl font-bold capitalize'>{params.nombre}</h1>
            </div>
            <div className='overflow-auto scrollbar-thin'>
                {qr.length === 0
                    ? <Empty title='No hay productos en esta categoría.' description='Registra tu primer producto.' />
                    : qr.map(({ producto, id, codigo }) => (
                        <div key={id} className='flex flex-col gap-4 p-2 hover:bg-_gray dark:hover:bg-_dark/50'>
                            <Link href={`/product/${codigo}`}>
                                <h1 className='text-xl font-semibold text-_dark dark:text-_white dark:hover:text-opacity-70'>
                                    {producto.nombre} <span className='text-_grayText dark:text-_primary text-sm'>#{producto.categoria} {id}</span>
                                </h1>
                            </Link>
                        </div>
                    ))}
            </div>
        </ModalPage>
    )
}
