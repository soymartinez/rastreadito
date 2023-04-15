import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { usuario: string } }) {
    const qr = await prisma.qr.findMany({
        where: {
            producto: {
                usuario: params.usuario
            }
        },
        include: {
            producto: true,
        }
    })
    return NextResponse.json(qr)
}