'use client'

import { PackageOpen } from 'lucide-react'
import { QrProductType } from '@/types'
import TrOverview from '../tr-overview'
import { useRouter } from 'next/navigation'

export default function HistoryCard({ data }: { data: any }) {
  const { push } = useRouter()
  return (
    <>
      <div className='w-full overflow-auto scrollbar-thin'>
        <table className='w-full table-auto border-separate border-spacing-0 text-xs'>
          <thead className='sticky top-0 z-30 uppercase text-_grayText/50'>
            <tr className='text-left'>
              <th className='flex justify-center px-3 py-2 font-medium'></th>
              <th className='px-3 py-2 font-medium'>Factura</th>
              <th className='px-3 py-2 font-medium'>Nombre</th>
              <th className='px-3 py-2 font-medium'>Codigo</th>
              <th className='px-3 py-2 font-medium'>Fecha</th>
              <th className='sticky right-0 border-l-4 border-_gray bg-_white px-3 py-2 font-medium dark:border-_darkText dark:bg-_dark'>Estado</th>
            </tr>
          </thead>
          <tbody className='overflow-hidden text-base text-_grayText'>
            {data && data.map((data: QrProductType, index: number) => {
              if (index < 6) {
                return (
                  <TrOverview key={data.id} data={data} />
                )
              }
            })}
          </tbody>
        </table>
      </div>
      <div
        className='flex cursor-pointer items-center justify-center gap-2 border-t-4 border-_gray p-2 text-_grayText hover:bg-_gray/80 dark:border-_darkText dark:text-_primary dark:hover:bg-_darkText/50'
        onClick={() => push('/history')}
      >
        <span className='text-xs font-semibold'>Ver mas</span>
        <span className='text-lg'><PackageOpen /></span>
      </div>
    </>
  )
}