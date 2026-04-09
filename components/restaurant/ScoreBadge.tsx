import { scoreColor, formatScore } from '@/lib/utils'

interface Props {
  score: number
  size?: 'sm' | 'md' | 'lg'
}

export default function ScoreBadge({ score, size = 'md' }: Props) {
  const color = scoreColor(score)
  const dots = size === 'sm' ? 3 : 5
  const filled = Math.round((score / 5) * dots)

  if (size === 'lg') {
    return (
      <div className="flex items-center gap-2">
        <div
          className="text-white text-sm font-bold px-2.5 py-1 rounded-lg"
          style={{ backgroundColor: color }}
        >
          {formatScore(score)}
        </div>
        <span className="text-ink-500 text-sm">kid-friendly score</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {Array.from({ length: dots }).map((_, i) => (
          <div
            key={i}
            className="rounded-full"
            style={{
              width: size === 'sm' ? 6 : 7,
              height: size === 'sm' ? 6 : 7,
              backgroundColor: i < filled ? color : '#e0e0e0',
            }}
          />
        ))}
      </div>
      <span
        className={`font-semibold ${size === 'sm' ? 'text-xs' : 'text-sm'}`}
        style={{ color }}
      >
        {formatScore(score)}
      </span>
    </div>
  )
}
