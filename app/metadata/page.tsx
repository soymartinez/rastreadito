'use client'

import { useEffect, useState } from 'react'
import { Categoria } from '@prisma/client'

import { Back } from '@/ui/back'
import FormMetadata from '@/components/form-metadata'

export default function Metadata() {
    const [categorias, setCategorias] = useState<Categoria[]>([])

    const getCategorias = async () => {
        const res = await fetch('/api/categorias')
        const data = await res.json()
        return data
    }

    useEffect(() => {
        getCategorias().then(setCategorias)
    }, [])

    return (
        <div className='px-4 min-h-screen relative max-w-7xl mx-auto'>
            <div className='flex justify-center items-center py-8 relative'>
                <Back className='absolute left-0' />
                <h1 className='font-bold text-xl'>Metadata</h1>
            </div>
            <FormMetadata
                categorias={categorias}
            />
        </div>
    )
}
