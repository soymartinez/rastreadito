import { Back } from '@/ui/back'
import TableLoading from '@/components/loading/table'
import { getCurrentUser } from '@/hooks/auth'

export default async function loading() {
    const usuario = await getCurrentUser()
    return (
        <main className='px-4 relative max-w-7xl mx-auto'>
            <div className='flex justify-center items-center py-8 relative'>
                <Back className='absolute left-0' />
                <h1 className='font-bold text-xl'>Historial</h1>
            </div>
            <h1 className='text-5xl font-bold leading-loose truncate'>{usuario?.user_metadata.name}</h1>
            <div className='flex gap-2 w-min py-2'>
                <div className={`
                        w-28 h-12
                        flex justify-center items-center transition-all
                        border-2 border-_dark dark:border-_primary 
                        rounded-full animate-pulse
                    `}
                />
                <div className={`
                        w-28 h-12
                        flex justify-center items-center transition-all
                        border-2 border-_gray dark:border-_darkText 
                        rounded-full animate-pulse
                    `}
                />
                <div className={`
                        w-28 h-12
                        flex justify-center items-center transition-all
                        border-2 border-_gray dark:border-_darkText 
                        rounded-full animate-pulse
                    `}
                />
                <div className={`
                        w-28 h-12
                        flex justify-center items-center transition-all
                        border-2 border-_gray dark:border-_darkText 
                        rounded-full animate-pulse
                    `}
                />
            </div>
            <TableLoading />
        </main>
    )
}
