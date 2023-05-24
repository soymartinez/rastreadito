import ModalPage from '@/components/modal/modal-page'
import { useSupabaseServer } from '@/hooks/auth'
import { prisma } from '@/lib/prisma'
import { Estatus } from '@prisma/client'
import Image from 'next/image'

const getStatusHistory = async (estatus: Estatus) => {
    const { user } = await useSupabaseServer()
    const history = await prisma.qr.findMany({
        where: {
            estatus,
            producto: {
                usuario: user?.email
            }
        },
        include: {
            producto: true,
        }
    })

    return history
}

export default async function HistoryStatus({ params }: { params: { estatus: string } }) {
    const history = await getStatusHistory(params.estatus.toUpperCase() as Estatus)
    return (
        <ModalPage>
            <div className='sticky top-0 z-50 flex justify-between items-center bg-_white dark:bg-_dark border-b border-_gray dark:border-_darkText'>
                <h1 className='text-5xl font-bold leading-loose truncate'>{params.estatus}</h1>
            </div>
            <section>
                {history.length > 0
                    ? <div className='flex flex-col gap-4'>
                        {history.map(({ id, producto }) => (
                            <div key={id} className='flex gap-4'>
                                <div className='w-16 h-16 rounded-2xl overflow-hidden relative'>
                                    <Image src={producto.imagen[0]} alt={producto.nombre} fill />
                                </div>
                                <div>
                                    <span>{producto.nombre}</span>
                                    <span className='line-clamp-2'>{producto.descripcion}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    : <div>
                        No hay historial
                    </div>}
            </section>
        </ModalPage>
    )
}
