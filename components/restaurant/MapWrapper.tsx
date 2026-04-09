'use client'

import dynamic from 'next/dynamic'
import type { Restaurant } from '@/lib/types'

const RestaurantMap = dynamic(() => import('./RestaurantMap'), {
  ssr: false,
  loading: () => <div className="h-full bg-cream-100 animate-pulse rounded-2xl" />,
})

interface Props {
  restaurants: Restaurant[]
  selectedId?: number
  onSelect?: (id: number) => void
  singlePin?: boolean
  height?: string
}

export default function MapWrapper(props: Props) {
  return <RestaurantMap {...props} />
}
