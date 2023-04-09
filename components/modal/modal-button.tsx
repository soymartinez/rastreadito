'use client'

import { useCallback, useState } from 'react'
import { QrCode } from 'lucide-react'

import Modal from './modal'
import { Button } from '@/ui/button'

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
            <Button onClick={() => setModal(true)} className='w-16 fixed xl:absolute right-4 bottom-8'>
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
