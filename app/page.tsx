'use client'

import { useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { LayoutGrid, LayoutList, Scan } from 'lucide-react'
import Card from '@/components/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import Image from 'next/image'

export default function Home() {
  const [layoutGrid, setLayoutGrid] = useState<'layout-list' | 'layout-grid'>('layout-list')
  const handleLayoutGrid = () => {
    layoutGrid === 'layout-list'
      ? setLayoutGrid('layout-grid')
      : setLayoutGrid('layout-list')
  }

  return (
    <main className='px-4 min-h-screen relative'>
      <div className='flex justify-between items-center py-6 relative'>
        <h1 className='font-black text-2xl uppercase italic'>rastreadito</h1>
        <div className='flex gap-2'>
          <Link href={'/scan'} className='rounded-full'>
            <div className='w-11 h-11 border-2 border-_gray dark:border-_darkText rounded-full flex items-center justify-center'>
              <Scan />
            </div>
          </Link>
          <Link href={'/account'} className='rounded-full'>
            <div className='w-11 h-11 border-2 border-_gray dark:border-_darkText bg-_primary rounded-full' />
          </Link>
        </div>
      </div>
      <h1 className='text-5xl font-bold leading-loose truncate'>BeeHealthy</h1>
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
        <TabsContent value='general'>
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
            <Card
              layoutGrid={layoutGrid}
              props={{
                title: 'Activo',
                description: 'El código aún no ha sido escaneado y utilizado para su propósito previsto.',
                number: 86,
                icon: 'active',
              }}
            />
            <Card
              layoutGrid={layoutGrid}
              props={{
                title: 'Uso',
                description: 'El código ha sido utilizado y ya no es válido. Evitar el fraude o la duplicación de códigos.',
                number: 62,
                icon: 'use',
              }}
            />
            <Card
              layoutGrid={layoutGrid}
              props={{
                title: 'Destruido',
                description: 'Un QR destruido no puede ser utilizado y su estado indica que ha sido anulado.',
                number: 24,
                icon: 'destroy',
              }}
            />
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
            <div className='bg-_dark hover:bg-_dark/95 dark:bg-_darkText dark:hover:bg-_darkText/80 transition-all p-4 overflow-auto rounded-2xl flex gap-4 justify-between items-center cursor-pointer'>
              <h1 className='text-xl font-semibold text-_white'>Goteo</h1>
              <Image src={'/categories/dropper.png'} alt={'dropper'} width={44} height={44} />
            </div>
            <div className='bg-_dark hover:bg-_dark/95 dark:bg-_darkText dark:hover:bg-_darkText/80 transition-all p-4 overflow-auto rounded-2xl flex gap-4 justify-between items-center cursor-pointer'>
              <h1 className='text-xl font-semibold text-_white'>Ungüento</h1>
              <Image src={'/categories/bottle.png'} alt={'bottle'} width={44} height={44} />
            </div>
            <div className='bg-_dark hover:bg-_dark/95 dark:bg-_darkText dark:hover:bg-_darkText/80 transition-all p-4 overflow-auto rounded-2xl flex gap-4 justify-between items-center cursor-pointer'>
              <h1 className='text-xl font-semibold text-_white'>Edible</h1>
              <Image src={'/categories/mortar.png'} alt={'mortar'} width={44} height={44} />
            </div>
            <div className='bg-_dark hover:bg-_dark/95 dark:bg-_darkText dark:hover:bg-_darkText/80 transition-all p-4 overflow-auto rounded-2xl flex gap-4 justify-between items-center cursor-pointer'>
              <h1 className='text-xl font-semibold text-_white'>Cartucho</h1>
              <Image src={'/categories/cart.png'} alt={'cart'} width={44} height={44} />
            </div>
            <div className='bg-_dark hover:bg-_dark/95 dark:bg-_darkText dark:hover:bg-_darkText/80 transition-all p-4 overflow-auto rounded-2xl flex gap-4 justify-between items-center cursor-pointer'>
              <h1 className='text-xl font-semibold text-_white'>Aceite</h1>
              <Image src={'/categories/blood-drop.png'} alt={'blood-drop'} width={44} height={44} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main >
  )
}
