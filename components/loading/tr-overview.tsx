import { Maximize2 } from 'lucide-react'

export default function TrOverviewLoading() {
    return (
        <div className='overflow-auto w-full'>
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
                    {[...Array(6)].map((_, index) => (
                        <tr
                            key={index}
                            className={'bg-_white dark:bg-_dark overflow-x-auto'}
                        >
                            <td className='px-3 py-1'>
                                <div className='w-min'>
                                    <div className='bg-_gray dark:bg-_darkText p-2 rounded-full'>
                                        <Maximize2 size={14} className='text-_dark dark:text-_dark' />
                                    </div>
                                </div>
                            </td>
                            <td className='px-3 py-1'>
                                <div className='w-20 h-4 dark:bg-_darkText rounded-md animate-pulse' />
                            </td>
                            <td className='px-3 py-1'>
                                <div className='w-24 h-4 dark:bg-_darkText rounded-md animate-pulse' />
                            </td>
                            <td className='px-3 py-1'>
                                <div className='w-32 h-6 dark:bg-_darkText rounded-full animate-pulse' />
                            </td>
                            <td className='px-3 py-1 font-semibold whitespace-nowrap'>
                                <div className='w-44 h-4 dark:bg-_darkText rounded-md animate-pulse' />
                            </td>
                            <td className='px-3 py-1 font-semibold sticky right-0 z-20 bg-inherit backdrop-blur-md border-l-4 border-_gray dark:border-_darkText'>
                                <div className='w-[78px] h-7 dark:bg-_darkText rounded-full animate-pulse' />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}