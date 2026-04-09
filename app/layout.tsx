import type { Metadata } from 'next'
import { Inter, Sora } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['400', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TableTot — Family-Friendly NYC Restaurants',
  description:
    '100 hand-picked kid-friendly restaurants in New York City, all bookable on Resy. Find the best tables for your whole crew.',
  openGraph: {
    title: 'TableTot — Family-Friendly NYC Restaurants',
    description: 'The best tables for your whole crew. 100 family-friendly NYC restaurants on Resy.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
