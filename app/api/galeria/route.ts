import { useSupabaseServer } from '@/hooks/auth'
import { prisma } from '@/lib/prisma'
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
        nombre,
        descripcion,
        url,
        categoria,
    } = await req.json()

    const { user } = await useSupabaseServer()

    const res = await prisma.galeria.create({
        data: {
            nombre,
            descripcion,
            url,
            categoriaAcronimo: categoria,
            usuario: user?.email || '',
        },
    })

    return NextResponse.json(res)
}