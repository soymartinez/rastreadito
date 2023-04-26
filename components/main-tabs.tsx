'use client'

import Link from 'next/link'
import { useState } from 'react'
import clsx from 'clsx'
import { LayoutGrid, LayoutList } from 'lucide-react'
import { CategoryCard, GeneralCard, HistorialCard } from '@/components/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import { Categoria, Qr } from '@prisma/client'

interface MainTabsProps {
    qr?: Qr[],
    categories?: Categoria[],
}

export default function MainTabs({ qr, categories }: MainTabsProps) {
    const [layoutGrid, setLayoutGrid] = useState<'layout-list' | 'layout-grid'>('layout-list')
    const [qrList] = useState({
        active: qr?.filter(qr => qr.estatus === 'ACTIVO'),
        use: qr?.filter(qr => qr.estatus === 'USADO'),
        destroyed: qr?.filter(qr => qr.estatus === 'DESTRUIDO'),
    })

    const handleLayoutGrid = () => {
        layoutGrid === 'layout-list'
            ? setLayoutGrid('layout-grid')
            : setLayoutGrid('layout-list')
    }

    return (
        <Tabs defaultValue='general'>
            <TabsList className='flex py-2 overflow-x-auto'>
                <div className='flex gap-2 w-min'>
                    <TabsTrigger
                        value='general'
                        className={`w-28 h-12
                            flex justify-center items-center transition-all
                            data-[state=active]:bg-[#1b1b1b] data-[state=active]:text-_white data-[state=active]:border-none 
                            dark:data-[state=active]:bg-_primary dark:data-[state=active]:text-_dark 
                            bg-_white text-_dark border-2 hover:bg-_gray border-_gray font-[500] rounded-full
                            dark:bg-_dark dark:text-_white dark:border-_darkText dark:hover:bg-_darkText`}
                    >
                        Inicio
                    </TabsTrigger>
                    <TabsTrigger
                        value='categories'
                        className={`w-28 h-12
                            flex justify-center items-center transition-all
                            data-[state=active]:bg-[#1b1b1b] data-[state=active]:text-_white data-[state=active]:border-none 
                            dark:data-[state=active]:bg-_primary dark:data-[state=active]:text-_dark 
                            bg-_white text-_dark border-2 hover:bg-_gray border-_gray font-[500] rounded-full
                            dark:bg-_dark dark:text-_white dark:border-_darkText dark:hover:bg-_darkText`}
                    >
                        Categoría
                    </TabsTrigger>
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
                    <div className='flex justify-between items-center pt-6 pb-3'>
                        <h1 className='font-semibold text-xl'>General</h1>
                        <button onClick={handleLayoutGrid}
                            className='p-2 border-2 border-_gray dark:border-_darkText rounded-full'>
                            {layoutGrid === 'layout-list'
                                ? <LayoutGrid />
                                : <LayoutList />}
                        </button>
                    </div>
                    <div className={clsx('grid gap-3', {
                        'grid-cols-1': layoutGrid === 'layout-list',
                        'grid-cols-2': layoutGrid === 'layout-grid',
                    })}>
                        <GeneralCard
                            layoutGrid={layoutGrid}
                            props={{
                                title: 'Activo',
                                description: 'El código aún no ha sido escaneado y utilizado para su propósito previsto.',
                                number: qrList.active?.length || 0,
                                icon: 'active',
                            }}
                        />
                        <GeneralCard
                            layoutGrid={layoutGrid}
                            props={{
                                title: 'Uso',
                                description: 'El código ha sido utilizado y ya no es válido. Evitar el fraude o la duplicación de códigos.',
                                number: qrList.use?.length || 0,
                                icon: 'use',
                            }}
                        />
                        <GeneralCard
                            layoutGrid={layoutGrid}
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
                    <div className='flex justify-between items-center pt-6 pb-3'>
                        <h1 className='font-semibold text-xl'>Ultimos códigos</h1>
                    </div>
                    <HistorialCard data={qr} />
                </div>
            </TabsContent>
            <TabsContent value='categories'>
                <div className='flex justify-between items-center pt-6 pb-3'>
                    <h1 className='font-semibold text-xl'>Categoria</h1>
                    <button onClick={handleLayoutGrid}
                        className='p-2 border-2 border-_gray dark:border-_darkText rounded-full'>
                        {layoutGrid === 'layout-list'
                            ? <LayoutGrid />
                            : <LayoutList />}
                    </button>
                </div>
                <div className={clsx('grid gap-3', {
                    'grid-cols-1': layoutGrid === 'layout-list',
                    'grid-cols-2': layoutGrid === 'layout-grid',
                })}>
                    <CategoryCard name='Goteo' icon='dropper' />
                    <CategoryCard name='Ungüento' icon='bottle' />
                    <CategoryCard name='Edible' icon='mortar' />
                    <CategoryCard name='Cartucho' icon='cart' />
                    <CategoryCard name='Aceite' icon='blood-drop' />
                </div>
            </TabsContent>
        </Tabs>
    )
}
