import { Back } from '@/ui/back'
import { Tabs, TabsContent, TabsList } from '@/ui/tabs'
import { getCurrentUser } from '@/hooks/auth'
import { prisma } from '@/lib/prisma'
import Table from './table'
import TabTrigger from '@/components/tab-trigger'
import { Categoria } from '@prisma/client'
import Empty from '@/components/empty'
import { QrProductType } from '@/types'
import { Suspense } from 'react'
import ContentLoader from 'react-content-loader'

async function getHistorial(usuario: string) {
    const res = await prisma.qr.findMany({
        where: { producto: { usuario } },
        include: { producto: true },
        orderBy: { fechaRegistro: 'desc' },
    })

    if (!res) throw new Error('No se pudo obtener el historial.')

    return res
}

async function getCategorias() {
    const res = await prisma.categoria.findMany({
        orderBy: { id: 'asc' },
    })

    if (!res) throw new Error('No se pudo obtener las categorias.')

    return res
}

export default async function History() {
    const usuario = await getCurrentUser()
    const historial = getHistorial(usuario?.email || '')
    const categorias = getCategorias()
    return (
        <div className='px-4 min-h-screen relative max-w-7xl mx-auto'>
            <div className='flex justify-center items-center py-8 relative'>
                <Back pushRoute='/' className='absolute left-0' />
                <h1 className='font-bold text-xl'>Historial</h1>
            </div>
            <h1 className='text-5xl font-bold leading-loose truncate'>{usuario?.user_metadata.name}</h1>
            <Tabs defaultValue='Ver todo'>
                <Suspense fallback={<Loading />}>
                    {/* @ts-expect-error Async Server Component */}
                    <DataTable categoriasData={categorias} historialData={historial} />
                </Suspense>
            </Tabs>
        </div>
    )
}

async function DataTable({ categoriasData, historialData }: { categoriasData: Promise<Categoria[]>, historialData: Promise<QrProductType[]> }) {
    const categorias = await categoriasData
    const historial = await historialData
    return (
        <>
            <TabsList className='py-2 overflow-x-auto'>
                <div className='flex gap-2 w-min'>
                    <TabTrigger value='Ver todo' label='Ver todo' />
                    {categorias.map((categoria: Categoria) => (
                        <TabTrigger
                            className='capitalize'
                            value={categoria.acronimo}
                            label={categoria.acronimo.toLowerCase()}
                            key={categoria.id}
                        />
                    ))}
                </div>
            </TabsList>

            <TabsContent value='Ver todo' className='overflow-auto w-full'>
                {historial.length > 0
                    ? <Table data={historial} />
                    : <Empty title='Aún no tienes productos registrados.' description='Registra tu primer producto.' />}
            </TabsContent>

            {categorias.map((categoria: Categoria) => (
                <TabsContent className='overflow-auto w-full' value={categoria.acronimo} key={categoria.id}>
                    {historial.filter((qr) => qr.producto.categoria === categoria.acronimo).length > 0
                        ? <Table data={historial.filter((qr) => qr.producto.categoria === categoria.acronimo)} />
                        : <Empty title={`Aún no tienes ${categoria.nombre.toLocaleLowerCase()} registrados.`}
                            description={`Registra tu primer ${categoria.acronimo.toLowerCase()}.`} />}
                </TabsContent>
            ))}
        </>
    )
}

function Loading() {
    return (
        <>
            <div className='flex gap-2 w-min py-2'>
                <div className={`
                        w-28 h-12
                        flex justify-center items-center transition-all
                        border-2 border-_dark dark:border-_primary 
                        rounded-full animate-pulse
                    `}
                />
                <div className={`
                        w-28 h-12
                        flex justify-center items-center transition-all
                        border-2 border-_gray dark:border-_darkText 
                        rounded-full animate-pulse
                    `}
                />
                <div className={`
                        w-28 h-12
                        flex justify-center items-center transition-all
                        border-2 border-_gray dark:border-_darkText 
                        rounded-full animate-pulse
                    `}
                />
                <div className={`
                        w-28 h-12
                        flex justify-center items-center transition-all
                        border-2 border-_gray dark:border-_darkText 
                        rounded-full animate-pulse
                    `}
                />
            </div>
            <div className='mt-9 mb-6'>
                <ContentLoader
                    width={130}
                    height={24}
                    className='px-3 dark:hidden'
                    backgroundColor='#f3f3f3'
                    foregroundColor='#ecebeb'
                >
                    <rect x='0' y='0' rx='5' ry='5' width='18' height='24' />
                    <rect x='22' y='0' rx='5' ry='5' width='80' height='24' />
                </ContentLoader>
                <ContentLoader
                    width={130}
                    height={24}
                    className='px-3 dark:block hidden'
                    backgroundColor='#262626'
                    foregroundColor='#212121'
                >
                    <rect x='0' y='0' rx='5' ry='5' width='18' height='24' />
                    <rect x='22' y='0' rx='5' ry='5' width='80' height='24' />
                </ContentLoader>
            </div>

            <table className='table-auto text-xs w-full border-separate border-spacing-0 my-6'>
                <thead className='text-_grayText uppercase sticky top-0 z-30'>
                    <tr className='text-left'>
                        <th className='px-3 py-2'>
                            <div className='w-4 h-4 bg-_darkText/[15%] dark:bg-_darkText animate-pulse rounded-sm' />
                        </th>
                        <th className='px-3 py-2 font-medium'>Factura</th>
                        <th className='px-3 py-2 font-medium'>Producto</th>
                        <th className='px-3 py-2 font-medium'>Cliente</th>
                        <th className='px-3 py-2 font-medium'>Fecha</th>
                        <th className='px-3 py-2 font-medium sticky right-0 bg-_white dark:bg-_dark border-l-4 border-_gray dark:border-_darkText'>Estado</th>
                    </tr>
                </thead>
                <tbody className='text-_grayText text-base overflow-hidden'>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <tr key={i} className='bg-_white dark:bg-_dark'>
                            <td className='px-3 py-2 w-24'>
                                <div className='w-4 h-4 bg-_darkText/[15%] dark:bg-_darkText animate-pulse rounded-sm' />
                            </td>
                            <td className='px-3 py-2'>
                                <CardLoading />
                            </td>
                            <td className='px-3 py-2'>
                                <CardLoading />
                            </td>
                            <td className='px-3 py-2'>
                                <CardLoading />
                            </td>
                            <td className='px-3 py-2'>
                                <CardLoading />
                            </td>
                            <td className='px-3 py-2 sticky right-0 z-20 bg-inherit backdrop-blur-md border-l-4 border-_gray dark:border-_darkText'>
                                <div className='bg-_darkText/[15%] dark:bg-_darkText animate-pulse flex items-center justify-center gap-1 w-min rounded-full px-3 py-1'>
                                    <div className='w-12 h-6 rounded-md' />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

function CardLoading() {
    return (
        <>
            <ContentLoader
                width={200}
                height={24}
                className='px-3 dark:hidden'
                backgroundColor='#f3f3f3'
                foregroundColor='#ecebeb'
            >
                <rect x='0' y='0' rx='5' ry='5' width='200' height='24' />
            </ContentLoader>
            <ContentLoader
                width={200}
                height={24}
                className='px-3 dark:block hidden'
                backgroundColor='#262626'
                foregroundColor='#212121'
            >
                <rect x='0' y='0' rx='5' ry='5' width='200' height='24' />
            </ContentLoader>
        </>
    )
}
