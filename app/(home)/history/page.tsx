import { Back } from '@/components/ui/back'
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs'
import { prisma } from '@/lib/prisma'
import Table from './table'
import TabTrigger from '@/components/tab-trigger'
import { Categoria } from '@prisma/client'
import Empty from '@/components/empty'
import { QrProductType } from '@/types'
import { Suspense } from 'react'
import ContentLoader from 'react-content-loader'
import { createClient } from '@/utils/supabase/server'

async function getHistorial(usuario: string) {
  const res = await prisma.qr.findMany({
    where: { producto: { usuario } },
    include: { producto: true },
    orderBy: { fechaRegistro: 'desc' },
  })

  if (!res) throw new Error('No se pudo obtener el historial.')

  return res
}

async function getCategorias() {
  const res = await prisma.categoria.findMany({
    orderBy: { id: 'asc' },
  })

  if (!res) throw new Error('No se pudo obtener las categorias.')

  return res
}

export default async function History() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  const historial = getHistorial(data.user?.email || '')
  const categorias = getCategorias()
  return (
    <div>
      <div className='relative flex items-center justify-center py-8'>
        <Back pushRoute='/' className='absolute left-0' />
        <h1 className='text-xl font-bold'>Historial</h1>
      </div>
      <h1 className='truncate text-5xl font-bold leading-loose'>{data.user?.user_metadata.name}</h1>
      <Tabs defaultValue='Ver todo'>
        <Suspense fallback={<Loading />}>
          {/* @ts-expect-error Async Server Component */}
          <DataTable categoriasData={categorias} historialData={historial} />
        </Suspense>
      </Tabs>
    </div>
  )
}

async function DataTable({ categoriasData, historialData }: { categoriasData: Promise<Categoria[]>, historialData: Promise<QrProductType[]> }) {
  const categorias = await categoriasData
  const historial = await historialData
  return (
    <>
      <TabsList className='overflow-x-auto py-2 scrollbar-thin'>
        <div className='flex w-min gap-2'>
          <TabTrigger value='Ver todo' label='Ver todo' />
          {categorias.map((categoria: Categoria) => (
            <TabTrigger
              className='capitalize'
              value={categoria.acronimo}
              label={categoria.acronimo.toLowerCase()}
              key={categoria.id}
            />
          ))}
        </div>
      </TabsList>

      <TabsContent value='Ver todo' className='w-full overflow-auto scrollbar-thin'>
        {historial.length > 0
          ? <Table data={historial} />
          : <Empty title='Aún no tienes productos registrados.' description='Registra tu primer producto.' />}
      </TabsContent>

      {categorias.map((categoria: Categoria) => (
        <TabsContent className='w-full overflow-auto scrollbar-thin' value={categoria.acronimo} key={categoria.id}>
          {historial.filter((qr) => qr.producto.categoria === categoria.acronimo).length > 0
            ? <Table data={historial.filter((qr) => qr.producto.categoria === categoria.acronimo)} />
            : <Empty title={`Aún no tienes ${categoria.nombre.toLocaleLowerCase()} registrados.`}
              description={`Registra tu primer ${categoria.acronimo.toLowerCase()}.`} />}
        </TabsContent>
      ))}
    </>
  )
}

function Loading() {
  return (
    <>
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
      <div className='mb-6 mt-9'>
        <ContentLoader
          width={130}
          height={24}
          className='px-3 dark:hidden'
          backgroundColor='#f3f3f3'
          foregroundColor='#ecebeb'
        >
          <rect x='0' y='0' rx='5' ry='5' width='18' height='24' />
          <rect x='22' y='0' rx='5' ry='5' width='80' height='24' />
        </ContentLoader>
        <ContentLoader
          width={130}
          height={24}
          className='hidden px-3 dark:block'
          backgroundColor='#262626'
          foregroundColor='#212121'
        >
          <rect x='0' y='0' rx='5' ry='5' width='18' height='24' />
          <rect x='22' y='0' rx='5' ry='5' width='80' height='24' />
        </ContentLoader>
      </div>

      <table className='my-6 w-full table-auto border-separate border-spacing-0 text-xs'>
        <thead className='sticky top-0 z-30 uppercase text-_grayText'>
          <tr className='text-left'>
            <th className='px-3 py-2'>
              <div className='size-4 animate-pulse rounded-sm bg-_darkText/[15%] dark:bg-_darkText' />
            </th>
            <th className='px-3 py-2 font-medium'>Factura</th>
            <th className='px-3 py-2 font-medium'>Producto</th>
            <th className='px-3 py-2 font-medium'>Cliente</th>
            <th className='px-3 py-2 font-medium'>Fecha</th>
            <th className='sticky right-0 border-l-4 border-_gray bg-_white px-3 py-2 font-medium dark:border-_darkText dark:bg-_dark'>Estado</th>
          </tr>
        </thead>
        <tbody className='overflow-hidden text-base text-_grayText'>
          {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i} className='bg-_white dark:bg-_dark'>
              <td className='w-24 px-3 py-2'>
                <div className='size-4 animate-pulse rounded-sm bg-_darkText/[15%] dark:bg-_darkText' />
              </td>
              <td className='px-3 py-2'>
                <CardLoading />
              </td>
              <td className='px-3 py-2'>
                <CardLoading />
              </td>
              <td className='px-3 py-2'>
                <CardLoading />
              </td>
              <td className='px-3 py-2'>
                <CardLoading />
              </td>
              <td className='sticky right-0 z-20 border-l-4 border-_gray bg-inherit px-3 py-2 backdrop-blur-md dark:border-_darkText'>
                <div className='flex w-min animate-pulse items-center justify-center gap-1 rounded-full bg-_darkText/[15%] px-3 py-1 dark:bg-_darkText'>
                  <div className='h-6 w-12 rounded-md' />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

function CardLoading() {
  return (
    <>
      <ContentLoader
        width={200}
        height={24}
        className='px-3 dark:hidden'
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
      >
        <rect x='0' y='0' rx='5' ry='5' width='200' height='24' />
      </ContentLoader>
      <ContentLoader
        width={200}
        height={24}
        className='hidden px-3 dark:block'
        backgroundColor='#262626'
        foregroundColor='#212121'
      >
        <rect x='0' y='0' rx='5' ry='5' width='200' height='24' />
      </ContentLoader>
    </>
  )
}
