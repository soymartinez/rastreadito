export default function TrLoading() {
  return (
    <tr className='bg-white dark:bg-dark'>
      <td className='px-3 py-2'>
        <div className='flex items-center justify-center'>
          <div className='m-auto size-6 animate-pulse rounded-full bg-darkText/[15%] dark:bg-darkText' />
        </div>
      </td>
      <td className='px-3 py-2'>
        <div className='h-6 w-40 animate-pulse rounded-md bg-darkText/[15%] dark:bg-darkText' />
      </td>
      <td className='px-3 py-2'>
        <div className='h-6 w-40 animate-pulse rounded-md bg-darkText/[15%] dark:bg-darkText' />
      </td>
      <td className='px-3 py-2'>
        <div className='h-6 w-48 animate-pulse rounded-md bg-darkText/[15%] dark:bg-darkText' />
      </td>
      <td className='px-3 py-2'>
        <div className='h-6 w-44 animate-pulse rounded-md bg-darkText/[15%] dark:bg-darkText' />
      </td>
      <td className='bg-inherit sticky right-0 z-20 border-l-4 border-gray px-3 py-2 backdrop-blur-md dark:border-darkText'>
        <div className='flex w-min animate-pulse items-center justify-center gap-1 rounded-full bg-darkText/[15%] px-3 py-1 dark:bg-darkText'>
          <div className='h-6 w-12 rounded-md' />
        </div>
      </td>
    </tr>
  )
}
