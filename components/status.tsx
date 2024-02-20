import { Check, Tag, X } from 'lucide-react'

export const ActiveButton = () => (
  <div className='flex w-min items-center justify-center gap-1 rounded-full bg-_primary/[15%] px-3 py-1 text-_primary'>
    <Check size={18} /> Activo
  </div>
)

export const UseButton = () => (
  <div className='flex w-min items-center justify-center gap-1 rounded-full bg-[#00d0ff]/[15%] px-3 py-1 text-[#00d0ff]'>
    <Tag size={18} /> Uso
  </div>
)

export const DestroyButton = () => (
  <div className='flex w-min items-center justify-center gap-1 rounded-full bg-_darkText/[15%] px-3 py-1 text-_darkText dark:bg-_darkText dark:text-_white/70'>
    <X size={18} /> Destruído
  </div>
)