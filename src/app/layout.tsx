import type { Metadata } from 'next'
import { Syne, DM_Sans, Cairo } from 'next/font/google'
import './globals.css'

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Mimouni Mohamed Aziz',
  description: 'AI Engineer & Full-Stack Developer',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      suppressHydrationWarning
      className={`${syne.variable} ${dmSans.variable} ${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-white font-body">
        {children}
      </body>
    </html>
  )
}
