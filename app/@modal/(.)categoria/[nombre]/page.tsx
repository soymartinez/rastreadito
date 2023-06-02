import Empty from '@/components/empty'
import ModalPage from '@/components/modal/modal-page'
import { ActiveButton, DestroyButton, UseButton } from '@/components/status'
import { prisma } from '@/lib/prisma'
import { QrProductType } from '@/types'
import Link from 'next/link'
import { Suspense } from 'react'
import ContentLoader from 'react-content-loader'

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
    const qr = getQr(params.nombre.toUpperCase())
    return (
        <ModalPage>
            <div className='py-4'>
                <h1 className='text-5xl font-bold capitalize'>{params.nombre}</h1>
            </div>
            <Suspense fallback={<FadingLoader />}>
                {/* @ts-expect-error Async Server Component */}
                <Categorias qr={qr} />
            </Suspense>
        </ModalPage>
    )
}

async function Categorias({ qr }: { qr: Promise<QrProductType[]> }) {
    const data = await qr
    return (
        <div className='overflow-auto scrollbar-thin'>
            {data.length > 0 &&
                <div className='whitespace-nowrap px-3 pb-6'>
                    <span className='font-bold'>{data.length}</span>{' '}
                    {data.length > 1 ? 'productos registrados' : 'producto registrado'}
                </div>}
            {data.length === 0
                ? <Empty title='No hay productos en esta categoría.' description='Registra tu primer producto.' />
                : data.map(({ producto, id, codigo, estatus }) => (
                    <Link key={id} href={`/product/${codigo}`}>
                        <div key={id} className='flex justify-between gap-4 px-3 py-2 hover:bg-_gray dark:hover:bg-_dark/50'>
                            <h1 className='text-xl font-semibold text-_dark dark:text-_white dark:hover:text-opacity-70'>
                                {producto.nombre} <span className='text-_grayText dark:text-_primary text-sm'>#{producto.categoria} {id}</span>
                            </h1>
                            <div>
                                {estatus === 'ACTIVO' && <ActiveButton />}
                                {estatus === 'USADO' && <UseButton />}
                                {estatus === 'DESTRUIDO' && <DestroyButton />}
                            </div>
                        </div>
                    </Link>
                ))}
        </div>
    )
}

const FadingLoader = () => {
    return (
        <ContentLoader
            className='w-full h-full px-3'
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="0" y="0" rx="5" ry="5" width="200" height="20" />
            <rect x="0" y="48" rx="5" ry="5" width="100%" height="32" />
            <rect x="0" y="96" rx="5" ry="5" width="100%" height="32" />
            <rect x="0" y="144" rx="5" ry="5" width="100%" height="32" />
            <rect x="0" y="192" rx="5" ry="5" width="100%" height="32" />
            <rect x="0" y="240" rx="5" ry="5" width="100%" height="32" />
        </ContentLoader>
    )
}
