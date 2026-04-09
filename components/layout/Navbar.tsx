'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (href: string) => pathname === href

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
    }
  }

  const navLinks = [
    { href: '/search', label: 'Browse' },
    { href: '/neighborhoods', label: 'Neighborhoods' },
    { href: '/about', label: 'About' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-cream-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl">🍽️</span>
          <span
            className="text-xl font-bold text-coral-700"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            TableTot
          </span>
        </Link>

        {/* Search bar (hidden on mobile) */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm">
          <div className="relative w-full">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search restaurants..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-cream-200 bg-cream-50
                focus:outline-none focus:ring-2 focus:ring-coral-300 focus:border-transparent
                placeholder:text-ink-300 text-ink-700 transition"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300 w-4 h-4"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </form>

        {/* Nav links (desktop) */}
        <nav className="hidden md:flex items-center gap-1 ml-auto">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors
                ${isActive(link.href)
                  ? 'text-coral-700 bg-coral-50'
                  : 'text-ink-500 hover:text-ink-900 hover:bg-cream-100'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden ml-auto p-2 rounded-lg text-ink-500 hover:bg-cream-100"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-cream-200 bg-white px-4 py-3 space-y-1">
          <form onSubmit={handleSearch} className="mb-3">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search restaurants..."
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-cream-200 bg-cream-50
                  focus:outline-none focus:ring-2 focus:ring-coral-300 placeholder:text-ink-300 text-ink-700"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300 w-4 h-4"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </form>
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors
                ${isActive(link.href)
                  ? 'text-coral-700 bg-coral-50'
                  : 'text-ink-600 hover:bg-cream-100'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
