import type { Metadata } from 'next'
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from 'next/font/google'
import '@/styles/globals.css'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Fuse Medical — Family and Behavioral Medicine',
  description:
    'A truly comprehensive clinic — primary care, behavioral health, medication management, addiction treatment and recovery support in London, Kentucky.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  )
}
