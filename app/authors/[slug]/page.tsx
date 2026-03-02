// app/authors/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAuthorBySlug, getPostsByAuthor } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    return { title: 'Author Not Found — Surf Travel Blog' }
  }

  const name = author.metadata?.name || author.title

  return {
    title: `${name} — Surf Travel Blog`,
    description: author.metadata?.bio?.substring(0, 160) || `Stories by ${name}`,
  }
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const name = author.metadata?.name || author.title
  const posts = await getPostsByAuthor(author.id)

  return (
    <>
      {/* Author Header */}
      <div className="bg-gradient-to-br from-ocean-950 via-ocean-900 to-ocean-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {author.metadata?.profile_photo?.imgix_url ? (
            <img
              src={`${author.metadata.profile_photo.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
              alt={name}
              width={128}
              height={128}
              className="w-32 h-32 rounded-full object-cover ring-4 ring-ocean-400/30 mx-auto mb-6"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-ocean-700 flex items-center justify-center text-white text-4xl font-bold mx-auto mb-6">
              {name.charAt(0)}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {name}
          </h1>
          {author.metadata?.bio && (
            <p className="text-ocean-200 text-lg max-w-2xl mx-auto leading-relaxed">
              {author.metadata.bio}
            </p>
          )}
          {author.metadata?.social_link && (
            <a
              href={author.metadata.social_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-ocean-300 hover:text-white transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Social Profile
            </a>
          )}
        </div>
      </div>

      {/* Author Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-ocean-950 mb-8">
          Stories by {name}
        </h2>
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No stories published yet by this author.</p>
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
            href="/authors"
            className="inline-flex items-center gap-2 text-ocean-600 hover:text-ocean-700 font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All authors
          </Link>
        </div>
      </section>
    </>
  )
}