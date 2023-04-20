export default function TrLoading() {
    return (
        <tr className='bg-_white dark:bg-_dark'>
            <td className='px-3 py-2'>
                <div className='flex items-center justify-center'>
                    <div className='w-6 h-6 m-auto bg-_darkText/[15%] dark:bg-_darkText animate-pulse rounded-full' />
                </div>
            </td>
            <td className='px-3 py-2'>
                <div className='w-40 h-6 bg-_darkText/[15%] dark:bg-_darkText animate-pulse rounded-md' />
            </td>
            <td className='px-3 py-2'>
                <div className='w-40 h-6 bg-_darkText/[15%] dark:bg-_darkText animate-pulse rounded-md' />
            </td>
            <td className='px-3 py-2'>
                <div className='w-48 h-6 bg-_darkText/[15%] dark:bg-_darkText animate-pulse rounded-md' />
            </td>
            <td className='px-3 py-2'>
                <div className='w-44 h-6 bg-_darkText/[15%] dark:bg-_darkText animate-pulse rounded-md' />
            </td>
            <td className='px-3 py-2 sticky right-0 z-20 bg-inherit backdrop-blur-md border-l-4 border-_gray dark:border-_darkText'>
                <div className='bg-_darkText/[15%] dark:bg-_darkText animate-pulse flex items-center justify-center gap-1 w-min rounded-full px-3 py-1'>
                    <div className='w-12 h-6 rounded-md' />
                </div>
            </td>
        </tr>
    )
}
