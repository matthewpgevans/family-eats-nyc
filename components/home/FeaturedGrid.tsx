import Link from 'next/link'
import type { Restaurant } from '@/lib/types'
import RestaurantCard from '@/components/restaurant/RestaurantCard'

interface Props {
  title: string
  subtitle?: string
  restaurants: Restaurant[]
  seeAllHref?: string
  showRank?: boolean
}

export default function FeaturedGrid({ title, subtitle, restaurants, seeAllHref, showRank = false }: Props) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900">{title}</h2>
          {subtitle && <p className="text-ink-400 mt-1 text-sm">{subtitle}</p>}
        </div>
        {seeAllHref && (
          <Link
            href={seeAllHref}
            className="text-sm font-semibold text-coral-600 hover:text-coral-700 transition-colors whitespace-nowrap"
          >
            See all →
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {restaurants.map((r, i) => (
          <RestaurantCard
            key={r.id}
            restaurant={r}
            rank={showRank ? i + 1 : undefined}
          />
        ))}
      </div>
    </section>
  )
}
