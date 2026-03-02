// app/posts/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/cosmic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found — Surf Travel Blog' }
  }

  return {
    title: `${post.title} — Surf Travel Blog`,
    description:
      post.metadata?.content?.replace(/<[^>]*>/g, '').substring(0, 160) ||
      'A surf travel story from around the world.',
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const author = post.metadata?.author
  const category = post.metadata?.category
  const tags = post.metadata?.tags
    ? post.metadata.tags.split(',').map((t) => t.trim()).filter(Boolean)
    : []

  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article>
      {/* Hero Image */}
      {post.metadata?.featured_image?.imgix_url && (
        <div className="relative h-[50vh] md:h-[60vh] w-full">
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=2400&h=1400&fit=crop&auto=format,compress`}
            alt={post.title}
            width={1200}
            height={700}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/80 via-ocean-950/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="max-w-4xl mx-auto">
              {category && (
                <Link
                  href={`/categories/${category.slug}`}
                  className="inline-block text-xs font-semibold uppercase tracking-wider text-ocean-300 hover:text-white mb-3 transition-colors"
                >
                  {category.metadata?.name || category.title}
                </Link>
              )}
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* No featured image fallback header */}
      {!post.metadata?.featured_image?.imgix_url && (
        <div className="bg-gradient-to-br from-ocean-950 via-ocean-900 to-ocean-800 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {category && (
              <Link
                href={`/categories/${category.slug}`}
                className="inline-block text-xs font-semibold uppercase tracking-wider text-ocean-300 hover:text-white mb-3 transition-colors"
              >
                {category.metadata?.name || category.title}
              </Link>
            )}
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Meta Row */}
        <div className="flex flex-wrap items-center gap-4 mb-10 pb-8 border-b border-gray-200">
          {author && (
            <Link
              href={`/authors/${author.slug}`}
              className="flex items-center gap-3 group"
            >
              {author.metadata?.profile_photo?.imgix_url ? (
                <img
                  src={`${author.metadata.profile_photo.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                  alt={author.metadata?.name || author.title}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-ocean-200"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-ocean-100 flex items-center justify-center text-ocean-700 font-bold text-sm">
                  {(author.metadata?.name || author.title).charAt(0)}
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-ocean-900 group-hover:text-ocean-600 transition-colors">
                  {author.metadata?.name || author.title}
                </p>
              </div>
            </Link>
          )}
          <span className="text-gray-300">•</span>
          <time className="text-sm text-gray-500">{formattedDate}</time>
        </div>

        {/* Post Content */}
        {post.metadata?.content && (
          <div
            className="prose-content max-w-none"
            dangerouslySetInnerHTML={{ __html: post.metadata.content }}
          />
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-ocean-50 text-ocean-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-ocean-600 hover:text-ocean-700 font-medium transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to all stories
          </Link>
        </div>
      </div>
    </article>
  )
}