import { Check, Tag, X } from 'lucide-react'

export const ActiveButton = () => (
  <div className='flex w-min items-center justify-center gap-1 rounded-full bg-primary/[15%] px-3 py-1 text-primary'>
    <Check size={18} /> Activo
  </div>
)

export const UseButton = () => (
  <div className='flex w-min items-center justify-center gap-1 rounded-full bg-[#00d0ff]/[15%] px-3 py-1 text-[#00d0ff]'>
    <Tag size={18} /> Uso
  </div>
)

export const DestroyButton = () => (
  <div className='flex w-min items-center justify-center gap-1 rounded-full bg-darkText/[15%] px-3 py-1 text-darkText dark:bg-darkText dark:text-white/70'>
    <X size={18} /> Destruído
  </div>
)