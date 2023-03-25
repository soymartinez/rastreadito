import './globals.css'
import { Poppins as Font } from 'next/font/google'
import { ThemeProvider } from '@/components/provider'

const font = Font({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
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
    <html lang='en' suppressHydrationWarning>
      <body className={`bg-_white text-_dark dark:bg-_dark dark:text-_white ${font.variable} font-sans`}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
