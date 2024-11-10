import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Unnati - Carbon Footprint Calculator',
  description: 'Calculate and track your carbon footprint with Unnati',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-[#FFFBF5]`}>
        <header className="sticky top-0 z-50 w-full border-b bg-[#FFFBF5]/80 backdrop-blur-sm">
          <div className="container flex h-16 items-center justify-between px-4">
            <Link href="/" className="font-serif text-2xl text-[#5C4033]">
              Unnati
            </Link>
            <nav className="flex gap-6 font-medium text-[#5C4033]">
              <Link href="/" className="transition-colors hover:text-[#5C4033]/80">
                Home
              </Link>
              <Link href="/about" className="transition-colors hover:text-[#5C4033]/80">
                About Us
              </Link>
              <Link href="/calculator" className="transition-colors hover:text-[#5C4033]/80">
                Calculator
              </Link>
              <Link href="/blog" className="transition-colors hover:text-[#5C4033]/80">
                Blog
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t bg-[#FFFBF5] py-6">
          <div className="container flex items-center justify-center gap-1 px-4 text-sm text-[#5C4033]">
            <span>Made with</span>
            <span className="text-red-500">♥</span>
            <span>@Lady Shri Ram College, Delhi University</span>
          </div>
        </footer>
      </body>
    </html>
  )
}