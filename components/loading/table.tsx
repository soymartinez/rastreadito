import TrLoading from './tr'

export default function TableLoading() {
    return (
        <table className='table-auto text-xs w-full border-separate border-spacing-0 my-6'>
            <thead className='text-_grayText uppercase sticky top-0 z-30'>
                <tr className='text-left'>
                    <th className='px-3 py-2'>
                        <div className='flex items-center justify-center'>
                            <div className='w-6 h-6 m-auto bg-_darkText/[15%] dark:bg-_darkText animate-pulse rounded-full' />
                        </div>
                    </th>
                    <th className='px-3 py-2 font-medium'>Factura</th>
                    <th className='px-3 py-2 font-medium'>Producto</th>
                    <th className='px-3 py-2 font-medium'>Cliente</th>
                    <th className='px-3 py-2 font-medium'>Fecha</th>
                    <th className='px-3 py-2 font-medium sticky right-0 bg-_white dark:bg-_dark border-l-4 border-_gray dark:border-_darkText'>Estado</th>
                </tr>
            </thead>
            <tbody className='overflow-hidden'>
                <TrLoading />
                <TrLoading />
                <TrLoading />
                <TrLoading />
                <TrLoading />
                <TrLoading />
            </tbody>
        </table>
    )
}
