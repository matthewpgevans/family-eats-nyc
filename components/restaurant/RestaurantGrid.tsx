import type { Restaurant } from '@/lib/types'
import RestaurantCard from './RestaurantCard'

interface Props {
  restaurants: Restaurant[]
  showRank?: boolean
  columns?: 1 | 2 | 3
}

export default function RestaurantGrid({ restaurants, showRank = false, columns = 2 }: Props) {
  if (restaurants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-4xl mb-3">🍽️</div>
        <p className="text-ink-500 font-medium">No restaurants match your filters.</p>
        <p className="text-ink-400 text-sm mt-1">Try removing a filter or broadening your search.</p>
      </div>
    )
  }

  const gridClass = {
    1: 'grid grid-cols-1 gap-3',
    2: 'grid grid-cols-1 sm:grid-cols-2 gap-4',
    3: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4',
  }[columns]

  return (
    <div className={gridClass}>
      {restaurants.map((r, i) => (
        <RestaurantCard
          key={r.id}
          restaurant={r}
          rank={showRank ? i + 1 : undefined}
        />
      ))}
    </div>
  )
}
