import './globals.css'
import { Metadata } from 'next'
// import { Analytics } from '@vercel/analytics/react'
import { font } from '@/lib/font'
import { ThemeProvider } from '@/components/theme-provider'
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
          min-h-screen
          bg-white2
          text-darkText
          antialiased
          scrollbar-thin
          scrollbar-thumb-gray
          scrollbar-thumb-rounded-full
          selection:bg-primary
          dark:bg-dark
          dark:text-white
          dark:scrollbar-thumb-darkText
          ${font.className}
        `}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          {/* <Analytics /> */}
        </ThemeProvider>
        <Toast />
      </body>
    </html>
  )
}
