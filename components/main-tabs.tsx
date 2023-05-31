import Link from 'next/link'
import clsx from 'clsx'
import GeneralCard from './card/general'
import HistorialCard from './card/history'
import CategoryCard from './card/category'
import { Tabs, TabsContent, TabsList } from '@/ui/tabs'
import { Categoria, Qr } from '@prisma/client'
import Empty from './empty'
import TabTrigger from './tab-trigger'
import { Suspense } from 'react'
import { getCurrentUser } from '@/hooks/auth'
import { prisma } from '@/lib/prisma'
import TrOverviewLoading from './loading/tr-overview'

async function getQr(usuario: string,) {
    const res = await prisma.qr.findMany({
        where: {
            producto: {
                usuario,
            }
        },
        include: {
            producto: true,
        },
        orderBy: {
            fechaRegistro: 'desc'
        },
    })

    return res
}

async function getCategorias(usuario: string) {
    const res = await prisma.categoria.findMany({
        orderBy: {
            id: 'asc'
        },
        include: {
            galeria: {
                where: {
                    usuario,
                }
            },
        },
    })

    return res
}

export default async function MainTabs() {
    const user = await getCurrentUser()
    const qr = getQr(user?.email ?? '')
    const categories = getCategorias(user?.email ?? '')
    return (
        <Tabs defaultValue='general'>
            <TabsList className='flex py-2 overflow-x-auto'>
                <div className='flex gap-2 w-min'>
                    <TabTrigger
                        label='Inicio'
                        value='general'
                    />
                    <TabTrigger
                        label='Categoría'
                        value='categories'
                    />
                    <Link href={'/history'}>
                        <div className={`w-28 h-12
                            flex justify-center items-center transition-all
                            bg-_white text-_dark border-2 hover:bg-_gray border-_gray font-[500] rounded-full
                            dark:bg-_dark dark:text-_white dark:border-_darkText dark:hover:bg-_darkText`}
                        >
                            Historial
                        </div>
                    </Link>
                </div>
            </TabsList>
            <TabsContent value='general' className='flex flex-col gap-6 md:gap-8'>
                <div>
                    <h1 className='font-semibold text-xl leading-loose pt-6 pb-3'>General</h1>
                    <div className={clsx('grid gap-3')}>
                        {/* @ts-expect-error Async Server Component */}
                        <GeneralCard
                            props={{
                                title: 'Activo',
                                description: 'El código aún no ha sido escaneado y utilizado para su propósito previsto.',
                                icon: 'active',
                                estatus: 'ACTIVO',
                            }}
                        />
                        {/* @ts-expect-error Async Server Component */}
                        <GeneralCard
                            props={{
                                title: 'Uso',
                                description: 'El código ha sido utilizado y ya no es válido. Evitar el fraude o la duplicación de códigos.',
                                icon: 'use',
                                estatus: 'USADO',
                            }}
                        />
                        {/* @ts-expect-error Async Server Component */}
                        <GeneralCard
                            props={{
                                title: 'Destruido',
                                description: 'Un QR destruido no puede ser utilizado y su estado indica que ha sido anulado.',
                                icon: 'destroy',
                                estatus: 'DESTRUIDO',
                            }}
                        />
                    </div>
                </div>

                <div>
                    <h1 className='font-semibold text-xl leading-loose pt-6 pb-3'>Ultimos códigos</h1>
                    <Suspense fallback={<TrOverviewLoading />}>
                        {/* @ts-expect-error Async Server Component */}
                        <Historial data={qr} />
                    </Suspense>
                </div>
            </TabsContent>
            <TabsContent value='categories'>
                <h1 className='font-semibold text-xl leading-loose pt-6 pb-3'>Categoria</h1>
                <Suspense fallback={<div>Loading...</div>}>
                    {/* @ts-expect-error Async Server Component */}
                    <Categories data={categories} />
                </Suspense>
            </TabsContent>
        </Tabs>
    )
}

export async function Historial({ data }: { data: Promise<Qr[]> }) {
    const qrList = await data
    return (
        <>
            {qrList && qrList?.length > 0
                ? <HistorialCard data={qrList} />
                : <Empty height='full' title='Aún no tienes productos registrados.' description='Registra tu primer producto' />}
        </>
    )
}

export async function Categories({ data }: { data: Promise<Categoria[]> }) {
    const categories = await data
    return (
        <div className='grid gap-3'>
            {categories.map((category) => (
                <CategoryCard key={category.id} props={category} />
            ))}
        </div>
    )
}
