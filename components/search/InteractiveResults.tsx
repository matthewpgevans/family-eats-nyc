'use client'

import { useState } from 'react'
import type { Restaurant } from '@/lib/types'
import RestaurantCard from '@/components/restaurant/RestaurantCard'
import MapToggle from './MapToggle'

interface Props {
  restaurants: Restaurant[]
}

export default function InteractiveResults({ restaurants }: Props) {
  const [selectedId, setSelectedId] = useState<number | undefined>()

  return (
    <div className="flex gap-6">
      {/* Restaurant list */}
      <div className="flex-1 min-w-0">
        {restaurants.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-5xl mb-4">🍽️</div>
            <p className="text-ink-500 font-semibold text-lg">No restaurants match your filters.</p>
            <p className="text-ink-400 text-sm mt-1">Try removing a filter or broadening your search.</p>
          </div>
        ) : (
          <>
            {/* Mobile map toggle */}
            <MapToggle
              restaurants={restaurants}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />

            <div className="space-y-3">
              {restaurants.map((r, i) => (
                <RestaurantCard
                  key={r.id}
                  restaurant={r}
                  rank={i + 1}
                  selected={selectedId === r.id}
                  onClick={() => setSelectedId(r.id === selectedId ? undefined : r.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Desktop map (sticky) */}
      {restaurants.length > 0 && (
        <div className="hidden lg:block w-96 xl:w-[480px] shrink-0">
          <div className="sticky top-20 h-[calc(100vh-6rem)] rounded-2xl overflow-hidden shadow-sm">
            <MapToggle
              restaurants={restaurants}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>
        </div>
      )}
    </div>
  )
}
