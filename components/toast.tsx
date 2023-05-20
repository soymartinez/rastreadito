'use client'

import { Toaster } from 'sonner'

export default function Toast() {
    return (
        <Toaster
            toastOptions={{
                style: {
                    background: '#00e99e',
                    borderRadius: '1rem',
                    border: 'none',
                    fontWeight: 600,
                },
            }}
            position='top-right'
            closeButton
        />
    )
}
