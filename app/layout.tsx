import './globals.css'
import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Poppins as Font } from 'next/font/google'
import { ThemeProvider } from '@/components/provider'
import SupabaseProvider from '@/components/supabase-provider'
import Toast from '@/components/toast'

const font = Font({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    default: 'Rastreadito',
    template: '%s | Rastreadito',
  },
  description: 'Rastreadito te permite seguir el rastro de tus productos cannábicos desde su origen hasta tu mano. Descubre su metadata y conoce toda su historia con esta app.',
}

export default async function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`bg-_white text-_dark dark:bg-_dark dark:text-_white ${font.variable} font-sans`}>
        <ThemeProvider>
          <SupabaseProvider>
            {children}
            <Analytics />
          </SupabaseProvider>
        </ThemeProvider>
        <Toast />
      </body>
    </html>
  )
}
