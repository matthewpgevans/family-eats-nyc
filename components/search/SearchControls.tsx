'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useCallback, useTransition } from 'react'
import { getCuisines, getNeighborhoods } from '@/lib/restaurants'

const AMENITY_FILTERS = [
  { label: 'High Chairs', param: 'feature', value: 'High Chairs' },
  { label: 'Kids Menu', param: 'feature', value: 'Kids Menu' },
  { label: 'Outdoor Seating', param: 'feature', value: 'Outdoor Seating' },
  { label: 'Stroller Access', param: 'feature', value: 'Stroller' },
]

const TOGGLE_FILTERS = [
  { label: '🤫 Quiet Only', param: 'quiet', value: 'true' },
  { label: '🍳 Sunday Brunch', param: 'brunch', value: 'true' },
]

const PRICE_OPTIONS = ['$', '$$', '$$$']

interface Props {
  cuisines: string[]
  neighborhoods: { name: string; count: number }[]
}

export default function SearchControls({ cuisines, neighborhoods }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const current = (key: string) => searchParams.get(key) ?? ''
  const isActive = (param: string, value: string) => current(param) === value

  const updateParam = useCallback((param: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (params.get(param) === value) {
      params.delete(param)
    } else {
      params.set(param, value)
    }
    startTransition(() => {
      router.push(`/search?${params.toString()}`, { scroll: false })
    })
  }, [searchParams, router])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (query.trim()) {
      params.set('q', query.trim())
    } else {
      params.delete('q')
    }
    startTransition(() => {
      router.push(`/search?${params.toString()}`, { scroll: false })
    })
  }

  const clearAll = () => {
    setQuery('')
    startTransition(() => router.push('/search', { scroll: false }))
  }

  const hasFilters = searchParams.toString().length > 0

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Amenities */}
      <div>
        <h3 className="text-xs font-bold text-ink-400 uppercase tracking-wider mb-3">Amenities</h3>
        <div className="space-y-2">
          {AMENITY_FILTERS.map(f => (
            <label key={f.value} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors
                  ${isActive(f.param, f.value)
                    ? 'bg-coral-600 border-coral-600'
                    : 'border-ink-200 group-hover:border-coral-400'
                  }`}
                onClick={() => updateParam(f.param, f.value)}
              >
                {isActive(f.param, f.value) && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span
                className={`text-sm transition-colors ${isActive(f.param, f.value) ? 'text-coral-700 font-medium' : 'text-ink-600'}`}
                onClick={() => updateParam(f.param, f.value)}
              >
                {f.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div>
        <h3 className="text-xs font-bold text-ink-400 uppercase tracking-wider mb-3">Vibe</h3>
        <div className="space-y-2">
          {TOGGLE_FILTERS.map(f => (
            <label key={f.value} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors
                  ${isActive(f.param, f.value)
                    ? 'bg-coral-600 border-coral-600'
                    : 'border-ink-200 group-hover:border-coral-400'
                  }`}
                onClick={() => updateParam(f.param, f.value)}
              >
                {isActive(f.param, f.value) && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span
                className={`text-sm transition-colors ${isActive(f.param, f.value) ? 'text-coral-700 font-medium' : 'text-ink-600'}`}
                onClick={() => updateParam(f.param, f.value)}
              >
                {f.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-xs font-bold text-ink-400 uppercase tracking-wider mb-3">Price</h3>
        <div className="flex gap-2">
          {PRICE_OPTIONS.map(p => (
            <button
              key={p}
              onClick={() => updateParam('price', p)}
              className={`px-3 py-1.5 text-sm font-semibold rounded-lg border-2 transition-colors
                ${isActive('price', p)
                  ? 'bg-coral-600 border-coral-600 text-white'
                  : 'border-ink-200 text-ink-500 hover:border-coral-400'
                }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Neighborhood */}
      <div>
        <h3 className="text-xs font-bold text-ink-400 uppercase tracking-wider mb-3">Neighborhood</h3>
        <select
          value={current('neighborhood')}
          onChange={e => {
            const params = new URLSearchParams(searchParams.toString())
            if (e.target.value) {
              params.set('neighborhood', e.target.value)
            } else {
              params.delete('neighborhood')
            }
            startTransition(() => router.push(`/search?${params.toString()}`, { scroll: false }))
          }}
          className="w-full text-sm border border-ink-200 rounded-lg px-3 py-2 text-ink-700
            focus:outline-none focus:ring-2 focus:ring-coral-300 bg-white"
        >
          <option value="">All neighborhoods</option>
          {neighborhoods.map(n => (
            <option key={n.name} value={n.name}>{n.name.split(',')[0]} ({n.count})</option>
          ))}
        </select>
      </div>

      {/* Cuisine */}
      <div>
        <h3 className="text-xs font-bold text-ink-400 uppercase tracking-wider mb-3">Cuisine</h3>
        <select
          value={current('cuisine')}
          onChange={e => {
            const params = new URLSearchParams(searchParams.toString())
            if (e.target.value) {
              params.set('cuisine', e.target.value)
            } else {
              params.delete('cuisine')
            }
            startTransition(() => router.push(`/search?${params.toString()}`, { scroll: false }))
          }}
          className="w-full text-sm border border-ink-200 rounded-lg px-3 py-2 text-ink-700
            focus:outline-none focus:ring-2 focus:ring-coral-300 bg-white"
        >
          <option value="">All cuisines</option>
          {cuisines.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-xs font-bold text-ink-400 uppercase tracking-wider mb-3">Sort by</h3>
        <div className="flex gap-2">
          {[
            { label: 'Kid Score', value: '' },
            { label: 'A–Z', value: 'alpha' },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString())
                if (opt.value) params.set('sort', opt.value)
                else params.delete('sort')
                startTransition(() => router.push(`/search?${params.toString()}`, { scroll: false }))
              }}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg border-2 transition-colors
                ${(current('sort') || '') === opt.value
                  ? 'bg-ink-900 border-ink-900 text-white'
                  : 'border-ink-200 text-ink-500 hover:border-ink-400'
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {hasFilters && (
        <button
          onClick={clearAll}
          className="w-full text-sm text-coral-600 hover:text-coral-700 font-medium py-2 border border-coral-200 rounded-xl hover:bg-coral-50 transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  )

  return (
    <>
      {/* Search bar + mobile filter toggle */}
      <div className="flex gap-3 mb-6">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search restaurants, cuisines, neighborhoods..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-cream-200 bg-white
              focus:outline-none focus:ring-2 focus:ring-coral-300 text-ink-700
              placeholder:text-ink-300 text-sm shadow-sm"
          />
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-300"
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </form>

        {/* Mobile filter button */}
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-xl border border-cream-200 bg-white text-sm font-medium text-ink-700 shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          Filters
          {hasFilters && (
            <span className="bg-coral-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              !
            </span>
          )}
        </button>
      </div>

      {/* Active filter chips */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {Array.from(searchParams.entries()).map(([key, value]) => (
            <button
              key={`${key}-${value}`}
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString())
                params.delete(key)
                startTransition(() => router.push(`/search?${params.toString()}`, { scroll: false }))
              }}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full
                bg-coral-50 text-coral-700 border border-coral-200 hover:bg-coral-100 transition-colors"
            >
              {key === 'q' ? `"${value}"` : value}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ))}
        </div>
      )}

      {/* Desktop sidebar — rendered inside layout */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-2xl p-5 shadow-sm sticky top-20">
          <h2 className="font-bold text-ink-900 mb-4">Filters</h2>
          <FilterContent />
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-ink-900 text-lg">Filters</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 rounded-lg hover:bg-cream-100 text-ink-500"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <FilterContent />
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full mt-6 bg-coral-600 text-white font-semibold py-3 rounded-xl hover:bg-coral-700 transition-colors"
            >
              Show Results
            </button>
          </div>
        </div>
      )}
    </>
  )
}
