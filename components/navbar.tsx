import Link from 'next/link'
import { Scan } from 'lucide-react'

export default function Navbar() {
    return (
        <nav className='sticky top-0 z-50 bg-white dark:bg-_dark/60 backdrop-blur-[8px]'>
            <div className='flex justify-between items-center py-6 relative px-4 max-w-7xl mx-auto'>
                <h1 className='font-black text-2xl uppercase italic'>rastreadito</h1>
                <div className='flex gap-2'>
                    <Link href={'/scan'} className='rounded-full'>
                        <div className='w-11 h-11 border-2 border-_gray dark:border-_darkText rounded-full flex items-center justify-center'>
                            <Scan />
                        </div>
                    </Link>
                    <Link href={'/account'} className='rounded-full'>
                        <div className='w-11 h-11 border-2 border-_gray dark:border-_darkText bg-_primary rounded-full' />
                    </Link>
                </div>
            </div>
        </nav>
    )
}
