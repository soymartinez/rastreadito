import LayoutBoundary from '@/components/layout'

export default function HomeLayout({ children, modal }: { children: React.ReactNode, modal: React.ReactNode }) {
  return (
    <LayoutBoundary>
      {children}
      {modal}
    </LayoutBoundary>
  )
}
