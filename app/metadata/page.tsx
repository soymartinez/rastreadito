import { Back } from '@/ui/back'
import { Input } from '@/ui/input'
import { Textarea } from '@/ui/textarea'
import { Info } from 'lucide-react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/ui/select'


export default function Metadata() {
    return (
        <div className='px-4 min-h-screen relative'>
            <div className='flex justify-center items-center py-8 relative'>
                <Back className='absolute left-0' />
                <h1 className='font-bold text-xl'>Metadata</h1>
            </div>
            <section className='flex flex-col gap-4'>
                <div className='flex justify-between'>
                    <h3 className='font-semibold'>Información</h3>
                    <Info />
                </div>
                <div className='flex flex-col gap-3'>
                    <Input labelText='Nombre' placeholder='Purple Kush' required />
                    <Textarea labelText='Descripción' placeholder='Purple Kush' required />
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder='Theme' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='light'>Light</SelectItem>
                            <SelectItem value='dark'>Dark</SelectItem>
                            <SelectItem value='system'>System</SelectItem>
                        </SelectContent>
                    </Select>

                </div>
            </section>
        </div>
    )
}
