interface Props {
  href: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function ResyButton({ href, size = 'md', className = '' }: Props) {
  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 rounded-xl font-semibold text-white transition-all duration-150
        bg-coral-700 hover:bg-coral-800 active:scale-95 shadow-sm hover:shadow-md ${sizes[size]} ${className}`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
        <path d="M8 2v3H5a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3h-3V2h-2v3H10V2H8zm-3 5h14a1 1 0 0 1 1 1v2H4V8a1 1 0 0 1 1-1zm-1 5h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9z"/>
      </svg>
      Book on Resy
    </a>
  )
}
