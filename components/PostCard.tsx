import Link from 'next/link'
import type { Post } from '@/types'

interface PostCardProps {
  post: Post
  className?: string
}

export default function PostCard({ post, className }: PostCardProps) {
  // Changed: Added safe derived fields for display
  const title = post.title
  const slug = post.slug
  const featuredImage = post.metadata?.featured_image?.imgix_url
  const categoryName =
    post.metadata?.category?.metadata?.name || post.metadata?.category?.title
  const authorName = post.metadata?.author?.metadata?.name || post.metadata?.author?.title
  const tags = post.metadata?.tags
  const createdAt = post.created_at ? new Date(post.created_at).toLocaleDateString() : ''

  return (
    <Link
      href={`/posts/${slug}`}
      className={`group block rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 ${className || ''}`}
    >
      {/* Changed: Added optional optimized image */}
      {featuredImage && (
        <div className="aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            src={`${featuredImage}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={title}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="p-5">
        {categoryName && (
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-ocean-600 mb-2">
            {categoryName}
          </span>
        )}

        <h3 className="text-lg font-bold text-ocean-950 group-hover:text-ocean-700 transition-colors mb-2">
          {title}
        </h3>

        {tags && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags
              .split(',')
              .slice(0, 3)
              .map((tag) => (
                <span
                  key={tag.trim()}
                  className="bg-ocean-50 text-ocean-700 px-2.5 py-1 rounded-full text-xs font-medium"
                >
                  {tag.trim()}
                </span>
              ))}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500">
          {authorName ? (
            <span>
              By <span className="font-medium text-ocean-700">{authorName}</span>
            </span>
          ) : (
            <span className="text-gray-400">Surf Travel Blog</span>
          )}
          {createdAt && <span>{createdAt}</span>}
        </div>
      </div>
    </Link>
  )
}