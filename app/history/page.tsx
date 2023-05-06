import { Back } from '@/ui/back'
import { Tabs, TabsContent, TabsList } from '@/ui/tabs'
import { getCurrentUser } from '@/hooks/auth'
import { prisma } from '@/lib/prisma'
import Table from './table'
import Link from 'next/link'
import TabTrigger from '@/components/tab-trigger'
import { Categoria } from '@prisma/client'
import Balancer from 'react-wrap-balancer'

async function getHistorial(usuario: string) {
    const res = await prisma.qr.findMany({
        where: { producto: { usuario } },
        include: { producto: true },
        orderBy: { fechaRegistro: 'desc' },
    })

    if (!res) throw new Error('No se pudo obtener el historial.')

    return res
}

async function getCategoria() {
    const res = await prisma.categoria.findMany()

    if (!res) throw new Error('No se pudo obtener las categorias.')

    return res
}

export default async function History() {
    const usuario = await getCurrentUser()
    const historial = await getHistorial(usuario?.email || '')
    const categorias = await getCategoria()

    const EmptyHistory = ({ title, description }: { title: string, description: string }) => (
        <div className='h-96 my-6 flex justify-center items-center'>
            <Balancer ratio={0.4}>
                Aún no tienes {title} registrados.{' '}
                <span className='text-_primary hover:underline'>
                    <Link href='/metadata'>
                        Registra tu primer {description}
                    </Link>
                </span>
            </Balancer>
        </div>
    )

    return (
        <div className='px-4 min-h-screen relative max-w-7xl mx-auto'>
            <div className='flex justify-center items-center py-8 relative'>
                <Back pushRoute='/' className='absolute left-0' />
                <h1 className='font-bold text-xl'>Historial</h1>
            </div>
            <h1 className='text-5xl font-bold leading-loose truncate'>{usuario?.user_metadata.name}</h1>
            <Tabs defaultValue='Ver todo'>
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
                        : <div className='h-96 my-6 flex justify-center items-center gap-1'>
                            <p>Aún no tienes productos registrados.</p>
                            <Link href='/metadata'>
                                <p className='text-_primary hover:underline'>Registra tu primer producto</p>
                            </Link>
                        </div>}
                </TabsContent>
                {categorias.map((categoria: Categoria) => (
                    <TabsContent className='overflow-auto w-full' value={categoria.acronimo} key={categoria.id}>
                        {historial.filter((qr) => qr.producto.categoria === categoria.acronimo).length > 0
                            ? <Table data={historial.filter((qr) => qr.producto.categoria === categoria.acronimo)} />
                            : <EmptyHistory title={categoria.nombre.toLocaleLowerCase()} description={categoria.acronimo.toLowerCase()} />}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
