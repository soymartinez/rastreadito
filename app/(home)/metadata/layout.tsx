export const metadata = {
  title: 'Metadata',
  description: 'Describe tu producto con la información necesaria para que tus clientes lo conozcan.',
}

export default function MetadataLayout(props: {
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