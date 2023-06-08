import { useSupabaseServer } from '@/hooks/auth'
import { prisma } from '@/lib/prisma'
import { QrProductType } from '@/types'
import { Back } from '@/ui/back'
import { Estatus } from '@prisma/client'
import { User } from '@supabase/supabase-js'
import { Suspense } from 'react'
import ContentLoader from 'react-content-loader'
import DataHistoryEstatus from './data'

const getStatusHistory = async (estatus: Estatus, user: User | null) => {
  const history = await prisma.qr.findMany({
    where: {
      estatus,
      producto: {
        usuario: user?.email
      }
    },
    include: {
      producto: true,
    }
  })

  return history
}

export default async function HistoryStatus({ params }: { params: { estatus: string } }) {
  const { user } = await useSupabaseServer()
  const history = getStatusHistory(params.estatus.toUpperCase() as Estatus, user)

  const title = () => {
    const estatus = params.estatus.toUpperCase() as Estatus
    if (estatus === Estatus.ACTIVO) return 'Activos'
    if (estatus === Estatus.USADO) return 'En uso'
    if (estatus === Estatus.DESTRUIDO) return 'Destruidos'
  }

  return (
    <div className='px-4 min-h-screen relative max-w-7xl mx-auto'>
      <div className='flex justify-center items-center py-8 relative'>
        <Back pushRoute='/' className='absolute left-0' />
        <h1 className='font-bold text-xl'>{title()}</h1>
      </div>
      <div className='py-10'>
        <Suspense fallback={<FadingLoader />}>
          {/* @ts-expect-error Async Server Component */}
          <History history={history} />
        </Suspense>
      </div>
    </div>
  )
}

async function History({ history }: { history: Promise<QrProductType[]> }) {
  const data = await history
  return (
    <DataHistoryEstatus data={data} />
  )
}

const FadingLoader = () => (
  <>
    <ContentLoader
      className='w-full h-96 dark:hidden'
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'
    >
      <rect x='0' y='0' rx='5' ry='5' className='w-full' height='52' />

      <rect x='0' y='76' rx='5' ry='5' width='64' height='64' />
      <rect x='70' y='84' rx='5' ry='5' width='200' height='16' />
      <rect x='70' y='104' rx='5' ry='5' width='100%' height='26' />

      <rect x='0' y='156' rx='5' ry='5' width='64' height='64' />
      <rect x='70' y='164' rx='5' ry='5' width='180' height='16' />
      <rect x='70' y='184' rx='5' ry='5' width='80%' height='26' />

      <rect x='0' y='236' rx='5' ry='5' width='64' height='64' />
      <rect x='70' y='244' rx='5' ry='5' width='210' height='16' />
      <rect x='70' y='264' rx='5' ry='5' width='70%' height='26' />
    </ContentLoader>
    <ContentLoader
      className='w-full h-96 hidden dark:block'
      backgroundColor='#262626'
      foregroundColor='#212121'
    >
      <rect x='0' y='0' rx='5' ry='5' className='w-full' height='52' />

      <rect x='0' y='76' rx='5' ry='5' width='64' height='64' />
      <rect x='70' y='84' rx='5' ry='5' width='200' height='16' />
      <rect x='70' y='104' rx='5' ry='5' width='100%' height='26' />

      <rect x='0' y='156' rx='5' ry='5' width='64' height='64' />
      <rect x='70' y='164' rx='5' ry='5' width='180' height='16' />
      <rect x='70' y='184' rx='5' ry='5' width='80%' height='26' />

      <rect x='0' y='236' rx='5' ry='5' width='64' height='64' />
      <rect x='70' y='244' rx='5' ry='5' width='210' height='16' />
      <rect x='70' y='264' rx='5' ry='5' width='70%' height='26' />
    </ContentLoader>
  </>
)
