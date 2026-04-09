'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import type { Restaurant } from '@/lib/types'

const RestaurantMap = dynamic(() => import('@/components/restaurant/RestaurantMap'), {
  ssr: false,
  loading: () => <div className="h-full bg-cream-100 animate-pulse rounded-2xl" />,
})

interface Props {
  restaurants: Restaurant[]
  selectedId?: number
  onSelect?: (id: number) => void
}

export default function MapToggle({ restaurants, selectedId, onSelect }: Props) {
  const [showMap, setShowMap] = useState(false)

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setShowMap(!showMap)}
        className="lg:hidden w-full flex items-center justify-center gap-2 px-4 py-2.5 mb-4
          rounded-xl border border-cream-200 bg-white text-sm font-medium text-ink-700 shadow-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        {showMap ? 'Hide Map' : 'Show Map'}
      </button>

      {/* Map container */}
      <div className={`${showMap ? 'block' : 'hidden'} lg:block h-72 lg:h-[calc(100vh-8rem)] rounded-2xl overflow-hidden shadow-sm`}>
        <RestaurantMap
          restaurants={restaurants}
          selectedId={selectedId}
          onSelect={onSelect}
          height="100%"
        />
      </div>
    </>
  )
}
