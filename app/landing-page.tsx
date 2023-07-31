import Link from 'next/link'
import LayoutBoundary from '@/components/layout'
import Navbar from '@/components/navbar'
import { Button } from '@/ui/button'

export default function LandingPage() {
    return (
        <>
            <Navbar isAuth={false} />
            <LayoutBoundary>
                <div className='flex justify-center items-center gap-2'>
                    <h1>Landing Page</h1>
                    <Link href={'/auth'}>
                        <Button variant={'ghost'} size='sm'>
                            Login
                        </Button>
                    </Link>
                </div>
            </LayoutBoundary>
        </>
    )
}
