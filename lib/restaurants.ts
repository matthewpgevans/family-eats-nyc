import data from '@/data/restaurants.json'
import type { Restaurant, FilterParams, NeighborhoodInfo } from './types'

const restaurants = data as Restaurant[]

export function getAllRestaurants(): Restaurant[] {
  return [...restaurants].sort((a, b) => b.score - a.score)
}

export function getRestaurantById(id: number): Restaurant | undefined {
  return restaurants.find(r => r.id === id)
}

export function getFeaturedRestaurants(n = 6): Restaurant[] {
  return getAllRestaurants().slice(0, n)
}

export function getPriceRange(r: Restaurant): string {
  return r.tags.find(t => /^\$+$/.test(t)) ?? '$$'
}

export function getBorough(r: Restaurant): 'Manhattan' | 'Brooklyn' | 'Queens' {
  if (r.neighborhood.includes('Brooklyn')) return 'Brooklyn'
  if (r.neighborhood.includes('Queens')) return 'Queens'
  return 'Manhattan'
}

export function isSundayBrunch(r: Restaurant): boolean {
  return r.cuisine.toLowerCase().includes('brunch') ||
    r.features.some(f => f.toLowerCase().includes('brunch'))
}

export function getNeighborhoods(): NeighborhoodInfo[] {
  const map = new Map<string, Restaurant[]>()
  for (const r of restaurants) {
    const existing = map.get(r.neighborhood) ?? []
    map.set(r.neighborhood, [...existing, r])
  }
  return Array.from(map.entries())
    .map(([name, list]) => {
      const sorted = [...list].sort((a, b) => b.score - a.score)
      return {
        name,
        borough: getBorough(sorted[0]),
        count: list.length,
        topRated: sorted[0],
      }
    })
    .sort((a, b) => b.count - a.count)
}

export function getByNeighborhood(neighborhood: string, excludeId?: number): Restaurant[] {
  return restaurants
    .filter(r => r.neighborhood === neighborhood && r.id !== excludeId)
    .sort((a, b) => b.score - a.score)
}

export function getCuisines(): string[] {
  const set = new Set(restaurants.map(r => r.cuisine))
  return Array.from(set).sort()
}

export function filterRestaurants(params: FilterParams): Restaurant[] {
  let results = [...restaurants]

  if (params.q) {
    const q = params.q.toLowerCase()
    results = results.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.neighborhood.toLowerCase().includes(q) ||
      r.cuisine.toLowerCase().includes(q) ||
      r.tags.some(t => t.toLowerCase().includes(q)) ||
      r.desc.toLowerCase().includes(q)
    )
  }

  if (params.neighborhood) {
    results = results.filter(r =>
      r.neighborhood.toLowerCase().includes(params.neighborhood!.toLowerCase())
    )
  }

  if (params.cuisine) {
    results = results.filter(r =>
      r.cuisine.toLowerCase().includes(params.cuisine!.toLowerCase())
    )
  }

  if (params.feature) {
    const feat = params.feature.toLowerCase()
    results = results.filter(r =>
      r.features.some(f => f.toLowerCase().includes(feat))
    )
  }

  if (params.quiet === 'true') {
    results = results.filter(r => r.quiet)
  }

  if (params.price) {
    results = results.filter(r => getPriceRange(r) === params.price)
  }

  if (params.brunch === 'true') {
    results = results.filter(r => isSundayBrunch(r))
  }

  if (params.sort === 'alpha') {
    results.sort((a, b) => a.name.localeCompare(b.name))
  } else {
    results.sort((a, b) => b.score - a.score)
  }

  return results
}
