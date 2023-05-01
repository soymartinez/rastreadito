import { Back } from '@/ui/back'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import { getCurrentUser } from '@/hooks/auth'
import { prisma } from '@/lib/prisma'
import Table from './table'
import Link from 'next/link'

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
                    {historial.length > 0
                        ? <Table data={historial} />
                        : <div className='h-96 my-6 flex justify-center items-center gap-1'>
                            <p>Aún no tienes productos registrados.</p>
                            <Link href='/metadata'>
                                <p className='text-_primary hover:underline'>Registra tu primer producto</p>
                            </Link>
                        </div>}
                </TabsContent>
                <TabsContent value='date'>

                </TabsContent>
            </Tabs>
        </div>
    )
}
