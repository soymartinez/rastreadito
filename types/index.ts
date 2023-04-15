import { Producto, Qr } from '@prisma/client'

export type QrProductType = (Qr & { producto: Producto })