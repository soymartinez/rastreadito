import TrLoading from './tr'

export default function TableLoading() {
  return (
    <table className='my-6 w-full table-auto border-separate border-spacing-0 text-xs'>
      <thead className='sticky top-0 z-30 uppercase text-_grayText'>
        <tr className='text-left'>
          <th className='px-3 py-2'>
            <div className='flex items-center justify-center'>
              <div className='m-auto h-6 w-6 animate-pulse rounded-full bg-_darkText/[15%] dark:bg-_darkText' />
            </div>
          </th>
          <th className='px-3 py-2 font-medium'>Factura</th>
          <th className='px-3 py-2 font-medium'>Producto</th>
          <th className='px-3 py-2 font-medium'>Cliente</th>
          <th className='px-3 py-2 font-medium'>Fecha</th>
          <th className='sticky right-0 border-l-4 border-_gray bg-_white px-3 py-2 font-medium dark:border-_darkText dark:bg-_dark'>Estado</th>
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
