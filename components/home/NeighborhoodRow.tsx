import Link from 'next/link'
import type { NeighborhoodInfo } from '@/lib/types'

interface Props {
  neighborhoods: NeighborhoodInfo[]
}

const neighborhoodEmojis: Record<string, string> = {
  'Upper West Side': '🏛️',
  'Upper East Side': '🌸',
  'Midtown': '🗽',
  'Chelsea': '🎨',
  'West Village': '🌿',
  'Greenwich Village': '🌿',
  'SoHo': '🛍️',
  'NoLita': '☕',
  'Tribeca': '✨',
  'Lower East Side': '🎸',
  'East Village': '🎭',
  'Flatiron': '🏢',
  'Financial District': '💼',
  'Park Slope': '🌳',
  'Williamsburg': '🎨',
  'Carroll Gardens': '🌺',
  'Prospect Heights': '🍕',
  'Dumbo': '🌉',
  'Brooklyn Heights': '🏡',
  'Astoria': '🍝',
  'Woodside': '🌏',
}

export default function NeighborhoodRow({ neighborhoods }: Props) {
  const top = neighborhoods.slice(0, 12)

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-ink-900">Browse by neighborhood</h2>
        <Link href="/neighborhoods" className="text-sm font-semibold text-coral-600 hover:text-coral-700 transition-colors">
          See all →
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
        {top.map(n => {
          const shortName = n.name.split(',')[0]
          const emoji = neighborhoodEmojis[shortName] ?? '📍'
          return (
            <Link
              key={n.name}
              href={`/search?neighborhood=${encodeURIComponent(n.name)}`}
              className="flex flex-col items-center gap-1.5 shrink-0 px-4 py-3 rounded-2xl bg-white border border-cream-200
                hover:border-coral-300 hover:shadow-md transition-all duration-150 text-center group min-w-24"
            >
              <span className="text-2xl">{emoji}</span>
              <span className="text-xs font-semibold text-ink-700 group-hover:text-coral-700 transition-colors leading-tight">
                {shortName}
              </span>
              <span className="text-xs text-ink-400">{n.count} spots</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
