import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Archivo, Instrument_Sans } from 'next/font/google'
import './globals.css'
import { FitnexProvider } from '@/components/fitnex-provider'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-archivo',
})
const instrument = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-instrument',
})

export const metadata: Metadata = {
  title: 'FITNEX — The walk to class already counts',
  description:
    'FITNEX turns steps between lectures into streaks, badges and a campus leaderboard. Built for student life — no gym membership, no extra gear.',
  generator: 'v0.app',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b0d0a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrument.variable} bg-background`}
      suppressHydrationWarning
    >
      <body className="antialiased min-h-svh bg-[#050603] flex justify-center">
        <FitnexProvider>
          {/* Centered mobile app frame */}
          <div className="relative w-full max-w-[440px] min-h-svh bg-background flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.6)]">
            {children}
          </div>
        </FitnexProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
