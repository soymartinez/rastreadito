import { Back } from '@/ui/back'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import { getCurrentUser } from '@/hooks/auth'
import Tr from '@/components/hover/tr'
import { QrProductType } from '@/types'
import { prisma } from '@/lib/prisma'

async function getHistorial(usuario: string) {
    const res = await prisma.qr.findMany({
        where: { producto: { usuario } },
        include: { producto: true },
        orderBy: { fechaRegistro: 'desc' },
    })

    if (!res) throw new Error('No se pudo obtener el historial.')

    return JSON.parse(JSON.stringify(res))
}

export default async function History() {
    const usuario = await getCurrentUser()
    const historial = await getHistorial(usuario?.email || '')
    return (
        <div className='px-4 min-h-screen relative max-w-7xl mx-auto'>
            <div className='flex justify-center items-center py-8 relative'>
                <Back className='absolute left-0' />
                <h1 className='font-bold text-xl'>Historial</h1>
            </div>
            <h1 className='text-5xl font-bold leading-loose truncate'>{usuario?.user_metadata.name}</h1>
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
                    <table className='table-auto text-xs w-full border-separate border-spacing-0 my-6'>
                        <thead className='text-_grayText uppercase sticky top-0 z-30'>
                            <tr className='text-left'>
                                <th className='px-3 py-2'>
                                    <div className='flex items-center justify-center'>
                                        <input type='checkbox' name='select-all' id='select-all' className='w-4 h-4 m-auto accent-_primary rounded-full' />
                                    </div>
                                </th>
                                <th className='px-3 py-2 font-medium'>Factura</th>
                                <th className='px-3 py-2 font-medium'>Producto</th>
                                <th className='px-3 py-2 font-medium'>Cliente</th>
                                <th className='px-3 py-2 font-medium'>Fecha</th>
                                <th className='px-3 py-2 font-medium sticky right-0 bg-_white dark:bg-_dark border-l-4 border-_gray dark:border-_darkText'>Estado</th>
                            </tr>
                        </thead>
                        <tbody className='text-_grayText text-base overflow-hidden'>
                            {historial.map((data: QrProductType) => (
                                <Tr key={data.id} data={data} />
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
