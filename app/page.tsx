'use client'

import { useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { Bell, LayoutGrid, LayoutList } from 'lucide-react'
import Card from '@/components/card'
import { Tabs, TabsContent, TabsList } from '@/ui/tabs'
import { TabsTrigger } from '@radix-ui/react-tabs'
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
        <h1 className='font-black text-2xl uppercase italic'>weedtrace</h1>
        <div className='flex gap-2'>
          <div className='w-11 h-11 border-2 border-_gray rounded-full flex items-center justify-center'>
            <Bell />
          </div>
          <Link href={'/account'}>
            <div className='w-11 h-11 border-2 border-_gray bg-_primary rounded-full' />
          </Link>
        </div>
      </div>
      <h1 className='text-5xl font-bold leading-loose truncate'>BeeHealthy</h1>
      <Tabs defaultValue='general'>
        <TabsList className='py-2 px-0 gap-2 flex justify-start items-center w-min overflow-x-auto bg-_white'>
          <TabsTrigger
            value='general'
            className={`w-28 h-12 px-0 py-0
            flex justify-center items-center transition-all
            data-[state=active]:bg-[#1b1b1b] data-[state=active]:text-_white data-[state=active]:border-none 
            bg-_white text-_dark border-2 hover:bg-_gray border-_gray font-[500] rounded-full`}
          >
            Inicio
          </TabsTrigger>
          <TabsTrigger
            value='categories'
            className={`w-28 h-12 px-0 py-0
            flex justify-center items-center transition-all
            data-[state=active]:bg-[#1b1b1b] data-[state=active]:text-_white data-[state=active]:border-none 
            bg-_white text-_dark border-2 hover:bg-_gray border-_gray font-[500] rounded-full`}
          >
            Categoría
          </TabsTrigger>
          <Link href={'/history'}>
            <div className={`w-28 h-12 px-0 py-0
            flex justify-center items-center transition-all
            bg-_white text-_dark border-2 hover:bg-_gray border-_gray font-[500] rounded-full`}
            >
              Historial
            </div>
          </Link>
        </TabsList>
        <TabsContent value='general'>
          <div className='flex justify-between items-center pt-6 pb-3'>
            <h1 className='font-semibold text-xl'>General</h1>
            <button onClick={handleLayoutGrid}
              className='p-2 border-2 border-_gray rounded-full'>
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
              className='p-2 border-2 border-_gray rounded-full'>
              {layoutGrid === 'layout-list'
                ? <LayoutGrid />
                : <LayoutList />}
            </button>
          </div>
          <div className={clsx('grid gap-3', {
            'grid-cols-1': layoutGrid === 'layout-list',
            'grid-cols-2': layoutGrid === 'layout-grid',
          })}>
            <div className='bg-_dark hover:bg-_dark/95 transition-all p-4 overflow-auto rounded-2xl flex gap-4 justify-between items-center'>
              <h1 className='text-xl font-semibold text-_white'>Goteo</h1>
              <Image src={'/categories/dropper.png'} alt={'dropper'} width={44} height={44} />
            </div>
            <div className='bg-_dark hover:bg-_dark/95 transition-all p-4 overflow-auto rounded-2xl flex gap-4 justify-between items-center'>
              <h1 className='text-xl font-semibold text-_white'>Ungüento</h1>
              <Image src={'/categories/bottle.png'} alt={'bottle'} width={44} height={44} />
            </div>
            <div className='bg-_dark hover:bg-_dark/95 transition-all p-4 overflow-auto rounded-2xl flex gap-4 justify-between items-center'>
              <h1 className='text-xl font-semibold text-_white'>Edible</h1>
              <Image src={'/categories/mortar.png'} alt={'mortar'} width={44} height={44} />
            </div>
            <div className='bg-_dark hover:bg-_dark/95 transition-all p-4 overflow-auto rounded-2xl flex gap-4 justify-between items-center'>
              <h1 className='text-xl font-semibold text-_white'>Cartucho</h1>
              <Image src={'/categories/cart.png'} alt={'cart'} width={44} height={44} />
            </div>
            <div className='bg-_dark hover:bg-_dark/95 transition-all p-4 overflow-auto rounded-2xl flex gap-4 justify-between items-center'>
              <h1 className='text-xl font-semibold text-_white'>Aceite</h1>
              <Image src={'/categories/blood-drop.png'} alt={'blood-drop'} width={44} height={44} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main >
  )
}
