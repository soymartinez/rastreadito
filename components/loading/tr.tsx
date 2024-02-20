export default function TrLoading() {
  return (
    <tr className='bg-_white dark:bg-_dark'>
      <td className='px-3 py-2'>
        <div className='flex items-center justify-center'>
          <div className='m-auto h-6 w-6 animate-pulse rounded-full bg-_darkText/[15%] dark:bg-_darkText' />
        </div>
      </td>
      <td className='px-3 py-2'>
        <div className='h-6 w-40 animate-pulse rounded-md bg-_darkText/[15%] dark:bg-_darkText' />
      </td>
      <td className='px-3 py-2'>
        <div className='h-6 w-40 animate-pulse rounded-md bg-_darkText/[15%] dark:bg-_darkText' />
      </td>
      <td className='px-3 py-2'>
        <div className='h-6 w-48 animate-pulse rounded-md bg-_darkText/[15%] dark:bg-_darkText' />
      </td>
      <td className='px-3 py-2'>
        <div className='h-6 w-44 animate-pulse rounded-md bg-_darkText/[15%] dark:bg-_darkText' />
      </td>
      <td className='sticky right-0 z-20 border-l-4 border-_gray bg-inherit px-3 py-2 backdrop-blur-md dark:border-_darkText'>
        <div className='flex w-min animate-pulse items-center justify-center gap-1 rounded-full bg-_darkText/[15%] px-3 py-1 dark:bg-_darkText'>
          <div className='h-6 w-12 rounded-md' />
        </div>
      </td>
    </tr>
  )
}
