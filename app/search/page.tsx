import type { Metadata } from 'next'
import { Suspense } from 'react'
import { filterRestaurants, getCuisines, getNeighborhoods } from '@/lib/restaurants'
import type { FilterParams } from '@/lib/types'
import SearchControls from '@/components/search/SearchControls'
import InteractiveResults from '@/components/search/InteractiveResults'

export const metadata: Metadata = {
  title: 'Browse Restaurants — TableTot',
  description: 'Find kid-friendly NYC restaurants with high chairs, kids menus, outdoor seating and more.',
}

interface Props {
  searchParams: Promise<Record<string, string>>
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams
  const filters: FilterParams = {
    q: params.q,
    neighborhood: params.neighborhood,
    cuisine: params.cuisine,
    feature: params.feature,
    quiet: params.quiet,
    price: params.price,
    brunch: params.brunch,
    sort: params.sort as FilterParams['sort'],
  }

  const results = filterRestaurants(filters)
  const cuisines = getCuisines()
  const neighborhoods = getNeighborhoods()

  const hasFilters = Object.values(params).some(Boolean)
  const headerText = results.length === 0
    ? 'No restaurants found'
    : `${results.length} restaurant${results.length !== 1 ? 's' : ''}`
  const subText = params.neighborhood
    ? `in ${params.neighborhood.split(',')[0]}`
    : params.q
      ? `matching "${params.q}"`
      : hasFilters
        ? 'matching your filters'
        : 'in New York City'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-ink-900">
          {headerText}{' '}
          <span className="text-ink-400 font-normal">{subText}</span>
        </h1>
        <p className="text-ink-400 text-sm mt-1">All bookable on Resy · Ranked by kid-friendliness</p>
      </div>

      <div className="flex gap-8">
        {/* Filter sidebar (desktop) */}
        <aside className="hidden lg:block w-56 xl:w-64 shrink-0">
          <Suspense>
            <SearchControls
              cuisines={cuisines}
              neighborhoods={neighborhoods.map(n => ({ name: n.name, count: n.count }))}
            />
          </Suspense>
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          {/* Mobile search controls */}
          <div className="lg:hidden mb-4">
            <Suspense>
              <SearchControls
                cuisines={cuisines}
                neighborhoods={neighborhoods.map(n => ({ name: n.name, count: n.count }))}
              />
            </Suspense>
          </div>

          <InteractiveResults restaurants={results} />
        </div>
      </div>
    </div>
  )
}
