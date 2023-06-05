'use client'

import { PackageOpen } from 'lucide-react'
import { QrProductType } from '@/types'
import TrOverview from '../tr-overview'
import { useRouter } from 'next/navigation'

export default function HistoryCard({ data }: { data: any }) {
    const { push } = useRouter()
    return (
        <>
            <div className='overflow-auto w-full scrollbar-thin'>
                <table className='table-auto text-xs w-full border-separate border-spacing-0'>
                    <thead className='text-_grayText/50 uppercase sticky top-0 z-30'>
                        <tr className='text-left'>
                            <th className='px-3 py-2 font-medium flex justify-center'></th>
                            <th className='px-3 py-2 font-medium'>Factura</th>
                            <th className='px-3 py-2 font-medium'>Nombre</th>
                            <th className='px-3 py-2 font-medium'>Codigo</th>
                            <th className='px-3 py-2 font-medium'>Fecha</th>
                            <th className='px-3 py-2 font-medium sticky right-0 bg-_white dark:bg-_dark border-l-4 border-_gray dark:border-_darkText'>Estado</th>
                        </tr>
                    </thead>
                    <tbody className='text-_grayText text-base overflow-hidden'>
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
                className='p-2 flex justify-center items-center gap-2 text-_grayText hover:bg-_gray/80 dark:hover:bg-_darkText/50 dark:text-_primary border-t-4 border-_gray dark:border-_darkText cursor-pointer'
                onClick={() => push('/history')}
            >
                <span className='text-xs font-semibold'>Ver mas</span>
                <span className='text-lg'><PackageOpen /></span>
            </div>
        </>
    )
}