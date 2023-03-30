'use client'

import { Back } from '@/ui/back'
import { Input } from '@/ui/input'
import { Textarea } from '@/ui/textarea'
import { Info, Save } from 'lucide-react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/ui/select'
import { Button } from '@/ui/button'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const productTypes = {
    flower: 'Flor de cannabis',
    tincture: 'Goteros de cannabis',
    ointment: 'Ungüento de cannabis',
    edible: 'Edibles de cannabis',
    cartridge: 'Carts de cannabis',
    oil: 'Aceite de cannabis',
}

export interface MetadataProps {
    name: string
    description: string
    type: typeof productTypes
    strain: string
    thc: string
    cbd: string
    flavor: string
    effect: string
}

export default function Metadata() {
    const [value, setValue] = useState<MetadataProps>()
    const { push } = useRouter()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const data = Object.fromEntries(formData.entries()) as object as MetadataProps

        setValue(data)
    }

    useEffect(() => {
        if (value) {
            push('/metadata/generate')
        }
    }, [value])
    return (
        <div className='px-4 min-h-screen relative max-w-7xl mx-auto'>
            <div className='flex justify-center items-center py-8 relative'>
                <Back className='absolute left-0' />
                <h1 className='font-bold text-xl'>Metadata</h1>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-7'>
                <div className='flex flex-col gap-4'>
                    <div className='flex justify-between'>
                        <h3 className='font-semibold'>Información</h3>
                        <Info />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Input name='name' labelText='Nombre' placeholder='Purple Kush' required />
                        <Textarea name='description' labelText='Descripción' placeholder='Purple Kush' required />
                        <Select name='type' required>
                            <SelectTrigger labelText='Tipo de producto'>
                                <SelectValue placeholder='Selecciona un tipo de producto' />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(productTypes).map(([key, value]) => (
                                    <SelectItem className='first:rounded-t-xl last:rounded-b-xl placeholder:text-_primary' key={key} value={key}>
                                        {value}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='flex justify-between'>
                        <h3 className='font-semibold'>Características</h3>
                        <Info />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Input name='strain' labelText='Cepa' placeholder='Purple Kush' required />
                        <Input name='thc' labelText='THC' placeholder='0.0' required variant='porcentage' />
                        <Input name='cbd' labelText='CBD' placeholder='0.0' required variant='porcentage' />
                        <Input name='flavor' labelText='Aroma' placeholder='Tierra, pino, dulce' required />
                        <Input name='effects' labelText='Efectos' placeholder='Relajante, calmante, eufórico' required />
                    </div>
                </div>
                <Button type='submit' className='w-16 fixed xl:absolute right-4 bottom-8'>
                    <Save />
                </Button>
            </form>
        </div>
    )
}
