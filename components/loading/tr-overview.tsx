import { Maximize2 } from 'lucide-react'

export default function TrOverviewLoading() {
  return (
    <div className='w-full overflow-auto'>
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
          {[...Array(6)].map((_, index) => (
            <tr
              key={index}
              className={'overflow-x-auto bg-_white dark:bg-_dark'}
            >
              <td className='px-3 py-1'>
                <div className='w-min'>
                  <div className='rounded-full bg-_gray p-2 dark:bg-_darkText'>
                    <Maximize2 size={14} className='text-_grayText dark:text-_dark' />
                  </div>
                </div>
              </td>
              <td className='px-3 py-1'>
                <div className='h-4 w-20 animate-pulse rounded-md bg-_gray dark:bg-_darkText' />
              </td>
              <td className='px-3 py-1'>
                <div className='h-4 w-24 animate-pulse rounded-md bg-_gray dark:bg-_darkText' />
              </td>
              <td className='px-3 py-1'>
                <div className='h-6 w-32 animate-pulse rounded-full bg-_gray dark:bg-_darkText' />
              </td>
              <td className='whitespace-nowrap px-3 py-1 font-semibold'>
                <div className='h-4 w-44 animate-pulse rounded-md bg-_gray dark:bg-_darkText' />
              </td>
              <td className='sticky right-0 z-20 border-l-4 border-_gray bg-inherit px-3 py-1 font-semibold backdrop-blur-md dark:border-_darkText'>
                <div className='h-7 w-[78px] animate-pulse rounded-full bg-_gray dark:bg-_darkText' />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}