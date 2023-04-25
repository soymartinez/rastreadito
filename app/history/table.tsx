'use client'

import Tr from '@/components/hover/tr'
import { QrProductType } from '@/types'

interface TableProps {
    data: QrProductType[]
}

export default function Table({ data }: TableProps) {
    return (
        <table className='table-auto text-xs w-full border-separate border-spacing-0 my-6'>
            <thead className='text-_grayText uppercase sticky top-0 z-30'>
                <tr className='text-left'>
                    <th className='pl-3 pr-1 py-2 flex justify-between'>
                        <div className='flex items-center justify'>
                            <input type='checkbox' name='select-all' id='select-all' className='w-4 h-4 m-auto accent-_primary rounded-full' />
                        </div>
                    </th>
                    <th className='px-3 py-2 font-medium'>Factura</th>
                    <th className='px-3 py-2 font-medium'>Producto</th>
                    <th className='px-3 py-2 font-medium'>Cliente</th>
                    <th className='px-3 py-2 font-medium'>Fecha</th>
                    <th className='px-3 py-2 font-medium sticky right-0 bg-_white dark:bg-_dark border-l-4 border-_gray dark:border-_darkText'>Estado</th>
                </tr>
            </thead>
            <tbody className='text-_grayText text-base overflow-hidden'>
                {data.map((data: QrProductType) => (
                    <Tr key={data.id} data={data} />
                ))}
            </tbody>
        </table>
    )
}
