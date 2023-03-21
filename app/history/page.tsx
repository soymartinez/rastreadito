import { Back } from '@/ui/back'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import { Check, X } from 'lucide-react'

export default function History() {
    return (
        <div className='px-4 min-h-screen relative'>
            <div className='flex justify-center items-center py-8 relative'>
                <Back className='absolute left-0' />
                <h1 className='font-bold text-xl'>Historial</h1>
            </div>
            <h1 className='text-5xl font-bold leading-loose truncate'>BeeHealthy</h1>
            <div className='flex flex-col gap-4 font-semibold text-lg py-4'>
                <Tabs defaultValue='all' className='w-full'>
                    <TabsList className='w-fulll p-0 bg-inherit shadow-none'>
                        <TabsTrigger
                            value='all'
                            className='w-full whitespace-nowrap data-[state=active]:shadow-none data-[state=active]:border-_dark border-b-2 border-transparent rounded-none'
                        >
                            Ver todo
                        </TabsTrigger>
                        <TabsTrigger
                            value='date'
                            className='w-full whitespace-nowrap data-[state=active]:shadow-none data-[state=active]:border-_dark border-b-2 border-transparent rounded-none'
                        >
                            Fecha
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value='all' className='overflow-auto w-full'>
                        <table className='table-auto text-xs w-full border-separate border-spacing-0 mt-6'>
                            <thead className='text-_grayText uppercase sticky top-0 z-30'>
                                <tr className='text-left'>
                                    <th className='px-3 py-2 font-medium'>
                                        <input type='checkbox' name='select-all' id='select-all' className='w-4 h-4 m-auto accent-_primary rounded-full' />
                                    </th>
                                    <th className='px-3 py-2 font-medium'>Factura</th>
                                    <th className='px-3 py-2 font-medium'>Cliente</th>
                                    <th className='px-3 py-2 font-medium'>Fecha</th>
                                    <th className='px-3 py-2 font-medium sticky right-0 bg-_white border-l-4 border-_gray'>Estado</th>
                                </tr>
                            </thead>
                            <tbody className='text-_grayText text-base overflow-hidden'>
                                <tr className='bg-_white hover:bg-_gray/50 overflow-x-auto'>
                                    <td className='px-3 py-2'>
                                        <input type='checkbox' name='data-1' id='data-1' className='w-4 h-4 m-auto accent-_primary rounded-full' />
                                    </td>
                                    <td className='px-3 py-2 font-semibold whitespace-nowrap text-_dark uppercase'>#cart 86 </td>
                                    <td className='px-3 py-2 font-semibold whitespace-nowrap'>Bee</td>
                                    <td className='px-3 py-2 font-semibold'>12/12/2021</td>
                                    <td className='px-3 py-2 font-semibold sticky right-0 z-20 bg-inherit backdrop-blur-md border-l-4 border-_gray'>
                                        <div className='bg-_primary/[15%] text-_primary flex items-center justify-center gap-1 w-min rounded-full px-3 py-1'>
                                            <Check size={18} /> Activo
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-_white hover:bg-_gray/50'>
                                    <td className='px-3 py-2'>
                                        <input type='checkbox' name='data-2' id='data-2' className='w-4 h-4 m-auto accent-_primary rounded-full' />
                                    </td>
                                    <td className='px-3 py-2 font-semibold whitespace-nowrap text-_dark uppercase'>#flower 67</td>
                                    <td className='px-3 py-2 font-semibold whitespace-nowrap'>Bee</td>
                                    <td className='px-3 py-2 font-semibold'>12/12/2021</td>
                                    <td className='px-3 py-2 font-semibold sticky right-0 z-20 bg-inherit backdrop-blur-md border-l-4 border-_gray'>
                                        <div className='bg-_darkText/[15%] text-_darkText flex items-center justify-center gap-1 w-min rounded-full px-3 py-1'>
                                            <X size={18} /> Destruído
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </TabsContent>
                    <TabsContent value='date'>
                        <form className='grid gap-4 mt-8'>
                            <Input placeholder='bee' labelText='Nombre' autoComplete='off' required />
                            <Input placeholder='bee@example.com' type={'email'} labelText='Correo electrónico' autoComplete='off' required />
                            <Input placeholder='••••••••' type={'password'} labelText='Contraseña' required />
                            <Button>Continuar</Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
