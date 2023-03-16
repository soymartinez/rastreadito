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
import { useRouter } from 'next/navigation'

const productTypes = {
    flower: 'Flor de cannabis',
    tincture: 'Goteros de cannabis',
    topical: 'Ungüento de cannabis',
    edible: 'Edibles de cannabis',
    cartridge: 'Carts de cannabis',
    oil: 'Aceite de cannabis',
}

export default function Metadata() {
    const { push } = useRouter()
    return (
        <div className='px-4 min-h-screen relative'>
            <div className='flex justify-center items-center py-8 relative'>
                <Back className='absolute left-0' />
                <h1 className='font-bold text-xl'>Metadata</h1>
            </div>
            <form className='flex flex-col gap-7'>
                <div className='flex flex-col gap-4'>
                    <div className='flex justify-between'>
                        <h3 className='font-semibold'>Información</h3>
                        <Info />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Input labelText='Nombre' placeholder='Purple Kush' required />
                        <Textarea labelText='Descripción' placeholder='Purple Kush' required />
                        <Select required>
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
                        <Input labelText='Cepa' placeholder='Purple Kush' required />
                        <Input labelText='THC' placeholder='0.0' required variant='porcentage' />
                        <Input labelText='CBD' placeholder='0.0' required variant='porcentage' />
                        <Input labelText='Aroma' placeholder='Tierra, pino, dulce' required />
                        <Input labelText='Efectos' placeholder='Relajante, calmante, eufórico' required />
                    </div>
                </div>
                <Button onClick={() => push('/metadata/generate')} className='w-16 fixed right-4 bottom-8'>
                    <Save />
                </Button>
            </form>
        </div>
    )
}
