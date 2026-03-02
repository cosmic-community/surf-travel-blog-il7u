import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export const metadata: Metadata = {
  title: 'All Stories — Surf Travel Blog',
  description: 'Browse all surf travel stories, tips, and destination guides.',
}

export default async function PostsPage() {
  const posts = await getAllPosts()

  return (
    <>
      {/* Page Header */}
      <div className="bg-gradient-to-br from-ocean-950 via-ocean-900 to-ocean-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            All Stories
          </h1>
          <p className="text-ocean-200 text-lg max-w-2xl mx-auto">
            Surf travel adventures, wave guides, and destination deep-dives from
            around the world.
          </p>
        </div>
      </div>

      {/* Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No stories published yet.</p>
            <p className="text-gray-400 text-sm mt-2">
              Check back soon for new surf travel content!
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}