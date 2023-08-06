import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Escanear',
    description: 'Escanea el código QR de un producto cannábico y accede a su metadata.',
}

export default async function ScanLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            {children}
        </main>
    )
}
