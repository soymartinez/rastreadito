'use client'

import { Suspense, use } from 'react'
import { useSearchParams } from 'next/navigation'
import ModalPage from '@/components/modal/modal-page'
import GaleriaView from '@/components/gallery/galeria-view'
import { Categoria } from '@prisma/client'
import { Tabs, TabsContent, TabsList } from '@/ui/tabs'
import TabTrigger from '@/components/tab-trigger'
import { CategoriaGaleriaType } from '@/types'

function Loading() {
  return (
    <div className='flex gap-2 w-min py-2'>
      <div className={`
            w-28 h-12
            flex justify-center items-center transition-all
            border-2 border-_dark dark:border-_primary 
            rounded-full animate-pulse
        `}
      />
      <div className={`
            w-28 h-12
            flex justify-center items-center transition-all
            border-2 border-_gray dark:border-_darkText 
            rounded-full animate-pulse
        `}
      />
      <div className={`
            w-28 h-12
            flex justify-center items-center transition-all
            border-2 border-_gray dark:border-_darkText 
            rounded-full animate-pulse
        `}
      />
      <div className={`
            w-28 h-12
            flex justify-center items-center transition-all
            border-2 border-_gray dark:border-_darkText 
            rounded-full animate-pulse
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
          <h1 className='text-5xl font-bold leading-loose truncate'>Galeria</h1>
          <TabsList className='py-2 overflow-x-auto scrollbar-none sm:scrollbar-thin scrollbar-thumb-_gray dark:scrollbar-thumb-_darkText scrollbar-thumb-rounded-full'>
            <div className='flex gap-2 w-min'>
              <Suspense fallback={<Loading />}>
                <TabsData categorias={categorias} />
              </Suspense>
            </div>
          </TabsList>
        </div>
        <div className='overflow-auto'>
          <div className='py-4'>
            {categorias.map((categoria) => (
              <TabsContent key={categoria.id} value={categoria.acronimo} className='overflow-auto relative'>
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
