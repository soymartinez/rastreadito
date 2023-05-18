import { useSupabaseServer } from '@/hooks/auth'
import { prisma } from '@/lib/prisma'
import { Galeria } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function GET() {
    const { user } = await useSupabaseServer()
    const res = await prisma.galeria.findMany({
        orderBy: {
            fechaRegistro: 'desc',
        },
        where: {
            usuario: user?.email,
        }
    })

    return NextResponse.json(res)
}

export async function POST(req: Request) {
    const {
        id,
        nombre,
        descripcion,
        url,
        categoria,
    }: Galeria & {
        categoria: string
    } = await req.json()

    const { user } = await useSupabaseServer()

    const res = await prisma.galeria.upsert({
        create: {
            nombre,
            descripcion,
            url,
            categoriaAcronimo: categoria,
            usuario: user?.email || '',
        },
        update: {
            nombre,
            descripcion,
            url,
            categoriaAcronimo: categoria,
            usuario: user?.email || '',
        },
        where: {
            id: id !== undefined ? Number(id) : -1,
        }
    })

    return NextResponse.json(res)
}