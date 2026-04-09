import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllRestaurants, getRestaurantById, getByNeighborhood, getPriceRange } from '@/lib/restaurants'
import { cuisineGradient } from '@/lib/utils'
import ScoreBadge from '@/components/restaurant/ScoreBadge'
import FeatureChip from '@/components/restaurant/FeatureChip'
import ResyButton from '@/components/restaurant/ResyButton'
import RestaurantCard from '@/components/restaurant/RestaurantCard'
import MapWrapper from '@/components/restaurant/MapWrapper'

export async function generateStaticParams() {
  return getAllRestaurants().map(r => ({ id: String(r.id) }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const r = getRestaurantById(Number(id))
  if (!r) return {}
  return {
    title: `${r.name} — Family-Friendly NYC | TableTot`,
    description: r.desc,
    openGraph: {
      title: `${r.name} | TableTot`,
      description: r.desc,
    },
  }
}

const featureGroups: Record<string, string[]> = {
  'Family Amenities': ['High Chairs', 'Kids Menu', 'Kids Breakfast Menu', 'Kids Dinner Menu', 'Changing Table', 'Stroller'],
  'Seating & Space': ['Outdoor Seating', 'Patio', 'Garden', 'Terrace', 'Private Dining', 'Family-Style'],
  'Food & Drink': ['Brunch', 'All-Day Menu', 'Gelato', 'Ice Cream', 'Fresh Pasta', 'Sushi', 'Pizza', 'Dim Sum'],
}

function groupFeatures(features: string[]): Record<string, string[]> {
  const grouped: Record<string, string[]> = {}
  const used = new Set<string>()
  for (const [group, keywords] of Object.entries(featureGroups)) {
    const matched = features.filter(f =>
      keywords.some(k => f.toLowerCase().includes(k.toLowerCase()))
    )
    if (matched.length > 0) {
      grouped[group] = matched
      matched.forEach(f => used.add(f))
    }
  }
  const rest = features.filter(f => !used.has(f))
  if (rest.length > 0) grouped['More'] = rest
  return grouped
}

export default async function RestaurantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const r = getRestaurantById(Number(id))
  if (!r) notFound()

  const price = getPriceRange(r)
  const gradient = cuisineGradient(r.cuisine)
  const similar = getByNeighborhood(r.neighborhood, r.id).slice(0, 3)
  const featGroups = groupFeatures(r.features)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-ink-400 mb-6">
        <Link href="/" className="hover:text-ink-700 transition-colors">Home</Link>
        <span>›</span>
        <Link href="/search" className="hover:text-ink-700 transition-colors">Restaurants</Link>
        <span>›</span>
        <span className="text-ink-700">{r.name}</span>
      </nav>

      {/* Hero banner */}
      <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${gradient} mb-8`}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent" />
        <div className="relative px-8 py-12 sm:py-16">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Link
              href={`/search?neighborhood=${encodeURIComponent(r.neighborhood)}`}
              className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-white/70 text-ink-700 hover:bg-white transition"
            >
              📍 {r.neighborhood.split(',')[0]}
            </Link>
            <span className="inline-flex items-center text-xs font-medium px-3 py-1 rounded-full bg-white/70 text-ink-700">
              {r.cuisine}
            </span>
            <span className="inline-flex items-center text-xs font-medium px-3 py-1 rounded-full bg-white/70 text-ink-700">
              {price}
            </span>
            {r.quiet && (
              <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full bg-sage-100 text-sage-700">
                🤫 Quiet
              </span>
            )}
          </div>
          <h1
            className="text-3xl sm:text-4xl font-bold text-ink-900 mb-4"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            {r.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <ScoreBadge score={r.score} size="lg" />
            <ResyButton href={r.resyUrl} size="lg" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <blockquote className="text-lg text-ink-700 leading-relaxed border-l-4 border-coral-300 pl-4 italic">
              &ldquo;{r.desc}&rdquo;
            </blockquote>
          </div>

          {/* Features */}
          {Object.keys(featGroups).length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-ink-900 mb-4">Family Highlights</h2>
              <div className="space-y-4">
                {Object.entries(featGroups).map(([group, features]) => (
                  <div key={group}>
                    <h3 className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-2">{group}</h3>
                    <div className="flex flex-wrap gap-2">
                      {features.map(f => (
                        <FeatureChip key={f} feature={f} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Map */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h2 className="text-lg font-bold text-ink-900 mb-3">Location</h2>
            <div className="h-56 rounded-xl overflow-hidden">
              <MapWrapper
                restaurants={[r]}
                singlePin
                height="100%"
              />
            </div>
            <p className="text-sm text-ink-400 mt-2">📍 {r.neighborhood}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Quick info */}
          <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
            <h2 className="font-bold text-ink-900">Quick Info</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-400">Neighborhood</span>
                <Link
                  href={`/search?neighborhood=${encodeURIComponent(r.neighborhood)}`}
                  className="text-coral-700 font-medium hover:underline text-right max-w-36"
                >
                  {r.neighborhood.split(',')[0]}
                </Link>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-400">Cuisine</span>
                <span className="text-ink-700 font-medium">{r.cuisine}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-400">Price</span>
                <span className="text-ink-700 font-medium">{price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-400">Vibe</span>
                <span className={`font-medium ${r.quiet ? 'text-sage-600' : 'text-saffron-600'}`}>
                  {r.quiet ? '🤫 Quiet' : '🎉 Lively'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-400">Kid Score</span>
                <span className="text-coral-700 font-bold">{r.score.toFixed(1)} / 5.0</span>
              </div>
            </div>
            <div className="pt-2">
              <ResyButton href={r.resyUrl} size="md" className="w-full justify-center" />
            </div>
          </div>

          {/* All tags */}
          {r.tags.length > 0 && (
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h2 className="font-bold text-ink-900 mb-3">Tags</h2>
              <div className="flex flex-wrap gap-1.5">
                {r.tags.map(tag => (
                  <span key={tag} className="text-xs px-2.5 py-1 bg-cream-100 text-ink-600 rounded-lg font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Similar restaurants */}
      {similar.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900 mb-5">
            More in {r.neighborhood.split(',')[0]}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {similar.map(s => (
              <RestaurantCard key={s.id} restaurant={s} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
