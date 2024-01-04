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
      <DialogContent className='sm:max-w-3xl h-full sm:h-[90%] overflow-hidden flex flex-col'>
        <div className='flex justify-end sticky top-0 h-min'>
          <DialogClose />
        </div>
        {children}
      </DialogContent>
    </Dialog >
  )
}
