import { getFeaturedRestaurants, getNeighborhoods, filterRestaurants } from '@/lib/restaurants'
import HeroSection from '@/components/home/HeroSection'
import FeaturedGrid from '@/components/home/FeaturedGrid'
import NeighborhoodRow from '@/components/home/NeighborhoodRow'

export default function HomePage() {
  const featured = getFeaturedRestaurants(6)
  const brunch = filterRestaurants({ brunch: 'true' }).slice(0, 6)
  const brooklyn = filterRestaurants({ neighborhood: 'Brooklyn' }).slice(0, 6)
  const neighborhoods = getNeighborhoods()

  return (
    <>
      <HeroSection />

      <FeaturedGrid
        title="Editor's Picks"
        subtitle="Our highest-rated family-friendly tables in NYC"
        restaurants={featured}
        seeAllHref="/search"
        showRank
      />

      <div className="bg-cream-100 py-2">
        <NeighborhoodRow neighborhoods={neighborhoods} />
      </div>

      <FeaturedGrid
        title="Best for Brunch"
        subtitle="Weekend-friendly spots with kids menus and relaxed vibes"
        restaurants={brunch}
        seeAllHref="/search?brunch=true"
      />

      <div className="bg-gradient-to-br from-saffron-50 to-cream-50 py-2">
        <FeaturedGrid
          title="Best in Brooklyn"
          subtitle="From Park Slope playgrounds to Williamsburg weekend tables"
          restaurants={brooklyn}
          seeAllHref="/search?neighborhood=Brooklyn"
        />
      </div>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="bg-coral-700 rounded-3xl px-8 py-12 text-white">
          <h2 className="text-3xl font-bold mb-3">Find your next family table</h2>
          <p className="text-coral-100 mb-8 text-lg">
            Filter by high chairs, kids menus, outdoor seating, noise level, and more.
          </p>
          <a
            href="/search"
            className="inline-flex items-center gap-2 bg-white text-coral-700 font-bold px-8 py-4 rounded-2xl
              hover:bg-coral-50 active:scale-95 transition-all shadow-lg text-base"
          >
            Browse all 100 restaurants →
          </a>
        </div>
      </section>
    </>
  )
}
