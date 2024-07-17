import { ProductsTable } from '@/components/tables/products-table'
import { Product } from '@/types/product'

export const data: Product[] = [
  {
    id: 'rd100',
    code: 'RD-200ER CART',
    categories: [],
    cbd: 23,
    minStock: 23,
    name: '',
    stock: 3,
    thc: 23,
    unitPrice: 234,
  },
]

export default function Products() {
  return (
    <main>
      <ProductsTable data={data} />
    </main>
  )
}
