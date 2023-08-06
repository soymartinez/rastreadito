export const metadata = {
    title: 'Historial',
    description: 'Administra el historial de tus productos.',
}

export default function HistoryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main>
            {children}
        </main>
    )
}