import { useMediaQuery } from '@/hooks/use-media-query'
import React, { ReactNode } from 'react'
import { Dialog, DialogBody, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Drawer, DrawerBody, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '../ui/drawer'

interface Props {
  open: boolean
  setOpen: (value: boolean) => void
  minWidth?: number
  title: string | ReactNode
  description: string | ReactNode
  body: string | ReactNode
}

export default function DynamicModal({
  open,
  setOpen,
  minWidth = 640,
  title,
  description,
  body,
}: Props) {
  const isDesktop = useMediaQuery(`(min-width: ${minWidth}px)`)
  return (
    <>
      {/* DIALOG MAKE A TEAM */}
      {isDesktop && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>
                {description}
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              {body}
            </DialogBody>
            <DialogFooter>
              <Button
                onClick={() => setOpen(false)}
                variant='outline'
              >
                Cancelar
              </Button>
              <Button
                onClick={() => { }}
              >
                Continuar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* DRAWER MAKE A TEAM */}
      {!isDesktop && (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>{title}</DrawerTitle>
              <DrawerDescription>
                {description}
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              {body}
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button
                  onClick={() => setOpen(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  )
}
