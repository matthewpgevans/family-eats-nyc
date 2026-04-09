export interface Restaurant {
  id: number
  name: string
  neighborhood: string
  cuisine: string
  score: number
  lat: number
  lng: number
  features: string[]
  tags: string[]
  desc: string
  quiet: boolean
  resyUrl: string
}

export interface FilterParams {
  q?: string
  neighborhood?: string
  cuisine?: string
  feature?: string
  quiet?: string
  price?: string
  brunch?: string
  sort?: 'score' | 'alpha'
}

export interface NeighborhoodInfo {
  name: string
  borough: 'Manhattan' | 'Brooklyn' | 'Queens'
  count: number
  topRated: Restaurant
}
