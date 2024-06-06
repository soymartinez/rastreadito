import Link from 'next/link'
import clsx from 'clsx'
import GeneralCard from './card/general'
import HistorialCard from './card/history'
import CategoryCard from './card/category'
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs'
import { Categoria, Qr } from '@prisma/client'
import Empty from './empty'
import TabTrigger from './tab-trigger'
import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import TrOverviewLoading from './loading/tr-overview'
import { createClient } from '@/utils/supabase/server'

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
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  const qr = getQr(data.user?.email ?? '')
  const categories = getCategorias(data.user?.email ?? '')
  return (
    <Tabs defaultValue='general'>
      <TabsList className='flex overflow-x-auto py-2'>
        <div className='flex w-min gap-2'>
          <TabTrigger
            label='Inicio'
            value='general'
          />
          <TabTrigger
            label='Categoría'
            value='categories'
          />
          <Link href={'/history'}>
            <div
              className={`
                flex h-12
                w-28 items-center justify-center rounded-full
                border-2 border-gray bg-white font-[500] text-dark transition-all hover:bg-gray
                dark:border-darkText dark:bg-dark dark:text-white dark:hover:bg-darkText
              `}
            >
              Historial
            </div>
          </Link>
        </div>
      </TabsList>
      <TabsContent value='general' className='flex flex-col gap-6 md:gap-8'>
        <div>
          <h1 className='pb-3 pt-6 text-xl font-semibold leading-loose'>General</h1>
          <div className={clsx('grid gap-3')}>
            <GeneralCard
              props={{
                title: 'Activo',
                description: 'El código aún no ha sido escaneado y utilizado para su propósito previsto.',
                icon: 'active',
                estatus: 'active',
              }}
            />
            <GeneralCard
              props={{
                title: 'Uso',
                description: 'El código ha sido utilizado y ya no es válido. Evitar el fraude o la duplicación de códigos.',
                icon: 'inactive',
                estatus: 'inactive',
              }}
            />
            <GeneralCard
              props={{
                title: 'Destruido',
                description: 'Un QR destruido no puede ser utilizado y su estado indica que ha sido anulado.',
                icon: 'destroied',
                estatus: 'destroied',
              }}
            />
          </div>
        </div>

        <div>
          <h1 className='pb-3 pt-6 text-xl font-semibold leading-loose'>Ultimos códigos</h1>
          <Suspense fallback={<TrOverviewLoading />}>
            <Historial data={qr} />
          </Suspense>
        </div>
      </TabsContent>
      <TabsContent value='categories'>
        <h1 className='pb-3 pt-6 text-xl font-semibold leading-loose'>Categoria</h1>
        <Suspense fallback={<div>Loading...</div>}>
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
