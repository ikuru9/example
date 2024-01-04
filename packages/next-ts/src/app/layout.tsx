import { CombineComponents } from '@/components/combine-components'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ThemeProvider } from '@/components/theme-provider'
import { siteConfig } from '@/config/site'
import { fontSans } from '@/lib/utils/font'
import { ReactQueryProviders } from '@/lib/utils/react-query/Provider'
import { cn } from '@/lib/utils/shadcn'
import '@/styles/globals.css'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  const AppContextProviders = CombineComponents([
    [ReactQueryProviders],
    [
      ThemeProvider,
      {
        attribute: 'class',
        defaultTheme: 'system',
        enableSystem: true,
      },
    ],
  ])

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <AppContextProviders>
          {children}
          <TailwindIndicator />
        </AppContextProviders>
      </body>
    </html>
  )
}
