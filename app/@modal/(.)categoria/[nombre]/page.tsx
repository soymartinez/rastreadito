import ModalPage from '@/components/modal/modal-page'
import { getCurrentUser } from '@/hooks/auth'
import { prisma } from '@/lib/prisma'
import { QrProductType } from '@/types'
import { Suspense } from 'react'
import ContentLoader from 'react-content-loader'
import CategoriasData from './data'

async function getQr(acronimo: string, usuario: string | undefined) {
    const res = await prisma.qr.findMany({
        where: {
            producto: {
                categoria: {
                    contains: acronimo,
                },
                usuario,
            }
        },
        include: {
            producto: true
        },
        orderBy: {
            fechaActualizacion: 'desc'
        }
    })

    return res
}

export default async function CategoriaNombre({ params }: { params: { nombre: string } }) {
    const user = await getCurrentUser()
    const qr = getQr(params.nombre.toUpperCase(), user?.email)
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
    return <CategoriasData data={data} />
}

const FadingLoader = () => {
    return (
        <>
            <ContentLoader
                className='w-full h-full px-3 dark:hidden'
                backgroundColor='#f3f3f3'
                foregroundColor='#ecebeb'
            >
                <rect x='0' y='0' rx='5' ry='5' width='200' height='20' />
                <rect x='0' y='48' rx='5' ry='5' width='100%' height='32' />
                <rect x='0' y='96' rx='5' ry='5' width='100%' height='32' />
                <rect x='0' y='144' rx='5' ry='5' width='100%' height='32' />
                <rect x='0' y='192' rx='5' ry='5' width='100%' height='32' />
                <rect x='0' y='240' rx='5' ry='5' width='100%' height='32' />
            </ContentLoader>
            <ContentLoader
                className='w-full h-96 px-3 dark:block hidden'
                backgroundColor='#262626'
                foregroundColor='#212121'
            >
                <rect x='0' y='0' rx='5' ry='5' width='200' height='20' />
                <rect x='0' y='48' rx='5' ry='5' width='100%' height='32' />
                <rect x='0' y='96' rx='5' ry='5' width='100%' height='32' />
                <rect x='0' y='144' rx='5' ry='5' width='100%' height='32' />
                <rect x='0' y='192' rx='5' ry='5' width='100%' height='32' />
                <rect x='0' y='240' rx='5' ry='5' width='100%' height='32' />
            </ContentLoader>
        </>
    )
}
