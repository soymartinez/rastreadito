export type Record = {
  id: string
  key: string
  status: 'active' | 'inactive' | 'destroyed'
  description: string
  date: Date
  qr?: string
  extra?: string
  download?: string
}