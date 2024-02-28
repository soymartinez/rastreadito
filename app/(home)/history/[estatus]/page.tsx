import { prisma } from '@/lib/prisma'
import { QrProductType } from '@/types'
import { Back } from '@/components/ui/back'
import { Status } from '@prisma/client'
import { User } from '@supabase/supabase-js'
import { Suspense } from 'react'
import ContentLoader from 'react-content-loader'
import DataHistoryEstatus from './data'
import { createClient } from '@/utils/supabase/server'

const getStatusHistory = async (estatus: Status, user: User | null) => {
  const history = await prisma.qr.findMany({
    where: {
      estatus: estatus,
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
  const { user } = (await createClient().auth.getUser()).data
  const history = await getStatusHistory(params.estatus.toUpperCase() as Status, user) ?? []

  const title = () => {
    const estatus = params.estatus.toUpperCase() as Status
    if (estatus === Status.active) return 'Activos'
    if (estatus === Status.inactive) return 'En uso'
    if (estatus === Status.destroied) return 'Destruidos'
  }

  return (
    <div className='relative mx-auto min-h-screen max-w-7xl px-4'>
      <div className='relative flex items-center justify-center py-8'>
        <Back className='absolute left-0' />
        <h1 className='text-xl font-bold'>{title()}</h1>
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
      className='h-96 w-full dark:hidden'
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
      className='hidden h-96 w-full dark:block'
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
