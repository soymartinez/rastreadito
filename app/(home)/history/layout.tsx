export const metadata = {
    title: 'Historial',
    description: 'Administra el historial de tus productos.',
}

export default function HistoryLayout({
    children,
    modal
}: {
    children: React.ReactNode
    modal: React.ReactNode
}) {
    return (
        <main>
            {children}
            {modal}
        </main>
    )
}