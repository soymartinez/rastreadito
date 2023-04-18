import { Check, Tag, X } from 'lucide-react'

export const ActiveButton = () => (
    <div className='bg-_primary/[15%] text-_primary flex items-center justify-center gap-1 w-min rounded-full px-3 py-1'>
        <Check size={18} /> Activo
    </div>
)

export const UseButton = () => (
    <div className='bg-[#00d0ff]/[15%] text-[#00d0ff] flex items-center justify-center gap-1 w-min rounded-full px-3 py-1'>
        <Tag size={18} /> Uso
    </div>
)

export const DestroyButton = () => (
    <div className='bg-_darkText/[15%] text-_darkText dark:bg-_darkText dark:text-_white/70 flex items-center justify-center gap-1 w-min rounded-full px-3 py-1'>
        <X size={18} /> Destruído
    </div>
)