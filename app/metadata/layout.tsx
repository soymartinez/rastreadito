export const metadata = {
    title: 'Metadata',
    description: 'Describe tu producto con la información necesaria para que tus clientes lo conozcan.',
}

export default async function MetadataLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <main>{children}</main>
    )
}