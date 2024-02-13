import './globals.css'
import { Metadata } from 'next'
// import { Analytics } from '@vercel/analytics/react'
import { font } from '@/lib/font'
import { ThemeProvider } from '@/components/provider'
import SupabaseProvider from '@/components/supabase-provider'
import Toast from '@/components/toast'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`
          bg-_white
          text-_darkText
          scrollbar-thin
          scrollbar-thumb-_gray
          scrollbar-thumb-rounded-full
          dark:bg-_dark
          dark:text-_white
          dark:scrollbar-thumb-_darkText 
          ${font.className}
        `}
      >
        <ThemeProvider>
          <SupabaseProvider>
            {children}
            {/* <Analytics /> */}
          </SupabaseProvider>
        </ThemeProvider>
        <Toast />
      </body>
    </html>
  )
}
