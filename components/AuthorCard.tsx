import Link from 'next/link'
import type { Author } from '@/types'

interface AuthorCardProps {
  author: Author
  variant?: 'dark' | 'light'
  className?: string
}

export default function AuthorCard({ author, variant = 'dark', className }: AuthorCardProps) {
  const name = author.metadata?.name || author.title
  const bio = author.metadata?.bio
  const profilePhoto = author.metadata?.profile_photo

  const isDark = variant === 'dark'

  return (
    <Link
      href={`/authors/${author.slug}`}
      className={`group block rounded-xl p-6 transition-all duration-300 ${
        isDark
          ? 'bg-ocean-900/50 hover:bg-ocean-900/80 border border-ocean-800'
          : 'bg-white hover:shadow-lg shadow-sm border border-gray-100'
      } ${className || ''}`}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        {profilePhoto?.imgix_url ? (
          <img
            src={`${profilePhoto.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
            alt={name}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-ocean-400/20 flex-shrink-0"
          />
        ) : (
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0 ${
              isDark ? 'bg-ocean-700 text-white' : 'bg-ocean-100 text-ocean-700'
            }`}
          >
            {name.charAt(0)}
          </div>
        )}

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3
            className={`font-bold text-lg mb-1 group-hover:text-ocean-400 transition-colors ${
              isDark ? 'text-white' : 'text-ocean-950'
            }`}
          >
            {name}
          </h3>
          {bio && (
            <p
              className={`text-sm line-clamp-2 leading-relaxed ${
                isDark ? 'text-ocean-300' : 'text-gray-500'
              }`}
            >
              {bio}
            </p>
          )}
        </div>
      </div>

      {/* Social Link indicator */}
      {author.metadata?.social_link && (
        <div className={`mt-4 pt-4 border-t ${isDark ? 'border-ocean-800' : 'border-gray-100'}`}>
          <span
            className={`text-xs font-medium ${isDark ? 'text-ocean-400' : 'text-ocean-600'}`}
          >
            View profile →
          </span>
        </div>
      )}
    </Link>
  )
}