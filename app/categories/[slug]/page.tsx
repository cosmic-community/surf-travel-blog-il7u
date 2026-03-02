// app/categories/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getPostsByCategory } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return { title: 'Category Not Found — Surf Travel Blog' }
  }

  const name = category.metadata?.name || category.title

  return {
    title: `${name} — Surf Travel Blog`,
    description:
      category.metadata?.description?.substring(0, 160) ||
      `Browse surf travel stories in ${name}.`,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const name = category.metadata?.name || category.title
  const posts = await getPostsByCategory(category.id)

  return (
    <>
      {/* Category Header */}
      <div className="bg-gradient-to-br from-ocean-950 via-ocean-900 to-ocean-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-ocean-400 mb-3">
            Category
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {name}
          </h1>
          {category.metadata?.description && (
            <p className="text-ocean-200 text-lg max-w-2xl mx-auto leading-relaxed">
              {category.metadata.description}
            </p>
          )}
        </div>
      </div>

      {/* Category Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-ocean-950 mb-8">
          {posts.length} {posts.length === 1 ? 'Story' : 'Stories'} in {name}
        </h2>
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No stories in this category yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Back Link */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-ocean-600 hover:text-ocean-700 font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All categories
          </Link>
        </div>
      </section>
    </>
  )
}