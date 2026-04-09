'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

const QUICK_FILTERS = [
  { label: '🪑 High Chairs', href: '/search?feature=High+Chairs' },
  { label: '🍽️ Kids Menu', href: '/search?feature=Kids+Menu' },
  { label: '🌿 Outdoor', href: '/search?feature=Outdoor+Seating' },
  { label: '🤫 Quiet', href: '/search?quiet=true' },
  { label: '🥞 Brunch', href: '/search?brunch=true' },
  { label: '🌉 Brooklyn', href: '/search?neighborhood=Brooklyn' },
]

export default function HeroSection() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    } else {
      router.push('/search')
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-coral-50 via-cream-50 to-saffron-50 border-b border-cream-200">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-coral-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-saffron-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-coral-200 text-xs font-semibold text-coral-700 mb-6 shadow-sm">
          <span>✨</span>
          100 hand-picked restaurants · All on Resy
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink-900 leading-tight mb-5">
          The best tables for
          <span className="block text-coral-600"> your whole crew.</span>
        </h1>

        <p className="text-lg sm:text-xl text-ink-500 mb-10 max-w-xl mx-auto leading-relaxed">
          Kid-friendly restaurants in NYC where parents actually enjoy the food — and kids are genuinely welcome.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex gap-3 max-w-lg mx-auto mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Restaurant, cuisine, neighborhood..."
              className="w-full pl-11 pr-4 py-4 text-base rounded-2xl border-2 border-cream-200 bg-white
                focus:outline-none focus:ring-0 focus:border-coral-400
                placeholder:text-ink-300 text-ink-800 shadow-md transition"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-300"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            type="submit"
            className="px-6 py-4 rounded-2xl bg-coral-700 text-white font-semibold text-base
              hover:bg-coral-800 active:scale-95 transition-all shadow-md hover:shadow-lg"
          >
            Search
          </button>
        </form>

        {/* Quick filter pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {QUICK_FILTERS.map(f => (
            <a
              key={f.label}
              href={f.href}
              className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-cream-200
                text-ink-600 hover:border-coral-300 hover:text-coral-700 hover:bg-coral-50
                transition-all shadow-sm"
            >
              {f.label}
            </a>
          ))}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 text-center">
          {[
            { num: '100', label: 'Restaurants' },
            { num: '3', label: 'Boroughs' },
            { num: '20+', label: 'Neighborhoods' },
            { num: '100%', label: 'On Resy' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-2xl font-extrabold text-coral-700">{s.num}</div>
              <div className="text-xs text-ink-400 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
