import type { Metadata } from 'next'
import { getAllAuthors } from '@/lib/cosmic'
import AuthorCard from '@/components/AuthorCard'

export const metadata: Metadata = {
  title: 'Authors — Surf Travel Blog',
  description: 'Meet the surf travel writers and adventure storytellers.',
}

export default async function AuthorsPage() {
  const authors = await getAllAuthors()

  return (
    <>
      {/* Page Header */}
      <div className="bg-gradient-to-br from-ocean-950 via-ocean-900 to-ocean-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Writers
          </h1>
          <p className="text-ocean-200 text-lg max-w-2xl mx-auto">
            The adventurers, wave riders, and storytellers behind every post.
          </p>
        </div>
      </div>

      {/* Authors Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {authors.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No authors found.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {authors.map((author) => (
              <AuthorCard key={author.id} author={author} variant="light" />
            ))}
          </div>
        )}
      </section>
    </>
  )
}