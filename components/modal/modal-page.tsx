'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
} from '@/components/ui/dialog'
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
      <DialogContent className='flex h-full flex-col overflow-hidden sm:h-[90%] sm:max-w-3xl'>
        <div className='sticky top-0 flex h-min justify-between'>
          <button
            onClick={() => window.location.reload()}
            className='
              w-min
              rounded-full
              bg-_primary
              p-2
              transition
              hover:bg-_primary/80
              dark:bg-_primary/15
              dark:hover:bg-_primary/30
            '
          >
            <Maximize2 className='h-4 w-4 dark:text-_primary' />
          </button>
          <DialogClose />
        </div>
        {children}
      </DialogContent>
    </Dialog >
  )
}
