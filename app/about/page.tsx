import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About TableTot',
  description: 'Why we built TableTot — the NYC family dining guide for parents who care about good food.',
}

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">🍽️</span>
          <h1 className="text-4xl font-bold text-ink-900">About TableTot</h1>
        </div>
        <p className="text-xl text-ink-500 leading-relaxed">
          The best tables for your whole crew.
        </p>
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-ink-700 leading-relaxed">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-ink-900 mb-3">Why we built this</h2>
          <p>
            Dining out in NYC with kids shouldn&apos;t require a Yelp deep-dive, three phone calls, and a gamble
            on whether there&apos;s a high chair. We built TableTot because parents deserve a trusted shortlist —
            restaurants where the food is genuinely good, kids are actually welcome, and you won&apos;t spend
            the meal apologizing to the table next to you.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-ink-900 mb-3">How we score restaurants</h2>
          <p className="mb-3">
            Every restaurant gets a kid-friendliness score from 3.8 to 5.0. We look at:
          </p>
          <ul className="space-y-2">
            {[
              'High chairs and booster seats available',
              'A dedicated kids menu (or family-style portions)',
              'Noise level appropriate for little ones',
              'Stroller accessibility and changing tables',
              'Outdoor seating and open space',
              'Staff attitude toward families',
              'Wait times and reservation availability',
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <span className="text-coral-500 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-ink-900 mb-3">Why Resy?</h2>
          <p>
            Every restaurant on TableTot is bookable on Resy. That means you can secure a table before you
            leave the house — critical when you&apos;re wrangling a stroller and a toddler who&apos;s already
            decided they&apos;re hungry. No walk-up gambling with a hungry kid.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-ink-900 mb-3">Our coverage</h2>
          <p>
            We currently cover 100 hand-curated restaurants across Manhattan, Brooklyn, and Queens.
            Every restaurant has been selected for its family-friendliness, food quality, and Resy availability.
            We update the list regularly.
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <Link
          href="/search"
          className="flex-1 flex items-center justify-center gap-2 bg-coral-700 text-white font-semibold
            px-6 py-3 rounded-xl hover:bg-coral-800 transition-colors text-center"
        >
          Browse all restaurants →
        </Link>
        <Link
          href="/neighborhoods"
          className="flex-1 flex items-center justify-center gap-2 bg-white text-ink-700 font-semibold
            px-6 py-3 rounded-xl border border-cream-200 hover:bg-cream-100 transition-colors text-center"
        >
          Browse by neighborhood
        </Link>
      </div>
    </div>
  )
}
