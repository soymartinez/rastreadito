import {
    Categoria,
    Galeria,
    Producto,
    Qr
} from '@prisma/client'

export type QrProductType = (Qr & { producto: Producto })

export type CategoriaGaleriaType = (Categoria & { galeria: Galeria[] })
