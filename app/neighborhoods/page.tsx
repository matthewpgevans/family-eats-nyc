import type { Metadata } from 'next'
import Link from 'next/link'
import { getNeighborhoods } from '@/lib/restaurants'
import { cuisineGradient } from '@/lib/utils'
import ScoreBadge from '@/components/restaurant/ScoreBadge'

export const metadata: Metadata = {
  title: 'Neighborhoods — TableTot',
  description: 'Browse kid-friendly NYC restaurants by neighborhood — Manhattan, Brooklyn, and Queens.',
}

const boroughColors: Record<string, string> = {
  Manhattan: 'bg-coral-50 border-coral-200 text-coral-700',
  Brooklyn: 'bg-saffron-50 border-saffron-200 text-saffron-700',
  Queens: 'bg-sage-50 border-sage-200 text-sage-700',
}

const boroughEmoji: Record<string, string> = {
  Manhattan: '🗽',
  Brooklyn: '🌉',
  Queens: '✈️',
}

export default function NeighborhoodsPage() {
  const neighborhoods = getNeighborhoods()

  const boroughs = ['Manhattan', 'Brooklyn', 'Queens'] as const
  const grouped = boroughs.reduce((acc, b) => {
    acc[b] = neighborhoods.filter(n => n.borough === b)
    return acc
  }, {} as Record<string, typeof neighborhoods>)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-ink-900 mb-3">Browse by Neighborhood</h1>
        <p className="text-ink-500 text-lg">
          {neighborhoods.length} neighborhoods across NYC with family-friendly dining.
        </p>
      </div>

      {/* Borough sections */}
      {boroughs.map(borough => {
        const nhoods = grouped[borough]
        if (!nhoods?.length) return null
        const total = nhoods.reduce((s, n) => s + n.count, 0)

        return (
          <section key={borough} className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{boroughEmoji[borough]}</span>
              <div>
                <h2 className="text-2xl font-bold text-ink-900">{borough}</h2>
                <p className="text-sm text-ink-400">{nhoods.length} neighborhoods · {total} restaurants</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nhoods.map(n => {
                const gradient = cuisineGradient(n.topRated.cuisine)
                return (
                  <Link
                    key={n.name}
                    href={`/search?neighborhood=${encodeURIComponent(n.name)}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    {/* Gradient strip */}
                    <div className={`h-2 bg-gradient-to-r ${gradient}`} />

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className="font-bold text-ink-900 text-lg group-hover:text-coral-700 transition-colors leading-tight">
                          {n.name.split(',')[0]}
                        </h3>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border shrink-0 ${boroughColors[borough]}`}>
                          {n.count}
                        </span>
                      </div>

                      <p className="text-xs text-ink-400 mb-3 uppercase tracking-wide font-medium">
                        Top pick
                      </p>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-ink-700 line-clamp-1">{n.topRated.name}</span>
                      </div>
                      <ScoreBadge score={n.topRated.score} size="sm" />

                      <div className="mt-4 flex items-center text-xs font-semibold text-coral-600 group-hover:text-coral-700 transition-colors">
                        Browse {n.count} restaurant{n.count !== 1 ? 's' : ''} →
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
