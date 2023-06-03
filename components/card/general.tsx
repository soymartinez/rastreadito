import { getCurrentUser } from '@/hooks/auth'
import { prisma } from '@/lib/prisma'
import { Estatus } from '@prisma/client'
import {
    Package,
    PackageOpen,
    QrCode
} from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import ContentLoader from 'react-content-loader'

async function getQrCount(estatus: Estatus, user: string) {
    const res = await prisma.qr.count({
        where: {
            estatus,
            producto: {
                usuario: user,
            }
        }
    })

    return res
}

export default async function GeneralCard({ props }: {
    props: {
        title: string
        description: string
        icon: 'active' | 'use' | 'destroy',
        estatus: Estatus,
    },
}) {
    const user = await getCurrentUser()
    const count = getQrCount(props.estatus, user?.email ?? '')
    return (
        <Link href={`/history/${props.estatus.toLowerCase()}`}>
            <div className={'grid grid-flow-col sm:flex items-center gap-4 bg-_dark dark:bg-_darkText hover:bg-_dark/95 dark:hover:bg-_darkText/80 transition-all cursor-pointer p-4 rounded-2xl'}>
                <span>
                    {props.icon === 'active' && <QrCode size={56} className='text-_primary' />}
                    {props.icon === 'use' && <Package size={56} className='text-_primary' />}
                    {props.icon === 'destroy' && <PackageOpen size={56} className='text-_primary' />}
                </span>
                <div className={'w-full'}>
                    <h1 className='text-xl font-semibold text-_white'>{props.title}</h1>
                    <p className='text-xs font-medium text-_grayText'>
                        {props.description}
                    </p>
                </div>
                <div>
                    <Suspense fallback={<FadingLoader />}>
                        {/* @ts-expect-error Async Server Component */}
                        <Count promise={count} />
                    </Suspense>
                </div>
            </div>
        </Link>
    )
}

export async function Count({ promise }: { promise: Promise<number> }) {
    const count = await promise
    return <h1 className={'text-5xl font-semibold text-_white'}>{count}</h1>
}

const FadingLoader = () => (
    <>
        <ContentLoader
            width={48}
            height={48}
            className='dark:hidden'
            backgroundColor='#f3f3f3'
            foregroundColor='#ecebeb'
        >
            <rect x='0' y='0' rx='5' ry='5' width='48' height='48' />
        </ContentLoader>
        <ContentLoader
            width={48}
            height={48}
            className='hidden dark:block'
            backgroundColor='#262626'
            foregroundColor='#212121'
        >
            <rect x='0' y='0' rx='5' ry='5' width='48' height='48' />
        </ContentLoader>
    </>
)