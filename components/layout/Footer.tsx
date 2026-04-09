import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🍽️</span>
              <span className="text-lg font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
                TableTot
              </span>
            </div>
            <p className="text-ink-300 text-sm leading-relaxed">
              The best tables for your whole crew. 100 family-friendly NYC restaurants, all bookable on Resy.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">Explore</h4>
            <ul className="space-y-2 text-sm text-ink-300">
              <li><Link href="/search" className="hover:text-white transition-colors">All Restaurants</Link></li>
              <li><Link href="/search?quiet=true" className="hover:text-white transition-colors">Quiet Spots</Link></li>
              <li><Link href="/search?brunch=true" className="hover:text-white transition-colors">Sunday Brunch</Link></li>
              <li><Link href="/neighborhoods" className="hover:text-white transition-colors">By Neighborhood</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">Filters</h4>
            <ul className="space-y-2 text-sm text-ink-300">
              <li><Link href="/search?feature=High+Chairs" className="hover:text-white transition-colors">High Chairs</Link></li>
              <li><Link href="/search?feature=Kids+Menu" className="hover:text-white transition-colors">Kids Menu</Link></li>
              <li><Link href="/search?feature=Outdoor+Seating" className="hover:text-white transition-colors">Outdoor Seating</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About TableTot</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-ink-700 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-ink-400">
          <p>© 2026 TableTot. For NYC families.</p>
          <p>Restaurant availability via <span className="text-white">Resy</span></p>
        </div>
      </div>
    </footer>
  )
}
