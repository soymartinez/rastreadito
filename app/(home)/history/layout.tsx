export const metadata = {
    title: 'Historial',
    description: 'Administra el historial de tus productos.',
}

export default function HistoryLayout(props: {
    children: React.ReactNode
    modal: React.ReactNode
}) {
    return (
        <main>
            {props.children}
            {props.modal}
        </main>
    )
}