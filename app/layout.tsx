import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Unnati - Carbon Footprint Calculator',
  description: 'Calculate and track your carbon footprint with Unnati',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-droid min-h-screen bg-[#FFFBF5]`}>
        <header className="sticky top-0 z-50 w-full bg-[#FFFBF5]">
          <div className="container flex h-20 items-center justify-between px-4">
            <Link
              href="/"
              className="font-swear text-3xl text-[#4D3503] font-thin"
            >
              Unnati
            </Link>
            <nav className="flex gap-12 text-lg font-droid text-[#4D3503]">
              <Link
                href="/"
                className="transition-colors hover:text-[#4D3503]/80"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="transition-colors hover:text-[#4D3503]/80"
              >
                About Us
              </Link>
              <Link
                href="/calculator"
                className="transition-colors hover:text-[#4D3503]/80"
              >
                Calculator
              </Link>
              <Link
                href="/blog"
                className="transition-colors hover:text-[#4D3503]/80"
              >
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
  );
}
