import { prisma } from '@/lib/prisma'
import { createClient } from '@/utils/supabase/server'
import { Status } from '@prisma/client'
import {
  Package,
  PackageOpen,
  QrCode
} from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import ContentLoader from 'react-content-loader'

async function getQrCount(estatus: Status, user: string) {
  const res = await prisma.qr.count({
    where: {
      estatus,
      producto: {
        usuario: user,
      }
    }
  })

  return res
}

export default async function GeneralCard({ props }: {
  props: {
    title: string
    description: string
    icon: Status,
    estatus: Status,
  },
}) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  const count = getQrCount(props.estatus, data.user?.email!)
  return (
    <Link href={`/history/${props.estatus.toLowerCase()}`}>
      <div className={'grid cursor-pointer grid-flow-col items-center gap-4 rounded-2xl bg-dark p-4 transition-all hover:bg-dark/95 sm:flex dark:bg-darkText dark:hover:bg-darkText/80'}>
        <span>
          {props.icon === 'active' && <QrCode size={56} className='text-primary' />}
          {props.icon === 'inactive' && <Package size={56} className='text-primary' />}
          {props.icon === 'destroied' && <PackageOpen size={56} className='text-primary' />}
        </span>
        <div className={'w-full'}>
          <h1 className='text-xl font-semibold text-white'>{props.title}</h1>
          <p className='text-xs font-medium text-grayText'>
            {props.description}
          </p>
        </div>
        <div>
          <Suspense fallback={<FadingLoader />}>
            <Count promise={count} />
          </Suspense>
        </div>
      </div>
    </Link>
  )
}

export async function Count({ promise }: { promise: Promise<number> }) {
  const count = await promise
  return <h1 className={'text-5xl font-semibold text-white'}>{count}</h1>
}

const FadingLoader = () => (
  <>
    <ContentLoader
      width={48}
      height={48}
      className='dark:hidden'
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'
    >
      <rect x='0' y='0' rx='5' ry='5' width='48' height='48' />
    </ContentLoader>
    <ContentLoader
      width={48}
      height={48}
      className='hidden dark:block'
      backgroundColor='#262626'
      foregroundColor='#212121'
    >
      <rect x='0' y='0' rx='5' ry='5' width='48' height='48' />
    </ContentLoader>
  </>
)