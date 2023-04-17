'use client'

import {
    Dialog,
    DialogClose,
    DialogContent,
} from '@/ui/dialog'
import { Maximize2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ModalPageProps {
    children: React.ReactNode
}

export default function ModalPage({ children }: ModalPageProps) {
    const { back } = useRouter()
    return (
        <Dialog
            defaultOpen
            onOpenChange={(open) => open ? null : back()}
        >
            <DialogContent className='sm:max-w-3xl sm:h-[600px] overflow-hidden flex flex-col justify-between'>
                <div className='flex justify-between sticky top-0 h-min'>
                    <button
                        onClick={() => window.location.reload()}
                        className='
                            w-min
                            transition
                            dark:bg-_dark
                            bg-_primary
                            hover:bg-_primary/80
                            dark:hover:bg-_primary/30
                            dark:bg-_primary/[15%]
                            p-2
                            rounded-full
                        '
                    >
                        <Maximize2 className='h-4 w-4 dark:text-_primary' />
                    </button>
                    <DialogClose />
                </div>
                <div className='h-full overflow-auto'>
                    {children}
                </div>
            </DialogContent>
        </Dialog >
    )
}
