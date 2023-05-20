'use client'

import Link from 'next/link'
import { useState } from 'react'
import clsx from 'clsx'
import GeneralCard from './card/general'
import HistorialCard from './card/history'
import CategoryCard from './card/category'
import { Tabs, TabsContent, TabsList } from '@/ui/tabs'
import { Categoria, Qr } from '@prisma/client'
import EmptyHistory from './empty-history'
import TabTrigger from './tab-trigger'

interface MainTabsProps {
    qr?: Qr[],
    categories?: Categoria[],
}

export default function MainTabs({ qr, categories }: MainTabsProps) {
    const [qrList] = useState({
        active: qr?.filter(qr => qr.estatus === 'ACTIVO'),
        use: qr?.filter(qr => qr.estatus === 'USADO'),
        destroyed: qr?.filter(qr => qr.estatus === 'DESTRUIDO'),
    })
    const [categoryList] = useState(categories)
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
                        <GeneralCard
                            props={{
                                title: 'Activo',
                                description: 'El código aún no ha sido escaneado y utilizado para su propósito previsto.',
                                number: qrList.active?.length || 0,
                                icon: 'active',
                            }}
                        />
                        <GeneralCard
                            props={{
                                title: 'Uso',
                                description: 'El código ha sido utilizado y ya no es válido. Evitar el fraude o la duplicación de códigos.',
                                number: qrList.use?.length || 0,
                                icon: 'use',
                            }}
                        />
                        <GeneralCard
                            props={{
                                title: 'Destruido',
                                description: 'Un QR destruido no puede ser utilizado y su estado indica que ha sido anulado.',
                                number: qrList.destroyed?.length || 0,
                                icon: 'destroy',
                            }}
                        />
                    </div>
                </div>

                <div>
                    <h1 className='font-semibold text-xl leading-loose pt-6 pb-3'>Ultimos códigos</h1>
                    {qr && qr?.length > 0
                        ? <HistorialCard data={qr} />
                        : <EmptyHistory height='full' title='productos' description='producto' />}
                </div>
            </TabsContent>
            <TabsContent value='categories'>
                <h1 className='font-semibold text-xl leading-loose pt-6 pb-3'>Categoria</h1>
                <div className={clsx('grid gap-3')}>
                    {categoryList?.map((category) => (
                        <CategoryCard key={category.id} props={category} />
                    ))}
                </div>
            </TabsContent>
        </Tabs>
    )
}
