'use client'

import { Suspense, use } from 'react'
import { useSearchParams } from 'next/navigation'
import ModalPage from '@/components/modal/modal-page'
import GaleriaView from '@/components/gallery/galeria-view'
import { Categoria } from '@prisma/client'
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs'
import TabTrigger from '@/components/tab-trigger'
import { CategoriaGaleriaType } from '@/types'

function Loading() {
  return (
    <div className='flex w-min gap-2 py-2'>
      <div className={`
          flex h-12
          w-28 animate-pulse items-center justify-center
          rounded-full border-2 border-_dark 
          transition-all dark:border-_primary
        `}
      />
      <div className={`
          flex h-12
          w-28 animate-pulse items-center justify-center
          rounded-full border-2 border-_gray 
          transition-all dark:border-_darkText
        `}
      />
      <div className={`
          flex h-12
          w-28 animate-pulse items-center justify-center
          rounded-full border-2 border-_gray 
          transition-all dark:border-_darkText
        `}
      />
      <div className={`
          flex h-12
          w-28 animate-pulse items-center justify-center
          rounded-full border-2 border-_gray 
          transition-all dark:border-_darkText
        `}
      />
    </div>
  )
}

function TabsData({ categorias }: { categorias: Categoria[] }) {
  return (
    <>
      {categorias.map((categoria: Categoria) => (
        <TabTrigger
          key={categoria.id}
          className='capitalize'
          value={categoria.acronimo}
          label={categoria.acronimo.toLowerCase()}
        />
      ))}
    </>
  )
}

export default function CategoriaTipo() {
  const searchParams = useSearchParams()
  const tipo = searchParams.get('tipo')
  const nombre = searchParams.get('nombre') || ''
  const descripcion = searchParams.get('descripcion') || ''
  const categorias = use(fetch('/api/categorias').then(res => res.json() as Promise<CategoriaGaleriaType[]>))
  return (
    <ModalPage>
      <Tabs defaultValue={tipo?.toUpperCase() || 'Ver todo'}>
        <div className='sticky top-0 z-50 flex flex-col bg-_white dark:bg-_dark'>
          <h1 className='truncate text-5xl font-bold leading-loose'>Galeria</h1>
          <TabsList className='overflow-x-auto py-2 scrollbar-none scrollbar-thumb-_gray scrollbar-thumb-rounded-full dark:scrollbar-thumb-_darkText sm:scrollbar-thin'>
            <div className='flex w-min gap-2'>
              <Suspense fallback={<Loading />}>
                <TabsData categorias={categorias} />
              </Suspense>
            </div>
          </TabsList>
        </div>
        <div className='overflow-auto'>
          <div className='py-4'>
            {categorias.map((categoria) => (
              <TabsContent key={categoria.id} value={categoria.acronimo} className='relative overflow-auto'>
                <div className='flex flex-col gap-2'>
                  <GaleriaView
                    categoria={{
                      ...categoria,
                      nombreParams: nombre,
                      descripcionParams: descripcion
                    }}
                    galeriaData={categoria.galeria}
                  />
                </div>
              </TabsContent>
            ))}
          </div>
        </div>
      </Tabs>
    </ModalPage >
  )
}
