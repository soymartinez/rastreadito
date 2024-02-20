import {
  Dialog,
  DialogClose,
  DialogContent,
} from '@/components/ui/dialog'

export default function ModalDialog({ children, onOpenChange }: { children: React.ReactNode, onOpenChange?: (open: boolean) => void }) {
  return (
    <Dialog
      defaultOpen
      onOpenChange={onOpenChange}
    >
      <DialogContent className='flex h-full flex-col overflow-hidden sm:h-[90%] sm:max-w-3xl'>
        <div className='sticky top-0 flex h-min justify-end'>
          <DialogClose />
        </div>
        {children}
      </DialogContent>
    </Dialog >
  )
}
