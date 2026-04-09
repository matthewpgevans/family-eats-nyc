export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function scoreColor(score: number): string {
  if (score >= 4.7) return '#c0392b'
  if (score >= 4.3) return '#e74c3c'
  if (score >= 4.0) return '#e67e22'
  return '#f39c12'
}

export function cuisineGradient(cuisine: string): string {
  const c = cuisine.toLowerCase()
  if (c.includes('italian') || c.includes('pizza')) return 'from-orange-100 via-orange-50 to-red-100'
  if (c.includes('japanese') || c.includes('sushi') || c.includes('omakase')) return 'from-indigo-100 via-purple-50 to-purple-100'
  if (c.includes('mexican') || c.includes('taco')) return 'from-green-100 via-lime-50 to-yellow-100'
  if (c.includes('chinese') || c.includes('dim sum') || c.includes('cantonese')) return 'from-red-100 via-rose-50 to-pink-100'
  if (c.includes('brunch') || c.includes('american')) return 'from-amber-100 via-yellow-50 to-amber-50'
  if (c.includes('french')) return 'from-blue-100 via-sky-50 to-indigo-50'
  if (c.includes('mediterranean') || c.includes('greek')) return 'from-sky-100 via-blue-50 to-cyan-100'
  if (c.includes('indian')) return 'from-yellow-100 via-orange-50 to-amber-100'
  if (c.includes('thai') || c.includes('asian')) return 'from-emerald-100 via-teal-50 to-green-100'
  return 'from-coral-100 via-orange-50 to-saffron-100'
}

export function chipColor(feature: string): string {
  const f = feature.toLowerCase()
  if (f.includes('outdoor') || f.includes('patio') || f.includes('garden') || f.includes('terrace')) {
    return 'bg-sky-100 text-sky-700'
  }
  if (f.includes('shake') || f.includes('gelato') || f.includes('ice cream') || f.includes('dessert') || f.includes('cookie') || f.includes('pastry')) {
    return 'bg-amber-100 text-amber-700'
  }
  if (f.includes('omakase') || f.includes('farm') || f.includes('organic') || f.includes('wood') || f.includes('conveyor') || f.includes('craft')) {
    return 'bg-purple-100 text-purple-700'
  }
  return 'bg-sage-100 text-sage-700'
}

export function formatScore(score: number): string {
  return score.toFixed(1)
}
