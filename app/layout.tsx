import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fuse Medical',
  description: 'Family and Behavioral Medicine Clinic',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
