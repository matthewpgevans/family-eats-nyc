'use client'

import Link from 'next/link'
import type { Restaurant } from '@/lib/types'
import { getPriceRange } from '@/lib/restaurants'
import { cuisineGradient } from '@/lib/utils'
import ScoreBadge from './ScoreBadge'
import FeatureChip from './FeatureChip'
import ResyButton from './ResyButton'

interface Props {
  restaurant: Restaurant
  rank?: number
  compact?: boolean
  selected?: boolean
  onClick?: () => void
}

function RankBadge({ rank }: { rank: number }) {
  const style =
    rank === 1
      ? 'bg-saffron-400 text-white'
      : rank <= 3
        ? 'bg-coral-600 text-white'
        : 'bg-ink-100 text-ink-500'
  return (
    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${style}`}>
      {rank}
    </div>
  )
}

export default function RestaurantCard({ restaurant: r, rank, compact = false, selected = false, onClick }: Props) {
  const price = getPriceRange(r)
  const topFeatures = r.features.slice(0, 3)
  const gradient = cuisineGradient(r.cuisine)

  return (
    <div
      className={`group bg-white rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer
        ${selected ? 'ring-2 ring-coral-500 shadow-lg' : 'shadow-sm hover:shadow-md'}
        ${onClick ? '' : ''}`}
      onClick={onClick}
    >
      {/* Gradient header */}
      <div className={`h-3 bg-gradient-to-r ${gradient}`} />

      <div className={`${compact ? 'p-3' : 'p-4'}`}>
        <div className="flex items-start gap-3">
          {rank && <RankBadge rank={rank} />}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <Link
                href={`/restaurant/${r.id}`}
                className="font-semibold text-ink-900 hover:text-coral-700 transition-colors leading-tight line-clamp-1"
                style={{ fontFamily: 'Sora, sans-serif', fontSize: compact ? '0.875rem' : '1rem' }}
                onClick={e => e.stopPropagation()}
              >
                {r.name}
              </Link>
            </div>

            <div className="flex items-center gap-1.5 mt-0.5 text-xs text-ink-400">
              <span>{r.neighborhood.split(',')[0]}</span>
              <span>·</span>
              <span>{r.cuisine}</span>
              <span>·</span>
              <span>{price}</span>
              {r.quiet && (
                <>
                  <span>·</span>
                  <span className="text-sage-600">Quiet</span>
                </>
              )}
            </div>

            {!compact && (
              <p className="text-xs text-ink-500 mt-1.5 line-clamp-2 leading-relaxed">
                {r.desc}
              </p>
            )}

            <div className="flex items-center justify-between mt-2">
              <ScoreBadge score={r.score} size="sm" />
            </div>

            {!compact && topFeatures.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {topFeatures.map(f => (
                  <FeatureChip key={f} feature={f} size="sm" />
                ))}
              </div>
            )}

            {!compact && (
              <div className="mt-3">
                <ResyButton href={r.resyUrl} size="sm" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
