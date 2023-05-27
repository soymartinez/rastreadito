import Navbar from '@/components/navbar'
import { getCurrentUser } from '@/hooks/auth'

export default async function Loading() {
    const user = await getCurrentUser()
    return (
        <main>
            <Navbar />
            <div className='px-4 min-h-screen relative max-w-7xl mx-auto'>
                <h1 className='text-5xl font-bold leading-loose truncate'>{user?.user_metadata.name}</h1>
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
                </div>
            </div>
        </main>
    )
}
