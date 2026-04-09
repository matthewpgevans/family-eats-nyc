import { chipColor } from '@/lib/utils'

interface Props {
  feature: string
  size?: 'sm' | 'md'
}

export default function FeatureChip({ feature, size = 'md' }: Props) {
  const colorClass = chipColor(feature)
  return (
    <span
      className={`inline-flex items-center rounded-lg font-medium whitespace-nowrap ${colorClass} ${
        size === 'sm'
          ? 'text-xs px-2 py-0.5'
          : 'text-xs px-2.5 py-1'
      }`}
    >
      {feature}
    </span>
  )
}
