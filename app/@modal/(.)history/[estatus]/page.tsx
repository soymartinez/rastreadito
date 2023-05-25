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

    const title = () => {
        const estatus = params.estatus.toUpperCase() as Estatus
        if (estatus === Estatus.ACTIVO) return 'QRs activos'
        if (estatus === Estatus.USADO) return 'QRs en uso'
        if (estatus === Estatus.DESTRUIDO) return 'QRs destruidos'
    }

    return (
        <ModalPage>
            <div className='sticky top-0 z-50 bg-_white dark:bg-_dark border-b border-_gray dark:border-_darkText'>
                <h1 className='text-5xl font-bold leading-loose truncate'>{title()}</h1>
            </div>
            <section>
                {history.length > 0
                    ? <div className='flex flex-col gap-4'>
                        {history.map(({ id, producto }) => (
                            <div key={id} className='flex items-center gap-4'>
                                <Image
                                    src={producto.imagen[0]}
                                    alt={producto.nombre}
                                    width={64}
                                    height={64}
                                    className='rounded-xl object-contain border border-_gray dark:border-_darkText'
                                />
                                <div>
                                    <span className='text-xl font-semibold text-_white'>{producto.nombre}</span>
                                    <span className='line-clamp-2 text-xs font-medium text-_grayText'>{producto.descripcion}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    : <div className='h-full flex justify-center items-center'>
                        <p className='font-medium text-_grayText'>No hay QRs en este estado</p>
                    </div>}
            </section>
        </ModalPage>
    )
}
