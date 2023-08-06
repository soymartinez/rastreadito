'use client'

import { useEffect, useState } from 'react'

import { Back } from '@/ui/back'
import FormMetadata from '@/components/form-metadata'
import { CategoriaGaleriaType } from '@/types'

export default function Metadata() {
    const [categorias, setCategorias] = useState<CategoriaGaleriaType[]>([])

    const getCategorias = async () => {
        const res = await fetch('/api/categorias')
        const data = await res.json()
        return data
    }

    useEffect(() => {
        getCategorias().then(setCategorias)
    }, [])

    return (
        <>
            <div className='flex justify-center items-center py-8 relative'>
                <Back pushRoute='/' className='absolute left-0' />
                <h1 className='font-bold text-xl'>Metadata</h1>
            </div>
            <FormMetadata
                className='my-8'
                categorias={categorias}
            />
        </>
    )
}
