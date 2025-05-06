'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold text-blue-600">
          <Link href="/">TaskFlow</Link>
        </div>
        <nav className="space-x-6 text-gray-700 text-sm font-medium">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <Link href="/contact" className="hover:text-blue-600 transition">Contact Us</Link>
        </nav>
      </div>
    </header>
  )
}
