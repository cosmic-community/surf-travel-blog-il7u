import Link from 'next/link'
import type { Category } from '@/types'

interface CategoryBadgeProps {
  category: Category
  variant?: 'inline' | 'card'
  className?: string
}

const categoryIcons: Record<string, string> = {
  travel: '✈️',
  surfing: '🏄',
  destinations: '🌍',
  tips: '💡',
  gear: '🎒',
  culture: '🌺',
  food: '🍽️',
  adventure: '🏔️',
  lifestyle: '☀️',
  default: '🌊',
}

function getCategoryIcon(slug: string): string {
  const lowerSlug = slug.toLowerCase()
  for (const [key, icon] of Object.entries(categoryIcons)) {
    if (lowerSlug.includes(key)) return icon
  }
  return categoryIcons['default'] || '🌊'
}

export default function CategoryBadge({ category, variant = 'inline', className }: CategoryBadgeProps) {
  const name = category.metadata?.name || category.title
  const description = category.metadata?.description
  const icon = getCategoryIcon(category.slug)

  if (variant === 'inline') {
    return (
      <Link
        href={`/categories/${category.slug}`}
        className={`inline-flex items-center gap-1.5 bg-ocean-50 hover:bg-ocean-100 text-ocean-700 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${className || ''}`}
      >
        <span>{icon}</span>
        {name}
      </Link>
    )
  }

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`group block rounded-xl bg-white border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-ocean-200 transition-all duration-300 ${className || ''}`}
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl" aria-hidden="true">
          {icon}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-ocean-950 group-hover:text-ocean-700 transition-colors mb-1">
            {name}
          </h3>
          {description && (
            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}
        </div>
        <svg
          className="w-5 h-5 text-gray-300 group-hover:text-ocean-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}