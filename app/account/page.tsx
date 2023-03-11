import { Back } from '@/ui/back'
import { Button } from '@/ui/button'
import { Sun, Moon, Laptop, LogOut, Save } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/ui/dropdown-menu'


export default function Account() {
    return (
        <div className='px-4 min-h-screen relative'>
            <div className='flex justify-center items-center py-8 relative'>
                <Back className='absolute left-0' />
                <h1 className='font-bold text-xl'>Perfil</h1>
            </div>
            <h1 className='text-5xl font-bold leading-loose'>BeeHealthy</h1>
            <div className='flex flex-col gap-4 font-semibold text-lg mt-4'>
                <span>Organización</span>
                <div className='flex justify-between'>
                    <span>Posición</span>
                    <span className='text-_darkText'>Usuario</span>
                </div>
                <div className='h-px rounded-full bg-_grayTextDisabled' />
                <div className='flex justify-between'>
                    <span>Tema</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='text-_darkText focus:outline-none'>Sistema</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem className='flex gap-3'><Sun size={18} /> Claro</DropdownMenuItem>
                            <DropdownMenuItem className='flex gap-3'><Moon size={18} /> Oscuro</DropdownMenuItem>
                            <DropdownMenuItem className='flex gap-3'><Laptop size={18} /> Sistema</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className='h-px rounded-full bg-_grayTextDisabled' />
                <button className='flex items-center gap-3 self-end hover:text-_darkText/80'>
                    <LogOut size={20} /> <span className='text-lg'>Cerrar sesión</span>
                </button>
            </div>
            <Button className='w-16 fixed right-4 bottom-8'>
                <Save />
            </Button>
        </div>
    )
}
