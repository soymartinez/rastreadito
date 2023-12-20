'use client'

import { useSearchParams } from 'next/navigation'

export default function Categoria() {
  const search = useSearchParams()
  const tipo = search.get('tipo')
  return (
    <div>Categoria page {tipo}</div>
  )
}
