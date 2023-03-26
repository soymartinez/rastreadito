import { Back } from '@/ui/back'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import { Check, Tag, X } from 'lucide-react'

export default function History() {
    const data = [
        {
            id: 1,
            invoice: '#cart 86',
            client: 'Bee',
            date: '12/12/2021',
            status: 'active',
        },
        {
            id: 2,
            invoice: '#flower 67',
            client: 'Bee',
            date: '12/12/2021',
            status: 'destroy',
        },
        {
            id: 3,
            invoice: '#oil 12',
            client: 'Bee',
            date: '12/12/2021',
            status: 'active',
        },
        {
            id: 4,
            invoice: '#cart 86',
            client: 'Bee',
            date: '12/12/2021',
            status: 'active',
        },
        {
            id: 5,
            invoice: '#flower 67',
            client: 'Bee',
            date: '12/12/2021',
            status: 'use',
        },
    ]

    const ActiveButton = () => (
        <div className='bg-_primary/[15%] text-_primary flex items-center justify-center gap-1 w-min rounded-full px-3 py-1'>
            <Check size={18} /> Activo
        </div>
    )

    const UseButton = () => (
        <div className='bg-[#00d0ff]/[15%] text-[#00d0ff] flex items-center justify-center gap-1 w-min rounded-full px-3 py-1'>
            <Tag size={18} /> Uso
        </div>
    )

    const DestroyButton = () => (
        <div className='bg-_darkText/[15%] text-_darkText flex items-center justify-center gap-1 w-min rounded-full px-3 py-1'>
            <X size={18} /> Destruído
        </div>
    )
    return (
        <div className='px-4 min-h-screen relative'>
            <div className='flex justify-center items-center py-8 relative'>
                <Back className='absolute left-0' />
                <h1 className='font-bold text-xl'>Historial</h1>
            </div>
            <h1 className='text-5xl font-bold leading-loose truncate'>BeeHealthy</h1>
            <Tabs defaultValue='all'>
                <TabsList className='py-2 overflow-x-auto'>
                    <div className='flex gap-2 w-min'>
                        <TabsTrigger
                            value='all'
                            className={`w-28 h-12
                                flex justify-center items-center transition-all
                                data-[state=active]:bg-[#1b1b1b] data-[state=active]:text-_white data-[state=active]:border-none 
                                dark:data-[state=active]:bg-_primary dark:data-[state=active]:text-_dark 
                                bg-_white text-_dark border-2 hover:bg-_gray border-_gray font-[500] rounded-full
                                dark:bg-_dark dark:text-_white dark:border-_darkText dark:hover:bg-_darkText`}
                        >
                            Ver todo
                        </TabsTrigger>
                        <TabsTrigger
                            value='date'
                            className={`w-28 h-12
                                flex justify-center items-center transition-all
                                data-[state=active]:bg-[#1b1b1b] data-[state=active]:text-_white data-[state=active]:border-none 
                                dark:data-[state=active]:bg-_primary dark:data-[state=active]:text-_dark 
                                bg-_white text-_dark border-2 hover:bg-_gray border-_gray font-[500] rounded-full
                                dark:bg-_dark dark:text-_white dark:border-_darkText dark:hover:bg-_darkText`}
                        >
                            Fecha
                        </TabsTrigger>
                    </div>
                </TabsList>
                <TabsContent value='all' className='overflow-auto w-full'>
                    <table className='table-auto text-xs w-full border-separate border-spacing-0 mt-6'>
                        <thead className='text-_grayText uppercase sticky top-0 z-30'>
                            <tr className='text-left'>
                                <th className='px-3 py-2'>
                                    <div className='flex items-center justify-center'>
                                        <input type='checkbox' name='select-all' id='select-all' className='w-4 h-4 m-auto accent-_primary rounded-full' />
                                    </div>
                                </th>
                                <th className='px-3 py-2 font-medium'>Factura</th>
                                <th className='px-3 py-2 font-medium'>Cliente</th>
                                <th className='px-3 py-2 font-medium'>Fecha</th>
                                <th className='px-3 py-2 font-medium sticky right-0 bg-_white border-l-4 border-_gray'>Estado</th>
                            </tr>
                        </thead>
                        <tbody className='text-_grayText text-base overflow-hidden'>
                            {data.map((item) => (
                                <tr
                                    key={item.id}
                                    className='bg-_white hover:bg-_gray/50 overflow-x-auto'
                                >
                                    <td className='px-3 py-2'>
                                        <div className='flex items-center justify-center'>
                                            <input
                                                type='checkbox'
                                                name={`${item.id}`}
                                                id={`${item.id}`}
                                                className='w-4 h-4 m-auto accent-_primary rounded-full' />
                                        </div>
                                    </td>
                                    <td className='px-3 py-2 font-semibold whitespace-nowrap text-_dark uppercase'>{item.invoice}</td>
                                    <td className='px-3 py-2 font-semibold whitespace-nowrap'>{item.client}</td>
                                    <td className='px-3 py-2 font-semibold'>{item.date}</td>
                                    <td className='px-3 py-2 font-semibold sticky right-0 z-20 bg-inherit backdrop-blur-md border-l-4 border-_gray'>
                                        {item.status === 'active' && <ActiveButton />}
                                        {item.status === 'use' && <UseButton />}
                                        {item.status === 'destroy' && <DestroyButton />}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </TabsContent>
                <TabsContent value='date'>

                </TabsContent>
            </Tabs>
        </div>
    )
}
