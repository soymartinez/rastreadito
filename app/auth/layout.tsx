import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Bienvenido',
    description: 'Iniciar sesión para etiquetar productos cannábicos.',
}

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <main>{children}</main>
    )
}
