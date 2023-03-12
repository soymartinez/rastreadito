import './globals.css'
import { Poppins as Font } from 'next/font/google'

const font = Font({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-sans',
})

export const metadata = {
  title: 'QR Code Generator',
  description: 'Generate QR codes for cannabis products',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={`${font.variable} font-sans`}>{children}</body>
    </html>
  )
}
