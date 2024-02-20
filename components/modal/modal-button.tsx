'use client'

import { useCallback, useState } from 'react'
import { QrCode } from 'lucide-react'

import Modal from './modal'
import { Button } from '@/components/ui/button'

interface ModalButtonProps {
    children: React.ReactNode
    icon: 'QrCode'
}

export default function ModalButton({
  children,
  icon,
}: ModalButtonProps) {
  const [modal, setModal] = useState(false)

  const onClose = useCallback(() => {
    setModal(false)
  }, [])

  return (
    <>
      <Button onClick={() => setModal(true)} className='fixed bottom-8 right-4 w-16 xl:absolute'>
        {icon === 'QrCode' && <QrCode />}
      </Button>
      {modal && (
        <Modal onClose={onClose}>
          {children}
        </Modal>
      )}
    </>
  )
}
