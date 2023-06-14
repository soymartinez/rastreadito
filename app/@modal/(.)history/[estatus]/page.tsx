import Empty from '@/components/empty'
import ModalPage from '@/components/modal/modal-page'
import { useSupabaseServer } from '@/hooks/auth'
import { prisma } from '@/lib/prisma'
import { QrProductType } from '@/types'
import { Input } from '@/ui/input'
import { Estatus } from '@prisma/client'
import { User } from '@supabase/supabase-js'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import ContentLoader from 'react-content-loader'
import DataHistoryEstatus from './data'

const getStatusHistory = async (estatus: Estatus, user: User | null) => {
    const history = await prisma.qr.findMany({
        where: {
            estatus,
            producto: {
                usuario: user?.email
            }
        },
        include: {
            producto: true,
        }
    })

    return history
}

export default async function HistoryStatus({ params }: { params: { estatus: string } }) {
    const { user } = await useSupabaseServer()
    const history = getStatusHistory(params.estatus.toUpperCase() as Estatus, user)

    const title = () => {
        const estatus = params.estatus.toUpperCase() as Estatus
        if (estatus === Estatus.ACTIVO) return 'QRs activos'
        if (estatus === Estatus.USADO) return 'QRs en uso'
        if (estatus === Estatus.DESTRUIDO) return 'QRs destruidos'
    }

    return (
        <ModalPage>
            <div className='sticky top-0 z-50 bg-_white dark:bg-_dark border-b border-_gray dark:border-_darkText'>
                <h1 className='text-5xl font-bold leading-loose truncate'>{title()}</h1>
            </div>
            <Suspense fallback={<FadingLoader />}>
                {/* @ts-expect-error Async Server Component */}
                <History history={history} />
            </Suspense>
        </ModalPage>
    )
}

async function History({ history }: { history: Promise<QrProductType[]> }) {
    const data = await history
    return <DataHistoryEstatus data={data} />
}

const FadingLoader = () => (
    <>
        <ContentLoader
            className='w-full h-96 dark:hidden'
            backgroundColor='#f3f3f3'
            foregroundColor='#ecebeb'
        >
            <rect x='0' y='0' rx='5' ry='5' width='64' height='64' />
            <rect x='70' y='8' rx='5' ry='5' width='200' height='16' />
            <rect x='70' y='28' rx='5' ry='5' width='100%' height='26' />

            <rect x='0' y='80' rx='5' ry='5' width='64' height='64' />
            <rect x='70' y='88' rx='5' ry='5' width='180' height='16' />
            <rect x='70' y='108' rx='5' ry='5' width='80%' height='26' />

            <rect x='0' y='160' rx='5' ry='5' width='64' height='64' />
            <rect x='70' y='168' rx='5' ry='5' width='210' height='16' />
            <rect x='70' y='188' rx='5' ry='5' width='70%' height='26' />
        </ContentLoader>
        <ContentLoader
            className='w-full h-96 hidden dark:block'
            backgroundColor='#262626'
            foregroundColor='#212121'
        >
            <rect x='0' y='0' rx='5' ry='5' width='64' height='64' />
            <rect x='70' y='8' rx='5' ry='5' width='200' height='16' />
            <rect x='70' y='28' rx='5' ry='5' width='100%' height='26' />

            <rect x='0' y='80' rx='5' ry='5' width='64' height='64' />
            <rect x='70' y='88' rx='5' ry='5' width='180' height='16' />
            <rect x='70' y='108' rx='5' ry='5' width='80%' height='26' />

            <rect x='0' y='160' rx='5' ry='5' width='64' height='64' />
            <rect x='70' y='168' rx='5' ry='5' width='210' height='16' />
            <rect x='70' y='188' rx='5' ry='5' width='70%' height='26' />
        </ContentLoader>
    </>
)
